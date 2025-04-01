export default class MarketplaceState {
  constructor() {
    this.cart = [];
  }

  addToCart(product) {
    const existingItem = this.cart.find(item => item.id === product.id());
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        id: product.id(),
        name: product.name(),
        price: product.price(),
        quantity: 1
      });
    }
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
  }

  getTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clearCart() {
    this.cart = [];
  }
}