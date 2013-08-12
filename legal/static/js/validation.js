
/*
=============================================
Validations -- see http://en.wikipedia.org/wiki/List_of_Unicode_characters
=============================================
*/		
	var regex_style 	= /^[\u0020-\u003B\u00A5\u00C0-\u00FF\u0040-\u007E\u00A3]*$/
	var regex_parallel 	= /^[a-zA-Z0-9-.,;'&!()\]\[\u00E9\u00E8\u00C9\u00C8\u00C1\u00E1\u00F4\s]*$/
	var regex_year 		= /(1[4-9][0-9]{2}|200[0-9]{1}|201[01234]{1})/
	var regex_digits 	=/^\d+$/
	var regex_court 	=/^[a-zA-Z\s.()-\u00E9\u00E8\u00C9\u00C8\u00C1\u00E1\u00F4]*$/
	var regex_judge		=/^[a-zA-Z-'\s.\u00E9\u00E8\u00C9\u00C8\u00C1\u00E1\u00F4]*$/
	var regex_pincite 	=/^[\d,-\s]*$/

/*
=============================================
UK Validator
=============================================
*/			
var UKCaseValidator = jQuery('#UKCase-Form').validate({
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
					validateCourt: true,
					required: true,
				},
				shortform: {
					maxlength:100,	
					regex: regex_style,
				},
				pincite_input:{
					maxlength:10,	
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
					regex: regex_parallel,
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
				},
	
			}
		});


/*
=============================================
US Validator
=============================================
*/			
var USCaseValidator = jQuery('#USCase-Form').validate({
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
					validateCourt: true,
					required: true,
				},
				shortform: {
					maxlength:100,	
					regex: regex_style,
				},
				pincite_input:{
					maxlength:10,	
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
					regex: regex_parallel,
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
				},
	
			}
		});
	

var BookValidator = jQuery('#Book-Form').validate({
			//ignore: ".search-query",
			rules: { 
				styleofcause: { 
					maxlength:500	
				}					
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
					maxlength: "Maximum length: 20 characters.",
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
					maxlength:20,
					regex: regex_year,					
					required: true 
				},
				pinpoint_form1: {
					maxlength:20,
					regex: regex_pincite,										
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
				styleofcause: {
<<<<<<< HEAD
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
					required: " ",
					remote: "The court you entered was invalid"
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
=======
>>>>>>> aa5a63a2b1cef4165de1b3937ca61f01eb4cfce2
					maxlength: "Maximum length: 250 characters.",
				},
<<<<<<< HEAD
=======
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
					required: " ",
					remote: "The court you entered was invalid"
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
>>>>>>> aa5a63a2b1cef4165de1b3937ca61f01eb4cfce2
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


/*
=============================================
CanadaCaseValidator
=============================================
*/		
	
	// Validates the form to check if a form works or not
	// Note: rules are based on name of form
	var CanadianCaseValidator = jQuery('#CanadaCase-Form').validate({
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
					validateCourt: true,
					required: true,
				},
				shortform: {
					maxlength:100,	
					regex: regex_style,
				},
				pincite_input:{
					maxlength:10,	
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
					regex: regex_parallel,
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
					maxlength: "Maximum length: 20 characters.",
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
		jQuery('#Canlii-Form').validate({
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
CanadaCaseValidator
=============================================
*/		
	
	// Validates the form to check if a form works or not
	// Note: rules are based on name of form
	var USCaseValidator = jQuery('#USCase-Form').validate({
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
					validateCourt: true,
					required: true,
				},
				shortform: {
					maxlength:100,	
					regex: regex_style,
				},
				pincite_input:{
					maxlength:10,	
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
					regex: regex_parallel,
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
					maxlength: "Maximum length: 20 characters.",
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
