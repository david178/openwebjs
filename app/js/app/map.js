//************************************************
//******************* MAP ************************
//************************************************

//Declarations ************************************
var map, toolbar, symbol, initialExtent, newExtent, testingExtent, testingExtent2;
//toolbar, symbol both added for tools
//var extentInMem; //gets set & checked to determin if there is a map extent saved in
//localStorage - used in controllers.js when deciding whether or not to set map
//based on saved localstorage extent (has correct )
var scalebar;
//mobile & desktop typeahead limited results (sized())
var isMobile;
//Metrics
var sessionNumber;
var productCode = 'OW4';
//Map Click State Manager (default)
var functionMode = 'identify';
//flags
// var skinnyPanelOpen; // flag set if skinnyPanel (formerly slidePanelOpen) is open or closed
var skinnyPanelOpen = false; // flag set if skinnyPanel (formerly slidePanelOpen) is open or closed
var disclaimerFlag; //localStorage 
//basemap / layer defaults 
var basemap, abLayer, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer;
var bcLayer, PLULayer, CCZoningLayer, C50Layer, C2003Layer, C1996Layer,
    hendersonZoningLayer, lasVegasZoningLayer, mesquiteZoningLayer,
    nlvZoningLayer, seismicLayer, SoilLayer, rightofwayLayer;
//flag for slide panel btn collapse
var panelCloseHit = false;
//Gets called onLoad, will tell you IE browser vr #, if not IE then returns 'other'
var ieBrowser;

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Autocomplete & Search Specific >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//used as a flag for checking if the autocomplete is showing 
//(for propdata elem dynamic vis & positioning)
var autocompleteIsShowing = false;
//After search has been successfully completed, flag to true
//(enables propdata elem to be shown (else remains hidden))
var searchHasCompleted = false;
var autocompleteDirty = false; //(tracks if the autocomplete has shown before)
//bool - keeps track of & handles if user left clicks or changes map extent / 
//pans && adjusts the prop info window as necessary (layout.js, map.js)
var propInfo_searchInputClick = false;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var dropHeight;
// var suggestionsObj = [];

//user over-ride to hide streetview widget
//future: pass CB state onclick event
var strViewOverride = false;
//Dynamic SelectProp Accordion data call flags
var zoningPLUFlag = false;
var legalDescrFlag = false;
var ownershipFlag = false;
var floodZoneFlag = false;
var elecOfficialsFlag = false;
var linksFlag = false;

var appended = false;
//Google streetview
var sv, panorama, myHome, wickedLocation, theLocal;

var isMax = 0;

// //PropSelect used in controllers.js executeQueryTask method for limiting new searches -
// // if they need a select property info info or just a pan to location
// var propselect = true; 

//universal coordinate system (used for query string persistence, 
//& mouse move & extenet change coor updates)
var coordSystem; //state-plane-ft || lat-long

var bufferFill; //bool: tracks graphics buffer fill

var geometry;
//tracks how many times a buffer has been manually added using create btn
var bufferCreateCount = 0;
var bufferParms; //stores the buffer parameters for creating a buffer
var bufferCumulativeVal = 0;

var freshView = "";

//This is for the 'hide/show' for hiding/rolling up and down the ombibar elements (different than hamburger btn)
//Scoped logic resides in controllers.js
var hiddenState = false;


//----------------------------
//SERVICES AND SERVER CONFIG
var servicePrefix = 'http://maps.clarkcountynv.gov/'; //used by both Flights & Layers
//http://gisgate.co.clark.nv.us/

//Flights / CACHES
var serviceSuffix_F = 'arcgis_images/rest/services/';
var serviceType_F = 'CACHED'; //E.g. CACHED / Elevations / Utilities

//Layers / GISMO 
// https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO
var serviceSuffix_L = 'arcgis/rest/services/';
var serviceType_L = 'GISMO';
//---------------------------




