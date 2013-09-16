import web 
import json
import globs


urls = (
	'' , 'MyCitations',
	'/sss' , 'MyCitations',
	'/remove', 'removeCitation'

)


'''
	DATABASE
	Table: citation
	COLUMNS:		TYPES:
	citation_id		int(11) PK
	title			varchar(45)
	comments		varchar(45)
	date_created	datetime
	date_modified	timestamp
	citation		varchar(45)
	finished		tinyint(1)
	user_id			int(11) PK

'''

class citation:
	def __init__(self, styleofcause, fullcitation, date, formtype,id):
		self.title = styleofcause
		self.citation = fullcitation
		self.date = date
		self.formtype = formtype
		self.citation_id = id
		self.date_created = "Feb 7, 2013"
		

		
class MyCitations(object):
	def GET(self):
		#return globs.render.myCitations(None)
		if(web.ctx.session.loggedin != True):
			my_login = globs.login_form()
			my_login['username'].note = "Not Logged In!"
			return globs.render.login(my_login)
		else:
			user_name = web.ctx.session.username
			userQuery = globs.db.query("SELECT user_id FROM users WHERE email=$user", vars={'user':user_name})[0]
			user = userQuery.user_id
			#citations = globs.db.query("SELECT * FROM citation WHERE user_id=$user", vars={'user':user})
			citations = globs.db.query("SELECT * FROM citation WHERE user_id=$user ORDER BY date_modified DESC", vars={'user':user})
			print "===============DATE ====================================="
			return globs.render.myCitations(citations)

class removeCitation(object):
	def GET(self):
		data = web.input()
		citationID = data.id
		formtype = data.formtype
		print formtype
		
		if (formtype =='Canadian'):
			globs.db.query("DELETE FROM canada_case WHERE citation_id=$citid", vars={'citid':citationID})		
		if (formtype =='US'):
			globs.db.query("DELETE FROM us_case WHERE citation_id=$citid", vars={'citid':citationID})					
		if (formtype =='UK'):
			globs.db.query("DELETE FROM uk_case WHERE citation_id=$citid", vars={'citid':citationID})				
		if (formtype =='Journal'):
			globs.db.query("DELETE FROM journal_article WHERE citation_id=$citid", vars={'citid':citationID})		
		if (formtype =='Book'):
			globs.db.query("DELETE FROM book WHERE citation_id=$citid", vars={'citid':citationID})		
		if (formtype =='Dictionary'):
			globs.db.query("DELETE FROM dictionary WHERE citation_id=$citid", vars={'citid':citationID})		

		globs.db.query("DELETE FROM citation WHERE citation_id=$citid", vars={'citid':citationID})
		raise web.seeother('/citations', absolute=True)
	'''
	class Instructional(object):
	def GET(self):
		data=  web.input()
		return globs.render.instructional(data.linkLocation)
	<a href "/instructional?linkLocation=blahblahblah">

	'''
		

app_citationHandler = web.application(urls, locals())
