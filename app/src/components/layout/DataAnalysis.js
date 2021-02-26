import React, {Component} from 'react';
import {Container, Button, Modal} from "react-bootstrap";
import {WebMap} from "@esri/react-arcgis";
import DataLayer from '../common/DataLayer';
import CSVTable from '../common/CSVTable'
import {CSVLink} from "react-csv";
import ReactFileReader from 'react-file-reader';

export default class DataAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            view: null,
            csvData: '',
            url: '',
            showmodel: false
        };
        this.handleMapLoad = this.handleMapLoad.bind(this)
    }

    handleMapLoad(map, view) {
        this.setState({map, view});
    };

    handleModelShow = () => {
        this.setState({showmodel: !this.state.showmodel});
    };

    handleFiles = files => {
        let reader = new FileReader();
        reader.onload = () => {
            // Use reader.result
            this.setState({
                csvData: reader.result,
                url: URL.createObjectURL(new Blob([reader.result], {type: "text/csv"}))
            })
        };
        reader.readAsText(files[0]);
    };

    csvJSON = csv => {
        if (csv.length > 0) {
            var lines = csv.split("\n");
            var result = [];
            var headers = lines[0].split(",");
            for (var i = 1; i < lines.length; i++) {
                var obj = {};
                var currentline = lines[i].split(",");
                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }
            return result; //JavaScript object
        } else {
            return []
        }
    };

    render() {
        return (
            <div>
                <Modal
                    show={this.state.showmodel}
                    onHide={this.handleModelShow}
                    dialogClassName="mtd-viewdialog"
                    size="lg"
                >
                    <Modal.Header closeButton/>
                    <Modal.Body>
                        <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                            <Button variant="primary m-1">Upload</Button>
                        </ReactFileReader>
                        <CSVTable data={this.csvJSON(this.state.csvData)}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={this.handleModelShow}
                            id="close"
                        >
                            Close
                        </Button>
                        <CSVLink
                            filename={"Detail Report.csv"}
                            data={this.csvJSON(this.state.csvData)}
                            className="btn btn-primary"
                        >
                            Download me
                        </CSVLink>
                    </Modal.Footer>
                </Modal>
                {/*<Button variant="primary m-5" onClick={this.handleModelShow}*/}
                {/*style={{position: 'fixed', top: 100, left: -35, zIndex: 1}}>*/}
                {/*Manage Data*/}
                {/*</Button>*/}
                <Container fluid style={{margin: 0, padding: 0}}>
                    <WebMap id="aaafb684f0e64b5bb62fdf4ff525d209" className="full-screen-map"
                            onLoad={this.handleMapLoad}
                            style={{height: '95vh'}}
                        // style={{width: '100vw', height: '100vh'}}
                        // https://www.esri.com/arcgis-blog/products/arcgis-online/announcements/whats-new-in-esri-vector-basemaps-february-2019/
                        // https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html
                        // mapProperties={{basemap: 'national-geographic', ground: "world-elevation"}}
                            viewProperties={{
                                center: [105.8756, 36.1749], // longitude, latitude
                                zoom: 4
                            }}>
                        <DataLayer
                            featureLayerProperties={{
                                // "https://developers.arcgis.com/javascript/latest/sample-code/layers-csv/live/earthquakes.csv"
                                url: this.state.url
                            }}
                        >
                        </DataLayer>
                    </WebMap>
                </Container>
            </div>
        );
    }
}