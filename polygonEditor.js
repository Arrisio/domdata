ymaps.ready(init);
service_url = 'http://http://domdata-bak.2querty.com:8001/domdata'
// service_url = 'http://138.68.77.136:8001/domdata'




function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.73, 37.75],
    zoom: 10
  }, {
    searchControlProvider: 'yandex#search'
  });
  let myPolygon;
  initPolygon();


  document.getElementById('btn_area_clear').addEventListener('click', () => {
    myMap.geoObjects.remove(myPolygon);
    initPolygon();

  })

  document.getElementById('btn_area_download').addEventListener('click', () => {
    area = myPolygon.geometry.getCoordinates()[0]
    window.location = `${service_url}/polygon?polygon=${area}`;
  })

  // document.getElementById('btn_radius_download').addEventListener('click', () => {
  //   address = $(".ymaps-2-1-72-searchbox-input__input").val()
  //   radius = $("#input-area__raius").val()
  //   area = ''
  //   window.location = `${service_url}?address=${address}&radius=${radius}&polygon=${polygon}`;
  // })

  function initPolygon() {
    // Создаем многоугольник без вершин.
    myPolygon = new ymaps.Polygon([], {}, {
      // Курсор в режиме добавления новых вершин.
      editorDrawingCursor: "crosshair",
      // Максимально допустимое количество вершин.
      editorMaxPoints: 25,
      // Цвет заливки.
      fillColor: '#00FF00AA',
      fillOpacity: 0.5,
      // Цвет обводки.
      strokeColor: '#0000FF',
      // Ширина обводки.
      strokeWidth: 2
    });
    // Добавляем многоугольник на карту.
    myMap.geoObjects.add(myPolygon);

    // В режиме добавления новых вершин меняем цвет обводки многоугольника.
    var stateMonitor = new ymaps.Monitor(myPolygon.editor.state);
    stateMonitor.add("drawing", function (newValue) {
      myPolygon.options.set("strokeColor", newValue ? '#FF0000' : '#000022');
    });

    // Включаем режим редактирования с возможностью добавления новых вершин.
    myPolygon.editor.startDrawing();


  }


}