require([

        //dojo includes
        "dojo/dom",
        "dojo/_base/array",
        "dojo/dom-attr",
        "dojo/number",

        //esri includes
        "esri/map",

        "esri/dijit/Measurement", //added for return measure
        "esri/geometry/Polyline",
        "esri/units",

        "esri/geometry/Point",

        "esri/geometry/webMercatorUtils",
        "esri/tasks/ProjectParameters",
        "esri/geometry/Geometry",
        "esri/geometry/Extent",
        "esri/SpatialReference",

        "esri/geometry/normalizeUtils", //added for buffer
        "esri/tasks/GeometryService",
        "esri/tasks/BufferParameters", //added for buffer

        "esri/graphic", //added for tools
        "esri/toolbars/draw", //added for tools
        "esri/symbols/SimpleMarkerSymbol", //added for tools
        "esri/symbols/SimpleLineSymbol", //added for tools
        "esri/symbols/SimpleFillSymbol", //added for tools
        "esri/symbols/Font",
        "esri/symbols/TextSymbol", //added for annotation tools
        "esri/Color",

        "esri/dijit/Print", //added for print
        "esri/tasks/PrintTask", //added for print
        "esri/tasks/PrintTemplate", //added for print

        "esri/dijit/Scalebar",
        "application/bootstrapmap",
        "esri/dijit/LocateButton", //added

        "esri/layers/ArcGISImageServiceLayer", //ADDED: for ImageService Layer basemap

        "esri/layers/FeatureLayer", //added for legend
        "esri/dijit/Legend", //added for legend
        "dojo/_base/array", //added for legend



        "dijit/registry", //added for 'registry.byId' event listening functionality for colors

        "dojo/parser", //added for legend
        "dojo/domReady!"
    ],

    function(dom, array, domAttr, number, Map, Measurement, Polyline, Units, Point, webMercatorUtils, ProjectParameters, geometry, Extent, SpatialReference, normalizeUtils, GeometryService, BufferParameters, Graphic, Draw, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Font, TextSymbol, Color, Print, PrintTask, PrintTemplate, Scalebar, BootstrapMap, LocateButton, ArcGISImageServiceLayer, FeatureLayer, Legend, arrayUtils, registry, parser) { //ADDED LEGEND FeatureLayer, Legend, arrayUtils, parser

        parser.parse(); //ADDED LEGEND

        //Starting Extent
        // initExtentSet();

        // if(localStorage.disclaim === "nodisclaim") {
        //     return;
        // } else { $("#disclaimerDialog").dialog("open"); }


        //  //Proxy location
        // esri.config.defaults.io.proxyUrl = "http://gisgate.co.clark.nv.us/gismo/apps/mobile/ow4/app/js/app/proxy/proxy.ashx";
        //Proxy location
        esri.config.defaults.io.proxyUrl = "/proxy/proxy.ashx";

        //Default geometry service (to be used by LocateButton to project geometry)
        // esriConfig.defaults.geometryService = new GeometryService("http://yourdomain.com/geometryService");  


         // esriConfig.defaults.geometryService = new GeometryService("http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/Geometry/GeometryServer/");
         esriConfig.defaults.geometryService = new GeometryService(servicePrefix+"arcgis/rest/services/Utilities/Geometry/GeometryServer/");


        //no extent in memory
        // if(localStorage.Xmin === undefined) {

        //     // alert(JSON.stringify(localStorage.theextent.xmin));

        //     console.log('M [[ fresh extent loaded ]]');
        //    // return;

        //   //  dojo.byId("info").innerHTML = "undefined";


        //   initialExtent = new esri.geometry.Extent({
        //       "xmin" : 779321,
        //       "ymin" : 26759729,
        //       "xmax" : 786446,
        //       "ymax" : 26764499,
        //       "spatialReference" : {
        //           "wkid" : 102707
        //       }
        //   });

        // } else {  //load previous extent

        //     console.log('M [[ prev extent loaded ]]');

        //     //an extent was saved in memory, construct a new extent based on localStorage extent object
        //     // alert(JSON.stringify(localStorage.theextent.xmin));
        //     // localStorage.setItem("theextentXmin", JSON.stringify(newExtent.xmin));
        //     // localStorage.setItem("theextentYmin", JSON.stringify(newExtent.ymin));
        //     // localStorage.setItem("theextentXmax", JSON.stringify(newExtent.xmax));
        //     // localStorage.setItem("theextentYmax", JSON.stringify(newExtent.ymax));

        //     // var spatialRef = new esri.SpatialReference({wkid:102707});
        //     //   initialExtent = new esri.geometry.Extent();
        //     //   initialExtent.xmin = localStorage.theextentXmin;
        //     //   initialExtent.ymin = localStorage.theextentYmin;
        //     //   initialExtent.xmax = localStorage.theextentXmax;
        //     //   initialExtent.ymax = localStorage.theextentYmax;
        //     //   initialExtent.spatialReference = spatialRef;

        //     var thexmin = parseInt(localStorage.Xmin);
        //     var theymin = parseInt(localStorage.Ymin);
        //     var thexmax = parseInt(localStorage.Xmax);
        //     var theymax = parseInt(localStorage.Ymax);


        //     initialExtent = new esri.geometry.Extent({
        //         "xmin" : thexmin,
        //         "ymin" : theymin,
        //         "xmax" : thexmax,
        //         "ymax" : theymax,
        //         "spatialReference" : {
        //             "wkid" : 102707
        //         }
        //     });

        // }

        //if using @ params for saving extent
        initialExtent = new esri.geometry.Extent({
            "xmin": 779321,
            "ymin": 26759729,
            "xmax": 786446,
            "ymax": 26764499,
            "spatialReference": {
               // "wkid": 3421
                 "wkid": 102707
                
            }
        });

        // initialExtent = new esri.geometry.Extent({
        //     "xmin" : 779321,
        //     "ymin" : 26759729,
        //     "xmax" : 786446,
        //     "ymax" : 26764499,
        //     "spatialReference" : {
        //         "wkid" : 102707
        //     }
        // });

        //Map Constructor
        map = BootstrapMap.create("mapDiv", {
            //  extent : initialExtent,
            logo: false,
            scrollWheelZoom: true,
            // sliderPosition: "top-right"//,
            sliderPosition: "bottom-right" //,
                // sliderOrientation: "horizontal",
                // sliderStyle: "large"
        });

        //Map Scalebar
        scalebar = new Scalebar({
                map: map,
                attachTo: "bottom-left",
                scalebarUnit: "dual"
        });

        //Map Init Tools, Disable arrow panning
        map.on("load", function() {
            console.log("M [[ map loaded ]]"); 
            map.disableKeyboardNavigation();
            //call to create tools toolbar
            initToolbar();

        });






        //TOOLS ---------------------------------------
        // // markerSymbol is used for point and multipoint, see http://raphaeljs.com/icons/#talkq for more examples
        // var markerSymbol = new SimpleMarkerSymbol();
        // markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
        // markerSymbol.setColor(new Color("#00FFFF"));

        // // lineSymbol used for freehand polyline, polyline and line. 
        // var lineSymbol = new CartographicLineSymbol(
        //   CartographicLineSymbol.STYLE_SOLID,
        //   new Color([255,0,0]), 10, 
        //   CartographicLineSymbol.CAP_ROUND,
        //   CartographicLineSymbol.JOIN_MITER, 5
        // );

        // // fill symbol used for extent, polygon and freehand polygon, use a picture fill symbol
        // // the images folder contains additional fill images, other options: sand.png, swamp.png or stiple.png
        // var fillSymbol = new PictureFillSymbol(
        //   "images/mangrove.png",
        //   new SimpleLineSymbol(
        //     SimpleLineSymbol.STYLE_SOLID,
        //     new Color('#000'), 
        //     1
        //   ), 
        //   42, 
        //   42
        // );

        // //add measure
        // var measurement = new Measurement({
        //   map: map,
        //   defaultAreaUnit: Units.SQUARE_MILES,
        //   defaultLengthUnit: Units.KILOMETERS
        // }, dom.byId('themeasuretest'));





        //Activate Measurement
        var measurement = new Measurement({
          // geometry: evt.geometry,
          map: map
        }, dom.byId("themeasuretest"));
        measurement.startup();


        //Init Draw toolbar, OnDrawEnd
        function initToolbar(themap) {
            toolbar = new Draw(map);
            toolbar.on("draw-end", addToMap);
        }

        //Geometry Options ------------------
        // MULTI_POINT
        // POLYLINE
        // POLYGON
        // FREEHAND_POLYLINE
        // FREEHAND_POLYGON
        // ARROW
        // TRIANGLE
        // CIRCLE
        // ELLIPSE

        //Add Geometry, Points to map
        function addToMap(evt) {
            var symbol;
            toolbar.deactivate();
            geometry = evt.geometry;//, symbol;

            // map.showZoomSlider();
            switch (geometry.type) {

                // // figure out which symbol to use
                // // var symbol;
                // if ( evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
                //   symbol = markerSymbol;
                // } else if ( evt.geometry.type === "line" || evt.geometry.type === "polyline") {
                //   symbol = lineSymbol;
                // }
                // else {
                //   symbol = fillSymbol;
                // }

                case "point":
                    // symbol = new SimpleMarkerSymbol(new Color([221,239,167])); //new Color([255,0,0])
                    symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,0,0]), 1), new Color([0,255,0,0.25]));
                    break;
                case "multipoint":
                    symbol = new SimpleMarkerSymbol();
                    break;

                case "line":
                    symbol = new SimpleLineSymbol();
                    break;
                case "polyline":
                    symbol = new SimpleLineSymbol();
                    break;

                case "FREEHAND_POLYGON":
                    symbol = new SimpleFillSymbol();
                    break;
                case "ARROW":
                    symbol = new SimpleFillSymbol();
                    break;
                case "TRIANGLE":
                    symbol = new SimpleFillSymbol();
                    break;
                case "CIRCLE":
                    symbol = new SimpleFillSymbol();
                    break;
                case "ELLIPSE":
                    symbol = new SimpleFillSymbol();
                    break;

                // case "point":
                // case "multipoint":
                //     symbol = new SimpleMarkerSymbol();
                //     break;
                // case "polyline":
                //     symbol = new SimpleLineSymbol();
                //     break;
                default:
                    symbol = new SimpleFillSymbol();
                    break;
            }
            var graphic = new Graphic(geometry, symbol);
            // map.graphics.add(graphic);
            graphic.id = "highlight";

            console.log(graphic.id);


            // //ADDED -------------------------
            // //Craft the symbol
            // // add the drawn graphic to the map
            // var symbol = new SimpleFillSymbol(
            //   SimpleFillSymbol.STYLE_SOLID,
            //   new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0]), 2),
            //   // new Color([0, 0, 255, 0.5]));
            //   new Color([249, 198, 103, 0.5]));
            // //---------------------------------

            // var graphic = new Graphic(evt.geometry, symbol);
           // map.graphics.add(graphic);
            addTheGraphics(graphic,geometry);
            // addTheGraphics(graphic, symbol);




            //return measurement for the graphic

            // // var measurement = new Measurement({
            // //   geometry: customPolyline,
            // //   map: map
            // // }, dom.byId("measurement"));
            // // measurement.startup();

            // var measurement = new Measurement({
            //   geometry: evt.geometry,
            //   map: map
            // }, dom.byId("measurement"));
            // measurement.startup();

            // // evt.geometry.type

            // var customPolyline = new Polyline({"wkid":102707});
            // customPolyline.addPath([
            //   new Point(-13262764.15,2864328.22), 
            //   new Point(-6237895.50, 5290745.25), 
            //   new Point(-3283145.74, -618754.28)
            // ]);

            // var measurement = new Measurement({
            //   geometry: customPolyline,
            //   map: map
            // }, dom.byId("themeasuretest"));
            // measurement.startup();

            // if (measurement)
            // {
            //     measurement.clearResult();
            // }

            // else {

            //     var measurement = new Measurement({
            //       geometry: evt.geometry,
            //       map: map
            //     }, dom.byId("themeasuretest"));
            //     measurement.startup();

            // }
            
            // var customPolyline = new Polyline({"wkid":102707});
            // customPolyline.addPath([
            //   new Point(-13262764.15,2864328.22), 
            //   new Point(-6237895.50, 5290745.25), 
            //   new Point(-3283145.74, -618754.28)
            // ]);


            //return measurements per current geometry
            measurement.measure(geometry);

        }

        //Add Graphics
        function addTheGraphics(graphic,geometry) {
       // function addTheGraphics(graphic, symbol) {

            //https://developers.arcgis.com/javascript/3/sandbox/sandbox.html?sample=util_label_point
            //https://developers.arcgis.com/javascript/3/sandbox/sandbox.html?sample=toolbar_edit
            //https://developers.arcgis.com/javascript/3/jssamples/util_label_point.html
            //https://developers.arcgis.com/javascript/3/jssamples/search_without_ui.html

            // //add pre-defined geometries to map
            // var polygonSymbol = new SimpleFillSymbol();
            // var polylineSymbol = new SimpleLineSymbol();
            // var text = new TextSymbol("Editable Text");
            // text.font.setSize("20pt");

            // var text = new TextSymbol("Editable Text");
            // text.font.setSize("20pt");

            // if (showMeasure)

            //     // var graphic = new Graphic(evt.geometry, symbol);
            //     map.graphics.add(graphic);

            // else {

            //     // var graphic = new Graphic(evt.geometry, symbol);
            //     map.graphics.add(graphic, text);

            // }

            //Add graphics to map
            // map.graphics.add(graphic, symbol)
            map.graphics.add(graphic)


            //------------------------------------------------------------------------
            //Check if bufferFill true, then add a buffer to graphics

            if (bufferFill === true) { //set buffer fill

                createBuffer(geometry,false);

            }
            else { //no buffer

            // console.log('false')

            }

            //------------------------------------------------------------------------

        }

        // registry.byId("clear").on("click", function() {
        //   map.graphics.clear();
        // });


        //Erase Graphics
        $('#eraseBtn').click(function() {
            // console.log('ihtrs');
            // map.graphics.remove('highlight');
            // map.graphics.clear();
            clearGraphics();
        });
        //Finish Graphics
        $('#finishDrawBtn').click(function() {
            // console.log('ihtrs');
            // map.graphics.remove('highlight');
            // map.graphics.clear();
            functionMode = "identify";
            $("#currentToolTag").text('Select Property');
            toolbar.deactivate();
        });

        //http://gis.stackexchange.com/questions/110060/remove-geometry-from-map-using-arcgis-api-for-javascript
        function clearGraphics() {
            console.log('clear hit')
            //first remove all graphics added directly to map
            map.graphics.clear();

            //now go into each graphic layer and clear it
            var graphicLayerIds = map.graphicsLayerIds;
            var len = graphicLayerIds.length;
            for (var i = 0; i < len; i++) {
                var gLayer = map.getLayer(graphicLayerIds[i]);
                //clear this Layer
                gLayer.clear();
            }
        }


        //Color work ------------------------

        // function updateColor() {
        //     // console.log('clear hit')
        //     // //first remove all graphics added directly to map
        //     // map.graphics.clear();

        //     // //now go into each graphic layer and clear it
        //     // var graphicLayerIds = map.graphicsLayerIds;
        //     // var len = graphicLayerIds.length;
        //     // for (var i = 0; i < len; i++) {
        //     //     var gLayer = map.getLayer(graphicLayerIds[i]);
        //     //     //clear this Layer
        //     //     gLayer.clear();
        //     // }
        // }


        //Buffer work ------------------------

        //view-source:https://developers.arcgis.com/javascript/3/samples/util_buffergraphic/

        //listen to create & clear btn functions
        //grab input parms for ft/miles


        //if/else to listen to buffer fill bool val for buffer fill

        // bufferCreateBtn
        // https://developers.arcgis.com/javascript/3/samples/util_buffergraphic/




        //Create Buffer
        $('#bufferCreateBtn').click(function() {
            // console.log('ihtrs');
            // map.graphics.remove('highlight');
            // map.graphics.clear();

            //keep track of how many times a buffer has been manually created
            bufferCreateCount = bufferCreateCount + 1;


            createBuffer(geometry,bufferCreateCount);

           // console.log('buffer init')
        });


        //Buffer Fill (trigger on toggle of buffer fill checkbox)

        // function isSelectedAll(theBufferFill) {

        //     console.log('buffer hit')

        // }



        // //--------------------------------------------------------------------------------------
        // //Buffer add flag set (gets set from chk box click)
        // //bufferFill var will then also get checked on new graphics add to map for additional buffer adds
        // //on tb draw end
        // $('#bufferFillBox').click(function() {

        //     if (bufferFill === true) { //set buffer fill

        //         createBuffer(geometry);

        //     }
        //     else { //no buffer

        //     console.log('false')

        //     }

        // });

        // //--------------------------------------------------------------------------------------






        // function showBufferFill() {

        //     console.log('show buffer fill')

        // }



        //Add a buffer to graphics (gets called after tb end, and also on bufferFill chkbox toggle)
        function createBuffer(geometry,bufferCreateCount) {
            //view-source:https://developers.arcgis.com/javascript/3/samples/util_buffergraphic/

            // console.log('create a buffer!')

            //newVal = parseInt(dom.byId("bufferDistanceInputBox").value);

            console.log(bufferCreateCount)

            //if a previously exisiting buffer & params have been set (dirty state)
            if (bufferCreateCount > 1) 
            {

                // if (bufferCreateCount = 2)
                // {
                //     newVal =  newVal * bufferCreateCount + parseInt(dom.byId("bufferDistanceInputBox").value);
                // }
                // else {
                //     newVal =  newVal + parseInt(dom.byId("bufferDistanceInputBox").value);
                // }

                bufferCumulativeVal =  bufferCumulativeVal + parseInt(dom.byId("bufferDistanceInputBox").value);

               // console.log(parseInt(dom.byId("bufferDistanceInputBox").value))
               // console.log(newVal)

                bufferParms.distances = [ bufferCumulativeVal ];

                console.log('dirty state!')

            }
            else {

                //setup the buffer parameters
                bufferParms = new BufferParameters();
                //bufferParms.distances = [ dom.byId("bufferDistanceInputBox").value ];

                bufferCumulativeVal =  bufferCumulativeVal + parseInt(dom.byId("bufferDistanceInputBox").value);

                bufferParms.distances = [ bufferCumulativeVal ];

            }


            // //if a previously exisiting buffer & params have been set (dirty state)
            // if (addToLastGph === true && params) 
            // {
            //     //add additional buffer overlay to perimeter
            //     params.distances = [ dom.byId("bufferDistanceInputBox").value * 2 ];

            //     console.log('extending buffer area')
            // }

            // else {
            //     //setup the buffer parameters
            //     var params = new BufferParameters();
            //     params.distances = [ dom.byId("bufferDistanceInputBox").value ];
            // }

            bufferParms.outSpatialReference = map.spatialReference;
            // params.unit = GeometryService[dom.byId("bufferUnitsSelectBox").value];
            bufferParms.unit = GeometryService[dom.byId("bufferUnitsSelectBox").value];
            //normalize the geometry 

            normalizeUtils.normalizeCentralMeridian([geometry]).then(function(normalizedGeometries){
              var normalizedGeometry = normalizedGeometries[0];
              if (normalizedGeometry.type === "polygon") {
                //if geometry is a polygon then simplify polygon.  This will make the user drawn polygon topologically correct.
                esriConfig.defaults.geometryService.simplify([normalizedGeometry], function(geometries) {
                  bufferParms.geometries = geometries;
                  esriConfig.defaults.geometryService.buffer(bufferParms, showBuffer);
                });
              } else {
                bufferParms.geometries = [normalizedGeometry];
                esriConfig.defaults.geometryService.buffer(bufferParms, showBuffer);
              }

            });





            // //setup the buffer parameters
            // var params = new BufferParameters();
            // // params.distances = [ dom.byId("distance").value ];
            // params.distances = [ 25 ];
            // params.outSpatialReference = map.spatialReference;
            // // params.unit = GeometryService[dom.byId("unit").value];
            // params.unit = GeometryService['Miles'];
            // //normalize the geometry 

            // normalizeUtils.normalizeCentralMeridian([geometry]).then(function(normalizedGeometries){
            //   var normalizedGeometry = normalizedGeometries[0];
            //   if (normalizedGeometry.type === "polygon") {
            //     //if geometry is a polygon then simplify polygon.  This will make the user drawn polygon topologically correct.
            //     esriConfig.defaults.geometryService.simplify([normalizedGeometry], function(geometries) {
            //       params.geometries = geometries;
            //       esriConfig.defaults.geometryService.buffer(params, showBuffer);
            //     });
            //   } else {
            //     params.geometries = [normalizedGeometry];
            //     esriConfig.defaults.geometryService.buffer(params, showBuffer);
            //   }

            // });





            // console.log('clear hit')
            // //first remove all graphics added directly to map
            // map.graphics.clear();

            // //now go into each graphic layer and clear it
            // var graphicLayerIds = map.graphicsLayerIds;
            // var len = graphicLayerIds.length;
            // for (var i = 0; i < len; i++) {
            //     var gLayer = map.getLayer(graphicLayerIds[i]);
            //     //clear this Layer
            //     gLayer.clear();
            // }
        }
        function showBuffer(bufferedGeometries) {
          var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,0,0,0.65]), 2), new Color([255,0,0,0.35]));

          // // symbol = new SimpleMarkerSymbol(new Color([221,239,167])); //new Color([255,0,0])
          // symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,0,0]), 1), new Color([0,255,0,0.25]));
          // break;
          // symbol = new SimpleFillSymbol();

          array.forEach(bufferedGeometries, function(geometry) {
            var graphic = new Graphic(geometry, symbol);
            map.graphics.add(graphic);
          });

      }



        //Clear Buffer
        $('#bufferClearBtn').click(function() {
            //clear map graphx
            map.graphics.clear();
            //reset cumualtive buffers to zero
            bufferCumulativeVal = 0;
        });


        // function clearBuffer() {
        //     map.graphics.clear();
        //     // console.log('clear hit')
        //     // //first remove all graphics added directly to map
        //     // map.graphics.clear();

        //     // //now go into each graphic layer and clear it
        //     // var graphicLayerIds = map.graphicsLayerIds;
        //     // var len = graphicLayerIds.length;
        //     // for (var i = 0; i < len; i++) {
        //     //     var gLayer = map.getLayer(graphicLayerIds[i]);
        //     //     //clear this Layer
        //     //     gLayer.clear();
        //     // }
        // }

        //-------------------------------------------------









        // function addTheGraphics (graphic) {
        //   // var graphic = new Graphic(evt.geometry, symbol);
        //   map.graphics.add(graphic);
        // }
        // //Erase Graphics
        // $('#eraseBtn').click(function() {
        //    // console.log('ihtrs');
        //    // map.graphics.remove('highlight');
        //    // map.graphics.clear();
        //    clearGraphics();
        // });
        // //Finish Graphics
        // $('#finishDrawBtn').click(function() {
        //    // console.log('ihtrs');
        //    // map.graphics.remove('highlight');
        //    // map.graphics.clear();
        //    functionMode = "identify";
        //    $("#currentToolTag").text('Select Property');
        //    toolbar.deactivate();
        // });

        // //http://gis.stackexchange.com/questions/110060/remove-geometry-from-map-using-arcgis-api-for-javascript
        // function clearGraphics() {
        //     //first remove all graphics added directly to map
        //     map.graphics.clear();

        //     //now go into each graphic layer and clear it
        //     var graphicLayerIds = map.graphicsLayerIds;
        //     var len = graphicLayerIds.length;
        //     for (var i = 0; i < len; i++) {
        //         var gLayer = map.getLayer(graphicLayerIds[i]);
        //         //clear this Layer
        //         gLayer.clear();
        //     }
        // }
        // //-------------------------------------------------






        // map.on("load", createToolbar);

        //         // loop through all dijits, connect onClick event
        //         // listeners for buttons to activate drawing tools
        //         registry.forEach(function(d) {
        //           // d is a reference to a dijit
        //           // could be a layout container or a button
        //           if ( d.declaredClass === "dijit.form.Button" ) {
        //             d.on("click", activateTool);
        //           }
        //         });

        //         function activateTool() {
        //           var tool = this.label.toUpperCase().replace(/ /g, "_");
        //           toolbar.activate(Draw[tool]);
        //           map.hideZoomSlider();
        //         }

        //         function createToolbar(themap) {
        //           toolbar = new Draw(map);
        //           toolbar.on("draw-end", addToMap);
        //         }

        //         function addToMap(evt) {
        //           var symbol;
        //           toolbar.deactivate();
        //           map.showZoomSlider();
        //           switch (evt.geometry.type) {
        //             case "point":
        //             case "multipoint":
        //               symbol = new SimpleMarkerSymbol();
        //               break;
        //             case "polyline":
        //               symbol = new SimpleLineSymbol();
        //               break;
        //             default:
        //               symbol = new SimpleFillSymbol();
        //               break;
        //           }
        //           var graphic = new Graphic(evt.geometry, symbol);
        //           map.graphics.add(graphic);
        //         }




        // //init geolocation & display elements
        // $("#geo").css("cssText","display:block;");

        // geoLocate = new LocateButton({
        //         map: map
        //       }, "LocateButton");
        //       geoLocate.startup();

        // scalebar = new Scalebar({
        //     map: map,
        //     scalebarUnit: "dual",
        //     attachTo:"bottom-left"
        // });

        // //Levels of Detail
        // var lods = [
        //     {"level" : 0, "resolution" : 868.0555555555557, "scale" : 1000000},
        //     {"level" : 1, "resolution" : 434.0277777777778, "scale" : 500000},
        //     {"level" : 2, "resolution" : 217.0138888888889, "scale" : 250000},
        //     {"level" : 3, "resolution" : 86.80555555555556, "scale" : 100000},
        //     {"level" : 4, "resolution" : 20.833333333333336, "scale" : 24000},
        //     {"level" : 5, "resolution" : 8.680555555555555, "scale" : 10000},
        //     {"level" : 6, "resolution" : 4.340277777777778, "scale" : 5000},
        //     {"level" : 7, "resolution" : 1.7361111111111112, "scale" : 2000},
        //     {"level" : 8, "resolution" : 0.8680555555555556, "scale" : 1000},
        //     {"level" : 9, "resolution" : 0.4340277777777778, "scale" : 500}
        // ];


        // //Starting Extent
        // initialExtent = new esri.geometry.Extent({
        //     "xmin" : 779321,
        //     "ymin" : 26759729,
        //     "xmax" : 786446,
        //     "ymax" : 26764499,
        //     "spatialReference" : {
        //         "wkid" : 102707
        //     }
        // });


        // //Map Initialization
        // map = new esri.Map("map", {
        //     extent : initialExtent,
        //     //slider : true,
        //     // lods: lods,
        //     logo : false,
        //     autoResize : false//,
        //     //nav: true
        // });



        //Print / Export Map ------------------------------------------------

        //PrintTemplate
        var template = new esri.tasks.PrintTemplate();

        template.layoutOptions = {
                "titleText": "Southern Nevada GIS - OpenWeb",
                "scalebarUnit": "Kilometers",
                // "copyrightText": "",
                "showAttribution": true
            }
            //Req. when layoutTemplate set to 'MAP_ONLY'
        template.exportOptions = {
            width: 800,
            height: 600,
            dpi: 96
        }
        template.preserveScale = true;

        //PrintParameters
        var params = new esri.tasks.PrintParameters();
        params.map = map;
        params.template = template;

        //PrintTask
         var printTask = new esri.tasks.PrintTask(servicePrefix+"arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");
        // var printTask = new esri.tasks.PrintTask("http://maps.clarkcountynv.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");


        //Template Options (template.format,template.layout)
        // var exportFormat = "PDF";
        // var exportLayout = "MAP_ONLY";
        var exportFormat = "png32";
        var exportLayout = "MAP_ONLY";

        //"MAP_ONLY";
        //"A4 Landscape";
        //"PDF";
        //"png32";

        template.format = exportFormat;
        template.layout = exportLayout;


        //------------------------------------------------
        // $( "#printMapLink" ).click(function() {
        // $("#printList").click(function() {

        //     //call to processPrint function
        //     processPrint();

        // });


        //gets called on 'Export As' list item click (in Resources)
        $("#exportListItem").click(function() {

            //call to processPrint function
            processPrint();

        });

        //On Prop Info window, init a print friendly view
        $("#printInitLink").click(function() {

            //call to processPrint function
            processPrint();

        });
    

        //------------------------------------------------






        // var tiledLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer");
        // map.addLayer(tiledLayer);

        //https://github.com/slead/jsapi/blob/master/printTask/printTask.html

        //print ---------------------------------------
        //https://developers.arcgis.com/javascript/jssamples/widget_print.html
        //https://developers.arcgis.com/javascript/jssamples/widget_print_esri_request.html
        //https://github.com/slead/jsapi/blob/master/printTask/printTask.html
        //http://gis.stackexchange.com/questions/54588/can-you-dynamically-set-print-options-using-arcgis-js-api
        //https://geonet.esri.com/thread/86205

        // https://github.com/slead/jsapi/blob/master/printTask/printTask.html
        // https://geonet.esri.com/thread/86205
        // https://developers.arcgis.com/javascript/jssamples/#search/PrintTask
        // http://www.arcgis.com/home/webmap/viewer.html?
        // http://www.arcgis.com/home/webmap/print.html
        // https://developers.arcgis.com/javascript/jsapi/printtask-amd.html

        //Format Options: pdf | png32 | png8 | jpg | gif | eps | svg | svgz
        //layout Options: https://developers.arcgis.com/javascript/jsapi/printtemplate-amd.html

        // MAP_ONLY
        // A3 Landscape
        // A3 Portrait
        // A4 Landscape
        // A4 Portrait
        // Letter ANSI A Landscape
        // Letter ANSI A Portrait
        // Tabloid ANSI B Landscape
        // Tabloid ANSI B Portrait

        // //export map
        // var exportFormat = "PDF";
        // var exportLayout = "MAP_ONLY";

        // //print map
        // var printPDFFormat = "PDF"
        // var printPDFLayout = "A4 Landscape";

        // var printPNGFormat = "png32"
        // var printPNGLayout = "A4 Landscape";


        // //------------------------------------------------
        // //export map only pdf
        // $("#exportList").click(function() {

        //     // var template = new esri.tasks.PrintTemplate();
        //     template.format = exportFormat;
        //     template.layout = exportLayout;

        //     //Re-show map print & export load
        //     $("#loading-readyPNG").hide();
        //     $("#loading-image4").show();


        //     //working
        //     printTask.execute(params, exportResult);


        //     //export resolve
        //     function exportResult(result) {
        //         console.log("M [[ export: " + result.url + " ]]");
        //         // window.open('http://www.google.com', "_blank");

        //         $("#exportMapLink_PNG").attr("href", result.url)



        //         $("#loading-readyPNG").show();
        //         $("#loading-image4").hide();

        //     };

        // });
        // //------------------------------------------------




        // //call to start print, or do so on controllers
        // startPrint();

        //processPrint - creates the print friendly view
        function processPrint() {

            //Re-show map print & export load
            $("#printLoadingTag").show();
            $("#printInitLink").hide();

            //Pause a few seconds then call the print task      
            //  setTimeout(function(){
            console.log("M [[ printing to PDF ]]");
            // printTask.execute(params, printResult, printError);

            //Call to execute print task
            printTask.execute(params, printResolve);




            //Print process process resolve
            function printResolve(result) {

                //call to kick off the print preview url construct
                angular.element($('#mapDiv')).scope().constructPrintFriendly(result.url);
                

                 //Re-show map print & export load
                 $("#printLoadingTag").hide();
                 $("#printFriendlyLink").show();

                 //Export Modal:
                 $("#rawExportPNGLink").attr("href", result.url);
                 $("#exportPreviewIframe").attr("src", result.url);


                 //log result.url
                 console.log("M [[ print: " + result.url + " ]]");

            };
            
        }







        //Basemap Layer (default)
        //basemap = new esri.layers.ArcGISImageServiceLayer("http://maps.clarkcountynv.gov/arcgis_images/rest/services/CACHED/mostcurrentflight/ImageServer", { id: 'basemap' });
        //^^^ Switch to new basemap control here & update WKID from 102707 to new WKID set in image srv
        // basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://gisgate.co.clark.nv.us/"+"ArcGIS/rest/services/CACHED/mostcurrentflight/MapServer", { id: 'basemap' });
        basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://maps.clarkcountynv.gov/arcgis_images/rest/services/CACHED/mostcurrentflight/MapServer", { id: 'basemap' });







        //  mostcurrentflight2 = new esri.layers.ArcGISTiledMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS13/MapServer",{id:'mostcurrentflight2'});

        // imagesF98 = new esri.layers.ArcGISTiledMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF98/MapServer/0",{id:'imagesF98'});

        // for (var i=0 ; i < flightObj.list.length ; i++)
        // {
        //     console.log('test');
        //    // results.push(flightObj.list[i]); //need to add price to each item return

        //  }
        //  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


        //Dynamic Map layers (default)
        //Assessor Layer
        // assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"ArcGIS/rest/services/GISMO/AssessorMap/MapServer", { id: 'assessorServiceLayer' });
        // assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"ArcGIS/rest/services/GISMO/AssessorMap/MapServer", { id: 'assessorServiceLayer' });
        assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorMap/MapServer", { id: 'assessorServiceLayer' });
        // map.addLayer(assessorServiceLayer);

        //AssesorAnno Layer
        // transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/Transportation/MapServer",{id:'transportationServiceLayer'});
        // assessorannoServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/AssessorAnno/MapServer", { id: 'assessorannoServiceLayer' });
        assessorannoServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AssessorAnno/MapServer", { id: 'assessorannoServiceLayer' });
        
        //SCL Layer
        // transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/scl/MapServer", { id: 'transportationServiceLayer' });
        transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/scl/MapServer", { id: 'transportationServiceLayer' });

        //abLayer
        // abLayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/AB142/MapServer", { id: 'abLayer' });
        abLayer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/AB142/MapServer", { id: 'abLayer' });


        //add map layers
        map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, abLayer]);


        //Boulder City Zoning Layer
        // bcLayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/Zoning/MapServer/5", { id: 'bcLayer' });
        bcLayer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/Zoning/MapServer/5", { id: 'bcLayer' });
        //Clark County Planned Landuse Layer
        // PLULayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/PlanedLandUse/MapServer", { id: 'PLULayer' });
        PLULayer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/PlanedLandUse/MapServer", { id: 'PLULayer' });
        //Clark County Zoning Layer
        // CCZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/Zoning/MapServer/8", { id: 'CCZoningLayer' });
        CCZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/Zoning/MapServer/8", { id: 'CCZoningLayer' });
        //Contours 50 Meter Layer
        // C50Layer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/con_50M/MapServer", { id: 'C50Layer' });
        C50Layer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/con_50M/MapServer", { id: 'C50Layer' });
        //Contours 2003 5ft (Valley) Layer
        // C2003Layer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/con_03_5ft/MapServer", { id: 'C2003Layer' });
        C2003Layer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/con_03_5ft/MapServer", { id: 'C2003Layer' });
        //Contours 1996 5ft (Valley) Layer
        // C1996Layer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/con_96_5ft/MapServer", { id: 'C1996Layer' });
        C1996Layer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/con_96_5ft/MapServer", { id: 'C1996Layer' });
        //Henderson Zoning Layer
        // hendersonZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/Zoning/MapServer/6", { id: 'lasVegasZoningLayer' });
        hendersonZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/Zoning/MapServer/6", { id: 'lasVegasZoningLayer' });
        //Las Vegas Zoning Layer
        // lasVegasZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/Zoning/MapServer/4", { id: 'lasVegasZoningLayer' });
        lasVegasZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/Zoning/MapServer/4", { id: 'lasVegasZoningLayer' });
        //Mesquite Zoning Layer
        // mesquiteZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/Zoning/MapServer/9", { id: 'mesquiteZoningLayer' });
        mesquiteZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/Zoning/MapServer/10", { id: 'mesquiteZoningLayer' });
        //NLV Zoning Layer
        // nlvZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/Zoning/MapServer/7", { id: 'nlvZoningLayer' });
        nlvZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/Zoning/MapServer/7", { id: 'nlvZoningLayer' });
        //Seismic Layer
        // seismicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/SoilsGuideline/MapServer/5", { id: 'seismicLayer' });
        seismicLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://maps.clarkcountynv.gov/arcgis_images/rest/services/CACHED/mostcurrentflight/MapServer", { id: 'seismicLayer' });
        //Soil Guideline Layer
        // SoilLayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/SoilsGuideline/MapServer", { id: 'SoilLayer' });
        SoilLayer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/SoilsGuideline/MapServer", { id: 'SoilLayer' });
        //Right-of-Way Layer
        // rightofwayLayer = new esri.layers.ArcGISDynamicMapServiceLayer(servicePrefix+"arcgis/rest/services/GISMO/RightOfWay/MapServer", { id: 'rightofwayLayer' });
        rightofwayLayer = new esri.layers.ArcGISDynamicMapServiceLayer("https://maps.clarkcountynv.gov/arcgis/rest/services/GISMO/RightOfWay/MapServer", { id: 'rightofwayLayer' });

        //new declarative method:
        //basemap
        //assessorServiceLayer
        //assessorannoServiceLayer
        //transportationServiceLayer
        //abLayer
        //bcLayer
        //PLULayer
        //CCZoning Layer
        //C50Layer
        //C2003Layer
        //C1996Layer
        //hendersonZoningLayer
        //lasVegasZoningLayer
        //mesquiteZoningLayer
        //nlvZoningLayer
        //seismicLayer
        //SoilLayer
        //rightofwayLayer
















        // //geolocate
        // //https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=esri+js+api+locate+button+Geometry+cannot+be+converted+to+spatial+reference+of+the+map
        // //https://geonet.esri.com/thread/83347
        // var myWidget = new LocateButton({
        //  //   theme: "locateButton", // (optional). class name for the widget container. default: "locateButton"
        //    // graphicsLayer: myLayer,
        //     map: map, // (required) map object. default: null.
        //   //  visible: true, // (optional) show the widget. default: true.
        //   //  highlightLocation: true, // (optional) show a graphic on the location when geolocated. default: true.
        //   //  scale: null, // (optional) scale in meters to geolocate to. Defaults to accuracy from geolocation.
        //    // symbol: new PictureMarkerSymbol(require.toUrl("esri/dijit") + '/images/blue-dot.png', 21, 21), // (optional)
        //    // infoTemplate: null, // (optional) popup info template. default: null
        //   //  useTracking: true, // (optional) use watchPosition instead of getCurrentLocation. default: false
        //    // setScale: true, // (optional) set scale on locate. default: true.
        //    // centerAt: true, // (optional) center at point on locate. default: true
        //    // geolocationOptions: // (optional). default: { maximumAge: 0, timeout: 15000, enableHighAccuracy: true}
        // }, "LocateButton");
        // myWidget.startup();   

        // myWidget.on('locate', function(evt){
        //     console.log(evt);
        // });

        var geoLocate = new LocateButton({
            map: map,
            highlightLocation: false
        }, "LocateButton");
        geoLocate.startup();



        //ready
        $(document).ready(function() {

            //Resize call [repo: Reposition & Resize Map | adjustmapwidth: Update map width | sized: Expand/Retract slide panel for mob optimize]
            window.onresize = function() { sized(); }; //dynamicHeight(); COMMENTED OUT

            //desktop & mobile layout optimizations
            sized();


            //--------------------------------------------------------------------
            //Map State Manager

            //Listen for click
            dojo.connect(map, "onClick", function(evt) {

                if (functionMode == "identify") {

                   //Reset the print & export load elements
                   $("#printFriendlyLink").hide();
                   $("#printInitLink").show();


                    //Call to executeQueryTask
                    //Call the 'mapController' controller found on map element (pass in evt param)
                    // angular.element($('#mapDiv')).scope().executeQueryTask(evt);
                    angular.element($('#mapDiv')).scope().executeQueryTask(evt.mapPoint.x, evt.mapPoint.y, 'select');
                    //true flag quantifies a select property call
                    //resolveAs: select | search


                    console.log(evt.mapPoint)

                    // //ADDED FOR MOBILE**************************************
                    // map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));

                    //ADDED FOR MOBILE**************************************
                    map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));


                    //log metric
                    postMetric(productCode, sessionNumber + ":Select Property");

                }
                if (functionMode == "draw") {
                    //Add stops
                    //  addStop(evt);
                }
                // if (functionMode == "route") {
                //     //Add stops
                //     addStop(evt);
                // } 
                else {
                    return; }


            });

            //Listen for mousemove
            dojo.connect(map, "onMouseMove", function(evt) {

                angular.element($('#mapDiv')).scope().mapevtMouseMove(evt.mapPoint.x, evt.mapPoint.y);

            });

            //Listen for extentchange
            map.on("extent-change", function(evt) {

                // var point = map.extent.getCenter();
                //    var thelevel = map.getLevel(); //added
                //    angular.element($('#mapDiv')).scope().mapevtExtentChange(point.x, point.y, thelevel);

                //    // propInfoRepo_Second();
                //    setTimeout(function() {
                //        //call to repo
                //        propInfoRepo_Second();
                //    }, 100);


                   

                //UNABLE TO GET THE CURRENT LEVEL, ZOOM, LODS, ETC FOR AN "ArcGISImageServiceLayer"
                //THIS FUNCTIONALITY DOES WORK WHEN "ArcGISTiledMapServiceLayer" is used
                // // basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://gisgate.co.clark.nv.us/ArcGIS/rest/services/CACHED/mostcurrentflight/MapServer", { id: 'basemap' });
                // basemap = new esri.layers.ArcGISImageServiceLayer("http://maps.clarkcountynv.gov/arcgis_images/rest/services/CACHED/mostcurrentflight/ImageServer", { id: 'basemap' });
                // //^^^ Switch to new basemap control here & update WKID from 102707 to new WKID set in image srv




                var point = map.extent.getCenter();
                var thelevel = map.getLevel(); //added | test:  var thelevel = map.getZoom(); 


                angular.element($('#mapDiv')).scope().mapevtExtentChange(point.x, point.y, thelevel);

                // propInfoRepo_Second();
                setTimeout(function() {
                    //call to repo
                    propInfoRepo_Second();
                }, 100);


                //TESTING
                console.log("THIS IS THE ZOOM FACTOR " + map.zoomFactor);
                console.log("THIS IS THE MAX ZOOM " + map.getMaxZoom());


            });

            //Listen for extentchange
            map.on("zoom-end", function(evt) {

                // var point = map.extent.getCenter();
                // var thelevel = map.getLevel(); //added | test:  var thelevel = map.getZoom(); 


                // angular.element($('#mapDiv')).scope().mapevtExtentChange(point.x, point.y, thelevel);

                // // propInfoRepo_Second();
                // setTimeout(function() {
                //     //call to repo
                //     propInfoRepo_Second();
                // }, 100);


                //TESTING
                console.log("MAP HAS BEEN ZOOMED");
              //  console.log("THIS IS THE MAX ZOOM " + map.getMaxZoom());


            });





            //Hot-keys




            //legend
            // var rivers = new FeatureLayer("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hydrography/Watershed173811/MapServer/1", {
            //   mode: FeatureLayer.MODE_ONDEMAND,
            //   outFields:["*"]
            // });
            // var waterbodies = new FeatureLayer("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hydrography/Watershed173811/MapServer/0", {
            //   mode: FeatureLayer.MODE_ONDEMAND,
            //   outFields:["*"]
            // });

            map.on("layers-add-result", function(evt) {
                var layerInfo = arrayUtils.map(evt.layers, function(layer, index) {
                    return { layer: layer.layer, title: layer.layer.name };
                });
                if (layerInfo.length > 0) {
                    var legendDijit = new Legend({
                        map: map,
                        layerInfos: layerInfo
                    }, "legendDiv");
                    legendDijit.startup();
                }
            });

            // map.on("load", function() { ShowLocation(-81.3765, 28.54175); });

            //--------------------------------------------------------------------



            // //Main Search
            // $("#tester input").on('keyup',function(evt){
            //     // console.log($(this).val().length);

            //     // //testing the visibility of the suggestion box
            //     // //FOR LOCATTION SPECIFIC SETTING OF PROPINFO DIALOG
            //     // var suggestIsVis = $(".dropdown-menu").is(":visible"); 
            //     // // var suggestIsVis = $(".dropdown-menu").is(":visible"); 

            //     // // if ($(".dropdown-menu"))
            //     // // {

            //     // //     //prop info results positioning
            //     // //     $( "#PropInfoDialog" ).position({
            //     // //       my: "left top",
            //     // //       at: "left+1 bottom+2",
            //     // //       of: ".dropdown-menu"
            //     // //     });

            //     // // }
            //     // // else
            //     // // {

            //     // //     $( "#PropInfoDialog" ).hide();

            //     // // }

            //     // if (suggestIsVis) {
            //     //         //prop info results positioning
            //     //         $( "#PropInfoDialog" ).position({
            //     //           my: "left top",
            //     //           at: "left+1 bottom+2",
            //     //           of: ".dropdown-menu"
            //     //         });

            //     // }


            //     // console.log($(this).val().length);

            //     // //check if the char length is less than 1
            //     // if ($(this).val().length <= 2) {

            //     //     //check if its visible
            //     //     if ($("#PropInfoDialog").is(':visible')) { 

            //     //       //   //hide it
            //     //       // $( "#PropInfoDialog" ).hide( "slow", function() {
            //     //       //     // Animation complete.
            //     //       //   });

            //     //       $( "#PropInfoDialog" ).slideUp( "fast", function() {
            //     //          // Animation complete.
            //     //        });

            //     //     }

            //     // }
            //     // else {

            //     //     if (evt.keyCode == '38') {
            //     //           // up arrow
            //     //           console.log('start search up')
            //     //       }
            //     //       else if (evt.keyCode == '40') {
            //     //           // down arrow

            //     //           console.log('start search down')
            //     //       }
            //     //       else if (evt.keyCode == '8') {
            //     //           // down arrow

            //     //           console.log('backspace')

            //     //           // // var theSearchBox = $( "#tester ul" );
            //     //           // var theSearchBox = $( ".dropdown-menu" );
            //     //           // var offset = theSearchBox.offset();
            //     //           // $("#PropInfoDialog").offset({ top: offset.top, left: offset.left})

            //     //           // var theOffset = $( ".dropdown-menu" ).height();

            //     //           // var theNewTop = theOffset + 50;

            //     //           //  var newPos = "top:" + theNewTop + "px !important;";
            //     //           //  $("#PropInfoDialog").css("cssText",newPos);

            //     //       }

            //    // }



            // });

            // $('input').on('keyup',function(){
            //     console.log($(this).val().length);
            // });

            // $("#search-form").keyup(function (evt) {

            //     // if (evt.keyCode == 13) {
            //     //     alert('tst')
            //     //    // angular.element($('#search-form')).scope().search();
            //     // }

            //     // $('#target').keyup(function(){       
            //          // alert($(this).val());      
            //     // });

            //     // alert($('#search-form').val());

            //     // var searchText = document.getElementById("search-form");
            //     // var searchTextVal = searchText.value;
            //     // // var searchTextLength = searchText.value.length;

            //     // alert(searchTextVal)

            //     // if($("#search-form").val().length < 1) {
            //     //          // Enable submit button

            //     //          alert($("#search-form").val().length)
            //     //     } else {
            //     //          // Disable submit button

            //     //     }

            //     // if($(this).val().length < 1) {
            //     //          // Enable submit button

            //     //          alert($(this).val().length)
            //     //     } else {
            //     //          // Disable submit button

            //     //     }

            //     // $( "#PropInfoDialog" ).hide();


            //     // $("#fbss").keypress(function() {
            //     //     if($(this).val().length > 1) {
            //     //          // Enable submit button
            //     //     } else {
            //     //          // Disable submit button
            //     //     }
            //     // });

            //     // var $field = $(this);

            //     // // this is the value before the keypress
            //     // var beforeVal = $field.val();

            //     // setTimeout(function() {

            //     //     // this is the value after the keypress
            //     //     var afterVal = $field.val();
            //     // }, 0);

            //   //  console.log('val: ' + $('#search-form').val())

            //     // var searchText = document.getElementById("search-form");
            //     // var searchTextVal = searchText.value;
            //     // // var searchTextLength = searchText.value.length;

            //     // alert(searchTextVal)


            //     // //enter
            //     // if (evt.keyCode == 13) {
            //     //    // angular.element($('#search-form')).scope().search();
            //     // }
            //     //down
            //     // if (evt.keyCode == 40) {
            //     //    // // angular.element($('#search-form')).scope().search();
            //     //    // console.log('yes')

            //     //    angular.element($('#search-form')).scope().onTheChange($item, $model, $label);


            //     // }

            // });

            //Map display list
            // $("#basemapList li").click(function (e) {
            //     switch (e.target.text) {
            //         case "Boulder City Zoning":
            //             //add layer
            //            // map.addLayer(bcLayer);
            //             //remove layers
            //            map.removeLayer(PLULayer);
            //            //  map.removeLayers([PLULayer]);
            //             break;
            //         case "Clark County Planned Landuse":
            //             //add layer
            //             map.addLayer(PLULayer);
            //             //remove layers
            //            map.removeLayer(bcLayer);
            //          //  map.removeLayers([bcLayer]);
            //             break;
            //         // case "Imagery":
            //         //     map.setBasemap("hybrid");
            //         //     break;
            //         // case "Imagery":
            //         //     map.setBasemap("hybrid");
            //         //     break;
            //         // case "Imagery":
            //         //     map.setBasemap("hybrid");
            //         //     break;
            //     }
            // });

            // //slide panel list item clicks (to animate panel slide out)
            // $("#basemapList li").click(function (e) {

            //     $("#basemapList .dropdown-menu").css("margin-left", 232 + "px");

            //     // $(".open > .dropdown-menu").css("left", 232 + "px");

            // });

            //---------------------------------------------


            //listening on search 'x' close icon click
            $("#closeIcon").click(function(e) {

                //clear the field
                $('#search-form input').val('');
                //hide the close icon
                $('#closeIcon').hide();
                //added (7.28)
                map.infoWindow.hide();

            });

            //throw disclaimer
            disclaimerCheck();
            //load config
            config();
            //init StreetView
            //initStreetView(); //COMMENTED OUT ON 9/4 - GOOGLE NOW CHARGES FOR STREETVIEW SVC






            // //testing out local json call
            // testCall();



            // var it_works = false;

            // $.ajax({
            //   type: 'GET',
            //   async: false,
            //   url: "http://gisgate.co.clark.nv.us/gismo/apps/mobile/newowl/testing.json?callback=?",
            //   data: "",
            //   success: function() {it_works = true;}
            // });

            // alert(it_works);



            // var it_works = false;

            // $.getJSON({
            //   type: 'GET',
            //   async: false,
            //   url: "http://gisgate.co.clark.nv.us/gismo/apps/mobile/newowl/testing.json?callback=?",
            //   data: "",
            //   success: function() {it_works = true;}
            // });

            // alert(it_works);






            // checkPassword()
            // .done(function(r) {

            //     console.log('wtf')
            //     if (r) {
            //         // Tell the user they're logged in
            //         console.log('yes')
            //     } else {
            //         // Tell the user their password was bad
            //         console.log('no')
            //     }
            // })
            // .fail(function(x) {
            //     // Tell the user something bad happened
            // });


           // example();





















           //************************************************************************

           //handles the intro panel scroll buttons logic

           //http://jsfiddle.net/andrewwhitaker/s5mgX/

           // var step = 25;
           // var scrolling = false;

           // // Wire up events for the 'scrollUp' link:
           // $("#scrollUp").bind("click", function(event) {
           //     event.preventDefault();
           //     // Animates the scrollTop property by the specified
           //     // step.
           //     $("#intoUpdateContainer").animate({
           //         scrollTop: "-=" + step + "px"
           //     });
           // }).bind("mouseover", function(event) {
           //     scrolling = true;
           //     scrollContent("up");
           // }).bind("mouseout", function(event) {
           //     scrolling = false;
           // });


           // $("#scrollDown").bind("click", function(event) {
           //     event.preventDefault();
           //     $("#intoUpdateContainer").animate({
           //         scrollTop: "+=" + step + "px"
           //     });
           // }).bind("mouseover", function(event) {
           //     scrolling = true;
           //     scrollContent("down");
           // }).bind("mouseout", function(event) {
           //     scrolling = false;
           // });

           // function scrollContent(direction) {
           //     var amount = (direction === "up" ? "-=1px" : "+=1px");
           //     $("#intoUpdateContainer").animate({
           //         scrollTop: amount
           //     }, 1, function() {
           //         if (scrolling) {
           //             scrollContent(direction);
           //         }
           //     });
           // }







        //    //bind a click event on the inactive overlay, to hide it if clicked, and collapse the skinnypanel
        // $(".inactiveOverlay").bind("click", function(event) {
        //     event.preventDefault();

        //     //added--------------------------
        //     panelCloseHit = true;


        //     console.log('intro slide in clicked')

        //     //hide the 'inactive overlay'
        //     $(".inactiveOverlay").hide();


        //     //-------------------------------------------
        //     //Updating the Header positioning & Arrow (ALL)
        //     // $("#introHeader").css("left", -181 + "px");
        //     // $("#displayHeader").css("left", -201 + "px");
        //     // $("#toolsHeader").css("left", -201 + "px");
        //     // $("#resourcesHeader").css("left", -201 + "px");
        //     // $(".esriScalebar").css("left", -201 + "px");

        //     //transforms
        //     // $('#introToggle').addClass('toggleAdjust');
        //     // $('#introHeader').addClass('headerAdjust');
        //     // $('#logoTitle').addClass('titleAdjust');
        //     // $('#search-form').addClass('searchFormAdjust');

        //     $('#introToggle').toggleClass('ion-chevron-left ion-navicon-round');
        //     $('#displayToggle').toggleClass('ion-chevron-left ion-navicon-round');
        //     $('#toolsToggle').toggleClass('ion-chevron-left ion-navicon-round');
        //     $('#resourcesToggle').toggleClass('ion-chevron-left ion-navicon-round');

        //     $('#mainTabs').css("display", "none");
        //     $('.infoBlock').css("display", "none");
        //     //-------------------------------------------

        //     // hide panel
        //     $(".skinnyPanel").animate({
        //        "marginLeft": "-=240px"
        //     }, 0);
        //     skinnyPanelOpen = false;

        // });













            //log metric
            postMetric(productCode, 'UserAgent:' + navigator.userAgent.toString().toLowerCase());

        }); //end ready

    }); //end require
