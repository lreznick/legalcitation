import web
import json
import globs




urls = (
	'/CanadaCase', 'Canada',
	'/USCase', 'US',
	'/UKCase', 'UK',
	'/Journal', 'JournalArticle',
	'/Dictionary', 'Dictionary',
	'/Book', 'Book'

	
)

	
	
class Canada(object):
	def POST(self):
		print "IN CANADA"
		form = web.input()
		dissenting = False
		if form.has_key('judge_dissenting'):
			dissenting = True
		
		input_dict = {
			'styleofcause'		: "%s" % (form.styleofcause),
			'parallelcitation'	: "%s" % (form.parallel),
			'year'					: "%s" % (form.year),
			'court'					: "%s" % (form.court),
			'shortform' 			: "%s" % (form.shortform),
			'judge'					: "%s" % (form.judge),
			'judgeDissenting' : dissenting,
		
			'citingStyle' 			: "%s" % (form.citing_styleofcause),
			'citingParallel'		: "%s" % (form.citing_parallel),
			'citingYear' 			: "%s" % (form.citing_year),
			'citingCourt'			: "%s" % (form.citing_court),
			
			'pinciteSelection'  : "%s" % (form.pincite_selection),
			'pinciteReporter'	: "%s" % (form.pincite_radio),
			'pinciteParapageNumber'		: "%s" % (form.pincite_input),
			
			'historyaff1'  		: "%s" % (form.history_aff1),
			'historyParallel1'	: "%s" % (form.history_parallel1),
			'historyYear1'		: "%s" % (form.history_year1), 
			'historyCourt1'		: "%s" % (form.history_court1),
			
			'historyaff2'  		: "%s" % (form.history_aff2),
			'historyParallel2'	: "%s" % (form.history_parallel2),
			'historyYear2'		: "%s" % (form.history_year2), 
			'historyCourt2'		: "%s" % (form.history_court2),
			
			'historyaff3' 			: "%s" % (form.history_aff3),
			'historyParallel3'	: "%s" % (form.history_parallel3),
			'historyYear3'		: "%s" % (form.history_year3),
			'historyCourt3'		: "%s" % (form.history_court3),	
			
			'leaveSelection' 	: "%s" % (form.leaveToAppeal_selection),
			'leaveCourt'		 	: "%s" % (form.leaveToAppeal_court),
			'leaveDocket'	  	: "%s" % (form.leaveToAppeal_docket)
		}
		
		globs.db.insert('canadian_case',  where = web.db.sqlwhere(input_dict), _test=True)
		print globs.db.insert('canadian_case',  where = web.db.sqlwhere(input_dict), _test=True)

		
class US(object):
	def POST(self):
		form = web.input()
		
		dissenting = False
		if form.has_key('judge_dissenting'):
			dissenting = True		
		input_dict = {
			'styleofcause'		: "%s" % (form.styleofcause),
			'parallelcitation'	: "%s" % (form.parallel),
			'year'					: "%s" % (form.year),
			'court'					: "%s" % (form.court),
			'shortform' 			: "%s" % (form.shortform),
			'judge'					: "%s" % (form.judge),
			'judgeDissenting' : dissenting,
		
			'citingStyle' 			: "%s" % (form.citing_styleofcause),
			'citingParallel'		: "%s" % (form.citing_parallel),
			'citingYear' 			: "%s" % (form.citing_year),
			'citingCourt'			: "%s" % (form.citing_court),
			
			'pinciteSelection'  : "%s" % (form.pincite_selection),
			'pinciteReporter'	: "%s" % (form.pincite_radio),
			'pinciteInput'		: "%s" % (f.form.pinpoint)	,
			
			'historyaff1'  		: "%s" % (form.history_aff1),
			'historyParallel1'	: "%s" % (form.history_parallel1),
			'historyYear1'		: "%s" % (form.history_year1), 
			'historyCourt1'		: "%s" % (form.history_court1),
			
			'historyaff2'  		: "%s" % (form.history_aff2),
			'historyParallel2'	: "%s" % (form.history_parallel2),
			'historyYear2'		: "%s" % (form.history_year2), 
			'historyCourt2'		: "%s" % (form.history_court2),
			
			'historyaff3' 			: "%s" % (form.history_aff3),
			'historyParallel3'	: "%s" % (form.history_parallel3),
			'historyYear3'		: "%s" % (form.history_year3),
			'historyCourt3'		: "%s" % (form.history_court3),	
			
			'leaveSelection' 	: "%s" % (form.leaveToAppeal_selection),
			'leaveCourt'		 	: "%s" % (form.leaveToAppeal_court),
			'leaveDocket'	  	: "%s" % (form.leaveToAppeal_docket)
		}
		globs.db.insert('us_case',  where = web.db.sqlwhere(input_dict), _test=True)


		
