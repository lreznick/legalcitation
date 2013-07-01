import re
import sys



'''****************     STYLE OF CAUSE     ****************'''



#This function takes in a string (meant to be the style of cause) and filters out words that are not allowed to be in it (instances of "the")
#Assume no weird ascii characters
def NotAllowed(string):
	NotAllowed = ["the ", "la ", "le ", "les "]
	for x in NotAllowed:
		if ((x + " queen") or ("the queen in right of") or ("the crown")) in string.lower(): return string
		else: 
			string = re.sub(x, "", string, re.I)
			return string

#function to see whether any of the members of a list are in a string. Returns False if not
def Contains(list, string):
    for x in list:
        if x in string: return True
    return False
    
#CleanUp gets rid of all periods, excess spaces, and leading or trailing spaces in a string, and fixes spaces after commas	
def CleanUp(string):
	NoPeriods = re.sub('\.+','', string)              #Remove all periods
	Comma     = re.sub('\s*?,\s*?', ', ', NoPeriods)  #put a space after a comma instead of multiple spaces or no space
	LBracket  = re.sub('\s*?\(', ' (', Comma)        #put a space before a left bracket instead of multiple spaces or no space
	RBracket  = re.sub('\)\s*?', ') ', LBracket)     #put a space after a right bracket instead of multiple spaces or no space
	Colon     = re.sub('\s*?:\s*?', ': ', RBracket)   #put a space after a comma instead of multiple spaces or no space
	SemiColon = re.sub('\s*?;\s*?', '; ', Colon)      #put a space after a semicolon instead of multiple spaces or no space
	Spaces    = re.sub(' +',' ', SemiColon)           #Remove excess white spaces
	Strip     = Spaces.strip()                        #Remove leading or trailing white spaces
	return Strip

#Capitalizes first word after a space or an open bracket "(" (so long as there are not multiple brackets in a row... that raises an error which is overriden), words such as MacDonald and McMaster (if they are inputted capitalized), and AMA Canada.
#does not capitalize words that are meant to not be capitalized ["in rem", " and", "ex rel", " of", " de"]
#can only accept numbers, round brackets, apostrophes, and letters (no commas or periods, or weird utf-8  characters)
def Capitalize(string):
	McD = re.findall(r"[A-Z]{1}['a-z]+[A-Z]{1}[a-z]*", string)          #regex for a capital followed by some lowercase, and then another capital and more lowercase
	CapAfter_one = re.findall(r"(?<=[\(\)0-9a-z] )[A-Z]{2,}", string)   #matches all caps that have some preceeding number or bracket or lowercase letter, or some following capital followed by lowercase or numbers
	CapAfter_two = re.findall(r"(?<=[\(\)0-9a-z]) [A-Z]{2,}", string)   #an alternative match algorithm to for where caps follow non-caps
	CapAfter_three = re.findall(r"(?<= [\(\)0-9a-z])[A-Z]{2,}", string) #an alternative matching algorithm for when caps immediately follow a bracket or non-caps instead of having a space in between
	CapBefore = re.findall(r"[A-Z]{2,} (?=[a-z0-9])", string)           #a matching algorithm for where caps form the first part of the string, and are followed by non-caps
	#if any of the words match the regexes, add them to KeepAsIs array to keep them unchanged in the final product
	KeepAsIs = McD+CapAfter_one+CapAfter_two+CapAfter_three + CapBefore #add all of the arrays together to create the list of words we will keep the same
	try:
		string = ' '.join([s[0].upper() + s[1:].lower() for s in string.split(' ')]) #capitalize every letter immediately after a space
	except IndexError:#an IndexError can occur where some of the characters separated by spaces are only 1 character
		sting = string
	try:
		string = '('.join([s[0].upper() + s[1:] for s in string.split('(')]) #capitalize every letter immediately after a (
	except IndexError:#an IndexError can occur where some of the characters separated by a bracket are only 1 character
		string = string
	Decaps = ["in rem", " and", "ex rel", " of", " de"]                 #these are words i want to decaps
	for x in Decaps:
		if x in string.lower(): string = re.sub(x, x, string, 0, re.I)  #sub the caps words for the uncaps words
	for j in KeepAsIs:
		string = re.sub(j[0].upper()+j[1:].lower(), j, string)          #sub in the all caps words and words like MacDonald
	return string


