import web
import random
from hashlib import sha1
from passlib.context import CryptContext
#import pwd_context
from web import form

#
# create a single global instance for your app...
#

pwd_context = CryptContext(
    # replace this list with the hash(es) you wish to support.
    # this example sets pbkdf2_sha256 as the default,
    # with support for legacy des_crypt hashes.
    schemes=["sha512_crypt"],
    default="sha512_crypt",
	all__vary_rounds = 0.1,
	sha512_crypt__default_rounds = 8000,
	) 
db = web.database(dbn='mysql', host='127.0.0.1', port=3306, user='root', pw='Jeenyus1', db='intravires')
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
		self.salt = "".join(chr(random.randint(33,127)) for x in xrange(60))
		self.hashedpw = pwd_context.encrypt(password_ + self.salt)
		#self.saltedpw = sha1(password_ + self.salt).hexdigest()

	
	def check_password(self, hash2):
		"""checks if the password is correct"""
		#print self.hashedpw == hash2
		#return self.hashedpw == hash2
		return pwd_context.verify(password_+self.salt, self.hashedpw)
        #return self.saltedpw == sha1(password_ + self.salt).hexdigest()									  
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

#for data in results: #members is IterBetter
					#print data.user_id #member is Storage	

def verify_user_hash(unverified_pwd, query_result):
	print "INSIDE VERIFY USER!!!!"
	v_salt = query_result.salt
	v_hash = query_result.hash
	ok = pwd_context.verify(unverified_pwd + v_salt, v_hash)
	print ok
	return ok
					
					
def handle_user(user_email, password, function_type):
	try:
		results = db.query("SELECT * FROM users WHERE email=$id", vars={'id':user_email})[0]
		
		print results
		print results.email
		print results.salt
		print type(results)
		
		if not list(results):
			if (function_type == "register"):
				
				hashobj = PasswordHash(password)
				print "pw", len(hashobj.hashedpw)
				print "\n\n\n", hashobj.hashedpw
				print "\n\n\n"
				print "salt", len(hashobj.salt)
				id = random.randint(33,1270)
				print "id" , id
				sequence_id = db.insert('users',  user_id = id, email = user_email, hash = hashobj.hashedpw, salt = hashobj.salt , create_date = web.SQLLiteral("NOW()"))
				return "hooray"
		else:
			if (function_type == "login"):
				return verify_user_hash(password, results)
				
				
			elif (function_type == "register"):
				print "I occur when the login username is already taken"
				return False
			else:
				print "I shouldn't occur"
				return False
			
	except IndexError:
		print "AN EXCEPTION HAS OCCURED MATHAFUCKA"
		return None
		
	print "RESUUULTS", results

app_signup = web.application(urls, globals())
