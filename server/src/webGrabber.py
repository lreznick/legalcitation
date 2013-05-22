# Opens are specified url, and grabs the webpage (all of the source code). Then parses through the code using regular expressions
# to find the style of cause, parallele citations and date. 
# Stephen Huang, 2013
 import os, sys, inspect
 # realpath() with make your script run, even if you symlink it :)
 cmd_folder = os.path.realpath(os.path.abspath(os.path.split(inspect.getfile( inspect.currentframe() ))[0]))
 if cmd_folder not in sys.path:
     sys.path.insert(0, cmd_folder)

 # use this if you want to include modules from a subforder
 cmd_subfolder = os.path.realpath(os.path.abspath(os.path.join(os.path.split(inspect.getfile( inspect.currentframe() ))[0],"subfolder")))
 if cmd_subfolder not in sys.path:
     sys.path.insert(0, cmd_subfolder)

 # Info:
 # cmd_folder = os.path.dirname(os.path.abspath(__file__)) # DO NOT USE __file__ !!!
 # __file__ fails if script is called in different ways on Windows
 # __file__ fails if someone does os.chdir() before
 # sys.argv[0] also fails because it doesn't not always contains the path
 
 
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
  
  
main()



