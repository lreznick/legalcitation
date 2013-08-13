UKCASE documentation


Main Functions:
	GetStyleOfCause(StyleOfCause_Input):
		return correct styleofcause
		role: Formats style of cause correctly.

	CheckNC(Citation_Input)
		return [string, "NC"/"EWHC"/"No NC"]
		role: called from various functions to check if there is a NC

	BestReporter(Citation_Input)
		return [best reporter, "court"/"no court"]
		role: chooses 1 best reporter from the inputs

	AutoPCPinpoint(Citation_Input)
		return ["Requires a reporter in addition to this neutral citation.", "NA"]
		return ["cite to paragraph in NC only", NC[0]]
			do dropdown court menu: as follows
			#["Chancery Division", '(Ch)'], ["Patents Court", '(Pat)'], ["Queen's Bench", '(QB)'], ["Administrative Court", '(Admin)'], ["Commercial Court", '(Comm)'], ["Admirality Court", '(Admlty)'], ["Technology and Construction",'(TCC)'], ["Family Division", '(Fam)']
		return ["cite to paragraph or page in reporter", BestReporter]

	GetCitations(Citation_Input, Court_Input, Date_Input, pincite):
		return OUTPUT (result)
	
