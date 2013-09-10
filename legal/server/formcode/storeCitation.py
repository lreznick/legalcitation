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

def CreateCitation(styleofcause, formType, cit):
	print " IN CREATE"
	session_cookie = web.cookies().get('chocolate_chip_local')
	user_name = web.ctx.session.username
	userQuery = globs.db.query("SELECT user_id FROM users WHERE email=$user", vars={'user':user_name})[0]
	user = userQuery.user_id
	citationID = globs.db.insert('citation',  title = styleofcause, comments = "",  citation = cit, user_id = user, formtype = formType , date_created = web.SQLLiteral("NOW()"), date_modified = web.SQLLiteral("NOW()") , finished = 1)
	return user, citationID
	
	
	
class Canada(object):
	def POST(self):
		form = web.input()
		# IDs[0] == user_id
		# IDs[1] == citation_id
		IDs = CreateCitation(form.styleofcause, "CanadaCase", "ooooh im a citation")
		form = web.input()
		
		dissenting = False
		if form.has_key('judge_dissenting'):
			dissenting = True

		globs.db.insert('canada_case',
			user_id				= IDs[0],
			citation_id			= IDs[1],
			styleofcause		= (form.styleofcause),
			parallelcitation		= (form.parallel),
			year					= (form.year),
			court					= (form.court),
			shortform 			= (form.shortform),
			judge					= (form.judge),
			judgeDissenting  	= dissenting,
			pinciteSelection 	= (form.pincite_selection),
			pinciteReporter	= (form.pincite_radio),
			pinciteParapageNumber		= (form.pincite_input),
			citingStyle 			= (form.citing_styleofcause),
			citingParallel		= (form.citing_parallel),
			citingYear 			= (form.citing_year),
			citingCourt			= (form.citing_court),
			historyaff1  		= (form.history_aff1),
			historyParallel1	= (form.history_parallel1),
			historyYear1		= (form.history_year1), 
			historyCourt1		= (form.history_court1),
			historyaff2  		= (form.history_aff2),
			historyParallel2	= (form.history_parallel2),
			historyYear2		= (form.history_year2), 
			historyCourt2		= (form.history_court2),
			historyaff3 			= (form.history_aff3),
			historyParallel3	= (form.history_parallel3),
			historyYear3		= (form.history_year3),
			historyCourt3		= (form.history_court3),	
			leaveSelection 	= (form.leaveToAppeal_selection),
			leaveCourt		 	= (form.leaveToAppeal_court),
			leaveDocket	  	= (form.leaveToAppeal_docket),
			result					= "SUP"
		)


		
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
			'court'				: "%s" % (form.court),
			'shortform' 			: "%s" % (form.shortform),
			'judge'				: "%s" % (form.judge),
			'judgeDissenting'  : dissenting,
		
			'citingStyle' 		: "%s" % (form.citing_styleofcause),
			'citingParallel'		: "%s" % (form.citing_parallel),
			'citingYear' 			: "%s" % (form.citing_year),
			'citingCourt'		: "%s" % (form.citing_court),
			
			'pinciteInput'		: "%s" % (form.pinpoint),
			
			'historyaff1'  		: "%s" % (form.history_aff1),
			'historyParallel1'	: "%s" % (form.history_parallel1),
			'historyYear1'		: "%s" % (form.history_year1), 
			'historyCourt1'		: "%s" % (form.history_court1),
			
			'historyaff2'  		: "%s" % (form.history_aff2),
			'historyParallel2'	: "%s" % (form.history_parallel2),
			'historyYear2'		: "%s" % (form.history_year2), 
			'historyCourt2'		: "%s" % (form.history_court2),
			
			'historyaff3' 		: "%s" % (form.history_aff3),
			'historyParallel3'	: "%s" % (form.history_parallel3),
			'historyYear3'		: "%s" % (form.history_year3),
			'historyCourt3'		: "%s" % (form.history_court3),	
			
			'leaveSelection' 	: "%s" % (form.leaveToAppeal_selection),
			'leaveCourt'		 	: "%s" % (form.leaveToAppeal_court),
			'leaveDocket'	  	: "%s" % (form.leaveToAppeal_docket)
		}
		globs.db.insert('us_case',  where = web.db.sqlwhere(input_dict))


		
class UK(object):
	def POST(self):
		form = web.input()
		dissenting = False
		if form.has_key('judge_dissenting'):
			dissenting = True
		
		input_dict = {
			'styleofcause'		: "%s" % (form.styleofcause),
			'parallelcitation'	: "%s" % (form.parallel),
			'year'					: "%s" % (form.year),
			'court'				: "%s" % (form.court),
			'shortform' 			: "%s" % (form.shortform),
			'judge'				: "%s" % (form.judge),
			'judgeDissenting'  : dissenting,
		
			'citingStyle' 		: "%s" % (form.citing_styleofcause),
			'citingParallel'		: "%s" % (form.citing_parallel),
			'citingYear' 			: "%s" % (form.citing_year),
			'citingCourt'		: "%s" % (form.citing_court),
			
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
			
			'historyaff3' 		: "%s" % (form.history_aff3),
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
			'verbatim'			: "%s" % (form.verbatim),
			
			'title'					: "%s" % (form.title),
			'place'				: "%s" % (form.place),
			'noplace' 			: "%s" % (form.no_place),

			'publisher'			: "%s" % (form.publisher),
			'nopublisher'		: "%s" % (form.no_publisher),
			
			'year'					: "%s" % (form.year),
			'noyear'				: "%s" % (form.no_year),			
			
			'volume'				: "%s" % (form.volume),
			'edition'				: "%s" % (form.edition),
			'dateconsulted'	: "%s" % (form.date_consulted),
			'extra'				: "%s" % (form.extra),
			
			'pinpointSelection': "%s" % (form.pinpoint_selection),
			'pinpointPara'		: "%s" % (form.pinpoint_form1),
			'pinpointParaCheck' : pinpointParaCheck, 
			'pinpointPage'		: "%s" % (form.pinpoint_form2),
			'pinpointPageCheck': pinpointPageCheck,
			'pinpointFoot1'		: "%s" % (form.pinpoint_form3),
			'pinpointFoot2'		: "%s" % (form.pinpoint_form4),
			'pinpointChapter'	: "%s" % (form.pinpoint_form0),
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


	

app_storeCitation = web.application(urls, locals())
