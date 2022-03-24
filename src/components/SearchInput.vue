<template>
  <div class="search-wrapper">
    <md-autocomplete
      v-model="searchedMovie"
      :md-options="suggestedMovies"
      md-input-placeholder="E.g. Harry Potter"
      @md-changed="getSuggestions"
      @md-selected="searchTermSelected"
    >
      <label>Search Movies</label>
      <md-icon>search</md-icon>
    </md-autocomplete>
  </div>
</template>

<script lang="ts">
import IMovieCard from '@/model/MovieCard'
import { Component, Emit, Vue } from 'vue-property-decorator'

@Component
export default class SearchInput extends Vue {
  searchedMovie = ''
  suggestedMovies = []

  @Emit()
  searchTermSelected() {
    this.suggestedMovies = []
    return this.searchedMovie
  }

  getSuggestions(searchTerm: string) {
    if (searchTerm)
      this.$http.get(`movies/suggestions?movie=${searchTerm}`).then(
        (response) => {
          this.suggestedMovies = response.data.map(
            (movie: IMovieCard) => movie.title
          )
        },
        (response) => {
          this.suggestedMovies = []
        }
      )
  }
}
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
