/*
 package 2019-02-19 
*/

function postMetric(e,t){esri.request({url:"http://gisgate.co.clark.nv.us/gisdal/gisservice.svc/jsonep/addMetric",content:{app:e,RecordedAction:t},handleAs:"json",load:function(e,s){"UserAgent:"==t.substring(0,10)&&(sessionNumber=e)},error:function(e,s){toast(e)}},!0)}function metric_clicks(){}dojo.ready(metric_clicks);