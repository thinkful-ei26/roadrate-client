import React, { Component } from 'react';
import './Review.css'

export class Review extends Component {
  render() {

    return(
      <li className='review'>
        <img src='https://i.pinimg.com/236x/29/55/38/295538a452d701c9189d0fa8f5b36938--white-truck-bad-parking.jpg' className='review-img'></img>
        <h1 className='plate-number'>ABC-1234</h1>
        <h2 className='rating'>Thumb Down</h2>
        <div className='review-buttons'>
          <button value={review.id} className='add-to-cart-button' onClick={(e)=>this.handleCartClick(e)}>Add to Cart</button>
          <button value={review.id} className='add-to-wishlist-button' onClick={(e)=>this.handleWishlistClick(e)}>Add to Wishlist</button>
        </div>
      </li>
    )
  }
}
