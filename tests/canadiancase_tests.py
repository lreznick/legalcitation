#Very important!!! Remember to start all definitions that you wish to test with 
# test_ so on so forth.
from nose.tools import *
from legal.server.CanadianCase import *

'''****************     STYLE OF CAUSE     ****************'''

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
    assert_equal(Capitalize("([a"),'([a') 
    assert_equal(Capitalize("M'Intosh"),"M'Intosh")
    assert_equal(Capitalize("don't"),"Don't")
    assert_equal(Capitalize("M'Intosh"),"M'Intosh")
    assert_equal(Capitalize("CAN'T"),"Can't")
    assert_equal(Capitalize("a(((((aA)aa[aa]aa"),'A(((((aa)aa[aa]aa')
    #Test Decapitalization
    assert_equal(Capitalize("TESTING THE STRING(([][]aaa"),"Testing The String(([][]aaa") #Fix
    assert_equal(Capitalize("AAAAA"),"Aaaaa")
    assert_equal(Capitalize("A(AAAA"),"A(Aaaa")
    assert_equal(Capitalize("A((AAAA"),"A((aaaa")
    assert_equal(Capitalize("A(1A"),"A(1a")
    assert_equal(Capitalize("i looove M'Cin apples YAYA"),"I Looove M'Cin Apples YAYA")
    assert_equal(Capitalize("RSWDU 45424"),"RSWDU 45424")
    assert_equal(Capitalize("canada (AG)"),"Canada (AG)")
    assert_equal(Capitalize("The national petroleum act"),"The National Petroleum Act")
    
    

def test_StyleAttributes():   
    assert_equal(StyleAttributes("mnr"), "(MNR)")
    assert_equal(StyleAttributes("Canada ag"), "Canada (AG)")
    assert_equal(StyleAttributes("attorney general of ab"), "Alberta (AG)")
    assert_equal(StyleAttributes("mb ag"), "Manitoba (AG)")
    assert_equal(StyleAttributes("Williams guardian ad litem"), "Williams (Guardian ad litem of)")
    assert_equal(StyleAttributes("litigation guardian Williams"), "Williams (Litigation guardian of)")
    assert_equal(StyleAttributes("David limited liability partnership corp"), "David LLP Corp")
    assert_equal(StyleAttributes("Man limited"), "Man Ltd")
    assert_equal(StyleAttributes("trustee of David"), "David (Trustee of)")
    assert_equal(StyleAttributes("David (Receivership)"), "David (Receiver of)")
    assert_equal(StyleAttributes("receiver of david"), "david (Receiver of)")
    assert_equal(StyleAttributes("Stephen fskjdhf23927()[][][}{} incorporated"), "Stephen fskjdhf23927 [][][}{} Inc")#gets rid of round brackets, adds a space between the numbers and square brackets
    assert_equal(StyleAttributes("nlab"), "nlab")
    assert_equal(StyleAttributes("nl"), "Newfoundland and Labrador")
    
    

def test_StatuteChallenge():        
    assert_equal(StatuteChallenge("The Act (bc)"),"The Act (British Columbia)")
    assert_equal(StatuteChallenge("The national petroleum act"),"The national petroleum act")
    assert_equal(StatuteChallenge("BC Forestry Act"),"British Columbia Forestry Act")
    assert_equal(StatuteChallenge("Farmer's Milling Code (ab)"),"Farmer's Milling Code (Alberta)")
    assert_equal(StatuteChallenge("Fisheries Act"),"Fisheries Act (Canada)")
    assert_equal(StatuteChallenge("Fish Act (NL)"),"Fish Act (Newfoundland and Labrador)")
    assert_equal(StatuteChallenge("reference re Fishing Stuff"),"Reference Re Fishing Stuff (Canada)")
    assert_equal(StatuteChallenge("ref re fish act"),"Reference Re fish act (Canada)")
    assert_equal(StatuteChallenge("Ex Parte Plimus Act (MB)"),"Ex parte Plimus Act (Manitoba)")
    

#this is the function you use for each individual action.
#GetStyleOfCause just really calls this function, so all the tests for it are applicable.
#Action also calls StatuteChallenge, StyleAttribues, Capitalize, and NotAllowed
def test_Action():           
    assert_equal(Action("The Act (bc)"),"The Act (British Columbia)")
    assert_equal(Action("The national petroleum act"),"The National Petroleum Act")
    

