import web

urls = (
  '/hello', 'Index'
)

app = web.application(urls, globals())

render = web.template.render('templates/')

class Index(object):
    def GET(self):
		return render.hello_form() #hello_form is the name of the html
		
		# For index.html
		
		#form = web.input (name = "Nobody")
		#greeting = "hello, %s" % form.name
		#return render.index(greeting=greeting)
    def POST(self):
        form = web.input(name="Nobody", greet="Hello")
        greeting = "%s, %s" % (form.greet, form.name)
        return render.index(greeting = greeting)
		
if __name__ == "__main__":
    app.run()