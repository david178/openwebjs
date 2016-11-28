

// //Slide panel - slide logic-----------------------------
// $(function() {


//     // set initial with of map to the size of the( window - panel width) 
//     $('#mapDiv').css('width', (window.innerWidth - 240 + 'px'));

//     slidePanelOpen = true;

//     var mapDiv = document.getElementById('mapDiv');


//   //   //if the 'Introduction' dropdown link is clicked
//   //   $('#introLink').click(function() {

//   //     // //show the 'Display' map selection elements
//   //     // document.getElementById("displayDirective").style.display="none";
//   //     // //show the into view
//   //     // document.getElementById("introDirective").style.display="block";


//   //     if (slidePanelOpen) {

//   //       console.log('intro view active');

//   //       return;

//   //     }
//   //     else {

//   //       //show the 'Display' view elements

//   //         $("#slidepanel").animate({
//   //           // "marginLeft": "+=150px"
//   //           "marginLeft": "+=240px"
//   //         }, 500);
//   //         slidePanelOpen = true;
//   //         // toggleButton.attr('value', '<');
//   //         //map.panBy(150, 0);
//   //         $('#mapDiv').animate({
//   //           // "width": "-=150px"
//   //             "width": "-=240px"
//   //         }, 500, function() {
//   //       // Animation complete.

//   //       console.log('slide complete');

//   //       //subtract 50pixels for now, update for full amount of side panel later
//   //       document.getElementById('mapDiv').style.width = document.documentElement.clientWidth - 240 + "px";


//   //       // //Update the infoBlock Position style
//   //       // // $("#infoBlock").css("right", 0 + "px");
//   //       // $("#infoBlock").css("bottom", 0 + "px");





//   //       //Reposition & resize
//   //       //repoMap(); //commented out
//   //             map.reposition();
//   //             map.resize();
              
//   //         });


//   //     }; //end of else

//   // });





//   // //if the 'Display' link is clicked
//   // //show the slide panel if not open, and show the 'Display' map selection elements
//   //   $('#displayLink').click(function() {


//   //       // //show the 'Display' map selection elements
//   //       // document.getElementById("displayDirective").style.display="block";
//   //       // //show the intro view
//   //       // document.getElementById("introDirective").style.display="none";



//   //       if (slidePanelOpen) {

//   //         console.log('display view active');

//   //         return;

//   //       }
//   //       else {

//   //         //show the 'Display' view elements

//   //           $("#slidepanel").animate({
//   //             // "marginLeft": "+=150px"
//   //             "marginLeft": "+=240px"
//   //           }, 500);
//   //           slidePanelOpen = true;
//   //           // toggleButton.attr('value', '<');
//   //           //map.panBy(150, 0);
//   //           $('#mapDiv').animate({
//   //             // "width": "-=150px"
//   //               "width": "-=240px"
//   //           }, 500, function() {
//   //         // Animation complete.

//   //         console.log('slide complete');

//   //         //subtract 50pixels for now, update for full amount of side panel later
//   //         document.getElementById('mapDiv').style.width = document.documentElement.clientWidth - 240 + "px";


//   //         //Reposition & resize
//   //         //repoMap(); //commented out
//   //               map.reposition();
//   //               map.resize();
                
//   //           });

//   //       }; //end of else

//   //   });




// });







// // //bootstrap checked list groups
// // //http://bootsnipp.com/snippets/featured/checked-list-group
// // $(function () {
// //     $('.list-group.checked-list-box .list-group-item').each(function () {
        
// //         // Settings
// //         var $widget = $(this),
// //             $checkbox = $('<input type="checkbox" class="hidden" />'),
// //             color = ($widget.data('color') ? $widget.data('color') : "primary"),
// //             style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
// //             settings = {
// //                 on: {
// //                     icon: 'glyphicon glyphicon-check'
// //                 },
// //                 off: {
// //                     icon: 'glyphicon glyphicon-unchecked'
// //                 }
// //             };
            
// //         $widget.css('cursor', 'pointer')
// //         $widget.append($checkbox);

// //         // Event Handlers
// //         $widget.on('click', function () {
// //             $checkbox.prop('checked', !$checkbox.is(':checked'));
// //             $checkbox.triggerHandler('change');
// //             updateDisplay();
// //         });
// //         $checkbox.on('change', function () {
// //             updateDisplay();
// //         });
          

// //         // Actions
// //         function updateDisplay() {
// //             var isChecked = $checkbox.is(':checked');

// //             // Set the button's state
// //             $widget.data('state', (isChecked) ? "on" : "off");

// //             // Set the button's icon
// //             $widget.find('.state-icon')
// //                 .removeClass()
// //                 .addClass('state-icon ' + settings[$widget.data('state')].icon);

// //             // Update the button's color
// //             if (isChecked) {
// //                 $widget.addClass(style + color + ' active');
// //             } else {
// //                 $widget.removeClass(style + color + ' active');
// //             }
// //         }

// //         // Initialization
// //         function init() {
            
// //             if ($widget.data('checked') == true) {
// //                 $checkbox.prop('checked', !$checkbox.is(':checked'));
// //             }
            
// //             updateDisplay();

// //             // Inject the icon if applicable
// //             if ($widget.find('.state-icon').length == 0) {
// //                 $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
// //             }
// //         }
// //         init();
// //     });
    
// //     $('#get-checked-data').on('click', function(event) {
// //         event.preventDefault(); 
// //         var checkedItems = {}, counter = 0;
// //         $("#check-list-box li.active").each(function(idx, li) {
// //             checkedItems[counter] = $(li).text();
// //             counter++;
// //         });
// //         $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
// //     });
// // });