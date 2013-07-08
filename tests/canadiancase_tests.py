#Very important!!! Remember to start all definitions that you wish to test with 
# test_ so on so forth.
from nose.tools import *
from legal.server.CanadianCase import *

'''****************     STYLE OF CAUSE     ****************'''

#TESTED: GOOD
'''def test_NotAllowed():
    assert_equal(NotAllowed("test"),"test");
    assert_equal(NotAllowed("354+*78a+*wef"),"354+*78a+*wef");
    assert_equal(NotAllowed("\n\n\n\n\n\n\n\n\n"),"\n\n\n\n\n\n\n\n\n");
'''   

#TESTED: GOOD
'''def test_Contains():
    list = ["hi", "you", "sup", "pew pew"]
    assert_equal(Contains(list,"hi"),True)
    assert_equal(Contains(list,"hzii"),False)
    assert_equal(Contains(list,"hiiiiiiiiii"),True)
'''

#TESTED: GOOD    
'''def test_Capitalize():
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
'''    
    
#TESTED: GOOD
'''def test_StyleAttributes():   
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
'''



    
#TESTED: GOOD
'''def test_StatuteChallenge():        
    assert_equal(StatuteChallenge("The Act (bc)"),"The Act (British Columbia)")
    assert_equal(StatuteChallenge("The national petroleum act"),"The national petroleum act")
    assert_equal(StatuteChallenge("BC Forestry Act"),"British Columbia Forestry Act")
    assert_equal(StatuteChallenge("Farmer's Milling Code (ab)"),"Farmer's Milling Code (Alberta)")
    assert_equal(StatuteChallenge("Fisheries Act"),"Fisheries Act (Canada)")
    assert_equal(StatuteChallenge("Fish Act (NL)"),"Fish Act (Newfoundland and Labrador)")
    assert_equal(StatuteChallenge("reference re Fishing Stuff"),"Reference Re Fishing Stuff (Canada)")
    assert_equal(StatuteChallenge("ref re fish act"),"Reference Re fish act (Canada)")
    assert_equal(StatuteChallenge("Ex Parte Plimus Act (MB)"),"Ex parte Plimus Act (Manitoba)")
'''
   

#TESTED: GOOD
#this is the function you use for each individual action.
#GetStyleOfCause just really calls this function, so all the tests for it are applicable.
#Action also calls StatuteChallenge, StyleAttribues, Capitalize, and NotAllowed
'''def test_Action():           
    assert_equal(Action("The Act (bc)"),"The Act (British Columbia)")
    assert_equal(Action("The national petroleum act"),"The National Petroleum Act")
'''
    
#TESTED: GOOD
#this is the function you call to actually do everything. 
#really all it does is separate causes of action by ";" and then call #Action
'''def test_GetStyleOfCause():  
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
'''

'''****************     CITATIONS     ****************'''


#TESTED: GOOD
#only takes lists!
'''def test_ChooseBestReporters():           
    assert_equal(ChooseBestReporters(["canlii"]),"CanLII")
    assert_equal(ChooseBestReporters(["dfsdfsad"]),"dfsdfsad")
    assert_equal(ChooseBestReporters(["2008 scc 9", "CanLII"]),"2008 SCC 9 (available on CanLII)")
    assert_equal(ChooseBestReporters(["Westlaw"]),"WL")
    assert_equal(ChooseBestReporters(["2004 Westlaw 19837"]),"2004 WL 19837")
    assert_equal(ChooseBestReporters(["2002 CACT 3", "CanLII"]), "2002 CACT 3 (available on CanLII)")
'''

#NEEDS to look into whether the NC is actually being used (based on citation)
#TESTED: GOOD
#first detects whether there is a neutral citation present: if so, returns true
#Detects in the input the jurisdiction and the court and adds them together
#	calls FindJurisdiction and FindCourt, returns Jurisdiction + Court
#input is CleanedUp
#input will not be a neutral citation
#returns False if there is no jurisdiction at all
#returns list [Court, whether jurisdiction in the court name, in which case we do not run TakeOutJurisdiction******************* (True or False)]
def test_CleanUpCourt():           
    assert_equal(CleanUpCourt("new brunswick court of appeal")[0],"NB CA")
    assert_equal(CleanUpCourt("AB QB")[0],"Alta QB")
    assert_equal(CleanUpCourt("Court of Quebec Civil Division")[0],"CQ (Civ Div)")
    assert_equal(CleanUpCourt("federal court of appeal")[0],"FCA")
    assert_equal(CleanUpCourt("fed court trial div")[0],"FCTD")
    assert_equal(CleanUpCourt("brit col CA")[0],"BC CA")
    assert_equal(CleanUpCourt("scc")[0],"SCC")
    assert_equal(CleanUpCourt("supreme court of canada")[0],"SCC")
    
    


