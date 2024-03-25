// Get JSON data via API call
function fetchEarthquakeData() {
  // earthquake data를 불러오기 위한 주소
  const url = "https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=1900-01-01%2000:00:00&minmagnitude=8&orderby=time";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayEarthquakeData(data.features); // 테이블 데이터 생성 함수 호출
      markingEarthquakeSpot(data.features); // 지도에 마커 생성 함수 호출
    })
    .catch(error => console.error('Error fetching earthquake data:', error));
}

var marker = [];
var map;

// JSON data parsing & Show Table
function displayEarthquakeData(earthquakeData) {
  //earthquakeList ID에 해당 데이터 반환
  const earthquakeListElement = document.getElementById("earthquakeList");
  earthquakeListElement.innerHTML = "";

  //earthquakeData Sorting
  const mySelecting = document.getElementById("dropdown").selectedIndex;
  if(mySelecting == 0){
    // Date Sorting - ascending
    earthquakeData.sort((a, b) => a.properties.time- b.properties.time);
  }
  else if(mySelecting == 1){
    // Date Sorting - descending
    earthquakeData.sort((a, b) => b.properties.time - a.properties.time);
  }
  else if(mySelecting == 2){
    // magnitude Sorting - ascending
    earthquakeData.sort((a, b) => a.properties.mag - b.properties.mag);
    console.log(mySelecting);
  }
  else{
    // magnitude Sorting - descending
    earthquakeData.sort((a, b) => b.properties.mag - a.properties.mag);
  }

  var index = 1;
  // Create table elements
  earthquakeData.forEach(earthquake => {
    const earthquakePlace = earthquake.properties.place;
    const earthquakeMagnitude = earthquake.properties.mag;
    const earthquakeTime = new Date(earthquake.properties.time).toUTCString();
    const earthquakeDetailURL = earthquake.properties.url;
    const listItem = document.createElement("tr");
    listItem.innerHTML = `
      <td>${index}</td>
      <td><a href="${earthquakeDetailURL}">${earthquakePlace}</a></td>
      <td>${earthquakeMagnitude}</td>
      <td>${earthquakeTime}</td>
    `;
    // 테이블 row에 데이터 추가
    earthquakeListElement.appendChild(listItem);
    index += 1;
  });
}

// Loading maps using the leaflet library
function loadingMap(){
    // 서울 중심으로 확대 level=13 지도 초기화
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
      if(earthquake.properties.mag < 8.5) img_url = './images/green_dark.png';
      else if(earthquake.properties.mag < 9) img_url = 'images/orange.png';
      else img_url = './images/red.png';
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

// Load data on page load
document.addEventListener("DOMContentLoaded", loadingMap);
document.addEventListener("DOMContentLoaded", fetchEarthquakeData);
