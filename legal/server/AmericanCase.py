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
	return CleanUp(string)
	
#This is a function only for a single style of cause (i.e. no joinder). it looks at both parties (or one, as the case may be) and adds
def Action(StyleOfCause):
	Parties = re.split(r'\b(?:\s*)[vV](?:\s*)\b', StyleOfCause) #Separate the parties (separated by ' v ' or ' V ' or ) into a list
	for x in range(len(Parties)): #capitalize each party individually (best to do each and not altogether because the 'v' is lowercase and might throw off the capitalization algorithm.
		Parties[x] = Capitalize(Parties[x])
	if len(Parties)==1: #If there is only one party
		#print "Length of party is one: ", Parties[0]
		#Replace provincial acronyms with the correct format
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


def regstrElec(i):#i is a string input
	one = r'\s'+i+ r'(?=,)'
	two = r'\s'+i+ r'$'
	thr = r'\s'+i+ r'\s'
	fou = r'^' +i+ r'\s'
	fiv = r'\('+i+ r'\)'
	six = r'^'+i+ r'$'
	string =  r'('+ one + r'|' + two + r'|' + thr + r'|' + fou + r'|' + fiv + r'|' + six + r')'
	return string


#takes in a correctly formatted citation and checks if there is a court in it
# if there is a court, return it
# else return False
#Court must be surrounded by a space on each side
def CheckForCourt(string): #pull the neutral citation from the list if there is one
	print "**** Starting CheckForCourt"
	print "Checking for court in string: ", string
	SupremeCourtReporters = ['US', 'S Ct', 'L Ed 2d', 'USLW']
	Federal = ['F', 'F (2d)', 'F (3d)', 'F Supp', 'F (2d) Supp']
	PreferredRegional = ['A', 'A (2d)', 'NE', 'NE (2d)', 'NW', 'NW (2d)', 'P', 'P (2d)', 'P (3d)', 'SE', 'SE (2d)',  'SW', 'SW (2d)',  'So', 'So (2d)']
	PreferredState = ['Cal', 'Cal (2d)', 'Cal (3d)', 'Cal (4th)', 'NYS (2d)']
	Regional = ['ALR', 'ALR (2d)', 'ALR (3d)', 'ALR (4th)', 'ALR (5th)', 'L Ed']
	Professions = ['AMC', 'Av Cas', 'ICC', 'LAR']
	NYAppeal = ['App Div (2d)']
	ARAppeal = ['Ark App']
	USAppeal = ['US App DC']
	Other = ['Act', "A Int'l LC", 'ADIL', 'Ad & El', 'Ala', 'Ala (NS)', 'Alaska Fed', 'Alaska R', 'Ariz', 'Ark',  'CIJ M\\xe9moires', 'CIJ Rec', 'Cons sup N-F', 'CPJI (Ser A)', 'CPJI (S\\xe9r B)', 'CPJI (S\\xe9r A/B)', 'CPJI (S\\xe9r C)', 'F', 'F (2d)', 'F (3d)', 'F Cas', 'F Supp', 'F Supp (2d)', 'Hague Ct Rep', 'Hague Ct Rep (2d)', 'ICJ Pleadings', 'ICJ Rep', 'ICSID', 'I LR', 'Inter-Am Ct HR (Ser A)', 'Inter-Am Ct HR (Ser B)', 'Inter-Am Ct HR (Ser C)', 'NY', 'NY (2d)', 'RIAA', 'S Ct', 'SEC Dec', 'TMR', ]
	for x in SupremeCourtReporters:
		if re.search(regstrElec(x), string, re.I): 
			print "Found a reporter that implies the USSC: ", x
			return x
	return False