# This function runs only where there are 2 or more parties. It sets out 11 patterns and corrects the input string (the style of cause) 
#ex "guardian ad litem (of)?" goes to (Guardian ad litem of)
#assume inputs contain no weird ascii characters
#Everything is already capitalized properly before being inputted to this function
#note: removes empty brackets like "()"
def StyleAttributes(string):
	#print("\nStart:: " + string)
	string = CleanUp(string) # clean up the string before it enters the machine
	# (1) GUARDIAN AD LITEM
	adlit = re.compile(r'\(?(g|G)uardian\s(a|A)d\s(l|L)item\s?((O|o)f)?\)?')
	if adlit.search(string):
		match = adlit.search(string)#detect the match object
		sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
		string = re.sub(sub, '', string) + " (Guardian ad litem of)"
	#print("gaurdian:: " + string +"\n")
	# (2) LITIGATION GUARDIAN
	lit = re.compile(r'\(?(l|L)itigation\s(g|G)uardian\s?((o|O)f)?\)?')
	if lit.search(string):
		match = lit.search(string)#detect the match object
		sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
		string = re.sub(sub, '', string) + " (Litigation guardian of)"
	#print("lit gaurdian:: " + string+"\n")
	# (3) CORPORATIONS
	corp = re.compile(r'(\s(c|C)orp(oration)?$|^(c|C)orp(oration)?\s|\s(c|C)orp(oration)?\s)')
	if corp.search(string):
		match = corp.search(string)#detect the match object
		sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
		string = re.sub(sub, 'Corp', string)
	# (4) Corporate name endings
	Ends = [["Inc", ["Incorporated", "Inc", "Incorp"]], ["PC",["PC", "Professional Corporation", "Professional Corp"]], ["LLC",["Limited Liability Company", "Limited Liability Co", "LLC"]], ["LP",["Limited Partnership", "LP"]], ["LLP",["Limited Liability Partnership", "LLP"]], ["Ltd",["Limited", "Ltd"]]]
	for x in Ends:
		m = False #assume there is no match yet
		for i in x[1]:
			reg_one = re.compile(r'\s'+i+r'(?=,)', re.I)
			reg_two = re.compile(r'\s'+i+r'$', re.I)
			reg_three = re.compile(r'\s'+i+r'\s', re.I)
			if reg_one.search(string):
				match = reg_one.search(string)#detect the match object
				sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
				string = re.sub(sub, x[0], string)
			if reg_two.search(string):
				match = reg_two.search(string)#detect the match object
				sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
				string = re.sub(sub, x[0], string)
			if reg_three.search(string):
				match = reg_three.search(string)#detect the match object
				sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
				string = re.sub(sub, x[0], string)
	#print("Corporation:: " + string+"\n")
	# (5) TRUSTEE
	trustee = re.compile(r'(\(?(t|T)rustee\s?((o|O)f)\)?|\(?(t|T)rustee\s?((o|O)f)?\)?$)')
	if trustee.search(string):
		match = trustee.search(string)#detect the match object
		sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
		string = re.sub(sub, '', string) + " (Trustee of)"
	#print("trustee:: " + string+"\n")
	# (6) RECEIVERSHIPS
	rec = re.compile(r'(\(?(r|R)eceiver(ship)?\s?((o|O)f)\)?|\(?(r|R)eceiver(ship)?\s?((o|O)f)?\)?$)')
	if rec.search(string):
		match = rec.search(string)#detect the match object
		sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
		string = re.sub(sub, '', string) + " (Receiver of)"
	#print("receiv:: " + string+"\n")
	# (7) LIQUIDATOR
	liq = re.compile(r'(\(?(l|L)iquidat(e|or)s?\s?((o|O)f)\)?|\(?(l|L)iquidat(e|or)s?\s?((o|O)f)?\)?$)')
	if liq.search(string):
		match = liq.search(string)#detect the match object
		sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
		string = re.sub(sub, '', string) + " (Liquidator of)"
	#print("liquid:: " + string+"\n")
	# (8) COUNTRIES (need list of countries)
	# (9) CITIES (need database of cities and municipalities)
	# (10) PROVINCES
	Provinces = [["British Columbia", ["BC", "Brit Col", "Brit Colum"], "British Columbian"], ["Alberta", ["AB", "Alta"], "Albertan"], ["Saskatchewan", ["SK", "Sask"], "Saskatchewanian"], ["Manitoba", ["MB"], "Manitoban"], ["Ontario", ["ON", "Ont"], "Ontarian"], ["Quebec", ["QB", "Que","Qc"], "Quebecois"], ["New Brunswick", ["NB", "New Bruns", "N Bruns"], "New Brunskicker"], ["Nova Scotia", ["NS", "Nova Scot"], "Nova Scotian"], ["Prince Edward Island", ["PEI", "Prince Ed", "Prince Ed Isl"], "Prince Edward Islander"], ["Newfoundland and Labrador", ["NL", "NFLD", "Newfoundland"], "Newfoundlander"]]
	for x in Provinces:
		m = False #assume there is no match yet
		for i in x[1]:
			reg_one = re.compile(r'^'+i+r'\s', re.I)
			reg_two = re.compile(r'\s'+i+r'\s', re.I)
			reg_three = re.compile(r'\s'+i+r'$', re.I)
			reg_four = re.compile(r'^'+i+r'$', re.I)
			if reg_one.search(string):
				#print "Province match one\n"
				m == True
				match = reg_one.search(string)#detect the match object
				sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
				string = re.sub(sub, x[0], string)
			if m == True: break
			if reg_two.search(string):
				#print "Province match two\n"
				m = True
				match = reg_two.search(string)#detect the match object
				sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
				string = re.sub(sub, x[0], string)
			if m == True: break
			if reg_three.search(string):
				#print "Province match three\n"
				m = True
				match = reg_three.search(string)#detect the match object
				sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
				string = re.sub(sub, x[0], string)
			if m == True: break
			if reg_four.search(string):
				#print "Province match four\n"
				m = True
				match = reg_four.search(string)#detect the match object
				sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
				string = re.sub(sub, x[0], string)
	#print("Provinces:: " + string+"\n")
	# (11) CROWN CIVIL (AG and MNR)
	AG = re.compile(r'(\(?(a|A)tt(orney)?\s?(g|G)en(eral)?\s?((o|O)f)?\)?|\(?(A|a)(G|g)\)?)')
	if AG.search(string):
		match = AG.search(string)#detect the match object
		sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
		#print "sub = "+sub+"\n"	#print "string = "+string+"\n"		#print "subbed in = "+re.sub(sub, '', string)+"\n"
		string = re.sub(sub, '', string) + " (AG)"
	MNR = re.compile(r'(\(?(m|M)inister\s?((o|O)f)?\s(n|N)at(ional)?\s(r|R)ev(enue)?\)?|\(?(M|m)(N|n)(R|r)\)?)')
	if MNR.search(string):
		match = MNR.search(string)#detect the match object
		sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
		#print "sub = "+sub+"\n"	#print "string = "+string+"\n"		#print "subbed in = "+re.sub(sub, '', string)+"\n"
		string = re.sub(sub, '', string) + " (MNR)"
	string = re.sub('\(\s*?\)', '', string)#there are brackets sometimes not subbed out of the string, so I remove empty ones
	string = CleanUp(string)#clean string for final presentation
	#print("End:: " + string+"\n")
	return string

#takes a string and creates a regex string that can be used to detect the string in various patterns
#ex. instead of just "AB" (which could be string like "ABC Corp"), we will only look for it where it would stand alone
def regstr(i):#i is a string input
	one = r'\s'+i+ r'(?=,)'
	two = r'\s'+i+ r'$'
	thr = r'\s'+i+ r'\s'
	fou = r'^' +i+ r'\s'
	fiv = r'\('+i+ r'\)'
	string =  r'('+ one + r'|' + two + r'|' + thr + r'|' + fou + r'|' + fiv + r')'
	return string

#Puts in the references and the Jurisdiction if not already there
#Shortens "In Re" etc to just "Re"
#removes capitalized P from Ex parte
def StatuteChallenge(string):
	string = NotAllowed(string)
	#Shorten to Re
	Shorten = ["In Re " or "In the Matter of " or "Dans L'Affaire de "]
	for x in Shorten:
		if x.lower() in string.lower(): string = string.replace(x, "Re ")
	#Reference
	#if "ref " in string.lower(): re.sub(r'(r|R)ef', 'Reference', string)
	#print "Made it here with: ", string
	Ref = re.compile(r'(^\(?(r|R)ef(erence)?\s?((r|R)e)?\)?|[\(\s]?(r|R)ef(erence)?.{0,2}\s?((r|R)e)?$)')
	if Ref.search(string):
		#print "Detected a reference in: ", string, ", adding 'Reference Re'"
		match = Ref.search(string)#detect the match object
		sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
		string = "Reference Re " + re.sub(sub, '', string)
		string = re.sub('\(\s*?\)', '', string)#there are brackets sometimes not subbed out of the string, so I remove empty ones
		#print "Added: string is now: ", string
	#fix P in Ex Parte to Ex parte
	if "Ex Parte" in string: string = string.replace("Ex Parte", "Ex parte")
	#Detect provincial thing
	Provinces = [["British Columbia", ["BC", "Brit Col", "Brit Colum", "British Columbia", "British Columbian"]], ["Alberta", ["AB", "Alta", "Alberta", "Albertan"]], ["Saskatchewan", ["SK", "Sask", "Saskatchewan", "Saskatchewanian"]], ["Manitoba", ["MB", "Manitoba", "Manitoban"]], ["Ontario", ["ON", "Ont", "Ontario", "Ontarian"]], ["Quebec", ["QB", "Que","Qc", "Quebec", u"Qu\xe9bec", "Quebecois", u"Qu\xe9becois"]], ["New Brunswick", ["NB", "New Bruns", "N Bruns", "New Brunskick", "New Brunskicker"]], ["Nova Scotia", ["NS", "Nova Scot", "Nova Scotia", "Nova Scotian"]], ["Prince Edward Island", ["PEI", "Prince Ed", "Prince Ed Isl", "Prince Edward Island", "Prince Edward Islander"]], ["Newfoundland and Labrador", ["NL", "NFLD", "Newfoundland", "Newfoundland and Labrador", "Newfoundlander"]]]
	Canada = ["Canada", ["CA", "Can", "Canada", "Canadian", "National", "Federal"]]
	for x in Canada[1]: #detect if any of the federal titles are in the string. if so, fix it up and return it
		if re.search(regstr(x), string, re.I): 
			string = re.sub(r'\('+CleanUp(re.search(regstr(x), string, re.I).group())+r'\)', x[0], string) #replace (BC) or (Brit Col) etc with (British Columbia)
			return string
	for x in Provinces: #detect if any of the provincial titles are in the string. if so, fix it up and return it
		for j in x[1]:
			if re.search(regstr(j), string, re.I):
				string = re.sub('('+CleanUp(re.search(regstr(j), string, re.I).group())+')', x[0], string) #replace (BC) or (Brit Col) etc with (British Columbia)
				return string
	string = string + " (Canada)" #default to saying it is a national statute if it is not made reference to
	#print "At the end of StatuteChallenge, string is: ", string
	return CleanUp(string)
	
