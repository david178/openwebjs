


//************************************************
//***************** DISPLAY **********************
//************************************************

// {"name":"Aerial Imagery Only","id":1,"src":"http://gisgate.co.clark.nv.us/ArcGIS/rest/services/CACHED/mostcurrentflight/MapServer","etc":" "},
// {"name":"Assessor Map","id":2,"src":"http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer","etc":" "},
// {"name":"Boulder City Zoning","id":3,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/5","etc":" "},
// {"name":"Clark County PLU","id":4,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/PlanedLandUse/MapServer","etc":" "},
// {"name":"Clark County Zoning","id":5,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/8","etc":" "},
// {"name":"Contours 50 Meter","id":7,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_50M/MapServer","etc":" "},
// {"name":"Contours 2003 5ft (Valley)","id":8,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_03_5ft/MapServer","etc":" "},
// {"name":"Contours 1996 5ft (Valley)","id":9,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_96_5ft/MapServer","etc":" "},
// {"name":"Default","id":10,"src":"linkurl","etc":" "},
// {"name":"Henderson Zoning","id":11,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/6","etc":" "},
// {"name":"Las Vegas Zoning","id":12,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/4","etc":" "},
// {"name":"Mesquite Zoning","id":13,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/10","etc":" "},
// {"name":"North Las Vegas Zoning","id":14,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/7","etc":" "},
// {"name":"Seismic","id":15,"src":"linkurl","etc":" "},
// {"name":"Soil Guideline","id":16,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/SoilsGuideline/MapServer","etc":" "}


    // //Boulder City Zoning Layer
    // bcLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/5",{id:'bcLayer'});
    // //Clark County Planned Landuse Layer
    // PLULayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/PlanedLandUse/MapServer",{id:'PLULayer'});
    // //Clark County Zoning Layer
    // CCZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/8",{id:'CCZoningLayer'});
    // //Contours 50 Meter Layer
    // C50Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_50M/MapServer",{id:'C50Layer'});
    // //Contours 2003 5ft (Valley) Layer
    // C2003Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_03_5ft/MapServer",{id:'C2003Layer'});
    // //Contours 1996 5ft (Valley) Layer
    // C1996Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_96_5ft/MapServer",{id:'C1996Layer'});
    // //Henderson Zoning Layer
    // hendersonZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/6",{id:'lasVegasZoningLayer'});
    // //Las Vegas Zoning Layer
    // lasVegasZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/4",{id:'lasVegasZoningLayer'});
    // //Mesquite Zoning Layer
    // mesquiteZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/9",{id:'mesquiteZoningLayer'});
    // //NLV Zoning Layer
    // nlvZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/7",{id:'nlvZoningLayer'});
    // //Seismic Layer
    // seismicLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/SoilsGuideline/MapServer/5",{id:'seismicLayer'});
    // //Soil Guideline Layer
    // SoilLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/SoilsGuideline/MapServer",{id:'SoilLayer'});
    // //Right-of-Way Layer
    // rightofwayLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/RightOfWay/MapServer",{id:'rightofwayLayer'});
    





// //************************************************************************

// //update map view -------------------------
// function viewChange(viewName) {

//   //grabbing the active view
//   var viewName = viewName.toLowerCase();

//   //Levels of Layers
//   var layerUrlMain;
//   var layerUrlSecondary;
//   var layerUrlTertiary;

//   //grabbing current basemap
//   var currentBase = map.getLayer('basemap');
          

//   //grabbing and enumerating each layer
//   var layer = map.getLayer('basemap');
//   var layer2 = map.getLayer('PLULayer');
//   var layer3 = map.getLayer('CCZoningLayer');
//   var layer4 = map.getLayer('C50Layer');
//   var layer5 = map.getLayer('C2003Layer');
//   var layer6 = map.getLayer('C1996Layer');
//   var layer7 = map.getLayer('hendersonZoningLayer');
//   var layer8 = map.getLayer('lasVegasZoningLayer');
//   var layer9 = map.getLayer('mesquiteZoningLayer');
//   var layer10 = map.getLayer('nlvZoningLayer');
//   var layer11 = map.getLayer('seismicLayer');
//   var layer12 = map.getLayer('SoilLayer');
//   var layer13 = map.getLayer('rightofwayLayer');
//   var layer14 = map.getLayer('abLayer');

//   //removing basemap layer
//   map.removeLayer(layer);

//   //removing each enumerated layer
//   if (layer2) { map.removeLayer(layer2) }
//   if (layer3) { map.removeLayer(layer3) }
//   if (layer4) { map.removeLayer(layer4) }
//   if (layer5) { map.removeLayer(layer5) }
//   if (layer6) { map.removeLayer(layer6) }
//   if (layer7) { map.removeLayer(layer7) }
//   if (layer8) { map.removeLayer(layer8) }
//   if (layer9) { map.removeLayer(layer9) }
//   if (layer10) { map.removeLayer(layer10) }
//   if (layer11) { map.removeLayer(layer11) }
//   if (layer12) { map.removeLayer(layer12) }
//   if (layer13) { map.removeLayer(layer13) }
//   if (layer14) { map.removeLayer(layer14) }


