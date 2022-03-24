import {
  getFromLocalStorage,
  setToLocalStorage
} from '@/helper/LocalStorageHelper'
import IMovieCard from '@/model/MovieCard'

export default class WishlistService {
  addMovieToWishlist(movieToAdd: IMovieCard): IMovieCard[] {
    const wishlist = this.getWishlist()
    wishlist.push(movieToAdd)
    this.updateWishlist(wishlist)
    return wishlist
  }

  removeFromWishlist(movieToRemove: IMovieCard): IMovieCard[] {
    const wishlist = this.getWishlist()
    const updatedWishlist = wishlist.filter(
      (movie) => movie.imdbID !== movieToRemove.imdbID
    )
    this.updateWishlist(updatedWishlist)
    return updatedWishlist
  }

  getWishlist(): IMovieCard[] {
    const wishlist = getFromLocalStorage('wishlist') as IMovieCard[]
    return Object.keys(wishlist).length > 0 ? wishlist : []
  }

  private updateWishlist(updatedWishlist: IMovieCard[]) {
    setToLocalStorage('wishlist', updatedWishlist)
  }
}
