

open.directive('valuationBlock', function() {

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







	   },
	   //link to template-------------------------------------
	   templateUrl: 'views/tempValuation.html'


	 }

})