//   //initiatializing assessor anno
//   var assessorannoServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/AssessorAnno/MapServer", { id: 'assessorannoServiceLayer' });
//   var abLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/AB142/MapServer", { id: 'abLayer' });






//    switch(viewName){
//        case 'aerial imagery only': //---------------------------------------


//            //remove all layers
//            map.removeAllLayers();


//            layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';

//            var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});


//            map.addLayers([basemap, abLayer]);


//            break;






//        case 'assessor map': //---------------------------------------


//            //remove all layers
//            map.removeAllLayers();

//            layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//            layerUrlSecondary = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//            layerUrlTertiary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';




//            var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

//           //Dynamic Map layers (default)
//           //Assessor Layer
//           assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
//           //Transportation Layer
//           transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'transportationServiceLayer'});
          


//            map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, abLayer]);


//            break;






//        case 'boulder city zoning': //---------------------------------------

//            require([
//                    "esri/layers/ArcGISDynamicMapServiceLayer",
//                    "esri/layers/ImageParameters"
//                  ], function (
//                    ArcGISDynamicMapServiceLayer, ImageParameters) {

//                   //Use the ImageParameters to set the visibleLayerIds layers in the map service 
//                   //during ArcGISDynamicMapServiceLayer construction.
//                   var imageParameters = new ImageParameters();
//                   imageParameters.layerIds = [5];
//                   imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
//                   //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

//                    //remove all layers
//                    map.removeAllLayers();

//                    primaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/';
//                    secondaryLayer = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//                    tertiaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';

//                    var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
//                    //Assessor Layer
//                    assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
//                    //Transportation Layer
//                    transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
                   
                  
//                    //Dynamic Map layers
//                    bcLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
//                      id:'bcLayer',
//                      "opacity" : 0.7,
//                      "imageParameters": imageParameters
//                     });

//                    map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, bcLayer, abLayer]);

//                  });


//                break;







//        case 'clark county plu': //---------------------------------------
               
//           layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//           layerUrlSecondary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/PlanedLandUse/MapServer';


//             var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});


//            //Dynamic Map layers
//            PLULayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{
//              id:'PLULayer',
//              "opacity" : 0.7//,
//            });

//              map.addLayers([basemap, PLULayer, assessorannoServiceLayer, abLayer]);



//            break;







//        case 'clark county zoning': //---------------------------------------


//        require([
//                "esri/layers/ArcGISDynamicMapServiceLayer",
//                "esri/layers/ImageParameters"
//              ], function (
//                ArcGISDynamicMapServiceLayer, ImageParameters) {

//               //Use the ImageParameters to set the visibleLayerIds layers in the map service 
//               //during ArcGISDynamicMapServiceLayer construction.
//               var imageParameters = new ImageParameters();
//               imageParameters.layerIds = [8];
//               imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
//               //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

//                //remove all layers
//                map.removeAllLayers();

//                primaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/';
//                secondaryLayer = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//                tertiaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';

//                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
//                //Assessor Layer
//                assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
//                //Transportation Layer
//                transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
               
              
//                //Dynamic Map layers
//                CCZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
//                  id:'CCZoningLayer',
//                  "opacity" : 0.7,
//                  "imageParameters": imageParameters
//                 });

//                map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, CCZoningLayer, abLayer]);

//              });


//            break;





 



//        case 'contours 50 meter': //---------------------------------------
          
//           //remove all layers
//           map.removeAllLayers();

//           layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//           layerUrlSecondary = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//           layerUrlTertiary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_50M/MapServer';



//             var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

//            //Assessor Layer
//            assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
//            //Dynamic Map layers
//            C50Layer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'C50Layer'});


//              map.addLayers([basemap, C50Layer, assessorServiceLayer, abLayer]);

//            break;




       



//        case 'contours 2016 2ft (valley)': //---------------------------------------
           

//           //remove all layers
//           map.removeAllLayers();

//           layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//           layerUrlSecondary = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//           layerUrlTertiary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con2016_2ft/MapServer';



//             var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

//            //Assessor Layer
//            assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
//            //Dynamic Map layers
//            C2016Layer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'C2016Layer'});


//           map.addLayers([basemap, C2016Layer, assessorServiceLayer, abLayer]);

//            break;






//        case 'contours 2003 5ft (valley)': //---------------------------------------
           

//           //remove all layers
//           map.removeAllLayers();

//           layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//           layerUrlSecondary = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//           layerUrlTertiary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_03_5ft/MapServer';




//             var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

//            //Assessor Layer
//            assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
//            //Dynamic Map layers
//            C2003Layer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'C2003Layer'});


