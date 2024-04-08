function fetchEarthquakeData() {
  // earthquake data를 불러오기 위한 주소
  const url = "https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=1900-01-01%2000:00:00&minmagnitude=8&orderby=time";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      markingEarthquakeSpot(data.features); // 지도에 마커 생성 함수 호출
    })
    .catch(error => console.error('Error fetching earthquake data:', error));
}


var marker = [];
var map;

function loadingMap(){
    map = L.map('map').setView([37.5665, 126.9780], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

// Make Mark & Show Popup(Click)
function markingEarthquakeSpot(earthquakeData) {
  marker = []
  // marking process
  earthquakeData.forEach(earthquake => {
    var img_url = '';
    if(earthquake.properties.mag < 8.5) img_url = './image/darkgreen.png';
    else if(earthquake.properties.mag < 9) img_url = 'image/orange.png';
    else img_url = './image/red.png';
    // Create custom Icon - Color circle & Show mag Data
    var customIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="icon-container">
        <img src="${img_url}" style="width: 40px; height: 40px; border-radius: 50%;">
        <div class="icon-text">${earthquake.properties.mag}</div>
        </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20]
  });
      // JSON 데이터에서 위도, 경도값 불러오기
      coordinate = [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]];
      // add marker
      mark = L.marker(coordinate, {icon: customIcon}).addTo(map);
      // 해당 마커에 bindpopup option 추가
      mark.bindPopup(`
          <div style="font-size: 15px; margin: 0;">
          <p>Place: ${earthquake.properties.place}</p>
          <p>Mag: ${earthquake.properties.mag}</p>
          <p>Date: ${new Date(earthquake.properties.time).toUTCString()}</p>
          <p>More Detail: <a href="${earthquake.properties.url}">more..</a></p>
          </div>
      `);
      
      marker.push(mark);
  });

}

document.addEventListener("DOMContentLoaded" , loadingMap);
document.addEventListener("DOMContentLoaded" , fetchEarthquakeData);