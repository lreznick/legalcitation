 
from server.webGrabber import *
from webclient.grabFormData import *

def main():
	print "hello"
	webURL = "http://www.canlii.org/en/ca/scc/doc/1997/1997canlii400/1997canlii400.html"
	Connect2Web(webURL)
	string = app.run() #
	print string
  
if __name__ == "__main__":
	main()