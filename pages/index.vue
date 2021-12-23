<template>
  <section class="section">
    <section class="hero">
          <div class="hero-body">
            <p class="title">Phoenix Homeless Resources</p>
            <p class="subtitle">Brought to you by the Neighbors Coalition</p>
          </div>
        </section>
    <div class="columns is-multiline">
      <feature class="column is-one-third" route="help-me" icon="hand-heart" title="Help me" sub-title="I need assistance finding resources." />
      <feature class="column is-one-third" route="give-help" icon="handshake" title="I want to help" sub-title="Find opportunities to help your neighbors." />
      <feature class="column is-one-third" route="calendar" icon="calendar" title="Event calendar" sub-title="Weekly events throughout the valley." />
    </div>

    <div class="has-text-centered">
      <nuxt-link :to="{ name: 'all' }">View all</nuxt-link>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'HomePage',
  data() {
    return {}
  },
  computed: {
    ...mapState(["resources", "events"])
  }
}
</script>
<style scoped>

</style>