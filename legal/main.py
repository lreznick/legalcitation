#As of now, the main program that runs everything. When the
# user requests the website, it grabs the html file and opens it up. 
#	Website opened at http://localhost:8080 It then waits for an input 
#from the user and then grabs that information. then calls webgrabber which grabs links


from server.testyface import test123
from server.formcode.webGrabber import *
from server.formcode.CanadianCase import *
from server.subapplications.signup import *
from server.formHandler import *

import web
import json
from web import form

 
# mapping. Each post request contains what to do.    '/' ,  'Index', '/signup', 'SignUp',
urls = (
    '/formInput', 'Index',	
	'/about', 'About',
	'/form', app_formHandler,
	'/login', app_signup,
	'/register', 'Register',
	'/', 'Index'

)

app = web.application(urls, globals(),True)
#render = web.template.render('webclient/templates/', base = 'layout')


template_globals ={}
render_partial = web.template.render('webclient/templates/', globals=template_globals)
render =web.template.render('webclient/templates/', globals=template_globals, base='layout')
template_globals.update(render=render_partial)


#Then you will be able to call $:render.any_template() in templates.
if web.config.get('_session') is None:
    session = web.session.Session(app, web.session.DiskStore('sessions'), initializer={'user': 'anonymous'})
    web.config._session = session
else:
    session = web.config._session

class About(object):
	def GET(self):		
		return render.aboutUs();
	
	def POST(self):
		return render.aboutUs();

class Index(object):
	def GET(self):
		return render.index() #index is the name of the html in /templates

	def POST(self):
		form = web.input()
		webURL = "%s" % (form.styleofcause)
		return webURL

'''
signup_form = form.Form(
						form.Textbox('username', 
						form.Validator('Username already exists.', lambda x: x not in users.keys()), description='Username:'),
						form.Password('password', description='Password:'),
						form.Password('password_again', description='Repeat your password:'),
						validators = [form.Validator("Passwords didn't match.", lambda i: i.password == i.password_again)])		
'''			
signup_form =form.Form(
						form.Textbox('name', placeholder = "email", class_ = "input"),
						form.Password('password',  placeholder = "password", class_ = "input"),
						form.Password('password_again',  placeholder = "password again", class_ = "input"),
						validators = [form.Validator("Passwords didn't match.", lambda i: i.password == i.password_again)]		
						)
			
class Register(object):
	def GET(self):
		my_signup = signup_form()
		return render.signup(my_signup)
		
		
	def POST(self):
		my_signup = signup_form()
		if not my_signup.validates(): 
			return render.signup(my_signup)
		else:
			username = my_signup['username'].value
			password = my_signup['password'].value
			#users[username] = PasswordHash(password)
			raise web.seeother('/')


			
def main():
	db = web.database(dbn='mysql', host='127.0.0.1', port=3306, user='root', pw='root', db='mydb')
	string = app.run() #
	print string
  
if __name__ == "__main__":
	main()