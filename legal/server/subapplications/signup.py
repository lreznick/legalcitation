import web
import random
from hashlib import sha1
from web import form

urls = (
  "", "reblog",
  "/(.*)", "blog"
)



signup_form = form.Form(form.Textbox('username',
						form.Validator('Username already exists.', lambda x: x not in users.keys()), description='Username:'),
						form.Password('password', description='Password:'),
						form.Password('password_again', description='Repeat your password:'),
						validators = [form.Validator("Passwords didn't match.", lambda i: i.password == i.password_again)])

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
			users[username] = PasswordHash(password)
			raise web.seeother('/')



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

app_signup = web.application(urls, locals())