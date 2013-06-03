import re
import sys

#*********************** STYLE OF CAUSE ***********************#

#Define the class "Party", create an object for storing the parties 
class Party:
	def _init_(self, Name, Number):
		self.Name = Name
		self.Number = Number
		Parties.append(self)

def NotAllowed(string):
	NotAllowed = ["the ", "la ", "le ", "les "]
	for x in NotAllowed:
		if ((x + " queen") or ("the queen in right of") or ("the crown")) in string.lower(): return string
		else: 
			string = re.sub(x, "", string, re.I)
			return string

def Contains(list, string):
    for x in list:
        if x in string: return True
    return False

#Capitalizes first word after a space or a bracket. Decapitalizg the rest, and entire correct words. Capitalizes non-words
def Capitalize(string):
	KeepAsIs = []
	MatchMc = re.search(r"[A-Z]{1}[a-z]*'?[A-Z]{1}[a-z]+", string)
	if MatchMc: KeepAsIs.append(MatchMc.group())
	MatchCaps = re.search(r'[a-z0-9]+.*\(?([A-Z]{1}[A-Z]+)|([A-Z]{1}[A-Z]+)\)?\s?.*[a-z0-9]+', string)
	if MatchCaps: 
		if MatchCaps.group(1): KeepAsIs.append(MatchCaps.group(1))
		else: KeepAsIs.append(MatchCaps.group(2))
	m = ' '.join([s[0].upper() + s[1:].lower() for s in string.split(' ')])
	n = '\''.join([s[0].upper() + s[1:] for s in m.split('\'')])
	string = '('.join([s[0].upper() + s[1:] for s in n.split('(')])
	Decaps = ["in rem", " and", "ex rel", " of", " de"];
	Lstring = string.lower();
	for x in Decaps:
		if x in Lstring: string = re.sub(x, x, string, 0, re.I)
	for j in KeepAsIs:
		string = re.sub(j, j, string, 0, re.I)
	return string

#guardian, tutor, company, municipality, province, country, will, estate, bankruptcy, receivership, crim, Civil crown (AG or MNR), Municipal Boards
def StyleAttributes(Parties, j):
	#GUARDIAN AD LITEM
	if ("guardian" and " ad litem") in Parties[j].Name.lower(): 
		Parties[j].Name = re.sub(r'\(?(g|G)uardian\s(a|A)d\s(l|L)item\s?(of)?\)?', '(Guardian ad litem of)', Parties[j].Name)
	#LITIGATION GUARDIAN
	if ("litigation guardian") in Parties[j].Name.lower(): 
		Parties[j].Name = re.sub(r'\(?(l|L)itigation\s(g|G)uardian\s?(of)?\)?', '(Litigation guardian of)', Parties[j].Name)
	#LLP or LP (for other caps requirements, put into Caps list)
	Caps = [" llp"," lp"];
	for x in Caps:
		if x in Parties[j].Name.lower():
			Parties[j].Name = re.sub(Parties[j].Name[Parties[j].Name.lower().find(x):Parties[j].Name.lower().find(x)+len(x)], x.upper(), Parties[j].Name)
	if " corporation" in Parties[j].Name.lower(): Parties[j].Name = re.sub(r'(c|C)orporation', 'Corp', Parties[j].Name)
	#TRUSTEE
	if "trustee" in Parties[j].Name.lower(): 
		Parties[j].Name = re.sub(r'\(?(t|T)rustee\s?(of)?\)?', '(Trustee of)', Parties[j].Name)
	#RECEIVERSHIPS
	if ("receivership" or "receiver") in Parties[j].Name.lower(): 
		Parties[j].Name = re.sub(r'\((r|R)eceiver(ship)?\s?(of)?\)', '(Receiver of)', Parties[j].Name)
	#LIQUIDATOR
	if "liquidator" in Parties[j].Name.lower(): 
		Parties[j].Name = re.sub(r'\((l|L)iquidat(e|or)\s?(of)?\)', '(Liquidator of)', Parties[j].Name)
	#Countries
	#CITIES
	Provinces = [["British Columbia", ["BC", "Brit Col", "Brit Colum"], "British Columbian"], ["Alberta", ["AB", "Alta"], "Albertan"], ["Saskatchewan", ["SK", "Sask"], "Saskatchewanian"], ["Manitoba", ["MB", "Man"], "Manitoban"], ["Ontario", ["ON", "Ont"], "Ontarian"], ["Quebec", ["QB", "Que","Qc"], "Quebecois"], ["New Brunswick", ["NB", "New Bruns", "N Bruns"], "New Brunskicker"], ["Nova Scotia", ["NS", "Nova Scot"], "Nova Scotian"], ["Prince Edward Island", ["PEI", "Prince Ed", "Prince Ed Isl"], "Prince Edward Islander"], ["Newfoundland and Labrador", ["NL", "NFLD", "Newfoundland"], "Newfoundlander"]]
	for x in Provinces:
		for i in x[1]:
			if (" " + i + " ").lower() in Parties[j].Name.lower(): Parties[j].Name = Parties[j].Name.replace(" " + i + " ", " " + x[0] + " ")
	#CROWN CIVIL
	if "(attorney general)" in Parties[j].Name.lower(): Parties[j].Name = re.sub(r'(a|A)ttorney (g|G)eneral', 'AG', Parties[j].Name)
	if "(minister of rational revenue)" in Parties[j].Name.lower(): Parties[j].Name = re.sub(r'(m|M)inister (o|O)f (n|N)ational (r|R)evenue', 'MNR', Parties[j].Name)
	#print "At end of StyleAttributes, party name is ", Parties[j].Name
	return Parties[j].Name

