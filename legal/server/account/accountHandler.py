import web 
import json
import globs


urls = (
	'' , 'Account'
)
	
class account:
	def __init__(self, email, occupation, school):
		self.email = email
		self.occupation =occupation
		self.school = school

		
class subscription:
	def __init__(self,  subscript, exp):
		self.subscript = subscript
		self.exp = exp
		
class Account(object):
	def GET(self):
		print "hello"
		##return web.template.frender('webclient/templates/account/accountMain.html')
		a = account("qwert1_2@hotmail.com", "student", "U&#160;of&#160;Toronto", )
		b = subscription("Free Year Subscription", "Sept. 1, 2014")
		return globs.render.accountMain(a,b)
	

app_accountHandler = web.application(urls, locals())