export const GetCoordinates = async(dir) => {

    const apiKey = "AIzaSyDwjgzTrecAmbLJzuSwSbL8pb1dXoIKu8M";
    const address = dir;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${address}`;

    const response = await fetch(url);
    const { results } = await response.json();
    console.log(results);

    const coordinates = {
        lat: results[0].geometry.location.lat,
        lng: results[0].geometry.location.lng
    }

    return coordinates;
}
