var http = require('http');
var fs = require('fs');
var path  = require('path');

var htmlStream = fs.createReadStream(__dirname+"/../pages/Main.html",'utf8'),
    cssStream = fs.createReadStream(__dirname+"/../css/style.css",'utf8'),
    bootstrapStream = fs.createReadStream(__dirname+"/../sources/bootstrap/bootstrap.js",'utf8');

var css,js,html,bootstrapJs ;
cssStream.on('data',function(chunk){
   css = chunk;
});

htmlStream.on('data',function (chunk) {
    html = chunk;
});

bootstrapStream.on('data',function (chunk) {
    bootstrapJs = chunk;
});





var server = http.createServer(function(req,res){
    console.log("URL: "+req.url);
  //  console.log('Method: '+req.method);
    //console.log('Headers: '+req.headers);
    console.log(req.url.includes('images'));

    if(req.url.includes("/sources/bootstrap/")){
        console.log('Include /sources/bootstrap: '+req.url.includes("/sources/bootstrap/"));
        res.writeHead(200,{'Content-Type':'text/javascript; charset=utf-8'});
        fs.createReadStream(path.join(__dirname+"/.."+req.url),'utf8').pipe(res).end();
    }
    if(req.url.includes("/")){
        console.log("PAGE");
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        fs.createReadStream(path.join(__dirname+"/../pages/Main.html"),'utf8').pipe(res);
    }
    if(req.url.includes("/css")){
        res.writeHead(200,{'Content-Type':'text/css; charset=utf-8'});
        fs.createReadStream(path.join(__dirname+"/.."+req.url),'utf8').pipe(res);
    }

    if(req.url.includes("/sources/images/")){
        var imageTipe = req.url.substr((req.url.indexOf("."))+1),
            imageStream = fs.createReadStream(path.join(__dirname,"/..",req.url));
        console.log('Image tipe '+imageTipe);
        res.writeHead(200,{'Content-Type':'image/'+imageTipe});
        imageStream.pipe(res);
    }

});

server.listen(3000,'127.0.0.1');
console.log('Мы отслеживаем порт 3000');


