// JavaScript Document
var util = require('util'),
    http = require('http'),
    events = require('events').EventEmitter;
 
function Fetch() {
    if(false === (this instanceof Fetch)) {
        return new Fetch();
    }
    events.call(this);
};
 
util.inherits(Fetch, events);
 
Fetch.prototype.go = function(fetchUrl) {
    var self = this;
 //==============
 var simple = require('./simple');
simple.countriesall(function(pp) {
			var incomingData = '';
 
        pp.on('data', function(data) {
            incomingData += data ;
        });
 
        pp.on('end', function() {
            self.emit('complete', incomingData);
        });
  
 
    pp.on('error', function(err) {
        self.emit('error', err);
    });
 
   pp.end();
  
});
 //===============
   /* var request = http.request(fetchUrl, function(response) {
        var incomingData = '';
 
        response.on('data', function(data) {
            incomingData += data ;
        });
 
        response.on('end', function() {
            self.emit('complete', incomingData);
        });
    });
 
    request.on('error', function(err) {
        self.emit('error', err);
    });
 
    request.end();*/
};
 
module.exports = Fetch;