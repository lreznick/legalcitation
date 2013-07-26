import web
import random
from hashlib import sha1
from web import form

urls = (
  "", "Register",
  "/(.*)", "blog"
)




signin_form = form.Form(form.Textbox('username',
						form.Validator('Unknown username.', lambda x: x in users.keys()),description='Username:'),
                        form.Password('password',description='Password:'),
                        validators = [form.Validator("Username and password didn't match.",
                                      lambda x: users[x.username].check_password(x.password)) ])			
								  
class PasswordHash(object):
    def __init__(self, password_):
        self.salt = "".join(chr(random.randint(33,127)) for x in xrange(64))
        self.saltedpw = sha1(password_ + self.salt).hexdigest()
    def check_password(self, password_):
        """checks if the password is correct"""
        return self.saltedpw == sha1(password_ + self.salt).hexdigest()									  
users = {
    'Kermit' : PasswordHash('frog'), 
    'ET' : PasswordHash('eetee'),  
    'falken' : PasswordHash('joshua') }									  



class hello:
    def GET(self):
        my_signin = signin_form()
        return render.hello(session.user, my_signin)

    def POST(self): 
        my_signin = signin_form() 
        if not my_signin.validates(): 
            return render.hello(session.user, my_signin)
        else:
            session.user = my_signin['username'].value
            return render.hello(session.user, my_signin)




class logout:
	def GET(self):
		session.kill()
		raise web.seeother('/')
		
class reblog:
	def GET(self): 
		raise web.seeother('./about')

class blog:
	def GET(self, path):
		return "blog " + path

app_signup = web.application(urls, globals())