#Put in the references and the Jurisdiction if not already there
def StatuteChallenge(string):
	string = NotAllowed(string)
	Shorten = ["In Re " or " In the Matter of " or "Dans L'Affaire de "]
	for x in Shorten:
		if x in string: string = string.replace(x, "Re ")
	if "Ex Parte" in string: string = string.replace("Ex Parte", "Ex parte")
	Provinces = [["British Columbia", ["BC", "Brit Col", "Brit Colum"], "British Columbian"], ["Alberta", ["AB", "Alta"], "Albertan"], ["Saskatchewan", ["SK", "Sask"], "Saskatchewanian"], ["Manitoba", ["MB", "Man"], "Manitoban"], ["Ontario", ["ON", "Ont"], "Ontarian"], ["Quebec", ["QB", "Que","Qc"], "Quebecois"], ["New Brunswick", ["NB", "New Bruns", "N Bruns"], "New Brunskicker"], ["Nova Scotia", ["NS", "Nova Scot"], "Nova Scotian"], ["Prince Edward Island", ["PEI", "Prince Ed", "Prince Ed Isl"], "Prince Edward Islander"], ["Newfoundland and Labrador", ["NL", "NFLD", "Newfoundland"], "Newfoundlander"]]
	Canada = ["Canada", ["CA", "Can", "CAN"], "Canadian"]
	if "ref " in string.lower(): string = re.sub(r'(r|R)ef', "Reference", string)
	if ("Canada " or "Canadian ") in string: 
		return string
	for x in Provinces:
		for j in x[1]:
			if (" " + j + " ") in string: string = string.replace(" " + j + " ", " " + x[0] + " ")
		if (x[0] or x[2]) in string: return string
	for j in Canada[1]:
		if (" " + j + " ") in string: string = string.replace(" " + j + " ", " " + Canada[0] + " ")
		if (x[0] or x[2]) in string: return string
	string = string + " (Canada)"
	return string
			
def GetStyleOfCause():
	StyleOfCause_Input = raw_input("Enter Style of Cause: \n") #Input test Style of Cause
	OUTPUT = "" #This will eventually be the output
	StyleOfCause_NoPeriods = re.sub('\.+','', StyleOfCause_Input) #Remove all periods
	StyleOfCause_Stripped = StyleOfCause_NoPeriods.strip() #Remove leading or trailing white spaces
	StyleOfCause_NoWhites = re.sub(' +',' ', StyleOfCause_Stripped) #Remove excess white spaces
	StyleOfCause = StyleOfCause_NoWhites #Set the style of cause we will work with
	Parties = [] #This will be an array of each of the parties in the Style of Cause
	m = re.split(r'\b(?:\s*)[vV](?:\s*)\b', StyleOfCause) #Separate the parties (separated by ' v ') into a list
	if len(m)==1: #This covers everything if there are not two or more parties
		if (" reference " or " ref " or " re " or "in re " or "in the matter of " or " dans l'affaire de ") and (" code " or " act ") in StyleOfCause.lower():
			m[0] = Capitalize(m[0])
			OUTPUT = StatuteChallenge(m[0])
		elif " estate " and not " re " in StyleOfCause.lower():
			m[0] = NotAllowed(m[0])
			m[0] = "Re " + m[0]
			OUTPUT = Capitalize(m[0])
		else:
			OUTPUT = Capitalize(m[0])
	else: #Does this if there are two or more parties
		for j in range(len(m)):
			Parties.append(Party())
			Parties[j].Name = NotAllowed(m[j])
			Parties[j].Name = Capitalize(m[j])
			Parties[j].Name = StyleAttributes(Parties, j)
			OUTPUT = OUTPUT + Parties[j].Name + " v "
		OUTPUT = re.sub('\sv\s$', '', OUTPUT)
	print "OUTPUT: ", OUTPUT		
	return OUTPUT
