/*
=============================================
Tool Tips
=============================================
*/	


var tooltip_header              = "<div class=\"tooltip-title\">"
var tooltip_link 				= "<a href = \"./instructional?linkLocation=somediv\" target=\"_blank\"> more info</a>"





/* ******** CANADA ******** */

var canadatooltip_text = [
/*0*/"Style of Cause     </div><font class = \"red\"> ex. Tilden Rent-A-Car Co. v Clendenning</font><br> Input the style of cause as written on the case. <br>",
/*1*/"Parallel Citations </div><font class = \"red\"> ex. 2008 SCC 9 (CanLII); [2008] 1 SCR 190; 229 NBR (2d) 1; 291 DLR (4th) 577 </font><br> Separate abbreviated reporters by commas or semicolons. Browse through the catalog to find abbreviations. <br>Input at least two reporters, unless only one is available. <br>Don't worry about formatting. <br>",
/*2*/"Year of Decision    </div><font class = \"red\"> ex. 1985 </font><br>",
/*3*/"Court                 </div><font class = \"red\"> ex. Alberta qb </font><br>Our recognition algorithm will format your input correctly. <br>",
/*4*/"Short Form      	</div><font class = \"red\"> ex. Van der Peet</font> <br>Use a short form to refer to the judgment later in your paper. <br>It is normally the first party name. <br>",
/*5*/"Pinpoint             	</div><font class = \"red\"> ex. 132 </font><br>Use paragraphs where available, otherwise pages. <br>Use the radio button to indicate which reporter you are citing to.<br><br>"+ tooltip_header +  "Cite to </div> Use the radio buttons to select a reporter if you will pinpoint to it at some point other than the first instance of the citation. <br>",
/*6*/"Citing               </div><font class = \"red\">  ex. Crevier v AG Quebec, [1981] 2 SCR 220; [1981] 127 DLR (3d) 1</font> <br>Use the citing feature if the main judgement cites a passage from another case, if appropriate. <br>",
/*7*/"Judge               </div><font class = \"red\"> ex. Binnie J </font><br>CJC = Chief Justice of Canada <br>CJA = Chief Justice of Appeal <br>CJ = Chief Justice <br>JA = Justice of Appeal <br>JJA = Justices of Appeal <br>J = Justice <br>JJ = Justices <br>Mag = Magistrate <br>",
/*8*/"History              </div>Affirming or Reversing <font class = \"red\"> <br> ex. 2003 BCSC 14 </font><br>Input minimum <b>one</b> citation for the lower court judgement. <br> <br>Affirmed or Reversed <br><font class = \"red\">ex. 2011 SCC 66, [2011] 3 SCR 837 </font> <br>Input minimum <b>two</b> citations for the upper court judgement. <br> ",
/*9*/"Leave To Appeal </div> <b>Granted:</b> input court and citation. <br> <font class = \"red\">ex. SCC, [2008] 1 SCR xiv </font><br><b>Refused:</b> input court and docket number. <br><font class = \"red\">ex. SCC, 23424 (November 20, 2009) </font><br><b>Requested </b> or <b> As of right:</b> input court. <br><font class = \"red\">ex. \"SCC\" </font><br>"
]
for (var i =0; i< canadatooltip_text.length; i++){
	canadatooltip_text[i] = tooltip_header + canadatooltip_text[i] + 
	tooltip_link
}
var CanadatooltipList = [
	["styleofcause" , canadatooltip_text[0]],
	["parallel" , canadatooltip_text[1]],
	["year" , canadatooltip_text[2]],
	["court" , canadatooltip_text[3]],
	["shortform" , canadatooltip_text[4]],	
	["pincite_input" , canadatooltip_text[5]],
	["citing" , canadatooltip_text[6]],
	["judge" , canadatooltip_text[7]],
	["history" , canadatooltip_text[8]],
	["leavetoappeal" , canadatooltip_text[9]],
	["citing_styleofcause" , canadatooltip_text[6]],
	["citing_styleofcause", canadatooltip_text[6]],
	["citing_parallel" , canadatooltip_text[6]],
	["citing_year", canadatooltip_text[6]],
	["citing_court", canadatooltip_text[6]],
	["history_parallel1", canadatooltip_text[8]],
	["history_year1", canadatooltip_text[8]],
	["history_court1", canadatooltip_text[8]],
	["history_parallel2", canadatooltip_text[8]],
	["history_year2", canadatooltip_text[8]],
	["history_court2", canadatooltip_text[8]],
	["history_parallel3", canadatooltip_text[8]],
	["history_year3", canadatooltip_text[8]],
	["history_court3", canadatooltip_text[8]],
	["leaveToAppeal_selection", canadatooltip_text[9]],
	["leaveToAppeal_court", canadatooltip_text[9]],
	["leaveToAppeal_citation", canadatooltip_text[9]],
	["leaveToAppeal_docket" , canadatooltip_text[9]]
]
var CanadaTooltipOffsets = [
'#CanadaCase-Container',
'#CanadaCaseJudge', //judge
'#CanadaCase-Container #history1', //history
'#CanadaCase-Container #leaveToAppeal-selection'
]; //leave to appeal





