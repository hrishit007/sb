import { useEffect, useState, useRef } from "react";
import "./css/map.css";
import tt from "@tomtom-international/web-sdk-maps";
import { services } from "@tomtom-international/web-sdk-services";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import ZoomControls from "@tomtom-international/web-sdk-plugin-zoomcontrols";
import PanControls from "@tomtom-international/web-sdk-plugin-pancontrols";
export default function Map() {

  //storing ref of div
  const mapElement = useRef();

  //states
  const [map, setMap] = useState({});
  const [longitude, setLongitude] = useState(77.894954);
  const [latitude, setLatitude] = useState(29.86794);


  useEffect(() => {
    // defining the map 
    let map = tt.map({
      key: import.meta.env.VITE_MAP_API_KEY,
      container: mapElement.current,
      center: [longitude, latitude],
      zoom: 10,
    });

    //defining the search box & search box functions
    const ttSearchBox = new SearchBox(services, {
      idleTimePress: 100,
      minNumberOfCharacters: 0,
      searchOptions: {
        key: import.meta.env.VITE_MAP_API_KEY,
        language: "en-GB",
      },
      autocompleteOptions: {
        key: import.meta.env.VITE_MAP_API_KEY,
        language: "en-GB",
      },
      noResultsMessage: "No results found.",
    });
    let searchMarkersManager = new SearchMarkersManager(map);
    function handleResultsFound(event) {
        var results = event.data.results.fuzzySearch.results;
    
        if (results.length === 0) {
            searchMarkersManager.clear();
        }
        searchMarkersManager.draw(results);
        fitToViewport(results);
    }
    
    function handleResultSelection(event) {
        var result = event.data.result;
        if (result.type === 'category' || result.type === 'brand') {
            return;
        }
        searchMarkersManager.draw([result]);
        fitToViewport(result);
    }
    
    function fitToViewport(markerData) {
        if (!markerData || markerData instanceof Array && !markerData.length) {
            return;
        }
        var bounds = new tt.LngLatBounds();
        if (markerData instanceof Array) {
            markerData.forEach(function (marker) {
                bounds.extend(getBounds(marker));
            });
        } else {
            bounds.extend(getBounds(markerData));
        }
        map.fitBounds(bounds, { padding: 100, linear: true });
    }
    
    function getBounds(data) {
        var btmRight;
        var topLeft;
        if (data.viewport) {
            btmRight = [data.viewport.btmRightPoint.lng, data.viewport.btmRightPoint.lat];
            topLeft = [data.viewport.topLeftPoint.lng, data.viewport.topLeftPoint.lat];
        }
        return [btmRight, topLeft];
    }
    
    function handleResultClearing() {
        searchMarkersManager.clear();
    }
    function SearchMarkersManager(map, options) {
        this.map = map;
        this._options = options || {};
        this._poiList = undefined;
        this.markers = {};
    }
    
    SearchMarkersManager.prototype.draw = function (poiList) {
        this._poiList = poiList;
        this.clear();
        this._poiList.forEach(function (poi) {
            var markerId = poi.id;
            var poiOpts = {
                name: poi.poi ? poi.poi.name : undefined,
                address: poi.address ? poi.address.freeformAddress : '',
                distance: poi.dist,
                classification: poi.poi ? poi.poi.classifications[0].code : undefined,
                position: poi.position,
                entryPoints: poi.entryPoints
            };
            var marker = new SearchMarker(poiOpts, this._options);
            marker.addTo(this.map);
            this.markers[markerId] = marker;
        }, this);
    };
    
    SearchMarkersManager.prototype.clear = function () {
        for (var markerId in this.markers) {
            var marker = this.markers[markerId];
            marker.remove();
        }
        this.markers = {};
        this._lastClickedMarker = null;
    };
    function SearchMarker(poiData, options) {
        this.poiData = poiData;
        this.options = options || {};
        this.marker = new tt.Marker({
            element: this.createMarker(),
            anchor: 'bottom'
        });
        var lon = this.poiData.position.lng || this.poiData.position.lon;
        this.marker.setLngLat([
            lon,
            this.poiData.position.lat
        ]);
    }
    
    SearchMarker.prototype.addTo = function (map) {
        this.marker.addTo(map);
        this._map = map;
        return this;
    };
    
    SearchMarker.prototype.createMarker = function () {
        var elem = document.createElement('div');
        elem.className = 'tt-icon-marker-black tt-search-marker';
        if (this.options.markerClassName) {
            elem.className += ' ' + this.options.markerClassName;
        }
        var innerElem = document.createElement('div');
        innerElem.setAttribute('style', 'background: white; width: 10px; height: 10px; border-radius: 50%; border: 3px solid black;');
    
        elem.appendChild(innerElem);
        return elem;
    };
    
    SearchMarker.prototype.remove = function () {
        this.marker.remove();
        this._map = null;
    };
    ttSearchBox.on("tomtom.searchbox.resultsfound", handleResultsFound);
    ttSearchBox.on("tomtom.searchbox.resultselected", handleResultSelection);
    ttSearchBox.on("tomtom.searchbox.resultfocused", handleResultSelection);
    ttSearchBox.on("tomtom.searchbox.resultscleared", handleResultClearing);
    // adding search box to map
    map.addControl(ttSearchBox, "top-right");

    //adding zoom and pan controls
    let ttZoomControls = new ZoomControls();
    let ttPanControls = new PanControls();
    map.addControl(ttZoomControls, 'bottom-right');
    map.addControl(ttPanControls, 'bottom-right');

    // put map 
    setMap(map);
  }, []);

  return (
    <>
      <div ref={mapElement} className="map"></div>
    </>
  );
}
