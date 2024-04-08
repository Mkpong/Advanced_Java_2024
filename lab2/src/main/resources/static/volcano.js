function fetchVolcanoData() {
  // earthquake data를 불러오기 위한 주소
  const url = "https://volcanoes.usgs.gov/vsc/api/volcanoApi/regionstatus?lat1=-90&long1=-180&lat2=90&long2=180";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      markingVolcanoSpot(data); // 지도에 마커 생성 함수 호출
    })
    .catch(error => console.error('Error fetching volcano data:', error));
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
function markingVolcanoSpot(volcanoData) {
  marker = []
  // marking process
  volcanoData.forEach(volcano => {
    var img_url = '';
    if(volcano.colorCode == "GREEN") img_url = './image/green.png';
    else if(volcano.colorCode == "YELLO") img_url = 'image/yellow.png';
    else if(volcano.colorCode == "RED") img_url = '/image/red.png';
    else if(volcano.colorCode == "ORANGE") img_url = '/image/orange.png'
    else img_url = './image/black.png';
    // Create custom Icon - Color circle & Show mag Data
    var customIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="icon-container">
        <img src="${img_url}" class="triangle-shape">
        </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20]
  });
      // JSON 데이터에서 위도, 경도값 불러오기
      coordinate = [volcano.lat, volcano.long];
      // add marker
      mark = L.marker(coordinate, {icon: customIcon}).addTo(map);
      // 해당 마커에 bindpopup option 추가
      mark.bindPopup(`
          <div style="font-size: 15px; margin: 0;">
          <p>Number: ${volcano.vnum}</p>
          <p>Name: ${volcano.vName}</p>
          <p>colorCode: ${volcano.colorCode}</p>
          <p>More Detail: <a href="${volcano.vUrl}">more..</a></p>
          </div>
      `);
      
      marker.push(mark);
  });

}

document.addEventListener("DOMContentLoaded" , loadingMap);
document.addEventListener("DOMContentLoaded" , fetchVolcanoData);