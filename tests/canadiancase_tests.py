#Very important!!! Remember to start all definitions that you wish to test with 
# test_ so on so forth.
from nose.tools import *
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
    
def test_Capitalize():
    #Testing Fuzz Input
    assert_equal(Capitalize("1235451!@$@#$^%*&^]][]]"),'1235451!@$@#$^%*&^]][]]')
    
    #Test Capitalization
    assert_equal(Capitalize("hello test one two Three"),"Hello Test One Two Three")
    assert_equal(Capitalize("1hello t234est one two Three"),"1hello T234est One Two Three")
    assert_equal(Capitalize("a(aa)aa[aaa]aa"),'A(Aa)aa[aaa]aa')
    assert_equal(Capitalize("([a"),'([a') #This code doesnt work
    
    #Testing Decapitilization
#  assert_equal(Capitalize("a(((((aA)aa[aa]aa"),'A(((((Aa)aa[aa]aa')
#  assert_equal(Capitalize("TESTING THE STRING(([][]aaa"),"Testing The String(([][]aaa") #Fix
    assert_equal(Capitalize("AAAAA"),"Aaaaa")
    assert_equal(Capitalize("A(AAAA"),"A(Aaaa")
#  assert_equal(Capitalize("A((AAAA"),"A((Aaaa")
    assert_equal(Capitalize("A(1A"),"A(1a")
    

def test_StyleAttributes():   
    pass
    #assert_equal(StyleAttributes(

def test_StatuteChallenge():        
    assert_equal(StatuteChallenge("test"),"test (Canada)")

def test_GetStyleOfCause():           
    pass

def test_ChooseBestReporters():           
    pass

def test_CleanUpCourt():           
    pass

def test_TakeOutJurisdiction():           
    pass    
    
def test_PullDate():           
    pass    
    
def test_CleanUp():           
    pass    

def test_GetCitations():           
    pass    


    