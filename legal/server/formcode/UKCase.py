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
	i = re.sub("\[", "\[", i)
	i = re.sub("\]", "\]", i)
	i = re.sub("\^", "\^", i)
	i = re.sub("\$", "\$", i)
	i = re.sub("\.", "\.", i)
	i = re.sub("\|", "\|", i)
	i = re.sub("\?", "\?", i)
	i = re.sub("\*", "\*", i)
	i = re.sub("\+", "\+", i)
	i = re.sub("\(", "\(", i)
	i = re.sub("\)", "\)", i)
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


'''****************     CITATIONS     ****************''''''****************     CITATIONS     ****************'''
'''****************     CITATIONS     ****************''''''****************     CITATIONS     ****************'''
'''****************     CITATIONS     ****************''''''****************     CITATIONS     ****************'''
'''****************     CITATIONS     ****************''''''****************     CITATIONS     ****************'''
'''****************     CITATIONS     ****************''''''****************     CITATIONS     ****************'''
'''****************     CITATIONS     ****************''''''****************     CITATIONS     ****************'''
'''****************     CITATIONS     ****************''''''****************     CITATIONS     ****************'''
'''****************     CITATIONS     ****************''''''****************     CITATIONS     ****************'''
'''****************     CITATIONS     ****************''''''****************     CITATIONS     ****************'''
'''****************     CITATIONS     ****************''''''****************     CITATIONS     ****************'''
'''****************     CITATIONS     ****************''''''****************     CITATIONS     ****************'''
'''****************     CITATIONS     ****************''''''****************     CITATIONS     ****************'''


def regstrElec(i):#i is a string input
	i = re.sub("\[", "\[", i)
	i = re.sub("\]", "\]", i)
	i = re.sub("\^", "\^", i)
	i = re.sub("\$", "\$", i)
	i = re.sub("\.", "\.", i)
	i = re.sub("\|", "\|", i)
	i = re.sub("\?", "\?", i)
	i = re.sub("\*", "\*", i)
	i = re.sub("\+", "\+", i)
	i = re.sub("\(", "\(", i)
	i = re.sub("\)", "\)", i)
	one = r'\s'+i+ r'(?=,)'
	two = r'\s'+i+ r'$'
	thr = r'\s'+i+ r'\s'
	fou = r'^' +i+ r'\s'
	fiv = r'\('+i+ r'\)'
	six = r'\['+i+ r'\]'
	sev = r'^'+i+ r'$'
	string =  r'('+ one + r'|' + two + r'|' + thr + r'|' + fou + r'|' + fiv + r'|' + six + r'|' + sev + r')'
	return string

def regstrCt(i):#i is a string input
	one = r'\s'+i+ r'(?=,)'
	two = r'\s'+i+ r'$'
	thr = r'\s'+i+ r'\s'
	fou = r'^' +i+ r'\s'
	fiv = r'\('+i+ r'\)'
	six = r'^'+i+ r'$'
	string =  r'('+ one + r'|' + two + r'|' + thr + r'|' + fou + r'|' + fiv + r'|' + six + r')'
	return string

def PullDate(string):
	print "**** Starting PullDate on:" , string
	FirstSearch = re.search(r'(\(?\[?)(1[4-9][0-9]{2}|200[0-9]{1}|201[01234]{1})(\)?\]?,?\s([A-Z]|\d{1,3}\s)[A-Za-z\s]{2})', string) #ex 2008 NBCA or (1843) Ex Ctf
	if FirstSearch:
		print "***** Detected on search 1: ", FirstSearch.group(2)
		return FirstSearch.group(2)
	All = re.findall(r'([^\d]{1}|^|\s)(1[4-9][0-9]{2}|200[0-9]{1}|201[01234]{1})([^\d]{1}|$|\s)', string)
	if not All:
		return False
	Dates = []
	for x in range(len(All)):
		Dates.append(int(All[x][1]))
	Sorted = sorted(Dates, key=lambda tup: tup)
	print "***** Detected on search 2: ", str(Sorted)
	return str(Sorted[0])


