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

class Index(object):
    def GET(self):
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
        print "WebURL:", webURL
        print "Self: " , self
        #s = form.value['textfield']
        return webURL
        #return render.index(greeting=webURL)
		#print "input here:", greeting
		#webGrabber.Connect2Web(webURL)		
		#return render.index(greeting = greeting)
		
if __name__ == "__main__":
    app.run()