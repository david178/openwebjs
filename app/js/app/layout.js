
//************************************************
//****************** LAYOUT **********************
//************************************************


//Slide panel - slide logic (future remove - to basic remove responsive logic 
//  github.com/jcfanco/uc2015-jsapi-advanced-topics -----------------------------
// (go through modular-oo/modules > responsive-design, demos & code)
$(function() {

    // set initial with of map to the size of the( window - panel width) 
    // $('#mapDiv').css('width', (window.innerWidth - 240 + 'px'));

    skinnyPanelOpen = false;

    var mapDiv = document.getElementById('mapDiv');


  });



//browser re-size
function sized() {

   console.log('L [[ resizing ]]');

   //ensures dynamic positioning of legend and weather blocks during browser resize
   //required due to re-positioning on class clicks in dirDisplay
   // $(".blockFade").css("right", 0 + "px");
  // $("#legendDivCasing").css("right", 0 + "px");

  // $("#legendDivCasing").css("right", 0 + "px");
  // $("#weatherDivCasing").css("right", 0 + "px");

  // $('#legendDivCasing').css({
  //   'top': 0,
  //   'right': 0
  //   });

  // $('#weatherDivCasing').css({
  //   'top': 0,
  //   'right': 0
  //   });
  




   
  //let x = the document width, set to '0' (default)
    x = 0;
    if (self.innerHeight)
    {
            x = self.innerWidth;
    }
    else if (document.documentElement && document.documentElement.clientHeight)
    {
            x = document.documentElement.clientWidth;
    }
    else if (document.body)
    {
            x = document.body.clientWidth;
    }
















      //Window size is greater than or equal to 768 pixels
      //Expand the slide Panel
      if (x >= 768) // && panelCloseHit === false
      {

          //set the isMobile bool to true | this will be used to limit typeahead results
          isMobile = false;
          productCode = 'OW4';


          if (skinnyPanelOpen === true) { 

            $('.inactiveOverlay').addClass('inactiveOverlayVisible');

          }

          console.log(isMobile)

    }

    //Window size is less than 768 pixels
    //Collapse the slide Panel && remove the inactiveoverlay visible class
    else if (x < 767)
    {

      console.log('panelCloseHit ' + panelCloseHit)

      //set the isMobile bool to true | this will be used to limit typeahead results
      isMobile = true;
      productCode = 'OW4mobile';


        if (skinnyPanelOpen === true) { //SKINNY IS OPEN ALREADY - GOING INTO MOBILE MODE, WE WANT TO TUCK IT IN AND REMOVE THE OVERLAY IF EXISTS

          $('.inactiveOverlay').removeClass('inactiveOverlayVisible');


            // // hide panel
            // $("#skinnyPanel").animate({
            //     "marginLeft": "-=240px"
            // }, 350);

            // //hide the 'inactive overlay'
            // $('.inactiveOverlay').removeClass('inactiveOverlayVisible');

            // skinnyPanelOpen = false;

            // console.log(isMobile)

        }

        console.log(isMobile)






    }


    // //Window size is less than 768 pixels
    // //Collapse the slide Panel && remove the inactiveoverlay visible class
    // else if (x < 768 && panelCloseHit === false)
    // {

    //   console.log('panelCloseHit ' + panelCloseHit)

    //   //set the isMobile bool to true | this will be used to limit typeahead results
    //   isMobile = true;
    //   productCode = 'OW4mobile';


    //     if (skinnyPanelOpen === true) { //SKINNY IS OPEN ALREADY - GOING INTO MOBILE MODE, WE WANT TO TUCK IT IN AND REMOVE THE OVERLAY IF EXISTS
    //         // hide panel
    //         $("#skinnyPanel").animate({
    //             "marginLeft": "-=240px"
    //         }, 350);
    //         skinnyPanelOpen = false;

    //         //hide the 'inactive overlay'
    //         $('.inactiveOverlay').removeClass('inactiveOverlayVisible');

    //         console.log(isMobile)

    //     }


    // }


    //added---------------------------------------------
    //Don't expand it back out

    //Window size is greater than or equal to 768 pixels
    //Expand the slide Panel
    else if (x >= 768 && panelCloseHit === true)
    {


      //set the isMobile bool to true | this will be used to limit typeahead results
      isMobile = false;
      productCode = 'OW4';


     if (isMobile === true) {


     }


     if (skinnyPanelOpen === true) {


     }




  }


  else if (x < 768 && panelCloseHit === true)
  {

    //set the isMobile bool to true | this will be used to limit typeahead results
    isMobile = true;
    productCode = 'OW4mobile';

  }




  else { //do nothing          //added--------------------------

  }



}























  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//gets called on map pan-end (& resize), element clicks (navbar, search, legend, weather)
