import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from 'firebase';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
        products: [],
        loading: true
    }
    this.db = firebase.firestore(); 
}
  componentDidMount(){
    // firebase
    //   .firestore()
    //   .collection('products')
    //   .get()
    //   .then((snapshot) => {
    //     const products = snapshot.docs.map((doc) => {
    //       const data = doc.data();
    //       data['id'] = doc.id;
    //       return data;
    //     })
        
    //     this.setState({
    //       products,
    //       loading:false,
    //     })

    //   })
    this.db
      .collection('products')
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        })
        
        this.setState({
          products,
          loading:false,
        })

      })
  }
  handleIncreaseQuantity = (product) => {
    const {products} = this.state;
    const index = products.indexOf(product);
    // update qty localy
    // product.qty += 1;
    // this.setState({products});

    //update qty in firebase
    const docRef = this.db.collection('products').doc(products[index].id);
    docRef.update({
      qty: products[index].qty + 1
    })
    .then(() => {
      console.log('updated');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  handleDecreaseQuantity = (product) => {
    const {products} = this.state;
    const index = products.indexOf(product);
    if(products[index].qty === 0){
        return;
    }
    const docRef = this.db.collection('products').doc(products[index].id);
    docRef
      .update({
        qty: products[index].qty - 1
      })
      .then(() => {
        console.log('decreased');
      })
      .catch((error) => {
        console.log(error);
      })
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
      return '';
    });  
    return total;
  }

  addProduct = () => {
    this.db
      .collection('products')
      .add({
        title:'washing machine',
        price: 20000,
        qty: 1,
        img: ''
      })
      .then((docRef) => {
        console.log('docref', docRef);
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  render(){
    const {products,loading} = this.state;
    return (
      <div className="App">
        <Navbar count = {this.getCartCount()} />
        {/* <button onClick={this.addProduct}>Add a product</button> */}
        <Cart 
          products = {products}
          onIncreaseQuantity = {this.handleIncreaseQuantity} 
          onDecreaseQuantity = {this.handleDecreaseQuantity}
          onDeleteProduct = {this.handleDeleteProduct}
        />
        {loading && <h1>loading...</h1>}
        <div style={{fontSize:20, padding:10}} >
          TOTAL: {this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
