<template>
  <md-dialog
    :md-active.sync="show"
    :md-click-outside-to-close="true"
    @md-closed="modalClosed()"
    @md-opened="getMovie()"
  >
    <div>
      <div v-if="isLoading">
        <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
      </div>
      <div class="error" v-else-if="hasError || !movie.title">
        <md-empty-state
          class="md-error"
          md-icon="report"
          md-label="Opss..."
          md-description="We could not find this movie"
        >
        </md-empty-state>
      </div>
      <div class="detail-wrapper" v-else>
        <div class="detail-poster">
          <img
            :src="movie.poster"
            :alt="movie.title"
            v-if="movie.poster !== 'N/A'"
          />
          <div class="movie-placeholder" v-else>
            <md-icon class="md-size-2x">movie</md-icon>
          </div>
        </div>
        <div class="detail-info">
          <div class="movie-title">
            <span class="md-headline">{{ movie.title }}</span>
          </div>
          <div>
            <md-button
              class="md-icon-button md-accent"
              @click="toggleWishlist()"
            >
              <md-icon v-if="clickedMovie.favorite">favorite</md-icon>
              <md-icon v-else>favorite_border</md-icon>
            </md-button>
          </div>
          <div class="movie-props">
            <p><span class="md-body-2">Year: </span>{{ movie.year }}</p>
            <p>
              <span class="md-body-2">Released Date: </span>{{ movie.released }}
            </p>
            <p><span class="md-body-2">Genre: </span>{{ movie.genre }}</p>
            <p><span class="md-body-2">Director: </span>{{ movie.director }}</p>
            <p><span class="md-body-2">Actors: </span>{{ movie.actors }}</p>
            <p><span class="md-body-2">Plot: </span>{{ movie.plot }}</p>
            <p>
              <span class="md-body-2">IMDB Rating: </span>{{ movie.imdbRating }}
            </p>
            <p v-if="movie.website !== 'N/A'">
              <span class="md-body-2">Website: </span>
              <a href="" target="_blank">{{ movie.website }}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </md-dialog>
</template>

<script lang="ts">
import IMovieCard from '@/model/MovieCard'
import IMovieDetails from '@/model/MovieDetails'
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MovieDialog extends Vue {
  @Prop()
  clickedMovie!: IMovieCard

  @Prop()
  show: boolean = false

  isLoading = false
  hasError = false

  movie: IMovieDetails = {
    title: '',
    year: 0,
    released: '',
    genre: '',
    director: '',
    actors: '',
    plot: '',
    poster: '',
    imdbRating: 0,
    imdbID: '',
    website: ''
  }

  getMovie() {
    this.isLoading = true
    this.$http.get(`movies/${this.clickedMovie.imdbID}`).then(
      (response) => {
        this.movie = response.data
        this.isLoading = false
        this.hasError = false
      },
      (response) => {
        this.hasError = true
        this.isLoading = false
      }
    )
  }

  @Emit()
  toggleWishlist() {
    return this.clickedMovie
  }

  @Emit()
  modalClosed() {
    return false
  }
}
</script>

<style lang="scss" scoped>
.movie-placeholder {
  background-color: #fff;
  width: 297px;
  height: 400px;
  display: flex;

  .md-icon {
    color: #343547;
  }
}
.detail-wrapper {
  display: flex;
  flex-direction: row;
  padding: 2em 2em 4em 2em;
}

.detail-info {
  margin-left: 2em;
  width: 400px;
  text-align: justify;
}
</style>
