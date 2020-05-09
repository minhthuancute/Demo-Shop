
import React, { Component } from 'react'
import './displaycart.scss'

class ShowCartPreview extends Component {
   cartPreview = React.createRef();

   state = {
      showCartPreview: this.props.showCartPreview
   }

   showCartPreview = (e) => {
      if (this.cartPreview.current.classList.contains('active')) {
         this.props.openCart()
      }
   }

   handleClickOutside = (e) => {
      if (this.cartPreview.current.classList.contains("active")) {
         if (!this.cartPreview.current || !this.cartPreview.current.contains(e.target)) {
            this.props.openCart()
            e.stopPropagation()
         }
      }
   }

   componentDidMount = () => {
      document.addEventListener('click', this.handleClickOutside, true)
   }
   componentWillUnmount = () => {
      document.removeEventListener('click', this.handleClickOutside, true)
   }

   render() {
      const { arrCart } = this.props;
      return (
         <div ref={this.cartPreview} className={this.state.showCartPreview ? "active" : ""}>
            <div className='display-cart d-flex justify-content-center align-items-center'>
               {
                  this.props && <div className='wrap-display'>
                     {arrCart.length === 0 ?
                        <div className='empty'>
                           <img src='/assets/empty-cart.png' alt='Empty Cart' />
                           <p className='text-center ml-3'>You cart is empty!</p>
                        </div>

                        : <div className='list-products d-flex'>
                           {arrCart && arrCart.map((item, index) => (
                              <div className='item d-flex align-items-center' key={index + 5}>
                                 <i onClick={() => this.props.subCart(item.name)} className="fas fa-times"></i>
                                 <div className='left d-flex'>
                                    <img src={`/assets/${item.src}.jpg`} alt={item.name} />
                                    <div>
                                       <p>{item.name}</p> <br />
                                       <p className='cost'>$: {item.cost}</p>
                                    </div>
                                 </div>

                                 <div className='right'>
                                    {
                                       item.count === 1
                                          ? <p>1 No</p>
                                          : <p>{(item.cost * item.count) / item.cost} Nos</p>
                                    }
                                    <p className='cost'>$: {(item.cost * item.count)}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     }
                     <button className={arrCart.length === 0 ? 'isNull' : 'notNull'}>PROCEED TO CHECK OUT</button>
                  </div>
               }
            </div>
         </div>
      )
   }
}

export default ShowCartPreview