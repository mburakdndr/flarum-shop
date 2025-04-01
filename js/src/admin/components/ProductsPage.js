import app from 'flarum/admin/app';
import AdminPage from 'flarum/admin/components/AdminPage';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import ProductList from './ProductList';
import ProductEditModal from './ProductEditModal';

export default class ProductsPage extends AdminPage {
  oninit(vnode) {
    super.oninit(vnode);
    
    this.loading = true;
    this.products = [];

    this.loadProducts();
  }

  content() {
    return (
      <div className="ProductsPage">
        <div className="ProductsPage-header">
          <div className="container">
            <h2>Ürün Yönetimi</h2>
            {Button.component({
              className: 'Button Button--primary',
              icon: 'fas fa-plus',
              onclick: () => app.modal.show(ProductEditModal),
            }, 'Yeni Ürün Ekle')}
          </div>
        </div>

        <div className="ProductsPage-list">
          <div className="container">
            {this.loading ? (
              <LoadingIndicator />
            ) : (
              <ProductList products={this.products} />
            )}
          </div>
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