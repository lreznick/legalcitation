    // <!-- input#input01 accesses the input of id input01 -->
jQuery(document).ready(function() {
	 
/*
=============================================
Set Up
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
	
	//hiding all forms 
	//jQuery("#hidden-forms").hide();
	//jQuery(".textarea").wysihtml5();
	jQuery("#result-container").hide();
	jQuery("#pincite-form").hide();
	jQuery("#reporter-container").hide();
	jQuery("#history3").hide();
	jQuery("#history2").hide();
	
	jQuery('#pinciteWrapper').tooltip({
		trigger: 'hover',
		placement: 'right',
		title: "Fill out Parallel Citations before pinpointing."
	});
	
	//jQuery("#CanadaCaseHistory-Group").hide();
	
/*
=============================================
Form Submissions
=============================================
*/		

	// Submit a form when the go button for canada case is submitted.
	//	Then reloads the page to display the contentss

	jQuery('#canlii-go').click(function(){
			console.log("in go");
			jQuery.ajax({ 
                type: "POST", 
				url: '/form/canlii',
                data:{url: jQuery('#canlii-input').val()},
				dataType: 'json',
                success: function(data) {
					console.log(data[0]);
					jQuery('#canlii-result').html('<b style ="font-size: 18px"> Result:   </b> '+data[0].output).hide().fadeIn(400);
					var fadeoutTime = 300;
					jQuery('#manual-header').fadeOut(fadeoutTime);
					jQuery('#CanadaCaseCourt-controlgroup').fadeOut(fadeoutTime);
					jQuery('#CanadaCaseParallel-controlgroup').fadeOut(fadeoutTime);
					jQuery('#CanadaCaseParallel-reporter').fadeOut(fadeoutTime);
					jQuery('#CanadaCaseDate-controlgroup').fadeOut(fadeoutTime);
					jQuery('#CanadaCaseStyle-controlgroup').fadeOut(fadeoutTime);
					
				//	jQuery('#').hide();
				//	jQuery('#manual-header').hide();
                },
			});
			return false; 	
	});
	
	jQuery('#CanadaCaseParallel').blur(function(){
			var parallelValue = jQuery(this).val();
				
			if (parallelValue != ""){	
			
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
					
					if (data[0].date != false){
						jQuery('#CanadaCaseDate').val(data[0].date);
					}
					if (data[0].court != false){
						jQuery('#CanadaCaseCourt').val(data[0].court);
					}
					console.log("reporter 1::"+ data[0].reporters[0][0]);
					console.log("reporter 2 ::" + data[0].reporters[0][1]);
					var reporterType = data[0].reporters[1];
						console.log("reporterType ::" +reporterType );
					// two reporters
					if (reporterType == "two") { 
						//everything
						jQuery('#pincite-selection>option[value="citeTo"]').show();
						jQuery('#pincite-selection>option[value="pinPoint_page"]').show();//attr({ disabled: 'disabled' });
						jQuery('#pinciteRadio_Reporter1').html(data[0].reporters[0][0]);
						jQuery('#pinciteRadio_Reporter2').html(data[0].reporters[0][1]);
						jQuery('#pinciteRadio2').show();
						
					}
					else{
						jQuery('#pincite-selection>option[value="citeTo"]').hide();
						if ( reporterType == "one"){
						// pinpoint page , pinpoint para or nothing
							jQuery('#pincite-selection>option[value="pinPoint_page"]').show();//attr({ disabled: 'disabled' });													
							jQuery('#pinciteRadio_Reporter1').html(data[0].reporters[0][0]);
							jQuery('#pinciteRadio2').hide();
							
						}
						if ( reporterType == "neutral"){
						//pinpoint para or nothing
							jQuery('#pincite-selection>option[value="pinPoint_page"]').hide();//attr({ disabled: 'disabled' });
							jQuery('#pinciteRadio_Reporter1').html(data[0].reporters[0][0]);
							jQuery('#pinciteRadio2').hide();
						}
					}
					
                },
				
	/*			ONE
- only allow pinpoint page or pinpoint para or nothing. Do not allow cite to

NEUTRAL
- only allow pinpoint para or nothing. Do not allow pinpoint page or cite to.

 */
			});
			}
	})
	
	
	jQuery('#CanadaCaseCourt').blur(function(){
			var courtVal = jQuery(this).val();
			if (courtVal != ""){			
            jQuery.ajax({ 
                type: "POST", 
				url: '/form/court',
                data:{court : courtVal},
				dataType: 'json',
                success: function(data) {
					//jQuery('#CanadaCaseDate').val(data[0].date)
					//jQuery('#CanadaCaseCourt').val(data[0].court)
					console.log("hooray!")
                },
			});
			}
	})
			//Submitting the information to the server to be processed
	jQuery('#GoButton').click(function() {
            //var input_string = jQuery("input#testingcases").val();
		   
           // console.log("input"+ input_string);
            jQuery.ajax({ 
                type: "POST", 
                data: jQuery('#canadacase-form').serialize(),
				url:'/form/CanadianCase',
                success: function(data) {
					console.log("the return data", data);
					jQuery('#result-container').hide().fadeIn(200);
					jQuery('#results').html(data).hide().fadeIn(400);
                },
			});
			return false; 
	});
		
/*
=============================================
Form Events
=============================================
*/	


jQuery('#pincite-selection').change(function(){
	var txt = jQuery(this).val();
	if (txt == ""){
		jQuery("#pincite-form").hide();
	}
	else{
		
		jQuery("#pincite-form").show();
		if (txt == "citeTo"){
			jQuery("#pincite-form-input").hide();
		}
		else if (txt == "pinPoint_para"){	
			jQuery("#pincite-form-input").show();
			jQuery("#pincite-form-input").attr('placeholder',"paragraph");
			
		}
		else if (txt == "pinPoint_page"){
			jQuery("#pincite-form-input").show();
			jQuery("#pincite-form-input").attr('placeholder',"page");
		}
	}
	console.log("pincite " + txt);
});

var historycount =1;


jQuery('#addHistory').click(function(){
	if (historycount ==1){
		jQuery('#history2').show();
		historycount ++;
	}
	else if (historycount ==2){
		jQuery('#history3').show();
		jQuery('#addHistory').hide();
		
	}

});

jQuery('#leaveToAppeal-selection').change(function(){
	var txt = jQuery(this).val();
	console.log("txt" + txt);
	if(txt =="granted" || txt =="refused")	{
		jQuery("#CanadaCaseLeaveToAppeal-Docket").show();
	}
	else{
		jQuery("#CanadaCaseLeaveToAppeal-Docket").hide();
	}
});

/*
=============================================
Tool Tips
=============================================
*/	
var tooltip_header              = "<div class=\"tooltip-title\">"
var tooltip_styleofcause	    = tooltip_header + "Style of Cause     </div><font class = \"red\"> ex. Tilden Rent-A-Car Co. v Clendenning</font><br> Input the style of cause as written on the case. <br>"
//var tooltip_parallel				= tooltip_header + "Parallel Citations </div><font class = \"red\"> ex. 2008 SCC 9 (CanLII); [2008] 1 SCR 190; 229 NBR (2d) 1; 291 DLR (4th) 577 </font><br> Separate abbreviated reporters by commas or semicolons. Browse through the catalog to find abbreviations. <br>Input at least two reporters, unless only one is available. <br>Don't worry about formatting. <br>"
var tooltip_parallel				= tooltip_header + "Parallel Citations </div><font class = \"red\"> ex. 2008 9 (CanLII); [2008] 1 SCR 190; 229 NBR (2d) 1; 291 DLR (4th) 577 </font><br> Separate abbreviated reporters by commas or semicolons. Browse through the catalog to find abbreviations. <br>Input at least two reporters, unless only one is available. <br>Don't worry about formatting. <br>"
var tooltip_year	                = tooltip_header + "Year of Decision    </div><font class = \"red\"> ex. 1985 </font><br>"
var tooltip_court                 = tooltip_header + "Court                 </div><font class = \"red\"> ex. Alberta qb </font><br>Our recognition algorithm will format your input correctly. <br>"
var tooltip_shortform     		= tooltip_header  + "Short Form      	</div><font class = \"red\"> ex. Van der Peet</font> <br>Use a short form to refer to the judgment later in your paper. <br>It is normally the first party name. <br>"
//var tooltip_pincite_input     	= tooltip_header + "Pinpoint             	</div><font class = \"red\"> ex. 132 </font><br>Use paragraphs where available, otherwise pages. <br>Use the radio button to indicate which reporter you are citing to."
var tooltip_pincite_input     	= tooltip_header + "Pinpoint             	</div><font class = \"red\"> ex. 132 </font><br>Use paragraphs where available, otherwise pages. <br>Use the radio button to indicate which reporter you are citing to.<br><br>"+ tooltip_header +  "Cite to </div> Use the radio buttons to select a reporter if you will pinpoint to it at some point other than the first instance of the citation. <br>"
var tooltip_citing         		= tooltip_header  + "Citing               </div><font class = \"red\">  ex. Crevier v AG Quebec, [1981] 2 SCR 220; [1981] 127 DLR (3d) 1</font> <br>Use the citing feature if the main judgement cites a passage from another case, if appropriate. <br>"
var tooltip_judge 				= tooltip_header  + "Judge               </div><font class = \"red\"> ex. Binnie J </font><br>CJC = Chief Justice of Canada <br>CJA = Chief Justice of Appeal <br>CJ = Chief Justice <br>JA = Justice of Appeal <br>JJA = Justices of Appeal <br>J = Justice <br>JJ = Justices <br>Mag = Magistrate <br>"
//var tooltip_citeTo 	            = tooltip_header + "Cite To              </div><font class = \"red\"> ex. WWR (2d) </font><br>\"Cite to\" a reporter if you will pinpoint to it at some point other than the first instance of the citation. <br>"
var tooltip_history 	            = tooltip_header + "History              </div>Affirming or Reversing <font class = \"red\"> <br> ex. 2003 BCSC 14 </font><br>Input minimum <b>one</b> citation for the lower court judgement. <br> <br>Affirmed or Reversed <br><font class = \"red\">ex. 2011 SCC 66, [2011] 3 SCR 837 </font> <br>Input minimum <b>two</b> citations for the upper court judgement. <br> "
var tooltip_leavetoappeal    = tooltip_header + "Leave To Appeal </div> Granted: input court and pre-citation. <br> <font class = \"red\">ex. SCC, [2008] 1 SCR xiv <\font><br>Refused: input court and docket number. <br><font class = \"red\">ex. SCC, 23424 (November 20, 2009) <\font><br>Requested or As of right: input court. <br><font class = \"red\">ex. \"SCC\" </font><br>"

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


jQuery('#CanadaCase-Form input').focus(function(){
		var name = jQuery(this).attr('name') // get Forms name
		var tool = eval('tooltip_'+name); // convert it to a variable
		jQuery('#tooltips').html(tool); // display the tooltip
		var formTop = jQuery("#CanadaCase-Form").offset();
		var currentForm = jQuery(this).offset();
		
		var positionDifference = currentForm.top - formTop.top;
		console.log(Math.floor(positionDifference/200)*200);
		console.log(Math.round(positionDifference));
		
		jQuery('#tooltips').css('margin-top', Math.floor(positionDifference/200)*200);
					
		
		//console.log(jQuery(this).attr('class').split(' ')[1]); // get the second class
		//console.log(jQuery(this).parent('.control-group'));
});

jQuery('#CanadaCase-Form select').change(function(){
	console.log(jQuery(this).attr('name'));
	// Do something in here
});
//jQuery('#tooltips').html(tooltip_styleOfCause);

 

jQuery('#CanadaCaseDate').focus(function(){
	jQuery('#tooltips').html(tooltip_year);
});
jQuery('#CanadaCaseCourt').focus(function(){
	jQuery('#tooltips').html(tooltip_court);
});

jQuery('#CanadaCaseShortForm').focus(function(){
	jQuery('#tooltips').html(tooltip_shortform);
});
jQuery('#CanadaCasePinpoint').focus(function(){
	jQuery('#tooltips').html(tooltip_pinpoint);
});
jQuery('#CanadaCaseCiteTo').focus(function(){
	jQuery('#tooltips').html(tooltip_citeTo);
});
jQuery('#CanadaCaseJudge').focus(function(){
	jQuery('#tooltips').html(tooltip_judge);
});
jQuery('#CanadaCaseCiting').focus(function(){
	jQuery('#tooltips').html(tooltip_citing);
});
jQuery('#CanadaCaseHistory').focus(function(){
	jQuery('#tooltips').html(tooltip_history);
});
jQuery('#CanadaCaseLeaveToAppeal').focus(function(){
	jQuery('#tooltips').html(tooltip_leaveToAppeal);
});

jQuery('#CanadaCaseSubnom').focus(function(){
	jQuery('#tooltips').html(tooltip_subNom);
});

