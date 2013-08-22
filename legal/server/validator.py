import unicodedata
import re #regexs
from formcode.CanadianCase import *
from formcode.UKCase import UKCaseClass as Uk
from formcode.USCase import USCaseClass as Us
from formcode.Book import BookClass as Book

regexStyle = re.compile(ur'^[\u0040-\u007E\s\u1D00-\u1D7F\u0020-\u003B\u00A3\u00A5\u00C0-\u00FF]+$', flags = re.UNICODE)
regexParallel = re.compile(ur'^[a-zA-Z0-9-\.,;\'!\^&\(\)\]\[\s\u00E9\u00E8\u00C9\u00C8\u00C1\u00E1\u00F4]+$', flags = re.UNICODE)
regexYear = re.compile(r'^(1[4-9][0-9]{2}|200[0-9]{1}|201[01234]{1})$')
regexDigits = re.compile(r'^\d+$')
regexFindADigit = re.compile(r'\d+')
regexCourt = re.compile(ur'^[a-zA-Z\.,\'\^&\(\)\]\[\s\u00E9\u00E8\u00C9\u00C8\u00C1\u00E1\u00F4\u00EE\u00F4\u00D4\u00E0\u00C2\u00E2]+$', flags = re.UNICODE)
regexJudge = re.compile(ur'^[\wa-zA-Z-\.\',&\s]+$', flags = re.UNICODE)
regexPinpoint = re.compile(r'^[0-9-,\s]*$')
regexAuthors = re.compile(ur'^[\wa-zA-Z0-9-\.,;:\'!\$\^&\(\)<>\s\n]+$', flags = re.UNICODE)
regexPage = re.compile(r'^[0-9-,xivlcdmXIVLCDM\s]*$')
regexCitation = re.compile(r'\w+\s?\d+$', flags = re.UNICODE)
regexAuthors = re.compile(ur'^[\u0040-\u007E\s\u1D00-\u1D7F\u0020-\u003B\u00A3\u00A5\u00C0-\u00FF\n]+$', flags = re.UNICODE)
regexEdition = re.compile(r'^[0-9A-Za-z\s]*$')

b = "<b>"
b1 ="</b>"


'''*********     Generate Message Functions    *********'''

def ErrorMsgInvalid(string):
	return "The " +b+ string+ b1 +" is invalid."
def ErrorMsgRequired(string):
	return "You must enter a " +b+ string +b1 + "."
def ErrorMsgDocketRequired():
	return "You must input a " +b+"citation or docket number" +b1+" in the leave to appeal option."
def ErrorMsgYear():
	return "Please enter a " +b+"year" +b1+ " between 1400 and 2014."
def ErrorMsgCourt(string):
	return "Your "+b+ string + b1 + " input did not match a recognized court, please modify."
def ErrorMsgCiting():
	return "The "+b+"citing option" + b1 + " must either be completed or left empty."
def GenerateErrorMsg(formContainer, inputName, input, message, ):
	error = [inputName, input, message]
	formContainer.errors.append(error)
	print "creating new error"
	formContainer.valid = False
	return
def GenerateWarningMsg(formContainer, inputName,input, message, ):
	warning = [inputName, input, message]
	formContainer.warnings.append(warning)
	return	
	

'''*********     Validate Auxillary Functions    *********'''

def Validate(regex, string):
	if regex.search(string): return True
	return False
def ValidateParallel(f):
	parallel				= "%s" % (f.form.parallel)
	if not parallel:
		GenerateErrorMsg(f,"parallel","", ErrorMsgRequired("parallel citation") )
	else:
		if not Validate(regexParallel, parallel):
			GenerateErrorMsg(f,"parallel","", ErrorMsgInvalid("parallel citation") )
	return f		
def ValidateCanadianCourt(f):
	court					= "%s" % (f.form.court)
	if not court:
		GenerateErrorMsg(f,"court","", ErrorMsgRequired("court"))			
	else:
		c = CleanUpCourt(court) #returns [court, False/True]
		#the regexCourt is found in CleanUpCourt in CanadianCase automatically
		if (c[1] == False):
			GenerateWarningMsg(f,"court","", ErrorMsgCourt("court"))
			print "\n CanadianCase.py did not find a court. Oh well."
		else:
			f.form.court = c[0]
			print "\n CanadianCase.py found a court ", f.form.court
	return f
