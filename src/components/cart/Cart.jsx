
import React, { Component } from 'react'
import ShowCartPreview from './ShowCartPreview'
import './cart.scss'

class Cart extends Component {
   cartPreview = React.createRef();

   state = {
      showCartPreview: false
   }

   openCart = () => {
      this.setState({
         showCartPreview: !this.state.showCartPreview
      })
   }

   render() {
      const { arrCart, isBounching } = this.props;

      return (
         <>
            <div className='bag d-flex justify-content-center align-items-center'>
               <>
                  <div className='sub'>
                     <div className='infor'>
                        <p>No. of items: <span style={{
                           marginLeft: '20px'
                        }}>{arrCart.length}</span></p>

                        <p>Sub Total: <span style={{
                           paddingLeft: '20px'
                        }}>{arrCart.length ? arrCart.reduce((acc, val) => acc = acc + val.count * val.cost, 0) : 0}</span></p>
                     </div>

                     <div className={isBounching ? 'bounching' : ''}>
                        <img src='/assets/bag.png' alt='bag' onClick={this.openCart} />
                     </div>
                  </div>
               </>

               {this.state.showCartPreview &&
                  <ShowCartPreview
                     arrCart={arrCart}
                     subCart={this.props.subCart}
                     openCart={this.openCart}
                     showCartPreview={this.state.showCartPreview}
                  />}
            </div>
         </>
      )
   }
}

export default Cart