/*
=============================================
Validations 
=============================================
*/		
	var regex_style 		= /^[\wa-zA-Z0-9.,;:'!@#$%^&()<>-ßÄÖÜäöüÑñÉéÈèÁáÀàÂâŶĈĉĜĝŷÊêÔôÛûŴŵ\s]*$/
	var regex_parallel 	= /^[a-zA-Z0-9.,;'&()ÉéÈèÁáô\[\]\s]*$/
	var regex_year 		= /(1[4-9][0-9]{2}|200[0-9]{1}|201[01234]{1})/
	var regex_digits 	=/^\d+$/
	var regex_court 		=/^[a-zA-Z\s.()-éÉÈèîÎôÔÁáÀàÂâ]*$/
	var regex_judge		=/^[a-zA-Z\s.éÉÈèîÎôÔÁáÀàÂâ]*$/
	// Validates the form to check if a form works or not
	// Note: rules are based on name of form
	var CanadianCaseValidator = jQuery('#canadacase-form').validate({
			//ignore: ".search-query",
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
					required: true 
				},
				shortform: {
					maxlength:100,	
					regex: regex_style,
				},
				pincite_input:{
					maxlength:10,	
					regex: /^[\d,-\s]*$/,
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
				},					
				leaveToAppeal_docket: {
					maxlength:50,	
					regex: regex_parallel,
				},		
				leaveToAppeal_court:{
					maxlength:250,	
					regex: regex_court,
				},					

			},
			highlight: function(element) {
				console.log("in highlight");
				jQuery(element).closest('.control-group').addClass('error');
				//jQuery(element).closest('.control-group').html("AAAAAAAAAA");
			},
			success: function(element) {	
				console.log("in success");			
				//element.text('OK!').addClass('valid').closest('.control-group').removeClass('error');//.addClass('success'); 
				element.closest('.control-group').removeClass('error');//.addClass('success'); 
				
				element.text('OK!').addClass('valid');
				
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
					maxlength: "Maximum length: 20 characters.",
					regex: "Enter a year between 1400 and 2014.",
					required: " "
				},
				court: {
					maxlength: "Maximum length: 250 characters.",
					required: " "
				},
				shortform: {
					maxlength: "Maximum length: 100 characters.",
					required: " "
				},		
				pincite_input:{
					maxlength: "Maximum length: 10 characters.",
					regex: "Digits only, please."
				},
				judge: {
					maxlength: "Maximum length: 100 characters.",
				},
				citing_year:{
					maxlength: "Maximum length: 20 characters.",
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
					maxlength:"Maximum length: 20 characters.",	
					regex:"Enter a year between 1400 and 2014."
				},
				history_court1: {
					maxlength:"Maximum length: 250 characters.",	
				},	
				history_parallel2:{
					maxlength: "Maximum length: 250 characters.",
				},
				history_year2: {
					maxlength:"Maximum length: 20 characters.",	
					regex:"Enter a year between 1400 and 2014."
				},
				history_court2: {
					maxlength:"Maximum length: 250 characters.",	
				},	
				history_parallel3:{
					maxlength: "Maximum length: 250 characters.",
				},
				history_year3: {
					maxlength:"Maximum length: 20 characters.",	
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
Collapsing
=============================================
*/		
	jQuery(".demo").collapse()

/*
=============================================
History
=============================================
*/	

/*
=============================================
Reporter List
=============================================
*/
	var templist = [['A', 'Atlantic Reporter', ['USA'], [[1855, 1983]]], ['A (2d)', 'Atlantic Reporter, Second Series', ['USA'], [[1938, 2013]]], ['A & N', "Alcock and Napier's Reports", ['Ireland'], [[1831, 1833]]], ['A Crim R', 'Australian Criminal Reports', ['Australia'], [[1980, 2013]]], ['Act', "Acton's Prize Cases", ['USA'], [[1809, 1811]]], ["A Int'l LC", 'American International Law Cases', ['USA'], [[1793, 2013]]], ['ANWTYTR', 'Alberta, Northwest Territories & Yukon Tax Reporter', ['Canada'], [[1973, 2013]]], ['AALR', 'Australian Argus Law Reports', ['Australia'], [[1960, 1973]]], ['AAR', 'Administraive Appeal Reports', ['Australia'], [[1984, 2013]]], ['AAS', 'Arbitrage - Sant\\xe9 et services sociaux', ['Canada', 'Quebec'], [[1983, 2013]]], ['ABC', 'Australian Bankruptcy Cases', ['Australia'], [[1928, 1964]]], ['ABD', 'Canada, Public SErvice Commission, Appeals and Investigation Branch, Appeal Board Decisinos', ['Canada'], [[1979, 1999]]], ['AC', 'Law Reports, Appeal Cases', ['United Kingdom'], [[1890, 2013]]], ['ACA', 'Australian Corporate Affairs Reporter', ['Australia'], [[1971, 1982]]], ['ACLC', 'Australian Company Law Cases', ['Australia'], [[1971, 1982]]], ['ACLP', 'Australian Company Law and Practice', ['Australia'], [[1981, 1991]]], ['ACLR', 'Australian Company Law Reports', ['Australia'], [[1974, 1989]]], ['ACLR', 'Australian Company Law Reporter', ['Australia'], [[1982, 1997]]], ['ACSR', 'Australian Coporations and Securities Reports', ['Australia'], [[1989, 2013]]], ['ACTR', 'Autralian Capital Territory Reports', ['Australia'], [[1973, 2013]]], ['ACWS', 'All Canada Weekly Summaries', ['Canada'], [[1970, 1979]]], ['ACWS (2d)', 'All Canada Weekly Summaries (Second Series)', ['Canada'], [[1980, 1986]]], ['ACWS (3d)', 'All Canada Weekly Summaries (Third Series)', ['Canada'], [[1980, 2013]]], ['AD', 'South African Law reports, Appellate Division', ['South Africa'], [[1910, 1946]]], ['Adam', "Adam's Justiciary Cases", ['Scotland'], [[1893, 1916]]], ['Add', "Addams's Reports (ER vol 162)", ['United Kingdom'], [[1822, 1826]]], ['ADIL', 'Annual Digest and Reports of Public International Cases', ['International'], [[1919, 1949]]], ['Admin LR', 'Administratice Law Reports', ['Canada'], [[1983, 1991]]], ['Admin LR (2d)', 'Administratice Law Reports (Second Series)', ['Canada'], [[1992, 1998]]], ['Admin LR (3d)', 'Administratice Law Reports (Third Series)', ['Canada'], [[1998, 2003]]], ['Admin LR (4th)', 'Administratice Law Reports (Fourth Series)', ['Canada'], [[2003, 2013]]], ['Ad & El', "Adolphus & Ellis's Reports (ER Vols 110-113)", ['USA'], [[1834, 1842]]], ['ADR', 'Australian De Facto Relationships Law', ['Australia'], [[1985, 2013]]], ['AEBR', 'Australian Business & Assets Planning Reporter', ['Australia'], [[1986, 2013]]], ['AEBCN', 'Australian Business & Estate Planning Case Notes', ['Australia'], [[1979, 1981]]], ['AEUB', 'Alberta Energy and Utilities Board Decisions', ['Canada'], [[1995, 2013]]], ['Afr LR (Comm)', 'African Law Reports: Commercial', ['Africa'], [[1964, 1980]]], ['Afr LR (Mal)', 'African Law Reports: Malawi Series', ['Africa'], [[1923, 1972]]], ['Afr LR (SL)', 'African Law Reports: Sierra Leone Series', ['Africa'], [[1920, 1936], [1957, 1960], [1964, 1966], [1972, 1973]]], ['AFTR', 'Australian Federal Tax Reporter', ['Australia'], [[1969, 2013]]], ['AILR', 'Australia Indigenous Law Reporter', ['Australia'], [[1996, 2013]]], ['A imm app', "Affaires d'immegration en appel", ['Canada'], [[1967, 1970]]], ['A imm app (ns)', "Affaires d'immegration en appel (nouvelle s\\xe9rie)", ['Canada'], [[1969, 1977]]], ['AIN', 'Australian Industrial and Intellectual Property Cases', ['Australia'], [[1982, 2013]]], ['AJDA', 'Actualit\\xe9 juridique, droit administratif', ['France'], [[1955, 2013]]], ['AJDI', 'Actualit\\xe9 juridique, droit immobilier', ['France'], [[1997, 2013]]], ['AJDQ', 'Annuaire de jurispredenec et de doctrine du Qu\\xe9bec', ['Canada', 'Quebec'], [[1989, 2013]]], ['AJPI', 'Actualit\\xe9 juridique, propori\\xe9t\\xe9 immobili\\xe9re', ['France'], [[1955, 1997]]], ['AJQ', 'Annuaire de jurisprudence du Qu\\xe9bec', ['Canada', 'Quebec'], [[1937, 1988]]], ['Al', "Aleyn's Select Cases (ER vol 82)", ['United Kingdom'], [[1646, 1649]]], ['Ala', 'Alabama Reports', ['USA'], [[1840, 1946]]], ['Ala (NS)', 'Alabama Reports (New Series)', ['USA'], [[1846, 1975]]], ['Alaska Fed', 'Alaska Federal Reports', ['USA'], [[1869, 1937]]], ['Alaska R', 'Alaska Reports', ['USA'], [[1884, 1958]]], ['ALD', 'Adminsitrative Law Decisions', ['Australia'], [[1976, 2013]]], ['ALJR', 'Australian Law Journal Reports', ['Australia'], [[1958, 2013]]], ['All ER', 'All England Reports', ['United Kingdom'], [[1936, 2013]]], ['All ER (Comm)', 'All England Reports (Commercial Cases)', ['United Kingdom'], [[1999, 2013]]], ['All ER (EC)', 'All England Law Reports (European Cases)', ['United Kingdom'], [[1995, 2013]]], ['All ER Rep', 'All England Reports Reporents', ['United Kingdom'], [[1558, 1935]]], ['All ER Rep Ext', 'All England Reprings Extension Volumes', ['United Kingdom'], [[1861, 1935]]], ['ALLR', 'Australian Law Reporter', ['Australia'], [[1977, 2013]]], ['ALMD', 'Australian Legal Monthly Digest', ['Australia'], [[1967, 2013]]], ['Alta BAA', 'Alberta Board of Arbitration, Arbitrations under the Alberta Labour Act', ['Canada', 'Alberta'], [[1980, 2013]]], ['Alta BAAA', 'Alberta Board of Adjudication, Adjudications and Arbitrations under the Public Service Employee Relations Act', ['Canada', 'Alberta'], [[1980, 1986]]], ['Alta BIR', 'Alberta Board of Industrial Relations Decisions', ['Canada', 'Alberta'], [[1961, 1982]]], ['Alta ERCB', 'Alberta Energy Resources Conservation Board (Decisions and Reports)', ['Canada', 'Alberta'], [[1971, 2013]]], ['Alta HRCR', 'Alberta Human Rights Commission, Reports of Boards of Inquiry', ['Canada', 'Alberta'], [[1972, 19982]]], ['Alta LR', 'Alberta Law Reports', ['Canada', 'Alberta'], [[1908, 1933]]], ['Alta LR (2d)', 'Alberta Law Reports (Second Series)', ['Canada', 'Alberta'], [[1976, 1992]]], ['Alta LR (3d)', 'Alberta Law Reports (Third Series)', ['Canada', 'Alberta'], [[1992, 2002]]], ['Alta LR (4th)', 'Alberta Law Reports (Fourth Series)', ['Canada', 'Alberta'], [[2002, 2009]]], ['Alta LR (5th)', 'Alberta Law Reports (Fifth Series)', ['Canada', 'Alberta'], [[2009, 2013]]], ['Alta LRBD', 'Alberta Labour Relations Board Decisions', ['Canada', 'Alberta'], [[1982, 1986]]], ['Alta LRBR', 'Alberta Labour Relations Board Reports', ['Canada', 'Alberta'], [[1986, 2013]]], ['Alta OGBC', 'Alberta Oil and Gas Conservation Board Decisions', ['Canada', 'Alberta'], [[1957, 1971]]], ['Alta PSERB', 'Alberta Public Service Employee Relations Baord Decisions', ['Canada', 'Alberta'], [[1981, 1986]]], ['Alta PSGAB', 'Alberta Public Services Grievance Appeal Board Adjudications and Arbitrations', ['Canada', 'Alberta'], [[1980, 1985]]], ['Alta PUB', 'Alberta Public Utilities Board Decisions', ['Canada', 'Alberta'], [[1976, 2013]]], ['ALR', 'Administrative Law Reports in the British Journal of Administrative Law', ['United Kingdom'], [[1954, 1954]]], ['ALR', 'American Law Reports', ['USA'], [[1919, 1948]]], ['ALR', 'Argus Law Reports', ['Australia'], [[1895, 1959]]], ['ALR', 'Australian Law Reports', ['Australia'], [[1973, 2013]]], ['ALR (2d)', 'American Law Reports (Second Series)', ['USA'], [[1948, 1965]]], ['ALR (3d)', 'American Law Reports (Third Series)', ['USA'], [[1965, 1980]]], ['ALR (4th)', 'American Law Reports (Fourth Series)', ['USA'], [[1980, 1991]]], ['ALR (5th)', 'American Law Reports (Fifth Series)', ['USA'], [[1992, 2013]]], ['Amb', "Ambler's Reports, Chancery (ER vol 27)", ['United Kingdom'], [[1716, 1783]]], ['AMC', 'American Martime Cases', ['USA'], [[1923, 2013]]], ['And', "Anderson's Common Law Conveyancing and Equity (ER vol 123)", ['United Kingdom'], [[1534, 1605]]], ['Andr', "Andrew's Reports (ER vol 95)", ['United Kingdom'], [[1738, 1739]]], ['Ann Conv Eur DH', "Annuaire de la Convention eurp\\xe9ene des droits de l'Homme", ['Europe'], [[1958, 2013]]], ['Anst', "Anstruther's Reports (ER vol 145)", ['United Kingdom'], [[1792, 1797]]], ['App Cas', 'Appeal Cases', ['United Kingdom'], [[1875, 1890]]], ['App Div', 'New York Appellate Dicision Reports', ['United Kingdom'], [[1896, 1956]]], ['App Div (2d)', 'New York Appellate Dicision Reports (Second Series)', ['USA'], [[1956, 2013]]], ['APR', 'Atnalntic Provinces Reports', ['Canada'], [[1975, 2013]]], ['Arb Serv Rep', 'Arbitration Services Reporter', ['Canada'], [[1977, 2013]]], ['Ariz', 'Arizona Reports', ['USA'], [[1866, 2013]]], ['Ark', 'Arkansas Reports', ['USA'], [[1837, 2013]]], ['Ark App', 'Arkansas Appellate Reports', ['USA'], [[1981, 2013]]], ['Arn', "Arnold's Reports", ['United Kingdom'], [[1838, 1839]]], ['Arn & H', "Arnold and Hodge's Reports", ['United Kingdom'], [[1840, 1841]]], ['AR', 'Alberta Reports', ['Canada', 'Alberta'], [[1976, 2013]]], ['ASLC', 'Australian Securities Law Cases', ['Australia'], [[1971, 2013]]], ['ASC Sum', 'Alberta Securities Commission Summaries', ['Canada', 'Alberta'], [[1975, 2013]]], ['Asp MLC', "Aspinall's Maritime Law Cases", ['United Kingdom'], [[1870, 1940]]], ['ATB', 'Canada Air Transprot Board Decisions', ['Canada'], [[1944, 1967]]], ['ATC', 'Australian Tax Cases', ['Australia'], [[1969, 2013]]], ['Atk', "Atkyns's Reports, Chancery (ER vol 26)", ['United Kingdom'], [[1736, 1755]]], ['Av Cas', 'Aviation Cases', ['USA'], [[1822, 2013]]], ['AWLD', 'Alberta Weekly Law Digest', ['Canada', 'Alberta'], [[1982, 2013]]], ['B & Ad', "Barnewall & Adolphus's Reports, King's Bench (ER vols 109-110)", ['United Kingdom'], [[1830, 1834]]], ['B & Ald', "Barnewall Anderonson's Reports, King's Bench", ['United Kingdom'], [[1817, 1822]]], ['B & CR', 'Reports of Bankruptcy and Companies Winding-Up Cases', ['United Kingdom'], [[1918, 1941]]], ['B & Cress', "Barnewall & Cresswell's Reports, King's Bench (ER vols 107-109)", ['United Kingdom'], [[1822, 1830]]], ['B & S', "Best & Smith's Reports (ER vols 121-122", ['United Kingdom'], [[1861, 1865]]], ['BA', 'Book of Awards (Arbitration Court, Court of Appeal)', ['New Zealand'], [[1894, 1991]]], ['Ball & B', "Ball and Beatty's Reports", ['Ireland'], [[1807, 1814]]], ['Barn C', "Barnardiston's Chancery Reports (ER vol 27)", ['United Kingdom'], [[1740, 1741]]], ['Barn KB', "Barnardison's King's Bench Reports (ER vol 94)", ['United Kingdom'], [[1726, 1735]]], ['Barnes', "Barnes's Notes (ER vol 94)", ['United Kingdom'], [[1732, 1760]]], ['Batt', "Batty's Reports", ['Ireland'], [[1825, 1826]]], ['BC Empl', 'British Columbia Employment Standards Board Decisions', ['Canada', 'British Columbia'], [[1981, 1983]]], ["BC En Comm'n Dec", 'British Columbia Energy Commission Decisions', ['Canada', 'British Columbia'], [[1977, 1980]]], ['BCHRC Dec', 'British Columbia Human Rights Commission Decisions', ['Canada', 'British Columbia'], [[1975, 1982]]], ['BCSCW Summ', 'British Columbia Securities Commission Weekly Summary', ['Canada', 'British Columbia'], [[1987, 2013]]], ["BC Util Comm'n", 'British Columbia Utilities Commission Decisions', ['Canada', 'British Columbia'], [[1980, 2013]]], ['BCAC', 'British Columbia Appeal Cases', ['Canada', 'British Columbia'], [[1991, 2013]]], ['BCAVC', 'British Columbia, Director of Trade Practices, Assurances of voluntary compliance pursuant to section 15 of the Trade PRactices Act (Decisions)', ['Canada', 'British Columbia'], [[1974, 1978]]], ['BCD', 'Bulletin des contributions directes, de la tace sur la valeur ajout\\xe9e et des imp\\xf4ts indirects', ['France'], [[1961, 1974]]], ['BCLR', 'British Columbia Law Reports', ['Canada', 'British Columbia'], [[1977, 1986]]], ['BCLR (2d)', 'British Columbia Law Reports (Second Series)', ['Canada', 'British Columbia'], [[1986, 1995]]], ['BCLR (3d)', 'British Columbia Law Reports (Third Series)', ['Canada', 'British Columbia'], [[1995, 2001]]], ['BCLR (4th)', 'British Columbia Law Reports (Fourth Series)', ['Canada', 'British Columbia'], [[2002, 2013]]], ['BCLRB Dec', 'British Columbia Labour Relations Board Decisions', ['Canada', 'British Columbia'], [[1979, 2013]]], ['B Const LR', 'Butterworths Constitutional Law Reports', ['South Africa'], [[1994, 2013]]], ['BCR', 'British Columbia Reports', ['Canada', 'British Columbia'], [[1867, 1947]]], ['BCWCR', "Brisith Columbia Workers' Compensation Reporter", ['Canada', 'British Columbia'], [[1973, 2013]]], ['BDM', 'Bulletin de droit municipal', ['Canada', 'Quebec'], [[1994, 2013]]], ["Bd Rwy Comm'rs Can", 'Board of Railway Commissioners for Canada - Judgements, Orders, Regulations, and Rulings', ['Canada'], [[1911, 1938]]], ["Bd Trans Comm'rs Can", 'Board of Transport Commissioners for Canada - Judgements, Orders, Regulations, and Rulings', ['Canada'], [[1938, 1967]]], ['Beat', "Beatty's Reports", ['Ireland'], [[1813, 1830]]], ['Beaubien', 'Beaubien', ['Canada', 'Quebec'], [[1905, 1906]]], ['Beav', "Beavan's Reports (ER vols 48-55)", ['United Kingdom'], [[1838, 1866]]], ['Bel', "Bellewe's Reports (ER vol 72)", ['United Kingdom'], [[1378, 1400]]], ['Bell', "Bell's Reports (ER vol 169)", ['United Kingdom'], [[1858, 1860]]], ['Ben & D', "Benloe & Dalison's Reports (ER vol 123)", ['United Kingdom'], [[1486, 1580]]], ['Benl', "Benloe's Reports (ER vol 73)", ['United Kingdom'], [[1531, 1628]]], ['BILC', 'British International Law Cases', ['United Kingdom'], [[1964, 2013]]], ['Bing', "Bingham's Reports (ER vols 130-131)", ['United Kingdom'], [[1822, 1834]]], ['Bing NC', "Bingham's New Cases (ER vols 131-133)", ['United Kingdom'], [[1834, 1840]]], ['BISD', 'Basic Instruments and Selected Documents', ['Angola', 'Antigua and Barbuda', 'Argentina', 'Australia', 'Austria', 'Bahrain', 'Bangladesh', 'Barbados', 'Belgium', 'Belize', 'Benin', 'Bolivia', 'Botswana', 'Brazil', 'Brunei Darussalam', 'Burkina Faso', 'Burundi', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'Colombia', 'Congo, Republic of', 'Costa Rica', "Cote d'Ivoire", 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Egypt', 'El Salvador', 'Fiji', 'Finland', 'France', 'Gabon', 'The Gambia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Kenya', 'Korea, Republic of', 'Kuwait', 'Lesotho', 'Liechtenstein', 'Luxembourg', 'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Morocco', 'Mozambique', 'Myanmar, Union of', 'Namibia', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Pakistan', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Rwanda', 'Senegal', 'Sierra Leone', 'Singapore', 'Slovak Republic', 'Slovenia', 'Solomon Islands', 'South Africa', 'Spain', 'Sri Lanka', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Suriname', 'Swaziland, Kingdom of', 'Sweden', 'Switzerland', 'Tanzania', 'Thailand', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Uganda', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Venezuela', 'Yugoslavia', 'Zaire', 'Zambia', 'Zimbabwe'], [[1952, 2013]]], ['Bla H', 'H Blackstone Reports', ['United Kingdom'], [[1788, 1796]]], ['Bla W', 'W Blackstone Reports', ['United Kingdom'], [[1746, 1779]]], ['BLE', 'Bulletin du libre-\\xe9change', ['Canada'], [[1990, 1996]]], ['Bli', "Bligh's Reports, House of Lords (ER vol 4)", ['United Kingdom'], [[1819, 1821]]], ['Bli NS', "Bligh's Reports (New Series) (ER vols 4-6)", ['United Kingdom'], [[1826, 1837]]], ['BLR', 'Business Law Reports', ['Canada'], [[1977, 1990]]], ['BLR (2d)', 'Business Law Reports (Second Series)', ['Canada'], [[1991, 1999]]], ['BLR (3d)', 'Business Law Reports (Third Series)', ['Canada'], [[2000, 2005]]], ['BLR (4th)', 'Business Law Reports (Fourth Series)', ['Canada'], [[2005, 2013]]], ['Bos & Pul', "Bosanquet & Puller's Reports (ER vols 126-127)", ['United Kingdom'], [[1796, 1804]]], ['Bos & Pul NR', "Bosanquet & Puller's New Reports (ER vol 127)", ['United Kingdom'], [[1804, 1807]]], ['BR', 'Recueils de jurisprudence du Qu\\xe9bec: Cour du Banc de la Reine / du Roi', ['Canada', 'Quebec'], [[1892, 1941]]], ['BR', 'Rapports judiciaires officels de Qu\\xe9bec: Cour du Bnc de la Reine / du Roi', ['Canada', 'Quebec'], [[1942, 1969]]], ['BREF', "D\\xe9cisions du Bureau de r\\xe9vision de l'\\xe9valuation fonci\\xe9re", ['Canada', 'Quebec'], [[1980, 1988]]], ['Bridg', "Sir John Bridgman's Conveyances", ['United Kingdom'], [[1613, 1621]]], ['Bridg Conv', "Sir Orlando Bridgman's Conveyances", ['United Kingdom'], [[1600, 1667]]], ['Bridg J', "Sir J Bridgman's Reports (ER vol 123)", ['United Kingdom'], [[1613, 1621]]], ['Bridg O', "Sir O Bridgman's Reports (ER vol 124)", ['United Kingdom'], [[1660, 1667]]], ['Bro CC', "Brown's Chancery Cases (by Belt) (ER vols 28-29)", ['United Kingdom'], [[1778, 1794]]], ['Bro PC', "Brown's Parliamentary Cases (ER vols 1-3)", ['United Kingdom'], [[1702, 1800]]], ['Brod & Bing', "Broderip & Bingham's reports (ER vol 129)", ['United Kingdom'], [[1819, 1822]]], ['Brooke NC', "Brooke's New Cases (ER vol 73)", ['United Kingdom'], [[1515, 1558]]], ['Brown & Lush', "Browning & Lushington's Admirality Reports (ER vol 167)", ['United Kingdom'], [[1863, 1867]]], ['Brownl', "Brownlow & Goldesborough's Reports (ER vol 123)", ['United Kingdom'], [[1569, 1624]]], ['Bull CVMQ', 'Bulletin - Commission des valeurs mobili\\xe9res du Qu\\xe9bec', ['Canada', 'Quebec'], [[1970, 2013]]], ['Bull civ', 'Bulletin des arr\\xeats de la Cour de cassation, Chambres civiles', ['France'], [[1798, 2013]]], ['Bull Concl fisc', 'Bulletin des conclusions fiscales', ['France'], [[1992, 2013]]], ['Bull Crim', 'Bulletin des arr\\xeats de la Cour de cassation, Chambre criminelle', ['France'], [[1798, 2013]]], ['Bull OSC', 'Bulletin of the Ontario Securities Commission', ['Canada', 'Ontario'], [[1981, 2013]]], ['Bulst', "Bulstrode's Reports, King's Bench (ER vols 80-81)", ['United Kingdom'], [[1609, 1626]]], ['Bunb', "Bunbury's Reports, Exchequer (ER vol 145)", ['United Kingdom'], [[1713, 1741]]], ['Burr', "Burrow's Reports (ER vols 97-98)", ['United Kingdom'], [[1756, 1772]]], ['Burrell', "Burrell's Reports (ER vol 167)", ['United Kingdom'], [[1584, 1839]]], ['C & J', "Crompton & Jervis's Reports (ER vols 148-149)", ['United Kingdom'], [[1830, 1832]]], ['C & M', "Crompton & Meeson's Reports (ER vol 149)", ['United Kingdom'], [[1832, 1834]]], ['C & S', "Clarke and Scully's Drainage Cases", ['Canada', 'Ontario'], [[1898, 1903]]], ['CA', "Recueils de jurisprudence de Qu\\xe9bec: Cour d'appel", ['Canada', 'Quebec'], [[1970, 1985]]], ['CAC', 'Canada Citizenship Appeal Court, Reasons for Judgement', ['Canada'], [[1975, 1977]]], ['CACM', "Recueil des arr\\xeats de la Cour d'appeal des cours martiales", ['Canada'], [[1957, 2013]]], ['CAEC', "Commission d'appel de enregistrements commerciaux, Sommaires des d\\xe9cisions", ['Canada', 'Ontario'], [[1971, 2013]]], ['CAI', "D\\xeacisions de la Commission d'acc\\xe9s \\xe1 l'information", ['Canada', 'Quebec'], [[1984, 2013]]], ['Cal', 'California Reports', ['USA'], [[1850, 1934]]], ['Cal (2d)', 'California Reports (Second Series)', ['USA'], [[1934, 1969]]], ['Cal (3d)', 'California Reports (Third Series)', ['USA'], [[1969, 1991]]], ['Cal (4th)', 'California Reports (Fourt Series)', ['USA'], [[1991, 2013]]], ['CALP', "D\\xe9cisions de la Commission d'appel en mati\\xe9re de l\\xe9sions professionnelles", ['Canada', 'Quebec'], [[1986, 1998]]], ['CALR', 'Criminal Appeals Law Reporter', ['Canada'], [[1993, 2013]]], ['Calth', "Calthrop's Reports (ER vol 80)", ['United Kingdom'], [[1609, 1618]]], ['Cameron PC', "Cameron's Constitutional Decisions of the Privy Council", ['Canada'], [[1867, 1915]]], ['Cameron SC', "Cameron's Supreme Court Cases", ['Canada'], [[1880, 1900]]], ['Camp', "Campbell's Reports (ER vols 170-171)", ['United Kingdom'], [[1807, 1816]]], ['Cape SCR', 'Supreme Court Reports (Cape)', ['South Africa'], [[1880, 1910]]], ['CAQ', 'Causes en appel au Qu\\xe9bec', ['Canada', 'Quebec'], [[1986, 1995]]], ['CAR', 'Commonwealth Arbitration Reports', ['Australia'], [[1905, 2013]]], ['Car & K', 'Carrington & Kirwan Reports (ER vols 174-175)', ['United Kingdom'], [[1843, 1853]]], ['Car & M', 'Carringston & Marshman Reports (ER vol 174)', ['United Kingdom'], [[1840, 1842]]], ['Car & P', 'Carringston & Payne (ER vols 171-173', ['United Kingdom'], [[1823, 1841]]], ['Carey', "Carey's Manitoba Reports", ['Canada', 'Manitoba'], [[1875, 1875]]], ['Cart BNA', "Cartwright's Cases on the British Borth America Act, 1867", ['Canada'], [[1882, 1897]]], ['Carter', "Carter's Reports, Common Pleas (ER vol 124)", ['United Kingdom'], [[1664, 1676]]], ['Carth', "Carthew's Reports, King's Bench (ER vol 90)", ['United Kingdom'], [[1686, 1701]]], ['Cary', "Cary's Chancery Reports (ER vol 21)", ['United Kingdom'], [[1557, 1604]]], ['CAS', 'D\\xe9cisions de la Commission des affaires sociales', ['Canada', 'Quebec'], [[1975, 1997]]], ['Cas t Hard', 'Cases temp Hardwicke (ER vol 95)', ['United Kingdom'], [[1733, 1738]]], ['Cas t Talb', 'Cases temp Talbot (ER vol 25)', ['United Kingdom'], [[1733, 1738]]], ['CB', 'Common Bench Reports (ER vols 135-139)', ['United Kingdom'], [[1845, 1856]]], ['CB (NS)', 'Common Bench Reports (New Series) (ER vols 140-144)', ['United Kingdom'], [[1856, 1866]]], ['CBES', 'Recueils de jurisprudence du Qu\\xe9bec: Cour du bien-\\xeatre social', ['Canada', 'Quebec'], [[1975, 1977]]], ['CBR', 'Copyright Board Reports', ['Canada'], [[1990, 1994]]], ['CBR', 'Canadian Bankruptcy Reports', ['Canada'], [[1920, 1960]]], ['CBR (NS)', 'Canadian Bankruptcy Reports (New Series)', ['Canada'], [[1960, 1990]]], ['CBR (3d)', 'Canadian Bankruptcy Reports (Third Series)', ['Canada'], [[1991, 1998]]], ['CBR (4th)', 'Canadian Bankruptcy Reports (Fourth Series)', ['Canada'], [[1998, 2004]]], ['CBR (5th)', 'Canadian Bankruptcy Reports (Fifth Series)', ['Canada'], [[2004, 2013]]], ['CCC', 'Cashiers du Conseil constitutional', ['France'], [[1996, 2013]]], ['CCC', 'Canadian Criminal Cases', ['Canada'], [[1898, 1962]]], ['CCC (NS)', 'Canadian Criminal Cases (New Series)', ['Canada'], [[1963, 1970]]], ['CCC (2d)', 'Canadian Criminal Cases (Second Series)', ['Canada'], [[1971, 1983]]], ['CCC (3d)', 'Canadian Criminal Cases (Third Series)', ['Canada'], [[1983, 2013]]], ['CCEL', 'Canadian Cases on Employment Law', ['Canada'], [[1983, 1994]]], ['CCEL (2d)', 'Canadian Cases on Employment Law (Second Series)', ['Canada'], [[1994, 2000]]], ['CCEL (3d)', 'Canadian Cases on Employment Law (Third Series)', ['Canada'], [[2000, 2013]]], ['CCL', 'Canadian Current Law', ['Canada'], [[1948, 1990]]], ['CCL', 'Canadian Current Law: Jurispredence / sommaires de la jurisprudence', ['Canada'], [[1991, 1991]]], ['CCL', 'Canadian Current Law: Case Law Digests / sommaires de la jurisprudence', ['Canada'], [[1992, 1996]]], ['CCL', 'Canadian Current Law: Case Digests / sommaires de la jurisprudence', ['Canada'], [[1996, 2013]]], ['CCL L\\xe9gislation', 'Canadian Current Law: Annuaire de la l\\xe9gislation', ['Canada'], [[1989, 2013]]], ['CCL Legislation', 'Canadian Current Law: Legislation Annual', ['Canada'], [[1989, 2013]]], ['CCLI', 'Canadian Cases on the Law of Insurance', ['Canada'], [[1983, 1991]]], ['CCLI (2d)', 'Canadian Cases on the Law of Insurance (Second Series)', ['Canada'], [[1993, 1998]]], ['CCLI (3d)', 'Canadian Cases on the Law of Insurance (Third Series)', ['Canada'], [[1998, 2013]]], ['CCLR', 'Canadian Computer Law Reporter', ['Canada'], [[1983, 1992]]], ['CCLS', 'Canadian Cases on the Law of Securities', ['Canada'], [[1993, 1998]]], ['CCLT', 'Canadian Cases on the Law of Torts', ['Canada'], [[1976, 1990]]], ['CCLT (2d)', 'Canadian Cases on the Law of Torts (Second Series)', ['Canada'], [[1990, 2000]]], ['CCLT (3d)', 'Canadian Cases on the Law of Torts (Third Series)', ['Canada'], [[2000, 2013]]], ['CCPB', 'Canadian Cases on Pensions and Benefits', ['Canada'], [[1994, 2013]]], ['CCRI', 'Conseil canadien des relations industrielles, motif de d\\xe9cision', ['Canada'], [[1999, 2013]]], ['CCRTD', 'Conseil canadien des relations du travail, d\\xe9cisions', ['Canada'], [[1949, 1974]]], ['CCRTDI', 'Conseil canadien des relations du travail, d\\xe9cisions et informations', ['Canada'], [[1974, 1998]]], ['CCTCTD', 'Commission canadienne des transports, comit\\xe9 des t\\xe9l\\xe9communications - d\\xe9cisions', ['Canada'], [[1973, 1976]]], ['CCTCTEP', 'Commission canadienne des transports, comit\\xe9 des transports par eau - permis', ['Canada'], [[1976, 1976]]], ['CCTCTO', 'Commission canadienne des transports, comit\\xe9 des t\\xe9l\\xe9communications - ordonnances', ['Canada'], [[1975, 1976]]], ['CCTCTO', 'Commission canadienne des transports - ordonnances', ['Canada'], [[1972, 1987]]], ['CDB-C', 'Collection de d\\xe9cisions de Bas-Canada', ['Canada'], [[1847, 1891]]], ['CEB', 'Canadian Employment Benefits and Pension Guide Reports', ['Canada'], [[1995, 2013]]], ['CEDH', "Cour europ\\xe9enne des Droits de l'Homme", ['Europe'], [[1960, 2013]]], ['CEDH (S\\xe9r A)', "Publications de la Court europ\\xe9enne des Droits de l'Homme : S\\xe9rie A : Arr\\xeats et d\\xe9cisions", ['Europe'], [[1960, 1999]]], ['CEDH (S\\xe9r B)', "Publications de la Court europ\\xe9enne des Droits de l'Homme : S\\xe9rie B : M\\xe9moires, plaidoiries et documents", ['Europe'], [[1961, 1999]]], ['CEGSB', 'Crown Employees Grievance Settlement Board Decisions', ['Canada', 'Ontario'], [[1976, 1997]]], ['CELR', 'Canadian Environmental Law Reports', ['Canada'], [[1978, 1985]]], ['CELR (NS)', 'Canadian Environmental Law Reports (New Series)', ['Canada'], [[1986, 2013]]], ['CER', 'Canada Customs and Excise Reports', ['Canada'], [[1980, 1989]]], ['CFLC', 'Canadian Family Law Cases', ['Canada'], [[1959, 1977]]], ['CFP', "Recueil des d\\xe9cisions des comit\\xe9s d'appel de la fonction publique", ['Canada', 'Quebec'], [[1980, 1989]]], ['CCTCTEP', 'Commission canadienne des transports, comit\\xe9 des transports par eau\\u2014permis', ['Canada'], [[1976, 1976]]], ['CCTCTO', 'Commission canadienne des transports, comit\\xe9 des t\\xe9l\\xe9communications\\u2014ordonnances', ['Canada'], [[1975, 1976]]], ['CCTO', 'Commission canadienne des transports\\u2014ordonnances', ['Canada'], [[1972, 1987]]], ['CDB-C', 'Collection de decisions du Bas-Canada', ['Canada', 'Quebec'], [[1847, 1891]]], ['CEB', 'Canadian Employment Benefits and Pension Guide Reports', ['Canada'], [[1995, 2013]]], ['CEDH', "Cour europeenne des Droits de l'Homme", ['Europe'], [[1960, 2013]]], ['CEDH (S\\xe9r A)', "Publications de Ia Cour europeenne des Droits de l'Homme : S\\xe9rie A: Arr\\xe9ts et decisions", ['Europe'], [[1960, 1999]]], ['CEDH (S\\xe9r B)', "Publications de Ia Cour europeenne des Droits de I'Homme: S\\xe9rie B : Memoires, plaidoiries et documents", ['Europe'], [[1961, 1999]]], ['CEGSB', 'Crown Employees Grievance Settlement Board Decisions', ['Canada', 'Ontario'], [[1976, 1997]]], ['CELR', 'Canadian Environmental Law Reports', ['Canada'], [[1978, 1985]]], ['CELR (NS)', 'Canadian Environmental Law Reports', ['Canada'], [[1986, 2013]]], ['CER', 'Canadian Customs and Excise Reports', ['Canada'], [[1980, 1989]]], ['CFLC', 'Canadian Family Law Cases', ['Canada'], [[1959, 1977]]], ['CFP', "Recueil des decisions des cornit\\xe9s d'appel de Ia fonction publique", ['Canada', 'Quebec'], [[1980, 1989]]], ['Ch', 'Law Reports, Chancery', ['United Kingdom'], [[1891, 2013]]], ['ChApp', 'Law Reports, Chancery Division', ['United Kingdom'], [[1865, 1874]]], ['Ch CR', 'Chancery Chambers Reports', ['Canada', 'Ontario'], [[1857, 1872]]], ['Ch Ca', 'Cases in Chancery (ER vol 22)', ['United Kingdom'], [[1660, 1698]]], ['Ch D', 'Law Reports, Chancery Division', ['United Kingdom'], [[1875, 1890]]], ['Ch R', 'Chancery Reports (ER vol 21)', ['United Kingdom'], [[1625, 1710]]], ['Chan Cas', 'Chancery Cases (ER vol 22)', ['United Kingdom'], [[1615, 1710]]], ['Chit', "Chitty's Practice Reports, King's Bench", ['United Kingdom'], [[1770, 1822]]], ['Choyce Ca', 'Choyce Cases in Chancery (ER vol 21)', ['United Kingdom'], [[1557, 1606]]], ['CHRR', 'Canadian Human Rights Reporter', ['Canada'], [[1980, 2013]]], ['CICB', 'Criminal Injuries Compensation Board Decisions', ['Canada', 'Ontario'], [[1971, 1989]]], ['CIJ M\\xe9moires', 'Cour internationale de justice: M\\xe9moires, plaidoiries et documents', ['International'], [[1946, 2013]]], ['CIJ Rec', 'Cour internationale dejustice : Recueil des arr\\xeats, avis consultat ifs et ordonnances', ['International'], [[1946, 2013]]], ['CIPOO (M)', "Commissaire a I'information eta Ia protection de Ia vie privee, Ontario, Orders, M Series", ['Canada', 'Ontario'], [[1988, 1998]]], ['CIPOO (P)', "Commissaire a I'information eta a protection de Ia vie privee, Ontario, Orders, P Series", ['Canada', 'Ontario'], [[1992, 1998]]], ['CIPOS', "Commissaire a l'information eta Ia protection de Ia vie privee, Ontario, Sommaires", ['Canada', 'Ontario'], [[1990, 1992]]], ['CIPR', 'Canadian Intellectual Property Reports', ['Canada'], [[1984, 1990]]], ['CIRB', 'Canada Industrial Relations Board, Reasons for Decision', ['Canada'], [[1999, 2013]]], ['CJCE', 'Recueil de Ia jurisprudence de Ia cour et du tribunal de premiere instance, Cour de justice des communaut\\xe9s europ\\xe9ennes', ['Europe'], [[1954, 2013]]], ['Cl & F', "Clark & Finnelly's Reports, House of Lords (ER vols 6-8)", ['United Kingdom'], [[1831, 1846]]], ['CLAS', 'Canadian Labour Arbitration Summaries', ['Canada'], [[1986, 2013]]], ['CLASN', 'Criminal Law Aid Scheme News', ['Singapore'], [[1800, 2013]]], ['CLD', 'Commercial Law Digest', ['Canada'], [[1987, 1990]]], ['CLL', 'Canadian Current Law: Canadian Legal Literature', ['Canada'], [[1991, 2013]]], ['CLLC', 'Canadian Labour Law Cases', ['Canada'], [[1944, 2013]]], ['CLLR', 'Canadian Labour Law Reporter', ['Canada'], [[1982, 2013]]], ['CLP', 'Decisions de Ia Commission des lesions professionnelles', ['Canada', 'Quebec'], [[1998, 2013]]], ['CLR', 'Commonwealth Law Reports', ['Australia'], [[1903, 2013]]], ['CLR', 'Construction Law Reports', ['Canada'], [[1983, 1992]]], ['CLR (2d)', 'Construction Law Reports (Second Series)', ['Canada'], [[1992, 2000]]], ['CLR (3d)', 'Construction Law Reports (Third Series)', ['Canada'], [[2000, 2013]]], ['CLRBD', 'Canada Labour Relations Board Decisions', ['Canada'], [[1949, 1974]]], ['CLRBR', 'Canadian Labour Relations Board Reports', ['Canada'], [[1974, 1982]]], ['CLRBR (NS)', 'Canadian Labour Relations Board Reports (New Series)', ['Canada'], [[1983, 1989]]], ['CLRBR (2d)', 'Canadian Labour Relations Board Reports (Second Series)', ['Canada'], [[1989, 2013]]], ['CM & R', "Crompton, Meeson & Roscoe's Reports (ER vols 149-150)", ['United Kingdom'], [[1834, 1835]]], ['CMAR', 'Canada Court Martial Appeal Reports', ['Canada'], [[1957, 2013]]], ['CMR', 'Common Market Law Reports', ['Europe'], [[1962, 1988]]], ['CMR', 'Common Market Reporter', ['Europe'], [[1988, 1997]]], ['CNLC', 'Canadian Native Law Cases', ['Canada'], [[1763, 1978]]], ['CNLR', 'Canadian Native Law Reporter', ['Canada'], [[1979, 2013]]], ['Coll', "Collyer's Reports (ER vol 63)", ['United Kingdom'], [[1844, 1846]]], ['Colles', "Colles's Reports, House of Lords (ER vol 1)", ['United Kingdom'], [[1697, 1713]]], ['COHSC', 'Canadian Occupational Health and Safety Cases', ['Canada'], [[1989, 1993]]], ['Corn', "Comyns's Reports (ER vol 92)", ['United Kingdom'], [[1695, 1740]]], ['Comb', "Comberbach's Reports (ER vol 90)", ['United Kingdom'], [[1685, 1699]]], ['Comm Eur DHDR', "Decisions et rapports de Ia Commission europeenne des Droits de l'Homme", ['Europe'], [[1975, 1999]]], ['Comm LR', 'Commercial Law Reports', ['Canada'], [[1903, 1905]]], ['Comp Trib dec', 'Competition Tribunal, decisions', ['Canada'], [[1986, 2013]]], ['Conc Bd Rpts', 'Conciliation Board Reports', ['Canada'], [[1966, 1974]]], ["Conc Comm'r Rpts", 'Conciliation Commissioner Reports', ['Canada'], [[1975, 1975]]], ['Cons sup N-F', 'Inventaire des jugements et deliberations du Conseil superieur de Ia Nouvelle-France', ['Canada', 'USA'], [[1717, 1760]]], ['Cook Adm', "Cook's Vice-Admiralty Reports", ['Canada', 'Quebec'], [[1873, 1874]]], ['Cooke CP', "Cooke's Reports (Common Pleas) (ER vol 125)", ['United Kingdom'], [[1706, 1747]]], ['Coop Ch Ch', "Cooper's Chancery Chambers Reports", ['Canada', 'Ontario'], [[1866, 1866]]], ['Coop Pr Ca', "Cooper's Practice Cases, Chancery (ER vol 47)", ['United Kingdom'], [[1822, 1838]]], ['Coop t Br', "Cooper, temp Brougham's Reports, Chancery (ER vol 47)", ['United Kingdom'], [[1833, 1834]]], ['Coop t Cott', "Cooper, temp Cottenham's Reports, Chancery (ER vol 47)", ['United Kingdom'], [[1846, 1848]]], ['Coop G', "Cooper's Cases in Chancery (ER vol 35)", ['United Kingdom'], [[1792, 1815]]], ['Co Rep', "Coke's Reports, King's Bench (ER vols 76-77)", ['United Kingdom'], [[1572, 1616]]], ['Cowp', "Cowper's Reports (ER vol 98)", ['United Kingdom'], [[1774, 1778]]], ['Cox', "Cox's Equity Reports (ER vols 29-30)", ['United Kingdom'], [[1783, 1796]]], ['CP', 'Recueils de jurisprudence du Qu\\xe9bec: Cour  provinciale', ['Canada', 'Quebec'], [[1975, 1985]]], ['CPC', "Carswell's Practice Cases", ['Canada'], [[1976, 1985]]], ['CPC (2d)', "Carswell's Practice Cases (Second Series)", ['Canada'], [[1985, 1992]]], ['CPC (3rd)', "Carswell's Practice Cases (Third Series)", ['Canada'], [[1992, 1997]]], ['CPC (4th)', "Carswell's Practice Cases (Fourth Series)", ['Canada'], [[1997, 2001]]], ['CPC (5th)', "Carswell's Practice Cases (Fifth Series)", ['Canada'], [[2001, 2013]]], ['CPC (Olmstead)', 'Canadian Constitutional Decisions of the Judicial Committee of the Privy Council (Olmstead)', ['Canada'], [[1873, 1954]]], ['CPC (Plaxton)', 'Canadian Constitutional Decisions of the Judicial Committee of the Privy Council (Plaxton)', ['Canada'], [[1930, 1939]]], ['CPD', 'Law Reports, Common Pleas Division', ['United Kingdom'], [[1875, 1880]]], ['CPDR', 'Cape Provincial Division Reports', ['South Africa'], [[1910, 1946]]], ['CPJI (Ser A)', 'Publications de Ia Cour permanente de justice internationals: S\\xe9rie A: Recueil des arr\\xe9ts', ['International'], [[1922, 1930]]], ['CPJI (S\\xe9r B)', 'Publications de Ia Cour permamente de justice internationale : S\\xe9rie B : Recueil des avis consultatifs', ['International'], [[1922, 1930]]], ['CPJI (S\\xe9r A/B)', 'Publications de Ia Cour permamente de justice internationale : S\\xe9rie NB : Arr\\xeats, ordonnances et avis consultatifs', ['International'], [[1931, 1940]]], ['CPJI (S\\xe9r C)', 'Publications de Ia Cour permanente de justice internationale S\\xe9rie C : Plaidoiries, expos\\xe9s oraux et documents', ['International'], [[1922, 1940]]], ['CPR', 'Canadian Patent Reporter', ['Canada'], [[1941, 1971]]], ['CPR (2d)', 'Canadian Patent Reporter (Second Series)', ['Canada'], [[1971, 1984]]], ['CPR(3d)', 'Canadian Patent Reporter (Third Series)', ['Canada'], [[1985, 1999]]], ['CPR (4th)', 'Canadian Patent Reporter (Fourth Series)', ['Canada'], [[1999, 2013]]], ['CPRB', 'Procurement Review Board of Canada, decisions', ['Canada'], [[1990, 2000]]], ['CPTA', 'Decisions de Ia Commission de protection du territoire agricole', ['Canada', 'Quebec'], [[1984, 1987]]], ['CR', 'Criminal Reports', ['Canada'], [[1946, 1967]]], ['CR (3rd)', 'Criminal Reports (Third Series)', ['Canada'], [[1978, 1991]]], ['CR (4th)', 'Criminal Reports (Fourth Series)', ['Canada'], [[1991, 1996]]], ['CR (5th)', 'Criminal Reports (Fifth Series)', ['Canada'], [[1997, 2002]]], ['CR (6th)', 'Criminal Reports (Sixth Series)', ['Canada'], [[2002, 2013]]], ['CR (NS)', 'Criminal Reports (New Series)', ['Canada'], [[1967, 1978]]], ['CRAC', 'Canadian Reports: Appeal Cases: appeals allowed or refused by the Judicial Committee of the Privy Council', ['Canada'], [[1828, 1913]]], ['CRAT', 'Commercial Registration Appeal Tribunal - Summaries of Decisions', ['Canada', 'Ontario'], [[1971, 1979]]], ['CRC', 'Canadian Railway Cases', ['Canada'], [[1902, 1939]]], ['CRD', 'Charter of Rights Decisions', ['Canada'], [[1982, 2013]]], ['CRMPC', 'Commission de revision des marches publics du Canada, decisions', ['Canada'], [[1990, 2000]]], ['CRNZ', 'Criminal Reports of New Zealand', ['New Zealand'], [[1983, 2013]]], ['CRR', 'Canadian Rights Reporter', ['Canada'], [[1982, 1991]]], ['CRR (2d)', 'Canadian Rights Reporter', ['Canada'], [[1991, 2013]]], ['CRRBDI', 'Canada Labour Relations Board Decisions and Information', ['Canada'], [[1974, 1998]]], ['CRT', 'Canadian Radio-Television and Telecommunications decisions and policy statements', ['Canada'], [[1975, 1985]]], ['CRTC', 'Canadian Railway and Transport Cases', ['Canada'], [[1940, 1966]]], ['CS', 'Recueils de jurisprudence du Qu\\xe9bec: Cour superieure', ['Canada', 'Quebec'], [[1967, 1985]]], ['CS', 'Rapports judiciaires officiels de Qu\\xe9bec: Cour sup\\xe9rieure', ['Canada', 'Quebec'], [[1892, 1966]]], ['CSD', 'Canadian Sentencing Digest', ['Canada'], [[1980, 1994]]], ['CSP', 'Recueils de jurisprudence du Quebec: Cour des Sessions de Ia paix', ['Canada', 'Quebec'], [[1975, 1985]]], ['CT', 'Jurisprudence en droit du travail: Decisions des commissaires du travail', ['Canada', 'Quebec'], [[1969, 1981]]], ['CT Cases', 'Canadian Transport Cases', ['Canada'], [[1966, 1977]]], ['CTAB', 'Canada Tax Appeal Board Cases', ['Canada'], [[1949, 1966]]], ['CTAB (NS)', 'Canada Tax Appeal Board Cases (New Series)', ['Canada'], [[1967, 1971]]], ['CTBR', 'Canada Tariff Board Reports', ['Canada'], [[1937, 1988]]], ['CTC', 'Canada Tax Cases Annotated', ['Canada'], [[1917, 1971]]], ['CTC (NS)', 'Canada Tax Cases (New Series)', ['Canada'], [[1972, 2013]]], ['CTC', 'Canadian Transport cases', ['Canada'], [[1966, 1977]]], ['CTCATC', 'Canadian Transport Commission, Air Transport Committee Decisions', ['Canada'], [[1967, 1987]]], ['CTCDO', 'Canadian Transport Commission, Decisions and Orders Summary', ['Canada'], [[1970, 1976]]], ['CTCMVTCD', 'Canadian Transport Commission, Motor Vehicle Transport Committee Decisions', ['Canada'], [[1973, 1987]]], ['CTCMVTCO', 'Canadian Transport Commission, Motor Vehicle Transport Committee Orders', ['Canada'], [[1972, 1987]]], ['CTCOA', 'Canadian Transport Commission, Orders (Air)', ['Canada'], [[1967, 1987]]], ['CTCR', 'Canadian Transport Commission Reports', ['Canada'], [[1978, 1986]]], ['CTCRCD', 'Canadian Transport Commission, Review Committee Decisions', ['Canada'], [[1971, 1987]]], ['CTCRTC', 'Canadian Transport Commission Railway Transport Committee\\u2014Judgments, Orders, Regulations, and Rulings(formerly: anciennement Board of Transport Commissioners for Canada)', ['Canada'], [[1967, 1987]]], ['CTCTCD', 'Canadian Transport Commission, Telecommunication Committee Decisions', ['Canada'], [[1973, 1976]]], ['CTCTCO', 'Canadian Transport Commission, Telecommunication Committee Orders', ['Canada'], [[1975, 1976]]], ['CTCWTCD', 'Canadian Transport Commission, Water Transport Committee, Decisions', ['Canada'], [[1972, 1987]]], ['CTCWTCL', 'Canadian Transport Commission, Water Transport Committee, Licences', ['Canada'], [[1976, 1976]]], ['CTCWTCO', 'Canadian Transport Commission, Water Transport Committee, Orders', ['Canada'], [[1979, 1987]]], ['CTR', 'Canadian Tax Reporter', ['Canada'], [[1972, 2013]]], ['CTR', 'Cape Times Reports', ['South Africa'], [[1891, 1910]]], ['CTR', 'Commission du tarif registre', ['Canada'], [[1981, 1988]]], ['CTR', 'De Boo Commodity Tax Reports', ['Canada'], [[1987, 1989]]], ['CTST', 'Canada Trade and Sales Tax Cases', ['Canada'], [[1989, 1991]]], ['CTTT', 'D\\xe9cisions du Comm issaire du travail et du Tribunal du travail', ['Canada', 'Quebec'], [[1982, 1993]]], ['CTTTCRAA', "Decisions du Commissaire du travail, du Tribunal du travail et de Ia Commission de reconnaissance des associations d'artjstes", ['Canada', 'Quebec'], [[1994, 1997]]], ['Cun', "Cunningham's Reports (ER vol 94)", ['United Kingdom'], [[1734, 1736]]], ['Curt', "Curteis's Reports (ER vol 163)", ['United Kingdom'], [[1834, 1844]]], ['D', 'Recuell Dalloz', ['France'], [[1945, 1965]]], ['DA', 'Recuell analytique de jurisprudence et de legislation (Dalloz)', ['France'], [[1941, 1944]]], ['Dan', "Daniell's Reports (ER vol 159)", ['United Kingdom'], [[1817, 1820]]], ['Davis', "Davis's Reports (Ireland) (ER vol 80)", ['Ireland'], [[1604, 1612]]], ['DC', 'Recueil critique Dalloz', ['France'], [[1941, 1945]]], ['DCA', "Canada, Commission de Ia fonction publique du Canada, decisions du comite d'appel", ['Canada'], [[1979, 1999]]], ['DCA', "Decisions de a cour d'appel I Queen's Bench Reports (Dorion)", ['Canada', 'Quebec'], [[1880, 1886]]], ['DCDRT', 'Decisions sur des conflits de droit dans les relations du travail', ['Canada', 'Quebec'], [[1964, 1970]]], ['DCL', 'Decisions de Ia Commission des Ioyers', ['Canada', 'Quebec'], [[1975, 1981]]], ['DCR', 'New Zealand District Court Reports', ['New Zealand'], [[1980, 2013]]], ['DCRM', 'Commission de revision des marches publics du Canada, decisions', ['Canada'], [[1990, 2000]]], ['DDCP', 'Decisions disciplinaires concernant lea corporations professionnelles', ['Canada', 'Quebec'], [[1974, 2013]]], ['DDOP', 'Decisions disciplinaires concernant les ordres profess ionnels', ['Canada', 'Quebec'], [[1995, 2013]]], ['Dee & Sw', "Deane & Swabey's Reports (ER vol 164)", ['United Kingdom'], [[1855, 1857]]], ['Dears', "Dearsly's Crown Cases (ER vol 169)", ['United Kingdom'], [[1852, 1856]]], ['Dears & B', "Dearsly and Bell's Crown Cases (ER vol 169)", ['United Kingdom'], [[1856, 1858]]], ['Dec B-C', 'Decisions des Tribunaux du Bas-Canada', ['Canada', 'Quebec'], [[1851, 1867]]], ['Dec trib Mont', 'Pr\\xe9cis des decisions des tribunaux du district de Montr\\xe9al', ['Canada', 'Quebec'], [[1853, 1854]]], ['De G & J', "De Gex & Jones's Reports (ER vols 44-45)", ['United Kingdom'], [[1857, 1859]]], ['De G & Sm', "De Gex & Smale's Reports (ER vols 63-64)", ['United Kingdom'], [[1846, 1849]]], ['De G F & J', "De Gex, Fisher & Jones's Reports (ER vol 45)", ['United Kingdom'], [[1859, 1862]]], ['De G J & S', "De Gex, Jones & Smith's Reports (ER vol 46)", ['United Kingdom'], [[1863, 1865]]], ['De G M & G', "De Gex, Macnaghten & Gordon's Reports (ER vols 42-44)", ['United Kingdom'], [[1851, 1857]]], ['DELD', 'Dismissal and Employment Law Digest', ['Canada'], [[1986, 2013]]], ['DELEA', 'Digest of Environmental Law and Environmental Assessment', ['Canada'], [[1992, 2013]]], ['Den', "Denison's Crown Cases (ER vols 1-2)", ['United Kingdom'], [[1844, 1852]]], ['Des OAL', "Decisions des orateurs de I'Assemblee legislative de Ia province de Quebec (Desjardins)", ['Canada', 'Quebec'], [[1867, 1901]]], ['DFQE', 'Droit fiscal quebecois express', ['Canada', 'Quebec'], [[1977, 2013]]], ['DH', 'Recueil hebdomadaire DaIloz', ['France'], [[1924, 1940]]], ['Dick', "Dickens's Reports (ER vol 21)", ['United Kingdom'], [[1559, 1798]]], ['DJC', 'Canadian Current Law: Documentation juridique au Canada', ['Canada'], [[1991, 2013]]], ['DJG', 'DalIoz jurisprudence generale', ['France'], [[1845, 1923]]], ['DLQ', 'Droits et libertes au Qu\\xe9bec', ['Canada', 'Quebec'], [[1986, 1987]]], ['DLR', 'Dominion Law Reports', ['Canada'], [[1912, 1955]]], ['DLR (2d)', 'Dominion Law Reports (Second Series)', ['Canada'], [[1956, 1968]]], ['DLR (3d)', 'Dominion Law Reports (Third Series)', ['Canada'], [[1969, 1984]]], ['DLR (4th)', 'Dominion Law Reports (Fourth Series)', ['Canada'], [[1984, 2013]]], ['DOAL', 'Decisions des orateurs, assemble legislative', ['Canada', 'New Brunswick'], [[1923, 1982]]], ['Dods', "Dodson's Reports (ER vol 165)", ['United Kingdom'], [[1811, 1822]]], ['Donn', "Donnelly's Reports (ER vol 47)", ['United Kingdom'], [[1836, 1837]]], ['Doug', "Douglas's Reports (ER vol 99)", ['United Kingdom'], [[1778, 1785]]], ['Dow', "Dow's Reports (ER vol 3)", ['United Kingdom'], [[1812, 1818]]], ['Dow & Cl', "Dow & Clark's Reports (ER vol 6)", ['United Kingdom'], [[1827, 1832]]], ['Dowl & Ry', "Dowling & Ryland's Reports (ER vol 171)", ['United Kingdom'], [[1821, 1827]]], ['DP', 'Recueil p\\xe9riodique et critique de jurisprudence (Dalloz)', ['France'], [[1924, 1940]]], ['Drap', "Draper's King's Bench Reports", ['Canada', 'Ontario'], [[1829, 1831]]], ['Drew', "Drewry's Reports (ER vols 6 1-62)", ['United Kingdom'], [[1851, 1859]]], ['Drew &', "Drewry & Smale's Reports (ER vol 62)", ['United Kingdom'], [[1860, 1865]]], ['DRL', 'Decisions de Ia R\\xe9gie du logement', ['Canada', 'Quebec'], [[1982, 1993]]], ['DSID', 'Recueil Dalloz et Sirey', ['France'], [[1965, 2013]]], ['DTC', 'Dominion Tax Cases', ['Canada'], [[1920, 2013]]], ['DTE', 'Droit du travail Express', ['Canada', 'Quebec'], [[1982, 2013]]], ['Dy', "Dyer's Reports, King's Bench (ER vol 73)", ['United Kingdom'], [[1513, 1582]]], ['E & A', "Grant's Upper Canada Error and Appeals Reports", ['Canada', 'Ontario'], [[1846, 1866]]], ['E Afr CAR', 'Eastern Africa Court of Appeals Reports', ['Africa'], [[1934, 1956]]], ['E Afr LR', 'Eastern Africa Law Reports', ['Africa'], [[1957, 1967]]], ['East', "East's Reports (ER vols 102-104)", ['United Kingdom'], [[1800, 1812]]], ['ECHR', 'European Court of Human Rights', ['Europe'], [[1960, 2013]]], ['ECHR (Ser A)', 'Publications of the European Court of Human Rights: Series A: Judgments and Decisions', ['Europe'], [[1960, 1999]]], ['ECHR (Ser B)', 'Publications of the European Court of Human Rights: Series B Pleadings, Oral Arguments and Documents', ['Europe'], [[1961, 1999]]], ['ECR', 'European Court Reports: Reports of Cases before the Court', ['Europe'], [[1954, 2013]]], ['Eden', "Eden's Reports, Chancery (ER vol 28)", ['United Kingdom'], [[1757, 1766]]], ['Edw', "Edwards's Admiralty Reports (ER vol 165)", ['United Kingdom'], [[1808, 1812]]], ['E Distr LDR', "Eastern Districts' Local Division Reports", ['South Africa'], [[1911, 1946]]], ['E Distr R', "Eastern Districts' Reports", ['South Africa'], [[1880, 1910]]], ['EHRR', 'European Human Rights Reports', ['Europe'], [[1979, 2013]]], ['El & Bl', "Ellis & Blackburn's Reports (ER vols 118-120)", ['United Kingdom'], [[1852, 1858]]], ['El & El', "Ellis & Ellis's Reports, King's Bench (ER vols 120-12 1)", ['United Kingdom'], [[1858, 1861]]], ['El Bl & El', "Ellis, Blackburn & Ellis's Reports (ER vol 120)", ['United Kingdom'], [[1858, 1858]]], ['ELLR', 'Employment and Labour Law Reporter', ['Canada'], [[1991, 2013]]], ['ELR', 'Eastern Law Reporter', ['Canada'], [[1906, 1915]]], ['ELR', 'Environmental Law Reporter of New South Wales', ['Australia'], [[1981, 2013]]], ['EMLR', 'Entertainment and Media Law Reports', ['United Kingdom'], [[1993, 2013]]], ['Eq Ca Abr', 'Equity Cases Abridged, Chancery (ER vols 2 1-22)', ['United Kingdom'], [[1667, 1744]]], ['ER', 'English Reports', ['United Kingdom'], [[1210, 1865]]], ['ERNZ', 'Employment Reports of New Zealand', ['New Zealand'], [[1991, 2013]]], ['Esp', "Espinasse's Reports", ['United Kingdom'], [[1793, 1807]]], ['ETR', 'Estates and Trusts Reports', ['Canada'], [[1977, 1994]]], ['ETR (2d)', 'Estates and Trusts Reports (Second Series)', ['Canada'], [[1994, 2003]]], ['ETR (3d)', 'Estates and Trusts Reports (Third Series)', ['Canada'], [[2003, 2013]]], ['EULR', 'European Union Law Reporter', ['Europe'], [[1997, 2013]]], ["Eur Comm'n HRCD", 'Collection of Decisions of the European Commission of Human Rights', ['Europe'], [[1960, 1974]]], ["Eur Comm'n HRDR", 'European Commission of Human Rights: Decisions and Reports', ['Europe'], [[1975, 1999]]], ['Ex CR', 'Exchequer Court of Canada Reports', ['Canada'], [[1875, 1922]]], ['Ex CR', 'Canada Law Reports: Exchequer Court', ['Canada'], [[1923, 1970]]], ['Ex D', 'Law Reports, Exchequer Division', ['United Kingdom'], [[1875, 1890]]], ['Exch Rep', 'Exchequer Reports', ['United Kingdom'], [[1847, 1856]]], ['F', 'Federal Reporter', ['USA'], [[1880, 1924]]], ['F (2d)', 'Federal Reporter (Second Series)', ['USA'], [[1925, 1993]]], ['F (3d)', 'Federal Reporter, Third Series', ['USA'], [[1993, 2013]]], ['F', 'Session Cases (Fifth Series) (Fraser)', ['Scotland'], [[1898, 1906]]], ['F & F', 'Foster and Finalson s Reports (ER vol 168)', ['United Kingdom'], [[1856, 1867]]], ['Fam', 'Law Reports, Family Division', ['United Kingdom'], [[1972, 2013]]], ['Fam LR', 'Family Law Reports', ['Australia'], [[1975, 2013]]], ['Farm Products App Trib Dec', 'Farm Products Appeal Tribunal Decisions', ['Canada', 'Ontario'], [[1990, 1996]]], ['F Cas', 'Federal Cases', ['USA'], [[1789, 1880]]], ['FCAD', 'Federal Court of Appeal Decisions', ['Canada'], [[1981, 1999]]], ['FLD', 'Family Law Digest', ['Canada'], [[1968, 1982]]], ['FCR', 'Federal Court Reports', ['Canada'], [[1971, 2013]]], ['FCR', 'Federal Court Reports', ['Australia'], [[1984, 2013]]], ['FLR', 'Federal Law Reports', ['Australia'], [[1956, 2013]]], ['FLRAC', 'Family Law Reform Act Cases', ['Canada', 'Ontario'], [[1978, 1985]]], ['FLRR', 'Family Law Reform Reporter', ['Canada'], [[1978, 1987]]], ['Fitz-G', "Fitz-Gibbons' Reports (ER vol 94)", ['United Kingdom'], [[1727, 1732]]], ['Foord', "Foord's Reports", ['South Africa'], [[1880, 1880]]], ['Forrest', "Forrest's Reports (ER vol 145)", ['United Kingdom'], [[1800, 1801]]], ['Fort', "Fortescue's Reports (ER vol 92)", ['United Kingdom'], [[1695, 1738]]], ['Fost', "Foster's Reports (ER vol 168)", ['United Kingdom'], [[1743, 1761]]], ['Fox Pat C', "Fox's Patent, Trade mark, Design and Copyright Cases", ['Canada'], [[1940, 1971]]], ['FPR', 'Fisheries Pollution Reports', ['Canada'], [[1980, 1980]]], ['F Supp', 'Federal Supplement', ['USA'], [[1933, 1998]]], ['F Supp (2d)', 'Federal Supplement (Second Series)', ['USA'], [[1998, 2013]]], ['FTLR', 'Financial Times Law Reports', ['United Kingdom'], [[1981, 2013]]], ['FTLR', 'Free Trade Law Reports', ['Canada'], [[1989, 1991]]], ['FTR', 'Federal Trial Reports', ['Canada'], [[1986, 2013]]], ['FTU', 'Free Trade Update', ['Canada'], [[1990, 1996]]], ['Gaz LR', 'Gazette Law Reports', ['New Zealand'], [[1898, 1952]]], ['Gaz Pal', 'Gazette du Palais', ['France'], [[1886, 2013]]], ['Ghana LR', 'Ghana Law Reports (West Africa)', ['West Africa'], [[1959, 1966], [1971, 1978]]], ['Giff', "Giffard's Reports (ER vols 65-66)", ['United Kingdom'], [[1858, 1865]]], ['Gilb Cas', "Gilbert's Cases in Law & Equity (ER vol 93)", ['United Kingdom'], [[1713, 1715]]], ['Gilb Rep', "Gilbert's Reports, Chancery (ER vol 25)", ['United Kingdom'], [[1705, 1727]]], ['GLR', 'Gazette Law Reports', ['New Zealand'], [[1898, 1953]]], ['Godbolt', "Godbolt's Reports (ER vol 78)", ['United Kingdom'], [[1575, 1638]]], ['Gould', "Gouldsborough's Reports (ER vol 75)", ['United Kingdom'], [[1586, 1602]]], ['Gow', "Gow's Reports (ER vol 171)", ['United Kingdom'], [[1818, 1820]]], ['Gr / UC Ch', "Grant's Upper Canada Chancery Reports", ['Canada', 'Ontario'], [[1849, 1882]]], ['Greg R', "Gregorowski's Reports (Orange Free State)", ['South Africa'], [[1883, 1887]]], ['Griq WR', 'Griqualand West Reports (Cape of Good Hope)', ['South Africa'], [[1882, 1910]]], ['GSTR', 'Canadian Goods and Services Tax Reporter/ Reports / Monitor', ['Canada'], [[1989, 2013]]], ['GTC', 'Canadian GST & Commodity Tax Cases', ['Canada'], [[1993, 2013]]], ['H&C', "Hurlstone & Coitman's Reports (ER vols 158- 159)", ['United Kingdom'], [[1862, 1866]]], ['H&M', "Hemming & Miller's Reports (ER vol 71)", ['United Kingdom'], [[1862, 1865]]], ['H&N', "Hurlstone & Norman's Reports (ER vols 156- 158)", ['United Kingdom'], [[1856, 1862]]], ['H & Tw', "Hall & Twells' Reports (ER vol 47)", ['United Kingdom'], [[1849, 1850]]], ['H&W', "Haszard & Warburton's Reports", ['Canada', 'Prince Edward Island'], [[1850, 1882]]], ['Hag Adm', "Haggard's Admiralty Reports (ER vol 166)", ['United Kingdom'], [[1822, 1838]]], ['Hag Con', "Haggard's Consistory Reports (ER vol 161)", ['United Kingdom'], [[1752, 1821]]], ['Hag Ecc', "Haggard's Ecclesiastical Reports (ER vol 162)", ['United Kingdom'], [[1827, 1833]]], ['Hague Ct Rep', 'Hague Court Reports (1916)', ['International'], [[1899, 1915]]], ['Hague Ct Rep (2d)', 'Hague Court Reports (Second Series) (1932)', ['International'], [[1916, 1925]]], ['Hardr', "Hardres' Reports (ER vol 145)", ['United Kingdom'], [[1655, 1669]]], ['Hare', "Hare's Reports (ER vols 66-68)", ['United Kingdom'], [[1841, 1853]]], ['Harr & Hodg', 'Harrison and Hodgins Municipal Report', ['Canada', 'Ontario'], [[1845, 1851]]], ['Hay & M', "Hay & Marriott's Reports (ER vol 165)", ['United Kingdom'], [[1776, 1779]]], ['Her Tr Nor', 'Heresy Trials in the Diocese of Norwich', ['United Kingdom'], [[1428, 1431]]], ['Het', "Hetley's Reports (ER vol 124)", ['United Kingdom'], [[1627, 1632]]], ['HL Cas', "Clark's House of Lords Cases (ER vols 9-11)", ['United Kingdom'], [[1847, 1866]]], ['HL Cas', 'House of Lords Cases', ['United Kingdom'], [[1847, 1866]]], ['Hob', "Hobart's Reports (ER vol 80)", ['United Kingdom'], [[1603, 1625]]], ['Hodg', 'Hodgins Election Cases', ['Canada', 'Ontario'], [[1871, 1878]]], ['Hodges', "Hodges' Reports", ['United Kingdom'], [[1835, 1837]]], ['Holt', "Holt's Reports (ER vol 171)", ['United Kingdom'], [[1815, 1817]]], ['Holt, Eq', "Holt's Equity Reports (ER vol 71)", ['United Kingdom'], [[1845, 1845]]], ['HoIt, KB', "Holt's King's Bench Cases (ER vol 90)", ['United Kingdom'], [[1688, 1711]]], ['Hut', "Hutton's Reports (ER vol 123)", ['United Kingdom'], [[1612, 1639]]], ['IAA', 'Industrial Arbitration Awards', ['New Zealand'], [[1901, 2013]]], ['AR', 'Industrial Arbitration Reports', ['Nova Scotia', 'Australia'], [[1902, 2013]]], ['IBDD', 'Instruments de base et documents divers', ['Angola', 'Antigua and Barbuda', 'Argentina', 'Australia', 'Austria', 'Bahrain', 'Bangladesh', 'Barbados', 'Belgium', 'Belize', 'Benin', 'Bolivia', 'Botswana', 'Brazil', 'Brunei Darussalam', 'Burkina Faso', 'Burundi', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'Colombia', 'Congo, Republic of', 'Costa Rica', "Cote d'Ivoire", 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Egypt', 'El Salvador', 'Fiji', 'Finland', 'France', 'Gabon', 'The Gambia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Kenya', 'Korea, Republic of', 'Kuwait', 'Lesotho', 'Liechtenstein', 'Luxembourg', 'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Morocco', 'Mozambique', 'Myanmar, Union of', 'Namibia', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Pakistan', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Rwanda', 'Senegal', 'Sierra Leone', 'Singapore', 'Slovak Republic', 'Slovenia', 'Solomon Islands', 'South Africa', 'Spain', 'Sri Lanka', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Suriname', 'Swaziland, Kingdom of', 'Sweden', 'Switzerland', 'Tanzania', 'Thailand', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Uganda', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Venezuela', 'Yugoslavia', 'Zaire', 'Zambia', 'Zimbabwe'], [[1952, 2013]]], ['ICC', 'Indian Claims Commission Decisions', ['USA'], [[1948, 1978]]], ['I Ch R', 'Irish Chancery Reports', ['Ireland'], [[1852, 1867]]], ['ICJ Pleadings', 'International Court of Justice: Pleadings, Oral Arguments, Documents', ['International'], [[1946, 2013]]], ['ICJ Rep', 'International Court of Justice: Reports of Judgments, Advisory Opinions and Orders', ['International'], [[1946, 2013]]], ['ICLR', 'Irish Common Law Reports', ['Ireland'], [[1852, 1867]]], ['ICR', 'Industrial Cases Reports', ['United Kingdom'], [[1972, 2013]]], ['ICR', 'Industrial Court Reports', ['United Kingdom'], [[1972, 1974]]], ['ICSID', 'International Centre for Settlement of Investment Disputes (World Bank)', ['International'], [[1966, 2013]]], ['ILR', 'Canadian Insurance Law Reporter', ['Canada'], [[1951, 2013]]], ['ILR', 'Insurance Law Reporter', ['Canada'], [[1934, 1950]]], ['I LR', 'International Law Reports', ['International'], [[1950, 2013]]], ['I LR', 'Irish Law Reports', ['Ireland'], [[1838, 1850]]], ['ILRM', 'Irish Law Reports Monthly', ['Ireland'], [[1981, 2013]]], ['ILTR', 'Irish Law Times Reports', ['Ireland'], [[1867, 2013]]], ['IMA', 'Institute of Municipal Assessors of Ontario, Court Decisions', ['Canada', 'Ontario'], [[1974, 1986]]], ['Imm ABD', 'Immigration Appeal Board Decisions', ['Canada'], [[1977, 1988]]], ['Imm AC', 'Immigration Appeal Cases', ['Canada'], [[1968, 1970]]], ['Imm AC (2d)', 'Immigration Appeal Cases (Second Series)', ['Canada'], [[1969, 1977]]], ['Imm LR', 'Immigration Law Reporter', ['Canada'], [[1985, 1987]]], ['Imm LR (2d)', 'Immigration Law Reporter (Second Series)', ['Canada'], [[1987, 1999]]], ['Imm LR (3d)', 'Immigration Law Reporter (Third Series)', ['Canada'], [[1999, 2013]]], ['Inter-Am Ct HR (SerA)', 'SeriesA: Judgments and Opinions', ['International'], [[1982, 2013]]], ['Inter-Am Ct HR (Ser B)', 'Series B: Pleadings, Oral Arguments and Documents', ['International'], [[1983, 2013]]], ['Inter-Am Ct HR (Ser C)', 'Series C: Decisions and Judgments', ['International'], [[1987, 2013]]], ['IR', 'Irish Law Reports', ['Ireland'], [[1892, 2013]]], ['IR Eq', 'Irish Reports, Equity Series', ['Ireland'], [[1867, 1878]]], ['I RCL', 'Irish Reports, Common Law Series', ['Ireland'], [[1867, 1878]]], ['InfoCRTC', 'Broadcasting decisions, public notices and policy statements/ Decisions, avis publics et \\xe9nonc\\xe9s de politique sur la radiodiffusion', ['Canada'], [[1995, 1998]]], ['J&H', "Johnson & Hemming's Reports (ER vol 70)", ['United Kingdom'], [[1860, 1862]]], ['Jac', "Jacob's Reports (ER vol 37)", ['United Kingdom'], [[1821, 1822]]], ['Jac & W', "Jacob & Walker's Reports (ER vol 37)", ['United Kingdom'], [[1819, 1821]]], ['JCA', 'Judgments Under the Competition Act', ['Canada'], [[1984, 2013]]], ['JCAP', 'Judgments Under the Competition Act and its Predecessors', ['Canada'], [[1904, 2013]]], ['J-cl Admin', 'Juris-classeur Administratif', ['France'], [[1907, 2013]]], ['J-c1 BC', 'Juris-classeur Banque et credit', ['France'], [[1907, 2013]]], ['J-cl Brev', "Juris-classeur Brevets d'invention", ['France'], [[1907, 2013]]], ['J-cl C-C', 'Juris-classeur Concurrence-consommation', ['France'], [[1907, 2013]]], ['J-cl C-D', 'Juris-classeur Contrats-distribution', ['France'], [[1907, 2013]]], ['J-ci Civ', 'Juris-classeur Civil', ['France'], [[1907, 2013]]], ['J-cl Civ Annexe', 'Juris-classeur Civil annexe', ['France'], [[1907, 2013]]], ['J-0l Coil terr', 'Juris-ciasseur Coliectivites territoriales', ['France'], [[1907, 2013]]], ['J-cI Corn g\\xe9n', 'Juris-classeur Commercial general', ['France'], [[1907, 2013]]], ['J-cl Constr', 'Juris-classeur Construction', ['France'], [[1907, 2013]]], ['J-cl Coprop', 'Juris-classeur Copropriete', ['France'], [[1907, 2013]]], ['J-ci Div', 'Juris-classeur Divorce', ['France'], [[1907, 2013]]], ['J-cI Dr comp', 'Juris-ciasseur Droit compare', ['France'], [[1907, 2013]]], ['J-cl Dr de renfant', "Juris-classeur Droit de l'enfant", ['France'], [[1907, 2013]]], ['J-cl Dr Intl', 'Juris-classeur Droit International', ['France'], [[1907, 2013]]], ['J-cl Env', 'Juris-classeur Environnement', ['France'], [[1907, 2013]]], ['J-cl Eur', 'Juris-classeur Europe', ['France'], [[1907, 2013]]], ['J-cI F corn', 'Juris-classeur Fonds de commerce', ['France'], [[1907, 2013]]], ['J-ci Fisc', 'Juris-classeur Fiscal', ['France'], [[1907, 2013]]], ['J-cl Fisc mm', 'Juris-classeur Fiscalit\\xe9 immobiliere', ['France'], [[1907, 2013]]], ['J-cI Fisc intl', 'Juris-classeur Fiscal international', ['France'], [[1907, 2013]]], ['J-ci Foncier', 'Juris-classeur Fonder', ['France'], [[1907, 2013]]], ['J-cl Irnpot', 'Juris-classeur. lmp\\xf4t sur a fortune', ['France'], [[1907, 2013]]], ['J-cl MDM', 'Juris-classeur Marques, dessins et modeles', ['France'], [[1907, 2013]]], ['J-ci Not Form', 'Juris-ciasseur Notarial formulaire', ['France'], [[1907, 2013]]], ['J-cl Pen', 'Juris-dlasseur Penal', ['France'], [[1907, 2013]]], ['J-ci Proc', 'Juris-classeur Procedure', ['France'], [[1907, 2013]]], ['J-ci Proc coil', 'Juris-classeur Procedures collectives', ['France'], [[1907, 2013]]], ['J-cl Proc fisc', 'Juris-classeur Procedures fiscales', ['France'], [[1907, 2013]]], ['J-cl Proc pen', 'Juris-classeur Procedure p\\xe9nale', ['France'], [[1907, 2013]]], ['J-ci Prop litt art', 'Juris-classeur Propriete litteraire et artistique', ['France'], [[1907, 2013]]], ['J-cl Rep prat Dr priv', 'Juris-classeur Repertoire pratique de droit prive', ['France'], [[1907, 2013]]], ['J-cl Resp civ Ass', 'Juris-classeur Responsabilite civile et Assurances', ['France'], [[1907, 2013]]], ['J-cl Sec Soc', 'Juris-classeur Securite sociale', ['France'], [[1907, 2013]]], ['J-cI Soci\\xe9t\\xe9s', 'Juris-classeur Societes', ['France'], [[1907, 2013]]], ['J-cl Tray', 'Juris-classeu Travail', ['France'], [[1907, 2013]]], ['JCP', 'Semaine Juridique', ['France'], [[1937, 2013]]], ['JE', 'Jurisprudence Express', ['Canada', 'Quebec'], [[1977, 2013]]], ['Jenk', "Jenkins's Reports (ER vol 145)", ['United Kingdom'], [[1220, 1623]]], ['JL', "Jurisprudence logement Recueil trimestriel de jurisprudence sur le bail d'habitation comprenant des decisions de Ia Regie du logement et des tribunaux judiciaires en mati\\xe8re de logement", ['Canada', 'Quebec'], [[1993, 2013]]], ['JL', 'Jurisprudence Logement', ['Canada', 'Quebec'], [[1982, 2013]]], ['JM', 'Decisions du juge des mines du Qu\\xe9bec', ['Canada', 'Quebec'], [[1967, 1972]]], ['Johns', "Johnson's Reports (ER vol 70)", ['United Kingdom'], [[1859, 1859]]], ['Jones, T', 'Jones, T, Reports (ER vol 84)', ['United Kingdom'], [[1667, 1685]]], ['Jones, W', 'Jones W, Reports (ER vol 82)', ['United Kingdom'], [[1620, 1641]]], ['JSST', 'Jurisprudence en sante et s\\xe9curit\\xe9 du travail', ['Canada', 'Quebec'], [[1983, 1985]]], ['JSSTI', "Jurisprudence en sante et s\\xe9curit\\xe9 du travail, decisions en mati\\xe8re d'inspection", ['Canada', 'Quebec'], [[1981, 1983]]], ['K & J', "Kay & Johnson's Reports (ER vols 69-70)", ['United Kingdom'], [[1854, 1858]]], ['Kay', "Kay's Reports (ER vol 69)", ['United Kingdom'], [[1853, 1854]]], ['KB', "Law Reports, King's Bench", ['United Kingdom'], [[1901, 1951]]], ['Keble', "Keble's Reports (ER vols 83-84)", ['United Kingdom'], [[1661, 1679]]], ['Keen', "Keen's Reports (ER vol 48)", ['United Kingdom'], [[1836, 1838]]], ['Keilway', "Keilway's Reports (ER vol 72)", ['United Kingdom'], [[1496, 1531]]], ['Kel J ! Kel', "Kelyng, Sir John's Reports (ER vol 84)", ['United Kingdom'], [[1662, 1669]]], ['Kel W', "Kelynge, William's Reports (ER vol 25)", ['United Kingdom'], [[1730, 1732]]], ['Keny', "Kenyon's Reports (ER vol 96)", ['United Kingdom'], [[1753, 1759]]], ['Kenya', 'Kenya Law Reports', ['Kenya'], [[1897, 1956]]], ['KLR', 'Kenya Law Reports', ['Africa'], [[1897, 1956]]], ['Kn', "Knapp's Appeal Cases (ER vol 12)", ['United Kingdom'], [[1829, 1836]]], ['LAC', 'Labour Arbitration Cases', ['Canada', 'Ontario'], [[1948, 1972]]], ['LAC (2d)', 'Labour Arbitration Cases (Second Series)', ['Canada', 'Ontario'], [[1973, 1981]]], ['LAC (3d)', 'Labour Arbitration Cases (Third Series)', ['Canada', 'Ontario'], [[1982, 1989]]], ['LAC (4th)', 'Labour Arbitration Cases (Fourth Series)', ['Canada', 'Ontario'], [[1989, 2013]]], ['Lane', "Lane's Reports (ER vol 145)", ['United Kingdom'], [[1605, 1611]]], ['Lap Sp Dec', "Laperrier's Speakers' Decisions", ['Canada'], [[1900, 2013]]], ['LAR', 'Labor Arbitration Reports', ['USA'], [[1946, 2013]]], ['Latch', "Latch's Reports, King's Bench (ER vol 82)", ['United Kingdom'], [[1625, 1628]]], ['LC Jur', 'Lower Canada Jurist', ['Canada', 'Quebec'], [[1847, 1891]]], ['LCBD', 'Land Compensation Board Decisions', ['Canada', 'Ontario'], [[1971, 1983]]], ['LCR', 'Land Compensation Reports', ['Canada'], [[1969, 2013]]], ['LCR', 'Lower Canada Reports', ['Canada', 'Quebec'], [[1851, 1867]]], ['Leach', "Leach's Cases on Crown Law (ER vol 168)", ['United Kingdom'], [[1730, 1815]]], ['L Ed', "United States Supreme Court, Lawyers' Edition", ['USA'], [[1790, 1955]]], ['L Ed (2d)', "United States Supreme Court, Lawyers' Edition (Second Series)", ['USA'], [[1956, 1979]]], ['Lee', "Lee's Ecclesiastical Reports (ER vol 161)", ['United Kingdom'], [[1752, 1758]]], ['Leo', "Leonard's Reports (ER vol 74)", ['United Kingdom'], [[1540, 1615]]], ['Lev', "Levinz's Reports (ER vol 83)", ['United Kingdom'], [[1660, 1697]]], ['Lewin', "Lewin's Crown Cases on the Northern Circuit (ER vol 168)", ['United Kingdom'], [[1822, 1838]]], ['Le & Ca', "Leigh & Cave's Reports (ER vol 169)", ['United Kingdom'], [[1861, 1865]]], ['Ley', "Ley's Reports (ER vol 80)", ['United Kingdom'], [[1608, 1629]]], ['Lilly', "Lilly's Assize Cases", ['United Kingdom'], [[1688, 1693]]], ['Lit', "Littleton's Reports (ER vol 120)", ['United Kingdom'], [[1626, 1632]]], ['LI LR', "Lloyd's List Law Reports", ['United Kingdom'], [[1919, 1950]]], ["Lloyd's LR", "Lloyd's Law Reports", ['United Kingdom'], [[1968, 2013]]], ["Lloyd's Rep", "Lloyd's List Law Reports", ['United Kingdom'], [[1951, 1967]]], ["Lloyd's Rep Med", "Lloyd's Law Reports (Medical)", ['United Kingdom'], [[1998, 2013]]], ['LN', 'Legal News', ['Canada', 'Quebec'], [[1878, 1898]]], ['LRA& E', 'Law Reports, Admiralty and Ecclesiastical Cases (ER vols 1-4)', ['United Kingdom'], [[1865, 1875]]], ['LRA& E', 'Law Reports, Admiralty and Ecclesiastical Cases', ['United Kingdom'], [[1865, 1875]]], ['LR CCR', 'Law Reports, Crown Cases Reserved', ['United Kingdom'], [[1865, 1875]]], ['LR CP', 'Law Reports, Common Pleas', ['United Kingdom'], [[1865, 1875]]], ['LRChApp', 'Law Reports, Chancery Appeals', ['United Kingdom'], [[1865, 1875]]], ['LR Eq', 'Law Reports, Equity Cases', ['United Kingdom'], [[1865, 1875]]], ['LR Ex', 'Law Reports, Exchequer', ['United Kingdom'], [[1865, 1875]]], ['LRHL', 'Law Reports, English and Irish Appeal Cases', ['Ireland', 'United Kingdom'], [[1865, 1875]]], ['LR Ir', 'Law Reports, Ireland', ['Ireland'], [[1878, 1893]]], ['LR P & D', 'Law Reports, Probate and Divorce', ['United Kingdom'], [[1865, 1875]]], ['LR QB', "Law Reports, Queen's Bench", ['United Kingdom'], [[1865, 1875]]], ['LR RP', 'Law Reports, Restrictive Practices', ['United Kingdom'], [[1957, 1972]]], ['LR Sc & Div', 'Scotch and Divorce Appeal Cases', ['United Kingdom'], [[1866, 1875]]], ['LRPC', 'Law Reports, Privy Council', ['United Kingdom'], [[1865, 1875]]], ['Lush', "Lushington's Reports (ER vol 167)", ['United Kingdom'], [[1859, 1862]]], ['Lut', "Lutwyche's Reports (ER vol 125)", ['United Kingdom'], [[1682, 1704]]], ['M&M', 'Moody & Malkin (ER vol 173)', ['United Kingdom'], [[1826, 1830]]], ['M & Rob', 'Moody & Robinson (ER vol 174)', ['United Kingdom'], [[1831, 1844]]], ['M&S', "Maule & Selwyn's Reports (ER vol 105)", ['United Kingdom'], [[1813, 1817]]], ['M &W', "Meeson & Welsby's Reports (ER vols 150-153)", ['United Kingdom'], [[1836, 1847]]], ['Mac & G', "M'Naghten & Gordon's Reports (ER vols 41-42)", ['United Kingdom'], [[1849, 1851]]], ['MacI & R', "Maclean & Robinson's Reports (ER vol 9)", ['United Kingdom'], [[1839, 1839]]], ['MACMLC', 'Digest of the Selected Judgements of the Maori Appellate Court and Maori Land Court', ['New Zealand'], [[1858, 1968]]], ['Madd', "Maddock's Reports (ER vol 56)", ['United Kingdom'], [[1815, 1822]]], ['Man & G', "Manning & Granger's Reports (ER vols 133-1 35)", ['United Kingdom'], [[1840, 1844]]], ['Man LR', "Manitoba Law Reports (Queen's Bench)", ['Canada', 'Manitoba'], [[1884, 1890]]], ['Man MTBD', 'Manitoba Motor Transport Board Decisions', ['Canada', 'Manitoba'], [[1985, 2013]]], ['Man R', 'Manitoba Reports', ['Canada', 'Manitoba'], [[1883, 1961]]], ['Man R (2d)', 'Manitoba Reports (Second Series)', ['Canada', 'Manitoba'], [[1979, 2013]]], ['Man R temp Wood', 'Manitoba Reports temp Wood (ed Armour)', ['Canada', 'Manitoba'], [[1875, 1883]]], ['Maori L Rev', 'Maori Law Review', ['New Zealand'], [[1993, 2013]]], ['March, NR', "March's New Cases (ER vol 82)", ['United Kingdom'], [[1639, 1642]]], ['MC', 'Malayan Cases', ['Singapore'], [[1939, 2013]]], ['MCC', "Mining Commissioner's Cases", ['Canada', 'Ontario'], [[1906, 1979]]], ['MCD', "Magistrates' Court Decisions", ['New Zealand'], [[1939, 1979]]], ["M'Cle", "M'Cleland's Reports (ER vol 148)", ['United Kingdom'], [[1824, 1824]]], ["M'Cle & Yo", "M'Cleland & Younge's Reports (ER vol 148)", ['United Kingdom'], [[1824, 1825]]], ['MCR', 'Montreal Condensed Reports', ['Canada', 'Quebec'], [[1853, 1854]]], ['MCR', 'Pr\\xe9cis des decisions des tribunaux du district de Montr\\xe9al', ['Canada', 'Quebec'], [[1853, 1854]]], ['MCR', "Magistrates' Court Reports", ['New Zealand'], [[1939, 1979]]], ['Mer', "Merivale's Reports (ER vols 35-36)", ['United Kingdom'], [[1815, 1817]]], ['MHRC Dec', 'Manitoba Human Rights Commission Decisions', ['Canada', 'Manitoba'], [[1971, 1982]]], ['MLB Dec', 'Manitoba Labour Board Decisions', ['Canada', 'Manitoba'], [[1985, 2013]]], ['MU', 'Malayan Law Journal', ['Singapore'], [[1932, 2013]]], ['MLR (KB)', "Montreal Law Reports, King's Bench", ['Canada', 'Quebec'], [[1885, 1891]]], ['MLR (QB)', "Montreal Law Reports, Queen's Bench", ['Canada', 'Quebec'], [[1885, 1891]]], ['MLR (SC)', 'Montreal Law Reports, Superior Court', ['Canada', 'Quebec'], [[1885, 1891]]], ['Mod', 'Modern Reports (ER vols 86-88)', ['United Kingdom'], [[1669, 1732]]], ['Mont Cond Rep', 'Montreal Condensed Reports', ['Canada', 'Quebec'], [[1853, 1854]]], ['Moo Ind App', "Moore's Reports, Indian Appeals, Privy Council (ER vols 18-20)", ['United Kingdom'], [[1836, 1872]]], ['Moo KB', "Moore's Reports, King's Bench (ER vol 72)", ['United Kingdom'], [[1519, 1621]]], ['Moo PC', "Moore's Reports, Privy Council (ER vols 12-15)", ['United Kingdom'], [[1836, 1862]]], ['Moo PCNS', "Moore's Reports, Privy Council, (New Series) (ER vols 15-17)", ['United Kingdom'], [[1862, 1873]]], ['Mood', "Moody's Reports (ER vols 168-169)", ['United Kingdom'], [[1824, 1837]]], ['Mos', "Mosely's Reports (ER vol 25)", ['United Kingdom'], [[1726, 1731]]], ['MPLR', 'Municipal and Planning Law Reports', ['Canada'], [[1976, 1990]]], ['MPLR (2d)', 'Municipal and Planning Law Reports (Second Series)', ['Canada'], [[1991, 2013]]], ['MPR', 'Maritime Provinces Reports', ['Canada'], [[1929, 1968]]], ['MVR', 'Motor Vehicle Reports', ['Canada'], [[1979, 1988]]], ['MVR (2d)', 'Motor Vehicle Reports (Second Series)', ['Canada'], [[1988, 1994]]], ['MVR (3d)', 'Motor Vehicle Reports (Third Series)', ['Canada'], [[1994, 2000]]], ['MVR (4th)', 'Motor Vehicle Reports (Fourth Series)', ['Canada'], [[2000, 2013]]], ['My & Cr', "Mylne & Craig's Reports (ER vols 40-41)", ['United Kingdom'], [[1835, 1840]]], ['My & K', "Mylne & Keen's Reports (ER vols 39-40)", ['United Kingdom'], [[1832, 1835]]], ['NACD', 'Native Appeal Court Selected Decisions (Natal and Transvaal)', ['South Africa'], [[1930, 1948]]], ['NACR', 'Native Appeal Court Reports', ['South Africa'], [[1951, 2013]]], ['NB Eq', 'New Brunswick Equity Reports (Trueman)', ['Canada', 'New Brunswick'], [[1894, 1911]]], ['NB Eq Cas', 'New Brunswick Equity Cases (Trueman)', ['Canada', 'New Brunswick'], [[1876, 1893]]], ['NBESTD', 'New Brunswick Employment Standards Tribunal Decisions', ['Canada', 'New Brunswick'], [[1986, 2013]]], ['NBHRC Dec', 'New Brunswick Human Rights Commission Decisions', ['Canada', 'New Brunswick'], [[1974, 1982]]], ['NBLLC', 'New Brunswick Labour Law Cases', ['Canada', 'New Brunswick'], [[1965, 1979]]], ['NBPPABD', 'New Brunswick Provincial Planning Appeal Board Decisions', ['Canada', 'New Brunswick'], [[1973, 1983]]], ['NBR', 'New Brunswick Reports', ['Canada', 'New Brunswick'], [[1825, 1928]]], ['NBR (2d)', 'New Brunswick Reports (Second Series)', ['Canada', 'New Brunswick'], [[1969, 2013]]], ['NE', 'Northeastern Reporter', ['USA'], [[1885, 1936]]], ['NE (2d)', 'Northeastern Reporter (Second Series)', ['USA'], [[1936, 2013]]], ['NEBD', 'National Energy Board\\u2014Reasons for Decision', ['Canada'], [[1970, 2013]]], ['Nels', "Nelson's Reports, Chancery (ER vol 21)", ['United Kingdom'], [[1625, 1693]]], ['Nfld & PEIR', 'Newfoundland and Prince Edward Island Reports', ['Canada', 'Prince Edward Island', 'Newfoundland & Labrador'], [[1971, 2013]]], ['Nfld LR', 'Newfoundland Law Reports', ['Canada', 'Newfoundland & Labrador'], [[1817, 1949]]], ['NHRC Dec', 'Newfoundland Human Rights Commission Decisions', ['Canada', 'Newfoundland & Labrador'], [[1971, 1977]]], ['NI', 'Northern Ireland Law Reports', ['Nicaragua'], [[1925, 2013]]], ['NLR', 'Nigeria Law Reports', ['Nigeria'], [[1881, 1955]]], ['NLR', 'Nyasaland Law Reports (Malawi)', ['Malaqi'], [[1922, 1952]]], ['NLR (OS)', 'Natal Law Reports (Old Series)', ['South Africa'], [[1867, 1872]]], ['NLR (NS)', 'Natal Law Reports (New Series)', ['South Africa'], [[1879, 1932]]], ['Noy', 'Noys Reports (ER vol 74)', ['United Kingdom'], [[1559, 1649]]], ['NPDR', 'Natal Provincial Division Reports', ['South Africa'], [[1933, 1946]]], ['NR', 'National Reporter', ['Canada'], [[1973, 2013]]], ['NSHRC Dec', 'Nova Scotia Human Rights Commissions Decisions', ['Canada', 'Nova Scotia'], [[1972, 1980]]], ['NSBCPU Dec', 'Nova Scotia Board of Commissioners of Public Utilities Decisions', ['Canada', 'Nova Scotia'], [[1923, 1973]]], ['NSCGA Dec', 'Nova Scotia Compendium of Grievance Arbitration Decisions', ['Canada', 'Nova Scotia'], [[1978, 2013]]], ['NSR', 'Nova Scotia Reports', ['Canada'], [[1834, 1929], [1965, 1969]]], ['NSR (2d)', 'Nova Scotia Reports (Second Series)', ['Canada', 'Nova Scotia'], [[1969, 2013]]], ['NSRUD', 'Reported and Unreported Decisions', ['Canada', 'Nova Scotia'], [[1979, 1984]]], ['NSWSCR', 'New South Wales Supreme Court Reports', ['Nova Scotia', 'Australia'], [[1862, 1976]]], ['NSW St R', 'New South Wales State Reports Austl (NSW)', ['Nova Scotia', 'Australia'], [[1901, 1970]]], ['NSWLR', 'New South Wales Law Reports Austl (NSW)', ['Nova Scotia', 'Australia'], [[1880, 1900], [1971, 2013]]], ['NSWR', 'New South Wales Reports Austl (NSW)', ['Nova Scotia', 'Australia'], [[1960, 1970]]], ['NSWWN', 'New South Wales Weekly Notes Austl (NSW)', ['Nova Scotia', 'Australia'], [[1884, 1970]]], ['NTAD (Air)', 'National Transportation Agency Decisions (Air)', ['Canada'], [[1988, 1992]]], ['NTAD (Rwy)', 'National Transportation Agency Decisions (Railway)', ['Canada'], [[1988, 1991]]], ['NTAO (Air)', 'National Transportation Agency Orders (Air)', ['Canada'], [[1988, 1992]]], ['NTAR', 'National Transportation Agency of Canada Reports', ['Canada'], [[1988, 1995]]], ['NTJ', 'Northern Territory Judgments', ['Australia'], [[1951, 1976]]], ['NTLR', 'Northern Territory Law Reports', ['Australia'], [[1992, 2013]]], ['NTR', 'Northern Territory Reports', ['Australia'], [[1978, 2013]]], ['NW', 'Northwestern Reporter', ['USA'], [[1879, 1942]]], ['NW (2d)', 'Northwestern Reporter (Second Series)', ['USA'], [[1942, 2013]]], ['NWTR', 'Northwest Territories Reports', ['Canada', 'Northwest Territories'], [[1983, 1998]]], ['NWTSCR', 'Northwest Territories Supreme Court Reports', ['Canada', 'Northwest Territories'], [[1889, 1900]]], ['NY', 'New York Reports', ['USA'], [[1885, 1955]]], ['NY (2d)', 'New York Reports (Second Series)', ['USA'], [[1956, 2013]]], ['NYS (2d)', 'New York Supplement (Second Series)', ['USA'], [[1956, 2013]]], ['NZHRC Dec', 'New Zealand Human Rights Commission Decisions', ['New Zealand'], [[1979, 1986]]], ['NZAC', 'Judgments of the Arbitration Court of New Zealand', ['New Zealand'], [[1979, 1986]]], ['NZAR', 'New Zealand Administrative Reports', ['New Zealand'], [[1976, 2013]]], ['NZBLC', 'New Zealand Business Law Cases', ['New Zealand'], [[1984, 2013]]], ['NZFLR', 'New Zealand Family Law Reports', ['New Zealand'], [[1981, 2013]]], ['NZILR', 'New Zealand Industral Law Reports', ['New Zealand'], [[1987, 1990]]], ['NZIPR', 'New Zealand Intellectual Property Reports', ['New Zealand'], [[1967, 1987]]], ['NZLR', 'New Zealand Law Reports', ['New Zealand'], [[1883, 2013]]], ['NZPCC', 'New Zealand Privy Council Cases', ['New Zealand'], [[1840, 1932]]], ['NZTC', 'New Zealand Tax Cases', ['New Zealand'], [[1973, 2013]]], ['OAC', 'Ontario Appeal Cases', ['Canada'], [[1984, 2013]]], ['OAR', 'Ontario Appeal Reports', ['Canada', 'Ontario'], [[1876, 1900]]], ['OELD', 'Ontario Environmental Law Digest', ['Canada', 'Ontario'], [[1996, 2013]]], ['OFLR', 'Ontario Family Law Reporter', ['Canada', 'Ontario'], [[1987, 2013]]], ['OHRCBI', 'Ontario Human Rights Commission - Board of Inquiry', ['Canada', 'Ontario'], [[1963, 1996]]], ['OHRC Dec', 'Ontario Human Rights Commission Decisions', ['Canada', 'Ontario'], [[1956, 1996]]], ['OHRC Transcr', 'Ontario Human Rights Commission, Trancripts of Selected Hearings', ['Canada', 'Ontario'], [[1968, 1973]]], ['OICArb', 'Ontario Insurance Commission - Arbitration Cases', ['Canada', 'Ontario'], [[1995, 2013]]], ['Olmsted PC', "Olmsted's Privy Council Decisions", ['Canada'], [[1867, 1954]]], ['OLR', 'Ontario Law Reports', ['Canada', 'Ontario'], [[1900, 1931]]], ['OLRB Rep', 'Ontario Labour Relations Board Reports', ['Canada', 'Ontario'], [[1944, 2013]]], ['OMB Dec', 'Ontario Municipal Board Decisions', ['Canada', 'Ontario'], [[1953, 1994]]], ['OMB Index', 'Ontario Municipal Board Index to Applications Disposed of', ['Canada', 'Ontario'], [[1969, 1992]]], ['OMBEAB', 'Joint Board of the Ontario Municipal Board and the Environmental Assessment Board Decisions', ['Canada', 'Ontario'], [[1984, 2013]]], ['OMBR', 'Ontario Municipal Board Reports', ['Canada', 'Ontario'], [[1973, 2013]]], ['ONED', 'Office national de lenergie, decisions', ['Canada'], [[1970, 2013]]], ["Ont Building Code Comm'n Rulings", 'Ontario Building Code Commission Rulings', ['Canada', 'Ontario'], [[1980, 1990]]], ['Ont CIP OM', "Commissaire a l'information eta Ia protection de la vie privee de I'Ontario, ordonnances, s\\xe9rie M", ['Canada', 'Ontario'], [[1988, 1998]]], ['Ont CIP OP', "Commissaire a l'information et\\xe9 Ia protection de la vie priv\\xe9e de I'Ontario, ordonnances, s\\xe9rie P", ['Canada', 'Ontario'], [[1989, 1998]]], ['Ont CIP somm', "Commissaire a l\\u2018information et\\xe9 Ia protection de app la vie privee de I'Ontario, sommaires des appels", ['Canada', 'Ontario'], [[1990, 1992]]], ['ONTD (a\\xe9rien)', 'Office national des transports du Canada decisions (transport a\\xe9rien)', ['Canada'], [[1988, 1992]]], ['ONTD (chemins de fer)', 'Office national des transports du Canada decisions (chemins defer)', ['Canada'], [[1988, 1991]]], ['Ont D', 'Crim Ontario Decisions\\u2014Criminal', ['Canada', 'Ontario'], [[1997, 1999]]], ['Ont D', 'Crim Cony Ontario Decisions\\u2014Criminal Convictions Cases', ['Canada', 'Ontario'], [[1980, 1996]]], ['Ont D', 'Crim Sent Ontario Decisions\\u2014Criminal Sentence Cases', ['Canada', 'Ontario'], [[1984, 1996]]], ["Ont Educ Rel Comm'n Grievance Arb", 'Ontario Education Relations Commission Grievance Arbitrations', ['Canada', 'Ontario'], [[1970, 1985]]], ['Ont Elec', 'Ontario Election Cases', ['Canada', 'Ontario'], [[1884, 1900]]], ['Ont En Bd Dec', 'Ontario Energy Board Decisions', ['Canada', 'Ontario'], [[1961, 2013]]], ['Oft Envtl Assessment Bd Decisions Dec', 'Ontario Environmental Assessment Board', ['Canada', 'Ontario'], [[1980, 2013]]], ['Ont Health Disciplines Bd Dec', 'Ontario Health Disciplines Board Decisions', ['Canada', 'Ontario'], [[1980, 2013]]], ['Ont IPC OM', 'Ontario Information and Privacy Commissioner, Orders, M Series', ['Canada', 'Ontario'], [[1988, 1998]]], ['Ont IPC OP', 'Ontario Information and Privacy Commissioner, Orders, P Series', ['Canada', 'Ontario'], [[1989, 1998]]], ['Ont IPC Sum App', 'Ontario Information and Privacy Commissioner, Summaries of Appeals', ['Canada', 'Ontario'], [[1990, 1992]]], ["Ont Lab-Mgmt Arb Comm'n Bull", 'Ontario Labour-Management Arbitration Commission Bulletin', ['Canada', 'Ontario'], [[1978, 1986]]], ['Ont Liquor Licence App Trib Dec', 'Ontario Liquor Licence Appeal Tribunal, Summaries of Decisions', ['Canada', 'Ontario'], [[1977, 1981]]], ['Ont Min Community & Soc Serv Rev Bd Dec', 'Ontario Ministry of Community and Social  Services Review Board Decisions', ['Canada', 'Ontario'], [[1974, 1978]]], ['Ont Pol R', 'Ontario Police Reports', ['Canada', 'Ontario'], [[1980, 2013]]], ['OPR', 'Ontario Practice Reports', ['Canada', 'Ontario'], [[1848, 1901]]], ['OR', 'Ontario Reports', ['Canada', 'Ontario'], [[1882, 1900], [1931, 1973]]], ['OR (2d)', 'Ontario Reports (Second Series)', ['Canada', 'Ontario'], [[1973, 1990]]], ['OR (3d)', 'Ontario Reports (Third Series)', ['Canada', 'Ontario'], [[1991, 2013]]], ['Orange Free State Prov Div R', 'Orange Free State Provincial Division Reports', ['South Africa'], [[1910, 1946]]], ['OSC Bull', 'Ontario Securities Commission Bulletin', ['Canada', 'Ontario'], [[1949, 2013]]], ['OSCWS', 'Ontario Securities Commission Weekly Summary', ['Canada', 'Ontario'], [[1967, 1980]]], ['OWCAT Dec', "Ontario Workers' Compensation Appeals Tribunal Decisions", ['Canada', 'Ontario'], [[1986, 1989]]], ['Ow', "Owen's Reports (ER vol 74)", ['United Kingdom'], [[1556, 1615]]], ['OWN', 'Ontario Weekly Notes', ['Canada', 'Ontario'], [[1909, 1962]]], ['OWR', 'Ontario Weekly Reporter', ['Canada', 'Ontario'], [[1902, 1916]]], ['P', 'Law Reports, Probate, Divorce, and Admiralty Division', ['United Kingdom'], [[1891, 1971]]], ['P', 'Pacific Reporter', ['USA'], [[1883, 1931]]], ['P (2d)', 'Pacific Reporter (Second Series)', ['USA'], [[1931, 2000]]], ['P (3d)', 'Pacific Reporter (Third Series)', ['USA'], [[2000, 2013]]], ['P Wms', "Peere Williams's Reports (ER vol 24)", ['United Kingdom'], [[1695, 1735]]], ['Palm', "Palmer's Reports (ER vol 81)", ['United Kingdom'], [[1619, 1629]]], ['Park', "Parker's Reports (ER vol 145)", ['United Kingdom'], [[1743, 1767]]], ['Patr Elec Cas', "Patrick's Election Cases (Upper Canada / Canada West)", ['Canada', 'Ontario'], [[1824, 1849]]], ['PCIJ (Ser A)', 'Publications of the Permanent Court of International Justice: Series A, Collection of Judgments', ['Europe'], [[1922, 1930]]], ['PCIJ (Ser B)', 'Publications of the Permanent Court of International Justice: Series B, Collection of Advisory Opinions', ['Europe'], [[1922, 1930]]], ['PCIJ (Ser A/B)', 'Publications of the Permanent Court of International Justice: Series NB, Judgments, Orders and Advisory Opinions', ['Europe'], [[1931, 1940]]], ['PCIJ (Ser C)', 'Publications of the Permanent Court of International Justice, Series C, Pleadings, Oral Statements and Documents', ['Europe'], [[1922, 1940]]], ['PD', 'Law Reports, Probate and Divorce', ['United Kingdom'], [[1875, 1890]]], ['Peake', "Peake's Reports (ER vol 170)", ['United Kingdom'], [[1790, 1812]]], ['Peake Add Cas', "Peake's Reports (Additional Cases) (ER vol 170)", ['United Kingdom'], [[1790, 1912]]], ['PEI', 'Prince Edward Island Supreme Court Reports', ['Canada', 'Prince Edward Island'], [[1850, 1882]]], ['PER', 'Pay Equity Reports', ['Canada', 'Ontario'], [[1990, 2013]]], ['Per CS', 'Extraits ou precedents des arr\\xeats tires des registres du Conseil sup\\xe9rieur de Qu\\xe9bec (Perrault)', ['Canada', 'Quebec'], [[1727, 1759]]], ['Perr P', 'Extraits ou precedents des arr\\xe9ts tires des registres de Ia pr\\xe9vost\\xe9 de Qu\\xe9bec', ['Canada', 'Quebec'], [[1753, 1854]]], ['Peters', "Peters' Prince Edward Island Reports", ['Canada', 'Prince Edward Island'], [[1850, 1872]]], ['PEP', 'Pandectesfrancaises p\\xe9riodiques', ['France'], [[1791, 1844]]], ['Ph', "Phillips' Reports (ER vol 41)", ['United Kingdom'], [[1841, 1849]]], ['Phill Ecc', "Phillimore's Reports (ER vol 161)", ['United Kingdom'], [[1809, 1821]]], ['PI Com', "Plowden's Commentaries (ER vol 75)", ['United Kingdom'], [[1550, 1580]]], ['PNGCB Alta', 'Petroleum and Natural Gas Conservation Board of Alberta', ['Canada', 'Alberta'], [[1938, 1957]]], ['Pollex', "Pollexfen's Reports (ER vol 86)", ['United Kingdom'], [[1669, 1685]]], ['Pop', "Popham's Reports (ER vol 79)", ['United Kingdom'], [[1592, 1627]]], ['PPR', 'Planning and Property Reports', ['Canada', 'Ontario'], [[1960, 1963]]], ['PPSAC', 'Personal Property Security Act Cases', ['Canada'], [[1977, 1990]]], ['PPSAC (2d)', 'Personal Property Security Act Cases (Second Series)', ['Canada'], [[1991, 2000]]], ['PPSAC (3d)', 'Personal Property Security Act Cases (Third Series)', ['Canada'], [[2001, 2013]]], ['PRBC', 'Procurement Review Board of Canada Decisions', ['Canada'], [[1990, 2013]]], ['PRBR', 'Pension Review Board Reports', ['Canada'], [[1972, 1986]]], ['Prec Ch', 'Precedents in Chancery (T Finch) (ER vol 24)', ['United Kingdom'], [[1689, 1722]]], ['Price', "Price's Reports (ER vols 145-147)", ['United Kingdom'], [[1814, 1824]]], ['Pyke', "Pyke's Reports", ['Canada', 'Quebec'], [[1809, 1810]]], ['QAC', 'Qu\\xe9bec Appeal Cases', ['Canada', 'Quebec'], [[1986, 1995]]], ['QB', "Queen's Bench Reports (ER vols 113-118)", ['United Kingdom'], [[1841, 1852]]], ['QBD', "Law Reports, Queen's Bench Division", ['United Kingdom'], [[1875, 1890]]], ['Qc Comm dp dec', 'Qu\\xe9bec Commission des droits de Ia personne, decisions des tribunaux', ['Canada', 'Quebec'], [[1977, 1981]]], ['Qid Lawyer Reps', 'Queensland Lawyer Reports', ['Australia'], [[1973, 2013]]], ['QLR', 'Quebec Law Reports', ['Canada', 'Quebec'], [[1875, 1891]]], ['QPR', 'Qu\\xe9bec Practice Reports', ['Canada', 'Quebec'], [[1896, 1944]]], ['QR', 'Queensland Reports', ['Australia'], [[1958, 2013]]], ['Q St R', 'Queensland State Reports', ['Australia'], [[1902, 1957]]], ['RAC', 'Ramsay, Appeal Cases', ['Canada', 'Quebec'], [[1873, 1886]]], ['RAT', "Recueil d'arr\\xeats sur les transports", ['Canada'], [[1966, 1977]]], ['Raym Ld', 'Raymond, Lord Reports (ER vols 91-92)', ['United Kingdom'], [[1694, 1732]]], ['Raym T', 'Raymond, Sir T Reports (ER vol 83)', ['United Kingdom'], [[1660, 1684]]], ['RCCT', 'Recueil des decisions de Ia Commission canadienne des transports', ['Canada'], [[1978, 1986]]], ['RCDA', "Recueil des decisions de Ia Commission du droit d'auteur", ['Canada'], [[1990, 1994]]], ['RCDA', 'Recueil de jurisprudence canadienne en droit des assurances', ['Canada'], [[1983, 1991]]], ['RCDA (2e)', 'Recueil de jurisprudence canadienne en droit des assurances (deuxi\\xe9me s\\xe9rie)', ['Canada'], [[1991, 1998]]], ['RCDA(3e)', 'Recueil de jurisprudence canadienne en droit des assurances (troisi\\xe9me s\\xe9rie)', ['Canada'], [[1998, 2013]]], ['RCDE', "Recueil de jurisprudence canadienne en droit de l'environnement", ['Canada'], [[1978, 1985]]], ['RCDE (ns)', "Recueil de jurisprudence canadienne en droit de l'environnement (nouvelle serie)", ['Canada'], [[1986, 2013]]], ["RC de I'\\xc9", "Recueil des arr\\xeats de Ia Cour de l'Echiquier", ['Canada'], [[1875, 1922]]], ["RC de l'\\xc9", "Rapports judiciaires du Canada: Cour de l'Echiquier", ['Canada'], [[1823, 1970]]], ['RCDF', 'Recueil de jurisprudence canadienne en droit de Ia faillite', ['Canada'], [[1920, 1960]]], ['RCDF (2e)', 'Recueil de jurisprudence canadienne en droit de Ia faillite (deuxieme serie)', ['Canada'], [[1960, 1990]]], ['RCDF (3e)', 'Recueilde jurisprudence canadienne en droit de Ia faillite (troisieme s\\xe9rie)', ['Canada'], [[1991, 1998]]], ['RCDF (4e)', 'Recueil de jurisprudence canadienne en droit de la faillite (quatrieme s\\xe9rie)', ['Canada'], [[1998, 2013]]], ['RCDSST', 'Recueil de jurisprudence canadienne en droit de la sante et de s\\xe9curit\\xe9 au travail', ['Canada'], [[1989, 1993]]], ['RCDT', 'Recueilde jurisprudence canadienne en droit du travail', ['Canada'], [[1983, 1994]]], ['RCDT(2e)', 'Recueil de jurisprudence canadienne en droit du travail (deuxi\\xe8me serie)', ['Canada'], [[1994, 2000]]], ['RCDT (3e)', 'Recueil de jurisprudence canadienne en droit du travail (troisi\\xe9me s\\xe9rie)', ['Canada'], [[2000, 2013]]], ['RCDVM', 'Recueil de jurisprudence canadienne en droit des valeurs mobili\\xe8res', ['Canada'], [[1993, 1998]]], ['RCE / Rec / Recueil Lebon', "Recueil des arr\\xe9ts du Conseil d'Etat statuant  au contentieux et du Tribunal des conflits, des arr\\xebts des cours administratives d'appel et des jugements des tribunaux administratifs", ['France'], [[1821, 2013]]], ['RCF', 'Recueil des decisions des Cours f\\xe9d\\xe9rales', ['Canada'], [[1971, 2013]]], ['RCRAS', "Recueil do jurisprudence canadienne en mati\\xe8re de retraite et d'avantages sociaux", ['Canada'], [[1994, 2013]]], ['RCRC', 'Recueil de jurisprudence canadienne en responsabilit\\xe9 civile', ['Canada'], [[1976, 1990]]], ['RCRC (2e)', 'Recueil de jurisprudence canadienne en responsabilit\\xe9 civile (deuxi\\xe8me s\\xe9rie)', ['Canada'], [[1990, 2000]]], ['RCRC (3e)', 'Recueil de jurisprudence canadienne en responsabilite civile (troisieme serie)', ['Canada'], [[2000, 2013]]], ['RCRP', 'Recueil des arr\\xeats du Conseil de revision des pensions', ['Canada'], [[1972, 1986]]], ['RCS', 'Rapports judiciaires du Canada : Cour supreme', ['Canada'], [[1923, 1969]]], ['RCS', 'Recueils des arr\\xe9ts de Ia Cour supreme du Canada', ['Canada'], [[1877, 1922], [1970, 2013]]], ['RCTC', 'Rapports de Ia Commission do Tarif', ['Canada'], [[1937, 1988]]], ['RCCC', 'Recueil des decisions du Conseil constitutionnel', ['France'], [[1959, 2013]]], ['RDCFQ', "Recueil des decisions, Commission do la fonction publique et Comit\\xe9 d'appel de la fonction publique", ['Canada', 'Quebec'], [[1990, 2013]]], ['RDF', 'Recueil do droit de la famille', ['Canada'], [[1986, 2013]]], ['RDFQ', 'Recueil de droit fiscal quebecois', ['Canada', 'Quebec'], [[1977, 2013]]], ['RDI', 'Recueil de droit immobilier', ['Canada', 'Quebec'], [[1986, 2013]]], ['RDJ', 'Revue de droitjudiciaire', ['Canada', 'Quebec'], [[1983, 1996]]], ['RDJC', 'Recueil do droit judiciaire de Carswell', ['Canada'], [[1976, 1985]]], ['RDJC (2e)', 'Recueil de droit judiciaire de Carswell (deuxierne serie)', ['Canada'], [[1985, 1992]]], ['RDJC (3e)', 'Recueil de droit judiciaire de Carswell (troisi\\xe8rne serie)', ['Canada'], [[1992, 1997]]], ['RDJC (4e)', 'Recueil de droit judiciaire de Carswell (quatrierne serie)', ['Canada'], [[1997, 2001]]], ['RDJC (5e)', 'Recueil de droit judiciaire de Carswell (cinquieme serie)', ['Canada'], [[2001, 2013]]], ['RDP', 'Revue de droit penal', ['Canada', 'Quebec'], [[1978, 1983]]], ['RDRTQ', 'Recueil des decisions, Regie des telecommunications du Qu\\xe9bec', ['Canada', 'Quebec'], [[1990, 2013]]], ['RDT', 'Revue de droit du travail', ['Canada', 'Quebec'], [[1963, 1976]]], ['RECJ', 'Records of the Early Courts of Justice of Upper Canada', ['Canada', 'Ontario'], [[1789, 1984]]], ['Rep pen & proc pen', 'Encyclopedie juridique Dalloz: Repertoire de droit penal et de procedure p\\xe9nale', ['France'], [[1951, 2013]]], ['Rep admin', 'Encyclopedie juridique Dalloz: Repertoire de contentieux administratif', ['France'], [[1951, 2013]]], ['Rep Ch', 'Reports in Chancery (ER vol 21)', ['United Kingdom'], [[1615, 1710]]], ['Rep civ', 'Encyclopediejuridique Dalloz: Repertoire de droit civil', ['France'], [[1951, 2013]]], ['Rep corn', 'Encyclopediejuridique Dalloz: Repertoire de droit commercial', ['France'], [[1951, 2013]]], ['Rep commun', 'Encyclopedie juridique Dalloz: Repertoire de droit communautaire', ['France'], [[1957, 2013]]], ['Rep proc civ', 'Encyclopedie juridique Dalloz: Repertoire de procedure civile', ['France'], [[1951, 2013]]], ['Rep soc', 'Encyclopedie juridique DalIoz Repertoire des soci\\xe9t\\xe9s', ['France'], [[1951, 2013]]], ['Rep t Finch', "Reports, temp Finch (Nelson's folio Reports) (ER vol 23)", ['United Kingdom'], [[1673, 1681]]], ['Rep tr', 'Encyclopedie juridique Dalloz: Repertoire de droit du travail', ['France'], [[1951, 2013]]], ['Rev serv arb', "Revue des services d'arbitrage", ['Canada'], [[1977, 2013]]], ['RFL', 'Reports of Family Law', ['Canada'], [[1971, 1978]]], ['RFL (2d)', 'Reports of Family Law (Second Series)', ['Canada'], [[1978, 1986]]], ['RFL (3d)', 'Reports of Family Law (Third Series)', ['Canada'], [[1986, 1994]]], ['RFL (4th)', 'Reports of Family Law (Fourth Series)', ['Canada'], [[1994, 2000]]], ['RFL (5th)', 'Reports of Family Law (Fifth Series)', ['Canada'], [[2000, 2013]]], ['Rhod & NLR', 'Rhodesia & Nyasaland Law Reports', ['East Africa'], [[1956, 1963]]], ['Rhod LR', 'Rhodesian Law Reports', ['Manitoba', 'Zimbabwe'], [[1964, 1979]]], ['Ridg t Hard', "Ridgeway, temp Hardwicke's Reports (ER vol 27)", ['United Kingdom'], [[1733, 1745]]], ['RIAA', 'Report of International Arbitral Award', ['International'], [[1948, 2013]]], ['Ritch Eq Rep', "Ritchie's Equity Reports", ['Canada', 'Nova Scotia'], [[1873, 1882]]], ['RJ imm', 'Recueil de jurisprudence en droit de l\\u2018immigration', ['Canada'], [[1985, 1987]]], ['RJ imm (2e)', 'Recueil de jurisprudence en droit de l\\u2018immigration (deuxi\\xe8me s\\xe9rie)', ['Canada'], [[1987, 1999]]], ['RJ imm (2e)', "Recueil de jurisprudence en droit de l'immigration (deuxi\\xe8me s\\xe9rie)", ['Canada'], [[1999, 2013]]], ['RJC', 'Revue de jurisprudence commerciale', ['France'], [[1957, 2013]]], ['RJC', 'Recueil de jurisprudence en droit criminel', ['Canada'], [[1946, 1967]]], ['RJC (ns)', 'Recueil de jurisprudence en droit criminel (nouvelle s\\xe9rie)', ['Canada'], [[1967, 1978]]], ['RJC (3e)', 'Recueil de jurisprudence en droit criminel (troisi\\xe8me s\\xe9rie)', ['Canada'], [[1978, 1991]]], ['RJC (4e)', 'Recueil de jurisprudence en droit criminel (quatri\\xe8me s\\xe9rie)', ['Canada'], [[1991, 1996]]], ['RJC (5e)', 'Recueil dejurisprudence en droit criminel (cinqui\\xe8me s\\xe9rie)', ['Canada'], [[1997, 2013]]], ['RJDA', 'Recueil dejurisprudence en droit des affaires', ['Canada'], [[1977, 1990]]], ['RJDA(2e)', 'Recueil de jurisprudence en droit des affaires (deuxi\\xe8me s\\xe9rie)', ['Canada'], [[1991, 2013]]], ['RJDA(2e)', 'Recueil de jurisprudence en droit des affaires (deuxi\\xe8me s\\xe9rie)', ['Canada'], [[1991, 1999]]], ['RJDA (3e)', 'Recueil de jurisprudence en droit des affaires (troisi\\xe8me s\\xe9rie)', ['Canada'], [[2000, 2013]]], ['RJDC', 'Recueil do jurisprudence en droit de le construction', ['Canada'], [[1983, 1992]]], ['RJDC (2e)', 'Recueil de jurisprudence en droit de la construction (deuxi\\xe8me s\\xe9rie)', ['Canada'], [[1992, 2000]]], ['RJDC (3e)', 'Recueil de jurisprudence en droit de la construction (troisi\\xe8me s\\xe9rie)', ['Canada'], [[2000, 2013]]], ['RJDI', 'Recueil de jurisprudence en droit immobilier', ['Canada'], [[1977, 1989]]], ['RJDI (2e)', 'Recueil de jurisprudence en droit immobilier (deuxi\\xe8me s\\xe9rie)', ['Canada'], [[1989, 1996]]], ['RJDI(3e)', 'Recueil de jurisprudence en droit immobilier (troisi\\xe8me s\\xe9rie)', ['Canada'], [[1996, 2013]]], ['RJDM', 'Recueil de jurisprudence en droit municipal', ['Canada'], [[1976, 1990]]], ['RJDM (2e)', 'Recueil de jurisprudence en droit municipal (deuxi\\xe8me s\\xe9rie)', ['Canada'], [[1991, 2013]]], ['RJDT', 'Recueil do jurisprudence en droit du travail', ['Canada', 'Quebec'], [[1998, 2013]]], ['RJF', 'Revue de jurisprudence fiscale (ancien titre / former titre: Bulletin des contributions directes, de la taxe sur la valeur ajout\\xe9e et des imp\\xf4ts indirects)', ['France'], [[1975, 2013]]], ['RJF', 'Recueil de jurisprudence en droit de la famille', ['Canada'], [[1971, 1978]]], ['RJF (2e)', 'Recueil do jurisprudence en droit de la famille (deuxi\\xe8me s\\xe9rie)', ['Canada'], [[1978, 1986]]], ['RJF(3e)', 'Recueil de jurisprudence en droit do Ia famille (troisi\\xe9me s\\xe9rie)', ['Canada'], [[1986, 1994]]], ['RJF (4e)', 'Recueil de jurisprudence en droit do Ia famille (quatri\\xe9me s\\xe9rie)', ['Canada'], [[1994, 2000]]], ['RJF (5e)', 'Recueil de jurisprudence en droit do Ia famille (cinqui\\xe8me serie)', ['Canada'], [[2000, 2013]]], ['RJO (3e)', 'Recuell do jurisprudence do \\u2018Ontario (troisieme s\\xe9rie) (1882-1 991SvoirOntario Reports)', ['Canada', 'Ontario'], [[1991, 2013]]], ['RJQ', 'Recueils de jurisprudence du Qu\\xe9bec', ['Canada', 'Quebec'], [[1875, 1891], [1975, 2013]]], ['RJS', 'Revue do jurisprudence sociale', ['France'], [[1989, 2013]]], ['RL', 'Revue legale', ['Canada', 'Quebec'], [[1869, 1892]]], ['RL', 'Revue legale', ['Canada', 'Quebec'], [[1943, 2013]]], ['RL (ns)', 'Revue l\\xe9gale (nouvelle s\\xe9rie)', ['Canada', 'Quebec'], [[1895, 1943]]], ['RNB (2d)', 'Recueil des arr\\xe9ts du Nouveau Brunswick (deuxi\\xe9me s\\xe9rie)', ['Canada', 'New Brunswick'], [[1969, 2013]]], ['Rob / Rob Chr', "Robinson, C's Reports (ER vol 165)", ['United Kingdom'], [[1798, 1808]]], ['Rob Ecc', "Robertson's Ecclesiastical Reports (ER vol 163)", ['United Kingdom'], [[1844, 1853]]], ['Rolle', "Rolle's Reports (ER vol 81)", ['United Kingdom'], [[1614, 1625]]], ['RONTC', "Recueil des decisions de l'office national des transports du Canada", ['Canada'], [[1988, 2013]]], ['Roscoe', "Roscoe's Reports", ['South Africa'], [[1861, 1878]]], ['RPC', 'Reports of Patent Cases', ['United Kingdom'], [[1884, 1955]]], ['RPC', 'Reports of Patent, Design and Trademark Cases', ['United Kingdom'], [[1957, 2013]]], ['RPEI', 'Reports of cases determined in the Supreme Court, Court of Chancery and Court of Vice-Admiralty of Prince Edward Island', ['Canada', 'Prince Edward Island'], [[1850, 1872]]], ['RPQ', 'Rapports do pratique de Qu\\xe9bec', ['Canada', 'Quebec'], [[1897, 1982]]], ['RPR', 'Real Property Reports', ['Canada'], [[1977, 1989]]], ['RPR (2d)', 'Real Property Reports (Second Series)', ['Canada'], [[1989, 1996]]], ['RPR (3d)', 'Real Property Reports (Third Series)', ['Canada'], [[1996, 2013]]], ['RPTA', 'Recueil en mati\\xe8re de protection du territoire agricole', ['Canada', 'Quebec'], [[1990, 2013]]], ['RR', 'Revised Reports', ['United Kingdom'], [[1785, 1865]]], ['RRA', 'Recueil en responsabilit\\xe9 et assurance', ['Canada', 'Quebec'], [[1986, 2013]]], ['RS', 'Recueil Sirey', ['France'], [[1955, 1965]]], ['RSA', 'Recueil de sentences arbitrales', ['Canada', 'Quebec'], [[1981, 1983]]], ['RSE', "Recueil des sentences de l'\\xe9ducation", ['Canada', 'Quebec'], [[1974, 2013]]], ['RSF', 'Recueil de jurisprudence en droit des successions et des fiducies', ['Canada'], [[1977, 1994]]], ['RSF (2e)', 'Recueil de jurisprudence en droit des successions et des fiducies (deuxi\\xe8me s\\xe9rie)', ['Canada'], [[1994, 2013]]], ['RSP', 'Recueil des ordonnances de Ia r\\xe9gie des services publics', ['Canada', 'Quebec'], [[1973, 1978]]], ['RTC', 'D\\xe9cisions et \\xe9nonc\\xe9s de politique sur la radiodiffusion et les t\\xe9l\\xe9communications canadiennes', ['Canada'], [[1975, 1985]]], ['Russ', "Russell's Reports (ER vol 38)", ['United Kingdom'], [[1823, 1829]]], ['Russ & M', "Russell & Mylne's Reports (ER vol 39)", ['United Kingdom'], [[1829, 1831]]], ['Russ & Ry', "Russell & Ryan's Crown Cases (ER vol 168)", ['United Kingdom'], [[1799, 1823]]], ['Russ ER', "Russ ER Russell's Election Reports", ['Canada', 'Nova Scotia'], [[1874, 1874]]], ['SAFP', 'Sentences arbitrales de la fonction publique', ['Canada', 'Quebec'], [[1983, 2013]]], ['S Afr LR', 'South African Law Reports', ['South Africa'], [[1947, 2013]]], ['SAG', 'Sentences arbitrales de griefs', ['Canada', 'Quebec'], [[1970, 1981]]], ['Salk', "Salkeld's Reports (ER vol 91)", ['United Kingdom'], [[1689, 1712]]], ['SALR', 'South Australia Law Reports', ['Australia'], [[1865, 2013]]], ['Sarbah', "Sarbah's Fanti Law Reports", ['Ghana'], [[1845, 1903]]], ['SARB Dec', 'Social Assistance Review Board Selected Decisions', ['Canada', 'Ontario'], [[1975, 1986]]], ['SARB Sum', 'Social Assistance Review Board Summaries of Decisions', ['Canada', 'Ontario'], [[1988, 1994]]], ['Sask C Comp B', 'Saskatchewan Crimes Compensation Board, Awards', ['Canada', 'Saskatchewan'], [[1968, 1992]]], ["Sask Human Rights Comm'n Dec", 'Saskatchewan Human Rights Commission Decisions', ['Canada', 'Saskatchewan'], [[1973, 1981]]], ['Sask LR', 'Saskatchewan Law Reports', ['Canada', 'Saskatchewan'], [[1907, 1931]]], ['Sask LRBD', 'Saskatchewan Labour Relations Board Decisions', ['Canada', 'Saskatchewan'], [[1945, 1977]]], ['Sask LRBDC', 'Saskatchewan Labour Relations Board, Decisions and Court Cases', ['Canada', 'Saskatchewan'], [[1945, 1964]]], ['Sask LRBR', 'Saskatchewan Labour Relations Board, Report of Meetings', ['Canada', 'Saskatchewan'], [[1967, 1973]]], ['Sask R', 'Saskatchewan Reports', ['Canada'], [[1980, 2013]]], ['Sask SC Bull', 'Saskatchewan Securities Commission Monthly Bulletin', ['Canada', 'Saskatchewan'], [[1984, 2013]]], ['SASR', 'South Australia State Reports', ['Australia'], [[1921, 2013]]], ['Sav', "Savile's Reports (ER vol 123)", ['United Kingdom'], [[1580, 1594]]], ['Say', "Sayer's Reports (ER vol 96)", ['United Kingdom'], [[1751, 1756]]], ['SCC Cam', 'Canada Supreme Court Cases (Cameron) (Published / publi\\xe9 1918)', ['Canada'], [[1887, 1890]]], ['SCC Cam (2d)', 'Canada Supreme Court Reports (Cameron) (Published / publi\\xe9 1925)', ['Canada'], [[1876, 1922]]], ['SCC Coutl', 'Canada Supreme Court Cases (Coutlee)', ['Canada'], [[1875, 1907]]], ['SCCB', 'Supreme Court of Canada Bulletin of Proceedings', ['Canada'], [[1970, 2013]]], ['SCCD', 'Supreme Court of Canada Decisions', ['Canada'], [[1978, 2013]]], ['SCCR', 'Supreme Court of Canada Reports Service', ['Canada'], [[1971, 2013]]], ['Scot LR', 'Scottish Law Reporter', ['Scotland'], [[1865, 1924]]], ['SCR', 'Canada Law Reports: Supreme Court of  Canada', ['Canada'], [[1923, 1969]]], ['SCR', 'Canada Supreme Court Reports', ['Canada'], [[1877, 1922], [1970, 2013]]], ['S Ct', 'Supreme Court Reporter', ['USA'], [[1882, 2013]]], ['SE', 'South Eastern Reporter', ['USA'], [[1887, 1939]]], ['SE (2d)', 'South Eastern Reporter (Second Series)', ['USA'], [[1939, 1988]]], ['Searle', "Searle's Reports", ['South Africa'], [[1850, 1867]]], ['SEC Dec', 'Securities and Exchange Commission Decisions', ['USA'], [[1934, 2013]]], ['Sel Cat King', 'Select Cases, temp King (ER vol 25)', ['United Kingdom'], [[1724, 1733]]], ['Sem Jur', 'Semaine Juridique', ['France'], [[1927, 1936]]], ['Sess Cas', 'Session Cases', ['United Kingdom'], [[1710, 1748]]], ['Sess Cas', 'Session Cases', ['Scotland'], [[1906, 2013]]], ['Sess Cas S', 'Session Cases (Shaw & Balantine)', ['Scotland'], [[1821, 1838]]], ['Sess Cas D', 'Session Cases (Second Series) (Dunlop)', ['Scotland'], [[1838, 1862]]], ['Sess Cas F', 'Session Cases (Fifth Series) (Fraser)', ['Scotland'], [[1898, 1906]]], ['Sess Cas M', 'Session Cases (Third Series) (Macpherson)', ['Scotland'], [[1862, 1873]]], ['Sess Cas R', 'Session Cases (Fourth Series) (Rettie)', ['Scotland'], [[1873, 1898]]], ['Show KB', "Shower's Reports, King's Bench (ER vol 89)", ['United Kingdom'], [[1678, 1695]]], ['Show PC', "Shower's Reports, Privy Council (ER vol 1)", ['United Kingdom'], [[1694, 1699]]], ['Sid', "Siderfin's Reports, King's Bench (ER vol 82)", ['United Kingdom'], [[1657, 1670]]], ['Sim', "Simons's Reports (ER vols 57-60)", ['United Kingdom'], [[1826, 1852]]], ['Sim (NS)', "Simons'a New Reports (ER vol 61)", ['United Kingdom'], [[1850, 1852]]], ['Sim & St', "Simons & Stuart's Reports (ER vol 57)", ['United Kingdom'], [[1822, 1826]]], ['SLLR', 'Sierra Leone Law Reports', ['West Africa'], [[1960, 1963]]], ['SLT', 'Scots Law Times', ['Scotland'], [[1893, 2013]]], ['SLR', 'Singapore Law Reports', ['Singapore'], [[1946, 2013]]], ['SLR (R)', 'Singapore Law Reports (Reissue)', ['Singapore'], [[1965, 2002]]], ['Skin', "Skinner's Reports (ER vol 90)", ['United Kingdom'], [[1681, 1698]]], ['Sm & G', "Smale & Giffard's Reports (ER vol 65)", ['United Kingdom'], [[1852, 1857]]], ['Sm & S', "Smith and Sager's Drainage Cases", ['Canada', 'Ontario'], [[1901, 1913]]], ['SNB & B', 'Sarawak, North Borneo and Brunei Supreme Court Reports', ['Malaysia'], [[1952, 1963]]], ['So', 'Southern Reporter', ['USA'], [[1887, 1941]]], ['So (2d)', 'Southern Reporter (Second Series)', ['USA'], [[1941, 2013]]], ['SOLR', 'Sexual Offences Law Reporter', ['Canada'], [[1994, 2013]]], ['Sp Ecc & Ad', "Spinks's Ecclesiastical & Admiralty Reports (ER vol 164)", ['United Kingdom'], [[1863, 1855]]], ['Sp PC', "Spinks' Prize Court Cases (ER vol 164)", ['United Kingdom'], [[1854, 1856]]], ['SRLA', "Speakers' Rulings, Legislative Assembly", ['Canada', 'New Brunswick'], [[1923, 1982]]], ['SSC', 'Sarawak Supreme Court Reports', ['Malaysia'], [[1928, 1953]]], ['SSLR', 'Straits Settlements Law Reports', ['Singapore'], [[1893, 1942]]], ['Stark', "Starkie's Reports (ER vol 171)", ['United Kingdom'], [[1814, 1820]]], ['St-MSD', "Saint-Maurice's Speakers' Decisions", ['Canada', 'Quebec'], [[1868, 1885]]], ['Str', "Strange's Reports (ER vol 93)", ['United Kingdom'], [[1716, 1749]]], ['STR', 'Canadian Sales Tax Reporter', ['Canada'], [[1968, 1989]]], ['Stu Adm', "Stuart's Vice-Admiralty Reports (Lower Canada)", ['Canada', 'Quebec'], [[1836, 1874]]], ['Stu KB', "Stuart's Reports (Lower Canada)", ['Canada', 'Quebec'], [[1810, 1835]]], ['Sty', "Style's Reports (ER vol 82)", ['United Kingdom'], [[1646, 1655]]], ['Sudan LR', 'Sudan Law Reports', ['Sudan'], [[1956, 1971]]], ['SW', 'South Western Reporter', ['USA'], [[1979, 2013]]], ['SW (2d)', 'South Western Reporter (Second Series)', ['USA'], [[1928, 2013]]], ['Sw & Tr', "Swabey & Tristram's Reports (ER vol 164)", ['United Kingdom'], [[1858, 1865]]], ['Swab', "Swabey's Reports (ER vol 166)", ['United Kingdom'], [[1855, 1859]]], ['Swans', "Swanston's Reports (ER vol 36)", ['United Kingdom'], [[1818, 1819]]], ['TA', "Decisions du Tribunal d'arbitrage", ['Canada', 'Quebec'], [[1982, 1997]]], ['Talb', "Talbot's Cases temp (ER vol 25)", ['United Kingdom'], [[1733, 1738]]], ['Taml', "Tamlyn's Reports (ER vol 48)", ['United Kingdom'], [[1829, 1830]]], ['TAAT', "Tribunal d'appel des accidents du travail", ['Canada', 'Ontario'], [[1985, 1997]]], ['TAQ', 'Decisions du Tribunal admirfstratif du Qu\\xe9bec', ['Canada', 'Quebec'], [[1998, 2013]]], ['Tas LR', 'Tasmanian Law Reports', ['Australia'], [[1896, 1940]]], ['Tas R', 'Tasmania Reports', ['Australia'], [[1979, 2013]]], ['Tas SR', 'Tasmania State Reports', ['Australia'], [[1941, 1978]]], ['Taun', "Taunton's Reports (ER vols 127-129)", ['United Kingdom'], [[1807, 1819]]], ['Tax ABC', 'Tax Appeal Board Cases', ['Canada'], [[1949, 1966]]], ['Tax ABC (NS)', 'Tax Appeal Board Cases (New Series)', ['Canada'], [[1967, 1972]]], ['TBR', 'Tariff Board Reports', ['Canada'], [[1937, 1988]]], ['TBRD', 'Taxation Board of Review Decisions', ['Australia'], [[1939, 1949]]], ['TBRD (NS)', 'Taxation Board Review Decisions (New Series)', ['Australia'], [[1950, 1968]]], ['TCD', 'Tribunal de Ia Concurrence, decisions', ['Canada'], [[1986, 2013]]], ['TCT', 'Canadian Trade and Commodity Tax Cases', ['Canada'], [[1989, 1992]]], ['TE', "Recueils de jurisprudence du tribunal de l'expropriation", ['Canada', 'Quebec'], [[1972, 1986]]], ['Terr LR', 'Territories Law Reports', ['Canada', 'Northwest Territories'], [[1885, 1907]]], ['TJ', 'Recueils de jurisprudence du Quebec; Tribunal de la jeunesse', ['Canada', 'Quebec'], [[1978, 1985]]], ['TLLR', 'Tenant and Landlord Law Reports', ['Canada', 'Ontario'], [[1983, 1988]]], ['TLR', 'Times Law Reports', ['United Kingdom'], [[1884, 1952]]], ['TMR', 'Trademark Reporter', ['USA'], [[1911, 2013]]], ['Toth', "Tothill's Reports (ER vol 21)", ['United Kingdom'], [[1559, 1646]]], ['TPEI', "Tucker's Select Cases of Prince Edward Island", ['Canada', 'Prince Edward Island'], [[1817, 1828]]], ['TR', 'Term Reports (ERvols 99-101)', ['United Kingdom'], [[1785, 1800]]], ['Trib conc dec', 'Tribunal de la concurrence, decisions', ['Canada'], [[1986, 2000]]], ['TSPAAT', "Tribunal d'appel de Ia s\\xe9curit\\xe9 professionnelle et de l'assurance contre les accidents du travail", ['Canada', 'Ontario'], [[1998, 2013]]], ['TTC', "Hunter's Torrens Title Cases", ['Canada', 'Australia', 'New Zealand', 'United Kingdom'], [[1865, 1893]]], ['TTJ', 'Jurisprudence en droit du travail;Tribunal du travail', ['Canada', 'Quebec'], [[1970, 1981]]], ['TTR', 'Trade and Tariff Reports', ['Canada'], [[1990, 1996]]], ['Turn & R', 'Trade and Tarrif Reports (Second Series)', ['Canada'], [[1996, 2013]]], ['TTR (2d)', "Turner & Russell's Reports, Chancery (ER vol 37)", ['United Kingdom'], [[1822, 1824]]], ['UC Chamb Rep', 'Upper Canada Chambers Reports', ['Canada', 'Ontario'], [[1846, 1852]]], ['UCCP', 'Upper Canada Common Pleas Reports', ['Canada', 'Ontario'], [[1850, 1882]]], ['UCE & A', 'Upper Canada Error and Appeal Reports (Grant)', ['Canada', 'Ontario'], [[1846, 1866]]], ['UCKB', "Upper Canada King's Bench Report (Old Series)", ['Canada', 'Ontario'], [[1831, 1844]]], ['UCQB', "Upper Canada Queen's Bench Reports (New Series)", ['Canada', 'Ontario'], [[1842, 1882]]], ['UCQB (OS)', "Upper Canada Queen's Bench Reports (Old Series)", ['Canada', 'Ontario'], [[1831, 1838]]], ['Uganda LR', 'Uganda Law Reports', ['East Africa'], [[1904, 1973]]], ['UIC Dec Ump', 'Unemployment Insurance Commission - Decisions of the Umpire', ['Canada'], [[1943, 2013]]], ['UIC Selec Dec Ump', 'Unemployment Insurance Commission - Selected Decisions of the Umpire', ['Canada'], [[1943, 1949]]], ['US', 'United States Reports', ['USA'], [[1754, 2013]]], ['USLW', 'United States Court of Appeals Reports', ['USA'], [[1941, 2013]]], ['US App DC', 'United States Law Week', ['USA'], [[1933, 2013]]], ['Vaugh', "Vaughan's Reports (ER vol 124)", ['United Kingdom'], [[1665, 1674]]], ['Vent', "Ventris's Reports (ER vol 86)", ['United Kingdom'], [[1666, 1688]]], ['Vern', "Vernon's Reports (ER vol 23)", ['United Kingdom'], [[1680, 1719]]], ['Ves & Bea', "Vesey & Beames' Reports (ER vol 35)", ['United Kingdom'], [[1812, 1814]]], ['Ves Jr', "Vesey Junior's Reports (ER vols 30-34)", ['United Kingdom'], [[1789, 1817]]], ['Ves Sr', "Vesey Senior's Reports (ER vols 27-28)", ['United Kingdom'], [[1746, 1755]]], ['VLR', 'Victorian Law Reports', ['Australia'], [[1886, 1956]]], ['VR', 'Victorian Reports', ['Australia'], [[1870, 1872], [1957, 2013]]], ['WAC', 'Western Appeal Cases', ['Canada'], [[1991, 2013]]], ['WALR', 'Western Australia Law Reports', ['Australia'], [[1899, 1959]]], ['WAR', 'Western Australia Reports', ['Australia'], [[1960, 1990]]], ['WAR (NS)', 'Western Australia Reports (New Series)', ['Australia'], [[1990, 2013]]], ['WCAT Dec', "Workers' Compensation Appeal Tribunal Decisions", ['Canada', 'Newfoundland & Labrador'], [[1987, 2013]]], ['WCATR', 'Workers Compensation Appeals Tribunal Reporter', ['Canada', 'Ontario'], [[1986, 1997]]], ['WCB', 'Weekly Criminal Bulletin', ['Canada'], [[1976, 1986]]], ['WCB (2d)', 'Weekly Criminal Bulletin (Second Series)', ['Canada'], [[1986, 2013]]], ['WDCP', 'Weekly Digest of Civil Procedure', ['Canada'], [[1985, 1989]]], ['WDCP (2d)', 'Weekly Digest of Civil Procedure (Second Series)', ['Canada'], [[1990, 1994]]], ['WDCP (3d)', 'Weekly Digest of Civil Procedure (Third Series)', ['Canada'], [[1994, 2013]]], ['WDFL', 'Weekly Digest of Family Law', ['Canada'], [[1982, 2013]]], ['Welsb H & G', "Welsby, Hurlstone & Gordon's Exchequer Reports (ER vols 154-156)", ['United Kingdom'], [[1847, 1856]]], ['West, t Hard', 'West, temp Hardwicke Reports (ER vol 25)', ['United Kingdom'], [[1736, 1739]]], ['West', "West's Reports (ER vol 9)", ['United Kingdom'], [[1839, 1841]]], ["West's Alaska", "West's Alaska Digest", ['Canada', 'Alberta'], [[1987, 2013]]], ['Wight', "Wightwick's Reports (ER vol 145)", ['United Kingdom'], [[1810, 1811]]], ['Will Woll & H', "Willmore, Wollaston & Hodges's Reports", ['United Kingdom'], [[1838, 1839]]], ['Willes', "Willes's Reports (ER vol 125)", ['United Kingdom'], [[1737, 1760]]], ['Wilm', "Wilmot's Reports (ER vol 97)", ['United Kingdom'], [[1757, 1770]]], ['Wils Ch', "Wilson's Reports, Chancery (ER vol 37)", ['United Kingdom'], [[1818, 1819]]], ['Wils Ex', "Wilson's Reports, Exchequer (ER vol 159)", ['United Kingdom'], [[1805, 1817]]], ['Wils KB', "Wilson's Reports, King's Bench (ER vol 95)", ['United Kingdom'], [[1742, 1774]]], ['Winch', "Winch's Reports (ER vol 124)", ['United Kingdom'], [[1621, 1625]]], ['WLAC', 'Western Labour Arbitration Cases', ['Canada'], [[1966, 1985]]], ['WLR', 'Weekly Law Reports', ['United Kingdom'], [[1953, 2013]]], ['WLR', 'Western Law Reporter', ['Canada'], [[1905, 1917]]], ['WLRBD', 'Canadian Wartime Labour Relations Board Decisions', ['Canada'], [[1944, 1948]]], ['WLTR', 'Western Law Times and Reports', ['Canada'], [[1890, 1896]]], ['Wms Saund', "Williams & Saunders's Reports (ER vol 85)", ['United Kingdom'], [[1666, 1673]]], ['W Rob', "W Robinson's Reports (ER vol 166)", ['United Kingdom'], [[1838, 1850]]], ['WSIATR', 'Workplace Safety and Insurance Appeals Tribunal Reporter', ['Canada', 'Ontario'], [[1998, 2013]]], ["W W & A'B", "Wyatt, Webb & A'Beckett's Reports (Supreme Court of Victoria)", ['Australia'], [[1866, 1871]]], ['WWR', 'Western Weekly Reports', ['Canada'], [[1911, 1950], [1971, 2013]]], ['WWR (NS)', 'Western Weekly Reports (New Series)', ['Canada'], [[1951, 1970]]], ['YAD / Young Adm', "Young's Admiralty Decisions", ['Canada', 'Nova Scotia'], [[1864, 1880]]], ['Y & C Ex', "Younge & Collyer's Reports (ER vol 160)", ['United Kingdom'], [[1834, 1842]]], ['Y & CCC', "Younge & Collyer's Chancery Cases (ER vols 62-63)", ['United Kingdom'], [[1841, 1843]]], ['Y & J', "Younge & Jervis's Reports (ER vol 148)", ['United Kingdom'], [[1826, 1830]]], ['YB Eur Conv HR', 'Yearbook of the European Convention on Human Rights', ['Europe'], [[1955, 2013]]], ['YR', 'Yukon Reports', ['Canada'], [[1986, 1989]]], ['Yel', "Yelverton's Reports (ER vol 80)", ['United Kingdom'], [[1603, 1613]]], ['You', "Younge's Reports (ER vol 159)", ['United Kingdom'], [[1830, 1832]]]]
	var reporterList = [];
	var currentstring1;
	var currentList = [];
	var outputstring = "";
	var browseClicked = false;
	
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
	
	
	for (var i =0; i<templist.length; i++){
		var abbr		 = templist[i][0];
		var name 		 = templist[i][1];
		var jurisdiction = templist[i][1];
		reporterList.push(new reporter(name,abbr))
	}	
	
	
	
	var updateCurrentList = function() {
		outputstring="	<thead> <tr><td> <b> Abbreviation  </b></td><td><b> Name </b><td></tr> </thead> <tbody>";
		var currentstring= jQuery("input#reporter-input").val();
		
		if (currentstring !=""){
			currentList = _.filter(reporterList, function(singleReporter){
				var reportername = singleReporter.getName().toLowerCase();
				return(singleReporter.getName().toLowerCase().indexOf(currentstring.toLowerCase()) >= 0);
			});
			
			for (var i =0; i < currentList.length; i++){
				var name = currentList[i].getName();
				var abbr = currentList[i].getAbbr();
				//var juris = currentList[i].getJuris();
				outputstring = outputstring.concat("<tr> <td>"+abbr + "</td> <td style =\"\">" + name + "</td></tr>");
				   //<div style=\"float: right; clear: right;\">" + abbr +"</div><br>");
			}
			outputstring = outputstring.concat("</tbody>");
		}
		
		else {
			outputstring ="";
		}
		generateOutput(outputstring);
	}
		
	function generateOutput(output){
			jQuery('#reporter-table').html(outputstring);
	}
	
	document.getElementById("reporter-input").onchange = updateCurrentList;
	document.getElementById("reporter-input").onkeyup = updateCurrentList;
  

	jQuery(".browsebutton").click(function(){
		if(browseClicked == false){
    		jQuery("#reporter-container").show();
    		browseClicked = true;
		}
		else{
			jQuery("#reporter-container").hide();
			browseClicked = false;
		}
	});
	

/*
=============================================
Reset-button
=============================================
*/
jQuery('#CanadaCaseReset').click(function(){
	CanadianCaseValidator.resetForm();
	//jQuery("#CanadaCaseExtraOptions").collapse();
	jQuery('#tooltips').html("");
	$("#canadacase-form .error").removeClass('error');
	jQuery("#pincite-form").hide();
	jQuery("#reporter-container").hide();
	jQuery("#history3").hide();
	jQuery("#history2").hide();
	jQuery('#pinciteWrapper').tooltip('enable');
	$('#pincite-selection').prop('disabled',true);
	$('#pinciteWrapper').show();
	//$('#pinciteWrapper').remove();
	
	//$("#canadacase-Form .error").html("RAAAAAAAAAAAAAAAWR2")
//remove();
//element .text('OK!').addClass('valid').closest('.control-group').removeClass('error')//.addClass('success'); 
//$("#CanadaCase-Form .error").remove();
//$("#CanadaCase-Form label").removeClass("error valid");


})
	
	
}); //End of Document.