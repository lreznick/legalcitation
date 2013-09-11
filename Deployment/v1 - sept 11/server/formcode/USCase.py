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
	##print("\nStart:: " + string)
	string = CleanUp(string) # clean up the string before it enters the machine
	# (1) GUARDIAN AD LITEM
	adlit = re.compile(r'\(?(g|G)uardian\s(a|A)d\s(l|L)item\s?((O|o)f)?\)?')
	if adlit.search(string):
		match = adlit.search(string)#detect the match object
		sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
		string = re.sub(sub, '', string) + " (Guardian ad litem of)"
	##print("gaurdian:: " + string +"\n")
	# (2) LITIGATION GUARDIAN
	lit = re.compile(r'\(?(l|L)itigation\s(g|G)uardian\s?((o|O)f)?\)?')
	if lit.search(string):
		match = lit.search(string)#detect the match object
		sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
		string = re.sub(sub, '', string) + " (Litigation guardian of)"
	##print("lit gaurdian:: " + string+"\n")
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
	##print("Corporation:: " + string+"\n")
	# (5) TRUSTEE
	trustee = re.compile(r'(\(?(t|T)rustee\s?((o|O)f)\)?|\(?(t|T)rustee\s?((o|O)f)?\)?$)')
	if trustee.search(string):
		match = trustee.search(string)#detect the match object
		sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
		string = re.sub(sub, '', string) + " (Trustee of)"
	##print("trustee:: " + string+"\n")
	# (6) RECEIVERSHIPS
	rec = re.compile(r'(\(?(r|R)eceiver(ship)?\s?((o|O)f)\)?|\(?(r|R)eceiver(ship)?\s?((o|O)f)?\)?$)')
	if rec.search(string):
		match = rec.search(string)#detect the match object
		sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
		string = re.sub(sub, '', string) + " (Receiver of)"
	##print("receiv:: " + string+"\n")
	# (7) LIQUIDATOR
	liq = re.compile(r'(\(?(l|L)iquidat(e|or)s?\s?((o|O)f)\)?|\(?(l|L)iquidat(e|or)s?\s?((o|O)f)?\)?$)')
	if liq.search(string):
		match = liq.search(string)#detect the match object
		sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
		string = re.sub(sub, '', string) + " (Liquidator of)"
	##print("liquid:: " + string+"\n")
	# (8) COUNTRIES (need list of countries)
	# (9) CITIES (need database of cities and municipalities)
	string = re.sub('\(\s*?\)', '', string)#there are brackets sometimes not subbed out of the string, so I remove empty ones
	string = CleanUp(string)#clean string for final presentation
	##print("End:: " + string+"\n")
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
	##print "Made it here with: ", string
	Ref = re.compile(r'(^\(?(r|R)ef(erence)?\s?((r|R)e)?\)?|[\(\s]?(r|R)ef(erence)?.{0,2}\s?((r|R)e)?$)')
	if Ref.search(string):
		##print "Detected a reference in: ", string, ", adding 'Reference Re'"
		match = Ref.search(string)#detect the match object
		sub = match.group().strip()#find the object and strip it of spaces to sub into the replacement function
		string = "Reference Re " + re.sub(sub, '', string)
		string = re.sub('\(\s*?\)', '', string)#there are brackets sometimes not subbed out of the string, so I remove empty ones
		##print "Added: string is now: ", string
	#fix P in Ex Parte to Ex parte
	if "Ex Parte" in string: string = string.replace("Ex Parte", "Ex parte")
	return CleanUp(string)
	
#This is a function only for a single style of cause (i.e. no joinder). it looks at both parties (or one, as the case may be) and adds
def Action(StyleOfCause):
	Parties = re.split(r'\b(?:\s*)[vV](?:\s*)\b', StyleOfCause) #Separate the parties (separated by ' v ' or ' V ' or ) into a list
	for x in range(len(Parties)): #capitalize each party individually (best to do each and not altogether because the 'v' is lowercase and might throw off the capitalization algorithm.
		Parties[x] = Capitalize(Parties[x])
	if len(Parties)==1: #If there is only one party
		##print "Length of party is one: ", Parties[0]
		#Replace provincial acronyms with the correct format
		# First, check if it is a statutory reference
		Ref = ["Reference", "Ref", "Re", "In re", "In the matter of", "Dans l'affaire de"]
		Statute = ["Statute", "Code", "Act", "Regulation", "Regulations", "Guidelines"]
		if any(re.search(regstr(x), Parties[0], re.I) for x in Ref) and any(re.search(regstr(x), Parties[0], re.I) for x in Statute): #if the style of cause discloses that it is a reference
			##print "Calling StatuteChallenge for: ", Parties[0]
			OUTPUT = StatuteChallenge(Parties[0]) #see if the SoC discloses it is a challenge to a statute and correct it if so
			##print "After Calling StatuteChallenge, string is: ", OUTPUT
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
	##print "OUTPUT at end of Action: ", OUTPUT
	return CleanUp(OUTPUT)
			
#this is the function to call to reformat the style of cause
#input string
def GetStyleOfCause(StyleOfCause_Input):
	StyleOfCause = CleanUp(StyleOfCause_Input) #Properly capitalize SoC and clean it up
	Suits = re.split(r'\b(?:\s*);(?:\s*)\b', StyleOfCause)
	if len(Suits)==1:
		##print "Calling Action for only 1 suit on: ", StyleOfCause
		OUTPUT = Action(StyleOfCause)
	else:
		OUTPUT = ""
		for j in range(len(Suits)): # run the formatting of the action function and add the suits together by ;
			Suits[j] = Action(Suits[j])
			OUTPUT = OUTPUT + Suits[j] + "; " #add all of the parties together
		OUTPUT = re.sub(';\s$', '', OUTPUT) #remove the last " v " on the end
	##print "At end of GetSoC: OUTPUT = ", OUTPUT
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
	six = r'^'+i+ r'$'
	string =  r'('+ one + r'|' + two + r'|' + thr + r'|' + fou + r'|' + fiv + r'|' + six + r')'
	return string

