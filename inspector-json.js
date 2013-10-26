/* Inspector JSON v0.1.0
   Generated on 2013-10-25 at 17:16:26 */

!function(a){"object"==typeof exports?module.exports=a():"function"==typeof define&&define.amd?define(a):"undefined"!=typeof window?window.InspectorJSON=a():"undefined"!=typeof global?global.InspectorJSON=a():"undefined"!=typeof self&&(self.InspectorJSON=a())}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){var c=a("type-of"),d=a("extend"),e=a("dom-delegate"),f=function(a,b){var c=a.className,d=new RegExp("\\b"+b+"\\b","ig"),e=!!d.exec(c);return a.className=e?c.replace(d,""):c+" "+b,a},g=function(a){a=a||{};var b={element:"body",debug:!1,collapsed:!0,url:location.pathname};a=d(b,a),"element"!==c(a.element)&&(a.element=document.getElementById(a.element));var g=store.get(a.url+":inspectorJSON/collapse_states")||{};this.el=a.element,this.el.className+=" inspector-json viewer",this.event_delegator=new e(this.el),this.event_delegator.on("click","li.object > a, li.array > a",function(b){b.preventDefault();var c=this.parentNode,d=c.getAttribute("path");f(c,"collapsed"),/\bcollapsed\b/gi.exec(c.className)?delete g[d]:g[d]=!0,store.set(a.url+":inspectorJSON/collapse_states",g)}),this.view=function(b){var d,e;a.debug&&(d=(new Date).getTime());var f=function(a){return unescape(a).replace(/</g,"&lt;").replace(/>/g,"&gt;")},h=function(b,d,e,i){var j=c(b),k=c(d),l="";if("array"===k?i+="["+e+"]":"object"===k?i+="."+e:i=e,d&&(l+=g[i]||!a.collapsed||"object"!==j&&"array"!==j?'<li class="'+j+'" data-path="'+i+'">':'<li class="'+j+' collapsed" data-path="'+i+'">'),"object"===j){e&&(l+='<a href="#toggle"><strong>'+e+"</strong></a>"),l+="<ul>";for(e in b)l+=h(b[e],b,e,i);l+="</ul>"}else if("array"===j){e&&(l+='<a href="#toggle"><strong>'+e+"</strong></a>Array("+b.length+")"),l+="<ol>";for(var m in b)l+=h(b[m],b,m,i);l+="</ol>"}else"string"===j?l+="<strong>"+e+'</strong><span>"'+f(b)+'"</span>':"number"===j?l+="<strong>"+e+"</strong><var>"+b.toString()+"</var>":"boolean"===j?l+="<strong>"+e+"</strong><em>"+b.toString()+"</em>":"null"===j&&(l+="<strong>"+e+"</strong><i>null</i>");return d&&(l+="</li>"),l};"string"===c(b)&&(b=JSON.parse(b));var i=h(b);this.el.innerHTML=i,a.debug&&(e=(new Date).getTime(),console.log("Rendered in "+(e-d)+"ms"))},this.destroy=function(){this.event_delegator.off(),this.el.innerHTML=""}};b.exports=g},{"dom-delegate":3,extend:4,"type-of":5}],2:[function(a,b){"use strict";function c(a){a&&this.root(a),this.listenerMap={},this.handle=c.prototype.handle.bind(this)}b.exports=c,c.tagsCaseSensitive=null,c.prototype.root=function(a){var b,c=this.listenerMap;if("string"==typeof a&&(a=document.querySelector(a)),this.rootElement)for(b in c)c.hasOwnProperty(b)&&this.rootElement.removeEventListener(b,this.handle,this.captureForType(b));if(!a||!a.addEventListener)return this.rootElement&&delete this.rootElement,this;this.rootElement=a;for(b in c)c.hasOwnProperty(b)&&this.rootElement.addEventListener(b,this.handle,this.captureForType(b));return this},c.prototype.captureForType=function(a){return"error"===a},c.prototype.on=function(a,b,d,e){var f,g,h,i;if(!a)throw new TypeError("Invalid event type: "+a);if("function"==typeof b&&(d=b,b=null,e=d),void 0===e&&(e=null),"function"!=typeof d)throw new TypeError("Handler must be a type of Function");return f=this.rootElement,g=this.listenerMap,g[a]||(f&&f.addEventListener(a,this.handle,this.captureForType(a)),g[a]=[]),b?/^[a-z]+$/i.test(b)?(null===c.tagsCaseSensitive&&(c.tagsCaseSensitive="i"===document.createElement("i").tagName),i=c.tagsCaseSensitive?b:b.toUpperCase(),h=this.matchesTag):/^#[a-z0-9\-_]+$/i.test(b)?(i=b.slice(1),h=this.matchesId):(i=b,h=this.matches):(i=null,h=this.matchesRoot.bind(this)),g[a].push({selector:b,eventData:e,handler:d,matcher:h,matcherParam:i}),this},c.prototype.off=function(a,b,c){var d,e,f,g,h;if("function"==typeof b&&(c=b,b=null),f=this.listenerMap,!a){for(h in f)f.hasOwnProperty(h)&&this.off(h,b,c);return this}if(g=f[a],!g||!g.length)return this;for(d=g.length-1;d>=0;d--)e=g[d],b&&b!==e.selector||c&&c!==e.handler||g.splice(d,1);return g.length||(delete f[a],this.rootElement&&this.rootElement.removeEventListener(a,this.handle,this.captureForType(a))),this},c.prototype.handle=function(a){var b,c,d,e,f,g,h,i="ftLabsDelegateIgnore";if(a[i]!==!0)for(h=a.target,h.nodeType===Node.TEXT_NODE&&(h=h.parentNode),d=this.rootElement,g=this.listenerMap[a.type],c=g.length;h&&c;){for(b=0;c>b&&(e=g[b],e);b++)if(e.matcher.call(h,e.matcherParam,h)&&(f=this.fire(a,h,e)),f===!1)return a[i]=!0,void 0;if(h===d)break;c=g.length,h=h.parentElement}},c.prototype.fire=function(a,b,c){var d,e;return null!==c.eventData?(e=a.data,a.data=c.eventData,d=c.handler.call(b,a,b),a.data=e):d=c.handler.call(b,a,b),d},c.prototype.matches=function(a){if(a){var b=a.prototype;return b.matchesSelector||b.webkitMatchesSelector||b.mozMatchesSelector||b.msMatchesSelector||b.oMatchesSelector}}(HTMLElement),c.prototype.matchesTag=function(a,b){return a===b.tagName},c.prototype.matchesRoot=function(a,b){return this.rootElement===b},c.prototype.matchesId=function(a,b){return a===b.id},c.prototype.destroy=function(){this.off(),this.root()}},{}],3:[function(a,b){"use strict";var c=a("./delegate");b.exports=function(a){return new c(a)},b.exports.Delegate=c},{"./delegate":2}],4:[function(a,b){function c(a){if(!a||"[object Object]"!==e.call(a)||a.nodeType||a.setInterval)return!1;var b=d.call(a,"constructor"),c=d.call(a.constructor.prototype,"isPrototypeOf");if(a.constructor&&!b&&!c)return!1;var f;for(f in a);return void 0===f||d.call(a,f)}var d=Object.prototype.hasOwnProperty,e=Object.prototype.toString;b.exports=function f(){var a,b,d,e,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;for("boolean"==typeof i&&(l=i,i=arguments[1]||{},j=2),"object"!=typeof i&&"function"!=typeof i&&(i={});k>j;j++)if(null!=(a=arguments[j]))for(b in a)d=i[b],e=a[b],i!==e&&(l&&e&&(c(e)||(g=Array.isArray(e)))?(g?(g=!1,h=d&&Array.isArray(d)?d:[]):h=d&&c(d)?d:{},i[b]=f(l,h,e)):void 0!==e&&(i[b]=e));return i}},{}],5:[function(a,b){var c=Object.prototype.toString;b.exports=function(a){switch(c.call(a)){case"[object Function]":return"function";case"[object Date]":return"date";case"[object RegExp]":return"regexp";case"[object Arguments]":return"arguments";case"[object Array]":return"array";case"[object String]":return"string"}return null===a?"null":void 0===a?"undefined":a&&1===a.nodeType?"element":a===Object(a)?"object":typeof a}},{}]},{},[1])(1)});