//           map.addLayers([basemap, C2003Layer, assessorServiceLayer, abLayer]);

//            break;






//        case 'contours 1996 5ft (valley)': //---------------------------------------
           
//           //remove all layers
//           map.removeAllLayers();

//           layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//           layerUrlSecondary = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//           layerUrlTertiary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_96_5ft/MapServer';




//             var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

//           //Assessor Layer
//           assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
//            //Dynamic Map layers
//            C1996Layer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'C1996Layer'});


//           map.addLayers([basemap, C1996Layer, assessorServiceLayer, abLayer]);

//            break;






//        case 'default': //---------------------------------------

//             //remove all layers
//             map.removeAllLayers();

//             layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//             layerUrlSecondary = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//             layerUrlTertiary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';




//             var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

//            //Dynamic Map layers (default)
//            //Assessor Layer
//            assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
//            //Transportation Layer
//            transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'transportationServiceLayer'});
           

           

//             map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, abLayer]);


//            break;







//        case 'henderson zoning': //---------------------------------------


//        require([
//                "esri/layers/ArcGISDynamicMapServiceLayer",
//                "esri/layers/ImageParameters"
//              ], function (
//                ArcGISDynamicMapServiceLayer, ImageParameters) {

//               //Use the ImageParameters to set the visibleLayerIds layers in the map service 
//               //during ArcGISDynamicMapServiceLayer construction.
//               var imageParameters = new ImageParameters();
//               imageParameters.layerIds = [6];
//               imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
//               //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

//                //remove all layers
//                map.removeAllLayers();

//                primaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/';
//                secondaryLayer = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//                tertiaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';

//                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
//                //Assessor Layer
//                assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
//                //Transportation Layer
//                transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
               
              
//                //Dynamic Map layers
//                hendersonZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
//                  id:'hendersonZoningLayer',
//                  "opacity" : 0.7,
//                  "imageParameters": imageParameters
//                 });

//                map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, hendersonZoningLayer, abLayer]);

//              });


//            break;








//        case 'las vegas zoning': //---------------------------------------
           

//        require([
//                "esri/layers/ArcGISDynamicMapServiceLayer",
//                "esri/layers/ImageParameters"
//              ], function (
//                ArcGISDynamicMapServiceLayer, ImageParameters) {

//               //Use the ImageParameters to set the visibleLayerIds layers in the map service 
//               //during ArcGISDynamicMapServiceLayer construction.
//               var imageParameters = new ImageParameters();
//               imageParameters.layerIds = [4];
//               imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
//               //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

//                //remove all layers
//                map.removeAllLayers();

//                primaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/';
//                secondaryLayer = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//                tertiaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';

//                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
//                //Assessor Layer
//                assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
//                //Transportation Layer
//                transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
               
              
//                //Dynamic Map layers
//                lasVegasZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
//                  id:'lasVegasZoningLayer',
//                  "opacity" : 0.7,
//                  "imageParameters": imageParameters
//                 });

//                map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, lasVegasZoningLayer, abLayer]);

//              });


//            break;







//        case 'mesquite zoning': //---------------------------------------
           

//        require([
//                "esri/layers/ArcGISDynamicMapServiceLayer",
//                "esri/layers/ImageParameters"
//              ], function (
//                ArcGISDynamicMapServiceLayer, ImageParameters) {

//               //Use the ImageParameters to set the visibleLayerIds layers in the map service 
//               //during ArcGISDynamicMapServiceLayer construction.
//               var imageParameters = new ImageParameters();
//               imageParameters.layerIds = [9];
//               imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
//               //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

//                //remove all layers
//                map.removeAllLayers();

//                primaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/';
//                secondaryLayer = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//                tertiaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';

//                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
//                //Assessor Layer
//                assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
//                //Transportation Layer
//                transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
               
              
//                //Dynamic Map layers
//                mesquiteZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
//                  id:'mesquiteZoningLayer',
//                  "opacity" : 0.7,
//                  "imageParameters": imageParameters
//                 });

//                map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, mesquiteZoningLayer, abLayer]);

//              });


//            break;








//        case 'north las vegas zoning': //---------------------------------------

//        require([
//                "esri/layers/ArcGISDynamicMapServiceLayer",
//                "esri/layers/ImageParameters"
//              ], function (
//                ArcGISDynamicMapServiceLayer, ImageParameters) {

//               //Use the ImageParameters to set the visibleLayerIds layers in the map service 
//               //during ArcGISDynamicMapServiceLayer construction.
//               var imageParameters = new ImageParameters();
//               imageParameters.layerIds = [7];
//               imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
//               //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

//                //remove all layers
//                map.removeAllLayers();

//                primaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/';
//                secondaryLayer = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//                tertiaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';

