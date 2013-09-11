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

def CreateCitation(styleofcause, formType, result, comments):
	print " IN CREATE"
	session_cookie = web.cookies().get('chocolate_chip_local')
	user_name = web.ctx.session.username
	userQuery = globs.db.query("SELECT user_id FROM users WHERE email=$user", vars={'user':user_name})[0]
	user = userQuery.user_id
	citationID = globs.db.insert('citation',  title = styleofcause, comments = comments,  citation = result, user_id = user, formtype = formType , date_created = web.SQLLiteral("NOW()"), date_modified = web.SQLLiteral("NOW()") , finished = 1)
	return user, citationID
	
	
	
class Canada(object):
	def POST(self):
		form = web.input()
		print form
		# IDs[0] == user_id
		# IDs[1] == citation_id
		IDs = CreateCitation(form.styleofcause, "Canadian Case", form.result, form.comments)
		
				
		dissenting = False
		if form.has_key('judge_dissenting'):
			dissenting = True
		

		globs.db.insert('canada_case',
			user_id				= IDs[0],
			citation_id			= IDs[1],
			styleofcause		= (form.styleofcause),
			parallelcitation		= (form.parallel),
			year						= (form.year),
			court					= (form.court),
			shortform 			= (form.shortform),
			judge					= (form.judge),
			judgeDissenting  = dissenting,
			pinciteSelection 	= (form.pincite_selection),
			pinciteReporter	= (form.pincite_radio),
			pinciteParapageNumber		= (form.pincite_input),
			citingStyle 			= (form.citing_styleofcause),
			citingParallel		= (form.citing_parallel),
			citingYear 			= (form.citing_year),
			citingCourt			= (form.citing_court),
			historyaff1  			= (form.history_aff1),
			historyParallel1	= (form.history_parallel1),
			historyYear1		= (form.history_year1), 
			historyCourt1		= (form.history_court1),
			historyaff2  			= (form.history_aff2),
			historyParallel2	= (form.history_parallel2),
			historyYear2		= (form.history_year2), 
			historyCourt2		= (form.history_court2),
			historyaff3 			= (form.history_aff3),
			historyParallel3	= (form.history_parallel3),
			historyYear3		= (form.history_year3),
			historyCourt3		= (form.history_court3),	
			leaveSelection 	= (form.leaveToAppeal_selection),
			leaveCourt		 	= (form.leaveToAppeal_court),
			leaveDocket	  		= (form.leaveToAppeal_docket),
		)


		
class US(object):
	def POST(self):
		form = web.input()
		IDs = CreateCitation(form.styleofcause, "US Case", form.result, form.comments)

		dissenting = False
		if form.has_key('judge_dissenting'):
			dissenting = True	

		globs.db.insert('us_case',
			user_id				= IDs[0],
			citation_id			= IDs[1],
			styleofcause		= (form.styleofcause),
			parallelcitation		= (form.parallel),
			year						= (form.year),
			court					= (form.court),
			shortform 			= (form.shortform),
			judge					= (form.judge),
			judgeDissenting  = dissenting,
			pinciteInput			= (form.pinpoint),
			citingStyle 			= (form.citing_styleofcause),
			citingParallel		= (form.citing_parallel),
			citingYear 			= (form.citing_year),
			citingCourt			= (form.citing_court),
			historyaff1  			= (form.history_aff1),
			historyParallel1	= (form.history_parallel1),
			historyYear1		= (form.history_year1), 
			historyCourt1		= (form.history_court1),
			historyaff2  			= (form.history_aff2),
			historyParallel2	= (form.history_parallel2),
			historyYear2		= (form.history_year2), 
			historyCourt2		= (form.history_court2),
			historyaff3 			= (form.history_aff3),
			historyParallel3	= (form.history_parallel3),
			historyYear3		= (form.history_year3),
			historyCourt3		= (form.history_court3),	
			leaveSelection 	= (form.leaveToAppeal_selection),
			leaveCourt		 	= (form.leaveToAppeal_court),
			leaveDocket	  		= (form.leaveToAppeal_docket),
		)		

		
