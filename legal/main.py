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
from server.formHandler import *

import web, json
from web import form

 
# mapping. Each post request contains what to do.    '/' ,  'Index', '/signup', 'SignUp',
urls = (
    '/formInput', 'Index',	
	'/about', 'About',
	'/form', app_formHandler,
	'/login', 'Login',
	'/logout', 'Logout',
	'/register', 'Register',
	'/', 'Index',
	'/citations', 'MyCitations'
	

)

app = web.application(urls, globals(),True)
#render = web.template.render('webclient/templates/', base = 'layout')



#Initializing sessions with DBStore. Storing in database.
db = web.database(dbn='mysql', host='127.0.0.1', port=3306, user='root', pw='Jeenyus1', db='intravires')
store = web.session.DBStore(db, 'sessions')
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

>>>>>>> origin/master
template_globals ={}
render_partial = web.template.render('webclient/templates/', globals=template_globals)
render = web.template.render('webclient/templates/', globals=template_globals, base='layout')
template_globals.update(render=render_partial)

class citation:
	def __init__(self, styleofcause, fullcitation, date, formtype):
		self.styleofcause = styleofcause
		self.fullcitation = fullcitation
		self.date = date
		self.formtype = formtype
		
class MyCitations(object):
	def GET(self):
		user_name = web.ctx.session.username
		a = citation("Johnson v. Johnson", "Johnson v Johnson, 2008 SCC 9 at para 289, [2008] 1 SCR 190, Binnie J.", "4 Feb 2013", "Canadian Case")
		citationList =[a,a,a,a,a]
		#citationList = getCitations()
		return render.myCitations(citationList)
		
class Index(object):
	def GET(self):
		return render.form() #index is the name of the html in /templates

	def POST(self):
		form = web.input()
		webURL = "%s" % (form.styleofcause)
		return webURL

		
class About(object):
	def GET(self):		
		return render.aboutUs();
	
	def POST(self):
		return render.aboutUs();



	
passwords_match = form.Validator("Passwords didn't match.", lambda i: i.password == i.password_again)			
username_required = form.Validator("Username not provided", bool)
password_required = form.Validator("Password not provided", bool)
password_length = form.Validator("Password length should be minimum 7 characters", lambda p: p is None or len(p) >= 7)

signup_form =form.Form(
						form.Textbox('username', username_required, placeholder = "email", note ="", class_ = "input"),
						form.Password('password',  placeholder = "password", class_ = "input"),
						form.Password('password_again',  placeholder = "password again", class_ = "input"),
						validators = [passwords_match]		
						)
						
login_form = form.Form(
						form.Textbox('username', username_required, placeholder = "email", note ="", class_ = "input"),
						form.Password('password', password_required, placeholder = "password", class_ = "input")
						)

class Register(object):
	
	def GET(self):
		my_signup = signup_form()
		return render.signup(my_signup)
		
	def POST(self):
		my_signup = signup_form()
		if my_signup.validates(): 
			email = my_signup['username'].value
			password = my_signup['password_again'].value
			result = handle_user(email, password, "register")
			if (result == False):
				my_signup['username'].note = "username already there!"
				return render.signup(my_signup)
			return render.form()
		else:
			print "didn't validate baby REGISTER"
			print "note", my_signup['username'].note
			print my_signup['username'].value
			print my_signup['password'].value
			print my_signup['password_again'].value
			return render.form()
			
class Login(object):
	def GET(self):
		print "CHECKING FOR COOKIES AT LOGIN!!!!!!!"
		if ((web.cookies().get('username') != None)):
			print "COOKIES FOUND"
			print web.cookies()
			return render.myCitations([citation("Johnson v. Johnson", "Johnson v Johnson, 2008 SCC 9 at para 289, [2008] 1 SCR 190, Binnie J.", "4 Feb 2013", "Canadian Case")])
		my_login = login_form()
		return render.login(my_login)
		
	def POST(self):
		my_login = login_form()
		if my_login.validates(): 
			email = my_login['username'].value
			password = my_login['password'].value
			result = handle_user(email, password, "login")
			if (result == False):
				print "something unexpected has occured"
				return "username already there!"
			else:
				print "THIS MEANS YOU GOT VALIDATED BABY!(LOGIN)"
				return render.form()
		else:
			print "didn't validate baby! (LOGIN)"
			print "note", my_signup['username'].note
			print my_signup['username'].value
			print my_signup['password'].value
			return render.form()

class Logout:
	def GET(self):
		print session.username
		session.kill()
		return render.form()

def main():
	app.internalerror = web.debugerror
	string = app.run() 
	#string = app.wsgifunc() 
	print string
  
if __name__ == "__main__":
	
	main()
	
