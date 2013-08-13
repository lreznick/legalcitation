import re
import sys

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
	six = r'\['+i+ r'\]'
	string =  r'('+ one + r'|' + two + r'|' + thr + r'|' + fou + r'|' + fiv + r'|' + six + r')'
	return string

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

def PullDate(string):
	FirstSearch = re.search(r'(\(?\[?)(1[4-9][0-9]{2}|200[0-9]{1}|201[01234]{1})(\)?\]?,?\s([A-Z]|\d{1,3}\s)[A-Za-z\s]{2})', string) #ex 2008 NBCA or (1843) Ex Ctf
	if FirstSearch:
		return FirstSearch.group(2)
	All = re.findall(r'([^\d]{1}|^|\s)(1[4-9][0-9]{2}|200[0-9]{1}|201[01234]{1})([^\d]{1}|$|\s)', string)
	if not All:
		return False
	Dates = []
	for x in range(len(All)):
		Dates.append(int(All[x][1]))
	Sorted = sorted(Dates, key=lambda tup: tup)
	return str(Sorted[0])



#CleanUp gets rid of all periods, excess spaces, and leading or trailing spaces in a string, and fixes spaces after commas	
#tested: works
def CleanUpTitle(string):
	end = re.compile(r"[;,\.:\s\(\[<\\/]+$")#remove excess punctuation at the end of the string
	beg = re.compile(r"^[;,\.:\s\)\)>\\/]+")#and at the beginning
	if end.search(string):#remove excess punctuation at the end
		remove = len(end.search(string).group())
		#print "Detected last "+str(remove)+"characters are punctuation..."
		string = string[:-remove]
		#print "... removing. Now is: ", string
	if beg.search(string):
		remove = len(beg.search(string).group())
		#print "Detected first "+str(remove)+"characters are punctuation..."
		string = string[remove:]
		#print "... removing. Now is: ", string
	string	= re.sub('\s*?,\s*?', ', ', string)	#put a space after a comma instead of multiple spaces or no space
	string 	= re.sub('\s*?\(', ' (', string)    #put a space before a left bracket instead of multiple spaces or no space
	string 	= re.sub('\)\s*?', ') ', string)    #put a space after a right bracket instead of multiple spaces or no space
	string 	= re.sub('\s*?:\s*?', ': ', string) #put a space after a comma instead of multiple spaces or no space
	string 	= re.sub('\s*?;\s*?', '; ', string) #put a space after a semicolon instead of multiple spaces or no space
	string	= re.sub(' +',' ', string)          #Remove excess white spaces
	string 	= string.strip()                    #Remove leading or trailing white spaces
	return string

def CleanUp(string):
	return CleanUpTitle(re.sub('\.+','', string))  #Remove all periods


def CheckFullDate(string):
	#print "\n****** Starting CheckFullDate"
	errormsg = "bad format"
	okmsg = "ok"
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
		return [string, okmsg]
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
			return [string, okmsg]
	if not month:
		return [string, errormsg]
	dayFormatTwo = re.compile(r'(0[1-9]|[12][0-9]|3[01])')
	if dayFormatTwo.search(string):
		dayNum = dayFormatTwo.search(string).group()
		#print "Day: ", dayNum
		if dayNum[0]=="0":
			dayNum = dayNum[1]
		string = dayNum + ' ' + month + ' ' + year
		return [string, okmsg]
	dayFormatThree = re.compile(r'[1-9]')
	if dayFormatThree.search(string):
		dayNum = dayFormatThree.search(string).group()
		#print "Day: ", dayNum
		if dayNum[0]==0:
			dayNum = dayNum[1]
		string = dayNum + ' ' + month + ' ' + year
		return [string, okmsg]
	#[- /\.]
	else: return [string, errormsg]



