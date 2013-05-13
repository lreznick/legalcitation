var http = require('http')

var options = {
  host: 'www.w3.org',
  port: 80,
  path: '/standards/about.html',
  method: 'GET'
}

//create a request object (passing in some objects)
var request = http.request(options)

// set up an event listener to handle a response
// 'response' = name of response
request.on('response',function(response){
  // when a response is received, its gonna call function (response)
  
  
  // we are expecting utf8 encoded data
  response.setEncoding('utf8')
  
  // set up an event listener to be called when each chunk of data arrives
  response.on('data', function(chunk){
    console.log(chunk)
  })

  // set up an event listener to be called when
  response.on('end', function(){
    console.log('DONE')
  })
})

// set up an event listener to handle any error
request.on('error',function(e) {
  console.log('error: ' + e.message)
})

//complete the request
request.end()
