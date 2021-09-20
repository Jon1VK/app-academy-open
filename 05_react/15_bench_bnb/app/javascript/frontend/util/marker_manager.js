export default class MarkerManager {
  constructor(map) {
    this.map = map;
    this.markers = {};
  }

  updateMarkers(benches) {
    benches.forEach((bench) => {
      console.log(bench);
      if (!this.markers[bench.id]) {
        this.markers[bench.id] = new google.maps.Marker({
          position: { lat: bench.lat, lng: bench.lon },
          map: this.map,
          title: bench.description,
        });
      }
    });
  }
}
