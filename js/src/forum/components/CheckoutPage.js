import Page from 'flarum/common/components/Page';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import PaymentForm from './PaymentForm';

export default class CheckoutPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);
    
    this.loading = false;
    this.cart = app.store.marketplace.cart;
    this.total = app.store.marketplace.getTotal();
    this.showPaymentForm = false;

    this.address = '';
    this.phone = '';
  }

  view() {
    if (this.cart.length === 0) {
      m.route.set('/marketplace');
      return null;
    }

    return (
      <div className="CheckoutPage">
        <div className="container">
          <h2 className="CheckoutPage-title">Sipariş Özeti</h2>
          
          <div className="CheckoutPage-content">
            <div className="CheckoutPage-items">
              {this.cart.map(item => (
                <div key={item.id} className="CheckoutPage-item">
                  <div className="CheckoutPage-itemInfo">
                    <span className="CheckoutPage-itemName">{item.name}</span>
                    <span className="CheckoutPage-itemQuantity">x{item.quantity}</span>
                    <span className="CheckoutPage-itemPrice">
                      {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
              
              <div className="CheckoutPage-total">
                <span>Toplam:</span>
                <span>{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(this.total)}</span>
              </div>
            </div>

            <div className="CheckoutPage-form">
              {!this.showPaymentForm ? (
                <>
                  <div className="Form-group">
                    <label>Teslimat Adresi</label>
                    <textarea
                      className="FormControl"
                      value={this.address}
                      oninput={e => this.address = e.target.value}
                      rows="3"
                    />
                  </div>

                  <div className="Form-group">
                    <label>Telefon Numarası</label>
                    <input
                      type="tel"
                      className="FormControl"
                      value={this.phone}
                      oninput={e => this.phone = e.target.value}
                    />
                  </div>

                  {Button.component({
                    className: 'Button Button--primary Button--block',
                    onclick: () => this.proceedToPayment(),
                  }, 'Ödemeye Geç')}
                </>
              ) : (
                <PaymentForm
                  address={this.address}
                  phone={this.phone}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  proceedToPayment() {
    if (!this.address || !this.phone) {
      app.alerts.show({ type: 'error' }, 'Lütfen tüm alanları doldurun');
      return;
    }

    this.showPaymentForm = true;
    m.redraw();
  }
}