#takes in a the citaion input string
#returns: [string, "NC"/"EWHC"/"No NC"]
#Court must be surrounded by a space on each side
def CheckNC(Citation_Input): #pull the neutral citation from the list if there is one
	print "**** Starting CheckNC"
	print "Checking for NC in string: ", Citation_Input
	PC = CleanUp(Citation_Input)
	if re.search(r"(;|,)$", PC):
		PC = CleanUp(PC[:-1])
	if re.search(r"^(;|,)", PC):
		PC = CleanUp(PC[1:])
	m = re.split('[,;]', PC) # 	#Split the citations based on positioning of commas and semicolons
	print "List of reporters: ", m
	for string in m: 
		Year = PullDate(string)
		if Year:
			string = CleanUp("["+Year+"] " + re.sub(re.search(regstr(Year), string).group(), "", string))
		else: 
			string = CleanUp("[input year] " + string)
		Courts = ['UKHL', 'UKPC', 'EWCA Civ', 'EWCA Crim', 'EWHC Admin']
		for x in Courts:
			if re.search(regstrElec(x), string, re.I): 
				print "Found neutral citation: ", x, "returning: ", string
				return [string, "NC"]
		if re.search(regstrElec("EWHC"), string, re.I):
			EWHCDivs = [['(Ch)', re.compile(r'\(?Ch(ancery)?( Div)?(ision)?\)?', flags = re.I)], ['(Pat)', re.compile(r'\(?Pat(ents)?\s?(Ct|Court)?\)?', flags = re.I)], ['(QB)', re.compile(r"\(?(QB|Queen's Bench|Queens Bench)( Div)?(ision)?\)?", flags = re.I)], ['(Admin)', re.compile(r'\(?Admin(istrative)?\s?(Ct|Court)?\)?', flags = re.I)], ['(Comm)', re.compile(r'\(?Comm(ercial)?\s?(Ct|Court)?\)?', flags = re.I)], ['(Admlty)', re.compile(r'\(?(Admir|Admirality|Admlty)\s?(Ct|Court)?\)?', flags = re.I)], ['(TCC)', re.compile(r'\(?(TCC|Tech and Constr|Tech & Constr|Technology and Construction|Technology & Construction)\s?(Ct|Court)?\)?', flags = re.I)], ['(Fam)', re.compile(r'\(?Fam(ily)?( Div)?(ision)?\)?', flags = re.I)]]
			for x in EWHCDivs:
				match = x[1].search(string)
				if match:
					string = CleanUp(re.sub(match.group(), "", string) + " " +x[0])
					print "Found neutral citation: ", x, "returning: ", string
					return [string, "NC"]
			return [string, "EWHC"]			
		Scot = ['HCJT', 'HCJAC', 'CSOH', 'CSIH']
		for x in Scot:
			if re.search(regstrElec(x), string, re.I): 
				print "Found neutral citation: ", x, "returning: ", string
				return [string, "NC"]
	return [string, "No NC"]
	

#returns [string, "none", "dropdown"/"court"/"no court"]
#true if there is an instance of LR or Law Reports --- have a drop down menu
#drop down menu should have ["Admirality and Ecclesiastical Cases (A & E)", "Appeal Cases (AC)", "Chancery (Ch)", "Chancery Appeals (Ch App)", "Common Pleas (CP)", "Crown Cases Reserved (CCR)", "Equity Cases (Eq)", "Exchequer (Ex)", "English and Irish Appeal Cases (HL)", "Family (Fam)", "Industrial Courts Reports (ICR)", "Ireland (Ir)", "King's Bench (KB)", "Privy Council (PC)", "Probate (P)", "Queen's Bench (QB)", "Law Reports Restrictive Practices (LR RP)", "Scotch and Divorce Appeal Cases (Sc & Div)"]
def LawReports(Citation_Input):
	print "******** Starting LawReports **********"
	print "Citation Input: ", Citation_Input
	PC = CleanUp(Citation_Input)
	#need to put the electronic sources in the correct format in case someone puts in (available on CanLII) without the ; or ,
	if re.search(r"(;|,)$", PC):
		PC = CleanUp(PC[:-1])
	if re.search(r"^(;|,)", PC):
		PC = CleanUp(PC[1:])
	m = re.split('[,;]', PC) # 	#Split the citations based on positioning of commas and semicolons
	print "List of reporters: ", m
	Abbs = ['A & E', 'AC', 'Ch', 'Ch App', 'CP', 'CCR', 'Eq', 'Ex', 'HL', 'Fam', 'ICR', 'Ir', 'KB', 'PC', 'P', 'QB', 'RP', 'Sc & Div']
	for s in m:
		string = CleanUp(re.sub("\sLR\s?", "", s))
		for x in Abbs:
			if re.search(regstr(x), string, re.I):
				string = re.sub(re.search(regstr(x), string, re.I), "", string)
				Year = PullDate(string)
				if Year:
					string = CleanUp("["+Year+"] " + x + " " + re.sub(re.search(regstr(Year), string).group(), "", string))
				else: 
					string = CleanUp("[input year] " + x + " " + string)
				if x == ("HL" or "PC"):
					return [string, "court"]
				else: return [string, "no court"]
		#if there is no proper instance of the law reports, see if the words LR or Law Reports are mentioned, and if so have a drop down menu
		matchone = re.search(regstr("LR"), s, re.I)
		matchtwo = re.search(regstr("Law Reports"), string, re.I)
		if matchone or matchtwo:
			return [string, "dropdown"]
	return [string, "none"]

