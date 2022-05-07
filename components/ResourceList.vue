<template>
  <section>
    <div v-for="(item, i) in items" :key="item.BID" class="mt-4">
      <resource :item="item" :persistent-tooltip="i === 0" @clicked="clicked" />
    </div>
  </section>
</template>
<script>
import Resource from "@/components/Resource.vue";

export default {
  name: "ResourceList",
  components: {
    Resource,
  },
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    clicked(value) {
      this.$emit("clicked", value);
    },
  },
};
</script>
<style scoped></style>
