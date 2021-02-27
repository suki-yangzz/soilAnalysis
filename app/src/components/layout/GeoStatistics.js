import React, {Component} from 'react';
import {loadModules} from 'esri-loader';
import {Container} from "react-bootstrap";

const options = {
    url: 'https://js.arcgis.com/4.18/'
};

const portalUrl = "https://www.arcgis.com";

export default class GeoStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // status: 'loading'
        };
    }

    componentDidMount() {
        loadModules(["esri/WebMap",
            "esri/views/MapView",
            "esri/layers/FeatureLayer",
            "esri/widgets/Legend",
            "esri/widgets/Expand",
            "esri/config",
            "esri/Map",
            "esri/request",
            "esri/layers/support/Field",
            "esri/Graphic",
            "esri/tasks/Geoprocessor",
            "esri/views/SceneView",
            "esri/layers/GraphicsLayer",
            "esri/geometry/Point",
            "esri/tasks/support/LinearUnit",
            "esri/tasks/support/FeatureSet",
            "esri/widgets/LayerList"], options)
            .then(([WebMap, MapView, FeatureLayer, Legend, Expand, esriConfig, Map, request, Field, Graphic,
                       Geoprocessor, SceneView, GraphicsLayer, Point, LinearUnit, FeatureSet, LayerList]) => {
                const fileForm = document.getElementById("mainWindow");
                const gpUrl = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Elevation/ESRI_Elevation_World/GPServer/Viewshed";

                const map = new WebMap({
                    basemap: "gray-vector"
                });

                const view = new MapView({
                    center: [-41.647, 36.41],
                    zoom: 2,
                    map: map,
                    container: "viewDiv",
                    popup: {
                        defaultPopupTemplateEnabled: true,
                        dockEnabled: true,
                        dockOptions: {
                            breakpoint: false,
                            position: "top-right"
                        }
                    }
                });

                // upload icon
                view.ui.add(new Expand({
                    expandIconClass: "esri-icon-upload",
                    content: fileForm,
                    view
                }), "top-right");

                document.getElementById("uploadForm").addEventListener("change", function (event) {
                    let fileName = event.target.value.toLowerCase();

                    if (fileName.indexOf(".zip") !== -1) {//is file a zip - if not notify user
                        generateFeatureCollection(fileName);
                    } else {
                        document.getElementById('upload-status').innerHTML = '<p style="color:red">Add shapefile as .zip file</p>';
                    }
                });

                function generateFeatureCollection(fileName) {
                    let name = fileName.split(".");
                    // Chrome and IE add c:\fakepath to the value - we need to remove it
                    // see this link for more info: http://davidwalsh.name/fakepath
                    name = name[0].replace("c:\\fakepath\\", "");

                    document.getElementById('upload-status').innerHTML = '<b>Loading </b>' + name;

                    // define the input params for generate see the rest doc for details
                    // https://developers.arcgis.com/rest/users-groups-and-items/generate.htm
                    let params = {
                        'name': name,
                        'targetSR': view.spatialReference,
                        'maxRecordCount': 10000,
                        'enforceInputFileSizeLimit': true,
                        'enforceOutputJsonSizeLimit': true
                    };

                    // generalize features to 10 meters for better performance
                    params.generalize = true;
                    params.maxAllowableOffset = 10;
                    params.reducePrecision = true;
                    params.numberOfDigitsAfterDecimal = 0;

                    let myContent = {
                        'filetype': 'shapefile',
                        'publishParameters': JSON.stringify(params),
                        'f': 'json',
                    };

                    // use the REST generate operation to generate a feature collection from the zipped shapefile
                    request(portalUrl + '/sharing/rest/content/features/generate', {
                        query: myContent,
                        body: document.getElementById('uploadForm'),
                        responseType: 'json'
                    })
                        .then(function (response) {
                            let layerName = response.data.featureCollection.layers[0].layerDefinition.name;
                            document.getElementById('upload-status').innerHTML = '<b>Loaded: </b>' + layerName;
                            addShapefileToMap(response.data.featureCollection);
                        })
                        .catch(errorHandler);
                }

                function errorHandler(error) {
                    document.getElementById('upload-status').innerHTML =
                        "<p style='color:red;max-width: 500px;'>" + error.message + "</p>";
                }

                function addShapefileToMap(featureCollection) {
                    // add the shapefile to the map and zoom to the feature collection extent
                    // if you want to persist the feature collection when you reload browser, you could store the
                    // collection in local storage by serializing the layer using featureLayer.toJson()
                    // see the 'Feature Collection in Local Storage' sample for an example of how to work with local storage
                    let sourceGraphics = [];

                    let layers = featureCollection.layers.map(function (layer) {

                        let graphics = layer.featureSet.features.map(function (feature) {
                            return Graphic.fromJSON(feature);
                        });
                        sourceGraphics = sourceGraphics.concat(graphics);
                        let featureLayer = new FeatureLayer({
                            objectIdField: "FID",
                            source: graphics,
                            fields: layer.layerDefinition.fields.map(function (field) {
                                return Field.fromJSON(field);
                            })
                        });
                        return featureLayer;
                        // associate the feature with the popup on click to enable highlight and zoom to
                    });
                    map.addMany(layers);
                    view.goTo(sourceGraphics)
                        .catch(function (error) {
                            if (error.name != "AbortError") {
                                console.error(error);
                            }
                        });
                    let layerList = new LayerList({
                        view: view
                    });

                    // Adds widget below other elements in the top left corner of the view
                    view.ui.add(layerList, {
                        position: "top-left"
                    });


                    document.getElementById('upload-status').innerHTML = "";
                }

                // start viewshed analysis
                let graphicsLayer = new GraphicsLayer();
                map.add(graphicsLayer);

                let markerSymbol = {
                    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                    color: [255, 0, 0],
                    outline: {
                        // autocasts as new SimpleLineSymbol()
                        color: [255, 255, 255],
                        width: 2
                    }
                };

                let fillSymbol = {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: [226, 119, 40, 0.75],
                    outline: {
                        // autocasts as new SimpleLineSymbol()
                        color: [255, 255, 255],
                        width: 1
                    }
                };

                let gp = new Geoprocessor(gpUrl);
                gp.outSpatialReference = {
                    // autocasts as new SpatialReference()
                    wkid: 102100
                };
                // view.on("click", computeViewshed); todo

                function computeViewshed(event) {
                    graphicsLayer.removeAll();

                    let point = new Point({
                        longitude: event.mapPoint.longitude,
                        latitude: event.mapPoint.latitude
                    });

                    let inputGraphic = new Graphic({
                        geometry: point,
                        symbol: markerSymbol
                    });

                    graphicsLayer.add(inputGraphic);

                    let inputGraphicContainer = [];
                    inputGraphicContainer.push(inputGraphic);
                    let featureSet = new FeatureSet();
                    featureSet.features = inputGraphicContainer;

                    let vsDistance = new LinearUnit();
                    vsDistance.distance = 5;
                    vsDistance.units = "miles";

                    let params = {
                        Input_Observation_Point: featureSet,
                        Viewshed_Distance: vsDistance
                    };

                    gp.execute(params).then(drawResultData);
                }

                function drawResultData(result) {
                    var resultFeatures = result.results[0].value.features;

                    // Assign each resulting graphic a symbol
                    var viewshedGraphics = resultFeatures.map(function(feature) {
                        feature.symbol = fillSymbol;
                        return feature;
                    });

                    // Add the resulting graphics to the graphics layer
                    graphicsLayer.addMany(viewshedGraphics);

                    /********************************************************************
                     * Animate to the result. This is a temporary workaround
                     * for animating to an array of graphics in a SceneView. In a future
                     * release, you will be able to replicate this behavior by passing
                     * the graphics directly to the goTo function, like the following:
                     *
                     * view.goTo(viewshedGraphics);
                     ********************************************************************/
                    view.goTo({
                        target: viewshedGraphics,
                        tilt: 0
                    })
                        .catch(function(error) {
                            if (error.name != "AbortError") {
                                console.error(error);
                            }
                        });
                }
                // end viewshed analysis
            })
    }

    render() {
        return (
            <div>
                <Container fluid style={{padding: 0, margin: 0, height: '90vh', width: '100vw'}}>
                    <div id="mainWindow" style={{padding: 10, 'background-color': '#fff'}}>
                        <div>
                            <div style={{'padding-left': '4px'}}>
                                <p>Download shapefile from <a
                                    href='https://bsvensson.github.io/various-tests/shp/drp_county_boundary.zip'>here.</a>
                                </p>
                                <p>Add a zipped shapefile to the map.</p>
                                <p>Visit the <a target='_blank'
                                       href="https://doc.arcgis.com/en/arcgis-online/reference/shapefiles.htm">Shapefiles</a> help
                                    topic for information and limitations.</p>
                                <form encType="multipart/form-data" method="post" id="uploadForm" style={{display: 'block', padding: 5}}>
                                    <div className="field">
                                        <label className="file-upload">
                                            <span><strong>Add File</strong></span>
                                            <input type="file" name="file" id="inFile"/>
                                        </label>
                                    </div>
                                </form>
                                <span className="file-upload-status" style={{opacity: 1}} id="upload-status"></span>
                                <div id="fileInfo"></div>
                            </div>
                        </div>
                    </div>
                    <div id='viewDiv' style={{height: '100%', width: '100%'}}></div>
                </Container>
            </div>
        )
    }
}