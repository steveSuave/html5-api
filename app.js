let $button = document.querySelector("#getinfo");
$button.addEventListener("click", clickHandler);

function openMap(options) {
    let $map = document.getElementById("map");
    $map.innerHTML = "";
    if (options.zoom === undefined) {
        options.zoom = 4;
    }
    if (options.target === undefined) {
        options.target = "map";
    }
    let map = new ol.Map({
        target: options.target,
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([options.lon, options.lat]),
            zoom: options.zoom
        })
    });
}
function getCountry(data) {
    console.log(data[0].name + "\nCapital: " + data[0].capital +
        "\nPopulation: " + data[0].population + "\nLat,Long: " + data[0].latlng);
    let $info = document.querySelector("#info");
    $info.innerHTML = `${data[0].name} </br> Capital: ${data[0].capital} </br>
        Population: ${data[0].population} </br> Lat,Long: ${data[0].latlng}`;
    let lattd = data[0].latlng[0];
    let long = data[0].latlng[1];
    let options = { lat: lattd, lon: long }
    openMap(options);
}

function clickHandler() {
    let $getInfo = document.querySelector("#country");
    let getInfo = $getInfo.value;
    if (getInfo.length > 0) {
        getInfo = getInfo.toLowerCase();
        getInfo = getInfo.trim();
        let getOptions = {
            url: `https://restcountries.eu/rest/v2/name/${getInfo}`,
            success: getCountry
        }
        $.ajax(getOptions);
    } else {
        console.log("please enter a country name..")
    }
}


$("#country").keyup(function (event) {
    if (event.keyCode === 13) {
        e.preventDefault();
        $("#getinfo").click();
        return false;
    }
});