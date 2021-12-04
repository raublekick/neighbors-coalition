<template>
  <div class="section">
    
    <b-field>
      <b-input
        v-model="filter"
        placeholder="Search..."
        type="search"
        icon="magnify"
        icon-clickable
      >
      </b-input>
    </b-field>
    <b-table :data="filteredResources" detailed detail-key="name">
      <b-table-column v-slot="props" label="Category" field="category" sortable>
        {{ props.row.category }}
      </b-table-column>
      <b-table-column v-slot="props" label="Name" field="name" sortable>
        {{ props.row.name }}
      </b-table-column>
      <!-- <b-table-column label="Services" field="services" v-slot="props">
        {{ props.row.services }}
      </b-table-column>
      <b-table-column label="Eligibility" field="eligibility" v-slot="props">
        {{ props.row.eligibility }}
      </b-table-column> -->
      <b-table-column v-slot="props" label="Address" field="address">
        {{ props.row.address }}
      </b-table-column>
      <b-table-column v-slot="props" label="Hours" field="hoursofoperation">
        {{ props.row.hoursofoperation }}
      </b-table-column>
      <b-table-column v-slot="props" label="Phone" field="phone">
        {{ props.row.phone }}
      </b-table-column>
      <b-table-column v-slot="props" label="Website" field="website">
        <a :href="props.row.website" target="_blank" :title="props.row.name">{{
          props.row.website
        }}</a>
      </b-table-column>
      <b-table-column v-slot="props" label="Email" field="email">
        <a
          v-if="props.row.email !== 'n/a' && props.row.email != ''"
          :href="'mailto:' + props.row.email"
          target="_blank"
          :title="props.row.name"
          >{{ props.row.email }}
        </a>
        <span v-else>{{ props.row.email }}</span>
      </b-table-column>
      <b-table-column v-slot="props" label="Tags" field="tags">
        <span
          v-for="(tag, i) in props.row.tags.split(',')"
          :key="i"
          class="tag is-success mr-4"
        >
          {{ tag }}
        </span>
      </b-table-column>

      <template #detail="props">
        <div class="content">
          <strong>Services:</strong>
          <div>{{ props.row.services }}</div>
          <strong>Eligibility:</strong>
          <div>{{ props.row.eligibility }}</div>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as _ from "lodash";
export default {
  name: "Home",
  data() {
    return {
      filter: "",
    };
  },
  computed: {
    ...mapState(["resources"]),
    tagResources() {
      return _.filter(this.resources, resource => {
        const tags = _.chain(resource.tags.split(",")).lowerCase().trim().replace(" ", "-").value();
        
        return resource.category.toLowerCase() === this.$route.params.tag.toLowerCase() || _.includes(tags, this.$route.params.tag.toLowerCase());
      });
    },
    filteredResources() {
      let filtered = this.tagResources;
      if (this.filter !== "") {
        filtered = this.search(filtered, this.filter);
      }

      return filtered;
    },
  },
  methods: {
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
