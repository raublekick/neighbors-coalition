<template>
  <section id="map-section">
    <client-only>
      <l-map
        v-show="items.length"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 500px; width: 100%"
      >
        <l-tile-layer :id="id" :url="url" :attribution="attribution" />
        <l-marker ref="centerMarker" :draggable="false" :lat-lng="center">
          <l-icon :icon-url="icons[1]" :icon-size="iconSize" :icon-anchor="iconAnchor" :popup-anchor="popupAnchor"></l-icon>
        </l-marker>
        <l-marker
          v-for="(item, index) in items"
          :key="index"
          ref="markersRef"
          :draggable="false"
          :lat-lng="{ lat: item.lat, lng: item.lng }"
        >
          <l-icon
            :icon-url="icons[0]"
            :icon-size="iconSize"
            :icon-anchor="iconAnchor"
            :popup-anchor="popupAnchor"
          >
          </l-icon>
          <l-popup v-show="true">
            <h1>
              <a :href="item.website" target="_blank">{{ item.name }}</a>
            </h1>
            <div>{{ item.address }}</div>
            <div>{{ item.category }}</div>
          </l-popup>
        </l-marker>
      </l-map>
    </client-only>
  </section>
</template>

<script>
import * as _ from "lodash";
export default {
  name: "Map",
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    center: {
      type: Array,
      default: () => {
        return [33.4515, -112.07];
      },
    },
  },
  data() {
    return {
      zoom: 12,
      id: "mapbox/streets-v11",
      url:
        "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=" +
        process.env.NUXT_ENV_MAPBOX_KEY,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      mapOptions: {
        zoomSnap: 0.5,
      },
      iconSize: [45, 37],
      iconAnchor: [11, 36],
      popupAnchor: [0, -26],
      icons: [
        require("../assets/pin-blue.png"),
        require("../assets/pin-red.png"),
        require("../assets/pin-green.png"),
        require("../assets/pin-yellow.png"),
      ],
    };
  },
  computed: {},
  watch: {
    center(val) {
      const markerObjects = this.$refs.markersRef.map((ref) => ref.mapObject);
      _.forEach(markerObjects, (item) => {
        if (item._latlng.lat === val.lat && item._latlng.lng === val.lng) {
          item.openPopup();
        }
      });
    },
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.markerObjects = this.$refs.markersRef.map((ref) => ref.mapObject)
    // })
  },
};
</script>

<style scoped>
#map-section > * {
  z-index: 1;
}
</style>
