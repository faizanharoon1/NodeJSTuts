// JavaScript Document
module.exports.AuthenticateTheUser=function (uname,upass,callback)
{
	var isauth=false;
	var dbconnection = require('./dbconnection'); 
var connection=dbconnection.getConnection();
	connection.connect();
connection.query('use test');

connection.query('select  * from  userTable',
function(err, result, fields) {
    if (err) throw err;
    else {
        //console.log('Names are: ');
        console.log('------------------Login--------------');
        for (var i in result) {
            var oneuser = result[i];
		//console.log(oneuser.name );
			 //console.log(oneuser.password );
			 if (uname == oneuser.name && upass ==oneuser.password) {
/*	req.session ={user: post.username};*/
	 isauth=true;
  
  } }}
  
console.log(' IS AUTH value:'+isauth);
/*if(isauth==true)
{
	
	res.redirect('/profile.html');
	}else
{
	res.redirect('/?msg=gg');
	}*/
connection.end();
callback(isauth);
});

}