//                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
//                //Assessor Layer
//                assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
//                //Transportation Layer
//                transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
               
              
//                //Dynamic Map layers
//                nlvZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
//                  id:'nlvZoningLayer',
//                  "opacity" : 0.7,
//                  "imageParameters": imageParameters
//                 });

//                map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, nlvZoningLayer, abLayer]);

//              });


//            break;








//        case 'seismic': //---------------------------------------


//        require([
//                "esri/layers/ArcGISDynamicMapServiceLayer",
//                "esri/layers/ImageParameters"
//              ], function (
//                ArcGISDynamicMapServiceLayer, ImageParameters) {

//               //Use the ImageParameters to set the visibleLayerIds layers in the map service 
//               //during ArcGISDynamicMapServiceLayer construction.
//               var imageParameters = new ImageParameters();
//               imageParameters.layerIds = [5];
//               imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
//               //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

//                //remove all layers
//                map.removeAllLayers();

//                primaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/';
//                secondaryLayer = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//                tertiaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';

//                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
//                //Assessor Layer
//                assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
//                //Transportation Layer
//                transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
               
              
//                //Dynamic Map layers
//                seismicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
//                  id:'seismicLayer',
//                  "opacity" : 0.7,
//                  "imageParameters": imageParameters
//                 });

//                map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, seismicLayer, abLayer]);

//              });


//            break;








//        case 'soil guideline': //---------------------------------------
           

//           //remove all layers
//           map.removeAllLayers();

//           layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//           layerUrlSecondary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/SoilsGuideline/MapServer';



//             var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

//            //Dynamic Map layers
//            SoilLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{
//              id:'SoilLayer',
//              "opacity" : 0.7//,
//            });



//           map.addLayers([basemap, SoilLayer, assessorannoServiceLayer, abLayer]);


//           break;









//        default: //---------------------------------------

//           //default case is same as 'default'

//           //remove all layers
//           map.removeAllLayers();

//           layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//           layerUrlSecondary = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//           layerUrlTertiary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';


//           var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

//          //Dynamic Map layers (default)
//          //Assessor Layer
//          assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
//          //Transportation Layer
//          transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'transportationServiceLayer'});
         

         

//           map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, abLayer]);
            
//           break;






//    }


//    console.log(' -------------------- ' + viewName + ' -------------------- ');
//    console.log('layerUrlMain: ' + layerUrlMain)
//    console.log('layerUrlSecondary: ' + layerUrlSecondary)
//    console.log('layerUrlTertiary: ' + layerUrlTertiary)


//    //update the current flight tag (info box)
//    $("#currentViewTag").text(viewName);


// }


















// //update map flight -------------------------
// function flightChange(flight) {

//   console.log(flight.name);

//   // var flightURL = flight.src;
//   var flightName = flight.name;


//   var layerUrl;

//   var layer = map.getLayer('basemap');
//   map.removeLayer(layer);


// // console.log('testtttty')


//   switch(flightName){
//       // case "Most Current Flight":
//       case $scope.layerListsNAME[0]:
//         layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';

//         console.log('testtttt')
//         break;
//     }


//       var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrl,{id:'basemap'});
//       map.addLayer(basemap,0);


//       //update the current flight tag (info box)
//       $("#currentFlightTag").text(flightName);


// }
//************************************************************************






















































































//----------------------------------------------------------------------------------------------------



// //************************************************
// //***************** DISPLAY **********************
// //************************************************

// // {"name":"Aerial Imagery Only","id":1,"src":"http://gisgate.co.clark.nv.us/ArcGIS/rest/services/CACHED/mostcurrentflight/MapServer","etc":" "},
// // {"name":"Assessor Map","id":2,"src":"http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer","etc":" "},
// // {"name":"Boulder City Zoning","id":3,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/5","etc":" "},
// // {"name":"Clark County PLU","id":4,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/PlanedLandUse/MapServer","etc":" "},
// // {"name":"Clark County Zoning","id":5,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/8","etc":" "},
// // {"name":"Contours 50 Meter","id":7,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_50M/MapServer","etc":" "},
// // {"name":"Contours 2003 5ft (Valley)","id":8,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_03_5ft/MapServer","etc":" "},
// // {"name":"Contours 1996 5ft (Valley)","id":9,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_96_5ft/MapServer","etc":" "},
// // {"name":"Default","id":10,"src":"linkurl","etc":" "},
// // {"name":"Henderson Zoning","id":11,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/6","etc":" "},
// // {"name":"Las Vegas Zoning","id":12,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/4","etc":" "},
// // {"name":"Mesquite Zoning","id":13,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/10","etc":" "},
// // {"name":"North Las Vegas Zoning","id":14,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/7","etc":" "},
// // {"name":"Seismic","id":15,"src":"linkurl","etc":" "},
// // {"name":"Soil Guideline","id":16,"src":"http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/SoilsGuideline/MapServer","etc":" "}


