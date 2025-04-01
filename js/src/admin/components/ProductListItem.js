import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import ProductEditModal from './ProductEditModal';

export default class ProductListItem extends Component {
  view() {
    const { product } = this.attrs;

    return (
      <tr className="ProductListItem">
        <td className="ProductListItem-name">{product.name()}</td>
        <td className="ProductListItem-price">
          {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(product.price())}
        </td>
        <td className="ProductListItem-stock">{product.stock()}</td>
        <td className="ProductListItem-actions">
          {Button.component({
            className: 'Button Button--icon',
            icon: 'fas fa-edit',
            onclick: () => app.modal.show(ProductEditModal, { product }),
          })}
          {Button.component({
            className: 'Button Button--icon Button--danger',
            icon: 'fas fa-trash',
            onclick: () => this.deleteProduct(product),
          })}
        </td>
      </tr>
    );
  }

  deleteProduct(product) {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      product.delete().then(() => {
        app.alerts.show({ type: 'success' }, 'Ürün başarıyla silindi');
      });
    }
  }
}