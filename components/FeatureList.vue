<template>
  <section class="section">
    <div class="columns is-multiline">
      <template v-for="(category, index) in categories">
        <feature :key="index" class="column is-half" :route="`/search/{category.search}`" :icon="category.icon" :title="category.name" :sub-title="category.description" />
      </template>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {return {}},
  computed: {
    ...mapState(["categories"])
  }
}
</script>