//     // //Boulder City Zoning Layer
//     // bcLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/5",{id:'bcLayer'});
//     // //Clark County Planned Landuse Layer
//     // PLULayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/PlanedLandUse/MapServer",{id:'PLULayer'});
//     // //Clark County Zoning Layer
//     // CCZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/8",{id:'CCZoningLayer'});
//     // //Contours 50 Meter Layer
//     // C50Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_50M/MapServer",{id:'C50Layer'});
//     // //Contours 2003 5ft (Valley) Layer
//     // C2003Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_03_5ft/MapServer",{id:'C2003Layer'});
//     // //Contours 1996 5ft (Valley) Layer
//     // C1996Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_96_5ft/MapServer",{id:'C1996Layer'});
//     // //Henderson Zoning Layer
//     // hendersonZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/6",{id:'lasVegasZoningLayer'});
//     // //Las Vegas Zoning Layer
//     // lasVegasZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/4",{id:'lasVegasZoningLayer'});
//     // //Mesquite Zoning Layer
//     // mesquiteZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/9",{id:'mesquiteZoningLayer'});
//     // //NLV Zoning Layer
//     // nlvZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/7",{id:'nlvZoningLayer'});
//     // //Seismic Layer
//     // seismicLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/SoilsGuideline/MapServer/5",{id:'seismicLayer'});
//     // //Soil Guideline Layer
//     // SoilLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/SoilsGuideline/MapServer",{id:'SoilLayer'});
//     // //Right-of-Way Layer
//     // rightofwayLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/RightOfWay/MapServer",{id:'rightofwayLayer'});
    





// //************************************************************************

// //update map view -------------------------
// function viewChange(viewName) {

//   //grabbing the active view
//   var viewName = viewName.toLowerCase();

//   //Levels of Layers
//   var layerUrlMain;
//   var layerUrlSecondary;
//   var layerUrlTertiary;

//   //grabbing current basemap
//   var currentBase = map.getLayer('basemap');
          

//   //grabbing and enumerating each layer
//   var layer = map.getLayer('basemap');
//   var layer2 = map.getLayer('PLULayer');
//   var layer3 = map.getLayer('CCZoningLayer');
//   var layer4 = map.getLayer('C50Layer');
//   var layer5 = map.getLayer('C2003Layer');
//   var layer6 = map.getLayer('C1996Layer');
//   var layer7 = map.getLayer('hendersonZoningLayer');
//   var layer8 = map.getLayer('lasVegasZoningLayer');
//   var layer9 = map.getLayer('mesquiteZoningLayer');
//   var layer10 = map.getLayer('nlvZoningLayer');
//   var layer11 = map.getLayer('seismicLayer');
//   var layer12 = map.getLayer('SoilLayer');
//   var layer13 = map.getLayer('rightofwayLayer');
//   var layer14 = map.getLayer('abLayer');

//   //removing basemap layer
//   map.removeLayer(layer);

//   //removing each enumerated layer
//   if (layer2) { map.removeLayer(layer2) }
//   if (layer3) { map.removeLayer(layer3) }
//   if (layer4) { map.removeLayer(layer4) }
//   if (layer5) { map.removeLayer(layer5) }
//   if (layer6) { map.removeLayer(layer6) }
//   if (layer7) { map.removeLayer(layer7) }
//   if (layer8) { map.removeLayer(layer8) }
//   if (layer9) { map.removeLayer(layer9) }
//   if (layer10) { map.removeLayer(layer10) }
//   if (layer11) { map.removeLayer(layer11) }
//   if (layer12) { map.removeLayer(layer12) }
//   if (layer13) { map.removeLayer(layer13) }
//   if (layer14) { map.removeLayer(layer14) }


//   //initiatializing assessor anno
//   var assessorannoServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/AssessorAnno/MapServer", { id: 'assessorannoServiceLayer' });
//   var abLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/AB142/MapServer", { id: 'abLayer' });






//    switch(viewName){
//        case 'aerial imagery only': //---------------------------------------


//            //remove all layers
//            map.removeAllLayers();


//            layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';

//            var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});


//            map.addLayers([basemap, abLayer]);


//            break;






//        case 'assessor map': //---------------------------------------


//            //remove all layers
//            map.removeAllLayers();

//            layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//            layerUrlSecondary = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//            layerUrlTertiary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';




//            var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

//           //Dynamic Map layers (default)
//           //Assessor Layer
//           assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
//           //Transportation Layer
//           transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'transportationServiceLayer'});
          


//            map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, abLayer]);


//            break;






//        case 'boulder city zoning': //---------------------------------------

//            require([
//                    "esri/layers/ArcGISDynamicMapServiceLayer",
//                    "esri/layers/ImageParameters"
//                  ], function (
//                    ArcGISDynamicMapServiceLayer, ImageParameters) {

//                   //Use the ImageParameters to set the visibleLayerIds layers in the map service 
//                   //during ArcGISDynamicMapServiceLayer construction.
//                   var imageParameters = new ImageParameters();
//                   imageParameters.layerIds = [5];
//                   imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
//                   //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