def ValidateStyleOfCause(f):
	styleofcause		= "%s" % (f.form.styleofcause)
	if styleofcause:
		if not Validate(regexStyle, styleofcause):
			GenerateErrorMsg(f,"styleofcause","", ErrorMsgInvalid("style of cause") )	
	else:
		GenerateErrorMsg(f,"styleofcause","", ErrorMsgRequired("style of cause"))
	return f
def ValidateYear(f):
	year					= "%s" % (f.form.year)
	if not year:
		GenerateErrorMsg(f,"year","", ErrorMsgRequired("year"))			
	else:
		if not Validate(regexYear, year):
			GenerateErrorMsg(f,"year","", ErrorMsgYear() )
	return f
def ValidateShortForm(f):
	shortform 			= "%s" % (f.form.shortform)
	if shortform:
		if not Validate(regexStyle, shortform):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"shortform","", ErrorMsgInvalid("short form") )	
	return f
def ValidateJudge(f):
	judge 				= "%s" % (f.form.judge)
	if judge:
		if not Validate(regexJudge, judge):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"judge","", ErrorMsgInvalid("Judge") )
	return f
def ValidateCiting(f):
	citingStyle 			= "%s" % (f.form.citing_styleofcause)
	citingParallel		= "%s" % (f.form.citing_parallel)
	citingYear 			= "%s" % (f.form.citing_year)
	citingCourt			= "%s" % (f.form.citing_court)
	if (citingStyle and  citingParallel and citingYear and citingCourt):
		if not Validate(regexStyle, citingStyle):
			GenerateErrorMsg(f,"citing_styleofcause","", ErrorMsgInvalid("style of cause in the citing option") )
		if not Validate(regexParallel, citingParallel):
			GenerateErrorMsg(f,"citing_parallel","", ErrorMsgInvalid("parallel citations in the citing option") )	
		if not Validate(regexYear, citingYear):
			GenerateErrorMsg(f,"citing_year","", ErrorMsgInvalid("year in the citing option") )
		c = CleanUpCourt(citingCourt) #returns [court, False/True]
		#the regexCourt is found in CleanUpCourt in CanadianCase automatically
		if not c[1]:
			GenerateWarningMsg(f,"citing_court","", ErrorMsgCourt("court in the citing option"))	
	elif (citingStyle or citingParallel or citingYear or citingCourt):
		if not citingStyle:
			GenerateErrorMsg(f,"citing_style","", ErrorMsgRequired("style of cause in the citing option"))
		if not citingParallel:
			GenerateErrorMsg(f,"citing_parallel","", ErrorMsgRequired("parallel citations in the citing option"))
		if not citingYear:
			GenerateErrorMsg(f,"citing_year","", ErrorMsgRequired("year in the citing option"))
		if not citingCourt:
			GenerateWarningMsg(f,"citing_court","", ErrorMsgRequired("court in the citing option"))
	return f
def ValidateHistory(f):
	historyParallel1	= "%s" % (f.form.history_parallel1) 
	historyYear1		= "%s" % (f.form.history_year1) 
	historyCourt1		= "%s" % (f.form.history_court1)
	historyParallel2	= "%s" % (f.form.history_parallel2) 
	historyYear2		= "%s" % (f.form.history_year2) 
	historyCourt2		= "%s" % (f.form.history_court2)
	historyParallel3	= "%s" % (f.form.history_parallel3) 
	historyYear3		= "%s" % (f.form.history_year3) 
	historyCourt3		= "%s" % (f.form.history_court3)	
	histories = [[historyParallel1,historyYear1,historyCourt1],
					 [historyParallel2,historyYear2,historyCourt2],
					 [historyParallel3,historyYear3,historyCourt3]]
	i =1
	for history in histories:
		if (history[0] and history[1] and history[2]):
			if not Validate(regexParallel, history[0]):
				GenerateErrorMsg(f,"history_parallel"+str(i),"", ErrorMsgInvalid("parallel citations in history option "+str(i)))
			if not Validate(regexYear, history[1]):
				GenerateErrorMsg(f,"history_year"+str(i),"", ErrorMsgInvalid("year in history option "+str(i)))
						
			c = CleanUpCourt(history[2]) #returns [court, False/True]
			#the regexCourt is found in CleanUpCourt in CanadianCase automatically
			if not c[1]:
				GenerateWarningMsg(f,"history_parallel"+str(i),"", ErrorMsgCourt("court in history option "+str(i)) )	
				#GenerateErrorMsg(f,"historyParallel"+str(i),"", ErrorMsgCourt("court in history option "+str(i)) )	

		elif (history[0] or history[1] or history[2]):
			if not history[0]:
				GenerateErrorMsg(f,"history_parallel"+str(i),"", ErrorMsgRequired("parallel citations in history option "+str(i)))				
			if not history[1]:
				GenerateErrorMsg(f,"history_year"+str(i),"", ErrorMsgRequired("year in history option "+str(i)))
			if not history[2]:
				GenerateErrorMsg(f,"history_court"+str(i),"", ErrorMsgRequired("court in history option "+str(i)))
		i+=1
	return f
