

open.directive('toolsView', function() {

 return {
   // restrict:'E',
   link:function(scope,e,a){

     //Tools logic
     $(function() {

      //keeps dropdown menu from closing onclick of a list item
      $('.dropdown-menu').on('click', function(e){
              if($(this).hasClass('dropdown-menu-form')){
                  e.stopPropagation();
              }
      });


      ///https://css-tricks.com/dangers-stopping-event-propagation/
      // $(document).on('click', function(event) {
      //   if (!$(event.target).closest('#menucontainer').length) {
      //     // Hide the menus.
      //   }
      // });

      // $(document).on('click', function(event) {
      //   if (!$(event.target).closest('#tools-dropdown-menu-form').length) {
      //     // Hide the menus.
      //     console.log('keep menus up')

      //     //then the click was registered as coming from outside the tools downdrop,
      //     //in which case, we want to keep the menu up
      //             // if($(this).hasClass('tools-dropdown-menu-form')){
      //                 e.stopPropagation();
      //             // }

      //   }
      // });










      //buffer fill pass
      scope.bufferFillPass = function(theBufferFill) {

        //set the global bufferFill variable equal to the current chkbox model val
        bufferFill = theBufferFill;


       // console.log(bufferFill);

        // if (pass = true) {

        //   bufferFill = true;

        //  // map.showBufferFill();

        //         //  showBufferFill();
        // } //meaning, add a buffer fill
        // if (pass = false) {

        //   bufferFill = false;

        //  // map.showBufferFill();

        //         //  showBufferFill();
        // } //meaning, add a buffer fill



       


  
          //call to map.js buffer fill function to execute buffer fill logic

          // console.log(pass)

          // // console.log('testing')

          // console.log("C [[ searching: " + theSearch + " ]]");

          // $scope.executeSearch(theSearch);

          // //pass to ai.js as well
          // ai(theSearch);


        //  filterHelp_UL();
      };
























      // //Tool specific (references tempTools.html)
      // //Erase Graphics
      // $('#eraseBtn').click(function() {

      //   // map.clearGraphics();
      //   map.graphics.clear();

      //     // console.log('ihtrs');
      //     // map.graphics.remove('highlight');
      //     // map.graphics.clear();
      //     //first remove all graphics added directly to map
      //     // map.graphics.clear();

      //     // //now go into each graphic layer and clear it
      //     // var graphicLayerIds = map.graphicsLayerIds;
      //     // var len = graphicLayerIds.length;
      //     // for (var i = 0; i < len; i++) {
      //     //     var gLayer = map.getLayer(graphicLayerIds[i]);
      //     //     //clear this Layer
      //     //     gLayer.clear();
      //     // }
      // });
























      //************************************************************************

      //update tools designation -------------------------
      $(".toolSelect").click(function() {


         $("#currentToolTag").text($(this).attr('id'));

         // toolSelect
          // console.log(event.target.id);
          // var id = $(this).attr('id');
          console.log($(this).attr('id'));

      });



      // function updateCurrentTool(tool) {

      //    //update the current tool tag (info box)
      //    $("#currentToolTag").text(tool);

      // }

      // //keeps dropdown menu from closing onclick of a list item
      // $('.dropdown-menu').on('click', function(e){
      //         if($(this).hasClass('dropdown-menu-form')){
      //             e.stopPropagation();
      //         }
      // });











      // // function clearGraphics(evt) {
      // function clearGraphics() {
      //   // map.graphics.add(graphic);

      //    map.graphics.clear();
      // }

      // // //Remove previous graphic:
      // // //https://geonet.esri.com/thread/49058
      // // dojo.forEach(this.map.graphics.graphics, function(g) {  
      // //   if( g && g.id === "highlight" ) {  
      // //     //remove graphic with specific id  
      // //     this.map.graphics.remove(g);  
      // //   }  
      // // }, this);  





//       require([
//               "esri/map",
//                "esri/toolbars/draw", //added for tools
//                "esri/graphic", //added for tools
//                "esri/symbols/SimpleMarkerSymbol", //added for tools
//                "esri/symbols/SimpleLineSymbol", //added for tools
//                "esri/symbols/SimpleFillSymbol", //added for tools
//               "dojo/parser",
//               "dojo/domReady!"
//               ], function(
//                      Map, Draw, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, parser
//                    ) {
//                      parser.parse();



//                      //tool activation
//                      $('.toolBtn').click(function() {

// //                         //http://maps.rosreestr.ru/arcgis_js_api/sdk/help/jssamples/toolbar_draw.html


// //                         // var tool = this.label.toUpperCase().replace(/ /g, "_");
// //                         //           toolbar.activate(Draw[tool]);

// //                         var tool = $(this).val();
// //                         toolbar.activate($(this).val());
// // // esri.toolbars.Draw.POINT

// //                          // // alert($(this).val());

// //                          // // activateTool($(this).val());
// //                          // console.log($(this).val());

// //                          // // toolbar.activate(Draw[$(this).val()]);

// //                          // toolbar.activate(Draw[Point]);



// //                          // toolsView





//                      });




//                      });





      

      // $(document).ready(function() { 
      //        // $('#One').click(function() { 
      //        //     var text = $(this).attr('value'); 
                 
      //        //     console.log($("#input").val(text));
      //        // }); 

      //    $('.toolBtn').click(function() {
      //        alert($(this).val());
      //    });

      // }); 

































             //if the 'x' Toggle buttons are clicked
             $('#toolsToggle').click(function() {



              //added--------------------------
              panelCloseHit = true;




               if (slidePanelOpen) {

                   console.log('tools slide in clicked')



               //-------------------------------------------
               //Updating the Header positioning & Arrow (ALL)
               // $("#introHeader").css("left", -194 + "px");
               $("#introHeader").css("left", -201 + "px");
               $("#displayHeader").css("left", -201 + "px");
               $("#toolsHeader").css("left", -181 + "px");
               $("#resourcesHeader").css("left", -201 + "px");
               $(".esriScalebar").css("left", -201 + "px");


               //transforms
               $('#toolsToggle').addClass('toggleAdjust');
               $('#toolsHeader').addClass('headerAdjust');
               $('#logoTitle').addClass('titleAdjust');
               $('#search-form').addClass('searchFormAdjust');




               // $('#introToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
               $('#introToggle').toggleClass('ion-chevron-left ion-navicon-round');
               
               $('#displayToggle').toggleClass('ion-chevron-left ion-navicon-round');
               $('#toolsToggle').toggleClass('ion-chevron-left ion-navicon-round');
               $('#resourcesToggle').toggleClass('ion-chevron-left ion-navicon-round');

               $('#mainTabs').css("display", "none");
               $('.infoBlock').css("display", "none");
               //-------------------------------------------

                 // hide panel
                 $("#slidepanel").animate({
                     "marginLeft": "-=240px"
                 }, 0);
                 slidePanelOpen = false;
                 // change width of map to fill empty space left from collapse of sldide panel
                 $('#mapDiv').animate({
                   // "width": "-=150px"
                     "width": "+=240px"
                 }, 0, function() {
               // Animation complete.

               console.log('slide complete');


               //subtract 50pixels for now, update for full amount of side panel later
               document.getElementById('mapDiv').style.width = document.documentElement.clientWidth + "px";




               //Reposition & resize
                     //repoMap(); //commented out
                     map.reposition();
                     map.resize();
                   
                 });

             }
             else {

              //added--------------------------
              panelCloseHit = false;

              console.log('tools slide out clicked')



               //-------------------------------------------
               //Updating the Header positioning & Arrow (ALL)
               $("#introHeader").css("left", 0 + "px");
               $("#displayHeader").css("left", 0 + "px");
               $("#toolsHeader").css("left", 0 + "px");
               $("#resourcesHeader").css("left", 0 + "px");
               $(".esriScalebar").css("left", 19 + "px");


               //transforms
               $('#toolsToggle').removeClass('toggleAdjust');
               $('#toolsHeader').removeClass('headerAdjust');
               $('#logoTitle').removeClass('titleAdjust');
               $('#search-form').removeClass('searchFormAdjust');



               // $('#introToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
               $('#introToggle').toggleClass('ion-chevron-left ion-navicon-round');

               $('#displayToggle').toggleClass('ion-chevron-left ion-navicon-round');
               $('#toolsToggle').toggleClass('ion-chevron-left ion-navicon-round');
               $('#resourcesToggle').toggleClass('ion-chevron-left ion-navicon-round');
               
               
               $('#mainTabs').css("display", "block");
               $('.infoBlock').css("display", "block");
               //-------------------------------------------

                 $("#slidepanel").animate({
                   "marginLeft": "+=240px"
                 }, 0);
                 slidePanelOpen = true;
                 $('#mapDiv').animate({
                     "width": "-=240px"
                 }, 0, function() {
               // Animation complete.

               console.log('slide complete');

               //subtract 50pixels for now, update for full amount of side panel later
               document.getElementById('mapDiv').style.width = document.documentElement.clientWidth - 240 + "px";



               //Reposition & resize
                     //repoMap(); //commented out
                     map.reposition();
                     map.resize();


                 });

             }; //end of else



         });
































     

      //     //if the 'x' Toggle buttons are clicked
      //     $('#toolsToggle').click(function() {


      //     if (slidePanelOpen) {

      //       //-------------------------------------------
      //       //Updating the Header positioning & Arrow (ALL)
      //       // $("#introHeader").css("left", -194 + "px");
      //       $("#introHeader").css("left", -194 + "px");
      //       $("#displayHeader").css("left", -194 + "px");
      //       $("#toolsHeader").css("left", -194 + "px");
      //       $("#resourcesHeader").css("left", -194 + "px");


      //       //transforms
      //       $('#toolsToggle').addClass('toggleAdjust');
      //       $('#toolsHeader').addClass('headerAdjust');




      //       $('#introToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
      //       $('#displayToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
      //       $('#toolsToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
      //       $('#resourcesToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');

      //       $('#mainTabs').css("display", "none");
      //       $('.infoBlock').css("display", "none");
      //       //-------------------------------------------

      //         // hide panel
      //         $("#slidepanel").animate({
      //             "marginLeft": "-=240px"
      //         }, 350);
      //         slidePanelOpen = false;
      //         // change width of map to fill empty space left from collapse of sldide panel
      //         $('#mapDiv').animate({
      //           // "width": "-=150px"
      //             "width": "+=240px"
      //         }, 350, function() {
      //       // Animation complete.

      //       console.log('slide complete');


      //       //subtract 50pixels for now, update for full amount of side panel later
      //       document.getElementById('mapDiv').style.width = document.documentElement.clientWidth + "px";




      //       //Reposition & resize
      //             //repoMap(); //commented out
      //             map.reposition();
      //             map.resize();
                
      //         });

      //     }
      //     else {

      //       //-------------------------------------------
      //       //Updating the Header positioning & Arrow (ALL)
      //       $("#introHeader").css("left", 7 + "px");
      //       $("#displayHeader").css("left", 7 + "px");
      //       $("#toolsHeader").css("left", 7 + "px");
      //       $("#resourcesHeader").css("left", 7 + "px");


      //       //transforms
      //       $('#toolsToggle').removeClass('toggleAdjust');
      //       $('#toolsHeader').removeClass('headerAdjust');




      //       $('#introToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
      //       $('#displayToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
      //       $('#toolsToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
      //       $('#resourcesToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
            
      //       $('#mainTabs').css("display", "block");
      //       $('.infoBlock').css("display", "block");
      //       //-------------------------------------------

      //         $("#slidepanel").animate({
      //           "marginLeft": "+=240px"
      //         }, 350);
      //         slidePanelOpen = true;
      //         $('#mapDiv').animate({
      //             "width": "-=240px"
      //         }, 350, function() {
      //       // Animation complete.

      //       console.log('slide complete');

      //       //subtract 50pixels for now, update for full amount of side panel later
      //       document.getElementById('mapDiv').style.width = document.documentElement.clientWidth - 240 + "px";



      //       //Reposition & resize
      //             //repoMap(); //commented out
      //             map.reposition();
      //             map.resize();


      //         });

      //     }; //end of else



      // });


     })//-end Tools Logic



   },
   //link to template-------------------------------------
   templateUrl: 'views/tempTools.html'

 }

})