//                    //remove all layers
//                    map.removeAllLayers();

//                    primaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/';
//                    secondaryLayer = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//                    tertiaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';

//                    var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
//                    //Assessor Layer
//                    assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
//                    //Transportation Layer
//                    transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
                   
                  
//                    //Dynamic Map layers
//                    bcLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
//                      id:'bcLayer',
//                      "opacity" : 0.7,
//                      "imageParameters": imageParameters
//                     });

//                    map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, bcLayer, abLayer]);

//                  });


//                break;







//        case 'clark county plu': //---------------------------------------
               
//           layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//           layerUrlSecondary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/PlanedLandUse/MapServer';


//             var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});


//            //Dynamic Map layers
//            PLULayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{
//              id:'PLULayer',
//              "opacity" : 0.7//,
//            });

//              map.addLayers([basemap, PLULayer, assessorannoServiceLayer, abLayer]);



//            break;







//        case 'clark county zoning': //---------------------------------------


//        require([
//                "esri/layers/ArcGISDynamicMapServiceLayer",
//                "esri/layers/ImageParameters"
//              ], function (
//                ArcGISDynamicMapServiceLayer, ImageParameters) {

//               //Use the ImageParameters to set the visibleLayerIds layers in the map service 
//               //during ArcGISDynamicMapServiceLayer construction.
//               var imageParameters = new ImageParameters();
//               imageParameters.layerIds = [8];
//               imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
//               //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

//                //remove all layers
//                map.removeAllLayers();

//                primaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/';
//                secondaryLayer = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//                tertiaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';

//                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
//                //Assessor Layer
//                assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
//                //Transportation Layer
//                transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
               
              
//                //Dynamic Map layers
//                CCZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
//                  id:'CCZoningLayer',
//                  "opacity" : 0.7,
//                  "imageParameters": imageParameters
//                 });

//                map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, CCZoningLayer, abLayer]);

//              });


//            break;





 



//        case 'contours 50 meter': //---------------------------------------
          
//           //remove all layers
//           map.removeAllLayers();

//           layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//           layerUrlSecondary = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//           layerUrlTertiary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_50M/MapServer';



//             var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

//            //Assessor Layer
//            assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
//            //Dynamic Map layers
//            C50Layer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'C50Layer'});


//              map.addLayers([basemap, C50Layer, assessorServiceLayer, abLayer]);

//            break;




       



//        case 'contours 2016 2ft (valley)': //---------------------------------------
           

//           //remove all layers
//           map.removeAllLayers();

//           layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//           layerUrlSecondary = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//           layerUrlTertiary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con2016_2ft/MapServer';



//             var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

//            //Assessor Layer
//            assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
//            //Dynamic Map layers
//            C2016Layer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'C2016Layer'});


//           map.addLayers([basemap, C2016Layer, assessorServiceLayer, abLayer]);

//            break;






//        case 'contours 2003 5ft (valley)': //---------------------------------------
           

//           //remove all layers
//           map.removeAllLayers();

//           layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//           layerUrlSecondary = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//           layerUrlTertiary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_03_5ft/MapServer';




//             var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

//            //Assessor Layer
//            assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
//            //Dynamic Map layers
//            C2003Layer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'C2003Layer'});


//           map.addLayers([basemap, C2003Layer, assessorServiceLayer, abLayer]);

//            break;






//        case 'contours 1996 5ft (valley)': //---------------------------------------
           
//           //remove all layers
//           map.removeAllLayers();

//           layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//           layerUrlSecondary = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//           layerUrlTertiary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/con_96_5ft/MapServer';




//             var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

//           //Assessor Layer
//           assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
//            //Dynamic Map layers
//            C1996Layer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'C1996Layer'});


//           map.addLayers([basemap, C1996Layer, assessorServiceLayer, abLayer]);

//            break;






//        case 'default': //---------------------------------------

//             //remove all layers
//             map.removeAllLayers();

//             layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//             layerUrlSecondary = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//             layerUrlTertiary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';




//             var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

//            //Dynamic Map layers (default)
//            //Assessor Layer
//            assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
//            //Transportation Layer
//            transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'transportationServiceLayer'});
           

           

//             map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, abLayer]);


//            break;







//        case 'henderson zoning': //---------------------------------------


//        require([
//                "esri/layers/ArcGISDynamicMapServiceLayer",
//                "esri/layers/ImageParameters"
//              ], function (
//                ArcGISDynamicMapServiceLayer, ImageParameters) {

//               //Use the ImageParameters to set the visibleLayerIds layers in the map service 
//               //during ArcGISDynamicMapServiceLayer construction.
//               var imageParameters = new ImageParameters();
//               imageParameters.layerIds = [6];
//               imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
//               //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

//                //remove all layers
//                map.removeAllLayers();

