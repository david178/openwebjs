
//************************************************
//**************** FACTORY ***********************
//************************************************
// // Services & Factories Resources:
// // http://jsfiddle.net/manishchhabra/Ne5P8/
// // http://blog.manishchhabra.com/2013/09/angularjs-service-vs-factory-with-example/

// // Additional:
// // https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=using+angular+services+passing+parameters
// // https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=angular%20call%20function%20in%20another%20controller
// // http://www.coderanch.com/t/635490/HTML-CSS-JavaScript/Angular-JS-Syntax-passing-parameters
// // http://stackoverflow.com/questions/9293423/can-one-controller-call-another
// // http://stackoverflow.com/questions/16931255/angularjs-how-to-pass-values-from-controller-to-service-method
// // http://stackoverflow.com/questions/17952620/angularjs-service-passing-data-between-controllers

// // keeping the promise in the service as an object on the service with $q defferred promises:
// http://stackoverflow.com/questions/21416298/angularjs-access-stored-data-in-a-factory-after-a-http-call



//************************************************
//************* MODULE INSTANTIATION *************
//************************************************

//Grab the module
var open = angular.module('open', ['ui.bootstrap']); //, 'ngAnimate'

//************************************************
//************************************************
//************************************************




open.factory('openFactory', function($http, $q){

    return {

	    getZoning: function(theX,theY) { //-----------------------------------------------------

	      // Create the deffered object
	      var deferred = $q.defer();

	      $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getZoning?Xcoordinate='+theX+'&Ycoordinate='+theY+'&inputSpatialReferenceWKID=102707'+'&callback=JSON_CALLBACK').then(function(resp) {
	        deferred.resolve(resp.data);
	      });
	       
	      return deferred.promise;

	    },
	    getPLU: function(theX,theY) { //-----------------------------------------------------

	      // Create the deffered object
	      var deferred = $q.defer();

	      $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getPlannedLandUse?Xcoordinate='+theX+'&Ycoordinate='+theY+'&wkid=102707&returnGeom=false'+'&callback=JSON_CALLBACK').then(function(resp) {
	        deferred.resolve(resp.data);
	      });
	       
	      return deferred.promise;

	    },
	    getCommunityDist: function(theX,theY) { //-----------------------------------------------------

	    //**** Need to update service to hit communitydistricts Layer: CDBNRY_P (ID: 6)   TO return number
	    //http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/communitydistricts/MapServer/6

	      // Create the deffered object
	      var deferred = $q.defer();

	      http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/communitydistricts/MapServer



	      // $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getPlannedLandUse?Xcoordinate='+theX+'&Ycoordinate='+theY+'&wkid=102707&returnGeom=false'+'&callback=JSON_CALLBACK').then(function(resp) {
	      //   deferred.resolve(resp.data);
	      // });
	       
	      return deferred.promise;

	    },
	    getFloodZoneInfo: function(attr) { //-----------------------------------------------------

	      // Create the deffered object
	      var deferred = $q.defer();

			$http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getFloodZoneInfo?parcel='+attr.parcel+'&callback=JSON_CALLBACK').then(function(resp) {
			  deferred.resolve(resp.data);
			});
        
	      return deferred.promise;

	    },
        getArielFlightDate: function(theX,theY) { //-----------------------------------------------------

          // Create the deffered object
          var deferred = $q.defer();

          //current map
          var currentMap = "Most Current Flight (County)";
          
			$http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getAerialFlightDate?Xcoordinate='+theX+'&Ycoordinate='+theY+'&wkid=102707&flightName='+currentMap+'&callback=JSON_CALLBACK').then(function(resp) {
			  deferred.resolve(resp.data);
			});
          
          return deferred.promise;

        },
        getOfficials: function(theX,theY) { //-----------------------------------------------------
          // Create the deffered object
          var deferred = $q.defer();
          
          // $http.get('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getElectedOfficials?Xcoordinate='+theX+'&Ycoordinate='+theY+'&wkid=102707'+'&callback=JSON_CALLBACK').then(function(resp) {
          //   deferred.resolve(resp.data);
          // });

			$http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getElectedOfficials?Xcoordinate='+theX+'&Ycoordinate='+theY+'&wkid=102707'+'&callback=JSON_CALLBACK').then(function(resp) {
			  deferred.resolve(resp.data);
			});

			// $http.get('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getElectedOfficials?Xcoordinate='+theX+'&Ycoordinate='+theY+'&wkid=102707'+'&callback=JSON_CALLBACK').then(function(data,attr) {
			//   deferred.resolve(data);
			// });
          
          return deferred.promise;
        },
	    getSelectPropertyLinks: function(attr) { //-----------------------------------------------------
	      // Create the deffered object
	      var deferred = $q.defer();

			$http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getSelectPropertyLinks?parcel='+attr.parcel+'&callback=JSON_CALLBACK').then(function(resp) {
			  
			    //Formatting the data object---------------------------------

			    var soilsLink = document.getElementById("infoLink4");

			    //SaleDate (null result)
			    if (resp.data.SoilGuidlinesLink === null || resp.data.SoilGuidlinesLink === "") {
			      soilsLink.innerHTML = "Soil Guidelines Map Not Available";
			      soilsLink.target = "_self";
			      resp.data.SoilGuidlinesLink = "javascript:void(0)";
			    }
			    else {
			      soilsLink.innerHTML = "Soil Guidelines Map";
			      soilsLink.target = "_blank";
			    }

			  deferred.resolve(resp.data);
			});
	      
	      return deferred.promise;
	    },
	    getSCLZip: function(address) { //-----------------------------------------------------

    	  // getSCLZip: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getSCLZip

    	  // siteAddress
    	  //   500 S  GRAND CENTRAL PKWY


	      // Create the deffered object
	      var deferred = $q.defer();

	      $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getSCLZip?siteAddress='+address+'&callback=JSON_CALLBACK').then(function(resp) {
	        deferred.resolve(resp.data);
	      });
	       
	      return deferred.promise;

	    },
    	getOverlays: function(theX,theY) { //-----------------------------------------------------

    		// getOverlays: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getOverlays

    		// xCoordinate
    		//   782998.206297993
    		// yCoordinate
    		//   26762232.6248057
    		// wkid
    		//   102707
    		// viewData
    		//   selectproperty


       // Create the deffered object
       var deferred = $q.defer();

       // $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getOverlays?Xcoordinate='+theX+'&Ycoordinate='+theY+'&wkid=102707'+'&viewData=selectproperty'+&callback=JSON_CALLBACK').then(function(resp) {
       //   deferred.resolve(resp.data);
       // });
         
       return deferred.promise;

    	},
      getWeather: function(active,zip) { //-----------------------------------------------------

      //  console.log('the weather is: ' + active)
        //console.log(jurisdiction)

        // Create the deffered object
        var deferred = $q.defer();


        //only make the request if weatherBlock scope is active
        if (active == true)
        {

            // $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getZoning?Xcoordinate='+theX+'&Ycoordinate='+theY+'&inputSpatialReferenceWKID=102707'+'&callback=JSON_CALLBACK').then(function(resp) {
            //   deferred.resolve(resp.data);
            // });

            // view-source:http://www.onextrapixel.com/examples/jquery-yql-weather/
            // http://erikflowers.github.io/weather-icons/

            // Specify the ZIP/location code and units (f or c)
            // var loc = '89128'; // or e.g. SPXX0050

            //check zip for extra digits, if extra, trim 
            if (zip.length > 5)
            {
              var loc =  zip.substring(0, zip.length - 5)
            }
            else
            {
              var loc = zip; // or e.g. SPXX0050
            }


            //Serving Weather Active-------------------------
            console.log("F [[ Weather for" + loc + " ]]");
            

           // var loc =  zip.substring(6, mobileParcel.length - 3)

            // var loc = zip; // or e.g. SPXX0050
            var u = 'f';

            var query = "SELECT item.condition FROM weather.forecast WHERE location='" + loc + "' AND u='" + u + "'";
            var cacheBuster = Math.floor((new Date().getTime()) / 1200 / 1000);
            var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + '&format=json&_nocache=' + cacheBuster;

            window['wxCallback'] = function(data) {
                var info = data.query.results.channel.item.condition;
                $('#wxIcon').css({
                    backgroundPosition: '-' + (61 * info.code) + 'px 0'
                }).attr({
                    title: info.text
                });

                  // $('#wxZip').html(' - ' + zip);
                  $( "#wxInitial" ).remove(); //remove the placeholder
                  $('#wxIcon2').html('')
                  // $('#wxIcon2').append('<img src="http://l.yimg.com/a/i/us/we/52/' + info.code + '.gif" width="34" height="34" title="' + info.text + '" />');
                  $('#wxIcon2').append('<img src="http://gisgate.co.clark.nv.us/gismo/apps/mobile/weather_icons/' + info.code + '.gif" width="34" height="34" title="' + info.text + '" />');
                  // appended = true;
                  $('#wxTemp').html(info.temp + '&deg;' + (u.toUpperCase()));
            };

            $.ajax({
                url: url,
                dataType: 'jsonp',
                cache: true,
                jsonpCallback: 'wxCallback'
            });


        }


        return deferred.promise;




      }//,


















      	// // open.service('testService', function(){
      	// //     this.sayHello= function(text){
      	// //         return "Service says \"Hello " + text + "\"";
      	// //     };        
      	// //     this.sayGoodbye = function(text){
      	// //         return "Service says \"Goodbye " + text + "\"";
      	// //     };   
      	// // });


      	// // function accordionCtrl($scope, testService) //,testFactory
      	// // {
      	// //     $scope.fromService = testService.sayHello("World");
      	// // }


      	// sayHello: function(text){
      	//     return "Factory says \"Hello " + text + "\"";
      	// },
      	// sayGoodbye: function(text){
      	//     return "Factory says \"Goodbye " + text + "\"";
      	// },


      	// getStreetView: function(theX,theY) { //-----------------------------------------------------

      	//   // Create the deffered object
      	//   var deferred = $q.defer();


      	//     $http.jsonp('http://gisgate.co.clark.nv.us/gisdal/gisservice.svc/jsonep/projectPoint?inputWKID='+3421+'&outwkid='+4326+'&Xcoordinate='+theX+'&Ycoordinate='+theY+'&callback=JSON_CALLBACK').success(function(resp){

      	//       var lat = resp.data.yCoordinate;
      	//       var lon = resp.data.xCoordinate;

      	//        var dataUrl = 'http://cbk0.google.com/cbk?output=json&ll=' + lat + ',' + lon + '&';

      	//        //ng hide default
      	//        $scope.toggle = false;

      	//        $http.jsonp(dataUrl+'&callback=JSON_CALLBACK').success(function(data){


      	//         if (data)
      	//         {
      	//             if(strViewOverride === true) {
      	//               //ng show - truthy
      	//               $scope.toggle = false;
      	//             }
      	//             else {
      	//               //ng show - truthy
      	//               $scope.toggle = true;
      	//             }

      	//             $("li#streetViewList").removeClass('disable_StreetList');
      	//             $("li#streetViewList").addClass('enable_StreetList');

      	//           var panoimg_Url = 'http://maps.googleapis.com/maps/api/streetview?size=350x75&pano=' + data.Location.panoId + "&sensor=false";
      	//           var llimg_Url = 'http://maps.googleapis.com/maps/api/streetview?size=350x75&location=' + lat + ',' + lon + "&sensor=false"

      	//           var variantURL00 = 'https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=thumbnail&thumb=2&w=374&h=75' + '&ll=' + lat + ',' + lon
      	//           var variantURL0 = 'https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=thumbnail&thumb=2&location=' + grabAddress
      	//           var variantURL1 = 'https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=thumbnail&thumb=2&panoid=' + data.Location.panoId + '&w=350&h=75&' + '&location=' + grabAddress
      	//           var variantURL11 = 'https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=thumbnail&thumb=2&w=350&h=75' + '&location=' + grabAddress
      	//           var variantURL2 = 'https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=thumbnail&thumb=2&panoid=' + data.Location.panoId  + '&w=350&h=75&yaw=77.896156&pitch=0&location=' + grabAddress
      	//           var variantURL3 = 'https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=thumbnail&thumb=2&panoid=' + data.Location.panoId  + '&w=350&h=75&pitch=0&location=' + grabAddress

      	//           // $scope.street.src = variantURL00; //commented out

      	//           deferred.resolve(variantURL00);
      	          
      	//           return;
      	//         }
      	//         //ADDED
      	//         else {
      	//           //ng show - truthy
      	//           $scope.toggle = false;

      	//           $("li#streetViewList").removeClass('enable_StreetList');
      	//           $("li#streetViewList").addClass('disable_StreetList');

      	//         }

      	//       });

      	//     });


      	//   return deferred.promise;

      	// },


    }  

}); // end - factory





