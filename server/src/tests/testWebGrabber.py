
from webGrabber import *   # import everything from your module
import unittest  # This loads the testing methods and a main program

class TestWebGrabber(unittest.TestCase):  # use any meaningful name
	def testAdd(self):
		print "hello"
    ## Your test methods go here. Indent your
    ## methods, because they belong inside the class.
    
unittest.main()  # outside the class--this tells the framework to run