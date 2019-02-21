var http = require('http');
var fs = require('fs');
var url = require('url');

var ContentType = require('./server/content_type')
var contentType = new ContentType();

http.createServer(function(request,response){

    var pathname = url.parse(request.url).pathname;

    var type = contentType.getType(pathname);

    fs.readFile(pathname.substr(1), function (err, data) {
       if (err) {
          console.log(err);
          response.writeHead(404, {'Content-Type': 'text/html;charset=UTF-8'});
       }else{             
          // HTTP 状态码: 200 : OK
          // Content Type: text/plain
          response.writeHead(200, {'Content-Type': type});    
          
          if(pathname.endsWith('.png')||pathname.endsWith('.jpg')){
             response.write(data,'binary');   
             
          }else{
             response.write(data);  
          }
            
       }
       //  发送响应数据
       response.end();
    });  

}).listen(3000);

console.log('start server');