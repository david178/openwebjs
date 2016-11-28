


open.directive('disclaimBlock', function() {

 return {
   restrict:'E',
   link:function(scope,e,a){

     //scope.theTitle = 'Data Disclaimer:'
     scope.theBody = 'Welcome to OpenWeb' +
     'Due to continuous development activity throughout Clark County, this data is for' +
     'reference only. The information is presented solely for the convenience of the' +
     'citizens of Clark County. Specific questions are to be reffered to the' +
     'appropriate County Department and/or municipality.' +
     'THE MAPS AND DATA ARE PROVIDED WITHOUT WARRANTY OF ANY KIND, EXPRESSED OR IMPLIED.'



     //Disclaimer logic
     $(function() {

       //Instantiate the disclaimer dialog
        // $( "#disclaimerDialog" ).dialog({
        //        autoOpen: false,
        //        height: 350,
        //        width: 350
        //  });

        $( "#disclaimerDialog" ).dialog({
            closeText: "",
            autoOpen: false,
            resizable: false,
            // height: auto,
            width: 399,
            dialogClass: 'no-close', //conditionalShow -- Transparent close button style | hide header on mobile
              show: {
                 effect: "drop",
                 direction: "up",
                 duration: 500
             },
             hide: {
                 effect: "fade",
                 duration: 1000
             }
             //position: ([250, 60])
         });        

        // $( "#disclaimerDialog_mobile" ).dialog({
        //     closeText: "",
        //     autoOpen: false,
        //     resizable: false,
        //     // height: auto,
        //     width: 399,
        //     dialogClass: 'no-close', //conditionalShow -- Transparent close button style | hide header on mobile
        //       show: {
        //          effect: "drop",
        //          direction: "up",
        //          duration: 500
        //      },
        //      hide: {
        //          effect: "fade",
        //          duration: 1000
        //      }
        //      //position: ([250, 60])
        //  }); 


       //Show the disclaimer dialog (imgLogo onClick)
       $( "#logoTitle" ).click(function() {
         $("#disclaimerDialog").dialog("open");
       });
       // $( "#imgLogo" ).click(function() {
       //   $("#disclaimerDialog").dialog("open");
       // });
       // $( "#CountyLogo" ).click(function() {
       //   $("#disclaimerDialog").dialog("open");
       // });
       // //Show the mobile disclaimer dialog (imgLogo_mobile onClick)
       // $( "#imgLogo_mobile" ).click(function() {
       //   $("#disclaimerDialog_mobile").dialog("open");
       //   // alert('test')
       // });


      //Show the disclaimer dialog (imgLogo onClick)
      // $( "#moreInfoLink" ).click(function() {
      // // $("#PropInfoDialogMob").dialog("open");
      //   console.log('open')
      // });
      // $( "#logoTitle2" ).click(function() {
      //   console.log('open');
      // });






       /* instantiate the propInfoDialog 'i' icon */
       var props = $("#disclaimerDialog").dialog();
       props.data( "uiDialog" )._title = function(title) {
           title.html( this.options.title );
       };
       props.dialog('option', 'title', '<span class="glyphicon glyphicon-exclamation-sign" style="margin-right: 5px !important;"></span> Data Disclaimer');


       //onClose of the disclaimer Window, update the storage flag
       $('#disclaimerDialog').bind('dialogclose', function(event) {
         localStorage.setItem("disclaim", "nodisclaim");
         console.log(localStorage.disclaim);
        });


       });//-end Disclaimer Logic



   },
   //link to template-------------------------------------
   templateUrl: 'views/tempDisclaimer.html'

 }

})
