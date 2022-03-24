<template>
  <div class="search-wrapper">
    <md-autocomplete
      v-model="searchedMovie"
      :md-options="suggestedMovies"
      md-input-placeholder="E.g. Harry Potter"
      md-dense
    >
      <label>Search Movies</label>
      <md-icon>search</md-icon>
    </md-autocomplete>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SearchInput',
  data() {
    return {
      searchedMovie: '',
      suggestedMovies: ['Harry Potter 1', 'Harry Potter 2', 'Harry Potter 3']
    }
  }
})
</script>

<style scoped>
.md-content {
  width: 100%;
}

.md-field {
  padding-top: 10px;
  max-width: 560px;
}

.search-wrapper {
  display: flex;
  justify-content: center;
}
</style>
