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
        <l-tile-layer :url="url" :attribution="attribution" :id="id" />
        <l-marker
          v-for="item in items"
          :key="item.id"
          :draggable="false"
          :lat-lng.sync="item.latlng"
          ref="markersRef"
        >
          <l-icon
            :icon-url="icons[item.zone]"
            :icon-size="iconSize"
            :icon-anchor="iconAnchor"
            :popup-anchor="popupAnchor"
          >
          </l-icon>
          <l-popup v-show="true">
            <h1>
              <a :href="item.url" target="_blank">{{ item.name }}</a>
            </h1>
            <div>{{ item.address }}</div>
            <div>{{ item.businessType }}</div>
            <div>
              <strong>Employees wearing masks:</strong> {{ item.employeeMasks }}
            </div>
            <div>
              <strong>Customers wearing masks:</strong> {{ item.customerMasks }}
            </div>
            <div v-if="item.other">
              <strong>Other measures taken:</strong> {{ item.other }}
            </div>
            <div>Last updated: {{ item.timestamp | formatDateTime }}</div>
          </l-popup>
        </l-marker>
      </l-map>
    </client-only>
  </section>
</template>

<script>
import * as _ from 'lodash'

export default {
  name: 'Map',
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
    center: {
      type: Array,
      default: () => {
        return [33.4515, -112.07]
      },
    },
  },
  data() {
    return {
      zoom: 12,
      id: 'mapbox/streets-v11',
      url:
        'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' +
        process.env.VUE_APP_MAPBOX_KEY,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      mapOptions: {
        zoomSnap: 0.5,
      },
      iconSize: [45, 37],
      iconAnchor: [11, 36],
      popupAnchor: [0, -26],
      icons: [
        require('../assets/pin-blue.png'),
        require('../assets/pin-red.png'),
        require('../assets/pin-green.png'),
        require('../assets/pin-yellow.png'),
      ],
    }
  },
  computed: {},
  watch: {
    center(val) {
      _.forEach(this.markerObjects, (item) => {
        if (item._latlng.lat === val.lat && item._latlng.lng === val.lng) {
          item.openPopup()
        }
      })
    },
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.markerObjects = this.$refs.markersRef.map((ref) => ref.mapObject)
    // })
  },
}
</script>

<style scoped>
#map-section > * {
  z-index: 1;
}
</style>