/* ******** UK ******** */

var uktooltip_text = [
/*0*/"Style of Cause     </div><font class = \"red\"> ex. Hadley v Baxendale</font><br> Input the style of cause as written on the case. <br>",
/*1*/"Parallel Citations </div><font class = \"red\"> ex. [2011] 1 FCR 598, [2011] EWCA Civ 34, [2011] Fam Law 342, [2011] 1 FLR 2040 </font><br> Separate abbreviated reporters by commas or semicolons. Browse through the catalog to find abbreviations. <br>Input preferably one reporter and one neutral citation, otherwise either will do. <br>Don't worry about formatting. <br>",
/*2*/"Year of Decision    </div><font class = \"red\"> ex. 2002 </font><br>",
/*3*/"Court                 </div><font class = \"red\"> ex. Court of Appeal: Civil Division </font><br>",
/*4*/"Short Form      	</div><font class = \"red\"> ex. Blake</font> <br>Use a short form to refer to the judgment later in your paper. <br>It is normally the first party name. <br>",
/*5*/"Pinpoint             	</div><font class = \"red\"> ex. 42-49, 57 </font><br>You must pinpoint to paragraphs the neutral citation, if provided.<br>Otherwise, pinpoint paragraphs or pages on the reporter. <br>",
/*6*/"Citing               </div><font class = \"red\">  ex. Officer L (Re), [2007] UKHL 36</font> <br>Use the citing feature if the main judgement cites a passage from another case, if appropriate. <br>",
/*7*/"Judge               </div><font class = \"red\"> ex. Lord Denning MR</font><br>Consult the 'Judicial titles in England and Wales' Wikipedia page to find the appropriate formatting. <br>",
/*8*/"History              </div>Affirming or Reversing <font class = \"red\"> <br> ex. [2005] EWHC 733 (Fam) </font><br>Input minimum <b>one</b> citation for the lower court judgement. <br> <br>Affirmed by or Reversed by<br><font class = \"red\">ex. [2013] EWHC 92 (Ch), [2013] WLR(D) 30 </font> <br>Input preferably <b>two</b> citations for the upper court judgement. <br> ",
/*9*/"Leave To Appeal </div> <b>Granted </b> or <b> Refused:</b> input court and case citation. <br> <font class = \"red\">ex. House of Lords (England), UKSC 2013/0044 </font><br><b>Requested </b> or <b> As of right:</b> input court. <br><font class = \"red\">ex. Court of Appeal: Criminal Division </font><br>",
]
for (var i =0; i< uktooltip_text.length; i++){
	uktooltip_text[i] = tooltip_header + uktooltip_text[i]+ 
	tooltip_link
	
}
var UKtooltipList = [
	["styleofcause" , uktooltip_text[0]],
	["parallel" , uktooltip_text[1]],
	["year" , uktooltip_text[2]],
	["court" , uktooltip_text[3]],
	["shortform" , uktooltip_text[4]],	
	["pincite_input" , uktooltip_text[5]],
	["citing" , uktooltip_text[6]],
	["judge" , uktooltip_text[7]],
	["history" , uktooltip_text[8]],
	["leavetoappeal" , uktooltip_text[9]],
	["citing_styleofcause" , uktooltip_text[6]],
	["citing_styleofcause", uktooltip_text[6]],
	["citing_parallel" , uktooltip_text[6]],
	["citing_year", uktooltip_text[6]],
	["citing_court", uktooltip_text[6]],
	["history_parallel1", uktooltip_text[8]],
	["history_year1", uktooltip_text[8]],
	["history_court1", uktooltip_text[8]],
	["history_parallel2", uktooltip_text[8]],
	["history_year2", uktooltip_text[8]],
	["history_court2", uktooltip_text[8]],
	["history_parallel3", uktooltip_text[8]],
	["history_year3", uktooltip_text[8]],
	["history_court3", uktooltip_text[8]],
	["leaveToAppeal_selection", uktooltip_text[9]],
	["leaveToAppeal_court", uktooltip_text[9]],
	["leaveToAppeal_citation", uktooltip_text[9]],
	["leaveToAppeal_docket" , uktooltip_text[9]]
]

