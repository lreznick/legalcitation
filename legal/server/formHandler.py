import web
import json
from formcode.CanadianCase import *
from formcode.Journal import *
from formcode.Book import BookClass as Book
from formcode.UKCase import UKCaseClass as Uk
from formcode.USCase import USCaseClass as Us
from formcode.webGrabber import *
from validator import *


urls = (
	'/CanadaCase', 'Canada',
	'/canlii', 'Canlii',
	'/parallel', 'Parallel',
	'/court', 'Court',
	
	'/UKCaseParallel', 'UKParallel',
	'/UKCase', 'UK',
	'/USCaseParallel', 'USParallel',
	'/USCase', 'US',
	'/Journal', 'JournalArticle',
	'/Dictionary', 'Dictionary',
	
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
	
	
	
	
class UKParallel(object):
	def POST(self):
		form = web.input()
		
		f = CreateFormClass("UKCase", form)	
		parallel = "%s" % (form.parallel)
		print "in ukparallel"
		f= ValidateParallel(f)
		
		if (f.valid ==True):
			date = Uk.PullDate(parallel)
			reporters = Uk.AutoPCPinpoint(parallel)
		data = [ {'date':date, 'reporters':reporters}]
		data_string =json.dumps(data)
		return data_string	

class USParallel(object):
	def POST(self):
		form = web.input()
		
		f = CreateFormClass("USCase", form)	
		parallel = "%s" % (form.parallel)
		print "in usparallel"
		f= ValidateParallel(f)
		
		if (f.valid ==True):
			date = Us.PullDate(parallel)
		data = [ {'date':date, 'reporters':reporters}]
		data_string =json.dumps(data)
		return data_string	

class UK(object):
	def POST(self):
		return UKFormatter(web.input())
	
class US(object):
	def POST(self):
		return USFormatter(web.input())
		
class JournalArticle(object):
	def POST(self):
		form = web.input()
		return JournalArticleFormatter(form)
			
class Canlii(object):
	def POST(self):
		form = web.input()
		url = "%s" % (form.url)
		out =Connect2Web(url)
		reporters = out[2]
		data = [ {'output':out[0], 'styleofcause':out[1][0], 'parallel':out[1][1], 'year':out[1][2], 'court':out[1][3], 'reporters':reporters}]
		data_string =json.dumps(data)
		return data_string

class Canada(object):
	def POST(self):
		return CanadianCase(web.input())

class Court(object):
	def POST(self):
		form = web.input()
		f = CreateFormClass("canadian case", form)	
		print ("in court")
		f = ValidateCanadianCourt(f)
		data = [ {'court':f.form.court, 'valid':f.valid, 'errors':f.errors}]
		data_string =json.dumps(data)
		print 'JSON:', data_string
		return data_string
		
class Dictionary(object):
	def POST(self):
		form = web.input()
		f = CreateFormClass("dictionary", form)	
		data = [ {'message':'poops!!!!', 'valid':f.valid, 'errors':f.errors}]
		data_string =json.dumps(data)
		print 'JSON:', data_string
		return data_string		

class Parallel(object):
	def POST(self):
		form = web.input()
		f = CreateFormClass("canadian case", form)	
		
		parallel = "%s" % (form.parallel)
		if not parallel: 
			return render.index()
		else:
			print "in formparallel"
			
			f= ValidateParallel(f)
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


def JournalArticleFormatter(form):	
	f= CreateFormClass("JournalArticle", form)
	print "\n \n\n \n"
	print form
	authors				= "%s" % (f.form.authors)
	title					= "%s" % (f.form.title)
	citation				= "%s" % (f.form.citation)
	year					= "%s" % (f.form.year)
	pinpointSelection = "%s" % (f.form.pinpoint_selection)
	pinpointPara		= "%s" % (f.form.pinpoint_form1)
	pinpointParaCheck= False
	pinpointPage		= "%s" % (f.form.pinpoint_form2)
	pinpointPageCheck= False
	pinpointFoot1		= "%s" % (f.form.pinpoint_form3)
	pinpointFoot2		= "%s" % (f.form.pinpoint_form4)
	pinpointList =[] #list of three
	if f.form.has_key('pinpoint_para_check'):
		pinpointPageCheck= True
	if f.form.has_key('pinpoint_para_check'):
		pinpointParaCheck= True
	
	ValidateJournalArticle(f)	
	returnString = ""
	if f.valid:
		if (pinpointSelection =="None"):
			input2 =False
			input3 = False
		elif(pinpointSelection =="pinpoint_para"):
			input2 = pinpointPara
			input3 = pinpointParaCheck
		elif(pinpointSelection =="pinpoint_page"):
			input2 = pinpointPage
			input3 = pinpointPageCheck
		elif(pinpointSelection =="pinpoint_foot"):
			input2 = pinpointFoot1
			input3 = pinpointFoot2
		pinpointList=[pinpointSelection,input2,input3]
		
		newAuthors = FormatAuthors(authors)
		newTitle =FormatTitle(title)
		newCitation = FormatVolumeEtc(citation,year,pinpointList)
		returnString= newAuthors + newTitle + newCitation[0]
		
	data = [ {'message':returnString, 'valid':f.valid, 'errors':f.errors}]
	data_string =json.dumps(data)
	print 'JSON:', data_string
	return data_string

def BookFormatter(form):	
	print "\n\n======in Book"
	f= CreateFormClass("Book", form)
	print "\n\n"
	print form
	authors				= "%s" % (f.form.authors)
	editors				= "%s" % (f.form.editors)
	verbatim				= "%s" % (f.form.verbatim)
	
	title					= "%s" % (f.form.title)
	place				= "%s" % (f.form.place)
	noplace 				= "%s" % (f.form.no_place)
	if noplace: place = "no place"
	
	publisher				= "%s" % (f.form.publisher)
	nopublisher				= "%s" % (f.form.no_publisher)
	if nopublisher: publisher = "no publisher"
	
	year				= "%s" % (f.form.year)
	noyear				= "%s" % (f.form.no_year)
	if noyear: year = "no year"
	
	volume					= "%s" % (f.form.volume)
	edition					= "%s" % (f.form.edition)
	dateconsulted 			= "%s" % (f.form.date_consulted)
	extra					= "%s" % (f.form.extra)
	
	pinpointSelection = "%s" % (f.form.pinpoint_selection)
	pinpointPara		= "%s" % (f.form.pinpoint_form1)
	pinpointParaCheck= False
	pinpointPage		= "%s" % (f.form.pinpoint_form2)
	pinpointPageCheck= False
	pinpointFoot1		= "%s" % (f.form.pinpoint_form3)
	pinpointFoot2		= "%s" % (f.form.pinpoint_form4)
	pinpointList =[] #list of three
	if f.form.has_key('pinpoint_para_check'):
		pinpointPageCheck= True
	if f.form.has_key('pinpoint_para_check'):
		pinpointParaCheck= True
	
	ValidateBook(f)	
	if f.valid:
		if (pinpointSelection =="None"):
			input2 =False
			input3 = False
		elif(pinpointSelection =="pinpoint_para"):
			input2 = pinpointPara
			input3 = pinpointParaCheck
		elif(pinpointSelection =="pinpoint_page"):
			input2 = pinpointPage
			input3 = pinpointPageCheck
		elif(pinpointSelection =="pinpoint_foot"):
			input2 = pinpointFoot1
			input3 = pinpointFoot2
		pinpointList=[pinpointSelection,input2,input3]
		
		newauthor = Book.FormatAuthors(authors, verbatim, editors)
		newtitle = Book.FormatTitle(title, volume, edition, dateconsulted, extra)[0]
		newpublish = Book.FormatPublication(place, publisher, year)
		newpinpoint = Book.FormatPinpoint(pinpointList)
		returnString  = newauthor+newtitle+newpublish+newpinpoint
	else:
		returnString =""
		
	data = [ {'message':returnString, 'valid':f.valid, 'errors':f.errors}]
	data_string =json.dumps(data)
	print 'JSON:', data_string
	return data_string
	
def DictionaryFormatter(form):	
	print "\n\n======in Dictionary"
	f= CreateFormClass("Dictionary", form)
	print "\n\n"
	print form
	title				= "%s" % (f.form.dictionary_title)
	edition				= "%s" % (f.form.dictionary_edition)
	keyword				= "%s" % (f.form.dictionary_word)
	
	ValidateDictionary(f)
	if f.valid:
		returnString = Book.CiteDictionary(title, edition, keyword)
	else:
		returnString =""
		
	data = [ {'message':returnString, 'valid':f.valid, 'errors':f.errors}]
	data_string =json.dumps(data)
	print 'JSON:', data_string
	return data_string

def CanadianCase(form):	
	print "\n\n======in Canadian"
	f = CreateFormClass("canadian case", form)	

	styleofcause		= "%s" % (f.form.styleofcause)
	parallel				= "%s" % (f.form.parallel)
	year					= "%s" % (f.form.year)
	court					= "%s" % (f.form.court)
	shortform 			= "%s" % (f.form.shortform)
	judge 				= "%s" % (f.form.judge)
	dissenting = False
	if f.form.has_key('judge_dissenting'):
		dissenting = True
	
	citingStyle 			= "%s" % (f.form.citing_styleofcause)
	citingParallel		= "%s" % (f.form.citing_parallel)
	citingYear 			= "%s" % (f.form.citing_year)
	citingCourt			= "%s" % (f.form.citing_court)
	
	pinciteSelection  = "%s" % (f.form.pincite_selection)
	pinciteRadio		= "%s" % (f.form.pincite_radio)
	pinciteInput		= "%s" % (f.form.pincite_input)	
	pincite 				= [pinciteSelection, pinciteRadio, pinciteInput]	
	
	
	historyaff1  		= "%s" % (f.form.history_aff1)
	historyParallel1	= "%s" % (f.form.history_parallel1) 
	historyYear1		= "%s" % (f.form.history_year1) 
	historyCourt1		= "%s" % (f.form.history_court1)
	
	historyaff2  		= "%s" % (f.form.history_aff2)
	historyParallel2	= "%s" % (f.form.history_parallel2) 
	historyYear2		= "%s" % (f.form.history_year2) 
	historyCourt2		= "%s" % (f.form.history_court2)
	
	historyaff3 		= "%s" % (f.form.history_aff3)
	historyParallel3	= "%s" % (f.form.history_parallel3) 
	historyYear3		= "%s" % (f.form.history_year3) 
	historyCourt3		= "%s" % (f.form.history_court3)	
	
	histories = [[historyaff1, historyParallel1,historyYear1,historyCourt1]
					,[historyaff2, historyParallel2,historyYear2,historyCourt2]
					,[historyaff3, historyParallel3,historyYear3,historyCourt3]]
	
	leaveSelection 	= "%s" % (f.form.leaveToAppeal_selection)
	leaveCourt		 	= "%s" % (f.form.leaveToAppeal_court)
	leaveDocket	  	= "%s" % (f.form.leaveToAppeal_docket)
	
	leaveArray = [leaveSelection, leaveCourt, leaveDocket]
		
	citations ="" 
	citing = ""
	leaveToAppeal =""
	history =""
	
	ValidateCanadianCase(f)
	if f.valid:
	
		#========	Style of Cause
		if styleofcause:
				styleofcause = GetStyleOfCause(styleofcause)
			
		#======== Citations
		if not (parallel and year and court):				
			return
		else:
			#checkCitations(parallel, court, year, pincite)				
			citations = GetCitations(parallel, court, year, pincite)
		
		#======== Citing
		if (citingStyle and  citingParallel and citingYear and citingCourt):
			citing = GetCiting(citingStyle, citingParallel, citingYear, citingCourt)
		
		#======== History
		if (histories[0][1] and histories [0][2] and histories [0][3]):
			pass
		else:
			histories[0][0] = "none"
		if (histories[1][1] and histories [1][2] and histories [1][3]):
			pass
		else:
			histories[1][0] = "none"
		if (histories[2][1] and histories [2][2] and histories [2][3]):
			pass
		else:
			histories[2][0] = "none"
		if (histories[0][0]) or (histories[1][0]) or (histories[2][0]):
			history = GetHistory(histories)
		
		#======== Shortform
		if shortform or pincite[0]=="citeTo":
			shortform = GetShortForm(shortform, pincite, parallel)
		
		#======== Judge	
		if judge:
			judge = GetJudge(judge,dissenting)	
		
		#======== Leave To Appeal
		if re.search("Requested", CleanUp(array[0]), re.I) or re.search("AsofRight", CleanUp(array[0]), re.I):
			if leaveCourt:
				leaveToAppeal = GetLeaveToAppeal(leaveArray)
		if re.search("Refused", CleanUp(array[0]), re.I) or re.search("Granted", CleanUp(array[0]), re.I):
			if leaveCourt and leaveDocket:
				leaveToAppeal = GetLeaveToAppeal(leaveArray)
		
		returnString = styleofcause + citations +judge + citing + leaveToAppeal + history + shortform+'.'
		print returnString
	else:
		returnString =""
		
	data = [ {'message':returnString, 'valid':f.valid, 'errors':f.errors}]
	data_string =json.dumps(data)
	print 'JSON:', data_string
	#return returnString #http://localhost:8080/static/img/intropage.jpg			
	return data_string

	
def UKFormatter(form):	
	print "\n\n======in UK"
	print form
	f = CreateFormClass("UKCase", form)	
	

	styleofcause		= "%s" % (f.form.styleofcause)
	parallel				= "%s" % (f.form.parallel)
	year					= "%s" % (f.form.year)
	court				= "%s" % (f.form.court)
	courtOpt			= "%s" % (f.form.court_option)
	print "court " + court
	shortform 		= "%s" % (f.form.shortform)
	
	pinciteSelection = "%s" % (f.form.pincite_selection)
	pinciteInput		= "%s" % (f.form.pincite_input)	
	pincite 				= [pinciteSelection, pinciteInput]
	
	judge 				= "%s" % (f.form.judge)
	dissenting = False
	if f.form.has_key('judge_dissenting'):
		dissenting = True
	
	citingStyle 			= "%s" % (f.form.citing_styleofcause)
	citingParallel			= "%s" % (f.form.citing_parallel)
	citingYear 				= "%s" % (f.form.citing_year)
	citingCourt			= "%s" % (f.form.citing_court)
	citingCourtOpt		= "%s" % (f.form.citing_court_option)
	
	historyaff1  			= "%s" % (f.form.history_aff1)
	historyParallel1		= "%s" % (f.form.history_parallel1) 
	historyYear1			= "%s" % (f.form.history_year1) 
	historyCourt1		= "%s" % (f.form.history_court1)
	
	historyaff2  			= "%s" % (f.form.history_aff2)
	historyParallel2		= "%s" % (f.form.history_parallel2) 
	historyYear2			= "%s" % (f.form.history_year2) 
	historyCourt2		= "%s" % (f.form.history_court2)
	
	historyaff3 			= "%s" % (f.form.history_aff3)
	historyParallel3		= "%s" % (f.form.history_parallel3) 
	historyYear3			= "%s" % (f.form.history_year3) 
	historyCourt3		= "%s" % (f.form.history_court3)	
	
	histories = [[historyaff1, historyParallel1,historyYear1,historyCourt1]
					,[historyaff2, historyParallel2,historyYear2,historyCourt2]
					,[historyaff3, historyParallel3,historyYear3,historyCourt3]]
	
	leaveSelection 	= "%s" % (f.form.leaveToAppeal_selection)
	leaveCourt		 	= "%s" % (f.form.leaveToAppeal_court)
	leaveDocket	  	= "%s" % (f.form.leaveToAppeal_docket)
	
	leaveArray = [leaveSelection, leaveCourt, leaveDocket]
		
	citations ="" 
	citing = ""
	leaveToAppeal =""
	history =""
	
	ValidateUKCase(f)
	if f.valid:
	
		#========	Style of Cause
		styleofcause = Uk.GetStyleOfCause(styleofcause)
			
		#======== Citations			
		print "/n " + court
		citations = Uk.GetCitations(parallel, court, year, pincite)
		
		#======== Citing
		if (citingStyle and  citingParallel and citingYear and citingCourt):
			citing = Uk.GetCiting(citingStyle, citingParallel, citingYear, citingCourt)
		
		#======== History
		if (histories[0][1] and histories [0][2] and histories [0][3]):
			pass
		else:
			histories[0][0] = "none"
		if (histories[1][1] and histories [1][2] and histories [1][3]):
			pass
		else:
			histories[1][0] = "none"
		if (histories[2][1] and histories [2][2] and histories [2][3]):
			pass
		else:
			histories[2][0] = "none"
		if (histories[0][0]) or (histories[1][0]) or (histories[2][0]):
			history = Uk.GetHistory(histories)
		
		#======== Shortform
		if shortform or pincite[0]=="citeTo":
			shortform = Uk.GetShortForm(shortform)
		
		#======== Judge	
		if judge:
			judge = Uk.GetJudge(judge,dissenting)	
		
		#======== Leave To Appeal
		if re.search("Requested", CleanUp(array[0]), re.I) or re.search("AsofRight", CleanUp(array[0]), re.I):
			if leaveCourt:
				leaveToAppeal = GetLeaveToAppeal(leaveArray)
		if re.search("Refused", CleanUp(array[0]), re.I) or re.search("Granted", CleanUp(array[0]), re.I):
			if leaveCourt and leaveDocket:
				leaveToAppeal = GetLeaveToAppeal(leaveArray)
		
		returnString = styleofcause + citations +judge + citing + leaveToAppeal + history + shortform+'.'
		print returnString
	else:
		returnString =""
		
	data = [ {'message':returnString, 'valid':f.valid, 'errors':f.errors}]
	data_string =json.dumps(data)
	print 'JSON:', data_string
	print returnString	
	return data_string
	

def USFormatter(form):	
	print "\n\n======in US"
	print form
	f = CreateFormClass("USCase", form)	
	

	styleofcause		= "%s" % (f.form.styleofcause)
	parallel				= "%s" % (f.form.parallel)
	year					= "%s" % (f.form.year)
	court				= "%s" % (f.form.court)
	shortform 		= "%s" % (f.form.shortform)
	
	pinciteInput		= "%s" % (f.form.pinpoint)	
	
	judge 				= "%s" % (f.form.judge)
	dissenting = False
	if f.form.has_key('judge_dissenting'):
		dissenting = True
	
	citingStyle 			= "%s" % (f.form.citing_styleofcause)
	citingParallel			= "%s" % (f.form.citing_parallel)
	citingYear 				= "%s" % (f.form.citing_year)
	citingCourt			= "%s" % (f.form.citing_court)
	
	historyaff1  			= "%s" % (f.form.history_aff1)
	historyParallel1		= "%s" % (f.form.history_parallel1) 
	historyYear1			= "%s" % (f.form.history_year1) 
	historyCourt1		= "%s" % (f.form.history_court1)
	
	historyaff2  			= "%s" % (f.form.history_aff2)
	historyParallel2		= "%s" % (f.form.history_parallel2) 
	historyYear2			= "%s" % (f.form.history_year2) 
	historyCourt2		= "%s" % (f.form.history_court2)
	
	historyaff3 			= "%s" % (f.form.history_aff3)
	historyParallel3		= "%s" % (f.form.history_parallel3) 
	historyYear3			= "%s" % (f.form.history_year3) 
	historyCourt3		= "%s" % (f.form.history_court3)	
	
	histories = [[historyaff1, historyParallel1,historyYear1,historyCourt1]
					,[historyaff2, historyParallel2,historyYear2,historyCourt2]
					,[historyaff3, historyParallel3,historyYear3,historyCourt3]]
	
	leaveSelection 	= "%s" % (f.form.leaveToAppeal_selection)
	leaveCourt		 	= "%s" % (f.form.leaveToAppeal_court)
	leaveDocket	  	= "%s" % (f.form.leaveToAppeal_docket)
	leaveArray = [leaveSelection, leaveCourt, leaveDocket]
		
	citations ="" 
	citing = ""
	leaveToAppeal =""
	history =""
	
	ValidateUSCase(f)
	if f.valid:
	
		#========	Style of Cause
		styleofcause = Us.GetStyleOfCause(styleofcause)
			
		#======== Citations			
		print "/n " + court
		citations = Us.GetCitations(parallel, court, year, pincite)
		
		#======== Citing
		if (citingStyle and  citingParallel and citingYear and citingCourt):
			citing = Us.GetCiting(citingStyle, citingParallel, citingYear, citingCourt)
		
		#======== History
		if (histories[0][1] and histories [0][2] and histories [0][3]):
			pass
		else:
			histories[0][0] = "none"
		if (histories[1][1] and histories [1][2] and histories [1][3]):
			pass
		else:
			histories[1][0] = "none"
		if (histories[2][1] and histories [2][2] and histories [2][3]):
			pass
		else:
			histories[2][0] = "none"
		if (histories[0][0]) or (histories[1][0]) or (histories[2][0]):
			history = Us.GetHistory(histories)
		
		#======== Shortform
		if shortform:
			shortform = Us.GetShortForm(shortform)
		
		#======== Judge	
		if judge:
			judge = Us.GetJudge(judge,dissenting)	
		
		#======== Leave To Appeal
		if re.search("Requested", CleanUp(array[0]), re.I) or re.search("AsofRight", CleanUp(array[0]), re.I):
			if leaveCourt:
				leaveToAppeal = GetLeaveToAppeal(leaveArray)
		if re.search("Refused", CleanUp(array[0]), re.I) or re.search("Granted", CleanUp(array[0]), re.I):
			if leaveCourt and leaveDocket:
				leaveToAppeal = GetLeaveToAppeal(leaveArray)
		
		returnString = styleofcause + citations +judge + citing + leaveToAppeal + history + shortform+'.'
		print returnString
	else:
		returnString =""
		
	data = [ {'message':returnString, 'valid':f.valid, 'errors':f.errors}]
	data_string =json.dumps(data)
	print 'JSON:', data_string
	print returnString	
	return data_string
	

app_formHandler = web.application(urls, locals())