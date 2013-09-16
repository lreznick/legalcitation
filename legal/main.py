#As of now, the main program that runs everything. When the
# user requests the website, it grabs the html file and opens it up. 
#	Website opened at http://localhost:8080 It then waits for an input 
#from the user and then grabs that information. then calls webgrabber which grabs links
import os, sys

#For the server 
'''
root = os.path.join(os.path.dirname(__file__)+"/")
sys.path.insert(0, root)
modules = os.path.join(os.path.dirname(__file__)+"/server/")
sys.path.insert(1, modules)
os.chdir(root)
os.environ["SCRIPT_NAME"] =''
os.environ["REAL_SCRIPT_NAME"] = ''
'''
import web, json, globs
from server.formcode.webGrabber import *
from server.formcode.CanadianCase import *
from server.subapplications.dbConnector import *
from server.formcode.formHandler import *
from server.account.accountHandler import *
from server.citations.citationHandler import *




# mapping. Each post request contains what to do.    '/' ,  'Index', '/signup', 'SignUp',
urls = (
	'/', 'Index',
	'/about', 'About',
	'/account', app_accountHandler,
	'/citations', app_citationHandler,
	'/email', 'Email',
	'/response', 'EmailResponse',
	'/finishregistration', 'FinishRegistration',
	'/form', app_formHandler,	
	'/instructional', 'Instructional',
	'/login', 'Login',
	'/logout', 'Logout',
	'/register', 'Register',
	'/changePassword', 'ChangePassword',
	'/terms', 'Terms',
	'/forgotPassword', 'ForgotPassword',
	'/test', 'Test'
)



#For the Server
'''
app = web.application(urls, globals(),autoreload=False)
application = app.wsgifunc()
'''

#For the Local Host
app = web.application(urls, globals(),autoreload=True)


globs.init()          # Call only once

#For the Server
web.config.debug = True #  Change me  For server ------------
global session

#Configure session parameters
web.config.session_parameters['cookie_name'] = 'chocolate_chip_local'
web.config.session_parameters['cookie_domain'] = None
web.config.session_parameters['cookie_path'] = '/'
web.config.session_parameters['timeout'] = 86400 #24 * 60 * 60, # 24 hours in seconds is default
web.config.session_parameters['ignore_expiry'] = False
web.config.session_parameters['ignore_change_ip'] = True
web.config.session_parameters['secret_key'] = 'fLjUfxqXtfNoIldA0A0J'
web.config.session_parameters['expired_message'] = 'Session expired.. Please Reload and Login Again.'
store = web.session.DBStore(globs.db, 'sessions')
if web.config.get('_session') is None:
	session = web.session.Session(app,store,initializer={'login': 0,'privilege': 0,'username':'anonymous','loggedin':False})
	web.config._session = session
else:
	session = web.config._session

#CREATING SESSION HOOK
def session_hook():
    web.ctx.session = session

#Adding session_hook to its own processor
app.add_processor(web.loadhook(session_hook))

globs.template_globals.update(context=session)





''' ----------- CLASSES ---------- '''
class Test(object):
	def GET(self):
		print "SUP\n\n\n\n\n"
		#return globs.render.signupEmailSent("stephen")
		
	
class Index(object):
	def GET(self):
		session_cookie = web.cookies().get('chocolate_chip_local')
		if ((session_cookie != None) and (session.loggedin == True)):
			raise web.seeother("/citations")
		else:
			my_signup = globs.signup_form()
			return globs.render.register(my_signup)
		

class About(object):
	def GET(self):		
		return globs.render.aboutUs()
	def POST(self):
		return globs.render.aboutUs()


		
		

class Instructional(object):
	def GET(self):
		data=  web.input()
		return globs.render.instructional(data.linkLocation)

class Terms(object):
	def GET(self):
		return globs.render.termsOfUse()		
		
		
