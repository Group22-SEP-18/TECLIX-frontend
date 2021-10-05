import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

const MapContainer = withScriptjs(
	withGoogleMap((props) => (
		<GoogleMap defaultZoom={10} defaultCenter={props.center}>
			{props.markers.map((marker) => marker)}
		</GoogleMap>
	))
);

const SimpleMap = ({
	markers,
	center = { latitude: 6.8696358044539165, longitude: 79.88899961877866 },
}) => (
	<MapContainer
		googleMapURL={process.env.REACT_APP_GOOGLE_MAP_URL}
		loadingElement={<div style={{ height: `100%` }} />}
		containerElement={<div style={{ height: `700px` }} />}
		mapElement={<div style={{ height: `100%` }} />}
		center={{ lat: center.latitude, lng: center.longitude }}
		markers={markers}
	/>
);

export default SimpleMap;