var UKTooltipOffsets = [
'#UKCase-Container',
'#UKCaseJudge', //judge
'#UKCase-Container #history1', //history
'#UKCase-Container #leaveToAppeal-selection'
]; //leave to appeal





/* ******** US ******** */

var ustooltip_text = [
/*0*/"Style of Cause     </div><font class = \"red\"> ex. Roe v. Wade</font><br> Input the style of cause as written on the case. <br>",
/*1*/"Parallel Citations </div><font class = \"red\"> ex. 971 F (2d) 1395, 1992 Lexis 23028 </font><br> Separate abbreviated reporters by commas or semicolons. Browse through the catalog to find abbreviations. <br>Input minimum <b>one</b> reporter. <br>Don't worry about formatting. <br>",
/*2*/"Year of Decision    </div><font class = \"red\"> ex. 1994 </font><br>",
/*3*/"Court                 </div><font class = \"red\"> ex. Northern District of California </font><br>",
/*4*/"Short Form      	</div><font class = \"red\"> ex. King</font> <br>Use a short form to refer to the judgment later in your paper. <br>It is normally the first party name. <br>",
/*5*/"Pinpoint             	</div><font class = \"red\"> ex. 239, 241-45 </font><br>Pinpoint to the page in the reporter indicated.",
/*6*/"Citing               </div><font class = \"red\">  ex. Asbury v Roanoake, 599 F Supp (2d) 712 (WD Virginia, 2009)</font> <br>Use the citing feature if the main judgement cites a passage from another case, if appropriate. <br>",
/*7*/"Judge               </div><font class = \"red\"> ex. Jones J</font><br> J = Justice/Judge <br> CJ = Chief Justice/Judge<br>",
/*8*/"History              </div>Affirming,  Reversing, Affirmed by, or Reversed by <font class = \"red\"> <br> ex. 393 US 503 (1969)  </font><br>Input one citation for the lower court judgement. <br>",
/*9*/"Leave To Appeal </div> <b>Granted </b> or <b> Refused:</b> input court and case citation. <br> <font class = \"red\">ex. 2nd Circuit, APL 2013-00002 </font><br><b>Requested </b> or <b> As of right:</b> input court. <br><font class = \"red\">ex. 2nd Circuit</font><br>",
]
for (var i =0; i< ustooltip_text.length; i++){
	ustooltip_text[i] = tooltip_header + ustooltip_text[i]+ 
	tooltip_link
}
var UStooltipList = [
	["styleofcause" , ustooltip_text[0]],
	["parallel" , ustooltip_text[1]],
	["year" , ustooltip_text[2]],
	["court" , ustooltip_text[3]],
	["shortform" , ustooltip_text[4]],	
	["pincite_input" , ustooltip_text[5]],
	["citing" , ustooltip_text[6]],
	["judge" , ustooltip_text[7]],
	["history" , ustooltip_text[8]],
	["leavetoappeal" , ustooltip_text[9]],
	["citing_styleofcause" , ustooltip_text[6]],
	["citing_styleofcause", ustooltip_text[6]],
	["citing_parallel" , ustooltip_text[6]],
	["citing_year", ustooltip_text[6]],
	["citing_court", ustooltip_text[6]],
	["history_parallel1", ustooltip_text[8]],
	["history_year1", ustooltip_text[8]],
	["history_court1", ustooltip_text[8]],
	["history_parallel2", ustooltip_text[8]],
	["history_year2", ustooltip_text[8]],
	["history_court2", ustooltip_text[8]],
	["history_parallel3", ustooltip_text[8]],
	["history_year3", ustooltip_text[8]],
	["history_court3", ustooltip_text[8]],
	["leaveToAppeal_selection", ustooltip_text[9]],
	["leaveToAppeal_court", ustooltip_text[9]],
	["leaveToAppeal_citation", ustooltip_text[9]],
	["leaveToAppeal_docket" , ustooltip_text[9]]
]

