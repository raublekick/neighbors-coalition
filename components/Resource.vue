<!-- TODO: Unit test -->
<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <!-- Add icon if saved -->
        <div class="media-left">
          <b-tooltip
            position="is-left"
            label="Go to this resource on the map"
            :always="d_persistentTooltip"
            animated
          >
            <figure
              class="image is-48x48"
              @mouseenter="handleIconHover"
              @click="clicked(item.latlng)"
            >
              <a href="#">
                <img :src="icons[item.zone]" :alt="item.title" />
              </a>
            </figure>
          </b-tooltip>
        </div>
        <div class="media-content d-flex">
          <p class="title is-4">
            <a :href="item.website" target="_blank">{{ item.name }}</a>
          </p>
          <span class="subtitle is-6">{{ item.address }}</span>
        </div>
        <div class="details">
          <div>{{ item.category }}</div>
          <div>{{ item.hoursOfOperation }}</div>
          <div>{{ item.website }}</div>
          <div>{{ item.email }}</div>
          <div>{{ item.socialMedia }}</div>
        </div>
      </div>

      <div class="content">
        {{ item }}
        <b-taglist>
          <b-tag v-for="tag in tags" :key="tag" type="is-primary">{{
            tag
          }}</b-tag>
        </b-taglist>
        <div v-if="item.services">
          <strong>Services:</strong>
          <read-more :text="item.services" align="right"></read-more>
        </div>

        <div v-if="item.eligibility">
          <strong>Eligibility:</strong>
          <read-more :text="item.eligibility" align="right"></read-more>
        </div>

        <br />

        <!-- <b-notification
          v-if="showWarning"
          type="is-warning"
          has-icon
          :closable="false"
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
        </b-notification> -->
      </div>
    </div>
  </div>
</template>
<script>
import ReadMore from "@raublekick/vue-read-more";
// import * as _ from "lodash";

// import NotificationIcon from "./NotificationIcon";
export default {
  name: "BusinessItem",

  components: {
    // NotificationIcon,
    ReadMore,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
    persistentTooltip: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      icons: [
        require("../assets/pin-blue.png"),
        require("../assets/pin-red.png"),
        require("../assets/pin-green.png"),
        require("../assets/pin-yellow.png"),
      ],
      d_persistentTooltip: false,
    };
  },

  computed: {
    tags() {
      return this.item.tags.split(",");
    },
  },
  mounted() {
    if (this.persistentTooltip) {
      this.d_persistentTooltip = true;
    }
  },
  methods: {
    clicked(value) {
      this.$emit("clicked", value);
    },
    handleIconHover() {
      this.d_persistentTooltip = false;
    },
  },
};
</script>
<style>
.media-content.d-flex {
  display: flex;
  flex-direction: column;
}
.media-content.d-flex span {
  margin: 0;
}
.last-updated {
  display: inline-block;
  margin-bottom: 4px;
  font-weight: bold;
}
.last-updated.warning {
  border-bottom: 2px dashed #ffdd57;
}
.tags {
  margin-bottom: 0px !important;
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
