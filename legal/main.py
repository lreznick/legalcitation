#As of now, the main program that runs everything. When the
# user requests the website, it grabs the html file and opens it up. 
#	Website opened at http://localhost:8080 It then waits for an input 
#from the user and then grabs that information. then calls webgrabber which grabs links


'''
			import os
			import sys
			root = os.path.join(os.path.dirname(__file__)+"/")
			sys.path.insert(0, root)
			modules = os.path.join(os.path.dirname(__file__)+"/server/")
			sys.path.insert(1, modules)
			os.chdir(root)
			app = web.application(urls, globals(),autoreload=False)
			application = app.wsgifunc()
'''
'''
import os
parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.insert(0,parentdir) 
import mymodule
'''
#from server.testyface import test123
from server.formcode.webGrabber import *
from server.formcode.CanadianCase import *
from server.subapplications.dbConnector import *
from server.formcode.formHandler import *
from server.account.accountHandler import *
from server.citations.citationHandler import *

import web, json
import globs
#web.config.debug = False #-------------- TAKE ME OUT LATER
globs.init()          # Call only once
web.config.debug = True #  Change me ------------
global session

# mapping. Each post request contains what to do.    '/' ,  'Index', '/signup', 'SignUp',
urls = (
    #'/formInput', 'Index',	
	#'/instructional/(.+)', 'Instructional',
	'/', 'Index',
	'/about', 'About',
	'/account', app_accountHandler,
	'/citations', app_citationHandler,
	'/email', 'Email',
	'/email/response', 'EmailResponse',
	'/form', app_formHandler,	
	'/instructional', 'Instructional',
	'/instructional', 'Instructionalz',
	'/login', 'Login',
	'/logout', 'Logout',
	'/register', 'Register',
	'/terms', 'Terms',
	
	'/test', 'Test'
)

app = web.application(urls, globals(),autoreload=True)
#render = web.template.render('webclient/templates/', base = 'layout

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
		return globs.render.signupEmailSent("stephen")
	
class Index(object):
	def GET(self):
		print "YOOOOOOOOOO"
		session_cookie = web.cookies().get('chocolate_chip_local')
		if ((session_cookie != None) and (session.loggedin == True)):
			raise web.seeother("/citations")
		else:
			raise web.seeother("/register")
		

class About(object):
	def GET(self):		
		return globs.render.aboutUs()
	def POST(self):
		return globs.render.aboutUs()

class EmailResponse(object):
	def GET(self):
		data = web.input()
		print data
		hashedemail = data.id
		user_query = globs.db.query("SELECT * FROM users WHERE email_hash=$hash", vars={'hash':hashedemail})
		my_login = globs.login_form()
		if user_query == None:
			return "YOu done goofed"
		else:
			user_row = user_query[0]
			if(user_row.email_hash == hashedemail):
				user_id = user_row.user_id
				globs.db.query("UPDATE users SET active=1 WHERE user_id=$userID", vars={'userID':user_id})
				#TODO ADD signupGetInfo for further information collection.
				print "111111111111111111111111"
				raise web.seeother('/login')
				#return globs.render.login(my_login)
			else:
				print "2222222222222222222222222"
				return globs.render.login(my_login)

class Instructional(object):
	def GET(self):
		data=  web.input()
		return globs.render.instructional(data.linkLocation)

class Terms(object):
	def GET(self):
		return globs.render.termsOfUse()		
			
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
				query_result = globs.db.query("SELECT * FROM users WHERE user_id=$userID", vars={'userID':email})[0]
				print query_result.active
				print type(query_result.active)
				if query_result.active:
					session.loggedin = True
					session.username = email
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


class Logout:
	def GET(self):
		my_login = globs.login_form()
		session.loggedin = False
		session.kill()
		return globs.render.login(my_login)

class Register(object):
	def GET(self):
		my_signup = globs.signup_form()
		return globs.render.signup(my_signup)
		
	def POST(self):
		my_signup = globs.signup_form()
		if my_signup.validates(): 
			email = my_signup['username'].value
			password = my_signup['password_again'].value
			result = handle_user(email, password, "register")
			if (result == False):
				my_signup['username'].note = "username already there!"
				return globs.render.signup(my_signup)
			else:
				get_email_hash = globs.db.query("SELECT email_hash FROM users WHERE email=$id", vars={'id':email})[0]
				htmlbody = web.template.frender('webclient/templates/email/email.html')
				baselink = "http://www.intra-vires.com/email/response?id="
				link = baselink + get_email_hash.email_hash
				web.sendmail('Register.IntraVires@gmail.com', email, 'Complete Your Intra Vires Registration', htmlbody(link), headers={'Content-Type':'text/html;charset=utf-8'})
				return globs.render.signupEmailSent(email)
		else:
			print "didn't validate baby REGISTER"
			print "note", my_signup['username'].note
			print my_signup['username'].value
			print my_signup['password'].value
			print my_signup['password_again'].value
			return globs.render.form()
			

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
	