def ValidateCanadianPincite(f):
	pinciteSelection	= "%s" % (f.form.pincite_selection)
	pinciteRadio		= "%s" % (f.form.pincite_radio)
	pinciteInput		= "%s" % (f.form.pincite_input)	
	pincite 				= [pinciteSelection, pinciteRadio, "page", pinciteInput]
	if pinciteInput:
		if not Validate(regexPinpoint, pinciteInput):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"pincite_input","", ErrorMsgInvalid("pinpoint range") )	
	return f
def ValidateLeaveToAppeal(f):
	leaveSelection 	= "%s" % (f.form.leaveToAppeal_selection)
	leaveCourt		 	= "%s" % (f.form.leaveToAppeal_court)
	leaveDocket	  	= "%s" % (f.form.leaveToAppeal_docket)
	if (leaveDocket and not leaveCourt):
		GenerateErrorMsg(f,"leaveToAppeal_court","", "Please fill out the court in the "+b+"leave to appeal" + b1 +" option.")
	if leaveCourt:
		if not Validate(regexCourt, leaveCourt):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"leaveToAppeal_court","", ErrorMsgInvalid("court in the leave to appeal option") )
		if leaveSelection == ("granted" or "refused"):
			if not leaveDocket:
				GenerateErrorMsg(f,"leaveToAppeal_docket","", ErrorMsgDocketRequired())	
		if not Validate(regexEdition, leaveDocket):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"leaveToAppeal_docket","", ErrorMsgInvalid("citation or docket number in the leave to appeal option") )
	return f
def ValidateCourt(f):
	court					= "%s" % (f.form.court)
	if not court:
		GenerateErrorMsg(f,"court","", ErrorMsgRequired("court"))			
	else:
		if not Validate(regexCourt, court):
			GenerateErrorMsg(f,"court","", ErrorMsgCourt("court") )
			
	return f
def ValidateCourtOption(f):
	court				= "%s" % (f.form.court)
	if (court =="Other"):
		print "other has been selected"
		courtOption				= "%s" % (f.form.court_option)
		if not court:
			GenerateErrorMsg(f,"court","", ErrorMsgRequired("court"))			
		else:
			if not Validate(regexCourt, court):
				GenerateErrorMsg(f,"court","", ErrorMsgCourt("court") )
	return f
def ValidateUKPincite(f):
	if f.form.has_key('pincite_selection'):	
		pinciteSelection = "%s" % (f.form.pincite_selection)
	else:
		pinciteSelection = ""	
	
	#pinciteSelection  = "%s" % (f.form.pincite_selection)
	pinciteInput		= "%s" % (f.form.pincite_input)	
	pincite 				= [pinciteSelection, pinciteInput]
	if pinciteInput:
		if not Validate(regexPinpoint, pinciteInput):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"pincite_input","", ErrorMsgInvalid("pinpoint range") )
	return f
def ValidateUSPincite(f):
	pinciteInput		= "%s" % (f.form.pinpoint)
	if pinciteInput:
		if not Validate(regexPinpoint, pinciteInput):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"pincite_input","", ErrorMsgInvalid("pinpoint range") )
	return f


'''*********     Validate Form Functions    *********'''