#This is a function only for a single style of cause (i.e. no joinder). it looks at both parties (or one, as the case may be) and adds
def Action(StyleOfCause):
	Parties = re.split(r'\b(?:\s*)[vV](?:\s*)\b', StyleOfCause) #Separate the parties (separated by ' v ' or ' V ' or ) into a list
	for x in range(len(Parties)): #capitalize each party individually (best to do each and not altogether because the 'v' is lowercase and might throw off the capitalization algorithm.
		Parties[x] = Capitalize(Parties[x])
	if len(Parties)==1: #If there is only one party
		#print "Length of party is one: ", Parties[0]
		#Replace provincial acronyms with the correct format
		Provinces = [["British Columbia", ["BC", "Brit Col", "Brit Colum", "British Columbia", "British Columbian"]], ["Alberta", ["AB", "Alta", "Alberta", "Albertan"]], ["Saskatchewan", ["SK", "Sask", "Saskatchewan", "Saskatchewanian"]], ["Manitoba", ["MB", "Manitoba", "Manitoban"]], ["Ontario", ["ON", "Ont", "Ontario", "Ontarian"]], ["Quebec", ["QB", "Que","Qc", "Quebec", u"Qu\xe9bec", "Quebecois", u"Qu\xe9becois"]], ["New Brunswick", ["NB", "New Bruns", "N Bruns", "New Brunskick", "New Brunskicker"]], ["Nova Scotia", ["NS", "Nova Scot", "Nova Scotia", "Nova Scotian"]], ["Prince Edward Island", ["PEI", "Prince Ed", "Prince Ed Isl", "Prince Edward Island", "Prince Edward Islander"]], ["Newfoundland and Labrador", ["NL", "NFLD", "Newfoundland", "Newfoundland and Labrador", "Newfoundlander"]]]
		for x in Provinces: #detect if any of the provincial titles are in the string. if so, fix it up and return it
			for j in x[1]:
				if re.search(regstr(j), Parties[0], re.I):
					Parties[0] = re.sub('('+CleanUp(re.search(regstr(j), Parties[0], re.I).group())+')', x[0], Parties[0]) #replace (BC) or (Brit Col) etc with (British Columbia)
		#print "After looking for provincial abbreviations, the string is: ", Parties[0]
		# First, check if it is a statutory reference
		Ref = ["Reference", "Ref", "Re", "In re", "In the matter of", "Dans l'affaire de"]
		Statute = ["Statute", "Code", "Act", "Regulation", "Regulations", "Guidelines"]
		if any(re.search(regstr(x), Parties[0], re.I) for x in Ref) and any(re.search(regstr(x), Parties[0], re.I) for x in Statute): #if the style of cause discloses that it is a reference
			#print "Calling StatuteChallenge for: ", Parties[0]
			OUTPUT = StatuteChallenge(Parties[0]) #see if the SoC discloses it is a challenge to a statute and correct it if so
			#print "After Calling StatuteChallenge, string is: ", OUTPUT
		# Second, check if it is it is a reference to an estate without "Re" in front. If so, add Re and get rid of extraneous words
		elif re.search(regstr("Estate"), Parties[0], re.I) and not re.search(regstr("re"), StyleOfCause, re.I):
			OUTPUT = "Re " + StyleAttributes(NotAllowed(Parties[0]))
		else:
			OUTPUT = StyleAttributes(NotAllowed(Parties[0]))
	else: #Does this if there are two or more parties
		OUTPUT = ""
		for j in range(len(Parties)):
			Parties[j] = StyleAttributes(NotAllowed(Parties[j]))#take out disallowed words and format the patterns as in StyleAttributes
			OUTPUT = OUTPUT + Parties[j] + " v " #add all of the parties together
		OUTPUT = re.sub('\sv\s$', '', OUTPUT) #remove the last " v " on the end
	#print "OUTPUT at end of Action: ", OUTPUT
	return CleanUp(OUTPUT)
			
#this is the function to call to reformat the style of cause
#input string
def GetStyleOfCause(StyleOfCause_Input):
	StyleOfCause = CleanUp(StyleOfCause_Input) #Properly capitalize SoC and clean it up
	Suits = re.split(r'\b(?:\s*);(?:\s*)\b', StyleOfCause)
	if len(Suits)==1:
		#print "Calling Action for only 1 suit on: ", StyleOfCause
		OUTPUT = Action(StyleOfCause)
	else:
		OUTPUT = ""
		for j in range(len(Suits)): # run the formatting of the action function and add the suits together by ;
			Suits[j] = Action(Suits[j])
			OUTPUT = OUTPUT + Suits[j] + "; " #add all of the parties together
		OUTPUT = re.sub(';\s$', '', OUTPUT) #remove the last " v " on the end
	#print "At end of GetSoC: OUTPUT = ", OUTPUT
	return CleanUp(OUTPUT)

'''****************     CITATIONS     ****************'''


