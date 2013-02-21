var express = require('express'),
 mysql      = require('mysql'),
  http = require('http'),
 routes = require('routes'),
 url = require('url') ,
    app = express();

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser('keyboard catspy'));
app.use(express.session());
/*THis is where we configure it*/
app.configure(function(){
	app.use(app.router);

  app.use(express.static(__dirname + '/public'));
});
/*=================================
*/
 var Users = require('./public/model/Users');
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});
var authenticate = function(req, res,next) {
  console.log('authenticating');
  if (!req.session.user) {
    res.redirect('/');
  } else {
 
   next();
  }
};
app.get('/profile', authenticate, function(req, res){
	var queryData=null;
  res.redirect("/profile.html?loguser="+req.session.user);
});
/**
* ROUTING
* -------------------------------------------------------------------------------------------------
* include  route  for each major area of functionality in the site
**/


var queryData=null;
app.get('/', function(req, res){
	//console.log("sess="+req.session.user);
	if (!req.session.user) {
   	queryData = url.parse(req.url, true).query;
if (queryData.msg!=null) {
res.redirect("/index.html?msg="+queryData.msg);
}else
  { res.redirect("/index.html");
	  } 
  } else {
	  console.log("Already loggedIn with ="+req.session.user);
    res.redirect("/profile");

  }
	

});


app.post('/login', function(req, res) {
 
 var post = req.body;
  var userobj = new Users();
userobj.username=post.username;
userobj.userpassword= post.password;
  console.log(userobj.username);
  /**
* USERNAME & PASSWORD AUTHENTICATION
* -------------------------------------------------------------------------------------------------
* this section provides basic in-memory username and password authentication
**/
 var dataMethods = require('./public/js/dataMethods');
dataMethods.AuthenticateTheUser(userobj.username,userobj.userpassword,function(authResult) {
			console.log("call result of AUTH="+authResult);
if(authResult==true)
{
	 req.session.loginError = null;
    req.session.user = userobj.username;
   
res.redirect('/profile');
	}else
{
	res.redirect('/?msg=gg');
	}});
  
  
});
app.get('/countries', function(req, res){
  res.redirect("/countries.html");
});
app.get('/addcountryPage',authenticate, function(req, res){
  res.redirect("/addCountry.html");
});
app.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});
app.get('/fetcho', function(req, res) {
 var Fetch = require( './public/js/fetch');
 
fetch = new Fetch();
fetch.go('');
 
fetch.on('complete', function(msg) {
    console.log(msg);
	
});
 
fetch.on('error', function(err) {
    console.log("err:"+err);
	
});
});


/**
* 
* -------------------------------------------------------------------------------------------------
*  Data Handlers
**/
app.post('/addcountry', function(req, res){

var post = req.body;
var simple = require('./public/js/simple');
console.log(post.countryName);
simple.addcountry(post.countryName,post.countrydetail,post.countryurl,function(pp) {
//console.log("done");
res.redirect("/addCountry.html");
 });
});
app.get('/getListCountry', function(req, res){
var simple = require('./public/js/simple');
simple.countriesall(function(pp) {
			console.log("call res="+pp.length);
			res.write(JSON.stringify(pp));
  res.end();
});
});

app.listen(3000);
console.log('Listening on port 3000');