import web
import json
from formcode.CanadianCase import *
urls = (
	'/parallel', 'Formparallel',
	'/CanadianCase', 'Canada',
	'/canlii', 'Canlii'
)

<<<<<<< HEAD
def validator(array):
	return 
	
=======

>>>>>>> 36252128df9cd3be1e01926159581c1602c89bb0
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
	return returnString #http://localhost:8080/static/img/intropage.jpg			

app_formHandler = web.application(urls, locals())