#returns [string, "court"/"no court"]
def InterpretLRInput(string):#how to do it when Law Reports (LR) are used
	print "******** Starting InterpretLRInput **********"
	print "Input: ", string
	KeepAsIs = [["Appeal Cases (AC)", 'AC'], ["Chancery (Ch)", "Ch"],["Common Pleas (CP)", "CP"], ["Exchequer (Ex)", "Ex"], ["Family (Fam)", "Fam"], ["Industrial Courts Reports (ICR)", "ICR"], ["King's Bench (KB)", ""], ["Probate (P)", "P"], ["Queen's Bench (QB)", "QB"], ["Law Reports Restrictive Practices (LR RP)", ""]]
	Change = [["Admirality and Ecclesiastical Cases (A & E)", 'A & E'], ["Chancery Appeals (Ch App)", 'Ch App'], ['Crown Cases Reserved (CCR)', 'CCR'], ['Equity Cases (Eq)', 'Eq'], ['English and Irish Appeal Cases (HL)', 'HL'], ['Ireland (Ir)', 'Ir'], ['Privy Council (PC)', 'PC'], ['Scotch and Divorce Appeal Cases (Sc & Div)', 'Sc & Div']]
	for x in KeepAsIs:
		if x[0]==string:
			return [x[1], "no court"]
	for x in Change:
		if x[0]==string:
			if x[1] == ("LRHL" or "LRPC"):
				return [string, "court"]
			return [x[1], "no court"]


#auxillary function for use in BestReporter
def CheckReporter(m, list):
	print "\n****** StartingCheckReporter within BestReporter"
	print "Input reporter list: ", m
	#print "Checking to see if in, ", list
	for r in m: #look at each reporter inputed in the input list
		for x in list:#will run through the Federa; reporters in order.
			match = re.search(regstr(x), r, re.I)
			if match:
				r = CleanUp(re.sub(match.group(), " "+x+" ", r, flags = re.I))
				print "*Found a reporter* ::: ", x
				return [r, "NA"]
	return False

