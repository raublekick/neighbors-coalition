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
          <p class="mt-4">
            This data is sourced from community volunteers and feeback from
            users. Do you know of a resource that we don't?
          </p>
          <div class="mt-4">
            <b-button
              tag="a"
              type="is-primary"
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfYak8R03DyGPBTyJudI_b-VmZb9CUbaMm3yDSAwe9RrxG3Eg/viewform?usp=pp_url&entry.1291524438=Suggest+a+new+resource"
              >Suggest a resource</b-button
            >
          </div>
        </b-message>
        <client-only>
          <map-view :items="filteredResources" :center="center" :home="home" />

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
              <b-field label="Distance (miles)">
                <b-select v-model="distance">
                  <option value="">Show all</option>
                  <option value="1">1</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </b-select>
              </b-field>
            </b-field>
          </section>

          <resource-list
            class="mt-4"
            :items="filteredResources"
            @clicked="setCenter"
          />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from "lodash";
import { mapActions, mapState } from "vuex";
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
      distance: 10,
      center: [
        process.env.VUE_APP_CENTER_LAT || 33.4515,
        process.env.VUE_APP_CENTER_LNG || -112.07,
      ],
      home: [],
      gettingLocation: false,
      error: "",
      location: {},
    };
  },
  computed: {
    ...mapState(["resources"]),
    filteredResources() {
      let filtered = this.sortedItems;
      if (this.filter !== "") {
        filtered = this.search(filtered, this.filter);
      }

      return filtered;
    },
    sortedItems() {
      return _.sortBy(this.mappableItems, (item) => {
        return item.distance;
      });
    },
    mappableItems() {
      return _.filter(this.resources, (item) => {
        // only map items that have a valid latlng and are under the set distance if the home location is set
        return (
          item.latLng &&
          item.latLng !== "" &&
          (this.home.length && this.distance
            ? parseFloat(item.distance) <= parseFloat(this.distance) &&
              parseFloat(item.distance) > 0
            : true)
        );
      });
    },
  },
  mounted() {
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
        this.home = this.center;
        this.updateDistances({ resources: this.resources, center: this.home });
      },
      (err) => {
        this.gettingLocation = false;
        this.error = err.message;
      }
    );
  },

  methods: {
    ...mapActions(["updateDistances"]),
    setCenter(value) {
      this.center = [parseFloat(value[0]), parseFloat(value[1])];
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