// //************************************************
// //************************************************
// //************************************************























// Services templates ---------------

// ----------------------------------
// ----------------------------------
// New Select Property Calls:

// *****************************
// Property Information | Zoning and Planned LandUse | Legal Description | Elected Officials | Link Info  Panels:

// PointToParcel: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/PointToParcel

// xcoordinate
//   782998.206297993
// yCoordinate
//   26762232.6248057
// returnGeometry
//   true
// wkid
//   102707

//------------------------------------------------------------------------------

// getElectedOfficials: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getElectedOfficials

// Xcoordinate
//   782998.206297993
// Ycoordinate
//   26762232.6248057
// wkid
//   3421

//------------------------------------------------------------------------------

// getPlannedLandUse: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getPlannedLandUse

// xCoordinate
//   782998.206297993
// yCoordinate
//   26762232.6248057
// wkid
//   3421
// returnGeom
//   false

//------------------------------------------------------------------------------

// getZoning: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getZoning

// xCoordinate
//   782998.206297993
// yCoordinate
//   26762232.6248057
// inputSpatialReferenceWKID
//   3421

//------------------------------------------------------------------------------

// getAerialFlightDate: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getAerialFlightDate

// xCoordinate
//   782998.206297993
// yCoordinate
//   26762232.6248057
// inputSpatialReferenceWKID
//   102707
// flightName
//   Most Current Flight (County)

