<template>
  <div class="home container">
    <div class="columns">
      <div class="column">
        <b-message
          title="About this map"
          type="is-info"
          has-icon
          aria-close-label="Close message"
        >
          <p class="mt-4">This data is currently sourced from......</p>
          <div class="mt-4">
            <b-button
              tag="a"
              type="is-primary"
              target="_blank"
              @click.prevent=""
              >Submit a correction</b-button
            >
          </div>
        </b-message>
        <map-view :items="filteredResources" :center="center" />

        <section class="mt-4">
          <b-field grouped group-multiline>
            <b-field label="Search">
              <b-input
                v-model="filter"
                placeholder="Search..."
                type="search"
                icon="magnify"
                icon-clickable
              >
              </b-input>
            </b-field>
          </b-field>
        </section>

        <resource-list
          class="mt-4"
          :items="filteredResources"
          @clicked="setCenter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from "lodash";
import { mapState } from "vuex";
import MapView from "@/components/Map";
import ResourceList from "~/components/ResourceList.vue";

export default {
  name: "AllMap",
  components: {
    MapView,
    ResourceList,
  },
  data() {
    return {
      filter: "",
      center: [
        process.env.VUE_APP_CENTER_LAT || 33.4515,
        process.env.VUE_APP_CENTER_LNG || -112.07,
      ],
      gettingLocation: false,
      error: "",
      location: {},
    };
  },
  computed: {
    ...mapState(["resources"]),
    filteredResources() {
      let filtered = this.mappableItems;
      if (this.filter !== "") {
        filtered = this.search(filtered, this.filter);
      }

      return filtered;
    },
    mappableItems() {
      return _.filter(this.resources, (item) => {
        return item.latLng && item.latLng !== "";
      });
    },
  },
  mounted() {
    // is location stored
    // if (localStorage.location) {
    //   this.location = JSON.parse(localStorage.location);
    // } else {
      // do we support geolocation
      if (!("geolocation" in navigator)) {
        this.error = "Geolocation is not available.";
      }
      this.gettingLocation = true;
      // get position
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.gettingLocation = false;
          this.location = pos;
          this.center = [
            this.location.coords.latitude,
            this.location.coords.longitude,
          ];
          // localStorage.location = JSON.stringify(_.clone(pos));
        },
        (err) => {
          this.gettingLocation = false;
          this.error = err.message;
          // localStorage.location = "";
        }
      );
    // }
  },

  methods: {
    setCenter(value) {
      this.center = { lat: parseFloat(value[0]), lng: parseFloat(value[1]) };
    },
    print() {
      window.print();
    },
    search(collection, text) {
      return _.filter(collection, (object) => {
        const search = this.deepSearch(object, text.toLowerCase());
        return _.keys(search).length > 0;
      });
    },

    deepSearch(collection, predicate, thisArg) {
      if (_.isFunction(predicate)) {
        predicate = _.iteratee(predicate, thisArg);
      } else {
        let keys = _.flatten(_.tail(arguments));
        if (typeof keys === "string") {
          keys = keys.toLowerCase();
        }
        predicate = function (val) {
          if (typeof val === "string") {
            val = val.toLowerCase();
          }
          return _.includes(val, keys);
        };
      }
      const that = this;
      return _.transform(collection, function (memo, val, key) {
        let include = predicate(val, key);
        if (!include && _.isObject(val)) {
          val = that.deepSearch(val, predicate);
          include = !_.isEmpty(val);
        }
        if (include) {
          _.isArray(collection) ? memo.push(val) : (memo[key] = val);
        }
      });
    },
  },
};
</script>
