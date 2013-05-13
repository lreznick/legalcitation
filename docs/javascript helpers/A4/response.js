
/* CPSC 301- ASSIGNMENT 4: Stephen Huang
February 8,2012
A Simple server that manages images in a directory. The server can perform 3 tasks:
  1)  List the images available for download. An HTTP GET request with path of '/Action/list' will trigger this response.
  2) Download an image. An HTTP GET request with path of '/Files/image.jpg' will send the file 'image.jpg' to the client.
  3) Upload an image. An HTTP POST request with path of '/Files/image.jpg' will contain binary data in its body that will be saved as 'image.jpg' on the server.

How to use Curl: 
Log into directory containing curl and open terminal. The following example options are available:
1)curl -G http://csc.cpsc.ucalgary.ca:8124/Action/list
2)curl -G http://csc.cpsc.ucalgary.ca:8124/Files/sun.jpg > out.jpg
3) curl --data-binary "@wall.png" http://csc.cpsc.ucalgary.ca:8124
*/


var http = require ('http'),
    util = require('util'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');    
    
//create a server object
var server = http.createServer(); 

// Open the server and deal with the request and response. Finds the path 
server.on('request', function(request, response) {
  var pathName = url.parse(request.url).pathname;
  var fullPath = path.join(process.cwd(), pathName);
  log ('request', request, ' request recieved: ', pathName);
//-------------------POST ------------------------------
  if (request.method == 'POST') {
	   postHandler(fullPath, response, request, pathName);	       
  }
//-------------------GET ------------------------------  
  else if (request.method == 'GET'){
	   getHandler(fullPath, response, request,  pathName);
  } 
});  

//Post handler: Handles all POST requests
// Post requests allowed: Files/<image.jpg>
function postHandler(fullPath, response, request, pathName){    
		var match; 
		// Test for Files/<image>  
		if ((match = (/\/Files\/([\w+\.]+)/).exec(pathName)) != null){
		  postFiles(fullPath, response, request, match);
		}
	  else{
			log('error', request, 'Unknown action requested: ' , pathName);
			writeError('Unknown action requested: ' , pathName, response);
	    response.end();
	   }

}
// Handlers for the "Files" post
function postFiles(fullPath, response, request, match){
        request.setEncoding('binary');
        request.body = [];        
        request.on('data', function (chunk) {
           request.body += chunk;
        });
        
        request.on('end', function () {
          fs.writeFile(fullPath, request.body, 'binary', function(err){
            if (err){ throw err};
            log('action', request, 'Writing of the file complete: ' , fullPath);
            response.writeHead(200, {'content-type':'text/plain'}); 
		  	    response.write("\nFile Successfully Uploaded ");
  	  	  	response.end();
  	  	  	//updateList(); Optional
          });
        });
}

//GetHandler: Handles all GET requests
//GET requests allowed: Action/list, Files/<image.jpg>
function getHandler(fullPath, response, request, pathName){       
		var match;   
		path.exists(fullPath, function (exists){
			if(!exists){
          log('error', request, 'Unknown Url: ', pathName);
			    writeError('Unknown Url: ', pathName, response);
			    response.end();
			}
			else{
				// if (pathName == "/Action/list"){
			  if((match = (/\/Action\/([\w+\.]+)/).exec(pathName)) != null){
			  	getAction(fullPath,response,match);
		  	}
			  // if (pathName == "/Files/..."){
			  else if ((match = (/\/Files\/([\w+\.]+)/).exec(pathName)) != null){
					getFiles(fullPath,response, request, match);
			  }
			}
		});
}
//The GET Action Handler
function getAction( fullPath, response,match){
    if( match[1] == 'list'){
        updateList(fullPath, response);	
    }
}

/* Deal with the Get request to download a photo.
   The function asynchronously opens a readstream and reads the image from the directory. It then  	  	   
   writes chunks of data back to the user. Once it is done writing, it sends the full image back to the user.  
*/
function getFiles( fullPath, response, request, match){  	  
          var rs = fs.createReadStream(fullPath);
          rs.setEncoding('binary');
          
          response.writeHead(200, {'content-type':'image/jpg'});     
          rs.on('data', function (chunk){
            response.write(chunk, 'binary');
          });  
          
          rs.on('end', function(){
            //response.write(file, "binary");  
            response.write("\nFile Successfully Downloaded");
		  	    log('action', request, 'File Successfully Downloaded to client: ', fullPath);
		  	    response.end();

  		  	}); 
      
}
/*
UpdateList checks the directory ./Files.
 If any relevant files are within the directory, they are listed back to the request.
*/
function updateList(fullPath, response){
    fs.readdir('./Files', function(err, fileList) {
    if (err){ 
      writeError('The directory "Files" does not exist! \n Cannot list :( \n', fullPath, response);
      response.end();
    }
    else {
      response.writeHead(200, {'content-type':'text/plain'}); 
	    response.write("\n::Available Files::\n" );
        var i=0;
       	while(fileList[i] != null){
            response.write(fileList[i]+ "\n");   
            i++;
       }
	    response.end();
	}
    });
}

// Logs any relevant error messages to the client
function writeError( string, pathName, response){
        response.writeHead(400, {'content-type':'text/plain'}); 
		  	response.write(string + pathName + "\n");
  	  	response.end();
}

// Logs any relevant information to the server
function log(type, request, string, fullPath){
	if (type == 'request'){
			util.log(request.method + string + fullPath);  
	}
	else if (type == 'error'){
		util.log( string + fullPath);  
	} 
	else if (type == 'action'){
		util.log( string + fullPath);
	}
}

//start the server to listen
server.listen(8124)
