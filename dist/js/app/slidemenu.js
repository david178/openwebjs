/*
 package 2019-02-19 
*/

!function(e){"use strict";function n(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}var t,a,c;function s(e,s){(t(e,s)?c:a)(e,s)}c="classList"in document.documentElement?(t=function(e,s){return e.classList.contains(s)},a=function(e,s){e.classList.add(s)},function(e,s){e.classList.remove(s)}):(t=function(e,s){return n(s).test(e.className)},a=function(e,s){t(e,s)||(e.className=e.className+" "+s)},function(e,s){e.className=e.className.replace(n(s)," ")}),e.classie={hasClass:t,addClass:a,removeClass:c,toggleClass:s,has:t,add:a,remove:c,toggle:s}}(window);var menuLeft=document.getElementById("cbp-spmenu-s1"),menuRight=document.getElementById("cbp-spmenu-s2"),map=document.getElementById("map"),displayLink=document.getElementById("displayLink"),body=document.body;