#Capitalizes first word after a space or an open bracket "(" (so long as there are not multiple brackets in a row... that raises an error which is overriden), words such as MacDonald and McMaster (if they are inputted capitalized), and AMA Canada.
#does not capitalize words that are meant to not be capitalized ["in rem", " and", "ex rel", " of", " de"]
#can only accept numbers, round brackets, apostrophes, and letters (no commas or periods, or weird utf-8  characters)
#tested: works
def Capitalize(string):
	McD = re.findall(r"[A-Z]{1}['a-z]+[A-Z]{1}[a-z]*", string, flags = re.UNICODE)          #regex for a capital followed by some lowercase, and then another capital and more lowercase
	CapAfter_one = re.findall(r"(?<=[\(\)a-z,] )[A-Z]{2,}", string, flags = re.UNICODE)   #matches all caps that have some preceeding number or bracket or lowercase letter, or some following capital followed by lowercase or numbers
	CapAfter_two = re.findall(r"(?<=[\(\)a-z,]) [A-Z]{2,}", string, flags = re.UNICODE)   #an alternative match algorithm to for where caps follow non-caps
	CapAfter_three = re.findall(r"(?<= [\(\)a-z,])[A-Z]{2,}", string, flags = re.UNICODE) #an alternative matching algorithm for when caps immediately follow a bracket or non-caps instead of having a space in between
	CapBefore = re.findall(r"[A-Z]{2,} (?=[a-z])", string, flags = re.UNICODE)           #a matching algorithm for where caps form the first part of the string, and are followed by non-caps
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
	Decaps = ["an", "and", "on", "of", "de", "la", "le", "a", "by", "be", "or", "the", "for", "in", "so", "if", "to", "du"]                 #these are words i want to decaps
	for x in Decaps:
		string = re.sub(r'(?<=[a-zA-Z0-9] )'+x, x, string, flags = re.I|re.UNICODE)  #sub the caps words for the uncaps words
	for j in KeepAsIs:
		string = re.sub(j[0].upper()+j[1:].lower(), j, string)          #sub in the all caps words and words like MacDonald
	return string


#Tooltip: The "use verbatim" option exactly outputs your input. Ex. "Alice Jones with the collaboration of Bob Smith"
#Use the editors option of they are editors of a collection
#tested: works
def FormatAuthors(authorinput, verbatim, editors):
	list = re.split("\n", authorinput)
	if verbatim:
		return CleanUpTitle(' '.join(list))+', '
	formattedlist = []
	Remove = ["MBA", "MSC", "BA", "PhD", "JD", "LLB", "LLM", "BSc", "BAH", "BScH", "BSc H", ", MA", "SJD", "QC", "FRSC"] 
	for author in list:
		for x in Remove:
			author = re.sub(regstr(x), '', author)
		author = Capitalize(CleanUp(author))
		comma = re.compile(r'(?<=\w, )\w+$', flags = re.UNICODE)
		if comma.search(author):
			author = CleanUp(comma.search(author).group()+" "+ re.sub(comma.search(author).group(), "", author))
		#put the names in order First Last
		formattedlist.append(author)
	Output = ''
	if len(formattedlist)==1:
		Output = formattedlist[0]+', '
		if editors:
			Output = Output + 'ed, '
	if len(formattedlist)==2:
		Output = formattedlist[0]+' & '+formattedlist[1]+', '
		if editors:
			Output = Output + 'eds, '
	if len(formattedlist)==3:
		Output = formattedlist[0]+', '+formattedlist[1]+' & '+formattedlist[2]+', '
		if editors:
			Output = Output + 'eds, '
	if len(formattedlist)>3:
		Output = formattedlist[0] + " et al"+', '
		if editors:
			Output = Output + 'eds, '
	return Output

#print FormatAuthors("David Pardy, \n Huang, Stephen \n Jared Jackson \n Rahim R", True)#print FormatAuthors(["Smith, Don, Cherry"])#print FormatAuthors(["Smith, Smith"])#print FormatAuthors(["PARDY, DAVID"])


