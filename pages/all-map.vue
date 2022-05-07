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

        <b-message
          title="Important update"
          type="is-warning"
          has-icon
          aria-close-icon="Close message"
          role="alert"
        >
          <p>
            As of June 19, 2020 cities across the valley are beginning to issue
            mask requirements.
            <a
              href="https://www.azfamily.com/news/continuing_coverage/coronavirus_coverage/list-these-arizona-cities-are-requiring-face-masks-in-public/article_83403294-b1a0-11ea-9c3a-abc7286a8c77.html"
              target="_blank"
              >Ongoing coverage</a
            >
          </p>
          <p>
            Please keep in mind that entries older than this may no longer
            reflect the current situation.
          </p>
        </b-message>

        <map-view :items="filtered" :center="center" />

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

            <b-field label="Business Type">
              <b-select v-model="businessType" placeholder="Select a value">
                <option value="">All</option>
                <option value="Restaurant / Bar / Food Service">
                  Restaurant / Bar / Food Service
                </option>
                <option value="Grocery Store">Grocery Store</option>
                <option value="Retail">Retail</option>
                <option value="Services">Services</option>
                <option value="Other">Other</option>
              </b-select>
            </b-field>

            <b-field label="Services Offered">
              <b-select v-model="services" placeholder="Select a value">
                <option value="">All</option>
                <option value="Dine-in / In-store shopping">
                  Dine-in / In-store shopping
                </option>
                <option value="Take-out / Pick-up">Take-out / Pick-up</option>
                <option value="Retail">Retail</option>
                <option value="Delivery">Delivery</option>
                <option value="Curbside / Touchless Pick-up">
                  Curbside / Touchless Pick-up
                </option>
              </b-select>
            </b-field>

            <b-field label="Employees wearing masks">
              <b-select v-model="employeeMasks" placeholder="Select a value">
                <option value="">All</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </b-select>
            </b-field>

            <b-field label="Customers wearing masks">
              <b-select v-model="customerMasks" placeholder="Select a value">
                <option value="">All</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </b-select>
            </b-field>
          </b-field>
        </section>

        <business-list class="mt-4" :items="filtered" @clicked="setCenter" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import * as _ from 'lodash'
import { mapState } from 'vuex'
import MapView from '@/components/Map'
import BusinessList from '@/components/BusinessList.vue'

export default {
  name: 'Home',
  components: {
    MapView,
    BusinessList,
  },
  data() {
    return {
      filter: '',
      center: [
        process.env.VUE_APP_CENTER_LAT || 33.4515,
        process.env.VUE_APP_CENTER_LNG || -112.07,
      ],
      gettingLocation: false,
      error: '',
      location: [0, 0],
    }
  },
  computed: {
    ...mapState(['resources']),
    filteredResources() {
      let filtered = this.resources
      if (this.filter !== '') {
        filtered = this.search(filtered, this.filter)
      }

      return filtered
    },
  },
  mounted() {
    // do we support geolocation
    if (!('geolocation' in navigator)) {
      this.error = 'Geolocation is not available.'
    }
    this.gettingLocation = true
    // get position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.gettingLocation = false
        this.location = pos
      },
      (err) => {
        this.gettingLocation = false
        this.error = err.message
      }
    )
  },

  methods: {
    setCenter(value) {
      this.center = [value[0], value[1]]
    },
    print() {
      window.print()
    },
    search(collection, text) {
      return _.filter(collection, (object) => {
        const search = this.deepSearch(object, text.toLowerCase())
        return _.keys(search).length > 0
      })
    },

    deepSearch(collection, predicate, thisArg) {
      if (_.isFunction(predicate)) {
        predicate = _.iteratee(predicate, thisArg)
      } else {
        let keys = _.flatten(_.tail(arguments))
        if (typeof keys === 'string') {
          keys = keys.toLowerCase()
        }
        predicate = function (val) {
          if (typeof val === 'string') {
            val = val.toLowerCase()
          }
          return _.includes(val, keys)
        }
      }
      const that = this
      return _.transform(collection, function (memo, val, key) {
        let include = predicate(val, key)
        if (!include && _.isObject(val)) {
          val = that.deepSearch(val, predicate)
          include = !_.isEmpty(val)
        }
        if (include) {
          _.isArray(collection) ? memo.push(val) : (memo[key] = val)
        }
      })
    },
  },
}
</script>
