
def ErrorMsgInvalid(string):
	return "The " +b+ string+ b1 +" is invalid."
def ErrorMsgRequired(string):
	return "You must enter a " +b+ string +b1 + "."
def ErrorMsgYear():
	return "Please enter a " +b+"year" +b1+ "between 1400 and 2014."
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
		#Check courts here!!!!
		#if not Validate(regexCourt, court):
			#GenerateErrorMsg(f,"court","", "You must enter a" +b+ " court."+b1)			
		
	
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