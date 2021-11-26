<template>
  <div>
    <nav-bar/>

    <section class="main-content columns">

      <div class="container column is-12">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "@/components/Navbar.vue";
export default {
  components: {
    NavBar
  },
  data () {
    return {}
  }
}
</script>
