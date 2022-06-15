<!-- TODO: Unit test -->
<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <!-- Add icon if saved -->
        <div class="media-left">
          <b-tooltip
            v-if="item.latLng"
            position="is-left"
            label="Go to this resource on the map"
            :always="d_persistentTooltip"
            animated
          >
            <figure
              class="image is-48x48"
              @mouseenter="handleIconHover"
              @click="clicked([item.lat, item.lng])"
            >
              <a href="#">
                <img :src="icons[0]" :alt="item.name" />
              </a>
            </figure>
          </b-tooltip>
        </div>
        <div class="media-content">
          <p class="title is-4">
            <a v-if="item.website" class="has-text-primary" :href="item.website" target="_blank">{{ item.name }}</a>
            <span v-else>{{ item.name }}</span>
          </p>
          <div v-if="item.distance >= 0" class="subtitle is-6">
            {{ item.distance }} miles away
          </div>
        </div>
        <div class="details"></div>
      </div>

      <div class="content">
        <b-modal v-model="showComments" :width="640" scroll="keep">
          <div class="card mb-4">
            <div class="card-content">
              <div><b-icon type="is-primary" icon="star"></b-icon>
              <b-icon type="is-primary" icon="star"></b-icon>
              <b-icon type="is-primary" icon="star"></b-icon>
              <b-icon type="is-primary" icon="star"></b-icon>
              <b-icon type="is-primary" icon="star"></b-icon></div>
              Something incredible is waiting to be known brain is the seed of
              intelligence ship of the imagination billions upon billions hearts of
              the stars venture. Astonishment from which we spring the sky calls to
              us culture astonishment take root and flourish. Globular star cluster
              Drake Equation tingling of the spine Drake Equation the carbon in our
              apple pies citizens of distant epochs. Two ghostly white figures in
              coveralls and helmets are softly dancing a very small stage in a vast
              cosmic arena with pretty stories for which there's little good
              evidence a very small stage in a vast cosmic arena the only home we've
              ever known encyclopaedia galactica and billions upon billions upon
              billions upon billions upon billions upon billions upon billions.
            </div>
          </div>  
          <div class="card mb-4">
            <div class="card-content">
              <div><b-icon icon="star"></b-icon>
              <b-icon icon="star"></b-icon>
              <b-icon icon="star"></b-icon>
              <b-icon icon="star"></b-icon>
              <b-icon icon="star"></b-icon></div>
              Something incredible is waiting to be known brain is the seed of
              intelligence ship of the imagination billions upon billions hearts of
              the stars venture. Astonishment from which we spring the sky calls to
              us culture astonishment take root and flourish. Globular star cluster
              Drake Equation tingling of the spine Drake Equation the carbon in our
              apple pies citizens of distant epochs. Two ghostly white figures in
              coveralls and helmets are softly dancing a very small stage in a vast
              cosmic arena with pretty stories for which there's little good
              evidence a very small stage in a vast cosmic arena the only home we've
              ever known encyclopaedia galactica and billions upon billions upon
              billions upon billions upon billions upon billions upon billions.
            </div>
          </div>  
          <div class="card mb-4">
            <div class="card-content">
              <div><b-icon icon="star"></b-icon>
              <b-icon icon="star"></b-icon>
              <b-icon icon="star"></b-icon>
              <b-icon icon="star"></b-icon>
              <b-icon icon="star"></b-icon></div>
              Something incredible is waiting to be known brain is the seed of
              intelligence ship of the imagination billions upon billions hearts of
              the stars venture. Astonishment from which we spring the sky calls to
              us culture astonishment take root and flourish. Globular star cluster
              Drake Equation tingling of the spine Drake Equation the carbon in our
              apple pies citizens of distant epochs. Two ghostly white figures in
              coveralls and helmets are softly dancing a very small stage in a vast
              cosmic arena with pretty stories for which there's little good
              evidence a very small stage in a vast cosmic arena the only home we've
              ever known encyclopaedia galactica and billions upon billions upon
              billions upon billions upon billions upon billions upon billions.
            </div>
          </div>  
          <div class="card mb-4">
            <div class="card-content">
              <div><b-icon icon="star"></b-icon>
              <b-icon icon="star"></b-icon>
              <b-icon icon="star"></b-icon>
              <b-icon icon="star"></b-icon>
              <b-icon icon="star"></b-icon></div>
              Something incredible is waiting to be known brain is the seed of
              intelligence ship of the imagination billions upon billions hearts of
              the stars venture. Astonishment from which we spring the sky calls to
              us culture astonishment take root and flourish. Globular star cluster
              Drake Equation tingling of the spine Drake Equation the carbon in our
              apple pies citizens of distant epochs. Two ghostly white figures in
              coveralls and helmets are softly dancing a very small stage in a vast
              cosmic arena with pretty stories for which there's little good
              evidence a very small stage in a vast cosmic arena the only home we've
              ever known encyclopaedia galactica and billions upon billions upon
              billions upon billions upon billions upon billions upon billions.
            </div>
          </div>  
        </b-modal>
        </div>
        <div>
          <a href="#" @click.prevent="showComments = !showComments">
            <b-icon type="is-primary" icon="star"></b-icon>
            <b-icon type="is-primary" icon="star"></b-icon>
            <b-icon type="is-primary" icon="star"></b-icon>
            <b-icon type="is-primary" icon="star"></b-icon>
            <b-icon type="is-primary" icon="star"></b-icon>
          </a>
        </div>
        <div>
          <a v-if="item.website" class="has-text-primary" :href="item.website" target="_blank"><b-icon icon="link"></b-icon></a>
          <a v-if="item.facebook" class="has-text-primary" :href="item.facebook" target="_blank"><b-icon icon="facebook"></b-icon></a>
          <a v-if="item.twitter" class="has-text-primary" :href="item.twitter" target="_blank"><b-icon icon="twitter"></b-icon></a>
          <a v-if="item.instagram" class="has-text-primary" :href="item.instagram" target="_blank"><b-icon icon="instagram"></b-icon></a>
        </div>

        <div v-if="item.address">{{ item.address }}</div>
        <div v-if="item.category">{{ item.category }}</div>
        <div v-if="item.hoursOfOperation">{{ item.hoursOfOperation }}</div>
        <div v-if="item.email"><a :href="'mailto:' + item.email">{{item.email}}</a></div>
        <div v-if="item.phone">{{ item.phone }}</div>

        <div v-if="item.services" class="mt-4">
          <strong>Services:</strong>
          <read-more :text="item.services" align="right"></read-more>
        </div>

        <div v-if="item.eligibility" class="mt-4">
          <strong>Eligibility:</strong>
          <read-more :text="item.eligibility" align="right"></read-more>
        </div>

        <b-taglist>
          <b-tag v-for="tag in tags" :key="tag" type="is-primary">{{
            tag
          }}</b-tag>
        </b-taglist>

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
      showComments: false,
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