//                primaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/';
//                secondaryLayer = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//                tertiaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';

//                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
//                //Assessor Layer
//                assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
//                //Transportation Layer
//                transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
               
              
//                //Dynamic Map layers
//                hendersonZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
//                  id:'hendersonZoningLayer',
//                  "opacity" : 0.7,
//                  "imageParameters": imageParameters
//                 });

//                map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, hendersonZoningLayer, abLayer]);

//              });


//            break;








//        case 'las vegas zoning': //---------------------------------------
           

//        require([
//                "esri/layers/ArcGISDynamicMapServiceLayer",
//                "esri/layers/ImageParameters"
//              ], function (
//                ArcGISDynamicMapServiceLayer, ImageParameters) {

//               //Use the ImageParameters to set the visibleLayerIds layers in the map service 
//               //during ArcGISDynamicMapServiceLayer construction.
//               var imageParameters = new ImageParameters();
//               imageParameters.layerIds = [4];
//               imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
//               //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

//                //remove all layers
//                map.removeAllLayers();

//                primaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/';
//                secondaryLayer = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//                tertiaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';

//                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
//                //Assessor Layer
//                assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
//                //Transportation Layer
//                transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
               
              
//                //Dynamic Map layers
//                lasVegasZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
//                  id:'lasVegasZoningLayer',
//                  "opacity" : 0.7,
//                  "imageParameters": imageParameters
//                 });

//                map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, lasVegasZoningLayer, abLayer]);

//              });


//            break;







//        case 'mesquite zoning': //---------------------------------------
           

//        require([
//                "esri/layers/ArcGISDynamicMapServiceLayer",
//                "esri/layers/ImageParameters"
//              ], function (
//                ArcGISDynamicMapServiceLayer, ImageParameters) {

//               //Use the ImageParameters to set the visibleLayerIds layers in the map service 
//               //during ArcGISDynamicMapServiceLayer construction.
//               var imageParameters = new ImageParameters();
//               imageParameters.layerIds = [9];
//               imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
//               //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

//                //remove all layers
//                map.removeAllLayers();

//                primaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/';
//                secondaryLayer = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//                tertiaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';

//                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
//                //Assessor Layer
//                assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
//                //Transportation Layer
//                transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
               
              
//                //Dynamic Map layers
//                mesquiteZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
//                  id:'mesquiteZoningLayer',
//                  "opacity" : 0.7,
//                  "imageParameters": imageParameters
//                 });

//                map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, mesquiteZoningLayer, abLayer]);

//              });


//            break;








//        case 'north las vegas zoning': //---------------------------------------

//        require([
//                "esri/layers/ArcGISDynamicMapServiceLayer",
//                "esri/layers/ImageParameters"
//              ], function (
//                ArcGISDynamicMapServiceLayer, ImageParameters) {

//               //Use the ImageParameters to set the visibleLayerIds layers in the map service 
//               //during ArcGISDynamicMapServiceLayer construction.
//               var imageParameters = new ImageParameters();
//               imageParameters.layerIds = [7];
//               imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
//               //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

//                //remove all layers
//                map.removeAllLayers();

//                primaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/';
//                secondaryLayer = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//                tertiaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';

//                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
//                //Assessor Layer
//                assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
//                //Transportation Layer
//                transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
               
              
//                //Dynamic Map layers
//                nlvZoningLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
//                  id:'nlvZoningLayer',
//                  "opacity" : 0.7,
//                  "imageParameters": imageParameters
//                 });

//                map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, nlvZoningLayer, abLayer]);

//              });


//            break;








//        case 'seismic': //---------------------------------------


//        require([
//                "esri/layers/ArcGISDynamicMapServiceLayer",
//                "esri/layers/ImageParameters"
//              ], function (
//                ArcGISDynamicMapServiceLayer, ImageParameters) {

//               //Use the ImageParameters to set the visibleLayerIds layers in the map service 
//               //during ArcGISDynamicMapServiceLayer construction.
//               var imageParameters = new ImageParameters();
//               imageParameters.layerIds = [5];
//               imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
//               //can also be: LAYER_OPTION_EXCLUDE, LAYER_OPTION_HIDE, LAYER_OPTION_INCLUDE

//                //remove all layers
//                map.removeAllLayers();

//                primaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/Zoning/MapServer/';
//                secondaryLayer = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//                tertiaryLayer = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';

//                var basemap = new esri.layers.ArcGISTiledMapServiceLayer(currentBase.url,{id:'basemap'});
//                //Assessor Layer
//                assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(secondaryLayer,{id:'assessorServiceLayer'});
//                //Transportation Layer
//                transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(tertiaryLayer,{id:'transportationServiceLayer'});
               
              
//                //Dynamic Map layers
//                seismicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(primaryLayer,{
//                  id:'seismicLayer',
//                  "opacity" : 0.7,
//                  "imageParameters": imageParameters
//                 });