//------------------------------------------------------------------------------

// getOverlays: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getOverlays

// xCoordinate
//   782998.206297993
// yCoordinate
//   26762232.6248057
// wkid
//   102707
// viewData
//   selectproperty

//------------------------------------------------------------------------------

// getSelectPropertyLinks: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getSelectPropertyLinks

// parcel
//   13933710002

//------------------------------------------------------------------------------

// getPropertyInfo: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getPropertyInfo

// parcel
//   13933710002

//------------------------------------------------------------------------------

// getSCLZip: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getSCLZip

// siteAddress
//   500 S  GRAND CENTRAL PKWY


// *****************************
// Ownership History Panel:

// getOwnershipHistory: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getOwnershipHistory

// parcel
//   13933710002


// *****************************
// Flood Zone Panel:

// getFloodZoneInfo: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getFloodZoneInfo

// parcel
//   13933710002


// *****************************

// ----------------------------------
// ----------------------------------


// Additional:

// Overlays Serv:
// Click on it.  If it’s null, don’t show it.  If it isn’t, show it.



// Link Info: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getSelectPropertyLinks?parcel=16314615033

// Aerial Flight Date: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getAerialFlightDate?Xcoordinate=743128.6&Ycoordinate=26742670.79&wkid=102707&flightName=Most%20Current%20Flight%20(County)