#pulls a date (string format) from a string
#first looks if the date is in the form "(1823), DF dsf", OR "2008 NBCA" etc.. (needs a capital following the date) if so, will return that date 
#second, pulls the LOWEST date from a string, between 1400 until 2014	
#will not pull a date from within a string of digits, but anything else
#returns false if no date in string		
def PullDate(string):
	#print "\n****** Starting PullDate"
	FirstSearch = re.search(r'(\(?\[?)(1[4-9][0-9]{2}|200[0-9]{1}|201[01234]{1})(\)?\]?,?\s([A-Z]|\d{1,3}\s)[A-Za-z\s]{2})', string) #ex 2008 NBCA or (1843) Ex Ctf
	if FirstSearch:
		#print "***** Detected on search 1: ", FirstSearch.group(2)
		return FirstSearch.group(2)
	All = re.findall(r'([^\d]{1}|^|\s)(1[4-9][0-9]{2}|200[0-9]{1}|201[01234]{1})([^\d]{1}|$|\s)', string)
	if not All:
		return False
	Dates = []
	for x in range(len(All)):
		Dates.append(int(All[x][1]))
	Sorted = sorted(Dates, key=lambda tup: tup)
	#print "***** Detected on search 2: ", str(Sorted[0])
	return str(Sorted[0])

#input is the date input. this function is called from BestReporter
#returns [correctly date-formatted string, "ok"] OR [some string, "bad format!"]
def CheckUSLWDate(string):
	#print "\n****** Starting CheckFullDate"
	errormsg = "bad format!"
	string = re.sub(',','', string)              #Remove all periods
	months = [["January", "Jan", "01"], ["February", "Feb", "02"], ["March", "Mar", "03"],  ["April", "Apr", "04"],  ["May", "May", "05"],  ["June", "Jun", "06"], ["July", "Jul", "07"], ["August", "Aug", "08"], ["September", "Sept", "09"], ["October", "Oct", "10"], ["November", "Nov", "11"], ["December", "Dec", "12"]]
	formatOne = re.compile(r'^((14|15|16|17|18|19|20)\d\d)[- /\.](0[1-9]|1[012])[- /\.](0[1-9]|[12][0-9]|3[01])$')#yyyy/mm/dd
	m = formatOne.search(string)
	if m:
		yearFormatOne = CleanUp(m.group(1))
		monthFormatOne = CleanUp(m.group(3))
		#print "detected yyyy/mm/dd format...."
		#print "year " + yearFormatOne
		#print "month " + monthFormatOne
		CH = False
		for x in months:
			if x[2]==monthFormatOne:
				month = x[0]
				CH = True
		if not CH:
			#print "Error! no Month match on", monthFormatOne
			month = monthFormatOne
		dayFormatOne  = m.group(4)
		#print "day[0] " + dayFormatOne[0]
		if dayFormatOne[0]=="0":
			#print "yeh"
			dayFormatOne = dayFormatOne[1]
		string = dayFormatOne + ' ' + month + ' '+yearFormatOne
		return [string, "ok"]
	#print "No yyyy/mm/dd found. Now looking for it written out. Running PullDate:"
	yearFormatTwo = PullDate(string)
	if not yearFormatTwo:
		return [string, errormsg]
	else:
		string = CleanUp(re.sub(yearFormatTwo, ' ', string))
		year = yearFormatTwo
		#print "year found: ", year
	Hit = False
	for x in months:
		monthFormatTwo = re.compile(regstrElec(x[0]), flags = re.I)
		monthFormatThree = re.compile(regstrElec(x[1]), flags = re.I)
		if monthFormatTwo.search(string):
			#print "Found month: ", x[0]
			month = x[0]
			Hit = True
			string = CleanUp(re.sub(monthFormatTwo.search(string).group(), ' ', string))
			break
		elif monthFormatThree.search(string):
			#print "Found month: ", x[0]
			month = x[0]
			Hit = True
			string = CleanUp(re.sub(monthFormatThree.search(string).group(), ' ', string))
			break
	#print "Hit?: ", Hit
	if not Hit:
		highnum = re.compile(r'(1(3|4|5|6|7|8|9|)|2\d|3\d)')
		h = highnum.search(string)
		if h:
			day = h.group()
			string = CleanUp(re.sub(day, '', string))
		monthmatch = re.search(r'(0[1-9]|1[012])\.?$', string)
		if monthmatch:
			monthnum = monthmatch.group()
			string = CleanUp(re.sub(monthnum, '', string))
			for m in months:
				#print monthnum, m[2]
				if monthnum==m[2]: 
					month = m[0]
					break
				else: month = monthnum
		else:
			month = False
		if not h:
			daymatch = re.search(r'(0[1-9]|[12][0-9]|3[01])', string)
			if daymatch:
				day = daymatch.group()
		if (day and month):
			string = day + ' ' + month + ' '+year
			return [string, "ok"]
	if not month:
		return [string, errormsg]
	dayFormatTwo = re.compile(r'(0[1-9]|[12][0-9]|3[01])')
	if dayFormatTwo.search(string):
		dayNum = dayFormatTwo.search(string).group()
		#print "Day: ", dayNum
		if dayNum[0]=="0":
			dayNum = dayNum[1]
		string = dayNum + ' ' + month + ' ' + year
		return [string, "ok"]
	dayFormatThree = re.compile(r'[1-9]')
	if dayFormatThree.search(string):
		dayNum = dayFormatThree.search(string).group()
		#print "Day: ", dayNum
		if dayNum[0]==0:
			dayNum = dayNum[1]
		string = dayNum + ' ' + month + ' ' + year
		return [string, "ok"]
	#[- /\.]
	else: return [string, errormsg]