#Needs: countries, municipalities, Estates, statutes, Crown Civil, Municipal Boards

#*********************** CITATIONS ***********************#


def NeutralCourts():
	Provinces = [["British Columbia", ["BC", "Brit Col", "Brit Colum"], "British Columbian"], ["Alberta", ["AB", "Alta"], "Albertan"], ["Saskatchewan", ["SK", "Sask"], "Saskatchewanian"], ["Manitoba", ["MB", "Man"], "Manitoban"], ["Ontario", ["ON", "Ont"], "Ontarian"], ["Quebec", ["QB", "Que","Qc"], "Quebecois"], ["New Brunswick", ["NB", "New Bruns", "N Bruns"], "New Brunskicker"], ["Nova Scotia", ["NS", "Nova Scot"], "Nova Scotian"], ["Prince Edward Island", ["PEI", "Prince Ed", "Prince Ed Isl"], "Prince Edward Islander"], ["Newfoundland and Labrador", ["NL", "NFLD", "Newfoundland"], "Newfoundlander"]]
	Canada = [["SCC", 2000, ["Supreme Court of Canada"]], ["FC", 2001, ["Federal Court"]], ["FCA", 2001, ["Federal Court of Appeal", "Federal Appeal Court", "CA"]], ["TCC", 2003, ["Tax Court of Canada", "Federal Tax Court", "Canada Tax Court", "Canadian Tax Court"]], ["CMAC", 2001, ["Court Martial Appeal Court of Canada"]], ["Comp Trib", 2001, ["Competition Tribunal of Canada", "Canada Competition Tribunal", "Canadian Competition Tribunal"]], ["CHRT", 2003, ["Canadian Human Rights Tribunal", "Canada Human Rights Tribunal"]], ["PSSRB", 2000, ["Public Service Labour Relations Board"]]]
	Alberta = [["ABCA", 1998, ["Appeal Court", "Court of Appeal", "CA"]], ["ABQB", 1998, ["Court of Queen's Bench", "Queen's Bench", "QB"]], ["ABPC", 1998, ["Provincial Court", "Prov Court", "PC"]], ["ABASC", 2004, ["Securities Commission", "Sec Com", "Sec Comm"]]]
	BritishColumbia = [["BCCA", "1999", ["Appeal Court", "Court of Appeal", "CA"]], ["BCSC", 2000, ["Supreme Court", "SC"]], ["BCPC", 1999, ["Provincial Court"]], ["BCHRT", 2000, ["HRT", "Human Rights Tribunal"]], ["BCSECCOM", 2000, ["Securities Commission", "Sec Com", "Sec Comm"]]]
	Manitoba = [["MBCA", 2000, ["Appeal Court", "Court of Appeal", "CA"]], ["MBQB", 2000, ["Court of Queen's Bench", "Queen's Bench", "QB"]], ["MBPC", 2007, ["Provincial Court", "Prov Court", "PC"]]]
	NewBrunswick = [["NBCA", 2001, ["Appeal Court", "Court of Appeal", "CA"]], ["NBQB", 2002, ["Court of Queen's Bench", "Queen's Bench", "QB"]], ["NBPC", 2002, ["Provincial Court", "Prov Court", "PC"]]]
	Newfoundland = [["NFCA", 2001, ["Appeal Court", "Court of Appeal", "CA", "Supreme Court of Newfoundland and Labrador, Court of Appeal", "SCCA"]], ["NLSCTD", 2003, ["Supreme Court Trial Division", "Trial Court", "Trial Division", "Supreme Court of Newfoundland and Labrador, Trial Division", "SCTD"]]]
	NorthwestTerritories = [["NWTCA", 1999, ["Appeal Court", "Court of Appeal", "CA"]], ["NWTSC", 1999, ["Supreme Court", "SC"]], ["NWTTC", 1999, ["Territorial Court", "TC"]]]
	NovaScotia = [["NSCA", 1999, ["Appeal Court", "Court of Appeal", "CA"]], ["NSSC", 2000, ["Supreme Court", "SC"]], ["NSSF", 2001, ["Family Court", "Supreme Court, Family Division", "Family Division"]], ["NSPC", 2001, ["Provincial Court", "Prov Court", "PC"]]]	
	Nunavut = [["NUCJ", 2001, ["Court of Justice", "CJ"]], ["NUCA", 2006, ["Appeal Court", "Court of Appeal", "CA"]]]
	Ontario = [["ONCA", 2007, ["Appeal Court", "Court of Appeal", "CA"]], ["ONSC", 2010, ["Superior Court", "SC"]], ["ONCJ", 2004, ["Court of Justice", "CJ"]], ["ONWSIAT", 2000, ["Workplace Safety and Insurance Appeals Tribunal"]], ["ONLSAP", 2004, ["Law Society Appeal Panel"]], ["ONLSHP", 2004, ["Law Society Hearing Panel"]]]
	PrinceEdwardIsland = [["PESCAD", 2000, ["Supreme Court, Appeal Division", "Appeal Court", "Court of Appeal", "CA", "SCAD"]], ["PESCTD", 2000, ["Supreme Court, Trial Division", "SCTD", "Trial Court", "Trial Division"]]]
	Quebec = [["QCCA", 2005, ["Appeal Court", "Court of Appeal", "CA"]], ["QCCS", 2006, "Superior Court", "SC"], ["QCCP", 2006, "Court of Quebec"], ["QCTP", 1999, "Tribunal des professions"], ["CMCQ", 2000, ["Conseil de la magitrature"]], ["QCCRT", 2002, ["Commission des relations du travail"]]]
	Saskatchewan = [["SKCA", 2000, ["Appeal Court", "Court of Appeal", "CA"]], ["SKQB", 1999, ["Court of Queen's Bench", "Queen's Bench", "QB"]], ["SKPC", 2002, ["Provincial Court", "Prov Court", "PC"]], ["SKAIA", 2003, ["Automobile Injury Appeal Commission"]]]
	Yukon = [["YKCA", 2000, ["Appeal Court", "Court of Appeal", "CA"]], ["YKSC", 2000, ["Supreme Court", "SC", "Supreme Court of the Yukon Territory"]], ["YKTC", 1999, ["Territorial Court", "TC"]], ["YKSM", 2004, ["Small Claims Court", "SM", "Small Claims"]], ["YKYC", 2001, ["Youth Court", "YC"]]]

	

