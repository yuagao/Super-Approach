import React, { Component } from 'react';
import EsriLoaderReact from 'esri-loader-react';
import traffic from '../images/traffic_icon.svg';
import dump from '../images/dump_icon.svg';
import snow from '../images/snow_icon.svg';
import car from '../images/car_icon.svg';
import tree from '../images/tree_icon.svg';
import life from '../images/life_icon.svg';

class MapView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      queryPoint: this.props.queryPoint,
      isDisplayed: this.props.isDisplayed
    };
    this.mapObjects = {
      view: null,
      map: null,
      featureLayer: null,
      graphicLayer: null,
      graphicClass: null,
      geometryEngineClass: null,
      pointClass: null,
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.queryPoint !== this.state.queryPoint) {
      // Query features based on point
      this.queryFeature(nextProps.queryPoint);
      this.setState({
        queryPoint: nextProps.queryPoint
      })
    }

    if (nextProps.isDisplayed !== this.state.isDisplayed) {
      this.setState({
        isDisplayed: nextProps.isDisplayed
      })
    }

    if (nextProps.commentLike !== this.state.commentLike) {
      this.updateComments(nextProps.commentLike);
      this.setState({
        commentLike: nextProps.commentLike
      })
    }
  }

  updateComments() {

  }

  queryFeature(point) {
    // Create buffer based on point
    const pt = this.mapObjects.pointClass({
      type: 'point',
      x: point.x,
      y: point.y,
      z: 20
    })
    const buffer = this.mapObjects.geometryEngineClass.geodesicBuffer(pt, 20000, "meters", true);

    //Create Query
    const query = this.mapObjects.featureLayer.createQuery();
    query.where = '1=1';
    query.geometry = buffer;
    query.spatialRelationship = 'intersects';

    this.renderCurrentLocation(pt);

    // Execute query
    this.mapObjects.featureLayer.queryFeatures(query).then((results) => {
      this.props.onQueryResultsReturned(results.features);
    });
  }

  hideFeatures() {
    this.mapObjects.featureLayer.visible = false;
    const pt = this.mapObjects.pointClass({
      type: 'point',
      x: this.props.queryPoint.x,
      y: this.props.queryPoint.y,
      z: 20
    })
    this.renderCurrentLocation(pt);
  }


  renderCurrentLocation(point) {
    const graphic = this.mapObjects.graphicClass({
      geometry: point,
      symbol: this.mapObjects.myLocationSymbol
    });
    this.mapObjects.graphicLayer.add(graphic);
  }


  exportMapObjects(map, view, featureLayer, graphicsLayer, myLocationSymbol, graphic, geoEngine, point) {
    this.mapObjects = {
      view: view,
      map: map,
      featureLayer: featureLayer,
      graphicLayer: graphicsLayer,
      myLocationSymbol: myLocationSymbol,
      graphicClass: graphic,
      geometryEngineClass: geoEngine,
      pointClass: point
    };
    if (this.props.hideFeatures){
      this.hideFeatures();
    }
  }

  exportQueryResults(response) {
    this.props.onMapClicked(response.results[0].graphic.attributes)
  }

  render() {
    const options = {
      url: 'https://js.arcgis.com/4.6/'
    };

    const divStyle = {
      height: '100%'
    };

    return(
      <div style={divStyle} className={(this.state.isDisplayed? 'show' : 'hidden')}>
        <EsriLoaderReact
         options={options}
         modulesToLoad={[
           'esri/Map',
           'esri/Basemap',
           'esri/views/MapView',
           'esri/views/SceneView',
           'esri/layers/SceneLayer',
           'esri/layers/FeatureLayer',
           'esri/layers/GraphicsLayer',
           'esri/geometry/geometryEngine',
           'esri/WebScene',
           'esri/Graphic',
           'esri/geometry/Point',
           'esri/symbols/PictureMarkerSymbol',
           'esri/symbols/SimpleFillSymbol',
           'esri/symbols/SimpleMarkerSymbol',
           'esri/Color',
           'esri/renderers/UniqueValueRenderer',
           'dojo/_base/lang'
         ]}
         onReady={({loadedModules: [Map, Basemap, MapView, SceneView, SceneLayer, FeatureLayer, GraphicsLayer, geometryEngine, WebScene, Graphic, Point, PictureMarkerSymbol, SimpleFillSymbol,SimpleMarkerSymbol, Color, UniqueValueRenderer, lang], containerNode}) => {

           // Initilize Map and View

           var scene = new WebScene({
             portalItem: {
               id: "19cff58e1c024d0ea467d644d40bd825"
             }
           });

          //  var scene = new Map({
          //   basemap: 'streets'
          // });

           const view = new SceneView({
             container: containerNode,
             map: scene,
             camera: {
               position: [-122.413, 37.765, 122.344],
               tilt: -40.701,
               heading: 180,
               fov: 90
             }
           });

           // Customize view UI
           view.ui.remove(["zoom","navigation-toggle", "compass"]);

           const gLayer = new GraphicsLayer();
           scene.add(gLayer);

          var dumpSymbol = ({
            type: "point-3d",  // autocasts as new PointSymbol3D()
            symbolLayers: [{
              type: "icon",  // autocasts as new IconSymbol3DLayer()
              resource: {
                href: {dump}.dump
              },
              size: 40
            }],
            verticalOffset: {
              screenLength: 40,
              maxWorldLength: 100,
              minWorldLength: 20
            },
            callout: {
              type: "line", // autocasts as new LineCallout3D()
              size: 1.5,
              color: new Color("#c75448"),
              border: {
                color: new Color("#c75448")
              }
            }
          });

          var trafficSymbol = ({
            type: "point-3d",  // autocasts as new PointSymbol3D()
            symbolLayers: [{
              type: "icon",  // autocasts as new IconSymbol3DLayer()
              resource: {
                href: {traffic}.traffic
              },
              size: 40
            }],
            verticalOffset: {
              screenLength: 40,
              maxWorldLength: 100,
              minWorldLength: 20
            },
            callout: {
              type: "line", // autocasts as new LineCallout3D()
              size: 1.5,
              color: new Color("#f89f1b"),
              border: {
                color: new Color("#f89f1b")
              }
            }
          });

          var snowSymbol = ({
            type: "point-3d",  // autocasts as new PointSymbol3D()
            symbolLayers: [{
              type: "icon",  // autocasts as new IconSymbol3DLayer()
              resource: {
                href: {snow}.snow
              },
              size: 40
            }],
            verticalOffset: {
              screenLength: 40,
              maxWorldLength: 100,
              minWorldLength: 20
            },
            callout: {
              type: "line", // autocasts as new LineCallout3D()
              size: 1.5,
              color: new Color("#4c6c4c"),
              border: {
                color: new Color("#4c6c4c")
              }
            }
          });

          var treeSymbol = ({
            type: "point-3d",  // autocasts as new PointSymbol3D()
            symbolLayers: [{
              type: "icon",  // autocasts as new IconSymbol3DLayer()
              resource: {
                href: {tree}.tree
              },
              size: 40
            }],
            verticalOffset: {
              screenLength: 40,
              maxWorldLength: 100,
              minWorldLength: 20
            },
            callout: {
              type: "line", // autocasts as new LineCallout3D()
              size: 1.5,
              color: new Color("#123f39"),
              border: {
                color: new Color("#123f39")
              }
            }
          });

          var lifeSymbol = ({
            type: "point-3d",  // autocasts as new PointSymbol3D()
            symbolLayers: [{
              type: "icon",  // autocasts as new IconSymbol3DLayer()
              resource: {
                href: {life}.life
              },
              size: 40
            }],
            verticalOffset: {
              screenLength: 40,
              maxWorldLength: 100,
              minWorldLength: 20
            },
            callout: {
              type: "line", // autocasts as new LineCallout3D()
              size: 1.5,
              color: new Color("#f16722"),
              border: {
                color: new Color("#f16722")
              }
            }
          });

          var carSymbol = ({
            type: "point-3d",  // autocasts as new PointSymbol3D()
            symbolLayers: [{
              type: "icon",  // autocasts as new IconSymbol3DLayer()
              resource: {
                href: {car}.car
              },
              size: 40
            }],
            verticalOffset: {
              screenLength: 40,
              maxWorldLength: 100,
              minWorldLength: 20
            },
            callout: {
              type: "line", // autocasts as new LineCallout3D()
              size: 1.5,
              color: new Color("#32717f"),
              border: {
                color: new Color("#32717f")
              }
            }
          });

           const red = new Color('#F9A01B');

           const myLocationSymbol = new SimpleMarkerSymbol({
             color: red
           })

           let renderer = new UniqueValueRenderer({
               field: "Category",
               defaultSymbol: dumpSymbol,
               uniqueValueInfos: [{
               value: "Parking & Vehicles",
               symbol: trafficSymbol
             },
             {
                value: "Winter Conditions",
                symbol: snowSymbol
             },
             {
                value: "Streets & Sidewalks",
                symbol: carSymbol
             },
             {
                value: "Trees & Parks",
                symbol: treeSymbol
             },
             {
                value: "Quality of Life",
                symbol: lifeSymbol
             }]
           });


          // Add Layers
          const featureLayer = new FeatureLayer({
            url: "https://services.arcgis.com/yLA6mQfrA0yQr00r/ArcGIS/rest/services/NewComments_CopyFeatures/FeatureServer/0",
            outFields: ["*"],
            renderer: renderer,
            popupEnabled: true
          });
          scene.add(featureLayer);

          this.exportMapObjects(scene, view, featureLayer, gLayer, myLocationSymbol, Graphic,  geometryEngine, Point);

         // Bind view events
         view.when(function(){
           // Export map objects

           view.on("click", function(event){
             const screenPoint = {
               x: event.x,
               y: event.y
             };
             view.hitTest(screenPoint)
               .then(function(response){
                 this.exportQueryResults(response);
               }.bind(this));
           }.bind(this));

         }.bind(this), function(error){

         });

         }}

        />

      </div>
    )
  }


}

export default MapView;
