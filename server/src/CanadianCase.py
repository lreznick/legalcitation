import re
import sys

#*********************** STYLE OF CAUSE ***********************#

StyleOfCause_Input = raw_input("Enter Style of Cause: \n")
OUTPUT = ""

#Remove leading or trailing white spaces
StyleOfCause_Stripped = StyleOfCause_Input.strip()
#Remove excess white spaces
StyleOfCause_NoWhites = re.sub('\s\s*',' ', StyleOfCause_Stripped)
#Remove all periods
StyleOfCause_NoPeriods = StyleOfCause_NoWhites.replace(".","")


#Define the class "Party", create an object for storing the parties 
Parties = []
class Party:
	def _init_(self, Name, Number):
		self.Name = Name
		self.Number = Number
		Parties.append(self)

def NotAllowed(string):
	NotAllowed = ["The ", "La ", "Le ", "Les "]
	for x in NotAllowed:
		string = string.replace(x, "")
	return string

#Capitalizes first word after a space or a bracket. Decapitalizg the rest, and entire correct words. Capitalizes non-words
def Capitalize(string):
	m = ' '.join([s[0].upper() + s[1:].lower() for s in string.split(' ')])
	string = '('.join([s[0].upper() + s[1:] for s in m.split('(')])
	Decaps = ["in rem", "and", "ex rel", "of", "de"];
	Lstring = string.lower(); Indexes = [];
	for x in Decaps:
		if x in Lstring: Indexes.append([x, len(x), Lstring.find(x)])
	for i in range(len(Indexes)):
		string = string.replace(string[Indexes[i][2]:Indexes[i][2]+Indexes[i][1]], Indexes[i][0])
	return string

#guardian, tutor, company, municipality, province, country, will, estate, bankruptcy, receivership, crim, Civil crown (AG or MNR), Municipal Boards
def StyleAttributes(Parties, j):
	if ("guardian" and "ad litem") in Parties[j].Name.lower(): 
		Parties[j].Name = re.sub(r'\(?(g|G)uardian\s(a|A)d\s(l|L)item\s?(of)?\)?', '(Guardian ad litem of)', Parties[j].Name)
	#LITIGATION GUARDIAN
	if ("litigation guardian") in Parties[j].Name.lower(): 
		Parties[j].Name = re.sub(r'\(?(l|L)itigation\s(g|G)uardian\s?(of)?\)?', '(Litigation guardian of)', Parties[j].Name)
	#LLP or LP
	Caps = [" llp"," lp"];
	for x in Caps:
		if x in Parties[j].Name.lower():
			Parties[j].Name = re.sub(Parties[j].Name[Parties[j].Name.lower().find(x):Parties[j].Name.lower().find(x)+len(x)], x.upper(), Parties[j].Name)
	if "corporation" in Parties[j].Name.lower(): Parties[j].Name = re.sub(r'(c|C)orporation', 'Corp', Parties[j].Name)
	#CITIES
	#PROVINCES
	#print "At end of StyleAttributes, party name is ", Parties[j].Name
	return Parties[j].Name


#Separate the parties (separated by ' v ') into a list
m = re.split(r'\b(?:\s*)v(?:\s*)\b', StyleOfCause_NoPeriods, re.I) #splits into parties

if len(m)==1:
	#print "Length is 1"
	if ("reference " or "ref " or "re ") in StyleOfCause_NoPeriods.lower():
		TakeOutBadWords = NotAllowed(m[0])
		OUTPUT = Capitalize(TakeOutBadWords)
	else: OUTPUT = Capitalize(m[0])
else:
	#print "Length is not 1"
	for j in range(len(m)):
		Parties.append(Party())
		Parties[j].Name = Capitalize(m[j])
		Parties[j].Number = j
		Parties[j].Name = StyleAttributes(Parties, j)
		OUTPUT = OUTPUT + Parties[j].Name + " v "
	OUTPUT = re.sub('\sv\s$', '', OUTPUT)

print "OUTPUT: ", OUTPUT		
	