def ValidateJournalArticle(f):
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
	if f.form.has_key('pinpoint_page_check'):
		pinpointPageCheck= True
	if f.form.has_key('pinpoint_para_check'):
		pinpointParaCheck= True
	
	#========	Authors
	if authors:
		if not Validate(regexAuthors, authors):
			GenerateErrorMsg(f,"authors","", ErrorMsgInvalid("Author(s)") )	
	else:
		GenerateErrorMsg(f,"authors","", ErrorMsgRequired("Author(s)"))
	
	#========	Title
	if title:
		if not Validate(regexStyle, title):
			GenerateErrorMsg(f,"title","", ErrorMsgInvalid("title") )	
	else:
		GenerateErrorMsg(f,"title","", ErrorMsgRequired("title"))

	
	#========	Citation
	if citation:
		if not Validate(regexCitation, citation):
			GenerateErrorMsg(f,"citation","", ErrorMsgInvalid("Citation") )	
	else:
		GenerateErrorMsg(f,"citation","", ErrorMsgRequired("Citation"))		
		
	#========	Year
	if not year:
		GenerateErrorMsg(f,"year","", ErrorMsgRequired("year"))			
	else:
		if not Validate(regexYear, year):
			GenerateErrorMsg(f,"year","", ErrorMsgYear() )
	
	#========	Pinpoint
	if pinpointPara:
		if not Validate(regexPage, pinpointPara):	
			GenerateErrorMsg(f,"pinpoint_form1","", ErrorMsgInvalid("Pinpoint page(s)") )	
	if pinpointPage:
		if not Validate(regexPage, pinpointPage):	
			GenerateErrorMsg(f,"pinpoint_form2","", ErrorMsgInvalid("Pinpoint page(s)") )	
	if pinpointFoot1:
		if not Validate(regexPage, pinpointFoot1):	
			GenerateErrorMsg(f,"pinpoint_form3","", ErrorMsgInvalid("Pinpoint footnote(s)") )	
	if pinpointFoot2:
		if not Validate(regexPage, pinpointFoot2):	
			GenerateErrorMsg(f,"pinpoint_form4","", ErrorMsgInvalid("Pinpoint page(s)") )	
	
	return f
	
def ValidateBook(f):
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
	if f.form.has_key('pinpoint_page_check'):
		pinpointPageCheck= True
	if f.form.has_key('pinpoint_para_check'):
		pinpointParaCheck= True
	
	#========	Authors
	if authors:
		if not Validate(regexAuthors, authors):
			GenerateErrorMsg(f,"authors","", ErrorMsgInvalid("Author(s)") )	
	else:
		GenerateErrorMsg(f,"authors","", ErrorMsgRequired("Author(s)"))
	
	#========	Title
	if title:
		if not Validate(regexStyle, title):
			GenerateErrorMsg(f,"title","", ErrorMsgInvalid("title") )	
	else:
		GenerateErrorMsg(f,"title","", ErrorMsgRequired("title"))
	
	#========	Place
	if title:
		if not Validate(regexJudge, place):
			GenerateErrorMsg(f,"place","", ErrorMsgInvalid("place") )	
	else:
		GenerateErrorMsg(f,"place","", ErrorMsgRequired("place"))
	
	#========	Publisher
	if title:
		if not Validate(regexJudge, publisher):
			GenerateErrorMsg(f,"publisher","", ErrorMsgInvalid("publisher") )	
	else:
		GenerateErrorMsg(f,"publisher","", ErrorMsgRequired("publisher"))
		
	#========	Year
	if not year:
		GenerateErrorMsg(f,"year","", ErrorMsgRequired("year"))			
	else:
		if (not Validate(regexYear, year)) and not (year == "no year"):
			GenerateErrorMsg(f,"year","", ErrorMsgYear() )
	
	#========	Volume, date consulted, edition
	if volume:
		if not Validate(regexFindADigit, volume):
			GenerateErrorMsg(f,"volume","", ErrorMsgInvalid("volume") )	
	if dateconsulted:
		if CheckFullDate(dateconsulted)[1]=="bad format":
			GenerateErrorMsg(f,"date_consulted","", ErrorMsgInvalid("date consulted") )	
	if edition:
		if not Validate(regexEdition, edition):
			GenerateErrorMsg(f,"edition","", ErrorMsgInvalid("edition") )	
	if extra:
		if not Validate(regexStyle, extra):
			GenerateErrorMsg(f,"extra","", ErrorMsgInvalid("extra") )	
	
	#========	Pinpoint
	if pinpointPara:
		if not Validate(regexPage, pinpointPara):	
			GenerateErrorMsg(f,"pinpoint_form1","", ErrorMsgInvalid("Pinpoint page(s)") )	
	if pinpointPage:
		if not Validate(regexPage, pinpointPage):	
			GenerateErrorMsg(f,"pinpoint_form2","", ErrorMsgInvalid("Pinpoint page(s)") )	
	if pinpointFoot1:
		if not Validate(regexPage, pinpointFoot1):	
			GenerateErrorMsg(f,"pinpoint_form3","", ErrorMsgInvalid("Pinpoint footnote(s)") )	
	if pinpointFoot2:
		if not Validate(regexPage, pinpointFoot2):	
			GenerateErrorMsg(f,"pinpoint_form4","", ErrorMsgInvalid("Pinpoint page(s)") )
	
	return f

