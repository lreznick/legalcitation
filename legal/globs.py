import web
def init():
	global db
	db = web.database(dbn='mysql', host='127.0.0.1', port=3306, user='root', pw='root', db='intravires')
	
	global render
	template_globals ={}
	render_partial = web.template.render('webclient/templates/', globals=template_globals)
	render = web.template.render('webclient/templates/', globals=template_globals, base='layout')
	template_globals.update(render=render_partial)