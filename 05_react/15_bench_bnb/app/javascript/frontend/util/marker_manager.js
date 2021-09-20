export default class MarkerManager {
  constructor(map) {
    this.map = map;
    this.markers = {};
  }

  updateMarkers(benches) {
    const benchesLookupTable = benches.reduce((table, bench) => {
      table[bench.id] = true;
      return table;
    }, {});

    Object.entries(this.markers).forEach(([id, marker]) => {
      if (!benchesLookupTable[id]) {
        marker.setMap(null);
        delete this.markers[id];
      }
    });

    benches.forEach((bench) => {
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
