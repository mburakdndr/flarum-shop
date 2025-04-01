import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';

export default class ProductListItem extends Component {
  view() {
    const { product } = this.attrs;

    return (
      <div className="ProductListItem">
        <div className="ProductListItem-content">
          <h3 className="ProductListItem-title">{product.name()}</h3>
          <div className="ProductListItem-description">{product.description()}</div>
          <div className="ProductListItem-price">
            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(product.price())}
          </div>
          <div className="ProductListItem-stock">
            Stok: {product.stock()}
          </div>
          <Button
            className="Button Button--primary"
            onclick={() => this.addToCart(product)}
          >
            Sepete Ekle
          </Button>
        </div>
      </div>
    );
  }

  addToCart(product) {
    app.store.marketplace.addToCart(product);
    app.alerts.show({ type: 'success' }, 'Ürün sepete eklendi');
  }
}