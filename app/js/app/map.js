
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
var slidePanelOpen; // flag set if panel is open or closed
var disclaimerFlag; //localStorage 
//basemap / layer defaults 
var basemap, abLayer, assessorServiceLayer, transportationServiceLayer;
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
//G streetview
var sv, panorama, myHome, wickedLocation, theLocal;

var isMax = 0;

// //PropSelect used in controllers.js executeQueryTask method for limiting new searches -
// // if they need a select property info info or just a pan to location
// var propselect = true; 

//universal coordinate system (used for query string persistence, 
//& mouse move & extenet change coor updates)
var coordSystem; //state-plane-ft || lat-long


require(["esri/map",

       // "esri/toolbars/draw", //added for tools
       // "esri/graphic", //added for tools
       // "esri/layers/ArcGISDynamicMapServiceLayer", //added for image layers
       // "esri/layers/ImageParameters", //added for image layers

       "esri/geometry/Point",

       "esri/geometry/webMercatorUtils",
       "esri/tasks/ProjectParameters",
       "esri/geometry/Geometry",
       "esri/geometry/Extent",
       "esri/SpatialReference",
       "esri/tasks/GeometryService",

       //https://developers.arcgis.com/javascript/jssamples/toolbar_draw.html
       "esri/toolbars/draw", //added for tools
       "esri/graphic", //added for tools
       "esri/symbols/SimpleMarkerSymbol", //added for tools
       "esri/symbols/SimpleLineSymbol", //added for tools
       "esri/symbols/SimpleFillSymbol", //added for tools

        "esri/dijit/Print", //added for print
        "esri/tasks/PrintTask", //added for print
        "esri/tasks/PrintTemplate",  //added for print

        "esri/dijit/Scalebar",
        "application/bootstrapmap",
        "esri/dijit/LocateButton", //added

        "esri/layers/FeatureLayer", //added for legend
        "esri/dijit/Legend", //added for legend
        "dojo/_base/array", //added for legend
        "dojo/parser", //added for legend

        "dojo/domReady!"],

    function (Map, Point, webMercatorUtils, ProjectParameters, geometry, Extent, SpatialReference, GeometryService, Draw, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Print, PrintTask, PrintTemplate, Scalebar, BootstrapMap, LocateButton, FeatureLayer, Legend, arrayUtils, parser) { //ADDED LEGEND FeatureLayer, Legend, arrayUtils, parser

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
     esriConfig.defaults.geometryService = new GeometryService("http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/Geometry/GeometryServer/");  


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
            "xmin" : 779321,
            "ymin" : 26759729,
            "xmax" : 786446,
            "ymax" : 26764499,
            "spatialReference" : {
                "wkid" : 102707
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
                logo : false,
                scrollWheelZoom: true,
                // sliderPosition: "top-right"//,
               sliderPosition: "bottom-right"//,
              // sliderOrientation: "horizontal",
              // sliderStyle: "large"

        });
        //disable arrow key panning
        map.on("load", function(){
          console.log("M [[ map loaded ]]");  
          // map.disableMapNavigation();  
          map.disableKeyboardNavigation();  
          // map.disablePan();  
          // map.disableRubberBandZoom();  
          // map.disableScrollWheelZoom();  

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

        function initToolbar(themap) {
          toolbar = new Draw(map);
          toolbar.on("draw-end", addToMap);
        }

        function addToMap(evt) {
          var symbol;
          toolbar.deactivate();
          // map.showZoomSlider();
          switch (evt.geometry.type) {
            case "point":
            case "multipoint":
              symbol = new SimpleMarkerSymbol();
              break;
            case "polyline":
              symbol = new SimpleLineSymbol();
              break;
            default:
              symbol = new SimpleFillSymbol();
              break;
          }
          var graphic = new Graphic(evt.geometry, symbol);
          // map.graphics.add(graphic);
          graphic.id = "highlight";

          console.log(graphic.id);

          // var graphic = new Graphic(evt.geometry, symbol);
          // map.graphics.add(graphic);
          addTheGraphics(graphic);
        }


        function addTheGraphics (graphic) {
          // var graphic = new Graphic(evt.geometry, symbol);
          map.graphics.add(graphic);
        }
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
        //-------------------------------------------------


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

        // template.layoutOptions = {
        //      legendLayers: [], // empty array means no legend
        //      scalebarUnit: "Feet",
        //      titleText: "PIN " + 'parcelPin',
        //      customTextElements: [
        //          {"physAddress" : 'printAddress'},
        //          {"ownerOne" : 'ownerOne'},
        //          {"ownerTwo" : 'ownerTwo'},
        //          {"mailAddress" : 'mailAddress'},
        //          {"mailCity" : 'mailCity'},
        //          {"mailState" : 'mailState'},
        //          {"mailZip" : 'mailZip'},
        //          {"propReal" : 'propReal'},
        //          {"calcAcre" : 'calcAcre'},
        //          {"landVal" : 'landVal'},
        //          {"buildVal" : 'buildVal'},
        //          {"assessVal" : 'assessVal'},
        //          {"marketVal" : 'marketVal'}
        //      ]
        //  };
            
        var params = new esri.tasks.PrintParameters();
        params.map = map;
        params.template = template;
        var printTask = new esri.tasks.PrintTask("http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");

      
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

        //export map
        var exportFormat = "PDF";
        var exportLayout = "MAP_ONLY";

        //print map
        var printPDFFormat = "PDF"
        var printPDFLayout = "A4 Landscape";

        var printPNGFormat = "png32"
        var printPNGLayout = "A4 Landscape";


        //------------------------------------------------
        //export map only pdf
        $( "#exportList" ).click(function() {

         // var template = new esri.tasks.PrintTemplate();
          template.format = exportFormat;
          template.layout = exportLayout;

          //Re-show map print & export load
          $("#loading-readyPNG").hide();
          $("#loading-image4").show();


            //working
           printTask.execute(params, exportResult);


          //export resolve
          function exportResult(result){
              console.log("M [[ export: " + result.url + " ]]");
              // window.open('http://www.google.com', "_blank");

              $("#exportMapLink_PNG").attr("href", result.url)

              $("#loading-readyPNG").show();
              $("#loading-image4").hide();

          };

        });
        //------------------------------------------------


        //------------------------------------------------
        // $( "#printMapLink" ).click(function() {
        $( "#printList" ).click(function() {

          //  var template = new esri.tasks.PrintTemplate();
            template.format = printPDFFormat;
            template.layout = printPDFLayout;


            //Re-show map print & export load
            $("#loading-readyPDFleg").hide();
            $("#loading-image2").show();

            $("#loading-readyPDF").hide();
            $("#loading-image3").show();


            // //Re-show map print & export load
            // $("#loading-readyPNG").hide();
            // $("#loading-image3").show();

            // $("li#PNGList").removeClass('enable_StreetList');
            // $("li#PNGList").addClass('disable_PrintPNGList');


            //Pause a few seconds then call the print task      
         //  setTimeout(function(){
              console.log("M [[ printing to PDF ]]");
              // printTask.execute(params, printResult, printError);

              //working
             printTask.execute(params, printResult);
            // $("#loading-readyPDF").show();
            // $("#loading-image2").hide();

          //  },2000);

          // //export to png resolve
          // setTimeout(function(){
          //    console.log("printing to PNG");
          //    // printTask.execute(params, printResult, printError);

          //    //Re-show map print & export load
          //    $("#loading-image3").show();
          //    $("#loading-readyPNG").hide();
             
          //  // $("#loading-readyPDF").show();
          //  // $("#loading-image2").hide();

          //  },2000);


        //print resolve
        function printResult(result){
            console.log("M [[ print: " + result.url + " ]]");
            // window.open('http://www.google.com', "_blank");

            $("#printMapLink_PDFleg").attr("href", result.url)

            $("#printMapLink_PDF").attr("href", result.url)

            
            $("#loading-readyPDFleg").show();
            $("#loading-image2").hide();

            $("#loading-readyPDF").show();
            $("#loading-image3").hide();

            // var _open = window.open(result.url, "_blank");
            //  if (_open == null || typeof(_open)=='undefined') {

            //     alert("Turn off your pop-up blocker!");
            //  }
               
             // else

            ///document.url(result.url)
        };

        });
        //------------------------------------------------







        //Basemap Layer (default)
        basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://gisgate.co.clark.nv.us/ArcGIS/rest/services/CACHED/mostcurrentflight/MapServer",{id:'basemap'});
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
        assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer",{id:'assessorServiceLayer'});
        // map.addLayer(assessorServiceLayer);

        //Transportation Layer
        // transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/Transportation/MapServer",{id:'transportationServiceLayer'});
        transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer",{id:'transportationServiceLayer'});

        //abLayer
        abLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/AB142/MapServer",{id:'abLayer'});
        
        //add map layers
        map.addLayers([basemap, assessorServiceLayer, transportationServiceLayer, abLayer]);


        //Boulder City Zoning Layer
        bcLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/5",{id:'bcLayer'});
        //Clark County Planned Landuse Layer
        PLULayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/PlanedLandUse/MapServer",{id:'PLULayer'});
        //Clark County Zoning Layer
        CCZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/8",{id:'CCZoningLayer'});
        //Contours 50 Meter Layer
        C50Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_50M/MapServer",{id:'C50Layer'});
        //Contours 2003 5ft (Valley) Layer
        C2003Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_03_5ft/MapServer",{id:'C2003Layer'});
        //Contours 1996 5ft (Valley) Layer
        C1996Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_96_5ft/MapServer",{id:'C1996Layer'});
        //Henderson Zoning Layer
        hendersonZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/6",{id:'lasVegasZoningLayer'});
        //Las Vegas Zoning Layer
        lasVegasZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/4",{id:'lasVegasZoningLayer'});
        //Mesquite Zoning Layer
        mesquiteZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/9",{id:'mesquiteZoningLayer'});
        //NLV Zoning Layer
        nlvZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/7",{id:'nlvZoningLayer'});
        //Seismic Layer
        seismicLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/SoilsGuideline/MapServer/5",{id:'seismicLayer'});
        //Soil Guideline Layer
        SoilLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/SoilsGuideline/MapServer",{id:'SoilLayer'});
        //Right-of-Way Layer
        rightofwayLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/RightOfWay/MapServer",{id:'rightofwayLayer'});
        

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
          }, "LocateButton"
        );
        geoLocate.startup();




        //ready
        $(document).ready(function () {

            //Resize call [repo: Reposition & Resize Map | adjustmapwidth: Update map width | sized: Expand/Retract slide panel for mob optimize]
            window.onresize = function () { sized();  }; //dynamicHeight(); COMMENTED OUT

            //desktop & mobile layout optimizations
            sized();


            //--------------------------------------------------------------------
            //Map State Manager

            //Listen for click
            dojo.connect(map, "onClick", function(evt) {

                if (functionMode == "identify") {

                     //Call to executeQueryTask
                     //Call the 'mapController' controller found on map element (pass in evt param)
                    // angular.element($('#mapDiv')).scope().executeQueryTask(evt);
                    angular.element($('#mapDiv')).scope().executeQueryTask(evt.mapPoint.x, evt.mapPoint.y,'select'); 
                    //true flag quantifies a select property call
                    //resolveAs: select | search

                    console.log(evt.mapPoint)

                     // //ADDED FOR MOBILE**************************************
                     // map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));

                     //ADDED FOR MOBILE**************************************
                     map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));


                    //log metric
                    postMetric(productCode,sessionNumber + ":Select Property");

                }
                if (functionMode == "draw") {
                    //Add stops
                  //  addStop(evt);
                } 
                // if (functionMode == "route") {
                //     //Add stops
                //     addStop(evt);
                // } 
                else { return; }


            });

            //Listen for mousemove
            dojo.connect(map, "onMouseMove", function(evt) {

                angular.element($('#mapDiv')).scope().mapevtMouseMove(evt.mapPoint.x,evt.mapPoint.y);

            });

            //Listen for extentchange
            map.on("extent-change", function (evt) {

                var point = map.extent.getCenter();
                var thelevel = map.getLevel(); //added
                angular.element($('#mapDiv')).scope().mapevtExtentChange(point.x,point.y,thelevel);

               // console.log(thelevel);

               // saveExtent();

              // console.log('save extent called ' + point.x + ' ' + point.y)

                // propInfoRepo_Second();
                setTimeout(function(){
                   //call to repo
                   propInfoRepo_Second();
                }, 100);


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

            map.on("layers-add-result", function (evt) {
              var layerInfo = arrayUtils.map(evt.layers, function (layer, index) {
                return {layer:layer.layer, title:layer.layer.name};
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

            // // margin-left:232px;

            // // .open > .dropdown-menu {

            //---------------------------------------------


            //listening on search 'x' close icon click
            $("#closeIcon").click(function (e) {

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
            initStreetView();

            //log metric
            postMetric(productCode,'UserAgent:' + navigator.userAgent.toString().toLowerCase());

        }); //end ready

    }); //end require
    //************************************************************************

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
    function initStreetView()
    {
      //init Google streetview
      sv = new google.maps.StreetViewService();
      panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

    }
    //***********************************************************************

    //***********************Post Metric*************************************

    //Log Metrics
    function postMetric(rApp, rAction)
    {

      $.ajax({
        // method: "POST",
        url: "http://gisgate.co.clark.nv.us/gismo/webservice/GISDataWCF/GISDataService.svc/jsonep/addMetric",
        data: { app: rApp, RecordedAction: rAction }
      })
        .done(function( response ) {
          // alert( "Data Saved: " + msg );

          if(rAction.substring(0,10)=='UserAgent:')
          {
          sessionNumber = response;
          }

        //  console.log('metric post success')
        //  console.log(sessionNumber)
        })
        .fail(function( response ) {
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

    //*************************** Theme *********************************
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
        if(localStorage.disclaim === "nodisclaim") {
            console.log("M [[ " + localStorage.disclaim + " ]]");
            return;
        } else {
         $("#disclaimerDialog").dialog("open");
         console.log("M [[ fresh disclaimer ]]"); }
    }
    //************************************************************************

    // //*************************** Persist Extent *****************************
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
    // //************************************************************************

    //********************************* Ready ********************************
    $(function() {
        ieBrowser = detectIE();
        console.log("M [[ ieBrowser: " + ieBrowser + " ]]");
    });
    //************************************************************************

    //*************************** Detect IE ***********************************
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
