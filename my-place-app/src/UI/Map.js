export class Map {
  constructor(coordinates) {
    // this.coordinates = coordinates;
    this.render(coordinates);
  }

  render (coordinates) {
    if (!google) {
      alert('Could not load maps library. Please try again!')
      return;
    }

    const map = new google.maps.Map(document.getElementById("map"), {
      center: coordinates,
      zoom: 16,
    });

    new google.maps.Marker({
      position: coordinates,
      map: map,
    });
  }
}