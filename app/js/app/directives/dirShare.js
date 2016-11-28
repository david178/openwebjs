


open.directive('shareBlock', function() {

 return {
   restrict:'E',
   link:function(scope,e,a){

     // //scope.theTitle = 'Data Disclaimer:'
     // scope.theBody = 'Welcome to OpenWeb' +
     // 'Due to continuous development activity throughout Clark County, this data is for' +
     // 'reference only. The information is presented solely for the convenience of the' +
     // 'citizens of Clark County. Specific questions are to be reffered to the' +
     // 'appropriate County Department and/or municipality.' +
     // 'THE MAPS AND DATA ARE PROVIDED WITHOUT WARRANTY OF ANY KIND, EXPRESSED OR IMPLIED.'


     var theLink = window.location.href;







     // scope.theShareLink = theLink;

     // scope.theEmbedLink = '<iframe src="'+theLink+'" width="400" height="300" frameborder="0" style="border:1" allowfullscreen></iframe>';






     // //saves the theme on a theme change
     // scope.updateEmbed = function(selected) {

     //  console.log('selected')

     //  scope.embedWidth = 400;
     //  scope.embedHeight = 300;

     // };

     // // // set the default layout
     // // //$scope.layout = 'county'; //county, bright
     // // $scope.themeSet();

     // //$scope.parcelRedirect();

     // // create the list of embed size options
     // scope.embedSelects = [
     //   { name: 'default', url: 'county' },
     //   { name: 'county', url: 'county' },
     //   { name: 'dark', url: 'dark' },
     //   { name: 'light', url: 'light' }
     // ];


     //embed sizes & updating funtionality
     scope.sizes = [ {code: 1, name: 'small'}, {code: 2, name: 'medium'}, {code: 3, name: 'large'}];
     scope.selectedEmbed = scope.sizes[0];







     //Disclaimer logic
     $(function() {


      scope.theShareLink = theLink;

      scope.embedWidth = 400;
      scope.embedHeight = 300;




      scope.updateEmbed = function() {


        if (code = 1) {

          console.log(scope.selectedEmbed.code, scope.selectedEmbed.name)

         scope.embedWidth = '400';
         scope.embedHeight = '300';
         // scope.theEmbedLink = '<iframe src="'+theLink+'" width="400" height="300" frameborder="0" style="border:1" allowfullscreen></iframe>';

        }
        else if (code = 2) {

          console.log(scope.selectedEmbed.code, scope.selectedEmbed.name)

         scope.embedWidth = '600';
         scope.embedHeight = '450';
         // scope.theEmbedLink = '<iframe src="'+theLink+'" width="600" height="450" frameborder="0" style="border:1" allowfullscreen></iframe>';
         
        }
        else if (code = 3) {

          console.log(scope.selectedEmbed.code, scope.selectedEmbed.name)

         scope.embedWidth = '800';
         scope.embedHeight = '600';
         // scope.theEmbedLink = '<iframe src="'+theLink+'" width="800" height="600" frameborder="0" style="border:1" allowfullscreen></iframe>';
         
        }
        else { }


      }













      // $("input[type='text']").on("click", function () {
      //    $(this).select();
      // });

      $("#shareInputBox").on("click", function () {
         $(this).select();
         // document.execCommand('copy');

      });

      $("#embedInputBox").on("click", function () {
         $(this).select();
         // document.execCommand('copy');
      });




       //Instantiate the disclaimer dialog
        // $( "#disclaimerDialog" ).dialog({
        //        autoOpen: false,
        //        height: 350,
        //        width: 350
        //  });

        // $( "#shareDialog" ).dialog({
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


       // //Show the share dialog (shareembedList onClick)
       // $( "#shareembedListItem" ).click(function() {

       //  console.log('hit')

       //   $("#shareDialog").dialog("open");


       // });






       // /* instantiate the propInfoDialog 'i' icon */
       // var props = $("#shareDialog").dialog();
       // props.data( "uiDialog" )._title = function(title) {
       //     title.html( this.options.title );
       // };
       // props.dialog('option', 'title', '<span class="glyphicon glyphicon-exclamation-sign" style="margin-right: 5px !important;"></span> Share or Embed Map');


       // //onClose of the disclaimer Window, update the storage flag
       // $('#shareDialog').bind('dialogclose', function(event) {
       //   localStorage.setItem("disclaim", "nodisclaim");
       //   console.log(localStorage.disclaim);
       //  });


       });//-end Disclaimer Logic



   },
   //link to template-------------------------------------
   templateUrl: 'views/tempModalShare.html'

 }

})
