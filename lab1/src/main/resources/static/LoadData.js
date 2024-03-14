// API로부터 JSON 데이터를 불러오는 함수
function fetchEarthquakeData() {
  const url = "https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=1900-01-01%2000:00:00&minmagnitude=8&orderby=time";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayEarthquakeData(data.features);
      markingEarthquakeSpot(data.features);
    })
    .catch(error => console.error('Error fetching earthquake data:', error));
}

var marker = [];
var map;

// JSON 데이터를 HTML로 변환하여 표시하는 함수
function displayEarthquakeData(earthquakeData) {

  const earthquakeListElement = document.getElementById("earthquakeList");
  earthquakeListElement.innerHTML = ""; // 기존 내용을 지웁니다.

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
  earthquakeData.forEach(earthquake => {
    // const earthquakeTitle = earthquake.properties.title;
    const earthquakePlace = earthquake.properties.place;
    const earthquakeMagnitude = earthquake.properties.mag;
    const earthquakeTime = new Date(earthquake.properties.time).toUTCString();
    const earthquakeDetailURL = earthquake.properties.url;
    // <td><a href="${earthquakeDetailURL}" target="_blank">More details</a></td>
    const listItem = document.createElement("tr");
    listItem.innerHTML = `
      <td>${index}</td>
      <td><a href="${earthquakeDetailURL}">${earthquakePlace}</a></td>
      <td>${earthquakeMagnitude}</td>
      <td>${earthquakeTime}</td>
    `;
    earthquakeListElement.appendChild(listItem);
    index += 1;
  });
}

function loadingMap(){
    map = L.map('map').setView([37.5665, 126.9780], 13); // 서울을 중심으로 지도 생성
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

function markingEarthquakeSpot(earthquakeData) {
    marker = []
    earthquakeData.forEach(earthquake => {
        coordinate = [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]];
        mark = L.marker(coordinate).addTo(map);
        mark.bindPopup(`
            <div style="font-size: 15px; margin: 0;">
            <p>Place: ${earthquake.properties.place}</p>
            <p>Mag: ${earthquake.properties.mag}</p>
            <p>Date: ${new Date(earthquake.properties.time).toUTCString()}</p>
            </div>
        `)
        marker.push(mark);
    });

}

// 페이지 로드 시 데이터 불러오기
document.addEventListener("DOMContentLoaded", loadingMap);
document.addEventListener("DOMContentLoaded", fetchEarthquakeData);
