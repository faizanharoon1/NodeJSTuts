var connection ;
mysql      = require('mysql');
module.exports.dbconnection=function ()
{
}
module.exports.getConnection=function ()
{
connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'faizan',
});

return connection;
}