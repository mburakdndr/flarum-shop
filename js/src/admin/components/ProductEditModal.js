import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';

export default class ProductEditModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    const product = this.attrs.product;

    this.name = Stream(product ? product.name() : '');
    this.description = Stream(product ? product.description() : '');
    this.price = Stream(product ? product.price() : '');
    this.stock = Stream(product ? product.stock() : '');
  }

  className() {
    return 'ProductEditModal Modal--medium';
  }

  title() {
    return this.attrs.product ? 'Ürün Düzenle' : 'Yeni Ürün Ekle';
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>Ürün Adı</label>
            <input
              className="FormControl"
              type="text"
              value={this.name()}
              oninput={e => this.name(e.target.value)}
            />
          </div>

          <div className="Form-group">
            <label>Açıklama</label>
            <textarea
              className="FormControl"
              value={this.description()}
              oninput={e => this.description(e.target.value)}
            />
          </div>

          <div className="Form-group">
            <label>Fiyat (TL)</label>
            <input
              className="FormControl"
              type="number"
              step="0.01"
              value={this.price()}
              oninput={e => this.price(e.target.value)}
            />
          </div>

          <div className="Form-group">
            <label>Stok</label>
            <input
              className="FormControl"
              type="number"
              value={this.stock()}
              oninput={e => this.stock(e.target.value)}
            />
          </div>

          <div className="Form-group">
            {Button.component({
              className: 'Button Button--primary',
              type: 'submit',
              loading: this.loading,
              onclick: () => this.onsubmit(),
            }, 'Kaydet')}
          </div>
        </div>
      </div>
    );
  }

  onsubmit() {
    this.loading = true;

    const data = {
      name: this.name(),
      description: this.description(),
      price: parseFloat(this.price()),
      stock: parseInt(this.stock()),
    };

    const product = this.attrs.product;

    (product ? product.save(data) : app.store.createRecord('products').save(data))
      .then(() => {
        app.alerts.show({ type: 'success' }, product ? 'Ürün güncellendi' : 'Ürün eklendi');
        this.hide();
      })
      .catch(() => {
        this.loading = false;
        m.redraw();
      });
  }
}