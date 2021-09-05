import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from 'react-google-maps';

const MapContainer = withScriptjs(
	withGoogleMap((props) => (
		<GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
			<Marker position={{ lat: -34.397, lng: 150.644 }} />
		</GoogleMap>
	))
);

const SimpleMap = () => (
	<MapContainer
		googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyB4EzeBpTd5RQrJucf0CbMPr15ysmsmvy0&v=3.exp&libraries=geometry,drawing,places'
		loadingElement={<div style={{ height: `100%` }} />}
		containerElement={<div style={{ height: `700px` }} />}
		mapElement={<div style={{ height: `100%` }} />}
	/>
);

export default SimpleMap;
