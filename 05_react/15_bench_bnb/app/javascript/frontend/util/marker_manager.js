export default class MarkerManager {
  constructor(map, history) {
    this.map = map;
    this.markers = {};
    this.history = history;
    this.newBenchMarker = new google.maps.Marker({
      title: 'New Bench',
      label: 'NB',
    });
  }

  updateMarkers(benches, disabled) {
    this.newBenchMarker.setMap(null);

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
        this.addMarker(bench, disabled);
      }
    });
  }

  addMarker(bench, disabled) {
    const marker = new google.maps.Marker({
      position: { lat: bench.lat, lng: bench.lon },
      map: this.map,
      title: bench.description,
    });

    this.markers[bench.id] = marker;

    if (!disabled) {
      marker.addListener('click', () => {
        this.history.push(`/benches/${bench.id}`);
      });
    }
  }

  addNewBenchMarker(position) {
    this.newBenchMarker.setMap(this.map);
    this.newBenchMarker.setPosition(position);
  }
}
