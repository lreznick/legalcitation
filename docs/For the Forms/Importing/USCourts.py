import re


AllCourts = [
	["Admin Ct", re.compile(r"^Admin(istrative)? Ct", flags = re.I)],
	["Adm", re.compile(r"Admiral(ity)?", flags = re.I)],
	["Alder Ct", re.compile(r"Alder(man's)?", flags = re.I)],
	["App Ct", re.compile(r"Appe(als|llate) Ct", flags = re.I)],
	["App Div", re.compile(r"Appellate Div(ision)?", flags = re.I)],
	["BAP", re.compile(r"Bankrupt(cy)? Appe(als|llate) Panel", flags = re.I)],
	["Bankr", re.compile(r"Bankruptcy", flags = re.I)],
	["BTA", re.compile(r"(Board Tax Appeals|BTA)( \(US\))?", flags = re.I)],
	["Bor Ct", re.compile(r"Borough Ct", flags = re.I)],#name before
	["Ch", re.compile(r"Chancery", flags = re.I)],#court/division
	["Child Ct", re.compile(r"Child(ren's)? Ct", flags = re.I)],
	["Cir Ct", re.compile(r"Cir(cuit)? Ct$", flags = re.I)],
	["Cir", re.compile(r"Cir(cuit)? Ct App(eals)?( \((fed|federal|US)\))?", flags = re.I)], #FED
	["Cir Ct App", re.compile(r"Cir(cuit)? Ct App(eals)?", flags = re.I)],#STATE
	["Cir Ct & Fam Ct", re.compile(r"Cir(cuit)?( Ct)? (&|and) fam(ily)( ct)?", flags = re.I)],
	["Cit AC", re.compile(r"Citizen(ship)? (AC|Appeals? Ct)", flags = re.I)],
	["City Ct", re.compile(r"City Ct", flags = re.I)],#name before
	["City & Parish Ct", re.compile(r"City (&|and) Par(ish)? Ct", flags = re.I)],
	["Civ App", re.compile(r"Civ(il)? App(eals)?", flags = re.I)],
	["Civ Ct", re.compile(r"Civil Ct", flags = re.I)],
	["Civ Ct Rec", re.compile(r"Civ(il)? Ct Rec(ord)?", flags = re.I)],
	["Civ Dist Ct", re.compile(r"Civ(il)? Dist(rict)? Ct", flags = re.I)],
	["Small Cl Ct", re.compile(r"Small Claims Ct", flags = re.I)],
	["Cl Ct", re.compile(r"Claims Ct", flags = re.I)],
	["Comm Ct", re.compile(r"Commerce Ct", flags = re.I)],
	["CP", re.compile(r"Common Pl(eas)?", flags = re.I)],
	["Commw Ct", re.compile(r"Commonwealth Ct", flags = re.I)],
	["Concil Ct", re.compile(r"Conciliation Ct", flags = re.I)],
	["Const County Ct", re.compile(r"Constitutional County Ct", flags = re.I)],
	["County Ct at Law", re.compile(r"County Ct( at)? Law", flags = re.I)],
	["Co Ct J Crim Ct", re.compile(r"County( Ct)? Judges'? Crim(inal) Ct", flags = re.I)],
	["County J Ct", re.compile(r"County Judge'?s'? Crim(inal)? Ct", flags = re.I)],
	["County Rec Ct", re.compile(r"County Recorder'?s? Ct", flags = re.I)],
	["Co Ct", re.compile(r"County Ct", flags = re.I)],
	["Cir", re.compile(r"Ct Appeals?", flags = re.I)],#FED
	["Ct App", re.compile(r"Ct Appeals?", flags = re.I)],#STATE
	["Ct Ch", re.compile(r"Ct Chance(ry)?", flags = re.I)],
	["Ct Civ App", re.compile(r"Ct Civ(il)? App(eals)?", flags = re.I)],
	["Ct Cl", re.compile(r"Ct Claims", flags = re.I)],
	["Ct Com Pl", re.compile(r"Ct Common Pleas", flags = re.I)],
	["Ct Crim App", re.compile(r"Ct Crim(inal)? App(eals)?", flags = re.I)],
	["CCPA", re.compile(r"Ct Cust(oms) (&|and) Patent App(eals)?", flags = re.I)],
	["Ct Cust App", re.compile(r"Ct Customs App(eals)?", flags = re.I)],
	["Ct Err", re.compile(r"Ct Errors", flags = re.I)],
	["Ct Err & App", re.compile(r"Ct Errors (&|and) App(eals)?", flags = re.I)],
	["Ct Fed Cl", re.compile(r"Ct Fed(eral)? Claims", flags = re.I)],
	["Ct First Inst", re.compile(r"Ct First Instance", flags = re.I)],
	["Ct Gen Sess", re.compile(r"Ct General Sessions", flags = re.I)],
	["Ct Spec Sess", re.compile(r"Ct Special Sessions", flags = re.I)],
	["Ct Int'l Trade", re.compile(r"Ct (Int'l|International) Trade", flags = re.I)],
	["Ct Rev", re.compile(r"Ct Review", flags = re.I)],
	["Ct Spec App", re.compile(r"Ct Special App(eals)?", flags = re.I)],
	["Ct T Rev", re.compile(r"Ct Tax Rev(iew)?", flags = re.I)],
	["Crim App", re.compile(r"Crim(inal)? App(eals)?", flags = re.I)],
	["Crim Dist Ct", re.compile(r"Crim(inal)? Dist(rict)? Ct", flags = re.I)],
	["Cust Ct", re.compile(r"Customs Ct", flags = re.I)],
	["D", re.compile(r"Dist(rict)? Court", flags = re.I)],#FED
	["Dist Ct", re.compile(r"Dist(rict)? Court", flags = re.I)],#STATE
	["Dist Ct App", re.compile(r"Dist(rict)? Ct Appeals", flags = re.I)],
	["Dist Just Ct", re.compile(r"Dist(rict)? Just(ice)? Ct", flags = re.I)],
	["Dom Rel Ct", re.compile(r"Dom(estic)? Rel(ations)? Ct", flags = re.I)],
	["Emer Ct App", re.compile(r"Emer(gency)? Ct App(eal)?s? ", flags = re.I)],
	["Env Ct", re.compile(r"Environ(ment)?(al)?", flags = re.I)],
	["Eq", re.compile(r"Equity", flags = re.I)],
	["Fam Ct", re.compile(r"Fam(ily)? Ct", flags = re.I)],
	["Gen Sess Ct", re.compile(r"Gen(eral)? Sess(ions)? Ct", flags = re.I)],
	["High Ct", re.compile(r"High Ct", flags = re.I)],
	["Housing Ct", re.compile(r"Housing Ct", flags = re.I)],
	["Intermed Ct App", re.compile(r"Intermediate Ct App(eals)?", flags = re.I)],
	["J Ct", re.compile(r"Just(ice) Ct", flags = re.I)],
	["JP Ct", re.compile(r"Justice Peace'?s? Ct", flags = re.I)],
	["Juv Ct", re.compile(r"Juvenile Ct", flags = re.I)],
	["Juv Del Ct", re.compile(r"Juv(enile)? Del(inquent)?s?'? Ct", flags = re.I)],
	["Juv & Fam Ct", re.compile(r"Juv(enile)? (&|and) Fam(ily)", flags = re.I)],
	["Land  Ct", re.compile(r"Land Ct", flags = re.I)],
	["Law  Ct", re.compile(r"Law Ct", flags = re.I)],
	["Magis Ct", re.compile(r"Magistrate Ct", flags = re.I)],
	["Magis Div", re.compile(r"Magistrate Division", flags = re.I)],
	["Mayor's Ct", re.compile(r"Mayor'?s Ct", flags = re.I)],
	["Mun Ct", re.compile(r"Municipal Ct", flags = re.I)],#name before
	["Mun Ct not Rec", re.compile(r"Mun(icipal)? Ct (not|off) Record", flags = re.I)],
	["Mun Crim Ct Rec", re.compile(r"Mun(icipal) Crim(inal)? Ct Record", flags = re.I)],
	["Orphans' Ct", re.compile(r"Orphans?'? Ct", flags = re.I)],
	["Parish Ct", re.compile(r"Parish Ct", flags = re.I)],#name before
	["Police J Ct", re.compile(r"Pol(ice)? Just(ice)?'?s? Ct", flags = re.I)],
	["Prerog Ct", re.compile(r"Prerogative Ct", flags = re.I)],
	["Prob Ct", re.compile(r"Probate Ct", flags = re.I)],
	["Rec Ct", re.compile(r"Recorder'?s Ct", flags = re.I)],
	["State Ct", re.compile(r"State Ct", flags = re.I)],
	["Super Ct", re.compile(r"Superior Ct", flags = re.I)],
	["US", re.compile(r"Fed(eral)? Supreme Ct", flags = re.I)],#FED
	["Sup Ct", re.compile(r"Supreme Court", flags = re.I)],#STATE
	["Sup Ct App Div", re.compile(r"Supreme Ct? App(ellate|eals)? Div(ision)?", flags = re.I)],
	["Sup Ct App", re.compile(r"Sup(reme)? Ct App(eals)?", flags = re.I)],
	["Sup Ct Err", re.compile(r"Sup(reme)? Ct Errors", flags = re.I)],
	["USSC", re.compile(r"(United States Supreme Ct|Supreme Ct United States|US Supreme Ct|Supreme Ct US)", flags = re.I)],
	["Sup Jud Ct", re.compile(r"Supreme Jud(icial)? Ct", flags = re.I)],
	["Surr Ct", re.compile(r"Surrogate Ct", flags = re.I)],
	["Tax App Ct", re.compile(r"Tax App(eal)?s? Ct", flags = re.I)],
	["TC", re.compile(r"Tax Ct", flags = re.I)],
	["Teen Ct", re.compile(r"Teen Ct", flags = re.I)],
	["Town Ct", re.compile(r"Town Ct", flags = re.I)],
	["Traffic Ct", re.compile(r"Traffic Ct", flags = re.I)],
	["Tribal Ct", re.compile(r"Tribal Ct", flags = re.I)],#name before
	["Unif Fam Ct", re.compile(r"Unified Fam(ily) Ct", flags = re.I)],
	["Water Ct", re.compile(r"Water Ct", flags = re.I)],
	["Workers' Comp Ct", re.compile(r"Worker'?s?'? Comp(ensation)? Ct", flags = re.I)],
	["Youth ct", re.compile(r"Youth Ct", flags = re.I)]]
	
print str(AllCourts)