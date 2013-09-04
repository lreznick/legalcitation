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
	def __init__(self, styleofcause, fullcitation, date, formtype):
		self.styleofcause = styleofcause
		self.fullcitation = fullcitation
		self.date = date
		self.formtype = formtype
		

		
class MyCitations(object):
	def GET(self):
		#return globs.render.myCitations(None)
		user_name = web.ctx.session.username
		userQuery = globs.db.query("SELECT user_id FROM users WHERE email=$user", vars={'user':user_name})[0]
		user = userQuery.user_id
		citations = globs.db.query("SELECT * FROM citation WHERE user_id=$user", vars={'user':user})
		return globs.render.myCitations(citations)

class removeCitation(object):
	def GET(self):
		data = web.input()
		citationID = data.id
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
