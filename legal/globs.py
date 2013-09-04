import web
import random
from passlib.context import CryptContext

def init():

	
	global db
	global render
	global pwd_context
	
	db = web.database(dbn='mysql', host='127.0.0.1', port=3306, user='root', pw='root', db='intravires')
#	db = web.database(dbn='mysql', host='127.0.0.1', port=3306, user='root', pw='Jeenyus1', db='intravires')
	
	
	template_globals ={ 'str': str }
	render_partial = web.template.render('webclient/templates/', globals=template_globals)
	render = web.template.render('webclient/templates/', globals=template_globals, base='layout')
	template_globals.update(render=render_partial)



	web.config.smtp_server = 'smtp.gmail.com'
	web.config.smtp_port = 587
	web.config.smtp_username = 'Register.IntraVires@gmail.com'
	web.config.smtp_password = 'bananajones'
	web.config.smtp_starttls = True


	
	pwd_context = CryptContext(
    # replace this list with the hash(es) you wish to support.
    # this example sets pbkdf2_sha256 as the default,
    # with support for legacy des_crypt hashes.
    schemes=["sha512_crypt"],
    default="sha512_crypt",
	all__vary_rounds = 0.1,
	sha512_crypt__default_rounds = 8000,
	)

def verify_user_hash(unverified_pwd, query_result):
	#print "INSIDE VERIFY USER!!!!"
	v_salt = query_result.salt
	v_hash = query_result.hash
	ok = pwd_context.verify(unverified_pwd + v_salt, v_hash)
	#print ok
	return ok

class PasswordHash(object):
	def __init__(self, password_):
		self.salt = "".join(chr(random.randint(33,127)) for x in xrange(60))
		self.hashedpw = pwd_context.encrypt(password_ + self.salt)
		
	def check_password(self, hash2):
		"""checks if the password is correct"""
		return pwd_context.verify(password_+self.salt, self.hashedpw)	