//************************************************************************


















    // //https://stackoverflow.com/questions/24909006/javascript-get-data-from-json-to-a-global-variable
    // //https://gist.github.com/zuch/3720842


    // //error:
    // //https://stackoverflow.com/questions/5359224/parsererror-after-jquery-ajax-request-with-jsonp-content-type


    //     function example()
    //     {
    //         // var response = "";
    //         // var form_data = {
    //         //     username: username,
    //         //     password: password
    //         // };

    //         //                dataType: "json",

    //         //url: "http://gisgate.co.clark.nv.us/gismo/apps/mobile/newowl/testing.json?callback=?", 

    //         $.ajax({
    //             type: "GET", 
    //             url: "http://gisgate.co.clark.nv.us/gismo/apps/mobile/newowl/testingjson.txt", 
    //             success: function(response)
    //             {
    //                 response = '[{"Language":"jQuery","ID":"1"},{"Language":"C#","ID":"2"},
    //                                {"Language":"PHP","ID":"3"},{"Language":"Java","ID":"4"},
    //                                {"Language":"Python","ID":"5"},{"Language":"Perl","ID":"6"},
    //                                {"Language":"C++","ID":"7"},{"Language":"ASP","ID":"8"},
    //                                {"Language":"Ruby","ID":"9"}]'
    //                 console.log('response');
                    
    //             // var json_obj = $.parseJSON(response);//parse JSON
                    
    //             //     var output="<ul>";
    //             //     for (var i in json_obj) 
    //             //     {
    //             //         output+="<li>" + json_obj[i].Language + ",  " + json_obj[i].ID + "</li>";
    //             //     }
    //             //     output+="</ul>";
                    
    //             //     console.log(output);
    //             },
    //             error: function(XMLHttpRequest, textStatus, errorThrown) { 

    //                 console.log(XMLHttpRequest);
    //                 console.log(textStatus);
    //                 console.log(errorThrown);
    //                     // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
    //             } 
                  
    //         })    
    //     }







    // $(document).ready(function() {

    //     

    //    var jsontext =  "http://gisgate.co.clark.nv.us/gismo/apps/mobile/newowl/testing.json?callback=?"; 
    //    var dumbtext =  "http://gisgate.co.clark.nv.us/gismo/apps/mobile/newowl/test.txt?callback=?"; 


    //     // function test(callback) {
    //     //   $.getJSON(dumbtext, function (data) {
    //     //     callback(data);
    //     //   });
    //     // }
    //     // test(function (data) {
    //     //   console.log('data');
    //     // });



    //     $.getJSON(dumbtext, function(data) {
    //         console.log( "json loaded" );
    //         foo(data); 
    //     })
    //     .done(function() {
    //        console.log("");
    //        foo1(data);
    //     });





    // });




































    // $(document).ready(function() {
    // // $("#jsonpbtn2").click(function() {
    //     var surl =  "http://gisgate.co.clark.nv.us/gismo/apps/mobile/newowl/testing.json?callback=?"; 
    //     var id = $(this).attr("id"); 
    //     $.ajax({
    //         url: surl, 
    //         // data: {id: id},
    //         dataType: "jsonp",
    //         jsonp : "callback",
    //         jsonpCallback: "jsonpcallback"
    //         }); 


    //  });




    // // Named callback function from the ajax call when jsonpbtn2 clicked
    // function jsonpcallback(rtndata) { 

    //     console.log('yus')

    //     // // Get the id from the returned JSON string and use it to reference the target jQuery object.
    //     // var myid = "#"+rtndata.id; 
    //     // $(myid).feedback(rtndata.message, {duration: 4000, above: true});
    // }








