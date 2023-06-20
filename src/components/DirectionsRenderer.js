import { MapElementFactory } from 'vue2-google-maps';
import store from '@/store';

export default MapElementFactory({
	name: 'directionsRenderer',

	ctr() {
		return window.google.maps.DirectionsRenderer;
	},

	events: [],

	mappedProps: {},

	props: {
		origin: { type: Object },
		destination: { type: Object },
		travelMode: { type: String },
		waypoints: { type: Array },
	},
	data() {
		return {
			cInfoWindow: null,
		};
	},

	afterCreate(directionsRenderer) {
		let directionsService = new window.google.maps.DirectionsService();
		this.$watch(
			() => [this.origin, this.destination, this.waypoints, this.travelMode],
			() => {
				let { origin, destination, waypoints, travelMode } = this;
				if (!origin || !destination || !waypoints || !travelMode) {
					directionsService.route();
					directionsRenderer.setDirections({ routes: [] });
					store.commit('workDetail/SET_STATE', {
						action: 'totalKilloMeter',
						data: 0,
					});
					return false;
				}

				directionsService.route(
					{
						origin: origin,
						destination: destination,
						waypoints: this.waypoints,
						optimizeWaypoints: true,
						travelMode: window.google.maps.DirectionsTravelMode.DRIVING,
					},
					(response, status) => {
						if (status !== 'OK') return;
						directionsRenderer.setDirections(response);

						this.computeTotalDistance(response,  directionsRenderer);

					},
				);
			},
			{ deep: true },
		);
	},

	methods: {
		computeTotalDistance(result, directionsRenderer) {
			if (this.cInfoWindow) {
				this.cInfoWindow.close();
			}

			var totalDist = 0;
			var totalTime = 0;
			var myroute = result.routes[0];
			var i = 0;
			for (i = 0; i < myroute.legs.length; i++) {
				totalDist += myroute.legs[i].distance.value;
				totalTime += myroute.legs[i].duration.value;
			}
			totalDist = totalDist / 1000;
			this.cInfoWindow = new window.google.maps.InfoWindow()
			this.cInfoWindow.setContent( `${totalDist.toFixed(2) } km<br> ${(totalTime / 60).toFixed(2) } mins`);
			this.cInfoWindow.setPosition(result.routes[0]?.legs[0]?.steps[1]?.end_location);
			this.cInfoWindow.open(directionsRenderer);

			store.commit('workDetail/SET_STATE', {
				action: 'totalKilloMeter',
				data: totalDist.toFixed(2),
			});
		},
	},
});
