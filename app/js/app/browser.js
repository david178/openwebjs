


function browser() {

  //sniff the browser and then apply adjustments


  //if ie














//   //let x = the document width, set to '0' (default)
//     x = 0;
//     if (self.innerHeight)
//     {
//             x = self.innerWidth;
//     }
//     else if (document.documentElement && document.documentElement.clientHeight)
//     {
//             x = document.documentElement.clientWidth;
//     }
//     else if (document.body)
//     {
//             x = document.body.clientWidth;
//     }


//     //Window size is less than 768 pixels
//     //Collapse the slide Panel
//     if (x < 768)
//     {


//         if (slidePanelOpen) {
//             // hide panel
//             $("#slidepanel").animate({
//                 "marginLeft": "-=240px"
//             }, 350);
//             slidePanelOpen = false;
//             // change width of map to fill empty space left from collapse of sldide panel
//             $('#mapDiv').animate({
//               // "width": "-=150px"
//                 "width": "+=240px"
//             }, 350, function() {
//           // Animation complete.

//           console.log('slide complete');


//           //subtract 50pixels for now, update for full amount of side panel later
//           document.getElementById('mapDiv').style.width = document.documentElement.clientWidth + "px";

//                 repoMap();

//             });

//         }


//     }

//     //Window size is greater than or equal to 768 pixels
//     //Expand the slide Panel
//     if (x >= 768)
//     {
//       if (slidePanelOpen === false) {

//         $("#slidepanel").animate({
//           "marginLeft": "+=240px"
//         }, 350);
//         slidePanelOpen = true;
//         $('#mapDiv').animate({
//             "width": "-=240px"
//         }, 350, function() {
//           // Animation complete.

//           console.log('slide complete');


//           //subtract 50pixels for now, update for full amount of side panel later
//           document.getElementById('mapDiv').style.width = document.documentElement.clientWidth - 240 + "px";


//           //Reposition & resize
//             repoMap();



//         });

//   }

// }


}



$(function() {
  browser();
})
