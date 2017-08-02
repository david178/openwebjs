

open.directive('resourcesView', function() {

 return {
   restrict:'E',
   link:function(scope,e,a){


    // $scope.testChange = function() {
    //         console.log("M [[ theme applied ]]"); 
    //       };


     //Resources logic
     $(function() {


      // //active share/embed tabs
      // $('#shareTabs a').click(function (e) {
      //   e.preventDefault()
      //   $(this).tab('show')
      // })





      // function testChange()  {
      //   console.log("M [[ theme applied ]]"); 
      // }




      // //onClose of the disclaimer Window, update the storage flag
      // $('#disclaimerDialog').bind('dialogclose', function(event) {
      //   localStorage.setItem("disclaim", "nodisclaim");
      //   console.log(localStorage.disclaim);
      //  });












      //keeps dropdown menu from closing onclick of a list item
      $('.dropdown-menu').on('click', function(e){
              if($(this).hasClass('dropdown-menu-form')){
                  e.stopPropagation();
              }
      });




      



          //Start tour
          $('#tourButtonListItem').click(function(){
              tour.init();
              tour.restart();
          });






              //if the 'x' Toggle buttons are clicked
              $('#resourcesToggle').click(function() {



                //added--------------------------
                panelCloseHit = true;




                 if (slidePanelOpen) {

                     console.log('resources slide in clicked')



                //-------------------------------------------
                //Updating the Header positioning & Arrow (ALL)
                // $("#introHeader").css("left", -194 + "px");
                $("#introHeader").css("left", -201 + "px");
                $("#displayHeader").css("left", -201 + "px");
                $("#toolsHeader").css("left", -201 + "px");
                $("#resourcesHeader").css("left", -181 + "px");
                $(".esriScalebar").css("left", -201 + "px");




                //transforms
                $('#resourcesToggle').addClass('toggleAdjust');
                $('#resourcesHeader').addClass('headerAdjust');
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

                console.log('resources slide out clicked')



                //-------------------------------------------
                //Updating the Header positioning & Arrow (ALL)
                $("#introHeader").css("left", 0 + "px");
                $("#displayHeader").css("left", 0 + "px");
                $("#toolsHeader").css("left", 0 + "px");
                $("#resourcesHeader").css("left", 0 + "px");
                $(".esriScalebar").css("left", 19 + "px");


                //transforms
                $('#resourcesToggle').removeClass('toggleAdjust');
                $('#resourcesHeader').removeClass('headerAdjust');
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
      //     $('#resourcesToggle').click(function() {


      //     if (slidePanelOpen) {

      //       //-------------------------------------------
      //       //Updating the Header positioning & Arrow (ALL)
      //       // $("#introHeader").css("left", -194 + "px");
      //       $("#introHeader").css("left", -194 + "px");
      //       $("#displayHeader").css("left", -194 + "px");
      //       $("#toolsHeader").css("left", -194 + "px");
      //       $("#resourcesHeader").css("left", -194 + "px");



      //       //transforms
      //       $('#resourcesToggle').addClass('toggleAdjust');
      //       $('#resourcesHeader').addClass('headerAdjust');





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
      //       $('#resourcesToggle').removeClass('toggleAdjust');
      //       $('#resourcesHeader').removeClass('headerAdjust');



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


     })//-end Resources Logic



   },
   //link to template-------------------------------------
   templateUrl: 'views/tempResources.html'

 }

})