#TESTED: GOOD
#looks in a string to find a jurisdiction. RETURNS a list: 
#[Proper Abbreviation for jurisdiction, The search object that found it]
#or returns False if no jurisdiction detected
'''def test_FindCourt():           
	assert_equal(FindCourt("court of justice"),"Ct J")
	assert_equal(FindCourt("h ct just"),"H Ct J")
	assert_equal(FindCourt("appeal court"),"CA")
	assert_equal(FindCourt("ct provinciale"),"CP")
	assert_equal(FindCourt("cour superieure"),"CS")
	assert_equal(FindCourt("h ct"),"HC")
	assert_equal(FindCourt("provincial ct"),"Prov Ct")
	assert_equal(FindCourt("superior court"),"Sup Ct")
	assert_equal(FindCourt("TRAFFIC COURT"),"Traffic Ct")
	assert_equal(FindCourt("youth court"),"Youth Ct")
	assert_equal(FindCourt("coroners court"),"Cor Ct")
	assert_equal(FindCourt("ct can de l'impots"),"CCI")
	assert_equal(FindCourt("ct d'appel fed"),"CAF")
	assert_equal(FindCourt(u"cour de comt\xe9"),"Cc")
	assert_equal(FindCourt("ct de l'ontario, division gen"),u"Div g\xe9n Ont")
	assert_equal(FindCourt("ct des divorces et des causes matrimoniales"),"C div & causes mat")
	assert_equal(FindCourt(U"CT DES JUGES DE LA COMTE SI\xe9geant au criminel"),"C j Cc crim")
	assert_equal(FindCourt("COURT DES PETITES CREANCES"),u"C pet cr\xe9")
	assert_equal(FindCourt("C SUCC"),"C succ")
	assert_equal(FindCourt("C DIV"),"C div")
	assert_equal(FindCourt("ct du banc de la reine"),"BR")
	assert_equal(FindCourt("ct du banc de la reine division de la famille"),"BR (div fam)")
	assert_equal(FindCourt("ct du banc de la reine (division de la premiere instance)"),"BR (1re inst)")
	assert_equal(FindCourt("ct du Qc"),"CQ")
	assert_equal(FindCourt("cq jeun"),"CQ jeun")
	assert_equal(FindCourt("court du qc civile"),"CQ civ")
	assert_equal(FindCourt("cour du qc, chambre criminelle et penale"),u"CQ crim & p\xe9n")
	assert_equal(FindCourt("court fed premiere instance"),"CF (1re inst)")
	assert_equal(FindCourt("court mun"),"CM")
	assert_equal(FindCourt("court prov"),"CP")
	assert_equal(FindCourt("ct prov div civ"),"CP Div civ")
	assert_equal(FindCourt("ct prov (division criminelle)"),"CP Div crim")
	assert_equal(FindCourt("ct prov, div de la fam"),"CP Div fam")
	assert_equal(FindCourt("ct sup adm"),"CS adm")
	assert_equal(FindCourt("cs civ div"),"CS civ")
	assert_equal(FindCourt("cs crim & pen"),u"CS crim & p\xe9n")
	assert_equal(FindCourt("cs chambre de fam"),"CS fam")
	assert_equal(FindCourt("cs div de pet cre"),u"CS p\xe9t cr\xe9")
	assert_equal(FindCourt("court sup chambre de fail ins"),"CS fail & ins")
	assert_equal(FindCourt("ct supr div de la famille"),"C supr fam")
	assert_equal(FindCourt("c supr div d'appel"),"C supr A")
	assert_equal(FindCourt("court supreme div banc reine"),"C supr BR")
	assert_equal(FindCourt("ct supr du can"),"CSC")
	assert_equal(FindCourt("court martial appeal court"),"Ct Martial App Ct")
	assert_equal(FindCourt("court d'appel de la court martiale"),"CACM")
	assert_equal(FindCourt("court of appeal in equity"),"CA Eq")
	assert_equal(FindCourt("court of just gen div"),"Ct J (Gen Div)")
	assert_equal(FindCourt("court of justice, general division small claims court"),"Ct J (Gen Div Sm Cl Ct)")
	assert_equal(FindCourt("Ct of just, gen div family court"),"Ct J (Gen Div Fam Ct)")
	assert_equal(FindCourt("court of justice, provincial division"),"Ct J (Prov Div)")
	assert_equal(FindCourt("court of justice, provincial div youth ct"),"Ct J (Prov Div Youth Ct)")
	assert_equal(FindCourt("court of qc"),"CQ")
	assert_equal(FindCourt("court of qc, civil div"),"CQ (Civ Div)")
	assert_equal(FindCourt("cq civ div small claims"),"CQ (Civ Div Sm Cl)")
	assert_equal(FindCourt("cq criminal and pen division"),"CQ (Crim & Pen Div)")
	assert_equal(FindCourt("cq youth division"),"CQ (Youth Div)")
	assert_equal(FindCourt("queens bench"),"QB")
	assert_equal(FindCourt("queens bench family division"),"QB (Fam Div)")
	assert_equal(FindCourt("qbtd"),"QB (TD)")
	assert_equal(FindCourt("divisional court"),"Div Ct")
	assert_equal(FindCourt("divorces and mat causes"),"Div & Mat Causes Ct")
	assert_equal(FindCourt("fed ct of appeal"),"FCA")
	assert_equal(FindCourt("fed ct td"),"FCTD")
	assert_equal(FindCourt("municipal court"),"Mun Ct")
	assert_equal(FindCourt("probation court"),"Prob Ct")
	assert_equal(FindCourt("prov court civil division"),"Prov Ct (Civ Div)")
	assert_equal(FindCourt("provincial court civ div, small cl"),"Prov Ct (Civ Div Sm Cl Ct)")
	assert_equal(FindCourt("provincial court criminal division"),"Prov Ct (Crim Div)")
	assert_equal(FindCourt("provincial court family court"),"Prov Ct (Fam Ct)")
	assert_equal(FindCourt("prov ct family division"),"Prov Ct (Fam Div)")
	assert_equal(FindCourt("provincial court juvenile div"),"Prov Ct (Juv Div)")
	assert_equal(FindCourt("prov cour (small claims div)"),"Prov Ct (Sm Cl Div)")
	assert_equal(FindCourt("prov court (youth)"),"Prov Ct (Youth Ct)")
	assert_equal(FindCourt("prov court youth div"),"Prov Ct (Youth Div)")
	assert_equal(FindCourt("provincial offences court"),"Prov Off Ct")
	assert_equal(FindCourt("small claims court"),"Sm Cl Ct")
	assert_equal(FindCourt("superior court of canada"),"Sup Ct")
	assert_equal(FindCourt("sup ct, admin div"),"Sup Ct (Adm Div)")
	assert_equal(FindCourt("sup ct bank & ins"),"Sup Ct (Bank & Ins Div)")
	assert_equal(FindCourt("sup ct civil division"),"Sup Ct (Civ Div)")
	assert_equal(FindCourt("superior court criminal and penal division"),"Sup Ct (Crim & Pen Div)")
	assert_equal(FindCourt("sup ct family div"),"Sup Ct (Fam Div)")
	assert_equal(FindCourt("superior cour small claims div"),"Sup Ct (Sm Cl Div)")
	assert_equal(FindCourt("sC appeal division"),"SC (AD)")
	assert_equal(FindCourt("sc fam div"),"SC (Fam Div)")
	assert_equal(FindCourt("sc queen's bench"),"SC (QB Div)")
	assert_equal(FindCourt("sc trial division"),"SC (TD)")
	assert_equal(FindCourt("tax court"),"TCC")
	assert_equal(FindCourt("tax review board"),"T Rev B")
	assert_equal(FindCourt("territorial court"),"Terr Ct")
	assert_equal(FindCourt("terr court (youth)"),"Terr Ct Youth Ct")'''
    
    

