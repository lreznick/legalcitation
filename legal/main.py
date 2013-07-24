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
	'/register', app_signup,
	'/', 'Index'

)

app = web.application(urls, globals())
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



def main():
	db = web.database(dbn='mysql', host='127.0.0.1', port=3306, user='root', pw='root', db='mydb')
	string = app.run() #
	print string
  
if __name__ == "__main__":
	main()