def CheckReporter(m, list):
	#print "\n****** StartingCheckReporter within BestReporter"
	#print "Input reporter list: ", m
	##print "Checking to see if in, ", list
	for r in m: #look at each reporter inputed in the input list
		for x in list:#will run through the Federa; reporters in order.
			match = re.search(regstr(x), r, re.I)
			if match:
				r = CleanUp(re.sub(match.group(), " "+x+" ", r, flags = re.I))
				#print "*Found a reporter* ::: ", x
				return [r, "NA"]
	return False



#returns 3-part list [Reporter, "USSC"/"Fed"/"State", Date]
def BestReporter(Citation_Input, Date):
	#print "******** Starting BestReporter **********"
	#print "Citation Input: ", Citation_Input
	#print "Date input: ", Date
	if not PullDate(Date):
		#print "INVALID DATE IN BESTREPORTER"
		return ["Error: Date is missing", "Error: Date is missing", "Error: Date is missing"]
	PC = CleanUp(Citation_Input)
	#need to put the electronic sources in the correct format in case someone puts in (available on CanLII) without the ; or ,
	if re.search(r"(;|,)$", PC):
		PC = CleanUp(PC[:-1])
	if re.search(r"^(;|,)", PC):
		PC = CleanUp(PC[1:])
	m = re.split('[,;]', PC) # 	#Split the citations based on positioning of commas and semicolons
	if type(m)!=list:
		m = [m]
	#print "List of reporters: ", m
	series = ["2d", "3d", "4th", "5th", "6th", "7th", "8th"]
	for x in range(len(m)): #replace "2d" with "(2d)", etc (i.e. put them in brackets
		for s in series:
			match = re.search(' '+s+' ', m[x], re.I)
			if match:
				#print "Found a series number without brackets"
				m[x] = re.sub(match.group(), ' ('+s+') ', m[x])
				break
	#print "List of reporters: ", m
	for x in range(len(m)): m[x] = CleanUp(m[x]) #remove excess white spaces on either side
	SupremeCourtReporters = ['US', 'S Ct', 'L Ed 2d', 'USLW']#order is important
	for r in m: #look at each reporter inputed in the input list
		for x in SupremeCourtReporters:#will run through the USSC reporters in order. reaching a match, it will return the reporter in order of priority
			match = re.search(regstr(x), r, re.I)
			if match:
				r = CleanUp(re.sub(match.group(), " "+x+" ", r, flags = re.I))
				#print "Found a reporter that implies the USSC: ", x
				if x == "US":
					Date = PullDate(Date)# the date
					if int(Date)<1875:
						Editor = False
						AllEditors = [["Wall", "Wallace"], ["Black"], ["How", "Howard"], ["Pet", "Peters"], ["Wheat", "Wheaton"], ["Cranch"], ["Dall", "Dallas"]]
						for E in AllEditors:
							for n in E:
								if re.search(regstrElec(n), r, re.I):
									Editor = True
									break
						if Editor: pass
						else: pass#return ['Reporter needs editor ex. "83 US (19 How) 324"', 'Reporter needs editor ex. "83 US (19 How) 324"', 'Reporter needs editor ex. "83 US (19 How) 324"']
				if x == "USLW":#USLW has a special format for date, so check that
					#print "This is USLW. Checking the date."
					Date = CheckUSLWDate(Date)
					if Date[1]!="ok":
						return ['Needs full date ex. "July 22, 2003"', 'Needs full date ex. "July 22, 2003"', 'Needs full date ex. "July 22, 2003"']
					if Date[1]=="ok":
						return [r, "USSC", Date[0]]#CheckUSLWDate returns a list
				return [r, "USSC", Date]
	Date = PullDate(Date)# the date
	Federal = ['F Supp (2d)', 'F Supp', 'F (3d)', 'F (2d)', 'F']
	F = CheckReporter(m, Federal)
	if F:
		#print "Found a federal reporter: ", F[0]
		return [F[0], "Fed", Date]
	PreferredRegional = ['A (2d)', 'A', 'NE (2d)', 'NE', 'NW (2d)', 'NW', 'P (2d)', 'P (3d)', 'P', 'SE (2d)', 'SE', 'SW (2d)', 'SW', 'So (2d)', 'So']
	F = CheckReporter(m, PreferredRegional)
	if F:
		#print "Found a preferred regional reporter: ", F[0]
		return [F[0], "State", Date]
	Regional = ['ALR (2d)', 'ALR (3d)', 'ALR (4th)', 'ALR (5th)', 'ALR', 'L Ed']
	F = CheckReporter(m, Regional)
	if F:
		#print "Found a regional reporter: ", F[0]
		return [F[0], "State", Date]
	PreferredState = ['Cal (2d)', 'Cal (3d)', 'Cal (4th)', 'Cal', 'NYS (2d)']
	F = CheckReporter(m, PreferredState)
	if F:
		#print "Found a preferred state reporter: ", F[0]
		return [F[0], "State", Date]
	Professions = ['AMC', 'Av Cas', 'ICC', 'LAR']
	F = CheckReporter(m, Professions)
	if F:
		#print "Found a professional reporter: ", F[0]
		return [F[0], "State", Date]
	NYAppeal = ['App Div (2d)']
	F = CheckReporter(m, NYAppeal)
	if F:
		#print "Found NY reporter: ", F[0]
		return [F[0], "State", Date]
	ARAppeal = ['Ark App']
	F = CheckReporter(m, ARAppeal)
	if F:
		#print "Found an Arkansas reporter: ", F[0]
		return [F[0], "State", Date]
	USAppeal = ['US App DC']
	F = CheckReporter(m, USAppeal)
	if F:
		#print "Found a US Appeal reporter: ", F[0]
		return [F[0], "State", Date]
	Other = ['Act', "A Int'l LC", 'ADIL', 'Ad & El', 'Ala (NS)', 'Ala', 'Alaska Fed', 'Alaska R', 'Ariz', 'Ark',  u'CIJ M\xe9moires', 'CIJ Rec', 'Cons sup N-F', 'CPJI (Ser A)', u'CPJI (S\xe9r B)', u'CPJI (S\xe9r A/B)', u'CPJI (S\xe9r C)', 'F Cas', 'Hague Ct Rep', 'Hague Ct Rep (2d)', 'ICJ Pleadings', 'ICJ Rep', 'ICSID', 'I LR', 'Inter-Am Ct HR (Ser A)', 'Inter-Am Ct HR (Ser B)', 'Inter-Am Ct HR (Ser C)', 'NY (2d)', 'NY', 'RIAA', 'S Ct', 'SEC Dec', 'TMR', ]
	F = CheckReporter(m, Other)
	if F:
		#print "Found Other reporter: ", F[0]
		return [F[0], "State", Date]
	return [m[0],"State", Date]#return the input if it's not recognized


