<template>
<div>
  <div class="has-text-centered feature p-3">
    <nuxt-link v-if="route" :to="{ name: route }">
      <div>
        <b-icon v-if="icon" :icon="icon" size="is-large" :title="title" />
        <p v-if="title" class="title is-4">{{title}}</p>
        <p v-if="subTitle" class="subtitle">
          {{subTitle}}
        </p>
      </div>
    </nuxt-link>
    <div v-else>
      <b-icon v-if="icon" :icon="icon" size="is-large" :title="title" />
        <p v-if="title" class="title is-4">{{title}}</p>
        <p v-if="subTitle" class="subtitle">
          {{subTitle}}
        </p>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: null
    },
    subTitle: {
      type: String,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    route: {
      type: String,
      required: false,
      default: null,
    }
  },
  data() {
    return {}
  }
}
</script>