// Elected Officials: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getElectedOfficials?Xcoordinate=743128.6&Ycoordinate=26742670.79&wkid=3421

// Planned Landuse (part of Zoning): http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getPlannedLanduse?Xcoordinate=743128.6&Ycoordinate=26742670.79&wkid=3421&returnGeom=false

// Overlays (part of Zoning): http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getOverlays?Xcoordinate=743128.6&Ycoordinate=26742670.79&wkid=102707&viewData=selectproperty

// Property Info (used throughout): http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getPropertyInfo?parcel=16320114063

// ----------------------------------
// ----------------------------------







































// Deprecated Calls -----------------

// ----------------------------------
// ----------------------------------

// //getAerialFlightDate -------------------------------------------------------------
// $scope.getAerialFlightDate = function(theX, theY) {

//   // getAerialFlightDate: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getAerialFlightDate

//   // Aerial Flight Date: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getAerialFlightDate?Xcoordinate=743128.6&Ycoordinate=26742670.79&wkid=102707&flightName=Most%20Current%20Flight%20(County)



//   // xCoordinate
//   //   782998.206297993
//   // yCoordinate
//   //   26762232.6248057
//   // inputSpatialReferenceWKID
//   //   102707
//   // flightName
//   //   Most Current Flight (County)








//     // //buildPropertyInfo 
//     // $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getPropertyInfo?parcel='+attr.parcel+'&callback=JSON_CALLBACK').success(function(data, attr){

