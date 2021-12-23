<template>
  <section class="section">
    <b-icon icon="calendar" class="is-pulled-left mr-4" size="is-large" title="Help me" />
    <p class="title is-4">Event Calendar</p>
    <p class="subtitle">
      Weekly events
    </p>

    <div>
      <div v-for="(event,index) in events" :key="index" class="pb-3">
        <event :event="event"/>
      </div>
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