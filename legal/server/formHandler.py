import web
import json
from formcode.CanadianCase import *
from formcode.webGrabber import *
from validator import *

urls = (
	'/parallel', 'FormParallel',
	'/court', 'FormCourt',
	'/CanadianCase', 'Canada',
	'/canlii', 'Canlii'
)

class FormContainer:
	def __init__(self, type, form):
		self.type 		= type
		self.valid  		= True
		self.errors 		= []  
		#error = [inputName, input, message]
		self.warnings 	= []  
		self.form 		= form

def CreateFormClass(type,form):
	f = FormContainer(type,form)
	return f		
	
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

class FormCourt(object):
	def POST(self):
		form = web.input()
		f = CreateFormClass("canadian case", form)	
		f = ValidateCanadianCourt(f)
		data = [ {'court':f.form.court, 'valid':f.valid, 'errors':f.errors}]
		data_string =json.dumps(data)
		print 'JSON:', data_string
		return data_string

class FormParallel(object):
	def POST(self):
		form = web.input()
		f = CreateFormClass("canadian case", form)	
		
		parallel = "%s" % (form.parallel)
		if not parallel: 
			return render.index()
		else:
			print "in formparallel"
			
			f= ValidateCanadianParallel(f)
			if (f.valid ==True):
				date = PullDate(parallel)
				court = CheckForCourt(parallel)
				reporters = AutoPCPinpoint(parallel)
			#print "reporters "
			#print  reporters[0]
			#print " something "
			#print reporters[1]
			data = [ {'date':date, 'court':court, 'reporters':reporters}]
			data_string =json.dumps(data)
			#print 'JSON:', data_string
			return data_string



def CanadianCase(form):	
	print "\n\n======in Canadian"
	f = CreateFormClass("canadian case", form)	
	print form

	styleofcause		= "%s" % (f.form.styleofcause)
	parallel				= "%s" % (f.form.parallel)
	year					= "%s" % (f.form.year)
	court					= "%s" % (f.form.court)
	shortform 			= "%s" % (f.form.shortform)
	judge 				= "%s" % (f.form.judge)
	#dissenting			= "%s" % (f.form.judge_dissenting)
	
	citingStyle 			= "%s" % (f.form.citing_styleofcause)
	citingParallel		= "%s" % (f.form.citing_parallel)
	citingYear 			= "%s" % (f.form.citing_year)
	citingCourt			= "%s" % (f.form.citing_court)
	
	pinciteSelection  = "%s" % (f.form.pincite_selection)#
	pinciteRadio		= "%s" % (f.form.pincite_radio)
	pinciteInput		= "%s" % (f.form.pincite_input)	
	pincite 				= [pinciteSelection, pinciteRadio, "page", pinciteInput]	 #deal with	
	
	historyParallel1	= "%s" % (f.form.history_parallel1) 
	historyYear1		= "%s" % (f.form.history_year1) 
	historyCourt1		= "%s" % (f.form.history_court1)
	historyParallel2	= "%s" % (f.form.history_parallel2) 
	historyYear2		= "%s" % (f.form.history_year2) 
	historyCourt2		= "%s" % (f.form.history_court2)
	historyParallel3	= "%s" % (f.form.history_parallel3) 
	historyYear3		= "%s" % (f.form.history_year3) 
	historyCourt3		= "%s" % (f.form.history_court3)	
	histories = [[historyParallel1,historyYear1,historyCourt1]
					,[historyParallel2,historyYear2,historyCourt2]
					,[historyParallel3,historyYear3,historyCourt3]]
	
	leaveSelection 	= "%s" % (f.form.leaveToAppeal_selection)
	leaveCourt		 	= "%s" % (f.form.leaveToAppeal_court)
	#leaveCitation  	= "%s" % (form.leaveToAppeal_citation)
	leaveDocket	  	= "%s" % (f.form.leaveToAppeal_docket)
		
	citations ="" 
	leaveToAppeal =""
	history =""
	
	ValidateCanadianCase(f)
	if f.valid:
		#[granted, courtappeal, citation/or docketnumber, input of docket]
		#leaveToAppeal = "%s" % (form.leaveToAppeal) #deal with
		
		
		#========	Style of Cause
		if styleofcause:
				styleofcause = GetStyleOfCause(styleofcause)
			
		#======== Citations
		if not (parallel and year and court):				
			return
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
			judge = GetJudge(judge,dissenting)	

		if leaveToAppeal:
			#check leaveToAppeal	
			leaveToAppeal = GetLeaveToAppeal(leaveToAppeal)
		
		returnString = styleofcause + citations +judge + shortform + leaveToAppeal + history
		print returnString
	else:
		returnString =""
		
	data = [ {'message':returnString, 'valid':f.valid, 'errors':f.errors}]
	data_string =json.dumps(data)
	print 'JSON:', data_string
	#return returnString #http://localhost:8080/static/img/intropage.jpg			
	return data_string

app_formHandler = web.application(urls, locals())