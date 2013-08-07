/*
=============================================
Validations 
=============================================
*/		
	var regex_style 		= /^[\wa-zA-Z0-9-.,;:'!@#$%^&()<>-ﬂƒ÷‹‰ˆ¸—Ò…È»Ë¡·¿‡¬‚YCcGgy Í‘Ù€˚Ww\s]*$/
	var regex_parallel 	= /^[a-zA-Z0-9-.,;'&()…È»Ë¡·Ù\[\]\s]*$/
	var regex_year 		= /(1[4-9][0-9]{2}|200[0-9]{1}|201[01234]{1})/
	var regex_digits 	=/^\d+$/
<<<<<<< HEAD
	var regex_court 		=/^[a-zA-Z\s.()-È…»ËÓŒÙ‘¡·¿‡¬‚&]*$/
	var regex_judge		=/^[a-zA-Z\s.È…»ËÓŒÙ‘¡·¿‡¬‚]*$/
=======
	var regex_court 		=/^[a-zA-Z\s.()-È…»ËÓŒÙ‘¡·¿‡¬‚]*$/
	var regex_judge		=/^[a-zA-Z-\s.È…»ËÓŒÙ‘¡·¿‡¬‚]*$/
>>>>>>> d693cef55271b22b46189f7bfe1e9639664757cf
	
	 jQuery.validator.addMethod(
		"regex3",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
	);
	
/*	
		jQuery('#CanadaCaseCourt').blur(function(){
			var courtVal = jQuery(this).val();
			if (courtVal != ""){			
            jQuery.ajax({ 
                type: "POST", 
				url: '/form/court',
                data:{court : courtVal},
				dataType: 'json',
                success: function(data) {
					if (data[0].valid == true){
						
						jQuery('#CanadaCaseCourt').val(data[0].court)
					}
					else{
						console.log("else");
					}
					//jQuery('#CanadaCaseDate').val(data[0].date)
					//jQuery('#CanadaCaseCourt').val(data[0].court)
					console.log("hooray!")
				}
			});
			}
		});
	*/
	jQuery.validator.addMethod("validateCourt", function(value, element)
	{

    var inputElem = jQuery("#"+element.id),
        data = { court : inputElem.val() },
        eReport = ''; //error report

    jQuery.ajax(
    {
        type: "POST",
        url: '/form/court',
        dataType: "json",
        data: data,
        success: function(data)
        {
		
		if (data[0].valid == true){
				inputElem.val(data[0].court)
				console.log("in validate court")
				return true
		}
		else{
				console.log("else");
				return 'something wrong'
		}
		
			/*
            if (data !== 'true')
            {
              return '<p>This email address is already registered.</p>';
            }
            else
            {
               return true;
            }*/
        },
        error: function(xhr, textStatus, errorThrown)
        {
            //alert('ajax loading error... ... '+url + query);
			console.log('error in court');
            return false;
        }
    });

}, '');//'The court entered was not detected as a valid court'); 

//$(':input[name="email"]').rules("add", { "validateCourt" : true} );	
	
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
					validateCourt: true,
					required: true,
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
