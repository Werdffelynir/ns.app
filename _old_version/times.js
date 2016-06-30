/*var seconds = 9999;
// multiply by 1000 because Date() requires miliseconds
var date = new Date(seconds * 1000);
var hh = date.getUTCHours();
var mm = date.getUTCMinutes();
var ss = date.getSeconds();
// If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
// if (hh > 12) {hh = hh % 12;}
// These lines ensure you have two-digits
if (hh < 10) {hh = "0"+hh;}
if (mm < 10) {mm = "0"+mm;}
if (ss < 10) {ss = "0"+ss;}
// This formats your string to HH:MM:SS
var t = hh+":"+mm+":"+ss;

//console.log(dateFromSeconds(3600));
//console.log(dateFromSeconds(36000));
console.log(dateFromSeconds(480000));*/

/*var toHHMMSS = function (sec) {
    var sec_num = parseInt(sec, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}*/


//console.log(toHHMMSS(480000));




var seconds = 60*60*24;
// multiply by 1000 because Date() requires miliseconds
var date = new Date(seconds * 1000);
var hh = date.getUTCHours();
var mm = date.getUTCMinutes();
var ss = date.getSeconds();

var dd = hh / 24;
// If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
// if (hh > 12) {hh = hh % 12;}
// These lines ensure you have two-digits
if (hh < 10) {hh = "0"+hh;}
if (mm < 10) {mm = "0"+mm;}
if (ss < 10) {ss = "0"+ss;}
// This formats your string to HH:MM:SS
var t = dd+"d "+hh+":"+mm+":"+ss;


//console.dir(t);

/*
// This formats your string to DD/HH:MM:SS
var toDayHHMMSS = function (seconds) {
    //var 
    var func = function(sec){
        
        this.originSeconds = parseInt(sec);
        this.date = new Date(this.originSeconds * 1000);
        this.hours = this.date.getUTCHours();
        this.minutes = this.date.getUTCMinutes();
        this.seconds = this.date.getSeconds();
        this.days = this.date.getUTCHours() / 24;

        var r = { dd:this.days, hh:this.hours, mm:this.minutes, ss:this.seconds };
        if (r.hh < 10) {r.hh = "0"+r.hh;}
        if (r.mm < 10) {r.mm = "0"+r.mm;}
        if (r.ss < 10) {r.ss = "0"+r.ss;}
        
        this.dataString = r.dd+"/"+r.hh+":"+r.mm+":"+r.ss;
        //return this.dataString;
    };
    
    func.prototype.dataString = null;
    func.prototype.originSeconds = null;
    func.prototype.toString = function(){return this.dataString};
    func.prototype.date = null;
    func.prototype.days = null;
    func.prototype.hours = null;
    func.prototype.minutes = null;
    func.prototype.seconds = null;
    
    return func(seconds);
}



console.dir(toDayHHMMSS(60*60*24));

*/
var toDayHHMMSS = function (seconds) {
    var proto = { toString:null, days:null, hours:null, minutes:null, seconds:null },
        func = function(sec){
            var toStr ={},
                originSeconds = parseInt(sec),
                dateNow = new Date(0),
                date = new Date(originSeconds * 1000);
            this.hours = date.getUTCHours();
            this.minutes = date.getUTCMinutes();
            this.seconds = date.getSeconds();
            this.days = date.getUTCDay() - dateNow.getUTCDay();
            toStr = { dd:this.days, hh:this.hours, mm:this.minutes, ss:this.seconds };
            if (toStr.hh < 10) toStr.hh = "0"+toStr.hh;
            if (toStr.mm < 10) toStr.mm = "0"+toStr.mm;
            if (toStr.ss < 10) toStr.ss = "0"+toStr.ss;
            this.toString = toStr.dd+"/"+toStr.hh+":"+toStr.mm+":"+toStr.ss;
            return this;
        };
    return func.call(proto, seconds);
};

var convertBufferToSeconds = function (bufferString) {
    var min, s = 0, d, h, bs = bufferString.trim();
    if(d = bs.match(/^-/)){min = true}
    if(d = bs.match(/(\d+)d/)){s += parseInt(d) * 86400}
    if(h = bs.match(/(\d+)h/)){s += parseInt(h) * 3600}
    if(bs.indexOf('d') === -1 && bs.indexOf('h') === -1 && !isNaN(bs)){
        s = parseInt(bs) * 3600;
        if(s < 0) min = false; 
    }
    return min ? -s : s;
}


var convertSecondsToBuffer = function (seconds) {
    var dHMS = toDayHHMMSS(seconds);
    return dHMS.days + "d " + dHMS.hours + "h";
}

/*
console.dir(convertBufferToSeconds('-48'));
console.dir(convertBufferToSeconds('-2d'));
console.dir(convertBufferToSeconds('-1h'));
console.dir(convertBufferToSeconds('-2d 1h'));
console.dir(convertBufferToSeconds('+2d 1h'));
*/
/*
console.dir(convertSecondsToBuffer(3600));
console.dir(convertSecondsToBuffer(3600*24));
console.dir(convertSecondsToBuffer(3600*50));
*/


/*
var value = 3600;
var units = {
    "year": 24*60*365,
    "month": 24*60*30,
    "week": 24*60*7,
    "day": 24*60,
    "minute": 1
}

var result = []

for(var name in units) {
  var p =  Math.floor(value/units[name]);
  if(p == 1) result.push(p + " " + name);
  if(p >= 2) result.push(p + " " + name + "s");
  value %= units[name]

}

console.dir(result);
*/


// toStr.dd+"/"+toStr.hh+":"+toStr.mm+":"+toStr.ss;
/*function secondsToString(seconds)
{
   var value = seconds;

   var units = {
       "day": 24*60*60,
       "hour": 60*60,
       "minute": 60,
       "second": 1
   }

   var result = []

   for(var name in units) {
     var p =  Math.floor(value/units[name]);
     if(p == 1) {
         result.push(" " + p + " " + name);
     }
     if(p >= 2) {
         result.push(" " + p + " " + name + "s");
     }
     value %= units[name]
   }

   return result;

}

            this.hours = date.getUTCHours();
            this.minutes = date.getUTCMinutes();
            this.seconds = date.getSeconds();
            this.days = 
            
console.dir(secondsToString(888888));*/

function secondsToString(seconds) {
   var value = seconds;
   var units = { day:24*60*60, hour:60*60, minute:60, second:1 };
   var result = { days: 0, hours: 0, minutes: 0, seconds: 0, toString: 0 };
   for(var name in units) {
        var p =  Math.floor(value/units[name]);
        if(name=='day') result.days = p;
        else if(name=='hour') result.hours = p;
        else if(name=='minute') result.minutes = p;
        else if(name=='second') result.seconds = p;
        value %= units[name];
   }
   result.toString = result.days+"/"+result.hours+":"+result.minutes+":"+result.seconds;
   return result;
}
// = toStr.dd+"/"+toStr.hh+":"+toStr.mm+":"+toStr.ss;
console.dir(secondsToString(888888));