#returns a list: return [modified string, District (or False), "don't remove ct" or "may remove ct"]
def ShortenJurisdiction(string):	
	#print "\n**** Running ShortenJurisdiction within the CheckCt function"
	#print "Input jurisdiction: ", string
	Districts = [["ND", ["North Dist", "ND", "North District", "N Dist", "N District", "Northern District", "Northern Dist"]],
	["SD", ["South Dist", "SD", "South District", "S Dist", "S District", "Southern District", "Southern Dist"]],
	["ED", ["East Dist", "ED", "East District", "E Dist", "E District", "Eastern District", "Eastern Dist"]],
	["WD", ["West Dist", "WD", "West District", "W Dist", "W District", "Western District", "Western Dist"]]]
	Dist = False
	for jur in Districts:
		for abbr in jur[1]:
			matchDist = re.search(regstrElec(abbr), string, re.I)#regstrElec has the ^ + $ object
			if matchDist:
				Dist = jur[0]
				string = CleanUp(re.sub(matchDist.group(), ' ', string))
	if Dist:
		pass
		#print "District found. String modified to: ", string
	States = [["Ala", ["alabama", "al"]], ["Alaska", ["ak", "alas"]], ["Ariz", ["arizona", "az"]], ["Ark", ["arkansas"]],
	["Cal", ["california", "cali", "calif", "californie", "cal"]], ["Colo", ["col", "colorado"]], ["Conn", ["Connecticut"]], ["Del", ["Delaware", "de"]], ["DC", ["district colombie", "district columbia", "Washington DC", "Wash DC", "dist colom"]],
	["Fla", ["florida", "flor", "floride", "fl"]], ["Ga", ["georgia", "georgie"]], ["Hawaii", ["HI"]], ["Idaho", ["Ida", "Id"]], ["Ill", ["Illinois", "Il", "Ills", "Ill's"]], ["Ind", ["Indiana", "Ind", "In"]], ["Iowa", ["Ia", "Ioa"]], ["Kan", ["Kansas", "Ks", "Ka"]], ["Ky", ["Kentucky", "Ken", "Kent"]], ["La", ["Louisiana", "Louisiane", "la"]],
	["Me", ["Maine"]], ["Md", ["Maryland"]], ["Mass", ["Massachussetts", "ma"]], ["Mich", ["Michigan", "MI"]], ["Minn", ["Minnesota", "Mn"]], ["Miss", ["mississippi", "ms"]], ["Mo", ["Missouri"]], ["Mont", ["Montana", "mt"]],
	["N Dak", ["north dakota", "dakota du nord", "NoDak"]], ["NC", ["Caroline du Nord", "North Carolina", "N Car"]], ["Neb", ["Nebraska", "ne"]], ["Nev", ["Nevada", "nv"]], ["NH", ["New Hampshire", "N Hamp"]], ["NJ", ["New Jersey"]], ["N Mex", ["New Mexico", "nm", "nouveau mexique", "new M"]], ["NY", ["new york", "n york"]], 
	["Ohio", ["Oh"]], ["Okla", ["oklahoma", "OK"]], ["Or", ["oregon", "oreg"]], ["Pa", ["pennsylvania", "penn", "penna", "pennsylvanie"]], ["RI", ["Rhode Isl", "Rhode Island", "R Isl"]],
	["S Dak", ["south dakota", "dakata du sud", "SD", "SoDak"]], ["SC", ["Caroline de Sud", "South Carolina", "S Car"]], ["Tenn", ["Tennessee", "Tn"]], ["Tex", ["Texas", "tex", "Tx"]], ["US", ["etas unis", "etas-unis", "usa", "united states"]], ["Utah", ["ut"]], ["Vt", ["Vermont", "Verm"]], ["Va", ["Virginia", "virg", "virginie", "virgin"]],
	["W Va", ["West virginia", "wv", "w virg", "virginie occidentale"]], ["Wash", ["Washington", "wn", "wa"]], ["Wis", ["wisconsin", "wi", "wisc"]], ["Wyo", ["Wyoming", "wy"]]]
	for jur in States:
		match = re.search(regstrElec(jur[0]), string, re.I)#regstrElec has the ^ + $ object
		if match:
			if Dist:
				string = CleanUp(Dist + ' ' + jur[0] + ' ' + re.sub(match.group(), " ", string))
			else:
				string = CleanUp(re.sub(match.group(), ' '+jur[0]+' ', string))
			if jur[0]==("Tex" or "Okla"):
				#print "Found Tex or Okla in ShortenJurisdiction, returning: ", [string, Dist, "don't remove ct"]
				return [string, Dist, "don't remove ct"]
			return [string, Dist, "may remove ct"]
		for abbr in jur[1]:
			match = re.search(regstrElec(abbr), string, re.I)#regstrElec has the ^ + $ object
			if match:
				if Dist:
					string = CleanUp(Dist + ' ' + jur[0] + ' ' + re.sub(match.group(), " ", string))
				else:
					string = CleanUp(re.sub(match.group(), ' '+jur[0]+' ', string))
			if jur[0]==("Tex" or "Okla"):
				#print "Found Tex or Okla in ShortenJurisdiction, returning: ", [string, Dist, "don't remove ct"]
				return [string, Dist, "don't remove ct"]
				return [string, Dist, "may remove ct"]
	return [string, Dist, "may remove ct"]#just to be safe
	