var USTooltipOffsets = [
'#USCase-Container',
'#USCaseJudge', //judge
'#USCase-Container #history1', //history
'#USCase-Container #leaveToAppeal-selection'
]; //leave to appeal




/* ******** Journal ******** */

var journaltooltip_text = [
/*0*/"Author(s)     </div><font class = \"red\"> ex. Joanne Smith<br>   Joe Smith</font><br> ",
/*1*/"Title 	</div><font class = \"red\"> ex. Trust Principles in Business Transactions </font><br>",
/*2*/"Citation    </div><font class = \"red\"> ex. 28 Windsor YB Access Just 465 </font><br> Browse through the catalog to find abbreviations. <br>",
/*3*/"Year              </div><font class = \"red\"> ex. 2006 </font><br>",
/*4*/"Pinpoint      	</div><font class = \"red\"> ex. 478-480, 490</font> <br>Cite to a general range if no particular page or paragraph sticks out. <br>",
]

for (var i =0; i< journaltooltip_text.length; i++){
	journaltooltip_text[i] = tooltip_header + journaltooltip_text[i]+ 
	tooltip_link
}
var JournaltooltipList = [
	["authors" ,		 journaltooltip_text[0]],
	["title" , 			 journaltooltip_text[1]],
	["citation" , 		 journaltooltip_text[2]],
	["year" , 			 journaltooltip_text[3]],
	["pinpoint_form1" ,	 journaltooltip_text[4]],	
	["pinpoint_form2" ,	 journaltooltip_text[4]],	
	["pinpoint_form3" ,	 journaltooltip_text[4]],	
	["pinpoint_form4" ,	 journaltooltip_text[4]],	
]
var JournalTooltipOffsets =[
'#JournalAuthors'
]


/* ******** Journal ******** */
var booktooltip_text = [
/*0*/"Author(s)     </div><font class = \"red\"> ex. Joanne Smith<br>   Joe Smith</font><br> Only list primary authors. <br>Indicate if you want us to use your input as written, or if the input names are editors. <br>",
/*1*/"Title 	</div><font class = \"red\"> ex. Securities Law </font><br>",
/*2*/"Publication Place    </div><font class = \"red\"> ex. Calgary </font><br> Input sufficient detail to reasonably communicate the place. <br>",
/*3*/"Publisher    </div><font class = \"red\"> ex. Queen's-McGill University Press </font><br> Use the short name of a publisher. <br>",
/*4*/"Year of Publication            </div><font class = \"red\"> ex. 1994 </font><br>",
/*5*/"Volume            </div><font class = \"red\"> ex. 3 </font><br>",
/*6*/"Edition            </div><font class = \"red\"> ex. 8 </font><br>",
/*7*/"Date Consulted            </div><font class = \"red\"> ex. June 15, 2013 </font><br> If the volume is in loose-leaf form, input the date you accessed it.",
/*8*/"Extra Information            </div><font class = \"red\"> ex. (in Japanese) </font><br> Input will be used verbatim.",
/*9*/"Pinpoint      	</div><font class = \"red\"> ex. 478-480, 490</font> <br>Cite to a general range if no particular page or paragraph sticks out. <br>",
]

