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
)




def getCitations():
	userID = "banana jones"
	#return citations = db.query("SELECT * FROM citations WHERE user_id=$id", vars={'id':userID})[0]
	print "hello"




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
		remember_me = "no"
		print results
		print results.email
		print results.salt
		print type(results)
		
		if (function_type == "register"):
			if not list(results):
			
				
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
				print "I occur when the login username is already taken"
				return False
		elif (function_type == "login"):
		
				verified = verify_user_hash(password, results)
				print "ABOUT TO CHECK FOR COOKIES"
				if ((web.cookies().get('username') != None) and (verified==True)):
					print "COOKIES FOUND"
					return verified
				else:
					
					if verified:
				
						if(remember_me == "yes"):
							print "ABOUT TO CREATE 6MONTH COOKIE"
							web.setcookie('username', user_email, expires=2592000, domain=None, secure=False)
							#web.setcookie('password', results.hash, expires=2592000, domain='localhost', secure=False)
						else:
							print "ABOUT TO CREATE COOKIE!!!!!!!"
							web.setcookie('username', user_email, expires=180, domain=None, secure=False)
							#pass_cookie = web.setcookie('password', results.hash, expires=180, domain='localhost', secure=False)				
							print web.cookies()
							#print pass_cookie
					return verified
				
			
		else:
			print "I shouldn't occur"
			return False
			
	except IndexError:
		print "AN EXCEPTION HAS OCCURED MATHAFUCKA"
		return None
		
	print "RESUUULTS", results

app_signup = web.application(urls, globals())