def NeutralCourts():
	Provinces = [["British Columbia", ["BC", "Brit Col", "Brit Colum"], "British Columbian"], ["Alberta", ["AB", "Alta"], "Albertan"], ["Saskatchewan", ["SK", "Sask"], "Saskatchewanian"], ["Manitoba", ["MB", "Man"], "Manitoban"], ["Ontario", ["ON", "Ont"], "Ontarian"], ["Quebec", ["QB", "Que","Qc"], "Quebecois"], ["New Brunswick", ["NB", "New Bruns", "N Bruns"], "New Brunskicker"], ["Nova Scotia", ["NS", "Nova Scot"], "Nova Scotian"], ["Prince Edward Island", ["PEI", "Prince Ed", "Prince Ed Isl"], "Prince Edward Islander"], ["Newfoundland and Labrador", ["NL", "NFLD", "Newfoundland"], "Newfoundlander"]]
	Canada = [["SCC", 2000, ["Supreme Court of Canada"]], ["FC", 2001, ["Federal Court"]], ["FCA", 2001, ["Federal Court of Appeal", "Federal Appeal Court", "CA"]], ["TCC", 2003, ["Tax Court of Canada", "Federal Tax Court", "Canada Tax Court", "Canadian Tax Court"]], ["CMAC", 2001, ["Court Martial Appeal Court of Canada"]], ["Comp Trib", 2001, ["Competition Tribunal of Canada", "Canada Competition Tribunal", "Canadian Competition Tribunal"]], ["CHRT", 2003, ["Canadian Human Rights Tribunal", "Canada Human Rights Tribunal"]], ["PSSRB", 2000, ["Public Service Labour Relations Board"]]]
	Alberta = [["ABCA", 1998, ["Appeal Court", "Court of Appeal", "CA"]], ["ABQB", 1998, ["Court of Queen's Bench", "Queen's Bench", "QB"]], ["ABPC", 1998, ["Provincial Court", "Prov Court", "PC"]], ["ABASC", 2004, ["Securities Commission", "Sec Com", "Sec Comm"]]]
	BritishColumbia = [["BCCA", "1999", ["Appeal Court", "Court of Appeal", "CA"]], ["BCSC", 2000, ["Supreme Court", "SC"]], ["BCPC", 1999, ["Provincial Court"]], ["BCHRT", 2000, ["HRT", "Human Rights Tribunal"]], ["BCSECCOM", 2000, ["Securities Commission", "Sec Com", "Sec Comm"]]]
	Manitoba = [["MBCA", 2000, ["Appeal Court", "Court of Appeal", "CA"]], ["MBQB", 2000, ["Court of Queen's Bench", "Queen's Bench", "QB"]], ["MBPC", 2007, ["Provincial Court", "Prov Court", "PC"]]]
	NewBrunswick = [["NBCA", 2001, ["Appeal Court", "Court of Appeal", "CA"]], ["NBQB", 2002, ["Court of Queen's Bench", "Queen's Bench", "QB"]], ["NBPC", 2002, ["Provincial Court", "Prov Court", "PC"]]]
	Newfoundland = [["NFCA", 2001, ["Appeal Court", "Court of Appeal", "CA", "Supreme Court of Newfoundland and Labrador, Court of Appeal", "SCCA"]], ["NLSCTD", 2003, ["Supreme Court Trial Division", "Trial Court", "Trial Division", "Supreme Court of Newfoundland and Labrador, Trial Division", "SCTD"]]]
	NorthwestTerritories = [["NWTCA", 1999, ["Appeal Court", "Court of Appeal", "CA"]], ["NWTSC", 1999, ["Supreme Court", "SC"]], ["NWTTC", 1999, ["Territorial Court", "TC"]]]
	NovaScotia = [["NSCA", 1999, ["Appeal Court", "Court of Appeal", "CA"]], ["NSSC", 2000, ["Supreme Court", "SC"]], ["NSSF", 2001, ["Family Court", "Supreme Court, Family Division", "Family Division"]], ["NSPC", 2001, ["Provincial Court", "Prov Court", "PC"]]]	
	Nunavut = [["NUCJ", 2001, ["Court of Justice", "CJ"]], ["NUCA", 2006, ["Appeal Court", "Court of Appeal", "CA"]]]
	Ontario = [["ONCA", 2007, ["Appeal Court", "Court of Appeal", "CA"]], ["ONSC", 2010, ["Superior Court", "SC"]], ["ONCJ", 2004, ["Court of Justice", "CJ"]], ["ONWSIAT", 2000, ["Workplace Safety and Insurance Appeals Tribunal"]], ["ONLSAP", 2004, ["Law Society Appeal Panel"]], ["ONLSHP", 2004, ["Law Society Hearing Panel"]]]
	PrinceEdwardIsland = [["PESCAD", 2000, ["Supreme Court, Appeal Division", "Appeal Court", "Court of Appeal", "CA", "SCAD"]], ["PESCTD", 2000, ["Supreme Court, Trial Division", "SCTD", "Trial Court", "Trial Division"]]]
	Quebec = [["QCCA", 2005, ["Appeal Court", "Court of Appeal", "CA"]], ["QCCS", 2006, "Superior Court", "SC"], ["QCCP", 2006, "Court of Quebec"], ["QCTP", 1999, "Tribunal des professions"], ["CMCQ", 2000, ["Conseil de la magitrature"]], ["QCCRT", 2002, ["Commission des relations du travail"]]]
	Saskatchewan = [["SKCA", 2000, ["Appeal Court", "Court of Appeal", "CA"]], ["SKQB", 1999, ["Court of Queen's Bench", "Queen's Bench", "QB"]], ["SKPC", 2002, ["Provincial Court", "Prov Court", "PC"]], ["SKAIA", 2003, ["Automobile Injury Appeal Commission"]]]
	Yukon = [["YKCA", 2000, ["Appeal Court", "Court of Appeal", "CA"]], ["YKSC", 2000, ["Supreme Court", "SC", "Supreme Court of the Yukon Territory"]], ["YKTC", 1999, ["Territorial Court", "TC"]], ["YKSM", 2004, ["Small Claims Court", "SM", "Small Claims"]], ["YKYC", 2001, ["Youth Court", "YC"]]]


def regstrElec(i):#i is a string input
	one = r'\s'+i+ r'(?=,)'
	two = r'\s'+i+ r'$'
	thr = r'\s'+i+ r'\s'
	fou = r'^' +i+ r'\s'
	fiv = r'\('+i+ r'\)'
	six = r'^'+i+ r'$'
	string =  r'('+ one + r'|' + two + r'|' + thr + r'|' + fou + r'|' + fiv + r'|' + six + r')'
	return string

