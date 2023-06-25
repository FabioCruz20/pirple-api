/**
 * Primary file for the API
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// Server
const server = http.createServer(function(req, res) {

  // Get the URL and parse it
  let parsedUrl = url.parse(req.url, true);

  // Get the path from the URL
  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  let queryStringObject = parsedUrl.query;

  // Get the HTTP method
  let method = req.method.toLowerCase();

  // Get the headers as an object
  let headers = req.headers;

  // Get the payload, if any
  let decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', function (data) {
    buffer += decoder.write(data);
  });
  req.on('end', function() {
    buffer += decoder.end();

    // Send the response
    res.end('Hello World\n');
  
    // Log the request path
    console.log('Request received on path:', trimmedPath, 
      'with method:', method, 
      'with these query string parameters:', queryStringObject,
      'with headers:', headers,
      'with payload:', buffer);
  });

});

// Start server on port 3000
server.listen(3000, function() {
  console.log('The server is listening on port 3000');
});
