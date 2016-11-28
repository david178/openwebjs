

open.directive('weatherBlock', function() {

	 return {
	   restrict:'E',
	   link:function(scope,e,a){


				//------------------------------------------------------------
			   	$('.closeWeatherIcon').on('click', function(e){

			   	 // console.log('weather close hit')

			   	  if ($("#legendDivCasing").is(":visible")) {

			   	    $('#legendDivCasing').css({
			   	      'top': 0,
			   	      'right': 0
			   	      });

			   	    // $('#weatherDivCasing').css({
			   	    //   'top': 301,
			   	    //   // 'top': 111,
			   	    //   'right': 0
			   	    //   });

				   	$('#weatherDivCasing').css({
				   	  'top': 301,
				   	  // 'top': 111,
				   	  'right': 0
				   	  });

			   	    // $("#weatherDivCasing").css({ opacity: 1 });

			   	    //  console.log($("#weatherDivCasing").position())

			   	  }
			   	  else {

			   	        $('#weatherDivCasing').css({
			   	          'top': 0,
			   	          'right': 0
			   	          });

			   	     //   console.log($("#weatherDivCasing").position())
			   	  }



			   	 // $("#weatherDivCasing").css({ opacity: .25 });

			   	});





				//------------------------------------------------------------
				$('.weatherPosOverrides').on('click', function(e){
				  //closeWeatherIcon

				 // console.log('weather click hit')

				  if ($("#legendDivCasing").is(":visible")) {

				    $('#legendDivCasing').css({
				      'top': 0,
				      'right': 0
				      });

				    $('#weatherDivCasing').css({
				      'top': 301,
				      // 'top': 111,
				      'right': 0
				      });



				  //    console.log($("#weatherDivCasing").position())

				  }
				  else {

				        $('#weatherDivCasing').css({
				          'top': 0,
				          'right': 0
				          });

				  //      console.log($("#weatherDivCasing").position())

				  }


				 // $("#weatherDivCasing").css({ opacity: 1 });


				});



























	   	// //------------------------------------------------------------
	   	// $('.weatherPosOverrides').on('click', function(e){

	   	// 	console.log('this gets hit here too')

	   	// 	// // view-source:http://www.onextrapixel.com/examples/jquery-yql-weather/
	   	// 	// // http://erikflowers.github.io/weather-icons/

	   	// 	// // Specify the ZIP/location code and units (f or c)
	   	// 	// var loc = '89128'; // or e.g. SPXX0050
	   	// 	// var u = 'f';

	   	// 	// var query = "SELECT item.condition FROM weather.forecast WHERE location='" + loc + "' AND u='" + u + "'";
	   	// 	// var cacheBuster = Math.floor((new Date().getTime()) / 1200 / 1000);
	   	// 	// var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + '&format=json&_nocache=' + cacheBuster;

	   	// 	// window['wxCallback'] = function(data) {
	   	// 	//     var info = data.query.results.channel.item.condition;
	   	// 	//     $('#wxIcon').css({
	   	// 	//         backgroundPosition: '-' + (61 * info.code) + 'px 0'
	   	// 	//     }).attr({
	   	// 	//         title: info.text
	   	// 	//     });
	   	// 	//     // if (appended === true)
	   	// 	//     // {

	   	// 	//     // } else {
	   	// 	//     	$('#wxIcon2').html('')
	   	// 	//     	$('#wxIcon2').append('<img src="http://l.yimg.com/a/i/us/we/52/' + info.code + '.gif" width="34" height="34" title="' + info.text + '" />');
	   	// 	//     	// appended = true;
	   	// 	//     	$('#wxTemp').html(info.temp + '&deg;' + (u.toUpperCase()));
	   	// 	//     // }




	   	// 	//     // // if ($('#wxIcon2').html.length = 1) {
	   	// 	//     // // }
	   	// 	//     // // else {
	   	// 	//     // 	$('#wxIcon2').append('<img src="http://l.yimg.com/a/i/us/we/52/' + info.code + '.gif" width="34" height="34" title="' + info.text + '" />');
	   	// 	//     // 	$('#wxTemp').html(info.temp + '&deg;' + (u.toUpperCase()));
	   	// 	//     // // }

	   	// 	//     // var checkContent = $('#wxIcon2').html

	   	// 	//     // console.log(!checkContent);

	   	// 	//     // if (!$('#wxIcon2').html) {
	   	// 	//     // 	// console.log($('#wxIcon2').html)
	   	// 	//     // 	// $('#wxIcon2').append('<img src="http://l.yimg.com/a/i/us/we/52/' + info.code + '.gif" width="34" height="34" title="' + info.text + '" />');
	   	// 	//     // 	// $('#wxTemp').html(info.temp + '&deg;' + (u.toUpperCase()));
	   	// 	//     // }
	   	// 	//     // else {

	   	// 	//     // 	$('#wxIcon2').append('<img src="http://l.yimg.com/a/i/us/we/52/' + info.code + '.gif" width="34" height="34" title="' + info.text + '" />');
	   	// 	//     // 	$('#wxTemp').html(info.temp + '&deg;' + (u.toUpperCase()));
	   	// 	//     // }
	   	// 	//     // // console.log(!$('#wxIcon2').html)
	   		    
	   		    
	   	// 	// };

	   	// 	// $.ajax({
	   	// 	//     url: url,
	   	// 	//     dataType: 'jsonp',
	   	// 	//     cache: true,
	   	// 	//     jsonpCallback: 'wxCallback'
	   	// 	// });


	   	// });










	   	// $(function(){

	   	//     // Specify the ZIP/location code and units (f or c)
	   	//     var loc = '89128'; // or e.g. SPXX0050
	   	//     var u = 'f';

	   	//     var query = "SELECT item.condition FROM weather.forecast WHERE location='" + loc + "' AND u='" + u + "'";
	   	//     var cacheBuster = Math.floor((new Date().getTime()) / 1200 / 1000);
	   	//     var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + '&format=json&_nocache=' + cacheBuster;

	   	//     window['wxCallback'] = function(data) {
	   	//         var info = data.query.results.channel.item.condition;
	   	//         $('#wxIcon').css({
	   	//             backgroundPosition: '-' + (61 * info.code) + 'px 0'
	   	//         }).attr({
	   	//             title: info.text
	   	//         });
	   	//         $('#wxIcon2').append('<img src="http://l.yimg.com/a/i/us/we/52/' + info.code + '.gif" width="34" height="34" title="' + info.text + '" />');
	   	//         $('#wxTemp').html(info.temp + '&deg;' + (u.toUpperCase()));
	   	//     };

	   	//     $.ajax({
	   	//         url: url,
	   	//         dataType: 'jsonp',
	   	//         cache: true,
	   	//         jsonpCallback: 'wxCallback'
	   	//     });
	   	    
	   	// });




	   	// $(function(){

	   	//     // Specify the ZIP/location code and units (f or c)
	   	//     var loc = '10001'; // or e.g. SPXX0050
	   	//     var u = 'f';

	   	//     var query = "SELECT item.condition FROM weather.forecast WHERE location='" + loc + "' AND u='" + u + "'";
	   	//     var cacheBuster = Math.floor((new Date().getTime()) / 1200 / 1000);
	   	//     var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + '&format=json&_nocache=' + cacheBuster;

	   	//     window['wxCallback'] = function(data) {
	   	//         var info = data.query.results.channel.item.condition;
	   	//         $('#wxIcon').css({
	   	//             backgroundPosition: '-' + (61 * info.code) + 'px 0'
	   	//         }).attr({
	   	//             title: info.text
	   	//         });
	   	//         $('#wxIcon2').append('<img src="http://l.yimg.com/a/i/us/we/52/' + info.code + '.gif" width="34" height="34" title="' + info.text + '" />');
	   	//         $('#wxTemp').html(info.temp + '&deg;' + (u.toUpperCase()));
	   	//     };

	   	//     $.ajax({
	   	//         url: url,
	   	//         dataType: 'jsonp',
	   	//         cache: true,
	   	//         jsonpCallback: 'wxCallback'
	   	//     });
	   	    
	   	// });














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
	   templateUrl: 'views/tempWeather.html'


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