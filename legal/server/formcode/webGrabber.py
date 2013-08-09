import urllib
import urllib2
import re
from CanadianCase import *

def CleanUpTitle(string):
	end = re.compile(r"[;,\.:\s\(\[<\\]+$")#remove excess punctuation at the end of the string
	beg = re.compile(r"^[;,\.:\s\)\)>\\]+")#and at the beginning
	if end.search(string):#remove excess punctuation at the end
		remove = len(end.search(string).group())
		##print "Detected last "+str(remove)+"characters are punctuation..."
		string = string[:-remove]
		##print "... removing. Now is: ", string
	if beg.search(string):
		remove = len(beg.search(string).group())
		##print "Detected first "+str(remove)+"characters are punctuation..."
		string = string[remove:]
		##print "... removing. Now is: ", string
	string	= re.sub('\s*?,\s*?', ', ', string)	#put a space after a comma instead of multiple spaces or no space
	string 	= re.sub('\s*?\(', ' (', string)    #put a space before a left bracket instead of multiple spaces or no space
	string 	= re.sub('\)\s*?', ') ', string)    #put a space after a right bracket instead of multiple spaces or no space
	string 	= re.sub('\s*?:\s*?', ': ', string) #put a space after a comma instead of multiple spaces or no space
	string 	= re.sub('\s*?;\s*?', '; ', string) #put a space after a semicolon instead of multiple spaces or no space
	string	= re.sub(' +',' ', string)          #Remove excess white spaces
	string 	= string.strip()                    #Remove leading or trailing white spaces
	return string


def substr(i):#i is a string input
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
	return i

def CanliiCheckForCites(string): #pull the neutral citation from the list if there is one
	#print "**** Starting CanliiCheckForCites on", string
	Cites = ['SCC', 'FC', 'FCA', 'TCC', 'CMAC', 'Comp Trib', 'CHRT', 'PSSRB', 'ABCA', 'ABQB', 'ABPC', 'ABASC', 'BCCA', 'BCSC', 'BCPC', 'BCHRT', 'BCSECCOM', 'MBCA', 'MBQB', 'MBPC', 'NBCA', 'NBQB', 'NBPC', 'NFCA', 'NLSCTD', 'NWTCA', 'NWTSC', 'NWTTC', 'NSCA', 'NSSC', 'NSSF', 'NSPC', 'NUCJ', 'NUCA', 'ONCA', 'ONSC', 'ONCJ', 'ONWSIAT', 'ONLSAP', 'ONLSHP', 'PESCAD', 'PESCTD', 'QCCA', 'QCCS', 'QCCP', 'QCTP', 'CMQC', 'QCCRT', 'SKCA', 'SKQB', 'SKPC', 'SKAIA', 'YKCA', 'YKSC', 'YKTC', 'YKSM', 'YKYC', 'CACT', "Ex CR", "FCR", "SCR", "AR", "Alta AR", "BCR", "BR", "CA", "CBES", "CP", "CS", "CSP", "Man R", "NBR", "Nfld & PEIR", "NSR", "NSR (2d)", "NWTR", "OLR", "OR (3d)", "OR (2d)", "OR", "OWN", "RJQ", "Sask LR", "Terr LR", "TJ", "YR",  "DLR (2d)", "DLR (3d)", "DLR (4th)", "DLR", "WWR (NS)","WWR", "ACWS (2d)", "ACWS (3d)", "ACWS", "CanLII"]
	Matches = ''
	for x in Cites:
		m = re.search(r'\[?\(?(\d\d\d\d)?\)?\]?\s?\d* '+x+' \d+', string)
		if m:
			##print "In CanliiCheckForCite, found citation", CleanUp(m.group())
			Matches += '; ' +CleanUp(m.group())
			string = CleanUpTitle(re.sub(substr(m.group())+r'(,\s)?', ' ', string))
	for x in Cites: #repeat it because sometimes there are two citations in the title string
		m = re.search(r'\[?\(?(\d\d\d\d)?\)?\]?\s?\d* '+x+' \d+', string)
		if m:
			##print "In CanliiCheckForCite, found citation", CleanUp(m.group())
			Matches += '; ' +CleanUp(m.group())
			string = CleanUpTitle(re.sub(substr(m.group())+r'(,\s)?', ' ', string))
	if Matches=='': Matches = False
	canlii = "canlii"
	cansearch = re.search(regstr(canlii), string, flags = re.I)
	if cansearch:
		string = re.sub("\(?CanLII\)", ' ', string)	
	return [string, Matches]