#takes in a list of citations. All electronic reporters must be given with their citations or just ex. "CanLII", (i.e. no (Available on CanLII) stuff
def ChooseBestReporters(InputList): # choose the best reporter out of all of the ones in the list
	Present = 2013
	NC = [['SCC', 2000, Present], ['FC', 2001, Present], ['FCA', 2001, Present], ['TCC', 2003, Present], ['CMAC', 2001, Present], ['Comp Trib', 2001, Present], ['CHRT', 2003, Present], ['PSSRB', 2000, Present], ['ABCA', 1998, Present], ['ABQB', 1998, Present], ['ABPC', 1998, Present], ['ABASC', 2004, Present], ['BCCA', '1999', Present], ['BCSC', 2000, Present], ['BCPC', 1999, Present], ['BCHRT', 2000, Present], ['BCSECCOM', 2000, Present], ['MBCA', 2000, Present], ['MBQB', 2000, Present], ['MBPC', 2007, Present], ['NBCA', 2001, Present], ['NBQB', 2002, Present], ['NBPC', 2002, Present], ['NWTCA', 1999, Present], ['NWTSC', 1999, Present], ['NWTTC', 1999, Present], ['NSCA', 1999, Present], ['NSSC', 2000, Present], ['NSSF', 2001, Present], ['NSPC', 2001, Present], ['NUCJ', 2001, Present], ['NUCA', 2006, Present], ['ONCA', 2007, Present], ['ONSC', 2010, Present], ['ONCJ', 2004, Present], ['ONWSIAT', 2000, Present], ['ONLSAP', 2004, Present], ['ONLSHP', 2004, Present], ['PESCAD', 2000, Present], ['PESCTD', 2000, Present], ['QCCA', 2005, Present], ['QCCS', 2006, Present], ['QCCP', 2006, Present], ['QCTP', 1999, Present], ['CMCQ', 2000, Present], ['QCCRT', 2002, Present], ['SKCA', 2000, Present], ['SKQB', 1999, Present], ['SKPC', 2002, Present], ['SKAIA', 2003, Present], ['YKCA', 2000, Present], ['YKSC', 2000, Present], ['YKTC', 1999, Present], ['YKSM', 2004, Present], ['YKYC', 2001, Present]]
	Official = [["Ex CR", 1875, 1970], ["FCR", 1971, Present], ["SCR", 1876, Present]]
	Semi = [["AR", 1976, Present], ["Alta AR", 1908, 1932], ["BCR", 1867, 1947], ["BR", 1892, 1969], ["CA", 1970, 1985], ["CBES", 1975, 1985], ["CP", 1975, 1987], ["CS", 1967, Present], ["CSP", 1975, Present], ["Man R", 1883, 1961], ["NBR", 1969, Present], ["Nfld & PEIR", 1971, Present], ["NSR", 1965, 1969], ["NSR (2d)", 1969, Present], ["NWTR", 1983, 1998], ["OLR", 1900, 1931], ["OR", 1931, 1973], ["OR (2d)", 1973, Present], ["OWN", 1909, 1962], ["RJQ", 1975, Present], ["Sask LR", 1907, 1931], ["Terr LR", 1885, 1907], ["TJ", 1975, Present], ["YR", 1986, 1989]]
	Preferred = [["DLR", 1912, 1955], ["DLR (2d)", 1956, 1968], ["DLR (3d)", 1969, 1984], ["DLR (4th)", 1984, Present], ["WWR", 1911, 1950], ["WWR", 1971, Present], ["WWR (NS)", 1951, 1970], ["ACWS", 1970, 1979], ["ACWS (2d)", 1980, 1986], ["ACWS (3d)", 1986, Present]]
	Other = ['ANWTYTR', 'AAS', 'ABD', 'ADIL', 'Admin LR', 'Admin LR (2d)', 'Admin LR (3d)', 'Admin LR (4th)', 'AEUB', 'A imm app', 'A imm app (ns)', 'AJDQ', 'AJQ', 'Alta BAA', 'Alta BAAA', 'Alta BIR', 'Alta ERCB', 'Alta HRCR', 'Alta LR', 'Alta LR (2d)', 'Alta LR (3d)', 'Alta LR (4th)', 'Alta LR (5th)', 'Alta LRBD', 'Alta LRBR', 'Alta OGBC', 'Alta PSERB', 'Alta PSGAB', 'Alta PUB', 'APR', 'Arb Serv Rep', 'ASC Sum', 'ATB', 'AWLD', 'BC Empl', "BC En Comm'n Dec", 'BCHRC Dec', 'BCSCW Summ', "BC Util Comm'n", 'BCAC', 'BCAVC', 'BCLR', 'BCLR (2d)', 'BCLR (3d)', 'BCLR (4th)', 'BCLRB Dec', 'BCWCR', 'BDM', "Bd Rwy Comm'rs Can", "Bd Trans Comm'rs Can", 'Beaubien', 'BISD', 'BLE', 'BLR', 'BLR (2d)', 'BLR (3d)', 'BLR (4th)', 'BREF', 'Bull CVMQ', 'Bull OSC', 'C & S', 'CAC', 'CACM', 'CAEC', 'CAI', 'CALP', 'CALR', 'Cameron PC', 'Cameron SC', 'CAQ', 'Carey', 'Cart BNA', 'CAS', 'CBR', 'CBR', 'CBR (NS)', 'CBR (3d)', 'CBR (4th)', 'CBR (5th)', 'CCC', 'CCC (NS)', 'CCC (2d)', 'CCC (3d)', 'CCEL', 'CCEL (2d)', 'CCEL (3d)', 'CCL', 'CCL', 'CCL', 'CCL', 'CCL L\\xe9gislation', 'CCL Legislation', 'CCLI', 'CCLI (2d)', 'CCLI (3d)', 'CCLR', 'CCLS', 'CCLT', 'CCLT (2d)', 'CCLT (3d)', 'CCPB', 'CCRI', 'CCRTD', 'CCRTDI', 'CCTCTD', 'CCTCTEP', 'CCTCTO', 'CCTCTO', 'CDB-C', 'CEB', 'CEGSB', 'CELR', 'CELR (NS)', 'CER', 'CFLC', 'CFP', 'CCTCTEP', 'CCTCTO', 'CCTO', 'CDB-C', 'CEB', 'CEGSB', 'CELR', 'CELR (NS)', 'CER', 'CFLC', 'CFP', 'Ch CR', 'CHRR', 'CICB', 'CIJ M\\xe9moires', 'CIJ Rec', 'CIPOO (M)', 'CIPOO (P)', 'CIPOS', 'CIPR', 'CIRB', 'CLAS', 'CLD', 'CLL', 'CLLC', 'CLLR', 'CLP', 'CLR', 'CLR (2d)', 'CLR (3d)', 'CLRBD', 'CLRBR', 'CLRBR (NS)', 'CLRBR (2d)', 'CMAR', 'CNLC', 'CNLR', 'COHSC', 'Comm LR', 'Comp Trib dec', 'Conc Bd Rpts', "Conc Comm'r Rpts", 'Cons sup N-F', 'Cook Adm', 'Coop Ch Ch', 'CPC', 'CPC (2d)', 'CPC (3rd)', 'CPC (4th)', 'CPC (5th)', 'CPC (Olmstead)', 'CPC (Plaxton)', 'CPJI (Ser A)', 'CPJI (S\\xe9r B)', 'CPJI (S\\xe9r A/B)', 'CPJI (S\\xe9r C)', 'CPR', 'CPR (2d)', 'CPR(3d)', 'CPR (4th)', 'CPRB', 'CPTA', 'CR', 'CR (3rd)', 'CR (4th)', 'CR (5th)', 'CR (6th)', 'CR (NS)', 'CRAC', 'CRAT', 'CRC', 'CRD', 'CRMPC', 'CRR', 'CRR (2d)', 'CRRBDI', 'CRT', 'CRTC', 'CSD', 'CT', 'CT Cases', 'CTAB', 'CTAB (NS)', 'CTBR', 'CTC', 'CTC (NS)', 'CTC', 'CTCATC', 'CTCDO', 'CTCMVTCD', 'CTCMVTCO', 'CTCOA', 'CTCR', 'CTCRCD', 'CTCRTC', 'CTCTCD', 'CTCTCO', 'CTCWTCD', 'CTCWTCL', 'CTCWTCO', 'CTR', 'CTR', 'CTR', 'CTST', 'CTTT', 'CTTTCRAA', 'DCA', 'DCA', 'DCDRT', 'DCL', 'DCRM', 'DDCP', 'DDOP', 'Dec B-C', 'Dec trib Mont', 'DELD', 'DELEA', 'Des OAL', 'DFQE', 'DJC', 'DLQ', 'DOAL', 'Drap', 'DRL', 'DTC', 'DTE', 'E & A', 'ELLR', 'ELR', 'ETR', 'ETR (2d)', 'ETR (3d)', 'Farm Products App Trib Dec', 'FCAD', 'FLD', 'FLRAC', 'FLRR', 'Fox Pat C', 'FPR', 'FTLR', 'FTR', 'FTU', 'Gr / UC Ch', 'GSTR', 'GTC', 'H&W', 'Hague Ct Rep', 'Hague Ct Rep (2d)', 'Harr & Hodg', 'Hodg', 'IBDD', 'ICJ Pleadings', 'ICJ Rep', 'ICSID', 'ILR', 'ILR', 'I LR', 'IMA', 'Imm ABD', 'Imm AC', 'Imm AC (2d)', 'Imm LR', 'Imm LR (2d)', 'Imm LR (3d)', 'Inter-Am Ct HR (SerA)', 'Inter-Am Ct HR (Ser B)', 'Inter-Am Ct HR (Ser C)', 'InfoCRTC', 'JCA', 'JCAP', 'JE', 'JL', 'JL', 'JM', 'JSST', 'JSSTI', 'LAC', 'LAC (2d)', 'LAC (3d)', 'LAC (4th)', 'Lap Sp Dec', 'LC Jur', 'LCBD', 'LCR', 'LCR', 'LN', 'Man LR', 'Man MTBD', 'Man R (2d)', 'Man R temp Wood', 'MCC', 'MCR', 'MCR', 'MHRC Dec', 'MLB Dec', 'MLR (KB)', 'MLR (QB)', 'MLR (SC)', 'Mont Cond Rep', 'MPLR', 'MPLR (2d)', 'MPR', 'MVR', 'MVR (2d)', 'MVR (3d)', 'MVR (4th)', 'NB Eq', 'NB Eq Cas', 'NBESTD', 'NBHRC Dec', 'NBLLC', 'NBPPABD', 'NBR (2d)', 'NEBD', 'Nfld LR', 'NHRC Dec', 'NR', 'NSHRC Dec', 'NSBCPU Dec', 'NSCGA Dec', 'NSRUD', 'NTAD (Air)', 'NTAD (Rwy)', 'NTAO (Air)', 'NTAR', 'NWTSCR', 'OAC', 'OAR', 'OELD', 'OFLR', 'OHRCBI', 'OHRC Dec', 'OHRC Transcr', 'OICArb', 'Olmsted PC', 'OLRB Rep', 'OMB Dec', 'OMB Index', 'OMBEAB', 'OMBR', 'ONED', "Ont Building Code Comm'n Rulings", 'Ont CIP OM', 'Ont CIP OP', 'Ont CIP somm', 'ONTD (a\\xe9rien)', 'ONTD (chemins de fer)', 'Ont D', 'Ont D', 'Ont D', "Ont Educ Rel Comm'n Grievance Arb", 'Ont Elec', 'Ont En Bd Dec', 'Oft Envtl Assessment Bd Decisions Dec', 'Ont Health Disciplines Bd Dec', 'Ont IPC OM', 'Ont IPC OP', 'Ont IPC Sum App', "Ont Lab-Mgmt Arb Comm'n Bull", 'Ont Liquor Licence App Trib Dec', 'Ont Min Community & Soc Serv Rev Bd Dec', 'Ont Pol R', 'OPR', 'OR (3d)', 'OSC Bull', 'OSCWS', 'OWCAT Dec', 'OWR', 'Patr Elec Cas', 'PEI', 'PER', 'Per CS', 'Perr P', 'Peters', 'PNGCB Alta', 'PPR', 'PPSAC', 'PPSAC (2d)', 'PPSAC (3d)', 'PRBC', 'PRBR', 'Pyke', 'QAC', 'Qc Comm dp dec', 'QLR', 'QPR', 'RAC', 'RAT', 'RCCT', 'RCDA', 'RCDA', 'RCDA (2e)', 'RCDA(3e)', 'RCDE', 'RCDE (ns)', "RC de I'\\xc9", "RC de l'\\xc9", 'RCDF', 'RCDF (2e)', 'RCDF (3e)', 'RCDF (4e)', 'RCDSST', 'RCDT', 'RCDT(2e)', 'RCDT (3e)', 'RCDVM', 'RCF', 'RCRAS', 'RCRC', 'RCRC (2e)', 'RCRC (3e)', 'RCRP', 'RCS', 'RCS', 'RCTC', 'RDCFQ', 'RDF', 'RDFQ', 'RDI', 'RDJ', 'RDJC', 'RDJC (2e)', 'RDJC (3e)', 'RDJC (4e)', 'RDJC (5e)', 'RDP', 'RDRTQ', 'RDT', 'RECJ', 'Rev serv arb', 'RFL', 'RFL (2d)', 'RFL (3d)', 'RFL (4th)', 'RFL (5th)', 'RIAA', 'Ritch Eq Rep', 'RJ imm', 'RJ imm (2e)', 'RJ imm (2e)', 'RJC', 'RJC (ns)', 'RJC (3e)', 'RJC (4e)', 'RJC (5e)', 'RJDA', 'RJDA(2e)', 'RJDA(2e)', 'RJDA (3e)', 'RJDC', 'RJDC (2e)', 'RJDC (3e)', 'RJDI', 'RJDI (2e)', 'RJDI(3e)', 'RJDM', 'RJDM (2e)', 'RJDT', 'RJF', 'RJF (2e)', 'RJF(3e)', 'RJF (4e)', 'RJF (5e)', 'RJO (3e)', 'RL', 'RL', 'RL (ns)', 'RNB (2d)', 'RONTC', 'RPEI', 'RPQ', 'RPR', 'RPR (2d)', 'RPR (3d)', 'RPTA', 'RRA', 'RSA', 'RSE', 'RSF', 'RSF (2e)', 'RSP', 'RTC', 'Russ ER', 'SAFP', 'SAG', 'SARB Dec', 'SARB Sum', 'Sask C Comp B', "Sask Human Rights Comm'n Dec", 'Sask LRBD', 'Sask LRBDC', 'Sask LRBR', 'Sask R', 'Sask SC Bull', 'SCC Cam', 'SCC Cam (2d)', 'SCC Coutl', 'SCCB', 'SCCD', 'SCCR', 'Sm & S', 'SOLR', 'SRLA', 'St-MSD', 'STR', 'Stu Adm', 'Stu KB', 'TA', 'TAAT', 'TAQ', 'Tax ABC', 'Tax ABC (NS)', 'TBR', 'TCD', 'TCT', 'TE', 'TLLR', 'TPEI', 'Trib conc dec', 'TSPAAT', 'TTC', 'TTJ', 'TTR', 'Turn & R', 'UC Chamb Rep', 'UCCP', 'UCE & A', 'UCKB', 'UCQB', 'UCQB (OS)', 'UIC Dec Ump', 'UIC Selec Dec Ump', 'WAC', 'WCAT Dec', 'WCATR', 'WCB', 'WCB (2d)', 'WDCP', 'WDCP (2d)', 'WDCP (3d)', 'WDFL', "West's Alaska", 'WLAC', 'WLR', 'WLRBD', 'WLTR', 'WSIATR', 'YAD / Young Adm']
	Electronic = [["CanLII", "CanLII"], ["QL", "Quicklaw"], ["WL Can", "Westlaw Canada"], ["Azimut","Azimut"], ["LEXIS", "Lexis"], ["WL", "Westlaw"]]
	Paper = False #assume there is no match for any paper source
	Elec = False #assume there is no match for an electric source
	Priority = 1 #default priority for the top match is 1, and priority will be increased as matches are made
	List = []
	for x in range(len(InputList)):
		List.append([InputList[x], False, False]) # replace each of the sources in the input with a list including that input and "False". False will be changed to the priority if there is a number, and if there is no match then it will be default be placed last in priority (except for elec)
		# Key: [citation, priority (default False until there is a match), whether source is electronic (default False)]
	print "List before numbering: ", List
	#go through each of the types of reporters and look for a match. if there is one, place it in priority
	for i in NC:
		for x in List:
			if x[1]: continue
			if re.search(regstr(i[0]), x[0], re.I):
				x[0] = CleanUp(re.sub(regstr(i[0]), " "+i[0]+" ", x[0], flags = re.I))
				x[1] = Priority
				print x[0], "was given priority", x[1], "********************************"
				Priority +=1
				Paper = True
	for i in Official:
		for x in List:
			if x[1]: continue
			if re.search(regstr(i[0]), x[0], re.I):
				x[0] = CleanUp(re.sub(regstr(i[0]), " "+i[0]+" ", x[0], flags = re.I))
				x[1] = Priority
				print x[0], "was given priority", x[1], "********************************"
				Priority +=1
				Paper = True
	for i in Semi:
		for x in List:
			if x[1]: continue
			if re.search(regstr(i[0]), x[0], re.I):
				x[0] = CleanUp(re.sub(regstr(i[0]), " "+i[0]+" ", x[0], flags = re.I))
				x[1] = Priority
				print x[0], "was given priority", x[1], "********************************"
				Priority +=1
				Paper = True
	for i in Preferred:
		for x in List:
			if x[1]: continue
			if re.search(regstr(i[0]), x[0], re.I):
				x[0] = CleanUp(re.sub(regstr(i[0]), " "+i[0]+" ", x[0], flags = re.I))
				x[1] = Priority
				print x[0], "was given priority", x[1], "********************************"
				Priority +=1
				Paper = True
	for i in Other:
		for x in List:
			if x[1]: continue
			if re.search(regstr(i), x[0], re.I):
				x[0] = CleanUp(re.sub(regstr(i), " "+i+" ", x[0], flags = re.I))
				x[1] = Priority
				print x[0], "was given priority", x[1], "********************************"
				Priority +=1
				Paper = True
	for i in Electronic:
		for x in List:
			if x[1]: continue
			#print "List string:", x[0], "and Electronic is either:", i[0], "OR", i[1]
			if re.search(regstrElec(i[0]), x[0], re.I) or re.search(regstrElec(i[1]), x[0], re.I):
				#print "HHEEEERRE"
				if Priority != 1: # if there is some reporter other than an electronic reporter, we only need the name of the electronic service and not the citation docket
					x[0] = " (available on "+i[0]+")"
				else: # the priority is one, then we will sub whatever abbreviation they used with the correct one
					x[0] = CleanUp(re.sub(regstrElec(i[0]), " "+i[0]+" ", x[0], flags = re.I)) #they used the real name
					x[0] = CleanUp(re.sub(regstrElec(i[1]), " "+i[0]+" ", x[0], flags = re.I)) #they used another name
				x[1] = Priority
				print x[0], "was given priority", x[1], "********************************"
				Priority +=1
				x[2] = True
				Elec = True
	for x in List: # in case there is no match for a particular reporter, just place it last in priority
		if not x[1]:
			print x[0], "was not recognized but is given priority", x[1], "********************************"
			x[1] = Priority
			Priority +=1
	#now sort List based on the priorities for each citation (sorted list is called Sorted)
	if len(List)==1: #if there is only one reporter given, return it
		return List[0][0]
	Sorted = sorted(List, key=lambda tup: tup[1])
	First = Sorted[0]
	Second = Sorted[1]
	if Second[2]: #if the second reporter is electronic
		return First[0] + Second[0]
	else:
		return First[0]+", " + Second[0]
			

