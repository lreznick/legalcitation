from CanadianCase import *
import urllib
import urllib2
import re

def Connect2Web(webURL):
	#Go to the webpage and grab the entire webpage
	aResp  = urllib2.urlopen(webURL)
	web_pg = aResp.read()
	print "******** Running Connect2Web on: ", webURL
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
		print "TitleString: ", Title
	else:
		print "TitleString: Nothing Found"
	
	result = titlePattern.search(web_pg)
	if result:
		date = PullDate(result.group(1))
		print "Date: ", date
	else:
		print "Date: Nothing Found"
	
	result = parallelPattern.search(web_pg)
	if result:
		parallel = result.group(1)
		print "ParallelCitation: ", parallel
	else:
		print "Nothing Found"
	
	#grab styleofcause from Title
	if Title:
		SoC = re.compile("(.*)(,)")
		styleofcause = SoC.search(Title).group(1)
		if styleofcause:
			print "Style of Cause = ", styleofcause
		else:
			print "Did not find Style of Cause after searching in Title."
		Title = CleanUp(Title[len(styleofcause)+1:])
		print "1. Title string modified to: ", Title
		courtString = re.compile(r'(?<=\()(.*)(\))$')
		courtSearch = courtString.search(Title)
		if courtSearch:
			court = courtString.search(Title).group(1)
			print "Court: ", court
			Title = CleanUp(re.sub('\(' + court + '\)', '', Title))
			print "2. Title string modified to: ", Title
		else:
			print "No Court at backend of Title"
		if parallel:
			if Title not in parallel:
				parallel = parallel + "; " + Title
				print "Parallel string modified to: ", parallel
		else: parallel = Title
	else:
		print "No Title string."
	if parallel:
		if not court:
			court = CheckForCourt(parallel)
			if court:
				print "Court found in Parallel:", court
		if not date:
			date = PullDate(PC)
			if date:
				print "Date found in Parallel:", date
	Output = GetStyleOfCause(styleofcause)+GetCitations(parallel, court, date, False)
	print "End of Connect2Web! Returning: ", Output, "*********"
	return [Output, [styleofcause, parallel, date, court]]


def run():
  Connect2Web("http://www.canlii.org/en/ca/scc/doc/1997/1997canlii400/1997canlii400.html")
  Connect2Web("http://canlii.ca/en/ab/abqb/doc/1986/1986canlii1825/1986canlii1825.html")
  Connect2Web("http://canlii.ca/en/ca/scc/doc/1986/1986canlii73/1986canlii73.html")
  Connect2Web("http://beta.canlii.org/en/bc/bcca/doc/1987/1987canlii2590/1987canlii2590.html")


if __name__ == "__main__":
	run()