// function checkPassword() {
//     return $.ajax({
//         url: 'http://gisgate.co.clark.nv.us/gismo/apps/mobile/newowl/testing.json?callback=?',
//         // data: {
//         //     username: $('#username').val(),
//         //     password: $('#password').val()
//         // },
//         type: 'GET',
//         dataType: 'jsonp'
//     });
// }

// // if (checkPassword()) {
// //     // Tell the user they're logged in
// // }









//https://stackoverflow.com/questions/3222347/javascript-global-variables-after-ajax-requests


// var it_works = false;

// $.ajax({
//   type: 'POST',
//   async: false,
//   url: "some_file.php",
//   data: "",
//   success: function() {it_works = true;}
// });

// alert(it_works);





// $(function () {
//     //  $http.jsonp('http://gisgate.co.clark.nv.us/gismo/apps/mobile/newowl/testing.json?' + '&callback=JSON_CALLBACK').success(function(data) {
//     //     console.log('zomg')
//     // });

//     $.getJSON("http://gisgate.co.clark.nv.us/gismo/apps/mobile/newowl/testing.json?callback=?", function(result){
//        //response data are now in the result variable
//        alert('result');
//     });


// });


// function testCall() {

//     // //https://stackoverflow.com/questions/7936610/json-uncaught-syntaxerror-unexpected-token


