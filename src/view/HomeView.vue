<template>
  <md-content>
    <div class="wrapper">
      <SearchInput />
      <div class="search-title">
        <h2>{{ searchTitle }}</h2>
        <md-divider></md-divider>
      </div>
      <div class="search-wrapper">
        <div class="md-layout md-gutter">
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
  searchTitle = 'Your Wishlist'

  movies: IMovieCard[] = [
    {
      imdbID: 'tt1201607',
      title: 'Harry Potter and the Deathly Hallows: Part 2',
      year: 2011,
      poster:
        'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
      favorite: true
    },
    {
      imdbID: 'tt0241527',
      title: "Harry Potter and the Sorcerer's Stone",
      year: 2001,
      poster:
        'https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg',
      favorite: false
    },
    {
      imdbID: 'tt0295297',
      title: 'Harry Potter and the Chamber of Secrets',
      year: 2002,
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTcxODgwMDkxNV5BMl5BanBnXkFtZTYwMDk2MDg3._V1_SX300.jpg',
      favorite: false
    }
  ]
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
