import unicodedata
import re #regexs
from formcode.CanadianCase import *

b = "<b>"
b1 ="<\\b>"

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

	
def GenerateErrorMsg(formContainer, inputName,input, message, ):
	error = [inputName, input, message]
	formContainer.errors.append(error)
	print "creating new error"
	formContainer.valid = False
	return

def GenerateWarningMsg(formContainer, inputName,input, message, ):
	warning = [inputName, input, message]
	formContainer.warnings.append(warning)
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

def ValidateCanadianParallel(f):
	parallel				= "%s" % (f.form.parallel)
	if not parallel:
		GenerateErrorMsg(f,"parallel","", ErrorMsgRequired("parallel citation") )
	else:
		if not Validate(regexParallel, parallel):
			GenerateErrorMsg(f,"parallel","", ErrorMsgInvalid("parallel citation") )
	return f		
	
def ValidateCanadianCourt(f):
	parallel				= "%s" % (f.form.parallel)
	court					= "%s" % (f.form.court)
	ValidateCanadianParallel(f)
	if f.valid:
		if not court:
			GenerateErrorMsg(f,"court","", ErrorMsgRequired("court"))			
		else:
			c = CleanUpCourt(court,parallel) #returns [court, False/True]
			#the regexCourt is found in CleanUpCourt in CanadianCase automatically
			if (c[1] == False):
				GenerateWarningMsg(f,"court","", ErrorMsgCourt("court"))
				print "\n =========== aaaah not right court!!!!!!"
			else:
				f.form.court = c[0]
				print "form court thing ", f.form.court
	return f
	

	
def ValidateCanadianCase(f):
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
	histories = [[historyParallel1,historyYear1,historyCourt1],
					 [historyParallel2,historyYear2,historyCourt2],
					 [historyParallel3,historyYear3,historyCourt3]]
	
	leaveSelection 	= "%s" % (f.form.leaveToAppeal_selection)
	leaveCourt		 	= "%s" % (f.form.leaveToAppeal_court)
	#leaveCitation  	= "%s" % (form.leaveToAppeal_citation)
	leaveDocket	  	= "%s" % (f.form.leaveToAppeal_docket)
		

	
	
	#========	Style of Cause
	if styleofcause:
		if not Validate(regexStyle, styleofcause):
			GenerateErrorMsg(f,"styleofcause","", ErrorMsgInvalid("style of cause") )	
	else:
		GenerateErrorMsg(f,"styleofcause","", ErrorMsgRequired("style of cause"))
		
		
	#========	Parallel
	ValidateCanadianParallel(f)
	
	
	#========	Year
	if not year:
		GenerateErrorMsg(f,"year","", ErrorMsgRequired("year"))			
	else:
		if not Validate(regexYear, year):
			GenerateErrorMsg(f,"year","", ErrorMsgYear() )
	
	#========	Court	
	ValidateCanadianCourt(f)

		
	
	#========	Short Form
	if shortform:
		if not Validate(regexStyle, shortform):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"shortform","", ErrorMsgInvalid("short form") )	

	
	#========	Judge ##Note: normally capitalize judge
	if judge:
		if not Validate(regexJudge, judge):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"judge","", ErrorMsgInvalid("Judge") )	

	
	#========	Citing (citingStyle, citing Parallel, citingYear, citingCourt)
	if (citingStyle and  citingParallel and citingYear and citingCourt):
		if not Validate(regexStyle, citingStyle):
			GenerateErrorMsg(f,"citing_style","", ErrorMsgInvalid("style of cause in the citing option") )
		if not Validate(regexParallel, citingParallel):
			GenerateErrorMsg(f,"citing_parallel","", ErrorMsgInvalid("parallel citations in the citing option") )	
		if not Validate(regexYear, citingYear):
			GenerateErrorMsg(f,"citing_year","", ErrorMsgInvalid("year in the citing option") )
		c = CleanUpCourt(citingCourt) #returns [court, False/True]
		#the regexCourt is found in CleanUpCourt in CanadianCase automatically
		if not c[1]:
			GenerateErrorMsg(f,"citing_court","", ErrorMsgCourt("court in the citing option"))	
	
	elif (citingStyle or citingParallel or citingYear or citingCourt):
		if not citingStyle:
			GenerateErrorMsg(f,"citing_style","", ErrorMsgRequired("style of cause in the citing option"))
		if not citingParallel:
			GenerateErrorMsg(f,"citing_parallel","", ErrorMsgRequired("parallel citations in the citing option"))
		if not citingYear:
			GenerateErrorMsg(f,"citing_year","", ErrorMsgRequired("year in the citing option"))
		if not citingCourt:
			GenerateErrorMsg(f,"citing_court","", ErrorMsgRequired("court in the citing option"))
				
				
	#========	History 
	#history=[[parallel,year,court],..]
	i =0
	for history in histories:
		if (history[0] and history[1] and history[2]):
			if not Validate(regexParallel, history[0]):
				GenerateErrorMsg(f,"history_parallel"+str(i),"", ErrorMsgInvalid("parallel citations in history option "+str(i)))
			if not Validate(regexYear, history[1]):
				GenerateErrorMsg(f,"history_year"+str(i),"", ErrorMsgInvalid("year in history option "+str(i)))
						
			c = CleanUpCourt(history[2],history[0]) #returns [court, False/True]
			#the regexCourt is found in CleanUpCourt in CanadianCase automatically
			if not c[1]:
				GenerateErrorMsg(f,"historyParallel"+str(i),"", ErrorMsgCourt("court in history option "+str(i)) )	

		elif (history[0] or history[1] or history[2]):
			if not history[0]:
				GenerateErrorMsg(f,"history_parallel"+str(i),"", ErrorMsgRequired("parallel citations in history option "+str(i)))				
			if not history[1]:
				GenerateErrorMsg(f,"history_year"+str(i),"", ErrorMsgRequired("year in history option "+str(i)))
			if not history[2]:
				GenerateErrorMsg(f,"history_court"+str(i),"", ErrorMsgRequired("court in history option "+str(i)))
		i+=1
	
	#========	pinciteInput
	if pinciteInput:
		if not Validate(regexPinpoint, pinciteInput):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"pinciteInput","", ErrorMsgInvalid("pinpoint range") )	

	
	
	#========	leavetoappeal
	if (leaveDocket and not leaveCourt):
		GenerateErrorMsg(f,"leaveToAppeal_court","", "Please fill out the court in the "+b+"leave to appeal" + b1 +" option.")
	if leaveCourt:
		if not Validate(regexCourt, leaveCourt):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"leaveToAppeal_court","", ErrorMsgInvalid("court in the leave to appeal option") )
		if leaveSelection == ("granted" or "refused"):
			if not leaveDocket:
				GenerateErrorMsg(f,"leaveToAppeal_docket","", ErrorMsgDocketRequired())	
		if not Validate(regexPinpoint, leaveDocket):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"leaveDocket","", ErrorMsgInvalid("citation or docket number in the leave to appeal option") )	
		#check leaveToAppeal	
		#leaveToAppeal = GetLeaveToAppeal(leaveToAppeal)
	
	#returnString = styleofcause + citations +judge + shortform + leaveToAppeal + history
	#print returnString
	#return returnString #http://localhost:8080/static/img/intropage.jpg			