def CheckForCourt(String): #pull the neutral citation from the list if there is one
	Courts = ['SCC', ' FC ', 'FCA', 'TCC', 'CMAC', 'Comp Trib', 'CHRT', 'PSSRB', 'ABCA', 'ABQB', 'ABPC', 'ABASC', 'BCCA', 'BCSC', 'BCPC', 'BCHRT', 'BCSECCOM', 'MBCA', 'MBQB', 'MBPC', 'NBCA', 'NBQB', 'NBPC', 'NFCA', 'NLSCTD', 'NWTCA', 'NWTSC', 'NWTTC', 'NSCA', 'NSSC', 'NSSF', 'NSPC', 'NUCJ', 'NUCA', 'ONCA', 'ONSC', 'ONCJ', 'ONWSIAT', 'ONLSAP', 'ONLSHP', 'PESCAD', 'PESCTD', 'QCCA', 'QCCS', 'QCCP', 'QCTP', 'CMCQ', 'QCCRT', 'SKCA', 'SKQB', 'SKPC', 'SKAIA', 'YKCA', 'YKSC', 'YKTC', 'YKSM', 'YKYC']
	Reporters = ['SCR']
	for x in Courts:
		if x.lower() in String.lower(): return True
	for x in Reporters:
		if x.lower() in String.lower(): return True
	return False


