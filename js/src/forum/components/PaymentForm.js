import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';

export default class PaymentForm extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.loading = false;
    this.cardNumber = '';
    this.cardName = '';
    this.expireMonth = '';
    this.expireYear = '';
    this.cvc = '';
  }

  view() {
    return (
      <div className="PaymentForm">
        <div className="Form-group">
          <label>Kart Üzerindeki İsim</label>
          <input
            type="text"
            className="FormControl"
            value={this.cardName}
            oninput={e => this.cardName = e.target.value}
          />
        </div>

        <div className="Form-group">
          <label>Kart Numarası</label>
          <input
            type="text"
            className="FormControl"
            value={this.cardNumber}
            oninput={e => this.cardNumber = e.target.value}
            maxLength="16"
          />
        </div>

        <div className="Form-group">
          <div className="PaymentForm-row">
            <div className="PaymentForm-col">
              <label>Son Kullanma Tarihi</label>
              <div className="PaymentForm-date">
                <input
                  type="text"
                  className="FormControl"
                  placeholder="Ay"
                  value={this.expireMonth}
                  oninput={e => this.expireMonth = e.target.value}
                  maxLength="2"
                />
                <span>/</span>
                <input
                  type="text"
                  className="FormControl"
                  placeholder="Yıl"
                  value={this.expireYear}
                  oninput={e => this.expireYear = e.target.value}
                  maxLength="2"
                />
              </div>
            </div>
            <div className="PaymentForm-col">
              <label>CVC</label>
              <input
                type="text"
                className="FormControl"
                value={this.cvc}
                oninput={e => this.cvc = e.target.value}
                maxLength="3"
              />
            </div>
          </div>
        </div>

        {Button.component({
          className: 'Button Button--primary Button--block',
          loading: this.loading,
          onclick: () => this.processPayment(),
        }, 'Ödemeyi Tamamla')}
      </div>
    );
  }

  processPayment() {
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;

    const paymentData = {
      card: {
        cardHolderName: this.cardName,
        cardNumber: this.cardNumber,
        expireMonth: this.expireMonth,
        expireYear: '20' + this.expireYear,
        cvc: this.cvc
      },
      items: app.store.marketplace.cart,
      total: app.store.marketplace.getTotal(),
      address: this.attrs.address,
      phone: this.attrs.phone
    };

    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + '/marketplace/payment',
      data: {
        data: paymentData
      }
    }).then(response => {
      if (response.status === 'success') {
        app.store.marketplace.clearCart();
        app.alerts.show({ type: 'success' }, response.message);
        m.route.set('/marketplace');
      } else {
        app.alerts.show({ type: 'error' }, response.message);
      }
    }).catch(error => {
      app.alerts.show({ type: 'error' }, 'Ödeme işlemi sırasında bir hata oluştu');
    }).finally(() => {
      this.loading = false;
      m.redraw();
    });
  }

  validateForm() {
    if (!this.cardName || !this.cardNumber || !this.expireMonth || !this.expireYear || !this.cvc) {
      app.alerts.show({ type: 'error' }, 'Lütfen tüm kart bilgilerini doldurun');
      return false;
    }

    if (this.cardNumber.length !== 16) {
      app.alerts.show({ type: 'error' }, 'Geçersiz kart numarası');
      return false;
    }

    if (this.expireMonth < 1 || this.expireMonth > 12) {
      app.alerts.show({ type: 'error' }, 'Geçersiz son kullanma ayı');
      return false;
    }

    if (this.cvc.length !== 3) {
      app.alerts.show({ type: 'error' }, 'Geçersiz CVC kodu');
      return false;
    }

    return true;
  }
}