<template>
  <md-content>
    <div class="wrapper">
      <SearchInput @search-term-selected="searchMovies" />
      <div class="search-title">
        <h2>{{ searchTitle }}</h2>
        <md-divider></md-divider>
      </div>
      <div class="search-wrapper">
        <div v-if="isLoading">
          <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div v-else-if="movies.length === 0 && !termSearched">
          <md-empty-state
            class="md-error"
            md-icon="heart_broken"
            md-label="Nothing to show"
            md-description="It seems that you don't have favorite movies"
          >
          </md-empty-state>
        </div>
        <div v-else-if="movies.length === 0 && termSearched">
          <md-empty-state
            class="md-error"
            md-icon="search_off"
            md-label="Nothing to show"
            md-description="We could not find movies for this search"
          >
          </md-empty-state>
        </div>
        <div class="md-layout md-gutter" v-else>
          <movie-card
            v-for="movie of movies"
            :key="movie.imdbID"
            :movie="movie"
          />
        </div>
      </div>
    </div>
  </md-content>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SearchInput from '@/components/SearchInput.vue'
import IMovieCard from '@/model/MovieCard'
import MovieCard from '../components/MovieCard.vue'

@Component({
  components: {
    SearchInput,
    MovieCard
  }
})
export default class HomeView extends Vue {
  termSearched = ''
  movies: IMovieCard[] = []
  isLoading = false

  get searchTitle() {
    return !this.termSearched
      ? 'Your Wishlist'
      : `Search results for "${this.termSearched}"`
  }

  searchMovies(search: string) {
    this.termSearched = search
    this.isLoading = true
    if (this.termSearched)
      this.$http.get(`movies/search?movie=${this.termSearched}`).then(
        (response) => {
          this.movies = response.data
          this.isLoading = false
        },
        (response) => {
          this.movies = []
          this.isLoading = false
        }
      )
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 0 3em;
  padding-bottom: 4em;
}
.search-title {
  margin-bottom: 1.5em;
}

.search-wrapper {
  margin-bottom: 2em;
}
</style>
