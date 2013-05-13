   1. var sys = require("sys"),  
   2.     http = require("http"),  
   3.     url = require("url"),  
   4.     path = require("path"),  
   5.     fs = require("fs");  
   6.   
   7. http.createServer(function(request, response) {  
   8.     var uri = url.parse(request.url).pathname;  
   9.     var filename = path.join(process.cwd(), uri);  
  10.     path.exists(filename, function(exists) {  
  11.         if(!exists) {  
  12.             response.sendHeader(404, {"Content-Type": "text/plain"});  
  13.             response.write("404 Not Found\n");  
  14.             response.close();  
  15.             return;  
  16.         }  
  17.   
  18.         fs.readFile(filename, "binary", function(err, file) {  
  19.             if(err) {  
  20.                 response.sendHeader(500, {"Content-Type": "text/plain"});  
  21.                 response.write(err + "\n");  
  22.                 response.close();  
  23.                 return;  
  24.             }  
  25.   
  26.             response.sendHeader(200);  
  27.             response.write(file, "binary");  
  28.             response.close();  
  29.         });  
  30.     });  
  31. }).listen(8080);  
  32.   
  33. sys.puts("Server running at http://localhost:8080/");  
