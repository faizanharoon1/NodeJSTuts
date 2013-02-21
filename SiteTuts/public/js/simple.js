// JavaScript Document

module.exports.simple=function ()
{
}
 var myarray = new Array();
module.exports.countriesall=function (callback)
{
	myarray=[];
var dbconnection = require('./dbconnection'); 
var connection=dbconnection.getConnection();
	connection.connect();
connection.query('use test');

connection.query('select  * from  Countries_Table',
function(err, result, fields) {

    if (err) throw err;
    else {
        
        for (var i in result) {
			 var onecountry= result[i];
			 myarray.push(onecountry);
			console.log(onecountry.Country_Name);
		}
		
		connection.end();
		
		callback(result); 
	}
	

});
	
}

module.exports.addcountry=function (name,flag,detail,callback)
{
	var dbconnection = require('./dbconnection'); 
var connection=dbconnection.getConnection();
	connection.connect();
connection.query('use test');

connection.query("INSERT INTO Countries_Table (Country_Name,Country_Flag_Path,Country_Detail) VALUES ('"+name+"','"+flag+"','"+detail+"')",
function(err, result, fields) {

    if (err) throw err;
    else {
        
       
		
		connection.end();
		
		 callback(result); 
	}
	

});
}

