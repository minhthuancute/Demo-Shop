
import React, { Component } from 'react'
import ShowProduct from './components/products/ShowProduct'
import Datas from './datas.json'
import Header from './components/header/Header'
import Empty from './components/products/Empty'
import Footer from './components/footer/Footer'
import './style.scss'

class App3 extends Component {
   state = {
      inputValue: '',
      products: Datas,
      productFillter: Datas,
      arrCart: [],
      keyWord: '',
      isEmpty: false,
      isBounching: false,
   }

   UNSAFE_componentWillMount() {
      if (localStorage.getItem('small-shop')) {
         const init = localStorage.getItem('small-shop');
         this.setState(JSON.parse(init));
      }
   }

   isChange = (inputValue) => {
      this.setState({
         isChange: true,
         inputValue
      })
   }

   typeSearch = keyWord => {
      console.log(keyWord)
      this.setState({
         keyWord
      }, () => {
         this.search(keyWord)
         localStorage.setItem('keyWord', JSON.stringify(keyWord))
      })
   }

   search = (keyWord) => {
      const newArr = this.state.products.filter(data => data.name.toLowerCase().includes(keyWord.toLowerCase()))
      let isEmpty = newArr.length === 0 ? true : false

      this.setState({
         productFillter: newArr,
         isEmpty
      }, () => {
         localStorage.setItem('small-shop', JSON.stringify(this.state))
      })
   }

   addCart = (name, src, cost, count) => {
      const selectedItem = {
         name, src, cost, count
      }

      this.setState({
         isBounching: true,
      })

      setTimeout(() => {
         this.setState({
            isBounching: false
         })
      }, 400);

      const index = this.state.arrCart.findIndex(item => item.name === name)
      if (index !== -1) {
         this.setState({
            arrCart: [...this.state.arrCart.slice(0, index), { ...this.state.arrCart[index], count: this.state.arrCart[index].count + count }, ...this.state.arrCart.slice(index + 1)]
         }, () => {
            localStorage.setItem('small-shop', JSON.stringify(this.state))
         })
      } else {
         this.setState({
            arrCart: [...this.state.arrCart, selectedItem]
         }, () => {
            localStorage.setItem('small-shop', JSON.stringify(this.state))
         })
      }
   }

   subCart = (name) => {
      this.setState({
         isBounching: true
      })

      setTimeout(() => {
         this.setState({
            isBounching: false
         })
      }, 300);

      this.setState({
         arrCart: this.state.arrCart.filter(item => item.name !== name)
      }, () => {
         localStorage.setItem('small-shop', JSON.stringify(this.state))
      })
   }

   render() {
      const { productFillter, keyWord, arrCart, value, isBounching, inputValue } = this.state;

      return (
         <>
            <Header
               arrCart={arrCart}
               subCart={this.subCart}
               typeSearch={this.typeSearch}
               search={this.search}
               isBounching={isBounching}
               inputValue={inputValue}
            />
            {
               !this.state.isEmpty
                  ? <ShowProduct
                     value={value}
                     products={productFillter}
                     keyWord={keyWord}
                     addCart={this.addCart}
                  />
                  : <Empty />

            }

            <div className={(this.state.productFillter.length === 0 || this.state.productFillter.length === 1) ? 'fixed' : ''}>
               <Footer />
            </div>
         </>
      )
   }
}

export default App3