def CleanUpCourt(Input):
	Jurisdiction = FindJurisdiction(Input)
	if not Jurisdiction: return False
	Court = FindCourt(Input)
	return Jurisdiction + Court

	
def FindJurisdiction(String):	
	Canada = [["C"], ["can", "canada", "fed", "federal", "canadian"]]
	LowerCanada = [["LC"], ["lc", "lower can", "lower ca", "lower canada", "lower c"]]
	ProvCan = [["Prov C"], ["prov c", "prov can", "province of canada", "prov of c", "prov of can"]]
	UpperCan = [["UC"], ["uc", "upper c", "upper can", "up can", "up c"]]
	Alberta = [["Alta"], ["ab", "alberta", "alta", "albertan"]]
	BC = [["BC"], ["bc", "british columbia", "brit col", "british columbian"]]
	Manitoba = [["Man"], ["man", "mb", "manitoba", "manitoban"]]
	NewBrunswick = [["NB"], ["nb", "new brunswick","new brunswicker"]]
	Newfoundland = [["Nfld"], ["nf", "nfld", "newfoundland", "newfoundlander"]]
	NewfoundlandLab = [["NL"], ["nl", "labrador"]]
	NorthwestTerritories = [["NWT"], ["nwt", "north west territories", "nortwest territories"]]
	NovaScotia = [["NS"], ["ns", "nova scotia", "nova scotian"]]
	Nunavut = [["Nu"], ["nu", "nun", "nunavut", "nvt"]]
	Ontario = [["Ont"], ["on", "ont", "ontario", "ontarian"]]
	PrinceEdwardIsland = [["PEI"], ["pei", "prince edward island"]]
	Quebec = [["Qc"], ["qc", "qb", "quebec"]]
	Saskatchewan = [["Sask"], ["sk", "saskatchewan", "sask"]]
	Yukon = [["Yu"], ["yu", "yukon", "yk"]]
	All = [Canada, LowerCanada, ProvCan, UpperCan, Alberta, BC, Manitoba, NewBrunswick, Newfoundland, NewfoundlandLab, NorthwestTerritories, NovaScotia, Nunavut, Ontario, PrinceEdwardIsland, Quebec, Saskatchewan, Yukon]
	for jur in All:
		for ab in jur[1]:
			if ab.lower() in String.lower():
				return jur[0][0]
	return False	

