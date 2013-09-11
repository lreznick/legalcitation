/* ---------

ACCOUNT 
---- */

jQuery("#editAccount-btn").click(function(){
	var occupation = jQuery('#accountOccupation').html()
	jQuery('#occupations option').each(function(i){
		if (jQuery(this).text() == occupation){
			jQuery(this).prop('selected',true);
		}

	})

})