#TESTED: GOOD
# looks in a string to find a jurisdiction. RETURNS a list: 
# [Proper Abbreviation for jurisdiction, The search object that found it]
# object will be returned in the order of search:
# [Canada, LowerCanada, ProvCan, UpperCan, Alberta, BC, Manitoba, NewBrunswick, NewfoundlandLab, Newfoundland, NorthwestTerritories, NovaScotia, Nunavut, Ontario, PrinceEdwardIsland, Quebec, Saskatchewan, Yukon]
# or returns False if no jurisdiction detected
'''def test_TakeOutJurisdiction():           
    assert_equal(FindJurisdiction("the lower court of canada")[0],"C")
    assert_equal(FindJurisdiction("prov cant"),False)
    assert_equal(FindJurisdiction("newfoundland and labrador")[0],"NL")
    assert_equal(FindJurisdiction("the province of canada")[0],"Prov C")
    assert_equal(FindJurisdiction("Canada")[0],"C")
    assert_equal(FindJurisdiction("federal court of canada")[0],"C")
    assert_equal(FindJurisdiction("NBCA"),False)
    assert_equal(FindJurisdiction("northwest terr")[0],"NWT")
    assert_equal(FindJurisdiction("i sat on a bench")[0],"Ont")
    assert_equal(FindJurisdiction("suck	fauewh2309fdsa\\\]}}{weqwop i73w"),False)
    #assert_equal(FindJurisdiction("")[0],"")'''
    

