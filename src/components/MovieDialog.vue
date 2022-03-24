<template>
  <md-dialog
    :md-active.sync="show"
    :md-click-outside-to-close="true"
    @md-closed="modalClosed()"
    @md-opened="getMovie()"
  >
    <div>
      <div class="error" v-if="hasError || !movie.title">
        <md-empty-state
          class="md-error"
          md-icon="report"
          md-label="Opss..."
          md-description="We could not find this movie"
        >
        </md-empty-state>
      </div>
      <div v-else-if="isLoading">
        <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
      </div>
      <div class="detail-wrapper" v-else>
        <div class="detail-poster">
          <img :src="movie.poster" :alt="movie.title" />
        </div>
        <div class="detail-info">
          <div class="movie-title">
            <span class="md-headline">{{ movie.title }}</span>
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
import IMovieDetails from '@/model/MovieDetails'
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MovieDialog extends Vue {
  @Prop()
  imdbID!: number

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
    this.$http.get(`movies/${this.imdbID}`).then(
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
  modalClosed() {
    return false
  }
}
</script>

<style lang="scss" scoped>
.detail-wrapper {
  display: flex;
  padding: 2em;
}

.detail-info {
  margin-left: 2em;
  width: 400px;
  text-align: justify;
}
</style>
