 
from server.webGrabber import *
from server.testyface import test123
#from webclient.appServer import *


#As of now, the main program that runs everything. When the user requests the website, it grabs the html file
# and opens it up. 
#	Website opened at http://localhost:8080
#It then waits for an input from the user and then grabs that information. then calls webgrabber which grabs links
import web
#from legal.server.webGrabber import Connect2Web

# mapping. Each post request contains what to do.   
urls = (
    '/formInput', 'Index',	
    '/' ,  'Index'

)

app = web.application(urls, globals())
render = web.template.render('webclient/templates/', base = 'layout')
testcase1 = "<i>Adams v Thompson, Berwick, Pratt, & Partners </i>(1987), 39 DLR (4th) 314 (available on CanLII) (CA) (McLachlin JA)."
testcase2 = "<i>Dunsmuir v. New Brunswick</i>, 2008 SCC 9 at para 132, [2008] 1 SCR 190 (Binnie J) [<i>Dunsmuir</i>], aff'ing 2006 NBCA 27."
testcase3 = "<i>R v Sparrow</i>, [1990] 1 SCR 1075 at 1103, 70 DLR (4th) 385, Dickson CJC [<i>Sparrow</i>] citing <i>Pasco v Canadian National Railway Co</i>, [1986] 1 CNLR 35 at 37 (available on CanLII) (BCSC)."
testcase4 = "<i>Reference re Securities Act</i>, 2011 SCC 66, [2011] 3 SCR 837."



class Index(object):
	def GET(self):
		print "hello"
		return render.index() #hello_form is the name of the html
		
		# For index.html
		
		#form = web.input (name = "Nobody")
		#greeting = "hello, %s" % form.name
		#return render.index(greeting=greeting)
	def POST(self):
		form = web.input()
        #form.validates()
		
		print "here" 
		#webURL = "%s" % (form.styleofcause)
		webURL = "%s" % (form.testing)
		if not webURL: 
			print "nothing to see here boys"
			return render.index()
		elif webURL == "1":
			print "1"
			test123(webURL)
			return testcase1
		elif webURL == "2":
			return testcase2
		elif webURL == "3":
			return testcase3
		elif webURL == "4":
			return testcase4
		else:
			print "WebURL:", webURL
			print "Self: " , self
			#s = form.value['textfield']
			return webURL

''' '''




#return render.index(greeting=webURL)
		#print "input here:", greeting
		#webGrabber.Connect2Web(webURL)		
		#return render.index(greeting = greeting)
		
#if __name__ == "__main__":
  #  app.run()


def main():
	#webURL = "http://www.canlii.org/en/ca/scc/doc/1997/1997canlii400/1997canlii400.html"
	#Connect2Web(webURL)
	string = app.run() #
	print "I am here"
	print string
  
if __name__ == "__main__":
	main()