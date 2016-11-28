
//************************************************
//************** CONTROLLERS *********************
//************************************************




//************************************************
//************ TypeaheadCtrl *********************
//************************************************

// angular.module('ui.bootstrap.demo', ['ui.bootstrap']);
open.controller('TypeaheadCtrl', function($scope, $http, limitToFilter) {  //limitToFilter limits typeahead result returns

  $scope.selected = undefined;
  $scope.selectedIndex = -1;
  $scope.suggestionsObj = [];



  console.log("C [[ selected: " + $scope.selected + " ]]");





  // $scope.onTheKeyUp = function ($event, $item, $model, $label, $viewValue) {

  //   // if ($event.keyCode === 40) {


  //   //   console.log($scope.asyncSelected);
  //   //   console.log($item + "2");
  //   //   console.log($label + "3");
  //   //   console.log($viewValue);
  //   // }


  // };


  $scope.onTheChange = function ($item, $model, $label) {

   // console.log($scope.asyncSelected);
   // console.log($item + "2");
   // console.log($label + "3");

            // $scope.$item = $item;
            // $scope.$model = $model;
            // $scope.$label = $label;



            // $( "#PropInfoDialog" ).hide();


  };


//THE MAIN SEARCH FUNCTION
  $scope.search = function (theSearch) {

   // console.log('testing')
    
    console.log("C [[ searching: " + theSearch + " ]]");

    $scope.executeSearch(theSearch);

    //pass to ai
    ai(theSearch);
  };



  // $scope.keyPress = function (what, $item, $model, $label, asyncSelected, activeIdx, second, theMatch, $viewValue) {
    // $scope.keyUp = function ($event, $item, $model, $label, asyncSelected, activeIdx, second, theMatch, $viewValue) {
      $scope.keyUp = function ($event,$index,asyncSelected) {

          //Update closeIcon
          //if model is undefined
          if(!asyncSelected){
             $('#closeIcon').hide();

             // // $( "#PropInfoDialog" ).show();
             // $('#PropInfoDialog').css({
             //   'visibility': 'hidden'
             //   // 'visibility': 'visible'
             //   });

          }
          else if(asyncSelected === ''){
            $('#closeIcon').hide();

            // // $( "#PropInfoDialog" ).show();
            // $('#PropInfoDialog').css({
            //   'visibility': 'hidden'
            //   // 'visibility': 'visible'
            //   });

          }
          else {
            $('#closeIcon').show();
          }



         // console.log('char test ' + asyncSelected.length)





        // if (asyncSelected) {

        //   //if there is a value in the model, then show the 'x' close icon
        //   if (asyncSelected.length >= 1) {

        //     $('#closeIcon').show();
            
        //     // $("#closeIcon").css("display", "block");

        //     }
        //     else if (asyncSelected.length < 1) {
        //       $('#closeIcon').hide();

        //       // $("#closeIcon").css("display", "none");
        //     }

        // } else {

        //   $('#closeIcon').hide();
        // }

        // console.log(asyncSelected)






        //get current selectedIndex by place int
        if($event.keyCode===40){//down key, increment selectedIndex
               $event.preventDefault();

               $scope.selectedIndex += 1

               // if($scope.selectedIndex+1 !== scope.suggestions.length){
               //     $scope.selectedIndex++;
               // }
           }
           else if($event.keyCode===38){ //up key, decrement selectedIndex

            $scope.selectedIndex -= 1

               // $event.preventDefault();
               // if($scope.selectedIndex-1 !== -1){
               //     $scope.selectedIndex--;
               // }
           }
           else if($event.keyCode===13){ //enter pressed
               // scope.addToSelectedTags(scope.selectedIndex);
           }





    // //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // //DYNAMIC PropInfo dialog visability onKeyUp
    // $scope.propInfoVis($event.keyCode);
    $scope.propInfoVis(); //COMMENTED OUT



  }






//watch

//ng-model="asyncSelected" ng-change="updateBar(asyncSelected)"

// $scope.updateBar = function(asyncSelected) {
//     if(val === 'test') {
//         scope.bar = 'foo is testing me';
//     } else if (val === 'blah') {
//         $scope.bar = 'foo seems indifferent';
//     } else {
//             $scope.bar = 'I do not understand foo';
//     }
// };


// $scope.updateSync = function(asyncSelected) {
//     // if(val === 'test') {
//     //     scope.bar = 'foo is testing me';
//     // } else if (val === 'blah') {
//     //     $scope.bar = 'foo seems indifferent';
//     // } else {
//     //         $scope.bar = 'I do not understand foo';
//     // }

//     $scope.propInfoVis();

//     console.log('tst')
// };


// //Trying to get the active index
// $scope.$watch('asyncSelected', function(newValue, oldValue) {

//   // // testing = index;

//   //   // console.log(newValue)
//   //   // console.log(oldValue)


//   //   // $scope.propInfoVis();

//   //     if(newValue !== oldValue) {
//   //       $scope.propInfoVis();
//   //       // console.log('a change was made')
//   //     }



//       });




// scope.$watch('selectedIndex',function(val){
//      if(val!==-1) {
//           scope.searchText = scope.suggestions[scope.selectedIndex];
//       }
// });

// $scope.$watch('selectedIndex',function(val){

//   console.log(val)

//      // if(val!==-1) {
//      //      $scope.asyncSelected = $scope.suggestions[$scope.selectedIndex];


//      //  }
// });




// $scope.updateSync = function($index) {
//     // // if(val === 'test') {
//     // //     scope.bar = 'foo is testing me';
//     // // } else if (val === 'blah') {
//     // //     $scope.bar = 'foo seems indifferent';
//     // // } else {
//     // //         $scope.bar = 'I do not understand foo';
//     // // }

//     // $scope.propInfoVis();

//     console.log($index)
// };






  //onSearch (GETS CALLED ON CLICK SELECTION OF DROP DOWN SUGGESTION)
  $scope.onSelect = function ($item, $model, $label) {
   // console.log($model + 'test')
    $scope.executeSearch($model);
  };




  //888888888888888888888888888888888888888888888888//888888888888888888888888888888888888888888888888
  //888888888888888888888888888888888888888888888888//888888888888888888888888888888888888888888888888
  //888888888888888888888888888888888888888888888888//888888888888888888888888888888888888888888888888
  //watches suggestionsObj scope for updates
  $scope.$watch('suggestionsObj', function(newval, oldval) {
    $scope.propInfoVis();
    console.log("C [[ suggestions height: " + $('#tester ul').height() + " ]]");
  });
  //888888888888888888888888888888888888888888888888//888888888888888888888888888888888888888888888888
  //888888888888888888888888888888888888888888888888//888888888888888888888888888888888888888888888888
  //888888888888888888888888888888888888888888888888//888888888888888888888888888888888888888888888888





  //Autocomplete
  $scope.getLocation = function(val) {




         // //ORIG 
         //  var propInfoURL = 'http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/quicksearch?';

         //  return $http.jsonp(propInfoURL +'method=gismo' + '&searchvalue=' + val + '&callback=JSON_CALLBACK').then(function(response){

         //    //set the autocomplete flag to true 
         //    autocompleteDirty = true;

         //    //NEED TO FIGURE OUT HOW TO RETURN MULTIPL
         //    // INCL            console.log($('#tester ul').height());

         //    //return autocomplete data, limited to 5 results
         //    return limitToFilter(response.data, 5);

         //    });





            // //888888888888888888888888888888888888888888888888//888888888888888888888888888888888888888888888888
            // //888888888888888888888888888888888888888888888888//888888888888888888888888888888888888888888888888
            // //888888888888888888888888888888888888888888888888//888888888888888888888888888888888888888888888888
            // //WORKS (but delayed / inconsistent)

            // var propInfoURL = 'http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/quicksearch?';

            // $http.jsonp(propInfoURL +'method=gismo' + '&searchvalue=' + val + '&callback=JSON_CALLBACK').then(function(response){

            //   //set the autocomplete flag to true 
            //   autocompleteDirty = true;

            //   $scope.suggestionsObj = response.data;

            //   });

            // return $scope.suggestionsObj;

            // //888888888888888888888888888888888888888888888888//888888888888888888888888888888888888888888888888
            // //888888888888888888888888888888888888888888888888//888888888888888888888888888888888888888888888888
            // //888888888888888888888888888888888888888888888888//888888888888888888888888888888888888888888888888








            // var propInfoURL = 'http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/quicksearch?';

            // return $http.jsonp(propInfoURL +'method=gismo' + '&searchvalue=' + val + '&callback=JSON_CALLBACK').then(function(response){

            //   //set the autocomplete flag to true 
            //   autocompleteDirty = true;

            //   // $scope.suggestionsObj = response.data;
            //   $scope.suggestionsObj = response.data;
              
            //   return limitToFilter(response.data, 5);

            //   });

            // // return limitToFilter($scope.suggestionsObj, 5);









            // var propInfoURL = 'http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/quicksearch?';

            // return $http.jsonp(propInfoURL +'method=gismo' + '&searchvalue=' + val + '&callback=JSON_CALLBACK').then(function(response){

            //   //set the autocomplete flag to true 
            //   autocompleteDirty = true;

            //   return limitToFilter(response.data, 5);

            //   // $scope.suggestionsObj = response.data;

            //   });

            // // return $scope.suggestionsObj;









            // var propInfoURL = 'http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/quicksearch?';

            // return $http.jsonp(propInfoURL +'method=gismo' + '&searchvalue=' + val + '&callback=JSON_CALLBACK').then(function(response){

            //   //set the autocomplete flag to true 
            //   autocompleteDirty = true;

            //   // $scope.suggestionsObj = response.data;

            //   // $scope.apply($scope.suggestionsObj);

            //   $scope.$apply(function() {
            //               // //wrapped this within $apply
            //               // $scope.message = 'Fetched after 3 seconds'; 
            //               // console.log('message:' + $scope.message);
            //               $scope.suggestionsObj = response.data;


            //             });



            //   return limitToFilter($scope.suggestionsObj, 5);

            //   });

            // // return limitToFilter($scope.suggestionsObj, 5);














//              var propInfoURL = 'http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/quicksearch?';

//              var thisisTest = $http.jsonp(propInfoURL +'method=gismo' + '&searchvalue=' + val + '&callback=JSON_CALLBACK').then(function(response){

//                //set the autocomplete flag to true 
//                // autocompleteDirty = true;

//                //NEED TO FIGURE OUT HOW TO RETURN MULTIPL
//                // INCL            console.log($('#tester ul').height());

//                // $scope.suggestionsObj = 'response.data';

//                // $scope.suggestionsObj += 1;

//                // $scope.suggestionsObj = response.data;

//                // //return autocomplete data, limited to 5 results
//                // return limitToFilter(response.data, 5);

//                autocompleteDirty = true;

// /*               $scope.suggestionsObj = limitToFilter(response.data, 5);*/
//                 $scope.suggestionsObj += 1;


//                 // var h = $scope.suggestionsObj;
//                 //   var w = limitToFilter(response.data, 5);


//                 // var hw=[h,w];
//                 //   return hw;



//                //return autocomplete data, limited to 5 results
//                return [limitToFilter(response.data, 5),$scope.suggestionsObj];

//                });

//              // return thisisTest[0];

//              return thisisTest[0];









         var propInfoURL = 'http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/quicksearch?';

         return $http.jsonp(propInfoURL +'method=gismo' + '&searchvalue=' + val + '&callback=JSON_CALLBACK').then(function(response){

           //set the autocomplete flag to true 
           autocompleteDirty = true;

           //NEED TO FIGURE OUT HOW TO RETURN MULTIPL
           // INCL            console.log($('#tester ul').height());

           // $scope.suggestionsObj = limitToFilter(response.data, 5);

           // $scope.$digest();

           // After a brief timeout, clone and inject the compiled DOM element.
           setTimeout(
               function() {

                   // transclude(
                   //     $scope,
                   //     function( clone ) {

                   //         element.append( clone );

                   //     }
                   // );

                   $scope.suggestionsObj = limitToFilter(response.data, 5);

                   // Tell AngularJS that a change has occurred (this will
                   // invoke various $watch() callbacks).
                   $scope.$digest();

               },
               250
           );


           //return autocomplete data, limited to 5 results
           return limitToFilter(response.data, 5);

           });


  };







  //dynamic propInfoVis -------------------------------------------------------------
  // $scope.propInfoVis = function(evt) {
    $scope.propInfoVis = function() {

    
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // autocompleteIsShowing = $("body .dropdown-menu").is(":visible"); 
    // autocompleteIsShowing = $("#tester .dropdown-menu").is(":visible"); 

    if ($("#tester .dropdown-menu").css('display') == 'none')
    {
        autocompleteIsShowing = false;
       // true
    } else {
      autocompleteIsShowing = true;
    }

    //console.log("[acShowing: " + autocompleteIsShowing + "]");



    
    if (autocompleteIsShowing === true && searchHasCompleted === false) { //AUTOCOMPLETE SHOWING - INITIAL STATE

         $('#PropInfoDialog').css({
           'visibility': 'hidden'
           });
         console.log('C [[ propInfoVis-a[0]' + JSON.stringify($( "#PropInfoDialog" ).position()) + " ]]" );

    }
    else if (autocompleteIsShowing === true && searchHasCompleted === true) { //AUTOCOMPLETE SHOWING & PREV SEARCH ACTIVE





      // setTimeout(
      //     function() {

      //       //prop info results positioning
      //       $( "#PropInfoDialog" ).position({
      //         my: "left top",
      //         at: "left+1 bottom+2",
      //         of: "#tester .dropdown-menu"
      //           // of: "#tester #search-form"
      //       });
      //       // $( "#PropInfoDialog" ).show();
      //       $('#PropInfoDialog').css({
      //         'visibility': 'visible'
      //         });
      //       console.log('C [[ propInfoVis-a[1]' + JSON.stringify($( "#PropInfoDialog" ).position()) + " ]]" );

      //       // console.log(autocompleteIsShowing)

      //     },
      //     50
      //     // 250
      // );

      //prop info results positioning
      $( "#PropInfoDialog" ).position({
        my: "left top",
        at: "left+1 bottom+2",
        of: "#tester .dropdown-menu"
          // of: "#tester #search-form"
      });
      // $( "#PropInfoDialog" ).show();
      $('#PropInfoDialog').css({
        'visibility': 'visible'
        });
      console.log('C [[ propInfoVis-a[1]' + JSON.stringify($( "#PropInfoDialog" ).position()) + " ]]" );

      // console.log(autocompleteIsShowing)





    }

    //autocomplete is not showing, it never has & length is min
    else if (autocompleteIsShowing === false && autocompleteDirty === false && searchHasCompleted === false && $("#tester input").val().length < 3) { //AUTOCOMPLETE HIDDEN - INITIAL STATE  && autocompleteDirty === false

      $('#PropInfoDialog').css({
        'top': 45,
        'left': 240
        });
      // $( "#PropInfoDialog" ).show();
      $('#PropInfoDialog').css({
         'visibility': 'hidden'
        });
      console.log('C [[ propInfoVis-a[2]' + JSON.stringify($( "#PropInfoDialog" ).position()) + " ]]" );

    }
    //autocomplete is not showing, it never has & length is min (SELECT PROP)
    else if (autocompleteIsShowing === false && autocompleteDirty === false && searchHasCompleted === true && $("#tester input").val().length < 3) { //AUTOCOMPLETE HIDDEN - INITIAL STATE  && autocompleteDirty === false

      $('#PropInfoDialog').css({
        'top': 45,
        'left': 240
        });
      // $( "#PropInfoDialog" ).show();
      $('#PropInfoDialog').css({
         // 'visibility': 'visible'
         'visibility': 'hidden'
        });
      console.log('C [[ propInfoVis-a[3]' + JSON.stringify($( "#PropInfoDialog" ).position()) + " ]]" );

    }

    //autocomplete is not showing, it never has & length is long
    else if (autocompleteIsShowing === false && autocompleteDirty === false && searchHasCompleted === false && $("#tester input").val().length > 2) { //AUTOCOMPLETE HIDDEN - INITIAL STATE  && autocompleteDirty === false

      $('#PropInfoDialog').css({
        'top': 45,
        'left': 240
        });
      // $( "#PropInfoDialog" ).show();
      $('#PropInfoDialog').css({
         'visibility': 'hidden'
        });
      console.log('C [[ propInfoVis-a[4]' + JSON.stringify($( "#PropInfoDialog" ).position()) + " ]]" );

    }
    //******************************diff from execute search logic******************
    //autocomplete is not showing, it has before though & length is min (MIN KEY AFTER SEARCH - DO NOT SHOW - this is diff from execute search's logic)
    else if (autocompleteIsShowing === false && autocompleteDirty === true && searchHasCompleted === true && $("#tester input").val().length < 3) { //AUTOCOMPLETE HIDDEN - DIRTY STATE

     // console.log('this needs to hide')

      $('#PropInfoDialog').css({
        'top': 45,
        'left': 240
        });
      // $( "#PropInfoDialog" ).show();
      $('#PropInfoDialog').css({
        'visibility': 'hidden'
        // 'visibility': 'visible'
        });
      console.log('C [[ propInfoVis-a[5]' + JSON.stringify($( "#PropInfoDialog" ).position()) + " ]]" );

    }
    //*******************************************************************************
    //autocomplete is not showing, it has before though & length is long
    else if (autocompleteIsShowing === false && autocompleteDirty === true && searchHasCompleted === true && $("#tester input").val().length > 2) { //AUTOCOMPLETE HIDDEN - DIRTY STATE

      $('#PropInfoDialog').css({
        'top': 45,
        'left': 240
        });
      // $( "#PropInfoDialog" ).show();
      $('#PropInfoDialog').css({
        'visibility': 'visible'
        });
      console.log('C [[ propInfoVis-a[6]' + JSON.stringify($( "#PropInfoDialog" ).position()) + " ]]" );

    }



  }
  //------------------------------------------------------------------------------

});
















