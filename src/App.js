import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
        products: [
            {
                price: 99,
                title: 'watch',
                qty: 1,
                img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=388&q=80',
                id: 1
            },
            {
                price: 999,
                title: 'Mobile Phone',
                qty: 1,
                img: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=465&q=80',
                id: 2
            },
            {
                price: 9999,
                title: 'laptop',
                qty: 4,
                img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80',
                id: 3
            },
        ]
    }
}

  handleIncreaseQuantity = (product) => {
    const {products} = this.state;
    const index = products.indexOf(product);

    products[index].qty += 1;
    this.setState({products});

  }

  handleDecreaseQuantity = (product) => {
    const {products} = this.state;
    const index = products.indexOf(product);
    if(products[index].qty == 0){
        return;
    }
    products[index].qty -= 1;
    this.setState({products});
  }

  handleDeleteProduct = (id) => {
    const {products} = this.state;
    const items = products.filter((item) => item.id !==id);
    
    this.setState({
        products: items
    })
  }

  getCartCount = () => {
    const {products} = this.state;
    var count = 0;
    products.forEach((product) => {
      count += product.qty;
    });  
    return count;
  }

  getCartTotal = () => {
    const {products} = this.state;
    var total = 0;
    products.map((product) => {
      total += (product.price * product.qty) ;
    });  
    return total;
  }

  render(){
    const {products} = this.state;
    return (
      <div className="App">
        <Navbar count = {this.getCartCount()} />
        <Cart 
          products = {products}
          onIncreaseQuantity = {this.handleIncreaseQuantity} 
          onDecreaseQuantity = {this.handleDecreaseQuantity}
          onDeleteProduct = {this.handleDeleteProduct}
        />
        <div style={{fontSize:20, padding:10}} >
          TOTAL: {this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
