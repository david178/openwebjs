

open.directive('introView', function() {

 return {
   restrict:'E',
   link:function(scope,e,a){


     // //Slide panel - slide logic
     // $(function() {




     //     var mapDiv = document.getElementById('mapDiv');


     //      //Start Tour
     //      $('#tourButton').click(function(){
     //          tour.init();
     //          tour.restart();
     //      });



     //      //if the 'x' Toggle buttons are clicked
     //      $('#introToggle,#hamburgerBtn').click(function() {

     //       //added--------------------------
     //       panelCloseHit = true;



     //        if (skinnyPanelOpen) {

     //           console.log('intro slide in clicked')

     //           //hide the 'inactive overlay'
     //           $(".inactiveOverlay").hide();


     //           //-------------------------------------------
     //           //Updating the Header positioning & Arrow (ALL)
     //           // $("#introHeader").css("left", -181 + "px");
     //           // $("#displayHeader").css("left", -201 + "px");
     //           // $("#toolsHeader").css("left", -201 + "px");
     //           // $("#resourcesHeader").css("left", -201 + "px");
     //           // $(".esriScalebar").css("left", -201 + "px");

     //           //transforms
     //           $('#introToggle').addClass('toggleAdjust');
     //           $('#introHeader').addClass('headerAdjust');
     //           $('#logoTitle').addClass('titleAdjust');
     //           $('#search-form').addClass('searchFormAdjust');

     //           $('#introToggle').toggleClass('ion-chevron-left ion-navicon-round');
     //           $('#displayToggle').toggleClass('ion-chevron-left ion-navicon-round');
     //           $('#toolsToggle').toggleClass('ion-chevron-left ion-navicon-round');
     //           $('#resourcesToggle').toggleClass('ion-chevron-left ion-navicon-round');

     //           $('#mainTabs').css("display", "none");
     //           $('.infoBlock').css("display", "none");
     //           //-------------------------------------------

     //           // hide panel
     //           $(".skinnyPanel").animate({
     //              "marginLeft": "-=240px"
     //           }, 0);
     //           skinnyPanelOpen = false;
     //        }
     //        else {

     //           //added--------------------------
     //           panelCloseHit = false;

     //           console.log('intro slide out clicked')

     //           //show the 'inactive overlay'
     //           $(".inactiveOverlay").show();



     //           //-------------------------------------------
     //           //Updating the Header positioning & Arrow (ALL)
     //           // $("#introHeader").css("left", 0 + "px");
     //           // $("#displayHeader").css("left", 0 + "px");
     //           // $("#toolsHeader").css("left", 0 + "px");
     //           // $("#resourcesHeader").css("left", 0 + "px");
     //           // $(".esriScalebar").css("left", 19 + "px");

     //           //transforms
     //           $('#introToggle').removeClass('toggleAdjust');
     //           $('#introHeader').removeClass('headerAdjust');
     //           $('#logoTitle').removeClass('titleAdjust');
     //           $('#search-form').removeClass('searchFormAdjust');

     //           $('#introToggle').toggleClass('ion-chevron-left ion-navicon-round');
     //           $('#displayToggle').toggleClass('ion-chevron-left ion-navicon-round');
     //           $('#toolsToggle').toggleClass('ion-chevron-left ion-navicon-round');
     //           $('#resourcesToggle').toggleClass('ion-chevron-left ion-navicon-round');
               
     //           $('#mainTabs').css("display", "block");
     //           $('.infoBlock').css("display", "block");
     //           //-------------------------------------------

     //           $(".skinnyPanel").animate({
     //              "marginLeft": "+=240px"
     //           }, 0);
     //           skinnyPanelOpen = true;

     //        }; //end of else

     //    });




     // });//-end Slide logic



   },
   //link to template-------------------------------------
   templateUrl: 'views/tempIntroduction.html'

 }

})
