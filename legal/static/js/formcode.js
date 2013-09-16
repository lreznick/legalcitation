jQuery(document).ready(function(){

var tooltip_header          = "<div class=\"tooltip-title\">";
var tooltip_link 				= "<a href = \"./instructional?linkLocation=somediv\" target=\"_blank\"> more info</a>";


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
];
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
'#Dictionary-Title',
]


/*
=============================================
Validations -- see http://en.wikipedia.org/wiki/List_of_Unicode_characters
=============================================
*/		
	var regex_style 	= /^[\u0020-\u003B\u00A5\u00C0-\u00FF\u0040-\u007E\u00A3]*$/
	var regex_parallel 	= /^[a-zA-Z0-9-.,;'&!()\]\[\u00E9\u00E8\u00C9\u00C8\u00C1\u00E1\u00F4\s]*$/
	var regex_year 		= /(1[4-9][0-9]{2}|200[0-9]{1}|201[01234]{1})/
	var regex_digits 	=/^\d+$/
	var regex_findadigit = /\d+/
	var regex_court 	=/^[a-zA-Z\s.&,()-\u00E9\u00E8\u00C9\u00C8\u00C1\u00E1\u00F4]*$/
	var regex_judge		=/^[a-zA-Z-'\s.\u00E9\u00E8\u00C9\u00C8\u00C1\u00E1\u00F4]*$/
	var regex_pincite 	=/^[\d,-\s]*$/
	var regex_page		= /^[0-9-,xivlcdmXIVLCDM\s]$/
	var regex_citation 	= /^\w+\s?\d+$/
	var regex_authors 	= /^[\u0040-\u007E\s\u1D00-\u1D7F\u0020-\u003B\u00A3\u00A5\u00C0-\u00FF\n]+$/
	var regex_edition	= /^[0-9A-Za-z\s]*$/
	
/*
=============================================
UK Case Validator
=============================================
*/			
var UKCaseValidator = jQuery('#UKCase-Form').validate({
			//ignore: ".search-query",
			onkeyup: false,
			rules: { 
				styleofcause: {
					maxlength:250,	
					regex: regex_style, 
					required: true 
				},
				parallel: {
					maxlength:250,	
					regex: regex_parallel, 
					required: true 
				},
				year: {
					maxlength:25,
					regex: regex_year,
					required: true 
				},
				court: {
					required: true,
				},
				shortform: {
					maxlength:100,	
					regex: regex_style,
				},
				pincite_input:{
					maxlength:20,	
					regex: regex_pincite,
				},
				judge:{
					maxlength:100,	
					regex: regex_judge
				},
				//Citing======
				citing_styleofcause:{
					maxlength:250,	
					regex: regex_style
				},
				citing_parallel:{
					maxlength:250,	
					regex: regex_parallel,
				},
				citing_year:{
					maxlength:25,	
					regex: regex_year,
				},
				citing_court:{
					maxlength:250,	
					regex: regex_court,
					validateCourt: true,					
				},
				//History======
				history_parallel1:{
					maxlength:250,	
					regex: regex_parallel, 
				},
				history_year1: {
					maxlength:25,	
					regex: regex_year,	
				},
				history_court1: {
					maxlength:250,	
					regex: regex_court,
					validateCourt: true,
				},	
				history_parallel2:{
					maxlength:250,	
					regex: regex_parallel, 
				},
				history_year2: {
					maxlength:25,	
					regex: regex_year,	
				},
				history_court2: {
					maxlength:250,	
					regex: regex_court,
					validateCourt: true,
				},		
				history_parallel3:{
					maxlength:250,	
					regex: regex_parallel, 
				},
				history_year3: {
					maxlength:25,	
					regex: regex_year,	
				},
				history_court3: {
					maxlength:250,	
					regex: regex_court,
					validateCourt: true,
				},					
				leaveToAppeal_docket: {
					maxlength:50,	
					regex: regex_edition,
				},		
				leaveToAppeal_court:{
					maxlength:250,	
					regex: regex_court,
					validateCourt: true,
				},
			},
			highlight: function(element) {
				console.log("in highlight");
				jQuery(element).closest('.control-group').addClass('error');
			},
			success: function(element) {	
				console.log("in success");			
				element.closest('.control-group').removeClass('error');//.addClass('success'); 
				
			},
			messages: { 
				styleofcause: {
					maxlength: "Maximum length: 250 characters.",
					required: " "
				},
				parallel: {
					maxlength: "Maximum length: 250 characters.",
					required: " "
				},
				year: {
					maxlength: "Maximum length: 25 characters.",
					regex: "Enter a year between 1400 and 2014.",
					required: " "
				},
				court: {
					maxlength: "Maximum length: 250 characters.",
					required: " ",
					remote: "The court you entered was invalid"
				},
				shortform: {
					maxlength: "Maximum length: 100 characters.",
				},		
				pincite_input:{
					maxlength: "Maximum length: 20 characters.",
					regex: "Digits only, please."
				},
				judge: {
					maxlength: "Maximum length: 100 characters.",
				},
				citing_year:{
					maxlength: "Maximum length: 25 characters.",
					regex: "Enter a year between 1400 and 2014."
				},
				citing_court:{
					maxlength: "Maximum length: 250 characters.",	
				},
				//History======
				history_parallel1:{
					maxlength: "Maximum length: 250 characters.",
				},
				history_year1: {
					maxlength:"Maximum length: 25 characters.",	
					regex:"Enter a year between 1400 and 2014."
				},
				history_court1: {
					maxlength:"Maximum length: 250 characters.",	
				},	
				history_parallel2:{
					maxlength: "Maximum length: 250 characters.",
				},
				history_year2: {
					maxlength:"Maximum length: 25 characters.",	
					regex:"Enter a year between 1400 and 2014."
				},
				history_court2: {
					maxlength:"Maximum length: 250 characters.",	
				},	
				history_parallel3:{
					maxlength: "Maximum length: 250 characters.",
				},
				history_year3: {
					maxlength:"Maximum length: 25 characters.",	
					regex:"Enter a year between 1400 and 2014."
				},
				history_court3: {
					maxlength:"Maximum length: 250 characters.",	
				},					
				leaveToAppeal_docket: {
					maxlength:"Maximum length: 50 characters.",	
					regex:"Enter a valid docket number or citation.",
				},		
				leaveToAppeal_court:{
					maxlength:"Maximum length: 250 characters.",	
				}
	
			}
		});


/*
=============================================
Book
=============================================
*/
var BookValidator = jQuery('#Book-Form').validate({
			//ignore: ".search-query",
			rules: { 
				authors: { 
					maxlength:500, 	
					regex: regex_authors, 
					required: true 
				},
				title: { 
					maxlength:500, 
					regex: regex_style, 
					required: true 
				},
				place: { 
					maxlength:100,	
					regex: regex_judge,
					required: true 
				},
				publisher: { 
					maxlength:100,
					regex: regex_judge,
					required: true 
				},
				year: { 
					maxlength:25,
					regex: regex_year,	
					required: true 
				},
				volume: { 
					maxlength:10,
					regex: regex_findadigit,	
				},
				edition: { 
					maxlength:20,
					regex: regex_edition,	
				},
				date_consulted: { 
					maxlength:25,
					regex: regex_authors,	
				},
				extra: { 
					maxlength:100,
					regex: regex_style,	
				},	
				pinpoint_form1: {
					maxlength:20,
					regex: regex_pincite,																		
				},				
				pinpoint_form2: {
					maxlength:20,
					regex: regex_pincite,										
				},				
				pinpoint_form3: {
					maxlength:20,
					regex: regex_pincite,										
				},				
				pinpoint_form4: {
					maxlength:20,
					regex: regex_pincite,										
				},	
			},
			highlight: function(element) {
				console.log("in highlight");
				jQuery(element).closest('.control-group').addClass('error');
			},
			success: function(element) {	
				console.log("in success");			
				element.closest('.control-group').removeClass('error');//.addClass('success'); 
				
			},
			messages: { 
				authors: { 
					maxlength: "Maximum length: 500 characters.",
					required: " "
				},
				title: { 
					maxlength: "Maximum length: 500 characters.",
					required: " "
				},
				place: { 
					maxlength: "Maximum length: 100 characters.",
					required: " "
				},
				publisher: { 
					maxlength: "Maximum length: 100 characters.",
					required: " "
				},
				year: { 
					maxlength: "Maximum length: 25 characters.",	
					required: " "
				},
				volume: { 
					maxlength: "Maximum length: 10 characters.",	
				},
				edition: { 
					maxlength: "Maximum length: 20 characters.",	
				},
				date_consulted: { 
					maxlength: "Maximum length: 25 characters.",	
				},
				extra: { 
					maxlength: "Maximum length: 100 characters.",	
				},	
				pinpoint_form1: {
					maxlength: "Maximum length: 20 characters.",																		
				},				
				pinpoint_form2: {
					maxlength: "Maximum length: 20 characters.",										
				},				
				pinpoint_form3: {
					maxlength: "Maximum length: 20 characters.",										
				},				
				pinpoint_form4: {
					maxlength: "Maximum length: 20 characters.",										
				},		
			}
		});	


/*
=============================================
Dictionary
=============================================
*/
var DictionaryValidator = jQuery('#Dictionary-Form').validate({
			//ignore: ".search-query",
			rules: { 
				dictionary_title: { 
					maxlength:500, 
					regex: regex_style, 
					required: true 
				},
				dictionary_edition: { 
					maxlength:25,
					regex: regex_edition,
					//regex2: regex_year,
					required: true
				},
				dictionary_word: { 
					maxlength:100,
					regex: regex_style,	
					required: true
				},		
			},
			highlight: function(element) {
				console.log("in highlight");
				jQuery(element).closest('.control-group').addClass('error');
			},
			success: function(element) {	
				console.log("in success");			
				element.closest('.control-group').removeClass('error');//.addClass('success'); 
				
			},
			messages: { 
				dictionary_title: { 
					maxlength: "Maximum length: 500 characters.",
					required: " "
				},
				dictionary_edition: { 
					maxlength: "Maximum length: 20 characters.",	
					required: " "
				},
				dictionary_word: { 
					maxlength: "Maximum length: 100 characters.",	
					required: " "
				},		
			}
		});	


/*
=============================================
Journal Article
=============================================
*/			
	// Validates the form to check if a form works or not
	// Note: rules are based on name of form
	var JournalArticleValidator = jQuery('#Journal-Form').validate({
			//ignore: ".search-query",
			rules: { 
				authors: { //check for insert code??????
					maxlength:500,	
					required: true 
				},
				title: {
					maxlength:500,	
					regex: regex_style,	
					required: true 
				},
				citation: {
					maxlength:250,	
					required: true 
				},
				year: {
					maxlength:25,
					regex: regex_year,					
					required: true 
				},
				pinpoint_form1: {
					maxlength:20,
					regex: regex_pincite,																		
				},				
				pinpoint_form2: {
					maxlength:20,
					regex: regex_pincite,										
				},				
				pinpoint_form3: {
					maxlength:20,
					regex: regex_pincite,										
				},				
				pinpoint_form4: {
					maxlength:20,
					regex: regex_pincite,										
				},								
			},
			highlight: function(element) {
				console.log("in highlight");
				jQuery(element).closest('.control-group').addClass('error');
			},
			success: function(element) {	
				console.log("in success");			
				element.closest('.control-group').removeClass('error');//.addClass('success'); 
				
			},
			messages: { 
				authors: { //check for insert code??????
					maxlength:"Maximum length: 500 characters.",
					required: " " 
				},
				title: {
					maxlength:"Maximum length: 500 characters.",
					required: " " 
				},
				citation: {
					maxlength:"Maximum length: 250 characters.",
					required: " " 
				},
				year: {
					maxlength: "Maximum length: 25 characters.",
					regex: "Enter a year between 1400 and 2014.",
					required: " "
				},
				pinpoint_form1: {
					maxlength: "Maximum length: 20 characters.",
				},				
				pinpoint_form1: {
					maxlength: "Maximum length: 20 characters.",
				},				
				pinpoint_form2: {
					maxlength: "Maximum length: 20 characters.",
				},				
				pinpoint_form3: {
					maxlength: "Maximum length: 20 characters.",
				},				
				pinpoint_form4: {
					maxlength: "Maximum length: 20 characters.",
				},								
			},				
				
			
		}); 	


/*
=============================================
CanadaCaseValidator
=============================================
*/		
	
	// Validates the form to check if a form works or not
	// Note: rules are based on name of form
	var CanadianCaseValidator = jQuery('#CanadaCase-Form').validate({
			//ignore: ".search-query",
			onkeyup: false,
			rules: { 
				styleofcause: {
					maxlength:250,	
					regex: regex_style, 
					required: true 
				},
				parallel: {
					maxlength:250,	
					regex: regex_parallel, 
					required: true 
				},
				year: {
					maxlength:15,
					regex: regex_year,
					required: true 
				},
				court: {
					maxlength:250,	
					regex: regex_court, 
					validateCourt: true,
					required: true,
				},
				shortform: {
					maxlength:100,	
					regex: regex_style,
				},
				pincite_input:{
					maxlength:20,	
					regex: regex_pincite,
				},
				judge:{
					maxlength:100,	
					regex: regex_judge
				},
				//Citing======
				citing_styleofcause:{
					maxlength:250,	
					regex: regex_style
				},
				citing_parallel:{
					maxlength:250,	
					regex: regex_parallel,
				},
				citing_year:{
					maxlength:20,	
					regex: regex_year,
				},
				citing_court:{
					maxlength:250,	
					regex: regex_court,
					validateCourt: true,					
				},
				//History======
				history_parallel1:{
					maxlength:250,	
					regex: regex_parallel, 
				},
				history_year1: {
					maxlength:20,	
					regex: regex_year,	
				},
				history_court1: {
					maxlength:250,	
					regex: regex_court,
					validateCourt: true,
				},	
				history_parallel2:{
					maxlength:250,	
					regex: regex_parallel, 
				},
				history_year2: {
					maxlength:20,	
					regex: regex_year,	
				},
				history_court2: {
					maxlength:250,	
					regex: regex_court,
					validateCourt: true,
				},		
				history_parallel3:{
					maxlength:250,	
					regex: regex_parallel, 
				},
				history_year3: {
					maxlength:20,	
					regex: regex_year,	
				},
				history_court3: {
					maxlength:250,	
					regex: regex_court,
					validateCourt: true,
				},					
				leaveToAppeal_docket: {
					maxlength:50,	
					regex: regex_edition,
				},		
				leaveToAppeal_court:{
					maxlength:250,	
					regex: regex_court,
					validateCourt: true,
				},					

			},
			highlight: function(element) {
				//console.log("in highlight");
				jQuery(element).closest('.control-group').addClass('error');
				//jQuery(element).closest('.control-group').html("AAAAAAAAAA");
			},
			success: function(element) {	
				//console.log("in success");			
				//element.text('OK!').addClass('valid').closest('.control-group').removeClass('error');//.addClass('success'); 
				element.closest('.control-group').removeClass('error');//.addClass('success'); 
				
//element.addClass('valid');
				
			},
			messages: { 
				styleofcause: {
					maxlength: "Maximum length: 250 characters.",
					required: " "
				},
				parallel: {
					maxlength: "Maximum length: 250 characters.",
					required: " "
				},
				year: {
					maxlength: "Maximum length: 25 characters.",
					regex: "Enter a year between 1400 and 2014.",
					required: " "
				},
				court: {
					maxlength: "Maximum length: 250 characters.",
					required: " ",
					remote: "The court you entered was invalid"
				},
				shortform: {
					maxlength: "Maximum length: 100 characters.",
				},		
				pincite_input:{
					maxlength: "Maximum length: 20 characters.",
					regex: "Digits only, please."
				},
				judge: {
					maxlength: "Maximum length: 100 characters.",
				},
				citing_year:{
					maxlength: "Maximum length: 25 characters.",
					regex: "Enter a year between 1400 and 2014."
				},
				citing_court:{
					maxlength: "Maximum length: 250 characters.",	
				},
				//History======
				history_parallel1:{
					maxlength: "Maximum length: 250 characters.",
				},
				history_year1: {
					maxlength:"Maximum length: 25 characters.",	
					regex:"Enter a year between 1400 and 2014."
				},
				history_court1: {
					maxlength:"Maximum length: 250 characters.",	
				},	
				history_parallel2:{
					maxlength: "Maximum length: 250 characters.",
				},
				history_year2: {
					maxlength:"Maximum length: 25 characters.",	
					regex:"Enter a year between 1400 and 2014."
				},
				history_court2: {
					maxlength:"Maximum length: 250 characters.",	
				},	
				history_parallel3:{
					maxlength: "Maximum length: 250 characters.",
				},
				history_year3: {
					maxlength:"Maximum length: 25 characters.",	
					regex:"Enter a year between 1400 and 2014."
				},
				history_court3: {
					maxlength:"Maximum length: 250 characters.",	
				},					
				leaveToAppeal_docket: {
					maxlength:"Maximum length: 50 characters.",	
					regex:"Enter a valid docket number or citation.",
				},		
				leaveToAppeal_court:{
					maxlength:"Maximum length: 250 characters.",	
				}				
			}
		}); 
	
		
		// Validates the form to check if a form works or not
		var CanliiValidator = jQuery('#Canlii-Form').validate({
			rules: { 
				url: {
					minlength: 6,
					required: true,
					url:true
				},
			},
			highlight: function(element) {
				jQuery(element).closest('.control-group').addClass('error');
			},
			success: function(element) { 
				element.addClass('valid')
					.closest('.control-group').removeClass('error'); 
			},
			messages: { 
				url: {
					minlength: "The url you entered was too short!",
					required: ""
				},
				
			}
		}); 
		
		
		// Validates the form to check if a form works or not
		jQuery('#contact-form').validate({
			rules: { 
				name: {
				    regex: "^[a-zA-Z'.\\s]{1,40}$",	 
					minlength: 4,
					required: true 
				},
				email: {
					required: true,
					email: true
				}, 
				subject: {
					minlength: 2,
					required: true 
				},
				message: {
					minlength: 2, 
					required: true
				}
			},
			highlight: function(element) {
				jQuery(element).closest('.control-group').removeClass('success').addClass('error');
			},
			success: function(element) { 
				element .text('OK!').addClass('valid')
					.closest('.control-group').removeClass('error').addClass('success'); 
			},
			messages: { 
				name: {
					minlength: "too short!",
					required: ""
				},
				email: { 
					required: "We need your email address to contact you", 
					email: "Your email address must be in  the format of name@domain.com" 
				} 
			}
		}); 
		
/*
=============================================
USCaseValidator
=============================================
*/		
	
	// Validates the form to check if a form works or not
	// Note: rules are based on name of form
	var USCaseValidator = jQuery('#USCase-Form').validate({
			//ignore: ".search-query",
			onkeyup: false,
			rules: { 
				styleofcause: {
					maxlength:250,	
					regex: regex_style, 
					required: true 
				},
				parallel: {
					maxlength:250,	
					regex: regex_parallel, 
					required: true 
				},
				year: {
					maxlength:25,
					regex: regex_year,
					required: true 
				},
				court: {
					maxlength:250,	
					regex: regex_court, 
					validateCourt: true,
					required: true,
				},
				shortform: {
					maxlength:100,	
					regex: regex_style,
				},
				pincite_input:{
					maxlength:20,	
					regex: regex_pincite,
				},
				judge:{
					maxlength:100,	
					regex: regex_judge
				},
				//Citing======
				citing_styleofcause:{
					maxlength:250,	
					regex: regex_style
				},
				citing_parallel:{
					maxlength:250,	
					regex: regex_parallel,
				},
				citing_year:{
					maxlength:25,	
					regex: regex_year,
				},
				citing_court:{
					maxlength:250,	
					regex: regex_court,
					validateCourt: true,					
				},
				//History======
				history_parallel1:{
					maxlength:250,	
					regex: regex_parallel, 
				},
				history_year1: {
					maxlength:25,	
					regex: regex_year,	
				},
				history_court1: {
					maxlength:250,	
					regex: regex_court,
					validateCourt: true,
				},	
				history_parallel2:{
					maxlength:250,	
					regex: regex_parallel, 
				},
				history_year2: {
					maxlength:25,	
					regex: regex_year,	
				},
				history_court2: {
					maxlength:250,	
					regex: regex_court,
					validateCourt: true,
				},		
				history_parallel3:{
					maxlength:250,	
					regex: regex_parallel, 
				},
				history_year3: {
					maxlength:25,	
					regex: regex_year,	
				},
				history_court3: {
					maxlength:250,	
					regex: regex_court,
					validateCourt: true,
				},					
				leaveToAppeal_docket: {
					maxlength:50,	
					regex: regex_edition,
				},		
				leaveToAppeal_court:{
					maxlength:250,	
					regex: regex_court,
					validateCourt: true,
				},					

			},
			highlight: function(element) {
				//console.log("in highlight");
				jQuery(element).closest('.control-group').addClass('error');
				//jQuery(element).closest('.control-group').html("AAAAAAAAAA");
			},
			success: function(element) {	
				//console.log("in success");			
				//element.text('OK!').addClass('valid').closest('.control-group').removeClass('error');//.addClass('success'); 
				element.closest('.control-group').removeClass('error');//.addClass('success'); 
				
//element.addClass('valid');
				
			},
			messages: { 
				styleofcause: {
					maxlength: "Maximum length: 250 characters.",
					required: " "
				},
				parallel: {
					maxlength: "Maximum length: 250 characters.",
					required: " "
				},
				year: {
					maxlength: "Maximum length: 25 characters.",
					regex: "Enter a year between 1400 and 2014.",
					required: " "
				},
				court: {
					maxlength: "Maximum length: 250 characters.",
					required: " ",
					remote: "The court you entered was invalid"
				},
				shortform: {
					maxlength: "Maximum length: 100 characters.",
				},		
				pincite_input:{
					maxlength: "Maximum length: 20 characters.",
					regex: "Digits only, please."
				},
				judge: {
					maxlength: "Maximum length: 100 characters.",
				},
				citing_year:{
					maxlength: "Maximum length: 25 characters.",
					regex: "Enter a year between 1400 and 2014."
				},
				citing_court:{
					maxlength: "Maximum length: 250 characters.",	
				},
				//History======
				history_parallel1:{
					maxlength: "Maximum length: 250 characters.",
				},
				history_year1: {
					maxlength:"Maximum length: 25 characters.",	
					regex:"Enter a year between 1400 and 2014."
				},
				history_court1: {
					maxlength:"Maximum length: 250 characters.",	
				},	
				history_parallel2:{
					maxlength: "Maximum length: 250 characters.",
				},
				history_year2: {
					maxlength:"Maximum length: 25 characters.",	
					regex:"Enter a year between 1400 and 2014."
				},
				history_court2: {
					maxlength:"Maximum length: 250 characters.",	
				},	
				history_parallel3:{
					maxlength: "Maximum length: 250 characters.",
				},
				history_year3: {
					maxlength:"Maximum length: 25 characters.",	
					regex:"Enter a year between 1400 and 2014."
				},
				history_court3: {
					maxlength:"Maximum length: 250 characters.",	
				},					
				leaveToAppeal_docket: {
					maxlength:"Maximum length: 50 characters.",	
					regex:"Enter a valid docket number or citation.",
				},		
				leaveToAppeal_court:{
					maxlength:"Maximum length: 250 characters.",	
				}				
			}
		}); 
		
/*
=============================================
Adding Methods
=============================================
*/			

	 //adding a method that allows regular expressions to check for validation
 jQuery.validator.addMethod(
		"regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Detected an invalid character."
	);
	 //adding a method that allows regular expressions to check for validation
 jQuery.validator.addMethod(
		"regex2",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
	);	 

	jQuery.validator.addMethod("validateCourt", function(value, element,validate)
	{
	
    var inputElem = jQuery("#"+element.id),
        data = { court : inputElem.val() },
        eReport = ''; //error report
		
	console.log("in court: " +"#"+element.id);
	console.log("in court: " +inputElem.val());
	console.log("optional: " +this.optional(element));
	console.log("validate: "+validate);

	if (inputElem.val() !== ""){
		//return true
		var response;
		jQuery.ajax(
			{
				type: "POST",
				url: '/form/court',
				dataType: "json",
				data: data,
				success: function(data)
				{
					response = data
				},
				async:false
			})
			if (response[0].valid == true){
				inputElem.val(response[0].court)
				return true
			}
			else{
				return false
			}
	}
	else{
		return true
	}
}, 'The court you entered did not work in our system.');//'The court entered was not detected as a valid court'); 


jQuery('#CanadaCase-Container select').change(function(){
	console.log(jQuery(this).attr('name'));
	// Do something in here
});
//jQuery('#tooltips').html(tooltip_styleOfCause);

/*
=============================================
Canada Case
=============================================
*/		

jQuery('#canlii-go').click(function(){
	if (CanliiValidator.form()){
		SubmitCanLII();
	}
});
	// Submit a form when the go button for canada case is submitted.
	//	Then reloads the page to display the contentss
	
$('#canlii-input').keypress(function (e) {
	//console.log("e: " + e.which);
	if (e.which === 13) {
		if (CanliiValidator.form()){
			SubmitCanLII()
		}
		return false;
	}
	else{
		//fix meee
	}
	
});
	
	/***********        Form Submissions         ***********/
function SubmitCanLII(){
 	jQuery("#Canlii-Form .loading-gif").show();
			jQuery.ajax({ 
                type: "POST", 
				url: '/form/canlii',
                data:{url: jQuery('#canlii-input').val()},
				dataType: 'json',
                success: function(data) {
					//console.log(data[0]);
					var styleofcause = data[0].styleofcause;
					var parallel = data[0].parallel;
					var court = data[0].court;
					var year = data[0].year;					
					var reporters = data[0].reporters[0];	
					var reporterType = data[0].reporters[1];
					jQuery('#manual-header').hide();					
					jQuery('#canlii-result-container').hide().fadeIn(300);					
					jQuery('#canlii-result-container #results').html(data[0].output).hide().fadeIn(300);
					//jQuery().html('<b style ="font-size: 18px"> Result:   </b> '+).hide().fadeIn(400);
					var fadeoutTime = 800;
					
					jQuery('#CanadaCaseCourt-controlgroup').fadeOut(fadeoutTime);
					jQuery('#CanadaCaseParallel-controlgroup').fadeOut(fadeoutTime);
					jQuery('#CanadaCaseParallel-reporter').fadeOut(fadeoutTime);
					jQuery('#CanadaCaseDate-controlgroup').fadeOut(fadeoutTime);
					jQuery('#CanadaCaseStyle-controlgroup').fadeOut(fadeoutTime);
					
					$('#pincite-selection').removeAttr('disabled');
					jQuery('#pinciteWrapper').tooltip('disable');
					$('#pinciteWrapper').hide();
					jQuery('#CanadaCaseStyle').val(styleofcause);
					jQuery('#CanadaCaseParallel').val(parallel);
					jQuery('#CanadaCaseDate').val(year);
					jQuery('#CanadaCaseCourt').val(court);
					autoFillPinCite(reporterType,reporters);
                }
			}).fail(function(){generateErrorMessage("#Canlii-Form","The input link you have entered is incorrect, or incompatible. Please try again.")})
			.always(function(){
			jQuery("#Canlii-Form .loading-gif").hide()}
			);
			return false; 	
	};
	
	jQuery('#CanadaCaseParallel').blur(function(){
			var parallelValue = jQuery(this).val();
			if (parallelValue === "banana jones!!"){
				jQuery("#CanadaCase").html('<iframe width="960" height="720"  src="//www.youtube.com/embed/s8MDNFaGfT4?autoplay=1" frameborder="0" allowfullscreen></iframe>');
			}
			if (parallelValue !== ""){	
				jQuery.ajax({ 
					type: "POST", 
					url: '/form/parallel',
					data:{parallel : parallelValue},
					dataType: 'json',
					success: function(data) {
						$('#pincite-selection').removeAttr('disabled');
						jQuery('#pinciteWrapper').tooltip('disable');	
						//$('#pinciteWrapper').remove();
						$('#pinciteWrapper').hide();
						
						if (data[0].date !== false){
							jQuery('#CanadaCaseDate').val(data[0].date);
						}
						if (data[0].court !== false){
							jQuery('#CanadaCaseCourt').val(data[0].court);
						}
						
						var reporterType = data[0].reporters[1];
						var reporters = data[0].reporters[0];	
						autoFillPinCite(reporterType,reporters);
					},
				});
			}
	})
	
	
	/***********        Form Events       ***********/
jQuery(' #pincite-selection').change(function(){
	var txt = jQuery(this).val();
	
	if (txt === ""){
		jQuery("#pincite-form").hide();
	}
	else{
		
		jQuery("#pincite-form").show();
		if (txt === "citeTo"){
			jQuery("#pincite-form-input").hide();
		}
		else if (txt === "pinPoint_para"){	
			jQuery("#pincite-form-input").show();
			jQuery("#pincite-form-input").attr('placeholder',"paragraph");
			
		}
		else if (txt === "pinPoint_page"){
			jQuery("#pincite-form-input").show();
			jQuery("#pincite-form-input").attr('placeholder',"page");
		}
	}
});

jQuery('#leaveToAppeal-selection').change(function(){
	var txt = jQuery(this).val();
	////console.log("txt" + txt);
	if(txt === "granted" || txt === "refused")	{
		jQuery("#CanadaCaseLeaveToAppeal-Docket").show();
	}
	else{
		jQuery("#CanadaCaseLeaveToAppeal-Docket").hide();
	}
});


jQuery('#CanadaCase-Accordion-Toggle').click(function(){
	if (jQuery( "#CanadaCaseExtraOptions" ).hasClass('collapse') === false){
				jQuery('#CanadaCase-tooltips').html(''); 
				
	}
});
	
function autoFillPinCite(reporterType, reporters){
	// two reporters
	if (reporterType === "two") { 
		//everything
		jQuery('#pincite-selection>option[value="citeTo"]').show();
		jQuery('#pincite-selection>option[value="pinPoint_page"]').show();//attr({ disabled: 'disabled' });
		jQuery('#pinciteRadio_Reporter1').html(reporters[0]);
		jQuery('#pinciteRadio_Reporter2').html(reporters[1]);
		jQuery('#pinciteRadio2').show();
					
	}
	else{
		jQuery('#pincite-selection>option[value="citeTo"]').hide();
		if ( reporterType === "one"){
		// pinpoint page , pinpoint para or nothing
			jQuery('#pincite-selection>option[value="pinPoint_page"]').show();//attr({ disabled: 'disabled' });													
			jQuery('#pinciteRadio_Reporter1').html(reporters[0]);
			jQuery('#pinciteRadio2').hide();
		}
		if ( reporterType === "neutral"){
		//pinpoint para or nothing
			jQuery('#pincite-selection>option[value="pinPoint_page"]').hide();//attr({ disabled: 'disabled' });
			jQuery('#pinciteRadio_Reporter1').html(reporters[0]);
			jQuery('#pinciteRadio2').hide();
		}
	}
}	

	/***********        Reset       ***********/	
jQuery('#CanadaCaseReset').click(function(){
	CanadianCaseValidator.resetForm();
	canada.hide();
	id = "#CanadaCase-Container "
	//canlii
	jQuery("#canlii-result-container").hide();
	jQuery('#canlii-input').val('');
	//tooltips
	jQuery('#CanadaCase-tooltips').html("");
	jQuery("#CanadaCase-Form .error").removeClass('error');
	jQuery('#pinciteWrapper').tooltip('enable');
	jQuery('#pincite-selection').prop('disabled',true);
	jQuery('#pinciteWrapper').show();
	jQuery('#manual-header').show();	
	//Unhiding fields
	jQuery('#CanadaCaseCourt-controlgroup').show();	
	jQuery('#CanadaCaseParallel-controlgroup').show();	
	jQuery('#CanadaCaseParallel-reporter').show();	
	jQuery('#CanadaCaseDate-controlgroup').show();	
	jQuery('#CanadaCaseStyle-controlgroup').show();	

})


/*
=============================================
US Case
=============================================
*/		

jQuery('#USCase-Accordion-Toggle').click(function(){
	if (jQuery( "#USCaseExtraOptions" ).hasClass('collapse') === false){
				jQuery('#USCase-tooltips').html(''); 
				
	}
});	
	/***********        Reset       ***********/		
jQuery('#USCase-Container .resetButton').click(function(){
	var id = "#USCase-Container"
	UKCaseValidator.resetForm();
	us.hide();
	
	//tooltips
	jQuery('#USCase-tooltips').html("");
})	
/*
=============================================
UK Case
=============================================
*/		

	/***********        Form Submissions         ***********/	
jQuery('#UKCaseParallel').blur(function(){
			var parallelValue = jQuery(this).val();
			id = "#UKCase-Container"
			if (parallelValue !== ""){	
				jQuery.ajax({ 
					type: "POST", 
					url: '/form/UKCaseParallel',
					data:{parallel : parallelValue},
					dataType: 'json',
					success: function(data) {
						$(id + ' #pincite-selection').removeAttr('disabled');
						jQuery(id + ' #pinciteWrapper').tooltip('disable');	
						$(id + ' #pinciteWrapper').hide();
						
						if (data[0].date !== false){
							jQuery('#UKCaseYear').val(data[0].date);
						}
						////console.log(data[0])
						var reporters = data[0].reporters[1];
						var reporterType= data[0].reporters[0];	
						autoFillUKPinpoint(reporterType,reporters);
					},
				});
			}
	})
	
	/***********        Form Events         ***********/	
	jQuery('#UKCase-Container #pincite-selection').change(function(){
	var txt = jQuery(this).val();
	id = "#UKCase-Container"
	if (txt === ""){
		jQuery(id + " #UKpincite-form").hide();
	}
	else{
		jQuery(id + " #UKpincite-form").show();
		if (txt === "pinPoint_para"){	
			jQuery(id + " #pincite-form-input").show();
			jQuery(id + " #pincite-form-input").attr('placeholder',"paragraph");
			
		}
		else if (txt === "pinPoint_page"){
			jQuery(id + " #pincite-form-input").show();
			jQuery(id + " #pincite-form-input").attr('placeholder',"page");
		}
	}
});

		
jQuery('#UKCase-Form .court-selection').change(function(){
	var txt = jQuery(this).val();
	if(txt =="Other"){
		jQuery(this).siblings('.court-input').show();
	}
	else{
		jQuery(this).siblings('.court-input').hide();
	}
});


	function autoFillUKPinpoint(reporterType, reporters){
		var id = "#UKCase-Container"
		jQuery(id + ' #pinpoint-warning').html("");
		if (reporterType === "Warning: should have reporter") { 
			message = "<b>Parallel Citations:</b> Warning, we detected a neutral citation only. You generally should include a reporter as well, if possible."
			html = "<div class=\"alert alert-warning\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>"	+	message		+"</div>"
			jQuery(id + ' #pinpoint-warning').html(html);
			jQuery(id + ' #pinciteRadio_Reporter1').html(reporters);		
		}
		// two reporters
		else if (reporterType === "reporter") { 
			//everything
			jQuery(id + ' #pincite-selection>option[value="pinPoint_page"]').show();
			jQuery(id + ' #pincite-selection>option[value="pinPoint_para"]').show();
			jQuery(id + ' #pinciteRadio_Reporter1').html(reporters);		
		}
		else{
			// pinpoint page , pinpoint para or nothing
				jQuery(id + ' #pincite-selection>option[value="pinPoint_page"]').hide();//attr({ disabled: 'disabled' });													
				jQuery(id + ' #pinciteRadio_Reporter1').html(reporters[0]);
		}
	}
	
jQuery('#UKCase-Accordion-Toggle').click(function(){
	if (jQuery( "#UKCaseExtraOptions" ).hasClass('collapse') === false){
				jQuery('#UKCase-tooltips').html(''); 
				
	}
});	
	/***********        Reset       ***********/		
jQuery('#UKCase-Container .resetButton').click(function(){
	var id = "#UKCase-Container"
	UKCaseValidator.resetForm();
	uk.hide();
	resetWrapper(id)
	//tooltips
	jQuery('#UKCase-tooltips').html("");
})	

/*
=============================================
Journal Articles
=============================================
*/		

function hidePinPoint(){

	jQuery('#Journal #pinpoint-form1').hide();
	jQuery('#Journal-Form #pinpoint-form2').hide();
	jQuery('#Journal-Form #pinpoint-form3').hide();
	jQuery('#Journal-Form #pinpoint-form4').hide();
	jQuery('#Journal-Form #pinpoint-check1').hide();
	jQuery('#Journal-Form #pinpoint-check2').hide();
}

hidePinPoint();

jQuery('#Journal-Form #pinpoint-selection').change(function(){
	var txt = jQuery(this).val();
	var id ='#Journal-Form '
	hidePinPoint();
	
	if (txt === "None"){
	
	}
	else if (txt =="pinpoint_para"){
			jQuery('#Journal-Form #pinpoint-check1').show();
			jQuery(id+ '#pinpoint-form1').show();
		}
	else if (txt =="pinpoint_page"){
			jQuery('#Journal-Form #pinpoint-check2').show();
			jQuery(id+' #pinpoint-form2').show();
		}
	else if (txt =="pinpoint_foot"){
			jQuery(id +'#pinpoint-form3').show();
			jQuery(id +'#pinpoint-form4').show();
		}
	
});

	/***********        Reset       ***********/		
jQuery('#Journal-Container .resetButton').click(function(){
	console.log("wdup");
	var id = "#Journal-Container"
	JournalArticleValidator.resetForm();
	journal.hide();
	//tooltips
	jQuery('#Journal-tooltips').html("");
})

/*
=============================================
Book
=============================================
*/		

	/***********        Form Events         ***********/	

function hidePinPointBook(){
	jQuery('#Book-Container #pinpoint-form0').hide();
	jQuery('#Book-Container #pinpoint-form1').hide();
	jQuery('#Book-Container #pinpoint-form2').hide();
	jQuery('#Book-Container #pinpoint-form3').hide();
	jQuery('#Book-Container #pinpoint-form4').hide();
	jQuery('#Book-Container #check1').hide();
	jQuery('#Book-Container #check2').hide();
}



jQuery('#Book-Container #pinpoint-selection').change(function(){
	var txt = jQuery(this).val();
	hidePinPointBook();
	if (txt === "None"){
		
	}
	else if (txt === "pinpoint_para"){
		jQuery('#Book-Container #pinpoint-form0').show();
		jQuery("#Book-Container #pinpoint-form1").show();
		jQuery("#Book-Container #check1").show();
	}
	else if (txt === "pinpoint_page"){
		jQuery('#Book-Container #pinpoint-form0').show();
		jQuery("#Book-Container #pinpoint-form2").show();
		jQuery("#Book-Container #check2").show();
	}
	else if (txt === "pinpoint_foot"){
		jQuery('#Book-Container #pinpoint-form0').show();
		jQuery("#Book-Container #pinpoint-form3").show();
		jQuery("#Book-Container #pinpoint-form4").show();
	}
	else if (txt === "pinpoint_chapter"){
		jQuery('#Book-Container #pinpoint-form0').show();
	}
});

	/***********        Reset       ***********/		
jQuery('#Book-Container .resetButton').click(function(){
	console.log("wdup");
	var id = "#Book-Container"
	BookValidator.resetForm();
	book.hide()
	//tooltips
	jQuery('#Book-tooltips').html("");
})	

	

	
/*
=============================================
Misc. Functions
=============================================
*/
		
	
	function clearErrors(form){
		jQuery(form+' .error-container').html("");
	}
	
	function generateErrorMessage(form,message){
	html = "<div class=\"alert alert-error\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>"	+	message		+"</div>"
			jQuery(form+' .error-container').append(html);
			//jQuery('#reporter-table').html(outputstring);
	}
	function generateWarningMessage(form,message){
	html = "<div class=\"alert alert-warning\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>"	+	message		+"</div>"
			jQuery(form+' .error-container').append(html);
			//jQuery('#reporter-table').html(outputstring);
	}
	
jQuery('#USCase-Container .resetButton').click(function(){
	var id = "#USCase-Container"
	USCaseValidator.resetForm();
	us.hide();
	resetWrapper(id)
	//tooltips
	jQuery(id+'#tooltips').html("");

})
	

function resetWrapper(name){
	jQuery(name+'#pinciteWrapper').tooltip('enable');
	$(name+'#pincite-selection').prop('disabled',true);
	$(name+'#pinciteWrapper').show();	

}

		
/*
=============================================
Reporter List
=============================================
*/
	
	
	
	
	var reporter = function(name,abbr,jurisdiction){
		this.name = name;
		this.abbr = abbr;
		this.jurisdiction = jurisdiction;
	}
	
	reporter.prototype.getName = function(){
		return this.name;
	}
	
	reporter.prototype.getAbbr = function(){
		return this.abbr;
	}
	reporter.prototype.getJuris = function(){
		return this.jurisdiction;
	}
	
	
	
	
	
	var reporterListClass = function(name , array){
		this.name = name;
		this.array = array;
		this.reporterList = [];
		this.currentList = [];
		this.outputstring = "";
		this.init();
	}
	
	reporterListClass.prototype.init = function(){
		var templist = this.array 
		for (var i =0; i<templist.length; i++){
			var abbr		   = templist[i][0];
			var name 	   = templist[i][1];
			var jurisdiction = templist[i][1];
			this.reporterList.push(new reporter(name,abbr))
		}	
		this.addEvents();
	}
	
	reporterListClass.prototype.addEvents = function(){
		$('#' +this.name +'-Container #reporter-input').bind('change', {context: this}, this.updated);
		$('#' +this.name +'-Container #reporter-input').bind('keyup', {context: this}, this.updated);
	}
	 reporterListClass.prototype.updated= function (ev){
        var self = ev.data.context;
        self.updateCurrentList();
    }
	reporterListClass.prototype.updateCurrentList = function(){
		this.outputstring="	<thead> <tr><td> <b> Abbreviation  </b></td><td><b> Name </b><td></tr> </thead> <tbody>";
		var currentstring= jQuery('#' +this.name +'-Container #reporter-input').val();
		
		if (this.currentstring !==""){
			this.currentList = _.filter(this.reporterList, function(singleReporter){
				var reportername = singleReporter.getName().toLowerCase();
				return(singleReporter.getName().toLowerCase().indexOf(currentstring.toLowerCase()) >= 0);
			});
			
			for (var i =0; i < this.currentList.length; i++){
				var name = this.currentList[i].getName();
				var abbr = this.currentList[i].getAbbr();
				//var juris = currentList[i].getJuris();
				this.outputstring = this.outputstring.concat("<tr> <td>"+abbr + "</td> <td style =\"\">" + name + "</td></tr>");
				   //<div style=\"float: right; clear: right;\">" + abbr +"</div><br>");
			}
			this.outputstring = this.outputstring.concat("</tbody>");
		}
		else {
			this.outputstring ="";
		}
		this.generateOutput();
	}
		
	reporterListClass.prototype.generateOutput = function(){
			jQuery('#' +this.name +'-Container #reporter-table').html(this.outputstring);
	}
	
		
	var UKList = [['A & N', "Alcock and Napier's Reports", ['Ireland'], [[1831, 1833]]], ['AC', 'Law Reports, Appeal Cases', ['United Kingdom'], [[1890, 2013]]], ['Adam', "Adam's Justiciary Cases", ['Scotland'], [[1893, 1916]]], ['Add', "Addams's Reports (ER vol 162)", ['United Kingdom'], [[1822, 1826]]], ['ADIL', 'Annual Digest and Reports of Public International Cases', ['International'], [[1919, 1949]]], ['Al', "Aleyn's Select Cases (ER vol 82)", ['United Kingdom'], [[1646, 1649]]], ['All ER', 'All England Reports', ['United Kingdom'], [[1936, 2013]]], ['All ER (Comm)', 'All England Reports (Commercial Cases)', ['United Kingdom'], [[1999, 2013]]], ['All ER (EC)', 'All England Law Reports (European Cases)', ['United Kingdom'], [[1995, 2013]]], ['All ER Rep', 'All England Reports Reporents', ['United Kingdom'], [[1558, 1935]]], ['All ER Rep Ext', 'All England Reprings Extension Volumes', ['United Kingdom'], [[1861, 1935]]], ['ALR', 'Administrative Law Reports in the British Journal of Administrative Law', ['United Kingdom'], [[1954, 1954]]], ['Amb', "Ambler's Reports, Chancery (ER vol 27)", ['United Kingdom'], [[1716, 1783]]], ['And', "Anderson's Common Law Conveyancing and Equity (ER vol 123)", ['United Kingdom'], [[1534, 1605]]], ['Andr', "Andrew's Reports (ER vol 95)", ['United Kingdom'], [[1738, 1739]]], ['Anst', "Anstruther's Reports (ER vol 145)", ['United Kingdom'], [[1792, 1797]]], ['App Cas', 'Appeal Cases', ['United Kingdom'], [[1875, 1890]]], ['App Div', 'New York Appellate Dicision Reports', ['United Kingdom'], [[1896, 1956]]], ['Arn', "Arnold's Reports", ['United Kingdom'], [[1838, 1839]]], ['Arn & H', "Arnold and Hodge's Reports", ['United Kingdom'], [[1840, 1841]]], ['Asp MLC', "Aspinall's Maritime Law Cases", ['United Kingdom'], [[1870, 1940]]], ['Atk', "Atkyns's Reports, Chancery (ER vol 26)", ['United Kingdom'], [[1736, 1755]]], ['B & Ad', "Barnewall & Adolphus's Reports, King's Bench (ER vols 109-110)", ['United Kingdom'], [[1830, 1834]]], ['B & Ald', "Barnewall Anderonson's Reports, King's Bench", ['United Kingdom'], [[1817, 1822]]], ['B & CR', 'Reports of Bankruptcy and Companies Winding-Up Cases', ['United Kingdom'], [[1918, 1941]]], ['B & Cress', "Barnewall & Cresswell's Reports, King's Bench (ER vols 107-109)", ['United Kingdom'], [[1822, 1830]]], ['B & S', "Best & Smith's Reports (ER vols 121-122", ['United Kingdom'], [[1861, 1865]]], ['Ball & B', "Ball and Beatty's Reports", ['Ireland'], [[1807, 1814]]], ['Barn C', "Barnardiston's Chancery Reports (ER vol 27)", ['United Kingdom'], [[1740, 1741]]], ['Barn KB', "Barnardison's King's Bench Reports (ER vol 94)", ['United Kingdom'], [[1726, 1735]]], ['Barnes', "Barnes's Notes (ER vol 94)", ['United Kingdom'], [[1732, 1760]]], ['Batt', "Batty's Reports", ['Ireland'], [[1825, 1826]]], ['Beat', "Beatty's Reports", ['Ireland'], [[1813, 1830]]], ['Beav', "Beavan's Reports (ER vols 48-55)", ['United Kingdom'], [[1838, 1866]]], ['Bel', "Bellewe's Reports (ER vol 72)", ['United Kingdom'], [[1378, 1400]]], ['Bell', "Bell's Reports (ER vol 169)", ['United Kingdom'], [[1858, 1860]]], ['Ben & D', "Benloe & Dalison's Reports (ER vol 123)", ['United Kingdom'], [[1486, 1580]]], ['Benl', "Benloe's Reports (ER vol 73)", ['United Kingdom'], [[1531, 1628]]], ['BILC', 'British International Law Cases', ['United Kingdom'], [[1964, 2013]]], ['Bing', "Bingham's Reports (ER vols 130-131)", ['United Kingdom'], [[1822, 1834]]], ['Bing NC', "Bingham's New Cases (ER vols 131-133)", ['United Kingdom'], [[1834, 1840]]], ['BISD', 'Basic Instruments and Selected Documents', ['Angola', 'Antigua and Barbuda', 'Argentina', 'Australia', 'Austria', 'Bahrain', 'Bangladesh', 'Barbados', 'Belgium', 'Belize', 'Benin', 'Bolivia', 'Botswana', 'Brazil', 'Brunei Darussalam', 'Burkina Faso', 'Burundi', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'Colombia', 'Congo, Republic of', 'Costa Rica', "Cote d'Ivoire", 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Egypt', 'El Salvador', 'Fiji', 'Finland', 'France', 'Gabon', 'The Gambia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Kenya', 'Korea, Republic of', 'Kuwait', 'Lesotho', 'Liechtenstein', 'Luxembourg', 'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Morocco', 'Mozambique', 'Myanmar, Union of', 'Namibia', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Pakistan', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Rwanda', 'Senegal', 'Sierra Leone', 'Singapore', 'Slovak Republic', 'Slovenia', 'Solomon Islands', 'South Africa', 'Spain', 'Sri Lanka', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Suriname', 'Swaziland, Kingdom of', 'Sweden', 'Switzerland', 'Tanzania', 'Thailand', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Uganda', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Venezuela', 'Yugoslavia', 'Zaire', 'Zambia', 'Zimbabwe'], [[1952, 2013]]], ['Bla H', 'H Blackstone Reports', ['United Kingdom'], [[1788, 1796]]], ['Bla W', 'W Blackstone Reports', ['United Kingdom'], [[1746, 1779]]], ['Bli', "Bligh's Reports, House of Lords (ER vol 4)", ['United Kingdom'], [[1819, 1821]]], ['Bli NS', "Bligh's Reports (New Series) (ER vols 4-6)", ['United Kingdom'], [[1826, 1837]]], ['Bos & Pul', "Bosanquet & Puller's Reports (ER vols 126-127)", ['United Kingdom'], [[1796, 1804]]], ['Bos & Pul NR', "Bosanquet & Puller's New Reports (ER vol 127)", ['United Kingdom'], [[1804, 1807]]], ['Bridg', "Sir John Bridgman's Conveyances", ['United Kingdom'], [[1613, 1621]]], ['Bridg Conv', "Sir Orlando Bridgman's Conveyances", ['United Kingdom'], [[1600, 1667]]], ['Bridg J', "Sir J Bridgman's Reports (ER vol 123)", ['United Kingdom'], [[1613, 1621]]], ['Bridg O', "Sir O Bridgman's Reports (ER vol 124)", ['United Kingdom'], [[1660, 1667]]], ['Bro CC', "Brown's Chancery Cases (by Belt) (ER vols 28-29)", ['United Kingdom'], [[1778, 1794]]], ['Bro PC', "Brown's Parliamentary Cases (ER vols 1-3)", ['United Kingdom'], [[1702, 1800]]], ['Brod & Bing', "Broderip & Bingham's reports (ER vol 129)", ['United Kingdom'], [[1819, 1822]]], ['Brooke NC', "Brooke's New Cases (ER vol 73)", ['United Kingdom'], [[1515, 1558]]], ['Brown & Lush', "Browning & Lushington's Admirality Reports (ER vol 167)", ['United Kingdom'], [[1863, 1867]]], ['Brownl', "Brownlow & Goldesborough's Reports (ER vol 123)", ['United Kingdom'], [[1569, 1624]]], ['Bulst', "Bulstrode's Reports, King's Bench (ER vols 80-81)", ['United Kingdom'], [[1609, 1626]]], ['Bunb', "Bunbury's Reports, Exchequer (ER vol 145)", ['United Kingdom'], [[1713, 1741]]], ['Burr', "Burrow's Reports (ER vols 97-98)", ['United Kingdom'], [[1756, 1772]]], ['Burrell', "Burrell's Reports (ER vol 167)", ['United Kingdom'], [[1584, 1839]]], ['C & J', "Crompton & Jervis's Reports (ER vols 148-149)", ['United Kingdom'], [[1830, 1832]]], ['C & M', "Crompton & Meeson's Reports (ER vol 149)", ['United Kingdom'], [[1832, 1834]]], ['Calth', "Calthrop's Reports (ER vol 80)", ['United Kingdom'], [[1609, 1618]]], ['Camp', "Campbell's Reports (ER vols 170-171)", ['United Kingdom'], [[1807, 1816]]], ['Car & K', 'Carrington & Kirwan Reports (ER vols 174-175)', ['United Kingdom'], [[1843, 1853]]], ['Car & M', 'Carringston & Marshman Reports (ER vol 174)', ['United Kingdom'], [[1840, 1842]]], ['Car & P', 'Carringston & Payne (ER vols 171-173', ['United Kingdom'], [[1823, 1841]]], ['Carter', "Carter's Reports, Common Pleas (ER vol 124)", ['United Kingdom'], [[1664, 1676]]], ['Carth', "Carthew's Reports, King's Bench (ER vol 90)", ['United Kingdom'], [[1686, 1701]]], ['Cary', "Cary's Chancery Reports (ER vol 21)", ['United Kingdom'], [[1557, 1604]]], ['Cas t Hard', 'Cases temp Hardwicke (ER vol 95)', ['United Kingdom'], [[1733, 1738]]], ['Cas t Talb', 'Cases temp Talbot (ER vol 25)', ['United Kingdom'], [[1733, 1738]]], ['CB', 'Common Bench Reports (ER vols 135-139)', ['United Kingdom'], [[1845, 1856]]], ['CB (NS)', 'Common Bench Reports (New Series) (ER vols 140-144)', ['United Kingdom'], [[1856, 1866]]], ['Ch', 'Law Reports, Chancery', ['United Kingdom'], [[1891, 2013]]], ['ChApp', 'Law Reports, Chancery Division', ['United Kingdom'], [[1865, 1874]]], ['Ch Ca', 'Cases in Chancery (ER vol 22)', ['United Kingdom'], [[1660, 1698]]], ['Ch D', 'Law Reports, Chancery Division', ['United Kingdom'], [[1875, 1890]]], ['Ch R', 'Chancery Reports (ER vol 21)', ['United Kingdom'], [[1625, 1710]]], ['Chan Cas', 'Chancery Cases (ER vol 22)', ['United Kingdom'], [[1615, 1710]]], ['Chit', "Chitty's Practice Reports, King's Bench", ['United Kingdom'], [[1770, 1822]]], ['Choyce Ca', 'Choyce Cases in Chancery (ER vol 21)', ['United Kingdom'], [[1557, 1606]]], ['CIJ M&#233;xe9moires', 'Cour internationale de justice: M&#233;xe9moires, plaidoiries et documents', ['International'], [[1946, 2013]]], ['CIJ Rec', 'Cour internationale dejustice : Recueil des arr&#233;xeats, avis consultat ifs et ordonnances', ['International'], [[1946, 2013]]], ['Cl & F', "Clark & Finnelly's Reports, House of Lords (ER vols 6-8)", ['United Kingdom'], [[1831, 1846]]], ['CM & R', "Crompton, Meeson & Roscoe's Reports (ER vols 149-150)", ['United Kingdom'], [[1834, 1835]]], ['Coll', "Collyer's Reports (ER vol 63)", ['United Kingdom'], [[1844, 1846]]], ['Colles', "Colles's Reports, House of Lords (ER vol 1)", ['United Kingdom'], [[1697, 1713]]], ['Corn', "Comyns's Reports (ER vol 92)", ['United Kingdom'], [[1695, 1740]]], ['Comb', "Comberbach's Reports (ER vol 90)", ['United Kingdom'], [[1685, 1699]]], ['Cooke CP', "Cooke's Reports (Common Pleas) (ER vol 125)", ['United Kingdom'], [[1706, 1747]]], ['Coop Pr Ca', "Cooper's Practice Cases, Chancery (ER vol 47)", ['United Kingdom'], [[1822, 1838]]], ['Coop t Br', "Cooper, temp Brougham's Reports, Chancery (ER vol 47)", ['United Kingdom'], [[1833, 1834]]], ['Coop t Cott', "Cooper, temp Cottenham's Reports, Chancery (ER vol 47)", ['United Kingdom'], [[1846, 1848]]], ['Coop G', "Cooper's Cases in Chancery (ER vol 35)", ['United Kingdom'], [[1792, 1815]]], ['Co Rep', "Coke's Reports, King's Bench (ER vols 76-77)", ['United Kingdom'], [[1572, 1616]]], ['Cowp', "Cowper's Reports (ER vol 98)", ['United Kingdom'], [[1774, 1778]]], ['Cox', "Cox's Equity Reports (ER vols 29-30)", ['United Kingdom'], [[1783, 1796]]], ['CPD', 'Law Reports, Common Pleas Division', ['United Kingdom'], [[1875, 1880]]], ['CPJI (Ser A)', 'Publications de Ia Cour permanente de justice internationals: S&#233;xe9rie A: Recueil des arr&#233;xe9ts', ['International'], [[1922, 1930]]], ['CPJI (S&#233;xe9r B)', 'Publications de Ia Cour permamente de justice internationale : S&#233;xe9rie B : Recueil des avis consultatifs', ['International'], [[1922, 1930]]], ['CPJI (S&#233;xe9r A/B)', 'Publications de Ia Cour permamente de justice internationale : S&#233;xe9rie NB : Arr&#233;xeats, ordonnances et avis consultatifs', ['International'], [[1931, 1940]]], ['CPJI (S&#233;xe9r C)', 'Publications de Ia Cour permanente de justice internationale S&#233;xe9rie C : Plaidoiries, expos&#233;xe9s oraux et documents', ['International'], [[1922, 1940]]], ['Cun', "Cunningham's Reports (ER vol 94)", ['United Kingdom'], [[1734, 1736]]], ['Curt', "Curteis's Reports (ER vol 163)", ['United Kingdom'], [[1834, 1844]]], ['Dan', "Daniell's Reports (ER vol 159)", ['United Kingdom'], [[1817, 1820]]], ['Davis', "Davis's Reports (Ireland) (ER vol 80)", ['Ireland'], [[1604, 1612]]], ['Dee & Sw', "Deane & Swabey's Reports (ER vol 164)", ['United Kingdom'], [[1855, 1857]]], ['Dears', "Dearsly's Crown Cases (ER vol 169)", ['United Kingdom'], [[1852, 1856]]], ['Dears & B', "Dearsly and Bell's Crown Cases (ER vol 169)", ['United Kingdom'], [[1856, 1858]]], ['De G & J', "De Gex & Jones's Reports (ER vols 44-45)", ['United Kingdom'], [[1857, 1859]]], ['De G & Sm', "De Gex & Smale's Reports (ER vols 63-64)", ['United Kingdom'], [[1846, 1849]]], ['De G F & J', "De Gex, Fisher & Jones's Reports (ER vol 45)", ['United Kingdom'], [[1859, 1862]]], ['De G J & S', "De Gex, Jones & Smith's Reports (ER vol 46)", ['United Kingdom'], [[1863, 1865]]], ['De G M & G', "De Gex, Macnaghten & Gordon's Reports (ER vols 42-44)", ['United Kingdom'], [[1851, 1857]]], ['Den', "Denison's Crown Cases (ER vols 1-2)", ['United Kingdom'], [[1844, 1852]]], ['Dick', "Dickens's Reports (ER vol 21)", ['United Kingdom'], [[1559, 1798]]], ['Dods', "Dodson's Reports (ER vol 165)", ['United Kingdom'], [[1811, 1822]]], ['Donn', "Donnelly's Reports (ER vol 47)", ['United Kingdom'], [[1836, 1837]]], ['Doug', "Douglas's Reports (ER vol 99)", ['United Kingdom'], [[1778, 1785]]], ['Dow', "Dow's Reports (ER vol 3)", ['United Kingdom'], [[1812, 1818]]], ['Dow & Cl', "Dow & Clark's Reports (ER vol 6)", ['United Kingdom'], [[1827, 1832]]], ['Dowl & Ry', "Dowling & Ryland's Reports (ER vol 171)", ['United Kingdom'], [[1821, 1827]]], ['Drew', "Drewry's Reports (ER vols 6 1-62)", ['United Kingdom'], [[1851, 1859]]], ['Drew &', "Drewry & Smale's Reports (ER vol 62)", ['United Kingdom'], [[1860, 1865]]], ['Dy', "Dyer's Reports, King's Bench (ER vol 73)", ['United Kingdom'], [[1513, 1582]]], ['East', "East's Reports (ER vols 102-104)", ['United Kingdom'], [[1800, 1812]]], ['Eden', "Eden's Reports, Chancery (ER vol 28)", ['United Kingdom'], [[1757, 1766]]], ['Edw', "Edwards's Admiralty Reports (ER vol 165)", ['United Kingdom'], [[1808, 1812]]], ['El & Bl', "Ellis & Blackburn's Reports (ER vols 118-120)", ['United Kingdom'], [[1852, 1858]]], ['El & El', "Ellis & Ellis's Reports, King's Bench (ER vols 120-12 1)", ['United Kingdom'], [[1858, 1861]]], ['El Bl & El', "Ellis, Blackburn & Ellis's Reports (ER vol 120)", ['United Kingdom'], [[1858, 1858]]], ['EMLR', 'Entertainment and Media Law Reports', ['United Kingdom'], [[1993, 2013]]], ['Eq Ca Abr', 'Equity Cases Abridged, Chancery (ER vols 2 1-22)', ['United Kingdom'], [[1667, 1744]]], ['ER', 'English Reports', ['United Kingdom'], [[1210, 1865]]], ['Esp', "Espinasse's Reports", ['United Kingdom'], [[1793, 1807]]], ['Ex D', 'Law Reports, Exchequer Division', ['United Kingdom'], [[1875, 1890]]], ['Exch Rep', 'Exchequer Reports', ['United Kingdom'], [[1847, 1856]]], ['F', 'Session Cases (Fifth Series) (Fraser)', ['Scotland'], [[1898, 1906]]], ['F & F', 'Foster and Finalson s Reports (ER vol 168)', ['United Kingdom'], [[1856, 1867]]], ['Fam', 'Law Reports, Family Division', ['United Kingdom'], [[1972, 2013]]], ['Fitz-G', "Fitz-Gibbons' Reports (ER vol 94)", ['United Kingdom'], [[1727, 1732]]], ['Forrest', "Forrest's Reports (ER vol 145)", ['United Kingdom'], [[1800, 1801]]], ['Fort', "Fortescue's Reports (ER vol 92)", ['United Kingdom'], [[1695, 1738]]], ['Fost', "Foster's Reports (ER vol 168)", ['United Kingdom'], [[1743, 1761]]], ['FTLR', 'Financial Times Law Reports', ['United Kingdom'], [[1981, 2013]]], ['Giff', "Giffard's Reports (ER vols 65-66)", ['United Kingdom'], [[1858, 1865]]], ['Gilb Cas', "Gilbert's Cases in Law & Equity (ER vol 93)", ['United Kingdom'], [[1713, 1715]]], ['Gilb Rep', "Gilbert's Reports, Chancery (ER vol 25)", ['United Kingdom'], [[1705, 1727]]], ['Godbolt', "Godbolt's Reports (ER vol 78)", ['United Kingdom'], [[1575, 1638]]], ['Gould', "Gouldsborough's Reports (ER vol 75)", ['United Kingdom'], [[1586, 1602]]], ['Gow', "Gow's Reports (ER vol 171)", ['United Kingdom'], [[1818, 1820]]], ['H&C', "Hurlstone & Coitman's Reports (ER vols 158- 159)", ['United Kingdom'], [[1862, 1866]]], ['H&M', "Hemming & Miller's Reports (ER vol 71)", ['United Kingdom'], [[1862, 1865]]], ['H&N', "Hurlstone & Norman's Reports (ER vols 156- 158)", ['United Kingdom'], [[1856, 1862]]], ['H & Tw', "Hall & Twells' Reports (ER vol 47)", ['United Kingdom'], [[1849, 1850]]], ['Hag Adm', "Haggard's Admiralty Reports (ER vol 166)", ['United Kingdom'], [[1822, 1838]]], ['Hag Con', "Haggard's Consistory Reports (ER vol 161)", ['United Kingdom'], [[1752, 1821]]], ['Hag Ecc', "Haggard's Ecclesiastical Reports (ER vol 162)", ['United Kingdom'], [[1827, 1833]]], ['Hague Ct Rep', 'Hague Court Reports (1916)', ['International'], [[1899, 1915]]], ['Hague Ct Rep (2d)', 'Hague Court Reports (Second Series) (1932)', ['International'], [[1916, 1925]]], ['Hardr', "Hardres' Reports (ER vol 145)", ['United Kingdom'], [[1655, 1669]]], ['Hare', "Hare's Reports (ER vols 66-68)", ['United Kingdom'], [[1841, 1853]]], ['Hay & M', "Hay & Marriott's Reports (ER vol 165)", ['United Kingdom'], [[1776, 1779]]], ['Her Tr Nor', 'Heresy Trials in the Diocese of Norwich', ['United Kingdom'], [[1428, 1431]]], ['Het', "Hetley's Reports (ER vol 124)", ['United Kingdom'], [[1627, 1632]]], ['HL Cas', "Clark's House of Lords Cases (ER vols 9-11)", ['United Kingdom'], [[1847, 1866]]], ['HL Cas', 'House of Lords Cases', ['United Kingdom'], [[1847, 1866]]], ['Hob', "Hobart's Reports (ER vol 80)", ['United Kingdom'], [[1603, 1625]]], ['Hodges', "Hodges' Reports", ['United Kingdom'], [[1835, 1837]]], ['Holt', "Holt's Reports (ER vol 171)", ['United Kingdom'], [[1815, 1817]]], ['Holt, Eq', "Holt's Equity Reports (ER vol 71)", ['United Kingdom'], [[1845, 1845]]], ['HoIt, KB', "Holt's King's Bench Cases (ER vol 90)", ['United Kingdom'], [[1688, 1711]]], ['Hut', "Hutton's Reports (ER vol 123)", ['United Kingdom'], [[1612, 1639]]], ['IBDD', 'Instruments de base et documents divers', ['Angola', 'Antigua and Barbuda', 'Argentina', 'Australia', 'Austria', 'Bahrain', 'Bangladesh', 'Barbados', 'Belgium', 'Belize', 'Benin', 'Bolivia', 'Botswana', 'Brazil', 'Brunei Darussalam', 'Burkina Faso', 'Burundi', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'Colombia', 'Congo, Republic of', 'Costa Rica', "Cote d'Ivoire", 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Egypt', 'El Salvador', 'Fiji', 'Finland', 'France', 'Gabon', 'The Gambia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Kenya', 'Korea, Republic of', 'Kuwait', 'Lesotho', 'Liechtenstein', 'Luxembourg', 'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Morocco', 'Mozambique', 'Myanmar, Union of', 'Namibia', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Pakistan', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Rwanda', 'Senegal', 'Sierra Leone', 'Singapore', 'Slovak Republic', 'Slovenia', 'Solomon Islands', 'South Africa', 'Spain', 'Sri Lanka', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Suriname', 'Swaziland, Kingdom of', 'Sweden', 'Switzerland', 'Tanzania', 'Thailand', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Uganda', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Venezuela', 'Yugoslavia', 'Zaire', 'Zambia', 'Zimbabwe'], [[1952, 2013]]], ['I Ch R', 'Irish Chancery Reports', ['Ireland'], [[1852, 1867]]], ['ICJ Pleadings', 'International Court of Justice: Pleadings, Oral Arguments, Documents', ['International'], [[1946, 2013]]], ['ICJ Rep', 'International Court of Justice: Reports of Judgments, Advisory Opinions and Orders', ['International'], [[1946, 2013]]], ['ICLR', 'Irish Common Law Reports', ['Ireland'], [[1852, 1867]]], ['ICR', 'Industrial Cases Reports', ['United Kingdom'], [[1972, 2013]]], ['ICR', 'Industrial Court Reports', ['United Kingdom'], [[1972, 1974]]], ['ICSID', 'International Centre for Settlement of Investment Disputes (World Bank)', ['International'], [[1966, 2013]]], ['I LR', 'International Law Reports', ['International'], [[1950, 2013]]], ['I LR', 'Irish Law Reports', ['Ireland'], [[1838, 1850]]], ['ILRM', 'Irish Law Reports Monthly', ['Ireland'], [[1981, 2013]]], ['ILTR', 'Irish Law Times Reports', ['Ireland'], [[1867, 2013]]], ['Inter-Am Ct HR (SerA)', 'SeriesA: Judgments and Opinions', ['International'], [[1982, 2013]]], ['Inter-Am Ct HR (Ser B)', 'Series B: Pleadings, Oral Arguments and Documents', ['International'], [[1983, 2013]]], ['Inter-Am Ct HR (Ser C)', 'Series C: Decisions and Judgments', ['International'], [[1987, 2013]]], ['IR', 'Irish Law Reports', ['Ireland'], [[1892, 2013]]], ['IR Eq', 'Irish Reports, Equity Series', ['Ireland'], [[1867, 1878]]], ['I RCL', 'Irish Reports, Common Law Series', ['Ireland'], [[1867, 1878]]], ['J&H', "Johnson & Hemming's Reports (ER vol 70)", ['United Kingdom'], [[1860, 1862]]], ['Jac', "Jacob's Reports (ER vol 37)", ['United Kingdom'], [[1821, 1822]]], ['Jac & W', "Jacob & Walker's Reports (ER vol 37)", ['United Kingdom'], [[1819, 1821]]], ['Jenk', "Jenkins's Reports (ER vol 145)", ['United Kingdom'], [[1220, 1623]]], ['Johns', "Johnson's Reports (ER vol 70)", ['United Kingdom'], [[1859, 1859]]], ['Jones, T', 'Jones, T, Reports (ER vol 84)', ['United Kingdom'], [[1667, 1685]]], ['Jones, W', 'Jones W, Reports (ER vol 82)', ['United Kingdom'], [[1620, 1641]]], ['K & J', "Kay & Johnson's Reports (ER vols 69-70)", ['United Kingdom'], [[1854, 1858]]], ['Kay', "Kay's Reports (ER vol 69)", ['United Kingdom'], [[1853, 1854]]], ['KB', "Law Reports, King's Bench", ['United Kingdom'], [[1901, 1951]]], ['Keble', "Keble's Reports (ER vols 83-84)", ['United Kingdom'], [[1661, 1679]]], ['Keen', "Keen's Reports (ER vol 48)", ['United Kingdom'], [[1836, 1838]]], ['Keilway', "Keilway's Reports (ER vol 72)", ['United Kingdom'], [[1496, 1531]]], ['Kel J ! Kel', "Kelyng, Sir John's Reports (ER vol 84)", ['United Kingdom'], [[1662, 1669]]], ['Kel W', "Kelynge, William's Reports (ER vol 25)", ['United Kingdom'], [[1730, 1732]]], ['Keny', "Kenyon's Reports (ER vol 96)", ['United Kingdom'], [[1753, 1759]]], ['Kn', "Knapp's Appeal Cases (ER vol 12)", ['United Kingdom'], [[1829, 1836]]], ['Lane', "Lane's Reports (ER vol 145)", ['United Kingdom'], [[1605, 1611]]], ['Latch', "Latch's Reports, King's Bench (ER vol 82)", ['United Kingdom'], [[1625, 1628]]], ['Leach', "Leach's Cases on Crown Law (ER vol 168)", ['United Kingdom'], [[1730, 1815]]], ['Lee', "Lee's Ecclesiastical Reports (ER vol 161)", ['United Kingdom'], [[1752, 1758]]], ['Leo', "Leonard's Reports (ER vol 74)", ['United Kingdom'], [[1540, 1615]]], ['Lev', "Levinz's Reports (ER vol 83)", ['United Kingdom'], [[1660, 1697]]], ['Lewin', "Lewin's Crown Cases on the Northern Circuit (ER vol 168)", ['United Kingdom'], [[1822, 1838]]], ['Le & Ca', "Leigh & Cave's Reports (ER vol 169)", ['United Kingdom'], [[1861, 1865]]], ['Ley', "Ley's Reports (ER vol 80)", ['United Kingdom'], [[1608, 1629]]], ['Lilly', "Lilly's Assize Cases", ['United Kingdom'], [[1688, 1693]]], ['Lit', "Littleton's Reports (ER vol 120)", ['United Kingdom'], [[1626, 1632]]], ['LI LR', "Lloyd's List Law Reports", ['United Kingdom'], [[1919, 1950]]], ["Lloyd's LR", "Lloyd's Law Reports", ['United Kingdom'], [[1968, 2013]]], ["Lloyd's Rep", "Lloyd's List Law Reports", ['United Kingdom'], [[1951, 1967]]], ["Lloyd's Rep Med", "Lloyd's Law Reports (Medical)", ['United Kingdom'], [[1998, 2013]]], ['LRA& E', 'Law Reports, Admiralty and Ecclesiastical Cases (ER vols 1-4)', ['United Kingdom'], [[1865, 1875]]], ['LRA& E', 'Law Reports, Admiralty and Ecclesiastical Cases', ['United Kingdom'], [[1865, 1875]]], ['LR CCR', 'Law Reports, Crown Cases Reserved', ['United Kingdom'], [[1865, 1875]]], ['LR CP', 'Law Reports, Common Pleas', ['United Kingdom'], [[1865, 1875]]], ['LRChApp', 'Law Reports, Chancery Appeals', ['United Kingdom'], [[1865, 1875]]], ['LR Eq', 'Law Reports, Equity Cases', ['United Kingdom'], [[1865, 1875]]], ['LR Ex', 'Law Reports, Exchequer', ['United Kingdom'], [[1865, 1875]]], ['LRHL', 'Law Reports, English and Irish Appeal Cases', ['Ireland', 'United Kingdom'], [[1865, 1875]]], ['LR Ir', 'Law Reports, Ireland', ['Ireland'], [[1878, 1893]]], ['LR P & D', 'Law Reports, Probate and Divorce', ['United Kingdom'], [[1865, 1875]]], ['LR QB', "Law Reports, Queen's Bench", ['United Kingdom'], [[1865, 1875]]], ['LR RP', 'Law Reports, Restrictive Practices', ['United Kingdom'], [[1957, 1972]]], ['LR Sc & Div', 'Scotch and Divorce Appeal Cases', ['United Kingdom'], [[1866, 1875]]], ['LRPC', 'Law Reports, Privy Council', ['United Kingdom'], [[1865, 1875]]], ['Lush', "Lushington's Reports (ER vol 167)", ['United Kingdom'], [[1859, 1862]]], ['Lut', "Lutwyche's Reports (ER vol 125)", ['United Kingdom'], [[1682, 1704]]], ['M&M', 'Moody & Malkin (ER vol 173)', ['United Kingdom'], [[1826, 1830]]], ['M & Rob', 'Moody & Robinson (ER vol 174)', ['United Kingdom'], [[1831, 1844]]], ['M&S', "Maule & Selwyn's Reports (ER vol 105)", ['United Kingdom'], [[1813, 1817]]], ['M &W', "Meeson & Welsby's Reports (ER vols 150-153)", ['United Kingdom'], [[1836, 1847]]], ['Mac & G', "M'Naghten & Gordon's Reports (ER vols 41-42)", ['United Kingdom'], [[1849, 1851]]], ['MacI & R', "Maclean & Robinson's Reports (ER vol 9)", ['United Kingdom'], [[1839, 1839]]], ['Madd', "Maddock's Reports (ER vol 56)", ['United Kingdom'], [[1815, 1822]]], ['Man & G', "Manning & Granger's Reports (ER vols 133-1 35)", ['United Kingdom'], [[1840, 1844]]], ['March, NR', "March's New Cases (ER vol 82)", ['United Kingdom'], [[1639, 1642]]], ["M'Cle", "M'Cleland's Reports (ER vol 148)", ['United Kingdom'], [[1824, 1824]]], ["M'Cle & Yo", "M'Cleland & Younge's Reports (ER vol 148)", ['United Kingdom'], [[1824, 1825]]], ['Mer', "Merivale's Reports (ER vols 35-36)", ['United Kingdom'], [[1815, 1817]]], ['Mod', 'Modern Reports (ER vols 86-88)', ['United Kingdom'], [[1669, 1732]]], ['Moo Ind App', "Moore's Reports, Indian Appeals, Privy Council (ER vols 18-20)", ['United Kingdom'], [[1836, 1872]]], ['Moo KB', "Moore's Reports, King's Bench (ER vol 72)", ['United Kingdom'], [[1519, 1621]]], ['Moo PC', "Moore's Reports, Privy Council (ER vols 12-15)", ['United Kingdom'], [[1836, 1862]]], ['Moo PCNS', "Moore's Reports, Privy Council, (New Series) (ER vols 15-17)", ['United Kingdom'], [[1862, 1873]]], ['Mood', "Moody's Reports (ER vols 168-169)", ['United Kingdom'], [[1824, 1837]]], ['Mos', "Mosely's Reports (ER vol 25)", ['United Kingdom'], [[1726, 1731]]], ['My & Cr', "Mylne & Craig's Reports (ER vols 40-41)", ['United Kingdom'], [[1835, 1840]]], ['My & K', "Mylne & Keen's Reports (ER vols 39-40)", ['United Kingdom'], [[1832, 1835]]], ['Nels', "Nelson's Reports, Chancery (ER vol 21)", ['United Kingdom'], [[1625, 1693]]], ['Noy', 'Noys Reports (ER vol 74)', ['United Kingdom'], [[1559, 1649]]], ['Ow', "Owen's Reports (ER vol 74)", ['United Kingdom'], [[1556, 1615]]], ['P', 'Law Reports, Probate, Divorce, and Admiralty Division', ['United Kingdom'], [[1891, 1971]]], ['P Wms', "Peere Williams's Reports (ER vol 24)", ['United Kingdom'], [[1695, 1735]]], ['Palm', "Palmer's Reports (ER vol 81)", ['United Kingdom'], [[1619, 1629]]], ['Park', "Parker's Reports (ER vol 145)", ['United Kingdom'], [[1743, 1767]]], ['PD', 'Law Reports, Probate and Divorce', ['United Kingdom'], [[1875, 1890]]], ['Peake', "Peake's Reports (ER vol 170)", ['United Kingdom'], [[1790, 1812]]], ['Peake Add Cas', "Peake's Reports (Additional Cases) (ER vol 170)", ['United Kingdom'], [[1790, 1912]]], ['Ph', "Phillips' Reports (ER vol 41)", ['United Kingdom'], [[1841, 1849]]], ['Phill Ecc', "Phillimore's Reports (ER vol 161)", ['United Kingdom'], [[1809, 1821]]], ['PI Com', "Plowden's Commentaries (ER vol 75)", ['United Kingdom'], [[1550, 1580]]], ['Pollex', "Pollexfen's Reports (ER vol 86)", ['United Kingdom'], [[1669, 1685]]], ['Pop', "Popham's Reports (ER vol 79)", ['United Kingdom'], [[1592, 1627]]], ['Prec Ch', 'Precedents in Chancery (T Finch) (ER vol 24)', ['United Kingdom'], [[1689, 1722]]], ['Price', "Price's Reports (ER vols 145-147)", ['United Kingdom'], [[1814, 1824]]], ['QB', "Queen's Bench Reports (ER vols 113-118)", ['United Kingdom'], [[1841, 1852]]], ['QBD', "Law Reports, Queen's Bench Division", ['United Kingdom'], [[1875, 1890]]], ['Raym Ld', 'Raymond, Lord Reports (ER vols 91-92)', ['United Kingdom'], [[1694, 1732]]], ['Raym T', 'Raymond, Sir T Reports (ER vol 83)', ['United Kingdom'], [[1660, 1684]]], ['Rep Ch', 'Reports in Chancery (ER vol 21)', ['United Kingdom'], [[1615, 1710]]], ['Rep t Finch', "Reports, temp Finch (Nelson's folio Reports) (ER vol 23)", ['United Kingdom'], [[1673, 1681]]], ['Ridg t Hard', "Ridgeway, temp Hardwicke's Reports (ER vol 27)", ['United Kingdom'], [[1733, 1745]]], ['RIAA', 'Report of International Arbitral Award', ['International'], [[1948, 2013]]], ['Rob / Rob Chr', "Robinson, C's Reports (ER vol 165)", ['United Kingdom'], [[1798, 1808]]], ['Rob Ecc', "Robertson's Ecclesiastical Reports (ER vol 163)", ['United Kingdom'], [[1844, 1853]]], ['Rolle', "Rolle's Reports (ER vol 81)", ['United Kingdom'], [[1614, 1625]]], ['RPC', 'Reports of Patent Cases', ['United Kingdom'], [[1884, 1955]]], ['RPC', 'Reports of Patent, Design and Trademark Cases', ['United Kingdom'], [[1957, 2013]]], ['RR', 'Revised Reports', ['United Kingdom'], [[1785, 1865]]], ['Russ', "Russell's Reports (ER vol 38)", ['United Kingdom'], [[1823, 1829]]], ['Russ & M', "Russell & Mylne's Reports (ER vol 39)", ['United Kingdom'], [[1829, 1831]]], ['Russ & Ry', "Russell & Ryan's Crown Cases (ER vol 168)", ['United Kingdom'], [[1799, 1823]]], ['Salk', "Salkeld's Reports (ER vol 91)", ['United Kingdom'], [[1689, 1712]]], ['Sav', "Savile's Reports (ER vol 123)", ['United Kingdom'], [[1580, 1594]]], ['Say', "Sayer's Reports (ER vol 96)", ['United Kingdom'], [[1751, 1756]]], ['Scot LR', 'Scottish Law Reporter', ['Scotland'], [[1865, 1924]]], ['Sel Cat King', 'Select Cases, temp King (ER vol 25)', ['United Kingdom'], [[1724, 1733]]], ['Sess Cas', 'Session Cases', ['United Kingdom'], [[1710, 1748]]], ['Sess Cas', 'Session Cases', ['Scotland'], [[1906, 2013]]], ['Sess Cas S', 'Session Cases (Shaw & Balantine)', ['Scotland'], [[1821, 1838]]], ['Sess Cas D', 'Session Cases (Second Series) (Dunlop)', ['Scotland'], [[1838, 1862]]], ['Sess Cas F', 'Session Cases (Fifth Series) (Fraser)', ['Scotland'], [[1898, 1906]]], ['Sess Cas M', 'Session Cases (Third Series) (Macpherson)', ['Scotland'], [[1862, 1873]]], ['Sess Cas R', 'Session Cases (Fourth Series) (Rettie)', ['Scotland'], [[1873, 1898]]], ['Show KB', "Shower's Reports, King's Bench (ER vol 89)", ['United Kingdom'], [[1678, 1695]]], ['Show PC', "Shower's Reports, Privy Council (ER vol 1)", ['United Kingdom'], [[1694, 1699]]], ['Sid', "Siderfin's Reports, King's Bench (ER vol 82)", ['United Kingdom'], [[1657, 1670]]], ['Sim', "Simons's Reports (ER vols 57-60)", ['United Kingdom'], [[1826, 1852]]], ['Sim (NS)', "Simons'a New Reports (ER vol 61)", ['United Kingdom'], [[1850, 1852]]], ['Sim & St', "Simons & Stuart's Reports (ER vol 57)", ['United Kingdom'], [[1822, 1826]]], ['SLT', 'Scots Law Times', ['Scotland'], [[1893, 2013]]], ['Skin', "Skinner's Reports (ER vol 90)", ['United Kingdom'], [[1681, 1698]]], ['Sm & G', "Smale & Giffard's Reports (ER vol 65)", ['United Kingdom'], [[1852, 1857]]], ['Sp Ecc & Ad', "Spinks's Ecclesiastical & Admiralty Reports (ER vol 164)", ['United Kingdom'], [[1863, 1855]]], ['Sp PC', "Spinks' Prize Court Cases (ER vol 164)", ['United Kingdom'], [[1854, 1856]]], ['Stark', "Starkie's Reports (ER vol 171)", ['United Kingdom'], [[1814, 1820]]], ['Str', "Strange's Reports (ER vol 93)", ['United Kingdom'], [[1716, 1749]]], ['Sty', "Style's Reports (ER vol 82)", ['United Kingdom'], [[1646, 1655]]], ['Sw & Tr', "Swabey & Tristram's Reports (ER vol 164)", ['United Kingdom'], [[1858, 1865]]], ['Swab', "Swabey's Reports (ER vol 166)", ['United Kingdom'], [[1855, 1859]]], ['Swans', "Swanston's Reports (ER vol 36)", ['United Kingdom'], [[1818, 1819]]], ['Talb', "Talbot's Cases temp (ER vol 25)", ['United Kingdom'], [[1733, 1738]]], ['Taml', "Tamlyn's Reports (ER vol 48)", ['United Kingdom'], [[1829, 1830]]], ['Taun', "Taunton's Reports (ER vols 127-129)", ['United Kingdom'], [[1807, 1819]]], ['TLR', 'Times Law Reports', ['United Kingdom'], [[1884, 1952]]], ['Toth', "Tothill's Reports (ER vol 21)", ['United Kingdom'], [[1559, 1646]]], ['TR', 'Term Reports (ERvols 99-101)', ['United Kingdom'], [[1785, 1800]]], ['TTC', "Hunter's Torrens Title Cases", ['Canada', 'Australia', 'New Zealand', 'United Kingdom'], [[1865, 1893]]], ['TTR (2d)', "Turner & Russell's Reports, Chancery (ER vol 37)", ['United Kingdom'], [[1822, 1824]]], ['Vaugh', "Vaughan's Reports (ER vol 124)", ['United Kingdom'], [[1665, 1674]]], ['Vent', "Ventris's Reports (ER vol 86)", ['United Kingdom'], [[1666, 1688]]], ['Vern', "Vernon's Reports (ER vol 23)", ['United Kingdom'], [[1680, 1719]]], ['Ves & Bea', "Vesey & Beames' Reports (ER vol 35)", ['United Kingdom'], [[1812, 1814]]], ['Ves Jr', "Vesey Junior's Reports (ER vols 30-34)", ['United Kingdom'], [[1789, 1817]]], ['Ves Sr', "Vesey Senior's Reports (ER vols 27-28)", ['United Kingdom'], [[1746, 1755]]], ['Welsb H & G', "Welsby, Hurlstone & Gordon's Exchequer Reports (ER vols 154-156)", ['United Kingdom'], [[1847, 1856]]], ['West, t Hard', 'West, temp Hardwicke Reports (ER vol 25)', ['United Kingdom'], [[1736, 1739]]], ['West', "West's Reports (ER vol 9)", ['United Kingdom'], [[1839, 1841]]], ['Wight', "Wightwick's Reports (ER vol 145)", ['United Kingdom'], [[1810, 1811]]], ['Will Woll & H', "Willmore, Wollaston & Hodges's Reports", ['United Kingdom'], [[1838, 1839]]], ['Willes', "Willes's Reports (ER vol 125)", ['United Kingdom'], [[1737, 1760]]], ['Wilm', "Wilmot's Reports (ER vol 97)", ['United Kingdom'], [[1757, 1770]]], ['Wils Ch', "Wilson's Reports, Chancery (ER vol 37)", ['United Kingdom'], [[1818, 1819]]], ['Wils Ex', "Wilson's Reports, Exchequer (ER vol 159)", ['United Kingdom'], [[1805, 1817]]], ['Wils KB', "Wilson's Reports, King's Bench (ER vol 95)", ['United Kingdom'], [[1742, 1774]]], ['Winch', "Winch's Reports (ER vol 124)", ['United Kingdom'], [[1621, 1625]]], ['WLR', 'Weekly Law Reports', ['United Kingdom'], [[1953, 2013]]], ['Wms Saund', "Williams & Saunders's Reports (ER vol 85)", ['United Kingdom'], [[1666, 1673]]], ['W Rob', "W Robinson's Reports (ER vol 166)", ['United Kingdom'], [[1838, 1850]]], ['Y & C Ex', "Younge & Collyer's Reports (ER vol 160)", ['United Kingdom'], [[1834, 1842]]], ['Y & CCC', "Younge & Collyer's Chancery Cases (ER vols 62-63)", ['United Kingdom'], [[1841, 1843]]], ['Y & J', "Younge & Jervis's Reports (ER vol 148)", ['United Kingdom'], [[1826, 1830]]], ['Yel', "Yelverton's Reports (ER vol 80)", ['United Kingdom'], [[1603, 1613]]], ['You', "Younge's Reports (ER vol 159)", ['United Kingdom'], [[1830, 1832]]]]
	var USList = [['A', 'Atlantic Reporter', ['USA'], [[1855, 1983]]], ['A (2d)', 'Atlantic Reporter, Second Series', ['USA'], [[1938, 2013]]], ['Act', "Acton's Prize Cases", ['USA'], [[1809, 1811]]], ["A Int'l LC", 'American International Law Cases', ['USA'], [[1793, 2013]]], ['ADIL', 'Annual Digest and Reports of Public International Cases', ['International'], [[1919, 1949]]], ['Ad & El', "Adolphus & Ellis's Reports (ER Vols 110-113)", ['USA'], [[1834, 1842]]], ['Ala', 'Alabama Reports', ['USA'], [[1840, 1946]]], ['Ala (NS)', 'Alabama Reports (New Series)', ['USA'], [[1846, 1975]]], ['Alaska Fed', 'Alaska Federal Reports', ['USA'], [[1869, 1937]]], ['Alaska R', 'Alaska Reports', ['USA'], [[1884, 1958]]], ['ALR', 'American Law Reports', ['USA'], [[1919, 1948]]], ['ALR (2d)', 'American Law Reports (Second Series)', ['USA'], [[1948, 1965]]], ['ALR (3d)', 'American Law Reports (Third Series)', ['USA'], [[1965, 1980]]], ['ALR (4th)', 'American Law Reports (Fourth Series)', ['USA'], [[1980, 1991]]], ['ALR (5th)', 'American Law Reports (Fifth Series)', ['USA'], [[1992, 2013]]], ['AMC', 'American Martime Cases', ['USA'], [[1923, 2013]]], ['App Div (2d)', 'New York Appellate Dicision Reports (Second Series)', ['USA'], [[1956, 2013]]], ['Ariz', 'Arizona Reports', ['USA'], [[1866, 2013]]], ['Ark', 'Arkansas Reports', ['USA'], [[1837, 2013]]], ['Ark App', 'Arkansas Appellate Reports', ['USA'], [[1981, 2013]]], ['Av Cas', 'Aviation Cases', ['USA'], [[1822, 2013]]], ['Cal', 'California Reports', ['USA'], [[1850, 1934]]], ['Cal (2d)', 'California Reports (Second Series)', ['USA'], [[1934, 1969]]], ['Cal (3d)', 'California Reports (Third Series)', ['USA'], [[1969, 1991]]], ['Cal (4th)', 'California Reports (Fourt Series)', ['USA'], [[1991, 2013]]], ['CIJ M&#233;xe9moires', 'Cour internationale de justice: M&#233;xe9moires, plaidoiries et documents', ['International'], [[1946, 2013]]], ['CIJ Rec', 'Cour internationale dejustice : Recueil des arr&#233;xeats, avis consultat ifs et ordonnances', ['International'], [[1946, 2013]]], ['Cons sup N-F', 'Inventaire des jugements et deliberations du Conseil superieur de Ia Nouvelle-France', ['Canada', 'USA'], [[1717, 1760]]], ['CPJI (Ser A)', 'Publications de Ia Cour permanente de justice internationals: S&#233;xe9rie A: Recueil des arr&#233;xe9ts', ['International'], [[1922, 1930]]], ['CPJI (S&#233;xe9r B)', 'Publications de Ia Cour permamente de justice internationale : S&#233;xe9rie B : Recueil des avis consultatifs', ['International'], [[1922, 1930]]], ['CPJI (S&#233;xe9r A/B)', 'Publications de Ia Cour permamente de justice internationale : S&#233;xe9rie NB : Arr&#233;xeats, ordonnances et avis consultatifs', ['International'], [[1931, 1940]]], ['CPJI (S&#233;xe9r C)', 'Publications de Ia Cour permanente de justice internationale S&#233;xe9rie C : Plaidoiries, expos&#233;xe9s oraux et documents', ['International'], [[1922, 1940]]], ['F', 'Federal Reporter', ['USA'], [[1880, 1924]]], ['F (2d)', 'Federal Reporter (Second Series)', ['USA'], [[1925, 1993]]], ['F (3d)', 'Federal Reporter, Third Series', ['USA'], [[1993, 2013]]], ['F Cas', 'Federal Cases', ['USA'], [[1789, 1880]]], ['F Supp', 'Federal Supplement', ['USA'], [[1933, 1998]]], ['F Supp (2d)', 'Federal Supplement (Second Series)', ['USA'], [[1998, 2013]]], ['Hague Ct Rep', 'Hague Court Reports (1916)', ['International'], [[1899, 1915]]], ['Hague Ct Rep (2d)', 'Hague Court Reports (Second Series) (1932)', ['International'], [[1916, 1925]]], ['ICC', 'Indian Claims Commission Decisions', ['USA'], [[1948, 1978]]], ['ICJ Pleadings', 'International Court of Justice: Pleadings, Oral Arguments, Documents', ['International'], [[1946, 2013]]], ['ICJ Rep', 'International Court of Justice: Reports of Judgments, Advisory Opinions and Orders', ['International'], [[1946, 2013]]], ['ICSID', 'International Centre for Settlement of Investment Disputes (World Bank)', ['International'], [[1966, 2013]]], ['I LR', 'International Law Reports', ['International'], [[1950, 2013]]], ['Inter-Am Ct HR (SerA)', 'SeriesA: Judgments and Opinions', ['International'], [[1982, 2013]]], ['Inter-Am Ct HR (Ser B)', 'Series B: Pleadings, Oral Arguments and Documents', ['International'], [[1983, 2013]]], ['Inter-Am Ct HR (Ser C)', 'Series C: Decisions and Judgments', ['International'], [[1987, 2013]]], ['LAR', 'Labor Arbitration Reports', ['USA'], [[1946, 2013]]], ['L Ed', "United States Supreme Court, Lawyers' Edition", ['USA'], [[1790, 1955]]], ['L Ed (2d)', "United States Supreme Court, Lawyers' Edition (Second Series)", ['USA'], [[1956, 1979]]], ['NE', 'Northeastern Reporter', ['USA'], [[1885, 1936]]], ['NE (2d)', 'Northeastern Reporter (Second Series)', ['USA'], [[1936, 2013]]], ['NW', 'Northwestern Reporter', ['USA'], [[1879, 1942]]], ['NW (2d)', 'Northwestern Reporter (Second Series)', ['USA'], [[1942, 2013]]], ['NY', 'New York Reports', ['USA'], [[1885, 1955]]], ['NY (2d)', 'New York Reports (Second Series)', ['USA'], [[1956, 2013]]], ['NYS (2d)', 'New York Supplement (Second Series)', ['USA'], [[1956, 2013]]], ['P', 'Pacific Reporter', ['USA'], [[1883, 1931]]], ['P (2d)', 'Pacific Reporter (Second Series)', ['USA'], [[1931, 2000]]], ['P (3d)', 'Pacific Reporter (Third Series)', ['USA'], [[2000, 2013]]], ['RIAA', 'Report of International Arbitral Award', ['International'], [[1948, 2013]]], ['S Ct', 'Supreme Court Reporter', ['USA'], [[1882, 2013]]], ['SE', 'South Eastern Reporter', ['USA'], [[1887, 1939]]], ['SE (2d)', 'South Eastern Reporter (Second Series)', ['USA'], [[1939, 1988]]], ['SEC Dec', 'Securities and Exchange Commission Decisions', ['USA'], [[1934, 2013]]], ['So', 'Southern Reporter', ['USA'], [[1887, 1941]]], ['So (2d)', 'Southern Reporter (Second Series)', ['USA'], [[1941, 2013]]], ['SW', 'South Western Reporter', ['USA'], [[1979, 2013]]], ['SW (2d)', 'South Western Reporter (Second Series)', ['USA'], [[1928, 2013]]], ['TMR', 'Trademark Reporter', ['USA'], [[1911, 2013]]], ['US', 'United States Reports', ['USA'], [[1754, 2013]]], ['USLW', 'United States Court of Appeals Reports', ['USA'], [[1941, 2013]]], ['US App DC', 'United States Law Week', ['USA'], [[1933, 2013]]]]
	var CanadaList = [['ANWTYTR', 'Alberta, Northwest Territories & Yukon Tax Reporter', ['Canada'], [[1973, 2013]]], ['AAS', 'Arbitrage - Sant&#233;xe9 et services sociaux', ['Canada', 'Quebec'], [[1983, 2013]]], ['ABD', 'Canada, Public SErvice Commission, Appeals and Investigation Branch, Appeal Board Decisinos', ['Canada'], [[1979, 1999]]], ['ACWS', 'All Canada Weekly Summaries', ['Canada'], [[1970, 1979]]], ['ACWS (2d)', 'All Canada Weekly Summaries (Second Series)', ['Canada'], [[1980, 1986]]], ['ACWS (3d)', 'All Canada Weekly Summaries (Third Series)', ['Canada'], [[1980, 2013]]], ['ADIL', 'Annual Digest and Reports of Public International Cases', ['International'], [[1919, 1949]]], ['Admin LR', 'Administratice Law Reports', ['Canada'], [[1983, 1991]]], ['Admin LR (2d)', 'Administratice Law Reports (Second Series)', ['Canada'], [[1992, 1998]]], ['Admin LR (3d)', 'Administratice Law Reports (Third Series)', ['Canada'], [[1998, 2003]]], ['Admin LR (4th)', 'Administratice Law Reports (Fourth Series)', ['Canada'], [[2003, 2013]]], ['AEUB', 'Alberta Energy and Utilities Board Decisions', ['Canada'], [[1995, 2013]]], ['A imm app', "Affaires d'immegration en appel", ['Canada'], [[1967, 1970]]], ['A imm app (ns)', "Affaires d'immegration en appel (nouvelle s&#233;xe9rie)", ['Canada'], [[1969, 1977]]], ['AJDQ', 'Annuaire de jurispredenec et de doctrine du Qu&#233;xe9bec', ['Canada', 'Quebec'], [[1989, 2013]]], ['AJQ', 'Annuaire de jurisprudence du Qu&#233;xe9bec', ['Canada', 'Quebec'], [[1937, 1988]]], ['Alta BAA', 'Alberta Board of Arbitration, Arbitrations under the Alberta Labour Act', ['Canada', 'Alberta'], [[1980, 2013]]], ['Alta BAAA', 'Alberta Board of Adjudication, Adjudications and Arbitrations under the Public Service Employee Relations Act', ['Canada', 'Alberta'], [[1980, 1986]]], ['Alta BIR', 'Alberta Board of Industrial Relations Decisions', ['Canada', 'Alberta'], [[1961, 1982]]], ['Alta ERCB', 'Alberta Energy Resources Conservation Board (Decisions and Reports)', ['Canada', 'Alberta'], [[1971, 2013]]], ['Alta HRCR', 'Alberta Human Rights Commission, Reports of Boards of Inquiry', ['Canada', 'Alberta'], [[1972, 19982]]], ['Alta LR', 'Alberta Law Reports', ['Canada', 'Alberta'], [[1908, 1933]]], ['Alta LR (2d)', 'Alberta Law Reports (Second Series)', ['Canada', 'Alberta'], [[1976, 1992]]], ['Alta LR (3d)', 'Alberta Law Reports (Third Series)', ['Canada', 'Alberta'], [[1992, 2002]]], ['Alta LR (4th)', 'Alberta Law Reports (Fourth Series)', ['Canada', 'Alberta'], [[2002, 2009]]], ['Alta LR (5th)', 'Alberta Law Reports (Fifth Series)', ['Canada', 'Alberta'], [[2009, 2013]]], ['Alta LRBD', 'Alberta Labour Relations Board Decisions', ['Canada', 'Alberta'], [[1982, 1986]]], ['Alta LRBR', 'Alberta Labour Relations Board Reports', ['Canada', 'Alberta'], [[1986, 2013]]], ['Alta OGBC', 'Alberta Oil and Gas Conservation Board Decisions', ['Canada', 'Alberta'], [[1957, 1971]]], ['Alta PSERB', 'Alberta Public Service Employee Relations Baord Decisions', ['Canada', 'Alberta'], [[1981, 1986]]], ['Alta PSGAB', 'Alberta Public Services Grievance Appeal Board Adjudications and Arbitrations', ['Canada', 'Alberta'], [[1980, 1985]]], ['Alta PUB', 'Alberta Public Utilities Board Decisions', ['Canada', 'Alberta'], [[1976, 2013]]], ['APR', 'Atnalntic Provinces Reports', ['Canada'], [[1975, 2013]]], ['Arb Serv Rep', 'Arbitration Services Reporter', ['Canada'], [[1977, 2013]]], ['AR', 'Alberta Reports', ['Canada', 'Alberta'], [[1976, 2013]]], ['ASC Sum', 'Alberta Securities Commission Summaries', ['Canada', 'Alberta'], [[1975, 2013]]], ['ATB', 'Canada Air Transprot Board Decisions', ['Canada'], [[1944, 1967]]], ['AWLD', 'Alberta Weekly Law Digest', ['Canada', 'Alberta'], [[1982, 2013]]], ['BC Empl', 'British Columbia Employment Standards Board Decisions', ['Canada', 'British Columbia'], [[1981, 1983]]], ["BC En Comm'n Dec", 'British Columbia Energy Commission Decisions', ['Canada', 'British Columbia'], [[1977, 1980]]], ['BCHRC Dec', 'British Columbia Human Rights Commission Decisions', ['Canada', 'British Columbia'], [[1975, 1982]]], ['BCSCW Summ', 'British Columbia Securities Commission Weekly Summary', ['Canada', 'British Columbia'], [[1987, 2013]]], ["BC Util Comm'n", 'British Columbia Utilities Commission Decisions', ['Canada', 'British Columbia'], [[1980, 2013]]], ['BCAC', 'British Columbia Appeal Cases', ['Canada', 'British Columbia'], [[1991, 2013]]], ['BCAVC', 'British Columbia, Director of Trade Practices, Assurances of voluntary compliance pursuant to section 15 of the Trade PRactices Act (Decisions)', ['Canada', 'British Columbia'], [[1974, 1978]]], ['BCLR', 'British Columbia Law Reports', ['Canada', 'British Columbia'], [[1977, 1986]]], ['BCLR (2d)', 'British Columbia Law Reports (Second Series)', ['Canada', 'British Columbia'], [[1986, 1995]]], ['BCLR (3d)', 'British Columbia Law Reports (Third Series)', ['Canada', 'British Columbia'], [[1995, 2001]]], ['BCLR (4th)', 'British Columbia Law Reports (Fourth Series)', ['Canada', 'British Columbia'], [[2002, 2013]]], ['BCLRB Dec', 'British Columbia Labour Relations Board Decisions', ['Canada', 'British Columbia'], [[1979, 2013]]], ['BCR', 'British Columbia Reports', ['Canada', 'British Columbia'], [[1867, 1947]]], ['BCWCR', "Brisith Columbia Workers' Compensation Reporter", ['Canada', 'British Columbia'], [[1973, 2013]]], ['BDM', 'Bulletin de droit municipal', ['Canada', 'Quebec'], [[1994, 2013]]], ["Bd Rwy Comm'rs Can", 'Board of Railway Commissioners for Canada - Judgements, Orders, Regulations, and Rulings', ['Canada'], [[1911, 1938]]], ["Bd Trans Comm'rs Can", 'Board of Transport Commissioners for Canada - Judgements, Orders, Regulations, and Rulings', ['Canada'], [[1938, 1967]]], ['Beaubien', 'Beaubien', ['Canada', 'Quebec'], [[1905, 1906]]], ['BISD', 'Basic Instruments and Selected Documents', ['Angola', 'Antigua and Barbuda', 'Argentina', 'Australia', 'Austria', 'Bahrain', 'Bangladesh', 'Barbados', 'Belgium', 'Belize', 'Benin', 'Bolivia', 'Botswana', 'Brazil', 'Brunei Darussalam', 'Burkina Faso', 'Burundi', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'Colombia', 'Congo, Republic of', 'Costa Rica', "Cote d'Ivoire", 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Egypt', 'El Salvador', 'Fiji', 'Finland', 'France', 'Gabon', 'The Gambia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Kenya', 'Korea, Republic of', 'Kuwait', 'Lesotho', 'Liechtenstein', 'Luxembourg', 'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Morocco', 'Mozambique', 'Myanmar, Union of', 'Namibia', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Pakistan', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Rwanda', 'Senegal', 'Sierra Leone', 'Singapore', 'Slovak Republic', 'Slovenia', 'Solomon Islands', 'South Africa', 'Spain', 'Sri Lanka', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Suriname', 'Swaziland, Kingdom of', 'Sweden', 'Switzerland', 'Tanzania', 'Thailand', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Uganda', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Venezuela', 'Yugoslavia', 'Zaire', 'Zambia', 'Zimbabwe'], [[1952, 2013]]], ['BLE', 'Bulletin du libre-&#233;xe9change', ['Canada'], [[1990, 1996]]], ['BLR', 'Business Law Reports', ['Canada'], [[1977, 1990]]], ['BLR (2d)', 'Business Law Reports (Second Series)', ['Canada'], [[1991, 1999]]], ['BLR (3d)', 'Business Law Reports (Third Series)', ['Canada'], [[2000, 2005]]], ['BLR (4th)', 'Business Law Reports (Fourth Series)', ['Canada'], [[2005, 2013]]], ['BR', 'Recueils de jurisprudence du Qu&#233;xe9bec: Cour du Banc de la Reine / du Roi', ['Canada', 'Quebec'], [[1892, 1941]]], ['BR', 'Rapports judiciaires officels de Qu&#233;xe9bec: Cour du Bnc de la Reine / du Roi', ['Canada', 'Quebec'], [[1942, 1969]]], ['BREF', "D&#233;xe9cisions du Bureau de r&#233;xe9vision de l'&#233;xe9valuation fonci&#233;xe9re", ['Canada', 'Quebec'], [[1980, 1988]]], ['Bull CVMQ', 'Bulletin - Commission des valeurs mobili&#233;xe9res du Qu&#233;xe9bec', ['Canada', 'Quebec'], [[1970, 2013]]], ['Bull OSC', 'Bulletin of the Ontario Securities Commission', ['Canada', 'Ontario'], [[1981, 2013]]], ['C & S', "Clarke and Scully's Drainage Cases", ['Canada', 'Ontario'], [[1898, 1903]]], ['CA', "Recueils de jurisprudence de Qu&#233;xe9bec: Cour d'appel", ['Canada', 'Quebec'], [[1970, 1985]]], ['CAC', 'Canada Citizenship Appeal Court, Reasons for Judgement', ['Canada'], [[1975, 1977]]], ['CACM', "Recueil des arr&#233;xeats de la Cour d'appeal des cours martiales", ['Canada'], [[1957, 2013]]], ['CAEC', "Commission d'appel de enregistrements commerciaux, Sommaires des d&#233;xe9cisions", ['Canada', 'Ontario'], [[1971, 2013]]], ['CAI', "D&#233;xeacisions de la Commission d'acc&#233;xe9s &#233;xe1 l'information", ['Canada', 'Quebec'], [[1984, 2013]]], ['CALP', "D&#233;xe9cisions de la Commission d'appel en mati&#233;xe9re de l&#233;xe9sions professionnelles", ['Canada', 'Quebec'], [[1986, 1998]]], ['CALR', 'Criminal Appeals Law Reporter', ['Canada'], [[1993, 2013]]], ['Cameron PC', "Cameron's Constitutional Decisions of the Privy Council", ['Canada'], [[1867, 1915]]], ['Cameron SC', "Cameron's Supreme Court Cases", ['Canada'], [[1880, 1900]]], ['CAQ', 'Causes en appel au Qu&#233;xe9bec', ['Canada', 'Quebec'], [[1986, 1995]]], ['Carey', "Carey's Manitoba Reports", ['Canada', 'Manitoba'], [[1875, 1875]]], ['Cart BNA', "Cartwright's Cases on the British Borth America Act, 1867", ['Canada'], [[1882, 1897]]], ['CAS', 'D&#233;xe9cisions de la Commission des affaires sociales', ['Canada', 'Quebec'], [[1975, 1997]]], ['CBES', 'Recueils de jurisprudence du Qu&#233;xe9bec: Cour du bien-&#233;xeatre social', ['Canada', 'Quebec'], [[1975, 1977]]], ['CBR', 'Copyright Board Reports', ['Canada'], [[1990, 1994]]], ['CBR', 'Canadian Bankruptcy Reports', ['Canada'], [[1920, 1960]]], ['CBR (NS)', 'Canadian Bankruptcy Reports (New Series)', ['Canada'], [[1960, 1990]]], ['CBR (3d)', 'Canadian Bankruptcy Reports (Third Series)', ['Canada'], [[1991, 1998]]], ['CBR (4th)', 'Canadian Bankruptcy Reports (Fourth Series)', ['Canada'], [[1998, 2004]]], ['CBR (5th)', 'Canadian Bankruptcy Reports (Fifth Series)', ['Canada'], [[2004, 2013]]], ['CCC', 'Canadian Criminal Cases', ['Canada'], [[1898, 1962]]], ['CCC (NS)', 'Canadian Criminal Cases (New Series)', ['Canada'], [[1963, 1970]]], ['CCC (2d)', 'Canadian Criminal Cases (Second Series)', ['Canada'], [[1971, 1983]]], ['CCC (3d)', 'Canadian Criminal Cases (Third Series)', ['Canada'], [[1983, 2013]]], ['CCEL', 'Canadian Cases on Employment Law', ['Canada'], [[1983, 1994]]], ['CCEL (2d)', 'Canadian Cases on Employment Law (Second Series)', ['Canada'], [[1994, 2000]]], ['CCEL (3d)', 'Canadian Cases on Employment Law (Third Series)', ['Canada'], [[2000, 2013]]], ['CCL', 'Canadian Current Law', ['Canada'], [[1948, 1990]]], ['CCL', 'Canadian Current Law: Jurispredence / sommaires de la jurisprudence', ['Canada'], [[1991, 1991]]], ['CCL', 'Canadian Current Law: Case Law Digests / sommaires de la jurisprudence', ['Canada'], [[1992, 1996]]], ['CCL', 'Canadian Current Law: Case Digests / sommaires de la jurisprudence', ['Canada'], [[1996, 2013]]], ['CCL L&#233;xe9gislation', 'Canadian Current Law: Annuaire de la l&#233;xe9gislation', ['Canada'], [[1989, 2013]]], ['CCL Legislation', 'Canadian Current Law: Legislation Annual', ['Canada'], [[1989, 2013]]], ['CCLI', 'Canadian Cases on the Law of Insurance', ['Canada'], [[1983, 1991]]], ['CCLI (2d)', 'Canadian Cases on the Law of Insurance (Second Series)', ['Canada'], [[1993, 1998]]], ['CCLI (3d)', 'Canadian Cases on the Law of Insurance (Third Series)', ['Canada'], [[1998, 2013]]], ['CCLR', 'Canadian Computer Law Reporter', ['Canada'], [[1983, 1992]]], ['CCLS', 'Canadian Cases on the Law of Securities', ['Canada'], [[1993, 1998]]], ['CCLT', 'Canadian Cases on the Law of Torts', ['Canada'], [[1976, 1990]]], ['CCLT (2d)', 'Canadian Cases on the Law of Torts (Second Series)', ['Canada'], [[1990, 2000]]], ['CCLT (3d)', 'Canadian Cases on the Law of Torts (Third Series)', ['Canada'], [[2000, 2013]]], ['CCPB', 'Canadian Cases on Pensions and Benefits', ['Canada'], [[1994, 2013]]], ['CCRI', 'Conseil canadien des relations industrielles, motif de d&#233;xe9cision', ['Canada'], [[1999, 2013]]], ['CCRTD', 'Conseil canadien des relations du travail, d&#233;xe9cisions', ['Canada'], [[1949, 1974]]], ['CCRTDI', 'Conseil canadien des relations du travail, d&#233;xe9cisions et informations', ['Canada'], [[1974, 1998]]], ['CCTCTD', 'Commission canadienne des transports, comit&#233;xe9 des t&#233;xe9l&#233;xe9communications - d&#233;xe9cisions', ['Canada'], [[1973, 1976]]], ['CCTCTEP', 'Commission canadienne des transports, comit&#233;xe9 des transports par eau - permis', ['Canada'], [[1976, 1976]]], ['CCTCTO', 'Commission canadienne des transports, comit&#233;xe9 des t&#233;xe9l&#233;xe9communications - ordonnances', ['Canada'], [[1975, 1976]]], ['CCTCTO', 'Commission canadienne des transports - ordonnances', ['Canada'], [[1972, 1987]]], ['CDB-C', 'Collection de d&#233;xe9cisions de Bas-Canada', ['Canada'], [[1847, 1891]]], ['CEB', 'Canadian Employment Benefits and Pension Guide Reports', ['Canada'], [[1995, 2013]]], ['CEGSB', 'Crown Employees Grievance Settlement Board Decisions', ['Canada', 'Ontario'], [[1976, 1997]]], ['CELR', 'Canadian Environmental Law Reports', ['Canada'], [[1978, 1985]]], ['CELR (NS)', 'Canadian Environmental Law Reports (New Series)', ['Canada'], [[1986, 2013]]], ['CER', 'Canada Customs and Excise Reports', ['Canada'], [[1980, 1989]]], ['CFLC', 'Canadian Family Law Cases', ['Canada'], [[1959, 1977]]], ['CFP', "Recueil des d&#233;xe9cisions des comit&#233;xe9s d'appel de la fonction publique", ['Canada', 'Quebec'], [[1980, 1989]]], ['CCTCTEP', 'Commission canadienne des transports, comit&#233;xe9 des transports par eau&#233;u2014permis', ['Canada'], [[1976, 1976]]], ['CCTCTO', 'Commission canadienne des transports, comit&#233;xe9 des t&#233;xe9l&#233;xe9communications&#233;u2014ordonnances', ['Canada'], [[1975, 1976]]], ['CCTO', 'Commission canadienne des transports&#233;u2014ordonnances', ['Canada'], [[1972, 1987]]], ['CDB-C', 'Collection de decisions du Bas-Canada', ['Canada', 'Quebec'], [[1847, 1891]]], ['CEB', 'Canadian Employment Benefits and Pension Guide Reports', ['Canada'], [[1995, 2013]]], ['CEGSB', 'Crown Employees Grievance Settlement Board Decisions', ['Canada', 'Ontario'], [[1976, 1997]]], ['CELR', 'Canadian Environmental Law Reports', ['Canada'], [[1978, 1985]]], ['CELR (NS)', 'Canadian Environmental Law Reports', ['Canada'], [[1986, 2013]]], ['CER', 'Canadian Customs and Excise Reports', ['Canada'], [[1980, 1989]]], ['CFLC', 'Canadian Family Law Cases', ['Canada'], [[1959, 1977]]], ['CFP', "Recueil des decisions des cornit&#233;xe9s d'appel de Ia fonction publique", ['Canada', 'Quebec'], [[1980, 1989]]], ['Ch CR', 'Chancery Chambers Reports', ['Canada', 'Ontario'], [[1857, 1872]]], ['CHRR', 'Canadian Human Rights Reporter', ['Canada'], [[1980, 2013]]], ['CICB', 'Criminal Injuries Compensation Board Decisions', ['Canada', 'Ontario'], [[1971, 1989]]], ['CIJ M&#233;xe9moires', 'Cour internationale de justice: M&#233;xe9moires, plaidoiries et documents', ['International'], [[1946, 2013]]], ['CIJ Rec', 'Cour internationale dejustice : Recueil des arr&#233;xeats, avis consultat ifs et ordonnances', ['International'], [[1946, 2013]]], ['CIPOO (M)', "Commissaire a I'information eta Ia protection de Ia vie privee, Ontario, Orders, M Series", ['Canada', 'Ontario'], [[1988, 1998]]], ['CIPOO (P)', "Commissaire a I'information eta a protection de Ia vie privee, Ontario, Orders, P Series", ['Canada', 'Ontario'], [[1992, 1998]]], ['CIPOS', "Commissaire a l'information eta Ia protection de Ia vie privee, Ontario, Sommaires", ['Canada', 'Ontario'], [[1990, 1992]]], ['CIPR', 'Canadian Intellectual Property Reports', ['Canada'], [[1984, 1990]]], ['CIRB', 'Canada Industrial Relations Board, Reasons for Decision', ['Canada'], [[1999, 2013]]], ['CLAS', 'Canadian Labour Arbitration Summaries', ['Canada'], [[1986, 2013]]], ['CLD', 'Commercial Law Digest', ['Canada'], [[1987, 1990]]], ['CLL', 'Canadian Current Law: Canadian Legal Literature', ['Canada'], [[1991, 2013]]], ['CLLC', 'Canadian Labour Law Cases', ['Canada'], [[1944, 2013]]], ['CLLR', 'Canadian Labour Law Reporter', ['Canada'], [[1982, 2013]]], ['CLP', 'Decisions de Ia Commission des lesions professionnelles', ['Canada', 'Quebec'], [[1998, 2013]]], ['CLR', 'Construction Law Reports', ['Canada'], [[1983, 1992]]], ['CLR (2d)', 'Construction Law Reports (Second Series)', ['Canada'], [[1992, 2000]]], ['CLR (3d)', 'Construction Law Reports (Third Series)', ['Canada'], [[2000, 2013]]], ['CLRBD', 'Canada Labour Relations Board Decisions', ['Canada'], [[1949, 1974]]], ['CLRBR', 'Canadian Labour Relations Board Reports', ['Canada'], [[1974, 1982]]], ['CLRBR (NS)', 'Canadian Labour Relations Board Reports (New Series)', ['Canada'], [[1983, 1989]]], ['CLRBR (2d)', 'Canadian Labour Relations Board Reports (Second Series)', ['Canada'], [[1989, 2013]]], ['CMAR', 'Canada Court Martial Appeal Reports', ['Canada'], [[1957, 2013]]], ['CNLC', 'Canadian Native Law Cases', ['Canada'], [[1763, 1978]]], ['CNLR', 'Canadian Native Law Reporter', ['Canada'], [[1979, 2013]]], ['COHSC', 'Canadian Occupational Health and Safety Cases', ['Canada'], [[1989, 1993]]], ['Comm LR', 'Commercial Law Reports', ['Canada'], [[1903, 1905]]], ['Comp Trib dec', 'Competition Tribunal, decisions', ['Canada'], [[1986, 2013]]], ['Conc Bd Rpts', 'Conciliation Board Reports', ['Canada'], [[1966, 1974]]], ["Conc Comm'r Rpts", 'Conciliation Commissioner Reports', ['Canada'], [[1975, 1975]]], ['Cons sup N-F', 'Inventaire des jugements et deliberations du Conseil superieur de Ia Nouvelle-France', ['Canada', 'USA'], [[1717, 1760]]], ['Cook Adm', "Cook's Vice-Admiralty Reports", ['Canada', 'Quebec'], [[1873, 1874]]], ['Coop Ch Ch', "Cooper's Chancery Chambers Reports", ['Canada', 'Ontario'], [[1866, 1866]]], ['CP', 'Recueils de jurisprudence du Qu&#233;xe9bec: Cour  provinciale', ['Canada', 'Quebec'], [[1975, 1985]]], ['CPC', "Carswell's Practice Cases", ['Canada'], [[1976, 1985]]], ['CPC (2d)', "Carswell's Practice Cases (Second Series)", ['Canada'], [[1985, 1992]]], ['CPC (3rd)', "Carswell's Practice Cases (Third Series)", ['Canada'], [[1992, 1997]]], ['CPC (4th)', "Carswell's Practice Cases (Fourth Series)", ['Canada'], [[1997, 2001]]], ['CPC (5th)', "Carswell's Practice Cases (Fifth Series)", ['Canada'], [[2001, 2013]]], ['CPC (Olmstead)', 'Canadian Constitutional Decisions of the Judicial Committee of the Privy Council (Olmstead)', ['Canada'], [[1873, 1954]]], ['CPC (Plaxton)', 'Canadian Constitutional Decisions of the Judicial Committee of the Privy Council (Plaxton)', ['Canada'], [[1930, 1939]]], ['CPJI (Ser A)', 'Publications de Ia Cour permanente de justice internationals: S&#233;xe9rie A: Recueil des arr&#233;xe9ts', ['International'], [[1922, 1930]]], ['CPJI (S&#233;xe9r B)', 'Publications de Ia Cour permamente de justice internationale : S&#233;xe9rie B : Recueil des avis consultatifs', ['International'], [[1922, 1930]]], ['CPJI (S&#233;xe9r A/B)', 'Publications de Ia Cour permamente de justice internationale : S&#233;xe9rie NB : Arr&#233;xeats, ordonnances et avis consultatifs', ['International'], [[1931, 1940]]], ['CPJI (S&#233;xe9r C)', 'Publications de Ia Cour permanente de justice internationale S&#233;xe9rie C : Plaidoiries, expos&#233;xe9s oraux et documents', ['International'], [[1922, 1940]]], ['CPR', 'Canadian Patent Reporter', ['Canada'], [[1941, 1971]]], ['CPR (2d)', 'Canadian Patent Reporter (Second Series)', ['Canada'], [[1971, 1984]]], ['CPR(3d)', 'Canadian Patent Reporter (Third Series)', ['Canada'], [[1985, 1999]]], ['CPR (4th)', 'Canadian Patent Reporter (Fourth Series)', ['Canada'], [[1999, 2013]]], ['CPRB', 'Procurement Review Board of Canada, decisions', ['Canada'], [[1990, 2000]]], ['CPTA', 'Decisions de Ia Commission de protection du territoire agricole', ['Canada', 'Quebec'], [[1984, 1987]]], ['CR', 'Criminal Reports', ['Canada'], [[1946, 1967]]], ['CR (3rd)', 'Criminal Reports (Third Series)', ['Canada'], [[1978, 1991]]], ['CR (4th)', 'Criminal Reports (Fourth Series)', ['Canada'], [[1991, 1996]]], ['CR (5th)', 'Criminal Reports (Fifth Series)', ['Canada'], [[1997, 2002]]], ['CR (6th)', 'Criminal Reports (Sixth Series)', ['Canada'], [[2002, 2013]]], ['CR (NS)', 'Criminal Reports (New Series)', ['Canada'], [[1967, 1978]]], ['CRAC', 'Canadian Reports: Appeal Cases: appeals allowed or refused by the Judicial Committee of the Privy Council', ['Canada'], [[1828, 1913]]], ['CRAT', 'Commercial Registration Appeal Tribunal - Summaries of Decisions', ['Canada', 'Ontario'], [[1971, 1979]]], ['CRC', 'Canadian Railway Cases', ['Canada'], [[1902, 1939]]], ['CRD', 'Charter of Rights Decisions', ['Canada'], [[1982, 2013]]], ['CRMPC', 'Commission de revision des marches publics du Canada, decisions', ['Canada'], [[1990, 2000]]], ['CRR', 'Canadian Rights Reporter', ['Canada'], [[1982, 1991]]], ['CRR (2d)', 'Canadian Rights Reporter', ['Canada'], [[1991, 2013]]], ['CRRBDI', 'Canada Labour Relations Board Decisions and Information', ['Canada'], [[1974, 1998]]], ['CRT', 'Canadian Radio-Television and Telecommunications decisions and policy statements', ['Canada'], [[1975, 1985]]], ['CRTC', 'Canadian Railway and Transport Cases', ['Canada'], [[1940, 1966]]], ['CS', 'Recueils de jurisprudence du Qu&#233;xe9bec: Cour superieure', ['Canada', 'Quebec'], [[1967, 1985]]], ['CS', 'Rapports judiciaires officiels de Qu&#233;xe9bec: Cour sup&#233;xe9rieure', ['Canada', 'Quebec'], [[1892, 1966]]], ['CSD', 'Canadian Sentencing Digest', ['Canada'], [[1980, 1994]]], ['CSP', 'Recueils de jurisprudence du Quebec: Cour des Sessions de Ia paix', ['Canada', 'Quebec'], [[1975, 1985]]], ['CT', 'Jurisprudence en droit du travail: Decisions des commissaires du travail', ['Canada', 'Quebec'], [[1969, 1981]]], ['CT Cases', 'Canadian Transport Cases', ['Canada'], [[1966, 1977]]], ['CTAB', 'Canada Tax Appeal Board Cases', ['Canada'], [[1949, 1966]]], ['CTAB (NS)', 'Canada Tax Appeal Board Cases (New Series)', ['Canada'], [[1967, 1971]]], ['CTBR', 'Canada Tariff Board Reports', ['Canada'], [[1937, 1988]]], ['CTC', 'Canada Tax Cases Annotated', ['Canada'], [[1917, 1971]]], ['CTC (NS)', 'Canada Tax Cases (New Series)', ['Canada'], [[1972, 2013]]], ['CTC', 'Canadian Transport cases', ['Canada'], [[1966, 1977]]], ['CTCATC', 'Canadian Transport Commission, Air Transport Committee Decisions', ['Canada'], [[1967, 1987]]], ['CTCDO', 'Canadian Transport Commission, Decisions and Orders Summary', ['Canada'], [[1970, 1976]]], ['CTCMVTCD', 'Canadian Transport Commission, Motor Vehicle Transport Committee Decisions', ['Canada'], [[1973, 1987]]], ['CTCMVTCO', 'Canadian Transport Commission, Motor Vehicle Transport Committee Orders', ['Canada'], [[1972, 1987]]], ['CTCOA', 'Canadian Transport Commission, Orders (Air)', ['Canada'], [[1967, 1987]]], ['CTCR', 'Canadian Transport Commission Reports', ['Canada'], [[1978, 1986]]], ['CTCRCD', 'Canadian Transport Commission, Review Committee Decisions', ['Canada'], [[1971, 1987]]], ['CTCRTC', 'Canadian Transport Commission Railway Transport Committee&#233;u2014Judgments, Orders, Regulations, and Rulings(formerly: anciennement Board of Transport Commissioners for Canada)', ['Canada'], [[1967, 1987]]], ['CTCTCD', 'Canadian Transport Commission, Telecommunication Committee Decisions', ['Canada'], [[1973, 1976]]], ['CTCTCO', 'Canadian Transport Commission, Telecommunication Committee Orders', ['Canada'], [[1975, 1976]]], ['CTCWTCD', 'Canadian Transport Commission, Water Transport Committee, Decisions', ['Canada'], [[1972, 1987]]], ['CTCWTCL', 'Canadian Transport Commission, Water Transport Committee, Licences', ['Canada'], [[1976, 1976]]], ['CTCWTCO', 'Canadian Transport Commission, Water Transport Committee, Orders', ['Canada'], [[1979, 1987]]], ['CTR', 'Canadian Tax Reporter', ['Canada'], [[1972, 2013]]], ['CTR', 'Commission du tarif registre', ['Canada'], [[1981, 1988]]], ['CTR', 'De Boo Commodity Tax Reports', ['Canada'], [[1987, 1989]]], ['CTST', 'Canada Trade and Sales Tax Cases', ['Canada'], [[1989, 1991]]], ['CTTT', 'D&#233;xe9cisions du Comm issaire du travail et du Tribunal du travail', ['Canada', 'Quebec'], [[1982, 1993]]], ['CTTTCRAA', "Decisions du Commissaire du travail, du Tribunal du travail et de Ia Commission de reconnaissance des associations d'artjstes", ['Canada', 'Quebec'], [[1994, 1997]]], ['DCA', "Canada, Commission de Ia fonction publique du Canada, decisions du comite d'appel", ['Canada'], [[1979, 1999]]], ['DCA', "Decisions de a cour d'appel I Queen's Bench Reports (Dorion)", ['Canada', 'Quebec'], [[1880, 1886]]], ['DCDRT', 'Decisions sur des conflits de droit dans les relations du travail', ['Canada', 'Quebec'], [[1964, 1970]]], ['DCL', 'Decisions de Ia Commission des Ioyers', ['Canada', 'Quebec'], [[1975, 1981]]], ['DCRM', 'Commission de revision des marches publics du Canada, decisions', ['Canada'], [[1990, 2000]]], ['DDCP', 'Decisions disciplinaires concernant lea corporations professionnelles', ['Canada', 'Quebec'], [[1974, 2013]]], ['DDOP', 'Decisions disciplinaires concernant les ordres profess ionnels', ['Canada', 'Quebec'], [[1995, 2013]]], ['Dec B-C', 'Decisions des Tribunaux du Bas-Canada', ['Canada', 'Quebec'], [[1851, 1867]]], ['Dec trib Mont', 'Pr&#233;xe9cis des decisions des tribunaux du district de Montr&#233;xe9al', ['Canada', 'Quebec'], [[1853, 1854]]], ['DELD', 'Dismissal and Employment Law Digest', ['Canada'], [[1986, 2013]]], ['DELEA', 'Digest of Environmental Law and Environmental Assessment', ['Canada'], [[1992, 2013]]], ['Des OAL', "Decisions des orateurs de I'Assemblee legislative de Ia province de Quebec (Desjardins)", ['Canada', 'Quebec'], [[1867, 1901]]], ['DFQE', 'Droit fiscal quebecois express', ['Canada', 'Quebec'], [[1977, 2013]]], ['DJC', 'Canadian Current Law: Documentation juridique au Canada', ['Canada'], [[1991, 2013]]], ['DLQ', 'Droits et libertes au Qu&#233;xe9bec', ['Canada', 'Quebec'], [[1986, 1987]]], ['DLR', 'Dominion Law Reports', ['Canada'], [[1912, 1955]]], ['DLR (2d)', 'Dominion Law Reports (Second Series)', ['Canada'], [[1956, 1968]]], ['DLR (3d)', 'Dominion Law Reports (Third Series)', ['Canada'], [[1969, 1984]]], ['DLR (4th)', 'Dominion Law Reports (Fourth Series)', ['Canada'], [[1984, 2013]]], ['DOAL', 'Decisions des orateurs, assemble legislative', ['Canada', 'New Brunswick'], [[1923, 1982]]], ['Drap', "Draper's King's Bench Reports", ['Canada', 'Ontario'], [[1829, 1831]]], ['DRL', 'Decisions de Ia R&#233;xe9gie du logement', ['Canada', 'Quebec'], [[1982, 1993]]], ['DTC', 'Dominion Tax Cases', ['Canada'], [[1920, 2013]]], ['DTE', 'Droit du travail Express', ['Canada', 'Quebec'], [[1982, 2013]]], ['E & A', "Grant's Upper Canada Error and Appeals Reports", ['Canada', 'Ontario'], [[1846, 1866]]], ['ELLR', 'Employment and Labour Law Reporter', ['Canada'], [[1991, 2013]]], ['ELR', 'Eastern Law Reporter', ['Canada'], [[1906, 1915]]], ['ETR', 'Estates and Trusts Reports', ['Canada'], [[1977, 1994]]], ['ETR (2d)', 'Estates and Trusts Reports (Second Series)', ['Canada'], [[1994, 2003]]], ['ETR (3d)', 'Estates and Trusts Reports (Third Series)', ['Canada'], [[2003, 2013]]], ['Ex CR', 'Exchequer Court of Canada Reports', ['Canada'], [[1875, 1922]]], ['Ex CR', 'Canada Law Reports: Exchequer Court', ['Canada'], [[1923, 1970]]], ['Farm Products App Trib Dec', 'Farm Products Appeal Tribunal Decisions', ['Canada', 'Ontario'], [[1990, 1996]]], ['FCAD', 'Federal Court of Appeal Decisions', ['Canada'], [[1981, 1999]]], ['FLD', 'Family Law Digest', ['Canada'], [[1968, 1982]]], ['FCR', 'Federal Court Reports', ['Canada'], [[1971, 2013]]], ['FLRAC', 'Family Law Reform Act Cases', ['Canada', 'Ontario'], [[1978, 1985]]], ['FLRR', 'Family Law Reform Reporter', ['Canada'], [[1978, 1987]]], ['Fox Pat C', "Fox's Patent, Trade mark, Design and Copyright Cases", ['Canada'], [[1940, 1971]]], ['FPR', 'Fisheries Pollution Reports', ['Canada'], [[1980, 1980]]], ['FTLR', 'Free Trade Law Reports', ['Canada'], [[1989, 1991]]], ['FTR', 'Federal Trial Reports', ['Canada'], [[1986, 2013]]], ['FTU', 'Free Trade Update', ['Canada'], [[1990, 1996]]], ['Gr / UC Ch', "Grant's Upper Canada Chancery Reports", ['Canada', 'Ontario'], [[1849, 1882]]], ['GSTR', 'Canadian Goods and Services Tax Reporter/ Reports / Monitor', ['Canada'], [[1989, 2013]]], ['GTC', 'Canadian GST & Commodity Tax Cases', ['Canada'], [[1993, 2013]]], ['H&W', "Haszard & Warburton's Reports", ['Canada', 'Prince Edward Island'], [[1850, 1882]]], ['Hague Ct Rep', 'Hague Court Reports (1916)', ['International'], [[1899, 1915]]], ['Hague Ct Rep (2d)', 'Hague Court Reports (Second Series) (1932)', ['International'], [[1916, 1925]]], ['Harr & Hodg', 'Harrison and Hodgins Municipal Report', ['Canada', 'Ontario'], [[1845, 1851]]], ['Hodg', 'Hodgins Election Cases', ['Canada', 'Ontario'], [[1871, 1878]]], ['IBDD', 'Instruments de base et documents divers', ['Angola', 'Antigua and Barbuda', 'Argentina', 'Australia', 'Austria', 'Bahrain', 'Bangladesh', 'Barbados', 'Belgium', 'Belize', 'Benin', 'Bolivia', 'Botswana', 'Brazil', 'Brunei Darussalam', 'Burkina Faso', 'Burundi', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'Colombia', 'Congo, Republic of', 'Costa Rica', "Cote d'Ivoire", 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Egypt', 'El Salvador', 'Fiji', 'Finland', 'France', 'Gabon', 'The Gambia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Kenya', 'Korea, Republic of', 'Kuwait', 'Lesotho', 'Liechtenstein', 'Luxembourg', 'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Morocco', 'Mozambique', 'Myanmar, Union of', 'Namibia', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Pakistan', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Rwanda', 'Senegal', 'Sierra Leone', 'Singapore', 'Slovak Republic', 'Slovenia', 'Solomon Islands', 'South Africa', 'Spain', 'Sri Lanka', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Suriname', 'Swaziland, Kingdom of', 'Sweden', 'Switzerland', 'Tanzania', 'Thailand', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Uganda', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Venezuela', 'Yugoslavia', 'Zaire', 'Zambia', 'Zimbabwe'], [[1952, 2013]]], ['ICJ Pleadings', 'International Court of Justice: Pleadings, Oral Arguments, Documents', ['International'], [[1946, 2013]]], ['ICJ Rep', 'International Court of Justice: Reports of Judgments, Advisory Opinions and Orders', ['International'], [[1946, 2013]]], ['ICSID', 'International Centre for Settlement of Investment Disputes (World Bank)', ['International'], [[1966, 2013]]], ['ILR', 'Canadian Insurance Law Reporter', ['Canada'], [[1951, 2013]]], ['ILR', 'Insurance Law Reporter', ['Canada'], [[1934, 1950]]], ['I LR', 'International Law Reports', ['International'], [[1950, 2013]]], ['IMA', 'Institute of Municipal Assessors of Ontario, Court Decisions', ['Canada', 'Ontario'], [[1974, 1986]]], ['Imm ABD', 'Immigration Appeal Board Decisions', ['Canada'], [[1977, 1988]]], ['Imm AC', 'Immigration Appeal Cases', ['Canada'], [[1968, 1970]]], ['Imm AC (2d)', 'Immigration Appeal Cases (Second Series)', ['Canada'], [[1969, 1977]]], ['Imm LR', 'Immigration Law Reporter', ['Canada'], [[1985, 1987]]], ['Imm LR (2d)', 'Immigration Law Reporter (Second Series)', ['Canada'], [[1987, 1999]]], ['Imm LR (3d)', 'Immigration Law Reporter (Third Series)', ['Canada'], [[1999, 2013]]], ['Inter-Am Ct HR (SerA)', 'SeriesA: Judgments and Opinions', ['International'], [[1982, 2013]]], ['Inter-Am Ct HR (Ser B)', 'Series B: Pleadings, Oral Arguments and Documents', ['International'], [[1983, 2013]]], ['Inter-Am Ct HR (Ser C)', 'Series C: Decisions and Judgments', ['International'], [[1987, 2013]]], ['InfoCRTC', 'Broadcasting decisions, public notices and policy statements/ Decisions, avis publics et &#233;xe9nonc&#233;xe9s de politique sur la radiodiffusion', ['Canada'], [[1995, 1998]]], ['JCA', 'Judgments Under the Competition Act', ['Canada'], [[1984, 2013]]], ['JCAP', 'Judgments Under the Competition Act and its Predecessors', ['Canada'], [[1904, 2013]]], ['JE', 'Jurisprudence Express', ['Canada', 'Quebec'], [[1977, 2013]]], ['JL', "Jurisprudence logement Recueil trimestriel de jurisprudence sur le bail d'habitation comprenant des decisions de Ia Regie du logement et des tribunaux judiciaires en mati&#233;xe8re de logement", ['Canada', 'Quebec'], [[1993, 2013]]], ['JL', 'Jurisprudence Logement', ['Canada', 'Quebec'], [[1982, 2013]]], ['JM', 'Decisions du juge des mines du Qu&#233;xe9bec', ['Canada', 'Quebec'], [[1967, 1972]]], ['JSST', 'Jurisprudence en sante et s&#233;xe9curit&#233;xe9 du travail', ['Canada', 'Quebec'], [[1983, 1985]]], ['JSSTI', "Jurisprudence en sante et s&#233;xe9curit&#233;xe9 du travail, decisions en mati&#233;xe8re d'inspection", ['Canada', 'Quebec'], [[1981, 1983]]], ['LAC', 'Labour Arbitration Cases', ['Canada', 'Ontario'], [[1948, 1972]]], ['LAC (2d)', 'Labour Arbitration Cases (Second Series)', ['Canada', 'Ontario'], [[1973, 1981]]], ['LAC (3d)', 'Labour Arbitration Cases (Third Series)', ['Canada', 'Ontario'], [[1982, 1989]]], ['LAC (4th)', 'Labour Arbitration Cases (Fourth Series)', ['Canada', 'Ontario'], [[1989, 2013]]], ['Lap Sp Dec', "Laperrier's Speakers' Decisions", ['Canada'], [[1900, 2013]]], ['LC Jur', 'Lower Canada Jurist', ['Canada', 'Quebec'], [[1847, 1891]]], ['LCBD', 'Land Compensation Board Decisions', ['Canada', 'Ontario'], [[1971, 1983]]], ['LCR', 'Land Compensation Reports', ['Canada'], [[1969, 2013]]], ['LCR', 'Lower Canada Reports', ['Canada', 'Quebec'], [[1851, 1867]]], ['LN', 'Legal News', ['Canada', 'Quebec'], [[1878, 1898]]], ['Man LR', "Manitoba Law Reports (Queen's Bench)", ['Canada', 'Manitoba'], [[1884, 1890]]], ['Man MTBD', 'Manitoba Motor Transport Board Decisions', ['Canada', 'Manitoba'], [[1985, 2013]]], ['Man R', 'Manitoba Reports', ['Canada', 'Manitoba'], [[1883, 1961]]], ['Man R (2d)', 'Manitoba Reports (Second Series)', ['Canada', 'Manitoba'], [[1979, 2013]]], ['Man R temp Wood', 'Manitoba Reports temp Wood (ed Armour)', ['Canada', 'Manitoba'], [[1875, 1883]]], ['MCC', "Mining Commissioner's Cases", ['Canada', 'Ontario'], [[1906, 1979]]], ['MCR', 'Montreal Condensed Reports', ['Canada', 'Quebec'], [[1853, 1854]]], ['MCR', 'Pr&#233;xe9cis des decisions des tribunaux du district de Montr&#233;xe9al', ['Canada', 'Quebec'], [[1853, 1854]]], ['MHRC Dec', 'Manitoba Human Rights Commission Decisions', ['Canada', 'Manitoba'], [[1971, 1982]]], ['MLB Dec', 'Manitoba Labour Board Decisions', ['Canada', 'Manitoba'], [[1985, 2013]]], ['MLR (KB)', "Montreal Law Reports, King's Bench", ['Canada', 'Quebec'], [[1885, 1891]]], ['MLR (QB)', "Montreal Law Reports, Queen's Bench", ['Canada', 'Quebec'], [[1885, 1891]]], ['MLR (SC)', 'Montreal Law Reports, Superior Court', ['Canada', 'Quebec'], [[1885, 1891]]], ['Mont Cond Rep', 'Montreal Condensed Reports', ['Canada', 'Quebec'], [[1853, 1854]]], ['MPLR', 'Municipal and Planning Law Reports', ['Canada'], [[1976, 1990]]], ['MPLR (2d)', 'Municipal and Planning Law Reports (Second Series)', ['Canada'], [[1991, 2013]]], ['MPR', 'Maritime Provinces Reports', ['Canada'], [[1929, 1968]]], ['MVR', 'Motor Vehicle Reports', ['Canada'], [[1979, 1988]]], ['MVR (2d)', 'Motor Vehicle Reports (Second Series)', ['Canada'], [[1988, 1994]]], ['MVR (3d)', 'Motor Vehicle Reports (Third Series)', ['Canada'], [[1994, 2000]]], ['MVR (4th)', 'Motor Vehicle Reports (Fourth Series)', ['Canada'], [[2000, 2013]]], ['NB Eq', 'New Brunswick Equity Reports (Trueman)', ['Canada', 'New Brunswick'], [[1894, 1911]]], ['NB Eq Cas', 'New Brunswick Equity Cases (Trueman)', ['Canada', 'New Brunswick'], [[1876, 1893]]], ['NBESTD', 'New Brunswick Employment Standards Tribunal Decisions', ['Canada', 'New Brunswick'], [[1986, 2013]]], ['NBHRC Dec', 'New Brunswick Human Rights Commission Decisions', ['Canada', 'New Brunswick'], [[1974, 1982]]], ['NBLLC', 'New Brunswick Labour Law Cases', ['Canada', 'New Brunswick'], [[1965, 1979]]], ['NBPPABD', 'New Brunswick Provincial Planning Appeal Board Decisions', ['Canada', 'New Brunswick'], [[1973, 1983]]], ['NBR', 'New Brunswick Reports', ['Canada', 'New Brunswick'], [[1825, 1928]]], ['NBR (2d)', 'New Brunswick Reports (Second Series)', ['Canada', 'New Brunswick'], [[1969, 2013]]], ['NEBD', 'National Energy Board&#233;u2014Reasons for Decision', ['Canada'], [[1970, 2013]]], ['Nfld & PEIR', 'Newfoundland and Prince Edward Island Reports', ['Canada', 'Prince Edward Island', 'Newfoundland & Labrador'], [[1971, 2013]]], ['Nfld LR', 'Newfoundland Law Reports', ['Canada', 'Newfoundland & Labrador'], [[1817, 1949]]], ['NHRC Dec', 'Newfoundland Human Rights Commission Decisions', ['Canada', 'Newfoundland & Labrador'], [[1971, 1977]]], ['NR', 'National Reporter', ['Canada'], [[1973, 2013]]], ['NSHRC Dec', 'Nova Scotia Human Rights Commissions Decisions', ['Canada', 'Nova Scotia'], [[1972, 1980]]], ['NSBCPU Dec', 'Nova Scotia Board of Commissioners of Public Utilities Decisions', ['Canada', 'Nova Scotia'], [[1923, 1973]]], ['NSCGA Dec', 'Nova Scotia Compendium of Grievance Arbitration Decisions', ['Canada', 'Nova Scotia'], [[1978, 2013]]], ['NSR', 'Nova Scotia Reports', ['Canada'], [[1834, 1929], [1965, 1969]]], ['NSR (2d)', 'Nova Scotia Reports (Second Series)', ['Canada', 'Nova Scotia'], [[1969, 2013]]], ['NSRUD', 'Reported and Unreported Decisions', ['Canada', 'Nova Scotia'], [[1979, 1984]]], ['NTAD (Air)', 'National Transportation Agency Decisions (Air)', ['Canada'], [[1988, 1992]]], ['NTAD (Rwy)', 'National Transportation Agency Decisions (Railway)', ['Canada'], [[1988, 1991]]], ['NTAO (Air)', 'National Transportation Agency Orders (Air)', ['Canada'], [[1988, 1992]]], ['NTAR', 'National Transportation Agency of Canada Reports', ['Canada'], [[1988, 1995]]], ['NWTR', 'Northwest Territories Reports', ['Canada', 'Northwest Territories'], [[1983, 1998]]], ['NWTSCR', 'Northwest Territories Supreme Court Reports', ['Canada', 'Northwest Territories'], [[1889, 1900]]], ['OAC', 'Ontario Appeal Cases', ['Canada'], [[1984, 2013]]], ['OAR', 'Ontario Appeal Reports', ['Canada', 'Ontario'], [[1876, 1900]]], ['OELD', 'Ontario Environmental Law Digest', ['Canada', 'Ontario'], [[1996, 2013]]], ['OFLR', 'Ontario Family Law Reporter', ['Canada', 'Ontario'], [[1987, 2013]]], ['OHRCBI', 'Ontario Human Rights Commission - Board of Inquiry', ['Canada', 'Ontario'], [[1963, 1996]]], ['OHRC Dec', 'Ontario Human Rights Commission Decisions', ['Canada', 'Ontario'], [[1956, 1996]]], ['OHRC Transcr', 'Ontario Human Rights Commission, Trancripts of Selected Hearings', ['Canada', 'Ontario'], [[1968, 1973]]], ['OICArb', 'Ontario Insurance Commission - Arbitration Cases', ['Canada', 'Ontario'], [[1995, 2013]]], ['Olmsted PC', "Olmsted's Privy Council Decisions", ['Canada'], [[1867, 1954]]], ['OLR', 'Ontario Law Reports', ['Canada', 'Ontario'], [[1900, 1931]]], ['OLRB Rep', 'Ontario Labour Relations Board Reports', ['Canada', 'Ontario'], [[1944, 2013]]], ['OMB Dec', 'Ontario Municipal Board Decisions', ['Canada', 'Ontario'], [[1953, 1994]]], ['OMB Index', 'Ontario Municipal Board Index to Applications Disposed of', ['Canada', 'Ontario'], [[1969, 1992]]], ['OMBEAB', 'Joint Board of the Ontario Municipal Board and the Environmental Assessment Board Decisions', ['Canada', 'Ontario'], [[1984, 2013]]], ['OMBR', 'Ontario Municipal Board Reports', ['Canada', 'Ontario'], [[1973, 2013]]], ['ONED', 'Office national de lenergie, decisions', ['Canada'], [[1970, 2013]]], ["Ont Building Code Comm'n Rulings", 'Ontario Building Code Commission Rulings', ['Canada', 'Ontario'], [[1980, 1990]]], ['Ont CIP OM', "Commissaire a l'information eta Ia protection de la vie privee de I'Ontario, ordonnances, s&#233;xe9rie M", ['Canada', 'Ontario'], [[1988, 1998]]], ['Ont CIP OP', "Commissaire a l'information et&#233;xe9 Ia protection de la vie priv&#233;xe9e de I'Ontario, ordonnances, s&#233;xe9rie P", ['Canada', 'Ontario'], [[1989, 1998]]], ['Ont CIP somm', "Commissaire a l&#233;u2018information et&#233;xe9 Ia protection de app la vie privee de I'Ontario, sommaires des appels", ['Canada', 'Ontario'], [[1990, 1992]]], ['ONTD (a&#233;xe9rien)', 'Office national des transports du Canada decisions (transport a&#233;xe9rien)', ['Canada'], [[1988, 1992]]], ['ONTD (chemins de fer)', 'Office national des transports du Canada decisions (chemins defer)', ['Canada'], [[1988, 1991]]], ['Ont D', 'Crim Ontario Decisions&#233;u2014Criminal', ['Canada', 'Ontario'], [[1997, 1999]]], ['Ont D', 'Crim Cony Ontario Decisions&#233;u2014Criminal Convictions Cases', ['Canada', 'Ontario'], [[1980, 1996]]], ['Ont D', 'Crim Sent Ontario Decisions&#233;u2014Criminal Sentence Cases', ['Canada', 'Ontario'], [[1984, 1996]]], ["Ont Educ Rel Comm'n Grievance Arb", 'Ontario Education Relations Commission Grievance Arbitrations', ['Canada', 'Ontario'], [[1970, 1985]]], ['Ont Elec', 'Ontario Election Cases', ['Canada', 'Ontario'], [[1884, 1900]]], ['Ont En Bd Dec', 'Ontario Energy Board Decisions', ['Canada', 'Ontario'], [[1961, 2013]]], ['Oft Envtl Assessment Bd Decisions Dec', 'Ontario Environmental Assessment Board', ['Canada', 'Ontario'], [[1980, 2013]]], ['Ont Health Disciplines Bd Dec', 'Ontario Health Disciplines Board Decisions', ['Canada', 'Ontario'], [[1980, 2013]]], ['Ont IPC OM', 'Ontario Information and Privacy Commissioner, Orders, M Series', ['Canada', 'Ontario'], [[1988, 1998]]], ['Ont IPC OP', 'Ontario Information and Privacy Commissioner, Orders, P Series', ['Canada', 'Ontario'], [[1989, 1998]]], ['Ont IPC Sum App', 'Ontario Information and Privacy Commissioner, Summaries of Appeals', ['Canada', 'Ontario'], [[1990, 1992]]], ["Ont Lab-Mgmt Arb Comm'n Bull", 'Ontario Labour-Management Arbitration Commission Bulletin', ['Canada', 'Ontario'], [[1978, 1986]]], ['Ont Liquor Licence App Trib Dec', 'Ontario Liquor Licence Appeal Tribunal, Summaries of Decisions', ['Canada', 'Ontario'], [[1977, 1981]]], ['Ont Min Community & Soc Serv Rev Bd Dec', 'Ontario Ministry of Community and Social  Services Review Board Decisions', ['Canada', 'Ontario'], [[1974, 1978]]], ['Ont Pol R', 'Ontario Police Reports', ['Canada', 'Ontario'], [[1980, 2013]]], ['OPR', 'Ontario Practice Reports', ['Canada', 'Ontario'], [[1848, 1901]]], ['OR', 'Ontario Reports', ['Canada', 'Ontario'], [[1882, 1900], [1931, 1973]]], ['OR (2d)', 'Ontario Reports (Second Series)', ['Canada', 'Ontario'], [[1973, 1990]]], ['OR (3d)', 'Ontario Reports (Third Series)', ['Canada', 'Ontario'], [[1991, 2013]]], ['OSC Bull', 'Ontario Securities Commission Bulletin', ['Canada', 'Ontario'], [[1949, 2013]]], ['OSCWS', 'Ontario Securities Commission Weekly Summary', ['Canada', 'Ontario'], [[1967, 1980]]], ['OWCAT Dec', "Ontario Workers' Compensation Appeals Tribunal Decisions", ['Canada', 'Ontario'], [[1986, 1989]]], ['OWN', 'Ontario Weekly Notes', ['Canada', 'Ontario'], [[1909, 1962]]], ['OWR', 'Ontario Weekly Reporter', ['Canada', 'Ontario'], [[1902, 1916]]], ['Patr Elec Cas', "Patrick's Election Cases (Upper Canada / Canada West)", ['Canada', 'Ontario'], [[1824, 1849]]], ['PEI', 'Prince Edward Island Supreme Court Reports', ['Canada', 'Prince Edward Island'], [[1850, 1882]]], ['PER', 'Pay Equity Reports', ['Canada', 'Ontario'], [[1990, 2013]]], ['Per CS', 'Extraits ou precedents des arr&#233;xeats tires des registres du Conseil sup&#233;xe9rieur de Qu&#233;xe9bec (Perrault)', ['Canada', 'Quebec'], [[1727, 1759]]], ['Perr P', 'Extraits ou precedents des arr&#233;xe9ts tires des registres de Ia pr&#233;xe9vost&#233;xe9 de Qu&#233;xe9bec', ['Canada', 'Quebec'], [[1753, 1854]]], ['Peters', "Peters' Prince Edward Island Reports", ['Canada', 'Prince Edward Island'], [[1850, 1872]]], ['PNGCB Alta', 'Petroleum and Natural Gas Conservation Board of Alberta', ['Canada', 'Alberta'], [[1938, 1957]]], ['PPR', 'Planning and Property Reports', ['Canada', 'Ontario'], [[1960, 1963]]], ['PPSAC', 'Personal Property Security Act Cases', ['Canada'], [[1977, 1990]]], ['PPSAC (2d)', 'Personal Property Security Act Cases (Second Series)', ['Canada'], [[1991, 2000]]], ['PPSAC (3d)', 'Personal Property Security Act Cases (Third Series)', ['Canada'], [[2001, 2013]]], ['PRBC', 'Procurement Review Board of Canada Decisions', ['Canada'], [[1990, 2013]]], ['PRBR', 'Pension Review Board Reports', ['Canada'], [[1972, 1986]]], ['Pyke', "Pyke's Reports", ['Canada', 'Quebec'], [[1809, 1810]]], ['QAC', 'Qu&#233;xe9bec Appeal Cases', ['Canada', 'Quebec'], [[1986, 1995]]], ['Qc Comm dp dec', 'Qu&#233;xe9bec Commission des droits de Ia personne, decisions des tribunaux', ['Canada', 'Quebec'], [[1977, 1981]]], ['QLR', 'Quebec Law Reports', ['Canada', 'Quebec'], [[1875, 1891]]], ['QPR', 'Qu&#233;xe9bec Practice Reports', ['Canada', 'Quebec'], [[1896, 1944]]], ['RAC', 'Ramsay, Appeal Cases', ['Canada', 'Quebec'], [[1873, 1886]]], ['RAT', "Recueil d'arr&#233;xeats sur les transports", ['Canada'], [[1966, 1977]]], ['RCCT', 'Recueil des decisions de Ia Commission canadienne des transports', ['Canada'], [[1978, 1986]]], ['RCDA', "Recueil des decisions de Ia Commission du droit d'auteur", ['Canada'], [[1990, 1994]]], ['RCDA', 'Recueil de jurisprudence canadienne en droit des assurances', ['Canada'], [[1983, 1991]]], ['RCDA (2e)', 'Recueil de jurisprudence canadienne en droit des assurances (deuxi&#233;xe9me s&#233;xe9rie)', ['Canada'], [[1991, 1998]]], ['RCDA(3e)', 'Recueil de jurisprudence canadienne en droit des assurances (troisi&#233;xe9me s&#233;xe9rie)', ['Canada'], [[1998, 2013]]], ['RCDE', "Recueil de jurisprudence canadienne en droit de l'environnement", ['Canada'], [[1978, 1985]]], ['RCDE (ns)', "Recueil de jurisprudence canadienne en droit de l'environnement (nouvelle serie)", ['Canada'], [[1986, 2013]]], ["RC de I'&#233;xc9", "Recueil des arr&#233;xeats de Ia Cour de l'Echiquier", ['Canada'], [[1875, 1922]]], ["RC de l'&#233;xc9", "Rapports judiciaires du Canada: Cour de l'Echiquier", ['Canada'], [[1823, 1970]]], ['RCDF', 'Recueil de jurisprudence canadienne en droit de Ia faillite', ['Canada'], [[1920, 1960]]], ['RCDF (2e)', 'Recueil de jurisprudence canadienne en droit de Ia faillite (deuxieme serie)', ['Canada'], [[1960, 1990]]], ['RCDF (3e)', 'Recueilde jurisprudence canadienne en droit de Ia faillite (troisieme s&#233;xe9rie)', ['Canada'], [[1991, 1998]]], ['RCDF (4e)', 'Recueil de jurisprudence canadienne en droit de la faillite (quatrieme s&#233;xe9rie)', ['Canada'], [[1998, 2013]]], ['RCDSST', 'Recueil de jurisprudence canadienne en droit de la sante et de s&#233;xe9curit&#233;xe9 au travail', ['Canada'], [[1989, 1993]]], ['RCDT', 'Recueilde jurisprudence canadienne en droit du travail', ['Canada'], [[1983, 1994]]], ['RCDT(2e)', 'Recueil de jurisprudence canadienne en droit du travail (deuxi&#233;xe8me serie)', ['Canada'], [[1994, 2000]]], ['RCDT (3e)', 'Recueil de jurisprudence canadienne en droit du travail (troisi&#233;xe9me s&#233;xe9rie)', ['Canada'], [[2000, 2013]]], ['RCDVM', 'Recueil de jurisprudence canadienne en droit des valeurs mobili&#233;xe8res', ['Canada'], [[1993, 1998]]], ['RCF', 'Recueil des decisions des Cours f&#233;xe9d&#233;xe9rales', ['Canada'], [[1971, 2013]]], ['RCRAS', "Recueil do jurisprudence canadienne en mati&#233;xe8re de retraite et d'avantages sociaux", ['Canada'], [[1994, 2013]]], ['RCRC', 'Recueil de jurisprudence canadienne en responsabilit&#233;xe9 civile', ['Canada'], [[1976, 1990]]], ['RCRC (2e)', 'Recueil de jurisprudence canadienne en responsabilit&#233;xe9 civile (deuxi&#233;xe8me s&#233;xe9rie)', ['Canada'], [[1990, 2000]]], ['RCRC (3e)', 'Recueil de jurisprudence canadienne en responsabilite civile (troisieme serie)', ['Canada'], [[2000, 2013]]], ['RCRP', 'Recueil des arr&#233;xeats du Conseil de revision des pensions', ['Canada'], [[1972, 1986]]], ['RCS', 'Rapports judiciaires du Canada : Cour supreme', ['Canada'], [[1923, 1969]]], ['RCS', 'Recueils des arr&#233;xe9ts de Ia Cour supreme du Canada', ['Canada'], [[1877, 1922], [1970, 2013]]], ['RCTC', 'Rapports de Ia Commission do Tarif', ['Canada'], [[1937, 1988]]], ['RDCFQ', "Recueil des decisions, Commission do la fonction publique et Comit&#233;xe9 d'appel de la fonction publique", ['Canada', 'Quebec'], [[1990, 2013]]], ['RDF', 'Recueil do droit de la famille', ['Canada'], [[1986, 2013]]], ['RDFQ', 'Recueil de droit fiscal quebecois', ['Canada', 'Quebec'], [[1977, 2013]]], ['RDI', 'Recueil de droit immobilier', ['Canada', 'Quebec'], [[1986, 2013]]], ['RDJ', 'Revue de droitjudiciaire', ['Canada', 'Quebec'], [[1983, 1996]]], ['RDJC', 'Recueil do droit judiciaire de Carswell', ['Canada'], [[1976, 1985]]], ['RDJC (2e)', 'Recueil de droit judiciaire de Carswell (deuxierne serie)', ['Canada'], [[1985, 1992]]], ['RDJC (3e)', 'Recueil de droit judiciaire de Carswell (troisi&#233;xe8rne serie)', ['Canada'], [[1992, 1997]]], ['RDJC (4e)', 'Recueil de droit judiciaire de Carswell (quatrierne serie)', ['Canada'], [[1997, 2001]]], ['RDJC (5e)', 'Recueil de droit judiciaire de Carswell (cinquieme serie)', ['Canada'], [[2001, 2013]]], ['RDP', 'Revue de droit penal', ['Canada', 'Quebec'], [[1978, 1983]]], ['RDRTQ', 'Recueil des decisions, Regie des telecommunications du Qu&#233;xe9bec', ['Canada', 'Quebec'], [[1990, 2013]]], ['RDT', 'Revue de droit du travail', ['Canada', 'Quebec'], [[1963, 1976]]], ['RECJ', 'Records of the Early Courts of Justice of Upper Canada', ['Canada', 'Ontario'], [[1789, 1984]]], ['Rev serv arb', "Revue des services d'arbitrage", ['Canada'], [[1977, 2013]]], ['RFL', 'Reports of Family Law', ['Canada'], [[1971, 1978]]], ['RFL (2d)', 'Reports of Family Law (Second Series)', ['Canada'], [[1978, 1986]]], ['RFL (3d)', 'Reports of Family Law (Third Series)', ['Canada'], [[1986, 1994]]], ['RFL (4th)', 'Reports of Family Law (Fourth Series)', ['Canada'], [[1994, 2000]]], ['RFL (5th)', 'Reports of Family Law (Fifth Series)', ['Canada'], [[2000, 2013]]], ['RIAA', 'Report of International Arbitral Award', ['International'], [[1948, 2013]]], ['Ritch Eq Rep', "Ritchie's Equity Reports", ['Canada', 'Nova Scotia'], [[1873, 1882]]], ['RJ imm', 'Recueil de jurisprudence en droit de l&#233;u2018immigration', ['Canada'], [[1985, 1987]]], ['RJ imm (2e)', 'Recueil de jurisprudence en droit de l&#233;u2018immigration (deuxi&#233;xe8me s&#233;xe9rie)', ['Canada'], [[1987, 1999]]], ['RJ imm (2e)', "Recueil de jurisprudence en droit de l'immigration (deuxi&#233;xe8me s&#233;xe9rie)", ['Canada'], [[1999, 2013]]], ['RJC', 'Recueil de jurisprudence en droit criminel', ['Canada'], [[1946, 1967]]], ['RJC (ns)', 'Recueil de jurisprudence en droit criminel (nouvelle s&#233;xe9rie)', ['Canada'], [[1967, 1978]]], ['RJC (3e)', 'Recueil de jurisprudence en droit criminel (troisi&#233;xe8me s&#233;xe9rie)', ['Canada'], [[1978, 1991]]], ['RJC (4e)', 'Recueil de jurisprudence en droit criminel (quatri&#233;xe8me s&#233;xe9rie)', ['Canada'], [[1991, 1996]]], ['RJC (5e)', 'Recueil dejurisprudence en droit criminel (cinqui&#233;xe8me s&#233;xe9rie)', ['Canada'], [[1997, 2013]]], ['RJDA', 'Recueil dejurisprudence en droit des affaires', ['Canada'], [[1977, 1990]]], ['RJDA(2e)', 'Recueil de jurisprudence en droit des affaires (deuxi&#233;xe8me s&#233;xe9rie)', ['Canada'], [[1991, 2013]]], ['RJDA(2e)', 'Recueil de jurisprudence en droit des affaires (deuxi&#233;xe8me s&#233;xe9rie)', ['Canada'], [[1991, 1999]]], ['RJDA (3e)', 'Recueil de jurisprudence en droit des affaires (troisi&#233;xe8me s&#233;xe9rie)', ['Canada'], [[2000, 2013]]], ['RJDC', 'Recueil do jurisprudence en droit de le construction', ['Canada'], [[1983, 1992]]], ['RJDC (2e)', 'Recueil de jurisprudence en droit de la construction (deuxi&#233;xe8me s&#233;xe9rie)', ['Canada'], [[1992, 2000]]], ['RJDC (3e)', 'Recueil de jurisprudence en droit de la construction (troisi&#233;xe8me s&#233;xe9rie)', ['Canada'], [[2000, 2013]]], ['RJDI', 'Recueil de jurisprudence en droit immobilier', ['Canada'], [[1977, 1989]]], ['RJDI (2e)', 'Recueil de jurisprudence en droit immobilier (deuxi&#233;xe8me s&#233;xe9rie)', ['Canada'], [[1989, 1996]]], ['RJDI(3e)', 'Recueil de jurisprudence en droit immobilier (troisi&#233;xe8me s&#233;xe9rie)', ['Canada'], [[1996, 2013]]], ['RJDM', 'Recueil de jurisprudence en droit municipal', ['Canada'], [[1976, 1990]]], ['RJDM (2e)', 'Recueil de jurisprudence en droit municipal (deuxi&#233;xe8me s&#233;xe9rie)', ['Canada'], [[1991, 2013]]], ['RJDT', 'Recueil do jurisprudence en droit du travail', ['Canada', 'Quebec'], [[1998, 2013]]], ['RJF', 'Recueil de jurisprudence en droit de la famille', ['Canada'], [[1971, 1978]]], ['RJF (2e)', 'Recueil do jurisprudence en droit de la famille (deuxi&#233;xe8me s&#233;xe9rie)', ['Canada'], [[1978, 1986]]], ['RJF(3e)', 'Recueil de jurisprudence en droit do Ia famille (troisi&#233;xe9me s&#233;xe9rie)', ['Canada'], [[1986, 1994]]], ['RJF (4e)', 'Recueil de jurisprudence en droit do Ia famille (quatri&#233;xe9me s&#233;xe9rie)', ['Canada'], [[1994, 2000]]], ['RJF (5e)', 'Recueil de jurisprudence en droit do Ia famille (cinqui&#233;xe8me serie)', ['Canada'], [[2000, 2013]]], ['RJO (3e)', 'Recuell do jurisprudence do &#233;u2018Ontario (troisieme s&#233;xe9rie) (1882-1 991SvoirOntario Reports)', ['Canada', 'Ontario'], [[1991, 2013]]], ['RJQ', 'Recueils de jurisprudence du Qu&#233;xe9bec', ['Canada', 'Quebec'], [[1875, 1891], [1975, 2013]]], ['RL', 'Revue legale', ['Canada', 'Quebec'], [[1869, 1892]]], ['RL', 'Revue legale', ['Canada', 'Quebec'], [[1943, 2013]]], ['RL (ns)', 'Revue l&#233;xe9gale (nouvelle s&#233;xe9rie)', ['Canada', 'Quebec'], [[1895, 1943]]], ['RNB (2d)', 'Recueil des arr&#233;xe9ts du Nouveau Brunswick (deuxi&#233;xe9me s&#233;xe9rie)', ['Canada', 'New Brunswick'], [[1969, 2013]]], ['RONTC', "Recueil des decisions de l'office national des transports du Canada", ['Canada'], [[1988, 2013]]], ['RPEI', 'Reports of cases determined in the Supreme Court, Court of Chancery and Court of Vice-Admiralty of Prince Edward Island', ['Canada', 'Prince Edward Island'], [[1850, 1872]]], ['RPQ', 'Rapports do pratique de Qu&#233;xe9bec', ['Canada', 'Quebec'], [[1897, 1982]]], ['RPR', 'Real Property Reports', ['Canada'], [[1977, 1989]]], ['RPR (2d)', 'Real Property Reports (Second Series)', ['Canada'], [[1989, 1996]]], ['RPR (3d)', 'Real Property Reports (Third Series)', ['Canada'], [[1996, 2013]]], ['RPTA', 'Recueil en mati&#233;xe8re de protection du territoire agricole', ['Canada', 'Quebec'], [[1990, 2013]]], ['RRA', 'Recueil en responsabilit&#233;xe9 et assurance', ['Canada', 'Quebec'], [[1986, 2013]]], ['RSA', 'Recueil de sentences arbitrales', ['Canada', 'Quebec'], [[1981, 1983]]], ['RSE', "Recueil des sentences de l'&#233;xe9ducation", ['Canada', 'Quebec'], [[1974, 2013]]], ['RSF', 'Recueil de jurisprudence en droit des successions et des fiducies', ['Canada'], [[1977, 1994]]], ['RSF (2e)', 'Recueil de jurisprudence en droit des successions et des fiducies (deuxi&#233;xe8me s&#233;xe9rie)', ['Canada'], [[1994, 2013]]], ['RSP', 'Recueil des ordonnances de Ia r&#233;xe9gie des services publics', ['Canada', 'Quebec'], [[1973, 1978]]], ['RTC', 'D&#233;xe9cisions et &#233;xe9nonc&#233;xe9s de politique sur la radiodiffusion et les t&#233;xe9l&#233;xe9communications canadiennes', ['Canada'], [[1975, 1985]]], ['Russ ER', "Russ ER Russell's Election Reports", ['Canada', 'Nova Scotia'], [[1874, 1874]]], ['SAFP', 'Sentences arbitrales de la fonction publique', ['Canada', 'Quebec'], [[1983, 2013]]], ['SAG', 'Sentences arbitrales de griefs', ['Canada', 'Quebec'], [[1970, 1981]]], ['SARB Dec', 'Social Assistance Review Board Selected Decisions', ['Canada', 'Ontario'], [[1975, 1986]]], ['SARB Sum', 'Social Assistance Review Board Summaries of Decisions', ['Canada', 'Ontario'], [[1988, 1994]]], ['Sask C Comp B', 'Saskatchewan Crimes Compensation Board, Awards', ['Canada', 'Saskatchewan'], [[1968, 1992]]], ["Sask Human Rights Comm'n Dec", 'Saskatchewan Human Rights Commission Decisions', ['Canada', 'Saskatchewan'], [[1973, 1981]]], ['Sask LR', 'Saskatchewan Law Reports', ['Canada', 'Saskatchewan'], [[1907, 1931]]], ['Sask LRBD', 'Saskatchewan Labour Relations Board Decisions', ['Canada', 'Saskatchewan'], [[1945, 1977]]], ['Sask LRBDC', 'Saskatchewan Labour Relations Board, Decisions and Court Cases', ['Canada', 'Saskatchewan'], [[1945, 1964]]], ['Sask LRBR', 'Saskatchewan Labour Relations Board, Report of Meetings', ['Canada', 'Saskatchewan'], [[1967, 1973]]], ['Sask R', 'Saskatchewan Reports', ['Canada'], [[1980, 2013]]], ['Sask SC Bull', 'Saskatchewan Securities Commission Monthly Bulletin', ['Canada', 'Saskatchewan'], [[1984, 2013]]], ['SCC Cam', 'Canada Supreme Court Cases (Cameron) (Published / publi&#233;xe9 1918)', ['Canada'], [[1887, 1890]]], ['SCC Cam (2d)', 'Canada Supreme Court Reports (Cameron) (Published / publi&#233;xe9 1925)', ['Canada'], [[1876, 1922]]], ['SCC Coutl', 'Canada Supreme Court Cases (Coutlee)', ['Canada'], [[1875, 1907]]], ['SCCB', 'Supreme Court of Canada Bulletin of Proceedings', ['Canada'], [[1970, 2013]]], ['SCCD', 'Supreme Court of Canada Decisions', ['Canada'], [[1978, 2013]]], ['SCCR', 'Supreme Court of Canada Reports Service', ['Canada'], [[1971, 2013]]], ['SCR', 'Canada Law Reports: Supreme Court of  Canada', ['Canada'], [[1923, 1969]]], ['SCR', 'Canada Supreme Court Reports', ['Canada'], [[1877, 1922], [1970, 2013]]], ['Sm & S', "Smith and Sager's Drainage Cases", ['Canada', 'Ontario'], [[1901, 1913]]], ['SOLR', 'Sexual Offences Law Reporter', ['Canada'], [[1994, 2013]]], ['SRLA', "Speakers' Rulings, Legislative Assembly", ['Canada', 'New Brunswick'], [[1923, 1982]]], ['St-MSD', "Saint-Maurice's Speakers' Decisions", ['Canada', 'Quebec'], [[1868, 1885]]], ['STR', 'Canadian Sales Tax Reporter', ['Canada'], [[1968, 1989]]], ['Stu Adm', "Stuart's Vice-Admiralty Reports (Lower Canada)", ['Canada', 'Quebec'], [[1836, 1874]]], ['Stu KB', "Stuart's Reports (Lower Canada)", ['Canada', 'Quebec'], [[1810, 1835]]], ['TA', "Decisions du Tribunal d'arbitrage", ['Canada', 'Quebec'], [[1982, 1997]]], ['TAAT', "Tribunal d'appel des accidents du travail", ['Canada', 'Ontario'], [[1985, 1997]]], ['TAQ', 'Decisions du Tribunal admirfstratif du Qu&#233;xe9bec', ['Canada', 'Quebec'], [[1998, 2013]]], ['Tax ABC', 'Tax Appeal Board Cases', ['Canada'], [[1949, 1966]]], ['Tax ABC (NS)', 'Tax Appeal Board Cases (New Series)', ['Canada'], [[1967, 1972]]], ['TBR', 'Tariff Board Reports', ['Canada'], [[1937, 1988]]], ['TCD', 'Tribunal de Ia Concurrence, decisions', ['Canada'], [[1986, 2013]]], ['TCT', 'Canadian Trade and Commodity Tax Cases', ['Canada'], [[1989, 1992]]], ['TE', "Recueils de jurisprudence du tribunal de l'expropriation", ['Canada', 'Quebec'], [[1972, 1986]]], ['Terr LR', 'Territories Law Reports', ['Canada', 'Northwest Territories'], [[1885, 1907]]], ['TJ', 'Recueils de jurisprudence du Quebec; Tribunal de la jeunesse', ['Canada', 'Quebec'], [[1978, 1985]]], ['TLLR', 'Tenant and Landlord Law Reports', ['Canada', 'Ontario'], [[1983, 1988]]], ['TPEI', "Tucker's Select Cases of Prince Edward Island", ['Canada', 'Prince Edward Island'], [[1817, 1828]]], ['Trib conc dec', 'Tribunal de la concurrence, decisions', ['Canada'], [[1986, 2000]]], ['TSPAAT', "Tribunal d'appel de Ia s&#233;xe9curit&#233;xe9 professionnelle et de l'assurance contre les accidents du travail", ['Canada', 'Ontario'], [[1998, 2013]]], ['TTC', "Hunter's Torrens Title Cases", ['Canada', 'Australia', 'New Zealand', 'United Kingdom'], [[1865, 1893]]], ['TTJ', 'Jurisprudence en droit du travail;Tribunal du travail', ['Canada', 'Quebec'], [[1970, 1981]]], ['TTR', 'Trade and Tariff Reports', ['Canada'], [[1990, 1996]]], ['Turn & R', 'Trade and Tarrif Reports (Second Series)', ['Canada'], [[1996, 2013]]], ['UC Chamb Rep', 'Upper Canada Chambers Reports', ['Canada', 'Ontario'], [[1846, 1852]]], ['UCCP', 'Upper Canada Common Pleas Reports', ['Canada', 'Ontario'], [[1850, 1882]]], ['UCE & A', 'Upper Canada Error and Appeal Reports (Grant)', ['Canada', 'Ontario'], [[1846, 1866]]], ['UCKB', "Upper Canada King's Bench Report (Old Series)", ['Canada', 'Ontario'], [[1831, 1844]]], ['UCQB', "Upper Canada Queen's Bench Reports (New Series)", ['Canada', 'Ontario'], [[1842, 1882]]], ['UCQB (OS)', "Upper Canada Queen's Bench Reports (Old Series)", ['Canada', 'Ontario'], [[1831, 1838]]], ['UIC Dec Ump', 'Unemployment Insurance Commission - Decisions of the Umpire', ['Canada'], [[1943, 2013]]], ['UIC Selec Dec Ump', 'Unemployment Insurance Commission - Selected Decisions of the Umpire', ['Canada'], [[1943, 1949]]], ['WAC', 'Western Appeal Cases', ['Canada'], [[1991, 2013]]], ['WCAT Dec', "Workers' Compensation Appeal Tribunal Decisions", ['Canada', 'Newfoundland & Labrador'], [[1987, 2013]]], ['WCATR', 'Workers Compensation Appeals Tribunal Reporter', ['Canada', 'Ontario'], [[1986, 1997]]], ['WCB', 'Weekly Criminal Bulletin', ['Canada'], [[1976, 1986]]], ['WCB (2d)', 'Weekly Criminal Bulletin (Second Series)', ['Canada'], [[1986, 2013]]], ['WDCP', 'Weekly Digest of Civil Procedure', ['Canada'], [[1985, 1989]]], ['WDCP (2d)', 'Weekly Digest of Civil Procedure (Second Series)', ['Canada'], [[1990, 1994]]], ['WDCP (3d)', 'Weekly Digest of Civil Procedure (Third Series)', ['Canada'], [[1994, 2013]]], ['WDFL', 'Weekly Digest of Family Law', ['Canada'], [[1982, 2013]]], ["West's Alaska", "West's Alaska Digest", ['Canada', 'Alberta'], [[1987, 2013]]], ['WLAC', 'Western Labour Arbitration Cases', ['Canada'], [[1966, 1985]]], ['WLR', 'Western Law Reporter', ['Canada'], [[1905, 1917]]], ['WLRBD', 'Canadian Wartime Labour Relations Board Decisions', ['Canada'], [[1944, 1948]]], ['WLTR', 'Western Law Times and Reports', ['Canada'], [[1890, 1896]]], ['WSIATR', 'Workplace Safety and Insurance Appeals Tribunal Reporter', ['Canada', 'Ontario'], [[1998, 2013]]], ['WWR', 'Western Weekly Reports', ['Canada'], [[1911, 1950], [1971, 2013]]], ['WWR (NS)', 'Western Weekly Reports (New Series)', ['Canada'], [[1951, 1970]]], ['YAD / Young Adm', "Young's Admiralty Decisions", ['Canada', 'Nova Scotia'], [[1864, 1880]]], ['YR', 'Yukon Reports', ['Canada'], [[1986, 1989]]]]
	var JournalList = [['Across Borders', 'Across Borders'], ['Acta Crim', 'Acta Criminologica'], ['Actualit&#233;', 'Actualit&#233;s du droit'], ['Actualit&#233;s jur dr admin', 'Actualit&#233;s juridiques, droit administratif'], ['Actualit&#233;s-Justice', 'Actualit&#233;s-Justice'], ['Actualit&#233; & dr int', 'Actualit&#233; at droit international'], ['Actualit&#233;s del UE', 'Actualit&#233;s de la delegation pour l\'Union Europeenne'], ["Actualit&#233;s d'Unidroit", "Actualit&#233;s d'Unidroit"], ['Adel LR', 'Adelaide Law Review'], ['Adelphla LJ', 'Adelphla Law Journal'], ['Admin & Rag L News', 'Administrative & Regulatory Law News'], ['Admin U Am LJ', 'Administrative Law Journal of the American University (formerly/anciennement Administrative Law Journal)'], ['Admin L Rev', 'Administrative Law Review'], ['Advocate', 'Advocate'], ['Advocate (Idaho)', 'Advocate (Idaho)'], ["Advocates' Q", "Advocates' Quarterly"], ["Advocates' Soc J", "Advocates' Society Journal"], ["Afr-Am L & Pol'y Rep", 'African-American Law and Policy Report'], ['AFL Rev', 'Air Force Law Review'], ['Air & Space L', 'Air & Space Law'], ['Air & Space Law', 'Air & Space Lawyer'], ['Akron L Rev', 'Akron Law Review'], ['Akron Tax J', 'Akron Tax Journal'], ['Ala L Rev', 'Alabama Law Review'], ['Alaska L Rev', 'Alaska Law Review'], ['AIb L Envtl Outlook', 'Albany Law Environmental Outlook'], ['AIb U Sd & Tech', 'Albany Law Journal of Science & Technology'], ['Alb L Rev', 'Albany Law Review'], ['Alta L Q', 'Alberta Law Quarterly'], ['Alta L Rev', 'Alberta Law Review'], ['Alt J', 'Alternatives Journal'], ['AALL Spec', 'American Association of Law Libraries Spectrum'], ['Am Bankr Inst J', 'American Bankruptcy Institute Journal'], ['Am Bankr Inst L Rev', 'American Bankruptcy Institute Law Review'], ['Am Bank LJ', 'American Bankruptcy Law Journal'], ['ABA Antitrust LJ', 'American Bar Association Antitrust Law Journal'], ['ABA Criminal J', 'American Bar Association Criminal Justice'], ['ABA Ent & Sports Law', 'American Bar Association Entertainment & Sports Lawyer'], ['ABA Fam Advocate', 'American Bar Association Family Advocate'], ['ABAFam LQ', 'American Bar Association Family Law Quarterly'], ['ABAJ', 'American Bar Association Journal'], ['ABAPM', 'American Bar Association Law Practice Management'], ['ABAIPL', 'American Bar Association Section of Intellectual Property Law'], ['ABA Tort & Ins LJ', 'American Bar Association Tort and Insurance Law Journal'], ['Am Bus LJ', 'American Business Law Journal'], ['Am Crim L Rev', 'American Criminal Law Review'], ['Am Indian L Rev', 'American Indian Law Review'], ['AIPLAQJ', 'American Intellectual Property Law Association Quarterly Journal'], ['Am J Comp L', 'American Journal of Comparative Law'], ['Am J Crim L', 'American Journal of Criminal Law'], ["Am J Int'l Arb", 'American Journal of International Arbitration'], ["Am J Int'l L", 'American Journal of International Law'], ['Am J Juris', 'American Journal of Jurisprudence'], ['Am J L & Med', 'American Journal of Law & Medicine'], ['Am J Legal Hist', 'American Journal of Legal History'], ["Am J Tax Pol'y", 'American Journal of Tax Policy'], ['Am J Trial Advoc', 'American Journal of Trial Advocacy'], ['Am L & Econ Rev', 'American Law and Economics Review'], ["Am Rev Int'l Arb", 'American Review of International Arbitration'], ["Am Soc Int'l L Rev", 'American Society International Law Review'], ["Am U Int'l L Rev", 'American University International Law Review (formerly American University Journal of International Law & Policy)'], ["Am U J Gender Soc Pol'y & L", 'American University Journal of Gender, Social Policy & the Law (formerly American University Journal of Gender & the Law)'], ["Am U J Int'l L & Pol'y", 'American University Journal of International Law & Policy'], ['Am U L Rev', 'American University Law Review'], ['Anal de pol', 'Analyse de politiques'], ['Anglo-Am L Rev', 'Anglo-American Law Review'], ['Animal L', 'Animal Law'], ['Ann Air & Sp L', 'Annales de droit a&#233;rien et spacial'], ['Ann dr Louv', 'Annales de droit de Louvain'], ['Ann pr md art & lit', 'Annales de La propri&#233;t&#233; industrielle artistique et litt&#233;raire'], ["Ann de l'UssT", "Annales de l'Universit&#233; des sciences sociales de Toulouse"], ['Ann Air & Sp L', 'Annals of Air and Space Law'], ['Annals Health L', 'Annals of Health Law'], ['ACDI', 'Annuaire canadien de droit international'], ['ACDP', 'Annuaire canadien des droits de la personne'], ["Ann Cony Eur DH l'Homme", "Annuaire de La Convention europ&#233;enne des droits de l'Homme"], ['Ann dr a&#233;r & spat', 'Annuaire de droit a&#233;rien et spatial'], ['Ann dr marit & a&#233;r', 'Annuaire de droit maritime et a&#233;rien'], ['Ann dr marit & aero-spat', 'Annuaire de droit maritime et aero-spatial'], ['Ann coIl bc', 'Annuaire des collectivit&#233;s locales'], ['AFDI', 'Annuaire fran&#231;ais de droit international'], ['Ann fr DH', "Annuaire fran&#231;ais des droits de l'Homme"], ['Ann fr transp aer', 'Annuaire fran&#231;ais du transport a&#233;rien'], ['Ann Haye dr int', 'Annuaire de la Haye de droit international'], ['Ann inst dr int', "Annuaire de l'lnstitut de droit international"], ['Ann intj c', 'Annuaire international de justice constitutionnelle'], ['Ann SN', 'Annuaire de La Soci&#233;t&#233; des Nations'], ['Ann S fr dr a&#233;r & spat', 'Annuaire de La Soci&#233;t&#233; francaise de droit a&#233;rien et spatial'], ['Ann leg &#233;trang', 'Annuaire de legislation etrangere'], ['Ann leg fr', 'Annuaire de legislation fran&#231;aise'], ['Ann phil dr', 'Annuaire de philosophie de droit'], ['Ann NU', 'Annuaire des Nations Unies'], ['Ann suisse dr int', 'Annuaire suisse de droit international'], ['Ann Rev Banking L', 'Annual Review of Banking Law'], ['Ann Surv Am L', 'Annual Survey of American Law'], ['Ann Surv Austl L', 'Annual Survey of Australian Law'], ['Ann Surv Commonwealth L', 'Annual Survey of Commonwealth Law'], ['Ann Surv EngI L', 'Annual Survey of English Law'], ["Ann Surv Int'l & Comp L", 'Annual Survey of International & Comparative Law'], ['Ann Surv S Afr L', 'Annual Survey of South African Law'], ['Antitrust', 'Antitrust'], ['Antitrust Bull', 'Antitrust Bulletin'], ['Antitrust L & Econ Rev', 'Antitrust Law and Economics Review'], ['Antitrust LJ', 'Antitrust Law Journal'], ["An Mex Der Int'l", 'Anuario Mexicano de Derecho Internacional'], ['Appeal', 'Appeal: Review of Current Law and Law Reform'], ['Arab LQ', 'Arab Law Quarterly'], ["Arb Int'l", 'Arbitration International'], ['AOR', 'Archiv des Oeffentlichen Rechts'], ['ACP', 'Archiv fuer die civilistische Praxis'], ['ARSP', 'Archly fur rechts- und Sozialphilosophie'], ['Ariz Bar J', 'Arizona Bar Journal'], ["Ariz J Int'l & Comp L", 'Arizona Journal of International & Comparative Law'], ['Ariz L Rev', 'Arizona Law Review'], ['Ariz St LJ', 'Arizona State Law Journal'], ['Ark L Rev', 'Arkansas Law Review'], ['Art Ant & L', 'Art, Antiquity, and the Law'], ['Al & L', 'Artificial Intelligence and Law'], ['Army Law', 'Army Lawyer'], ['Asian LJ', 'Asian Law Journal'], ['Asia Pac J Envtl L', 'Asia Pacific Journal of Environmental Law'], ['Asia Pac J HR & L', 'Asia-Pacific Journal of Human Rights and the Law'], ["Asia Pac J Int'l L", 'Asia Pacific Journal of International Law'], ['Asia Pac L Rev', 'Asia Pacific Law Review'], ['Asian Pac Am LJ', 'Asian-Pacific American Law Journal (formerly/anciennement Asian American Pacific Islands Law Journal)'], ["Asian Pac L & Pol'y J", 'Asian-Pacific Law & Policy Journal'], ['AELJ', 'Atomic Energy Law Journal'], ['Auckland U L Rev', 'Auckland University Law Review'], ['Austl Crim & NZJ', 'Australian & New Zealand Journal of Criminology'], ['Austl Bar Rev', 'Australian Bar Review'], ['Austl Bus L Rev', 'Australian Business Law Review'], ['Austl Comp & Cons LJ', 'Australian Competition and Consumer Law Journal'], ['Austl Ins LJ', 'Australian Insurance Law Journal'], ['Austl J Contract L', 'Australian Journal of Contract Law'], ['Austl J Corp L', 'Australian Journal of Corporate Law'], ['Austl J Fam L', 'Australian Journal of Family Law'], ['Austl J H R', 'Australian Journal of Human Rights'], ['Austi J Lab L', 'Australian Journal of Labour Law'], ['Austl J Legal Hist', 'Australian Journal of Legal History'], ['Austl L J', 'Australian Law Journal'], ['Austl Prop LJ', 'Australian Property Law Journal'], ['Aust Torts LJ', 'Australian Torts Law Journal'], ["Aus J Pub & Int'l L", 'Austrian Journal of Public and International Law'], ["Aus Rev Int'l & Eur L", 'Austrian Review of International and European Law'], ['Baltimore L Rev', 'Baltimore Law Review'], ['BFLR', 'Banking and Finance Law Review'], ['Banking LJ', 'Banking Law Journal'], ["Banking Pol'y Rep", 'Banking Policy Report'], ['Bankr Dev J', 'Bankruptcy Developments Journal'], ['B & dr', 'Banque et droit'], ['Bar & Bench ND', 'Bar & Bench News Digest'], ['Baylor L Rev', 'Baylor Law Review'], ['Barrister', 'Barrister'], ['Behav Sci & L', 'Behavioural Sciences and the Law'], ['Berkeley J Emp & Lab L', 'Berkeley Journal of Employment and Labour Law'], ['Berkeley J Health Care L', 'Berkeley Journal of Health Care Law'], ["Berkeley J Int'l L", 'Berkeley Journal of International Law'], ['Berkeley Tech LJ', 'Berkeley Technology Law Journal'], ["Berkeley Women's LJ", "Berkeley Women's Law Journal"], ['Biotech L Rep', 'Biotechnology Law Report'], ['Bol Mex Der Comp', 'Boletin Mexicano de Derecho Comparado'], ['Boston Bar J', 'Boston Bar Journal'], ['BC Envtl Aff L Rev', 'Boston College Environmental Affairs Law Review'], ["BC Int'l & Comp L Rev", 'Boston College International & Comparative Law Review'], ['BCL Rev', 'Boston College Law Review'], ['BC Third World LJ', 'Boston College Third World Law Journal'], ["BU Int'l LJ", 'Boston University International Law Journal'], ['BUJ Sd & Tech L', 'Boston University Journal of Science & Technology Law'], ['BUJ Tax L', 'Boston University Journal of Tax Law'], ['BUL Rev', 'Boston University Law Review'], ['BU Pub Int LJ', 'Boston University Public Interest Law Journal'], ['Brandeis LJ', 'Brandeis Law Journal'], ['Brief Speaking', 'Briefly Speaking'], ['BYU Educ & LJ', 'Brigham Young University Education & Law Journal'], ['BYUL Rev', 'Brigham Young University Law Review'], ['BCLN', 'British Columbla Law Notes'], ["Brit Inst Int'l & Comp L", 'British Institute of International and Comparative Law'], ['Brit J Crim', 'British Journal of Criminology'], ['Brit Med J', 'British Medical Journal'], ['Brit Tax Rev', 'British Tax Review'], ["Brit YB Int'l L", 'British Yearbook of International Law'], ["Brook J Int'l L", 'Brooklyn Journal of International Law'], ['Brook L Rev', 'Brooklyn Law Review'], ['Buff Crim L Rev', 'Buffalo Criminal Law Review'], ['Buff Envtl LJ', 'Buffalo Environmental Law Journal'], ['Buff HRL Rev', 'Buffalo Human Rights Law Review'], ['Buff L Rev', 'Buffalo Law Review'], ['Buff Pub nt LJ', 'Buffalo Public Interest Law Journal'], ["Buff Women's LJ", "Buffalo Women's Law Journal"], ['Bull can VIH-SIDA & D', 'Bulletin canadien VIH-SIDA et droit'], ['Bull Leg Dev', 'Bulletin of Legal Developments'], ['Bull infoact jur', "Bulletin d'information sur les activit&#233;s juridiques (Conseil de l'Europe)"], ['Bull Inst dirrom', "Bullettino dell'lstituto di diritto romano"], ['BNA Patent, TM & Copyright J', 'Bureau of National Affairs Patent, Trademark and Copyright Journal'], ['Bus & L', 'Business and the Law'], ['Bus L Rev', 'Business Law Review'], ['Bus Law', 'Business Lawyer'], ['Bus Q', 'Business Quarterly'], ['BYUJ Pub L', 'BYU Journal of Public Law'], ['C de D', 'Cahiers de droit'], ['C de D entr', "Cahiers de droit de I'entreprise"], ['C de D eur', 'Cahiers de droit europeen'], ['C du Cons Const', 'Cahiers du Conseil Constitutiormel'], ['CIQAJ', "Cahiers de l'Institut queb&#233;cois dadministration judiciaire"], ['CPI', 'Cahiers de propriet&#233; intellectuelle'], ['Cal Bankr J', 'California Bankruptcy Journal'], ['Cal Crim L Rev', 'California Criminal Law Review'], ['Cal L Rev', 'California Law Review'], ['Cal Reg L Rep', 'California Regulatory Law Reporter'], ['Cal St BJ', 'California State Bar Journal'], ["Cal W Int'l LJ", 'California Western International Law Journal'], ['Cal WL Rev', 'California Western Law Review'], ['Cambridge LJ', 'Cambridge Law Journal'], ['Cambridge YB Eur Legal Stud', 'Cambridge Yearbook of European Legal Studies'], ['Campbell L Rev', 'Campbell Law Review'], ['Can LJ', 'Canada Law Journal'], ['Can-USLJ', 'Canada-United States Law Journal'], ['CBA Papers', 'Canadian Bar Association Papers'], ['CBAYB', 'Canadian Bar Association Year Book'], ['Can Bar J', 'Canadian Bar Journal'], ['Can Bar Rev', 'Canadian Bar Review'], ['Can Bioethics R', 'Canadian Bioethics Report'], ['Can Bus LJ', 'Canadian Business Law Journal'], ['Can Bus Rev', 'Canadian Business Review'], ['Can Class Action Rev', 'Canadian Class Action Review'], ['Can Comm L Rev', 'Canadian Communications Law Review'], ['Can Community LJ', 'Canadian Community Law Journal'], ["Can Compet Pol'y Rec", 'Canadian Competition Policy Record'], ['Can Comp Rec', 'Canadian Competition Record.'], ["Can Council Int'l L Proc", 'Canadian Council on International Law: Proceedings'], ['Can Crim L Rev', 'Canadian Criminal Law Review'], ['Can Crim Forum', 'Canadian Criminology Forum'], ['Can Curr Tax', 'Canadian Current Tax'], ['Can Envtl LN', 'Canadian Environmental Law News'], ['Can Fam LQ', 'Canadian Family Law Quarterly'], ["Can HIV/AIDS Pol'y & L Rev", 'Canadian HIV/AIDS Policy & Law Review'], ['Can HR Advoc', 'Canadian Human Rights Advocate'], ['Can Hum Rts YB', 'Canadian Human Rights Yearbook'], ['CIPR', 'Canadian Intellectual Property Review'], ["Can Int'l Law", 'Canadian International Lawyer'], ['Can J Admin L & Prac', 'Canadian Journal of Administrative Law & Practice'], ['Can J Corr', 'Canadian Journal of Corrections'], ['Can J Crim', 'Canadian Journal of Criminology'], ['Can J Crim & Corr', 'Canadian Journal of Criminology and Corrections'], ['Can J Fam L', 'Canadian Journal of Family Law'], ['Can J Ins L', 'Canadian Journal of Insurance Law'], ["Can J Int'l Bus L & Pol'y", 'Canadian Journal of International Buseness Law and Policy'], ['Can JL & Jur', 'Canadian Journal of Law and Jurisprudence'], ['CJLS', 'Canadian Journal of Law and Society'], ['CJLT', 'Canadian Journal of Law and Technology'], ['CJWL', 'Canadian Journal of Women and the Law'], ['CLELJ', 'Canadian Labour & Employment Law Journal'], ['Can L L', 'Canadian Law Libraries'], ['Can L Rev', 'Canadian Law Review'], ['Can LT', 'Canadian Law Times'], ['Can Law', 'Canadian Lawyer'], ['Can Legal Stud', 'Canadian Legal Studies'], ['Can Med Assoc J', 'Canadian Medical Association Journal'], ['Can Mun J', 'Canadian Municipal Journal'], ['Can NL Bull', 'Canadian Native Law Bulletin'], ['Can Pub Poly', 'Canadian Public Policy'], ['Can Tax Found', 'Canadian Tax Foundation (Conference Report / Rapport de conference)'], ['Can Tax Highlights', 'Canadian Tax Highlights'], ['Can Tax J', 'Canadian Tax Journal'], ['Can Tax N', 'Canadian Tax News'], ["Can Tax'n: J Tax PoI'y", 'Canadian Taxation: A Journal of Tax Policy'], ["Can YB Int'l Law", 'Canadian Yearbook of International Law'], ['Capital UL Rev', 'Capital University Law Review'], ['Cardozo Arts & Ent LJ', 'Cardozo Arts & Entertainment Law Journal'], ['Cardozo EL Bull', 'Cardozo Electronic Law Bulletin'], ["Cardozo J Int'l & Comp L", 'Cardozo Journal of International & Comparative Law (formerly New Europe Law Review)'], ['Cardozo L Rev', 'Cardozo Law Review'], ['Cardozo Stud L & Lit', 'Cardozo Studies in Law and Literature'], ["Cardozo Women's LJ", "Cardozo Women's Law Journal"], ['Caribbean L Rev', 'Caribbean Law Review'], ['Car LJ', 'Carolina Law Journal'], ["Case W Res J Int'l L", 'Case Western Reserve Journal of International Law'], ['Case W Res L Rev', 'Case Western Reserve Law Review'], ['Cath Law', 'Catholic Lawyer'], ['Cath LJ L Rev', 'Catholic University Law Review'], ['Chapman L Rev', 'Chapman Law Review'], ["Chicago J Int'l L", 'Chicago Journal of International Law'], ['Chicagio-Kent L Rev', 'Chicago-Kent Law Review'], ['Chicano-Latino L Rev', 'Chicano-Latino Law Review (formerly Chicano Law Review)'], ['Chicago Law', 'Chicago Lawyer'], ['Chicago Legal F', 'Chicago Legal Forum'], ['Child Legal Rts J', "Children's Legal Rights Journal"], ['China L Rep', 'China Law Reporter'], ["Chinese YB Int'l L & Aff", 'Chinese Yearbook of International Law and Affairs'], ["Chitty's LJ", "Chitty's Law Journal"], ['Circles', "Circles: Buffalo Women's Journal of Law & Social Policy"], ['Civ Lib Rev', 'Civil Liberties Review'], ['CJQ', 'Civil Justice Quarterly'], ['Clev St L Rev', 'Cleveland State Law Review'], ['Clev-Marshall L Rev', 'Cleveland-Marshall Law Review'], ['Clinical L Rev', 'Clinical Law Review'], ['Coastal Mgmt', 'Coastal Management'], ['Codicillus', 'Codicillus'], ["Cob J Int'l Envtl L & Pol'y", 'Colorado Journal of International Environmental Law & Policy'], ['Cob Law', 'Colorado Lawyer'], ['Colum Bus L Rev', 'Columbia Business Law Review'], ['Colum HRL Rev', 'Columbia Human Rights Law Review'], ['Colum J Asian Law', 'Columbia Journal of Asian Law (formerly Journal of Chinese Law)'], ['Colum J E Eur L', 'Columbia Journal of East European Law'], ['Colum J Envtl L', 'Columbia Journal of Environmental Law'], ['Colum J Eur L', 'Columbia Journal of European Law'], ['Colum J Gender & L', 'Columbia Journal of Gender and Law'], ['Colum JL & Soc Probs', 'Columbia Journal of Law and Social Problems'], ["Colum J Transnat'l L", 'Columbia Journal of Transnational Law'], ['Colum L Rev', 'Columbia Law Review'], ['Colum Sci & Tech L Rev', 'Columbia Science and Technology Law Review'], ['Colum-VLA J L & Arts', 'Columbia-VLA Journal of Law & the Arts'], ['Com LJ', 'Commercial Law Journal'], ['Com Leasing L & Strategy', 'Commercial Leasing Law and Strategy'], ['C L World Rev', 'Common Law World Review'], ['CML Rev', 'Common Market Law Review'], ['Commonwealth L Bull', 'Commonwealth Law Bulletin'], ['Commonwealth Legal Educ', 'Commonwealth Legal Education'], ["Comm L & Pol'y", 'Communication Law & Policy'], ['Comm Law', 'Communications Lawyer'], ['Communiqu&#233; ICJ', 'Communiqu&#233; - International Court of Justice'], ["Comp & Int'l US Afr", 'Comparative and International Law Journal of Southern Africa'], ['Comp Jurid Rev', 'Comparative Juridical Review'], ["Comp Lab L & Pol'y J", 'Comparative Labor Law & Policy Journal (formerly Comparative Labor Law Journal)'], ['D&#233;bats', "Comptes rendus stenographiques des d&#233;bats (Conseil de l'Europe)"], ['Computer L & Sec R', 'Computer Law and Security Report'], ['Computer L Rev & TJ', 'Computer Law Review and Technology Journal'], ['Computer Law', 'Computer Lawyer'], ['Cong Dig', 'Congressional Digest'], ['Conn BJ', 'Connecticut Bar Journal'], ['Conn Ins LJ', 'Connecticut Insurance Law Journal'], ["Conn J Int'l L", 'Connecticut Journal of International Law'], ['Conn L Rev', 'Connecticut Law Review'], ['Conn Prob LJ', 'Connecticut Probate Law Journal'], ['Const Commentary', 'Constitutional Commentary'], ['Const Forum Const', 'Constitutional Forum Constitutionnel'], ['Const Rev', 'Constitutional Review'], ['Cons Fin LQ Rep', 'Consumer Finance Law Quarterly Report'], ['Construction LJ', 'Construction Law Journal'], ['Construction Law', 'Construction Lawyer'], ['Continuity & Change', 'Continuity and Change'], ['Copyright Bull', 'Copyright Bulletin'], ['Cooley L Rev', 'Cooley Law Review'], ["Cornell Int'l LJ", 'Cornell International Law Journal'], ["Cornell JL & Pub Pol'y", 'Cornell Journal of Law & Public Policy'], ['Cornell L Rev', 'Cornell Law Review'], ['Cornell LJ', 'Cornell Law Journal'], ['Corp Mgmt Tax Conf', 'Corporate Management Tax Conference'], ["Corp Tax'n", 'Corporate Taxation'], ['CJS', 'Corpus Juris Secundum'], ['Corr jud', 'Correspondances judiciaires'], ['Counsellor', 'Counsellor: The New York Law School Journal'], ['CP du N', 'Cours de perfectionnement du notariat'], ['Creighton L Rev', 'Creighton Law Review'], ['Crime, L & Soc Change', 'Crime, Law and Social Change'], ['Crim LF', 'Criminal Law Forum'], ['Crim LQ', 'Criminal Law Quarterly'], ['Crim L Rev', 'Criminal Law Review'], ['Criminol', 'Criminologie'], ['Criminol', 'Criminology'], ['Crit Criminol', 'Critical Criminology'], ['Croation Arb YB', 'Croation Arbitration Yearbook'], ['Croat Crit L Rev', 'Croatian Critical Law Review'], ['Crown Coun Rev', "Crown Counsel's Review"], ['Cumb L Rev', 'Cumberland Law Review'], ['Curr LYB', 'Current Law Yearbook'], ['Curr Legal Probs', 'Current Legal Problems'], ["Current Med for Att'ys", 'Current Medicine for Attorneys'], ['Currents', 'Currents: International Trade Law Journal'], ['Cyberspace LJ', 'Cyberspace Law Journal'], ['Cyberspace Law', 'Cyberspace Lawyer'], ['Dal J Leg Stud', 'Dalhousie Journal of Legal Studies'], ['Dal LJ', 'Dalhousie Law Journal'], ['Def Couns J', 'Defense Counsel Journal'], ['Del J Corp L', 'Delaware Journal of Corporate Law'], ['Del L Rev', 'Delaware Law Review'], ['Del Law', 'Delaware Lawyer'], ["Deny J Int'l L & Pol'y", 'Denver Journal of International Law & Policy'], ['Deny UL Rev', 'Denver University Law Review (formerly Denver Law Journal)'], ["Dep't St Bull", 'Department of State Bulletin'], ['DePaul Bus LJ', 'DePaul Business Law Journal'], ["DePaul Int'l LJ", 'DePaul International Law Journal'], ['DePaul J Health Care L', 'DePaul Journal of Health Care Law'], ['DePaul L Rev', 'DePaul Law Review'], ["DePaul-LCA J Art & Ent L & Pol'y", 'DePaul-LCA Journal of Art and Entertainment Law and Policy'], ['DRiZ', 'Deutsche Richterzeitung'], ['DEFR', 'Deutsches unci Europaisches Familienrecht'], ["Dick J Envtl L & Pol'y", 'Dickinson Journal of Environmental Law & Policy'], ["Dick J Int'l L", 'Dickinson Journal of International Law'], ['Dick L Rev', 'Dickinson Law Review'], ['DTLJ', 'Digital Technology Law Journal'], ['Disp Resol J', 'Dispute Resolution Journal (formerly Arbitration Journal)'], ['DCL Rev', 'District of Columbia Law Review'], ['DJI', 'Documents juridiques internationaux'], ['Documents', 'Documents (Working Papers) (Council of Europe)'], ['Documents', "Documents de s&#233;ance (Conseil de l'Europe)"], ['Drake J Agric L', 'Drake Journal of Agricultural Law'], ['Drake L Rev', 'Drake Law Review'], ['DAT', 'Droit africain du travail'], ['Dr soc', 'Droit des soci&#233;t&#233;s'], ['Dr et Cult', 'Droit et Cultures'], ['Dret pat', 'Droit et patrimoine'], ['DPCI', 'Droit et pratique du commerce international'], ['Dr et Soc', 'Droit et Soci&#233;t&#233;'], ['Dr eur transp', 'Droit europeen des transports'], ['Dr Marit Fr', 'Droit Maritime Fran&#231;ais'], ['Dr polon contemp', 'Droit polonais contemporain'], ['Dr social', 'Droit Social'], ['Droits', 'Droits'], ["Duke Envtl L & Pol'y F", 'Duke Environmental Law & Policy Forum'], ["Duke J Comp & Int'l L", 'Duke Journal of Comparative & International Law'], ["Duke J Gender L & Pol'y", 'Duke Journal of Gender Law & Policy'], ['Duke LJ', 'Duke Law Journal'], ['Duke L & Tech Rev', 'Duke Law and Technology Review'], ['Duq Bus LJ', 'Duquesne Business Law Journal'], ['Duq L Rev', 'Duquesne Law Review'], ['E Eur Bus L', 'East European Business Law'], ['E Eur Const Rev', 'East European Constitutional Review'], ['E Eur HR Rev', 'East European Human Rights Review'], ['Ecology LQ', 'Ecology Law Quarterly'], ['Ed L Rev', 'Edinburgh Law Review'], ['Educ & LJ', 'Education & Law Journal'], ['Elder LJ', 'Elder Law Journal'], ['Election LJ', 'Election Law Journal'], ['EJCL', 'Electronic Journal of Comparative Law'], ["Emory Int'l L Rev", 'Emory International Law Review (formerly Emory Journal of International Dispute Resolution)'], ['Emory LJ', 'Emory Law Journal'], ["Employee Rts & Employment Pol'y J", 'Employee Rights & Employment Policy Journal'], ['Energy LJ', 'Energy Law Journal'], ['Ent & Sports Law', 'Entertainment & Sports Lawyer'], ['Ent L & Fin', 'Entertainment Law & Finance'], ['Envtl L', 'Environmental Law'], ['Envtl L & Mgmt', 'Environmental Law and Management'], ["Envtl L & Pol'y J", 'Environmental Law and Policy Journal'], ['Envtl LJ', 'Environmental Law Journal'], ['Envtl Law', 'Environmental Lawyer'], ["Envtl Pol'y & L", 'Environmental Policy and Law'], ['Envtlly Friendly', 'Environmentally Friendly: The Journal of the Pace Center for Environmental Legal Studies'], ["Environs Envtl L & Pol'y J", 'Environs Environmental Law and Policy Journal'], ['E & TJ', 'Estates and Trusts Journal'], ['E & TQ', 'Estates and Trusts Quarterly'], ['ETPJ', 'Estates Trusts & Pensions Journal'], ['Ethics', 'Ethics'], ['EuR', 'Europarecht'], ['EZPR', 'Europ&#228;ische Zeitschrift f&#252;r Privatrecht'], ['Eur Bus L Rev', 'European Business Law Review'], ['Eur Comp L Rev', 'European Competition Law Review'], ['Eur Envtl L Rev', 'European Environmental Law Review'], ['Eur Env YB', 'European Environment Yearbook'], ['Eur HRL Rev', 'European Human Rights Law Review'], ['Eur P Rev', 'European Intellectual Property Review'], ['Eur J Health L', 'European Journal of Health Law'], ['Eur J L & Econ', 'European Journal of Law & Economics'], ['Eur J L Ref', 'European Journal of Law Reform'], ['EJIL', 'European Journal of International Law'], ["Eur J Educ L & Pol'y", 'European Journal for Education Law and Policy'], ['Eur J Migr & L', 'European Journal of Migration and Law'], ['Eur J Soc Sec', 'European Journal of Social Security'], ["Eur J Crim Pol'y & Research", 'European Journal of Criminal Policy & Research'], ['Eur J Crime, Crim L & Crim J', 'European Journal of Crime, Criminal Law, and Criminal Justice'], ['Eur LJ', 'European Law Journal'], ['Eur L Rev', 'European Law Review'], ['Eur Leg F', 'European Legal Forum'], ['ERPL', 'European Review of Private Law'], ['Eur Transp L', 'European Transport Law'], ['Examiner', 'Examiner'], ['FAA Av N', 'FAA Aviation New'], ['Fam Ct Rev', 'Family Court Review (formerly Family & Conciliation Courts Review)'], ['Fam LQ', 'Family Law Quarterly'], ['Fam L Rev', 'Family Law Review'], ['Fed B News & J', 'Federal Bar News & Journal'], ['Fed Circuit BJ', 'Federal Circuit Bar Journal'], ['Fed Comm LJ', 'Federal Communications Law Journal'], ['Fed Cts L Rev', 'Federal Courts Law Review'], ['Fed Law', 'Federal Lawyer'], ['Fed Litigator', 'Federal Litigator'], ['FRD', 'Federal Rules Decisions'], ['Fem Legal Stud', 'Feminist Legal Studies'], ['Fla BJ', 'Florida Bar Journal'], ['Fla Coastal LJ', 'Florida Coastal Law Journal'], ["Fla Int'l LJ", 'Florida International Law Journal'], ["Fla J Int'l L", 'Florida Journal of International Law'], ['Fla L Rev', 'Florida Law Review (formerly University of Florida Law Review)'], ["Fla St J Transnat'l L & Pol'y", 'Florida State Journal of Transnational Law & Policy'], ['Fla St UJ Land Use & Envtl L', 'Florida State University Journal of Land Use & Environmental Law'], ['Fla St UL Rev', 'Florida State University Law Review'], ['Fla Tax Rev', 'Florida Tax Review'], ['Food & Drug LJ', 'Food & Drug Law Journal'], ['Fordham Envtl LJ', 'Fordham Environmental Law Journal'], ['Fordham Fin Sec & Tax LF', 'Fordham Finance, Securities & Tax Law Forum'], ['Fordham P Media & Ent LJ', 'Fordham Intellectual Property, Media & Entertainment Law Journal'], ["Fordham Int'l LJ", 'Fordham International Law Journal'], ['Fordham J Corp & Fin L', 'Fordham Journal of Corporate and Finance Law'], ['Fordham L Rev', 'Fordham Law Review'], ['Fordham Urb LJ', 'Fordham Urban Law Journal'], ['FORUM', 'International Law FORUM du droit international'], ['Geo Mason L Rev', 'George Mason Law Review (formerly George Mason University Law Review and George Mason Independent Law Review)'], ['Geo Mason LJ Civ Rts LJ', 'George Mason University Civil Rights Law Journal'], ["Geo Wash Int'l L Rev", 'George Washington International Law Review (formerly George Washington Journal of International Law and Economics)'], ['Geo Wash L Rev', 'George Washington Law Review'], ['Geo Immig LJ', 'Georgetown Immigration Law Journal'], ["Geo Int'l Envtl L Rev", 'Georgetown International Environmental Law Review'], ['Geo J Gender & L', 'Georgetown Journal of Gender and the Law'], ["Geo J Int'l L", 'Georgetown Journal of International Law'], ['Geo J Legal Ethics', 'Georgetown Journal of Legal Ethics'], ["Geo J on Poverty L & Pol'y", 'Georgetown Journal on Poverty Law & Policy (formerly Georgetown Journal on Fighting Poverty)'], ['Geo LJ', 'Georgetown Law Journal'], ["Geo Pub Pol'y Rev", 'Georgetown Public Policy Review'], ["Ga J Int'l & Comp L", 'Georgia Journal of International and Comparative Law'], ['Ga L Rev', 'Georgia Law Review'], ['Ga St LJ L Rev', 'Georgia State University Law Review'], ['Global J on Crime & Crim L', 'Global Journal on Crime and Criminal Law'], ['Global L Rev', 'Global Law Review'], ['Golden Gate UL Rev', 'Golden Gate University Law Review'], ['Gonz L Rev', 'Gonzaga Law Review'], ['Great Plains Nat Resources J', 'Great Plains Natural Resources Journal'], ['Griffith LR', 'Griffith Law Review'], ["Hague YB Int'l L", 'Hague Yearbook of International Law'], ["Hamline J Pub L & Pol'y", 'Hamline Journal of Public Law and Policy'], ['Hamline L Rev', 'Hamline Law Review'], ['Harv BlackLetter LJ', 'Harvard BlackLetter Law Journal'], ['Harv CR-CLL Rev', 'Harvard Civil Rights-Civil Liberties Law Review'], ['Harv Envtl L Rev', 'Harvard Environmental Law Review'], ['Harv Hum Rts J', 'Harvard Human Rights Journal (formerly Harvard Human Rights Yearbook)'], ["Harv Int'l LJ", 'Harvard International Law Journal'], ['Harv J L & Gender', 'Harvard Journal of Law and Gender'], ["Harv JL & Pub Pol'y", 'Harvard Journal of Law and Public Policy'], ['Harv JL & Tech', 'Harvard Journal of Law & Technology'], ['Harv J on Legis', 'Harvard Journal on Legislation'], ['Harv L Rev', 'Harvard Law Review'], ['Harv Negot L Rev', 'Harvard Negotiation Law Review'], ["Harv Women's LJ", "Harvard Women's Law Journal"], ['Hastings Comm & Ent LJ', 'Hastings Communications & Entertainment Law Journal'], ['Hastings Const LQ', 'Hastings Constitutional Law Quarterly'], ["Hastings Int'l & Comp L Rev", 'Hastings International and Comparative Law Review'], ['Hastings LJ', 'Hastings Law Journal'], ["Hastings W-Nw J Envtl L & Pol'y", 'Hastings West-Northwest Journal of Environmental Law and Policy'], ["Hastings Women's LJ", "Hastings Women's Law Journal"], ['Haw BJ', 'Hawaii Bar Journal'], ['Haw L Rev', 'Hawaill Law Review'], ['Health & Hum Rts', 'Health and Human Rights'], ['Health L Can', 'Health Law in Canada'], ['Health LJ', 'Health Law Journal'], ['Health Law', 'Health Lawyer'], ['Health Matrix', 'Health Matrix'], ["Heidelberg J Int'l L", 'Heidelberg Journal of International Law'], ['High Tech LJ', 'High Technology Law Journal'], ['HJLP', 'Hitotsubashi Journal of Law and Politics'], ['Hofstra Lab & Empl LJ', 'Hofstra Labor & Employment Law Journal'], ['Hofstra L Rev', 'Hofstra Law Review'], ['Hofstra Prop LJ', 'Hofstra Property Law Journal'], ['Hold LR', 'Holdsworth Law Review'], ['Hong Kong LJ', 'Hong Kong Law Journal'], ["Hous J Int'l L", 'Houston Journal of International Law'], ['Hous L Rev', 'Houston Law Review'], ['How J Crim Justice', 'Howard Journal of Criminal Justice'], ['How LJ', 'Howard Law Journal'], ['How Scroll', 'Howard Scroll: The Social Justice Law Review'], ['HRIR', 'Human Rights Internet Reporter'], ['HRLJ', 'Human Rights Law Journal'], ['Hum Rts Case Digest', 'Human Rights Case Digest'], ['Hum Rts Dev', 'Human Rights in Development'], ['Hum Rts Dev Countries', 'Human Rights in Developing Countries'], ['Hum Rts J', 'Human Rights Journal'], ['Hum Rts Q', 'Human Rights Quarterly'], ['Hum Rts Trib', 'Human Rights Tribune'], ['Humboldt FR', 'Humboldt Forum Recht'], ['ICSID Rev', 'ICSID Review'], ['Idaho L Rev', 'Idaho Law Review'], ['IDEA', 'IDEA: The Journal of Law and Technology'], ['Ill BJ', 'Illinois Bar Journal'], ['Ill LQ', 'Illinois Law Quarterly'], ["ILSA J Int'l & Comp L", 'ILSA Journal of International & Comparative Law'], ["Immig & Nat'lity L Rev", 'Immigration and Nationality Law Review'], ['Impact', 'Impact Labour Law & Management Practices'], ["Ind Int'l & Comp L Rev", 'Indiana International and Comparative Law Review'], ['Ind J Global Legal Stud', 'Indiana Journal of Global Legal Studies'], ['Ind LJ', 'Indiana Law Journal'], ['Ind L Rev', 'Indiana Law Review'], ['Indigenous LJ', 'Indigenous Law Journal'], ['Indus LJ', 'Industrial Law Journal'], ['Indus Rel LJ', 'Industrial Relations Law Journal'], ['Indus & Lab Rel Rev', 'Industrial & Labor Relations Review'], ['lnf Bull', 'Information Bulletin on Legal Affairs (Council of Europe)'], ['I & Comm T L', 'Information and Communications Technology Law'], ['Ins Bull', 'Insolvency Bulletin'], ['ICLQ', 'Intellectual and Comparative Law Quarterly'], ['IPJ', 'Intellectual Property Journal'], ['IPL Bull', 'Intellectual Property Law Bulletin'], ['IPL Newsl', 'Intellectual Property Law Newsletter'], ['IP & T F', 'Intellectual Property & Technology Forum'], ['IP & TL Rev', 'Intellectual Property & Technology Law Review'], ["Int'l Arb L Rev", 'International Arbitration Law Review'], ['IBLJ', 'International Business Law Journal'], ["Int'l Bus Law", 'International Business Lawyer'], ["Int'l Corn Lit", 'International Commercial Litigation'], ["Int'l Comm Jur Rev", 'International Commission of Jurists Review'], ["Int'l Co & Com L Rev", 'International Company and Commercial Law Review'], ["Int'l & Comp Corp LJ", 'International and Comparative Corporate Law Journal'], ['ICLQ', 'International and Comparative Law Quarterly'], ["Int'l & Comp L Rev", 'International and Comparative Law Review'], ["Int'l Crim L Rev", 'International Criminal Law Review'], ["Int'l Fin L Rev", 'International Financial Law Review'], ["Int'l Insights", 'International Insights'], ["Int'l Ins L Rev", 'International Insurance Law Review'], ["Int'l J", 'International Journal'], ["Int'l J Sem L", 'International Journal for the Semiotics of Law'], ["Int'l J Child Rts", "International Journal of Children's Rights"], ["Int'l J Comm L & Pol'y", 'International Journal of Communications Law & Policy'], ["Int'l J Comp Lab L & Ind Rel", 'International Journal of Comparative Labour Law and Industrial Relations'], ["Int'l J Confl Mgmt", 'International Journal of Conflict Management'], ["Int'l J Cult Prop", 'International Journal of Cultural Property'], ["Int'l J Franch & Distrib L", 'International Journal of Franchising and Distribution Law'], ["Int'l JHR", 'International Journal of Human Rights'], ["Int'l J Off Ther & Comp Crim", 'International Journal of Offender Therapy and Comparative Criminology'], ["Int'l JL Pol'y & Fam", 'International Journal of Law Policy and the Family'], ["Int'l JL & IT", 'International Journal of Law and Information Technology'], ["Int'l J L & Psychiatry", 'International Journal of Law and Psychiatry'], ["Int'l J Legal Info", 'International Journal of Legal Information'], ["Int'l J Mar & Coast L", 'International Journal of Marine and Coastal Law'], ["Int'l J Soc L", 'International Journal of the Sociology of Law'], ["Int'l J Refugee L", 'International Journal of Refugee Law'], ["Int'l J Soc L", 'International Journal of the Sociology of Law'], ["Int'l Law", 'International Lawyer'], ['ILM', 'International Legal Materials'], ["Int'l Legal Persp", 'International Legal Perspectives'], ["Int'l Leg Practitioner", 'International Legal Practitioner'], ["Int'l L Theory", 'International Legal Theory'], ["Int'l Mar & Com L YB", 'International Maritime and Commercial Law Yearbook'], ["Int'l Rev Crim Pol'y", 'International Review of Criminal Policy'], ["Int'l Rev Ind Prop & C'right L", 'International Review of Industrial Property and Copyright Law'], ["Int'l Rev L Comp & Tech", 'International Review of Law Computers & Technology'], ["Int'l Rev L & Econ", 'International Review of Law & Economics'], ["Int'l Rev Red Cross", 'International Review of the Red Cross'], ["Int'l Tax & Bus Law", 'International Tax and Business Lawyer'], ["Int'l Trade L & Pract", 'International Trade Law and Practice'], ["Int'l Trade L Reg", 'International Trade Law & Regulation'], ['ITLQ', 'International Trade Law Quarterly'], ['Iowa L Rev', 'Iowa Law Review'], ['Ir Jur', 'Irish Jurist'], ['Islamic L & Soc', 'Islamic Law & Society'], ['lsr LR', 'Israel Law Review'], ['Issues L & Med', 'Issues in Law & Medicine'], ['ITU N', 'ITU News'], ['JBRE', 'Jahrbuch f&#252;r Recht und Ethik'], ['J L Rev', 'Jersey Law Review'], ['Jewish LR', 'Jewish Law Report'], ['J Marshall J Computer & Info L', 'John Marshall Journal of Computer & Information Law'], ['J Marshall LQ', 'John Marshall Law Quarterly'], ['J Marshall L Rev', 'John Marshall Law Review'], ['JJ prov', 'Journal des juges provinciaux'], ['J Tribun', 'Journal des Tribunaux'], ['J Droit Eur', 'Journal de Droit Europ&#233;en'], ['J Barreau', 'Journal du Barreau'], ['J drjeunes', 'Journal du droit des jeunes'], ['JDI', 'Journal du droit international'], ['J Aff Housing & Community Dev L', 'Journal of Affordable Housing & Community Development Law'], ['J Afr L', 'Journal of African Law'], ['JAgric L', 'Journal of Agricultural Law'], ['J Air L', 'Journal of Air Law'], ['J Air L & Com', 'Journal of Air Law and Commerce'], ['J Animal L', 'Journal of Animal Law'], ['J Animal L & Ethics', 'Journal of Animal Law and Ethics'], ['J App Pr & Pro', 'Journal of Appellate Practice & Process'], ['J Art & Ent L', 'Journal of Art & Entertainment Law'], ['J BioLaw & Bus', 'Journal of BioLaw & Business'], ['J Bus L', 'Journal of Business Law'], ['J Cath Legal Stud', 'Journal of Catholic Legal Studies'], ['J Chinese L', 'Journal of Chinese Law'], ['JC & UL', 'Journal of College & University Law'], ['J Commonwealth L & Legal Educ', 'Journal of Commonwealth Law and Legal Education'], ['J Comp Bus & Cap Mkt L', 'Journal of Comparative Business and Capital Market Law'], ['J Confl & Sec L', 'Journal of Conflict and Security Law'], ['J Confl Resolution', 'Journal of Conflict Resolution'], ['J Const LE & Cent Eur', 'Journal of Constitutional Law in Eastern and Central Europe'], ["J Contemp Health L & Pol'y", 'Journal of Contemporary Health Law & Policy'], ['J Contemp L', 'Journal of Contemporary Law'], ['J Contemp Legal Issues', 'Journal of Contemporary Legal Issues'], ["J Corp Tax'n", 'Journal of Corporate Taxation'], ['J Corp L', 'Journal of Corporation Law'], ['J Crim J Educ', 'Journal of Criminal Justice Education'], ['J Crim L', 'Journal of Criminal Law'], ['J Crim L & Criminology', 'Journal of Criminal Law & Criminology'], ['J Disp Resol', 'Journal of Dispute Resolution'], ['J Empirical Legal Stud', 'Journal of Empirical Legal Studies'], ['J Energy L & Poly', 'Journal of Energy Law & Policy'], ["J Energy, Nat'I Res & Envtl L", 'Journal of Energy, Natural Resources & Environmental Law'], ['J Envtl L', 'Journal of Environmental Law'], ['J Envtl L & Prac', 'Journal of Environmental Law & Practice'], ['J Envtl L & Litig', 'Journal of Environmental Law & Litigation'], ['J Eur int', 'Journal of European Integration'], ['J Earn L', 'Journal of Family Law'], ['J Gender Race & Just', 'Journal of Gender, Race & Justice'], ['J Health & Hosp L', 'Journal of Health and Hospital Law'], ["J Health Care L & Pol'y", 'Journal of Health Care Law & Policy'], ['J Health Pol', 'Journal of Health Politics, Policy & Law'], ["J Hist Int'l L", 'Journal of the History of International Law'], ['JILI', 'Journal of the Indian Law Institute'], ['JILT', 'Journal of Information, Law and Technology'], ['JISLE', 'Journal of the Institute for the Study of Legal Ethics'], ['J Intell Prop', 'Journal of Intellectual Property'], ['J lntell Prop L', 'Journal of Intellectual Property Law'], ["J Int'l Arb", 'Journal of International Arbitration'], ['JIBL', 'Journal of International Banking Law'], ["J Int'l Econ L", 'Journal of International Economic Law'], ["J Int'l Fin Markets", 'Journal of International Financial Markets'], ["J Int'l L & Bus", 'Journal of International Law & Business'], ["J Int'l Legal Stud", 'Journal of International Legal Studies'], ["J Int'l Tax", 'Journal of International Taxation'], ["J Int'l Wildlife L & Pol'y", 'Journal of International Wildlife Law and Policy'], ['J Junvenile L', 'Journal of Juvenile Law'], ['J Land Use & Envtl L', 'Journal of Land Use & Environmental Law'], ['J Land Resources & Envtl L', 'Journal of Land, Resources & Environmental Law (formerly/anciennement Journal of Energy, Natural Resources & Environmental Law)'], ['JL & Com', 'Journal of Law & Commerce'], ['JL & Econ', 'Journal of Law & Economics'], ['JL Econ & Org', 'Journal of Law, Economics & Organization'], ['JL & Educ', 'Journal of Law & Education'], ["JL & Env't", 'Journal of Law and Environment'], ['JL & Equality', 'Journal of Law and Equality'], ['JL & Farn Stud', 'Journal of Law & Family Studies'], ['JL & Health', 'Journal of Law & Health'], ['J L & Info Sci', 'Journal of Law & Information Science'], ["JL & Pol'y", 'Journal of Law & Policy'], ['JL & Pol', 'Journal of Law & Politics'], ['JL & Religion', 'Journal of Law & Religion'], ["JL & Soc Pol'y", 'Journal of Law and Social Policy'], ["JL & Soc'y", 'Journal of Law and Society'], ["JL in Soc'y", 'Journal of Law in Society'], ['JL & Tech', 'Journal of Law & Technology'], ['JL Med & Ethics', 'Journal of Law, Medicine & Ethics'], ['J Legal Advoc& Prac', 'Journal of Legal Advocacy & Practice'], ['J Legal Econ', 'Journal of Legal Economics'], ['J Legal Educ', 'Journal of Legal Education'], ['J Legal Hist', 'Journal of Legal History'], ['J Legal Med', 'Journal of Legal Medicine'], ['J Legal Pluralism', 'Journal of Legal Pluralism and Unofficial Law (formerly Journal of Legal Pluralism)'], ['J Legal Stud', 'Journal of Legal Studies'], ['J Legis', 'Journal of Legislation'], ["J Legis & Pub Pol'y", 'Journal of Legislation & Public Policy'], ['J Mar L & Com', 'Journal of Maritime Law & Commerce'], ['J Med & L', 'Journal of Medicine and Law'], ["J Mm L & Pol'y", 'Journal of Mineral Law & Policy'], ["J Multistate Tax'n", 'Journal of Multistate Taxation'], ['J Nat Resources & Envtl L', 'Journal of Natural Resources & Environmental Law (formerly Journal of Mineral Law & Policy)'], ["J Partnership Tax'n", 'Journal of Partnership Taxation'], ['J Pers lnj Lit', 'Journal of Personal Injury Litigation'], ['J Pharmacy & L', 'Journal of Pharmacy & Law'], ['J Plan & Envtl L', 'Journal of Planning & Environmental Law'], ["J P Int'l L", 'Journal of Private International Law'], ['J Prod Liab', 'Journal of Products Liability'], ['J Proprietary Rts', 'Journal of Proprietary Rights'], ['J Sci & Tech L', 'Journal of Science & Technology Law'], ['J Small & Emerging Bus L', 'Journal of Small & Emerging Business Law'], ['J Soc Welfare L', 'Journal of Social Welfare Law'], ['J Soc Welfare & Fam L', 'Journal of Social Welfare and Family Law'], ['J S Pac L', 'Journal of South Pacific Law'], ['JS Legal Hist', 'Journal of Southern Legal History'], ['J Space L', 'Journal of Space Law'], ["J Tax'n", 'Journal of Taxation'], ["J Tech L & Pol'y", 'Journal of Technology Law & Policy'], ['J Inst for Study Legal Ethics', 'Journal of the Institute for the Study of Legal Ethics'], ['JLSS', 'Journal of the Law Society of Scotland'], ['J Legal Prof', 'Journal of the Legal Profession'], ["J Pat & Trademark Off Soc'y", 'Journal of the Patent & Trademark Office Society'], ['J Suffolk Academy L', 'Journal of the Suffolk Academy of Law'], ["J Transnat'I L & Pol'y", 'Journal of Transnational Law & Policy'], ['J World Trade', 'Journal of World Trade'], ["J World Trade L Econ & Pol'y", 'Journal of World Trade Law, Economics and Policy'], ['JOC', 'Journal Officiel des Communaut&#233;s europeennes: Communications et informations'], ['JOD', 'Journal Officiel des Communaut&#233;s europ&#233;ennes: D&#233;bats du Parlement europeen'], ['JOL', 'Journal Officiel des Communaut&#233;s europeennes: Legislation'], ['Judicature', 'Judicature'], ['Jurid Rev', 'Juridical Review'], ["Kan JL & Pub Pol'y", 'Kansas Journal of Law & Public Policy'], ['Kan L Rev', 'Kansas Law Review'], ["Ky Children's Rts J", "Kentucky Children's Rights Journal"], ['Ky LJ', 'Kentucky Law Journal'], ['Korean J Air & Sp L', 'Korean Journal of Air and Space Law'], ['Korean J Comp L', 'Korean Journal of Comparative Law'], ["Korean J Int'l & Comp L", 'Korean Journal of International and Comparative Law'], ['La Raza LJ', 'La Raza Law Journal'], ['Lab LJ', 'Labor Law Journal'], ['Lab Law', 'Labor Lawyer'], ['Land & Water L Rev', 'Land and Water Law Review'], ['Law & Contemp Probs', 'Law & Contemporary Problems'], ['Law & Inequality', 'Law & Inequality'], ['LHR', 'Law and History Review'], ['Law & Phil', 'Law and Philosophy'], ["Law & Phil Int'l J", 'Law and Philosophy: an International Journal for Jurisprudence and Legal Philosophy'], ["Law & Pol'y", 'Law & Policy'], ["Law & Pol'y Int'l Bus", 'Law & Policy in International Business'], ['Law & Pol Book Rev', 'Law and Politics Book Review'], ["Law & Prac Int'l Courts & Trib", 'Law & Practice of International Courts & Tribunals'], ['Law & Psychol Rev', 'Law & Psychology Review'], ['Law & Sexuality', 'Law & Sexuality: A Review of Lesbian & Gay Legal Issues'], ['Law & Soc Inquiry', 'Law & Social Inquiry'], ["Law & Soc'y Rev", 'Law & Society Review'], ["Law Dep't Mgmt", 'Law Department Management'], ['Law Firm Partnership & Ben Rep', 'Law Firm Partnership & Benefits Report'], ['Law Librn', 'Law Librarian'], ['Law Libr J', 'Law Library Journal'], ['Law Off Mgmt & Admin Rep', 'Law Office Management & Administration Report'], ['Law Off Tech Rev', 'Law Office Technology Review'], ['Law Prac Mgmt', 'Law Practice Management (formerly/anciennement Legal Economics)'], ['Law Q Rev', 'Law Quarterly Review'], ['Law Rev Mich St LJ Det CL', 'Law Review of Michigan State University Detroit College of Law'], ["L Soc'y Gaz", 'Law Society Gazette (Law Society of Upper Canada)'], ["L Soc'y Gaz & Guardian Gaz", "Law Society's Gazette and Guardian Gazette"], ['Law Tech & Ins', 'Law Technology and Insurance'], ['Law Text Culture', 'Law, Text, Culture'], ['Pittsburgh Legal J', 'Lawyers Journal (formerly / anciennement Pittsburgh Legal Journal)'], ['Legal Hist Rev', 'Legal History Review'], ['Legal Info Mgmt', 'Legal Information Management'], ['LIEI', 'Legal Issues of Economic I European Integration'], ['L Med Q', 'Legal Medical Quarterly'], ['Legal Ref Serv Q', 'Legal Reference Services Quarterly'], ['LS', 'Legal Studies'], ['Legal Theory', 'Legal Theory'], ["Leiden J Int'l L", 'Leiden Journal of International Law'], ['Lex Electronica', "Lex Electronica: Revue du droit des technologies de I'information"], ['LMCLQ', "Lloyd's Maritime and Commercial Law Quarterly"], ['Local Ct Gaz', "Local Courts' and Municipal Gazette (Toronto)"], ['LA Law', 'Los Angeles Lawyer'], ['La BJ', 'Louisiana Bar Journal'], ['La L Rev', 'Louisiana Law Review'], ['LC Jurist', 'Lower Canada Jurist'], ['LCLJ', 'Lower Canada Law Journal'], ['Loy Con Prot J', 'Loyola Consumer Protection Journal'], ['Loy L Rev', 'Loyola Law Review (New Orleans)'], ['Loy LA Ent LR', 'Loyola of Los Angeles Entertainment Law Journal'], ["Loy LA Int'l & Comp LJ", 'Loyola of Los Angeles International & Comparative Law Journal'], ['Loy LA L Rev', 'Loyola of Los Angeles Law Review'], ['Loy Poverty LJ', 'Loyola Poverty Law Journal'], ['Loy LJ Chicago LJ', 'Loyola University of Chicago Law Journal'], ['MJECL', 'Maastricht Journal of European and Comparative Law'], ["Macq J Int'l & C EnvtI L", 'Macquarie Journal of International and Comparative Environmental Law'], ['Me L Rev', 'Maine Law Review'], ['Mal L Rev', 'Malaya Law Review'], ['MU', 'Malayan Law Journal'], ['Man Bar N', 'Manitoba Bar News'], ['Man LJ', 'Manitoba Law Journal'], ['Maori L Rev', 'Maori Law Review'], ['Marq lntell Prop L Rev', 'Marquette Intellectual Property Law Review'], ['Marq L Rev', 'Marquette Law Review'], ['Marq Sports LJ', 'Marquette Sports Law Review'], ['Md J Contemp Legal Issues', 'Maryland Journal of Contemporary Legal Issues'], ["MdJ Int'l L & Trade", 'Maryland Journal of International Law and Trade'], ['Md L Rev', 'Maryland Law Review'], ['Mass L Rev', 'Massachusetts Law Review'], ['McGeorge L Rev', 'McGeorge Law Review (formerly Pacific Law Journal)'], ['JSDLP', 'McGill International Journal of Sustainable Development Law and Policy'], ['McGill JL & Health', 'McGill Journal of Law and Health (formerly McGill Health Law Publication)'], ['McGill LJ', 'McGill Law Journal'], ["Media L & Pol'y", 'Media Law & Policy'], ['Med Sci Law', 'Medicine, Science and the Law'], ['Med L Rev', 'Medical Law Review'], ['Med & L', 'Medicine & Law'], ['Med Leg J', 'Medico-Legal Journal'], ['Melbourne UL Rev', 'Melbourne University Law Review'], ['Mercer L Rev', 'Mercer Law Review'], ['Mex Trade & L Rep', 'Mexico Trade & Law Reporter'], ['Mich BJ', 'Michigan Bar Journal'], ['Mich Bus LJ', 'Michigan Business Law Journal'], ['Mich J Gender & L', 'Michigan Journal of Gender & Law'], ["Mich J Int'l L", 'Michigan Journal of International Law'], ['Mich JL Reform', 'Michigan Journal of Law Reform'], ['Mich J Race & L', 'Michigan Journal of Race & Law'], ["Mich L & Pol'y Rev", 'Michigan Law & Policy Review'], ['Mich LJ', 'Michigan Law Journal'], ['Mich L Rev', 'Michigan Law Review'], ["MSU-DCL J Int'l L", 'Michigan State University - DCL Journal of International Law'], ['Mich Telecomm & Tech L Rev', 'Michigan Telecommunications & Technology Law Review'], ['Mu L Rev', 'Military Law Review'], ['Minn Intell Prop Rev', 'Minnesota Intellectual Property Review'], ['Minn J Global Trade', 'Minnesota Journal of Global Trade'], ['Minn L Rev', 'Minnesota Law Review'], ['Miss CL Rev', 'Mississippi College Law Review'], ['Miss LJ', 'Mississippi Law Journal'], ['Miss L Rev', 'Mississippi Law Review'], ["Mo Envtl L & Pol'y Rev", 'Missouri Environmental Law & Policy Review'], ['Mo L Rev', 'Missouri Law Review'], ['Mod L Rev', 'Modern Law Review'], ['Monash UL Rev', 'Monash University Law Review'], ['Monde Jur', 'Monde Juridique'], ['Money Laundering L Rep', 'Money Laundering Law Report'], ['Mont L Rev', 'Montana Law Review'], ['Mont Law', 'Montana Lawyer'], ['Monthly Lab Rev', 'Monthly Labor Review'], ['Murdoch UEJL', 'Murdoch University Electronic Journal of Law'], ['NA ETA L & Bus Rev Am', 'NAFTA Law & Business Review of the Americas'], ["Nat'l Banking L Rev", 'National Banking Law Review'], ["Nat'l Black LJ", 'National Black Law Journal'], ["Nat'l Insolv Rev", 'National Insolvency Review'], ["Nat'I Inst Just J", 'National Institute of Justice Journal'], ['NJCL', 'National Journal of Constitutional Law'], ["Nat'l J Sexual Orientation L", 'National Journal of Sexual Orientation Law'], ["Nat'I LJ", 'National Law Journal'], ["Nat'I L Rev", 'National Law Review'], ["Nat'l Real PLR", 'National Real Property Law Review'], ["Nat'l Tax J", 'National Tax Journal'], ["Nat Resources & Env't", 'Natural Resources & Environment'], ['Nat Resources J', 'Natural Resources Journal'], ['Nay L Rev', 'Naval Law Review'], ['Neb L Rev', 'Nebraska Law Review'], ['Neptunus', 'Neptunus: Maritime and Oceanic Law Review'], ["Nethl Int'l L Rev", 'Netherlands International Law Review'], ['Nethl QHR', 'Netherlands Quarterly of Human Rights'], ["New Eng Int'l & Comp LAnn", 'New England International and Comparative Law Annual'], ['New Eng J Med', 'New England Journal of Medicine'], ['New Eng J on Crim & Civ Confinement', 'New England Journal on Criminal & Civil Confinement'], ['New Eng L Rev', 'New England Law Review'], ['New Eur L Rev', 'New Europe Law Review'], ['NJ Law', 'New Jersey Lawyer'], ['New LJ', 'New Law Journal'], ['NML Rev', 'New Mexico Law Review'], ['NY City L Rev', 'New York City Law Review'], ["NY Int'l L Rev", 'New York International Law Review'], ['NYU', 'New York Law Journal'], ['NYL Rev', 'New York Law Review'], ['NYL Sch J Hum Rts', 'New York Law School Journal of Human Rights'], ["NYL Sch J Int'l & Comp L", 'New York Law School Journal of International & Comparative Law'], ['NYL Sch L Rev', 'New York Law School Law Review'], ['NY St BJ', 'New York State Bar Journal'], ['NYU Clin L Rev', 'New York University Clinical Law Review'], ['E Eur Const Rev', 'New York University East European Constitutional Review'], ['NYU Envtl LJ', 'New York University Environmental Law Journal'], ["NYU Int'l J Cont L", 'New York University International Journal of Constitutional Law'], ["NYU J Int'l L & POL", 'New York University Journal of International Law & Politics'], ["NYU J Legis & Pub Pol'y", 'New York University Journal of Legislation & Public Policy'], ['NYUL Rev', 'New York University Law Review'], ['NYU Rev L & Soc Change', 'New York University Review of Law & Social Change'], ['NZLJ', 'New Zealand Law Journal'], ['NZL Rev', 'New Zealand Law Review'], ['NZUL Rev', 'New Zealand Universities Law Review'], ['NEXUS: J Opinion', 'NEXUS: A Journal of Opinion'], ['Non-Profit L Yearbook', 'Non-Profit Law Yearbook'], ["Non-State Act & Int'l L", 'Non-State Actors and International Law'], ["Nordic I Int'l L", 'Nordic Journal of International Law'], ['NC Centr LJ', 'North Carolina Central Law Journal'], ["NCJ Int'l L & Corn Reg", 'North Carolina Journal of International Law & Commercial Regulation'], ['NCL Rev', 'North Carolina Law Review'], ['NDL Rev', 'North Dakota Law Review'], ['N III UL Rev', 'Northern Illinois University Law Review'], ['N Ir Legal Q', 'Northern Ireland Legal Quarterly'], ['N Ky L Rev', 'Northern Kentucky Law Review'], ["Nw J Int'I L & Bus", 'Northwestern Journal of International Law & Business'], ['Nw U L Rev', 'Northwestern University Law Review'], ["Notarius Int'l", 'Notarius International'], ["Notre Dame Int'l L Rev", 'Notre Dame International Law Review'], ["Notre Dame JL Ethics & Pub Pol'y", 'Notre Dame Journal of Law Ethics & Public Policy'], ['Notre Dame L Rev', 'Notre Dame Law Review'], ['Nova L Rev', 'Nova Law Review'], ['Nuclear L', 'Nuclear Law'], ['Ocean & Coastal LJ', 'Ocean & Coastal Law Journal (formerly Territorial Sea Journal)'], ["Ocean Devel & Int'l L", 'Ocean Development & International Law'], ["OECD J Comp L & Pol'y", 'OECD Journal of Competition Law and Policy'], ['OJD', 'Official Journal of the European Communities: Debates of the European Parliament'], ['OJ Sp Ed', 'Official Journal of the European Communities: English Special Edition'], ['OJI', 'Official Journal of the European Communities: Information and Notices'], ['OJL', 'Official Journal of the European Communities: Legislation'], ['Debates', 'Official Report of Debates (Council of Europe)'], ['Ohio NUL Rev', 'Ohio Northern University Law Review'], ['Ohio St J Disp Resol', 'Ohio State Journal on Dispute Resolution'], ['Ohio St LJ', 'Ohio State Law Journal'], ['Okla City UL Rev', 'Oklahoma City University Law Review'], ['Okla L Rev', 'Oklahoma Law Review'], ['Ombudsman J', 'Ombudsman Journal'], ['Ont Fam J Bull', 'Ontario Family Law Bulletin'], ['Ont Law Gaz', 'Ontario Lawyers Gazette'], ['OSC', 'Ontario Securities Commission Bulletin'], ['Ordres', "Ordres du jour et proc&#232;s-verbaux (Conseil de l'Europe)"], ['Orders', 'Orders of the Day and Minutes of Proceedings (Council of Europe)'], ['Or L Rev', 'Oregon Law Review'], ['Osaka U L Rev', 'Osaka University Law Review'], ['Osgoode Hall LJ', 'Osgoode Hall Law Journal'], ['Osteurop-R', 'Osteuropa-Recht'], ['Otago L Rev', 'Otago Law Review'], ['Ottawa L Rev', 'Ottawa Law Review'], ['Oxford J Legal Stud', 'Oxford Journal of Legal Studies'], ['OUCLJ', 'Oxford University Commonwealth Law Journal'], ['Pace Envtl L Rev', 'Pace Environmental Law Review'], ["Pace Int'l L Rev (Pace YB Int'l L)", 'Pace International Law Review (formerly/anciennement Pace Yearbook of International Law)'], ['Pace L Rev', 'Pace Law Review'], ['Pac LJ', 'Pacific Law Journal'], ["Pac Rim L & Pol'y J", 'Pacific Rim Law & Policy Journal'], ['Panstwo i Prawo', 'Panstwo Prawo'], ['Pat L Ann', 'Patent Law Annual'], ['Penn St L Rev', 'Penn State Law Review'], ['Pepp L Rev', 'Pepperdine Law Review'], ['Philanthropist', 'The Philanthropist'], ['Philippine LJ', 'Philippine Law Journal'], ['Pittsburgh Legal J', 'Pittsburgh Legal Journal'], ['Polish Contemp L', 'Polish Contemporary Law'], ["Polish YB Int'l L", 'Polish Yearbook of International Law'], ['Potomac L Rev', 'Potomac Law Review'], ['Prob & Prop', 'Probate & Property'], ['Prob LJ', 'Probate Law Journal'], ['Procurement Law', 'Procurement Lawyer'], ['Prod Liab LJ', 'Products Liability Law Journal'], ['Prov Judges J', 'Provincial Judges Journal'], ["Psychol Pub Pol'y & L", 'Psychology Public Policy & Law'], ['Pub Cont LJ', 'Public Contract Law Journal'], ['Pub Int L Rev', 'Public Interest Law Review'], ['Pub Land L Rev', 'Public Land Law Review'], ['Pub Land & Resources L Rev', 'Public Land & Resources Law Review'], ['PL', 'Public Law'], ['QLR', 'QLR (formerly Bridgeport Law Review)'], ["Queen's LJ", "Queen's Law Journal"], ['Quinnipiac Health LJ', 'Quinnipiac Health Law Journal'], ['Quinnipac L Rev', 'Quinnipiac Law Review'], ['Quinnipiac Prob L J', 'Quinnipiac Probate Law Journal (formerly Connecticut Probate Law Journal)'], ['Ratio Juris', 'Ratio Juris'], ['Real Est LJ', 'Real Estate Law Journal'], ['Real Est L Rep', 'Real Estate Law Report'], ['Real Prop Prob & Tr J', 'Real Property, Probate & Trust Journal'], ['Rec des Cours', 'Recueil des Cours'], ['Reform', 'Reform'], ['Regent UL Rev', 'Regent University Law Review'], ['RI', 'Relations Industrielles'], ["Res Communes: Vermont's J Env't", "Res Communes: Vermont's Journal of the Environment"], ['Responsa Mend', 'Responsa Meridiana'], ['Resp civ et assur', 'Responsabilit&#233; civile et assurances'], ['RLR', 'Restitution Law Review'], ['Rev cent & E Eur L', 'Review of Central and East European Law'], ['Rev Const Stud', 'Review of Constitutional Studies'], ['RECIEL', 'Review of European Community and International Environmental Law'], ['Rev Litig', 'Review of Litigation'], ['REDNMA', 'Revista Europea de Derecho de a Navegaci&#243;n Maritima y Aeron\&#225;utica'], ['Rev Jur UIPR', 'Revista Juridica de La Universidad Interamericana de Puerto Rico'], ['Rev Jur UPR', 'Revista Juridica de La Universidad de Puerto Rico'], ['Rev admin', 'Revue administrative'], ['RADIC', 'Revue africaine de droit international et compare'], ['Rev ASJEP', 'Revue algerienne des sciences juridiques, &#233;conomiques et politiques'], ['Rev BD Const', 'Revue beige de droit constitutionnel'], ['Rev BDI', 'Revue beige de droit international'], ['Rev can dr crim', 'Revue canadienne de criminologie'], ['Rev can dr commun', 'Revue canadienne de droit communautaire'], ['Rev can dr comm', 'Revue canadienne de droit de commerce'], ['Rev Can D Earn', 'Revue canadienne de droit familial'], ['RCDI', 'Revue canadienne de droit international'], ['RCDP', 'Revue canadienne de droit penal'], ['RCDS', 'Revue canadienne droit et soci&#233;t&#233;'], ['RCPI', 'Revue canadienne de propriete intellectuelle'], ['RCDA', "Revue canadienne du droit d'auteur"], ['Rev crit', 'Revue critique'], ['Rev crit dr int prive', 'Revue critique de droit international prive'], ['RCJB', 'Revue critique de jurisprudence beige'], ['RCLJ', 'Revue critique de legislation et de jurisprudence du Canada'], ['RCLF', 'Revue de La common law en francais'], ['Rev dr ULB', "Revue de droit de l'ULB"], ['RD Ottawa', "Revue de droit d'Ottawa"], ['RDUS', "Revue de droit de I'Universitb de Sherbrooke"], ['RD UN-B', 'Revue de droit de rUniversite du Nouveau-Brunswick'], ['RD McGill', 'Revue de droit de McGill'], ['RDAI', 'Revue de droit des affaires internationales'], ['RD imm', 'Revue de droit immobilier'], ['RDISDP', 'Revue de droit international de sciences diplomatiques et politiques'], ['Rev DI & DC', 'Revue de droit international et de droit compare Revue de droit et sante de McGill (formerly Publication en droit de La sante de McGill)'], ['RD & sante McGill', 'Revue de droit social'], ['RDS', 'Revue de droit uniforme'], ['Rev DU', 'Revue de jurisprudence'], ['R de J', "Revue de l'arbitrage"], ['Rev arb', 'Revue de legislation et de jurisprudence'], ['R de L', 'Revue de planification fiscale et successorale'], ['RPFS', 'Revue du Barreau'], ['R du B', 'Revue du Barreau canadien'], ['R du B can', "Revue d'etudes constitutionnelles"], ['R etudes const', "Revue d'&#233;tudes juridiques"], ['REJ', "Revue d'histoire du droit"], ['Rev hist dr', "Revue d'histoire du droit international"], ['Rev hist dr int', "Revue d'intbgration europeenne"], ['RIE', 'Revue du droit'], ['Rdu D', " Revue du droit de l'Union Europ&#233;enne"], ['RDUE', 'Revue du droit public et de la science politique en'], ['Rev DP & SE', "France at a l'btranger"], ['R du N', 'Revue du Notariat'], ['RRJ', 'Revue de Ta Recherche Juridique'], ['RPFS', 'Revue de planification fiscale et successorale'], ["Rev juristes de l'Ont", "Revue des Juristes de l'Ontario"], ['Rev soci&#233;t&#232;s', 'Revue des soci&#233;t&#233;s'], ['Rev EDT', 'Revue &#233;gyptienne de droit international'], ['RED prive', 'Revue europ&#233;enne de droit priv&#233;'], ['RED public', 'Revue europ&#233;enne de droit public'], ['REED', 'Revue europ&#233;enne de philosophie et droit'], ['RED', 'Revue Femmes et Droit'], ['Rev fr dr admin', 'Revue francaise de droit administratif'], ['Rev fr dr a&#233;rien', 'Revue fran&#231;aise de droit a&#233;rien et spatial'], ['Rev fr dr constl', 'Revue fran&#231;aise de droit constitutionnel'], ['RGD', 'Revue generale de droit'], ['RGDIP', 'Revue generale de droit international public'], ['RGDA', 'Revue generale du droit des assurances'], ['RHDI', 'Revue hellenique de droit international'], ['Rev hist dr fr & &#233;tran', 'Revue historique de droit fran&#231;ais et &#233;tranger'], ['Rev interdiscipi &#233;tjur', "Revue interdisciplinaire d'&#233;tudes juridiques"], ['RIDC', 'Revue internationale de droit compar&#233;'], ['RID &#233;con', 'Revue internationale de droit economique'], ['Rev IDP', 'Revue internationale de droit penal'], ['RDPDD', 'Revue internationale de droit et politique de developpement durable de McGill'], ['RICR', 'Revue internationale de La Croix-Rouge'], ['RIPLA', 'Revue internationale de la propri&#233;t&#233; industrielle et artistique'], ['Rev IPC', 'Revue internationale de politique criminelle'], ['RI DA', "Revue internationale du droit d'auteur"], ['RISJ', 'Revue internationale de semiotique juridique'], ['RJE', "Revue juridique de l'environnement"], ['RJEUL', "Revue juridique des &#233;tudiants et &#233;tudiantes de l'Universit&#233; Laval"], ['Rev jur femme dr', 'Revue juridique La femme et le droit'], ['RJT', 'Revue juridique Th&#233;mis'], ['RNDC', 'Revue nationale de droit constitutionnel'], ['RQDI', 'Revue queb&#233;coise de droit international'], ['SZIER', 'Revue suisse de droit international et de droit europeen'], ['RSJ', 'Revue suisse de jurisprudence'], ['RTD civ', 'Revue trimestrielle de droit civil'], ['Rev trim dr com', 'Revue trimestrielle de droit commercial et de droit &#233;conomique'], ['RTD eur', 'Revue trimestrielle de droit europ&#233;en'], ['RUDH', "Revue universelle des droits de l'homme"], ['Rich J Global L & Bus', 'Richmond Journal of Global Law & Business'], ['Rich JL & Tech', 'Richmond Journal of Law & Technology'], ['Rich JL & Pub nt', 'Richmond Journal of Law and the Public Interest'], ['RDI', 'Rivista di Diritto Internazionale'], ['Roger Williams U L Rev', 'Roger Williams University Law Review'], ['Dir Rom Com', 'Roma e America Diritto Romano Comune'], ['Rutgers Computer & Tech LJ', 'Rutgers Computer & Technology Law Journal'], ['Rutgers-Camden LJ', 'Rutgers-Camden Law Journal'], ['Rutgers JL & Religion', 'Rutgers Journal of Law and Religion'], ['Rutgers LJ', 'Rutgers Law Journal'], ['Rutgers L Rev', 'Rutgers Law Review'], ['Rutgers Race & L Rev', 'Rutgers Race and the Law Review'], ["St John's J Legal Comment", "Saint John's Journal of Legal Commentary"], ["St John's L Rev", "Saint John's Law Review"], ['Saint Louis ULJ', 'Saint Louis University Law Journal'], ['St Louis LJ Pub L Rev', 'Saint Louis University Public Law Review'], ['St Louis-Warsaw Transatlantic LJ', 'Saint Louis-Warsaw Transatlantic Law Journal'], ["St Mary's LJ", "Saint Mary's Law Journal"], ['St Thomas L Rev', 'Saint Thomas Law Review'], ['San Diego L Rev', 'San Diego Law Review'], ['San Joaquin Agric L Rev', 'San Joaquin Agricultural Law Review'], ['Santa Clara Computer & High', 'Santa Clara Computer & High'], ['Tech LJ', 'Technology Law Journal'], ['Santa Clara L Rev', 'Santa Clara Law Review'], ['Sask Bar Rev', 'Saskatchewan Bar Review'], ['Sask L Rev', 'Saskatchewan Law Review'], ['Scand Stud L', 'Scandinavian Studies in Law'], ['Scot Curr LYB', 'Scottish Current Law Yearbook'], ['SJZ', 'Schweizerische Juristen-Zeitung'], ['SYIER', 'Schweizerische Zeitschrift f\&#252;r internationales und europaisches Recht'], ['Seattle UL Rev', 'Seattle University Law Review (formerly / anciennement University of Puget Sound Law Review)'], ['Sec Reg LJ', 'Securities Regulation Law Journal'], ['Seton Hall Const LJ', 'Seton Hall Constitutional Law Journal'], ['Seton Hall J Sport L', 'Seton Hall Journal of Sport Law'], ['Seton Hall L Rev', 'Seton Hall Law Review'], ['Seton Hall Legis J', 'Seton Hall Legislative Journal'], ['Sherbrooke L Rev', 'Sherbrooke Law Review'], ['Sing Ac LAnn Rev', 'Singapore Academy of Law Annual Review'], ['Sing Ac LJ', 'Singapore Academy of Law Journal'], ['Sing JICL', 'Singapore Journal of International & Comparative Law'], ['Sing JLS', 'Singapore Journal of Legal Studies'], ['Sing L Rev', 'Singapore Law Review'], ['SYBIL', 'Singapore Year Book of International Law'], ['SMU L Rev', 'SMU Law Review'], ['Soc & Leg Stud', 'Social and Legal Studies'], ['SAJHR', 'South African Journal on Human Rights'], ['SALJ', 'South African Law Journal'], ["SAYB Int'l L", 'South African Yearbook of International Law'], ['SC Envtl LJ', 'South Carolina Environmental Law Journal'], ['SCL Rev', 'South Carolina Law Review'], ['SDL Rev', 'South Dakota Law Review'], ['S Tex L Rev', 'South Texas Law Review (formerly South Texas Law Journal)'], ['S Cal Interdisciplinary LJ', 'Southern California Interdisciplinary Law Journal'], ['S Cal L Rev', 'Southern California Law Review'], ["S Cal Rev L & Women's Stud", "Southern California Review of Law and Women's Studies"], ['S Cal Sports & Ent LJ', 'Southern California Sports & Entertainment Law Journal'], ['S Ill ULJ', 'Southern Illinois University Law Journal'], ['SUL Rev', 'Southern University Law Review'], ['Sw J Trade Am', 'Southwestern Journal of Law & Trade in the Americas'], ['Sw UL Rev', 'Southwestern University Law Review'], ["Space Pol'y", 'Space Policy'], ['Spec Lect LSUC', 'Special Lectures of the Law Society of Upper Canada'], ['Sports Law J', 'Sports Lawyers Journal'], ['Stan Envtl LJ', 'Stanford Environmental Law Journal'], ["Stan J Animal L & Pol'y", 'Stanford Journal of Animal Law and Policy'], ["Stan J Int'l L", 'Stanford Journal of International Law'], ['Stan JL Bus & Fin', 'Stanford Journal of Law, Business & Finance'], ['Stan J Legal Stud', 'Stanford Journal of Legal Studies'], ["Stan L & Pol'yRev", 'Stanford Law & Policy Review'], ['Stan L Rev', 'Stanford Law Review'], ['Stan Tech L Rev', 'Stanford Technology Law Review'], ['Stat L Rev', 'Statute Law Review'], ['Stetson L Rev', 'Stetson Law Review'], ['Stud Canon', 'Studia Canonica'], ['Suffolk J Trial & Appellate Advoc', 'Suffolk Journal of Trial & Appellate Advocacy'], ["Suffolk Transnat'I L Rev", 'Suffolk Transnational Law Review (formerly/anciennement Suffolk Transnational Law Journal)'], ['Suffolk UL Rev', 'Suffolk University Law Review'], ['Sup Ct Econ Rev', 'Supreme Court Economic Review'], ['Sup Ct Rev', 'Supreme Court Review'], ['Sup Ct L Rev', 'Supreme Court Law Review'], ['Sydney L Rev', 'Sydney Law Review'], ["Syracuse J Int'l L & Corn", 'Syracuse Journal of International Law & Commerce'], ['Syracuse L Rev', 'Syracuse Law Review'], ['Syracuse UL & TJ', 'Syracuse University Law and Technology Journal'], ['Tax L Rev', 'Tax Law Review'], ['Telecom & Space J', 'Telecommunications & Space Journal'], ['Temp Envtl L & Tech J', 'Temple Environmental Law & Technology Journal'], ["Temp Int'l & Comp LJ", 'Temple International & Comparative Law Journal'], ['Temp L Rev', 'Temple Law Review (formerly Temple Law Quarterly)'], ['Temp Pol & Civ Rts L Rev', 'Temple Political & Civil Rights Law Review'], ['Tenn L Rev', 'Tennessee Law Review'], ['Tex BJ', 'Texas Bar Journal'], ['Tex F on CL & CR', 'Texas Forum on Civil Liberties & Civil Rights'], ["Tex Hispanic J L & Pol'y", 'Texas Hispanic Journal of Law & Policy (formerly Hispanic Law Journal)'], ['Tex Intell Prop LJ', 'Texas Intellectual Property Law Journal'], ["Tex Int'l LJ", 'Texas International Law Journal'], ['TexJ Bus L', 'Texas Journal of Business Law'], ['Tex J Women & L', 'Texas Journal of Women & the Law'], ['Tex L Rev', 'Texas Law Review'], ['Tex Rev L & POL', 'Texas Review of Law & Politics'], ['Tex Wesleyan L Rev', 'Texas Wesleyan Law Review'], ['Tex Tech L Rev', 'Texas Tech Law Review'], ['Textes adoptes', "Textes adoptes par l'Assemblee (Conseil de l'Europe)"], ['Texts Adopted', 'Texts Adopted by the Assembly (Council of Europe)'], ['Theor lnq L', 'Theoretical Inquiries in Law'], ['Third World Legal Stud', 'Third World Legal Studies'], ['Thomas Jefferson L Rev', 'Thomas Jefferson Law Review'], ['TM Cooley J Prac & Clinical L', 'Thomas M Cooley Journal of Practical & Clinical Law'], ['TM Cooley L Rev', 'Thomas M Cooley Law Review'], ['T Marshall L Rev', 'Thurgood Marshall Law Review'], ['Tilburg Foreign L Rev', 'Tilburg Foreign Law Review'], ["Tol J Great Lakes' L Sci & Pol'y", "Toledo Journal of Great Lakes' Law, Science & Policy"], ["Tolley's Comm L", "Tolley's Communications Law"], ['Tort & Ins LJ', 'Tort & Insurance Law Journal'], ['Touro Envtl LJ', 'Touro Environmental Law Journal'], ["Touro Int'l L Rev", 'Touro International Law Review'], ['Touro L Rev', 'Touro Law Review'], ['Trade L Topics', 'Trade Law Topics'], ["Transnat'l L & Contemp Probs", 'Transnational Law & Contemporary Problems'], ["Transnat'I Law", 'Transnational Lawyer'], ['Transp LJ', 'Transportation Law Journal'], ["Travaux de l'assoc Henri Capitant", "Travaux de l'Association Henri Capitant des amis de la culture juridique francaise"], ['Tribal LJ', 'Tribal Law Journal'], ['Trib dr hum', 'Tribune des droits humains'], ["Trust L Int'l", 'Trust Law International'], ['Trusts & Est', 'Trusts & Estates'], ['Tul Envtl LJ', 'Tulane Environmental Law Journal'], ['Tul Eur & Civ LF', 'Tulane European & Civil Law Forum'], ["Tul J Int'l & Comp L", 'Tulane Journal of International & Comparative Law'], ['Tul JL & Sexuality', 'Tulane Journal of Law and Sexuality'], ['Tul L Rev', 'Tulane Law Review'], ['Tul Mar LJ', 'Tulane Maritime Law Journal'], ["Tulsa J Comp & Int'l L", 'Tulsa Journal of Comparative & International Law'], ['Tulsa LJ', 'Tulsa Law Journal'], ["UC Davis J Int'l L & Pol'y", 'UC Davis Journal of International Law & Policy'], ['UC Davis L Rev', 'UC Davis Law Review'], ['UCLA Asian Pac Am LJ', 'UCLA Asian Pacific American Law Journal'], ['UCLA Bull L&T', 'UCLA Bulletin of Law and Technology'], ['UCLAEntLRev', 'UCLA Entertainment Law Review'], ["UCLA J Envtl L & Pol'y", 'UCLA Journal of Environmental Law & Policy'], ["UCLA J Int'l L & Foreign Aff", 'UCLA Journal of International Law and Foreign Affairs'], ['UCLA L Rev', 'UCLA Law Review'], ['UCLA Pac Basin LJ', 'UCLA Pacific Basin Law Journal'], ["UCLA Women's LJ", "UCLA Women's Law Journal"], ['UMKC L Rev', 'UMKC Law Review'], ['UNCTAD L Rev', 'UNCTAD Law Review: Journal on Law, Trade and Development'], ['Unif Comm Code L J', 'Uniform Commercial Code Law Journal'], ['Unif L Conf Proc', 'Uniform Law Conference of Canada: Proceedings'], ['Unif L Rev', 'Uniform Law Review'], ['US-Mex LJ', 'United States-Mexico Law Journal'], ['U Ark Little Rock L Rev', 'University of Arkansas at Little Rock Law Review'], ['U Salt Intell Prop LJ', 'University of Baltimore Intellectual Property Law Journal'], ['U Balt J Envtl L', 'University of Baltimore Journal of Environmental Law'], ['U Bait LF', 'University of Baltimore Law Forum'], ['U Bait L Rev', 'University of Baltimore Law Review'], ['UBC L Rev', 'University of British Columbia Law Review'], ['UC Davis L Rev', 'University of California at Davis Law Review'], ['U Chicago L Rev', 'University of Chicago Law Review'], ['U Chicago L Sch Roundtable', 'University of Chicago Law School Roundtabie'], ['U Chicago Legal F', 'University of Chicago Legal Forum'], ['U Cm L Rev', 'University of Cincinnati Law Review'], ['U Cob L Rev', 'University of Colorado Law Review'], ['U Dayton L Rev', 'University of Dayton Law Review'], ['U Det Mercy L Rev', 'University of Detroit Mercy Law Review'], ["U Fla JL & Pub Pol'y", 'University of Florida Journal of Law & Public Policy'], ['UGLJ', 'University of Ghana Law Journal'], ['U Haw L Rev', 'University of Hawaii Law Review'], ['U Ill L Rev', 'University of Illinois Law Review'], ['U Kan L Rev', 'University of Kansas Law Review'], ['U Mal L Rev', 'University of Malaya Law Review'], ['U Mem L Rev', 'University of Memphis Law Review'], ['U Miami Bus L Rev', 'University of Miami Business Law Review'], ['U Miami Ent & Sports L Rev', 'University of Miami Entertainment & Sports Law Review'], ['U Miami Inter-Am L Rev', 'University of Miami Inter-American Law Review'], ["U Miami Int'l & Comp L Rev", 'University of Miami International & Comparative Law Review (formerly / anciennement University of Miami Yearbook of International Law)'], ['U Miami L Rev LJ', 'University of Miami Law Review'], ['Mich JL Ref', 'University of Michigan Journal of Law Reform'], ['UNBLJ', 'University of New Brunswick Law Journal'], ['UNSWLJ', 'University of New South Wales Law Journal'], ['U Pa J Const L', 'University of Pennsylvanla Journal of Constitutional Law'], ["U Pa J Int'l Econ L", 'University of Pennsylvanla Journal of International Economic Law'], ['U Pa J Lab & Employment L', 'University of Pennsylvanla Journal of Labor and Employment Law'], ['U Pa L Rev', 'University of Pennsylvania Law Review'], ['U Pitt L Rev', 'University of Pittsburgh Law Review'], ['UQLJ', 'University of Queensland Law Journal'], ['U Rich L Rev', 'University of Richmond Law Review'], ['USF L Rev', 'University of San Francisco Law Review'], ['USF JL & Soc Challenges', 'University of San Francisco Journal of Law and Social Challenges'], ['USF Mar LJ', 'University of San Francisco Maritime Law Journal'], ['U Tasm L Rev', 'University of Tasmania Law Review'], ['UDC L Rev', 'University of the District of Columbia Law Review (formerly/anciennement District of Columbia Law Review)'], ['U Tol L Rev', 'University of Toledo Law Review'], ['UT Fac L Rev', 'University of Toronto Faculty of Law Review'], ['UTLJ', 'University of Toronto Law Journal'], ['UWAL Rev', 'University of Western Australia Law Review'], ['UWO L Rev', 'University of Western Ontario Law Review'], ['UCLJ', 'Upper Canada Law Journal'], ['Utah BJ', 'Utah Bar Journal'], ['Val LJ L Rev', 'Valparaiso University Law Review'], ['Vand J Ent L & Prac', 'Vanderbilt Journal of Entertainment Law & Practice'], ["Vand J Transnat'l L", 'Vanderbilt Journal of Transnational Law'], ['Vand L Rev', 'Vanderbilt Law Review'], ['Vt BJ', 'Vermont Bar Journal'], ['Vt L Rev', 'Vermont Law Review'], ['VUWLR', 'Victoria University of Wellington Law Review'], ['Vietnam L & Legal Forum', 'Vietnam Law & Legal Forum'], ['Vill Envtl LJ', 'Villanova Environmental Law Journal'], ['Vill L Rev', 'Villanova Law Review'], ['Vill Sports & Ent LJ', 'Villanova Sports and Entertainment Law Journal'], ['Va Envtl LJ', 'Virginia Environmental Law Journal'], ["Va J Int'l L", 'Virginia Journal of International Law'], ['Va JL & Tech', 'Virginia Journal of Law & Technology'], ["Va J Soc Pol'y& L", 'Virginia Journal of Social Policy & Law'], ['Va J Sports & L', 'Virginia Journal of Sports and the Law'], ['Va L Rev', 'Virginia Law Review'], ['Va Tax Rev', 'Virginia Tax Review'], ['Waikato L Rev', 'Waikato Law Review: Taumauri'], ['Wake Forest L Rev', 'Wake Forest Law Review'], ['Waseda Bull Comp L', 'Waseda Bulletin of Comparative Law'], ['Washburn LJ', 'Washburn Law Journal'], ['Wash & Lee Race & Ethnic Ancestry LJ', 'Washington & Lee Race & Ethnic Ancestry Law Journal (formerly / anciennement Race & Ethnic Ancestry Law Journal and Race & Ethnic Ancestry Law Digest)'], ['Wash & Lee L Rev', 'Washington & Lee Law Review'], ['Wash L Rev', 'Washington Law Review'], ["Wash UJL & Pol'y", 'Washington University Journal of Law & Policy'], ['Wash UJ Urb & Contemp L', 'Washington University Journal of Urban and Contemporary Law'], ['Wash ULQ', 'Washington University Law Quarterly'], ['Wayne L Rev', 'Wayne Law Review'], ['Web JCLI', 'Web Journal of Current Legal Issues'], ['W Va J L & T', 'West Virginia Journal of Law & Technology'], ['W Va L Rev', 'West Virginia Law Review'], ['W Va Law', 'West Virginia Lawyer'], ['W Ed Law Rep', "West's Education Law Reporter"], ['West L Rev', 'Western Law Review (San Francisco)'], ['West LR', 'Western Law Review (Canada)'], ['West Ont L Rev', 'Western Ontario Law Review'], ['W New Eng L Rev', 'Western New England Law Review'], ['W St LJ L Rev', 'Western State University Law Review'], ['WidenerJ Pub L', 'Widener Journal of Public Law'], ['Widener L Symp J', 'Widener Law Symposium Journal'], ["Willamette J Int'l & Disp Resol", 'Willamette Journal of International Law & Dispute Resolution'], ['Willamette L Rev', 'Willamette Law Review'], ['Wm & Mary Bill Rts J', 'William & Mary Bill of Rights Journal'], ["Wm & Mary Envtl L & Pol'y Rev", 'William & Mary Environmental Law & Policy Review'], ['Wm & Mary J Women & L', 'William & Mary Journal of Women and the Law'], ['Wm & Mary L Rev', 'William & Mary Law Review'], ['Wm Mitchell L Rev', 'William Mitchell Law Review'], ['Windsor Rev Legal Soc Issues', 'Windsor Review of Legal and Social Issues'], ['Windsor YB Access Just', 'Windsor Yearbook of Access to Justice'], ['Wis Envtl LJ', 'Wisconsin Environmental Law Journal'], ["Wis Int'l LJ", 'Wisconsin International Law Journal'], ['Wis L Rev', 'Wisconsin Law Review'], ["Wis Women's LJ", "Wisconsin Women's Law Journal"], ["Women's Rts L Rep", "Women's Rights Law Reporter"], ['World Arb & Mediation Rep', 'World Arbitration and Mediation Report'], ['WTAM', 'World Trade and Arbitration Materials'], ['Wyo L Rev', 'Wyoming Law Review (formerly Land & Water Law Review)'], ['Yale Human Rts & Dev LJ', 'Yale Human Rights & Development Law Journal'], ["Yale J Int'l L", 'Yale Journal of International Law'], ['Yale JL & Feminism', 'Yale Journal of Law & Feminism'], ['Yale JL & Human', 'Yale Journal of Law & the Humanities'], ['Yale J on Reg', 'Yale Journal on Regulation'], ["Yale L & Pol'y Rev", 'Yale Law & Policy Review'], ['Yale LJ', 'Yale Law Journal'], ['YB Comm Arb', 'Yearbook: Commercial Arbitration'], ['YB Air & Sp L', 'Yearbook of Air and Space Law'], ['YB Copyright & Media L', 'Yearbook of Copyright and Media Law'], ['YB Eur L', 'Yearbook of European Law'], ["YB Int'l L", 'Yearbook of International Law'], ["YB Int'l Env L", 'Yearbook of International Environmental Law'], ["YB Int'l Human L", 'Yearbook of International Humanitarian Law'], ['YB Marit L', 'Yearbook of Maritime Law'], ['YB CBA', 'Yearbook of the Canadian Bar Association'], ['YB Eur Cony HR', 'Yearbook of the European Convention on Human Rights'], ["YB Inst Int'l L", 'Yearbook of the Institute of International Law'], ['YBICJ', 'Yearbook of the International Court of Justice'], ['YBUN', 'Yearbook of the United Nations'], ['YBHR', 'Yearbook on Human Rights'], ['Za&#246;RV', 'Zeitschrift f&#252;r ausl&#228;ndisches &#246;ffentliches Recht und Volkerrecht'], ['Fam R Z', 'Zeitschrift f&#252;r das gesamte Familienrecht'], ['Z Eu P', 'Zeitschrift f&#252;r Europaisches Privatrecht'], ['ZLW', 'Zeitschrift f&#252;r Luft- und Weltraumrecht'], ['ZRP', 'Zeitschrift f&#252;r Rechtspolitik'], ['ZRV', 'Zeitschrift f&#252;r Rechtsvergleichung'], ['ZUG', 'Zeitschrift f&#252;r Unternehmens- und Gesellschaftsrecht'], ['Z Vgl RWiss', 'Zeitschrift f&#252;r Vergleichende Rechtswissenschaft']]
	canadaReporterList = new reporterListClass("CanadaCase", CanadaList);
	UKReporterList = new reporterListClass("UKCase", UKList);
	USReporterList = new reporterListClass("USCase", USList);
	JournalReporterList = new reporterListClass("Journal", JournalList);
  
/*
=============================================
The Form Class
=============================================
*/

var formClass = function(name, hidelist, validator){ 
	this.name = name; //ex CanadaCase
	this.hidelist = hidelist; //The list of objects to be hidden before the code runs
	this.validator = validator; //form validators (rules to be checked for inputs)
	this.browseClicked = false; //form validators (rules to be checked for inputs)
	this.historycount =1;
	//this.tooltip = tooltip;
	//this.successFunction = successFunction;
	this.init();
}

formClass.prototype.init = function(){
	this.addEvents();
	this.hide();
	jQuery('#'+this.name +'-Container #pinciteWrapper').tooltip({
		trigger: 'hover',
		placement: 'right',
		title: "Fill out Parallel Citations before pinpointing."
	});
	
	jQuery('#' +this.name +'-storeCitationModal').modal({
		backdrop: true,
		show: false
	})
}

formClass.prototype.addEvents = function(){
	$('#' +this.name +'-Container .submitButton').bind('click', {context: this}, this.submitClick);
	$('#' +this.name +'-Container .browsebutton').bind('click', {context: this}, this.browseClick);
	$('#' +this.name +'-Container #addHistory').bind('click', {context: this}, this.addHistoryClick);
	$('#' +this.name +'-Container #storeCitationModalClick').bind('click', {context: this}, this.addStoreCitationClick);
	$('#' +this.name +'-Container #storeCitationModal-btn').bind('click', {context: this}, this.addModalClick);
	
}
	
formClass.prototype.hide = function(){
	var id = '#'+ this.name +'-Container ';  //ex. #CanadaCase
	for (var i=0 ; i<this.hidelist.length; i++){
		jQuery(id +this.hidelist[i]).hide();
	}
}

formClass.prototype.submitForm = function(){

var id = '#'+ this.name;  //ex. #CanadaCase
var Name = this.name;  //ex. #CanadaCase

	if ( this.validator.form() === true){		
		 var test = jQuery(id +'-Form').serialize()
		 
		jQuery(id +"-Container .loading-gif").show();        
		jQuery.ajax({ 
			type: "POST", 
			data: jQuery(id +'-Form').serialize(),
			url:'/form/'+Name,
			dataType: 'json',
			success: function(data) {
				jQuery(id+"-Container .loading-gif").hide();  
				clearErrors(id +'-Form')
				
				if( data[0].valid ==true) {
					var results = data[0].message; 
					jQuery(id+'-Container .result-container').hide().fadeIn(200);
					jQuery(id +'-Container .results').html(results).hide().fadeIn(400);
					//jQuery(id +'-Container #saveCitationModal-btn').hide().fadeIn(200);
					//this.successFunction; //Call the success function
				 }
				 else{
					var errorlist=data[0].errors;
					for (var i =0; i<errorlist.length; i++){
						//error = [inputName, input, message]
						var input = errorlist[i][1];
						var message = errorlist[i][2];
						generateErrorMessage(id +"-Form",message);
					}	
				 }
			},

		}).fail(function(){
				generateErrorMessage(id+"-Form","something went wrong on our end :( ")
				//return false; 
			})		
		.always( function(){
			jQuery(id+"-Container .loading-gif").hide();  
		});//end of ajax
		return false; 
	} //end of if
	else{
	}
//return false; 	
}

 formClass.prototype.browseClick= function (ev){
        var self = ev.data.context;
        self.browse();
		
    }
formClass.prototype.browse = function(){
		if(this.browseClicked === false){
    		jQuery("#"+this.name +"-Container #reporter-container").show();
    		this.browseClicked = true;
		}
		else{
			jQuery("#"+this.name +"-Container #reporter-container").hide();
			this.browseClicked = false;
		}
	}

	
 formClass.prototype.addHistoryClick= function (ev){
        var self = ev.data.context;
        self.addHistory();
    }	
formClass.prototype.addHistory = function(){
		//console.log("")
		
		if (this.historycount ==1){
			jQuery("#"+this.name +"-Container #history2").show();
			this.historycount ++;
		}
		else if (this.historycount ==2){
			jQuery("#"+this.name +"-Container #history3").show();
			jQuery("#"+this.name +"-Container #addHistory").hide();
		}
	}
	
formClass.prototype.addModalClick = function(ev){
	var self = ev.data.context;
	self.modalClick();
}
formClass.prototype.modalClick= function(){

	id= '#'+ this.name;
	console.log(this.name =='Book');
	if (this.name =="Book"|| this.name =="Dictionary"||this.name =="Journal") {
		title = jQuery(id + 'Title').val()
	}
	else{
		title= jQuery(id +'Style').val()
	}
	citation = jQuery(id +'-Container .results').html()
	jQuery('#'+ this.name+'-storeCitationModal #modal-title').html(title);
	jQuery('#'+ this.name+'-storeCitationModal #modal-citation').html(citation);
	
}

formClass.prototype.addStoreCitationClick= function (ev){
        var self = ev.data.context;
        self.storeCitation();
    }		
formClass.prototype.storeCitation= function(){
	console.log("HOOORAAAY");
	var id = '#'+ this.name;  //ex. #CanadaCase
	var Name = this.name;  //ex. #CanadaCase

	if ( this.validator.form() === true){		
		// Add Extra fields - Conver the form into a serial array. Each form input (ex. styleof cause)
		// has its own index in the array like so, {name: 'styleofcause', value: "jonson v. jonson.}
		var submitData = jQuery(id +'-Form').serializeArray()
		var citation = jQuery(id +'-Container .results').html()
		var comments = jQuery(id + '-Container .citationCommentArea').val()
		// add the citation and additional comments
		submitData.push({name :'result', value: citation})
		submitData.push({name :'comments', value: comments})
		
				
		jQuery(id +"-Container .loading-gif").show();        
		jQuery.ajax({ 
			type: "POST", 
			data: submitData,
			url:'/form/store/'+Name,
			dataType: 'json',
			success: function(data) {
				alert("HOOOOORAAAAAAAY")
			},
			complete: function(){
				console.log("sent!")
				 window.location.href = './citations';
			}
			
		})
		console.log('wsup');
		return false; 
	}	
}
formClass.prototype.submitClick= function (ev){
        var self = ev.data.context;
        self.submitForm();
		//return false;
    }

	

	
/*
=============================================
The Tooltip Class
=============================================
*/	
	
var tooltipClass = function(name, tooltipList,offsets){
	this.name = name;
	this.tooltipList = tooltipList;
	this.offsets = offsets;
	this.addEvents();
}	
tooltipClass.prototype.addEvents = function(){
	//console.log('#' +this.name +'-Container input');
	$('#' +this.name +'-Container input').bind('focus', {context: this}, this.onFocus);	
	$('#' +this.name +'-Container textarea').bind('focus', {context: this}, this.onFocus);	
}
tooltipClass.prototype.onFocus= function (ev){
        var self = ev.data.context;
        self.updateTooltip(this);
    }
	
 tooltipClass.prototype.updateTooltip= function (jQueryInput){
 		
		var id = "#" + this.name  
		var htmlName = jQuery(jQueryInput).attr('name') // get Forms name
		//var tool = eval('tooltip_'+name); // convert it to a variable
		////console.log("name " + htmlName);
		var tip;
		for( var i = 0; i< this.tooltipList.length;  i++ ) {
			if( this.tooltipList[i][0] === htmlName ) {
				tip = this.tooltipList[i][1];
				break;
			}
		}
		//console.log('tip ' + tip);
		//console.log(id+'-tooltips');
		jQuery(id+'-tooltips').html(tip); //Display the tooltip
		
		var formTop = jQuery(id + "-Container").offset();
		var currentForm = jQuery(jQueryInput).offset();
		var positionDifference = currentForm.top - formTop.top;

		for (var i =0; i<this.offsets.length-1;i++){
			var a = this.offsets[i];
			var b = this.offsets[i+1];
			var offset = (jQuery(a).offset().top-formTop.top);
			var nextOffset = (jQuery(b).offset().top-formTop.top);
			
			if (positionDifference >= offset){
				if (positionDifference < nextOffset){
					jQuery(id+'-tooltips').css('margin-top', offset);
				}
				if (positionDifference >= nextOffset){
					jQuery(id+'-tooltips').css('margin-top', nextOffset);
				}
			}
		}
 }

 

	
	
	// EXTRAS
	var superfunc = function(){
		//console.log(" UUUUUUUUUUUUUR MUR GURSH");
	}
	var someClass = function(func){
		this.func = func;
	}
	someClass.prototype.go = function(){
		//console.log('2');
		this.func();
	}
	test = new someClass(superfunc);
	$('#thetestbutton').click(function(){
		//console.log('1');
		test.go();
	});
 
 
 /*
=============================================
Creating the Forms
=============================================
*/		
canadahidelist = [ "#pincite-form","#reporter-container","#history3", "#history2"]
canadatooltip = new tooltipClass('CanadaCase', CanadatooltipList,CanadaTooltipOffsets) 
canada = new formClass('CanadaCase', canadahidelist, CanadianCaseValidator,canadatooltip);


ushidelist = [ "#pincite-form","#reporter-container","#history3", "#history2",'#saveCitationModal-btn']
ustooltip =  new tooltipClass('USCase', UStooltipList, USTooltipOffsets) 
us = new formClass('USCase',ushidelist, USCaseValidator);

ukhidelist = ['.optionalCourt', '#court-optional','.court-input','#reporter-container', '#UKpincite-form', "#history2", "#history3"]
uktooltip = new tooltipClass('UKCase', UKtooltipList, UKTooltipOffsets) 
uk = new formClass('UKCase',ukhidelist, UKCaseValidator);

journalhidelist =["#reporter-container","#pinpoint-form1","#pinpoint-form2","#pinpoint-form3","#pinpoint-form4","#pinpoint-check1","#pinpoint-check2"]
journaltooltip = new tooltipClass('Journal',JournaltooltipList,JournalTooltipOffsets) 
journal = new formClass('Journal',journalhidelist, JournalArticleValidator);

bookhidelist =["#pinpoint-form0","#pinpoint-form1","#pinpoint-form2","#pinpoint-form3","#pinpoint-form4", "#check1", "#check2"]
booktooltip = new tooltipClass('Book',BooktooltipList,BookTooltipOffsets);
book = new formClass('Book', bookhidelist, BookValidator);

dictionary = new formClass('Dictionary',[] , DictionaryValidator);
dictionarytooltip = new tooltipClass('Dictionary',DictionarytooltipList,DictionaryTooltipOffsets);




	
}); //End of Document.