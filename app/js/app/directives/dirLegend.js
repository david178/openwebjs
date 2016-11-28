

open.directive('legBlock', function() {

	 return {
	   restrict:'E',
	   link:function(scope,e,a){



			   	// function ChangeUrl(page, url) {
			   	//     if (typeof (history.pushState) != "undefined") {
			   	//         var obj = {Page: page, Url: url};
			   	//         history.pushState(obj, obj.Page, obj.Url);
			   	//     } else {
			   	//         window.location.href = "@homePage";
			   	//         // alert("Browser does not support HTML5.");
			   	//     }
			   	// }

			   	// ChangeUrl('Page1', '@homePage');




			   	//------------------------------------------------------------
			   	$('.closeLegIcon').on('click', function(e){

			   		




			   	   // console.log('legend close hit')

			   	    //if weather casing is active
			   	    if ($("#weatherDivCasing").is(":visible")) {

			   	     // console.log('legend click hit - weather is vis ')

			   	        $('#weatherDivCasing').css({
			   	          'top': 0,
			   	          'right': 0
			   	          });

			   	        $('#legendDivCasing').css({
			   	          // 'top': 301,
			   	          'top': 111,
			   	          'right': 0
			   	          });


			   	   // console.log($("#legendDivCasing").position())

			   	    }
			   	    else {

			   	    //  console.log('legend click hit - weather is hidden ')


			   	          $('#legendDivCasing').css({
			   	            'top': 0,
			   	            'right': 0
			   	            });


			   	     // console.log($("#legendDivCasing").position())

			   	    }


			   	   // $("#legendDivCasing").css({ opacity: .25 });

			   	});








			   	//------------------------------------------------------------
			   	//adjusts positioning for display view associated blocks (legend, weather)
			   	$('.legPosOverrides').on('click', function(e){
			   	  //closeLegIcon

			   	 // console.log('legend click hit')


			   	  //if weather casing is active
			   	  if ($("#weatherDivCasing").is(":visible")) {

			   	    	//console.log('legend click hit - weather is vis ')

			   	      $('#weatherDivCasing').css({
			   	        'top': 0,
			   	        'right': 0
			   	        });

			   	      $('#legendDivCasing').css({
			   	        // 'top': 301,
			   	        'top': 111,
			   	        'right': 0
			   	        });

			   			//console.log($("#legendDivCasing").position())

			   	  }
			   	  else {

			   	    	//console.log('legend click hit - weather is hidden ')

			   	        $('#legendDivCasing').css({
			   	          'top': 0,
			   	          'right': 0
			   	          });

			   	    //	console.log($("#legendDivCasing").position())

			   	  }


			   	 // $("#legendDivCasing").css({ opacity: 1 });

			   	});

















































	     // //Select Property Logic
	     // $(function() {
	     
	     //   $( "#LegendDialog" ).dialog({
	     //      closeText: "",
	     //      autoOpen: false,
	     //      resizable: false,
	     //      width: 399,
	     //      dialogClass: 'no-close mobileHideHeader', //Transparent close button style | hide header on mobile
	     //        show: {
	     //           effect: "drop",
	     //           direction: "up",
	     //           duration: 500
	     //       },
	     //       hide: {
	     //           effect: "fade",
	     //           duration: 1000
	     //       },
	     //       position: ([250, 60])
	     //   });

	     //   // //Show the dialog (logoTitle onClick)
	     //   // $( "#drawLink" ).click(function() {
	     //     $("#LegendDialog").dialog("open");
	     //   // });


	     //   /* instantiate the propInfoDialog 'i' icon */
	     //   var props = $("#DrawDialog").dialog();
	     //   props.data( "uiDialog" )._title = function(title) {
	     //       title.html( this.options.title );
	     //   };
	     //   // props.dialog('option', 'title', '<span class="glyphicon glyphicon-pencil" style="margin-right: 5px !important;"></span> Draw / Measure');

	     //   props.dialog('option', 'title', '<span class="custom-icon-2 icon-map slide-icons" style="margin-right: 5px !important;">&#xe827;</span> Legend');



	     //   // demo-icon icon-map">&#xe827;

	     //   // <i class="custom-icon-2 icon-map slide-icons">&#xe827;</i>


	     // })//-end Draw Dialog logic



	   },
	   //link to template-------------------------------------
	   templateUrl: 'views/tempLegend.html'


	 }

})







































// //http://stackoverflow.com/questions/24802668/angularjs-directive-using-another-controller?rq=1

// open.directive('legendWindow', function() {

// 	 return {
// 	   restrict:'E',
// 	   link:function(scope,e,a){

// 	     //Select Property Logic
// 	     $(function() {
	     
// 	       $( "#LegendDialog" ).dialog({
// 	          closeText: "",
// 	          autoOpen: false,
// 	          resizable: false,
// 	          width: 399,
// 	          dialogClass: 'no-close mobileHideHeader', //Transparent close button style | hide header on mobile
// 	            show: {
// 	               effect: "drop",
// 	               direction: "up",
// 	               duration: 500
// 	           },
// 	           hide: {
// 	               effect: "fade",
// 	               duration: 1000
// 	           },
// 	           position: ([250, 60])
// 	       });

// 	       // //Show the dialog (logoTitle onClick)
// 	       // $( "#drawLink" ).click(function() {
// 	         $("#LegendDialog").dialog("open");
// 	       // });


// 	       /* instantiate the propInfoDialog 'i' icon */
// 	       var props = $("#DrawDialog").dialog();
// 	       props.data( "uiDialog" )._title = function(title) {
// 	           title.html( this.options.title );
// 	       };
// 	       // props.dialog('option', 'title', '<span class="glyphicon glyphicon-pencil" style="margin-right: 5px !important;"></span> Draw / Measure');

// 	       props.dialog('option', 'title', '<span class="custom-icon-2 icon-map slide-icons" style="margin-right: 5px !important;">&#xe827;</span> Legend');



// 	       // demo-icon icon-map">&#xe827;

// 	       // <i class="custom-icon-2 icon-map slide-icons">&#xe827;</i>


// 	     })//-end Draw Dialog logic



// 	   },
// 	   //link to template-------------------------------------
// 	   templateUrl: 'views/tempLegend.html'


// 	 }

// })