def ValidateDictionary(f):
	title				= "%s" % (f.form.dictionary_title)
	edition				= "%s" % (f.form.dictionary_edition)
	word				= "%s" % (f.form.dictionary_word)
	
	#========	Title
	if title:
		if not Validate(regexStyle, title):
			GenerateErrorMsg(f,"dictionary_title","", ErrorMsgInvalid("title") )	
	else:
		GenerateErrorMsg(f,"dictionary_title","", ErrorMsgRequired("title"))
	
	#========	Edition
	if edition:
		if not Validate(regexYear, edition) and (not Validate(regexEdition, edition)):
			GenerateErrorMsg(f,"dictionary_edition","", "The " +b+ "edition"+ b1 +" is invalid. Please enter a year or a number." )	
	else:
		GenerateErrorMsg(f,"dictionary_edition","", ErrorMsgRequired("edition"))

	#========	Keyword
	if word:
		if not Validate(regexJudge, word):
			GenerateErrorMsg(f,"dictionary_word","", ErrorMsgInvalid("word") )
	else:
		GenerateErrorMsg(f,"dictionary_word","", ErrorMsgRequired("word"))
		
	return f

def ValidateCanadianCase(f):
	'''styleofcause		= "%s" % (f.form.styleofcause)
	parallel				= "%s" % (f.form.parallel)
	year					= "%s" % (f.form.year)
	court					= "%s" % (f.form.court)
	shortform 			= "%s" % (f.form.shortform)
	judge 				= "%s" % (f.form.judge)
	
	pinciteSelection  = "%s" % (f.form.pincite_selection)#
	pinciteRadio		= "%s" % (f.form.pincite_radio)
	pinciteInput		= "%s" % (f.form.pincite_input)	
	pincite 				= [pinciteSelection, pinciteRadio, "page", pinciteInput]
	
	citingStyle 			= "%s" % (f.form.citing_styleofcause)
	citingParallel		= "%s" % (f.form.citing_parallel)
	citingYear 			= "%s" % (f.form.citing_year)
	citingCourt			= "%s" % (f.form.citing_court)
	
	historyParallel1	= "%s" % (f.form.history_parallel1) 
	historyYear1		= "%s" % (f.form.history_year1) 
	historyCourt1		= "%s" % (f.form.history_court1)
	historyParallel2	= "%s" % (f.form.history_parallel2) 
	historyYear2		= "%s" % (f.form.history_year2) 
	historyCourt2		= "%s" % (f.form.history_court2)
	historyParallel3	= "%s" % (f.form.history_parallel3) 
	historyYear3		= "%s" % (f.form.history_year3) 
	historyCourt3		= "%s" % (f.form.history_court3)	
	histories = [[historyParallel1,historyYear1,historyCourt1],
					 [historyParallel2,historyYear2,historyCourt2],
					 [historyParallel3,historyYear3,historyCourt3]]
	
	leaveSelection 	= "%s" % (f.form.leaveToAppeal_selection)
	leaveCourt		 	= "%s" % (f.form.leaveToAppeal_court)
	leaveDocket	  	= "%s" % (f.form.leaveToAppeal_docket)'''
	ValidateStyleOfCause(f)
	ValidateParallel(f)
	ValidateYear(f)
	ValidateCanadianCourt(f)
	ValidateShortForm(f)
	ValidateCanadianPincite(f)
	ValidateJudge(f)	
	ValidateCiting(f)
	ValidateHistory(f)
	ValidateLeaveToAppeal(f)