//                map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, seismicLayer, abLayer]);

//              });


//            break;








//        case 'soil guideline': //---------------------------------------
           

//           //remove all layers
//           map.removeAllLayers();

//           layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//           layerUrlSecondary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/SoilsGuideline/MapServer';



//             var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

//            //Dynamic Map layers
//            SoilLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{
//              id:'SoilLayer',
//              "opacity" : 0.7//,
//            });



//           map.addLayers([basemap, SoilLayer, assessorannoServiceLayer, abLayer]);


//           break;









//        default: //---------------------------------------

//           //default case is same as 'default'

//           //remove all layers
//           map.removeAllLayers();

//           layerUrlMain = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//           layerUrlSecondary = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/GISMO/AssessorMap/MapServer';
//           layerUrlTertiary = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/GISMO/scl/MapServer';


//           var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrlMain,{id:'basemap'});

//          //Dynamic Map layers (default)
//          //Assessor Layer
//          assessorServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlSecondary,{id:'assessorServiceLayer'});
//          //Transportation Layer
//          transportationServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerUrlTertiary,{id:'transportationServiceLayer'});
         

         

//           map.addLayers([basemap, assessorServiceLayer, assessorannoServiceLayer, transportationServiceLayer, abLayer]);
            
//           break;






//    }


//    console.log(' -------------------- ' + viewName + ' -------------------- ');
//    console.log('layerUrlMain: ' + layerUrlMain)
//    console.log('layerUrlSecondary: ' + layerUrlSecondary)
//    console.log('layerUrlTertiary: ' + layerUrlTertiary)


//    //update the current flight tag (info box)
//    $("#currentViewTag").text(viewName);


// }


















// //update map flight -------------------------
// function flightChange(flight) {

//   console.log(flight.name);

//   // var flightURL = flight.src;
//   var flightName = flight.name;


//   var layerUrl;

//   var layer = map.getLayer('basemap');
//   map.removeLayer(layer);




//     switch(flightName){
//         case "Most Current Flight":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/mostcurrentflight/MapServer';
//           break;
//         case "Spring 2016":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS16_1/MapServer';
//           break;
//         case "Spring 2015":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS15/MapServer';
//           break;
//         case "Spring 2014":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS14/MapServer';
//           break;
//         case "NAIP 2013":
//           layerUrl = 'http://gisgate.co.clark.nv.us/ArcGIS/rest/services/CACHED/imagesNAIP13/MapServer';
//           break;
//         case "Spring 2013":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS13/MapServer';
//           break;
//         case "Spring 2012":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS12/MapServer';
//           break;
//         case "Fall 2011":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF11/MapServer';
//           break;
//         case "Spring 2011 (6 in.)":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesSNWAS11/MapServer';
//           break;
//         case "Fall 2010 (6 in.)":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesSNWAF10/MapServer';
//           break;
//         case "NAIP 2010":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesNAIP10/MapServer';
//           break;
//         case "Spring 2010":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS10/MapServer';
//           break;
//         case "Fall 2009":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF09/MapServer';
//           break;
//         case "Spring 2009":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS09/MapServer';
//           break;
//         case "Fall 2008":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF08/MapServer';
//           break;
//         case "Spring 2008":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS08/MapServer';
//           break;
//         case "Fall 2007":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF07/MapServer';
//           break;
//         case "Spring 2007":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS07/MapServer';
//           break;
//         case "Fall 2006":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF06/MapServer';
//           break;
//         case "Spring 2006":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS06/MapServer';
//           break;
//         case "Fall 2005":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF05/MapServer';
//           break;
//         case "Spring 2005":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS05/MapServer';
//           break;
//         case "Fall 2004":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF04/MapServer';
//           break;
//         case "Spring 2004":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS04/MapServer';
//           break;
//         case "Fall 2003":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF03/MapServer';
//           break;
//         case "Spring 2003":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS03/MapServer';
//           break;
//         case "Fall 2002":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF02/MapServer';
//           break;
//         case "Spring 2002":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS02/MapServer';
//           break;
//         case "Fall 2001":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF01/MapServer';
//           break;
//         case "Spring 2001":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS01/MapServer';
//           break;
//         case "Fall 2000":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF00/MapServer';
//           break;
//         case "Spring 2000":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS00/MapServer';
//           break;
//         case "Fall 1999":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF99/MapServer';
//           break;
//         case "Spring 1999":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesS99/MapServer';
//           break;
//         case "Fall 1998":
//           layerUrl = 'http://gisgate.co.clark.nv.us/arcgis/rest/services/CACHED/imagesF98/MapServer';
//           break;


//       }
//       var basemap = new esri.layers.ArcGISTiledMapServiceLayer(layerUrl,{id:'basemap'});
//       map.addLayer(basemap,0);


//       //update the current flight tag (info box)
//       $("#currentFlightTag").text(flightName);


// }
// //************************************************************************














