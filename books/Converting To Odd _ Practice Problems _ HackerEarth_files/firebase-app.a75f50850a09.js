!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.firebase=b()}(this,function(){function b(){}function c(a){if(!(this instanceof c))throw new TypeError("Promises must be constructed via new");if("function"!=typeof a)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],h(a,this)}function d(a,b){for(;3===a._state;)a=a._value;0!==a._state?(a._handled=!0,c._immediateFn(function(){var a=1===d._state?b.onFulfilled:b.onRejected;if(null!==a){var c;try{c=a(d._value)}catch(d){return void f(b.promise,d)}e(b.promise,c)}else(1===d._state?e:f)(b.promise,d._value)})):a._deferreds.push(b)}function e(a,b){try{if(b===a)throw new TypeError("A promise cannot be resolved with itself.");if(b&&("object"==typeof b||"function"==typeof b)){var d=b.then;if(b instanceof c)return a._state=3,a._value=b,void g(a);if("function"==typeof d)return void h((e=d,i=b,function(){e.apply(i,arguments)}),a)}a._state=1,a._value=b,g(a)}catch(b){f(a,b)}var e,i}function f(a,b){a._state=2,a._value=b,g(a)}function g(a){2===a._state&&0===a._deferreds.length&&c._immediateFn(function(){a._handled||c._unhandledRejectionFn(a._value)});for(var b=0,e=a._deferreds.length;b<e;b++)d(a,a._deferreds[b]);a._deferreds=null}function h(a,b){var c=!1;try{a(function(a){c||(c=!0,e(b,a))},function(a){c||(c=!0,f(b,a))})}catch(a){if(c)return;c=!0,f(b,a)}}function j(a,b){return a(b={exports:{}},b.exports),b.exports}function fb(a,b){if(b instanceof Object){switch(b.constructor){case Date:return new Date(b.getTime());case Object:void 0===a&&(a={});break;case Array:a=[];break;default:return b}for(var c in b)b.hasOwnProperty(c)&&(a[c]=fb(a[c],b[c]));return a}return b}function gb(a,b,c){a[b]=c}function lb(a,b){var c=new mb(a,b);return c.subscribe.bind(c)}function nb(){}function sb(a,b){throw tb.create(a,b)}"use strict",!function(a){function h(a){if("string"!=typeof a&&(a=String(a)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(a))throw new TypeError("Invalid character in header field name");return a.toLowerCase()}function i(a){return"string"!=typeof a&&(a=String(a)),a}function j(a){var c={next:function(){var b=a.shift();return{done:void 0===b,value:b}}};return b.iterable&&(c[Symbol.iterator]=function(){return c}),c}function k(a){this.map={},a instanceof k?a.forEach(function(a,b){this.append(b,a)},this):Array.isArray(a)?a.forEach(function(a){this.append(a[0],a[1])},this):a&&Object.getOwnPropertyNames(a).forEach(function(b){this.append(b,a[b])},this)}function l(a){if(a.bodyUsed)return Promise.reject(new TypeError("Already read"));a.bodyUsed=!0}function m(a){return new Promise(function(b,c){a.onload=function(){b(a.result)},a.onerror=function(){c(a.error)}})}function n(a){var b=new FileReader,c=m(b);return b.readAsArrayBuffer(a),c}function o(a){if(a.slice)return a.slice(0);var b=new Uint8Array(a.byteLength);return b.set(new Uint8Array(a)),b.buffer}function p(){return this.bodyUsed=!1,this._initBody=function(a){if(this._bodyInit=a,a)if("string"==typeof a)this._bodyText=a;else if(b.blob&&Blob.prototype.isPrototypeOf(a))this._bodyBlob=a;else if(b.formData&&FormData.prototype.isPrototypeOf(a))this._bodyFormData=a;else if(b.searchParams&&URLSearchParams.prototype.isPrototypeOf(a))this._bodyText=a.toString();else if(b.arrayBuffer&&b.blob&&d(a))this._bodyArrayBuffer=o(a.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!b.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(a)&&!e(a))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=o(a)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof a?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):b.searchParams&&URLSearchParams.prototype.isPrototypeOf(a)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},b.blob&&(this.blob=function(){var a=l(this);if(a)return a;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?l(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(n)}),this.text=function(){var a,b,c,d=l(this);if(d)return d;if(this._bodyBlob)return a=this._bodyBlob,b=new FileReader,c=m(b),b.readAsText(a),c;if(this._bodyArrayBuffer)return Promise.resolve(function(a){for(var b=new Uint8Array(a),c=new Array(b.length),d=0;d<b.length;d++)c[d]=String.fromCharCode(b[d]);return c.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},b.formData&&(this.formData=function(){return this.text().then(r)}),this.json=function(){return this.text().then(JSON.parse)},this}function q(a,b){var c,d,e=(b=b||{}).body;if(a instanceof q){if(a.bodyUsed)throw new TypeError("Already read");this.url=a.url,this.credentials=a.credentials,b.headers||(this.headers=new k(a.headers)),this.method=a.method,this.mode=a.mode,e||null==a._bodyInit||(e=a._bodyInit,a.bodyUsed=!0)}else this.url=String(a);if(this.credentials=b.credentials||this.credentials||"omit",!b.headers&&this.headers||(this.headers=new k(b.headers)),this.method=(c=b.method||this.method||"GET",d=c.toUpperCase(),f.indexOf(d)>-1?d:c),this.mode=b.mode||this.mode||null,this.referrer=null,!("GET"!==this.method&&"HEAD"!==this.method||!e))throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(e)}function r(a){var b=new FormData;return a.trim().split("&").forEach(function(a){if(a){var c=a.split("="),d=c.shift().replace(/\+/g," "),e=c.join("=").replace(/\+/g," ");b.append(decodeURIComponent(d),decodeURIComponent(e))}}),b}function s(a,b){b||(b={}),this.type="default",this.status=void 0===b.status?200:b.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in b?b.statusText:"OK",this.headers=new k(b.headers),this.url=b.url||"",this._initBody(a)}if(!a.fetch){var b={searchParams:"URLSearchParams"in a,iterable:"Symbol"in a&&"iterator"in Symbol,blob:"FileReader"in a&&"Blob"in a&&function(){try{return new Blob,!0}catch(a){return!1}}(),formData:"FormData"in a,arrayBuffer:"ArrayBuffer"in a};if(b.arrayBuffer)var c=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],d=function(a){return a&&DataView.prototype.isPrototypeOf(a)},e=ArrayBuffer.isView||function(a){return a&&c.indexOf(Object.prototype.toString.call(a))>-1};k.prototype.append=function(a,b){a=h(a),b=i(b);var c=this.map[a];this.map[a]=c?c+","+b:b},k.prototype.delete=function(a){delete this.map[h(a)]},k.prototype.get=function(a){return a=h(a),this.has(a)?this.map[a]:null},k.prototype.has=function(a){return this.map.hasOwnProperty(h(a))},k.prototype.set=function(a,b){this.map[h(a)]=i(b)},k.prototype.forEach=function(a,b){for(var c in this.map)this.map.hasOwnProperty(c)&&a.call(b,this.map[c],c,this)},k.prototype.keys=function(){var a=[];return this.forEach(function(b,c){a.push(c)}),j(a)},k.prototype.values=function(){var a=[];return this.forEach(function(b){a.push(b)}),j(a)},k.prototype.entries=function(){var a=[];return this.forEach(function(b,c){a.push([c,b])}),j(a)},b.iterable&&(k.prototype[Symbol.iterator]=k.prototype.entries);var f=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];q.prototype.clone=function(){return new q(this,{body:this._bodyInit})},p.call(q.prototype),p.call(s.prototype),s.prototype.clone=function(){return new s(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new k(this.headers),url:this.url})},s.error=function(){var a=new s(null,{status:0,statusText:""});return a.type="error",a};var g=[301,302,303,307,308];s.redirect=function(a,b){if(-1===g.indexOf(b))throw new RangeError("Invalid status code");return new s(null,{status:b,headers:{location:a}})},a.Headers=k,a.Request=q,a.Response=s,a.fetch=function(a,c){return new Promise(function(d,e){var f=new q(a,c),g=new XMLHttpRequest;g.onload=function(){var a,b,c={status:g.status,statusText:g.statusText,headers:(a=g.getAllResponseHeaders()||"",b=new k,a.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(a){var c=a.split(":"),d=c.shift().trim();if(d){var e=c.join(":").trim();b.append(d,e)}}),b)};c.url="responseURL"in g?g.responseURL:c.headers.get("X-Request-URL");var e="response"in g?g.response:g.responseText;d(new s(e,c))},g.onerror=function(){e(new TypeError("Network request failed"))},g.ontimeout=function(){e(new TypeError("Network request failed"))},g.open(f.method,f.url,!0),"include"===f.credentials?g.withCredentials=!0:"omit"===f.credentials&&(g.withCredentials=!1),"responseType"in g&&b.blob&&(g.responseType="blob"),f.headers.forEach(function(a,b){g.setRequestHeader(b,a)}),g.send(void 0===f._bodyInit?null:f._bodyInit)})},a.fetch.polyfill=!0}}("undefined"!=typeof self?self:void 0);var a=setTimeout;c.prototype.catch=function(a){return this.then(null,a)},c.prototype.then=function(a,c){var e=new this.constructor(b);return d(this,new function(a,b,c){this.onFulfilled="function"==typeof a?a:null,this.onRejected="function"==typeof b?b:null,this.promise=c}(a,c,e)),e},c.prototype.finally=function(a){var b=this.constructor;return this.then(function(c){return b.resolve(a()).then(function(){return c})},function(c){return b.resolve(a()).then(function(){return b.reject(c)})})},c.all=function(a){return new c(function(b,c){function f(a,g){try{if(g&&("object"==typeof g||"function"==typeof g)){var h=g.then;if("function"==typeof h)return void h.call(g,function(b){f(a,b)},c)}d[a]=g,0==--e&&b(d)}catch(a){c(a)}}if(!a||void 0===a.length)throw new TypeError("Promise.all accepts an array");var d=Array.prototype.slice.call(a);if(0===d.length)return b([]);var e=d.length;for(var g=0;g<d.length;g++)f(g,d[g])})},c.resolve=function(a){return a&&"object"==typeof a&&a.constructor===c?a:new c(function(b){b(a)})},c.reject=function(a){return new c(function(b,c){c(a)})},c.race=function(a){return new c(function(b,c){for(var d=0,e=a.length;d<e;d++)a[d].then(b,c)})},c._immediateFn="function"==typeof setImmediate&&function(a){setImmediate(a)}||function(b){a(b,0)},c._unhandledRejectionFn=function(a){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",a)};var i=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("unable to locate global object")}();i.Promise||(i.Promise=c);var k=j(function(a){var b=a.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=b)}),l=j(function(a){var b=a.exports={version:"2.5.5"};"number"==typeof __e&&(__e=b)}),m=(l.version,function(a){return"object"==typeof a?null!==a:"function"==typeof a}),n=function(a){if(!m(a))throw TypeError(a+" is not an object!");return a},o=function(a){try{return!!a()}catch(a){return!0}},p=!o(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),q=k.document,r=m(q)&&m(q.createElement),s=!p&&!o(function(){return 7!=Object.defineProperty((a="div",r?q.createElement(a):{}),"a",{get:function(){return 7}}).a;var a}),t=Object.defineProperty,u={f:p?Object.defineProperty:function(a,b,c){if(n(a),b=function(a,b){if(!m(a))return a;var c,d;if(b&&"function"==typeof (c=a.toString)&&!m(d=c.call(a)))return d;if("function"==typeof (c=a.valueOf)&&!m(d=c.call(a)))return d;if(!b&&"function"==typeof (c=a.toString)&&!m(d=c.call(a)))return d;throw TypeError("Can't convert object to primitive value")}(b,!0),n(c),s)try{return t(a,b,c)}catch(a){}if("get"in c||"set"in c)throw TypeError("Accessors not supported!");return"value"in c&&(a[b]=c.value),a}},v=p?function(a,b,c){return u.f(a,b,function(a,b){return{enumerable:!(1&a),configurable:!(2&a),writable:!(4&a),value:b}}(1,c))}:function(a,b,c){return a[b]=c,a},w={}.hasOwnProperty,x=function(a,b){return w.call(a,b)},y=0,z=Math.random(),A=function(a){return"Symbol(".concat(void 0===a?"":a,")_",(++y+z).toString(36))},B=j(function(a){var b=A("src"),c=Function.toString,d=(""+c).split("toString");l.inspectSource=function(a){return c.call(a)},(a.exports=function(a,c,e,f){var g="function"==typeof e;g&&(x(e,"name")||v(e,"name",c)),a[c]!==e&&(g&&(x(e,b)||v(e,b,a[c]?""+a[c]:d.join(String(c)))),a===k?a[c]=e:f?a[c]?a[c]=e:v(a,c,e):(delete a[c],v(a,c,e)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[b]||c.call(this)})}),C=function(a,b,c){if(function(a){if("function"!=typeof a)throw TypeError(a+" is not a function!")}(a),void 0===b)return a;switch(c){case 1:return function(c){return a.call(b,c)};case 2:return function(c,d){return a.call(b,c,d)};case 3:return function(c,d,e){return a.call(b,c,d,e)}}return function(){return a.apply(b,arguments)}},D=function(a,b,c){var d,e,f,g,h=a&D.F,i=a&D.G,j=a&D.S,m=a&D.P,n=a&D.B,o=i?k:j?k[b]||(k[b]={}):(k[b]||{}).prototype,p=i?l:l[b]||(l[b]={}),q=p.prototype||(p.prototype={});for(d in i&&(c=b),c)f=((e=!h&&o&&void 0!==o[d])?o:c)[d],g=n&&e?C(f,k):m&&"function"==typeof f?C(Function.call,f):f,o&&B(o,d,f,a&D.U),p[d]!=f&&v(p,d,g),m&&q[d]!=f&&(q[d]=f)};k.core=l,D.F=1,D.G=2,D.S=4,D.P=8,D.B=16,D.W=32,D.U=64,D.R=128;var E=D,F={}.toString,G=function(a){return F.call(a).slice(8,-1)},H=Object("z").propertyIsEnumerable(0)?Object:function(a){return"String"==G(a)?a.split(""):Object(a)},I=function(a){if(void 0==a)throw TypeError("Can't call method on  "+a);return a},J=Math.ceil,K=Math.floor,L=function(a){return isNaN(a=+a)?0:(a>0?K:J)(a)},M=Math.min,N=function(a){return a>0?M(L(a),9007199254740991):0},O=Array.isArray||function(a){return"Array"==G(a)},P=k["__core-js_shared__"]||(k["__core-js_shared__"]={}),Q=function(a){return P[a]||(P[a]={})},R=j(function(a){var b=Q("wks"),c=k.Symbol,d="function"==typeof c;(a.exports=function(a){return b[a]||(b[a]=d&&c[a]||(d?c:A)("Symbol."+a))}).store=b}),S=R("species"),T=function(a,b){return new(function(a){var b;return O(a)&&("function"!=typeof (b=a.constructor)||b!==Array&&!O(b.prototype)||(b=void 0),m(b)&&null===(b=b[S])&&(b=void 0)),void 0===b?Array:b}(a))(b)},U=function(a,b){var c=1==a,d=2==a,e=3==a,f=4==a,g=6==a,h=5==a||g,i=b||T;return function(b,j,k){for(var l,m,n=Object(I(b)),o=H(n),p=C(j,k,3),q=N(o.length),r=0,s=c?i(b,q):d?i(b,0):void 0;q>r;r++)if((h||r in o)&&(m=p(l=o[r],r,n),a))if(c)s[r]=m;else if(m)switch(a){case 3:return!0;case 5:return l;case 6:return r;case 2:s.push(l)}else if(f)return!1;return g?-1:e||f?f:s}},V=R("unscopables"),W=Array.prototype;void 0==W[V]&&v(W,V,{});var X=function(a){W[V][a]=!0},Y=U(5),Z=!0;"find"in[]&&Array(1).find(function(){Z=!1}),E(E.P+E.F*Z,"Array",{find:function(a){return Y(this,a,arguments.length>1?arguments[1]:void 0)}}),X("find"),l.Array.find;var $=U(6),_=!0;"findIndex"in[]&&Array(1).findIndex(function(){_=!1}),E(E.P+E.F*_,"Array",{findIndex:function(a){return $(this,a,arguments.length>1?arguments[1]:void 0)}}),X("findIndex"),l.Array.findIndex;var ab=R("match"),bb=function(a,b,c){if(m(d=b)&&(void 0!==(e=d[ab])?e:"RegExp"==G(d)))throw TypeError("String#"+c+" doesn't accept regex!");var d,e;return String(I(a))},cb=R("match"),db="".startsWith;E(E.P+E.F*function(a){var b=/./;try{"/./"[a](b)}catch(c){try{return b[cb]=!1,!"/./"[a](b)}catch(a){}}return!0}("startsWith"),"String",{startsWith:function(a){var b=bb(this,a,"startsWith"),c=N(Math.min(arguments.length>1?arguments[1]:void 0,b.length)),d=String(a);return db?db.call(b,d,c):b.slice(c,c+d.length)===d}}),l.String.startsWith,E(E.P,"String",{repeat:function(a){var b=String(I(this)),c="",d=L(a);if(d<0||d==1/0)throw RangeError("Count can't be negative");for(;d>0;(d>>>=1)&&(b+=b))1&d&&(c+=b);return c}}),l.String.repeat;var eb=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])},hb="FirebaseError",ib=Error.captureStackTrace,jb=function(){return function(a,b){if(this.code=a,this.message=b,ib)ib(this,kb.prototype.create);else try{throw Error.apply(this,arguments)}catch(a){this.name=hb,Object.defineProperty(this,"stack",{get:function(){return a.stack}})}}}();jb.prototype=Object.create(Error.prototype),jb.prototype.constructor=jb,jb.prototype.name=hb;var kb=function(){function a(a,b,c){this.service=a,this.serviceName=b,this.errors=c,this.pattern=/\{\$([^}]+)}/g}return a.prototype.create=function(a,b){void 0===b&&(b={});var c,d=this.errors[a],e=this.service+"/"+a;c=void 0===d?"Error":d.replace(this.pattern,function(a,c){var d=b[c];return void 0!==d?d.toString():"<"+c+"?>"}),c=this.serviceName+": "+c+" ("+e+").";var f=new jb(e,c);for(var g in b)b.hasOwnProperty(g)&&"_"!==g.slice(-1)&&(f[g]=b[g]);return f},a}();!function(a){function b(){var b=a.call(this)||this;b.chain_=[],b.buf_=[],b.W_=[],b.pad_=[],b.inbuf_=0,b.total_=0,b.blockSize=64,b.pad_[0]=128;for(var c=1;c<b.blockSize;++c)b.pad_[c]=0;return b.reset(),b}(function(a,b){function c(){this.constructor=a}eb(a,b),a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)})(b,a),b.prototype.reset=function(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0},b.prototype.compress_=function(a,b){b||(b=0);var c=this.W_;if("string"==typeof a)for(var d=0;d<16;d++)c[d]=a.charCodeAt(b)<<24|a.charCodeAt(b+1)<<16|a.charCodeAt(b+2)<<8|a.charCodeAt(b+3),b+=4;else for(d=0;d<16;d++)c[d]=a[b]<<24|a[b+1]<<16|a[b+2]<<8|a[b+3],b+=4;for(d=16;d<80;d++){var e=c[d-3]^c[d-8]^c[d-14]^c[d-16];c[d]=4294967295&(e<<1|e>>>31)}var f,g,h=this.chain_[0],i=this.chain_[1],j=this.chain_[2],k=this.chain_[3],l=this.chain_[4];for(d=0;d<80;d++)d<40?d<20?(f=k^i&(j^k),g=1518500249):(f=i^j^k,g=1859775393):d<60?(f=i&j|k&(i|j),g=2400959708):(f=i^j^k,g=3395469782),e=(h<<5|h>>>27)+f+l+g+c[d]&4294967295,l=k,k=j,j=4294967295&(i<<30|i>>>2),i=h,h=e;this.chain_[0]=this.chain_[0]+h&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+j&4294967295,this.chain_[3]=this.chain_[3]+k&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295},b.prototype.update=function(a,b){if(null!=a){void 0===b&&(b=a.length);for(var c=b-this.blockSize,d=0,e=this.buf_,f=this.inbuf_;d<b;){if(0==f)for(;d<=c;)this.compress_(a,d),d+=this.blockSize;if("string"==typeof a){for(;d<b;)if(e[f]=a.charCodeAt(d),++d,++f==this.blockSize){this.compress_(e),f=0;break}}else for(;d<b;)if(e[f]=a[d],++d,++f==this.blockSize){this.compress_(e),f=0;break}}this.inbuf_=f,this.total_+=b}},b.prototype.digest=function(){var a=[],b=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(var c=this.blockSize-1;c>=56;c--)this.buf_[c]=255&b,b/=256;this.compress_(this.buf_);var d=0;for(c=0;c<5;c++)for(var e=24;e>=0;e-=8)a[d]=this.chain_[c]>>e&255,++d;return a}}(function(){return function(){this.blockSize=-1}}());var mb=function(){function a(a,b){var c=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=b,this.task.then(function(){a(c)}).catch(function(a){c.error(a)})}return a.prototype.next=function(a){this.forEachObserver(function(b){b.next(a)})},a.prototype.error=function(a){this.forEachObserver(function(b){b.error(a)}),this.close(a)},a.prototype.complete=function(){this.forEachObserver(function(a){a.complete()}),this.close()},a.prototype.subscribe=function(a,b,c){var d,e=this;if(void 0===a&&void 0===b&&void 0===c)throw new Error("Missing Observer.");void 0===(d=function(a,b){if("object"!=typeof a||null===a)return!1;for(var c=0,d=b;c<d.length;c++){var e=d[c];if(e in a&&"function"==typeof a[e])return!0}return!1}(a,["next","error","complete"])?a:{next:a,error:b,complete:c}).next&&(d.next=nb),void 0===d.error&&(d.error=nb),void 0===d.complete&&(d.complete=nb);var f=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(function(){try{e.finalError?d.error(e.finalError):d.complete()}catch(a){}}),this.observers.push(d),f},a.prototype.unsubscribeOne=function(a){void 0!==this.observers&&void 0!==this.observers[a]&&(delete this.observers[a],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},a.prototype.forEachObserver=function(a){if(!this.finalized)for(var b=0;b<this.observers.length;b++)this.sendOne(b,a)},a.prototype.sendOne=function(a,b){var c=this;this.task.then(function(){if(void 0!==c.observers&&void 0!==c.observers[a])try{b(c.observers[a])}catch(a){"undefined"!=typeof console&&console.error&&console.error(a)}})},a.prototype.close=function(a){var b=this;this.finalized||(this.finalized=!0,void 0!==a&&(this.finalError=a),this.task.then(function(){b.observers=void 0,b.onNoObservers=void 0}))},a}(),ob=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},pb="[DEFAULT]",qb=[],rb=function(){function a(a,b,c){this.firebase_=c,this.isDeleted_=!1,this.services_={},this.name_=b.name,this._automaticDataCollectionEnabled=b.automaticDataCollectionEnabled||!1,this.options_=fb(void 0,a),this.INTERNAL={getUid:function(){return null},getToken:function(){return Promise.resolve(null)},addAuthTokenListener:function(a){qb.push(a),setTimeout(function(){return a(null)},0)},removeAuthTokenListener:function(a){qb=qb.filter(function(b){return b!==a})}}}return Object.defineProperty(a.prototype,"automaticDataCollectionEnabled",{get:function(){return this.checkDestroyed_(),this._automaticDataCollectionEnabled},set:function(a){this.checkDestroyed_(),this._automaticDataCollectionEnabled=a},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"name",{get:function(){return this.checkDestroyed_(),this.name_},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"options",{get:function(){return this.checkDestroyed_(),this.options_},enumerable:!0,configurable:!0}),a.prototype.delete=function(){var a=this;return(new Promise(function(b){a.checkDestroyed_(),b()})).then(function(){a.firebase_.INTERNAL.removeApp(a.name_);var b=[];return Object.keys(a.services_).forEach(function(c){Object.keys(a.services_[c]).forEach(function(d){b.push(a.services_[c][d])})}),Promise.all(b.map(function(a){return a.INTERNAL.delete()}))}).then(function(){a.isDeleted_=!0,a.services_={}})},a.prototype._getService=function(a,b){if(void 0===b&&(b=pb),this.checkDestroyed_(),this.services_[a]||(this.services_[a]={}),!this.services_[a][b]){var c=b!==pb?b:void 0,d=this.firebase_.INTERNAL.factories[a](this,this.extendApp.bind(this),c);this.services_[a][b]=d}return this.services_[a][b]},a.prototype.extendApp=function(a){var b=this;fb(this,a),a.INTERNAL&&a.INTERNAL.addAuthTokenListener&&(qb.forEach(function(a){b.INTERNAL.addAuthTokenListener(a)}),qb=[])},a.prototype.checkDestroyed_=function(){this.isDeleted_&&sb("app-deleted",{name:this.name_})},a}();rb.prototype.name&&rb.prototype.options||rb.prototype.delete||console.log("dc");var tb=new kb("app","Firebase",{"no-app":"No Firebase App '{$name}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$name}","duplicate-app":"Firebase App named '{$name}' already exists","app-deleted":"Firebase App named '{$name}' already deleted","duplicate-service":"Firebase service named '{$name}' already registered","sa-not-supported":"Initializing the Firebase SDK with a service account is only allowed in a Node.js environment. On client devices, you should instead initialize the SDK with an api key and auth domain","invalid-app-argument":"firebase.{$name}() takes either no argument or a Firebase App instance."});return function ub(){function e(b){return ob(a,b=b||pb)||sb("no-app",{name:b}),a[b]}function f(){return Object.keys(a).map(function(b){return a[b]})}function g(a,d){Object.keys(b).forEach(function(b){var e=h(a,b);null!==e&&c[e]&&c[e](d,a)})}function h(a,b){if("serverAuth"===b)return null;var c=b;return a.options,c}var a={},b={},c={},d={__esModule:!0,initializeApp:function(b,c){if(void 0===c&&(c={}),"object"!=typeof c||null===c){var e=c;c={name:e}}var f=c;void 0===f.name&&(f.name=pb);var h=f.name;"string"==typeof h&&h||sb("bad-app-name",{name:h+""}),ob(a,h)&&sb("duplicate-app",{name:h});var i=new rb(b,f,d);return a[h]=i,g(i,"create"),i},app:e,apps:null,Promise:Promise,SDK_VERSION:"5.0.3",INTERNAL:{registerService:function(a,g,h,i,j){b[a]&&sb("duplicate-service",{name:a}),b[a]=g,i&&(c[a]=i,f().forEach(function(a){i("create",a)}));var k=function(b){return void 0===b&&(b=e()),"function"!=typeof b[a]&&sb("invalid-app-argument",{name:a}),b[a]()};return void 0!==h&&fb(k,h),d[a]=k,rb.prototype[a]=function(){for(var b=[],c=0;c<arguments.length;c++)b[c]=arguments[c];return this._getService.bind(this,a).apply(this,j?b:[])},k},createFirebaseNamespace:ub,extendNamespace:function(a){fb(d,a)},createSubscribe:lb,ErrorFactory:kb,removeApp:function(b){g(a[b],"delete"),delete a[b]},factories:b,useAsService:h,Promise:Promise,deepExtend:fb}};return gb(d,"default",d),Object.defineProperty(d,"apps",{get:f}),gb(e,"App",rb),d}()});