def ValidateUKCase(f):
	'''styleofcause		= "%s" % (f.form.styleofcause)
	parallel				= "%s" % (f.form.parallel)
	year					= "%s" % (f.form.year)
	court					= "%s" % (f.form.court)
	shortform 			= "%s" % (f.form.shortform)
	pinciteSelection  = "%s" % (f.form.pincite_selection)
	pinciteInput		= "%s" % (f.form.pincite_input)	
	pincite 				= [pinciteSelection, pinciteInput]
	judge 				= "%s" % (f.form.judge)
	citingStyle 			= "%s" % (f.form.citing_styleofcause)
	citingParallel		= "%s" % (f.form.citing_parallel)
	citingYear 			= "%s" % (f.form.citing_year)
	citingCourt			= "%s" % (f.form.citing_court)
	#historyaff1  		= "%s" % (f.form.history_aff1)
	historyParallel1	= "%s" % (f.form.history_parallel1) 
	historyYear1		= "%s" % (f.form.history_year1) 
	historyCourt1		= "%s" % (f.form.history_court1)
	#historyaff2  		= "%s" % (f.form.history_aff2)
	historyParallel2	= "%s" % (f.form.history_parallel2) 
	historyYear2		= "%s" % (f.form.history_year2) 
	historyCourt2		= "%s" % (f.form.history_court2)
	#historyaff3 		= "%s" % (f.form.history_aff3)
	historyParallel3	= "%s" % (f.form.history_parallel3) 
	historyYear3		= "%s" % (f.form.history_year3) 
	historyCourt3		= "%s" % (f.form.history_court3)	
	histories = [[historyaff1, historyParallel1,historyYear1,historyCourt1]
					,[historyaff2, historyParallel2,historyYear2,historyCourt2]
					,[historyaff3, historyParallel3,historyYear3,historyCourt3]]
	
	leaveSelection 	= "%s" % (f.form.leaveToAppeal_selection)
	leaveCourt		 	= "%s" % (f.form.leaveToAppeal_court)
	leaveDocket	  	= "%s" % (f.form.leaveToAppeal_docket)'''
	ValidateStyleOfCause(f)
	ValidateParallel(f)
	ValidateYear(f)
	ValidateCourt(f)
	ValidateCourtOption(f)
	ValidateShortForm(f)
	ValidateUKPincite(f)
	ValidateJudge(f)	
	ValidateCiting(f)
	ValidateHistory(f)
	ValidateLeaveToAppeal(f)

def ValidateUSCase(f):
	'''styleofcause		= "%s" % (f.form.styleofcause)
	parallel				= "%s" % (f.form.parallel)
	year					= "%s" % (f.form.year)
	court				= "%s" % (f.form.court)
	shortform 		= "%s" % (f.form.shortform)
	pinciteInput		= "%s" % (f.form.pinpoint)	
	judge 				= "%s" % (f.form.judge)
	citingStyle 			= "%s" % (f.form.citing_styleofcause)
	citingParallel			= "%s" % (f.form.citing_parallel)
	citingYear 				= "%s" % (f.form.citing_year)
	citingCourt			= "%s" % (f.form.citing_court)
	#historyaff1  			= "%s" % (f.form.history_aff1)
	historyParallel1		= "%s" % (f.form.history_parallel1) 
	historyYear1			= "%s" % (f.form.history_year1) 
	historyCourt1		= "%s" % (f.form.history_court1)
	#historyaff2  			= "%s" % (f.form.history_aff2)
	historyParallel2		= "%s" % (f.form.history_parallel2) 
	historyYear2			= "%s" % (f.form.history_year2) 
	historyCourt2		= "%s" % (f.form.history_court2)
	#historyaff3 			= "%s" % (f.form.history_aff3)
	historyParallel3		= "%s" % (f.form.history_parallel3) 
	historyYear3			= "%s" % (f.form.history_year3) 
	historyCourt3		= "%s" % (f.form.history_court3)	
	histories = [[historyaff1, historyParallel1,historyYear1,historyCourt1]
					,[historyaff2, historyParallel2,historyYear2,historyCourt2]
					,[historyaff3, historyParallel3,historyYear3,historyCourt3]]
	leaveSelection 	= "%s" % (f.form.leaveToAppeal_selection)
	leaveCourt		 	= "%s" % (f.form.leaveToAppeal_court)
	leaveDocket	  	= "%s" % (f.form.leaveToAppeal_docket)'''
	ValidateStyleOfCause(f)
	ValidateParallel(f)
	ValidateYear(f)
	ValidateCourt(f)
	ValidateShortForm(f)
	ValidateUSPincite(f)
	ValidateJudge(f)	
	ValidateCiting(f)
	ValidateHistory(f)
	ValidateLeaveToAppeal(f)
	
			