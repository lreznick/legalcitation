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
        "Please check your input."
	);
	 
	
	//hiding all forms 
	//jQuery("#hidden-forms").hide();
	jQuery("#result-container").hide();
	//jQuery("#GoButton").hide();
	jQuery("#stackednavs").hide();
	
/*
=============================================
Form Submissions
=============================================
*/		

	// Submit a form when the go button for canada case is submitted.
	//	Then reloads the page to display the contents
	// Probably Remove *************
	jQuery("#ContinueButton").click(function() {
            var input_string = jQuery("input#CanadaCaseStyle").val();
            console.log("input"+ input_string);
            jQuery.ajax({ 
                type: "POST", 
                data:{styleofcause : input_string},
                success: function(data) {
                    console.log("WE DID IT!"); console.log(data);
                    jQuery('#ContinueButton').hide();
					jQuery('#hidden-forms').fadeIn(400);
					jQuery('#GoButton').fadeIn(400);
					
                },
			});
			console.log(input_string); return false; 
	});
		
		//Submitting the information to the server to be processed
	jQuery('#GoButton').click(function() {
            var input_string = jQuery("input#CanadaCaseStyle").val();
            console.log("input"+ input_string);
            jQuery.ajax({ 
                type: "POST", 
                data:{styleofcause : input_string},
                success: function(data) {
					jQuery('#result-container').hide().fadeIn(200);
					jQuery('#results').html(data).hide().fadeIn(400);
                },
			});
			console.log(input_string); return false; 
	});
		
		// 
/*
=============================================
Tool Tips
=============================================
*/	
var tooltip_header              = "<div class=\"header3\">"
var tooltip_styleOfCause	    = tooltip_header + "Style of Cause     </div> ex. Dunsmuir v New Brunswick. <br> Input the style of cause as you see it on the case (i.e. the names of the parties or the reference name). <br> Don't worry about periods or formatting, just capitalize words that you particularly want capitalized (like \"AOL News\"). "
var tooltip_parallelCitation	= tooltip_header + "Parallel Citations </div> ex. 2008 SCC 9 (CanLII); [2008] 1 SCR 190; 229 NBR (2d) 1; 291 DLR (4th) 577; 64 CCEL (3d) 1; 69 Admin LR (4th) 1 <br> Input the abbreviated reporter names instead of the full names (ex. WWR (4d) instead of Western Weekly Reports, Fourth Series). Browse through our catalog and click to input a reporter's abbreviation if you don't know it. <br>Note that case citations require two reporters, unless there is only one available. Intra Vires will choose the best two for you. <br>Separate reporters by commas or semicolons. <br>Don't worry about periods or formatting, Intra Vires will figure it out. <br>"
var tooltip_date	                = tooltip_header + "Year                  </div> ex. 2008 <br>You only need the year of the decision. If you input the day, month, and year, as in \"06-15-1990\" or \"June 15, 1990,\" Intra Vires will select out the year for you. <br>"
var tooltip_court                 = tooltip_header + "Court                 </div> ex. supreme court of canada or SCC <br>Input the abbreviated name if you know it, or the jurisdiction and court and Intra Vires will format it correctly depending on what information is already present in the parallel citations. <br>"
var tooltip_pinpoint            = tooltip_header + "Pinpoint             </div> ex. \"para 132\" <br>Use paragraph numbers where available, be sure to tell us you are doing so. <br>ex. \"SCR 205\" <br>If you are using page numbers, be sure to input the reporter you are citing to."
var tooltip_citeTo 	            = tooltip_header + "Cite To              </div> ex. SCR <br>If you are not pinpointing the case now, but you will later on in your paper, you need to tell the reader which reporter you will be citing to in the future. Input the abbreviated reporter you will be citing (ex. SCR). <br>"
var tooltip_history 	            = tooltip_header + "History              </div> Affirming or Reversing <br> ex. \"(2006), 297 NBR (2d) 151 (NBCA)\" or \"2006 NBCA 27\" <br>Input the citation for the lower court case that was cited. Here, only one reporter is required. <br>No style of cause is required. <br>Affirmed or Reversed <br>ex. 2008 SCC 9 (CanLII); [2008] 1 SCR 190 <br>Input two citations, separated by commas or semicolons. <br> "
var tooltip_leaveToAppeal    = tooltip_header + "Leave To Appeal </div> Requested: input the court. <br>ex. \"SCC\" <br>Granted: input the court and where the case will be cited. <br> ex. \"SCC, [2008] 1 SCR xiv\" or <br>Refused: input the court and docket number <br>ex. \"SCC, 23424 (November 20, 2009)\". <br>As of right: input the court. <br>ex. \"SCC\" "
var tooltip_judge 				= tooltip_header  + "Judge                </div> ex. Binnie J <br>CJC = Chief Justice of Canada <br>CJA = Chief Justice of Appeal <br>CJ = Chief Justice <br>JA = Justice of Appeal <br>JJA = Justices of Appeal <br>J = Justice <br>JJ = Justices <br>Mag = Magistrate <br>"
var tooltip_subNom     		= tooltip_header  + "Sub nom           </div>  ex. DLR (4th), The Achilleas <br>Input only if the case is referred to by another name in the reporter you have inputted.<br>"
var tooltip_shortForm     		= tooltip_header  + "Short Form         </div> ex. Dunsmuir <br>If you'll refer to this judgement by a shortened form later in your paper, input it here. It is normally the first party name. <br>"
var tooltip_citing         		= tooltip_header  + "Citing               </div>  ex. Crevier v AG Quebec, [1981] 2 SCR 220; [1981] 127 DLR (3d) 1 <br>Input the style of cause and two citations, separated by semicolons or commas. <br> Use this if the main judgement cites a passage from another case, in order to give authority to the original passage. <br>"


