/*Returns a String describing the approximate amount of time that has elapsed between the from_date to the to_date. This description should be in a human readable form (e.g., '1 minute', '3 hours', '2 days', '1 week', '6 months' or '25 years'). 
Parameters:

from_date - a Date object to use as the start time
to_date - a Date object to use as the end time

*/

exports.time_between = time_between_in_words;
function time_between_in_words(d1,d2){
    var diffyear = d2.getFullYear()-d1.getFullYear();
    var diffmonth = d2.getMonth()-d1.getMonth();
    var diffday = d2.getDay()-d1.getDay();
    var diffhour = d2.getHours()-d1.getHours();
    var diffminute = d2.getMinutes()-d1.getMinutes();
    var diff = d2-d1

    if (diff < 0){
        console.log("Parameters are not correct. Please Try Again")
    }
    else{
    //Test the Year 
        if (diffyear > 0){
             console.log(diffyear + " Years")
        }
        //Test the Month
        else if ( diffmonth >0){
                 console.log( diffmonth+ " Months")
        }
        //Test the Days
        else if ( diffday >0){
                 console.log( diffday+ " Days")
        }
        //Test the Hours
        else if ( diffhour >0){
                 console.log( diffhour + " Hours")
        }    
        //Test the Minutes
        else if ( diffminute >0){
                 console.log( diffminute+ " Minutes")
        }    
        else {
                console.log( "Less than a Minute")
        }
    }
}

function time_ago_in_words(date){
	time_between_in_words(date, new Date());
}

/*Returns a new String that is the result of substituting values into a template. Any variables in the template (indicated by curly brackets) are replaced 
with values from the replacements object. Hint: have a look at RegEx support in JavaScript.
look up "...".replace(regex, replace)
*/
//'Hello {{name}}. The time is {{time}}', {name:'Jim'}

function substitute(template, rObject){
	var re = /{{(\w+)}}/g;
  var match;
  console.log("TEMPLATE " + template);
  var newstring = template;
 while ( (match = re.exec(template)) != null) {

     if (rObject[match[1]] == undefined){
      // Do nothing
      console.log("undefined! " + match[1]);
     }
     else {
      console.log(" MATCH:: " + match[0] +" "+ match[1]+ " " , newstring);
      var replacestring = rObject[match[1]]; 
//      newstring = newstring.replace(re,replacestring);
      newstring = newstring.replace(match[0],replacestring);       
     }
      console.log("Final String: "+ newstring);
      console.log(" =========== \n ===========");
    }
  return newstring;
}


function open(path, rObject, func){
  var fs = require('fs');
  fs.readFile(path,'utf8',function(err, content){
    if (err){
      //Handle Error
    }
    var string = content;
    console.log(content + " " + string);
    var newstring = substitute(string,rObject);    
    
    console.log(newstring);
    func(newstring);
  });
  /*
  onChunk(){

  }
  
  finish(){
    fs.close();
  }
  */
}



var da1 = new Date(2000,1,1);
var da2 = new Date(2011,1,1);

/*time_between_in_words(da1,da2);

time_ago_in_words(new Date());
time_ago_in_words(da1);

substitute("Hello {{name}}. The time is {{time}}", {name:"Jim",time:"timeskies"});
*/open("sample.txt",{name:"Jim",time:"10:50 pm"}, function(result){});