def ChooseBestReporters(InputList): # choose the best reporter out of all of the ones in the list
	List = []
	MaxPlace = 10
	Present = 2013
	for x in InputList:
		List.append([x, MaxPlace])
	NC = [['SCC', 2000, Present], ['FC', 2001, Present], ['FCA', 2001, Present], ['TCC', 2003, Present], ['CMAC', 2001, Present], ['Comp Trib', 2001, Present], ['CHRT', 2003, Present], ['PSSRB', 2000, Present], ['ABCA', 1998, Present], ['ABQB', 1998, Present], ['ABPC', 1998, Present], ['ABASC', 2004, Present], ['BCCA', '1999', Present], ['BCSC', 2000, Present], ['BCPC', 1999, Present], ['BCHRT', 2000, Present], ['BCSECCOM', 2000, Present], ['MBCA', 2000, Present], ['MBQB', 2000, Present], ['MBPC', 2007, Present], ['NBCA', 2001, Present], ['NBQB', 2002, Present], ['NBPC', 2002, Present], ['NWTCA', 1999, Present], ['NWTSC', 1999, Present], ['NWTTC', 1999, Present], ['NSCA', 1999, Present], ['NSSC', 2000, Present], ['NSSF', 2001, Present], ['NSPC', 2001, Present], ['NUCJ', 2001, Present], ['NUCA', 2006, Present], ['ONCA', 2007, Present], ['ONSC', 2010, Present], ['ONCJ', 2004, Present], ['ONWSIAT', 2000, Present], ['ONLSAP', 2004, Present], ['ONLSHP', 2004, Present], ['PESCAD', 2000, Present], ['PESCTD', 2000, Present], ['QCCA', 2005, Present], ['QCCS', 2006, Present], ['QCCP', 2006, Present], ['QCTP', 1999, Present], ['CMCQ', 2000, Present], ['QCCRT', 2002, Present], ['SKCA', 2000, Present], ['SKQB', 1999, Present], ['SKPC', 2002, Present], ['SKAIA', 2003, Present], ['YKCA', 2000, Present], ['YKSC', 2000, Present], ['YKTC', 1999, Present], ['YKSM', 2004, Present], ['YKYC', 2001, Present]]
	Official = [["Ex CR", 1875, 1970], ["FCR", 1971, Present], ["SCR", 1876, Present]]
	Semi = [["AR", 1976, Present], ["Alta AR", 1908, 1932], ["BCR", 1867, 1947], ["BR", 1892, 1969], ["CA", 1970, 1985], ["CBES", 1975, 1985], ["CP", 1975, 1987], ["CS", 1967, Present], ["CSP", 1975, Present], ["Man R", 1883, 1961], ["NBR", 1969, Present], ["Nfld & PEIR", 1971, Present], ["NSR", 1965, 1969], ["NSR (2d)", 1969, Present], ["NWTR", 1983, 1998], ["OLR", 1900, 1931], ["OR", 1931, 1973], ["OR (2d)", 1973, Present], ["OWN", 1909, 1962], ["RJQ", 1975, Present], ["Sask LR", 1907, 1931], ["Terr LR", 1885, 1907], ["TJ", 1975, Present], ["YR", 1986, 1989]]
	Preferred = [["DLR", 1912, 1955], ["DLR (2d)", 1956, 1968], ["DLR (3d)", 1969, 1984], ["DLR (4th)", 1984, Present], ["WWR", 1911, 1950], ["WWR", 1971, Present], ["WWR (NS)", 1951, 1970], ["ACWS", 1970, 1979], ["ACWS (2d)", 1980, 1986], ["ACWS (3d)", 1986, Present]]
	Other = [['A', 1855, 1983], ['A (2d)', 1938, 2013], ['A & N', 1831, 1833], ['A Crim R', 1980, 2013], ['Act', 1809, 1811], ["A Int'l LC", 1793, 2013]]
	Electronic = [["CanLII", "CanLII"], ["QL", "Quicklaw"], ["WL Can", "Westlaw Canada"], ["Azimut","Azimut"], ["LEXIS", "Lexis"], ["WL", "Westlaw"]]
	First = False
	Second = False
	Elec = False
	# x[0] = Name, x[1] = Priority
	for x in List: #assign priorities to each citation given
		for j in NC: #search Neutral Citations first
			if (" " + j[0].lower() + " ") in x[0].lower():
				x[1] = 1
				x[0] = re.sub(j[0].lower(), j[0], x[0])
				break
		if x[1] < MaxPlace: continue
		for j in Official:#search Official Citations second
			if (" " + j[0].lower() + " ") in x[0].lower():
				x[1] = 2
				x[0] = re.sub(j[0].lower(), j[0], x[0])
				break
		if x[1] < MaxPlace: continue
		for j in Semi: #search Semi-Official Citations third
			if (" " + j[0].lower() + " ") in x[0].lower():
				x[1] = 3
				x[0] = re.sub(j[0].lower(), j[0], x[0])
				break
		if x[1] < MaxPlace: continue
		for j in Preferred: #search Preferred Citations fourth
			if (" " + j[0].lower() + " ") in x[0].lower():
				x[1] = 4
				x[0] = re.sub(j[0].lower(), j[0], x[0])
				break
		if x[1] < MaxPlace: continue
		for j in Other: #search Other Citations fifth
			if (" " + j[0].lower() + " ") in x[0].lower():
				x[1] = 5
				x[0] = re.sub(j[0].lower(), j[0], x[0])
				break
		if x[1] < MaxPlace: continue
		for j in Electronic: #search Electionic Citations last
			if (j[0].lower() or j[1].lower()) in x[0].lower():
				x[1] = 6
				x[0] = re.sub(j[0].lower(), j[0], x[0])
				Elec = True
				break
	Sorted = sorted(List, key=lambda tup: tup[1])
	if len(InputList)==1: 
		return Sorted[0][0]
	First = Sorted[0][0]
	Second = Sorted[1][0]
	if Elec and Second:
		Second = " (available on " + Second +")"
	else: First = First + ', '
	return First + Second
			