for (var i =0; i< booktooltip_text.length; i++){
	booktooltip_text[i] = tooltip_header + booktooltip_text[i]+ 
	tooltip_link
}
var BooktooltipList = [
	["authors" ,		 booktooltip_text[0]],
	["title" , 			 booktooltip_text[1]],
	["place" , 		 booktooltip_text[2]],
	["publisher" ,	 booktooltip_text[3]],
	["year" ,			 booktooltip_text[4]],	
	["volume" , 		 booktooltip_text[5]],
	["edition" ,		 booktooltip_text[6]],	
	["date_consulted" ,	 booktooltip_text[7]],
	["extra" ,		 	 booktooltip_text[8]],	
	["pinpoint_form0" ,	 booktooltip_text[9]],	
	["pinpoint_form1" ,	 booktooltip_text[9]],	
	["pinpoint_form2" ,	 booktooltip_text[9]],	
	["pinpoint_form3" ,	 booktooltip_text[9]],	
	["pinpoint_form4" ,	 booktooltip_text[9]]	
]	

var BookTooltipOffsets =[
'#Book-Container',
'#BookPublisher'
]


var dictionarytooltip_text = [
/*0*/"Title 	</div><font class = \"red\"> ex. Oxford English Dictionary </font><br>",
/*1*/"Edition or Year           </div><font class = \"red\"> ex. 14, or 2010 </font><br>",
/*2*/"Word           </div><font class = \"red\"> ex. dividend </font><br> Input the word you referenced.<br>",
]


for (var i =0; i< dictionarytooltip_text.length; i++){
	dictionarytooltip_text[i] = tooltip_header + dictionarytooltip_text[i]+ 
	tooltip_link
}
var DictionarytooltipList = [
	["dictionary_title" ,		 dictionarytooltip_text[0]],
	["dictionary_edition" , 	 dictionarytooltip_text[1]],
	["dictionary_word" , 	 dictionarytooltip_text[2]]
]	

