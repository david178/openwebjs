/*
 package 2019-02-19 
*/

window.Modernizr=function(e,t,r){function n(e){u.cssText=e}function o(e,t){return typeof e===t}var a,i,c={},l=t.documentElement,s=t.createElement("modernizr"),u=s.style,f={},d=[],p=d.slice,h={}.hasOwnProperty;for(var m in i=o(h,"undefined")||o(h.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(e,t){return h.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(r){var o=this;if("function"!=typeof o)throw new TypeError;var a=p.call(arguments,1),i=function(){if(this instanceof i){var e=function(){};e.prototype=o.prototype;var t=new e,n=o.apply(t,a.concat(p.call(arguments)));return Object(n)===n?n:t}return o.apply(r,a.concat(p.call(arguments)))};return i}),f)i(f,m)&&(a=m.toLowerCase(),c[a]=f[m](),d.push((c[a]?"":"no-")+a));return c.addTest=function(e,t){if("object"==typeof e)for(var n in e)i(e,n)&&c.addTest(n,e[n]);else{if(e=e.toLowerCase(),c[e]!==r)return c;t="function"==typeof t?t():t,l.className+=" "+(t?"":"no-")+e,c[e]=t}return c},n(""),s=null,function(e,l){function s(){var e=h.elements;return"string"==typeof e?e.split(" "):e}function u(e){var t=c[e[r]];return t||(t={},i++,e[r]=i,c[i]=t),t}function f(e,t,n){return t||(t=l),p?t.createElement(e):(n||(n=u(t)),(r=n.cache[e]?n.cache[e].cloneNode():a.test(e)?(n.cache[e]=n.createElem(e)).cloneNode():n.createElem(e)).canHaveChildren&&!o.test(e)?n.frag.appendChild(r):r);var r}function t(e){e||(e=l);var t,n,r,o,a,i,c=u(e);return h.shivCSS&&!d&&!c.hasCSS&&(c.hasCSS=(o="article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}",a=(r=e).createElement("p"),i=r.getElementsByTagName("head")[0]||r.documentElement,a.innerHTML="x<style>"+o+"</style>",!!i.insertBefore(a.lastChild,i.firstChild))),p||(t=e,(n=c).cache||(n.cache={},n.createElem=t.createElement,n.createFrag=t.createDocumentFragment,n.frag=n.createFrag()),t.createElement=function(e){return h.shivMethods?f(e,t,n):n.createElem(e)},t.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+s().join().replace(/\w+/g,function(e){return n.createElem(e),n.frag.createElement(e),'c("'+e+'")'})+");return n}")(h,n.frag)),e}var d,p,n=e.html5||{},o=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,a=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,r="_html5shiv",i=0,c={};!function(){try{var e=l.createElement("a");e.innerHTML="<xyz></xyz>",d="hidden"in e,p=1==e.childNodes.length||function(){l.createElement("a");var e=l.createDocumentFragment();return void 0===e.cloneNode||void 0===e.createDocumentFragment||void 0===e.createElement}()}catch(e){p=d=!0}}();var h={elements:n.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:!1!==n.shivCSS,supportsUnknownElements:p,shivMethods:!1!==n.shivMethods,type:"default",shivDocument:t,createElement:f,createDocumentFragment:function(e,t){if(e||(e=l),p)return e.createDocumentFragment();for(var n=(t=t||u(e)).frag.cloneNode(),r=0,o=s(),a=o.length;r<a;r++)n.createElement(o[r]);return n}};e.html5=h,t(l)}(this,t),c._version="2.6.2",l.className=l.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+" js "+d.join(" "),c}(0,this.document),function(e,d,t){function f(e){return"[object Function]"==a.call(e)}function p(e){return"string"==typeof e}function h(){}function m(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function y(){var e=b.shift();j=1,e?e.t?g(function(){("c"==e.t?v.injectCss:v.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),y()):j=0}function n(e,t,n,r,o){return j=0,t=t||"j",p(e)?function(n,r,e,t,o,a,i){function c(e){if(!s&&m(l.readyState)&&(f.r=s=1,!j&&y(),l.onload=l.onreadystatechange=null,e))for(var t in"img"!=n&&g(function(){C.removeChild(l)},50),N[r])N[r].hasOwnProperty(t)&&N[r][t].onload()}i=i||v.errorTimeout;var l=d.createElement(n),s=0,u=0,f={t:e,s:r,e:o,a:a,x:i};1===N[r]&&(u=1,N[r]=[]),"object"==n?l.data=r:(l.src=r,l.type=n),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){c.call(this,u)},b.splice(t,0,f),"img"!=n&&(u||2===N[r]?(C.insertBefore(l,S?null:E),g(c,i)):N[r].push(l))}("c"==t?s:l,e,t,this.i++,n,r,o):(b.splice(this.i++,0,e),1==b.length&&y()),this}function c(){var e=v;return e.loader={load:n,i:0},e}var r,v,o=d.documentElement,g=e.setTimeout,E=d.getElementsByTagName("script")[0],a={}.toString,b=[],j=0,i="MozAppearance"in o.style,S=i&&!!d.createRange().compareNode,C=S?o:E.parentNode,l=(o=e.opera&&"[object Opera]"==a.call(e.opera),o=!!d.attachEvent&&!o,i?"object":o?"script":"img"),s=o?"script":l,w=Array.isArray||function(e){return"[object Array]"==a.call(e)},F=[],N={},x={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};(v=function(e){function u(e,t,n,r,o){var a=function(e){e=e.split("!");var t,n,r,o=F.length,a=e.pop(),i=e.length;for(a={url:a,origUrl:a,prefixes:e},n=0;n<i;n++)r=e[n].split("="),(t=x[r.shift()])&&(a=t(a,r));for(n=0;n<o;n++)a=F[n](a);return a}(e),i=a.autoCallback;a.url.split(".").pop().split("?").shift(),a.bypass||(t&&(t=f(t)?t:t[e]||t[r]||t[e.split("/").pop().split("?")[0]]),a.instead?a.instead(e,t,n,r,o):(N[a.url]?a.noexec=!0:N[a.url]=1,n.load(a.url,a.forceCSS||!a.forceJS&&"css"==a.url.split(".").pop().split("?").shift()?"c":void 0,a.noexec,a.attrs,a.timeout),(f(t)||f(i))&&n.load(function(){c(),t&&t(a.origUrl,o,r),i&&i(a.origUrl,o,r),N[a.url]=2})))}function t(e,t){function n(n,e){if(n){if(p(n))e||(c=function(){var e=[].slice.call(arguments);l.apply(this,e),s()}),u(n,c,t,0,a);else if(Object(n)===n)for(o in r=function(){var e,t=0;for(e in n)n.hasOwnProperty(e)&&t++;return t}(),n)n.hasOwnProperty(o)&&(!e&&!--r&&(f(c)?c=function(){var e=[].slice.call(arguments);l.apply(this,e),s()}:c[o]=function(t){return function(){var e=[].slice.call(arguments);t&&t.apply(this,e),s()}}(l[o])),u(n[o],c,t,o,a))}else!e&&s()}var r,o,a=!!e.test,i=e.load||e.both,c=e.callback||h,l=c,s=e.complete||h;n(a?e.yep:e.nope,!!i),i&&n(i)}var n,r,o=this.yepnope.loader;if(p(e))u(e,0,o,0);else if(w(e))for(n=0;n<e.length;n++)p(r=e[n])?u(r,0,o,0):w(r)?v(r):Object(r)===r&&t(r,o);else Object(e)===e&&t(e,o)}).addPrefix=function(e,t){x[e]=t},v.addFilter=function(e){F.push(e)},v.errorTimeout=1e4,null==d.readyState&&d.addEventListener&&(d.readyState="loading",d.addEventListener("DOMContentLoaded",r=function(){d.removeEventListener("DOMContentLoaded",r,0),d.readyState="complete"},0)),e.yepnope=c(),e.yepnope.executeStack=y,e.yepnope.injectJs=function(e,t,n,r,o,a){var i,c,l=d.createElement("script");r=r||v.errorTimeout;for(c in l.src=e,n)l.setAttribute(c,n[c]);t=a?y:t||h,l.onreadystatechange=l.onload=function(){!i&&m(l.readyState)&&(i=1,t(),l.onload=l.onreadystatechange=null)},g(function(){i||t(i=1)},r),o?l.onload():E.parentNode.insertBefore(l,E)},e.yepnope.injectCss=function(e,t,n,r,o,a){var i;r=d.createElement("link"),t=a?y:t||h;for(i in r.href=e,r.rel="stylesheet",r.type="text/css",n)r.setAttribute(i,n[i]);o||(E.parentNode.insertBefore(r,E),g(t,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};