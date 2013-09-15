Legal Citation
A citation website primarily used to aid lawyers in their work
Requires python 2.7, nosetests, apache2, mysqldb, mysqldb-python, mod_wsgi, web.py, passlib

To Run: 
cd into legal directory -> python main.py

To Test:
cd into LegalCitation -> nosetests -v 


Important Information about the structure and use of the program
-All folders must have __init__.py in their directory to be detected as a part of the package.
-If nosetests is ran from any other directory, it will not work!
- YOU MUST add legal citation to your python path.
	- In windows: #For local Development, Ensure to add everything to the python path 
		#http://stackoverflow.com/questions/3701646/how-to-add-to-the-pythonpath-in-windows-7
		I added E:\My Documents\Website Design\legalcitation (yours will be different)

