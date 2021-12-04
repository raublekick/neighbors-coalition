<template>
  <section class="section">
    <section class="hero">
          <div class="hero-body">
            <p class="title">Phoenix Homeless Resources</p>
            <p class="subtitle">Brought to you by the Neighbors Coalition</p>
          </div>
        </section>
    <div class="columns is-multiline">
      <feature class="column is-half" route="help-me" icon="hand-heart" title="Help me" sub-title="I need assistance finding resources." />
      <feature class="column is-half" route="give-help" icon="handshake" title="I want to help" sub-title="Find opportunities to help your neighbors." />
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
    ...mapState(["resources"])
  }
}
</script>