function propInfoRepo_Second() { 

  if ($("#tester .dropdown-menu").css('display') == 'none')
  {
      autocompleteIsShowing = false;
     // true
  } else {
    autocompleteIsShowing = true;
  }

  // //defaults readout
  // console.log('auto is showing: ' + autocompleteIsShowing)
  // console.log('search has complete: ' + searchHasCompleted)




  //---------------------------------------------------------------------------------------------------------
  //navbar / search was clicked (not close icon)
  if (autocompleteIsShowing === false && searchHasCompleted === true && $("#tester input").val().length > 2) 
  {

    //in the case that the slidePanel is Open, 
    if (skinnyPanelOpen) {

        // COMMENTED
        //resposition the prop info elem
        $('#PropInfoDialog').css({
          'top': 49,
          'left': 240
          });
        // $( "#PropInfoDialog" ).show();
        $('#PropInfoDialog').css({
          'visibility': 'visible'
          // 'visibility': 'visible'
          });

      // console.log('one sub one');
      console.log('L [[ updating layout ]]');

      console.log('SUCCESSFUL TEST ONE')

      console.log(skinnyPanelOpen)


    }
    else { //in the case that the slidePanel has been collapsed,


      //BELOW IS THE ORIG CORRECT - BUT RENDERS DELAYED
      // COMMENTED
      //resposition the prop info elem
      $('#PropInfoDialog').css({
        'top': 49,
        'left': 59
        });
      // $( "#PropInfoDialog" ).show();
      $('#PropInfoDialog').css({
        'visibility': 'visible'
        // 'visibility': 'visible'
        });


      console.log('SUCCESSFUL TEST ONE SUB TWO')

      console.log(skinnyPanelOpen)


    } 


  }
  //---------------------------------------------------------------------------------------------------------
  if (autocompleteIsShowing === true && searchHasCompleted === true && $("#tester input").val().length > 2) 
  {

    //prop info results positioning
    $( "#PropInfoDialog" ).position({
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

  // console.log('one sub two');
  console.log('L [[ updating layout ]]');
  
  console.log('SUCCESSFUL TEST TWO')

  }

  //---------------------------------------------------------------------------------------------------------
  if (autocompleteIsShowing === false && searchHasCompleted === true && $("#tester input").val().length < 3) 
  {


    //in the case that the slidePanel is Open, 
    if (skinnyPanelOpen) {


        $('#PropInfoDialog').css({
          'top': 49,
          'left': 240
          });
        // $( "#PropInfoDialog" ).show();
        $('#PropInfoDialog').css({
          'visibility': 'hidden'
          // 'visibility': 'visible'
          });


      // console.log('two');
      console.log('L [[ updating layout ]]');

      console.log('SUCCESSFUL TEST THREE')




    }
    else { //in the case that the slidePanel has been collapsed,



      $('#PropInfoDialog').css({
        'top': 49,
        'left': 59
        });
      // $( "#PropInfoDialog" ).show();
      $('#PropInfoDialog').css({
        'visibility': 'hidden'
        // 'visibility': 'visible'
        });


    }


  } 
  //---------------------------------------------------------------------------------------------------------
  //gets hit on close icon click
  if (autocompleteIsShowing === true && searchHasCompleted === true && $("#tester input").val().length < 3) 
  {


    $('#PropInfoDialog').css({
      'top': 49,
      'left': 240
      });
    // $( "#PropInfoDialog" ).show();
    $('#PropInfoDialog').css({
      'visibility': 'hidden'
      // 'visibility': 'visible'
      });

  // console.log('three');
  console.log('L [[ updating layout ]]');

  console.log('SUCCESSFUL TEST FOUR')

  } 
  else {

   // console.log($("#tester input").val().length);

  }



}









//re-position prop info on external left click &&
//custom context menu for map (disable default)
(function() {

  //propInfoRepo
  $('#skinnyPanel').click(function(e) { 
    setTimeout(function(){
        //call to repo
        propInfoRepo_Second();
    }, 100);
    });

  //future move to directive
  $('#legendDivCasing, #weatherDivCasing').click(function() { 
    setTimeout(function(){
        //call to repo
        propInfoRepo_Second();
    }, 100);
    });

  $('#innerNav').click(function() { 

  setTimeout(function(){
      //call to repo
      propInfoRepo_Second();
  }, 100);

  });

})();












//*************************************************************
//sniff the browser and then apply adjustments
function browserspecifics() {

  //http://stackoverflow.com/questions/2400935/browser-detection-in-javascript

     navigator.sayswho = (function(){
         var ua= navigator.userAgent, tem, 
         M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
         if(/trident/i.test(M[1])){
             tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
             return 'IE '+(tem[1] || '');
         }
         if(M[1]=== 'Chrome'){
             tem= ua.match(/\bOPR\/(\d+)/)
             if(tem!= null) return 'Opera '+tem[1];
         }
         M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
         if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
         return M.join(' ');
     })();

}
//*************************************************************



//*************************************************************
/* IE 9 * Lower  - Multi-Column support */

(function($){
    var initialContainer = $('.newspaper2'),
        columnItems = $('.newspaper2 li'),
        columns = null,
        column = 1; // account for initial column
    function updateColumns(){
        column = 0;
        columnItems.each(function(idx, el){
            if (idx !== 0 && idx > (columnItems.length / columns.length) + (column * idx)){
                column += 1;
            }
            console.log("L " + "[[ "+ column, el, idx + " ]]");
            $(columns.get(column)).append(el);
        });
    }
    function setupColumns(){
        columnItems.detach();
        while (column++ < initialContainer.data('columns')){
            initialContainer.clone().insertBefore(initialContainer);
            column++;
        }
        columns = $('.newspaper2');
        updateColumns();
    }

    $(setupColumns);
})(jQuery);

(function($){
    var initialContainer = $('.newspaper3'),
        columnItems = $('.newspaper3 li'),
        columns = null,
        column = 1; // account for initial column
    function updateColumns(){
        column = 0;
        columnItems.each(function(idx, el){
            if (idx !== 0 && idx > (columnItems.length / columns.length) + (column * idx)){
                column += 1;
            }
            console.log("L " + "[[ "+ column, el, idx + " ]]");
            $(columns.get(column)).append(el);
        });
    }
    function setupColumns(){
        columnItems.detach();
        while (column++ < initialContainer.data('columns')){
            initialContainer.clone().insertBefore(initialContainer);
            column++;
        }
        columns = $('.newspaper3');
        updateColumns();
    }

    $(setupColumns);
})(jQuery);
//*************************************************************



//************************ Tour *******************************

// Instance the tour
var tour = new Tour({
  //   storage: false,
  //   steps: [{
  //   element: "#imgLogo",
  //   placement: "right",   
  //   title: "Welcome to OpenWeb!",
  //   content: "Click next to learn how to use this application."
  // },
  // {
  //   element: "#search-holder",
  //   placement: "bottom",   
  //   title: "Searchbar",
  //   content: "Type an address, parcel number, or the name of a property owner to be taken to that property. Click a property on the map and then click next!"
  // },
  // {
  //   element: "#PropInfoDialog",
  //   placement: "right",   
  //   title: "Property Information",
  //   content: "These tabs provide specific information about the selected property."
  // },
  // {
  //   element: "#skinnyPanel",
  //   placement: "right",   
  //   title: "Sidebar",
  //   content: "The icons at the bottom of this sidebar will direct you to more of OpenWeb's features."
  // }, 
  // { 
  //   element: "#compassTab",
  //   placement: "top",   
  //   title: "Display Options Tab",
  //   content: "Refine the map using these options."
  // },
  // {
  //   element: "#pencilTab",
  //   placement: "top",   
  //   title: "Tools Tab",
  //   content: "Add custom modifications to your map using these tools."
  // },
  // {
  //   element: "#gearTab",
  //   placement: "top",   
  //   title: "Resources Tab",
  //   content: "Leave us feedback or check out our other applications here!"
  // },
  // {
  //   element: "#skinnyPanel",
  //   placement: "right",
  //   title: "Thank you!",
  //   content: "Thanks for taking the tour! If you need to take it again, click the 'Take a Tour' button on the introduction panel!"
  //   // orphan: true
  // }],

    storage: false,
    steps: [{
    element: ".omnibarcontainer",
    placement: "right",   
    title: "Welcome to OpenWeb!",
    content: "Click next to learn how to use this application."
  },
  {
    element: ".searchCard",
    placement: "bottom",   
    title: "Search",
    content: "Type an address, parcel number, or the name of a property owner to be taken to that property. Click a property on the map and then click next!"
  },
  {
    element: ".accordionStyleNew",
    placement: "right",   
    title: "Property Information",
    content: "These tabs provide specific information about the selected property."
  },
  {
    element: ".infoCard",
    placement: "right",   
    title: "Information Card",
    content: "This box will display currently selected tools, location on the map, and information related to the current view."
  },



  // {
  //   element: "#skinnyPanel",
  //   placement: "right",   
  //   title: "Sidebar",
  //   content: "The icons at the bottom of this sidebar will direct you to more of OpenWeb's features."
  // }, 
  // { 
  //   element: "#compassTab",
  //   placement: "top",   
  //   title: "Display Options Tab",
  //   content: "Refine the map using these options."
  // },
  // {
  //   element: "#pencilTab",
  //   placement: "top",   
  //   title: "Tools Tab",
  //   content: "Add custom modifications to your map using these tools."
  // },
  // {
  //   element: "#gearTab",
  //   placement: "top",   
  //   title: "Resources Tab",
  //   content: "Leave us feedback or check out our other applications here!"
  // },
  {
    element: ".omnibarcontainer",
    placement: "right",
    title: "Hiding and Showing",
    content: "You can always hide or show the property information by clicking '^ Hide/ v Show', in case you need a better view of the map."
    // orphan: true
  },

  {
    element: ".searchCard",
    placement: "right",
    title: "Options",
    content: "Whenever you need to change the map view, flight, use a tool, or get help, click the 'Hamburger' button on the top left."
    // orphan: true
  },


  {
    element: ".skinnyPanel",
    placement: "right",
    title: "Thank You!",
    content: "Thanks for taking the tour! If you need to take it again, click the 'Take a Tour' button on the introduction panel!"
    // orphan: true
  }],
});
//*************************************************************




$(function() {
  sized();
  browserspecifics();

  // //*************************************************************
  // /* Single checkbox lists  (Map View , Flights) */
  // //http://www.bootply.com/amP6Ov0yuT
  // //http://bootsnipp.com/snippets/featured/checked-list-group
  // //https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=bootstrap%20single%20checkbox%20lists

  // $("input:checkbox").click(function() {
  //     if ($(this).is(":checked")) {
  //         var group = "input:checkbox[name='" + $(this).attr("name") + "']";
  //         $(group).prop("checked", false);
  //         $(this).prop("checked", true);
  //     } else {
  //         $(this).prop("checked", false);
  //     }
  // });
  // //*************************************************************

})
