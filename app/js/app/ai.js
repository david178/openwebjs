
//************************************************
//******************* AI ************************
//************************************************

//d3 (javascript, manipulating documents based on data)
//https://github.com/d3/d3/wiki/Tutorials
//https://d3js.org/

//deep learning, browser based
//http://cs.stanford.edu/people/karpathy/convnetjs/


//https://wit.ai/
//https://wit.ai/docs/recipes#extract-a-keyword-entity
//https://wit.ai/docs/recipes#extract-and-store-information-from-user-messages

// Where can I see documentation?
// intent    findDocs
// docs   documentation
// findDocs (context, entities)
// >add context branch   - docs
// bot says: You want to see {docs}


// ----------------------------------------

// What's the weather in Rome?
// intent - weather
// wit/location  - Rome (highlight in sentence)
// getForecast (contest entities)
// getForecast
// The weather will be {forecast}



function ai(pass) {

  //if pass.length is greater than 2-3 chars


  console.log(pass + ' testing')

  var pass = pass.toLowerCase();



  if (pass.indexOf("tour") !=-1) {
      // alert(elm);
      // foundLinks++;


      // setTimeout(
      //     function() {
      //        $( "#qGuideLink" ).trigger( "click" );
      //     },
      //     250
      // );

      // setTimeout(
      //     function() {
      //        $( "#qGuideLink" ).trigger( "click" );
      //     },
      //     250
      // );

      setTimeout(
          function() {
             $( "#tourButton" ).trigger( "click" );
          },
          250
      );




  } else if (pass.indexOf("docs") !=-1) {

    setTimeout(
        function() {
           //$( "#gearTab" ).trigger( "click" );
           //$( "#aGuideLink" ).trigger( "click" );

           $('a[id$="aGuideLink"]').trigger( "click" );
        },
        250
    );



    // setTimeout(
    //     function() {
    //        $( "#gearTab" ).trigger( "click" );
    //       // $( "#tourButtonListItem" ).trigger( "click" );
    //     },
    //     250
    // );



    // setTimeout(
    //     function() {
    //        $( "#aGuideLink" ).trigger( "click" );
    //     },
    //     250
    // );
   // $('a[href$=".pdf"]').prop('target', '_blank');




  } else if (pass.indexOf("help") !=-1) {



  } else if (pass.indexOf("silverlight") !=-1) {


    $('#introLink')[0].click(); // Works too!!!

    // setTimeout(
    //     function() {
    //        $( "#introLink" )[0].trigger( "click" );
    //     },
    //     250
    // );

    // //alternatives

    // ('#test1').trigger('click'); // Nothing
    // $('#test2').find('span').trigger('click'); // Works
    // $('#test2 span').trigger('click'); // Also Works
    // $('#test1')[0].click(); // Works too!!!






  } else if (pass.indexOf("help") !=-1) {


    $('#assistantModal').modal('show');


  } else {


    $('#assistantModal').modal('show');


  }



  // if (pass.includes("documentation")) {

  //   setTimeout(
  //       function() {
  //          $( "#qGuideLink" ).trigger( "click" );
  //       },
  //       250
  //   );


  // }



  // } else if (pass.contains("help")) {



  // } else {
 


  // }







  // switch(pass){
  //     case 'aerial imagery only': //---------------------------------------



  //         break;

  //     case 'assessor map': //---------------------------------------




  //         break;

  //     case 'contours 1996 5ft (valley)': //---------------------------------------
          




  //         break;

  //     case 'default': //---------------------------------------



  //         break;

  //     case 'las vegas zoning': //---------------------------------------
          




  //         break;

  //     case 'mesquite zoning': //---------------------------------------
          



  //         break;

  //     case 'north las vegas zoning': //---------------------------------------
          



  //         break;

  //     case 'seismic': //---------------------------------------
          



  //         break;

  //     case 'soil guideline': //---------------------------------------
          


  //         break;

  //     default: //---------------------------------------


  //        break;
  // }




}













