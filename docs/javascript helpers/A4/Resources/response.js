var http = require ('http')
    util = requiere('util')

//create a server object
var server = http.createServer() 

//everytime a request is receieved, this is called
server.on('request', function(request, response) {
   util.log(request.method + ' ' + request.url)
   
   // header information: <status code> (200 = ok), <header info>
   response.writeHead(200, {
      'Content-Type':'text/html', // Tells client body contains html
      'Connection':'close' // tells the client when were done,connection should be closed
   }) 
   
   response.write() //
   //INSERT HTML
   //INSERT HTML
   response.end()
})

//start the server to listen
server.listen(8123)
