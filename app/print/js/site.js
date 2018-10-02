/* site.js */
(function () {

    /*   var record = {
           parcel: "tommy",
           Oname: "",
           SAddress: "",
           Juris: "",
           Zone: "",
           PLanduse: "",
           SubdName: "",
           LotBlock: "",
           ConYear: "",
           SaleDate: "",
           trs: "",
           SalePrice: "",
           CensusTract: "",
           RecordedDocNum: "",
           EstLotSize: "",
           FlightDate: "",
           CommDist: "",
           USSenate: "",
           USCongress: "",
           StateSenate: "",
           StateAssembly: "",
           SchoolDisttrict: "",
           UniversityRegent: "",
           BoardEducation: "",
           MCD: ""
       };
      */
    window.onload = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;
        var getdate = document.getElementById("todaysdate");
        getdate.innerText ="Date Created: "+ today;

        var printmap = document.getElementById("printmapimage");   //gets ID for Image Source
        var wwwUrl = window.location.href; //Local URL string       

        var wwwUrlCopy = wwwUrl;
        
        var maphref = wwwUrl.toString(); // URL converted to String
       
        var toSource2 = maphref.substr(0, maphref.indexOf('@')); //Gets first section of the string up to the @ from the png link
       
        var result = wwwUrlCopy.replace(toSource2, ""); //Only gets @map= and the rest of the parameters
        result = result.replace("@map=", ""); // removes @map=
        
        var removehref = result.substr(0, result.indexOf('&')); //finds only the href for the png link from the string and parameters are left
        result = result.replace(removehref, "");  //removes png link from the string and parameters are left
        
        printmap.src = removehref; //adds map to the page
        
        var FullURL = result;

        var params = FullURL.substr(1).split('&');

        for (var i = 0; i < params.length; i++) { //parce and replaces special characters
            var p = params[i].split('=');
            var value = p.toString();
               
            var pkey = value.substr(0, value.indexOf(','));
            var pvalue = value.substr(value.indexOf(',') + 1);
            var superpvalue = pvalue;
            superpvalue = superpvalue.replace(/%20/g, ' ');
            superpvalue = superpvalue.replace(/%21/g, '!');
            superpvalue = superpvalue.replace(/%22/g, '"');
            superpvalue = superpvalue.replace(/%23/g, '#');
            superpvalue = superpvalue.replace(/%24/g, '$');
            superpvalue = superpvalue.replace(/%25/g, '%');
            superpvalue = superpvalue.replace(/%26/g, '&');
            superpvalue = superpvalue.replace(/%27/g, "'");
            superpvalue = superpvalue.replace(/%28/g, '(');
            superpvalue = superpvalue.replace(/%29/g, ')');

            var vargetid = "show-" + pkey;
            var elementExists = document.getElementById(vargetid);
           
            if (elementExists == null) {
                //bad id
            }
            else {
                document.getElementById(vargetid).innerHTML = superpvalue;
            }
        }
    }
})();