

open.directive('displayView', function() {

 return {
   restrict:'E',
   link:function(scope,e,a){





     $(function() {

          //add-remove Right-of-Way Layer
          $('.addremoveROW').on('change', function(e){
              if ($("#rightwayBox").is(':checked')) {
                  map.addLayer(rightofwayLayer);
              }
              else {
                  map.removeLayer(rightofwayLayer);
              }
          });


          //user over-ride to hide streetview widget
          $('.strViewOverrides').on('click', function(e){
            if(strViewOverride === true) {
                strViewOverride = false;
            }
            else {
                strViewOverride = true;
            }
          });


          //weather
          //view-source:http://www.onextrapixel.com/examples/jquery-yql-weather/

          // //------------------------------------------------------------
          // //adjusts positioning for display view associated blocks (legend, weather)
          // $('.legPosOverrides').on('click', function(e){
          //   //closeLegIcon

          //   console.log('legend click hit')




          //   //if weather casing is active
          //   if ($("#weatherDivCasing").is(":visible")) {

          //     console.log('legend click hit - weather is vis ')


          //       $('#weatherDivCasing').css({
          //         'top': 0,
          //         'right': 0
          //         });

          //       $('#legendDivCasing').css({
          //         // 'top': 301,
          //         'top': 111,
          //         'right': 0
          //         });


          //       // //show the menu directly over the placeholder
          //       //   //positioning
          //       //   $( "#legendDivCasing" ).position({
          //       //     my: "left top",
          //       //     at: "left+0 bottom+2",
          //       //     of: "#weatherDivCasing"
          //       //       // of: "#tester #search-form"
          //       //   });

          //     // //show the menu directly over the placeholder
          //     //   //positioning
          //     //   $( "#legendDivCasing" ).position({
          //     //     my: "right top",
          //     //     at: "right+0 bottom+2",
          //     //     of: "#weatherDivCasing"
          //     //       // of: "#tester #search-form"
          //     //   });



          // console.log($("#legendDivCasing").position())



          //   }
          //   else {

          //     console.log('legend click hit - weather is hidden ')

          //       // //show the menu directly over the placeholder
          //       //   $("#legendDivCasing").css({
          //       //       position: "absolute",
          //       //       top: 0 + "px",
          //       //       right: 0 + "px"//,
          //       //       // left: 0 + "px"
          //       //   }).show();

          //         $('#legendDivCasing').css({
          //           'top': 0,
          //           'right': 0
          //           });


          //     console.log($("#legendDivCasing").position())

          //   }






          // });






          // //------------------------------------------------------------
          // $('.weatherPosOverrides').on('click', function(e){
          //   //closeWeatherIcon

          //   console.log('weather click hit')



          //   if ($("#legendDivCasing").is(":visible")) {

          //     $('#legendDivCasing').css({
          //       'top': 0,
          //       'right': 0
          //       });

          //     $('#weatherDivCasing').css({
          //       'top': 301,
          //       // 'top': 111,
          //       'right': 0
          //       });



          //     // //show the menu directly over the placeholder
          //     //   //positioning
          //     //   $( "#weatherDivCasing" ).position({
          //     //     my: "left top",
          //     //     at: "left+0 bottom+2",
          //     //     of: "#legendDivCasing"
          //     //       // of: "#tester #search-form"
          //     //   });




          //       console.log($("#weatherDivCasing").position())

          //   }
          //   else {

          //       // //show the menu directly over the placeholder
          //       //   $("#weatherDivCasing").css({
          //       //       position: "absolute",
          //       //       top: 0 + "px",
          //       //       right: 0 + "px"
          //       //   });

          //         $('#weatherDivCasing').css({
          //           'top': 0,
          //           'right': 0
          //           });



          //         console.log($("#weatherDivCasing").position())

          //   }





          // });


















            //keeps dropdown menu from closing onclick of a list item
            $('.dropdown-menu').on('click', function(e){
                    if($(this).hasClass('dropdown-menu-form')){
                        e.stopPropagation();
                    }
            });



            //single checkbox group clicks (flights)
            setTimeout(function(){
                  $("input.FlightsChecks:checkbox").change(function() {
                      // $("input.FlightsChecks:checkbox").attr("checked", false);
                      // // $(this).attr("checked", true);
                      $('input.FlightsChecks:checkbox').not(this).prop('checked', false);
                  });

            }, 100);



            //single checkbox group clicks (mapviews)
            setTimeout(function(){

                  $("input.ViewChecks:checkbox").change(function() {
                      // $("input.FlightsChecks:checkbox").attr("checked", false);
                      // // $(this).attr("checked", true);
                      $('input.ViewChecks:checkbox').not(this).prop('checked', false);
                  });

            }, 100);


















      // //checkbox radio buttons
      // $('input[type="checkbox"]').on('change', function() {
      //    $(this).siblings('input[type="checkbox"]').not(this).prop('checked', false);
      // });

      


      // //------------------------------------------------------------------
      // //bootstrap checked list groups
      // //http://bootsnipp.com/snippets/featured/checked-list-group
      //     $('.list-group.checked-list-box .list-group-item').each(function () {
              
      //         // Settings
      //         var $widget = $(this),
      //             $checkbox = $('<input type="checkbox" class="hidden" />'),
      //             color = ($widget.data('color') ? $widget.data('color') : "primary"),
      //             style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
      //             settings = {
      //                 on: {
      //                     icon: 'glyphicon glyphicon-check'
      //                 },
      //                 off: {
      //                     icon: 'glyphicon glyphicon-unchecked'
      //                 }
      //             };
                  
      //         $widget.css('cursor', 'pointer')
      //         $widget.append($checkbox);

      //         // Event Handlers
      //         $widget.on('click', function () {
      //             $checkbox.prop('checked', !$checkbox.is(':checked'));
      //             $checkbox.triggerHandler('change');
      //             updateDisplay();
      //         });
      //         $checkbox.on('change', function () {
      //             updateDisplay();
      //         });
                

      //         // Actions
      //         function updateDisplay() {
      //             var isChecked = $checkbox.is(':checked');

      //             // Set the button's state
      //             $widget.data('state', (isChecked) ? "on" : "off");

      //             // Set the button's icon
      //             $widget.find('.state-icon')
      //                 .removeClass()
      //                 .addClass('state-icon ' + settings[$widget.data('state')].icon);

      //             // Update the button's color
      //             if (isChecked) {
      //                 $widget.addClass(style + color + ' active');
      //             } else {
      //                 $widget.removeClass(style + color + ' active');
      //             }
      //         }

      //         // Initialization
      //         function init() {
                  
      //             if ($widget.data('checked') == true) {
      //                 $checkbox.prop('checked', !$checkbox.is(':checked'));
      //             }
                  
      //             updateDisplay();

      //             // Inject the icon if applicable
      //             if ($widget.find('.state-icon').length == 0) {
      //                 $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
      //             }
      //         }
      //         init();
      //     });
          
      //     $('#get-checked-data').on('click', function(event) {
      //         event.preventDefault(); 
      //         var checkedItems = {}, counter = 0;
      //         $("#check-list-box li.active").each(function(idx, li) {
      //             checkedItems[counter] = $(li).text();
      //             counter++;
      //         });
      //         $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
      //     });
      //     //------------------------------------------------------------------




      // //------------------------------------------------------------------
      // //bootstrap checked list groups
      // //http://bootsnipp.com/snippets/featured/checked-list-group
      //     $('.list-group-item').each(function () {
              
      //         // Settings
      //         var $widget = $(this),
      //             $checkbox = $('<input type="checkbox" class="hidden" />'),
      //             color = ($widget.data('color') ? $widget.data('color') : "primary"),
      //             style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
      //             settings = {
      //                 on: {
      //                     icon: 'glyphicon glyphicon-check'
      //                 },
      //                 off: {
      //                     icon: 'glyphicon glyphicon-unchecked'
      //                 }
      //             };
                  
      //         $widget.css('cursor', 'pointer')
      //         $widget.append($checkbox);

      //         // Event Handlers
      //         $widget.on('click', function () {
      //             $checkbox.prop('checked', !$checkbox.is(':checked'));
      //             $checkbox.triggerHandler('change');
      //             updateDisplay();
      //         });
      //         $checkbox.on('change', function () {
      //             updateDisplay();
      //         });
                

      //         // Actions
      //         function updateDisplay() {
      //             var isChecked = $checkbox.is(':checked');

      //             // Set the button's state
      //             $widget.data('state', (isChecked) ? "on" : "off");

      //             // Set the button's icon
      //             $widget.find('.state-icon')
      //                 .removeClass()
      //                 .addClass('state-icon ' + settings[$widget.data('state')].icon);

      //             // Update the button's color
      //             if (isChecked) {
      //                 $widget.addClass(style + color + ' active');
      //             } else {
      //                 $widget.removeClass(style + color + ' active');
      //             }
      //         }

      //         // Initialization
      //         function init() {
                  
      //             if ($widget.data('checked') == true) {
      //                 $checkbox.prop('checked', !$checkbox.is(':checked'));
      //             }
                  
      //             updateDisplay();

      //             // Inject the icon if applicable
      //             if ($widget.find('.state-icon').length == 0) {
      //                 $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
      //             }
      //         }
      //         init();
      //     });
          
      //     $('#get-checked-data').on('click', function(event) {
      //         event.preventDefault(); 
      //         var checkedItems = {}, counter = 0;
      //         $("#check-list-box li.active").each(function(idx, li) {
      //             checkedItems[counter] = $(li).text();
      //             counter++;
      //         });
      //         $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
      //     });
      //     //------------------------------------------------------------------










      // //------------------------------------------------------------------
      // //bootstrap checked list groups
      // //http://bootsnipp.com/snippets/featured/checked-list-group
      //     $('.customCheckItem').each(function () {
              
      //         // Settings
      //         var $widget = $(this),
      //             // $checkbox = $('<input type="checkbox" class="hidden" />'),
      //             $checkbox = $('<input type="checkbox" ng-click="theLegend" />'),
      //             color = ($widget.data('color') ? $widget.data('color') : "primary"),
      //             style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
      //             settings = {
      //                 on: {
      //                     icon: 'glyphicon glyphicon-check'
      //                 },
      //                 off: {
      //                     icon: 'glyphicon glyphicon-unchecked'
      //                 }
      //             };
                  
      //         $widget.css('cursor', 'pointer')
      //         $widget.append($checkbox);

      //         // Event Handlers
      //         $widget.on('click', function () {
      //             $checkbox.prop('checked', !$checkbox.is(':checked'));
      //             $checkbox.triggerHandler('change');
      //             updateDisplay();
      //         });
      //         $checkbox.on('change', function () {
      //             updateDisplay();
      //         });
                

      //         // Actions
      //         function updateDisplay() {
      //             var isChecked = $checkbox.is(':checked');

      //             // Set the button's state
      //             $widget.data('state', (isChecked) ? "on" : "off");

      //             // Set the button's icon
      //             $widget.find('.state-icon')
      //                 .removeClass()
      //                 .addClass('state-icon ' + settings[$widget.data('state')].icon);

      //             // Update the button's color
      //             if (isChecked) {
      //                 $widget.addClass(style + color + ' active');
      //             } else {
      //                 $widget.removeClass(style + color + ' active');
      //             }
      //         }

      //         // Initialization
      //         function init() {
                  
      //             if ($widget.data('checked') == true) {
      //                 $checkbox.prop('checked', !$checkbox.is(':checked'));
      //             }
                  
      //             updateDisplay();

      //             // Inject the icon if applicable
      //             if ($widget.find('.state-icon').length == 0) {
      //                 $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
      //             }
      //         }
      //         init();
      //     });
          
      //     $('#get-checked-data').on('click', function(event) {
      //         event.preventDefault(); 
      //         var checkedItems = {}, counter = 0;
      //         $("#check-list-box li.active").each(function(idx, li) {
      //             checkedItems[counter] = $(li).text();
      //             counter++;
      //         });
      //         $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
      //     });
      //     //------------------------------------------------------------------



          





































      //range slider
      $("#aerialSlider").on("input change", function(){
        //set map opacity
        map.getLayer("basemap").setOpacity(this.value);
        //call to update output
        outputUpdate(this.value);
      });
      //update output
      function outputUpdate(val) {
        val = val * 100;
        document.getElementById("aerialLevel").innerHTML = val;
      }














      // //range slider
      // $("#aerialSlider").on("input", function(){

      //   // map.getLayer("basemap").setOpacity(val);
      //  map.getLayer("basemap").setOpacity(this.value);

      //  //call to update readout output
      //  outputUpdate(this.value);

      // });

      // function outputUpdate(val) {
      //   val = val * 100;


      //   document.getElementById("aerialLevel").innerHTML = val;




      //   //alert(val);
      // //  document.querySelector('#aerialLevel').value = val;
      // }














        // //range slider
        // $(".aerialSlider").on("input", function(){

        //   console.log(this.value);

        //   // map.getLayer("basemap").setOpacity(val);
        //  map.getLayer("basemap").setOpacity(this.value);

        //  // layer.setOpacity(0.5);

        //  //call to update readout output
        //  outputUpdate(this.value);

        // });

        // function outputUpdate(val) {
        //   val = val * 100;
        // document.querySelector('#aerialLevel').value = val;
        // }













     






































            //if the 'x' Toggle buttons are clicked
            $('#displayToggle').click(function() {

              //added--------------------------
              panelCloseHit = true;




               if (slidePanelOpen) {

                   console.log('display slide in clicked')



              //-------------------------------------------
              //Updating the Header positioning & Arrow (ALL)
              // $("#introHeader").css("left", -194 + "px");
              $("#introHeader").css("left", -194 + "px");
              $("#displayHeader").css("left", -194 + "px");
              $("#toolsHeader").css("left", -194 + "px");
              $("#resourcesHeader").css("left", -194 + "px");
              $(".esriScalebar").css("left", -194 + "px");

              //transforms
              $('#displayToggle').addClass('toggleAdjust');
              $('#displayHeader').addClass('headerAdjust');




              $('#introToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
              $('#displayToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
              $('#toolsToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
              $('#resourcesToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');

              $('#mainTabs').css("display", "none");
              // $('#aerialSlider_Box').css("display", "none");
              $('.infoBlock').css("display", "none");
              //-------------------------------------------

                // hide panel
                $("#slidepanel").animate({
                    "marginLeft": "-=230px"
                }, 350);
                slidePanelOpen = false;
                // change width of map to fill empty space left from collapse of sldide panel
                $('#mapDiv').animate({
                  // "width": "-=150px"
                    "width": "+=230px"
                }, 350, function() {
              // Animation complete.

              console.log('slide complete');


              //subtract 50pixels for now, update for full amount of side panel later
              document.getElementById('mapDiv').style.width = document.documentElement.clientWidth - 10 + "px";





              //Reposition & resize
                    //repoMap(); //commented out
                    map.reposition();
                    map.resize();
                  
                });

            }
            else {

              //added--------------------------
              panelCloseHit = false;

              console.log('display slide out clicked')



              //-------------------------------------------
              //Updating the Header positioning & Arrow (ALL)
              $("#introHeader").css("left", 7 + "px");
              $("#displayHeader").css("left", 7 + "px");
              $("#toolsHeader").css("left", 7 + "px");
              $("#resourcesHeader").css("left", 7 + "px");
              $(".esriScalebar").css("left", 19 + "px");


              //transforms
              $('#displayToggle').removeClass('toggleAdjust');
              $('#displayHeader').removeClass('headerAdjust');




              

              $('#introToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
              $('#displayToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
              $('#toolsToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
              $('#resourcesToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
              
              $('#mainTabs').css("display", "block");
              // $('#aerialSlider_Box').css("display", "block");
              $('.infoBlock').css("display", "block");
              //-------------------------------------------

                $("#slidepanel").animate({
                  "marginLeft": "+=230px"
                }, 350);
                slidePanelOpen = true;
                $('#mapDiv').animate({
                    "width": "-=230px"
                }, 350, function() {
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
      //     $('#displayToggle').click(function() {


      //     if (slidePanelOpen) {

      //       //-------------------------------------------
      //       //Updating the Header positioning & Arrow (ALL)
      //       // $("#introHeader").css("left", -194 + "px");
      //       $("#introHeader").css("left", -194 + "px");
      //       $("#displayHeader").css("left", -194 + "px");
      //       $("#toolsHeader").css("left", -194 + "px");
      //       $("#resourcesHeader").css("left", -194 + "px");

      //       //transforms
      //       $('#displayToggle').addClass('toggleAdjust');
      //       $('#displayHeader').addClass('headerAdjust');




      //       $('#introToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
      //       $('#displayToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
      //       $('#toolsToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
      //       $('#resourcesToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');

      //       $('#mainTabs').css("display", "none");
      //       // $('#aerialSlider_Box').css("display", "none");
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
      //       $('#displayToggle').removeClass('toggleAdjust');
      //       $('#displayHeader').removeClass('headerAdjust');




            

      //       $('#introToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
      //       $('#displayToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
      //       $('#toolsToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
      //       $('#resourcesToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
            
      //       $('#mainTabs').css("display", "block");
      //       // $('#aerialSlider_Box').css("display", "block");
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


     })//-end Display Logic



   },
   //link to template-------------------------------------
   templateUrl: 'views/tempDisplay.html'

 }

})
