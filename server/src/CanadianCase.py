StyleOfCause_Input = "williams v. The Roffey Of qarth (estate.)."
StyleOfCause_Input.strip()
#Remove all periods
StyleOfCause_NoPeriods = StyleOfCause_Input.replace(".","")
print StyleOfCause_NoPeriods

#Define the class "Party". 
class Party:
	Parties = {}
	
	def _init_(self, Attributes, Name):
		self.Attributes = Attributes
		Attributes = []
		self.Name = Name
		Parties.append(self)
	def PrintCount(self):
		print "Number of parties is %d" % Party.PartyCount

if (" v " or " re " or " ref " or " reference ") not in StyleOfCause_NoPeriods.lower():
	print "No Parties"
