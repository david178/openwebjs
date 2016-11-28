
			//*********************** Metrics ****************************************


			//All Tracked Metrics (OWMobile3):

			//	UserAgent: '' [Init Load]
			//	Select Property
			//	More Information
			//	GetParcel
			//	MapView Search (Click)
			//	FindView Geolocation Redirect (Click)
			//	FindView Route (Click)


			//Click (contains search term)---------------------

			//	FindView APN Search - (Click)
			//	FindView Address Search - (Click)
			//	FindView Streets Search - (Click)
			//	FindView Owner Search - (Click)
			//	FindView POI Search - (Click)


			//Enter KeyDowns (contains search term)-------------

			//	MapView Owner Search - (Enter KeyDown)
			//	MapView Address Search - (Enter KeyDown)
			//	MapView APN Search - (Enter KeyDown)
			//	FindView APN Search - (Enter KeyDown)
			//	FindView Address Search - (Enter KeyDown)
			//	FindView Streets Search - (Enter KeyDown)
			//	FindView Owner Search - (Enter KeyDown)
			//	FindView POI Search - (Enter KeyDown)




			function postMetric(rApp, rAction) {

				var postMetric_requestHandle = esri.request({
				url: 'http://gisgate.co.clark.nv.us/gisdal/gisservice.svc/jsonep/addMetric',
				content:
				{
				app: rApp,
				RecordedAction: rAction
				},
				handleAs: "json",
				load: function (response, io) {
				if(rAction.substring(0,10)=='UserAgent:')
				{
				sessionNumber = response;
				}
				},
				error: function postMetricFailed(error, io) { toast(error); }
				}, true);

			}
			//************************************************************************




			//************************* Metric_Clicks *********************************

			//Recording the button clicks on findView searches
			function metric_clicks()
			{

				// var rec_apn = dojo.connect(dojo.byId('apnButton'), 'onclick', null, function() {

				// 	var apn = apn_search.value;

				// 	postMetric(productCode,sessionNumber + ':FindView APN Search - (Click) ~ ' + apn);

				// });

				// var rec_address = dojo.connect(dojo.byId('addressButton'), 'onclick', null, function() {

				// 	var address = address_search.value;

				// 	postMetric(productCode,sessionNumber + ':FindView Address Search - (Click) ~ ' + address);

				// });


				// var rec_streets = dojo.connect(dojo.byId('streetsButton'), 'onclick', null, function() {

				// 	var streets = crossStreet_search.value;

				// 	postMetric(productCode,sessionNumber + ':FindView Streets Search - (Click) ~ ' + streets);

				// });


				// var rec_owner = dojo.connect(dojo.byId('ownerButton'), 'onclick', null, function() {

				// 	var owner = owner_search.value;

				// 	postMetric(productCode,sessionNumber + ':FindView Owner Search - (Click) ~ ' + owner);

				// });



				// var rec_poi = dojo.connect(dojo.byId('poiButton'), 'onclick', null, function() {

				// 	var POI = poi_search.value;

				// 	postMetric(productCode,sessionNumber + ':FindView POI Search - (Click) ~ ' + POI);

				// });

			}
			//************************************************************************


			//*************************** Ready **************************************

			dojo.ready(metric_clicks);

			//************************************************************************