import web 
import json
import globs


urls = (
	'' , 'Account'
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
		
class Account(object):
	def GET(self):
		#print "hello"
		##return web.template.frender('webclient/templates/account/accountMain.html')
		
		user_name = web.ctx.session.username
		userQuery = globs.db.query("SELECT * FROM users WHERE email=$user", vars={'user':user_name})[0]
		
		#a = account("qwert1_2@hotmail.com", "student", "U&#160;of&#160;Toronto", )
		b = subscription("Free Year Subscription", "Sept. 1, 2014")
		return globs.render.accountMain(userQuery,b)
	

app_accountHandler = web.application(urls, locals())