//     //   // //COMMENT
//     //   // $scope.getFloodRequest(data);

//     // });





//     // //JSONP call
//     // //getAerialFlightDate 
//     // $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getAerialFlightDate?Xcoordinate='+ event.mapPoint.x +'&Ycoordinate=' + event.mapPoint.y '+&wkid=102707&flightName=Most%20Current%20Flight%20(County)'+'&callback=JSON_CALLBACK').success(function(data){


//     //   alert(data)

//     //   // //COMMENT
//     //   // $scope.getFloodRequest(data);

//     // });



//   // alert(event.mapPoint.x);

//   // var currentMap = Most%20Current%20Flight%20(County)

//   var currentMap = "Most Current Flight (County)";

//   //JSONP calls

//   //$getAerialFlightDate 
//   $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getAerialFlightDate?Xcoordinate='+theX+'&Ycoordinate='+theY+'&wkid=102707&flightName='+currentMap+'&callback=JSON_CALLBACK').success(function(data){

//     //Set Object
//     $scope.aerialDate = data;

//   });

// }
// //------------------------------------------------------------------------------





// //getZoningRequest -------------------------------------------------------------
// $scope.getZoningRequest = function(event) {

//   // getZoning: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getZoning

//   // xCoordinate
//   //   782998.206297993
//   // yCoordinate
//   //   26762232.6248057
//   // inputSpatialReferenceWKID
//   //   3421


//     //JSONP calls

//     //$getZoningRequest 
//     $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getZoning?Xcoordinate='+event.mapPoint.x+'&Ycoordinate='+event.mapPoint.y+'&inputSpatialReferenceWKID=102707'+'&callback=JSON_CALLBACK').success(function(data, attr){

//       //Set Object
//       // $scope.Zoning = data;

//     });

// }
// //------------------------------------------------------------------------------






// //getPlannedLandUse -------------------------------------------------------------
// $scope.getPlannedLandUse = function(event) {

//   // getPlannedLandUse: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getPlannedLandUse

//   // xCoordinate
//   //   782998.206297993
//   // yCoordinate
//   //   26762232.6248057
//   // wkid
//   //   3421
//   // returnGeom
//   //   false



//     //JSONP calls

//     //$getPlannedLandUse 
//     $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getPlannedLandUse?Xcoordinate='+event.mapPoint.x+'&Ycoordinate='+event.mapPoint.y+'&wkid=102707&returnGeom=false'+'&callback=JSON_CALLBACK').success(function(data, attr){

//       //Set Object
//       // $scope.PLU = data;

//     });

// }
// //------------------------------------------------------------------------------






// //getOwnershipHistory -------------------------------------------------------------
// $scope.getOwnershipHistory = function(attr) {


//   console.log('parcel ' + attr)

//   // getOwnershipHistory: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getOwnershipHistory

//   // parcel
//   //   13933710002


//     //JSONP calls

//     //$getOwnershipHistory 
//     $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getOwnershipHistory?parcel='+attr+'&callback=JSON_CALLBACK').success(function(data, attr){

//       //Set Object
//      $scope.ownershipHist = data;

//     // console.log(data);

//     });

