import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>
    <img src="/assets/img/location1.png" alt="err" />
</div>;

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 41.2424820,
            lng: 69.2062840
        },
        zoom: 15
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '500px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDqw3adF1rAFs5-n2G1Emu4Z90ce31tOto' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={41.2424820}
                        lng={69.2062840}
                        text="BILLUR BURGUT PARVOZI"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;