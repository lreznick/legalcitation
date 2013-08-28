import web 
import json
import globs


urls = (
	'' , 'MyCitations'

)

class citation:
	def __init__(self, styleofcause, fullcitation, date, formtype):
		self.styleofcause = styleofcause
		self.fullcitation = fullcitation
		self.date = date
		self.formtype = formtype
		
class MyCitations(object):
	def GET(self):
		#user_name = web.ctx.session.username
		a = citation("Johnson v. Johnson", "Johnson v Johnson, 2008 SCC 9 at para 289, [2008] 1 SCR 190, Binnie J.", "4 Feb 2013", "Canadian Case")
		citationList =[a,a,a,a,a]
		#citationList = getCitations()
		return globs.render.myCitations(citationList)
	

app_citationHandler = web.application(urls, locals())