//     // $.getJSON("http://gisgate.co.clark.nv.us/gismo/apps/mobile/newowl/testing.json?callback=?", function(result){
//     //    //response data are now in the result variable
//     //    alert('result');
//     // });








//     // //http://gisgate.co.clark.nv.us/gismo/apps/mobile/newowl/testing.json

//     // console.log('first')

//     // $.ajax({
//     //         // url: 'testing.json' + '?callback=?',
//     //         // url: 'testing.txt' + '?callback=?',
//     //         url: 'http://gisgate.co.clark.nv.us/gismo/apps/mobile/newowl/testing.json' + '?callback=?',
//     //         type: "GET",
//     //         dataType: "jsonp",
//     //         jsonpCallback: "localJsonpCallback"
//     //     });

//     //  function localJsonpCallback(json) {
//     //     console.log(json);

//     //         // if (!json.Error) {
//     //         //  console.log('failed')
//     //         //     // $('#resultForm').submit();
//     //         // }
//     //         // else {
//     //         //  console.log('success')
//     //         //     // $('#loading').hide();
//     //         //     // $('#userForm').show();
//     //         //     // alert(json.Message);
//     //         // }


//     //     }


//     // console.log('last')


// }



// $(document).ready(function () {
//    // if ($('#userForm').valid()) {
//                    // var formData = $("#userForm").serializeArray();
//                    // $.ajax({
//                    //     url: 'http://www.example.com/user/' + $('#Id').val() + '?callback=?',
//                    //     type: "GET",
//                    //     data: formData,
//                    //     dataType: "jsonp",
//                    //     jsonpCallback: "localJsonpCallback"
//                    // });
//        // });


