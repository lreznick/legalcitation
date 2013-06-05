#Very important!!! Remember to start all definitions that you wish to test with 
# test_ so on so forth.
from nose.tools import *

#from legal.server.CanadianCase import Contains
from legal.server.CanadianCase import *

def test_NotAllowed():
    assert_equal(NotAllowed("test"),"test");
    assert_equal(NotAllowed("354+*78a+*wef"),"354+*78a+*wef");
    assert_equal(NotAllowed("\n\n\n\n\n\n\n\n\n"),"\n\n\n\n\n\n\n\n\n");
    

def test_Contains():
    list = ["hi", "you", "sup", "pew pew"]
    assert_equal(Contains(list,"hi"),True)
    assert_equal(Contains(list,"hzii"),False)
    assert_equal(Contains(list,"hiiiiiiiiii"),True)