class UK(object):
	def POST(self):
		form = web.input()
		IDs = CreateCitation(form.styleofcause, "UK Case", form.result, form.comments)
		dissenting = False
		if form.has_key('judge_dissenting'):
			dissenting = True

		globs.db.insert('uk_case',
			user_id				= IDs[0],
			citation_id			= IDs[1],
			styleofcause		= (form.styleofcause),
			parallelcitation		= (form.parallel),
			year						= (form.year),
			court					= (form.court),
			shortform 			= (form.shortform),
			judge					= (form.judge),
			judgeDissenting  = dissenting,
			pinciteSelection 	= (form.pincite_selection),
			pinciteReporter	= (form.pincite_radio),
			pinciteParapageNumber		= (form.pincite_input),
			citingStyle 			= (form.citing_styleofcause),
			citingParallel		= (form.citing_parallel),
			citingYear 			= (form.citing_year),
			citingCourt			= (form.citing_court),
			historyaff1  			= (form.history_aff1),
			historyParallel1	= (form.history_parallel1),
			historyYear1		= (form.history_year1), 
			historyCourt1		= (form.history_court1),
			historyaff2  			= (form.history_aff2),
			historyParallel2	= (form.history_parallel2),
			historyYear2		= (form.history_year2), 
			historyCourt2		= (form.history_court2),
			historyaff3 			= (form.history_aff3),
			historyParallel3	= (form.history_parallel3),
			historyYear3		= (form.history_year3),
			historyCourt3		= (form.history_court3),	
			leaveSelection 	= (form.leaveToAppeal_selection),
			leaveCourt		 	= (form.leaveToAppeal_court),
			leaveDocket	  		= (form.leaveToAppeal_docket),
		)



class JournalArticle(object):	
	def POST(self):
		form = web.input()
		IDs = CreateCitation(form.authors, "Journal Article", form.result, form.comments)
		
		pinpointParaCheck= False
		pinpointPageCheck= False
		if form.has_key('pinpoint_para_check'):
			pinpointPageCheck= True
		if form.has_key('pinpoint_para_check'):
			pinpointParaCheck= True
		
		globs.db.insert('journal_article',
			user_id				= IDs[0],
			citation_id			= IDs[1],
			authors					= (form.authors),
			title							= (form.title),
			citation					= (form.citation),
			year							= (form.year),
			pinpointSelection		= (form.pinpoint_selection),
			pinpointPara			= (form.pinpoint_form1),
			pinpointParaCheck	= pinpointParaCheck,
			pinpointPage			= (form.pinpoint_form2),
			pinpointPageCheck  = pinpoinPageCheck,
			pinpointFoot1			= (form.pinpoint_form3),
			pinpointFoot2			= (form.pinpoint_form4),
		)
		
class Book(object):
	def POST(self):
		form = web.input()
		IDs = CreateCitation(form.authors, "Book", form.result, form.comments)
		
		pinpointParaCheck= False
		pinpointPageCheck= False
		if form.has_key('pinpoint_para_check'):
			pinpointPageCheck= True
		if form.has_key('pinpoint_para_check'):
			pinpointParaCheck= True
			
		editors					= False
		verbatim				= False
		noplace				= False
		nopublisher			= False
		noyear 				= False
	
		if form.has_key('editors'):
			editors = True
		if form.has_key('verbatim'):
			verbatim = True
		if form.has_key('no_place'):
			noplace =True
		if form.has_key('no_publisher'):		
			nopublisher = True
		if form.has_key('no_year'):	
			noyear = True
		place					= "%s" % (form.place)
		if noplace: 
			place 				= "no place"
		publisher				= "%s" % (form.publisher)
		if nopublisher: 
			publisher 		= "no publisher"
		year						= "%s" % (form.year)
		if noyear:
			year					= "no year"
		

		globs.db.insert('book',
			user_id				= IDs[0],
			citation_id			= IDs[1],
			authors			= (form.authors),
			editors				= editors,
			verbatim			= verbatim,
			
			title					= (form.title),
			place				= place,
			noplace 			= noplace,
			publisher			= publisher,
			nopublisher		= nopublisher,
			year					= year,
			noyear				= noyear,
			volume				= (form.volume),
			edition				= (form.edition),
			dateconsulted	= (form.date_consulted),
			extra				= (form.extra),
			
			pinpointSelection		= (form.pinpoint_selection),
			pinpointPara			= (form.pinpoint_form1),
			pinpointParaCheck	= pinpointParaCheck, 
			pinpointPage			= (form.pinpoint_form2),
			pinpointPageCheck	= pinpointPageCheck,
			pinpointFoot1			= (form.pinpoint_form3),
			pinpointFoot2			= (form.pinpoint_form4),
			pinpointChapter		= (form.pinpoint_form0),
		)


	
class Dictionary(object):	
	def POST(self):
		form = web.input()
		IDs = CreateCitation(form.authors, "Book", form.result, form.comments)
		globs.db.insert('book',
			user_id				= IDs[0],
			citation_id			= IDs[1],
			title				= (form.dictionary_title),
			edition				= (form.dictionary_edition),
			keyword				= (form.dictionary_word),
		)


	

app_storeCitation = web.application(urls, locals())
