/* CPSC 301- ASSIGNMENT 1: Stephen Huang
January 17,2012
*/


//========================= PART 1- FUNCTIONS ========================


/*Returns a String describing the approximate amount of time that has elapsed between the from_date to the to_date. This description should be in a human readable form (e.g., '1 minute', '3 hours', '2 days', '1 week', '6 months' or '25 years'). 
Parameters:
from_date - a Date object to use as the start time
to_date - a Date object to use as the end time
*/

exports.time_between_in_words = time_between_in_words;
exports.time_ago_in_words =  time_ago_in_words;
exports.substitute= substitute;
exports.open_and_substitute = open_and_substitute;


function time_between_in_words(d1,d2){
    var diffyear = d2.getFullYear()-d1.getFullYear();
    var diffmonth = d2.getMonth()-d1.getMonth();
    var diffday = d2.getDay()-d1.getDay();
    var diffhour = d2.getHours()-d1.getHours();
    var diffminute = d2.getMinutes()-d1.getMinutes();
    var diff = d2-d1;
    var returnstring;

    if (diff < 0){
        console.log("Parameters are not correct. Please Try Again");
    }
    else{
    //Test the Year 
        if (diffyear > 0){
            if (diffyear ==1){ console.log(diffyear + " Year"); return( diffyear + " Year");}
            else{ console.log(diffyear + " Years");return( diffyear + " Years");}
        }
        //Test the Month
        else if ( diffmonth >0){
              if (diffmonth ==1){ console.log( diffmonth+ " Month"); return( diffmonth+ " Month");}
              else{ console.log( diffmonth+ " Months"); return( diffmonth+ " Months");}
        }
        //Test the Days
        else if ( diffday >0){
              if (diffday ==1){ console.log( diffday+ " Day");return( diffday+ " Day");}
              else{ console.log( diffday+ " Days");return(diffday+ " Days");}    
        }
        //Test the Hours
        else if ( diffhour >0){
              if (diffhour ==1){  console.log( diffhour + " Hour");return(diffhour + " Hour");}
              else{ console.log( diffhour + " Hours");return(diffhour + " Hours");}    
        }    
        //Test the Minutes
        else if ( diffminute >0){
              if (diffminute ==1){ console.log( diffminute+ " Minute");return(diffminute+ " Minute");}
              else{ console.log( diffminute+ " Minutes");return(diffminute+ " Minutes");} 
        }    
        else {
                console.log( "Less than a minute");
                return("Less than a minute");
        }
    }
}

//Like time_between_in_words, except that to_date is set to now.
function time_ago_in_words(date){
	return(time_between_in_words(date, new Date()));
}

/*Returns a new String that is the result of substituting values into a template. Any variables in the template (indicated by curly brackets) are replaced 
with values from the replacements object. Hint: have a look at RegEx support in JavaScript.
*/

function substitute(template, rObject){
 //console.log("Original String: "+ template);
 var re = /{{(\w+)}}/g; // our regular expression to find  {{ word }}
 var match;
 var newstring = template;
  // Run through the string. When the end of the string has been reached, terminate
 while ( (match = re.exec(template)) != null) {
     if (rObject[match[1]] == undefined){
      // Do nothing
            //console.log("undefined! " + match[1]);
     }
     else {
        // Take {{ word }} ->  word, and find it in rObject. Set it as the replacement
      var replacestring = rObject[match[1]]; 
        // Replace the string
      newstring = newstring.replace(match[0],replacestring);       
     }
    }
   // console.log("Final String: "+ newstring);
  return newstring;
}

/*Like the above substitute function, but reads the template String from a file. */
function open_and_substitute(path, rObject, func){
  var fs = require('fs');
  fs.readFile(path,'utf8',function(err, content){
    if (err){
	  throw err;      //Handle Error
    }
    var newstring = substitute(content,rObject);    
    func(newstring);
   });
}



//========================= PART 2- USE OF PROTOTYPES =====================

Date.prototype.time_between_in_words= function(d2){ 
return(time_between_in_words( this, d2));
}

Date.prototype.time_ago_in_words = function(){
return(time_ago_in_words(this));
}

String.prototype.substitute = function(replaceObject){
return (substitute(this,replaceObject));
}        

