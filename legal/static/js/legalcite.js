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
Tool Tips -- Remove 
=============================================
*/	
var tooltip_styleOfCause	 = "<div class=\"header3\"> Style of Cause </div> look at me I'm a tool tip! hooray! <br> lasdlkfjl <br>asdfasdfasdf"
var tooltip_parallelCitation	 = "LLLLook at me I'm a tool tip! hooray!"
var tooltip_date	 = "look at me I'm a tool tip! another tooltip!"
jQuery('#CanadaCaseStyle').focus(function(){
	jQuery('#tooltips').html(tooltip_styleOfCause).fadeIn(1000);
});
jQuery('#CanadaCaseParallel').focus(function(){
	jQuery('#tooltips').html(tooltip_parallelCitation).fadeIn(1000);
});

/*
=============================================
Validations 
=============================================
*/		
jQuery('#tooltips').html(tooltip_styleOfCause);
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