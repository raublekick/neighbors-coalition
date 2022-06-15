<template>
  <b-navbar class="has-shadow is-spaced" wrapper-class="container">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'index' }">
        <img src="fp.png" alt="Feed Phoenix" />
      </b-navbar-item>
    </template>
    <template slot="start"> </template>

    <template slot="end"
      ><b-navbar-item
        tag="router-link"
        class="has-text-weight-bold"
        :to="{ name: 'index' }"
      >
        Home
      </b-navbar-item>
      <!-- <b-navbar-item
        tag="router-link"
        class="has-text-weight-bold"
        :to="{ name: 'help-me' }"
      >
        Help Me
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        class="has-text-weight-bold"
        :to="{ name: 'give-help' }"
      >
        Give Help
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        class="has-text-weight-bold"
        :to="{ name: 'calendar' }"
      >
        Calendar
      </b-navbar-item> -->
      <!-- <b-navbar-item
        tag="router-link"
        class="has-text-weight-bold"
        :to="search"
      >
        Search
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        class="has-text-weight-bold"
        :to="{ name: 'faqs' }"
      >
        FAQs
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        class="has-text-weight-bold"
        :to="{ name: 'about' }"
      >
        About
      </b-navbar-item> -->
    </template>
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
};
</script>

<style>
</style>
