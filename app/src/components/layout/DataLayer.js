import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';

const DataLayer = (props) => {
    const [csvLayer, setLayer] = useState(null);
    useEffect(() => {
        loadModules(['esri/layers/CSVLayer']).then(([CSVLayer]) => {
            const csvLayer = new CSVLayer({
                url: props.featureLayerProperties.url
            });

            setLayer(csvLayer);
            props.map.add(csvLayer);
        }).catch((err) => console.error(err));

        return function cleanup() {
            props.map.remove(csvLayer);
        }
    }, [ props ]);

    return null;
};

export default DataLayer;