//    // $.ajax({
//    //         url: '/testing.json' + '?callback=?',
//    //         type: "GET",
//    //         // data: formData,
//    //         dataType: "jsonp",
//    //         jsonpCallback: "localJsonpCallback"
//    //     });
    

//    $.ajax({
//            url: 'testing.json' + '?callback=?',
//            type: "GET",
//            dataType: "jsonp",
//            jsonpCallback: "localJsonpCallback"
//        });

//     function localJsonpCallback(json) {
//            if (!json.Error) {
//             console.log('failed')
//                // $('#resultForm').submit();
//            }
//            else {
//             console.log('success')
//                // $('#loading').hide();
//                // $('#userForm').show();
//                // alert(json.Message);
//            }
//        }



//    } //end call







// function testCall() {

//     console.log('testing')
//     // $.getJSON("http://example.com/something.json?callback=?", function(result){
//     //    //response data are now in the result variable
//     //    console.log('result');
//     // });

//     $.getJSON("/testing.json?callback=?", function(result){
//        //response data are now in the result variable
//        console.log('result');
//     });



//     $.ajax({
//             // method: "POST",
//              // url: "http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/addMetric",
//              url: "http://maps.clarkcountynv.gov/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/addMetric",
//             data: { app: rApp, RecordedAction: rAction }
//         })
//         .done(function(response) {
//             // alert( "Data Saved: " + msg );

