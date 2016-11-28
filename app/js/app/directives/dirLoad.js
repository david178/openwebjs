

open.directive('loadScreen', function() {

 return {
   restrict:'E',
   link:function(scope,e,a){




      // //************* Remove Loading Screen (onFinishLoad) *********************
      // // at the bottom of your controller
      // var init = function () {
      //    // check if there is query in url
      //    // and fire search in case its value is not empty


      //    //remove the loading display
      //    document.getElementById("loading").style.display = "none";

      // };
      // // and fire it after definition
      // init();




   // //Call to reposition prop info on infoblock click
   //   // $('div.infoBlock').click(function() { 
   //    //propInfoRepo
   //     $('div.infoBlock').click(function() { 
   //        //call to repo
   //        setTimeout(function(){
   //            //call to repo
   //            propInfoRepo_Second();
   //        }, 100);
   //     });



     // //Load logic
     // $(function() {

     //  // });


     // })//-end laodScreen Logic



   },
   //link to template-------------------------------------
   templateUrl: 'views/tempLoad.html'

 }

})