class Uk(object):
	def POST(self):
		form = web.input()
		dissenting = False
		if form.has_key('judge_dissenting'):
			dissenting = True
		
		input_dict = {
			'styleofcause'		: "%s" % (form.styleofcause),
			'parallelcitation'	: "%s" % (form.parallel),
			'year'					: "%s" % (form.year),
			'court'					: "%s" % (form.court),
			'shortform' 			: "%s" % (form.shortform),
			'judge'					: "%s" % (form.judge),
			'judgeDissenting' : dissenting,
		
			'citingStyle' 			: "%s" % (form.citing_styleofcause),
			'citingParallel'		: "%s" % (form.citing_parallel),
			'citingYear' 			: "%s" % (form.citing_year),
			'citingCourt'			: "%s" % (form.citing_court),
			
			'pinciteSelection'  : "%s" % (form.pincite_selection),
			'pinciteReporter'	: "%s" % (form.pincite_radio),
			'pinciteParapageNumber'		: "%s" % (form.pincite_input),
			
			'historyaff1'  		: "%s" % (form.history_aff1),
			'historyParallel1'	: "%s" % (form.history_parallel1),
			'historyYear1'		: "%s" % (form.history_year1), 
			'historyCourt1'		: "%s" % (form.history_court1),
			
			'historyaff2'  		: "%s" % (form.history_aff2),
			'historyParallel2'	: "%s" % (form.history_parallel2),
			'historyYear2'		: "%s" % (form.history_year2), 
			'historyCourt2'		: "%s" % (form.history_court2),
			
			'historyaff3' 			: "%s" % (form.history_aff3),
			'historyParallel3'	: "%s" % (form.history_parallel3),
			'historyYear3'		: "%s" % (form.history_year3),
			'historyCourt3'		: "%s" % (form.history_court3),	
			
			'leaveSelection' 	: "%s" % (form.leaveToAppeal_selection),
			'leaveCourt'		 	: "%s" % (form.leaveToAppeal_court),
			'leaveDocket'	  	: "%s" % (form.leaveToAppeal_docket)
		}
		
		globs.db.insert('uk_case',  where = web.db.sqlwhere(input_dict), _test=True)
		print globs.db.insert('canadian_case',  where = web.db.sqlwhere(input_dict), _test=True)

class JournalArticle(object):	
	def POST(self):
		form = web.input()
		pinpointParaCheck= False
		pinpointPageCheck= False
		if f.form.has_key('pinpoint_para_check'):
			pinpointPageCheck= True
		if f.form.has_key('pinpoint_para_check'):
			pinpointParaCheck= True
		
		input_dict =	{
			'authors'				: "%s" % (f.form.authors),
			'title'					: "%s" % (f.form.title),
			'citation'				: "%s" % (f.form.citation),
			'year'					: "%s" % (f.form.year),
			'pinpointSelection': "%s" % (f.form.pinpoint_selection),
			'pinpointPara'		: "%s" % (f.form.pinpoint_form1),
			'pinpointParaCheck': pinpointParaCheck,
			'pinpointPage'		: "%s" % (f.form.pinpoint_form2),
			'pinpointPageCheck': pinpoinPageCheck,
			'pinpointFoot1'		: "%s" % (f.form.pinpoint_form3),
			'pinpointFoot2'		: "%s" % (f.form.pinpoint_form4),
		}
		