def GetEdition(string):
	Numbers = [["1st", "first", "1", "one"], ["2nd", "second", "2", "two"], ["3rd", "third", "3", "three"],	["4th", "fourth", "4", "four"],	["5th", "fifth", "5", "five"],
	["6th", "sixth", "6", "six"], ["7th", "seventh", "7", "seven"], ["8th", "eigth", "8", "eight"], ["9th", "ninth", "9", "nine"], ["10th", "tenth", "10", "ten"], ["11th", "eleventh", "11", "eleven"],
	["12th", "twelfth", "11", "twelve"]]
	for n in Numbers:
		for i in n:	
			matchNum = re.search(regstrElec(i), string, re.I)
			if matchNum:
				string = n[0] + " ed "
	if re.search(regstrElec('(revised?|rev)'), string, re.I|re.UNICODE): string = "revised ed "
	return string

def GetVolume(string):
	num = re.compile(r'\d+')
	if num.search(string):
		string = num.search(string).group()
	return string


def GetExtra(string):
	Output = Capitalize(CleanUp(string))
	if re.search(r'^(\(\.+\)|\[\.+\])$', Output): return Output+ ' '
	else: return '(' +Output+ ') '

def GetLooseleaf(string):
	checkdate = CheckFullDate(string)
	if checkdate[1]=="ok":	return "loose-leaf (consulted on " + checkdate[0] + "), "
	else: return "loose-leaf (consulted on DAY MONTH YEAR), "

#inputs are strings
#outputs
def FormatTitle(titleinput, volume, edition, looseleaf, extra):
	warning = False
	Output = '<i>'+Capitalize(CleanUp(titleinput))+'</i>, '
	if volume: Output += GetVolume(volume)
	if edition: Output += GetEdition(edition)
	if extra: Output += GetExtra(extra)
	if looseleaf: 
		Output += GetLooseleaf(looseleaf)
		if re.search("DAY MONTH YEAR", Output, re.I): warning = "Please input a correctly formatted date. ex 2 December 2009"
	return [Output, warning]

def DefaultPlace(string):
	States = [["Ala", ["alabama", "al"]], ["Alaska", ["ak", "alas"]], ["Ariz", ["arizona", "az"]], ["Ark", ["arkansas"]],["Cal", ["california", "cali", "calif", "californie", "cal"]], ["Colo", ["col", "colorado"]], ["Conn", ["Connecticut"]], ["Del", ["Delaware", "de"]], ["DC", ["district colombie", "district columbia", "Washington DC", "Wash DC", "dist colom"]], ["Fla", ["florida", "flor", "floride", "fl"]], ["Ga", ["georgia", "georgie"]], ["Hawaii", ["HI"]], ["Idaho", ["Ida", "Id"]], ["Ill", ["Illinois", "Il", "Ills", "Ill's"]], ["Ind", ["Indiana", "Ind", "In"]], ["Iowa", ["Ia", "Ioa"]], ["Kan", ["Kansas", "Ks", "Ka"]], ["Ky", ["Kentucky", "Ken", "Kent"]], ["La", ["Louisiana", "Louisiane", "la"]], ["Me", ["Maine"]], ["Md", ["Maryland"]], ["Mass", ["Massachussetts", "ma"]], ["Mich", ["Michigan", "MI"]], ["Minn", ["Minnesota", "Mn"]], ["Miss", ["mississippi", "ms"]], ["Mo", ["Missouri"]], ["Mont", ["Montana", "mt"]], ["N Dak", ["north dakota", "dakota du nord", "NoDak"]], ["NC", ["Caroline du Nord", "North Carolina", "N Car"]], ["Neb", ["Nebraska", "ne"]], ["Nev", ["Nevada", "nv"]], ["NH", ["New Hampshire", "N Hamp"]], ["NJ", ["New Jersey"]], ["N Mex", ["New Mexico", "nm", "nouveau mexique", "new M"]], ["NY", ["new york", "n york"]], ["Ohio", ["Oh"]], ["Okla", ["oklahoma", "OK"]], ["Or", ["oregon", "oreg"]], ["Pa", ["pennsylvania", "penn", "penna", "pennsylvanie"]], ["RI", ["Rhode Isl", "Rhode Island", "R Isl"]], ["S Dak", ["south dakota", "dakata du sud", "SD", "SoDak"]], ["SC", ["Caroline de Sud", "South Carolina", "S Car"]], ["Tenn", ["Tennessee", "Tn"]], ["Tex", ["Texas", "tex", "Tx"]], ["US", ["etas unis", "etas-unis", "usa", "united states"]], ["Utah", ["ut"]], ["Vt", ["Vermont", "Verm"]], ["Va", ["Virginia", "virg", "virginie", "virgin"]], ["W Va", ["West virginia", "wv", "w virg", "virginie occidentale"]], ["Wash", ["Washington", "wn", "wa"]], ["Wis", ["wisconsin", "wi", "wisc"]], ["Wyo", ["Wyoming", "wy"]]]
	for jur in States:
		match = re.search(regstrElec(jur[0]), string, re.I)#regstrElec has the ^ + $ object
		if match:
			string = re.sub(match.group(), ' '+jur[0]+' ', string, flags = re.I)
		for abbr in jur[1]:
			match = re.search(regstrElec(abbr), string, re.I)#regstrElec has the ^ + $ object
			if match:
					string = CleanUp(re.sub(match.group(), ' '+jur[0]+' ', string))
	Canada = [["CA", "canada", "canadian"], ["Alta", "ab", "alberta", "alta", "albertan"],["BC", "british columbia", "brit col", "british columbian"], ["Man", "mb", "manitoba", "manitoban"], ["NB", "new brunswick","new brunswicker"], ["Nfld", "nf", "nfld", "newfoundland", "newfoundlander"], ["NL", "labrador"], ["NWT", "north west territories", "north west terr", "northwest terr", "nortwest territories"], ["NS", "nova scotia", "nova scotian"], ["Nu", "nun", "nunavut", "nvt"], ["Ont", "on", "ontario", "ontarian"], ["PEI", "prince edward island"], ["Qc", "quebec", u"qu\xe9bec"], ["Sask", "sk", "saskatchewan"], ["Yu", "yukon", "yk"]]
	for p in Canada:
		for abbr in p:
			match =  re.search(regstr(abbr), string, re.I|re.UNICODE)
			if match:
				string = re.sub(match.group(), ' '+p[0]+' ', string)
	string = CleanUp(string)
	return string

