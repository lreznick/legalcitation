import web 
import json
import globs


urls = (
	'' , 'Account',
	'/updateAccount', 'update_account',
	'/changePassword', 'change_password'
)
	
	
	
'''
Table: users
Columns:
user_id			int(11) PK
email			varchar(50)
create_date		datetime
active			tinyint(1)
salt			char(64)
hash			blob
occupation		varchar(45)
school			varchar(45)
'''
	
	
class account:
	def __init__(self, email, occupation, school):
		self.email = email
		self.occupation =occupation
		self.school = school

		
class subscription:
	def __init__(self,  subscript, exp):
		self.subscript = subscript
		self.exp = exp
		
class change_password(object):
	def GET(self):
		return "hello from get in change_password"
	def POST(self):
		form = web.input()
		old_pass = "%s" % (form.oldpass)
		new_pass = "%s" % (form.newpass)
		new_pass_again = "%s" % (form.newpass_again)
		if (new_pass != new_pass_again):
			return "Ya'll done f'd up!"
		user_email = web.ctx.session.username
		user_info = globs.db.query("SELECT * FROM users WHERE email=$id", vars={'id':user_email})[0]
		verified = globs.verify_user_hash(old_pass, user_info)
		print verified
		if verified:
			hashed_object = globs.PasswordHash(new_pass)
			#hashobj.hashedpw
			#hashobj.salt
			globs.db.query("UPDATE users SET password_hash=$hashedpw, password_salt=$saltedpw WHERE user_id=$userID", vars={'hashedpw':hashed_object.hashedpw, 'saltedpw':hashed_object.salt, 'userID':user_info.user_id})
			web.ctx.session.loggedin = False
			raise web.seeother("/login", absolute=True)
		else:
			return "Old pass not correct"


	

	
			
class update_account(object):
	def GET(self):
		return "hello from get in update account"
	def POST(self):
		form = web.input()
		print form
		email = "%s" % (form.email)
		occupation = "%s" % (form.occupation)
		school = "%s" % (form.school)
		user = web.ctx.session.username
		user_id = globs.db.query("SELECT user_id FROM users WHERE email=$user", vars={'user':user})[0]
		print user_id
		globs.db.query("UPDATE users SET email=$em, occupation=$occ, school=$schoo WHERE user_id=$userID", vars={'em':email, 'occ':occupation, 'schoo':school, 'userID':user_id})
		web.ctx.session.username = email
		raise web.seeother('/account', absolute=True)
		
class Account(object):
	def GET(self):
		#print "hello"
		##return web.template.frender('webclient/templates/account/accountMain.html')
		if(web.ctx.session.loggedin != True):
			my_login = globs.login_form()
			my_login['username'].note = "Not Logged In!"
			return globs.render.login(my_login)
		else:
			user_name = web.ctx.session.username
			userQuery = globs.db.query("SELECT * FROM users WHERE email=$user", vars={'user':user_name})[0]
			if(userQuery.school == None):
				userQuery.school = "Empty"
			if(userQuery.occupation == None):
				userQuery.occupation = "Empty"
			#a = account("qwert1_2@hotmail.com", "student", "U&#160;of&#160;Toronto", )
			b = subscription("Free Year Subscription", "Sept. 1, 2014")
			return globs.render.accountMain(userQuery,b)
	

app_accountHandler = web.application(urls, locals())