#returns [best reporter, "court"/"no court"]
#input the citation input and whether there is a Neutral Citation (NC). NC = True or False
def BestReporter(Citation_Input):
	print "******** Starting BestReporter **********"
	print "Citation Input: ", Citation_Input
	PC = CleanUp(Citation_Input)
	#need to put the electronic sources in the correct format in case someone puts in (available on CanLII) without the ; or ,
	if re.search(r"(;|,)$", PC):
		PC = CleanUp(PC[:-1])
	if re.search(r"^(;|,)", PC):
		PC = CleanUp(PC[1:])
	m = re.split('[,;]', PC) # 	#Split the citations based on positioning of commas and semicolons
	print "List of reporters: ", m				
	series = ["2d", "3d", "4th", "5th", "6th", "7th", "8th"]
	for x in range(len(m)): #replace "2d" with "(2d)", etc (i.e. put them in brackets
		for s in series:
			match = re.search(' '+s+' ', m[x], re.I)
			if match:
				print "Found a series number without brackets"
				m[x] = re.sub(match.group(), ' ('+s+') ', m[x])
				break
	for x in range(len(m)): m[x] = CleanUp(m[x]) #remove excess white spaces on either side
	print "List of reporters: ", m
	print "Checking LawReports..."
	for x in m:
		LR = LawReports(x)
		if LR[1] == ("court" or "no court"):
			return [LR[0], LR[1]]
	print "Nothing Found in Law Reports, checking now in ER and other Reporters...."
	ER = ["ER"]
	Reporters = ['A & N', 'AC', 'Adam', 'Add', 'ADIL', 'Al', 'All ER', 'All ER (Comm)', 'All ER (EC)', 'All ER Rep', 'All ER Rep Ext', 'ALR', 'Amb', 'And', 'Andr', 'Anst', 'App Cas', 'App Div', 'Arn', 'Arn & H', 'Asp MLC', 'Atk', 'B & Ad', 'B & Ald', 'B & CR', 'B & Cress', 'B & S', 'Ball & B', 'Barn C', 'Barn KB', 'Barnes', 'Batt', 'Beat', 'Beav', 'Bel', 'Bell', 'Ben & D', 'Benl', 'BILC', 'Bing', 'Bing NC', 'BISD', 'Bla H', 'Bla W', 'Bli', 'Bli NS', 'Bos & Pul', 'Bos & Pul NR', 'Bridg', 'Bridg Conv', 'Bridg J', 'Bridg O', 'Bro CC', 'Bro PC', 'Brod & Bing', 'Brooke NC', 'Brown & Lush', 'Brownl', 'Bulst', 'Bunb', 'Burr', 'Burrell', 'C & J', 'C & M', 'Calth', 'Camp', 'Car & K', 'Car & M', 'Car & P', 'Carter', 'Carth', 'Cary', 'Cas t Hard', 'Cas t Talb', 'CB', 'CB (NS)', 'Ch', 'ChApp', 'Ch Ca', 'Ch D', 'Ch R', 'Chan Cas', 'Chit', 'Choyce Ca', 'CIJ M\\xe9moires', 'CIJ Rec', 'Cl & F', 'CM & R', 'Coll', 'Colles', 'Corn', 'Comb', 'Cooke CP', 'Coop Pr Ca', 'Coop t Br', 'Coop t Cott', 'Coop G', 'Co Rep', 'Cowp', 'Cox', 'CPD', 'CPJI (Ser A)', 'CPJI (S\\xe9r B)', 'CPJI (S\\xe9r A/B)', 'CPJI (S\\xe9r C)', 'Cun', 'Curt', 'Dan', 'Davis', 'Dee & Sw', 'Dears', 'Dears & B', 'De G & J', 'De G & Sm', 'De G F & J', 'De G J & S', 'De G M & G', 'Den', 'Dick', 'Dods', 'Donn', 'Doug', 'Dow', 'Dow & Cl', 'Dowl & Ry', 'Drew', 'Drew &', 'Dy', 'East', 'Eden', 'Edw', 'El & Bl', 'El & El', 'El Bl & El', 'EMLR', 'Eq Ca Abr', 'ER', 'Esp', 'Ex D', 'Exch Rep', 'F', 'F & F', 'Fam', 'Fitz-G', 'Forrest', 'Fort', 'Fost', 'FTLR', 'Giff', 'Gilb Cas', 'Gilb Rep', 'Godbolt', 'Gould', 'Gow', 'H&C', 'H&M', 'H&N', 'H & Tw', 'Hag Adm', 'Hag Con', 'Hag Ecc', 'Hague Ct Rep', 'Hague Ct Rep (2d)', 'Hardr', 'Hare', 'Hay & M', 'Her Tr Nor', 'Het', 'HL Cas', 'HL Cas', 'Hob', 'Hodges', 'Holt', 'Holt, Eq', 'HoIt, KB', 'Hut', 'IBDD', 'I Ch R', 'ICJ Pleadings', 'ICJ Rep', 'ICLR', 'ICR', 'ICR', 'ICSID', 'I LR', 'I LR', 'ILRM', 'ILTR', 'Inter-Am Ct HR (Ser A)', 'Inter-Am Ct HR (Ser B)', 'Inter-Am Ct HR (Ser C)', 'IR', 'IR Eq', 'I RCL', 'J&H', 'Jac', 'Jac & W', 'Jenk', 'Johns', 'Jones, T', 'Jones, W', 'K & J', 'Kay', 'KB', 'Keble', 'Keen', 'Keilway', 'Kel J', 'Kel W', 'Keny', 'Kn', 'Lane', 'Latch', 'Leach', 'Lee', 'Leo', 'Lev', 'Lewin', 'Le & Ca', 'Ley', 'Lilly', 'Lit', 'LI LR', "Lloyd's LR", "Lloyd's Rep", "Lloyd's Rep Med", 'Lush', 'Lut', 'M&M', 'M & Rob', 'M&S', 'M &W', 'Mac & G', 'MacI & R', 'Madd', 'Man & G', 'March, NR', "M'Cle", "M'Cle & Yo", 'Mer', 'Mod', 'Moo Ind App', 'Moo KB', 'Moo PC', 'Moo PCNS', 'Mood', 'Mos', 'My & Cr', 'My & K', 'Nels', 'Noy', 'Ow', 'P', 'P Wms', 'Palm', 'Park', 'PD', 'Peake', 'Peake Add Cas', 'Ph', 'Phill Ecc', 'PI Com', 'Pollex', 'Pop', 'Prec Ch', 'Price', 'QB', 'QBD', 'Raym Ld', 'Raym T', 'Rep Ch', 'Rep t Finch', 'Ridg t Hard', 'RIAA', 'Rob / Rob Chr', 'Rob Ecc', 'Rolle', 'RPC', 'RPC', 'RR', 'Russ', 'Russ & M', 'Russ & Ry', 'Salk', 'Sav', 'Say', 'Scot LR', 'Sel Cat King', 'Sess Cas', 'Sess Cas', 'Sess Cas S', 'Sess Cas D', 'Sess Cas F', 'Sess Cas M', 'Sess Cas R', 'Show KB', 'Show PC', 'Sid', 'Sim', 'Sim (NS)', 'Sim & St', 'SLT', 'Skin', 'Sm & G', 'Sp Ecc & Ad', 'Sp PC', 'Stark', 'Str', 'Sty', 'Sw & Tr', 'Swab', 'Swans', 'Talb', 'Taml', 'Taun', 'TLR', 'Toth', 'TR', 'TTC', 'TTR (2d)', 'Vaugh', 'Vent', 'Vern', 'Ves & Bea', 'Ves Jr', 'Ves Sr', 'Welsb H & G', 'West, t Hard', 'West', 'Wight', 'Will Woll & H', 'Willes', 'Wilm', 'Wils Ch', 'Wils Ex', 'Wils KB', 'Winch', 'WLR', 'Wms Saund', 'W Rob', 'Y & C Ex', 'Y & CCC', 'Y & J', 'Yel', 'You']
	F = CheckReporter(m, ER)
	if F:
		print "Found ER: ", F[0]
		return [F[0], "no court"]
	F = CheckReporter(m, Reporters)
	if F:
		print "Found a reporter: ", F[0]
		return [F[0], "no court"]
	print "No reporters found, returning default (the first court in m, being ", m[0]
	return [m[0], "no court"]#return the input if it's not recognized
	
	
