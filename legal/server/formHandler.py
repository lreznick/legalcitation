import web
import json
from formcode.CanadianCase import *
from formcode.webGrabber import *

urls = (
	'/parallel', 'Formparallel',
	'/CanadianCase', 'Canada',
	'/canlii', 'Canlii'
)
class FormContainer:
	def __init__(self, type, form):
		self.type 	= type
		self.valid  	= False
		self.errors 	= []  
		self.form 	= form
		

def validator(array):
	return 
	
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

def CreateFormClass(type,form):
	f = FormContainer(type,form)
	return f
	
def GenerateErrorMsg(formContainer, inputName,input, message, ):
	error = [inputName, input, message]
	formContainer.errors.append(error)
	return
	
def Validate(regex, string):
	if regex.search(string): return True
	return False
	
regexStyle = re.compile(ur'^[\wa-zA-Z0-9\.,;:\'!\$\^&\(\)<>\s]+$', flags = re.UNICODE)
regexParallel = re.compile(ur'^[a-zA-Z0-9\.,;\'!\^&\(\)\]\[\s\u00E9\u00E8\u00C9\u00C8\u00C1\u00E1\u00F4]+$', flags = re.UNICODE)
regexYear = re.compile(r'^(1[4-9][0-9]{2}|200[0-9]{1}|201[01234]{1})$')
regexDigits = re.compile(r'^\d+$')
regexCourt = re.compile(ur'^[a-zA-Z\.,\'\^&\(\)\]\[\s\u00E9\u00E8\u00C9\u00C8\u00C1\u00E1\u00F4\u00EE\u00F4\u00D4\u00E0\u00C2\u00E2]+$', flags = re.UNICODE)
regexJudge = re.compile(ur'^[\wa-zA-Z\.,&\s]+$', flags = re.UNICODE)
regexPinpoint = re.compile(r'^[0-9-,\s]*$')
	
def CanadianCase(form):	
	print "\n\n\n\n\n\n\n\n\n\ ======in Canadian"
	
	b = "<b>"
	b1 ="<\\b>"
	
	f = CreateFormClass("canadian case", form)
	styleofcause		= "%s" % (f.form.styleofcause)
	parallel				= "%s" % (f.form.parallel)
	year					= "%s" % (f.form.year)
	court					= "%s" % (f.form.court)
	shortform 			= "%s" % (f.form.shortform)
	judge 				= "%s" % (f.form.judge)
	citingStyle 			= "%s" % (f.form.citing_styleofcause)
	citingParallel		= "%s" % (f.form.citing_parallel)
	citingYear 			= "%s" % (f.form.citing_year)
	citingCourt			= "%s" % (f.form.citing_court)
	
	pinciteSelection  = "%s" % (f.form.pincite_selection)
	pinciteRadio		= "%s" % (f.form.pincite_radio)
	pinciteInput		= "%s" % (f.form.pincite_input)	
	pincite 				= [pinciteSelection, pinciteRadio, "page", pinciteInput]	 #deal with	
	#history 				= "%s" % (form.history) #list of lists
	leaveSelection 	= "%s" % (f.form.leaveToAppeal_selection)
	leaveCourt		 	= "%s" % (f.form.leaveToAppeal_court)
	#leaveCitation  	= "%s" % (form.leaveToAppeal_citation)
	leaveDocket	  	= "%s" % (f.form.leaveToAppeal_docket)
		
	citations ="" 
	leaveToAppeal =""
	history =""
	
	#ValidateCanadianCase(f)
	
	#[granted, courtappeal, citation/or docketnumber, input of docket]
	#leaveToAppeal = "%s" % (form.leaveToAppeal) #deal with
	
	
	#========	Style of Cause
	if styleofcause:
		if Validate(regexStyle, styleofcause):
			styleofcause = GetStyleOfCause(styleofcause)
		else:
			GenerateErrorMsg(f,"styleofcause","", "The " +b+ "style of cause" + b1 +" is invalid.")
			
	else:
		GenerateErrorMsg(f,"styleofcause","", "You must enter a " +b+ "style of cause." +b1)
		
	#======== Citations
	if not (parallel and year and court):
		if not parallel:
			GenerateErrorMsg(f,"parallel","", "You must enter a " +b+ "Parallel Citation."+b1)
		if not year:
			GenerateErrorMsg(f,"year","", "You must enter a " +b+ "year."+b1)			
		if not court:
			GenerateErrorMsg(f,"court","", "You must enter a" +b+ " court."+b1)						
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