def TakeOutJurisdiction(Ct, Cite):
	print "In 'TakeOutJurisdiction(Ct, Cite):' the Ct = ", Ct, ", and Cite = ", Cite
	if " FCR" in Cite: Ct = re.sub("F", "", Ct)
	if " Alta" in Cite: Ct = re.sub("Alta", "", Ct)
	if (" BC" in Cite) and (" BCD" not in Cite): Ct = re.sub("BC", "", Ct)
	if (" Man" in Cite) and (" Man & G" not in Cite): Ct = re.sub("BC", "", Ct)
	if " NB" in Cite: Ct = re.sub("NB", "", Ct)
	if " Nfld LR" in Cite: Ct = re.sub("Nfld", "", Ct)
	if (" NS" in Cite) and (" NSW" not in Cite): Ct = re.sub("NS", "", Ct)
	if " NWT" in Cite: Ct = re.sub("NWT", "", Ct)
	if (" OAC" or " OAR" or " OELD" or " OFLR" or " OHRC" or " OIC" or " OLR" or " OMB" or " Ont" or " OPR" or " OR " or " OSC" or "OW") in Cite: Ct = re.sub("Ont", "", Ct)
	if " PEI" in Cite: Ct = re.sub("PEI", "", Ct)
	if " Sask" in Cite: Ct = re.sub("Sask", "", Ct)
	if " YR" in Cite: Ct = re.sub("Yu", "", Ct)
	Ct = CleanUp(Ct)#Ct.strip() #strip trailing white spaces
	#Ct = re.sub(' +',' ', Ct) #Remove excess white spaces
	return Ct

			
#pulls the first date from a string, only starting after 1400 until 2014	
#will not pull a date from within a string of digits, but anything else
#returns false if no string		
def PullDate(string):
	Match = re.search(r'([^\d]{1}|^)(1[4-9,0][0-9]{2}|200[0-9]{1}|201[1234]{1})([^\d]{1}|$)', string)
	if Match: return CleanUp(Match.group(2))
	else: return False


	
def GetCitations(Citation_Input):
	PC = CleanUp(Citation_Input)
	OUTPUT = "" #this will eventually be the output
	#need to put the electronic sources in the correct format in case someone puts in (available on CanLII) without the ; or ,
	Electronic = [["CanLII", "CanLII"], ["QL", "Quicklaw"], ["WL Can", "Westlaw Canada"], ["Azimut","Azimut"], ["LEXIS", "Lexis"], ["WL", "Westlaw"]]
	for x in Electronic:
		regzero = re.compile(r'[;,]?\s?\(?(available on)?\s?'+x[0]+r'\)?[;,]?') # create the regex objects 
		regone = re.compile(r'[;,]?\s?\(?(available on)?\s?'+x[1]+r'\)?[;,]?')
		if regzero.search(PC):
			PC = re.sub(r'[;,]?\s?\(?(available on)?\s?'+x[0]+'\)?[;,]?', "; "+x[0]+"; ", PC)
		if regone.search(PC):
			PC = re.sub(r'[;,]?\s?\(?(available on)?\s?'+x[1]+'\)?[;,]?', "; "+x[0]+"; ", PC)
	m = re.split('[,;]', PC) # 	#Split the citations based on positioning of commas and semicolons
	for x in range(len(m)): m[x] = CleanUp(m[x]) #remove excess white spaces on either side
	TwoBest = ChooseBestReporters(m) #this returns a string with the two best reporters already formatted
	#print "The basic citation is: ", TwoBest
	Court = False #first assume there is no court evident in the input
	Jurisdiction = False # assume there is no jurisdiction evident in the input
	NeutralCite = False #first assume there is no neutral reporter evident in the input
	JudgementDate = False #assume there is no date evident in the input
	CitationDate = False #assume there is no citation date evident in the input
	Pinpont = False #assume there is no pinpoint for now
	# Determine if there is a Citator Date or a Court evident in the Parallel citation
	if PullDate(TwoBest): CitationDate = PullDate(TwoBest)
	if CheckForCourt(TwoBest): Court = True
	print "Court = ", Court
	print "Citation Date = ", CitationDate
	if not Court and not CitationDate:
		#print "NOT COURT AND NOT CITATIONDATE DETECTED"
		Court_input = raw_input("Enter Court with Canadian Jurisdiction: \n")
		Ct = CleanUp(Court_input)
		Ct = CleanUpCourt(Ct) 
		Ct = TakeOutJurisdiction(Ct, TwoBest)
		Date_input = raw_input("Enter Date: \n")
		JudgementDate = CleanUp(Date_input)
		OUTPUT = ' ('+ JudgementDate + '), ' + TwoBest +' (' + Ct + ').'#combine all of this in the right way
	if CitationDate and not Court: 
		#print "CITATIONDATE AND NOT COURT DETECTED"
		Court_input = raw_input("Enter Court with Canadian Jurisdiction: \n")
		Ct = CleanUp(Court_input)
		Ct = CleanUpCourt(Ct) 
		Ct = TakeOutJurisdiction(Ct, TwoBest)
		Date_input = raw_input("Enter Date: \n")
		JudgementDate = CleanUp(Date_input)
		if (JudgementDate==CitationDate): 
			OUTPUT = ', ' + TwoBest + '(' + Ct + ').'
		else:
			OUTPUT = ' ('+ JudgementDate + '), ' + TwoBest + ' (' + Ct+ ').'
	if CitationDate and Court:
		#print "CITATIONDATE AND COURT DETECTED"
		OUTPUT = ", " + TwoBest + '.'
	print "Result:", OUTPUT
	return OUTPUT