def CheckForCourt(String): #pull the neutral citation from the list if there is one
	Courts = ['SCC', ' FC ', 'FCA', 'TCC', 'CMAC', 'Comp Trib', 'CHRT', 'PSSRB', 'ABCA', 'ABQB', 'ABPC', 'ABASC', 'BCCA', 'BCSC', 'BCPC', 'BCHRT', 'BCSECCOM', 'MBCA', 'MBQB', 'MBPC', 'NBCA', 'NBQB', 'NBPC', 'NFCA', 'NLSCTD', 'NWTCA', 'NWTSC', 'NWTTC', 'NSCA', 'NSSC', 'NSSF', 'NSPC', 'NUCJ', 'NUCA', 'ONCA', 'ONSC', 'ONCJ', 'ONWSIAT', 'ONLSAP', 'ONLSHP', 'PESCAD', 'PESCTD', 'QCCA', 'QCCS', 'QCCP', 'QCTP', 'CMCQ', 'QCCRT', 'SKCA', 'SKQB', 'SKPC', 'SKAIA', 'YKCA', 'YKSC', 'YKTC', 'YKSM', 'YKYC']
	Reporters = ['SCR']
	for x in Courts:
		if x.lower() in String.lower(): return True
	for x in Reporters:
		if x.lower() in String.lower(): return True
	return False


