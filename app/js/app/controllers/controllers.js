
//************************************************
//************** CONTROLLERS *********************
//************************************************




//************************************************
//************ TypeaheadCtrl *********************
//************************************************

//TypeaheadCtrl Module --------------------------------------------------------------------------------------
// angular.module('ui.bootstrap.demo', ['ui.bootstrap']);
open.controller('TypeaheadCtrl', function($scope, $http, limitToFilter) { //limitToFilter limits typeahead result returns

    $scope.selected = undefined;
    $scope.selectedIndex = -1;
    $scope.searchMagiKey = []; //search suggestions magic key
    $scope.searchSuggestionsText = []; //search suggestions address text


    console.log("C [[ selected: " + $scope.selected + " ]]");

    // $scope.onTheKeyUp = function ($event, $item, $model, $label, $viewValue) {

    //   // if ($event.keyCode === 40) {
    //   //   console.log($scope.asyncSelected);
    //   //   console.log($item + "2");
    //   //   console.log($label + "3");
    //   //   console.log($viewValue);
    //   // }
    // };


    $scope.onTheChange = function($item, $model, $label) {
        // console.log($scope.asyncSelected);
        // console.log($item + "2");
        // console.log($label + "3");
        // $scope.$item = $item;
        // $scope.$model = $model;
        // $scope.$label = $label;
        // $( "#PropInfoDialog" ).hide();
    };


    //THE MAIN SEARCH FUNCTION
    $scope.search = function(theSearch) {

        console.log("C [[ searching: " + theSearch + " ]]");

        $scope.executeSearch(theSearch,null);

        //pass to ai.js as well
        ai(theSearch);
    };



    $scope.keyUp = function($event, $index, asyncSelected) {

        //Update closeIcon
        //if model is undefined
        if (!asyncSelected) {
            $('#closeIcon').hide();

        } else if (asyncSelected === '') {
            $('#closeIcon').hide();

        } else {
            $('#closeIcon').show();
        }


        //get current selectedIndex by place int
        if ($event.keyCode === 40) { //down key, increment selectedIndex
            $event.preventDefault();

            $scope.selectedIndex += 1

            // if($scope.selectedIndex+1 !== scope.suggestions.length){
            //     $scope.selectedIndex++;
            // }
        } else if ($event.keyCode === 38) { //up key, decrement selectedIndex

            $scope.selectedIndex -= 1

            // $event.preventDefault();
            // if($scope.selectedIndex-1 !== -1){
            //     $scope.selectedIndex--;
            // }
        } else if ($event.keyCode === 13) { //enter pressed
            // scope.addToSelectedTags(scope.selectedIndex);
        }

        // //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        // //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        // //DYNAMIC PropInfo dialog visability onKeyUp
        // $scope.propInfoVis($event.keyCode);
        $scope.propInfoVis(); //COMMENTED OUT

    }



    //onSearch (GETS CALLED ON CLICK SELECTION OF DROP DOWN SUGGESTION)
    $scope.onSelect = function($item, $model, $label) {

        // //LOGGING THE SCOPE SUGGESTIONS KEY FOR A MATCH WITH THE SUGGESTIONSKEY[1] VAR
        // console.log('SCOPE searchSuggestionsKey - This should match the suggestionsKey log: ' + $scope.searchSuggestionsKey); // 3

        //passing in search text (val), & magic key (magi)
        //$scope.executeSearch($model);
        // $scope.executeSearch($model,$scope.searchSuggestionsKey);

        //EXECUTE A MAGIC KEY GRAB ON SEARCHTERM
        $scope.getMagi($model);
        console.log('(1) EXECUTED A MAGIC KEY GRAB ON SEARCHTERM: ' + $model)


        

        // //NEW: PASSING THE MAGIC
        // //PASS THE MAGIC KEY AS PARAM TO EXECUTESEARCH METHOD
        // console.log($model)
        // console.log('YOUR MAGIC KEY IS: ' + $scope.searchSuggestionsKey);

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

        //new
         var propInfoURL = servicePrefix+'arcgis/rest/services/Locators/Clark_County_Composite_All/GeocodeServer/suggest?';
       // var propInfoURL = 'http://maps.clarkcountynv.gov/arcgis/rest/services/Locators/Clark_County_Composite_All/GeocodeServer/suggest?';



        return $http.jsonp(propInfoURL + 'text=' + val + '&maxSuggestions=' + null + '&category=' + null + '&countryCode=' + null + '&searchExtent=' + null + '&location=' + null + '&distance=' + null + '&f=json' + '&callback=JSON_CALLBACK').then(function(response) {

            //set the autocomplete flag to true 
            autocompleteDirty = true;

            // var obj = response.data.suggestions;
            var obj = response.data.suggestions;
            var keys = [];

            // var suggestionsResult = [];
            // var parsedResult = [];
           // var suggestionsKey = [];
            var suggestionsText = [];

            // After a brief timeout, clone and inject the compiled DOM element.
            setTimeout(
                function() {

                    $.each(obj, function(k, v) {

                        //suggestionsKey.push(v.magicKey);
                        suggestionsText.push(v.text);

                    });

                    $scope.searchSuggestionsText = limitToFilter(suggestionsText, 5);

                    //TEST: BINDING MAGIC KEY TO SCOPE OBJECT
                   // $scope.searchSuggestionsKey = suggestionsKey[0];

                    //Grabbing the first item in an array of strings
                    //console.log('suggestionsKey log: ' + suggestionsKey[0]); // 3
                    

                    // Tell AngularJS that a change has occurred (this will
                    // invoke various $watch() callbacks).
                    $scope.$digest();

                },
                250
            );

            //return autocomplete data, limited to 5 results
            return limitToFilter($scope.searchSuggestionsText, 5);

        });

    };




    //GetMagicKey - TAKES A RESOLVED SEARCH TEXT TERM AND THEN ATTEMPT GRAB OF ITS ASSOCIATED MAGIKEY
    // - gets called on a search term resolve intent; for a new magic key request
    $scope.getMagi = function(searchTerm) {


        //svcURL
        var svcURL = servicePrefix+'arcgis/rest/services/Locators/Clark_County_Composite_All/GeocodeServer/suggest?';
       // var svcURL = 'http://maps.clarkcountynv.gov/arcgis/rest/services/Locators/Clark_County_Composite_All/GeocodeServer/suggest?';

        

        // var svcURL = 'http://gisgate.clarkcountynv.gov/arcgis/rest/services/Locators/Clark_County_Composite_All/GeocodeServer/findAddressCandidates?';

        $http.jsonp(svcURL + 'text=' + searchTerm + '&maxSuggestions=' + null + '&category=' + null + '&countryCode=' + null + '&searchExtent=' + null + '&location=' + null + '&distance=' + null + '&f=json' + '&callback=JSON_CALLBACK').then(function(response) {

            console.log('(2) INITIATING A GETMAGI REQUEST ON: ' + searchTerm)

            //console.log(response.data.suggestions)

            //Bind Suggestions obj
            // var magiKeyItem = response.data.suggestions;
            var magiKeyItem = response.data.suggestions[0].magicKey;
            //console.log('THIS IS THE TEST OF THE MAGIC KEY PLACE: ' + magiKeyItem)
            //$scope.searchMagiKey = magiKeyItem;

            //PASS IT AS PARAM OFF TO executeSearch - where it is then passed off to appropriate search
            //method to operate on
           $scope.executeSearch(searchTerm,magiKeyItem)








            // var obj = response.data.suggestions;
            // var suggestionsKey = [];

            // console.log('GETTING THE RESPONSE BACK FROM GETMAGI REQUEST')

            // $.each(obj, function(k, v) {

            //     suggestionsKey.push(v.magicKey);

            // });

            // //clearing out the magic key 
            // delete $scope.searchMagiKey;


            // //BINDING MAGIC KEY TO SCOPE OBJECT
            // $scope.searchMagiKey = suggestionsKey[0];

            // console.log('HERE LIES THE KEY: ' + suggestionsKey)


        });//.
        // error(function(data) {

        //     console.log("err" + data)

        // });




    };








    //dynamic propInfoVis -------------------------------------------------------------
    // $scope.propInfoVis = function(evt) {
    $scope.propInfoVis = function() {

            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            // autocompleteIsShowing = $("body .dropdown-menu").is(":visible"); 
            // autocompleteIsShowing = $("#tester .dropdown-menu").is(":visible"); 

            if ($("#tester .dropdown-menu").css('display') == 'none') {
                autocompleteIsShowing = false;
                // true
            } else {
                autocompleteIsShowing = true;
            }






            if (autocompleteIsShowing === true && searchHasCompleted === false) { //AUTOCOMPLETE SHOWING - INITIAL STATE

                $('#PropInfoDialog').css({
                    'visibility': 'hidden'
                });
                console.log('C [[ propInfoVis-a[0]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");

            } else if (autocompleteIsShowing === true && searchHasCompleted === true) { //AUTOCOMPLETE SHOWING & PREV SEARCH ACTIVE

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
                $("#PropInfoDialog").position({
                    my: "left top",
                    // at: "left+1 bottom+2",
                    at: "left+1 bottom+0",
                    of: "#tester .dropdown-menu"
                        // of: "#tester #search-form"
                });
                // $( "#PropInfoDialog" ).show();
                $('#PropInfoDialog').css({
                    'visibility': 'visible'
                });
                console.log('C [[ propInfoVis-a[1]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");

            }

            //autocomplete is not showing, it never has & length is min
            else if (autocompleteIsShowing === false && autocompleteDirty === false && searchHasCompleted === false && $("#tester input").val().length < 3) { //AUTOCOMPLETE HIDDEN - INITIAL STATE  && autocompleteDirty === false

                $('#PropInfoDialog').css({
                    'top': 49,
                    'left': 240
                });
                // $( "#PropInfoDialog" ).show();
                $('#PropInfoDialog').css({
                    'visibility': 'hidden'
                });
                console.log('C [[ propInfoVis-a[2]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");

            }
            //autocomplete is not showing, it never has & length is min (SELECT PROP)
            else if (autocompleteIsShowing === false && autocompleteDirty === false && searchHasCompleted === true && $("#tester input").val().length < 3) { //AUTOCOMPLETE HIDDEN - INITIAL STATE  && autocompleteDirty === false

                $('#PropInfoDialog').css({
                    'top': 49,
                    'left': 240
                });
                // $( "#PropInfoDialog" ).show();
                $('#PropInfoDialog').css({
                    // 'visibility': 'visible'
                    'visibility': 'hidden'
                });
                console.log('C [[ propInfoVis-a[3]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");

            }

            //autocomplete is not showing, it never has & length is long
            else if (autocompleteIsShowing === false && autocompleteDirty === false && searchHasCompleted === false && $("#tester input").val().length > 2) { //AUTOCOMPLETE HIDDEN - INITIAL STATE  && autocompleteDirty === false

                $('#PropInfoDialog').css({
                    'top': 49,
                    'left': 240
                });
                // $( "#PropInfoDialog" ).show();
                $('#PropInfoDialog').css({
                    'visibility': 'hidden'
                });
                console.log('C [[ propInfoVis-a[4]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");

            }
            //******************************diff from execute search logic******************
            //autocomplete is not showing, it has before though & length is min (MIN KEY AFTER SEARCH - DO NOT SHOW - this is diff from execute search's logic)
            else if (autocompleteIsShowing === false && autocompleteDirty === true && searchHasCompleted === true && $("#tester input").val().length < 3) { //AUTOCOMPLETE HIDDEN - DIRTY STATE

                // console.log('this needs to hide')

                $('#PropInfoDialog').css({
                    'top': 49,
                    'left': 240
                });
                // $( "#PropInfoDialog" ).show();
                $('#PropInfoDialog').css({
                    'visibility': 'hidden'
                        // 'visibility': 'visible'
                });
                console.log('C [[ propInfoVis-a[5]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");

            }
            //*******************************************************************************
            //autocomplete is not showing, it has before though & length is long
            else if (autocompleteIsShowing === false && autocompleteDirty === true && searchHasCompleted === true && $("#tester input").val().length > 2) { //AUTOCOMPLETE HIDDEN - DIRTY STATE

                $('#PropInfoDialog').css({
                    'top': 49,
                    'left': 240
                });
                // $( "#PropInfoDialog" ).show();
                $('#PropInfoDialog').css({
                    'visibility': 'visible'
                });
                console.log('C [[ propInfoVis-a[6]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");

            }


        }
        //------------------------------------------------------------------------------

});











//************************************************
//************ mapController *********************
//************************************************


//mapController Module --------------------------------------------------------------------------------------
open.controller('mapController', ['$scope', '$filter', '$http', 'openFactory', function($scope, $filter, $http, openFactory) {

    //Coord System Options
    $scope.coordOptions = [{ name: 'State Plane ft. ', value: 'state-plane-ft' }, { name: 'Lat / Long', value: 'lat-long' }];
    $scope.selectedOption = $scope.coordOptions[0];


    //ChangeCoords (updates the coordinate system) -------------------------------
    $scope.changeCoords = function(coordSelected) {

            //Grab an updated locale
            locale = window.location.search.substring(1).split("@")[1]; // new


            if (coordSelected.value === 'state-plane-ft') //state plane
            {

                //Immediate update conversion for the coordSys dropdown & browser url coords
                //convert lat long to state plan x/y

                // // convert the incoming lat lng to state plane for Map center and zoom
                // var theURL = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=4326&outSR=102707&f=pjson&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":' + locale.split(",")[1] + ',"y":' + locale.split(",")[0] + '}]}';
                var theURL = servicePrefix+'arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=4326&outSR=102707&f=pjson&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":' + locale.split(",")[1] + ',"y":' + locale.split(",")[0] + '}]}';

                



                //make request for coord conversion
                $http.jsonp(theURL + '&callback=JSON_CALLBACK').success(function(data) {


                    console.log(data.geometries[0].x)

                    thedfX = parseInt(data.geometries[0].x);
                    thedfY = parseInt(data.geometries[0].y);


                    console.log(thedfX, thedfY)

                    //set showX & showY vals
                    showX.innerHTML = "<b>X: </b>" + thedfX;
                    showY.innerHTML = "<b>Y: </b>" + thedfY;



                    //immediate update to browser url ---------------------------

                    //craft a lat long url
                    // var craftedURL = '?@'+data.geometries[0].y.toFixed(7)+','+data.geometries[0].x.toFixed(7);
                    var craftedURL = '?@' + thedfX + ',' + thedfY + ',' + map.getLevel();


                    //update the windows.location url
                    if (typeof(history.pushState) != "undefined") {
                        var obj = { Page: 'page', Url: craftedURL };
                        history.pushState(obj, obj.Page, obj.Url);
                    } else {
                        window.location.href = "@homePage";
                        // alert("Browser does not support HTML5.");
                    }


                }).
                error(function(data) {

                    console.log("err" + data)

                });



                //update coorsystem to state plane
                coordSystem = 'state-plane-ft';

            } else if (coordSelected.value === 'lat-long') //lat long
            {


                // var theURL = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=102707&outSR=4326&f=pjson&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":' + locale.split(",")[0] + ',"y":' + locale.split(",")[1] + '}]}';
                var theURL = servicePrefix+'arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=102707&outSR=4326&f=pjson&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":' + locale.split(",")[0] + ',"y":' + locale.split(",")[1] + '}]}';


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
                    var craftedURL = '?@' + thedfX + ',' + thedfY + ',' + map.getLevel();


                    //update the windows.location url
                    if (typeof(history.pushState) != "undefined") {
                        var obj = { Page: 'page', Url: craftedURL };
                        history.pushState(obj, obj.Page, obj.Url);
                    } else {
                        window.location.href = "@homePage";
                        // alert("Browser does not support HTML5.");
                    }


                }).
                error(function(data) {

                    console.log("err" + data)

                });




                //update coorsystem to lat long
                coordSystem = 'lat-long';


            } else { //undefined (initial)

            }

        }
        //------------------------------------------------------------------------------







    //-----------------------------------------------------------------------------
    //Config (@=750009,26771705/1716JackRabbitWay/Owner&legend=t/f&weather=t/f)

    //ChangeURL (updates the windows location url) -------------------------------
    $scope.changeURL = function(page, url) {

            if (typeof(history.pushState) != "undefined") {
                var obj = { Page: page, Url: url };
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

            //Theme
            if (localStorage.theme === "dark") {
                // set the default layout
                $scope.layout = 'dark'; //county, bright
                // $scope.medialayout = 'dark'; //county, bright
                // console.log('it is ' + $scope.medialayout)
                console.log("M [[ " + localStorage.theme + " theme applied ]]");
            } else if (localStorage.theme === "light") {
                // set the default layout
                $scope.layout = 'light'; //county, bright
                // $scope.medialayout = 'light'; //county, bright
                // console.log('it is ' + $scope.medialayout)
                console.log("M [[ " + localStorage.theme + " theme applied ]]");
            } else {
                // set the default layout
                $scope.layout = 'county'; //county, bright
                // $scope.medialayout = 'county'; //county, bright
                // console.log('it is ' + $scope.medialayout)
                console.log("M [[ " + localStorage.theme + " theme applied ]]");
            }
            //-----------------------------------------


            //Config
            $scope.configLoad = function() {

                //Grab and Parses, Split URL
                var locale = window.location.search.substring(1).split("@")[1]; // new
                var viewName = $scope.configURLParse('view'); // 
                var legendBlock = $scope.configURLParse('legend'); // 
                var weatherBlock = $scope.configURLParse('weather'); //
                var tab = $scope.configURLParse('tab'); // 
                var fullmap = $scope.configURLParse('fullmap'); //

                console.log(locale)


                //locale Config ---------------------------------------

                //filter out undefined
                if (locale) {

  
                    //lat/long & state plane
                    if (locale.indexOf(",") > -1) {

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


                            thexc = locale.split(",")[0];
                            theyc = locale.split(",")[1];

                            // convert the incoming lat lng to state plane for Map center and zoom
                            //http://meyerweb.com/eric/tools/dencoder/
                            //http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=102707&outSR=4326&geometries={%22geometryType%22:%22esriGeometryPoint%22,%22geometries%22:[{%22x%22:779788,%22y%22:26761500}]}&transformation=&transformForward=true&f=html
                            // var theURL = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=4326&outSR=102707&f=pjson&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":' + theyc + ',"y":' + thexc + '}]}';
                            var theURL = servicePrefix+'arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=4326&outSR=102707&f=pjson&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":' + theyc + ',"y":' + thexc + '}]}';

                            

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

                                    map.centerAndZoom(new Point(thedfX, thedfY, new SpatialReference({ wkid: 102707 })), locale.split(",")[2]);

                                });



                            }).
                            error(function(data) {

                                console.log("err" + data)

                            });



                        } else //State plane ft
                        {

                            //update coorsystem to state plane
                            coordSystem = 'state-plane-ft';



                            //set centerAndZoom
                            require([
                                "esri/geometry/Point", "esri/SpatialReference"
                            ], function(Point, SpatialReference) {
                                // new Point(-118.15, 33.80, new SpatialReference({ wkid: 4326 }));
                                // map.centerAt( new Point(locale.split(",")[0], locale.split(",")[1], new SpatialReference({ wkid: 102707 }) ));

                                map.centerAndZoom(new Point(locale.split(",")[0], locale.split(",")[1], new SpatialReference({ wkid: 102707 })), locale.split(",")[2]);

                                // console.log(locale.split(",")[2])

                            });



                        }
                    }
                    //parcel, address, owner
                    else if (!locale.indexOf(",") > -1) {
                        console.log('parcel add owner')

                        // console.log(locale)
                        //  $scope.ajaxAddress(locale);
                        // angular.element($('#mapDiv')).scope().executeSearch(locale[1]);

                        //auto re-direct
                        $scope.executeSearch(locale,null);
                        // $scope.executeSearch('1716 Jack Rabbit Way');
                    } else {}

                } else { //just set the default initial extent 

                    // console.log('fresh extent for first visit - Welcome!')

                    console.log("C [[ fresh extent - Welcome! ]]");

                    //update coorsystem to state plane - by default
                    coordSystem = 'state-plane-ft';

                    //SET INITIAL EXTENT
                    map.setExtent(initialExtent);

                   //ADDED: Now that basemap is a "ArcGISImageServiceLayer", requires zoom level set
                   // map.setLevel(5);

                    //https://developers.arcgis.com/javascript/3/jsapi/map-amd.html#getlevel

                    

                    // //set zoom factor
                    // var factor = 9;

                    // // //clear graphics
                    // // map.graphics.clear();

                    // // //create new location symbol
                    // // var loc_symbol = new esri.symbol.PictureMarkerSymbol({
                    // // "angle":0,
                    // // "xoffset":0,
                    // // "yoffset":10,
                    // // "type":"esriPMS",
                    // // "url":"images/pin.png",
                    // // // "url":"images/pin.png",
                    // // "contentType":"image/png",
                    // // "width":34,
                    // // "height":34
                    // // // "width":24,
                    // // // "height":24
                    // // });

                    // // //Add Graphics: drop location symbol at map point
                    // // currentGraphic = new esri.Graphic(point, loc_symbol);
                    // // map.graphics.add(currentGraphic);

                    // //NEW WAY, ZOOM FACTOR SET
                    // map.centerAndZoom(point, factor)



                }

                //Views config ---------------------------------------
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

                //Legend config ---------------------------------------
                //filter out undefined
                if (legendBlock) {

                    console.log(legendBlock)

                    if (legendBlock === "t") {

                        $scope.theLegend = true;

                    } else {

                    }

                }

                //Weather config ---------------------------------------
                //filter out undefined
                if (weatherBlock) {

                    console.log(weatherBlock)

                    if (weatherBlock === "t") {

                        $scope.theWeather = true;

                    } else {}

                }

                //Tab config ---------------------------------------
                //filter out undefined
                if (tab) {

                    if (tab === "display") {

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

                    } else if (tab === "tools") {

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

                    } else if (tab === "resources") {

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
                    } else {}

                }

                //Fullmap config ---------------------------------------
                //filter out undefined
                if (fullmap) {

                    if (fullmap === "t") {

                        setTimeout(
                            function() {
                                $("#introToggle").trigger("click");
                            },
                            250
                        );

                    } else {}

                }


            };







            // //Load View from Memory --------------------------------------------
            // //bind scope.view to localStorage.view
            // $scope.selectedViewDefault.vname = localStorage.view;

            // console.log("M [[ " + localStorage.view + " view applied ]]");







        }
        //---------------------------------------------------------------

    //Load View from Memory --------------------------------------------
    $scope.viewSet = function() {

            //default
        // $scope.selectedViewDefault = $scope.Views[1];




        // //bind scope.view to localStorage.view
        // $scope.selectedViewDefault = localStorage.view;

        // console.log("M [[ " + localStorage.view + " view applied ]]");

        //Load View from Memory --------------------------------------------
        //bind scope.view to localStorage.view
        // $scope.selectedViewDefault.vname == localStorage.view;

        // console.log("M [[ " + localStorage.view + " view applied ]]");


        $scope.selectedViewDefault.vname == localStorage.view;

        console.log("M [[ " + localStorage.view + " view applied ]]");


    }








    //http://stackoverflow.com/questions/12430820/accessing-clicked-element-in-angularjs

    //saves the theme on a theme change
    $scope.saveTheme = function() {
        localStorage.setItem("theme", $scope.layout);
        // localStorage.setItem("mediatheme", $scope.medialayout);

        console.log('testing scope layout val: ' + $scope.layout)
    };

    $scope.saveView = function() {
        localStorage.setItem("view", $scope.selectedViewDefault.vname);
        console.log('successful pass off from line 1380 function call to save view to local storage, which was triggered by view dropdown: ' + $scope.selectedViewDefault.vname)
        // localStorage.setItem("mediatheme", $scope.medialayout);
    };

    // set the default layout
    //$scope.layout = 'county'; //county, bright
    $scope.themeSet();
    // $scope.viewSet();

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


    //checkbox toggles:
    //  $scope.MapVToggle9 = true; //default
    // $scope.FlightToggle1 = true;
    $scope.alias = true;
    //StreetView Toggle
    $scope.toggle = true;
    //7-day weather forecast view Toggle
    $scope.forecasttoggle = false;
    //the model for hideShowBar state (used to roll up/down omnibar, apply styles etc) 
    // $scope.theHideShowBarState = false;


    // //Map View & Flight Date defaults
    //  $scope.Most1 = true;

    //Re-direct to assign javascript method reference in controller 
    //(for map view & flight changes)
    $scope.viewChange = viewChange;
    $scope.flightChange = flightChange;

    $scope.introDate = [];



    //Constructing the mapViews -------------------------------------------
    $scope.Views = [];


    //PropSelect used in controllers.js executeQueryTask method for limiting new searches -
    // if they need a select property info info or just a pan to location
    // $scope.propselect = true;
    //var propselect = true;
    //var resolveAs;

    // $scope.flightChange = function flightChange(flight) {
    //   console.log('flight')
    // }











    //---------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------
    //------------------------ CONFIG FILES -------------------------------------------------
    //---------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------

    // http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/export?bbox=720675.525446917%2c26740644.0923726%2c790953.303224776%2c26783199.6479282&size=1265%2c766&dpi=96&format=png24&transparent=true&imageSR=102707&bboxSR=102707&layers=show%3a1&f=image&

    // $scope.mapviewChange=function(idPassedFromNgClick){
    //     console.log(idPassedFromNgClick);
    // }

    //need to move to display.js and then inject view & flight Obj's as depenencies to use in loop
    //need to update default & seismic
    //viewObj - data source for Map Views
    // var viewObj_new = [];
    var introObj_new;
    var viewObj_new;
    var flightObj_new;

    var flightObj_new2;

    var flightSRC;

    var layerObj_new;
    var customObj_new;
    




    //POPULATE UI - Intro Panel
    $(function () {

        //date-------------------------------
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        //month spelled out
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        var n = month[today.getMonth()];

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
        // var today = dd+'/'+mm+'/'+yyyy;

        var today = n+' '+dd+', '+yyyy;
       //document.getElementById("mainDate").value = today;

       //set introDate to bind date field to introDate field
        $scope.introDate = today;

        //format
        //Dec 22, 2017






        //INTRO UPDATES (read from intro_config.txt file)-------------------------------

        //Config ------------------------------------------------
        $http.get('resources/config/intro.txt').success(function(data) {

            //set the data
            introObj_new = data[0];



            //Constructing the flight dates -------------------------------------------
            $scope.Updates = [];

            //constructing the mapView List Object ----------------
            var uResults = [];

            for (var i = 0; i < introObj_new.updatesList.length; i++) {
                uResults.push(introObj_new.updatesList[i]); //need to add price to each item return

            }
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            $scope.Updates = uResults;


        });
        //------------------------------------------------------

    });










    //LOAD Views (via views.txt) ------------------------------------------------------
    $(function () {

        // //POPULATE Layers ----------------------------------------------------------------------------------------------------------------

        // $http.jsonp(servicePrefix+serviceSuffix_L+serviceType_L+'?f=pjson'+'&callback=JSON_CALLBACK').then(function(resp) {

        //     //resp.data.services.name.replace('GISMO','');

        //     //set the data
        //     // viewObj_new = resp.data;
        //     viewObj_new = resp.data;

        //    // viewObj_new = viewObj_new.services.name.replace('GISMO','');

        //     //Constructing the map views -------------------------------------------
        //     $scope.Views = [];

        //     //constructing the mapView List Object ----------------
        //     var vResults = [];

        //     // var ret = "data-123".replace('data-','');
        //     // console.log(ret);   //prints: 123


        //     // //Cleaning the data for 'name' (removing 'GISMO/' text)
        //     // for (var i = 0; i < viewObj_new.services.length; i++) {
        //     //     viewObj_new.services[i].name.replace('GISMO/',''); //replaces the gismo preface text
        //     // }



        //     // for (var i = 0; i < flightObj_new.flightList.length; i++) {
        //     //     fResults.push(flightObj_new.flightList[i]); //need to add price to each item return
        //     // }
        //     for (var i = 0; i < viewObj_new.services.length; i++) {
        //         vResults.push(viewObj_new.services[i]); //need to add price to each item return
        //     }




        //     // console.log('raw object ' + JSON.stringify(vResults))


        //     //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

        //     $scope.Views = vResults;
        //     $scope.selectedViewDefault = $scope.Views[0];




        //     console.log('SHOW ME THE JSON FOR THE LAYERS ' + JSON.stringify(viewObj_new))






        //OLD METHOD:

        //Config ------------------------------------------------
         $http.get('resources/config/views.txt').success(function(data) {

            //set the data
            viewObj_new = data[0];

            // //Constructing the mapViews -------------------------------------------
            // $scope.Views = [];

            //constructing the mapView List Object ----------------
            var vResults = [];

            for (var i = 0; i < viewObj_new.viewList.length; i++) {
                vResults.push(viewObj_new.viewList[i]); //need to add price to each item return
            }
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            $scope.Views = vResults;
            $scope.selectedViewDefault = $scope.Views[1];
            // $scope.viewSet();

            // $scope.selectedViewDefault.vname == localStorage.view;

            // console.log("M [[ " + localStorage.view + " view applied ]]");






            //POPULATE OBJECTS - MapView Objects, replaces display.js (OWL - CustomList) ------------------------------------------------------

            //set the data
            customObj_new = data[0];

            //Constructing the flight dates -------------------------------------------
            $scope.customListsID = [];
            $scope.customListsNAME = [];
            $scope.customListsACTIVE = [];
            $scope.customListsSRC = [];

            //constructing the mapView List Object ----------------
            var cResultsID = [];
            var cResultsNAME = [];
            var cResultsACTIVE = [];
            var cResultsSRC = [];

            for (var i = 0; i < customObj_new.customList.length; i++) {
                cResultsID.push(customObj_new.customList[i].vid); //need to add price to each item return
            }
            for (var i = 0; i < customObj_new.customList.length; i++) {
                cResultsNAME.push(customObj_new.customList[i].vname); //need to add price to each item return
            }
            for (var i = 0; i < customObj_new.customList.length; i++) {
                cResultsACTIVE.push(customObj_new.customList[i].vactive); //need to add price to each item return
            }
            for (var i = 0; i < customObj_new.customList.length; i++) {
                cResultsSRC.push(customObj_new.customList[i].vsrc); //need to add price to each item return
            }
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            $scope.customListsID = cResultsID;
            $scope.customListsNAME = cResultsNAME;
            $scope.customListsACTIVE = cResultsACTIVE;
            $scope.customListsSRC = cResultsSRC;

            console.log('THE OWL DATA ' + $scope.customListsID);
            console.log('THE OWL DATA ' + $scope.customListsNAME);
            console.log('THE OWL DATA ' + $scope.customListsACTIVE);
            console.log('THE OWL DATA ' + $scope.customListsSRC);


        });
        //------------------------------------------------------

    });
















    //LOAD Flight Dates ------------------------------------------------------
    $(function () {

        //POPULATE Flights ----------------------------------------------------------------------------------------------------------------

        // services.name > "name": "CACHED/mostcurrentflight",
        // services.type > "type": "MapServer"

        // For ex:
        // var serverFetchURL;
        // serverFetchURL = servicePrefix+arcgis_images/rest/services/CACHED?f=pjson


        // MostCurrent:

        // /arcgis_images/rest/services/CACHED/mostcurrentflight/MapServer

        //  servicePrefix + '/arcgis_images/rest/services/'   / + '/' + services.type








        // flightObj_new.flightList
        // { "flightid": 1, "fname": "Most Current Flight", "active": 1, "src": "http://maps.clarkcountynv.gov/ArcGIS/rest/services/CACHED/mostcurrentflight/MapServer"},

        // vs

        // flightObj_new2.services.name ("CACHED/mostcurrentflight")

        // flightObj_new2.services.type ("MapServer")

        // var servicePrefix = 'http://maps.clarkcountynv.gov/';
        // var serviceSuffix_F = 'arcgis_images/rest/services/';
        // var serviceType_F = 'CACHED'; //E.g. CACHED / Elevations / Utilities

        $http.jsonp(servicePrefix+serviceSuffix_F+serviceType_F+'?f=pjson'+'&callback=JSON_CALLBACK').then(function(resp) {


            //set the data
            flightObj_new2 = resp.data;

            //Constructing the flight dates -------------------------------------------
            $scope.Flights = [];

            //constructing the mapView List Object ----------------
            var fResults = [];



            // for (var i = 0; i < flightObj_new.flightList.length; i++) {
            //     fResults.push(flightObj_new.flightList[i]); //need to add price to each item return
            // }
            for (var i = 0; i < flightObj_new2.services.length; i++) {

                // text = flightObj_new2.services[i].name.substring(7, flightObj_new2.services[i].name.lastIndexOf('/'));

                //removes the 'CACHED/' pretext from the name object items, preformatting the text
                // formattedFlightNames = /[^/]*$/.exec(flightObj_new2.services[i].name)[0];
                // flightObj_new2.services[i].name = /[^/]*$/.exec(flightObj_new2.services[i].name)[0];

                // flightObj_new2.services[i].name.sort(function(a, b){
                //     if(a.name < b.name) return -1;
                //     if(a.name > b.name) return 1;
                //     return 0;
                // })


                flightObj_new2.services[i].name = /[^/]*$/.exec(flightObj_new2.services[i].name)[0];


                // <i class="ion-social-buffer-outline" style=" font-size: 24px;"></i>


                // fResults.push(flightObj_new2.services[i]); //need to add price to each item return
                fResults.push(flightObj_new2.services[i]); //need to add price to each item return
            }



            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            //binds the Flights ang object to the fResults; sets the default select box option
            $scope.Flights = fResults;
            $scope.selectedFlightDefault = $scope.Flights[36];
            // $scope.selectedFlightDefault = $scope.Flights.name("mostcurrentflight");


            // users.sort(function(a, b){
            //     if(a.firstname < b.firstname) return -1;
            //     if(a.firstname > b.firstname) return 1;
            //     return 0;
            // })


            // console.log(fResults)


            // $scope.Flights = fResults;


            // fruits.sort();
            // fruits.reverse();





            // //set dropdown's default value
            // function setSelectedIndex(s, valsearch)
            // {
            //     // Loop through all the items in drop down list
            //     for (i = 0; i< s.options.length; i++)
            //     { 
            //         if (s.options[i].value == valsearch)
            //         {
            //             // Item is found. Set its property and exit
            //             s.options[i].selected = true;
            //             break;
            //         }
            //     }
            //     return;
            // }
            // setSelectedIndex(document.getElementById("flightSelector"),"mostcurrentflight");


            // // //set dropdown's default value
            // // function setSelectedIndex(s, valsearch)
            // // {
            //     // Loop through all the items in drop down list
            //     for (i = 0; i< document.getElementById("flightSelector").options.length; i++)
            //     { 
            //         if (sdocument.getElementById("flightSelector").options[i].value == "mostcurrentflight")
            //         {
            //             // Item is found. Set its property and exit
            //             document.getElementById("flightSelector").options[i].selected = true;
            //             break;
            //         }
            //     }
            //     // return;
            // // }
            // // setSelectedIndex(document.getElementById("flightSelector"),"mostcurrentflight");





            console.log('SHOW ME THE JSON FOR THE FLIGHTS ' + JSON.stringify(flightObj_new2))




            // https://stackoverflow.com/questions/16863800/javascript-regex-to-extract-the-string-before-the-last-backslash
            // text = stringVariable.substring(0, stringVariable.lastIndexOf('/'));



            // /^(.*[\\\/])/
            // Explanation:

            // ^      Start of line/string
            // (      Start capturing group
            // .*     Match any character greedily
            // [\\\/] Match a backslash or a forward slash
            // )      End the capturing group  


            // sub(".*/", "", x)

            // https://stackoverflow.com/questions/3981880/regex-for-everything-before-last-forward-or-backward-slash

            // https://stackoverflow.com/questions/36683359/remove-everything-in-string-up-to-last-forward-slash/36683386









            //OLD METHOD:

            // //set the data
            // flightObj_new2 = resp;

            // //Constructing the flight dates -------------------------------------------
            // $scope.Flights = [];

            // //constructing the mapView List Object ----------------
            // var fResults = [];

            // for (var i = 0; i < flightObj_new.flightList.length; i++) {
            //     fResults.push(flightObj_new.flightList[i]); //need to add price to each item return
            // }
            // //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            // $scope.Flights = fResults;
            // $scope.selectedFlightDefault = $scope.Flights[0];


        });


    });







    //UPDATE FlightDate on click (Layer Change EVT) ------------------------------------------------------
    function flightChange(flight) {

       // var flightName = flight.fname;
       var flightName = flight.name;
       var layerUrl;

       var layer = map.getLayer('basemap');
       map.removeLayer(layer);


       // //binding layerUrl
       // layerUrl = flight.src;
       //binding layerUrl
       layerUrl = servicePrefix+serviceSuffix_F+'CACHED/'+flight.name+'/'+flight.type;

       //re-setting basemap layer
       var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrl,{id:'basemap'});
       map.addLayer(basemap,0);

       //update the current flight tag (info box)
       $("#currentFlightTag").text(flightName);



       console.log('this is the flight source / layer url ' + layerUrl)

    }
    //---------------------------------------------------------------------------------------------














    //---------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------
    //HANDLING EVTS (REPLACES DISPLAY.JS) --------------------------------------------

    //Update MapView Layer Change EVT -------------------------
    function viewChange(theView) {





       //First, before you do anything else, call to Save view to localStorage
       $scope.saveView();







        freshView = JSON.stringify(theView.vname);
        // freshView = JSON.stringify(theView.name);

        // //ADDED:
        // freshView = freshView.replace("GISMO/","");

        // console.log('TESTING OUT THE VIEW: ' + freshView)

















      console.log('HERE IS THE NAME OF THE VIEW THAT WAS JUST PASSED IN' + freshView);


      //grabbing the active view
      // var viewName = viewName.toLowerCase();
      freshView = freshView.toLowerCase();
      freshView = freshView.replace(/['"]+/g, '');

      console.log('formatted as: ' + freshView)

      //Levels of Layers
      var layerUrlMain;
      var layerUrlSecondary;
      var layerUrlTertiary;

      //grabbing current basemap
      var currentBase = map.getLayer('basemap');
              
      //grabbing and enumerating each layer
      var layer = map.getLayer('basemap');
      var layer2 = map.getLayer('PLULayer');
      var layer3 = map.getLayer('CCZoningLayer');
      var layer4 = map.getLayer('C50Layer');
      var layer5 = map.getLayer('C2003Layer');
      var layer6 = map.getLayer('C1996Layer');
      var layer7 = map.getLayer('hendersonZoningLayer');
      var layer8 = map.getLayer('lasVegasZoningLayer');
      var layer9 = map.getLayer('mesquiteZoningLayer');
      var layer10 = map.getLayer('nlvZoningLayer');
      var layer11 = map.getLayer('seismicLayer');
      var layer12 = map.getLayer('SoilLayer');
      var layer13 = map.getLayer('rightofwayLayer');
      var layer14 = map.getLayer('abLayer');

      //removing basemap layer
      map.removeLayer(layer);

      //removing each enumerated layer
      if (layer2) { map.removeLayer(layer2) }
      if (layer3) { map.removeLayer(layer3) }
      if (layer4) { map.removeLayer(layer4) }
      if (layer5) { map.removeLayer(layer5) }
      if (layer6) { map.removeLayer(layer6) }
      if (layer7) { map.removeLayer(layer7) }
      if (layer8) { map.removeLayer(layer8) }
      if (layer9) { map.removeLayer(layer9) }
      if (layer10) { map.removeLayer(layer10) }
      if (layer11) { map.removeLayer(layer11) }
      if (layer12) { map.removeLayer(layer12) }
      if (layer13) { map.removeLayer(layer13) }
      if (layer14) { map.removeLayer(layer14) }

      //initiatializing assessor anno
      // var assessorannoServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/AssessorAnno/MapServer", { id: 'assessorannoServiceLayer' });
      var assessorannoServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorAnno/MapServer", { id: 'assessorannoServiceLayer' });
      // var abLayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/AB142/MapServer", { id: 'abLayer' });
      var abLayer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AB142/MapServer", { id: 'abLayer' });




       switch(freshView){
           case 'aerial imagery only': //---------------------------------------

               //remove all layers
               map.removeAllLayers();

               // layerUrlMain = servicePrefix+'arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
               layerUrlMain = 'http://maps.clarkcountynv.gov/arcgis_images/rest/services/CACHED/mostcurrentflight/MapServer';

               var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

               map.addLayers([basemap, abLayer]);

               break; //---------------------------------------------------


           case 'assessor map': //---------------------------------------

               //remove all layers
               map.removeAllLayers();

               // layerUrlMain = servicePrefix+'arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
               // layerUrlSecondary = servicePrefix+'ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
               // layerUrlTertiary = servicePrefix+'arcgis/rest/services/GISMO/scl/MapServer';
               layerUrlMain = 'http://maps.clarkcountynv.gov/arcgis_images/rest/services/CACHED/mostcurrentflight/MapServer';
               layerUrlSecondary = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorMap/MapServer';
               layerUrlTertiary = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/scl/MapServer';

               var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

              //Dynamic Map layers (default)
              //Assessor Layer
              assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
              //Transportation Layer
              transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'transportationServiceLayer'});
            
               map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, abLayer]);

               break; //---------------------------------------------------


           case 'boulder city zoning': //---------------------------------------

               require([
                       "esri/layers/ArcGISDynamicMapServiceLayer",
                       "esri/layers/ImageParameters"
                     ], function (
                       ArcGISDynamicMapServiceLayer, ImageParameters) {

                      //Use the ImageParameters to set the visibleLayerIds layers in the map service 
                      //during ArcGISDynamicMapServiceLayer construction.
                      var imageParameters = new ImageParameters();
                      imageParameters.layerIds = [5];
                      imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
                      //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

                       //remove all layers
                       map.removeAllLayers();

                       // primaryLayer = servicePrefix+'arcgis/rest/services/GISMO/Zoning/MapServer/';
                       // secondaryLayer = servicePrefix+'ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
                       // tertiaryLayer = servicePrefix+'arcgis/rest/services/GISMO/scl/MapServer';
                       primaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/Zoning/';
                       secondaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorMap/MapServer';
                       tertiaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/scl/MapServer';

                       var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
                       //Assessor Layer
                       assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
                       //Transportation Layer
                       transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
                       
                      
                       //Dynamic Map layers
                       bcLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
                         id:'bcLayer',
                         "opacity" : 0.7,
                         "imageParameters": imageParameters
                        });

                       map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, bcLayer, abLayer]);

                     });


                   break; //---------------------------------------------------


           case 'clark county plu': //---------------------------------------
                   
              // layerUrlMain = servicePrefix+'arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
              // layerUrlSecondary = servicePrefix+'arcgis/rest/services/GISMO/PlanedLandUse/MapServer';
              layerUrlMain = 'http://maps.clarkcountynv.gov/arcgis_images/rest/services/CACHED/mostcurrentflight/MapServer';
              layerUrlSecondary = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/PlanedLandUse/MapServer';


                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});


               //Dynamic Map layers
               PLULayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{
                 id:'PLULayer',
                 "opacity" : 0.7//,
               });

                 map.addLayers([basemap, PLULayer, assessorannoServiceLayer, abLayer]);

               break; //---------------------------------------------------



           case 'clark county zoning': //---------------------------------------


           require([
                   "esri/layers/ArcGISDynamicMapServiceLayer",
                   "esri/layers/ImageParameters"
                 ], function (
                   ArcGISDynamicMapServiceLayer, ImageParameters) {

                  //Use the ImageParameters to set the visibleLayerIds layers in the map service 
                  //during ArcGISDynamicMapServiceLayer construction.
                  var imageParameters = new ImageParameters();
                  imageParameters.layerIds = [8];
                  imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
                  //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

                   //remove all layers
                   map.removeAllLayers();

                   // primaryLayer = servicePrefix+'arcgis/rest/services/GISMO/Zoning/MapServer/';
                   // secondaryLayer = servicePrefix+'ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
                   // tertiaryLayer = servicePrefix+'arcgis/rest/services/GISMO/scl/MapServer';
                   primaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/Zoning/';
                   secondaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorMap/MapServer';
                   tertiaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/scl/MapServer';

                   var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
                   //Assessor Layer
                   assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
                   //Transportation Layer
                   transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
                   
                  
                   //Dynamic Map layers
                   CCZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
                     id:'CCZoningLayer',
                     "opacity" : 0.7,
                     "imageParameters": imageParameters
                    });

                   map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, CCZoningLayer, abLayer]);

                 });


               break; //---------------------------------------------------



           case 'contours 50 meter': //---------------------------------------
              
              //remove all layers
              map.removeAllLayers();

              // layerUrlMain = servicePrefix+'arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
              // layerUrlSecondary = servicePrefix+'ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
              // layerUrlTertiary = servicePrefix+'arcgis/rest/services/GISMO/con_50M/MapServer';
              layerUrlMain = 'http://maps.clarkcountynv.gov/arcgis_images/rest/services/CACHED/mostcurrentflight/MapServer';
              layerUrlSecondary = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorMap/MapServer';
              layerUrlTertiary = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/con_50M/MapServer';

                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

               //Assessor Layer
               assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
               //Dynamic Map layers
               C50Layer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'C50Layer'});


               map.addLayers([basemap, C50Layer, assessorServiceLayer, abLayer]);

               break; //---------------------------------------------------


           case 'contours 2016 2ft (valley)': //---------------------------------------
               

              //remove all layers
              map.removeAllLayers();

              // layerUrlMain = servicePrefix+'arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
              // layerUrlSecondary = servicePrefix+'ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
              // layerUrlTertiary = servicePrefix+'arcgis/rest/services/GISMO/con2016_2ft/MapServer';
              layerUrlMain = 'http://maps.clarkcountynv.gov/arcgis_images/rest/services/CACHED/mostcurrentflight/MapServer';
              layerUrlSecondary = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorMap/MapServer';
              layerUrlTertiary = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/con2016_2ft/MapServer';

               var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

               //Assessor Layer
               assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
               //Dynamic Map layers
               C2016Layer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'C2016Layer'});


              map.addLayers([basemap, C2016Layer, assessorServiceLayer, abLayer]);

               break; //---------------------------------------------------


           case 'contours 2003 5ft (valley)': //---------------------------------------
               
              //remove all layers
              map.removeAllLayers();

              // layerUrlMain = servicePrefix+'arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
              // layerUrlSecondary = servicePrefix+'ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
              // layerUrlTertiary = servicePrefix+'arcgis/rest/services/GISMO/con2016_2ft/MapServer';
              layerUrlMain = 'http://maps.clarkcountynv.gov/arcgis_images/rest/services/CACHED/mostcurrentflight/MapServer';
              layerUrlSecondary = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorMap/MapServer';
              layerUrlTertiary = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/con_03_5ft/MapServer';

                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

               //Assessor Layer
               assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
               //Dynamic Map layers
               C2003Layer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'C2003Layer'});


              map.addLayers([basemap, C2003Layer, assessorServiceLayer, abLayer]);

               break; //---------------------------------------------------


           case 'contours 1996 5ft (valley)': //---------------------------------------
               
              //remove all layers
              map.removeAllLayers();

              // layerUrlMain = servicePrefix+'arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
              // layerUrlSecondary = servicePrefix+'ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
              // layerUrlTertiary = servicePrefix+'arcgis/rest/services/GISMO/con2016_2ft/MapServer';
              layerUrlMain = 'http://maps.clarkcountynv.gov/arcgis_images/rest/services/CACHED/mostcurrentflight/MapServer';
              layerUrlSecondary = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorMap/MapServer';
              layerUrlTertiary = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/con_96_5ft/MapServer';

                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

              //Assessor Layer
              assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
               //Dynamic Map layers
               C1996Layer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'C1996Layer'});

              map.addLayers([basemap, C1996Layer, assessorServiceLayer, abLayer]);

               break; //---------------------------------------------------


           case 'default': //---------------------------------------

                //remove all layers
                map.removeAllLayers();

                // layerUrlMain = servicePrefix+'arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
                // layerUrlSecondary = servicePrefix+'ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
                // layerUrlTertiary = servicePrefix+'arcgis/rest/services/GISMO/scl/MapServer';
                layerUrlMain = 'http://maps.clarkcountynv.gov/arcgis_images/rest/services/CACHED/mostcurrentflight/MapServer';
                layerUrlSecondary = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorMap/MapServer';
                layerUrlTertiary = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/scl/MapServer';

                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

               //Dynamic Map layers (default)
               //Assessor Layer
               assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
               //Transportation Layer
               transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'transportationServiceLayer'});
            
                map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, abLayer]);

               break; //---------------------------------------------------


           case 'henderson zoning': //---------------------------------------


           require([
                   "esri/layers/ArcGISDynamicMapServiceLayer",
                   "esri/layers/ImageParameters"
                 ], function (
                   ArcGISDynamicMapServiceLayer, ImageParameters) {

                  //Use the ImageParameters to set the visibleLayerIds layers in the map service 
                  //during ArcGISDynamicMapServiceLayer construction.
                  var imageParameters = new ImageParameters();
                  imageParameters.layerIds = [6];
                  imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
                  //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

                   //remove all layers
                   map.removeAllLayers();

                   // primaryLayer = servicePrefix+'arcgis/rest/services/GISMO/Zoning/MapServer/';
                   // secondaryLayer = servicePrefix+'ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
                   // tertiaryLayer = servicePrefix+'arcgis/rest/services/GISMO/scl/MapServer';
                   primaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/Zoning/MapServer/';
                   secondaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorMap/MapServer';
                   tertiaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/scl/MapServer';

                   var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
                   //Assessor Layer
                   assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
                   //Transportation Layer
                   transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
                   
                  
                   //Dynamic Map layers
                   hendersonZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
                     id:'hendersonZoningLayer',
                     "opacity" : 0.7,
                     "imageParameters": imageParameters
                    });

                   map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, hendersonZoningLayer, abLayer]);

                 });


               break; //---------------------------------------------------



           case 'las vegas zoning': //---------------------------------------
               

           require([
                   "esri/layers/ArcGISDynamicMapServiceLayer",
                   "esri/layers/ImageParameters"
                 ], function (
                   ArcGISDynamicMapServiceLayer, ImageParameters) {

                  //Use the ImageParameters to set the visibleLayerIds layers in the map service 
                  //during ArcGISDynamicMapServiceLayer construction.
                  var imageParameters = new ImageParameters();
                  imageParameters.layerIds = [4];
                  imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
                  //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

                   //remove all layers
                   map.removeAllLayers();

                   // primaryLayer = servicePrefix+'arcgis/rest/services/GISMO/Zoning/MapServer/';
                   // secondaryLayer = servicePrefix+'ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
                   // tertiaryLayer = servicePrefix+'arcgis/rest/services/GISMO/scl/MapServer';
                   primaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/Zoning/MapServer/';
                   secondaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorMap/MapServer';
                   tertiaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/scl/MapServer';

                   var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
                   //Assessor Layer
                   assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
                   //Transportation Layer
                   transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
                   
                  
                   //Dynamic Map layers
                   lasVegasZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
                     id:'lasVegasZoningLayer',
                     "opacity" : 0.7,
                     "imageParameters": imageParameters
                    });

                   map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, lasVegasZoningLayer, abLayer]);

                 });


               break; //---------------------------------------------------


           case 'mesquite zoning': //---------------------------------------
               

           require([
                   "esri/layers/ArcGISDynamicMapServiceLayer",
                   "esri/layers/ImageParameters"
                 ], function (
                   ArcGISDynamicMapServiceLayer, ImageParameters) {

                  //Use the ImageParameters to set the visibleLayerIds layers in the map service 
                  //during ArcGISDynamicMapServiceLayer construction.
                  var imageParameters = new ImageParameters();
                  imageParameters.layerIds = [9];
                  imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
                  //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

                   //remove all layers
                   map.removeAllLayers();

                   // primaryLayer = servicePrefix+'arcgis/rest/services/GISMO/Zoning/MapServer/';
                   // secondaryLayer = servicePrefix+'ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
                   // tertiaryLayer = servicePrefix+'arcgis/rest/services/GISMO/scl/MapServer';
                   primaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/Zoning/MapServer/';
                   secondaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorMap/MapServer';
                   tertiaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/scl/MapServer';

                   var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
                   //Assessor Layer
                   assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
                   //Transportation Layer
                   transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
                   
                  
                   //Dynamic Map layers
                   mesquiteZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
                     id:'mesquiteZoningLayer',
                     "opacity" : 0.7,
                     "imageParameters": imageParameters
                    });

                   map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, mesquiteZoningLayer, abLayer]);

                 });


               break; //---------------------------------------------------


           case 'north las vegas zoning': //---------------------------------------

           require([
                   "esri/layers/ArcGISDynamicMapServiceLayer",
                   "esri/layers/ImageParameters"
                 ], function (
                   ArcGISDynamicMapServiceLayer, ImageParameters) {

                  //Use the ImageParameters to set the visibleLayerIds layers in the map service 
                  //during ArcGISDynamicMapServiceLayer construction.
                  var imageParameters = new ImageParameters();
                  imageParameters.layerIds = [7];
                  imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
                  //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

                   //remove all layers
                   map.removeAllLayers();

                   // primaryLayer = servicePrefix+'arcgis/rest/services/GISMO/Zoning/MapServer/';
                   // secondaryLayer = servicePrefix+'ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
                   // tertiaryLayer = servicePrefix+'arcgis/rest/services/GISMO/scl/MapServer';
                   primaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/Zoning/MapServer/';
                   secondaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorMap/MapServer';
                   tertiaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/scl/MapServer';

                   var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
                   //Assessor Layer
                   assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
                   //Transportation Layer
                   transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
                   
                  
                   //Dynamic Map layers
                   nlvZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
                     id:'nlvZoningLayer',
                     "opacity" : 0.7,
                     "imageParameters": imageParameters
                    });

                   map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, nlvZoningLayer, abLayer]);

                 });


               break; //----------------------------------------------------


           case 'seismic': //---------------------------------------


           require([
                   "esri/layers/ArcGISDynamicMapServiceLayer",
                   "esri/layers/ImageParameters"
                 ], function (
                   ArcGISDynamicMapServiceLayer, ImageParameters) {

                  //Use the ImageParameters to set the visibleLayerIds layers in the map service 
                  //during ArcGISDynamicMapServiceLayer construction.
                  var imageParameters = new ImageParameters();
                  imageParameters.layerIds = [5];
                  imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
                  //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

                   //remove all layers
                   map.removeAllLayers();

                   // primaryLayer = servicePrefix+'arcgis/rest/services/GISMO/Zoning/MapServer/';
                   // secondaryLayer = servicePrefix+'ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
                   // tertiaryLayer = servicePrefix+'arcgis/rest/services/GISMO/scl/MapServer';
                   primaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/Zoning/MapServer/';
                   secondaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorMap/MapServer';
                   tertiaryLayer = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/scl/MapServer';

                   var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
                   //Assessor Layer
                   assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
                   //Transportation Layer
                   transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
                   
                  
                   //Dynamic Map layers
                   seismicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
                     id:'seismicLayer',
                     "opacity" : 0.7,
                     "imageParameters": imageParameters
                    });

                   map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, seismicLayer, abLayer]);

                 });


               break; //---------------------------------------------------


           case 'soil guideline': //---------------------------------------
               
              //remove all layers
              map.removeAllLayers();

              // layerUrlMain = servicePrefix+'arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
              // layerUrlSecondary = servicePrefix+'arcgis/rest/services/GISMO/SoilsGuideline/MapServer';
              layerUrlMain = 'http://maps.clarkcountynv.gov/arcgis_images/rest/services/CACHED/mostcurrentflight/MapServer';
              layerUrlSecondary = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/SoilsGuideline/MapServer';

              var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

               //Dynamic Map layers
               SoilLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{
                 id:'SoilLayer',
                 "opacity" : 0.7//,
               });

              map.addLayers([basemap, SoilLayer, assessorannoServiceLayer, abLayer]);

              break; //---------------------------------------------------


           default: //---------------------------------------

              //default case is same as 'default'

              //remove all layers
              map.removeAllLayers();

              // layerUrlMain = servicePrefix+'arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
              // layerUrlSecondary = servicePrefix+'ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
              // layerUrlTertiary = servicePrefix+'arcgis/rest/services/GISMO/scl/MapServer';
              layerUrlMain = 'http://maps.clarkcountynv.gov/arcgis_images/rest/services/CACHED/mostcurrentflight/MapServer';
              layerUrlSecondary = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorMap/MapServer';
              layerUrlTertiary = 'https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/scl/MapServer';


              var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

             //Dynamic Map layers (default)
             //Assessor Layer
             assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
             //Transportation Layer
             transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'transportationServiceLayer'});

              map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, abLayer]);
                
              break; //---------------------------------------------------


       }


       console.log(' -------------------- ' + freshView + ' -------------------- ');
       console.log('layerUrlMain: ' + layerUrlMain)
       console.log('layerUrlSecondary: ' + layerUrlSecondary)
       console.log('layerUrlTertiary: ' + layerUrlTertiary)


       //update the current flight tag (info box)
       $("#currentViewTag").text(freshView);


    }

    //---------------------------------------------------------------------------------------------













    // //Show Status Message (tempIntroduction.html) ------------------------------------------------------
    // $scope.showStatusMessage = function (status) {

    //     // alert(status);


    



    //     //  //call for Owner (-)
    //     //  $scope.getOwnerRequest(data);

    //     //  //call for StreetView (-)
    //     //  // openFactory.getStreetView(theX,theY).then(function(data) {
    //     //  //   $scope.street = data;
    //     //  // });
    //     //  //OLD >
    //     // // $scope.getStreetView(theX, theY); //COMMENTED OUT ON 9/4 - GOOGLE NOW CHARGES FOR STREETVIEW SVC

    //     //  //call for Aerial FLight Date (-)
    //     //  openFactory.getArielFlightDate(theX, theY).then(function(data) {
    //     //      $scope.aerialDate = data;
    //     //  });
    //     //  //OLD >
    //     //  // $scope.getAerialFlightDate(theX, theY);

    //     //  // //if elected officials flag is active (set from accordion expand evt)
    //     //  // if (elecOfficialsFlag === true) {

    //     //  //call for Elected Officials  (-)
    //     //  openFactory.getOfficials(theX, theY).then(function(data) {
    //     //      $scope.elecOfficial = data;
    //     //  });




    //     // open.directive('assistantBlock', function() {

    //     // //Grab the module
    //     // var open = angular.module('open', ['ui.bootstrap']); //, 'ngAnimate'

    //     // open.factory('openFactory', function($http, $q){




    //     // //set the search value to What's Coming
    //     // $('#assistantInputBox').val("What's Coming"); 
    //     // //call to start the filter on the search text
    //     // // filterHelp_UL();



    //     // open.factory('openFactory', function($http, $q){
    //     // open.directive('assistantBlock', function() {


    //     // openFactory.getArielFlightDate(theX, theY).then(function(data) {
    //     //     $scope.aerialDate = data;
    //     // });

    //     // //THE MAIN SEARCH FUNCTION
    //     // scope.assistSearchandFilter = function(theSearch) {

    //     // // assistantBlock.assistSearchandFilter(theX, theY).then(function(data) {
    //     // //     $scope.aerialDate = data;
    //     // // });

    //     // assistantBlock.

    //     // scope.assistSearchandFilter
    //     // <input type="text" id="assistantInputBox" ng-change="assistSearchandFilter(helpTask);" ng-model="helpTask"  placeholder="Search for help..">

    //     assistantBlock.assistSearchandFilter("What's Coming");



 
        

    //     // //input the message text into the input box

    //     // $('#assistantULList_DIV2_Inner').val(status); 

    //     //Inline Block display the hidden message box in the modal
    //     $('#assistantULList_DIV2').css('display', 'block');

    //     //populate the assitant hidden message box with the current updates on the way
    //     $('#assistantULList_DIV2_Contents').text(status); 

    //     //manually show the modal dialog
    //     $('#assistantModal').modal('show'); 


    //     // ng-repeat

    //     // ng-model="result.name3"
    //     // result in Updates
    //     // result.statustext


        



    // }
    // //---------------------------------------------------------------------------------------------












































    // $.getJSON("http://gisgate.co.clark.nv.us/gismo/apps/mobile/newowl/testing.json?callback=?", function(result){
    //    //response data are now in the result variable
    //    alert('result');
    // });


    // $(function () {
    //     $.getJSON("http://gisgate.co.clark.nv.us/gismo/apps/mobile/newowl/testing.json?callback=?", function (data) {
    //     }).success(function (data) {
    //         // myArr = data.data;
    //         // doSomething(data.data);
    //     });
    // });


    // $(function () {
    //      $http.jsonp('http://gisgate.co.clark.nv.us/gismo/apps/mobile/newowl/testing.json?' + '&callback=JSON_CALLBACK').success(function(data) {
    //         console.log('zomg')
    //     });
    // });







    // $(function () {
    //     $.getJSON("./file.json", function (data) {
    //     }).success(function (data) {
    //         myArr = data.data;
    //         doSomething(data.data);
    //     });
    // });

    // $(function () {
    //     $.getJSON("/testing.json", function (data) {
    //     }).success(function (data) {
    //         console.log(data)
    //         // myArr = data.data;
    //         doSomething(data.list);
    //     });
    // });


    // function doSomething(arr) {
    //     console.log('SUCCESS')
    //     // for (i = 0; i < arr.length; i++) {
    //     //     console.log(arr[i].variable + ': ' + arr[i].value);
    //     // }
    // }



    //  $http.jsonp('http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getOwnershipHistory?parcel=' + attr + '&callback=JSON_CALLBACK').success(function(data, attr) {
    //     //Set Object
    //     $scope.ownershipHist = data;

    // });



    //  $http.jsonp('testing.json' + '&callback=JSON_CALLBACK').success(function(data) {
    //     //Set Object
    //     //$scope.ownershipHist = data;

    //     console.log('zomg')

    // });



     // //log metric
     // zomg(productCode, sessionNumber + ":Select Property");

    //  //log metric
    //  zomg();


    // //  // function zomg(rApp, rAction) {
    // // function zomg() {

    // //      $.ajax({
    // //              // method: "POST",
    // //               // url: "http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/addMetric",
    // //               url: "/testing.json",
    // //          })
    // //          .done(function(response) {
    // //             console.log('excelsior')
    // //          })
    // //          .fail(function(response) {
    // //              console.log('metric post fail')
    // //          });

    // //  }


    // // $.getJSON("http://example.com/something.json?callback=?", function(result){
    // //    //response data are now in the result variable
    // //    alert(result);
    // // });


    // function zomg() {

    //     $.getJSON("testing.json?callback=?", function(result){
    //        //response data are now in the result variable
    //      //  alert(result);

    //        console.log('successsion')
    //     });

    //  }


     // $(document).ready(function(){
     //     $.ajax({
     //         url: 'http://twitter.com/status/user_timeline/padraicb.json?count=10',
     //         dataType: 'jsonp',
     //         success: function(dataWeGotViaJsonp){
     //             var text = '';
     //             var len = dataWeGotViaJsonp.length;
     //             for(var i=0;i<len;i++){
     //                 twitterEntry = dataWeGotViaJsonp[i];
     //                 text += '<p><img src = "' + twitterEntry.user.profile_image_url_https +'"/>' + twitterEntry['text'] + '</p>'
     //             }
     //             $('#twitterFeed').html(text);
     //         }
     //     });
     // })


     // $(document).ready(function(){
     //     $.ajax({
     //         url: '/testing.txt',
     //         dataType: 'jsonp',
     //         success: function(data){

     //            console.log('successfion')
     //             // var text = '';
     //             // var len = dataWeGotViaJsonp.length;
     //             // for(var i=0;i<len;i++){
     //             //     twitterEntry = dataWeGotViaJsonp[i];
     //             //     text += '<p><img src = "' + twitterEntry.user.profile_image_url_https +'"/>' + twitterEntry['text'] + '</p>'
     //             // }
     //             // $('#twitterFeed').html(text);
     //         }
     //     });
     // })


     // // Using YQL and JSONP
     // $.ajax({
     //     url: "http://query.yahooapis.com/v1/public/yql",
      
     //     // The name of the callback parameter, as specified by the YQL service
     //     jsonp: "callback",
      
     //     // Tell jQuery we're expecting JSONP
     //     dataType: "jsonp",
      
     //     // Tell YQL what we want and that we want JSON
     //     data: {
     //         q: "select title,abstract,url from search.news where query=\"cat\"",
     //         format: "json"
     //     },
      
     //     // Work with the response
     //     success: function( response ) {
     //         console.log( response ); // server response
     //     }
     // });



     // // Using YQL and JSONP
     // $.ajax({
     //     url: "http://query.yahooapis.com/v1/public/yql",
      
     //     // The name of the callback parameter, as specified by the YQL service
     //     jsonp: "callback",
      
     //     // Tell jQuery we're expecting JSONP
     //     dataType: "jsonp",
      
     //     // Tell YQL what we want and that we want JSON
     //     data: {
     //         q: "select title,abstract,url from search.news where query=\"cat\"",
     //         format: "json"
     //     },
      
     //     // Work with the response
     //     success: function( response ) {
     //         console.log( 'response' ); // server response
     //     }
     // });


     // // Using YQL and JSONP
     // $.ajax({
     //     url: "testing.json",
      
     //     // The name of the callback parameter, as specified by the YQL service
     //     jsonp: "callback",
      
     //     // Tell jQuery we're expecting JSONP
     //     dataType: "jsonp",
      
     //     // // Tell YQL what we want and that we want JSON
     //     // data: {
     //     //     q: "select title,abstract,url from search.news where query=\"cat\"",
     //     //     format: "json"
     //     // },
      
     //     // Work with the response
     //     success: function( response ) {
     //         console.log( 'response' ); // server response
     //     }
     // });




     // //template
    // var propInfoURL_such = 'http://maps.clarkcountynv.gov/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/PointToParcel?';

     // //buildPropertyInfo 
     // $http.jsonp(propInfoURL + 'method=gismo' + '&xcoordinate=' +
     //     theX + '&ycoordinate=' + theY + '&returnGeometry=true&wkid=102707' +
     //     '&callback=JSON_CALLBACK').
     // success(function(data) {

     // };





     //404 not found errors:

    //  //template
    //  var suchlame = './testing2.txt?';

    //  var suchwow = 'testing.json?';

    // //  //buildPropertyInfo 
    // //  $http.jsonp(suchwow + '&callback=JSON_CALLBACK').success(function(data) {
    // //     console.log(data)

    // // });

    //  //buildPropertyInfo 
    //  $http.jsonp(suchwow + '&callback=JSON_CALLBACK').success(function(data) {
    //     console.log(data)

    // });



    //parsing flightObj 
    // var viewObj = require('./test.json'); //with path
    // var viewObj = require('/test.txt'); //with path

    // var viewObj = JSON.parse(text);
    // var viewObj = JSON.parse('./test.txt');

    // loadJSON("data.json", drawData);

    // loadJSON("test.txt", drawData);

    // loadJSON("testing.json", drawData);



    // function drawData(data) {
    //     console.log('successful!')

    // }

    





    //---------------------------------------------------------------------------------------



    $scope.addressGraber = [];
    $scope.aerialDate = [];
    $scope.elecOfficial = [];
    $scope.linkInfo = [];
    $scope.printViewLink = [];

    $scope.weather = [];

    //used in the development and manipulation of the address string (1709)
    // var grabAddress;
    var grabAddress, streetEndDecide, streetEndLast, streetDir;
    var streetTypes = ['ALY', 'ANX', 'AVE', 'BND', 'BLF', 'BLVD', 'BRK', 'BYP', 'CYN', 'CIR', 'CT', 'CV', 'CRK', 'CRES', 'CRST',
        'XING', 'DR', 'EXPY', 'FRK', 'FWY', 'HTS', 'HWY', 'HL', 'JCT', 'LN', 'LOOP', 'MTN', 'PARK', 'PKWY', 'PASS', 'PATH',
        'PL', 'PLZ', 'PT', 'RNCH', 'RDG', 'RD', 'RTE', 'RUN', 'SPG', 'SPUR', 'SQ', 'STRA', 'ST', 'SMT', 'TER', 'TRAK',
        'TRL', 'VLY', 'VW', 'VIS', 'WALK', 'WAY'
    ];






    //Search (search-form) -----------------------------------------------------
    //$scope.executeSearch = function(val) {
    $scope.executeSearch = function(val,magi) {


        //if comes in with a magic key param
        if (magi != null) {

            //new
            //JUST PASSING IN NULL FOR NOW TO TEST DUPE MAGI KEY
            //PASSING IN NULL FOR MAGI KEY MAKES IT WORK EVERY TIME
            // $scope.ajaxAddress(val,magi);
            $scope.ajaxAddress(val,magi);
            console.log('(3) EXECUTING SIMPLE PASS OFF TO AJAX ADDRESS ALONG WITH MAGIC')

        }
        else //(do it the old way, used for querystring params, etc)
        {


            //Regex Patterns:

            //Match both alphabetic & numerical characters for address search
            var addressPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])/;

            //Match only numerical characters for APN search
            var apnPattern = /(?![a-zA-Z]).*/;


            try {

                //*Owner*
                if (val.indexOf("~") > -1) {
                    //remove all non-alphabetic characters
                    val = val.replace(/\D/g, '');

                    console.log('C [[ SEARCH RESOLVED AS AN OWNER ]]')

                    //execute to find owner by APN
                    $scope.ajaxAPN(val);

                    return;
                }
                //*Address*
                else if (val.match(addressPattern)) {
                    //execute to find address
                    $scope.ajaxAddress(val,null);

                    console.log('C [[ SEARCH RESOLVED AS AN ADDRESS ]]')

                    return;
                }
                //*APN*
                else if (val.match(apnPattern)) {
                    //execute to find apn
                    $scope.ajaxAPN(val);

                    console.log('C [[ SEARCH RESOLVED AS AN APN ]]')

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
                else {
                    console.log('C [[ SEARCH RESOLVED AS A NONE ]]')

                    return;
                }

            } catch (err) {

                console.log('C [[ SEARCH REGEX RESOLVED AS AN ERROR ]]')



                return;
            }



        }



    }
    //------------------------------------------------------------------------------


    //Address Search (search-form) -----------------------------------------------------
    $scope.ajaxAddress = function(address,magi) {


        //if comes in with a magic key param
        if (magi != null) {

            //console.log('(5) IT JUST HIT MAGI IN AJAXADDRESS')
            console.log('(4) AJAXADDRESS; THE MAGIC KEY, WHICH SHOULD BE ONE, IS: ' + JSON.stringify(magi))

            //searchURL
            var searchURL = servicePrefix+'arcgis/rest/services/Locators/Clark_County_Composite_All/GeocodeServer/findAddressCandidates?';
           // var searchURL = 'http://maps.clarkcountynv.gov/arcgis/rest/services/Locators/Clark_County_Composite_All/GeocodeServer/findAddressCandidates?';
            



            // return $http.jsonp(searchURL + 'Street=' + '' + '&SingleLine=' + '' + '&category=' + '' + '&outFields=' + '' +  '&maxLocations=' + '' + '&outSR=' + '' + '&searchExtent=' + '' + '&location=' + '' + '&distance=' + '' + '&magicKey=' + magi + '&f=' + 'pjson' + '&callback=JSON_CALLBACK').then(function(response) {
            return $http.jsonp(searchURL + 'Street=' + address + '&SingleLine=' + '' + '&category=' + '' + '&outFields=' + '' +  '&maxLocations=' + '' + '&outSR=' + '' + '&searchExtent=' + '' + '&location=' + '' + '&distance=' + '' + '&magicKey=' + magi + '&f=' + 'pjson' + '&callback=JSON_CALLBACK').then(function(response) {


                // //testing
                // console.log(JSON.stringify(response.data.candidates[0]));



                try {

                    //IF ADDRESS CAN NOT BE FOUND IN DATA
                    if (JSON.stringify(response.data.candidates[0]) === undefined)
                    // magi != null 
                    {
                        //alert the user - DATA FOR THE SPECIFIED ADDRESS CAN NOT BE FOUND, WOULD YOU LIKE TO 
                        //view the location anyway?
                        //ESRI world geocode service, lat/long return

                       // alert('Location Not Found')




                        ai('nolocation');

                        console.log('it didnt come up');





                        // // //Call to executeQueryTask
                        // $scope.executeQueryTask(xcoord, ycoord, 'magi'); //propselect

                    }
                    else {

                        console.log('and then it went crazy');

                        //Set x and y coord to location
                       // var theAddress = response.data.candidates[0].address;
                       var xcoord = response.data.candidates[0].location.x;
                       var ycoord = response.data.candidates[0].location.y;

                       // //Call to executeQueryTask
                       $scope.executeQueryTask(xcoord, ycoord, 'magi'); //propselect

                    }


                } catch (err) {}



            });

        }

        else { //else just search on it the old way - used for inputs coming in from querystring parms

            console.log('OR ELSE ITS STILL HITTING THE OLD COMPOSIT LOCATOR') //will need  to update this to new search service eventually


            //OLD

                // var searchURL = servicePrefix+'arcgis/rest/services/CompositLocator/GeocodeServer/findAddressCandidates?';
                var searchURL = "http://gisgate.co.clark.nv.us/"+'arcgis/rest/services/CompositLocator/GeocodeServer/findAddressCandidates?';
  
                //var searchURL = 'http://maps.clarkcountynv.gov/arcgis/rest/services/CompositLocator/GeocodeServer/findAddressCandidates?';


                return $http.jsonp(searchURL + 'Street=' + address + '&SingleLine=' + '' + '&outFields=' + '' + '&outSR=' + '' + '&searchExtent=' + '' + '&f=' + 'pjson' + '&callback=JSON_CALLBACK').then(function(response) {

                    // return $http.jsonp(searchURLformed + '&callback=JSON_CALLBACK').then(function(response){

                    try {

                        // var theAddress = response.data.candidates[0].address;
                        var xcoord = response.data.candidates[0].location.x;
                        var ycoord = response.data.candidates[0].location.y;


                    } catch (err) {}


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

    }
    //------------------------------------------------------------------------------



    //APN Search (search-form) -----------------------------------------------------
    $scope.ajaxAPN = function(apn) {


            console.log('hit apn search')


            var searchURL = servicePrefix+'gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/parcelSearch?';
            //var searchURL = 'http://maps.clarkcountynv.gov/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/parcelSearch?';
            


            return $http.jsonp(searchURL + 'method=gismo' + '&parcel=' + apn + '&callback=JSON_CALLBACK').then(function(response) { //apn.length

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
                            "geometry": JSON.parse(Myrings),
                            "symbol": {
                                // "color" : [212, 121, 224, 255],
                                "color": [255, 255, 0, 0.3],
                                // "outline" : {
                                //   "color" : [100, 0, 0, 255],
                                //   "width" : 1,
                                //   "type" : "esriSLS",
                                //   "style" : "esriSLSSolid"
                                "outline": {
                                    "color": [212, 121, 224, 255],
                                    "width": 3,
                                    "type": "esriSLS",
                                    "style": "esriSLSSolid"

                                },
                                "type": "esriSFS",
                                "style": "esriSFSSolid"
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


                        //OLD METHOD - BEFORE ADDING CENTER & ZOOM, ALONG WITH ZOOM LEVEL (used to just highlight and pan)
                        // map.centerAt(gra.geometry.getExtent().getCenter()); //new

                        // console.log(gra.geometry.getExtent().getCenter().x)

                        //set centerAndZoom
                        require([
                            "esri/geometry/Point", "esri/SpatialReference"
                        ], function(Point, SpatialReference) {

                            map.centerAndZoom(new Point(gra.geometry.getExtent().getCenter().x, gra.geometry.getExtent().getCenter().y, new SpatialReference({ wkid: 102707 })), 5);

                        });



                    } else {
                        console.log("C [[ parcel not found ]]");
                    }


                } catch (err) {}

                // //added-----------------------------
                //  //Call to executeQueryTask
                //  //Call the 'mapController' controller found on map element (pass in evt param)
                // $scope.executeQueryTask(xcoord, ycoord);

            });

        }
        //------------------------------------------------------------------------------








    //theMove (Map Mousemove) -----------------------------------------------------
    $scope.mapevtMouseMove = function(uX, uY) {

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
            } else if (coordSystem === 'lat-long') //lat long
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
    $scope.mapevtExtentChange = function(uX, uY, uLVL) {

            if (coordSystem === 'state-plane-ft') //state plane (default)
            {
                // if (showX) { //check if exists 
                //     $scope.thePoint.X = Math.round(uX);
                //     $scope.thePoint.Y = Math.round(uY);
                // }

                //craft a state plane ft url
                // var craftedURL = '?@'+Math.round(uX)+','+Math.round(uY);
                var craftedURL = '?@' + Math.round(uX) + ',' + Math.round(uY) + ',' + uLVL;


                //update the windows.location url
                if (typeof(history.pushState) != "undefined") {
                    var obj = { Page: 'page', Url: craftedURL };
                    history.pushState(obj, obj.Page, obj.Url);
                } else {
                    window.location.href = "@homePage";
                    // alert("Browser does not support HTML5.");
                }


            } else if (coordSystem === 'lat-long') //lat long
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


                 var theURL = servicePrefix+'arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=102707&outSR=4326&f=pjson&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":' + uX + ',"y":' + uY + '}]}';
                //var theURL = 'http://maps.clarkcountynv.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=102707&outSR=4326&f=pjson&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":' + uX + ',"y":' + uY + '}]}';



                //make request for coord conversion
                $http.jsonp(theURL + '&callback=JSON_CALLBACK').success(function(data) {

                    console.log(data.geometries[0].x.toFixed(7));
                    console.log(data.geometries[0].y.toFixed(7));

                    //bind vals for universal coord system (to be used in infoblock x/y)
                    $scope.thePointInfo.X = data.geometries[0].y.toFixed(7);
                    $scope.thePointInfo.Y = data.geometries[0].x.toFixed(7);

                    //craft a lat long url
                    // var craftedURL = '?@'+data.geometries[0].y.toFixed(7)+','+data.geometries[0].x.toFixed(7);
                    var craftedURL = '?@' + data.geometries[0].y.toFixed(7) + ',' + data.geometries[0].x.toFixed(7) + ',' + uLVL;


                    //update the windows.location url
                    if (typeof(history.pushState) != "undefined") {
                        var obj = { Page: 'page', Url: craftedURL };
                        history.pushState(obj, obj.Page, obj.Url);
                    } else {
                        window.location.href = "@homePage";
                        // alert("Browser does not support HTML5.");
                    }

                }).
                error(function(data) {

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

        }
        //------------------------------------------------------------------------------









    //executeQueryTask -------------------------------------------------------------
    $scope.executeQueryTask = function(theX, theY, resolveAs) {

        console.log('(5) EXECUTE MAGI COMES IN AS: ' + theX, theY)

        //reset / clear print preview base link
        $scope.printBase = undefined;

        //new
        var propInfoURL = servicePrefix+'gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/PointToParcel?';
        //var propInfoURL = 'http://maps.clarkcountynv.gov/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/PointToParcel?';



        //buildPropertyInfo 
        $http.jsonp(propInfoURL + 'method=gismo' + '&xcoordinate=' +
            theX + '&ycoordinate=' + theY + '&returnGeometry=true&wkid=102707' +
            '&callback=JSON_CALLBACK').
        success(function(data) {


            //if propselect param is true, then also execute to bring up prop info  (true by default)
            // if (propselect === true) {


            var Myrings = "{\"rings\" :" + data.parcelGeometry + ",\"spatialReference\":{\"wkid\":102707}}";

            map.graphics.clear();
            var myPolygon = {
                "geometry": JSON.parse(Myrings),
                "symbol": {
                    // "color" : [212, 121, 224, 255],
                    "color": [255, 255, 0, 0.3],
                    // "outline" : {
                    //   "color" : [100, 0, 0, 255],
                    //   "width" : 1,
                    //   "type" : "esriSLS",
                    //   "style" : "esriSLSSolid"
                    "outline": {
                        "color": [212, 121, 224, 255],
                        "width": 3,
                        "type": "esriSLS",
                        "style": "esriSLSSolid"

                    },
                    "type": "esriSFS",
                    "style": "esriSFSSolid"
                }
            };
            var gra = new esri.Graphic(myPolygon);
            // map.graphics.add(gra);

            // propselect = true;
            // $scope.propselect = true;
            //resolveAs types: select, search




            if (resolveAs === 'select') { //if its a select property that triggered the evt


                //Add Graphics: color the parcel perimeter
                map.graphics.add(gra);


                // //craft a new point
                // var point = new esri.geometry.Point({
                // "x" : theX,
                // "y" : theY,
                // "spatialReference" : {
                // "wkid" : 102707
                // }
                // });

                // //set zoom factor
                // var factor = 5;

                // //clear graphics
                // map.graphics.clear();

                // //create new location symbol
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

                // //drop location symbol at map point
                // currentGraphic = new esri.Graphic(point, loc_symbol);
                // map.graphics.add(currentGraphic);

                // //zoom to map point according to zoom factor
                // map.centerAndZoom(point, factor)


            }
            if (resolveAs === 'search') { //else set graphics, zoom AND pan

                map.graphics.add(gra);
                map.setExtent(gra.geometry.getExtent(), true); //old

            }
            if (resolveAs === 'magi') { //else set graphics, zoom AND pan


                 console.log('(6) RESOLVED AS X/Y: ' + theX + ' ,' + theY)



                 //craft a new point
                 var point = new esri.geometry.Point({
                 "x" : theX,
                 "y" : theY,
                 "spatialReference" : {
                 "wkid" : 102707
                 }
                 });

                 //set zoom factor
                 var factor = 9;

                 //clear graphics
                 map.graphics.clear();

                 //create new location symbol
                 var loc_symbol = new esri.symbol.PictureMarkerSymbol({
                 "angle":0,
                 "xoffset":0,
                 "yoffset":10,
                 "type":"esriPMS",
                 "url":"images/pin.png",
                 // "url":"images/pin.png",
                 "contentType":"image/png",
                 "width":34,
                 "height":34
                 // "width":24,
                 // "height":24
                 });

                 //Add Graphics: drop location symbol at map point
                 currentGraphic = new esri.Graphic(point, loc_symbol);
                 map.graphics.add(currentGraphic);

                 //zoom to map point according to zoom factor
                 map.centerAndZoom(point, factor)





                 // require([
                 //   "esri/geometry/Point", "esri/SpatialReference", ... 
                 // ], function(Point, SpatialReference, ... ) {
                 //   new Point(-118.15, 33.80, new SpatialReference({ wkid: 4326 }));
                 //   map.centerAt(new Point(locale.split(",")[1], locale.split(",")[0]));
                 // });

                 // map.setExtent(gra.geometry.getExtent(), true); //old 

                 //         // require([
                 //         //   "esri/geometry/Point", "esri/SpatialReference", ... 
                 //         // ], function(Point, SpatialReference, ... ) {
                 //         //   new Point(-118.15, 33.80, new SpatialReference({ wkid: 4326 }));
                 //         //   map.centerAt(new Point(locale.split(",")[1], locale.split(",")[0]));
                 //         // });

                 // https://developers.arcgis.com/javascript/3/jsapi/map-amd.html#centerandzoom

                 // map.centerAndZoom(location,12);

                 // map.centerAt(evt.mapPoint);


                // map.graphics.add(gra);
                 //map.setExtent(gra.geometry.getExtent(), true); //old

            }




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
           // $scope.getStreetView(theX, theY); //COMMENTED OUT ON 9/4 - GOOGLE NOW CHARGES FOR STREETVIEW SVC

            //call for Aerial FLight Date (-)
            openFactory.getArielFlightDate(theX, theY).then(function(data) {
                $scope.aerialDate = data;
            });
            //OLD >
            // $scope.getAerialFlightDate(theX, theY);

            // //if elected officials flag is active (set from accordion expand evt)
            // if (elecOfficialsFlag === true) {

            //call for Elected Officials  (-)
            openFactory.getOfficials(theX, theY).then(function(data) {
                $scope.elecOfficial = data;
            });
            //OLD >
            // $scope.getElectedOfficials(theX, theY);
            // }

            // // //call for Weather (only if weatherBlock scope active) (-)
            // //pass in the active weatherBlock scope, and current zip
            // openFactory.getWeather($scope.theWeather, data.ZipCode).then(function(data) {
            //    // $scope.weather = data;
            //     $scope.weather = data;
            // });

            //call for Links (-)
            // openFactory.getSelectPropertyLinks(data).then(function(data) {
            //     $scope.linkInfo = data;
            // });
            // openFactory.getSelectPropertyLinks(data).then(function(data) {
            //     $scope.linkInfo = data;
            // });
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
            openFactory.getZoning(theX, theY).then(function(data) {
                $scope.zoning = data;
                console.log('THIS IS getZoning: ' + JSON.stringify(data))
            });

            // //call for PLU (-)
            // openFactory.getCommunityDist(theX,theY).then(function(data) {
            //   $scope.PLU = data;
            // });
            openFactory.getCommunityDist(theX,theY).then(function(data) {
              $scope.PLU = data;
              console.log('THIS IS getCommunityDist: ' + JSON.stringify(data))
            });

            //call for LandUse (-)
            openFactory.getLandUse(theX,theY).then(function(data) {
              $scope.land = data;
              console.log('THIS IS LandUsePlanArea: ' + JSON.stringify(data))
            });


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


        }).
        error(function(data) {
            $scope.data = "Request failed";
        });



        }
        //------------------------------------------------------------------------------






    //getOwnerRequest -------------------------------------------------------------
    $scope.getOwnerRequest = function(attr) {

            var mobileParcel = attr.parcel;


            //JSONP calls

            //buildPropertyInfo 
             $http.jsonp(servicePrefix+'gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getPropertyInfo?parcel=' + attr.parcel + '&callback=JSON_CALLBACK').success(function(data, attr) {
             //   $http.jsonp('http://maps.clarkcountynv.gov/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getPropertyInfo?parcel=' + attr.parcel + '&callback=JSON_CALLBACK').success(function(data, attr) {


                //Formatting the data object---------------------------------

                //SaleDate (null result)
                if (data.SaleDate === null || data.SaleDate === "") {
                    data.SaleDate = "Not Available";
                } else {

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
                } else { //format currency
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

                //X/Y
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

                } else if (rightofwayCheck === '95') { //Private Right-of-Way

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

                } else { //Regular Parcel

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
                console.log("C [[ acShowing: " + autocompleteIsShowing + " | acDirty: " + autocompleteDirty + " | searchCompleted: " + searchHasCompleted + " ]]");


                if ($("#tester .dropdown-menu").css('display') == 'none') {
                    autocompleteIsShowing = false;
                    // true
                } else {
                    autocompleteIsShowing = true;
                }


                //Show on Select Prop
                //need a case where no autocomplete is showing, search has not completed


                //defaults readout
                console.log('auto is showing: ' + autocompleteIsShowing)
                console.log('ac dirty?: ' + autocompleteDirty)
                console.log('search has complete: ' + searchHasCompleted)
                console.log('side panel open?: ' + skinnyPanelOpen)
                console.log('input length: ' + $("#tester input").val().length)

                // //newly added to account for the case when a select property is clicked after first collapsing the side panel
                // if (autocompleteIsShowing === false && searchHasCompleted === true && $("#tester input").val().length < 3) 
                // {
                //   $('#PropInfoDialog').css({
                //     'top': 49,
                //     'left': 59
                //     });
                //   // $( "#PropInfoDialog" ).show();
                //   $('#PropInfoDialog').css({
                //     'visibility': 'visible'
                //     // 'visibility': 'visible'
                //     });
                // // console.log('two');
                // console.log('L [[ updating layout ]]');
                // console.log('SUCCESSFUL TEST THREE')
                // } 


                if (autocompleteIsShowing === true && searchHasCompleted === false) { //AUTOCOMPLETE SHOWING - INITIAL STATE

                    $('#PropInfoDialog').css({
                        'visibility': 'hidden'
                    });
                    console.log('C [[ propInfoVis-b[0]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");

                } else if (autocompleteIsShowing === true && searchHasCompleted === true) { //AUTOCOMPLETE SHOWING & PREV SEARCH ACTIVE

                    //prop info results positioning
                    $("#PropInfoDialog").position({
                        my: "left top",
                        // at: "left+1 bottom+2",
                        at: "left+1 bottom+0",
                        of: "#tester .dropdown-menu"
                            // of: "#tester #search-form"
                    });
                    // $( "#PropInfoDialog" ).show();
                    $('#PropInfoDialog').css({
                        'visibility': 'visible'
                    });
                    console.log('C [[ propInfoVis-b[1]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");
                }

                //autocomplete is not showing, it never has & length is min
                else if (autocompleteIsShowing === false && autocompleteDirty === false && searchHasCompleted === false && $("#tester input").val().length < 3) { //AUTOCOMPLETE HIDDEN - INITIAL STATE  && autocompleteDirty === false

                    $('#PropInfoDialog').css({
                        'top': 49,
                        'left': 240
                    });
                    // $( "#PropInfoDialog" ).show();
                    $('#PropInfoDialog').css({
                        'visibility': 'hidden'
                    });
                    console.log('C [[ propInfoVis-b[2]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");

                }
                // //autocomplete is not showing, it never has & length is min (SELECT PROP) AND SIDE PANEL IS OPEN
                // else if (autocompleteIsShowing === false && autocompleteDirty === false && searchHasCompleted === true && slidePanelOpen === true && slidePanelOpen $("#tester input").val().length < 3) { //AUTOCOMPLETE HIDDEN - INITIAL STATE  && autocompleteDirty === false
                //     $('#PropInfoDialog').css({
                //         'top': 49,
                //         'left': 240
                //     });
                //     // $( "#PropInfoDialog" ).show();
                //     $('#PropInfoDialog').css({
                //         'visibility': 'visible'
                //     });
                //     console.log('C [[ propInfoVis-b[3]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");
                // }

                //autocomplete is not showing, it never has & length is min (SELECT PROP) AND SIDE PANEL IS OPEN
                else if (autocompleteIsShowing === false && autocompleteDirty === false && searchHasCompleted === true && skinnyPanelOpen === true && $("#tester input").val().length < 3) { //AUTOCOMPLETE HIDDEN - INITIAL STATE && autocompleteDirty === false

                    $('#PropInfoDialog').css({
                        'top': 49,
                        'left': 240
                    });
                    // $( "#PropInfoDialog" ).show();
                    $('#PropInfoDialog').css({
                        'visibility': 'visible'
                    });
                    console.log('C [[ propInfoVis-b[3]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");

                }

                //autocomplete is not showing, it never has & length is min (SELECT PROP) AND SIDE PANEL HAS BEEN COLLAPSED
                else if (autocompleteIsShowing === false && autocompleteDirty === false && searchHasCompleted === true && skinnyPanelOpen === false && $("#tester input").val().length < 3) { //AUTOCOMPLETE HIDDEN - INITIAL STATE  && autocompleteDirty === false && SIDE PANEL IS CLOSED

                    $('#PropInfoDialog').css({
                        'top': 49,
                        'left': 59
                    });
                    // $( "#PropInfoDialog" ).show();
                    $('#PropInfoDialog').css({
                        'visibility': 'visible'
                    });
                    console.log('C [[ propInfoVis-b[3]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");

                }
                //autocomplete is not showing, it never has & length is long
                else if (autocompleteIsShowing === false && autocompleteDirty === false && searchHasCompleted === false && $("#tester input").val().length > 2) { //AUTOCOMPLETE HIDDEN - INITIAL STATE  && autocompleteDirty === false

                    $('#PropInfoDialog').css({
                        'top': 49,
                        'left': 240
                    });
                    // $( "#PropInfoDialog" ).show();
                    $('#PropInfoDialog').css({
                        'visibility': 'hidden'
                    });
                    console.log('C [[ propInfoVis-b[4]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");

                }
                //******************************diff from typeahead search logic******************
                //autocomplete is not showing, it has before though & length is min (SELECT PROP AFTER SEARCH)
                else if (autocompleteIsShowing === false && autocompleteDirty === true && searchHasCompleted === true && $("#tester input").val().length < 3) { //AUTOCOMPLETE HIDDEN - DIRTY STATE

                    //  console.log('this needs to show')

                    $('#PropInfoDialog').css({
                        'top': 49,
                        'left': 240
                    });
                    // $( "#PropInfoDialog" ).show();
                    $('#PropInfoDialog').css({
                        // 'visibility': 'hidden'
                        'visibility': 'visible'
                    });
                    console.log('C [[ propInfoVis-b[5]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");

                }
                //*******************************************************************************
                //autocomplete is not showing, it has before though & length is long
                else if (autocompleteIsShowing === false && autocompleteDirty === true && searchHasCompleted === true && $("#tester input").val().length > 2) { //AUTOCOMPLETE HIDDEN - DIRTY STATE

                    $('#PropInfoDialog').css({
                        'top': 49,
                        'left': 240
                    });
                    // $( "#PropInfoDialog" ).show();
                    $('#PropInfoDialog').css({
                        'visibility': 'visible'
                    });
                    console.log('C [[ propInfoVis-b[6]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");

                }

                // //*******************************************************************************
                // //ADDED FOR THE CASE WHEN THE SIDE PANEL COLLAPSED, AND THEN SELECT PROPERTY IS CALLED ON MAP CLICK
                // else if (autocompleteIsShowing === false && autocompleteDirty === true && searchHasCompleted === false && $("#tester input").val().length < 3) { //AUTOCOMPLETE HIDDEN - DIRTY STATE

                //     $('#PropInfoDialog').css({
                //         'top': 49,
                //         'left': 59
                //     });
                //     // $( "#PropInfoDialog" ).show();
                //     $('#PropInfoDialog').css({
                //         'visibility': 'visible'
                //     });
                //     console.log('C [[ propInfoVis-b[7]' + JSON.stringify($("#PropInfoDialog").position()) + " ]]");

                // }


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
                var title = "<table id='popup_Table' style='margin-top:-2px;margin-bottom:-5px; width:150px; border:0px;' class='infoWindowCustom' border='0'><tr><td><i class='glyphicon glyphicon-info-sign'></i></td><td>Property Info</td></tr></table>";
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


                //Set the content to the mobile infoWindow
                map.infoWindow.setTitle(title);
                map.infoWindow.setContent(content);

                //resize the infoWindow
                map.infoWindow.resize(200, 150);



                //Init Event for extended mobile property Info
                // $( "#moreInfoLink" ).click(function() {
                $(".maximize").click(function() {

                    if (isMax % 2 == 0) {

                        console.log('is odd')

                        isMax = isMax + 1;

                        //Prop Info (Expanded)
                        var content1 = "<div class='popup_Spacer'></div>" + "<b>Parcel:</b> " + mobileParcel + "<br> <b>Owner:</b> " + data.OwnerName + "<br><b>Add.:</b> " + data.SiteAddress;
                        content1 += "<br><b>Acres:</b> " + data.CalcAcres;
                        content1 += "<br><br><b>Sale Date: </b> " + data.SaleDate;
                        content1 += "<br><b>Sale Price: </b> " + data.SalePrice;
                        content1 += "<br><b>Const. Year: </b> " + data.ConsructionYear;
                        content1 += "<br><b>Doc Number: </b> " + "<a class='infoLinks' target='_blank' href='http://maps.clarkcountynv.gov/assessor/webimages/default.asp?appID=1&txtdocNum=data.DocNumber'>" + data.DocNumber + "</a>";
   
                        content1 += "<br><b>Subd. Name: </b> " + data.SubName;
                        content1 += "<br><b>Lot Block: </b> " + data.LotBlock;
                        content1 += "<br><b>Aerial Date: </b> " + data.aerialDate;
                        content1 += "<br><b>T-R-S: </b> " + data.TownshipRangeSection;
                        content1 += "<br><b>Book Page: </b> " + data.AssessorBook + ", " + data.AssessorPage;

                        //Link Info
                        content1 += "<br><br><b>Links</b>";
                        content1 += "<br><a id='infoLink0_mob' class='infoLinks' target='_blank' href='{{linkInfo.AssessorInformation}}'>Assessor's Information</a>";
                        content1 += "<br><a id='infoLink1_mob' class='infoLinks' target='_blank' href='{{linkInfo.AssessorParcelmaps}}'>Assessor's Parcel Map</a>";
                        content1 += "<br><a id='infoLink2_mob' class='infoLinks' target='_blank' href='{{linkInfo.TreasurerInformation}}'>Treasurer's Information</a>";
                        content1 += "<br><a id='infoLink3_mob' class='infoLinks' target='_blank' href='{{linkInfo.DocumnetImagingRecords}}'>Document Image Records</a>";
                        content1 += "<br><a id='infoLink4_mob' class='infoLinks' target='_blank' href='{{linkInfo.SoilGuidlinesLink}}'>Soil Guidelines Map</a>";
                        content1 += "<br><a id='infoLink5_mob' class='infoLinks' target='_blank' href='{{linkInfo.ExpansiveSoilGuidelinesLink}}'>Expansive Soil Guidelines Map</a>";
                        content1 += "<br><a id='infoLink6_mob' class='infoLinks' target='_blank' href='{{linkInfo.FloodZoneInformation}}'>Flood Zone Information</a>";
                        content1 += "<br><a id='infoLink7_mob' class='infoLinks' target='_blank' href='http://maps.clarkcountynv.gov/openweb?getparcel={{attr.parcel}}'>Mail Link of Current Parcel</a>";

                        //Set infoWindow content
                        map.infoWindow.setContent(content1);

                    } else {

                        console.log('is even')

                        isMax = isMax + 1;

                        // var content2 = "<div class='popup_Spacer'></div>" + "<b>Parcel:</b> " + mobileParcel + "<br> <b>Owner:</b> " + data.OwnerName + "<br><b>Add.:</b> " + data.SiteAddress;
                        // content2 += "<br><b>Acres:</b> " + data.CalcAcres;

                        // map.infoWindow.setContent(content2);
                        // map.infoWindow.resize(200, 150);

                    }


                });


                //---------------------------------------

                //set up grabAddress for ancillary controller functions (str view url, getSCLZip, etc)
                grabAddress = data.SiteAddress;




                //--------------------------------------------
                //+/+/+/+/+/ Calls to Data Factory /+/+/+/+/+/
                //--------------------------------------------
                // $scope.getAerialFlightDate(attr.parcel);

                // // //call for Weather (only if weatherBlock scope active) (-)
                // //pass in the active weatherBlock scope, and current zip
                openFactory.getWeather($scope.theWeather, data.ZipCode).then(function(data) {
                    $scope.weather = data;
                  //  $scope.currentWeather = data;

                  console.log('look at this returned weather: ' +  JSON.stringify($scope.weather))
                });

                // // //call for Value (only if weatherBlock scope active) (-)
                // //pass in the active weatherBlock scope, and current address
                openFactory.getValuation($scope.theValuation, data.SiteAddress).then(function(data) {
                    $scope.valuation = data;

                 console.log('look at this returned valuation: ' +  JSON.stringify($scope.valuation))
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

                    if (thesecond.length === 1) {

                        //check for and remove street directionals - (S, N, E, W)
                        if (/S/i.test(thesecond) || /N/i.test(thesecond) || /E/i.test(thesecond) || /W/i.test(thesecond)) {

                            grabAddress = grabAddress.replace(thesecond, "");

                            //remove the excess internal whitespace created
                            grabAddress = grabAddress.replace(/(^\s*)|(\s*$)/gi, "");
                            grabAddress = grabAddress.replace(/[ ]{2,}/gi, " ");
                            grabAddress = grabAddress.replace(/\n /, "\n");

                            console.log('C [[ street contains directional ]]');

                        } else {}



                    } else {}





                    //-remove street types (if == WAY, AVE, PKWY, BLVD)
                    streetEndDecide = grabAddress.split(" "); //grab last word, and decide
                    if (streetEndDecide[streetEndDecide.length - 1] === "PKWY" || "WAY" || "AVE" || "BLVD") //ST, CT, RD, DR, CIR
                    {
                        //loop through the array of all available streetTypes
                        length = streetTypes.length;
                        while (length--) {
                            if (grabAddress.indexOf(streetTypes[length]) != -1) {
                                // one of the substrings is in yourstring

                                //then remove the last word in the string (street ending)
                                streetEndLast = grabAddress.lastIndexOf(" ");
                                grabAddress = grabAddress.substring(0, streetEndLast);

                                console.log('C [[ street contains streetType ]]');
                            }

                        }


                    } else {}

                    //update search val
                    $('#search-form input').val(grabAddress);


                    //Update closeIcon
                    //if address is undefined
                    if (!grabAddress) {
                        $('#closeIcon').hide();
                    } else if (grabAddress === '') {
                        $('#closeIcon').hide();
                    } else {
                        $('#closeIcon').show();
                    }

                } else { //parcel / APN / owner / or right-of-way
                    //update search val
                    // $('#search-form input').val('');

                    $('#search-form input').val(mobileParcel);


                    //Update closeIcon
                    //if address is undefined
                    if (!mobileParcel) {
                        $('#closeIcon').hide();
                    } else if (mobileParcel === '') {
                        $('#closeIcon').hide();
                    } else {
                        $('#closeIcon').show();
                    }


                }


            });

        }
        //------------------------------------------------------------------------------
















    //getStreetView -------------------------------------------------------------
    $scope.getStreetView = function(theX, theY) {

        //console.log('GET STREET TEST' + servicePrefix)

            //old
            //$http.jsonp('http://gisgate.co.clark.nv.us/gisdal/gisservice.svc/jsonep/projectPoint?inputWKID=' + 3421 + '&outwkid=' + 4326 + '&Xcoordinate=' + theX + '&Ycoordinate=' + theY + '&callback=JSON_CALLBACK').success(function(data) {
             $http.jsonp(servicePrefix+'gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/projectPoint?inputWKID=' + 3421 + '&outwkid=' + 4326 + '&Xcoordinate=' + theX + '&Ycoordinate=' + theY + '&callback=JSON_CALLBACK').success(function(data) {
              //  $http.jsonp('http://maps.clarkcountynv.gov/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/projectPoint?inputWKID=' + 3421 + '&outwkid=' + 4326 + '&Xcoordinate=' + theX + '&Ycoordinate=' + theY + '&callback=JSON_CALLBACK').success(function(data) {
                
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


                console.log(lat, lon)

                //manual override checker
                if (strViewOverride === true) {

                    wickedLocation = new google.maps.LatLng(lat, lon);
                    sv.getPanorama({ location: wickedLocation, radius: 50 }, processSVData_overrideVr);

                } else {

                    $scope.toggle = true;

                    wickedLocation = new google.maps.LatLng(lat, lon);
                    sv.getPanorama({ location: wickedLocation, radius: 50 }, processSVData);

                }


                //gets run when streetview checkbox is checked (default)
                function processSVData(data, status) {

                    if (status === google.maps.StreetViewStatus.OK) {

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

                        // panorama.setVisible(true);
                        console.log("StreetView: " + status);
                        console.log("StreetView locale: " + wickedLocation);
                        //console.log("SV data: " + data);
                        $("li#streetViewList").removeClass('disable_StreetList');
                        $("li#streetViewList").addClass('enable_StreetList');


                    } else if (status === "ZERO_RESULTS") {

                        //show pano
                        // panorama.setVisible(false);

                        //ng show - truthy
                        $scope.toggle = false;

                        console.log("StreetView: " + status);
                        console.log("StreetView locale: " + wickedLocation);
                        //console.log("SV data: " + data);
                        $("li#streetViewList").removeClass('enable_StreetList');
                        $("li#streetViewList").addClass('disable_StreetList');

                    } else {}

                }



                //gets run when streetview checkbox is unchecked (manual override)
                function processSVData_overrideVr(data, status) {

                    if (status === google.maps.StreetViewStatus.OK) {

                        //set pano
                        panorama.setPano(data.location.pano);

                        //show pano

                        // panorama.setVisible(true);
                        console.log("StreetView: " + status);
                        console.log("StreetView locale: " + wickedLocation);
                        console.log("SV data: " + data);
                        $("li#streetViewList").removeClass('disable_StreetList');
                        $("li#streetViewList").addClass('enable_StreetList');


                    } else if (status === "ZERO_RESULTS") {

                        console.log("StreetView: " + status);
                        console.log("StreetView locale: " + wickedLocation);
                        console.log("SV data: " + data);
                        $("li#streetViewList").removeClass('enable_StreetList');
                        $("li#streetViewList").addClass('disable_StreetList');

                    } else {}

                }


            });


        }
        //------------------------------------------------------------------------------



    //getOwnershipHistory -------------------------------------------------------------
    $scope.getOwnershipHistory = function(attr) {

            // getOwnershipHistory: http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getOwnershipHistory

            // parcel
            //   13933710002

            //JSONP calls

            //$getOwnershipHistory 
             $http.jsonp(servicePrefix+'gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getOwnershipHistory?parcel=' + attr + '&callback=JSON_CALLBACK').success(function(data, attr) {
              //  $http.jsonp('http://maps.clarkcountynv.gov/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/getOwnershipHistory?parcel=' + attr + '&callback=JSON_CALLBACK').success(function(data, attr) {


                //Set Object
                $scope.ownershipHist = data;

            });
        }
        //------------------------------------------------------------------------------



    //Construct Print Friendly Link ----------------------------------------------------
    $scope.constructPrintFriendly = function(resolvedURL) {

        // <p><b>Commissioner: </b> &nbsp; {{elecOfficial.CountyCommissioner}}</p>  
        // <p><b>City Ward: </b> &nbsp; {{elecOfficial.CityWard}}</p>  
        // <p><b>U.S. Senate: </b> &nbsp; {{elecOfficial.Senate}}</p>  
        // <p><b>U.S. Congress: </b> &nbsp; {{elecOfficial.Congress}}</p>  
        // <p><b>State Senate: </b> &nbsp; {{elecOfficial.StateSenate}}</p>  
        // <p><b>State Assembly: </b> &nbsp; {{elecOfficial.StateAssembly}}</p>  
        // <p><b>School District: </b> &nbsp; {{elecOfficial.SchoolBoard}}</p>  
        // <p><b>University Regent: </b> &nbsp; {{elecOfficial.UniversityRegent}}</p>  
        // <p><b>Board of Education: </b> &nbsp; {{elecOfficial.BoardOfEducation}}</p> 


      // //PrintLink parms
      // var basePrintLink = 'http://gisgate.co.clark.nv.us/gismo/apps/mobile/ow4/app/print/form.html?@'; //base location
      var basePrintLink = 'http://maps.clarkcountynv.gov/gismo/apps/openweb_js/app/print/form.html?@'; //base location
      var mapPrintLink = 'map='+resolvedURL; //base map
      var parcelPrintLink = '&parcel='+$scope.attr.parcel; //parcel
      var onamePrintLink = '&Oname='+$scope.data.OwnerName; //owner name
      var saddressPrintLink = '&SAddress='+$scope.data.SiteAddress; //site address
      var jurisPrintLink = '&Juris='+$scope.zoning.jurisdiction+' - '+$scope.data.ZipCode; //jurisdiction
      //var zipPrintLink = '&Zip='+$scope.data.ZipCode; //zipcode
      var subdnamePrintLink = '&SubdName='+$scope.data.SubName; //subdivision name
      var lotblockPrintLink = '&LotBlock='+$scope.data.LotBlock; //lot block
      var conyearPrintLink = '&ConYear='+$scope.data.ConsructionYear; //construction year
      var saledatePrintLink = '&SaleDate='+$scope.data.SaleDate; //sale date
      var salepricePrintLink = '&SalePrice='+$scope.data.SalePrice; //sale price
      var trsPrintLink = '&trs='+$scope.data.TownshipRangeSection; //township, range, section
      var censustractPrintLink = '&CensusTract='+'Not_Available'; //Not Available //census tract ---
      var recdocnumPrintLink = '&RecordedDocNum='+$scope.data.DocNumber; //recorded doc number
      var estlotsizePrintLink = '&EstLotSize='+$scope.data.CalcAcres; //calculated acres
      var flightdatePrintLink = '&FlightDate='+$scope.aerialDate; //aerial date
      var zonePrintLink = '&Zone='+$scope.zoning.zoneDescription; //zoning description
      var commdistPrintLink = '&CommDist='+'Not_Available'; //Not Available //community district ---
      var ussenatePrintLink = '&USSenate='+$scope.elecOfficial.Senate; //senate
      var uscongressPrintLink = '&USCongress='+$scope.elecOfficial.Congress; //congress
      var statesenatePrintLink = '&StateSenate='+$scope.elecOfficial.StateSenate;  //state senate
      var stateassemblyPrintLink = '&StateAssembly='+$scope.elecOfficial.StateAssembly; //state assembly
      var schooldistPrintLink = '&SchoolDisttrict='+$scope.elecOfficial.SchoolBoard;  //school board
      var universityregentPrintLink = '&UniversityRegent='+$scope.elecOfficial.UniversityRegent; //university regent
      var boardeducationPrintLink = '&BoardEducation='+$scope.elecOfficial.BoardOfEducation; //board of education
      var mcdPrintLink = '&MCD='+'Not_Available'; //Not Available //minor civil division ---
      var cwardPrintLink = '&CWard='+'Not_Available'; //Not Available //city ward ---

      //constructed print view link
      $scope.printViewLink = 
            basePrintLink.trim()+
            mapPrintLink.trim()+
            parcelPrintLink.trim()+
            onamePrintLink.trim()+
            saddressPrintLink.trim()+
            jurisPrintLink.trim()+
            subdnamePrintLink.trim()+
            lotblockPrintLink.trim()+
            conyearPrintLink.trim()+
            saledatePrintLink.trim()+
            salepricePrintLink.trim()+
            trsPrintLink.trim()+
            censustractPrintLink.trim()+
            recdocnumPrintLink.trim()+
            estlotsizePrintLink.trim()+
            flightdatePrintLink.trim()+
            zonePrintLink.trim()+
            commdistPrintLink.trim()+
            ussenatePrintLink.trim()+
            uscongressPrintLink.trim()+
            statesenatePrintLink.trim()+
            stateassemblyPrintLink.trim()+
            schooldistPrintLink.trim()+
            universityregentPrintLink.trim()+
            boardeducationPrintLink.trim()+
            mcdPrintLink.trim();

        $("#printFriendlyLink").attr("href", $scope.printViewLink);

        console.log("C [[ resolved print map URL: " + resolvedURL + " ]]");

        console.log("C [[ resolved print final URL: " + $scope.printViewLink + " ]]");
        
    }
    //------------------------------------------------------------------------------




    // //THE MAIN SEARCH FUNCTION
    // scope.assistSearchandFilter = function(theSearch) {

    //   console.log(theSearch)

    //     // // console.log('testing')

    //     // console.log("C [[ searching: " + theSearch + " ]]");

    //     // $scope.executeSearch(theSearch);

    //     // //pass to ai.js as well
    //     // ai(theSearch);


    //     filterHelp_UL();
    // };


    //hideShowBarToggle ----------------------------------------------------
    $scope.toggleHiddenState = function(hidden) {

        // console.log()


        



        if (hiddenState === true) { //its already hidden, clicked during show state

            $('.hideShowBar').removeClass('hideShowBarCollapsed');
            $('.hideShowBlurb').removeClass('hideShowBlurbCollapsed');

            $('.hideShowBlurb').empty().append('<i class="ion-chevron-up" style="margin-left:20px;">&nbsp;&nbsp;</i> &nbsp; Hide');

            $('.omnibarcontainer').removeClass('omnibarcontainerCollapsed');

            console.log('EXPAND OUT')


            //make sure to switch over the 'hiddenState' to false, now that it has been clicked
            hiddenState = false;

        }
        else { //its not yet hidden, hide elements and roll up

            $('.hideShowBar').addClass('hideShowBarCollapsed');
            $('.hideShowBlurb').addClass('hideShowBlurbCollapsed');

            $('.hideShowBlurb').empty().append('<i class="ion-chevron-down" style="margin-left:20px;">&nbsp;&nbsp;</i> &nbsp; See Property Information');

            $('.omnibarcontainer').addClass('omnibarcontainerCollapsed');



            // $('.hideShowBlurb').empty().append('newcontent');




            //make sure to switch over the 'hiddenState' to true, now that it has been clicked
            hiddenState = true;



            console.log('HIDE IN ' +hiddenState)


            // $('#hideShowBar').toggleClass('hideShowBarDefault hideShowBarCollapsed');

            // $('.omnibarcontainer').toggleClass('defaultState omniBarCollapsed');
            

        }


        // theHideShowBarState = !theHideShowBarState

        // console.log(theHideShowBarState)

        // // $scope.theHideShowBarState = theHideShowBarState;


        // // console.log('THIS IS THE VALUE: ' +theHideShowBarState);

        // //
        // if (theHideShowBarState === false) {
        //     console.log('its false')
        //     // console.log('THIS IS THE VALUE: ' +theHideShowBarState);
        // }
        // else {
        //     console.log('its true')

        // }





        
    }
    //------------------------------------------------------------------------------






    //Handles the skinny Panel's list item population, as well as toggeled active/inactive css states to apply styles
    // .active-selection {
    //   background-color: #eee;
    // }
    $scope.skinnyDisplayOptions = [{
      id: "1",
      name: "Right-of-Way",
      // icon: "ion-arrow-swap",
      icon: "ion-android-car",
      active: false
    }, {
      id: "2",
      name: "Tools",
      // icon: "ion-wrench",
      icon: "ion-settings",
      active: false
    }, {
      id: "3",
      name: "Valuation",
      // icon: "ion-arrow-graph-up-right",
      icon: "ion-pricetag",
      active: false
      // ion-pricetag
    }, {
      id: "4",
      name: "Legend",
      icon: "ion-android-list",
      active: false
    }, {
      id: "5",
      name: "Weather",
      icon: "ion-android-cloud-outline",
      active: false
    }, {
      id: "6",
      name: "Share or embed",
      icon: "ion-link",
      active: false
    }, {
      id: "7",
      name: "Print",
      icon: "ion-printer",
      active: false
    }



    ];

    // $scope.isActive = false;

    $scope.selectDisplayItem = function(id,name,active) {
      $scope.activeClass = id;
      $scope.activeName = name;
      // $scope.activeActive = active;
      console.log(id);


      //toggles the active model/scoped class = bound to the element's window
      // $scope.theLegend = !$scope.theLegend;

      // $scope.isActive = active;
      // $scope.isActive = !$scope.isActive;


// ng-model="skinnyDisplayOptions.isChecked"

      // console.log(active)

      //http://jsfiddle.net/thr3ee/83cvu/



        // $scope.isActive = false;
        // $scope.activeButton = function() {
        //   $scope.isActive = !$scope.isActive;
        // }  
        // https://codepen.io/hbuchel/pen/xtbzc


          // $scope.isActive = false;
          // $scope.activeButton = function() {
          //   $scope.isActive = !$scope.isActive;
          // }  


        if ($scope.activeName === "Tools") {

            $scope.theTools = true;
            $scope.theLegend = false;
            $scope.theWeather = false;
            $scope.theValuation = false;

        }
        else if ($scope.activeName === "Valuation") {

            $scope.theTools = false;
            $scope.theLegend = false;
            $scope.theWeather = false;
            $scope.theValuation = true;

        }
        else if ($scope.activeName === "Legend") {

            $scope.theTools = false;
            $scope.theLegend = true;
            $scope.theWeather = false;
            $scope.theValuation = false;


        }
        else if ($scope.activeName === "Weather") {

            $scope.theTools = false;
            $scope.theLegend = false;
            $scope.theWeather = true;
            $scope.theValuation = false;

        }
        else { }


        //added--------------------------
        panelCloseHit = false;

        console.log('skinny panel going back')

        $('.inactiveOverlay').removeClass('inactiveOverlayVisible');

        $(".skinnyPanel").animate({
           "marginLeft": "-=240px"
           // "marginLeft": "+=0px"
        }, 0);
        skinnyPanelOpen = false;
        console.log('skinnyPanelOpen ' + skinnyPanelOpen)




        // https://stackoverflow.com/questions/16863800/javascript-regex-to-extract-the-string-before-the-last-backslash
        // text = stringVariable.substring(0, stringVariable.lastIndexOf('/'));



        // /^(.*[\\\/])/
        // Explanation:

        // ^      Start of line/string
        // (      Start capturing group
        // .*     Match any character greedily
        // [\\\/] Match a backslash or a forward slash
        // )      End the capturing group  


        // sub(".*/", "", x)

        // https://stackoverflow.com/questions/3981880/regex-for-everything-before-last-forward-or-backward-slash

        // https://stackoverflow.com/questions/36683359/remove-everything-in-string-up-to-last-forward-slash/36683386






        console.log('you clicked for ' + $scope.activeName)

    };
    //------------------------------------------------------------------------------

















}]); // end - mapController










//************************************************
//************ accordionCtrl *********************
//************************************************

//accordionCtrl Module --------------------------------------------------------------------------------------
open.controller('accordionCtrl', ['$scope', '$http', 'openFactory', function($scope, $http, openFactory) {
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

}]); // end - accordionCtrl






//************************************************
//************ Custom Filters ********************
//************************************************

//trustAsResourceUrl Module --------------------------------------------------------------------------------------
open.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])