def regstrCt(i):#i is a string input
	one = r'\s'+i+ r'(?=,)'
	two = r'\s'+i+ r'$'
	thr = r'\s'+i+ r'\s'
	fou = r'^' +i+ r'\s'
	fiv = r'\('+i+ r'\)'
	six = r'^'+i+ r'$'
	string =  r'('+ one + r'|' + two + r'|' + thr + r'|' + fou + r'|' + fiv + r'|' + six + r')'
	return string
	
def ShortenCtName(string):
	#print "**** Running ShortenCtName within the CheckCt function"
	Ct = re.compile(regstrCt('(C(our)?t|Cour)'), flags = re.I)
	if Ct.search(string):
		string = CleanUp(re.sub(Ct.search(string).group(), " Ct ", string, flags = re.I))
	Remove  = ["of", "des", "de" "la", "le", "the", "in"]
	for r in Remove:
		Rem = re.compile(regstr(r), flags = re.I)
		if Rem.search(string):
			string = re.sub(Rem.search(string).group(), " ", string, flags = re.I)
	string = CleanUp(string)
	#print "Search modified to: ", string
	return string

def DefaultCt(string):
	#print "**** Running DefaultCt within the CheckCt function. Input: ", string
	Change = [[r'Criminal', 'Crim'], [r'United States', 'US'], [r'Superior', 'Supr'], 	[r'Juvenile', 'Juv'], [r'Magistrate', 'Magis'], [r'General', 'Gen'], [r'Sessions?', 'Sess'], [r'App(ellate|eal)s?', 'App'],
	[r'Family', 'Fam'], [r'Review', 'Rev'],	[r'Circuit', 'Cir'], [r'Criminal', 'Crim'], [r'Supreme', 'Sup'], [r"Record(er)?'?s?", 'Rec'], [r'District', 'Dist'], [r'Civil', 'Civ'], [r'Federal', 'Fed'], [r'Criminal', 'Crim'], [r"Child(ren)?'?s?", 'Child'], [r'Judicial', 'Jud'], [r'Internaional', "Int'l"], [r'Intermediate', 'Intermed']]
	for C in Change:
		foo = re.compile(C[0], flags = re.I)
		if foo.search(string):
			string = re.sub(foo.search(string).group(), C[1], string, flags = re.I)
	return string

