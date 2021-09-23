import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

const MapContainer = withScriptjs(
	withGoogleMap((props) => (
		<GoogleMap defaultZoom={15} defaultCenter={props.center}>
			{props.markers.map((marker) => marker)}
		</GoogleMap>
	))
);

const SimpleMap = ({
	markers,
	center = { latitude: 6.8696358044539165, longitude: 79.88899961877866 },
}) => (
	<MapContainer
		googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyB4EzeBpTd5RQrJucf0CbMPr15ysmsmvy0&v=3.exp&libraries=geometry,drawing,places'
		loadingElement={<div style={{ height: `100%` }} />}
		containerElement={<div style={{ height: `700px` }} />}
		mapElement={<div style={{ height: `100%` }} />}
		center={{ lat: center.latitude, lng: center.longitude }}
		markers={markers}
	/>
);

export default SimpleMap;