def CanliiCheckForCt(string):
	#print "**** Starting CanliiCheckForCt on", string
	Courts = ['ABCA', 'Alta CA','ABQB', 'Alta QB', 'ABPC', 'Alta Prov Ct', 'ABASC', 'Alta ASC', 'BCCA', 'BCSC', 'BCPC', 'BC Prov Ct','BCHRT', 'MBCA', "Man CA",'MBQB', 'Man QB','MBPC', 'Man PC','NBCA', 'NBQB', 'NBPC', 'NB Prov Ct','NFCA', 'NL CA','NLSCTD', 'NL Sup Ct (TD)','NWTCA', 'NWTSC', 'NWTTC', 'NWT Terr Ct','NSCA', 'NSSC', 'NSSF', 'NS SC (Fam Div)','NSPC', 'NS Prov Ct', 'NUCJ', 'Nu Ct J','NUCA', 'ONCA', 'Ont CA','ONSC', 'Ont SC','ONCJ', 'Ont Ct J','ONWSIAT', 'Ont WSIAT','ONLSAP', 'Ont LSAP','ONLSHP', 'Ont LSHP','PESCAD', 'PEI SC (AD)','PESCTD', 'PEI SC (TD)','QCCA', 'QCCS', 'QCCP', 'QCTP', 'CMQC','QCCRT','SKCA', 'Sask CA', 'SKQB', 'Sask QB','SKPC', 'Sask Prov Ct','SKAIA', 'Sask AIA', 'YKCA', 'Yu CA','YKSC', 'Yu SC','YKTC', 'Yu Terr Ct', 'YKSM', 'Yu Sm Cl', 'YKYC', 'Yu Youth Ct', 'SCC', 'FC', 'FCTD', 'FCA', 'TCC', 'CMAC', 'Comp Trib', 'CHRT', 'PSSRB', 'BCSECCOM', 'CACT']
	Checks = re.findall(r'\([\w\s]+\)', string, re.UNICODE)
	court = False
	if Checks:
		for Check in Checks:
			entirecourt = Check
			possiblecourt = CleanUp(entirecourt)[1:-1]#take off parentheses
			nospacepossiblecourt = ''.join(re.split(' ', possiblecourt))
			for x in Courts:
				nospacecourt = ''.join(re.split(' ', x))
				match = re.search(nospacecourt, nospacepossiblecourt)
				if match:
					court = x
					string = CleanUp(re.sub(substr(entirecourt), '', string))
					break
			if court:
				break
		return [string, court]
	else:
		return [string, False]


def Connect2Web(webURL):
	#Go to the webpage and grab the entire webpage
	aResp  = urllib2.urlopen(webURL)
	web_pg = aResp.read()
	##print "******** Running Connect2Web on: ", webURL
	#All regular Expressions to parse through the web document
	titlePattern = re.compile('(?<=<h1 class="canlii decision">)(.*)(</h1>)')#(?=,)')
	datePattern = re.compile('(?<=<td class="label">Date:</td>\n<td>)(.*)(</td>)')
	parallelPattern = re.compile('(?<=<span class="canliiCitation">)\n\s*(.*)')#(\n</span>)')
	
	#These will eventually be the outputs
	styleofcause = False
	date = False
	parallel = False
	court = False
	
	'''Grab the match results from the webdocument'''
	result = datePattern.search(web_pg)
	if result:
		date = PullDate(result.group(1))#may return false
	Title = False
	result = titlePattern.search(web_pg)
	if result:
		Title = CleanUp(result.group(1))
		'''Check for date in the title string'''
		if not date:
			date = PullDate(Title)
	if not Title:
		return ["Sorry, link not recognized, please input information manually.", ["no", "no", "no", "no"], "no"]
	result = parallelPattern.search(web_pg)
	if result:
		parallel = CleanUp(result.group(1))	
		if not date:
			date = PullDate(parallel)
	
	if not parallel:
		parallel = ''
	
	''' Got all the of the strings, now look through them to reorder all of the right aspects'''
	##print "Title = ", Title
	##print "parallel = ", parallel
	'''Check for citations in the title string'''
	Cites = CanliiCheckForCites(Title)
	if Cites[1]:
		m = CleanUpTitle(Cites[1])
		m = SplitUpParallel(m)
		for x in m:
			if not re.search(x, parallel):
				parallel += '; '+ x
		parallel = CleanUpTitle(parallel)
		Title = Cites[0]
		#print "Found citation(s) in Title. Style of cause string modified to: ", Title
	'''Check for court in the title string'''
	TitleCourt = CanliiCheckForCt(Title)
	if TitleCourt[1]:
		court = TitleCourt[1]
		Title = TitleCourt[0]
		#print "Found court Title. Style of cause string modified to: ", Title
	else:
		Pcourt = CheckForCourt(parallel)
		if Pcourt:
			court = Pcourt
			#print "Found court in parallel: ", Pcourt
	CourtsInParallel = CanliiCheckForCt(parallel)
	if CourtsInParallel[1]:
		#print "YEAH"
		parallel = CourtsInParallel[0]
	canlii = "canlii"
	cansearch = re.search(regstr(canlii), parallel, flags = re.I)
	if not cansearch:
		parallel += "; canlii"
	styleofcause = CleanUpTitle(Title)
			
	#print "Court: ", court
	#print "Styleofcause: ", styleofcause
	#print "Parallel: ", parallel
	#print "Date: ", date
	if (court) and (styleofcause) and (parallel) and (date):
		Output = GetStyleOfCause(styleofcause)+GetCitations(parallel, court, date, False)+'.'
		##print "End of Connect2Web! Returning: ", Output, "*********"
		return [Output, [styleofcause, parallel, date, court], AutoPCPinpoint(parallel)]
	else:
		return ["Sorry, this page is unsupported. Please input information manually.", ["no", "no", "no", "no"], "no"]