#COURT WILL BE A DROP DOWN MENU CONTAINING THE FOLLOWING
'''[["Chancery Court", "Ch"], 
["Court of Justice (Scotland)", "Ct Just"], 
["Court of Sessions (Scotland)", "Ct Sess"], 
["High Court of Admirality", "HC Adm"], 
["High Court of Justice", "HCJ"], 
["High Court: Chancery Division", "ChD"], 
["High Court: Family Division", "FamD"], 
["High Court: Queen's Bench Division", "QBD"], 
["House of Lords (England)", "HL (Eng)"],
["House of Lords (Scotland)", "HL (Scot)"],
["Judicial Committee of the Privy Council", "PC"],
["Stipendiary Magistrate Court", "Stip Mag Ct"],
["Other", "Other"]]#(in case of other, have them input something and run DefaultCt on it'''

def DefaultCt(string):
	print "**** Running DefaultCt within the CheckCt function. Input: ", string
	Change = [["High Court", "HC"], ["Chancery", "Ch"], ["Privy Council", "PC"], ["Division", "D"], ["Stipendiary", "Stip"], ["House of Lords", "HL"], [r'Criminal', 'Crim'], ["Admirality", "Adm"], [r'Superior', 'Super'], [r'Juvenile', 'Juv'], [r'Magistrate', 'Magis'], [r'General', 'Gen'], [r'Sessions?', 'Sess'], [r'App(ellate|eal)s?', 'App'],
	[r'Family', 'Fam'], [r'Review', 'Rev'],	["Justice", "Just"],[r'Circuit', 'Cir'], [r'Supreme', 'Sup'], [r"Record(er)?'?s?", 'Rec'], [r'District', 'Dist'], [r'Civil', 'Civ'], [r'Federal', 'Fed'], [r'Criminal', 'Crim'], [r"Child(ren)?'?s?", 'Child'], [r'Judicial', 'Jud'], [r'Internaional', "Int'l"], [r'Intermediate', 'Intermed']]
	for C in Change:
		foo = re.compile(C[0], flags = re.I)
		if foo.search(string):
			string = re.sub(foo.search(string).group(), C[1], string, flags = re.I)
	return string


