var http = require('http'), 
    sys = require('sys'); // for the system

//Everytime a client connects, this function will be called
// request object and response object
var server = http.createServer(function (request, response) {
  response.writeHead(200, {'content-type':'text/plain'}) //indicates success, response we are returning back is just plain text
  response.write('Hello World')
  response.end()
  
}) 

server.listen(8124) // Passes in port number. 

//http://csc.cpsc.ucalgary.ca:8124/