def run():
	pass
	'''print Connect2Web("http://canlii.ca/en/ns/nssc/doc/1998/1998canlii1757/1998canlii1757.html")[0]+ "\n\n"
	print Connect2Web("http://www.canlii.org/en/ca/scc/doc/1997/1997canlii400/1997canlii400.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/ab/abqb/doc/1986/1986canlii1825/1986canlii1825.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/ca/scc/doc/1986/1986canlii73/1986canlii73.html")[0]+ "\n\n"
	print Connect2Web("http://beta.canlii.org/en/bc/bcca/doc/1987/1987canlii2590/1987canlii2590.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/ab/abpc/doc/2010/2010abpc27/2010abpc27.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/ca/scc/doc/2008/2008scc9/2008scc9.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/fr/qc/qcca/doc/1996/1996canlii6241/1996canlii6241.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/ab/abqb/doc/2008/2008abqb566/2008abqb566.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/ab/abqb/doc/1986/1986canlii1879/1986canlii1879.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/eliisa/highlight.do?language=en&searchTitle=1986+CanLII+1879+%28AB+QB%29&origin=%2Fen%2Fab%2Fabqb%2Fdoc%2F1986%2F1986canlii1879%2F1986canlii1879.html&path=/en/ab/abqb/doc/1989/1989canlii3405/1989canlii3405.html&searchUrlHash=AAAAAAAYMTk4NiBDYW5MSUkgMTg3OSAoQUIgUUIpAAAAAQA3L2VuL2FiL2FicWIvZG9jLzE5ODYvMTk4NmNhbmxpaTE4NzkvMTk4NmNhbmxpaTE4NzkuaHRtbAE")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/ca/scc/doc/1982/1982canlii19/1982canlii19.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/eliisa/highlight.do?language=en&searchTitle=1982+CanLII+19+%28SCC%29&origin=%2Fen%2Fca%2Fscc%2Fdoc%2F1982%2F1982canlii19%2F1982canlii19.html&translatedOrigin=%2Ffr%2Fca%2Fcsc%2Fdoc%2F1982%2F1982canlii19%2F1982canlii19.html&path=/en/ca/scc/doc/1990/1990canlii58/1990canlii58.html&searchUrlHash=AAAAAAAUMTk4MiBDYW5MSUkgMTkgKFNDQykAAAACADIvZW4vY2Evc2NjL2RvYy8xOTgyLzE5ODJjYW5saWkxOS8xOTgyY2FubGlpMTkuaHRtbAAyL2ZyL2NhL2NzYy9kb2MvMTk4Mi8xOTgyY2FubGlpMTkvMTk4MmNhbmxpaTE5Lmh0bWwB")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/nt/ntca/doc/2008/2008nwtca1/2008nwtca1.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/ca/scc/doc/1993/1993canlii158/1993canlii158.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/ca/scc/doc/1989/1989canlii23/1989canlii23.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/nl/nlsctd/doc/2012/2012canlii2508/2012canlii2508.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/nl/nlca/doc/1989/1989canlii3932/1989canlii3932.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/nl/nlsctd/doc/2009/2009nltd124/2009nltd124.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/nl/nlca/doc/1988/1988canlii201/1988canlii201.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/on/onsc/doc/1994/1994canlii7248/1994canlii7248.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/pe/pescad/doc/2007/2007pescad4/2007pescad4.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/ab/abqb/doc/2001/2001abqb624/2001abqb624.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/nt/ntca/doc/1999/1999nwtca1/1999nwtca1.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/ca/scc/doc/1961/1961canlii42/1961canlii42.html")[0]+ "\n\n"
	print Connect2Web("http://canlii.ca/en/ca/scc/doc/1922/1922canlii3/1922canlii3.html")[0]+ "\n\n"'''
	print "\n"+Connect2Web("http://canlii.ca/en/nt/ntca/doc/2008/2008nwtca1/2008nwtca1.html")[0]
	
	
	

if __name__ == "__main__":
	run()