''' ------------- LOGIN -------------	'''
class Login(object):
	def GET(self):
		print "CHECKING FOR COOKIES AT LOGIN!!!!!!!"
		session_cookie = web.cookies().get('chocolate_chip_local')
		if ((session_cookie != None) and (session.loggedin == True)):
			print web.cookies()
			#return globs.render.myCitations(None)
			raise web.seeother("/citations")
		my_login = globs.login_form()
		return globs.render.login(my_login)
		
	def POST(self):
		print "LOGIN POST"
		my_login = globs.login_form()
		if my_login.validates(): 
			email = my_login['username'].value
			password = my_login['password'].value
			result = handle_user(email, password, "login")
			
			if (result == False):
				print "something unexpected has occured"
				my_login['username'].note = "Invalid Username/Password Combination"
				return globs.render.login(my_login)
			else:
				
				print "THIS MEANS YOU GOT VALIDATED BABY!(LOGIN)"
				#query_result = globs.db.query("SELECT * FROM users WHERE email=$userID", vars={'userID':email})
				#print "TEST"
				query_result = globs.db.query("SELECT * FROM users WHERE email=$userID", vars={'userID':email})[0]
				print query_result
				if query_result.active:
					session.loggedin = True
					#globs.db.query("INSERT INTO user_session (user_id, session_id) VALUES ($user_id, $session_id)", vars={'user_id':query_result.user_id, 'session_id':})
					session.username = email
					#addToUserSessionTable();
					raise web.seeother("/citations")
				else:
					my_login['username'].note = "Please Validate Your Account."
					if (session.loggedin == True):					
						session.loggedin = False
					return globs.render.login(my_login)
		else:
			print "didn't validate baby! (LOGIN)"
			print "note", my_signup['username'].note
			print my_signup['username'].value
			print my_signup['password'].value                        
			if ((my_signup['username'].value == "") or (my_signup['username'].value == None)):
				my_login['username'].note = "Please enter a valid username"
				session.loggedin = False
				return render.login(my_login)
			elif((my_signup['password'].value == "") or (my_signup['password'].value == None)):
				my_login['password'].note = "Please enter a valid password"
				session.loggedin = False
				return globs.render.login(my_login)
			else:
				return globs.render.login()

def addToUserSessionTable():
	return None

class Logout:
	def GET(self):
		my_login = globs.login_form()
		session.loggedin = False
		session.kill()
		return globs.render.login(my_login)



''' --------- Forgot Password --------- '''

class ForgotPassword(object):
	def GET(self):
		return globs.render.passwordForgot()
	def POST(self):
		data = web.input()
		email = data.email	
		try:
			get_email_hash = globs.db.query("SELECT email_hash FROM users WHERE email=$email", vars={'email':email})[0]
#			return globs.render.passwordForgot("An email has been sent to: "+email, True)
			print get_email_hash
			htmlbody = web.template.frender('webclient/templates/email/email.html')
			#For the server
	
			#baselink = "http://www.intra-vires.com/response?id="
			baselink = "localhost:8080/changePassword?id="
			link = baselink + get_email_hash.email_hash
			web.sendmail('Register.IntraVires@gmail.com', email, 'Complete Your Intra Vires Registration', htmlbody(link), headers={'Content-Type':'text/html;charset=utf-8'})
			return globs.render.passwordForgot("Your email has been sent", True)
		except IndexError:
			web.debug("AN SQL EXCEPTION HAS OCCURED")
			return globs.render.passwordForgot("The email you entered is not in our database.", False)
		
		

#		return "You should recieve an email for password change."
		
class ChangePassword(object):
	def GET(self):
		data = web.input()
		hashedEmail = data.id
		return globs.render.passwordForgotReset(hashedEmail)
	def POST(self):
		data = web.input()
		hashedemail = data.id
		password1 = data.password
		password2 = data.password_again
		try:
			user_query = globs.db.query("SELECT * FROM users WHERE email_hash=$hash", vars={'hash':hashedemail})
			my_login = globs.login_form()
			if user_query == None:
				return "You done goofed"
			else:
				user_row = user_query[0]
				if(user_row.email_hash == hashedemail):
					if(password1 != password2):
						return 'password1 and password2 in change password do not match'
					else:						
						user_id = user_row.user_id
						pass_hashobj = globs.PasswordHash(password1)
						globs.db.query("UPDATE users SET password_hash=$hashedpw, password_salt=$saltedpw WHERE user_id=$userID", vars={'userID':user_id, 'hashedpw':pass_hashobj.hashedpw, 'saltedpw':pass_hashobj.salt})
						return globs.render.login(my_login)
				else:
					return globs.render.login(my_login)
		except IndexError:
			web.debug("AN SQL EXCEPTION HAS OCCURED")
			return globs.render.login(my_login)


