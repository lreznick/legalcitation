/* CPSC 301- ASSIGNMENT 1: Stephen Huang
January 17,2012
Testing Function- Tests each function with different parameters in a1
*/

//========================= PART 3- TESTING ================================
var a1 = require('./a1.js')
var assert = require ('assert');

// time_between_in_words
console.log("====\nTesting Function: time_between_in_words");
assert.equal(a1.time_between_in_words(new Date(2000,1,1), new Date(2011,1,1)), "11 Years");
assert.equal(a1.time_between_in_words(new Date(2000,1,1), new Date(2001,1,1)), "1 Year");
assert.equal(a1.time_between_in_words(new Date(0), new Date(18000000)), "5 Hours");
assert.equal(a1.time_between_in_words(new Date(0), new Date(300000)), "5 Minutes");
assert.equal(a1.time_between_in_words(new Date(0), new Date(0)), "Less than a minute");
assert.equal(a1.time_between_in_words(new Date(), new Date()), "Less than a minute");

// time_ago_in_words
console.log("===\nTesting Function: time_ago_in_words");
assert.equal(a1.time_ago_in_words(new Date(0)), "43 Years");
assert.equal(a1.time_ago_in_words(new Date(2000,1,1)), "12 Years");
assert.equal(a1.time_ago_in_words(new Date()), "Less than a minute");


// substitute
console.log("===\nTesting Function: substitute");
assert.equal(a1.substitute("Hello {{name}}. The time is {{time}}", {name:"Jim",time:"10:50"}),"Hello Jim. The time is 10:50");
assert.equal(a1.substitute("Hello {{name}}. The time is {{time}}", {name:"Jim"}),"Hello Jim. The time is {{time}}");
assert.equal(a1.substitute("Hello {{name}}. The time is {{time}}", {names:"Jim",times:"10:50"}),"Hello {{name}}. The time is {{time}}");
assert.equal(a1.substitute("Hello {{name}} {{name}} {{name}}", {name:"Jim"}),"Hello Jim Jim Jim");
assert.equal(a1.substitute("Hello", {names:"Jim",times:"10:50"}),"Hello");

// open_and_substitute
console.log("===\nTesting Function: open_and_substitute");
a1.open_and_substitute("sample.txt",{name:"Jim",time:"10:50 pm"}, function(result) {assert.equal(result,"Hello Jim. The time is 10:50 pm")});
a1.open_and_substitute("sample.txt",{name:"Jim"}, function(result) {assert.equal(result,"Hello Jim. The time is {{time}}")});
//assert.equal(open_and_substitute("sample.txt", {name:"Jim",time:"10:50"}, function(result){}),"Hello Jim. The time is 10:50");

//prototypes
console.log("===\nTesting Prototype: Date");
var date1 = new Date();
var date2 = new Date();
assert.equal(date2.time_between_in_words(date1), "Less than a minute");
assert.equal(date1.time_ago_in_words(), "Less than a minute");

console.log("===\nTesting Prototype: String");
assert.equal('Hello {{name}}. The time is {{time}}'.substitute({name:'Jim'}),"Hello Jim. The time is {{time}}");
assert.equal('Hello'.substitute({name:'Jim'}),"Hello");


