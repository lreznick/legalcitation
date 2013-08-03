
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
def ValidateCanadianCase(f)

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
	
	#========	Style of Cause
	if styleofcause:
		if not Validate(regexStyle, styleofcause):
			GenerateErrorMsg(f,"styleofcause","", ErrorMsgInvalid("style of cause") )	
	else:
		GenerateErrorMsg(f,"styleofcause","", ErrorMsgRequired("style of cause"))
		
		
	#========	Parallel
	if not parallel:
		GenerateErrorMsg(f,"parallel","", ErrorMsgRequired("parallel citation") )
	else:
		if not Validate(regexParallel, parallel):
			GenerateErrorMsg(f,"parallel","", ErrorMsgInvalid("parallel citation") )
	
	
	#========	Year
	if not year:
		GenerateErrorMsg(f,"year","", ErrorMsgRequired("year"))			
	else:
		if not Validate(regexYear, year):
			GenerateErrorMsg(f,"year","", ErrorMsgYear() )
	
	
	#========	Court
	if not court:
		GenerateErrorMsg(f,"court","", ErrorMsgRequired("court"))			
	else:
		c = CleanUpCourt(court) #returns [court, False/True]
		#the regexCourt is found in CleanUpCourt in CanadianCase automatically
		if not c[1]:
			GenerateErrorMsg(f,"court","", ErrorMsgCourt("court"))					
		
	
	#========	Short Form
	if shortform:
		if not Validate(regexStyle, shortform):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"shortform","", ErrorMsgInvalid("short form") )	

	
	#========	Judge ##Note: normally capitalize judge
	if judge:
		if not Validate(regexJudge, judge):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"judge","", ErrorMsgInvalid("Judge") )	

	
	#========	Citing (citingStyle, citing Parallel, citingYear, citingCourt)
	if (citingStyle == citingParallel == citingYear == citingCourt):
		print "exit citing"
		
	else:
		if (citingStyle and  citingParallel and citingYear and citingCourt):
			if not Validate(regexStyle, citingStyle):
				GenerateErrorMsg(f,"citingStyle","", ErrorMsgInvalid("style of cause in the citing option") )
			if not Validate(regexParallel, citingParallel):
				GenerateErrorMsg(f,"citingParallel","", ErrorMsgInvalid("parallel citations in the citing option") )	
			if not Validate(regexYear, citingYear):
				GenerateErrorMsg(f,"citingYear","", ErrorMsgInvalid("year in the citing option") )
			c = CleanUpCourt(citingCourt) #returns [court, False/True]
			#the regexCourt is found in CleanUpCourt in CanadianCase automatically
			if not c[1]:
				GenerateErrorMsg(f,"court","", ErrorMsgCourt("court in the citing option"))	
			#citing = GetCiting(citingStyle, citingParallel, citingYear, citingCourt)
		else:
			if not citingStyle:
				GenerateErrorMsg(f,"citingStyle","", ErrorMsgRequired("style of cause in the citing option"))
			if not citingParallel:
				GenerateErrorMsg(f,"citingParallel","", ErrorMsgRequired("parallel citations in the citing option"))
			if not citingYear:
				GenerateErrorMsg(f,"citingYear","", ErrorMsgRequired("year in the citing option"))
			if not citingCourt:
				GenerateErrorMsg(f,"citingCourt","", ErrorMsgRequired("court in the citing option"))
				
				
	#========	History 
	'''if (citingStyle == citingParallel == citingYear == citingCourt):
		print "exit citing"
		
	else:
		if (citingStyle and  citingParallel and citingYear and citingCourt):
			if not Validate(regexStyle, citingStyle):
				GenerateErrorMsg(f,"citingStyle","", ErrorMsgInvalid("style of cause in the citing option") )
			if not Validate(regexParallel, citingParallel):
				GenerateErrorMsg(f,"citingParallel","", ErrorMsgInvalid("parallel citations in the citing option") )	
			if not Validate(regexYear, citingYear):
				GenerateErrorMsg(f,"citingYear","", ErrorMsgInvalid("year in the citing option") )
			c = CleanUpCourt(citingCourt) #returns [court, False/True]
			#the regexCourt is found in CleanUpCourt in CanadianCase automatically
			if not c[1]:
				GenerateErrorMsg(f,"court","", ErrorMsgCourt("court in the citing option"))	
			#citing = GetCiting(citingStyle, citingParallel, citingYear, citingCourt)
		else:
			if not citingStyle:
				GenerateErrorMsg(f,"citingStyle","", ErrorMsgRequired("style of cause in the citing option"))
			if not citingParallel:
				GenerateErrorMsg(f,"citingParallel","", ErrorMsgRequired("parallel citations in the citing option"))
			if not citingYear:
				GenerateErrorMsg(f,"citingYear","", ErrorMsgRequired("year in the citing option"))
			if not citingCourt:
				GenerateErrorMsg(f,"citingCourt","", ErrorMsgRequired("court in the citing option"))'''
	
	
	#========	pinciteInput
	if pinciteInput:
		if not Validate(regexPinpoint, pinpointInput):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"pinciteInput","", ErrorMsgInvalid("pinpoint range") )	

	
	
	#========	leavetoappeal
	if leaveCourt:
		if not Validate(regexCourt, leaveCourt):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"leaveCourt","", ErrorMsgInvalid("court in the leave to appeal option") )
		if leaveSelection == ("granted" or "refused"):
			if not leaveDocket:
				GenerateErrorMsg(f,"leaveDocket","", ErrorMsgDocketRequired())	
		if not Validate(regexPinpoint, leaveDocket):#use the regexStyle to validate shortform
			GenerateErrorMsg(f,"leaveDocket","", ErrorMsgInvalid("citation or docket number in the leave to appeal option") )	
		#check leaveToAppeal	
		#leaveToAppeal = GetLeaveToAppeal(leaveToAppeal)
	
	#returnString = styleofcause + citations +judge + shortform + leaveToAppeal + history
	#print returnString
	#return returnString #http://localhost:8080/static/img/intropage.jpg			