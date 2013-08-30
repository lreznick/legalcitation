import web
import random
from hashlib import sha1
from passlib.context import CryptContext
#import pwd_context
from web import form
import globs


#
# create a single global instance for your app...
#

'''
pwd_context = CryptContext(
    # replace this list with the hash(es) you wish to support.
    # this example sets pbkdf2_sha256 as the default,
    # with support for legacy des_crypt hashes.
    schemes=["sha512_crypt"],
    default="sha512_crypt",
	all__vary_rounds = 0.1,
	sha512_crypt__default_rounds = 8000,
	)
''' 
#db = web.database(dbn='mysql', host='127.0.0.1', port=3306, user='root', pw='root', db='intravires')

urls = (
  "", "Register",
)




def getCitations():
	userID = "banana jones"
	#return citations = db.query("SELECT * FROM citations WHERE user_id=$id", vars={'id':userID})[0]
	#print "hello"




signin_form = form.Form(form.Textbox('username',
						form.Validator('Unknown username.', lambda x: x in users.keys()),description='Username:'),
                        form.Password('password',description='Password:'),
                        validators = [form.Validator("Username and password didn't match.",
                                      lambda x: users[x.username].check_password(x.password)) ])			
'''								  
class PasswordHash(object):
	def __init__(self, password_):
		self.salt = "".join(chr(random.randint(33,127)) for x in xrange(60))
		self.hashedpw = globs.pwd_context.encrypt(password_ + self.salt)

	def check_password(self, hash2):
		"""checks if the password is correct"""
		return globs.pwd_context.verify(password_+self.salt, self.hashedpw)								  
'''




#for data in results: #members is IterBetter
					#print data.user_id #member is Storage	
'''
def verify_user_hash(unverified_pwd, query_result):
	#print "INSIDE VERIFY USER!!!!"
	v_salt = query_result.salt
	v_hash = query_result.hash
	ok = globs.pwd_context.verify(unverified_pwd + v_salt, v_hash)
	#print ok
	return ok
'''					
					
def handle_user(user_email, password, function_type):
	try:
		check_username = globs.db.query("SELECT * FROM users WHERE email=$id", vars={'id':user_email})
		print "CHECK USERNAME!!!!!!!!!!!!"
		print check_username
		if (function_type == "register"):
			if not list(check_username):
				hashobj = globs.PasswordHash(password)
				user_ident = globs.db.query ("SELECT MAX(user_id) as highestId from users")[0]

				if (user_ident.highestId == None):
					userID = 0
				else:
					userID = user_ident.highestId + 1

				sequence_id = globs.db.insert('users',  user_id = userID, email = user_email, hash = hashobj.hashedpw, salt = hashobj.salt , create_date = web.SQLLiteral("NOW()"))
			else:
				print "I occur when the login username is already taken"
				return False
		elif (function_type == "login"):
			results = check_username[0]
			verified = globs.verify_user_hash(password, results)
			return verified

			
			
		else:
			print "I shouldn't occur"
			return False
	except IndexError:
		web.debug("AN SQL EXCEPTION HAS OCCURED")
		return False		
	

app_signup = web.application(urls, globals())
