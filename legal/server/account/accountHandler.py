import web 
import json
import globs


urls = (
	'' , 'Account'

	
)
	
class Account(object):
	def GET(self):
		print "hello"
		##return web.template.frender('webclient/templates/account/accountMain.html')
		return globs.render.accountMain()
	

app_accountHandler = web.application(urls, locals())