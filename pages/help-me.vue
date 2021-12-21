<template>
  <section class="section">
    <b-icon icon="hand-heart" class="is-pulled-left mr-4" size="is-large" title="Help me" />
    <p class="title is-4">Help me</p>
    <p class="subtitle">
      I need assistance finding resources.
    </p>
    <div class="columns is-multiline">
        <feature class="column is-half" route="/search/housing" icon="home" title="Shelter" sub-title="I would like to find a shelter." />
        <feature class="column is-half" route="/search/substance" icon="needle" title="Substance abuse programs" sub-title="I am interested in substance abuse programs." />
        <feature class="column is-half" route="/search/resource-exchange" icon="currency-usd-off" title="Resource exchanges" sub-title="Help me find resource exchange events." />
    </div>
  </section>
</template>
<script>
export default {
  data() {return {}}
}
</script>