def CleanUpCourt(Input):
	Jurisdiction = FindJurisdiction(Input)
	if not Jurisdiction: return False
	Court = FindCourt(Input)
	return Jurisdiction + Court

def FindCourt(String):
	Court = "Court"
	return Court
	
def FindJurisdiction(String):	
	Canada = [["C"], ["can", "canada", "fed", "federal", "canadian"]]
	LowerCanada = [["LC"], ["lc", "lower can", "lower ca", "lower canada", "lower c"]]
	ProvCan = [["Prov C"], ["prov c", "prov can", "province of canada", "prov of c", "prov of can"]]
	UpperCan = [["UC"], ["uc", "upper c", "upper can", "up can", "up c"]]
	Alberta = [["Alta"], ["ab", "alberta", "alta", "albertan"]]
	BC = [["BC"], ["bc", "british columbia", "brit col", "british columbian"]]
	Manitoba = [["Man"], ["man", "mb", "manitoba", "manitoban"]]
	NewBrunswick = [["NB"], ["nb", "new brunswick","new brunswicker"]]
	Newfoundland = [["Nfld"], ["nf", "nfld", "newfoundland", "newfoundlander"]]
	NewfoundlandLab = [["NL"], ["nl", "labrador"]]
	NorthwestTerritories = [["NWT"], ["nwt", "north west territories", "nortwest territories"]]
	NovaScotia = [["NS"], ["ns", "nova scotia", "nova scotian"]]
	Nunavut = [["Nu"], ["nu", "nun", "nunavut", "nvt"]]
	Ontario = [["Ont"], ["on", "ont", "ontario", "ontarian"]]
	PrinceEdwardIsland = [["PEI"], ["pei", "prince edward island"]]
	Quebec = [["Qc"], ["qc", "qb", "quebec"]]
	Saskatchewan = [["Sask"], ["sk", "saskatchewan", "sask"]]
	Yukon = [["Yu"], ["yu", "yukon", "yk"]]
	All = [Canada, LowerCanada, ProvCan, UpperCan, Alberta, BC, Manitoba, NewBrunswick, Newfoundland, NewfoundlandLab, NorthwestTerritories, NovaScotia, Nunavut, Ontario, PrinceEdwardIsland, Quebec, Saskatchewan, Yukon]
	for jur in All:
		for ab in jur[1]:
			if ab.lower() in String.lower():
				return jur[0][0]
	return False	