'''
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
'''




		
''' --------------- REGISTER ------------'''		

class Register(object):
	def GET(self):
		my_signup = globs.signup_form()
		return globs.render.register(my_signup)
		
	def POST(self):
		my_signup = globs.signup_form()
		if my_signup.validates(): 			
			email = my_signup['username'].value
			password = my_signup['password'].value
			passwordAgain = my_signup['password_again'].value	
			result = handle_user(email, password, "register")
			if (result == False):
				my_signup['username'].note = "username already there!"
				return globs.render.register(my_signup)
			else:
				get_email_hash = globs.db.query("SELECT email_hash FROM users WHERE email=$id", vars={'id':email})[0]
				htmlbody = web.template.frender('webclient/templates/email/email.html')
				#For the server
				
				#baselink = "http://www.intra-vires.com/response?id="
				baselink = "localhost:8080/response?id="
				link = baselink + get_email_hash.email_hash
				web.sendmail('Register.IntraVires@gmail.com', email, 'Complete Your Intra Vires Registration', htmlbody(link), headers={'Content-Type':'text/html;charset=utf-8'})
				return globs.render.signupEmailSent(email)
		else:
			email = my_signup['username'].value
			password = my_signup['password'].value
			passwordAgain = my_signup['password_again'].value				
			
			validateResult = ValidateRegister(password,passwordAgain,email)
			my_signup['username'].note = validateResult;
			return globs.render.register(my_signup)
			
def ValidateRegister(password, passwordAgain, email):
	print password
	print passwordAgain
	
	if (password != passwordAgain):
		return "The passwords you entered don't match."
	else:
		return"Your entries were invalid."
		

class EmailResponse(object):
	def GET(self):
		data = web.input()
		print data
		hashedemail = data.id
		user_query = globs.db.query("SELECT * FROM users WHERE email_hash=$hash", vars={'hash':hashedemail})
		my_login = globs.login_form()
		if user_query == None:
			return "You done goofed"
		else:
			user_row = user_query[0]
			print user_row
			if(user_row.email_hash == hashedemail):
				user_id = user_row.user_id
				globs.db.query("UPDATE users SET active=1 WHERE user_id=$userID", vars={'userID':user_id})
				session.loggedin = True
				
				session.username = user_row.email
				return globs.render.signupGetInfo(user_id)
				#return globs.render.login(my_login)
			else:
				return globs.render.login(my_login)

class FinishRegistration(object):
	def GET(self):
		print "ALMOST DONE REGISTERING"		
		data = web.input()
		print data
		print data.firstname
		print data.lastname
		print data.age
	def POST(self):
		data = web.input()
		print data
		occupation = "none"
		if data.has_key('occupation'):
			occupation= data.occupation
		
		school = "none"
		if data.has_key('school'):
			school = data.school
			
		id = "user_id = " + str(data.id)
		
		globs.db.update('users', where=id ,
				firstname = str(data.firstname),
				lastname = data.lastname,
				age = data.age,
				occupation = occupation,
				school =school
		)
		
		#
		raise web.seeother("/form")
		
		#globs.db.query("UPDATE users SET firstname=$fname, lastname=$lname, age=$age, occupation=$occupation, school=$school WHERE user_id=$userID", vars={'userID':user_id})



		
class Terms(object):
	def GET(self):
		return globs.render.termsOfUse()		
		

def main():
	app.internalerror = web.debugerror
	string = app.run() 
	#string = app.wsgifunc() 
	print string
  
if __name__ == "__main__":
	
	main()
	