//             if (rAction.substring(0, 10) == 'UserAgent:') {
//                 sessionNumber = response;
//             }

//             //  console.log('metric post success')
//             //  console.log(sessionNumber)
//         })
//         .fail(function(response) {
//             // console.log('metric post fail')
//         });




// }


 // $(document).ready(function () {
 //    // if ($('#userForm').valid()) {
 //                    // var formData = $("#userForm").serializeArray();
 //                    $.ajax({
 //                        url: 'http://www.example.com/user/' + $('#Id').val() + '?callback=?',
 //                        type: "GET",
 //                        data: formData,
 //                        dataType: "jsonp",
 //                        jsonpCallback: "localJsonpCallback"
 //                    });
 //        // });

 //     function localJsonpCallback(json) {
 //            if (!json.Error) {
 //                $('#resultForm').submit();
 //            }
 //            else {
 //                $('#loading').hide();
 //                $('#userForm').show();
 //                alert(json.Message);
 //            }
 //        }

 //    }















//***************************Config***************************************
function config() {
    angular.element($('#mapDiv')).scope().configLoad();
}
//************************************************************************

//  //***********************Parcel Redirect***********************************

//  // function getParameterByName(name, url) {

//  //   //http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
//  //     if (!url) url = window.location.href;
//  //     name = name.replace(/[\[\]]/g, "\\$&");
//  //     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//  //         results = regex.exec(url);
//  //     if (!results) return null;
//  //     if (!results[2]) return '';
//  //     return decodeURIComponent(results[2].replace(/\+/g, " "));
//  // }

//  //Make the call to find querystring "@" params 
//  function parcelRedirect()
//  {


//    // //?@782826,26762144&legend=t

//    // // query string: ?foo=lorem&bar=&baz
//    // // var foo = getParameterByName('foo'); // "lorem"
//    // // var bar = getParameterByName('bar'); // "" (present with empty value)
//    // // var baz = getParameterByName('baz'); // "" (present with no value)
//    // // var qux = getParameterByName('qux'); // null (absent)

//    // //?foo=lorem&tester=ipsum
//    // var foo = getParameterByName('@'); // "lorem"
//    // var bar = getParameterByName('tester'); // "" (present with empty value)
//    // // var baz = getParameterByName('baz'); // "" (present with no value)
//    // // var qux = getParameterByName('qux'); // null (absent)

//    // console.log(foo)
//    // console.log(bar)
//    // // console.log(baz)
//    // // console.log(qux)


//    var queryString = window.location.search;
//    //craft locale (lat/lng, parcel, address, owner)
//    queryString = queryString.substring(1).split("@");
//    //craft legend (t/f)

//  //   legendString = queryString.substring(1).split("legend=");

//  //   // console.log('legend is' + localeString[1].split("=")[0])
//  // // console.log('legend is' + localeString)



//  //  var params = {}, queries, temp, i, l;
//  //   // Split into key/value pairs
//  //   queries = queryString.split("&amp;");
//  //   // Convert the array of strings into an object
//  //   for ( i = 0, l = queries.length; i < l; i++ ) {
//  //       temp = queries[i].split('=');
//  //       params[temp[0]] = temp[1];
//  //   }

//  //  // console.log(params[1].split(",")[0])


//  // console.log(queryString)



//    // //filter out undefined
//    // if (queryString[1]) {

//    //   //lat/long & state plane
//    //   if (queryString[1].indexOf(",") > -1)
//    //   {
//    //     //lat/long
//    //     if (queryString[1].split(",")[0] < 0 || queryString[1].split(",")[1] < 0) {

//    //     }
//    //     else //State plane ft
//    //     {
//    //       angular.element($('#mapDiv')).scope().executeQueryTask(queryString[1].split(",")[0],queryString[1].split(",")[1]);
//    //     }
//    //   }
//    //   //parcel, address, owner
//    //   else if (!queryString[1].indexOf(",") > -1)
//    //   {
//    //     angular.element($('#mapDiv')).scope().executeSearch(queryString[1]);
//    //   }
//    //   else { }

//    // }

//  //works
// // angular.element($('#mapDiv')).scope().theLegend = true;



//  //legendBlock ------------------------------------------------------
//  //(querystring)