// }
// //------------------------------------------------------------------------------





  // //getFloodZoneInfo -------------------------------------------------------------
  // $scope.getFloodZoneInfo = function(attr) {

  //   // getFloodZoneInfo: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getFloodZoneInfo

  //   // parcel
  //   //   13933710002


  //     //JSONP calls

  //     //$getFloodZoneInfo 
  //     $http.jsonp('getFloodZoneInfo: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getFloodZoneInfo?parcel='+attr.parcel+'&callback=JSON_CALLBACK').success(function(data, attr){

  //       //Set Object
  //       // $scope.floodZone = data;

  //     });

  // }
  // //------------------------------------------------------------------------------




  // //getElectedOfficials -------------------------------------------------------------
  // $scope.getElectedOfficials = function(theX, theY) {

  //   // theGlobalX = theX;
  //   // theGlobalY = theY;

  //  // console.log('elec officials hit1 - ' + elecOfficialsFlag)



  //   // getElectedOfficials: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getElectedOfficials

  //   // Xcoordinate
  //   //   782998.206297993
  //   // Ycoordinate
  //   //   26762232.6248057
  //   // wkid
  //   //   3421

  //     //JSONP calls

  //    // if (elecOfficialsFlag === true) {

  //     //  console.log('elec officials hit2 - ' + elecOfficialsFlag)
        
  //       //$getElectedOfficials 
  //       $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getElectedOfficials?Xcoordinate='+theX+'&Ycoordinate='+theY+'&wkid=102707'+'&callback=JSON_CALLBACK').success(function(data, attr){

  //         //Set Object
  //         $scope.elecOfficial = data;

  //       });

  //   //  }



  // }
  // //------------------------------------------------------------------------------



  // //getSelectPropertyLinks -------------------------------------------------------------
  // $scope.getSelectPropertyLinks = function(attr) {

  //   // getSelectPropertyLinks: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getSelectPropertyLinks

  //   // parcel
  //   //   13933710002



  //     //JSONP calls

  //     //$getSelectPropertyLinks 
  //     $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getSelectPropertyLinks?parcel='+attr.parcel+'&callback=JSON_CALLBACK').success(function(data, attr){


  //       //Formatting the data object---------------------------------

  //       var soilsLink = document.getElementById("infoLink4");

  //       //SaleDate (null result)
  //       if (data.SoilGuidlinesLink === null || data.SoilGuidlinesLink === "") {
  //         soilsLink.innerHTML = "Soil Guidelines Map Not Available";
  //         soilsLink.target = "_self";
  //         data.SoilGuidlinesLink = "javascript:void(0)";
  //       }
  //       else {
  //         soilsLink.innerHTML = "Soil Guidelines Map";
  //         soilsLink.target = "_blank";
  //       }

  //       //Set Object
  //       $scope.linkInfo = data;

  //     });

  // }
  // //------------------------------------------------------------------------------






  //Additional ------------------------------------------------------


  // //getOverlays -------------------------------------------------------------
  // $scope.getOverlays = function(attr) {

  //   // getOverlays: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getOverlays

  //   // xCoordinate
  //   //   782998.206297993
  //   // yCoordinate
  //   //   26762232.6248057
  //   // wkid
  //   //   102707
  //   // viewData
  //   //   selectproperty




  //   //   //JSONP calls

  //   //   //$getOverlays 
  //   //   $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getSelectPropertyLinks?parcel='+attr.parcel+'&callback=JSON_CALLBACK').success(function(data, attr){

  //   //     //Set Object
  //   //     $scope.overlays = data;

  //   //   });

  // }
  // //------------------------------------------------------------------------------

  // //getSCLZip -------------------------------------------------------------
  // $scope.getSCLZip = function(attr) {

  //   // getSCLZip: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getSCLZip

  //   // siteAddress
  //   //   500 S  GRAND CENTRAL PKWY



  //     //JSONP calls

  //     //$getSCLZip 
  //     $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getSCLZip?siteAddress='+grabAddress+'&callback=JSON_CALLBACK').success(function(data, attr){

  //       //Set Object
  //       $scope.sclZip = data;

  //     });

  // }
  // //------------------------------------------------------------------------------