//jQuery('#tooltips').html(tooltip_styleOfCause);

 jQuery('#CanadaCaseStyle').focus(function(){
	jQuery('#tooltips').html(tooltip_styleOfCause);
});
jQuery('#CanadaCaseParallel').focus(function(){
	jQuery('#tooltips').html(tooltip_parallelCitation);
});
jQuery('#CanadaCaseDate').focus(function(){
	jQuery('#tooltips').html(tooltip_date);
});
jQuery('#CanadaCaseCourt').focus(function(){
	jQuery('#tooltips').html(tooltip_court);
});

jQuery('#CanadaCaseShortForm').focus(function(){
	jQuery('#tooltips').html(tooltip_shortForm);
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

	// Validates the form to check if a form works or not
	// Note: rules are based on name of form
		jQuery('#canadacase-form').validate({
			rules: { 
				styleofcause: {
					minlength: 2,
					maxlength:250,	
					//regex: "^(\\d{3})TN(\\d{4})$" , //detects sentences starting with a capital and then has lowercase letters and spaces					
					//regex: "^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$", //0-999
					required: true 
				},
				prallel: {
					maxlength:250,	
					//regex: "^(\\d{3})TN(\\d{4})$" , //detects sentences starting with a capital and then has lowercase letters and spaces					
					//regex: "^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$", //0-999
					required: true 
				},
				date: {
					maxlength:250,	
					//regex: "^(\\d{3})TN(\\d{4})$" , //detects sentences starting with a capital and then has lowercase letters and spaces					
					//regex: "^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$", //0-999
					required: true 
				},

				court: {
					maxlength:250,	
					//regex: "^(\\d{3})TN(\\d{4})$" , //detects sentences starting with a capital and then has lowercase letters and spaces					
					//regex: "^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$", //0-999
					required: true 
				},

			},
			highlight: function(element) {
				console.log("in highlight");
				jQuery(element).closest('.control-group').removeClass('success').addClass('error');
			},
			unhighlight: function(element) {
				console.log("in highlight");
				jQuery(element).closest('.control-group').removeClass('success').addClass('error');
			},
			
			success: function(element) {
				console.log("in success");			
				element .text('OK!').addClass('valid').closest('.control-group').removeClass('error')//.addClass('success'); 
			},
			messages: { 
				styleofcause: {
					minlength: "too short",
					maxlength: "Maximum length: 250 characters",
					//regex: "regex not working",
					required: "You gotta do it bruh"
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
				console.log("in highlight");
				jQuery(element).closest('.control-group').removeClass('success').addClass('error');
			},
			success: function(element) { 
				element .text('OK!').addClass('valid')
					.closest('.control-group').removeClass('error').addClass('success'); 
			},
			messages: { 
				name: {
					minlength: "too short!",
					required: "You gotta do it bruh"
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
Pagination
=============================================
*/		
	jQuery("#reporters-list").children().hide();
	
	
	jQuery("a.reporters-pagination").click(function() {
			//var id = jQuery(elem).attr("className");
			var id = jQuery(this).text(); // grab the letter
			jQuery("#reporters-list").children().hide();
			jQuery('#reporters-list-'+id).fadeIn(0);
			jQuery('#reporters-list-b').fadeIn(0);
			console.log("variable id " + id);
               
			});
	
	
	
}); //End of Document