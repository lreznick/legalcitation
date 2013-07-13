
'''http://docs.python.org/2/library/json.html
Encode the data in script tags.
Deserialize with js $.parseJSON or something like that.
Easiest way.
Then you have it in the runtime and can go from there. 
$.post('ajax/test.html', function(data) {
  $('.result').html(data);
});



$.post('ajax/test.html', {my:'data'},function(data) {
  $('.result').html(data);
});
'''

from server.webGrabber import *
from server.testyface import test123
from server.CanadianCase import *
#from webclient.appServer import *


#As of now, the main program that runs everything. When the user requests the website, it grabs the html file
# and opens it up. 
#	Website opened at http://localhost:8080
#It then waits for an input from the user and then grabs that information. then calls webgrabber which grabs links
import web
import json
#from legal.server.webGrabber import Connect2Web




# mapping. Each post request contains what to do.   
urls = (
    '/formInput', 'Index',	
    '/' ,  'Index',
	'/about', 'About',
	'/form/parallel', 'Formparallel',
	'/form/CanadianCase', 'Canada'

)

app = web.application(urls, globals())
#render = web.template.render('webclient/templates/', base = 'layout')


template_globals ={}
render_partial = web.template.render('webclient/templates/', globals=template_globals)
render =web.template.render('webclient/templates/', globals=template_globals, base='layout')
template_globals.update(render=render_partial)


#Then you will be able to call $:render.any_template() in templates.


testcase1 = "<i>Adams v Thompson, Berwick, Pratt, & Partners </i>(1987), 39 DLR (4th) 314 (available on CanLII) (CA) (McLachlin JA)."
testcase2 = "<i>Dunsmuir v. New Brunswick</i>, 2008 SCC 9 at para 132, [2008] 1 SCR 190 (Binnie J) [<i>Dunsmuir</i>], aff'ing 2006 NBCA 27."
testcase3 = "<i>R v Sparrow</i>, [1990] 1 SCR 1075 at 1103, 70 DLR (4th) 385, Dickson CJC [<i>Sparrow</i>] citing <i>Pasco v Canadian National Railway Co</i>, [1986] 1 CNLR 35 at 37 (available on CanLII) (BCSC)."
testcase4 = "<i>Reference re Securities Act</i>, 2011 SCC 66, [2011] 3 SCR 837."

class Canada(object):
	def POST(self):
		form = web.input()
		CanadianCase(form)
		print "in canada"
		return

	
class Formparallel(object):
	def GET(self):
		return
	def POST(self):
		form = web.input()
		parallel = "%s" % (form.parallel)
		if not parallel: 
			return render.index()
		else:
			print "in formparallel"
			date = PullDate(parallel)
			court = CheckForCourt(parallel)
			data = [ {'date':date, 'court':court}]
			data_string =json.dumps(data)
			print 'JSON:', data_string
			return data_string


class Index(object):
	def GET(self):
		print "hello"
		return render.index() #hello_form is the name of the html
		
		# For index.html
		
		#form = web.input (name = "Nobody")
		#greeting = "hello, %s" % form.name
		#return render.index(greeting=greeting)
	def POST(self):
		form = web.input()
        #form.validates()
		
		print "here" 
		#webURL = "%s" % (form.styleofcause)
		webURL = "%s" % (form.testing)
		if not webURL: 
			print "nothing to see here boys"
			return render.index()
		elif webURL == "1":
			print "1"
			test123(webURL)
			return testcase1
		elif webURL == "2":
			return testcase2
		elif webURL == "3":
			return testcase3
		elif webURL == "4":
			return testcase4
		else:
			print "WebURL:", webURL
			print "Self: " , self
			#s = form.value['textfield']
		return webURL

class About(object):
	def GET(self):
		return render.aboutUs();
	
	def POST(self):
		return render.aboutUs();

''' '''
#return render.index(greeting=webURL)
		#print "input here:", greeting
		#webGrabber.Connect2Web(webURL)		
		#return render.index(greeting = greeting)
		
#if __name__ == "__main__":
  #  app.run()
def CanadianCase(form):
	return
'''styleofcause		= "%s" % (form.styleofcause)
	parallel				= "%s" % (form.parallel)
	year					= "%s" % (form.year)
	court					= "%s" % (form.court)
	shortform 			= "%s" % (form.shortform)
	#pincite = [pinpoint/cite, reporter, type (para or page), input]
	pinCite 				= "%s" % (form.pincite)
	judge = "%s" % (form.judge)
		#[ [parallel,year, court, affirming/reversing], [..]]
	history = "%s" % (form.history) #list of lists
	#citing = "%s" % (form.citing)
	citingStyle ="%s" % (form.citing-styleofcause)
	citingParallel ="%s" % (form.citing-parallel)
	citingYear ="%s" % (form.citing-year)
	citingCourt="%s" % (form.citing-court)
	
	#[granted, courtappeal, citation/or docketnumber, input of docket]
	leaveToAppeal = "%s" % (form.leaveToAppeal) #deal with
	subnom = "%s" % (form.subnom)
	
	if not styleofcause:
		return #with error
	else:
		#checkStyleOfCause(styleofcause)
		styleofcause = GetStyleOfCause(styleofcause)
	
	if not parallel or year or court:
		return #with error
	else:
		#checkCitations(parallel, court, year, pincite)
		if not pincite:
			pincite = False
		else:
			if (pincite[0] == "Cite To"):
				citeTo = GetCiteTo(pincite)				
		citations = GetCitations(parallel, court, year, pincite)
	
	if not (citingStyle and citingParallel and citingYear and citingCourt):
		return #with error
	else:
		#checkCiting(citingStyle, citingParallel, citingYear, citingCourt)
		citing = GetCiting(citingStyle, citingParallel, citingYear, citingCourt)
	
	#check history -> see if its all completed
	#validatehistory
	if history:
		history = HistoryGetCitations(history)
	
	if shortform:
		shortform = GetShortForm(shortform)
		
	if judge:
		judge = GetJudge(judge)
		
	
	 if leaveToAppeal:
		#check leaveToAppeal	
		leaveToAppeal = GetLeaveToAppeal(leaveToAppeal)
	if subnom:
		subnom = GetSubnom(subnom)
		
	returnstring = styleofcause
	return "yo" '''
	

def main():
	#webURL = "http://www.canlii.org/en/ca/scc/doc/1997/1997canlii400/1997canlii400.html"
	#Connect2Web(webURL)
	string = app.run() #
	print "I am here"
	print string
  
if __name__ == "__main__":
	main()