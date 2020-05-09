
import { CardImg } from 'reactstrap'
import './header.scss'
import React, { Component } from 'react'
import Cart from '../cart/Cart'

class Header extends Component {

   state = {
      serchTerm: '',
      isEmptyCart: true
   }

   UNSAFE_componentWillMount() {
      if (localStorage.getItem('keyWord')) {
         this.setState({
            serchTerm: JSON.parse(localStorage.getItem('keyWord'))
         })
      }
   }

   getKeyWord = e => {
      this.setState({
         serchTerm: e.target.value
      }, () => {
         this.props.typeSearch(this.state.serchTerm)
      })
   }

   render() {
      const { arrCart, isBounching } = this.props;

      return (
         <div className='head d-flex justify-content-center align-items-center'>
            <div className='wraper container d-flex justify-content-between'>
               <div className='ava'>
                  <CardImg src='/assets/Veggy.png' />
               </div>

               <form className='d-flex' onSubmit={(e) => e.preventDefault()}>
                  <input value={this.state.serchTerm} onChange={this.getKeyWord} placeholder='Search for Vegetables and Fruits' />
                  <button className='btn'>
                     <i className="fas fa-search"></i>
                  </button>
               </form>

               <div className='show-cart'>
                  <Cart
                     isBounching={isBounching}
                     arrCart={arrCart}
                     subCart={this.props.subCart}
                  />
               </div>
            </div>
         </div>
      )
   }
}

export default Header