def CheckStateCt(string, reporter):
	#print "**** Starting CheckStateCt"
	#print "Searching Court input: ", string
	#print "Reporter being used is: ", reporter
	string = ShortenCtName(string)
	JurisdictionChanged = ShortenJurisdiction(string) #[string, Dist, "don't remove ct"] or  [string, Dist, "may remove ct"] 
	string = JurisdictionChanged[0]
	#print "Court string after shortening is: ", string
	#print "District?: ", JurisdictionChanged[1]
	#print "Allowed to remove Sup Ct?: ", JurisdictionChanged[2]
	StateCts = [
	["Admin Ct", re.compile(r"^Admin(istrative)? Ct", flags = re.I)],
	["Adm", re.compile(r"Admiral(ity)?", flags = re.I)], 
	["Alder Ct", re.compile(r"Alder(man's)?", flags = re.I)], 
	["App Ct", re.compile(r"Appe(als|llate) Ct", flags = re.I)], 
	["App Div", re.compile(r"Appellate Div(ision)?", flags = re.I)], 
	["BAP", re.compile(r"Bankrupt(cy)? Appe(als|llate) Panel", flags = re.I)],	
	["Bankr", re.compile(r"Bankruptcy", flags = re.I)],	
	["BTA", re.compile(r"(Board Tax Appeals|BTA)( \(US\))?", flags = re.I)], 
	["Bor Ct", re.compile(r"Borough Ct", flags = re.I)], 
	["Ch", re.compile(r"Chancery", flags = re.I)], 
	["Child Ct", re.compile(r"Child(ren's)? Ct", flags = re.I)], 
	["Cir Ct", re.compile(r"Cir(cuit)? Ct$", flags = re.I)],
	["Cir Ct App", re.compile(r"Cir(cuit)? Ct App(eals)?", flags = re.I)],
	["Cir Ct & Fam Ct", re.compile(r"Cir(cuit)?( Ct)? (&|and) fam(ily)( ct)?", flags = re.I)],	
	["Cit AC", re.compile(r"Citizen(ship)? (AC|Appeals Ct|Appeal Ct)", flags = re.I)],
	["City Ct", re.compile(r"City Ct", flags = re.I)],
	["City & Parish Ct", re.compile(r"City (&|and) Par(ish)? Ct", flags = re.I)],
	["Civ App", re.compile(r"Civ(il)? App(eals)?", flags = re.I)],
	["Civ Ct", re.compile(r"Civil Ct", flags = re.I)],
	["Civ Ct Rec", re.compile(r"Civ(il)? Ct Rec(ord)?", flags = re.I)],	
	["Civ Dist Ct", re.compile(r"Civ(il)? Dist(rict)? Ct", flags = re.I)],
	["Small Cl Ct", re.compile(r"Small Claims Ct", flags = re.I)],
	["Cl Ct", re.compile(r"Claims Ct", flags = re.I)],
	["Comm Ct", re.compile(r"Commerce Ct", flags = re.I)],
	["CP", re.compile(r"Common Pl(eas)?", flags = re.I)], 
	["Commw Ct", re.compile(r"Commonwealth Ct", flags = re.I)],	
	["Concil Ct", re.compile(r"Conciliation Ct", flags = re.I)],
	["Const County Ct", re.compile(r"Constitutional County Ct", flags = re.I)],
	["County Ct at Law", re.compile(r"County Ct( at)? Law", flags = re.I)],	
	["Co Ct J Crim Ct", re.compile(r"County( Ct)? Judges'? Crim(inal) Ct", flags = re.I)],	
	["County J Ct", re.compile(r"County Judge'?s'? Crim(inal)? Ct", flags = re.I)],	
	["County Rec Ct", re.compile(r"County Recorder'?s? Ct", flags = re.I)],	
	["Co Ct", re.compile(r"County Ct", flags = re.I)], 
	["Ct App", re.compile(r"Ct Appeals?", flags = re.I)],
	["Ct Ch", re.compile(r"Ct Chance(ry)?", flags = re.I)],	
	["Ct Civ App", re.compile(r"Ct Civ(il)? App(eals)?", flags = re.I)],	
	["Ct Cl", re.compile(r"Ct Claims", flags = re.I)],	
	["Ct Com Pl", re.compile(r"Ct Common Pleas", flags = re.I)],
	["Ct Crim App", re.compile(r"Ct Crim(inal)? App(eals)?", flags = re.I)], 
	["CCPA", re.compile(r"Ct Cust(oms) (&|and) Patent App(eals)?", flags = re.I)],	
	["Ct Cust App", re.compile(r"Ct Customs App(eals)?", flags = re.I)],
	["Ct Err", re.compile(r"Ct Errors", flags = re.I)],	
	["Ct Err & App", re.compile(r"Ct Errors (&|and) App(eals)?", flags = re.I)], 
	["Ct Fed Cl", re.compile(r"Ct Fed(eral)? Claims", flags = re.I)],
	["Ct First Inst", re.compile(r"Ct First Instance", flags = re.I)], 
	["Ct Gen Sess", re.compile(r"Ct General Sessions", flags = re.I)], 
	["Ct Spec Sess", re.compile(r"Ct Special Sessions", flags = re.I)],	
	["Ct Int'l Trade", re.compile(r"Ct (Int'l|International) Trade", flags = re.I)],
	["Ct Rev", re.compile(r"Ct Review", flags = re.I)],	
	["Ct Spec App", re.compile(r"Ct Special App(eals)?", flags = re.I)],
	["Ct T Rev", re.compile(r"Ct Tax Rev(iew)?", flags = re.I)], 
	["Crim App", re.compile(r"Crim(inal)? App(eals)?", flags = re.I)],
	["Crim Dist Ct", re.compile(r"Crim(inal)? Dist(rict)? Ct", flags = re.I)],
	["Cust Ct", re.compile(r"Customs Ct", flags = re.I)],
	["Dist Ct", re.compile(r"Dist(rict)? Ct", flags = re.I)], 
	["Dist Ct App", re.compile(r"Dist(rict)? Ct Appeals", flags = re.I)],
	["Dist Just Ct", re.compile(r"Dist(rict)? Just(ice)? Ct", flags = re.I)],
	["Dom Rel Ct", re.compile(r"Dom(estic)? Rel(ations)? Ct", flags = re.I)],
	["Emer Ct App", re.compile(r"Emer(gency)? Ct App(eal)?s? ", flags = re.I)],	
	["Env Ct", re.compile(r"Environ(ment)?(al)?", flags = re.I)],	
	["Eq", re.compile(r"Equity", flags = re.I)],
	["Fam Ct", re.compile(r"Fam(ily)? Ct", flags = re.I)],	
	["Gen Sess Ct", re.compile(r"Gen(eral)? Sess(ions)? Ct", flags = re.I)],
	["High Ct", re.compile(r"High Ct", flags = re.I)], 
	["Housing Ct", re.compile(r"Housing Ct", flags = re.I)],
	["Intermed Ct App", re.compile(r"Intermediate Ct App(eals)?", flags = re.I)],
	["J Ct", re.compile(r"Just(ice) Ct", flags = re.I)],
	["JP Ct", re.compile(r"Justice Peace'?s? Ct", flags = re.I)],
	["Juv Ct", re.compile(r"Juvenile Ct", flags = re.I)],
	["Juv Del Ct", re.compile(r"Juv(enile)? Del(inquent)?s?'? Ct", flags = re.I)],
	["Juv & Fam Ct", re.compile(r"Juv(enile)? (&|and) Fam(ily)", flags = re.I)],
	["Land  Ct", re.compile(r"Land Ct", flags = re.I)],	
	["Law  Ct", re.compile(r"Law Ct", flags = re.I)],
	["Magis Ct", re.compile(r"Magistrate Ct", flags = re.I)], 
	["Magis Div", re.compile(r"Magistrate Division", flags = re.I)], 
	["Mayor's Ct", re.compile(r"Mayor'?s Ct", flags = re.I)],
	["Mun Ct", re.compile(r"Municipal Ct", flags = re.I)],
	["Mun Ct not Rec", re.compile(r"Mun(icipal)? Ct (not|off) Record", flags = re.I)],	
	["Mun Crim Ct Rec", re.compile(r"Mun(icipal) Crim(inal)? Ct Record", flags = re.I)],
	["Orphans' Ct", re.compile(r"Orphans?'? Ct", flags = re.I)],
	["Parish Ct", re.compile(r"Parish Ct", flags = re.I)],
	["Police J Ct", re.compile(r"Pol(ice)? Just(ice)?'?s? Ct", flags = re.I)],	
	["Prerog Ct", re.compile(r"Prerogative Ct", flags = re.I)],	
	["Prob Ct", re.compile(r"Probate Ct", flags = re.I)],
	["Rec Ct", re.compile(r"Recorder'?s Ct", flags = re.I)],
	["State Ct", re.compile(r"State Ct", flags = re.I)], 
	["Super Ct", re.compile(r"Superior Ct", flags = re.I)], 
	["Sup Ct", re.compile(r"Supreme Ct", flags = re.I)],	
	["Sup Ct App Div", re.compile(r"Supreme Ct? App(ellate|eals)? Div(ision)?", flags = re.I)],	
	["Sup Ct App", re.compile(r"Sup(reme)? Ct App(eals)?", flags = re.I)],	
	["Sup Ct Err", re.compile(r"Sup(reme)? Ct Errors", flags = re.I)],	
	["USSC", re.compile(r"(United States Supreme Ct|Supreme Ct United States|US Supreme Ct|Supreme Ct US)", flags = re.I)],	
	["Sup Jud Ct", re.compile(r"Supreme Jud(icial)? Ct", flags = re.I)],	
	["Surr Ct", re.compile(r"Surrogate Ct", flags = re.I)],	
	["Tax App Ct", re.compile(r"Tax App(eal)?s? Ct", flags = re.I)],
	["TC", re.compile(r"Tax Ct", flags = re.I)],
	["Teen Ct", re.compile(r"Teen Ct", flags = re.I)],	
	["Town Ct", re.compile(r"Town Ct", flags = re.I)],	
	["Traffic Ct", re.compile(r"Traffic Ct", flags = re.I)],	
	["Tribal Ct", re.compile(r"Tribal Ct", flags = re.I)],	
	["Unif Fam Ct", re.compile(r"Unified Fam(ily) Ct", flags = re.I)],	
	["Water Ct", re.compile(r"Water Ct", flags = re.I)],	
	["Workers' Comp Ct", re.compile(r"Worker'?s?'? Comp(ensation)? Ct", flags = re.I)],	
	["Youth ct", re.compile(r"Youth Ct", flags = re.I)]]
	Results = []
	Change = False
	for Court in StateCts:
		matchOne = re.search(Court[0], string, re.I)
		if matchOne:
			#print string, "got a perfect hit: ", Court[0]
			if (Court[0]=="Sup Ct") and (JurisdictionChanged[2]=="may remove ct"):
				string = CleanUp(re.sub(matchOne.group(), ' ', string, flags = re.I))
			string = re.sub(matchOne.group(), Court[0], flags = re.I)
			Change = True
		matchTwo = Court[1].search(string)
		if matchTwo:
			Results.append([Court[0], matchTwo])
	if Results: 
		#print "There were", len(Results), "results:", Results, "CHOOSING: ", Results[0][0]
		if (Results[0][0]=="Sup Ct") and (JurisdictionChanged[2]=="may remove ct"):
				string = CleanUp(re.sub(Results[0][1].group(), ' ', string, flags = re.I))
		string = re.sub(Results[0][1].group(), Results[0][0], string, flags = re.I)
		Change = True
	#print "After going through the state courts, string is: ", string
	NYAppeal = ['App Div (2d)', 'NYS (2d)']
	for r in NYAppeal:
		Rem = re.compile(regstrElec("NY"), flags = re.I)
		if Rem.search(string):
			string = CleanUp(re.sub(Rem.search(string).group(), " ", string, flags = re.I))
	CalState = ['Cal (2d)', 'Cal (3d)', 'Cal (4th)', 'Cal']
	for r in CalState:
		Rem = re.compile(regstrElec("Cal"), flags = re.I)
		if Rem.search(string):
			string = CleanUp(re.sub(Rem.search(string).group(), " ", string, flags = re.I))
	ARAppeal = ['Ark App']
	for r in ARAppeal:
		Rem = re.compile(regstrElec("Ark"), flags = re.I)
		if Rem.search(string):
			string = CleanUp(re.sub(Rem.search(string).group(), " ", string, flags = re.I))
	#if Change:
	#	#print "RETURNING: ", string
	#	return string
	#else: return DefaultCt(string)
	return DefaultCt(string)

