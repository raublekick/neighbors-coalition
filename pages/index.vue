<template>
  <section class="section">
    <div class="columns is-mobile">
      <div class="column has-text-centered feature mr-4">
        <nuxt-link :to="{ name: 'community' }">
          <div>
            <b-icon icon="hand-heart" size="is-large" title="Help me" />
            <p class="title is-4">Help me</p>
            <p class="subtitle">
              I need assistance finding resources.
            </p>
          </div>
        </nuxt-link>
      </div>
      <div class="column has-text-centered feature">
        <nuxt-link :to="{ name: 'community' }">
          <div>
            <b-icon icon="handshake" size="is-large" title="I want to help" />
            <p class="title is-4">I want to help</p>
            <p class="subtitle">
              Find opportunities to help your neighbors.
            </p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomePage',

  components: {}
}
</script>