var DictionaryTooltipOffsets =[
'#Dictionary-Container',
'#DictionaryTitle',
]
/*

var tooltip_styleofcause	    = tooltip_header + "Style of Cause     </div><font class = \"red\"> ex. Tilden Rent-A-Car Co. v Clendenning</font><br> Input the style of cause as written on the case. <br>"
var tooltip_parallel				= tooltip_header + "Parallel Citations </div><font class = \"red\"> ex. 2008 SCC 9 (CanLII); [2008] 1 SCR 190; 229 NBR (2d) 1; 291 DLR (4th) 577 </font><br> Separate abbreviated reporters by commas or semicolons. Browse through the catalog to find abbreviations. <br>Input at least two reporters, unless only one is available. <br>Don't worry about formatting. <br>"
var tooltip_year	                = tooltip_header + "Year of Decision    </div><font class = \"red\"> ex. 1985 </font><br>"
var tooltip_court                 = tooltip_header + "Court                 </div><font class = \"red\"> ex. Alberta qb </font><br>Our recognition algorithm will format your input correctly. <br>"
var tooltip_shortform     		= tooltip_header  + "Short Form      	</div><font class = \"red\"> ex. Van der Peet</font> <br>Use a short form to refer to the judgment later in your paper. <br>It is normally the first party name. <br>"
var tooltip_pincite_input     	= tooltip_header + "Pinpoint             	</div><font class = \"red\"> ex. 132 </font><br>Use paragraphs where available, otherwise pages. <br>Use the radio button to indicate which reporter you are citing to.<br><br>"+ tooltip_header +  "Cite to </div> Use the radio buttons to select a reporter if you will pinpoint to it at some point other than the first instance of the citation. <br>"
var tooltip_citing         		= tooltip_header  + "Citing               </div><font class = \"red\">  ex. Crevier v AG Quebec, [1981] 2 SCR 220; [1981] 127 DLR (3d) 1</font> <br>Use the citing feature if the main judgement cites a passage from another case, if appropriate. <br>"
var tooltip_judge 				= tooltip_header  + "Judge               </div><font class = \"red\"> ex. Binnie J </font><br>CJC = Chief Justice of Canada <br>CJA = Chief Justice of Appeal <br>CJ = Chief Justice <br>JA = Justice of Appeal <br>JJA = Justices of Appeal <br>J = Justice <br>JJ = Justices <br>Mag = Magistrate <br>"
var tooltip_history 	            = tooltip_header + "History              </div>Affirming or Reversing <font class = \"red\"> <br> ex. 2003 BCSC 14 </font><br>Input minimum <b>one</b> citation for the lower court judgement. <br> <br>Affirmed or Reversed <br><font class = \"red\">ex. 2011 SCC 66, [2011] 3 SCR 837 </font> <br>Input minimum <b>two</b> citations for the upper court judgement. <br> "
var tooltip_leavetoappeal    = tooltip_header + "Leave To Appeal </div> <b>Granted:</b> input court and citation. <br> <font class = \"red\">ex. SCC, [2008] 1 SCR xiv </font><br><b>Refused:</b> input court and docket number. <br><font class = \"red\">ex. SCC, 23424 (November 20, 2009) </font><br><b>Requested </b> or <b> As of right:</b> input court. <br><font class = \"red\">ex. \"SCC\" </font><br>"

var tooltip_citing_styleofcause = tooltip_citing_parallel = tooltip_citing_year=tooltip_citing_court=tooltip_citing;
var tooltip_history_parallel1
= tooltip_history_year1
= tooltip_history_court1
= tooltip_history_parallel2
= tooltip_history_year2
= tooltip_history_court2
= tooltip_history_parallel3
= tooltip_history_year3
= tooltip_history_court3 = tooltip_history;

var tooltip_leaveToAppeal_selection
= tooltip_leaveToAppeal_court
= tooltip_leaveToAppeal_citation
= tooltip_leaveToAppeal_docket = tooltip_leavetoappeal;

//var canadatooltipList = [tooltip_styleofcause	,tooltip_parallel, tooltip_year,tooltip_court,tooltip_shortform ,tooltip_pincite_input ,tooltip_citing,tooltip_judge ,tooltip_history ,tooltip_leavetoappeal, tooltip_citing_styleofcause,  tooltip_citing_parallel, tooltip_citing_year,tooltip_citing_court,tooltip_citing;     


/*
jQuery('#CanadaCase-Container input').focus(function(){
		
		var name = jQuery(this).attr('name') // get Forms name
		console.log(name)
		var tool = eval('tooltip_'+name); // convert it to a variable
		//console.log(tool + " " +jQuery('.tooltips').html()); // display the tooltip)
		jQuery('#CanadaCase-tooltips').html(tool); // display the tooltip
		
		var formTop = jQuery("#CanadaCase-Container").offset();
		var currentForm = jQuery(this).offset();
		var positionDifference = currentForm.top - formTop.top;

		for (var i =0; i<formOffsets.length-1;i++){
			var a = formOffsets[i];
			var b = formOffsets[i+1];
			var offset = (jQuery(a).offset().top-formTop.top);
			var nextOffset = (jQuery(b).offset().top-formTop.top);
			
			if (positionDifference >= offset){
				if (positionDifference < nextOffset){
					jQuery('#CanadaCase .tooltips').css('margin-top', offset);
				}
				if (positionDifference >= nextOffset){
					jQuery('#CanadaCase .tooltips').css('margin-top', nextOffset);
				}
			}
		}
});
*/
jQuery('#CanadaCase-Container select').change(function(){
	console.log(jQuery(this).attr('name'));
	// Do something in here
});
//jQuery('#tooltips').html(tooltip_styleOfCause);