def FormatPublication(place, publisher, year):#can be "no place", "no publisher", "no year"
	if place == "no place":
		place = "np"
	else: place = Capitalize(CleanUp(DefaultPlace(CleanUp(place))))
	if place == "no publisher": pass
	else: 
		pub = re.sub(regstr("the"), ' ', publisher, flags = re.I|re.UNICODE)
		pub = Capitalize(CleanUp(pub))
	if PullDate(year):
		year = PullDate(year)
	else:
		year = "[nd]"
	return '('+place+'; '+pub+', '+year+')'
	

#tested: works
def FormatPinpoint(pinpoint):
	pin = ''
	if pinpoint[0]=="pinpoint_para":
		numbers = CleanUp(pinpoint[1])
		nummatch = re.search(r'(,|-)', numbers)
		if nummatch: pin = " at paras "+str(numbers)
		else: pin = " at para "+str(numbers)
		if pinpoint[2]: pin = " ch "+ CleanUp(pinpoint[2])+ pin
		if pinpoint[3]: pin += 'ff'
	elif pinpoint[0]=="pinpoint_page":
		numbers = CleanUp(pinpoint[1])
		pin = " at "+str(numbers)
		if pinpoint[2]: pin = " ch "+ CleanUp(pinpoint[2])+ pin
		if pinpoint[3]: pin += 'ff'
	elif pinpoint[0]=="pinpoint_foot":
		noteno = CleanUp(pinpoint[1])
		nummatch = re.search(r'(,|-)', noteno)
		if nummatch: pin = " nn "+str(noteno)
		else: pin = " n "+str(noteno)
		if pinpoint[2]:
			pgno = CleanUp(str(pinpoint[2]))
			pin = " at "+pgno + pin
		if pinpoint[3]: pin = " ch "+ CleanUp(pinpoint[3])+ pin
	elif pinpoint[0]=="pinpoint_chapter":
		pin = " ch "+ CleanUp(pinpoint[1])
	pin = ' '+CleanUp(pin)
	return pin + '.'