//  // if(localStorage.legBlock) {
//  //  //console.log(localStorage.legBlock)

//  //  //make apprpriate call to switch the scope.theLegend lag to true - calling the controller
//  //  // $scope.theLegend = true; //county, bright
//  // }



//  // console.log(localStorage.legBlock)
//  // // if(localStorage.theme === "dark") {


//  // // if(localStorage.legBlock) {
//  // //  console.log(localStorage.legBlock)

//  // //  //make apprpriate call to switch the scope.theLegend lag to true - calling the controller
//  // //  // $scope.theLegend = true; //county, bright
//  // // }




//    //mainTab ------------------------------------------------------

//    //http://stackoverflow.com/questions/12131273/twitter-bootstrap-tabs-url-doesnt-change

//    //loadTab (bookmark) ----------------------


//    //   var hash = window.location.hash;
//    //   hash && $('ul.nav a[href="' + hash + '"]').tab('show');
//    //  // console.log('ul.nav a[href="' + hash + 'Tab' + '"]')

//    //  if(hash === "#display") {

//    //   $('#intro').removeClass('active');
//    //   $('#display').addClass('active');
//    //   $('#tools').removeClass('active');
//    //   $('#resources').removeClass('active');


//    //      console.log("M [[ " + localStorage.theme + " theme applied ]]");
//    //  } 
//    //  else if (hash === "#tools") {

//    //   $('#intro').removeClass('active');
//    //   $('#display').removeClass('active');
//    //   $('#tools').addClass('active');
//    //   $('#resources').removeClass('active');

//    //  }
//    //  else if (hash === "#resources") {

//    //   $('#intro').removeClass('active');
//    //   $('#display').removeClass('active');
//    //   $('#tools').removeClass('active');
//    //   $('#resources').addClass('active');

//    //  }
//    //  else {

//    // }

//      // $('.nav-tabs a').click(function (e) {
//      //   // $(this).tab('show');
//      //   // var scrollmem = $('body').scrollTop() || $('html').scrollTop();
//      //   window.location.hash = this.hash;
//      //   // $('html,body').scrollTop(scrollmem);
//      // });


//      // $('.theMainTabs a').click(function (e) {
//      //   // $(this).tab('show');
//      //   // var scrollmem = $('body').scrollTop() || $('html').scrollTop();
//      //  window.location.hash = this.hash;
//      //   // $('html,body').scrollTop(scrollmem);

//      //   console.log(this.hash)
//      // });


//    //-----------------------------------------


//  //   var hash = window.location.hash;
//  //   hash && $('ul.nav a[href="' + hash + '"]').tab('show');

//  //   // $('ul.nav a[href="' + hash + '"]').tab('show');

//  //   // // $('ul.nav a[href="' + hash + '"]').tab('show');

//  //   // console.log(hash)

//  //   // // if (hash )


//  //  if(hash === "#display") {

//  //   $('#a_intro').removeClass('active');
//  //   $('#b_display').addClass('active');
//  //   $('#c_tools').removeClass('active');
//  //   $('#d_resources').removeClass('active');


//  //      console.log("M [[ " + localStorage.theme + " theme applied ]]");
//  //  } 
//  //  else if (hash === "#tools") {

//  //    $('#a_intro').removeClass('active');
//  //    $('#b_display').removeClass('active');
//  //    $('#c_tools').addClass('active');
//  //    $('#d_resources').removeClass('active');

//  //  }
//  //  else if (hash === "#resources") {

//  //   $('#a_intro').removeClass('active');
//  //   $('#b_display').removeClass('active');
//  //   $('#c_tools').removeClass('active');
//  //   $('#d_resources').addClass('active');

//  //  }
//  //  else {

//  // }


//  //   // a_intro


//  //   $('.nav-tabs a').click(function (e) {
//  //     // $(this).tab('show');
//  //     // var scrollmem = $('body').scrollTop() || $('html').scrollTop();
//  //     window.location.hash = this.hash;
//  //     // $('html,body').scrollTop(scrollmem);
//  //   });

//    // //update appropriate links to active class
//    // $('li.tackLi').removeClass('active');
//    // $('li.compassLi').addClass('active');
//    // $('li.pencilLi').removeClass('active');
//    // $('li.gearLi').removeClass('active');

//    // //update appropriate links to active class
//    // $('#a.tab-pane').removeClass('active');
//    // $('#b.tab-pane').addClass('active');
//    // $('#c.tab-pane').removeClass('active');
//    // $('#d.tab-pane').removeClass('active');

//    // // var queryString2 = window.location.search;
//    // // queryString2 = queryString2.substring(1).split("?");

//    // // console.log(queryString2[1]);

//    // var queryString2 = window.location.pathname;
//    // // queryString2 = queryString2.substring(1).split("@");

//    // console.log(queryString2);

//    // var hash = window.location.hash;
//    // hash = hash.substring(1).split("#");

//    // //console.log(queryString[1]);

//    // //
//    // if (hash[0].indexOf("tab") > -1) 
//    // {
//    //   console.log(hash[0])

//    // }


//  }
//  //************************************************************************

//  // //***********************Init Streetview**********************************
//  // function getParameterByName(name, url) {
//  //     if (!url) url = window.location.href;
//  //     name = name.replace(/[\[\]]/g, "\\$&");
//  //     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//  //         results = regex.exec(url);
//  //     if (!results) return null;
//  //     if (!results[2]) return '';
//  //     return decodeURIComponent(results[2].replace(/\+/g, " "));
//  // }
//  // //************************************************************************

//***********************Init Streetview**********************************

//Initialize Google StreetView
function initStreetView() {
    //init Google streetview
    sv = new google.maps.StreetViewService();
    panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

}
//***********************************************************************

//***********************Post Metric*************************************

//Log Metrics
function postMetric(rApp, rAction) {

    $.ajax({
            // method: "POST",
             // url: "http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/addMetric",
             url: "http://maps.clarkcountynv.gov/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/addMetric",
            data: { app: rApp, RecordedAction: rAction }
        })
        .done(function(response) {
            // alert( "Data Saved: " + msg );

            if (rAction.substring(0, 10) == 'UserAgent:') {
                sessionNumber = response;
            }

            //  console.log('metric post success')
            //  console.log(sessionNumber)
        })
        .fail(function(response) {
            // console.log('metric post fail')
        });

}
//************************************************************************

// //******************* Street View Projections ****************************

// function projectToLatLong(evt) {

//   //grab input params
//   var pt = evt.mapPoint;

//   var x_coor =  pt.x;
//   var y_coor =  pt.y;


//   var findProjection_requestHandle = esri.request({
//     url: 'http://gisgate.co.clark.nv.us/gisdal/GISService.svc/jsonep/projectPoint',
//     // url: 'http://ccgisqa01m.co.clark.nv.us/gisdal/gisservice.svc/jsonep/projectPoint',
//     // url: 'http://ccgisqa01m.co.clark.nv.us/gisdal/gisservice.svc/jsonep/projectPoint',
//     content:
//     {
//       inputWKID: "3421",
//       outwkid : "4326",
//       Xcoordinate : x_coor,
//       Ycoordinate : y_coor

//     },
//     handleAs: "json",
//     load: projectToLatLongSucceeded,
//     error: function projectToLatLongFailed(error, io) { toast(error); }
//     }, true);
// }

// function projectToLatLongSucceeded(response, io) {

//   //On Lat/Long grab success, call to get panoid
//   panoidStreetview(response.yCoordinate,response.xCoordinate);

// }

// http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/Geometry/GeometryServer/project

//************************************************************************

//************************* Repo Map *************************************

//Takes care of checking if currentView is 'mapView'
//if it is, repo & resize the map
function repoMap() {
    map.reposition();
    map.resize();
    console.log('M [[ repo was hit ]]');
}

function resizeMap() {
    //   map.reposition();
    map.resize();
    console.log('M [[ resize was hit ]]');
}

//************************************************************************

//*************************** Theme **************************************
//check the theme
function themeCheck() {
    //  // if(localStorage.disclaim === "nodisclaim") {
    //  //     console.log("M [[ " + localStorage.disclaim + " ]]");
    //  //     return;
    //  // } else {
    //  //  $("#disclaimerDialog").dialog("open");
    //  //  console.log("M [[ fresh disclaimer ]]"); }

    //  if(localStorage.disclaim === "nodisclaim") {
    //      console.log("M [[ " + localStorage.disclaim + " ]]");
    //      return;
    //  } else {
    //   $("#disclaimerDialog").dialog("open");
    //   console.log("M [[ theme applied ]]"); 

    // }
}
//************************************************************************

//*************************** Disclaimer *********************************
//throw the disclaimer
function disclaimerCheck() {

    console.log('this is the localstorage val ' + localStorage.disclaim)
    
    if (localStorage.disclaim === "nodisclaim") {
        console.log("M [[ " + localStorage.disclaim + " ]]");
        return;
    } else {
        $("#disclaimerDialog").dialog("open");
        console.log("M [[ fresh disclaimer ]]");
    }
}
//************************************************************************

// //*************************** Persist Extent **************************
// //set the initialExtent variable
// function saveExtent() {
//     //create new extent object for storage
//     var spatialRef = new esri.SpatialReference({wkid:102707});
//       newExtent = new esri.geometry.Extent();
//       newExtent.xmin = map.extent.xmin;
//       newExtent.ymin = map.extent.ymin;
//       newExtent.xmax = map.extent.xmax;
//       newExtent.ymax = map.extent.ymax;
//       newExtent.spatialReference = spatialRef;

//       //Save in storage
//        localStorage.setItem("Xmin", map.extent.xmin);
//        localStorage.setItem("Ymin", map.extent.ymin);
//        localStorage.setItem("Xmax", map.extent.xmax);
//        localStorage.setItem("Ymax", map.extent.ymax);
// }

// extentInMem = true;

// function extentCheck() {
//     alert(JSON.stringify(localStorage.Xmin));
// }
// //*********************************************************************

//********************************* Ready ********************************
$(function() {
    ieBrowser = detectIE();
    console.log("M [[ ieBrowser: " + ieBrowser + " ]]");
});
//************************************************************************

//*************************** Detect IE **********************************
/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // IE 12 => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    // other browser
    return false;
}
//************************************************************************








