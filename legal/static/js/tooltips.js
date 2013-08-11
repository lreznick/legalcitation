/*
=============================================
Tool Tips
=============================================
*/	
var tooltip_header              = "<div class=\"tooltip-title\">"

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

var formOffsets = [
'#CanadaCase-Container',
'#CanadaCaseJudge', //judge
'#history1', //history
'#leaveToAppeal-selection']; //leave to appeal

jQuery('#CanadaCase-Container input').focus(function(){
		
		var name = jQuery(this).attr('name') // get Forms name
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
					jQuery('#Canada.tooltips').css('margin-top', offset);
				}
				if (positionDifference >= nextOffset){
					jQuery('#Canada .tooltips').css('margin-top', nextOffset);
				}
			}
		}
});

jQuery('#CanadaCase-Container select').change(function(){
	console.log(jQuery(this).attr('name'));
	// Do something in here
});
//jQuery('#tooltips').html(tooltip_styleOfCause);