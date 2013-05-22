 
import urllib
import urllib2
import re

def Connect2Web():
	#Go to the webpage and grab the entire webpage
	webURL = "http://www.canlii.org/en/ca/scc/doc/1997/1997canlii400/1997canlii400.html"
	aResp  = urllib2.urlopen(webURL);
	web_pg = aResp.read();
	
	#All regular Expressions to parse through the web document
	titlePattern    = re.compile('(?<=<h1 class="canlii decision">).*(?=,)')
	titlePattern2   = re.compile('\s*<=<h1 class="canlii decision">.*(?=</h1>)')
	testPattern     = re.compile('(?<=a).*b')
	parallelPattern = re.compile('(?<=<span class="canliiCitation">)\s*\n.*')

	titleString = """blahblah"""
		
	#Grab the results from the webdocument
	result = titlePattern.search(web_pg)
	if result:
		print "TitleString:::" ,result.group()
	else:
		print "Nothing Found"
	
	result = titlePattern2.search(titleString)
	if result:
		print "TitleString2:::" ,result.group()
	else:
		print "Nothing Found"
	
	result = parallelPattern.search(web_pg)
	if result:
		print "ParallelCitation:::" ,result.group()
	else:
		print "Nothing Found"	
	
	#fo = open("foo.txt", "r+")
	#fo.write(web_pg)
  	#print web_pg
  	#fo.close()

#Define a main() function that prints a litte greeting
def main():
  Connect2Web()
 
def test(x):
	return 2
  
main()



