

open.directive('introView', function() {

 return {
   restrict:'E',
   link:function(scope,e,a){

     // scope.theTitle = 'Data Disclaimer:'
     // scope.theBody = 'Welcome to OpenWeb' +
     // 'Due to continuous development activity throughout Clark County, this data is for' +
     // 'reference only. The information is presented solely for the convenience of the' +
     // 'citizens of Clark County. Specific questions are to be reffered to the' +
     // 'appropriate County Department and/or municipality.' +
     // 'THE MAPS AND DATA ARE PROVIDED WITHOUT WARRANTY OF ANY KIND, EXPRESSED OR IMPLIED.'




     //Slide panel - slide logic
     $(function() {


         var mapDiv = document.getElementById('mapDiv');

        //  //added--------------------------
        //  // $('#introLink', '#displayLink').click(function() {
        //  //    panelCloseHit = true;

        //  //     alert(panelCloseHit)
        //  //  });
        // $('#displayLink').click(function() {
        //    panelCloseHit = false;

        //  });
        // $('#introLink').click(function() {
        //    panelCloseHit = false;

        //  });








          //Start Tour

        // $(document).ready(function(){
                $('#tourButton').click(function(){
                    tour.init();
                    tour.restart();
                });
            // });











              //if the 'x' Toggle buttons are clicked
              $('#introToggle').click(function() {

               //added--------------------------
               panelCloseHit = true;




                if (slidePanelOpen) {

                    console.log('intro slide in clicked')


                 //-------------------------------------------
                 //Updating the Header positioning & Arrow (ALL)
                 // $("#introHeader").css("left", -194 + "px");
                 $("#introHeader").css("left", -181 + "px");
                 $("#displayHeader").css("left", -201 + "px");
                 $("#toolsHeader").css("left", -201 + "px");
                 $("#resourcesHeader").css("left", -201 + "px");
                 $(".esriScalebar").css("left", -201 + "px");


                 //transforms
                 $('#introToggle').addClass('toggleAdjust');
                 $('#introHeader').addClass('headerAdjust');
                 $('#logoTitle').addClass('titleAdjust');
                 $('#search-form').addClass('searchFormAdjust');

                 // $('searchBtn-holder').addClass('searchBtnAdjust');






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





                  propInfoRepo_Second();



                  // //navbar / search was clicked (not close icon)
                  // if (autocompleteIsShowing === false && searchHasCompleted === true && $("#tester input").val().length > 2) 
                  // {

                  //   // // COMMENTED
                  //   // //resposition the prop info elem
                  //   // $('#PropInfoDialog').css({
                  //   //   'top': 49,
                  //   //   'left': 240
                  //   //   });
                  //   // // $( "#PropInfoDialog" ).show();
                  //   // $('#PropInfoDialog').css({
                  //   //   'visibility': 'visible'
                  //   //   // 'visibility': 'visible'
                  //   //   });

                  //   // COMMENTED
                  //   //resposition the prop info elem
                  //   $('#PropInfoDialog').css({
                  //     'top': 49,
                  //     'left': 59
                  //     });
                  //   // $( "#PropInfoDialog" ).show();
                  //   $('#PropInfoDialog').css({
                  //     'visibility': 'visible'
                  //     // 'visibility': 'visible'
                  //     });

                  //   console.log('test net hit')

                  // }











                  // //BELOW I THE UPDATE TO PROP INFO POSITIONING FOR COLLAPSED
                  // // COMMENTED
                  // //resposition the prop info elem
                  // $('#PropInfoDialog').css({
                  //   'top': 49,
                  //   'left': 59
                  //   });
                  // // $( "#PropInfoDialog" ).show();
                  // $('#PropInfoDialog').css({
                  //   'visibility': 'visible'
                  //   // 'visibility': 'visible'
                  //   });









                  console.log('slide complete');


                  //subtract 50pixels for now, update for full amount of side panel later
                  // document.getElementById('mapDiv').style.width = document.documentElement.clientWidth - 10 + "px";
                  document.getElementById('mapDiv').style.width = document.documentElement.clientWidth + "px";

                  // console.log('mapdiv resize completed');

                  // console.log(document.getElementById('mapDiv').style.width);


                  // //Reposition & resize
                  //       //repoMap(); //commented out
                  //       map.reposition();
                       // map.resize();
                       map.reposition();
                       map.resize();


                  //       // require([
                  //       //         "esri/map",
                  //       //         "dojo/parser"
                  //       //       ], function (
                  //       //         Map, parser) {

                  //       //         //Reposition & resize
                  //       //               //repoMap(); //commented out
                  //       //               map.reposition();
                  //       //               map.resize();

                  //       //       });




                      
                    });

                }
                else {

                    //added--------------------------
                    panelCloseHit = false;

                    console.log('intro slide out clicked')



                 //-------------------------------------------
                 //Updating the Header positioning & Arrow (ALL)
                 $("#introHeader").css("left", 0 + "px");
                 $("#displayHeader").css("left", 0 + "px");
                 $("#toolsHeader").css("left", 0 + "px");
                 $("#resourcesHeader").css("left", 0 + "px");
                 $(".esriScalebar").css("left", 19 + "px");

                 //transforms
                 $('#introToggle').removeClass('toggleAdjust');
                 $('#introHeader').removeClass('headerAdjust');
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








                  propInfoRepo_Second();

              //     //navbar / search was clicked (not close icon)
              //     if (autocompleteIsShowing === false && searchHasCompleted === true && $("#tester input").val().length > 2) 
              //     {

              //     // // COMMENTED
              //     // //resposition the prop info elem
              //     // $('#PropInfoDialog').css({
              //     //   'top': 49,
              //     //   'left': 240
              //     //   });
              //     // // $( "#PropInfoDialog" ).show();
              //     // $('#PropInfoDialog').css({
              //     //   'visibility': 'visible'
              //     //   // 'visibility': 'visible'
              //     //   });

              //     // COMMENTED
              //     //resposition the prop info elem
              //     $('#PropInfoDialog').css({
              //       'top': 49,
              //       'left': 240
              //       });
              //     // $( "#PropInfoDialog" ).show();
              //     $('#PropInfoDialog').css({
              //       'visibility': 'visible'
              //       // 'visibility': 'visible'
              //       });

              // }





                  

                  console.log('slide complete');

                  //subtract 50pixels for now, update for full amount of side panel later
                  // document.getElementById('mapDiv').style.width = document.documentElement.clientWidth - 240 + "px";
                  document.getElementById('mapDiv').style.width = document.documentElement.clientWidth - 240 + "px";


                  // console.log('mapdiv resize completed again');

                  // console.log(document.getElementById('mapDiv').style.width);


                  //Reposition & resize
                        //repoMap(); //commented out
                       map.reposition();
                       map.resize();

                       // resizeMap();

                        // require([
                        //         "esri/map",
                        //         "dojo/parser"
                        //       ], function (
                        //         Map, parser) {

                        //         //Reposition & resize
                        //               //repoMap(); //commented out
                        //               map.reposition();
                        //               map.resize();

                        //       });



                    });

                }; //end of else

            });


















































         //   //if the 'x' Toggle buttons are clicked
         //   $('#introToggle').click(function() {

         //    //added--------------------------
         //    panelCloseHit = true;


         //     if (slidePanelOpen) {


         //      //-------------------------------------------
         //      //Updating the Header positioning & Arrow (ALL)
         //      // $("#introHeader").css("left", -194 + "px");
         //      $("#introHeader").css("left", -194 + "px");
         //      $("#displayHeader").css("left", -194 + "px");
         //      $("#toolsHeader").css("left", -194 + "px");
         //      $("#resourcesHeader").css("left", -194 + "px");


         //      //transforms
         //      $('#introToggle').addClass('toggleAdjust');
         //      $('#introHeader').addClass('headerAdjust');


         //      // $('#displayToggle').addClass('toggleAdjust');
         //      // $('#displayHeader').addClass('headerAdjust');



         //      // $("#testing").css("z-index", -1);


         //      // $('#testing').addClass('innerAdjust');


         //      // $("#testing").html("");

              


              

         //      // $('#introToggle').toggleClass('fa-chevron-left fa toggleAdjust');
         //      // $('#introHeader').toggleClass('alert-info headerAdjust');

              


         //      $('#introToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
         //      $('#displayToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
         //      $('#toolsToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
         //      $('#resourcesToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');

         //      $('#mainTabs').css("display", "none");
         //      $('.infoBlock').css("display", "none");
         //      //-------------------------------------------

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


         //      //-------------------------------------------
         //      //Updating the Header positioning & Arrow (ALL)
         //      $("#introHeader").css("left", 7 + "px");
         //      $("#displayHeader").css("left", 7 + "px");
         //      $("#toolsHeader").css("left", 7 + "px");
         //      $("#resourcesHeader").css("left", 7 + "px");

         //      //transforms
         //      $('#introToggle').removeClass('toggleAdjust');
         //      $('#introHeader').removeClass('headerAdjust');

         //      // $('#displayToggle').removeClass('toggleAdjust');
         //      // $('#displayHeader').removeClass('headerAdjust');


         //      // $("#testing").css("z-index", 1);


         //      // $("#testing").html("Introduction");

         //     // $("#testing").html("Introduction");

         //      // $('#introToggle').toggleClass('fa-chevron-left fa toggleAdjust');
         //      // $('#introHeader').toggleClass('alert-info headerAdjust');




         //      $('#introToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
         //      $('#displayToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
         //      $('#toolsToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
         //      $('#resourcesToggle').toggleClass('fa fa-chevron-left fa fa-chevron-right');
              
         //      $('#mainTabs').css("display", "block");
         //      $('.infoBlock').css("display", "block");
         //      //-------------------------------------------

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


     });//-end Slide logic



   },
   //link to template-------------------------------------
   templateUrl: 'views/tempIntroduction.html'

 }

})