def TakeOutJurisdiction(Ct, Cite):
	print "In 'TakeOutJurisdiction(Ct, Cite):' the Ct = ", Ct, ", and Cite = ", Cite
	if " FCR" in Cite: Ct = re.sub("F", "", Ct)
	if " Alta" in Cite: Ct = re.sub("Alta", "", Ct)
	if (" BC" in Cite) and (" BCD" not in Cite): Ct = re.sub("BC", "", Ct)
	if (" Man" in Cite) and (" Man & G" not in Cite): Ct = re.sub("BC", "", Ct)
	if " NB" in Cite: Ct = re.sub("NB", "", Ct)
	if " Nfld LR" in Cite: Ct = re.sub("Nfld", "", Ct)
	if (" NS" in Cite) and (" NSW" not in Cite): Ct = re.sub("NS", "", Ct)
	if " NWT" in Cite: Ct = re.sub("NWT", "", Ct)
	if (" OAC" or " OAR" or " OELD" or " OFLR" or " OHRC" or " OIC" or " OLR" or " OMB" or " Ont" or " OPR" or " OR " or " OSC" or "OW") in Cite: Ct = re.sub("Ont", "", Ct)
	if " PEI" in Cite: Ct = re.sub("PEI", "", Ct)
	if " Sask" in Cite: Ct = re.sub("Sask", "", Ct)
	if " YR" in Cite: Ct = re.sub("Yu", "", Ct)
	Ct = Ct.strip() #strip trailing white spaces
	Ct = re.sub(' +',' ', Ct) #Remove excess white spaces
	return Ct
					
def PullDate(string):
	Match = re.search(r'(1[4-9,0][0-9]{2}|20[01]{1}[0-9]{1})', string)
	if Match: return Match.group()
	else: return False
		
def CleanUp(string):
	NoPeriods = re.sub('\.+','', string) #Remove all periods
	Stripped = NoPeriods.strip() #Remove leading or trailing white spaces
	NoWhites = re.sub(' +',' ', Stripped) #Remove excess white spaces
	return NoWhites
	
def GetCitations():
	OUTPUT = "" #this will eventually be the output
	Citation_Input = raw_input("Enter citations separated by commas: \n") #Input test Style of Cause
	PC = CleanUp(Citation_Input)
	m = PC.split(',') # Separate the citations (separated by ',') into a list
	for x in range(len(m)): m[x] = m[x].strip() #remove excess white spaces on either side
	TwoBest = ChooseBestReporters(m) #these are the citations we will use
	print "The basic citation is: ", TwoBest
	Court = False #first assume there is no court evident in the input
	Jurisdiction = False # assume there is no jurisdiction evident in the input
	NeutralCite = False #first assume there is no neutral reporter evident in the input
	JudgementDate = False #assume there is no date evident in the input
	CitationDate = False #assume there is no citation date evident in the input
	Pinpont = False #assume there is no pinpoint for now
	# Determine if there is a Citator Date or a Court evident in the Parallel citation
	if PullDate(TwoBest): CitationDate = PullDate(TwoBest)
	if CheckForCourt(TwoBest): Court = True
	print "Court = ", Court
	print "Citation Date = ", CitationDate
	if not Court and not CitationDate:
		print "NOT COURT AND NOT CITATIONDATE DETECTED"
		Court_input = raw_input("Enter Court with Canadian Jurisdiction: \n")
		Ct = CleanUp(Court_input)
		Ct = CleanUpCourt(Ct) 
		Ct = TakeOutJurisdiction(Ct, TwoBest)
		Date_input = raw_input("Enter Date: \n")
		JudgementDate = CleanUp(Date_input)
		OUTPUT = ' ('+ JudgementDate + '), ' + TwoBest +' (' + Ct + ').'#combine all of this in the right way
	if CitationDate and not Court: 
		print "CITATIONDATE AND NOT COURT DETECTED"
		Court_input = raw_input("Enter Court with Canadian Jurisdiction: \n")
		Ct = CleanUp(Court_input)
		Ct = CleanUpCourt(Ct) 
		Ct = TakeOutJurisdiction(Ct, TwoBest)
		Date_input = raw_input("Enter Date: \n")
		JudgementDate = CleanUp(Date_input)
		if (JudgementDate==CitationDate): 
			OUTPUT = ', ' + TwoBest + '(' + Ct + ').'
		else:
			OUTPUT = ' ('+ JudgementDate + '), ' + TwoBest + ' (' + Ct+ ').'
	if CitationDate and Court:
		print "CITATIONDATE AND COURT DETECTED"
		OUTPUT = ", " + TwoBest + '.'
	return OUTPUT
	
def main():
	SoC = GetStyleOfCause()
	Citation = GetCitations()
	print "The final output is: ", SoC + Citation
	
	
main()
