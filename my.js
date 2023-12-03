var mrk;
var map;

function initMap() {
    const myLatLng = { lat:37.97711189082989, lng: 23.720595200347685 };
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatLng,
    });

    google.maps.event.addListener(map, 'click', function( event ){
          
        var lat1=event.latLng.lat();
        var lng1=event.latLng.lng();
        document.getElementById("lat").innerHTML=lat1;
        document.getElementById("long").innerHTML=lng1;
        mrk.setMap(null);
        var mlng= { lat: lat1,lng: lng1 };
        mrk= new google.maps.Marker({
          position: mlng,
          map,
          title: "Hello World!",
          draggable:true
        });


        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '6e8c55ff41msh9d6c5b97ababe7cp1e6c0bjsn0aaba81b5c94',
            'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
          }
        };
        console.log('https://yahoo-weather5.p.rapidapi.com/weather?lat='+lat1+'&long='+lng1+'&format=json&u=f');
        fetch('https://yahoo-weather5.p.rapidapi.com/weather?lat='+lat1+'&long='+lng1+'&format=json&u=f', options)
          .then(response => response.json())
          .then(response => {
              document.getElementById("city").innerHTML=(response.location.city);
              document.getElementById("country").innerHTML=(response.location.country);
              document.getElementById("con").innerHTML=(response.current_observation.condition.text);
              document.getElementById("temp").innerHTML=((5/9*(response.current_observation.condition.temperature-32)).toFixed(2));
              
              code="<div class='col-sm-4'><div class='well'>";
              for (i=0;i<3;i++) 
              {
              code+="<table><tr><td>"+response.forecasts[i].day+"</td><td>"+response.forecasts[i].text+"</td>";              
              code+="</td></tr></table>";
              }
              code+="</div></div>";           
              document.getElementById("tab1").innerHTML=code;

              code="<div class='col-sm-4'><div class='well'>";
              for (i=3;i<6;i++) 
              {
              code+="<table><tr><td>"+response.forecasts[i].day+"</td><td>"+response.forecasts[i].text+"</td>";              
              code+="</td></tr></table>";
              }
              code+="</div></div>";           

              document.getElementById("tab2").innerHTML=code;

              code="<div class='col-sm-4'><div class='well'>";
              for (i=6;i<9;i++) 
              {
              code+="<table><tr><td>"+response.forecasts[i].day+"</td><td>"+response.forecasts[i].text+"</td>";              
              code+="</td></tr></table>";
              }
              code+="</div></div>";           

              document.getElementById("tab3").innerHTML=code;

            
            
                   
          })
          .catch(err => console.error(err));
        });
        
       mrk= new google.maps.Marker({
          position: myLatLng,
          map,
          title: "Hello World!",
          draggable:true
        });
        
    
    
  };