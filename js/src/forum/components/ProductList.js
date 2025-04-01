import Component from 'flarum/common/Component';
import ProductListItem from './ProductListItem';

export default class ProductList extends Component {
  view() {
    const { products } = this.attrs;

    return (
      <div className="ProductList">
        {products.map(product => (
          <ProductListItem key={product.id()} product={product} />
        ))}
      </div>
    );
  }
}