def CheckFedCt(string):
	#print "**** Starting CheckFedCt"
	#print "Searching Court input: ", string
	string = ShortenCtName(string)
	string = ShortenJurisdiction(string)[0]
	#print "Court string after shortening is: ", string
	FedCts = [["Cir", re.compile(r"Cir(cuit)? Ct App(eals)?( \((fed|federal|US)\))?", flags = re.I)], ["D", re.compile(r"Dist(rict)? Court", flags = re.I)], ["Cir", re.compile(r"Ct Appeals?", flags = re.I)]]
	Numbers = [["1st", "first", "1", "one"], ["2nd", "second", "2", "two"], ["3rd", "third", "3", "three"],	["4th", "fourth", "4", "four"],	["5th", "fifth", "5", "five"],
	["6th", "sixth", "6", "six"], ["7th", "seventh", "7", "seven"], ["8th", "eigth", "8", "eight"], ["9th", "ninth", "9", "nine"], ["10th", "tenth", "10", "ten"], ["11th", "eleventh", "11", "eleven"]]
	for n in Numbers:
		for i in n:	
			matchNum = re.search(regstrElec(i), string, re.I)
			if matchNum:
				#print "Found number match in CheckFedCt! Returning: ", n[0] + " Cir"
				return n[0] + " Cir"
	Change = False
	for Court in FedCts:
		matchOne = re.search(regstrElec(Court[0]), string, re.I)
		if matchOne:
			#print string, "got a perfect hit: ", Court[0]
			string = re.sub(matchOne.group(), Court[0], string, flags = re.I)
			Change = True
		matchTwo = Court[1].search(string)
		if matchTwo:
			#print "got an imperfect hit: ", matchTwo.group()
			string = re.sub(matchOne.group(), Court[0], string, flags = re.I)
			Change = True
	if Change:
		#print "RETURNING: ", string
		return string
	return DefaultCt(string)



