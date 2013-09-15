import web
import random
from hashlib import sha1
from passlib.context import CryptContext
#import pwd_context
from web import form
import globs
				
def handle_user(user_email, password, function_type):
	try:
		check_username = globs.db.query("SELECT * FROM users WHERE email=$id", vars={'id':user_email})
		print "CHECK USERNAME!!!!!!!!!!!!"
		print check_username
		if (function_type == "register"):
			if not list(check_username):
				pass_hashobj = globs.PasswordHash(password)
				email_hashobj = globs.PasswordHash(user_email)
				user_ident = globs.db.query ("SELECT MAX(user_id) as highestId from users")[0]

				if (user_ident.highestId == None):
					userID = 0
				else:
					userID = user_ident.highestId + 1

				sequence_id = globs.db.insert('users',  user_id = userID, email = user_email, active = 0, password_hash = pass_hashobj.hashedpw, password_salt = pass_hashobj.salt, create_date = web.SQLLiteral("NOW()"), email_hash = email_hashobj.hashedpw, email_salt = email_hashobj.salt)
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
