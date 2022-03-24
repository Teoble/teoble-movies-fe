<template>
  <div
    class="movie-box md-layout-item md-small-size-50 md-xsmall-size-100 md-medium-size-33 md-size-20"
    @mouseenter="showDetails = !showDetails"
    @mouseleave="showDetails = !showDetails"
  >
    <div class="movie-poster" @click="showModal = true">
      <img :src="movie.poster" :alt="movie.title" v-if="movie.poster !== 'N/A'"/>
      <div class="movie-placeholder" v-else>
        <md-icon class="md-size-2x">movie</md-icon>
      </div>
    </div>
    <transition name="fade">
      <div class="movie-details-wrapper" v-if="showDetails">
        <div class="movie-details">
          <span class="md-title">{{ movie.title }}</span>
          <span class="md-subhead">{{ movie.year }}</span>
        </div>
        <div class="favorite-wrapper">
          <md-button class="md-icon-button md-accent" @click="toggleWishlist()">
            <md-icon v-if="movie.favorite">favorite</md-icon>
            <md-icon v-else>favorite_border</md-icon>
          </md-button>
        </div>
      </div>
    </transition>
    <movie-dialog :clickedMovie="movie" :show="showModal" @modal-closed="showModal = $event" @toggle-wishlist="toggleWishlist()" />
  </div>
</template>
  </div>
</template>

<script lang="ts">
import IMovieCard from '@/model/MovieCard'
import WishlistService from '@/service/WishlistService'
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import MovieDialog from './MovieDialog.vue'

@Component({
  components: {
    MovieDialog
  }
})
export default class MovieCard extends Vue {
  @Prop()
  movie!: IMovieCard

  showDetails: boolean = false
  showModal: boolean = false

  private wishlistService: WishlistService = new WishlistService()

  @Emit()
  toggleWishlist() {
    this.movie.favorite = !this.movie.favorite;

    return this.movie.favorite ? this.wishlistService.addMovieToWishlist(this.movie) :this.wishlistService.removeFromWishlist(this.movie)
  }
}
</script>

<style lang="scss" scoped>
.movie-placeholder {
  background-color: #FFF;
  width: 297px;
  height: 400px;
  display: flex;

  .md-icon {
    color: #343547;
  }
}
.movie-box {
  margin-top: 20px;
  position: relative;
  padding: 0;
  cursor: pointer;

  img {
    height: 450px;
  }

  .movie-poster {
    position: relative;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .movie-details-wrapper {
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 2;
    min-height: 93px;
    margin: 0 20px;
    padding: 5px 10px;

    .movie-details {
      display: grid;
    }
  }
}
</style>
