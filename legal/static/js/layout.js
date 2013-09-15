  jQuery(document).ready(function() {
  
  var registerValidator = jQuery('#registerForm').validate({
			//ignore: ".search-query",
			rules: { 
				username: { 
					maxlength:100, 
					email: true,
					required: true 
				},
				password: { 
					minlength:5,
					maxlength:100,
					required: true
				},
				password_again: { 
					minlength:5,
					maxlength:100,
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
				username: { 
					maxlength: "Maximum length: 100 characters.",
					required: "Your email is required! "
				},
				password: { 
					minlength: "Your password must be at least 5 characters long",
					required: "You need to input a password!"
				},
				dictionary_word: { 
					minlength: "Your password must be at least 5 characters long",
					required: "You need to input a password!"
				},		
			}
		});	
		
		
		
		
		
		
});