#returns a list: [Proper Abbreviation for jurisdiction, The search object that found it]
#or returns False if no jurisdiction detected
def FindJurisdiction(string):	
	States = [
	["Ala", ["alabama", "al"]],
	["Alaska", ["ak"]],
	["Ariz", ["arizona", "az"]],
	["Arkansas", ["alabama", "al"]],
	["Ala", ["alabama", "al"]],
	
	
	
	for jur in States:
		for abbr in jur[1]:
			match = re.search(regstrElec(abbr), string, re.I)#regstrElec has the ^ + $ object
			if match:
				return [jur[0][0], match]
	return False

#string entering this function does not contain jurisdiction, only the court name
# entering string is CleanedUp
#Returns a match. The comments will say what courts matched the input
#NOTE: allow fo caps \xe9
def FindCourt(string):
	#sub all instances of "court" court ct etc with Ct for simpler searching
	print "Searching: ", string
	Ct = re.compile(r'(C(our)?t|Cour)', flags = re.I)
	if Ct.search(string):
		string = re.sub(Ct.search(string).group(), "Ct", string, flags = re.I)
	Remove  = ["of", "des", "de" "la", "le", "the", "in"]
	for r in Remove:
		Rem = re.compile(regstr(r), flags = re.I)
		if Rem.search(string):
			string = re.sub(Rem.search(string).group(), " ", string, flags = re.I)
	string = CleanUp(string)
	print "Search modified to: ", string
	AllCourts = [["CA", re.compile(r"(^(Ct )?(of )?appeal(s)?$|^d?'?appel$|^appellate( of)?|^appeal ct( of)?)", flags = re.I)],
	["Ct J", re.compile(r"^Ct (of )?Just(ice)?( of)?$", flags = re.I)],
	["H Ct J", re.compile(r"H(igh)? Ct (of )?Just(ice)?( of)?", flags = re.I)],
	["CP", re.compile(r"Ct Prov(inciale)?$", flags = re.I)],
	["CS", re.compile(u"Ct Sup(e|\\xe9)rieure( de)?", flags = re.I)],
	["HC", re.compile(r"^H(igh)? Ct( of)?$", flags = re.I)],
	["Prov Ct", re.compile("^Prov(incial)? Ct( of)?$", flags = re.I)], 
	["Sup Ct", re.compile("Sup(erior)? Ct( of)?$", flags = re.I)],
	["Traffic Ct", re.compile("Traff?(ic)? Ct( of)?", flags = re.I)],
	["Youth Ct", re.compile("^Youth Ct( of)?$", flags = re.I)],
	["Cor Ct", re.compile("Cor(oner)?'?s Ct( of)?", flags = re.I)],
	["CCI", re.compile(u"Ct can(adienne)? (de )?l?'?imp(o|\\xf4)ts?( de)?", flags = re.I)],
	["CAF", re.compile(u"Ct d?'?appel f(e|\\xe9)d((e|\\xe9)rale)?", flags = re.I)],
	["Cc", re.compile(u"Ct (de )?comt(e|\\xe9)( de)?$", flags = re.I)],
	[u"Div g\xe9n Ont", re.compile(u"Ct (de )?l'Ontario, div(ision)? g(e|\\xe9)n((e|\\xe9)rale)?", flags = re.I)],
	["C div & causes mat", re.compile("Ct (des )?div(orces) ((et|&) )?(des )?causes mat(rimoniales)?", flags = re.I)],
	["C j Cc crim", re.compile(u"Ct (des )?juges (de )?(la )?comt(e|\\xe9) si(e|\\xe9)geant au criminel", flags = re.I)],
	[u"C pet cr\xe9", re.compile(u"Ct (des )?petites cr(e|\\xe9)ances", flags = re.I)],
	["C succ", re.compile("Ct (des )?succ(essions)?", flags = re.I)],
	["C div", re.compile("Ct div(isionnaire)?$", flags = re.I)],
	["BR", re.compile(r"Ct (du )?Banc (de )?(la )?Reine$", flags = re.I)],
	["BR (div fam)", re.compile(r"(Ct (du )?Banc (de )?(la )?Reine|BR),? \(?Div(ision)? (de la )?fam(ille)?\)?", flags = re.I)],
	["BR (1re inst)", re.compile(u"(Ct (du )?Banc (de )?(la )?Reine|BR),? \(?Div(ision)? (de )?(la )?(premi(e|\\xe8)re|1re) inst(ance)?\)?", flags = re.I)],
	["CQ", re.compile(u"^Ct (du )?(Qu(e|\\xe9)bec|QC)$", flags = re.I)],
	["CQ jeun", re.compile(u"Ct (du )?(Qu(e|\\xe9)bec|QC),? (Chambre )?(de )?(la )?jeun(esse)?", flags = re.I)],
	["CQ civ", re.compile(u"(Ct (du )?(Qu(e|\\xe9)bec|QC)|CQ),? (Chambre )?civ(ile)?$", flags = re.I)],
	[u"CQ civ (div pet cr\xe9)", re.compile(u"(Ct (du )?(Qu(e|\\xe9)bec|QC)|CQ),? (Chambre )?civ(ile)? \(?Div(ision)? des petites cr(e|\\xe9)(ances)?\)?", flags = re.I)],
	[u"CQ crim & p\xe9n", re.compile(u"(Ct (du )?(Qu(e|\\xe9)bec|QC)|CQ),? (Chambre )?crim(inelle)? (et )?p(e|\\xe9)n(ale)?", flags = re.I)],
	["CF (1re inst)", re.compile(u"Ct f(e|\\xe9)d((e|\\xe9)rale)?,? (premi(e|\\xe8)re|1re) inst(ance)?", flags = re.I)],
	["CM", re.compile(r"Ct mun(icipale)?", flags = re.I)],
	["CP Div civ", re.compile(r"(Ct prov(inciale)?|CP),? \(?Div(ision)? civ(ile)?\)?", flags = re.I)],
	["CP Div crim", re.compile(r"(Ct prov(inciale)?|CP),? \(?Div(ision)? crim(inelle)?\)?", flags = re.I)],
	["CP Div fam", re.compile(r"(Ct prov(inciale)?|CP),? \(?Div(ision)? (de )?(la )?fam(ille)?\)?", flags = re.I)],
	["CS adm", re.compile(u"(Ct Sup((e|\\xe9)rieure)?|CS),? \(?(Chambre )?adm(in)?(istrative)?\)?", flags = re.I)],
	["CS civ", re.compile(u"(Ct Sup((e|\\xe9)rieure)?|CS),? \(?(Chambre )?civ(ile)?\)?", flags = re.I)],
	[u"CS crim & p\xe9n", re.compile(u"(Ct Sup((e|\\xe9)rieure)?|CS),? \(?(Chambre )?crim(inelle)? ((et|&) )?p(e|\\xe9)n(ale)?\)?", flags = re.I)],
	["CS fam", re.compile(u"(Ct Sup((e|\\xe9)rieure)?|CS),? \(?(Chambre )?(de )?(la )?fam(ille)?\)?", flags = re.I)],
	[u"CS p\xe9t cr\xe9", re.compile(u"(Ct Sup((e|\\xe9)rieure)?|CS),? \(?Div(ision)? (de(s)? )?p(e|\\xe9)t(ites)? cr(e|\\xe9)(ances)?\)?", flags = re.I)],
	["CS fail & ins", re.compile(u"(Ct Sup((e|\\xe9)rieure)?|CS),? \(?(Chambre )?(de )?(la )?fail(lite)? ((et|&) )?(de )?(l')?ins(olvabilit(e|\\xe9))?\)?", flags = re.I)],
	["C supr fam", re.compile(u"Ct? supr((e|\\xea)me)?,? \(?Div(ision)? (de )?(la )?fam(ille)?\)?", flags = re.I)],
	["C supr A", re.compile(u"Ct? supr((e|\\xea)me)?,? \(?Div(ision)? d?'?appel\)?", flags = re.I)],
	["C supr BR", re.compile(u"Ct? supr((e|\\xea)me)?,? \(?(Div(ision)? (du )?Banc (de )?(la )?Reine|BR)\)?", flags = re.I)],
	["CSC", re.compile(r"(Ct? supr((e|\\xea)me)?|C supr) ((du|de) )?Can(ada)?", flags = re.I)],
	["Ct Martial App Ct", re.compile(r"Ct Martial Appeal( Ct)?( of)?", flags = re.I)],
	["CACM", re.compile(r"Ct d?'?appel (de )?(la )?Ct martiale", flags = re.I)],
	["CA Eq", re.compile(r"Ct (of )?Appeal (in )?\(?Eq(uity)?\)?( of)?", flags = re.I)],
	["Ct J (Gen Div)", re.compile(r"(Ct (of )?Just(ice)?|Ct J),? \(?Gen(eral)? Div(ision)?\)?( of)?$", flags = re.I)],
	["Ct J (Gen Div Sm Cl Ct)", re.compile(r"(Ct (of )?Just(ice)?|Ct J),? \(?Gen(eral)? Div(ision)?,? Sm(all)? Cl(aims)?( Ct)?\)?( of)?", flags = re.I)],
	["Ct J (Gen Div Fam Ct)", re.compile(r"(Ct (of )?Just(ice)?|Ct J),? \(?Gen(eral)? Div(ision)?,? Fam(ily)?( Ct)?\)?( of)?", flags = re.I)],
	["Ct J (Prov Div)", re.compile(r"(Ct (of )?Just(ice)?|Ct J),? \(?Prov(incial)? Div(ision)?\)?$", flags = re.I)],
	["Ct J (Prov Div Youth Ct)", re.compile(r"(Ct (of )?Just(ice)?|Ct J),? \(?Prov(incial)? Div(ision)?,? Youth\s?(Ct)?\)?( of)?", flags = re.I)],
	["CQ", re.compile(u"^Ct (of )?(Qu(e|\\xe9)bec|QC)( of)?$", flags = re.I)],
	["CQ (Civ Div)", re.compile(u"(Ct (of )?(Qu(e|\\xe9)bec|QC)|CQ),? \(?Ci(vil)? Div(ision)?\)?", flags = re.I)],
	["CQ (Civ Div Sm Cl)", re.compile(u"(Ct (of )?(Qu(e|\\xe9)bec|QC)|CQ),? \(?Civ(il)? Div(ision)?,? Sm(all)? Cl(aims)?( Ct)?\)?( of)?", flags = re.I)],
	["CQ (Crim & Pen Div)", re.compile(u"(Ct (of )?(Qu(e|\\xe9)bec|QC)|CQ),? \(?Crim(inal)? (&|and)?\s?Pen(al)? Div(ision)?\)?( of)?", flags = re.I)],
	["CQ (Youth Div)", re.compile(u"(Ct (of )?(Qu(e|\\xe9)bec|QC)|CQ),? \(?Youth Div(ision)?\)?( of)?", flags = re.I)],
	["QB", re.compile(r"^(Ct )?(of )?Queen'?s Bench$", flags = re.I)],
	["QB (Fam Div)", re.compile(r"((Ct )?(of )?Queen'?s Bench|QB),? \(?Fam(ily)? Div(ision)?\)?", flags = re.I)],
	["QB (TD)", re.compile(r"((Ct )?(of )?Queen'?s Bench|QB),?\s?\(?(Trial Div(ision)?|TD)\)?", flags = re.I)],
	["Div Ct", re.compile(r"^Div(isional)? Ct$", flags = re.I)],
	["Div & Mat Causes Ct", re.compile(r"Divorce(s)? ((&|and) )?Mat(rimonial)? Causes( Ct)?", flags = re.I)],
	["FCA", re.compile(r"(Fed(eral)?\s?(Ct)?|FC)\s?Appeal", flags = re.I)],
	["FCTD", re.compile(r"(Fed(eral)?( Ct)?|FC),? \(?(Tr(ial)? Div(ision)?|TD)\)?", flags = re.I)],
	["Mun Ct", re.compile(r"Mun(icipal)? Ct", flags = re.I)],
	["Prob Ct", re.compile(r"Prob((ate|ation|ationary))? Ct", flags = re.I)],
	["Prov Ct (Civ Div)", re.compile(r"Prov(incial)? Ct,? \(?Civ(il)? Div(ision)?\)?$", flags = re.I)],
	["Prov Ct (Civ Div Sm Cl Ct)", re.compile(r"Prov(incial)? Ct,? \(?Civ(il)? Div(ision)?,? Sm(all)? Cl(aims)?( Ct)?\)?", flags = re.I)],
	["Prov Ct (Crim Div)", re.compile(r"Prov(incial)? Ct,? \(?Crim(inal)? Div(ision)?\)?", flags = re.I)],
	["Prov Ct (Fam Ct)", re.compile(r"Prov(incial)? Ct,? \(?Fam(ily)? Ct\)?", flags = re.I)],
	["Prov Ct (Fam Div)", re.compile(r"Prov(incial)? Ct,? \(?Fam(ily)? Div(ision)?\)?", flags = re.I)],	
	["Prov Ct (Juv Div)", re.compile(r"Prov(incial)? Ct,? \(?Juv(enile)? Div(ision)?\)?", flags = re.I)],
	["Prov Ct (Sm Cl Div)", re.compile(r"Prov(incial)? Ct,? \(?Sm(all) Cl(aims) Div(ision)?\)?", flags = re.I)],
	["Prov Ct (Youth Ct)", re.compile(r"Prov(incial)? Ct,? \(?Youth( Ct)?\)?$", flags = re.I)],
	["Prov Ct (Youth Div)", re.compile(r"Prov(incial)? Ct,? \(?Youth Div(ision)?\)?", flags = re.I)],
	["Prov Off Ct", re.compile(r"Prov(incial)? Off(ences)? Ct", flags = re.I)],
	["Sm Cl Ct", re.compile(r"^Sm(all)? Cl(aims)? Ct$", flags = re.I)],
	["Sup Ct", re.compile(r"Sup(erior)? Ct (of )?\(?Can(ada)?\)?", flags = re.I)],
	["Sup Ct (Adm Div)", re.compile(r"Sup(erior)? Ct,? \(?Adm(in)?(istrative)? Div(ision)?\)?", flags = re.I)],
	["Sup Ct (Bank & Ins Div)", re.compile(r"Sup(erior)? Ct,? \(?Bank(ruptcy)? ((&|and) )?Ins(olvency)?( Div)?(ision)?\)?", flags = re.I)],
	["Sup Ct (Civ Div)", re.compile(r"Sup(erior)? Ct,? \(?Civ(il)? Div(ision)?\)?$", flags = re.I)],
	["Sup Ct (Crim & Pen Div)", re.compile(r"Sup(erior)? Ct,? \(?Crim(inal)? (&|and) Pen(al)? Div(ision)?\)?", flags = re.I)],
	["Sup Ct (Fam Div)", re.compile(r"Sup(erior)? Ct,? \(?Fam(ily)? Div(ision)?\)?", flags = re.I)],
	["Sup Ct (Sm Cl Div)", re.compile(r"Sup(erior)? Ct,? \(?Sm(all)? Cl(aims)? Div(ision)?\)?", flags = re.I)],
	["SC (AD)", re.compile(r"(Sup(reme)? Ct|SC),? \(?(Appeal|Appellate) Div(ision)?\)?", flags = re.I)],
	["SC (Fam Div)", re.compile(r"(Sup(reme)? Ct|SC),? \(?Fam(ily)? Div(ision)?\)?", flags = re.I)],
	["SC (QB Div)", re.compile(r"(Sup(reme)? Ct|SC),? \(?Queen'?s Bench( Div)?(ision)?\)?", flags = re.I)],
	["SC (TD)", re.compile(r"(Sup(reme)? Ct|SC),? \(?Tri?(al)?( Div)?(ision)?\)?", flags = re.I)],
	["TCC", re.compile(r"Tax Ct( of)?( Can)?(ada)?", flags = re.I)],
	["T Rev B", re.compile(r"Tax Rev(iew)? B(oar)?d?", flags = re.I)],
	["Terr Ct", re.compile(r"Terr(itorial)? Ct$", flags = re.I)],
	["Terr Ct Youth Ct", re.compile(r"Terr(itorial)? Ct \(?Youth( Ct)?\)?", flags = re.I)]]
	Results = []
	for Court in AllCourts:
		if re.search('^'+Court[0]+r'$', string, re.I):
			print string, "gave a perfect hit, RETURN: ", Court[0]
			return Court[0]
		if Court[1].search(string):
			Results.append(Court[0])
	if Results: 
		print "There were", len(Results), "results:", Results, "RETURN: ", Results[0]
		return Results[0]
	else: print "********* NO RESULTS for", string,"*********"
	return Results



#first detects whether there is a neutral citation present: if so, returns true
#Detects in the input the jurisdiction and the court and adds them together
#input is CleanedUp
#input will not be a neutral citation
#returns False if there is no jurisdiction at all
#returns list [Court, whether jurisdiction in the court name, in which case we do not run TakeOutJurisdiction******************* (True or False)]
def CleanUpCourt(string):
	print "***** Checking: ", string
	'''************ LOOKING FOR NEUTRAL CITATION ************'''
	NC = CheckForCourt(string)
	if NC:
		print "Found neutral citation: returning it \t\t**", 
		return [NC, True]
	'''************ LOOKING FOR JURISDICTION ************'''
	Jurisdiction = FindJurisdiction(string)
	if not Jurisdiction: #i.e. there was no jurisdiction
		print "Found no jurisdiction: returning False \t\t**"
		return False #FindCourt(string) #return False
	print "Found jurisdiction: ", Jurisdiction[0]
	'''************ FOUND JURISDICTION ************'''
	'''************ LOOKING FOR JURISDICTION - IN - COURT NAMES ************'''
	#there are some courts that have the name of the jurisdiction built in. in those cases, don't remove the jurisdiction before matching the court name
	print "Searching for regex match with court-with-jurisdiction: ", string
	Ct = re.compile(r'(C(our)?t|Cour)', flags = re.I)
	StringJ = string #create string (Jurisdiction) to look for the jurisdiction
	if Ct.search(StringJ):
		StringJ = re.sub(Ct.search(StringJ).group(), "Ct", StringJ, flags = re.I)
	Remove  = ["of", "des", "de" "la", "le", "the", "in"]
	for r in Remove:
		Rem = re.compile(regstr(r), flags = re.I)
		if Rem.search(StringJ):
			StringJ = re.sub(Rem.search(StringJ).group(), " ", StringJ, flags = re.I)
	StringJ = CleanUp(StringJ)
	print "Search modified to: ", StringJ
	DontRemove = [["CQ", re.compile(u"^Ct (of )?(Qu(e|\\xe9)bec|QC)( of)?$", flags = re.I)],
	["CAF", re.compile(u"Ct d?'?appel f(e|\\xe9)d((e|\\xe9)rale)?", flags = re.I)],
	["FCA", re.compile(r"(Fed(eral)?\s?(Ct)?|FC)\s?Appeal", flags = re.I)],
	["FCTD", re.compile(r"(Fed(eral)?( Ct)?|FC),? \(?(Tr(ial)? Div(ision)?|TD)\)?", flags = re.I)],
	["CQ (Civ Div)", re.compile(u"(Ct (of )?(Qu(e|\\xe9)bec|QC)|CQ),? \(?Ci(vil)? Div(ision)?\)?", flags = re.I)],
	["CQ (Civ Div Sm Cl)", re.compile(u"(Ct (of )?(Qu(e|\\xe9)bec|QC)|CQ),? \(?Civ(il)? Div(ision)?,? Sm(all)? Cl(aims)?( Ct)?\)?( of)?", flags = re.I)],
	["CQ (Crim & Pen Div)", re.compile(u"(Ct (of )?(Qu(e|\\xe9)bec|QC)|CQ),? \(?Crim(inal)? (&|and)?\s?Pen(al)? Div(ision)?\)?( of)?", flags = re.I)],
	["CQ (Youth Div)", re.compile(u"(Ct (of )?(Qu(e|\\xe9)bec|QC)|CQ),? \(?Youth Div(ision)?\)?( of)?", flags = re.I)],
	["CQ", re.compile(u"^Ct (du )?(Qu(e|\\xe9)bec|QC)$", flags = re.I)],
	["CQ jeun", re.compile(u"Ct (du )?(Qu(e|\\xe9)bec|QC),? (Chambre )?(de )?(la )?jeun(esse)?", flags = re.I)],
	["CQ civ", re.compile(u"(Ct (du )?(Qu(e|\\xe9)bec|QC)|CQ),? (Chambre )?civ(ile)?$", flags = re.I)],
	[u"CQ civ (div pet cr\xe9)", re.compile(u"(Ct (du )?(Qu(e|\\xe9)bec|QC)|CQ),? (Chambre )?civ(ile)? \(?Div(ision)? des petites cr(e|\\xe9)(ances)?\)?", flags = re.I)],
	[u"CQ crim & p\xe9n", re.compile(u"(Ct (du )?(Qu(e|\\xe9)bec|QC)|CQ),? (Chambre )?crim(inelle)? (et )?p(e|\\xe9)n(ale)?", flags = re.I)],
	["CSC", re.compile(r"(Ct? supr((e|\\xea)me)?|C supr) ((du|de) )?Can(ada)?", flags = re.I)],
	["SCC", re.compile(r"supr(eme)? Ct (of )?Can(ada)?", flags = re.I)],
	["Sup Ct", re.compile(r"Sup(erior)? Ct (of )?\(?Can(ada)?\)?", flags = re.I)],
	["TCC", re.compile(r"Tax Ct( of)?( Can)?(ada)?", flags = re.I)],
	[u"Div g\xe9n Ont", re.compile(u"Ct (de )?l'Ontario, div(ision)? g(e|\\xe9)n((e|\\xe9)rale)?", flags = re.I)]]
	for Court in DontRemove:
		if re.search('^'+Court[0]+r'$', StringJ, re.I):
			print StringJ, "gave a perfect hit, RETURN: ", Court[0]
			return [Court[0], True]
		if Court[1].search(StringJ):
			print StringJ, "gave a regex match, RETURN: ", Court[0]
			return [Court[0], True]
	print "Did not find a court with jurisdiction built into the name."
	'''************ LOOKING FOR COURT  ************'''
	print "Searching string: ", string
	string = re.sub(Jurisdiction[1].group(), "", string)#take the name of the jurisdiction out
	print "String with jurisdiction removed is: ", CleanUp(string)
	Court = FindCourt(CleanUp(string))#search the cleaned string for the court (w/ the jurisdiction OUT)
	print "Court found is: ", Court
	print "Returning: ", CleanUp(Jurisdiction[0] +" "+ Court), "\t\t**"
	return [CleanUp(Jurisdiction[0] +" "+ Court), False]

#inputs: the court selected by the machine beforehand (with the jurisdiction), and the citation used
#outputs the court (without the jurisdiction)
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

			
#pulls a date (string format) from a string
#first looks if the date is in the form "(1823), DF dsf", OR "2008 NBCA" etc.. (needs a capital following the date) if so, will return that date 
#second, pulls the LOWEST date from a string, between 1400 until 2014	
#will not pull a date from within a string of digits, but anything else
#returns false if no date in string		
#####*********** ALLOW OVERLAPPING IN THE ALL FINDER
def PullDate(string):
	FirstSearch = re.search(r'(\(?\[?)(1[4-9,0][0-9]{2}|200[0-9]{1}|201[1234]{1})(\)?\]?,?\s([A-Z]|\d{1,3}\s)[A-Za-z\s]{2})', string) #ex 2008 NBCA or (1843) Ex Ctf
	if FirstSearch:
		print "***** Detected on search 1: ", FirstSearch.group(), FirstSearch.group(1), FirstSearch.group(2), FirstSearch.group(3)
		return FirstSearch.group(2)
	All = re.findall(r'([^\d]{1}|^|\s)(1[4-9,0][0-9]{2}|200[0-9]{1}|201[1234]{1})([^\d]{1}|$|\s)', string)
	if not All:
		return False
	Dates = []
	for x in range(len(All)):
		Dates.append(int(All[x][1]))
	Sorted = sorted(Dates, key=lambda tup: tup)
	print "***** Detected on search 2: ", str(Sorted)
	return str(Sorted[0])
	

#this is the function that will ultimately call all of the other functions for the parallel citations
#the input is what is written in the form for parallel citations
def GetCitations(Citation_Input, Court_Input):
	PC = CleanUp(Citation_Input
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
	#TwoBest RETURNS THE REPORTERS THAT ARE USED
	Court = False #first assume there is no court evident in the input
	Jurisdiction = False # assume there is no jurisdiction evident in the input
	NeutralCite = False #first assume there is no neutral reporter evident in the input
	JudgementDate = False #assume there is no date evident in the input judgement
	CitationDate = False #assume there is no citation date evident in the input
	Pinpont = False #assume there is no pinpoint for now
	# Determine if there is a Citator Date or a Court evident in the Parallel citation
	if PullDate(TwoBest): CitationDate = PullDate(TwoBest) #set the citation date to be the lowest date in the string
	if CheckForCourt(TwoBest): Court = True
	print "Court = ", Court #True or False
	print "Citation Date = ", CitationDate #year or False
	if not Court and not CitationDate:
		print "NOT COURT AND NOT CITATIONDATE DETECTED ****"
		#Court_input = raw_input("Enter Court with Canadian Jurisdiction: \n")
		Ct = CleanUpCourt(CleanUp(Court_Input)) 
		Ct = TakeOutJurisdiction(Ct, TwoBest)
		Date_input = raw_input("Enter Date: \n")
		JudgementDate = CleanUp(Date_input)
		OUTPUT = ' ('+ JudgementDate + '), ' + TwoBest +' (' + Ct + ').'#combine all of this in the right way
	if CitationDate and not Court: 
		print "CITATIONDATE AND NOT COURT DETECTED ****"
		#Court_input = raw_input("Enter Court with Canadian Jurisdiction: \n")
		Ct = CleanUpCourt(CleanUp(Court_Input)) 
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