'''def CheckNC(string):
	Courts = ['UKHL', 'UKPC', 'EWCA Civ', 'EWCA Crim', 'EWHC Admin']
	for x in Courts:
		if re.search(regstrElec(x), string, re.I): 
			print "Found neutral citation: ", x
			return [string, "NC"]
	if re.search(regstrElec("EWHC"), string, re.I):
		EWHCDivs = [['(Ch)', re.compile(r'\(?Ch(ancery)?( Div)?(ision)?\)?', flags = re.I)], ['(Pat)', re.compile(r'\(?Pat(ents)?\s?(Ct|Court)?\)?', flags = re.I)], ['(QB)', re.compile(r"\(?(QB|Queen's Bench|Queens Bench)( Div)?(ision)?\)?", flags = re.I)], ['(Admin)', re.compile(r'\(?Admin(istrative)?\s?(Ct|Court)?\)?', flags = re.I)], ['(Comm)', re.compile(r'\(?Comm(ercial)?\s?(Ct|Court)?\)?', flags = re.I)], ['(Admlty)', re.compile(r'\(?(Admir|Admirality|Admlty)\s?(Ct|Court)?\)?', flags = re.I)], ['(TCC)', re.compile(r'\(?(TCC|Tech and Constr|Tech & Constr|Technology and Construction|Technology & Construction)\s?(Ct|Court)?\)?', flags = re.I)], ['(Fam)', re.compile(r'\(?Fam(ily)?( Div)?(ision)?\)?', flags = re.I)]]
		for x in EWHCDivs:
			match = x[1].search(string)
			if match:
				string = CleanUp(re.sub(match.group(), "", string) + " " +x[0])
				return [string, "NC"]
		return [string, "EWHC"]			
	Scot = ['HCJT', 'HCJAC', 'CSOH', 'CSIH']
	for x in Scot:
		if re.search(regstrElec(x), string, re.I): 
			print "Found neutral citation: ", x
			return [string, "NC"]
	return [string, "No NC"]'''


def AutoPCPinpoint(Citation_Input):
	print "\n****** Starting GetCitations"
	print "input is:\n", "citation string: ", Citation_Input
	PC = CleanUp(Citation_Input)
	#need to put the electronic sources in the correct format in case someone puts in (available on CanLII) without the ; or ,
	if re.search(r"(;|,)$", PC):
		PC = CleanUp(PC[:-1])
	if re.search(r"^(;|,)", PC):
		PC = CleanUp(PC[1:])
	m = re.split('[,;]', PC) # 	#Split the citations based on positioning of commas and semicolons
	print "List of reporters: ", m
	for x in m:
		NC = CheckNC(string)
		if NC[1]=="NC":#returns: [string, "NC"/"EWHC"/"No NC"/]
			if len(m)==1:
				print "NC detected and no other reporter. Need another reporter."
				return ["Requires a reporter in addition to this neutral citation.", "NA"]
			return ["cite to paragraph in NC only", NC[0]]
			pass
		elif NC[1] == "EWHC":
			#drop down menu for division (below the PC input box)
			return ["dropdown", "NA"]
			#["Chancery Division", '(Ch)'], ["Patents Court", '(Pat)'], ["Queen's Bench", '(QB)'], ["Administrative Court", '(Admin)'], ["Commercial Court", '(Comm)'], ["Admirality Court", '(Admlty)'], ["Technology and Construction",'(TCC)'], ["Family Division", '(Fam)']
			#need to take the input from the drop down menu and do something with it...
			pass
		elif NC[1] == "No NC":
			pass
		R = BestReporter(x)
		return ["cite to paragraph or page in reporter", R]
		#cite to page or para in R

	
