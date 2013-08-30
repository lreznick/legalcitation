import web


def init():

	
	global db
	global render
	
	db = web.database(dbn='mysql', host='127.0.0.1', port=3306, user='root', pw='root', db='intravires')
	#db = web.database(dbn='mysql', host='127.0.0.1', port=3306, user='root', pw='Jeenyus1', db='intravires')
	
	
	template_globals ={ 'str': str }
	render_partial = web.template.render('webclient/templates/', globals=template_globals)
	render = web.template.render('webclient/templates/', globals=template_globals, base='layout')
	template_globals.update(render=render_partial)