class Book(object):
	def POST(self):
		pinpointParaCheck= False
		pinpointPageCheck= False
		if form.has_key('pinpoint_para_check'):
			pinpointPageCheck= True
		if form.has_key('pinpoint_para_check'):
			pinpointParaCheck= True
		
		input_dict ={
			'authors'				: "%s" % (form.authors),
			'editors'				: "%s" % (form.editors),
			'verbatim'				: "%s" % (form.verbatim),
			
			'title'					: "%s" % (form.title),
			'place'					: "%s" % (form.place),
			'noplace' 				: "%s" % (form.no_place),
			
			
			'publisher'			: "%s" % (form.publisher),
			'nopublisher'		: "%s" % (form.no_publisher),
			
			
			'year'					: "%s" % (form.year),
			'noyear'				: "%s" % (form.no_year),
			
			
			'volume'				: "%s" % (form.volume),
			'edition'				: "%s" % (form.edition),
			'dateconsulted'	: "%s" % (form.date_consulted),
			'extra'					: "%s" % (form.extra),
			
			'pinpointSelection' : "%s" % (form.pinpoint_selection),
			'pinpointPara'		 : "%s" % (form.pinpoint_form1),
			
			'pinpointPage'		: "%s" % (form.pinpoint_form2),
			'pinpointPageCheck': pinpointPageCheck,
			'pinpointFoot1'		: "%s" % (form.pinpoint_form3),
			'pinpointFoot2'		: "%s" % (form.pinpoint_form4),
			'pinpointChapter'		: "%s" % (form.pinpoint_form0),
		}


	
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
	print "\n\n======in Canadian Storing"
	f = CreateFormClass("canadian case", form)	




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
		if re.search("Requested", CleanUp(leaveArray[0]), re.I) or re.search("AsofRight", CleanUp(leaveArray[0]), re.I):
			if leaveCourt:
				leaveToAppeal = GetLeaveToAppeal(leaveArray)
		if re.search("Refused", CleanUp(leaveArray[0]), re.I) or re.search("Granted", CleanUp(leaveArray[0]), re.I):
			if leaveCourt and leaveDocket:
				leaveToAppeal = GetLeaveToAppeal(leaveArray)
		
		returnString = styleofcause + citations +judge + citing + leaveToAppeal + history + shortform+'.'
		print returnString
		
		#TODO MESSING AROUND WITH DATABASE MAKE IT BETTER!!!!!
		#user = 0
		citation_ident = globs.db.query ("SELECT MAX(citation_id) as highestCitation from citation")[0]
		print citation_ident
		if (citation_ident.highestCitation == None):
			cit_id = 0
		else:
			cit_id = citation_ident.highestCitation + 1
		session_cookie = web.cookies().get('chocolate_chip_local')
		user_name = web.ctx.session.username
		userQuery = globs.db.query("SELECT user_id FROM users WHERE email=$user", vars={'user':user_name})[0]
		user = userQuery.user_id
		globs.db.insert('citation',  citation_id = cit_id, title = styleofcause, comments = "", date_created = web.SQLLiteral("NOW()"), date_modified = web.SQLLiteral("NOW()") , citation = returnString, finished = 1, user_id = user, formtype = 'Canadian Case')
		#END !!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
	if f.form.has_key('pincite_selection'):	
		pinciteSelection = "%s" % (f.form.pincite_selection)
	else:
		pinciteSelection = ""
	
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
		if re.search("Requested", CleanUp(leaveArray[0]), re.I) or re.search("AsofRight", CleanUp(leaveArray[0]), re.I):
			if leaveCourt:
				leaveToAppeal = GetLeaveToAppeal(leaveArray)
		if re.search("Refused", CleanUp(leaveArray[0]), re.I) or re.search("Granted", CleanUp(leaveArray[0]), re.I):
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
	


	

app_storeCitation = web.application(urls, locals())