#If CheckNC: need to cite to para
#otherwise cite to page or para in the reporter from BestReporter
#pincite = ["NC"/"reporter para"/"reporter page"/"none", number]
def GetCitations(Citation_Input, Court_Input, Date_Input, pincite):
	print "\n****** Starting GetCitations"
	print "input is:\n", "citation string: ", Citation_Input, "\n", "court: ", Court_Input, "\n", "date: ", Date_Input, "\n", "pincite: ", pincite, "\n"
	if not Citation_Input:
		return "ERROR: missing citation input"
	if not Citation_Input:
		", ERROR: missing citation input"
	if not Court_Input:
		return ", ERROR: missing court input"
	if not Date_Input:
		return ", ERROR: missing date input"
	BR = BestReporter(Citation_Input) #returns the best reporter, no funny business
	Best = BR[0]
	NC = CheckNC(Citation_Input) #returns: [string, "NC"/"EWHC"/"No NC"] #pull the neutral citation from the list if there is one
	if NC[1] == ("NC" or "EWHC"):
		print "In GetCitations, found NC:", NC[0]
		NeutralCitation = NC[0]
	else: NeutralCitation = False
	#find if there is a citationyear present. if it is in the neutral citation, format it correctly
	CitationYear = False #assume there is no citation date evident in the input
	Court = False #first assume there is no court evident in the reporter
	JudgementYear = False #assume there is no date evident in the input judgement
	if NeutralCitation: 
		Court = True
		CitationYear = PullDate(NeutralCitation)
		if not CitationYear:
			NeutralCitation = CleanUp("[input year] " + NeutralCitation)
			CitationYear = True
		JudgementYear = CitationYear
	else: CitationYear = PullDate(Best)
	#pincite = [pinpoint/cite, reporter, type (para or page), input]
	if BR[1] == "court":
		Court = True
	if PullDate(Best): 
		CitationYear = PullDate(Best) #set the citation date to be the date in the string, if present
	print "Court = ", Court #True or False
	print "Citation Date = ", CitationYear #year or False or True
	if not Court and not CitationYear:
		print "NOT COURT AND NOT CITATIONDATE DETECTED ****"
		#Court_input = raw_input("Enter Court with Canadian Jurisdiction: \n")
		Ct = DefaultCt(CleanUp(Court_Input))
		JudgementYear = PullDate(CleanUp(Date_Input))
		OUTPUT = ' ('+ JudgementYear + '), ' + Best + ' ' + Ct#combine all of this in the right way
	if Court and not CitationYear:
		print "COURT AND NOT CITATIONDATE DETECTED ****"
		#Court_input = raw_input("Enter Court with Canadian Jurisdiction: \n")
		JudgementYear = PullDate(CleanUp(Date_Input))
		OUTPUT = ' ('+ JudgementYear + '), ' + Best#combine all of this in the right way
	if CitationYear and not Court: 
		print "CITATIONDATE AND NOT COURT DETECTED ****"
		#Court_input = raw_input("Enter Court with Canadian Jurisdiction: \n")
		Ct = DefaultCt(CleanUp(Court_Input))
		JudgementYear = PullDate(CleanUp(Date_Input))
		OUTPUT = ' ('+ JudgementYear + '), ' + Best + ' ' + Ct#combine all of this in the right way
		if (JudgementYear==CitationYear): 
			OUTPUT = ', ' + Best + '(' + Ct + ')'
		else:
			OUTPUT = ' ('+ JudgementYear + '), ' + Best + ' (' + Ct+ ')'
	if NeutralCitation:
		print "CITATIONDATE AND COURT DETECTED"
		OUTPUT = NeutralCitation + ', ' + Best
	print "Result:", OUTPUT
	return OUTPUT

GetCitations("2004 UKHL 22, 2004 2 LR AC 457", "ukhl", "2004", False)
