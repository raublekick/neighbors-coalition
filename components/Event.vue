<template>
  <section>
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <b-icon icon="calendar"/>
            
          </div>
          <div class="media-content">
            <p class="title is-4"><a :href="event.htmlLink" target="_blank">{{event.summary}}</a></p>
            <p class="subtitle is-6">{{event.location}}</p>
            <div>{{event.start.dateTime | formatDate}} - {{ event.end.dateTime | formatTime}}</div>
          </div>
        </div>

        <div class="content">
          {{event.description}}
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "Event",
  props: {
    event: {
      required: true,
      type: Object
    }
  },
  data() {
    return {}
  }
}
</script>