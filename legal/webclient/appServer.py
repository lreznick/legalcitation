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
testcase1 = "Adams v Thompson, Berwick, Pratt, & Partners (1987), 39 DLR (4th) 314 (available on CanLII) (CA) (McLachlin JA)."
testcase2 = "Dunsmuir v. New Brunswick, 2008 SCC 9 at para 132, [2008] 1 SCR 190 (Binnie J) [Dunsmuir], aff'ing 2006 NBCA 27."
testcase3 = "R v Sparrow, [1990] 1 SCR 1075 at 1103, 70 DLR (4th) 385, Dickson CJC [Sparrow] citing Pasco v Canadian National Railway Co, [1986] 1 CNLR 35 at 37 (available on CanLII) (BCSC)."
testcase4 = "Reference re Securities Act, 2011 SCC 66, [2011] 3 SCR 837."



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
		webURL = "%s" % (form.styleofcause)
		if not webURL: 
			print "nothing to see here boys"
			return render.index()
		if webURL == "1":
			return testcase1
        else:
			print "WebURL:", webURL
			print "Self: " , self
			#s = form.value['textfield']
			return webURL

'''if webURL == "2":
    return testcase2
    if webURL == "3":
    return testcase3
    
    if webURL == "4":
    return testcase4'''




#return render.index(greeting=webURL)
		#print "input here:", greeting
		#webGrabber.Connect2Web(webURL)		
		#return render.index(greeting = greeting)
		
if __name__ == "__main__":
    app.run()