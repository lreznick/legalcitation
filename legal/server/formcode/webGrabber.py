import urllib
import urllib2
import re
from CanadianCase import *

def Connect2Web(webURL):
	#Go to the webpage and grab the entire webpage
	aResp  = urllib2.urlopen(webURL)
	web_pg = aResp.read()
	#print "******** Running Connect2Web on: ", webURL
	#All regular Expressions to parse through the web document
	titlePattern = re.compile('(?<=<h1 class="canlii decision">)(.*)(</h1>)')#(?=,)')
	datePattern = re.compile('(?<=<td class="label">Date:</td>\n<td>)(.*)(</td>)')
	parallelPattern = re.compile('(?<=<span class="canliiCitation">)\n\s*(.*)')#(\n</span>)')
	
	#These will eventually be the outputs
	styleofcause = False
	date = False
	parallel = False
	court = False
	
	#Grab the results from the webdocument
	Title = False
	result = titlePattern.search(web_pg)
	if result:
		Title = result.group(1)
		#print "TitleString: ", Title
	else:
		#print "TitleString: Nothing Found"
		pass
	
	result = titlePattern.search(web_pg)
	if result:
		date = PullDate(result.group(1))
		#print "Date: ", date
	else:
		#print "Date: Nothing Found"
		pass
	
	result = parallelPattern.search(web_pg)
	if result:
		parallel = result.group(1)
		#print "ParallelCitation: ", parallel
	else:
		#print "Nothing Found"
		pass
	
	#grab styleofcause from Title
	if Title:
		Title = CleanUp(Title)
		SoC = re.compile("^(.*?)(,)")
		if SoC:
			styleofcause = SoC.search(Title).group(1)
			Title = CleanUp(Title[len(styleofcause)+1:])
			#print "Style of Cause = ", styleofcause
		else:
			#print "Did not find Style of Cause after searching in Title."
			pass
		#print "1. Title string modified to: ", Title
		if not date:
			#print "Date is False. Checking for date in Title: ", Title
			date = PullDate(Title)
			if date:
				#print "Found Date in Title: ", date
				pass
		court = CheckForCourt(Title)
		if court:
			#print "Found court in Title string: ", court
			pass
		else:
			courtString = re.compile(r'(?<=\()(.*)(\))$')
			courtSearch = courtString.search(Title)
			if courtSearch:
				court = courtString.search(Title).group(1)
				#print "Court found in title string: ", court
				Title = CleanUp(re.sub('\(' + court + '\)', '', Title))
				#print "2. Title string modified to: ", Title
			else:
				#print "No Court at backend of Title"
				pass
		if parallel:
			Pcourt = CheckForCourt(parallel)
			if Pcourt:
				court = Pcourt
				#print "Court found in parallel: ", Pcourt
				parallel = CleanUp(re.sub('\(' + Pcourt + '\)', '', parallel))
				#print "1. Parallel string modified to: ", parallel
			if Title not in parallel:
				parallel = parallel + "; " + Title
				#print "2. Parallel string modified to: ", parallel
		else: parallel = Title
	else:
		#print "No Title string."
		pass
	if parallel:
		#print "Parallel string: ", parallel
		if not court:
			court = CheckForCourt(parallel)
			if court:
				pass
				#print "Court found in Parallel:", court
		#print "Checking date in prallel. Currently, date =", date
		if not date:
			date = PullDate(parallel)
			if date:
				#print "Date found in Parallel:", date
				pass
	#print "Court: ", court
	#print "Styleofcause: ", styleofcause
	#print "Parallel: ", parallel
	#print "Date: ", date
	if (court and styleofcause and parallel and date):
		Output = GetStyleOfCause(styleofcause)+GetCitations(parallel, court, date, False)+'.'
		#print "End of Connect2Web! Returning: ", Output, "*********"
		return [Output, [styleofcause, parallel, date, court], AutoPCPinpoint(parallel)]
	else:
		return ["Sorry, link not recognized, please input information manually.", ["no", "no", "no", "no"], "no"]


def run():
	print "hello"
	'''print Connect2Web("http://canlii.ca/en/ns/nssc/doc/1998/1998canlii1757/1998canlii1757.html")[0]
	print Connect2Web("http://www.canlii.org/en/ca/scc/doc/1997/1997canlii400/1997canlii400.html")[0]
	print Connect2Web("http://canlii.ca/en/ab/abqb/doc/1986/1986canlii1825/1986canlii1825.html")[0]
	print Connect2Web("http://canlii.ca/en/ca/scc/doc/1986/1986canlii73/1986canlii73.html")[0]
	print Connect2Web("http://beta.canlii.org/en/bc/bcca/doc/1987/1987canlii2590/1987canlii2590.html")[0]
	print Connect2Web("http://canlii.ca/en/ab/abpc/doc/2010/2010abpc27/2010abpc27.html")[0]
	print Connect2Web("http://canlii.ca/en/ca/scc/doc/2008/2008scc9/2008scc9.html")[0]'''


if __name__ == "__main__":
	run()