#TESTED: GOOD
#returns true if there is a recognized court in the string (must be , false if not
'''def test_CheckForCourt():
	 assert_equal(CheckForCourt("1666"), False)
	 assert_equal(CheckForCourt("fdsiafscc sccepwiury523498rpe9iorhq wekrjyep239 \n"), False)
	 assert_equal(CheckForCourt("2398 SCC 23"), True)'''

#TESTED: FIX LAST    
#returns the date that is in brackets, square brackets, or preceeds a space and four caps letters,
#otherwise returns LOWEST date (b/w years 1400 and 2014) in the string, false if no date detected
'''def test_PullDate():           
    assert_equal(PullDate("1666"),"1666")
    assert_equal(PullDate("The year is not 1300, it is 2013"),"2013")
    assert_equal(PullDate(""), False)
    assert_equal(PullDate("3420098218883231"), False)
    assert_equal(PullDate("The year is 2013, and last year was 2012"), "2012")
    assert_equal(PullDate("The year is not 2004, it's 2013"), "2004")
    assert_equal(PullDate("(2008)"),"2008")
    assert_equal(PullDate("[2008]"),"2008")
    assert_equal(PullDate("What year is it?2013)"),"2013")
    assert_equal(PullDate("THEYEARISNOT2008)"),"2008")
    assert_equal(PullDate("06-15-1990"),"1990")
    assert_equal(PullDate("2008 NBCA"),"2008")
    assert_equal(PullDate("(2008), DLR 4th) 1996"),"2008")
    assert_equal(PullDate("[2008] 4 NBCA"),"2008")
    assert_equal(PullDate("2008 2007"),"2007")
    #assert_equal(PullDate("2008 NBCA"),"2008")
    #assert_equal(PullDate("2008 NBCA"),"2008")
    #assert_equal(PullDate("2008 NBCA"),"2008")'''
    
    
#TESTED: GOOD
'''def test_CleanUp():           
    assert_equal(CleanUp("   ..  . . .. .  ..."),"")
    assert_equal(CleanUp("r.e.s.p.e.c.t. show me what  it means  2 be"),"respect show me what it means 2 be")
    assert_equal(CleanUp("your mom(charlotte) is really  cool ; but not as cool as the king : Charles"),"your mom (charlotte) is really cool; but not as cool as the king: Charles")'''


'''def test_GetCitations():           
    assert_equal(GetCitations(" 2008 SCC 9 (CanLII); [2008] 1 SCR 190, 229 NBR (2d) 1; 291 DLR (4th) 577; 64 CCEL (3d) 1; 69 Admin LR (4th) 1", "SCC"), ", 2008 SCC 9, [2008] 1 SCR 190.")
'''

    