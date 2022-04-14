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
            We currently use the latest response for a business location and
            trust that it is accurate. Responses are manually updated on this
            website with a delay of 1-2 days.
          </p>
          <div class="mt-4">
            <b-button
              tag="a"
              type="is-primary"
              target="_blank"
              href="https://docs.google.com/forms/d/1ikzeLf68sLK1XZqIoXMKJUL7ooxR9n7744ESVJSjskE"
              >Submit A Business</b-button
            >
            - or -
            <b-button
              tag="a"
              type="is-info"
              target="_blank"
              href="https://docs.google.com/spreadsheets/d/13cf0sM_IS6TAH09J3KCVOwZdHyakwG1BmgEWwqHvCsU"
              >View Submission Data</b-button
            >
          </div>
        </b-message>

        <!-- <map-view :items="filteredResources" :center="center" /> -->

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
// @ is an alias to /src
import * as _ from "lodash";
import { mapState } from "vuex";
// mport MapView from "@/components/Map";
import ResourceList from "~/components/ResourceList.vue";

export default {
  name: "Home",
  components: {
    // MapView,
    ResourceList,
  },
  data() {
    return {
      filter: "",
      center: [
        process.env.VUE_APP_CENTER_LAT || 33.4515,
        process.env.VUE_APP_CENTER_LNG || -112.07,
      ],
    };
  },
  computed: {
    ...mapState(["resources"]),
    filteredResources() {
      let filtered = this.resources;
      if (this.filter !== "") {
        filtered = this.search(filtered, this.filter);
      }

      return filtered;
    },
  },

  methods: {
    setCenter(value) {
      this.center = [value[0], value[1]];
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