#this is the function you call to actually do everything. 
#really all it does is separate causes of action by ";" and then call #Action
def test_GetStyleOfCause():  
	assert_equal(GetStyleOfCause("The Act (bc)"),"The Act (British Columbia)")
	assert_equal(GetStyleOfCause("R. v. Marshall ; R. v. Bernard"),"R v Marshall; R v Bernard")
	assert_equal(GetStyleOfCause("dfsdkfjhsdk jhdffeliufe af"),"Dfsdkfjhsdk Jhdffeliufe Af")
	assert_equal(GetStyleOfCause("dunsmuir v. nb"),"Dunsmuir v New Brunswick")
	assert_equal(GetStyleOfCause("DUNSMUIR v NEW BRUNSWICK"),"Dunsmuir v New Brunswick")
	assert_equal(GetStyleOfCause("The national petroleum act"),"The National Petroleum Act")
	assert_equal(GetStyleOfCause("BC Forestry Act"),"British Columbia Forestry Act")
	assert_equal(GetStyleOfCause("Farmer's Milling Code (ab)"),"Farmer's Milling Code (Alberta)")
	assert_equal(GetStyleOfCause("Ref re Fisheries Act"),"Reference Re Fisheries Act (Canada)")
	assert_equal(GetStyleOfCause("Ref Fish Act (NL)"),"Reference Re Fish Act (Newfoundland and Labrador)")
	assert_equal(GetStyleOfCause("reference re Fishing act"),"Reference Re Fishing Act (Canada)")
	assert_equal(GetStyleOfCause("ref re fish act"),"Reference Re Fish Act (Canada)")
	assert_equal(GetStyleOfCause("ref Ex Parte Plimus Act (MB)"),"Reference Re Ex parte Plimus Act (Manitoba)")
	assert_equal(GetStyleOfCause("    order 231223-23"),"Order 231223-23")
	assert_equal(GetStyleOfCause("Securities Act Ref"), "Reference Re Securities Act (Canada)")
	assert_equal(GetStyleOfCause("R v Sparrow"),"R v Sparrow")
	assert_equal(GetStyleOfCause("Adams v Thompson, Berwick, Pratt, & Partners"),"Adams v Thompson, Berwick, Pratt, & Partners")
	assert_equal(GetStyleOfCause(u"Qu\xe9bec v Johnson"), u"Qu\xe9bec v Johnson")

'''****************     CITATIONS     ****************'''

#only takes lists!
def test_ChooseBestReporters():           
    assert_equal(ChooseBestReporters(["canlii"]),"CanLII")
    assert_equal(ChooseBestReporters(["dfsdfsad"]),"dfsdfsad")
    assert_equal(ChooseBestReporters(["2008 scc 9", "CanLII"]),"2008 SCC 9 (available on CanLII)")
    assert_equal(ChooseBestReporters(["Westlaw"]),"WL")
    assert_equal(ChooseBestReporters(["2004 Westlaw 19837"]),"2004 WL 19837")
    assert_equal(ChooseBestReporters(["2002 CACT 3", "CanLII"]), "2002 CACT 3 (available on CanLII)")

#CleanUpCourt calls FindJurisdiction and FindCourt, returns Jurisdiction + Court
def test_CleanUpCourt():           
    pass

def test_TakeOutJurisdiction():           
    pass 
    
#returns true if there is a recognized court in the string (must be , false if not
def test_CheckForCourt():
	 assert_equal(CheckForCourt("1666"), False)
	 assert_equal(CheckForCourt("fdsiafscc sccepwiury523498rpe9iorhq wekrjyep239 \n"), False)
	 assert_equal(CheckForCourt("2398 SCC 23"), True)
    
#returns the LOWEST date (b/w years 1400 and 2014) in the string, false if no date detected
def test_PullDate():           
    assert_equal(PullDate("1666"),"1666")
    assert_equal(PullDate("The year is not 1300, it is 2013"),"2013")
    assert_equal(PullDate(""), False)
    assert_equal(PullDate("3420098218883231"), False)
    assert_equal(PullDate("The year is 2013, and last year was 2012"), "2012")
    assert_equal(PullDate("(2008)"),"2008")
    assert_equal(PullDate("[2008]"),"2008")
    assert_equal(PullDate("What year is it?2013)"),"2013")
    assert_equal(PullDate("THEYEARISNOT2008)"),"2008")
    assert_equal(PullDate("06-15-1990"),"1990")
    

def test_CleanUp():           
    assert_equal(CleanUp("   ..  . . .. .  ..."),"")
    assert_equal(CleanUp("r.e.s.p.e.c.t. show me what  it means  2 be"),"respect show me what it means 2 be")
    assert_equal(CleanUp("your mom(charlotte) is really  cool ; but not as cool as the king : Charles"),"your mom (charlotte) is really cool; but not as cool as the king: Charles")

def test_GetCitations():           
    assert_equal(GetCitations(" 2008 SCC 9 (CanLII); [2008] 1 SCR 190, 229 NBR (2d) 1; 291 DLR (4th) 577; 64 CCEL (3d) 1; 69 Admin LR (4th) 1", "SCC"), ", 2008 SCC 9, [2008] 1 SCR 190.")


    