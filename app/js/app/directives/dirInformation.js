

//http://stackoverflow.com/questions/24802668/angularjs-directive-using-another-controller?rq=1

open.directive('infoBlock', function() {


	 return {
	   restrict:'E',
	   link:function(scope,e,a){


	   	
	   	if (isMobile) {

	   	 console.log(isMobile)
	   	    $(".esriScalebar").css("left", -194 + "px");

	   	}




	 //   	//Memory Storage (Save, Load) ------------------------------------------------------------------


	 //   	//issue with event.target v currentTarget when tabs contain child elements like icons
	 //   	//http://stackoverflow.com/questions/12430820/accessing-clicked-element-in-angularjs

	 //   	// scope.saveTab = function ($event) {
	 //   	//    // console.log($event.target.id);

	 //   	//    // console.log($event.target.id);

	 //   	//    localStorage.setItem("mainTab", $event.target.id);

	 //   	//    console.log($event.target.id);
	 //   	// }



	 //   	// $scope.saveTab = function ($event) {
	 //   	//    // console.log($event.target.id);

	 //   	//    // console.log($event.target.id);

	 //   	//    localStorage.setItem("mainTab", $event.target.id);

	 //   	//    console.log($event.target.id);
	 //   	// }



	 //   	// scope.saveTab = function ($event) {
	 //   	//    // console.log($event.target.id);

	 //   	//    // console.log($event.target.id);

	 //   	//    localStorage.setItem("mainTab", $event.currentTarget.id);

	 //   	//    console.log($event.currentTarget.id);
	 //   	// }






	 //   	// // store the currently selected tab in the hash value
	 //   	// $("ul.nav-tabs > li > .tackLi").on("shown.bs.tab", function(e) {
	 //   	//   // var id = $(e.target).attr("href").substr(1);
	 //   	//   // window.location.hash = id;
	 //   	// });


		// // // store the currently selected tab in the hash value
		// // $("ul.nav-tabs > li > a").on("shown.bs.tab", function(e) {
		// //   // var id = $(e.target).attr("href").substr(1);
		// //   // window.location.hash = id;
		// //   console.log('hit')
		// // });







	 //   	// // store the currently selected tab in the hash value
	 //   	// $("ul.nav-tabs > li > a").on("shown.bs.tab", function(e) {
	 //   	//   var id = $(e.target).attr("href").substr(1);
	 //   	//   window.location.hash = id;
	 //   	// });



		// // // store the currently selected tab in the hash value
		// // $("ul.nav-tabs > li > a").on("shown.bs.tab", function(e) {
		// //   // var id = $(e.target).attr("href").substr(1);
		// //   // window.location.hash = id;

		// //   console.log('hit inner')
		// // });




		// // scope.saveTab = function ($event) {
		// //    // console.log($event.target.id);

		// //    // console.log($event.target.id);

		// //    localStorage.setItem("mainTab", $event.target.id);

		// //    console.log($event.target.id);

		// // }





		







	 //   	 //Load Saved Settings from Memory --------------------------------------------
	 //   	 //load -mainTab- (loads a saved theme from memory)

	 //   	 if(localStorage.mainTab === "compassTab") {


	 //   	 	//update appropriate links to active class
	 //   	 	$('li.tackLi').removeClass('active');
	 //   	 	$('li.compassLi').addClass('active');
	 //   	 	$('li.pencilLi').removeClass('active');
	 //   	 	$('li.gearLi').removeClass('active');


	 //   	 	//update appropriate links to active class
	 //   	 	$('#a.tab-pane').removeClass('active');
	 //   	 	$('#b.tab-pane').addClass('active');
	 //   	 	$('#c.tab-pane').removeClass('active');
	 //   	 	$('#d.tab-pane').removeClass('active');



	 //   	   // $('.nav-tabs a[href="#samosas"]').tab('show');



	 //   	   // var actived_nav = $('.nav-tabs > li.active');
	 //   	   // actived_nav.removeClass('active');

	 //   	   // // nav nav-tabs




	 //   	   // // //update appropriate links to active class
	 //   	   // // $('li.tackLi').removeClass('active');
	 //   	   // $('.nav-tabs > li.compassLi.active').addClass('active');
	 //   	   // // // $('.pencilLi').removeClass('active');
	 //   	   // // // $('.gearLi').removeClass('active');

	 //   	   //console.log('hits compass')



	 //   	     // // set the default layout
	 //   	     // $scope.layout = 'dark'; //county, bright
	   	     
	 //   	    console.log("M [[ " + localStorage.mainTab + " tab active ]]");
	 //   	 } 
	 //   	 else if (localStorage.mainTab === "pencilTab") {

	 //   	   //update appropriate links to active class
	 //   	   $('li.tackLi').removeClass('active');
	 //   	   $('li.compassLi').removeClass('active');
	 //   	   $('li.pencilLi').addClass('active');
	 //   	   $('li.gearLi').removeClass('active');


	 //   	   //update appropriate links to active class
	 //   	   $('#a.tab-pane').removeClass('active');
	 //   	   $('#b.tab-pane').removeClass('active');
	 //   	   $('#c.tab-pane').addClass('active');
	 //   	   $('#d.tab-pane').removeClass('active');




	 //   	   console.log('hits pencil')





	 //   	   // // set the default layout
	 //   	   // $scope.layout = 'light'; //county, bright

	 //   	  console.log("M [[ " + localStorage.mainTab + " tab active ]]"); 
	 //   	 }
	 //   	 else if (localStorage.mainTab === "gearTab") {

	 //   	   //update appropriate links to active class
	 //   	   $('li.tackLi').removeClass('active');
	 //   	   $('li.compassLi').removeClass('active');
	 //   	   $('li.pencilLi').removeClass('active');
	 //   	   $('li.gearLi').addClass('active');


	 //   	   //update appropriate links to active class
	 //   	   $('#a.tab-pane').removeClass('active');
	 //   	   $('#b.tab-pane').removeClass('active');
	 //   	   $('#c.tab-pane').removeClass('active');
	 //   	   $('#d.tab-pane').addClass('active');





	 //   	   // // set the default layout
	 //   	   // $scope.layout = 'light'; //county, bright

	 //   	  console.log("M [[ " + localStorage.mainTab + " tab active ]]"); 
	 //   	 }
	 //   	 else {

	 //   	   // //update appropriate links to active class
	 //   	   // $('.tackLi').addClass('active');
	 //   	   // $('.compassLi').removeClass('active');
	 //   	   // $('.pencilLi').removeClass('active');
	 //   	   // $('.gearLi').removeClass('active');




	 //   	   // // set the default layout
	 //   	   // $scope.layout = 'county'; //county, bright

	 //   	  console.log("M [[ " + localStorage.mainTab + " tab active ]]");

	 //   	}

	 //   	//--------------------------------------------------------------------------------------
















	     // scope.Title = 'Select Property';
	     // scope.Body = 'Google StreetView' +
	     // 'First Field' +
	     // 'Second Field' +
	     // 'Third Field' +
	     // 'Fourth Field' +
	     // 'Fifth Field';



	     // scope.selected = 0;

	     //  scope.select= function(index) {
	     //     scope.selected = index; 

	     //     console.log(index)
	     //  };



	     // // //update appropriate links to active class
	     // // $('li.tackLi').removeClass('active');
	     // $('.nav-tabs > li.compassLi.active').addClass('active');
	     // // // $('.pencilLi').removeClass('active');
	     // // // $('.gearLi').removeClass('active');




	     // scope.loadInformationSettings = function() {

	     // 	// if(localStorage.mainTab === "compassTab") {

	     // 	// }



	     // }



	     // //update appropriate links to active class
	     // $('li.tackLi').removeClass('active');
	     // $('li.compassLi').addClass('active');
	     // $('li.pencilLi').removeClass('active');
	     // $('li.gearLi').removeClass('active');
































	     // //************* Remove Loading Screen (onFinishLoad) *********************
	     // // at the bottom of your controller
	     // var init = function () {


	     // 	// //load config
	     // 	// $scope.loadConfig();



	     //    // check if there is query in url
	     //    // and fire search in case its value is not empty

	     //    //remove the loading display
	     //    document.getElementById("loading").style.display = "none";

	     // };
	     // // and fire it after definition
	     // init();
	     // //*****************************************************************************

	     //************* Remove Loading Screen (onFinishLoad) *********************
	     // at the bottom of your controller
	     var init = function () {
	        // check if there is query in url
	        // and fire search in case its value is not empty

	        //remove the loading display
	        document.getElementById("loading").style.display = "none";

	     };
	     // and fire it after definition
	     init();





	     // //****************** Remove Loading Screen (onFinishLoad) **************************
	     // // at the bottom of your controller
	     // var init = function () {

	     //     //lang redirect -----------------
	     //     var queryString = window.location.search;
	     //     queryString = queryString.substring(1).split("=");

	     //     //load config
	     //     $scope.loadConfig();

	     //     //load by lang
	     //     if (queryString[1] === 'fil') {

	     //         //update appropriate links to active class
	     //         $('.navlist_eng').removeClass('active');
	     //         $('.navlist_sp').removeClass('active');
	     //         $('.navlist_fil').addClass('active');

	     //         $scope.loadElec(queryString[1]);
	     //     }
	     //     else if (queryString[1] === 'sp') {

	     //         //update appropriate links to active class
	     //         $('.navlist_eng').removeClass('active');
	     //         $('.navlist_sp').addClass('active');
	     //         $('.navlist_fil').removeClass('active');

	     //         $scope.loadElec(queryString[1]);
	     //     }
	     //     else {
	     //         $scope.loadElec('eng');
	     //     }

	     //     // After a brief timeout, clone and inject the compiled DOM element.
	     //      setTimeout(
	     //          function() {
	     //             //remove the loading display
	     //             document.getElementById("loading").style.display = "none";
	     //          },
	     //          250
	     //      );
	     // };
	     // // and fire it after definition
	     // init();
	     // //*****************************************************************************
















	     	//Call to reposition prop info on infoblock click
	          // $('div.infoBlock').click(function() { 
	          	//propInfoRepo
	            $('div.infoBlock').click(function() { 
	     	       //call to repo
	     	       setTimeout(function(){
	     	           //call to repo
	     	           propInfoRepo_Second();
	     	       }, 100);
	            });





	        //     $(function() {

	        //     $('.theMainTabs a').click(function (e) {
	        //       // $(this).tab('show');
	        //       // var scrollmem = $('body').scrollTop() || $('html').scrollTop();
	        //      window.location.hash = this.hash;
	        //       // $('html,body').scrollTop(scrollmem);

	        //       console.log(this.hash)
	        //     });


	        // });




	     // // $('div.infoBlock').click(function() { 
	     // 	//propInfoRepo
	     //   $('div.infoBlock').click(function() { 
		    //    //call to repo
		    //    propInfoRepo_First();
	     //   });



	   },
	   //link to template
	   templateUrl: 'views/tempInformation.html'

	 }

})