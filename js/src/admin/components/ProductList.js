import Component from 'flarum/common/Component';
import ProductListItem from './ProductListItem';

export default class ProductList extends Component {
  view() {
    const { products } = this.attrs;

    return (
      <div className="ProductList">
        <table className="ProductTable">
          <thead>
            <tr>
              <th>Ürün Adı</th>
              <th>Fiyat</th>
              <th>Stok</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <ProductListItem key={product.id()} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}