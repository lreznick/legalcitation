#As of now, the main program that runs everything. When the
# user requests the website, it grabs the html file and opens it up. 
#       Website opened at http://localhost:8080 It then waits for an input 
#from the user and then grabs that information. then calls webgrabber which grabs links

import os
import sys
import web
import json
from web import form

root = os.path.join(os.path.dirname(__file__)+"/")
sys.path.insert(0, root)
modules = os.path.join(os.path.dirname(__file__)+"/server/")
sys.path.insert(1, modules)
os.chdir(root)


#from server.testyface import test123
from server.formcode.webGrabber import *
from server.formcode.CanadianCase import *
from server.subapplications.dbConnector import *
from server.formHandler import *


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

app = web.application(urls, globals(),autoreload=False)
application = app.wsgifunc()
print "Before session configuration MAIN.PY"


class CreateSession():
        def __init__(self):

                #Configure session parameters
                web.config.session_parameters['cookie_name'] = 'chocolate_chip_session'
                web.config.session_parameters['cookie_domain'] = None
                web.config.session_parameters['cookie_path'] = '/'
                web.config.session_parameters['timeout'] = 600 #24 * 60 * 60, # 24 hours in seconds is default
                web.config.session_parameters['ignore_expiry'] = False
                web.config.session_parameters['ignore_change_ip'] = True
                web.config.session_parameters['secret_key'] = 'fLjUfxqXtfNoIldA0A0J'
                web.config.session_parameters['expired_message'] = 'Session expired.. Please Reload and Login Again.'

               #Initializing sessions with DBStore. Storing in database.
                db = web.database(dbn='mysql', host='127.0.0.1', port=3306, user='bananajones', pw='BananaJones', db='intravires')
                store = web.session.DBStore(db, 'sessions')
                if web.config.get('_session') is None:
                        self.session = web.session.Session(app,store,initializer={'login': 0,'privilege': 0,'username':'anonymous','loggedin':False})
                        web.config._session = self.session
                else:
                        self.session = web.config._session
                print "INSIDE CREATE SESSION -> __init__"
                print self.session
                web.debug(self.session)
                print "DEBUGGING SESSION"

        #CREATING SESSION HOOK
        def session_hook(self):
                web.ctx.session = self.session

        def add_hook(self):
                print "Before adding session hook to app processor"
                #Adding session_hook to its own processor
                app.add_processor(web.loadhook(self.session_hook()))

template_globals ={}
render_partial = web.template.render('webclient/templates/', globals=template_globals)
render =web.template.render('webclient/templates/', globals=template_globals, base='layout')
template_globals.update(render=render_partial)

print "Before CLASS CITATION MAIN.PY"
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
                        form.Password('password', password_required, placeholder = "password", note ="", class_ = "input")
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
                        return render.login()
                else:
                        print "didn't validate baby (REGISTER)"
                        print "note", my_signup['username'].note
                        print my_signup['username'].value
                        print my_signup['password'].value
                        print my_signup['password_again'].value
                        return render.form()

class Login(object):
        def GET(self):
                print "CHECKING FOR COOKIES AT LOGIN!!!!!!!"
                session_cookie = web.cookies().get('chocolate_chip_session')
                print "CHECKING WHAT IS IN VARIABLE SESSION_COOKIE"
                print session_cookie
                if (session_cookie != None):
                        print "COOKIES FOUND MMMM CHOCO CHIP IS DELICIOUS"
                        print web.cookies()
                        return render.myCitations([citation("Johnson v. Johnson", "Johnson v Johnson, 2008 SCC 9 at para 289, [2008] 1 SCR 190, Binnie J.", "4 Feb 2013", "Canadian Case")])
                my_login = login_form()
                return render.login(my_login)

        def POST(self):
                my_login = login_form()
                if my_login.validates():
                        email = my_login['username'].value
                        password = my_login['password'].value
                        session_creation = CreateSession()
                        session_creation.session_hook()
                        print "INSIDE LOGIN PRINTING SESSION"
                        session_creation.add_hook()
                        print "THIS IS WHERE THE COOKIE SHOULD BE CREATED AND CALLED: "
                        print web.cookies()
                        result = handle_user(email, password, "login")
                        if (result == False):
                                print "something unexpected has occured"
                                my_login['username'].note = "Invalid Username/Password Combination"
                                return render.login(my_login)
                        else:
                                print "THIS MEANS YOU GOT VALIDATED BABY!(LOGIN)"
                                return render.myCitations([citation("Johnson v. Johnson", "Johnson v Johnson, 2008 SCC 9 at para 289, [2008] 1 SCR 190, Binnie J.", "4 Feb 2013", "Canadian Case")])
                else:
                        print "didn't validate baby! (LOGIN)"
                        print "note", my_signup['username'].note
                        print my_signup['username'].value
                        print my_signup['password'].value
                        if ((my_signup['username'].value == "") or (my_signup['username'].value == None)):
                                my_login['username'].note = "Please enter a valid username"
                                return render.login(my_login)
                        elif((my_signup['password'].value == "") or (my_signup['password'].value == None)):
                                my_login['password'].note = "Please enter a valid password"
                                return render.login(my_login)
                        else:
                                return render.login()

class Logout:
        def GET(self):


                print web.ctx.session.username
                web.ctx.session.kill()
                return render.form()

def main():
        app.internalerror = web.debugerror
        #string = app.run() 
        #string = app.wsgifunc() 
        #print string

if __name__ == "__main__":

        main()

                    
