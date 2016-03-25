$(document).ready(function(){



  $.getJSON("https://data.cityofnewyork.us/api/views/sxx4-xhzg/rows.json?accessType=DOWNLOAD", function(data){
    var context1 = document.getElementById('binsPerBorough').getContext('2d');
    var context2 = document.getElementById('binsPerCapita').getContext('2d');

    var binsPerBoroughData = [
      {
        value: countPerBorough(data.data, "Queens"),
        color:"#588C7E",
        highlight: "#3d6258",
        label: "Queens"
      },
      {
        value: countPerBorough(data.data, "Manhattan"),
        color:"#F2E394",
        highlight: "#beae5c",
        label: "Manhattan"
      },
      {
        value: countPerBorough(data.data, "Brooklyn"),
        color:"#F2AE72",
        highlight: "#c99160",
        label: "Brooklyn"
      },
      {
        value: countPerBorough(data.data, "Staten Island"),
        color:"#D96459",
        highlight: "#b05148",
        label: "Staten Island"
      },
      {
        value: countPerBorough(data.data, "Bronx"),
        color:"#8C4646",
        highlight: "#693535",
        label: "Bronx"
      },
    ];
    var binsPerBoroughOptions = {
      animationEasing: "easeOutQuad",
    };

    var binsPerCapitaData = {
      labels: ["Brooklyn", "Bronx", "Manhattan", "Queens", "Staten Island"],
      datasets: [
        {
          label: "",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: [parseInt((2621793 / countPerBorough(data.data, "Brooklyn"))), parseInt((1438159 / countPerBorough(data.data, "Bronx"))), parseInt((1636268 / countPerBorough(data.data, "Manhattan"))), parseInt((2321580 / countPerBorough(data.data, "Queens"))), parseInt((473279 / countPerBorough(data.data, "Staten Island")))]
        }]
    };

    var binsPerCapitaOptions = {
      scaleFontColor: "#fff",
    };

    var chart1 = new Chart(context1).Pie(binsPerBoroughData, binsPerBoroughOptions);
    var chart2 = new Chart(context2).Bar(binsPerCapitaData, binsPerCapitaOptions);


    L.mapbox.accessToken = 'pk.eyJ1Ijoic2FyZWlkIiwiYSI6ImNpbTdtaDR5dTAwaWR2Ym0wamsxM21wbTMifQ.bk04AtgM4SHQldjXz2JIeQ';

    var mapBoxTiles = L.tileLayer('https://api.mapbox.com/v4/sareid.pgh90pom/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2FyZWlkIiwiYSI6ImNpbTdtaDR5dTAwaWR2Ym0wamsxM21wbTMifQ.bk04AtgM4SHQldjXz2JIeQ', {
    attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    var mymap = L.map('map').addLayer(mapBoxTiles).setView([40.763889, -73.98], 10);
    addMarkers(data.data, mymap);

  });
});

function countPerBorough(data, name){
  var total = 0;
  for (var i = 0; i < data.length; i++){
    if (data[i][8] == name) {
      total ++;
    }
  }
  return total;
}

function addMarkers(data, map){
    for (var i = 0; i < data.length; i++){
      var marker = L.marker([data[i][12], data[i][13]]).addTo(map);
    }
  }




//Structure of Bin Location JSON:
// Data structure[0: sid, 1: id, 2: position, 3: created_at, 4: created_meta, 5: update_at,
// 6: updated_meta, 7: meta, 8: borough, 9: site_type, 10: park/site name, 11: address, 12: latitude,
// 12: longitude]