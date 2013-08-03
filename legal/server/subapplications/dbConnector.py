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
db = web.database(dbn='mysql', host='127.0.0.1', port=3306, user='root', pw='root', db='intravires')
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
		self.saltedpw = pwd_context.encrypt(password_ + self.salt)
		#self.saltedpw = sha1(password_ + self.salt).hexdigest()

	def check_password(self, password_):
		"""checks if the password is correct"""
		return pwd_context.verify(password_+self.salt, self.saltedpw)
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
					
def insert_new_user(user_email, password):
			try:
				results = db.query("SELECT * FROM users WHERE email=$id", vars={'id':user_email})
				
				#print list(results)
				if not list(results):
					stringhash = '$6$rounds=8522$vPs3OVkyt6T2hcAL$B677TcZH9/R2afqQReyQ6oCfzsuq4y1ZxnZQuU68DSGxFGtmMX1SUP50PQVdWn85FpsOdyJ4gXVBkIs0/AuDw1'
					hashobj = PasswordHash(password)
					#print "hash"
					print "pw", len(hashobj.saltedpw)
					print "\n\n\n", hashobj.saltedpw
					print "\n\n\n"
					print "salt", len(hashobj.salt)
					id = random.randint(33,1270)
					print "id" , id
					#user1 = dict(user_email = email, user_ID = id , user_hash = hash.salt)
					sequence_id = db.insert('users',  user_id = id, email = user_email, hash = hashobj.saltedpw, salt = hashobj.salt , create_date = web.SQLLiteral("NOW()"))
					#sequence_id = db.insert('users',  user_id = "$id", email ="$user_email" ,vars = locals(), _test=True)#, joindate=web.SQLLiteral("NOW()") vars = {)
					return "hooray"
				else:
					
					return False
			except IndexError:
				return None
				
			print "RESUUULTS", results
			password = my_signup['password'].value

app_signup = web.application(urls, globals())