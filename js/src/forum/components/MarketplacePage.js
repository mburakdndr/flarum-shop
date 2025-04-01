import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import ProductList from './ProductList';

export default class MarketplacePage extends Page {
  oninit(vnode) {
    super.oninit(vnode);
    
    this.loading = true;
    this.products = [];

    this.loadProducts();
  }

  view() {
    return (
      <div className="MarketplacePage">
        <div className="container">
          <h2 className="MarketplacePage-title">Mağaza</h2>
          {this.loading ? (
            <LoadingIndicator />
          ) : (
            <ProductList products={this.products} />
          )}
        </div>
      </div>
    );
  }

  loadProducts() {
    app.store.find('products')
      .then(products => {
        this.products = products;
        this.loading = false;
        m.redraw();
      });
  }
}