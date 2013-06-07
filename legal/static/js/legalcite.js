    // <!-- input#input01 accesses the input of id input01 -->
jQuery(document).ready(function() {
	 
 //Initial Setup
	 
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
	jQuery("#hidden-forms").hide();
	jQuery("#result-container").hide();
	jQuery("#GoButton").hide();
	jQuery("#stackednavs").hide();
	
// Functional methods

	// Submit a form when the go button for canada case is submitted.
	//	Then reloads the page to display the contents
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
		
		//For the second part of the form submission
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
		
		
	// Validates the form to check if a form works or not
	// Note: rules are based on name of form
		jQuery('#canadacase-form').validate({
			rules: { 
				styleofcause: {
				    regex: "^[a-zA-Z'.\\s]{1,40}$",	 
					minlength: 4,
					required: true 
				},

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
				CanadaCaseStyle: {
					minlength: "too short!",
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
	});