//--------------------------------
//mapController
open.controller('mapController',['$scope', '$filter', '$http', 'openFactory', function($scope,$filter,$http,openFactory){



  //Coord System Options
  $scope.coordOptions = [{name: 'State Plane ft. ',value: 'state-plane-ft'}, {name: 'Lat / Long',value: 'lat-long'}];
  $scope.selectedOption = $scope.coordOptions[0];




  //ChangeCoords (updates the coordinate system) -------------------------------
  $scope.changeCoords = function(coordSelected) {

    //Grab an updated locale
    locale = window.location.search.substring(1).split("@")[1]; // new



   // console.log(coordSystem)


    //console.log(coordSelected.value)

    if (coordSelected.value === 'state-plane-ft') //state plane
    {

    //  console.log(coordSystem + '1')

    // console.log($scope.thePoint.Y)




    //Immediate update conversion for the coordSys dropdown & browser url coords
    //convert lat long to state plan x/y

     // // convert the incoming lat lng to state plane for Map center and zoom
      var theURL = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=4326&outSR=102707&f=pjson&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":'+locale.split(",")[1]+',"y":'+locale.split(",")[0]+'}]}';

      //make request for coord conversion
      $http.jsonp(theURL + '&callback=JSON_CALLBACK').success(function(data) {

        // console.log(data.geometries[0].y.toFixed(7));
        // console.log(data.geometries[0].x.toFixed(7));


        //   //bind to info block x/y (immediate)
        //   thedfX = data.geometries[0].y.toFixed(7);
        //   thedfY = data.geometries[0].x.toFixed(7);

        console.log(data.geometries[0].x)

          thedfX = parseInt(data.geometries[0].x);
          thedfY = parseInt(data.geometries[0].y);


          console.log(thedfX,thedfY)

          //set showX & showY vals
          showX.innerHTML = "<b>X: </b>" + thedfX;
          showY.innerHTML = "<b>Y: </b>" + thedfY;








          //immediate update to browser url ---------------------------

          //craft a lat long url
          // var craftedURL = '?@'+data.geometries[0].y.toFixed(7)+','+data.geometries[0].x.toFixed(7);
          var craftedURL = '?@'+thedfX+','+thedfY+','+map.getLevel();


          //update the windows.location url
          if (typeof (history.pushState) != "undefined") {
              var obj = {Page: 'page', Url: craftedURL};
              history.pushState(obj, obj.Page, obj.Url);
          } else {
              window.location.href = "@homePage";
              // alert("Browser does not support HTML5.");
          }





      }).
      error(function (data) {

       console.log("err" + data)

      });















      // //craft a state plane ft url
      // // var craftedURL = '?@'+Math.round(uX)+','+Math.round(uY);
      // var craftedURL = '?@'+Math.round(uX)+','+Math.round(uY)+','+uLVL;


      // //update the windows.location url
      // if (typeof (history.pushState) != "undefined") {
      //     var obj = {Page: 'page', Url: craftedURL};
      //     history.pushState(obj, obj.Page, obj.Url);
      // } else {
      //     window.location.href = "@homePage";
      //     // alert("Browser does not support HTML5.");
      // }


      // //craft a lat long url
      // // var craftedURL = '?@'+data.geometries[0].y.toFixed(7)+','+data.geometries[0].x.toFixed(7);
      // var craftedURL = '?@'+data.geometries[0].y.toFixed(7)+','+data.geometries[0].x.toFixed(7)+','+uLVL;


      // //update the windows.location url
      // if (typeof (history.pushState) != "undefined") {
      //     var obj = {Page: 'page', Url: craftedURL};
      //     history.pushState(obj, obj.Page, obj.Url);
      // } else {
      //     window.location.href = "@homePage";
      //     // alert("Browser does not support HTML5.");
      // }







      //update coorsystem to state plane
      coordSystem = 'state-plane-ft';

    }
    else if (coordSelected.value === 'lat-long') //lat long
    {

      // console.log('test '+document.getElementById('showX').innerHTML)

     // console.log($( "#showX" ).text())

     // console.log($scope.thePoint.X)



      // //grab showX & showY
      // var showX = document.getElementById("showX");
      // var showY = document.getElementById("showY");

      //       $scope.thePoint.X = Math.round(uX);
      //       $scope.thePoint.Y = Math.round(uY);

      //     $scope.thePoint.X = $scope.thePointInfo.X;
      //     $scope.thePoint.Y = $scope.thePointInfo.Y;

      // //set showX & showY vals
      // showX.innerHTML = "<b>X: </b>" + $scope.thePoint.X;
      // showY.innerHTML = "<b>Y: </b>" + $scope.thePoint.Y;





      // //QueryString Params
      // var locale2 = window.location.search.substring(1).split("@")[1]; // new
      // var viewName = $scope.configURLParse('view'); // 
      // var legendBlock = $scope.configURLParse('legend'); // 
      // var weatherBlock = $scope.configURLParse('weather'); //
      // var tab = $scope.configURLParse('tab'); // 
      // var fullmap = $scope.configURLParse('fullmap'); //

      //Immediate update conversion for the coordSys dropdown & browser url coords
      //convert current state plane x/y to lat long

       // // convert the incoming lat lng to state plane for Map center and zoom
       // var theURL = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=102707&outSR=4326&f=pjson&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":'+$scope.thePoint.X+',"y":'+$scope.thePoint.Y+'}]}';

        var theURL = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=102707&outSR=4326&f=pjson&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":'+locale.split(",")[0]+',"y":'+locale.split(",")[1]+'}]}';

        //make request for coord conversion
        $http.jsonp(theURL + '&callback=JSON_CALLBACK').success(function(data) {

          console.log(data.geometries[0].y.toFixed(7));
          console.log(data.geometries[0].x.toFixed(7));


            //bind to info block x/y (immediate)
            thedfX = data.geometries[0].y.toFixed(7);
            thedfY = data.geometries[0].x.toFixed(7);

            //set showX & showY vals
            showX.innerHTML = "<b>X: </b>" + thedfX;
            showY.innerHTML = "<b>Y: </b>" + thedfY;







            //immediate update to browser url ---------------------------

            //craft a lat long url
            // var craftedURL = '?@'+data.geometries[0].y.toFixed(7)+','+data.geometries[0].x.toFixed(7);
            var craftedURL = '?@'+thedfX+','+thedfY+','+map.getLevel();


            //update the windows.location url
            if (typeof (history.pushState) != "undefined") {
                var obj = {Page: 'page', Url: craftedURL};
                history.pushState(obj, obj.Page, obj.Url);
            } else {
                window.location.href = "@homePage";
                // alert("Browser does not support HTML5.");
            }






            // //update the browser url ---------------------------

            // //craft a state plane ft url
            // // var craftedURL = '?@'+Math.round(uX)+','+Math.round(uY);
            // var craftedURL = '?@'+Math.round(uX)+','+Math.round(uY)+','+uLVL;


            // //update the windows.location url
            // if (typeof (history.pushState) != "undefined") {
            //     var obj = {Page: 'page', Url: craftedURL};
            //     history.pushState(obj, obj.Page, obj.Url);
            // } else {
            //     window.location.href = "@homePage";
            //     // alert("Browser does not support HTML5.");
            // }









        }).
        error(function (data) {

         console.log("err" + data)

        });






      //update coorsystem to lat long
      coordSystem = 'lat-long';


    }
    else { //undefined (initial)

    }

    //console.log(coordSystem)

    // if (typeof (history.pushState) != "undefined") {
    //     var obj = {Page: page, Url: url};
    //     history.pushState(obj, obj.Page, obj.Url);
    // } else {
    //     window.location.href = "@homePage";
    //     // alert("Browser does not support HTML5.");
    // }

  }
  //------------------------------------------------------------------------------

  //  $scope.selectedTemplate = function(pTemplate) {
  //     //Your logic
  //     alert('Template Url is : '+pTemplate);
  // }


  // $scope.update = function() {
  //    $scope.item.size.code = $scope.selectedItem.code;
  //    // use $scope.selectedItem.code and $scope.selectedItem.name here
  //    // for other stuff ...
  // }


  // function MyCtrl($scope) {
  //   $scope.sizes = [ {code: 1, name: 'n1'}, {code: 2, name: 'n2'}];
  //   $scope.update = function() {
  //     console.log($scope.item.code, $scope.item.name)
  //   }
  // }

  // // $scope.itemList=[];
  // $scope.blisterPackTemplates=[{id:1,name:"a"},{id:2,name:"b"},{id:3,name:"c"}]
      
  // $scope.changedValue=function(item){
  // // $scope.itemList.push(item.name);
  //   console.log(item.name)
  // }    










  //-----------------------------------------------------------------------------
  //Config (@=750009,26771705/1716JackRabbitWay/Owner&legend=t/f&weather=t/f)

    //ChangeURL (updates the windows location url) -------------------------------
    $scope.changeURL = function(page, url) {

      if (typeof (history.pushState) != "undefined") {
          var obj = {Page: page, Url: url};
          history.pushState(obj, obj.Page, obj.Url);
      } else {
          window.location.href = "@homePage";
          // alert("Browser does not support HTML5.");
      }

    }
    //------------------------------------------------------------------------------

    //window.location href parser for config
    $scope.configURLParse = function(name, url) {
      //http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        // var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        //     results = regex.exec(url);

        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    //Load Saved Settings from Memory --------------------------------------------
    $scope.themeSet = function() {

      if(localStorage.theme === "dark") {
          // set the default layout
          $scope.layout = 'dark'; //county, bright
          console.log("M [[ " + localStorage.theme + " theme applied ]]");
      } 
      else if (localStorage.theme === "light") {
        // set the default layout
        $scope.layout = 'light'; //county, bright
        console.log("M [[ " + localStorage.theme + " theme applied ]]"); 
      }
      else {
        // set the default layout
        $scope.layout = 'county'; //county, bright
        console.log("M [[ " + localStorage.theme + " theme applied ]]");
     }
     //-----------------------------------------


    //Config
    $scope.configLoad = function() {

      //Mod url without page reload
      //http://stackoverflow.com/questions/824349/modify-the-url-without-reloading-the-page


      //-Config Settings-

      //Parcel: @13933710002
      //Address: @500 Grand Central
      //Owner: @CARR LOUIS JR~12419511114 (will improve after update to getSuggestions,getAddressFromLoc)
      //State Plane Ft: @782826,26762144
      //Lat/Long: N/A yet..
      //Map View: view=clark county zoning
      //Legend: legend=t/f
      //Weather: weather=t/f
      //Active Tab: tab=display
      //Full Map: fullmap=t/f

      //Examples of usage
      //http://gisgate.co.clark.nv.us/ow/?@=500 Grand Central
      //http://gisgate.co.clark.nv.us/ow/?@=13933305021
      //http://gisgate.co.clark.nv.us/ow?@=782826,26762144/
      //http://gisgate.co.clark.nv.us/ow/?@=13933305021
      //http://gisgate.co.clark.nv.us/ow?tab=resources
      //http://gisgate.co.clark.nv.us/ow?legend=t/
      //http://gisgate.co.clark.nv.us/ow?owner
      //http://gisgate.co.clark.nv.us/ow/?fullmap=t

      //Chaining
      //http://gisgate.co.clark.nv.us/ow/?@=1525 Pinto&view=clark county zoning&legend=t&tab=display&fullmap=t





          // //?@782826,26762144&legend=t

          // // query string: ?foo=lorem&bar=&baz
          // // var foo = getParameterByName('foo'); // "lorem"
          // // var bar = getParameterByName('bar'); // "" (present with empty value)
          // // var baz = getParameterByName('baz'); // "" (present with no value)
          // // var qux = getParameterByName('qux'); // null (absent)

          // //?foo=lorem&tester=ipsum
          // var foo = getParameterByName('@'); // "lorem"
          // var bar = getParameterByName('tester'); // "" (present with empty value)
          // // var baz = getParameterByName('baz'); // "" (present with no value)
          // // var qux = getParameterByName('qux'); // null (absent)

          // console.log(foo)
          // console.log(bar)
          // // console.log(baz)
          // // console.log(qux)

          //?@782826,26762144&legend=t

          // query string: ?foo=lorem&bar=&baz
          // var foo = getParameterByName('foo'); // "lorem"
          // var bar = getParameterByName('bar'); // "" (present with empty value)
          // var baz = getParameterByName('baz'); // "" (present with no value)
          // var qux = getParameterByName('qux'); // null (absent)

          //?foo=lorem&tester=ipsum
          // var locale = $scope.configURLParse('@'); // old
          var locale = window.location.search.substring(1).split("@")[1]; // new
          var viewName = $scope.configURLParse('view'); // 
          var legendBlock = $scope.configURLParse('legend'); // 
          var weatherBlock = $scope.configURLParse('weather'); //
          var tab = $scope.configURLParse('tab'); // 
          var fullmap = $scope.configURLParse('fullmap'); //


         // // var locale = $scope.localelocaleconfigURLParse('@'); //
         // //queryString = queryString.substring(1).split("@");
         // var queryString = window.location.href;
         // name = name.replace(/[\[\]]/g, "\\$&");

         //  //var locale = queryString.substring(1).split("@");

         //  var locale = queryString[0].split("=");
         // // console.log(name)

         // console.log(locale + 'teset')


         //    var queryString2 = window.location.search;
         // //    // // queryString2 = queryString2.substring(1).split("?");

         // //    // // console.log(queryString2[1]);

         // //    // var queryString2 = window.location.pathname;
         //    queryString2 = queryString2.substring(1).split("@");

         //   // console.log(queryString2[1]);

         //   var local = window.location.search.substring(1).split("@");

         //    var locale = queryString2[1];

           // console.log(locale)

           // console.log(locale[1])


           //  //   legendString = queryString.substring(1).split("legend=");

           //  //   // console.log('legend is' + localeString[1].split("=")[0])




            // var testString = window.location.search.substring(1).split("@")[1];

            // console.log(testString)


            //var locale = window.location.search.substring(1).split("@"); // new


   







          console.log(locale)

        //  console.log(window.location.href) 





          //locale Config -------

          //filter out undefined
          if (locale) {

            // console.log('success')

            //lat/long & state plane
            if (locale.indexOf(",") > -1)
            {

              //lat/long
              // if (locale.split(",")[0] < 0 || locale.split(",")[1] < 0) {
               if (locale.split(",")[0] > 1 && locale.split(",")[1] < 0) {


                //update coorsystem to lat lon
                coordSystem = 'lat-long';
                //update the coords dropdown to lat lon option
                $scope.selectedOption = $scope.coordOptions[1];

                console.log('lat/long')




                //bind vals for universal coord system (to be used in infoblock x/y) 
                $scope.thePointInfo.X = locale.split(",")[0];
                $scope.thePointInfo.Y = locale.split(",")[1];


                //set showX & showY vals (for infoblock) (needs finish)
                // $scope.thePoint.X = $scope.thePointInfo.X;
                // $scope.thePoint.Y = $scope.thePointInfo.Y;

                // //set showX & showY vals
                // showX.innerHTML = "<b>X: </b>" + $scope.thePoint.X;
                // showY.innerHTML = "<b>Y: </b>" + $scope.thePoint.Y;

                // showX.innerHTML = "<b>X: </b>" + locale.split(",")[0];
                // showY.innerHTML = "<b>Y: </b>" + locale.split(",")[1];





                thexc = locale.split(",")[0];
                theyc = locale.split(",")[1];

                // convert the incoming lat lng to state plane for Map center and zoom
                //http://meyerweb.com/eric/tools/dencoder/
                //http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=102707&outSR=4326&geometries={%22geometryType%22:%22esriGeometryPoint%22,%22geometries%22:[{%22x%22:779788,%22y%22:26761500}]}&transformation=&transformForward=true&f=html
                 var theURL = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=4326&outSR=102707&f=pjson&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":'+theyc+',"y":'+thexc+'}]}';

                 //make request for coord conversion
                 $http.jsonp(theURL + '&callback=JSON_CALLBACK').success(function(data) {

                     thedfX = parseInt(data.geometries[0].x);
                     thedfY = parseInt(data.geometries[0].y);

                     // console.log(thedfX,thedfY)
                     // console.log('converted lat long to state plane: ' +thedfX,thedfY);

                     //set centerAndZoom
                     require([
                       "esri/geometry/Point", "esri/SpatialReference"
                     ], function(Point, SpatialReference) {

                       map.centerAndZoom( new Point(thedfX, thedfY, new SpatialReference({ wkid: 102707 }) ),locale.split(",")[2]);

                     });



                 }).
                 error(function (data) {

                  console.log("err" + data)

                 });


















                //center map based on lat long
                // map.centerAt(new Point(-118.15, 33.80));
                // map.centerAt(new Point(locale.split(",")[1], locale.split(",")[0]));

                // require([
                //   "esri/geometry/Point", "esri/SpatialReference", ... 
                // ], function(Point, SpatialReference, ... ) {
                //   new Point(-118.15, 33.80, new SpatialReference({ wkid: 4326 }));
                //   map.centerAt(new Point(locale.split(",")[1], locale.split(",")[0]));
                // });












                //set centerAndZoom
                // require([
                //   "esri/geometry/Point", "esri/SpatialReference"
                // ], function(Point, SpatialReference) {
                //   // new Point(-118.15, 33.80, new SpatialReference({ wkid: 4326 }));
                //   // map.centerAt( new Point(locale.split(",")[0], locale.split(",")[1], new SpatialReference({ wkid: 102707 }) ));

                //   map.centerAndZoom( new Point(locale.split(",")[0], locale.split(",")[1], new SpatialReference({ wkid: 102707 }) ),locale.split(",")[2]);

                //  // console.log(locale.split(",")[2])


                // });







               // // convert the incoming lat lng to state plane for Map center and zoom
               //  var theURL = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=102707&outSR=4326&f=pjson&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":'+thexc+',"y":'+theyc+'}]}';

               //  //make request for coord conversion
               //  $http.jsonp(theURL + '&callback=JSON_CALLBACK').success(function(data) {



               //    //   thedfX = data.geometries[0].y.toFixed(7);
               //    //   thedfY = data.geometries[0].x.toFixed(7);



               //    // //set centerAndZoom
               //    // require([
               //    //   "esri/geometry/Point", "esri/SpatialReference"
               //    // ], function(Point, SpatialReference) {
               //    //   // new Point(-118.15, 33.80, new SpatialReference({ wkid: 4326 }));
               //    //   // map.centerAt( new Point(locale.split(",")[0], locale.split(",")[1], new SpatialReference({ wkid: 102707 }) ));

               //    //   map.centerAndZoom( new Point(thedfX, thedfY, new SpatialReference({ wkid: 102707 }) ),locale.split(",")[2]);

               //    //  // console.log(locale.split(",")[2])


               //    // });






               //  //  console.log(data.geometries[0].x.toFixed(7));
               //    //console.log(data.geometries[0].y.toFixed(7));

               //    // //bind vals for universal coord system (to be used in infoblock x/y)
               //    // $scope.thePointInfo.X = data.geometries[0].y.toFixed(7);
               //    // $scope.thePointInfo.Y = data.geometries[0].x.toFixed(7);


               //    // //craft a lat long url
               //    // // var craftedURL = '?@'+data.geometries[0].y.toFixed(7)+','+data.geometries[0].x.toFixed(7);
               //    // var craftedURL = '?@'+data.geometries[0].y.toFixed(7)+','+data.geometries[0].x.toFixed(7)+','+uLVL;


               //    // //update the windows.location url
               //    // if (typeof (history.pushState) != "undefined") {
               //    //     var obj = {Page: 'page', Url: craftedURL};
               //    //     history.pushState(obj, obj.Page, obj.Url);
               //    // } else {
               //    //     window.location.href = "@homePage";
               //    //     // alert("Browser does not support HTML5.");
               //    // }

               //  }).
               //  error(function (data) {

               //   console.log("err" + data)

               //  });








                
              }
              else //State plane ft
              {

                //update coorsystem to state plane
                coordSystem = 'state-plane-ft';

               // console.log('state plane')

               // angular.element($('#mapDiv')).scope().executeQueryTask(locale[1].split(",")[0],locale[1].split(",")[1]);

               //uncomment for auto re-direct on state-plane
               //specify false for 3rd param to pan to location, but do not execute a select property on property
              // propselect = false;

              //works, but commented out because only want bookmarking on parcel/address 
              //$scope.executeQueryTask(locale.split(",")[0],locale.split(",")[1],'initial');
             // map.centerAt(locale.split(",")[0],locale.split(",")[1]);





              //catch the simple initial extent case
             // if (resolveAs === 'initial') { //else its the initial extent

                //map.graphics.add(gra);
              // map.setExtent(gra.geometry.getExtent(), true); //old
              //}


              // map.centerAt(761466,26779256); 
              // map.centerAt(36.1656043,-115.1519173); 
             // map.centerAt(761466,26779256); 




                //set centerAndZoom
                require([
                  "esri/geometry/Point", "esri/SpatialReference"
                ], function(Point, SpatialReference) {
                  // new Point(-118.15, 33.80, new SpatialReference({ wkid: 4326 }));
                  // map.centerAt( new Point(locale.split(",")[0], locale.split(",")[1], new SpatialReference({ wkid: 102707 }) ));

                  map.centerAndZoom( new Point(locale.split(",")[0], locale.split(",")[1], new SpatialReference({ wkid: 102707 }) ),locale.split(",")[2]);

                 // console.log(locale.split(",")[2])


                });






              }
            }
            //parcel, address, owner
            else if (!locale.indexOf(",") > -1)
            {
              console.log('parcel add owner')

             // console.log(locale)

            //  $scope.ajaxAddress(locale);

              // angular.element($('#mapDiv')).scope().executeSearch(locale[1]);

              //auto re-direct
             $scope.executeSearch(locale);
             // $scope.executeSearch('1716 Jack Rabbit Way');
            }
            else { }

          }
          else { //just set the default initial extent 

           // console.log('fresh extent for first visit - Welcome!')

            console.log("C [[ fresh extent - Welcome! ]]");


            //update coorsystem to state plane - by default
            coordSystem = 'state-plane-ft';

            map.setExtent(initialExtent); 

          }



          //Views config -----------
          //filter out undefined
          if (viewName) {

            console.log(viewName)

                 setTimeout(
                     function() {
                        viewChange(viewName);
                     },
                     250
                 );
          }



          //Legend config ----------
          //filter out undefined
          if (legendBlock) {

            console.log(legendBlock)

            if (legendBlock === "t") {

              $scope.theLegend = true;

            }
            else {

            }

          }


          //Weather config ---------
          //filter out undefined
          if (weatherBlock) {

            console.log(weatherBlock)

            if (weatherBlock === "t") {

              $scope.theWeather = true;

            }
            else { }

          }


          //Tab config -----------
          //filter out undefined
          if (tab) {

              if(tab === "display") {

                setTimeout(
                    function() {
                      $('#introTab').removeClass('active');
                      $('#displayTab').addClass('active');
                      $('#toolsTab').removeClass('active');
                      $('#resourcesTab').removeClass('active');

                      $('.tackLi').removeClass('active');
                      $('.compassLi').addClass('active');
                      $('.pencilLi').removeClass('active');
                      $('.gearLi').removeClass('active');
                    },
                    250
                );

              } 
              else if (tab === "tools") {

                setTimeout(
                    function() {

                      $('#introTab').removeClass('active');
                      $('#displayTab').removeClass('active');
                      $('#toolsTab').addClass('active');
                      $('#resourcesTab').removeClass('active');

                      $('.tackLi').removeClass('active');
                      $('.compassLi').removeClass('active');
                      $('.pencilLi').addClass('active');
                      $('.gearLi').removeClass('active');

                    },
                    250
                );

              }
              else if (tab === "resources") {

                setTimeout(
                    function() {
                       $('#introTab').removeClass('active');
                       $('#displayTab').removeClass('active');
                       $('#toolsTab').removeClass('active');
                       $('#resourcesTab').addClass('active');

                       $('.tackLi').removeClass('active');
                       $('.compassLi').removeClass('active');
                       $('.pencilLi').removeClass('active');
                       $('.gearLi').addClass('active');
                    },
                    250
                );
              }
              else { }

          }

          //Fullmap config -----------
          //filter out undefined
          if (fullmap) {

            if (fullmap === "t") {

              setTimeout(
                  function() {
                     $( "#introToggle" ).trigger( "click" );
                  },
                  250
              );

            }
            else { }

          }



          };







    }
    //---------------------------------------------------------------











    //http://stackoverflow.com/questions/12430820/accessing-clicked-element-in-angularjs

    //saves the theme on a theme change
    $scope.saveTheme = function() {
      localStorage.setItem("theme", $scope.layout);
    };

    // set the default layout
    //$scope.layout = 'county'; //county, bright
    $scope.themeSet();

    //$scope.parcelRedirect();

    // create the list of layout files
    $scope.layouts = [
      { name: 'default', url: 'county' },
      { name: 'county', url: 'county' },
      { name: 'dark', url: 'dark' },
      { name: 'light', url: 'light' }
    ];
    //-----------------------------------------------------------------------------







    //defining scopes
    $scope.thePoint = [];
    $scope.thePointInfo = [];
    $scope.data = [];
    $scope.attr = [];
    $scope.street = [];
    //ng hide default (will hide the streetView Card)
         //ng hide default


     //checkbox toggles:
   //  $scope.MapVToggle9 = true; //default
     // $scope.FlightToggle1 = true;
     $scope.alias = true;
     //StreetView Toggle
     $scope.toggle = true;

    // //Map View & Flight Date defaults
    //  $scope.Most1 = true;

     //Re-direct to assign javascript method reference in controller 
     //(for map view & flight changes)
     $scope.viewChange = viewChange;
     $scope.flightChange = flightChange;


     //PropSelect used in controllers.js executeQueryTask method for limiting new searches -
     // if they need a select property info info or just a pan to location
    // $scope.propselect = true;
     //var propselect = true;
     //var resolveAs;



      // $scope.flightChange = function flightChange(flight) {

      //   console.log('flight')
      // }

      
      // http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/export?bbox=720675.525446917%2c26740644.0923726%2c790953.303224776%2c26783199.6479282&size=1265%2c766&dpi=96&format=png24&transparent=true&imageSR=102707&bboxSR=102707&layers=show%3a1&f=image&

     // $scope.mapviewChange=function(idPassedFromNgClick){
     //     console.log(idPassedFromNgClick);

     // }

     //need to move to display.js and then inject view & flight Obj's as depenencies to use in loop
    //need to update default & seismic
    var viewObj = {"list": [
        {"name3":"Most34","mainName":"Aerial Imagery Only","id1":34,"src1":"http://gisgate.co.clark.nv.us/ArcGIS/rest/services/CACHED/mostcurrentflight/MapServer","addit":" "},
        {"name3":"Most35","mainName":"Assessor Map","id1":35,"src1":"http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer","addit":" "},
        {"name3":"Most36","mainName":"Boulder City Zoning","id1":36,"src1":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/5","addit":" "},
        {"name3":"Most37","mainName":"Clark County PLU","id1":37,"src1":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/PlanedLandUse/MapServer","addit":" "},
        {"name3":"Most38","mainName":"Clark County Zoning","id1":38,"src1":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/8","addit":" "},
        {"name3":"Most39","mainName":"Contours 50 Meter","id1":39,"src1":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_50M/MapServer","addit":" "},
        {"name3":"Most40","mainName":"Contours 2003 5ft (Valley)","id1":40,"src1":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_03_5ft/MapServer","addit":" "},
        {"name3":"Most41","mainName":"Contours 1996 5ft (Valley)","id1":41,"src1":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_96_5ft/MapServer","addit":" "},
        {"name3":"Most42","mainName":"Default","id1":42,"src1":"http://gisgate.co.clark.nv.us/ArcGIS/rest/services/CACHED/mostcurrentflight/MapServer","addit":" "},
        {"name3":"Most43","mainName":"Henderson Zoning","id1":43,"src1":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/6","addit":" "},
        {"name3":"Most44","mainName":"Las Vegas Zoning","id1":44,"src1":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/4","addit":" "},
        {"name3":"Most45","mainName":"Mesquite Zoning","id1":45,"src1":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/10","addit":" "},
        {"name3":"Most46","mainName":"North Las Vegas Zoning","id1":46,"src1":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/7","addit":" "},
        {"name3":"Most47","mainName":"Seismic","id1":47,"src1":"http://gisgate.co.clark.nv.us/ArcGIS/rest/services/CACHED/mostcurrentflight/MapServer","addit":" "},
        {"name3":"Most48","mainName":"Soil Guideline","id1":48,"src1":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/SoilsGuideline/MapServer","addit":" "}
    ]};



     var flightObj = {"list": [
         {"name2":"Most1","name":"Most Current Flight","id":1,"src":"http://gisgate.co.clark.nv.us/ArcGIS/rest/services/CACHED/mostcurrentflight/MapServer","etc":" "},
         {"name2":"Most2","name":"Spring 2014","id":2,"src":"http://gisgate.co.clark.nv.us/ArcGIS/rest/services/CACHED/imagesS14/ImageServer","etc":" "},
         {"name2":"Most3","name":"NAIP 2013","id":3,"src":"http://gisgate.co.clark.nv.us/ArcGIS/rest/services/CACHED/imagesNAIP13/MapServer","etc":" "},
         {"name2":"Most4","name":"Spring 2013","id":4,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS13/MapServer","etc":" "},
         {"name2":"Most5","name":"Spring 2012","id":5,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS12/MapServer","etc":" "},
         {"name2":"Most6","name":"Fall 2011","id":6,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF11/MapServer","etc":" "},
         {"name2":"Most7","name":"Spring 2011 (6 in.)","id":7,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesSNWAS11/MapServer","etc":" "},
         {"name2":"Most8","name":"Fall 2010 (6 in.)","id":8,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesSNWAF10/MapServer","etc":" "},
         {"name2":"Most9","name":"NAIP 2010","id":9,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesNAIP10/MapServer","etc":" "},
         {"name2":"Most10","name":"Spring 2010","id":10,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS10/MapServer","etc":" "},
         {"name2":"Most11","name":"Fall 2009","id":11,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF09/MapServer","etc":" "},
         {"name2":"Most12","name":"Spring 2009","id":12,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS09/MapServer","etc":" "},
         {"name2":"Most13","name":"Fall 2008","id":13,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF08/MapServer","etc":" "},
         {"name2":"Most14","name":"Spring 2008","id":14,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS08/MapServer","etc":" "},
         {"name2":"Most15","name":"Fall 2007","id":15,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF07/MapServer","etc":" "},
         {"name2":"Most16","name":"Spring 2007","id":16,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS07/MapServer","etc":" "},
         {"name2":"Most17","name":"Fall 2006","id":17,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF06/MapServer","etc":" "},
         {"name2":"Most18","name":"Spring 2006","id":18,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS06/MapServer","etc":" "},
         {"name2":"Most19","name":"Fall 2005","id":19,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF05/MapServer","etc":" "},
         {"name2":"Most20","name":"Spring 2005","id":20,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS05/MapServer","etc":" "},
         {"name2":"Most21","name":"Fall 2004","id":21,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF04/MapServer","etc":" "},
         {"name2":"Most22","name":"Spring 2004","id":22,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS04/MapServer","etc":" "},
         {"name2":"Most23","name":"Fall 2003","id":23,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF03/MapServer","etc":" "},
         {"name2":"Most24","name":"Spring 2003","id":24,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS03/MapServer","etc":" "},
         {"name2":"Most25","name":"Fall 2002","id":25,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF02/MapServer","etc":" "},
         {"name2":"Most26","name":"Spring 2002","id":26,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS02/MapServer","etc":" "},
         {"name2":"Most27","name":"Fall 2001","id":27,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF01/MapServer","etc":" "},
         {"name2":"Most28","name":"Spring 2001","id":28,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS01/MapServer","etc":" "},
         {"name2":"Most29","name":"Fall 2000","id":29,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF00/MapServer","etc":" "},
         {"name2":"Most30","name":"Spring 2000","id":30,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS00/MapServer","etc":" "},
         {"name2":"Most31","name":"Fall 1999","id":31,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF99/MapServer","etc":" "},
         {"name2":"Most32","name":"Spring 1999","id":32,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS99/MapServer","etc":" "},
         {"name2":"Most33","name":"Fall 1998","id":33,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF98/MapServer","etc":" "}
     ]};




     $scope.Views = [];

     //constructing the mapView List Object ----------------
     var vResults = [];

     for (var i=0 ; i < viewObj.list.length ; i++)
     {
         vResults.push(viewObj.list[i]); //need to add price to each item return

      }
      //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

     $scope.Views = vResults;



     // $scope.Views = [];

     // //constructing the mapView List Object ----------------
     // var vResults = [];

     // for (var i=0 ; i < flightObj2.list.length ; i++)
     // {
     //     vResults.push(flightObj2.list[i]); //need to add price to each item return

     //  }
     //  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

     // $scope.Views = vResults;



     $scope.Flights = [];

     //constructing the mapView List Object ----------------
     var fResults = [];

     for (var i=0 ; i < flightObj.list.length ; i++)
     {
         fResults.push(flightObj.list[i]); //need to add price to each item return

      }
      //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

     $scope.Flights = fResults;








     // $scope.searchResults = [];

     //   //constructing the mapView List Object ----------------
     //   var results = [];

     //   for (var i=0 ; i < mapViewObj.list.length ; i++)
     //   {
     //       results.push(mapViewObj.list[i]); //need to add price to each item return

     //    }
     //    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

     //   $scope.searchResults = results;




    $scope.addressGraber = [];
    $scope.aerialDate = [];
    $scope.elecOfficial = [];
    $scope.linkInfo = [];

    //used in the development and manipulation of the address string (1709)
    // var grabAddress;
    var grabAddress, streetEndDecide, streetEndLast, streetDir;
    var streetTypes = ['ALY','ANX','AVE','BND','BLF','BLVD','BRK','BYP','CYN','CIR','CT','CV','CRK','CRES','CRST',
              'XING','DR','EXPY','FRK','FWY','HTS','HWY','HL','JCT','LN','LOOP','MTN','PARK','PKWY','PASS','PATH',
              'PL','PLZ','PT','RNCH','RDG','RD','RTE','RUN','SPG','SPUR','SQ','STRA','ST','SMT','TER','TRAK',
              'TRL','VLY','VW','VIS','WALK','WAY'];







    //Search (search-form) -----------------------------------------------------
    $scope.executeSearch = function(val) {

      //console.log(val)


     // console.log('hit inner')

        //Regex Patterns:

        //Match both alphabetic & numerical characters for address search
        var addressPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])/;

        //Match only numerical characters for APN search
        var apnPattern = /(?![a-zA-Z]).*/;


        try {

          //*Owner*
          if (val.indexOf("~") > -1)
          {
            //remove all non-alphabetic characters
            val = val.replace(/\D/g,'');

            //execute to find owner by APN
            $scope.ajaxAPN(val);

            return;
          }
          //*Address*
          else if (val.match(addressPattern))
          {
            //execute to find address
            $scope.ajaxAddress(val);

            return;
          }
          //*APN*
          else if (val.match(apnPattern))
          {
            //execute to find apn
            $scope.ajaxAPN(val);

            return;
          }
          // //*State Plan Ft*
          // else if (val.indexOf("@") > -1)
          // {
          //   //execute to find state plan ft
          //   // $scope.ajaxAPN(val);
          //   // $scope.executeQueryTask(xcoord, ycoord);
          //   // $scope.executeQueryTask(xcoord, ycoord);

          //   console.log(val)

          //   return;
          // }
          else
          {
            console.log('none')

            return;
          }

        }
        catch(err) {

          return;
        }


    }
    //------------------------------------------------------------------------------


    //Address Search (search-form) -----------------------------------------------------
    $scope.ajaxAddress = function(address) {


     // console.log('hit address search')

      //console.log(address)

       var searchURL = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CompositLocator/GeocodeServer/findAddressCandidates?';


       // var searchURL = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/Locators/Clark_County_Composite_All/GeocodeServer/findAddressCandidates?';

        //new
        //http://gisgate.co.clark.nv.us/arcgis/rest/services/Locators/Clark_County_Composite_All/GeocodeServer/findAddressCandidates?Street=1716+Jack+Rabbit+Way&SingleLine=&category=&outFields=&outSR=&f=pjson



       // http://gisgate.co.clark.nv.us/arcgis/rest/services/Locators/Clark_County_Composite_All/GeocodeServer


       // var searchURLformed = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/Locators/Clark_County_Composite_All/GeocodeServer/findAddressCandidates?Street=1716+Jack+Rabbit&SingleLine=&category=&outFields=&outSR=&f=pjson';


       //&maxLocations=


          return $http.jsonp(searchURL +'Street=' + address + '&SingleLine=' + '' + '&outFields=' + '' + '&outSR=' + '' + '&searchExtent=' +  '' + '&f=' + 'pjson' + '&callback=JSON_CALLBACK').then(function(response){

            // return $http.jsonp(searchURLformed + '&callback=JSON_CALLBACK').then(function(response){



            try {

              // var theAddress = response.data.candidates[0].address;
              var xcoord = response.data.candidates[0].location.x;
              var ycoord = response.data.candidates[0].location.y;
              // xcoord = response.data.candidates[0].location.x;
              // ycoord = response.data.candidates[0].location.y;

                // // if (theAddress === null) {
                // // console.log("Address not found!");
                // // } else {
                // //-------------------------------------------------------------------
                // //-------------------------------------------------------------------
                // var point = new esri.geometry.Point({
                // "x" : xcoord,
                // "y" : ycoord,
                // "spatialReference" : {
                // "wkid" : 102707
                // }

                // });

                // var factor = 1;

                // //old
                // var polygonJson = {
                // "rings" : [[[xcoord, ycoord], [xcoord + factor, ycoord + factor], [xcoord - factor, ycoord - factor]]],
                // "spatialReference" : {
                // "wkid" : 102707
                // }
                // };
                // var polygon = new esri.geometry.Polygon(polygonJson);

                // var gra = new esri.Graphic(polygon);
                // map.setExtent(gra.geometry.getExtent(), true);


                //updated
                // var Myrings = {
                // "rings" : [[[xcoord, ycoord], [xcoord + factor, ycoord + factor], [xcoord - factor, ycoord - factor]]],
                // "spatialReference" : {
                // "wkid" : 102707
                // }
                // };
                // map.graphics.clear();
                //  var myPolygon = {
                //    "geometry" : JSON.parse(Myrings),
                //    "symbol" : {
                //      "color" : [100, 0, 0, 64],
                //      // "outline" : {
                //      //   "color" : [100, 0, 0, 255],
                //      //   "width" : 1,
                //      //   "type" : "esriSLS",
                //      //   "style" : "esriSLSSolid"
                //      "outline" : {
                //        "color" : [212, 121, 224, 255],
                //        "width" : 3,
                //        "type" : "esriSLS",
                //        "style" : "esriSLSSolid"

                //      },
                //      "type" : "esriSFS",
                //      "style" : "esriSFSSolid"
                //      }
                //    };
                // var gra = new esri.Graphic(myPolygon);
                // map.graphics.add(gra);

                // map.setExtent(gra.geometry.getExtent(), true);



                // //Set new graphic
                // map.graphics.clear();

                // var loc_symbol = new esri.symbol.PictureMarkerSymbol({
                // "angle":0,
                // "xoffset":0,
                // "yoffset":10,
                // "type":"esriPMS",
                // "url":"images/pin.png",
                // "contentType":"image/png",
                // "width":24,
                // "height":24
                // });

                // currentGraphic = new esri.Graphic(point, loc_symbol);
                // map.graphics.add(currentGraphic);



              
              // }

            }
            catch(err) { }


            //added-----------------------------
             //Call to executeQueryTask
             //Call the 'mapController' controller found on map element (pass in evt param)
            //$scope.propselect = true;
           // propselect = 'true';
            $scope.executeQueryTask(xcoord, ycoord, 'search'); //propselect

           // console.log(propselect)

            //$scope.executeQueryTask(1, 2, false); //test

          });



    }
    //------------------------------------------------------------------------------



    //APN Search (search-form) -----------------------------------------------------
    $scope.ajaxAPN = function(apn) {

      console.log('hit apn search')


      //console.log(apn)

      var searchURL = 'http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/parcelSearch?';

        return $http.jsonp(searchURL +'method=gismo' + '&parcel=' + apn + '&callback=JSON_CALLBACK').then(function(response){ //apn.length

          try {

              //old
              // if (response.data.rings.length > 0) {
              //   var Myrings = "{\"rings\" :" + response.data.rings + ",\"spatialReference\":{\"wkid\":102707}}";
              //   map.graphics.clear();
              //   var myPolygon = {

              //     "geometry" : JSON.parse(Myrings)

              //   };
              //   var gra = new esri.Graphic(myPolygon);

              //   if (apn.length == 11) {
              //     var polygonSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.5]));
              //     gra.setSymbol(polygonSymbol);
              //     map.graphics.add(gra);


              //new - added from address
              if (response.data.rings.length > 0) {
                var Myrings = "{\"rings\" :" + response.data.rings + ",\"spatialReference\":{\"wkid\":102707}}";
                map.graphics.clear();
                 var myPolygon = {
                   "geometry" : JSON.parse(Myrings),
                   "symbol" : {
                    // "color" : [212, 121, 224, 255],
                    "color" : [255, 255, 0, 0.3],
                     // "outline" : {
                     //   "color" : [100, 0, 0, 255],
                     //   "width" : 1,
                     //   "type" : "esriSLS",
                     //   "style" : "esriSLSSolid"
                     "outline" : {
                       "color" : [212, 121, 224, 255],
                       "width" : 3,
                       "type" : "esriSLS",
                       "style" : "esriSLSSolid"

                     },
                     "type" : "esriSFS",
                     "style" : "esriSFSSolid"
                   }
                 };
                var gra = new esri.Graphic(myPolygon);

                if (apn.length == 11) {
                  // var polygonSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.5]));
                  // gra.setSymbol(polygonSymbol);
                  map.graphics.add(gra);





                  // //log metric for 'getParcel' (if apn search was initiated by a getparcel request)
                  // if (document.URL.indexOf("getparcel") > -1)
                  // {
                  //   //grab the sessionNumber
                  //   newSess = document.getElementById("sessionNumber");
                  //   //strip numericals
                  //   var theParcel = document.URL.replace( /^\D+/g, '');
                  //   //log metric
                  //   postMetric(productCode,newSess + ":GetParcel - " + theParcel);
                  // }
                }
               // map.setExtent(gra.geometry.getExtent(), true); //old
                map.centerAt(gra.geometry.getExtent().getCenter()); //new

              } else {
                console.log("C [[ parcel not found ]]");
              }


          }
          catch(err) { }



          // //added-----------------------------
          //  //Call to executeQueryTask
          //  //Call the 'mapController' controller found on map element (pass in evt param)
          // $scope.executeQueryTask(xcoord, ycoord);




        });

    }
    //------------------------------------------------------------------------------















    //theMove (Map Mousemove) -----------------------------------------------------
    $scope.mapevtMouseMove = function(uX,uY) {

      // var showX = document.getElementById("showX");
      // var showY = document.getElementById("showY");

      // if (showX) { //check if exists 
      //     $scope.thePoint.X = Math.round(uX);
      //     $scope.thePoint.Y = Math.round(uY);
      //     showX.innerHTML = "<b>X: </b>" + $scope.thePoint.X;
      //     showY.innerHTML = "<b>Y: </b>" + $scope.thePoint.Y;
      // }

      // console.log(coordSystem)




      //grab showX & showY
      var showX = document.getElementById("showX");
      var showY = document.getElementById("showY");


      if (coordSystem === 'state-plane-ft') //state plane (default)
      {
        if (showX) { //check if exists 
            $scope.thePoint.X = Math.round(uX);
            $scope.thePoint.Y = Math.round(uY);

            //set showX & showY vals
            showX.innerHTML = "<b>X: </b>" + $scope.thePoint.X;
            showY.innerHTML = "<b>Y: </b>" + $scope.thePoint.Y;


        }
      }
      else if (coordSystem === 'lat-long') //lat long
      {
        if (showX) { //check if exists 

          if ($scope.thePointInfo.X) { //check if not undefined first 
            //(or else it will keep x & y parsed in from coordChange event until next extent change trigger)

            $scope.thePoint.X = $scope.thePointInfo.X;
            $scope.thePoint.Y = $scope.thePointInfo.Y;

            //set showX & showY vals
            showX.innerHTML = "<b>X: </b>" + $scope.thePoint.X;
            showY.innerHTML = "<b>Y: </b>" + $scope.thePoint.Y;

          }


        }


      }








    }
    //------------------------------------------------------------------------------



    //theMove (Map Mousemove) -----------------------------------------------------
    $scope.mapevtExtentChange = function(uX,uY,uLVL) {

    //  console.log(uX,uY)

   // console.log('uvel' + uLVL)



     if (coordSystem === 'state-plane-ft') //state plane (default)
     {
       // if (showX) { //check if exists 
       //     $scope.thePoint.X = Math.round(uX);
       //     $scope.thePoint.Y = Math.round(uY);
       // }


       //craft a state plane ft url
       // var craftedURL = '?@'+Math.round(uX)+','+Math.round(uY);
       var craftedURL = '?@'+Math.round(uX)+','+Math.round(uY)+','+uLVL;


       //update the windows.location url
       if (typeof (history.pushState) != "undefined") {
           var obj = {Page: 'page', Url: craftedURL};
           history.pushState(obj, obj.Page, obj.Url);
       } else {
           window.location.href = "@homePage";
           // alert("Browser does not support HTML5.");
       }




     }
     else if (coordSystem === 'lat-long') //lat long
     {


      // $scope.thePointNew.X = Math.round(uX);
      // $scope.thePointNew.Y = Math.round(uY);
       // if (showX) { //check if exists 


       //  //grab showX & showY
       //  var showX = document.getElementById("showX");
       //  var showY = document.getElementById("showY");


       //  if (showX) { //check if exists 
       //      $scope.thePoint.X = Math.round(uX);
       //      $scope.thePoint.Y = Math.round(uY);
       //  }

       //  //set showX & showY vals
       //  showX.innerHTML = "<b>X: </b>" + $scope.thePoint.X;
       //  showY.innerHTML = "<b>Y: </b>" + $scope.thePoint.Y;



       // }



       var theURL = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=102707&outSR=4326&f=pjson&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":'+uX+',"y":'+uY+'}]}';

       //make request for coord conversion
       $http.jsonp(theURL + '&callback=JSON_CALLBACK').success(function(data) {

         console.log(data.geometries[0].x.toFixed(7));
         console.log(data.geometries[0].y.toFixed(7));

         //bind vals for universal coord system (to be used in infoblock x/y)
         $scope.thePointInfo.X = data.geometries[0].y.toFixed(7);
         $scope.thePointInfo.Y = data.geometries[0].x.toFixed(7);


         //craft a lat long url
         // var craftedURL = '?@'+data.geometries[0].y.toFixed(7)+','+data.geometries[0].x.toFixed(7);
         var craftedURL = '?@'+data.geometries[0].y.toFixed(7)+','+data.geometries[0].x.toFixed(7)+','+uLVL;


         //update the windows.location url
         if (typeof (history.pushState) != "undefined") {
             var obj = {Page: 'page', Url: craftedURL};
             history.pushState(obj, obj.Page, obj.Url);
         } else {
             window.location.href = "@homePage";
             // alert("Browser does not support HTML5.");
         }

       }).
       error(function (data) {

        console.log("err" + data)

       });


     }











     // function ChangeUrl(page, url) {
     //     if (typeof (history.pushState) != "undefined") {
     //         var obj = {Page: page, Url: url};
     //         history.pushState(obj, obj.Page, obj.Url);
     //     } else {
     //         window.location.href = "@homePage";
     //         // alert("Browser does not support HTML5.");
     //     }
     // }

     // $scope.ChangeUrl('Page1', '@homePage');








      // //buildPropertyInfo 
      // $http.jsonp(theURL + '&callback=JSON_CALLBACK').success(function(data) {

      //   console.log(data)

      // }).
      // error(function (data) {



      // });










      // $.ajax("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/project?inSR=4326&outSR=102707&geometries={'geometryType':'esriGeometryPoint','geometries':[{'x':"+point.x+",'y':"+point.y+"}]}", function(data, status){
      //         console.log("Data: " + data + "\nStatus: " + status);
      //     });



        // //new
        // var theURL = 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/project?';

        // //buildPropertyInfo 
        // $http.jsonp(theURL +'inSR=4326' + 'outSR=102707' + '&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":'+uX+',"y":'+uY+'}]}' +
        //   '&callback=JSON_CALLBACK').
        // success(function(data) {

        //   console.log(data)

          
        // }).
        // error(function (data) {



        // });







      // var showX = document.getElementById("showX");
      // var showY = document.getElementById("showY");

      // if (showX) { //check if exists 
      //     $scope.thePoint.X = Math.round(event.mapPoint.x);
      //     $scope.thePoint.Y = Math.round(event.mapPoint.y);
      //     showX.innerHTML = "<b>X: </b>" + $scope.thePoint.X;
      //     showY.innerHTML = "<b>Y: </b>" + $scope.thePoint.Y;
      // }

    }
    //------------------------------------------------------------------------------






























    //executeQueryTask -------------------------------------------------------------
    $scope.executeQueryTask = function(theX, theY, resolveAs) {

      // //catch the simple initial extent case
      // if (resolveAs === 'initial') { //else its the initial extent

      //   //map.graphics.add(gra);
      // // map.setExtent(gra.geometry.getExtent(), true); //old
      // }


        //new
        var propInfoURL = 'http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/PointToParcel?';

        //buildPropertyInfo 
        $http.jsonp(propInfoURL +'method=gismo' + '&xcoordinate=' + 
          theX + '&ycoordinate=' + theY + '&returnGeometry=true&wkid=102707' +
          '&callback=JSON_CALLBACK').
        success(function(data) {






             //if propselect param is true, then also execute to bring up prop info  (true by default)
            // if (propselect === true) {


               var Myrings = "{\"rings\" :" + data.parcelGeometry + ",\"spatialReference\":{\"wkid\":102707}}";

               map.graphics.clear();
               // var myPolygon = {
               //   "geometry" : JSON.parse(Myrings),
               //   "symbol" : {
               //     "color" : [100, 0, 0, 64],
               //     "outline" : {
               //       "color" : [100, 0, 0, 255],
               //       "width" : 1,
               //       "type" : "esriSLS",
               //       "style" : "esriSLSSolid"
               //     },
               //     "type" : "esriSFS",
               //     "style" : "esriSFSSolid"
               //   }
               // };
               var myPolygon = {
                 "geometry" : JSON.parse(Myrings),
                 "symbol" : {
                  // "color" : [212, 121, 224, 255],
                  "color" : [255, 255, 0, 0.3],
                   // "outline" : {
                   //   "color" : [100, 0, 0, 255],
                   //   "width" : 1,
                   //   "type" : "esriSLS",
                   //   "style" : "esriSLSSolid"
                   "outline" : {
                     "color" : [212, 121, 224, 255],
                     "width" : 3,
                     "type" : "esriSLS",
                     "style" : "esriSLSSolid"

                   },
                   "type" : "esriSFS",
                   "style" : "esriSFSSolid"
                 }
               };
               var gra = new esri.Graphic(myPolygon);
               // map.graphics.add(gra);


               // propselect = true;

              // $scope.propselect = true;

              //resolveAs types: select, search

              // console.log($scope.propselect)
              if (resolveAs === 'select') { //if its a select property that triggered the evt

               //then don't zoom OR pan (just highlight)

               //added
               // map.setExtent(gra.geometry.getExtent(), true); //old
               // console.log(gra.geometry.getExtent())
               //map.centerAt(gra.geometry.getExtent().getCenter()); //new

               map.graphics.add(gra);

              }
              if (resolveAs === 'search') { //else set graphics, zoom AND pan

                map.graphics.add(gra);
                map.setExtent(gra.geometry.getExtent(), true); //old
              }
              // if (resolveAs === 'initial') { //else its the initial extent

              //   //map.graphics.add(gra);
              // // map.setExtent(gra.geometry.getExtent(), true); //old
              // }




               // // console.log($scope.propselect)
               // if (propselect === true) { //if its a select property that triggered the evt

               //  //then don't zoom OR pan (just highlight)

               //  //added
               //  // map.setExtent(gra.geometry.getExtent(), true); //old
               //  // console.log(gra.geometry.getExtent())
               //  //map.centerAt(gra.geometry.getExtent().getCenter()); //new

               //  map.graphics.add(gra);

               // }
               // else { //else zoom AND pan
               //  map.setExtent(gra.geometry.getExtent(), true); //old
               // }






              //--------------------------------------------
              //+/+/+/+/+/ Calls to Data Factory /+/+/+/+/+/
              //--------------------------------------------

              //call for Owner (-)
              $scope.getOwnerRequest(data);

              //call for StreetView (-)
              // openFactory.getStreetView(theX,theY).then(function(data) {
              //   $scope.street = data;
              // });
              //OLD >
              $scope.getStreetView(theX, theY);

              //call for Aerial FLight Date (-)
              openFactory.getArielFlightDate(theX,theY).then(function(data) {
                $scope.aerialDate = data;
              });
              //OLD >
              // $scope.getAerialFlightDate(theX, theY);

            // //if elected officials flag is active (set from accordion expand evt)
            // if (elecOfficialsFlag === true) {
            
              //call for Elected Officials  (-)
              openFactory.getOfficials(theX,theY).then(function(data) {
                $scope.elecOfficial = data;
              });
              //OLD >
              // $scope.getElectedOfficials(theX, theY);

            // }

              //call for Links (-)
              openFactory.getSelectPropertyLinks(data).then(function(data) {
                $scope.linkInfo = data;
              });
              //OLD >
              // $scope.getSelectPropertyLinks(data);

              //call for Flood Zone (-)
              openFactory.getFloodZoneInfo(data).then(function(data) {
                $scope.floodZone = data;
              });
              //OLD >
              // $scope.getFloodZoneInfo(data);

              //call for Zoning (-)
              openFactory.getZoning(theX,theY).then(function(data) {
                $scope.zoning = data;
              });

              // //call for PLU (-)
              // openFactory.getCommunityDist(theX,theY).then(function(data) {
              //   $scope.PLU = data;
              // });


              //--------------------------------------------
              //--------------------------------------------




              //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
              //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
              //Set the search has completed flag to true
              //THIS WILL ENABLE THE PROP INFO ELEM TO SHOW UNDER AUTOCOMPLETE RESULTS 
              searchHasCompleted = true;


             // //ADDED FOR MOBILE**************************************
             // map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));

             //bind the attr scope to the response (for attr.parcel binding - on select parcel)
             $scope.attr = data;

            // console.log("parcel is: " + data.parcel)


           // } 
          //  else { //else just pan to location - do not select property

              //need to figure out how to get extent from here and then pan/zoom to location



           // }



          
        }).
        error(function (data) {
          $scope.data = "Request failed";
        });


    }
    //------------------------------------------------------------------------------









    //getOwnerRequest -------------------------------------------------------------
    $scope.getOwnerRequest = function(attr) {


      var mobileParcel = attr.parcel;


        //JSONP calls

        //buildPropertyInfo 
        $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getPropertyInfo?parcel='+attr.parcel+'&callback=JSON_CALLBACK').success(function(data, attr){


          //Formatting the data object---------------------------------

          //SaleDate (null result)
          if (data.SaleDate === null || data.SaleDate === "") {
            data.SaleDate = "Not Available";
          }
          else { 

            //format date
            var a = data.SaleDate;
            var b = "/";
            var position = 4;
            var formattedDate = a.substr(position) + b + a.substr(0, position);

            data.SaleDate = formattedDate;

          }
          //SalePrice (null result)
          if (data.SalePrice === null || data.SalePrice === "") {
            data.SalePrice = "Not Available";
          }
          else { //format currency
            data.SalePrice = $filter('number')(data.SalePrice, '0');
            data.SalePrice = "$" + data.SalePrice;
          }




          //Parcel Classifications ------------------------------

          // ***Public & private right of ways: hook into the 8th character of parcel number:
          // if its a 9, then private, if its a 5, then its public

          // -For Public right of way | Private right of way | property:
          // -Implement a code check to see if the correct int in place contains
          // a 95 / 99 / etc: then display the correct information for it on prop info

          // 124-29-110-141 (Regular Parcel)
          // 124-30-599-009 (Public Right-of-Way)
          // 124-29-195-001 (Private Right-of-Way)

          // 99 – Public Right-of-Way
          // 98 – Railroad Right-of-Way
          // 97 – Subdivision Common Area – Non Assessed
          // 96 – Flood Channel
          // 95 – Private Right-of-Way
          // 90 – Other Areas – Non Assessed

          //use parcel number to call getRowDocNo to get the document number to populate




          //http://stackoverflow.com/questions/27194401/javascript-regex-get-nth-digits-from-string
          rightofwayCheck = mobileParcel.substring(6, mobileParcel.length - 3)

          if (rightofwayCheck === '99') { //Public Right-of-Way

            data.OwnerName = "Public Right-of-Way";

            //SHOW (parcel, owner name, jurisdiction, recorded doc #, aerial flight date)
            //PARCEL: 124-20-299-002
            //OWNER NAME: Public Right-of-Way
            //JURISDICTION: Las Vegas - 89084
            //RECORDED DOC NUMBER: 2003030301068
            //Aerial Flight Date: 03/21/2015
            // $('.spF1').css("display", "block");
            $('.spF1, .spF2, .spF4, .spF9, .spF10').css("display", "block");
            $('.spF3, .spF5, .spF6, .spF7, .spF8').css("display", "none");



            //HIDE (GROUPS: ownership hist panel)
            //(FIELDS: )
            $('.spG4').css("display", "none");





            console.log('C [[ public right-of-way ]]');

           }
           else if (rightofwayCheck === '95') { //Private Right-of-Way

            data.OwnerName = "Private Right-of-Way";

            //SHOW (FIELDS: parcel, owner name, jurisdiction, recorded doc #, aerial flight date)
            //Limit Prop Info panel fields to:
            //PARCEL: 124-20-795-001
            //OWNER NAME: Public Right-of-Way
            //JURISDICTION: Las Vegas - 89084
            //RECORDED DOC NUMBER: 2003030301068
            //Aerial Flight Date: 03/21/2015
            // $('.spF1').css("display", "block");
            $('.spF1, .spF2, .spF4, .spF9, .spF10').css("display", "block");
            $('.spF3, .spF5, .spF6, .spF7, .spF8').css("display", "none");


            //HIDE (GROUPS: ownership hist panel)
            $('.spG4').css("display", "none");
            





           console.log('C [[ private right-of-way ]]');

           }
           else { //Regular Parcel

            //SHOW (all fields & groups)
            $('.spF1, .spF2, .spF3, .spF4, .spF5, .spF6, .spF7, .spF8, .spF9, .spF10').css("display", "block");
            $('.spG4').css("display", "block");



            console.log('C [[ regular parcel ]]');

           }

          // (returns jurisdiction, zip, doc number, aerial flight date, etc
          // >If data.SiteAddress = null, then fill in: 
          // Parcel: The Parcel Number
          // Owner Name(s): Public Right-of-Way
          // Jurisdiction: City & Zip (Ex: Las Vegas - 89106)
          // Recorded Doc Number: 19920813:00598
          // Aerial Flight Date: 2/17/2013

          // & Hide Ownership History Accordion Section (ng hide)

          // ( http://www.clarkcountynv.gov/Depts/assessor/Pages/ParcelandMapNumberingSystem.aspx )













        //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        // autocompleteIsShowing = $("body .dropdown-menu").is(":visible"); 
        // autocompleteIsShowing = $("#tester .dropdown-menu").is(":visible"); 


        // console.log("[acShowing: " + autocompleteIsShowing , autocompleteDirty, searchHasCompleted)
        console.log("C [[ acShowing: "+autocompleteIsShowing+" | acDirty: "+autocompleteDirty+" | searchCompleted: "+searchHasCompleted+" ]]");


        if ($("#tester .dropdown-menu").css('display') == 'none')
        {
            autocompleteIsShowing = false;
           // true
        } else {
          autocompleteIsShowing = true;
        }


        //Show on Select Prop
        //need a case where no autocomplete is showing, search has not completed


        
        if (autocompleteIsShowing === true && searchHasCompleted === false) { //AUTOCOMPLETE SHOWING - INITIAL STATE

             $('#PropInfoDialog').css({
               'visibility': 'hidden'
               });
             console.log('C [[ propInfoVis-b[0]' + JSON.stringify($( "#PropInfoDialog" ).position()) + " ]]" );

        }
        else if (autocompleteIsShowing === true && searchHasCompleted === true) { //AUTOCOMPLETE SHOWING & PREV SEARCH ACTIVE

          //prop info results positioning
          $( "#PropInfoDialog" ).position({
            my: "left top",
            at: "left+1 bottom+2",
            of: "#tester .dropdown-menu"
              // of: "#tester #search-form"
          });
          // $( "#PropInfoDialog" ).show();
          $('#PropInfoDialog').css({
            'visibility': 'visible'
            });
          console.log('C [[ propInfoVis-b[1]' + JSON.stringify($( "#PropInfoDialog" ).position()) + " ]]" );

          // console.log(autocompleteIsShowing)

        }

        //autocomplete is not showing, it never has & length is min
        else if (autocompleteIsShowing === false && autocompleteDirty === false && searchHasCompleted === false && $("#tester input").val().length < 3) { //AUTOCOMPLETE HIDDEN - INITIAL STATE  && autocompleteDirty === false

          $('#PropInfoDialog').css({
            'top': 45,
            'left': 240
            });
          // $( "#PropInfoDialog" ).show();
          $('#PropInfoDialog').css({
             'visibility': 'hidden'
            });
          console.log('C [[ propInfoVis-b[2]' + JSON.stringify($( "#PropInfoDialog" ).position()) + " ]]" );

        }
        //autocomplete is not showing, it never has & length is min (SELECT PROP)
        else if (autocompleteIsShowing === false && autocompleteDirty === false && searchHasCompleted === true && $("#tester input").val().length < 3) { //AUTOCOMPLETE HIDDEN - INITIAL STATE  && autocompleteDirty === false

          $('#PropInfoDialog').css({
            'top': 45,
            'left': 240
            });
          // $( "#PropInfoDialog" ).show();
          $('#PropInfoDialog').css({
            'visibility': 'visible'
            });
          console.log('C [[ propInfoVis-b[3]' + JSON.stringify($( "#PropInfoDialog" ).position()) + " ]]" );

        }

        //autocomplete is not showing, it never has & length is long
        else if (autocompleteIsShowing === false && autocompleteDirty === false && searchHasCompleted === false && $("#tester input").val().length > 2) { //AUTOCOMPLETE HIDDEN - INITIAL STATE  && autocompleteDirty === false

          $('#PropInfoDialog').css({
            'top': 45,
            'left': 240
            });
          // $( "#PropInfoDialog" ).show();
          $('#PropInfoDialog').css({
             'visibility': 'hidden'
            });
          console.log('C [[ propInfoVis-b[4]' + JSON.stringify($( "#PropInfoDialog" ).position()) + " ]]" );

        }
        //******************************diff from typeahead search logic******************
        //autocomplete is not showing, it has before though & length is min (SELECT PROP AFTER SEARCH)
        else if (autocompleteIsShowing === false && autocompleteDirty === true && searchHasCompleted === true && $("#tester input").val().length < 3) { //AUTOCOMPLETE HIDDEN - DIRTY STATE

        //  console.log('this needs to show')

          $('#PropInfoDialog').css({
            'top': 45,
            'left': 240
            });
          // $( "#PropInfoDialog" ).show();
          $('#PropInfoDialog').css({
            // 'visibility': 'hidden'
            'visibility': 'visible'
            });
          console.log('C [[ propInfoVis-b[5]' + JSON.stringify($( "#PropInfoDialog" ).position()) + " ]]" );

        }
        //*******************************************************************************
        //autocomplete is not showing, it has before though & length is long
        else if (autocompleteIsShowing === false && autocompleteDirty === true && searchHasCompleted === true && $("#tester input").val().length > 2) { //AUTOCOMPLETE HIDDEN - DIRTY STATE

          $('#PropInfoDialog').css({
            'top': 45,
            'left': 240
            });
          // $( "#PropInfoDialog" ).show();
          $('#PropInfoDialog').css({
            'visibility': 'visible'
            });
          console.log('C [[ propInfoVis-b[6]' + JSON.stringify($( "#PropInfoDialog" ).position()) + " ]]" );

        }








          //--------------------------------------------
          //set the scope.data to the data return object (for use in Prop Info Window Binding)
          $scope.data = data;


          //mobile popup-------------------------
          console.log("C [[ current parcel: " + mobileParcel + " ]]");

          //custom
          //http://gis23.fortlauderdale.gov/jsapi/sdk312/jssamples/widget_extendInfowindow.html
          //https://developers.arcgis.com/javascript/3/jssamples/map_infowindow.html
          //https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=esri%20mobile%20infowindow%20popup%20with%20expand

          //https://developers.arcgis.com/javascript/3/jsapi/infowindow-amd.html
          //https://developers.arcgis.com/javascript/3/jshelp/intro_formatinfowindow.html



          //Uncomment below
          //ADDED: IF WINDOW IS MOBILE:**************************************
          var title ="<table id='popup_Table' style='margin-top:-2px;margin-bottom:-5px; width:150px; border:0px;' class='infoWindowCustom' border='0'><tr><td><i class='glyphicon glyphicon-info-sign'></i></td><td>Property Info</td></tr></table>";
          var content = "<div id='scrollSheet'><div class='popup_Spacer'></div>" + "<b>Parcel:</b> " + mobileParcel + "<br> <b>Owner:</b> " + data.OwnerName + "<br><b>Add.:</b> " + data.SiteAddress;
          content += "<br><b>Acres:</b> " + data.CalcAcres;



          // //moreInfo/Expand Link
          // content += "<br><span><b style=''><a class='verdFont' id='moreInfoLink' href='#'>More Information</a></b></span>";




          //Expanded Mobile Property Info
          // //   Property Info

          // //   Parcel: 13933710002
          // //   Owner : County Of Clark(Administrative)
          // //   Site Add.: 500 S Grand Central Pkwy
          // //   Acres : 38.8

          // //   Sale Date: Null
          // //   Sale Price: 
          // //   Const. Year: 1995
          // //   Doc Number: 19920924 00000990
          // //   Subd. Name: Parkway Center 
          // //   Lot Block: Lot:6 Block:
          // //   Aerial Date: Undefined
          // //   T-R-S: 20-61-33
          // //   Book Page: 53:61

          // // Link Info

          // //   Assessor Information
          // //   Assessor Parcel Maps
          // //   Document Imaging Records
          // //   Expansive Soil Guidelines
          // //   Flood Zone Information
          // //   Treasurer Information



          map.infoWindow.setTitle(title);
          map.infoWindow.setContent(content);


          //resize the map info window 

          //buildPropertyInfo(data, attr);
          map.infoWindow.resize(200, 150);





          //Init Event for extended mobile property Info
          // $( "#moreInfoLink" ).click(function() {
            $( ".maximize" ).click(function() {

              

            
             // console.log('is maxed');

             // isMax = true;


              if (isMax % 2 == 0) {

                console.log('is odd')

                isMax = isMax + 1;

                 //Prop Info (Expanded)
                 var content1 = "<div class='popup_Spacer'></div>" + "<b>Parcel:</b> " + mobileParcel + "<br> <b>Owner:</b> " + data.OwnerName + "<br><b>Add.:</b> " + data.SiteAddress;
                 content1 += "<br><b>Acres:</b> " + data.CalcAcres;

                 // content1 += "<br><br><b>Jurisdiction: </b> " + zoning.jurisdiction + ", " + data.ZipCode;
                 content1 += "<br><br><b>Sale Date: </b> " + data.SaleDate;
                 content1 += "<br><b>Sale Price: </b> " + data.SalePrice;
                 content1 += "<br><b>Const. Year: </b> " + data.ConsructionYear;
                 // content1 += "<br><b>Doc Number: </b> " + data.DocNumber;

                 content1 += "<br><b>Doc Number: </b> " + "<a class='infoLinks' target='_blank' href='http://gisgate.co.clark.nv.us/assessor/webimages/default.asp?appID=1&txtdocNum=data.DocNumber'>"+data.DocNumber+"</a>";

                 // <a class="infoLinks" target="_blank" href='http://gisgate.co.clark.nv.us/assessor/webimages/default.asp?appID=1&txtdocNum={{data.DocNumber}}'>{{data.DocNumber}}</a>



                 content1 += "<br><b>Subd. Name: </b> " + data.SubName;
                 content1 += "<br><b>Lot Block: </b> " + data.LotBlock;
                 content1 += "<br><b>Aerial Date: </b> " + data.aerialDate;
                 content1 += "<br><b>T-R-S: </b> " + data.TownshipRangeSection;
                 content1 += "<br><b>Book Page: </b> " + data.AssessorBook + ", " + data.AssessorPage;

                 //Link Info
                 // content1 += "<br><span><b style=''><h3 class='verdFont' href='#'>Link Info</h3></b></span>";
                 // content1 += "<br><b>Assessor Information</b> " + data.CalcAcres;
                 // content1 += "<br><b>Assessor Parcel Maps</b> " + data.CalcAcres;
                 // content1 += "<br><b>Document Imaging Records</b> " + data.CalcAcres;
                 // content1 += "<br><b>Expansive Soil Guidelines</b> " + data.CalcAcres;
                 // content1 += "<br><b>Flood Zone Information</b> " + data.CalcAcres;
                 // content1 += "<br><b>Treasurer Information</b> " + data.CalcAcres;

                 content1 += "<br><br><b>Links</b>";
                 content1 += "<br><a id='infoLink0_mob' class='infoLinks' target='_blank' href='{{linkInfo.AssessorInformation}}'>Assessor's Information</a>";
                 content1 += "<br><a id='infoLink1_mob' class='infoLinks' target='_blank' href='{{linkInfo.AssessorParcelmaps}}'>Assessor's Parcel Map</a>";
                 content1 += "<br><a id='infoLink2_mob' class='infoLinks' target='_blank' href='{{linkInfo.TreasurerInformation}}'>Treasurer's Information</a>";
                 content1 += "<br><a id='infoLink3_mob' class='infoLinks' target='_blank' href='{{linkInfo.DocumnetImagingRecords}}'>Document Image Records</a>";
                 content1 += "<br><a id='infoLink4_mob' class='infoLinks' target='_blank' href='{{linkInfo.SoilGuidlinesLink}}'>Soil Guidelines Map</a>";
                 content1 += "<br><a id='infoLink5_mob' class='infoLinks' target='_blank' href='{{linkInfo.ExpansiveSoilGuidelinesLink}}'>Expansive Soil Guidelines Map</a>";
                 content1 += "<br><a id='infoLink6_mob' class='infoLinks' target='_blank' href='{{linkInfo.FloodZoneInformation}}'>Flood Zone Information</a>";
                 content1 += "<br><a id='infoLink7_mob' class='infoLinks' target='_blank' href='http://gisgate.co.clark.nv.us/openweb?getparcel={{attr.parcel}}'>Mail Link of Current Parcel</a>";


                 map.infoWindow.setContent(content1);


                 // isMax = false;

                 

              }
              else {

               console.log('is even')

               isMax = isMax + 1;

                  var content2 = "<div class='popup_Spacer'></div>" + "<b>Parcel:</b> " + mobileParcel + "<br> <b>Owner:</b> " + data.OwnerName + "<br><b>Add.:</b> " + data.SiteAddress;
                  content2 += "<br><b>Acres:</b> " + data.CalcAcres;

                  map.infoWindow.setContent(content2);

                  map.infoWindow.resize(200, 150);

                  

              }

              



          });








          //---------------------------------------

          //set up grabAddress for ancillary controller functions (str view url, getSCLZip, etc)
          grabAddress = data.SiteAddress;














          //--------------------------------------------
          //+/+/+/+/+/ Calls to Data Factory /+/+/+/+/+/
          //--------------------------------------------
          // $scope.getAerialFlightDate(attr.parcel);

          // //call for Weather (only if weatherBlock scope active) (-)
          //pass in the active weatherBlock scope, and current zip
          openFactory.getWeather($scope.theWeather,data.ZipCode).then(function(data) {
            $scope.weather = data;
          });

          //call for Ownership History (-)
          $scope.getOwnershipHistory(mobileParcel);

          //call for Trends (-)
          // $scope.getTrends(mobileParcel);
          // getTrends($scope.theWeather,data.ZipCode).then(function(data) {
          //             $scope.weather = data;
          //           });

          //call for Overlays (-)
          // openFactory.getOverlays(grabAddress).then(function(data) {
          //   $scope.Overlays = data;
          // });
          //OLD >
          // $scope.getOverlays(data);

          //call for SCLZip (-)
          openFactory.getSCLZip(grabAddress).then(function(data) {
            $scope.sclZip = data;
          });
          //OLD >
          // $scope.getSCLZip(data);

          //--------------------------------------------
          //--------------------------------------------







          //TO BE REPLACED WITH AngJS SERVICE---------

          //alert(data.SiteAddress) //test
          // //set up grabAddress for ancillary controller functions (str view url, getSCLZip, etc)
          // grabAddress = data.SiteAddress;

          
          //update the search inputbox field with the siteAddress 
          if (grabAddress) {

            //(currently does not match 1=1 with AC suggestions due to not containing str directions & AVE, DR, etc)
            //-remove double spaces
            grabAddress = grabAddress.replace(/\s+/g, ' ');
            // grabAddress = grabAddress.replace(/\s\s/g, ' ');

            //-remove leading and trailing whitespace
            grabAddress = grabAddress.trim();

            // //-make entire sring lowercase //***NO LONGER IMPLEMENT LOWERCASE, 
            // // once Autocomplete suggestion is made, string will mirror all caps selection
            // grabAddress = grabAddress.toLowerCase();
            
            //-remove street dirs (S, N, E, W)
            var testing = grabAddress.split(" ");
            var thesecond = testing[1];

            if (thesecond.length === 1)
            {

              //check for and remove street directionals - (S, N, E, W)
              if (/S/i.test(thesecond) || /N/i.test(thesecond) || /E/i.test(thesecond) || /W/i.test(thesecond))
              {

                grabAddress = grabAddress.replace(thesecond, "");

                //remove the excess internal whitespace created
                grabAddress = grabAddress.replace(/(^\s*)|(\s*$)/gi,"");
                grabAddress = grabAddress.replace(/[ ]{2,}/gi," ");
                grabAddress = grabAddress.replace(/\n /,"\n");

                console.log('C [[ street contains directional ]]');

              }
              else { }



              //http://stackoverflow.com/questions/3480771/how-to-see-if-string-contains-substring

              // var regex = /(S)/g;

              // alert(thesecond.test(regex));

              // thesecond.test(regex);

              // // if(thesecond.indexOf('S') === 1)
              // // {
              // //   alert('test')

              // // }

              // if ( thesecond.indexOf("S") > -1 ) {
              //   console.log( "found it" );
              // } else {
              //   console.log( "not found" );
              // }

               // alert(thesecond)

              // //then remove the last word in the string (street ending)
              // streetEndLast = grabAddress.lastIndexOf(" ");
              // grabAddress = grabAddress.substring(0, streetEndLast);

              // streetDir = grabAddress.lastIndexOf(" ");

              // var myString = "I want to remove the last word";
              // var mySplitResult = myString.split(" ");
              // var lastWord =  mySplitResult[mySplitResult.length-1] 

              // grabAddress = grabAddress.split(" ");
              // grabAddress =  grabAddress[1];

              // var str = "data-123";
              // str = str.replace("data-", "");

        //      grabAddress = grabAddress.replace(thesecond, "");

              //remove excess whitespace created (remove excess whitespace from inside a string)
              //https://css-tricks.com/snippets/javascript/strip-whitespace-from-string/
              // grabAddress.replace(/ /g, '');
              // grabAddress.replace(" ", "");
             // grabAddress = grabAddress.replace(/\s+/g, '');
             // grabAddress = grabAddress.replace(/\s/g, "");
             // var testing = grabAddress;
             // alert(testing.replace(/\s/g, ""));

             //http://stackoverflow.com/questions/16974664/remove-extra-spaces-in-string-javascript
             // grabAddress.replace(/\s+/g,' ').trim();



              // // grabAddress = document.getElementById("textString").value;
              // grabAddress = grabAddress.replace(/(^\s*)|(\s*$)/gi,"");
              // grabAddress = grabAddress.replace(/[ ]{2,}/gi," ");
              // grabAddress = grabAddress.replace(/\n /,"\n");
              // // document.getElementById("textString").value = s;

              //OR

              // product.replace("/\\s*/g", " ");
              
            }
            else
            { }





            //-remove street types (if == WAY, AVE, PKWY, BLVD)
            streetEndDecide = grabAddress.split(" "); //grab last word, and decide
            if (streetEndDecide[streetEndDecide.length - 1] === "PKWY" || "WAY" || "AVE" || "BLVD") //ST, CT, RD, DR, CIR
            {

              //loop through the array of all available streetTypes
              length = streetTypes.length;
              while(length--) {
                 if (grabAddress.indexOf(streetTypes[length])!=-1) {
                     // one of the substrings is in yourstring

                     //then remove the last word in the string (street ending)
                     streetEndLast = grabAddress.lastIndexOf(" ");
                     grabAddress = grabAddress.substring(0, streetEndLast);

                     console.log('C [[ street contains streetType ]]');
                 }

              }


            }
            else
            { }









            //update search val
            $('#search-form input').val(grabAddress);


            //Update closeIcon
            //if address is undefined
            if(!grabAddress){
               $('#closeIcon').hide();
            }
            else if(grabAddress === ''){
              $('#closeIcon').hide();
            }
            else {
              $('#closeIcon').show();
            }



          } else { //parcel / APN / owner / or right-of-way
            //update search val
            // $('#search-form input').val('');

            $('#search-form input').val(mobileParcel);


            //Update closeIcon
            //if address is undefined
            if(!mobileParcel){
               $('#closeIcon').hide();
            }
            else if(mobileParcel === ''){
              $('#closeIcon').hide();
            }
            else {
              $('#closeIcon').show();
            }


          }









        });

    }
    //------------------------------------------------------------------------------









    //getStreetView -------------------------------------------------------------
    $scope.getStreetView = function(theX, theY) {

      //old
       $http.jsonp('http://gisgate.co.clark.nv.us/gisdal/gisservice.svc/jsonep/projectPoint?inputWKID='+3421+'&outwkid='+4326+'&Xcoordinate='+theX+'&Ycoordinate='+theY+'&callback=JSON_CALLBACK').success(function(data){

        //new
       // var theURL = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=102707&outSR=4326&f=pjson&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":'+theX+',"y":'+theY+'}]}';

        // //make request for coord conversion
        // $http.jsonp(theURL + '&callback=JSON_CALLBACK').success(function(data) {

        //   console.log(data.geometries[0].x.toFixed(7));
        //   console.log(data.geometries[0].y.toFixed(7));



        //old
        var lat = data.yCoordinate;
        var lon = data.xCoordinate;

        //new
        // var lat = data.geometries[0].y.toFixed(7);
        // var lon = data.geometries[0].x.toFixed(7);


        console.log(lat,lon)

        //manual override checker
        if(strViewOverride === true) {

          wickedLocation =  new google.maps.LatLng( lat, lon );
          sv.getPanorama({location: wickedLocation, radius: 50}, processSVData_overrideVr);

        }
        else {

          $scope.toggle = true;

          wickedLocation =  new google.maps.LatLng( lat, lon );
          sv.getPanorama({location: wickedLocation, radius: 50}, processSVData);

        }





        //gets run when streetview checkbox is checked (default)
        function processSVData(data, status) {

         // console.log('teset3')

          if (status === google.maps.StreetViewStatus.OK) {

          //  console.log('test5')

            // //set pano
            // // panorama.setPano(data.location.pano);
            // theLocal = data.location.pano;
            panorama.setPano(data.location.pano);
            // panorama.setPov({
            //   heading: 270,
            //   pitch: 0
            // });

            //show pano
            panorama.setVisible(true);

             //ng show - truthy
            $scope.toggle = true;


           
            //console.log('hits first case')
          //  console.log($scope.toggle)

            // panorama.setVisible(true);
            console.log("StreetView: " + status);
            console.log("StreetView locale: " + wickedLocation);
            //console.log("SV data: " + data);
            $("li#streetViewList").removeClass('disable_StreetList');
            $("li#streetViewList").addClass('enable_StreetList');


          } 
          else if (status === "ZERO_RESULTS") {

          // console.log('test6')

            // theLocal = status;

            // //show pano
            // panorama.setVisible(false);

             //ng show - truthy
           $scope.toggle = false;



            console.log("StreetView: " + status);
            console.log("StreetView locale: " + wickedLocation);
            //console.log("SV data: " + data);
            $("li#streetViewList").removeClass('enable_StreetList');
            $("li#streetViewList").addClass('disable_StreetList');

          }
          else { }

        }






        //gets run when streetview checkbox is unchecked (manual override)
        function processSVData_overrideVr(data, status) {

         // console.log('teset4')


          // panorama.setPano(data.location.pano);

          if (status === google.maps.StreetViewStatus.OK) {

          //  console.log('test7')

            //set pano
            panorama.setPano(data.location.pano);

            // //show pano
            // panorama.setVisible(true);


            // console.log('hits first case')
            // console.log($scope.toggle)

            // panorama.setVisible(true);
            console.log("StreetView: " + status);
            console.log("StreetView locale: " + wickedLocation);
            console.log("SV data: " + data);
            $("li#streetViewList").removeClass('disable_StreetList');
            $("li#streetViewList").addClass('enable_StreetList');


          } 
          else if (status === "ZERO_RESULTS") {

          //  console.log('test8')

            console.log("StreetView: " + status);
            console.log("StreetView locale: " + wickedLocation);
            console.log("SV data: " + data);
            $("li#streetViewList").removeClass('enable_StreetList');
            $("li#streetViewList").addClass('disable_StreetList');

          }
          else { }

        }





        });


      }
      //------------------------------------------------------------------------------
















        // // Use the Street View service to find a pano ID on Pirrama Rd, outside the
        // // Google office.
        // // var streetviewService = new google.maps.StreetViewService;
        // streetviewService.getPanorama(
        //     {location: {lat: -33.867386, lng: 151.195767}},
        //     function(result, status) {
        //       if (status === google.maps.StreetViewStatus.OK) {
        //         outsideGoogle = result;
        //         initPanorama();
        //       }
        //     });











        // var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
        // var myHome = { "lat" : lat , "long" : lon };
        // var wickedLocation =  new google.maps.LatLng( myHome.lat, myHome.long );
        // panorama.setPosition(wickedLocation);
        // panorama.setVisible(true);


        // Use the Street View service to find a pano ID on Pirrama Rd, outside the
        // Google office.
        // var sv = new google.maps.StreetViewService();
        // var myHome = { "lat" : lat , "long" : lon };
        // // sv.getPanorama(
        // //     {location: {lat:  myHome.lat, lng:  myHome.lon}},
        // //     function(result, status) {
        // //       if (status === google.maps.StreetViewStatus.OK) {
        // //         outsideGoogle = result;
        // //         initPanorama();
        // //       }
        // //     });
        // sv.getPanorama(
        //     // {location: {lat:  -33.867386, lng:  151.195767}},
        //     {location: myHome}, 
        //     function(result, status) {
        //       if (status === google.maps.StreetViewStatus.OK) {
        //         // outsideGoogle = result;
        //         // initPanorama();

        //         var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));


        //       }
        //     });




        // function initPanorama() {

        //   // var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));





        //   // panorama = new google.maps.StreetViewPanorama(
        //   //     document.getElementById('street-view'),
        //   //     {
        //   //       pano: outsideGoogle.location.pano,
        //   //       // Register a provider for our custom panorama.
        //   //       panoProvider: function(pano) {
        //   //         if (pano === 'reception') {
        //   //           return getReceptionPanoramaData();
        //   //         }
        //   //       }
        //   //     });

        //   // // Add a link to our custom panorama from outside the Google Sydney office.
        //   // panorama.addListener('links_changed', function() {
        //   //   if (panorama.getPano() === outsideGoogle.location.pano) {
        //   //     panorama.getLinks().push({
        //   //       description: 'Google Sydney',
        //   //       heading: 25,
        //   //       pano: 'reception'
        //   //     });
        //   //   }
        //   // });
        // }
































        //view-source:file:///C:/Users/DTitus/Desktop/Streetview%20Google%20API/JSAPI_streetviewo.html
        //view-source:file:///C:/Users/DTitus/Desktop/Streetview%20Google%20API/JSAPI_streetviewo.html ****
        //&& docs: https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLng *****

        //constructing the lat long object
        //http://stackoverflow.com/questions/10676828/passing-location-coordinates-to-google-maps-as-variable

        //removing the default ui controls
        //http://stackoverflow.com/questions/32654034/streetview-api-hiding-fullscreen-control
        //http://stackoverflow.com/questions/32642606/fullscreencontrol-fullscreencontroloptions-in-googlemap-api-v3-22-for-streetview

        //init on load
        //https://developers.google.com/maps/documentation/javascript/streetview


        // var thelat = parseInt(lat)
        // var thelon = parseInt(lon)


        // panorama position, panorama expand button
        // http://stackoverflow.com/questions/32654034/streetview-api-hiding-fullscreen-control
        // https://developers.google.com/maps/documentation/javascript/streetview#StreetViewControls
        // http://stackoverflow.com/questions/32654034/streetview-api-hiding-fullscreen-control



        // var sv = new google.maps.StreetViewService();

        // var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

        // var myHome = { "lat" : lat , "long" : lon };


        // var wickedLocation =  new google.maps.LatLng( myHome.lat, myHome.long );


        // //construct the streetview service
        // // sv = new google.maps.StreetViewService();

        // var myHome = { "lat" : lat , "long" : lon };

        // // panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
        // var wickedLocation =  new google.maps.LatLng( myHome.lat, myHome.long );

        // panorama.setPosition(wickedLocation);



        // sv.getPanorama({location: event.latLng, radius: 50}, processSVData);
        // sv.getPanorama({location: myHome, radius: 50}, processSVData);


        // var round = Math.round;
        // var thelat = round(lat); //equivalent to round("1000",0)
        // var thelon = round(lon); //equivalent to round("1000",0)


        // console.log(lat) //36.1778384609251
        // console.log(lon) //-115.290700000136

        // // var myHome = { "lat" : "44.767778" , "long" : "-93.2775" };
        // // var myHome = { "lat" : lat , "long" : lon };


        // panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
        // myLatLng = new google.maps.LatLng({lat:   36.1778384609251, lng: -115.290700000136}); 
        // myLatLng = new google.maps.LatLng({lat:   thelat, lng: thelon, noWrap:true}); 
        // myLatLng = new google.maps.LatLng({lat:   36.1738441144415, lng: -115.268547998358, noWrap:true});
        // myLatLng = new google.maps.LatLng({lat:   36.1738441144415, lng: -115.268547998358, noWrap:true});
        // wickedLocation =  new google.maps.LatLng( myHome.lat, myHome.long );

        // panorama.setPosition(wickedLocation)


        // console.log(lat) 36.1778384609251
        // console.log(lon) -115.290700000136

        // panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
        // myLatLng = new google.maps.LatLng({lat:   data.yCoordinate, lng: data.xCoordinate}); 
















        // panorama.setPov({
        //       heading: 270,
        //       pitch: 0
        //     });

        // panorama.setVisible(true);


        //get a pano
        // then run set pano, setpov, set vis

        // streetviewService.getPanorama(
        //       {location: {lat: -33.867386, lng: 151.195767}},
        //       function(result, status) {
        //         if (status === google.maps.StreetViewStatus.OK) {
        //           outsideGoogle = result;
        //           initPanorama();
        //         }
        //       });

        // panorama.setPano(data.location.pano);
        //     panorama.setPov({
        //       heading: 270,
        //       pitch: 0
        //     });
        //     panorama.setVisible(true);





        // function processSVData(data, status) {

        //   console.log(stat)

        //   // panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
        //   // wickedLocation =  new google.maps.LatLng( myHome.lat, myHome.long );

        //   // panorama.setPosition(wickedLocation)


        //   // if (status === google.maps.StreetViewStatus.OK) {
        //   //   var marker = new google.maps.Marker({
        //   //     position: data.location.latLng,
        //   //     map: map,
        //   //     title: data.location.description
        //   //   });

        //   //   panorama.setPano(data.location.pano);
        //   //   panorama.setPov({
        //   //     heading: 270,
        //   //     pitch: 0
        //   //   });
        //   //   panorama.setVisible(true);

        //   //   marker.addListener('click', function() {
        //   //     var markerPanoID = data.location.pano;
        //   //     // Set the Pano to use the passed panoID.
        //   //     panorama.setPano(markerPanoID);
        //   //     panorama.setPov({
        //   //       heading: 270,
        //   //       pitch: 0
        //   //     });
        //   //     panorama.setVisible(true);
        //   //   });
        //   // } else {
        //   //   console.error('Street View data not found for this location.');
        //   // }
        // }









//         //working
//           var dataUrl1 = 'http://cbk0.google.com/cbk?output=json&ll=' + lat + ',' + lon + '&';
//         //  var dataUrl2 = 'https://maps.googleapis.com/maps/api/streetview?size=374x75&location='+lat+','+lon+'&heading=151.78&pitch=-0.76' + '&key=AIzaSyBrNY2A2YH14eWPEUUGitq1_vvCJ6GII7U';
//          // var dataUrl = 'https://maps.googleapis.com/maps/api/streetview?size=374x75&location='+lat+','+lon+'&heading=151.78&pitch=-0.76';
//          // // var variantURL00 = 'https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=thumbnail&thumb=2&w=374&h=75' + '&ll=' + lat + ',' + lon + '&key=' + 'AIzaSyBrNY2A2YH14eWPEUUGitq1_vvCJ6GII7U'
//          // var variantURL00 = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=AIzaSyBrNY2A2YH14eWPEUUGitq1_vvCJ6GII7U'

//          //ng hide default
//          $scope.toggle = false;

//           // $http.jsonp(dataUrl1+'&callback=JSON_CALLBACK').success(function(data){
//             $http.jsonp(dataUrl1+'&callback=JSON_CALLBACK').success(function(data){

//           if (data)
//           {

//               if(strViewOverride === true) {

//                 //ng show - truthy
//                 $scope.toggle = false;

//               }
//               else {

//                 //ng show - truthy
//                 $scope.toggle = true;

//               }

//               $("li#streetViewList").removeClass('disable_StreetList');
//               $("li#streetViewList").addClass('enable_StreetList');


// //             //https://cbks0.google.com/cbk?cb_client=maps_sv
// //             //original method
// //            // var display_url = 'http://maps.google.com/maps?layer=c&cbp=0,,,,30&panoid=' + data.Location.panoId + "&output=svembed";
// // //.tactile&authuser=0&hl=en&output=thumbnail&thumb=2&panoid=rU9xiEfU3A03ZgXck2k6pA&w=374&h=75&yaw=77.896156&pitch=0&ll=39.40871043542365,-104.91798281738517

// //           //  var panoimg_Url = 'http://maps.googleapis.com/maps/api/streetview?size=350x75&pano=' + data.Location.panoId + "&sensor=false";
// //             var llimg_Url = 'http://maps.googleapis.com/maps/api/streetview?size=350x75&location=' + lat + ',' + lon + "&sensor=false"

// //             //working
// //              var variantURL00 = 'https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=thumbnail&thumb=2&w=374&h=75' + '&ll=' + lat + ',' + lon + '&key=' + 'AIzaSyBrNY2A2YH14eWPEUUGitq1_vvCJ6GII7U'
// //             // var variantURL00 = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=AIzaSyBrNY2A2YH14eWPEUUGitq1_vvCJ6GII7U'
// //             // // https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=YOUR_API_KEY
// //             // var variantURL00 = 'https://maps.googleapis.com/maps/api/streetview?size=374x75&location='+lat+','+lon+'&heading=151.78&pitch=-0.76' + '&key=AIzaSyBrNY2A2YH14eWPEUUGitq1_vvCJ6GII7U'

// //             var variantURL0 = 'https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=thumbnail&thumb=2&location=' + grabAddress
// //          //   var variantURL1 = 'https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=thumbnail&thumb=2&panoid=' + data.Location.panoId + '&w=350&h=75&' + '&location=' + grabAddress
// //             var variantURL11 = 'https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=thumbnail&thumb=2&w=350&h=75' + '&location=' + grabAddress
// //          //   var variantURL2 = 'https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=thumbnail&thumb=2&panoid=' + data.Location.panoId  + '&w=350&h=75&yaw=77.896156&pitch=0&location=' + grabAddress
// //          //   var variantURL3 = 'https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=thumbnail&thumb=2&panoid=' + data.Location.panoId  + '&w=350&h=75&pitch=0&location=' + grabAddress

// //             $scope.street.src = variantURL00; //commented out //variantURL00


//             // panorama.setPosition(wickedLocation);
//             // panorama.setVisible(true);



//             // myLatLng = new google.maps.LatLng({lat:   lat lng: lon}); 

//             // // panorama.setPosition(latLng:myLatLng)
//             // panorama.setPosition(myLatLng)





//             // // panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

//             // // myLatLng = new google.maps.LatLng({lat:   36.1666327, lng: -115.1562629}); 

//             // // panorama.setPosition(latLng:myLatLng)
//             // panorama.setPosition(myLatLng)




            
//             return;
//           }
//           //ADDED
//           else {

//             //ng show - truthy
//             $scope.toggle = false;

//             // panorama.setVisible(false);

//             $("li#streetViewList").removeClass('enable_StreetList');
//             $("li#streetViewList").addClass('disable_StreetList');

//           }


//          });
















    //getOwnershipHistory -------------------------------------------------------------
    $scope.getOwnershipHistory = function(attr) {

    //  console.log('parcel ' + attr)

      // getOwnershipHistory: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getOwnershipHistory

      // parcel
      //   13933710002

        //JSONP calls

        //$getOwnershipHistory 
        $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getOwnershipHistory?parcel='+attr+'&callback=JSON_CALLBACK').success(function(data, attr){

          //Set Object
         $scope.ownershipHist = data;

        });
    }
    //------------------------------------------------------------------------------

    // //getTrends -------------------------------------------------------------
    // $scope.getTrends = function(attr) {




    //   $scope.trends = 'http://sandgate.co.clark.nv.us/AssrRealProp/ParcelSales.aspx?instance=pcl2&parcel='+attr;






    //   // console.log($("#ContentPlaceHolder1_gvSales").html());





    //   // $scope.theTrendsURL= [];

    //   // // var theTrendsURL = 'http://sandgate.co.clark.nv.us/AssrRealProp/ParcelSales.aspx?instance=pcl2&parcel='+attr;

    //   // var response = "http://sandgate.co.clark.nv.us/AssrRealProp/ParcelSales.aspx?instance=pcl2&parcel='+attr";

    //   // $scope.theTrendsURL.push(response)

    //   //  //Set Object
    //   // // $scope.trends = JSON.stringify(theTrendsURL);
    //   // // $scope.trends = theTrendsURL;

    //   // $scope.trends = escape(theTrendsURL).toLowerCase();


    //   // escape(str)
    //   //           .toLowerCase()

    //   //http://angularjs4u.com/errors/203/
    //   //https://www.google.com/search?q=angular+Error%3A+%5B%24interpolate%3Ainterr%5D&oq=angular+Error%3A+%5B%24interpolate%3Ainterr%5D&aqs=chrome..69i57j69i65l3j69i59j69i60.1271j0j7&sourceid=chrome&es_sm=93&ie=UTF-8

    //   // {{trends}}

    //   // console.log(theTrendsURL);

    //     // //$getOwnershipHistory 
    //     // $http.jsonp('http://sandgate.co.clark.nv.us/AssrRealProp/ParcelSales.aspx?instance=pcl2&parcel='+attr+'&callback=JSON_CALLBACK').success(function(data, attr){

    //     //   //Set Object
    //     //  $scope.trends = data;

    //     // });
    //     // // http://sandgate.co.clark.nv.us/AssrRealProp/ParcelSales.aspx?instance=pcl2&parcel=17612313087
    // }
    // //------------------------------------------------------------------------------









}]); // end - mapController






























//Angular UI Acccordion init-------------------------------------
// open.controller('mapController',['$scope', '$filter', '$http', function($scope,$filter,$http){
// open.controller('accordionCtrl',['$scope', '$http', function($scope,$http){
  open.controller('accordionCtrl',['$scope', '$http', 'openFactory', function($scope,$http,openFactory){
  $scope.oneAtATime = false;
  // $scope.oneAtATime = true;

  // $scope.groups = [
  //   {
  //     title: 'Dynamic Group Header - 1',
  //     content: 'Dynamic Group Body - 1'
  //   },
  //   {
  //     title: 'Dynamic Group Header - 2',
  //     content: 'Dynamic Group Body - 2'
  //   }
  // ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };


  $scope.status = {
    //set the first property information panel properties
    open0: true,
    open0D: false
  };





// //watch for accordion section open evts -----------------

// // Zoning and PLU -->
// $scope.$watch('status.open1', function(isOpen){
//       if (isOpen) { 
        
//         console.log('Zoning and PLU active') 
//         zoningPLUFlag = true;
      
//       }    
//     })

// // Legal Descr. -->
// $scope.$watch('status.open2', function(isOpen){
//       if (isOpen) { 
        
//         console.log('Legal Descr. active') 
//         legalDescrFlag = true;

//       }    
//     })

// // Ownership -->
// $scope.$watch('status.open3', function(isOpen){
//       if (isOpen) { 
        
//         console.log('Ownership active') 
//         ownershipFlag = true;

//       }    
//     })

// // Flood Zone -->
// $scope.$watch('status.open4', function(isOpen){
//       if (isOpen) { 
        
//         console.log('Flood Zone active') 
//         floodZoneFlag = true;

//       }    
//     })

// // Elected Officials -->
// $scope.$watch('status.open5', function(isOpen){
//       if (isOpen) { 

//         // alert(xcoord)
        
//         console.log('Elected Officials active')

//         //set elected officials flag to active
//         elecOfficialsFlag = true;

//        // console.log(xcoord)

//         // //call for elected officials
//         // openFactory.getOfficials(xcoord,ycoord).then(function(data) {
//         //   $scope.elecOfficial = data;
//         // });


//       }    
//     })

// // Links -->
// $scope.$watch('status.open6', function(isOpen){
//       if (isOpen) { 
        
//         console.log('Links requested') 
//         linksFlag = true;

//       }    
//     })






}]); // end - accordionCtrl











/* Custom filters */

open.filter('trustAsResourceUrl', ['$sce', function($sce) {
return function(val) {
    return $sce.trustAsResourceUrl(val);
};
}])