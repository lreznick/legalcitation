
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
	'/form/CanadianCase', 'Canada',
	'/form/canlii', 'Canlii'

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


class Canlii(object):
	def POST(self):
		form = web.input()
		url = "%s" % (form.url)
		out =Connect2Web(url)
	
		data = [ {'output':out[0], 'styleofcause':out[1][0], 'parallel':out[1][1], 'court':out[1][2]}]
		data_string =json.dumps(data)
		return data_string

class Canada(object):
	def POST(self):
		return CanadianCase(web.input())

	
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
			reporters = AutoPCPinpoint(parallel)
			print "reporters "
			print  reporters[0]
			print " something "
			print reporters[1]
			data = [ {'date':date, 'court':court, 'reporters':reporters}]
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
	print "in Canadian"
	styleofcause		= "%s" % (form.styleofcause)
	parallel				= "%s" % (form.parallel)
	year					= "%s" % (form.year)
	court					= "%s" % (form.court)
	shortform 			= "%s" % (form.shortform)
	judge 				= "%s" % (form.judge)
	citingStyle 			= "%s" % (form.citing_styleofcause)
	citingParallel		= "%s" % (form.citing_parallel)
	citingYear 			= "%s" % (form.citing_year)
	citingCourt			= "%s" % (form.citing_court)
	
	pinciteSelection  = "%s" % (form.pincite_selection)
	pinciteRadio		= "%s" % (form.pincite_radio)
	pinciteInput		= "%s" % (form.pincite_input)	
	pincite 				= [pinciteSelection, pinciteRadio, "page", pinciteInput]	 #deal with	
	#history 				= "%s" % (form.history) #list of lists
	leaveSelection 	= "%s" % (form.leaveToAppeal_selection)
	leaveCourt		 	= "%s" % (form.leaveToAppeal_court)
	#leaveCitation  	= "%s" % (form.leaveToAppeal_citation)
	leaveDocket	  	= "%s" % (form.leaveToAppeal_docket)
		
	citations ="" 
	leaveToAppeal =""
	history =""
	#[granted, courtappeal, citation/or docketnumber, input of docket]
	#leaveToAppeal = "%s" % (form.leaveToAppeal) #deal with
	
	
	#========	Style of Cause
	if styleofcause:
		#if checkStyleOfCause(styleofcause)
		print "set style" + styleofcause
		styleofcause = GetStyleOfCause(styleofcause)
	
	#======== Citations
	if not (parallel and year and court):
		print "exit 1"
		return #with error
	else:
		#checkCitations(parallel, court, year, pincite)
		if pinciteSelection:
			# do dropdown
			if (pinciteSelection =="citeTo"):
				print "exit cite-to"
				return			
				#citeTo = GetCiteTo(pincite)				
		citations = GetCitations(parallel, court, year, pincite)
	
	#======== Citations
	if (citingStyle == citingParallel == citingYear == citingCourt):
		print "exit citing"
		
	else:
		if (citingStyle and  citingParallel and citingYear and citingCourt):
			#checkCiting(citingStyle, citingParallel, citingYear, citingCourt)
			citing = GetCiting(citingStyle, citingParallel, citingYear, citingCourt)
		else:
			print "didnt fully fill out citing"
	
	#check history -> see if its all completed
	#validatehistory
	#if history:
		#history = GetHistory(history)
	
	if shortform:
		shortform = GetShortForm(shortform)
		
	if judge:
		judge = GetJudge(judge)	

	if leaveToAppeal:
		#check leaveToAppeal	
		leaveToAppeal = GetLeaveToAppeal(leaveToAppeal)
	
	returnString = styleofcause + citations +judge + shortform + leaveToAppeal + history
	print returnString
	return returnString
'''
	
		
	returnstring = styleofcause
	return "yo" '''
	
'''print form

	
	return '''
def main():
	#webURL = "http://www.canlii.org/en/ca/scc/doc/1997/1997canlii400/1997canlii400.html"
	#Connect2Web(webURL)
	string = app.run() #
	print "I am here"
	print string
  
if __name__ == "__main__":
	main()