def CiteDictionary(title, edition, keyword):
	ed = GetEdition(edition)+', '
	title = "<i>"+Capitalize(title)+"</i>, "
	keyword = '"'+keyword.lower()+'"'
	output = CleanUp( title + ed + "<i>sub verbo</i> "+keyword)
	return output+'.'

#print CiteDictionary("The Oxford English Dictionary", "2", "pussy")


'''
PINPOINT INPUTS

1. None -- [whatever, whatever, whatever, whatever]

2. To paragraph(s)  -- ["pinpoint_para", para number(s), chapter number(s) (or False), general range (True or False)]
	Paragraph(s) *:
		Tooltip: ex. 35 or 11.14
	Chapter(s): 
	General Range? checkbox
	
3. To page(s) -- ["pinpoint_page", page number(s), chapter number(s) (or False), general range (True or False)]
	Page(s) *:
	Chapter(s):
	General Range? checkbox
	
4. To footnote -- ["pinpoint_foot", footnote number(s), page number(s) (or False), chapter number(s) (or False)]
	Footnote(s) *:
	Chapter(s):
	Page(s):

5. To chapter: -- ["pinpoint_chapter", chapter number, whatever, whatever]
	Chapter(s): *'''



'''

newauthor = FormatAuthors("Pardy, David", False, True)#authors, verbatim, editors
newtitle = FormatTitle("The king and me", False, '2', "june 15, 2013", False)[0]#title, volume, edition, looseleaf(date), extra
newpublish = FormatPublication("london, UK", "Oxford university press", "no year")#can be "no place", "no publisher", "no year"
newpinpoint = FormatPinpoint(["pinpoint_para", "24-26", "1", True])


newauthor = FormatAuthors(authors, verbatim, editors)
newtitle = FormatTitle(title, volume, edition, looseleaf, extra)
newpublish = FormatPublication(place, publisher, year)#can be "no place", "no publisher", "no year"
newpinpoint = FormatPinpoint(pinpoint)

Output = newauthor + newtitle + newpublish + newpinpoint

print Output

'''


'''
Form

Author(s) * 
	- checkbox "Use verbatim"
	- checkbox "Editors"

Title * 
Volume (input digits only)
Edition (input number or "revised")
Date consulted (if loose-leaf): (input date)
Extra information: ex. (in Spanish)

Publication Place * 
	- checkbox "No place" 
	- Tooltip: Only include information necessary to reasonably identify the place.
Publisher * 
	- checkbox "No publisher"
	- Tooltip: Do not abbreviate.
	
Publication Year *
	- checkbox "No year"

Pinpoint * (like for journal but with inclusion of chapter
	1. None

	2. To paragraph(s)  -- ["pinpoint_para", para number(s), chapter number(s) (or "none"), general range (True or False)]
	Paragraph(s) *:
		Tooltip: ex. 35 or 11.14
	Chapter(s): 
	General Range? checkbox
	
	3. To page(s) -- ["pinpoint_page", page number(s), chapter number(s) (or "none"), general range (True or False)]
	Page(s) *:
	Chapter(s):
	General Range? checkbox
	
	4. To footnote -- ["pinpoint_foot", footnote number(s), page number(s) (or "none"), chapter number(s) (or "none")]
	Footnote(s) *:
	Chapter(s):
	Page(s):

	5. To chapter: -- ["pinpoint_chapter", chapter number, whatever, whatever]
	Chapter(s): *
	

DICTIONARY

Title of dictionary *:
Edition or year *:
Word referenced *:



'''


class BookClass(object):
	def __init__(self):
		self.FormatAuthors = FormatAuthors
		self.FormatTitle = FormatTitle
		self.FormatPublication = FormatPublication
		self.FormatPinpoint = FormatPinpoint
		self.CiteDictionary = CiteDictionary







