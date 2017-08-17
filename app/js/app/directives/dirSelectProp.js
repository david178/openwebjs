

//http://stackoverflow.com/questions/24802668/angularjs-directive-using-another-controller?rq=1

open.directive('selProperty', function() {

	 return {
	   restrict:'E',
	   link:function(scope,e,a){




	     // scope.Title = 'Select Property'
	     // scope.Body = 'Google StreetView' +
	     // 'First Field' +
	     // 'Second Field' +
	     // 'Third Field' +
	     // 'Fourth Field' +
	     // 'Fifth Field' 

	     // scope.toggle = true;

	     //StreetView toggle
	     // scope.toggle = true;

	     // panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));


	     //Select Property Logic
	     $(function() {




	     	// function processSVData(data, status) {
	     	// 	alert('ht')
	     	//   // if (status === google.maps.StreetViewStatus.OK) {


	     	//   //   // $scope.toggle = true;
	     	//   //     //$("#streetCard").show(); //in sub for scope toggle = true
	     	//   //    // document.getElementById("streetCard").style.visibility = "visible";
	     	//   //  // document.getElementById("streetCard").style.visibility = "visible";
	     	//   //  // $(".gm-style").css("visibility", "visibile");

	     	//   //  // $(".gm-style").css("display", "none");
	     	//   //  // $(".gm-style").css("display", "block");

	     	//   //  // $(".gm-style").css("visibility", "hidden");
	     	//   //  // $(".gm-style").css("visibility", "visibile");




	     	//   //   //$scope.toggle = true;

	     	//   //   //set pano
	     	//   //   panorama.setPano(data.location.pano);

	     	//   //   //show pano
	     	//   //   panorama.setVisible(true);

	     	//   //    // //ng show - truthy
	     	//   //   $scope.toggle = true;


	     	//   //   // $( "#pano" ).animate({
	     	//   //   //     opacity: 0.25,
	     	//   //   //     // left: "+=50",
	     	//   //   //     height: "toggle"
	     	//   //   //   }, 5000, function() {
	     	//   //   //     // Animation complete.
	     	//   //   //   });

	     	//   //   $('#pano').animate({
	     	//   //     // "width": "-=150px"
	     	//   //       "width": "+=2px"
	     	//   //     }, 100, function() {
	     	//   //       // Animation complete.
	     	//   //     });




	     	   

	     	//   //   console.log($scope.toggle)

	     	//   //   // var marker = new google.maps.Marker({
	     	//   //   //   position: data.location.latLng,
	     	//   //   //   map: map,
	     	//   //   //   title: data.location.description
	     	//   //   // });



	     	//   //   // if(strViewOverride === true) {
	     	//   //   //   //ng show - truthy
	     	//   //   //   $scope.toggle = false;
	     	//   //   // }
	     	//   //   // else {
	     	//   //   //   //ng show - truthy
	     	//   //   //   $scope.toggle = true;
	     	//   //   // }




	     	//   //   // panorama.setPov({
	     	//   //   //   heading: 270,
	     	//   //   //   pitch: 0
	     	//   //   // });





	     	//   //   // panorama.setVisible(true);
	     	//   //   console.log("StreetView: " + status);
	     	//   //   console.log("StreetView locale: " + wickedLocation);
	     	//   //   console.log("SV data: " + data);
	     	//   //   $("li#streetViewList").removeClass('disable_StreetList');
	     	//   //   $("li#streetViewList").addClass('enable_StreetList');


	     	//   // } 
	     	//   // if (status === "ZERO_RESULTS") {

	     	//   //   //  // //ng show - truthy
	     	//   //   // $scope.toggle = false;
	     	//   //    // $("#streetCard").hide(); //in sub for scope toggle = false
	     	//   //   //document.getElementById("streetCard").style.visibility = "hidden";

	     	//   //   // document.getElementById('#streetCard').style.visibility='hidden';

	     	//   //    // $("#streetCard").hide(); //in sub for scope toggle = true
	     	//   //  // document.getElementById("streetCard").style.visibility = "hidden";
	     	//   //  // $(".gm-style").css("visibility", "hidden");

	     	//   //  // $(".gm-style").css("display", "block");
	     	//   //  // $(".gm-style").css("display", "none");

	     	//   //  // $(".gm-style").css("visibility", "hidden");
	     	//   //  // $(".gm-style").css("visibility", "visibile");




	     	//   //  // $scope.toggle = false;

	     	//   //   //set pano
	     	//   //   panorama.setPano(data.location.pano);

	     	//   //   //show pano
	     	//   //   panorama.setVisible(false);


	     	//   //    // //ng show - truthy
	     	//   //   $scope.toggle = false;

	     	//   //   $('#pano').animate({
	     	//   //     // "width": "-=150px"
	     	//   //       "width": "+=2px"
	     	//   //     }, 100, function() {
	     	//   //       // Animation complete.
	     	//   //     });



	     	//   //   //set pano
	     	//   //  // panorama.setPano(data.location.pano);





	     	//   //  // console.log($scope.toggle)

	     	//   //   // panorama.setVisible(false);
	     	//   //   console.log("StreetView: " + status);
	     	//   //   console.log("StreetView locale: " + wickedLocation);
	     	//   //   console.log("SV data: " + data);
	     	//   //   $("li#streetViewList").removeClass('enable_StreetList');
	     	//   //   $("li#streetViewList").addClass('disable_StreetList');

	     	//   // }

	     	//   // // alert(status)

	     	// }


















	     	// $scope.toggle = true;
	     

	       // $( "#PropInfoDialog" ).dialog({
	       //    autoOpen: false,
	       //    resizable: false,
	       //   // containment: "window",
	       //    width: 375,
	       //      show: {
	       //         effect: "drop",
	       //         direction: "up",
	       //         duration: 500
	       //     },
	       //     hide: {
	       //         effect: "fade",
	       //         duration: 1000
	       //     },
	       //     position: ([250, 60])
	       // });




			//commented out
	       // $( "#PropInfoDialog" ).dialog({
	       //    closeText: "",
	       //    autoOpen: false,
	       //    resizable: false,
	       //    width: 399,
	       //    dialogClass: 'no-close mobileHideHeader', //Transparent close button style | hide header on mobile
	       //      show: {
	       //         effect: "drop",
	       //         direction: "up",
	       //         duration: 500
	       //     },
	       //     hide: {
	       //         effect: "fade",
	       //         duration: 1000
	       //     },

	       //     position: top
	       // });

	       /* instantiate the propInfoDialog 'i' icon */
	       // var props = $("#PropInfoDialog").dialog();
	       // props.data( "uiDialog" )._title = function(title) {
	       //     title.html( this.options.title );
	       // };
	       // props.dialog('option', 'title', '<span class="glyphicon glyphicon-info-sign" style="margin-right: 5px !important;"></span> Property Information');






	       // var dialog = $( "#PropInfoDialog" );
	       // var theMap = $( "#mapDiv" );
	       // dialog.position({
	       //     my: "right",
	       //     at: "center",
	       //     of: theMap
	       // });

			// $( "#PropInfoDialog" ).position({
			    // my: "right-10 top+10",
			    // at: "right top",
			    // of: window
			    // my: "right top",
			    // at: "right top",
			    // of: window

			//     "my": "right top",
			//     "at": "right top",
			//     "of": $("#mapDiv")
			// });





			// function processSVData(data, status) {
			// 	alert('hit2')
			//   // if (status === google.maps.StreetViewStatus.OK) {


			//   //   $scope.toggle = true;

			//   //   console.log($scope.toggle)

			//   //   // var marker = new google.maps.Marker({
			//   //   //   position: data.location.latLng,
			//   //   //   map: map,
			//   //   //   title: data.location.description
			//   //   // });



			//   //   // if(strViewOverride === true) {
			//   //   //   //ng show - truthy
			//   //   //   $scope.toggle = false;
			//   //   // }
			//   //   // else {
			//   //   //   //ng show - truthy
			//   //   //   $scope.toggle = true;
			//   //   // }



			//   //   panorama.setPano(data.location.pano);
			//   //   // panorama.setPov({
			//   //   //   heading: 270,
			//   //   //   pitch: 0
			//   //   // });

			//   //   $("#streetCard").show(); //in sub for scope toggle = true



			//   //   // panorama.setVisible(true);
			//   //   console.log("StreetView: " + status);
			//   //   console.log("StreetView locale: " + wickedLocation);
			//   //   console.log("SV data: " + data);
			//   //   $("li#streetViewList").removeClass('disable_StreetList');
			//   //   $("li#streetViewList").addClass('enable_StreetList');


			//   // } 
			//   // if (status === "ZERO_RESULTS") {


			//   //   // //ng show - truthy
			//   //   // $scope.toggle = false;
			//   //   // $("#streetCard").hide(); //in sub for scope toggle = false

			//   //  // document.getElementById('#streetCard').style.visibility='hidden';

			//   //   $("#streetCard").hide(); //in sub for scope toggle = true





			//   //   console.log($scope.toggle)

			//   //   // panorama.setVisible(false);
			//   //   console.log("StreetView: " + status);
			//   //   console.log("StreetView locale: " + wickedLocation);
			//   //   console.log("SV data: " + data);
			//   //   $("li#streetViewList").removeClass('enable_StreetList');
			//   //   $("li#streetViewList").addClass('disable_StreetList');

			//   // }
			// }





	     })//-end Select Property logic



	   },
	   //link to template-------------------------------------
	   templateUrl: 'views/tempSelectProp.html'


	 }

})