#returns [citation, court, date]
#pincite = [pinpoint/cite, input]
def GetCitations(Citation_Input, Court_Input, Date_Input, pincite):
	#print "\n****** Starting GetCitations"
	#print "input is:\n", "citation string: ", Citation_Input, "\n", "court: ", Court_Input, "\n", "date: ", Date_Input, "\n"
	if not Citation_Input:
		return ["ERROR: missing citation input", "ERROR: missing citation input", "ERROR: missing citation input"]#citation #court #date"ERROR: missing citation input"
	Court = ""
	if not Court_Input:
		SC = False
		SupremeCourtReporters = ['US', 'S Ct', 'L Ed 2d', 'USLW']#order is important
		for x in SupremeCourtReporters:
			if re.search(regstrElec(x), Citation_Input, re.I):
				SC = True
				break
		if not SC:
			Court = "[<i>NTD: missing court input</i>]"
			#return "ERROR: missing court input"
	if not Date_Input:
		Date_Input = "[<i>NTD: missing date input</i>]"
	repDate = BestReporter(CleanUp(Citation_Input), Date_Input)
	if pincite:
		repDate[0] = repDate[0] + ' at ' + pincite
	if repDate[1]=="USSC":
		if re.search(regstr("USLW"), repDate[0]):
			repDate[2]= "US "+ repDate[2]
	elif repDate[1]=="Fed":
		Court = CheckFedCt(CleanUp(Court_Input))+", "
	elif repDate[1]=="State":
		Court = CheckStateCt(CleanUp(Court_Input), repDate[0])+", "
	else:
		#print "****DANGER ASSIGNMENT ERROR"
		Court = "Ct Error"
	return ", "+repDate[0] + " ("+Court+repDate[2]+")"
	#return [repDate[0], Court, repDate[2]]#citation #court #date
	
	
##print GetCitations("114 F Supp 2d 896", "North District California", "1999", False)
#	WORKS: ['114 F Supp (2d) 896', 'ND Cal', '1999']
##print GetCitations("114 F Supp 2d 896", "second circuit court of appeals", "1999", False)
#	WORKS: ['114 F Supp (2d) 896', '2nd Cir', '1999']
##print GetCitations("68 USLW 4625", "ussc", "june 31, 2000", False)
#	WORKS: ['68 USLW 4625', '', 'US 31 June 2000']
##print GetCitations("114 F Supp 2d 896", "District of Columbia Circuit court", "1999", False)
#	WORKS: ['114 F Supp (2d) 896', 'DC Cir Ct', '1999']
##print GetCitations("382 P 2d 109", "oklahoma supreme court", "1963", False)
#	WORKS: ['382 P (2d) 109', 'Okla Sup Ct', '1963']
##print GetCitations("308 III App 3d 441", "Appeals Ct", "1999", ["pinpoint", "445"])
#	WORKS: ['308 III App (3d) 441 at 445', 'App Ct', '1999']
##print GetCitations("165 Cal Rptr 308, 472 Cal 25", "Cal Supreme Court", "1990", ["pinpoint", "445"])
#	WORKS: ['165 Cal Rptr 308 at 445', '', '1990']
##print GetCitations("20 S Ct 231,243 USLW 23, 308 US 441; 342 L Ed 2d 23", "USSC", "2010", False)
#	WORKS: ['20 S Ct 231', '', '2010']	
#print GetCitations("60 US 17 393", "", "1860", False)
#	Doesn't work, need bluebook

'''****************     HISTORY     ****************'''


def GetHistory(listoflists):
	#[affirming/reversing, parallel, year, court]
	List = []
	for Instance in listoflists:
		if re.search("affirming", CleanUp(Instance[0]), re.I):
			List.append(", aff'g"+ GetCitations(Instance[1], Instance[3], Instance[2], False))
		if re.search("reversing", CleanUp(Instance[0]), re.I):
			List.append(", rev'g"+ GetCitations(Instance[1], Instance[3], Instance[2], False))
		if re.search("affirmed", CleanUp(Instance[0]), re.I):
			List.append(", aff'd"+ GetCitations(Instance[1], Instance[3], Instance[2], False))
		if re.search("reversed", CleanUp(Instance[0]), re.I):
			List.append(", rev'd"+ GetCitations(Instance[1], Instance[3], Instance[2], False))
	output = ""
	for x in List:
		output = output + x
	return output
	
'''****************     CITING     ****************'''

def GetCiting(SoC, Parallel, Year, Court):
	SoC = GetStyleOfCause(SoC)
	Citation = GetCitations(Parallel, Court, Year, False)
	return ", citing "+SoC + Citation
	

'''****************     LEAVE TO APPEAL     ****************'''

def GetLeaveToAppeal(array):
	#[granted/requested/etc, court type, court appealed to, citation/or docketnumber]
	#get Court first
	if array[1]=="Fed":
		Court = CheckFedCt(CleanUp(Court_Input))
	else: Court = CheckStateCt(CleanUp(Court_Input))
	if re.search("Requested", CleanUp(array[0]), re.I):
		return ", leave to appeal to " + Court + " requested"
	if re.search("Granted", CleanUp(array[0]), re.I):
		return ", leave to appeal to " + Court + " granted, " + str(array[2])
	if re.search("Refused", CleanUp(array[0]), re.I):
		return ", leave to appeal to " + Court + " refused, " + str(array[2])
	if re.search("AsofRight", CleanUp(array[0]), re.I):
		return ", appeal as of right to " + Court	
	return ", sorry error in leave to appeal option"


'''****************     SHORT FORM     ****************'''

def GetShortForm(string):
	return " [<i>"+string+"</i>]"

'''****************     JUDGE    ****************'''

#need to have some front-end searching to find J or JJ, etc
#need to know if it's dissenting
def GetJudge(string, dissenting):
	string = Capitalize(string)
	if dissenting:
		string = string + ", dissenting"
	return ", " + string
	

class USCaseClass(object):
	def __init__(self):
		self.GetCitations = GetCitations
		self.GetStyleOfCause = GetStyleOfCause
		self.GetHistory = GetHistory
		self.GetCiting = GetCiting
		self.GetLeaveToAppeal = GetLeaveToAppeal
		self.GetShortForm = GetShortForm
		self.GetJudge = GetJudge
		self.PullDate = PullDate

