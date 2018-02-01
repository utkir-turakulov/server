let express = require('express'),
    winston = require('winston'),
path = require('path');
const port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
const  ip_address =  process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
let app = express();

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

logger.info('CHILL WINSTON!', { seriously: true });

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname+"/pages/Main.html"));
});
app.get('/:page',function (request, response) {
    response.sendFile(path.join(__dirname+"/pages/",request.params.page));
});
app.get('/css/:path',function(request,response){
    console.log(request.params.path);
   response.sendFile(path.join(__dirname+"/css/"+request.params.path));
});
app.get('/sources/bootstrap/:file',function(req,res){
    console.log(req.params.file);
    res.sendFile(path.join(__dirname,'/sources/bootstrap/',req.params.file));
});
app.get('/sources/images/:file',function(req,res){
    console.log(req.params.file);
    res.sendFile(path.join(__dirname,'/sources/images/',req.params.file));
});
app.get('/images/:file',function(req,res){
    console.log(req.params.file);
    res.sendFile(path.join(__dirname,'/sources/images/',req.params.file));
});

app.listen(port,ip_address);
console.log("Слушаем хост:" + ip_address + " порт: " + port);