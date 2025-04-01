import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Dropdown from 'flarum/common/components/Dropdown';
import icon from 'flarum/common/helpers/icon';

export default class CartDropdown extends Component {
  view() {
    const cart = app.store.marketplace.cart;
    const total = app.store.marketplace.getTotal();

    return (
      <Dropdown
        label={
          <>
            {icon('fas fa-shopping-cart')}
            <span className="CartDropdown-count">{cart.length}</span>
          </>
        }
        className="CartDropdown"
      >
        <div className="CartDropdown-content">
          {cart.length === 0 ? (
            <div className="CartDropdown-empty">Sepetiniz boş</div>
          ) : (
            <>
              <ul className="CartDropdown-items">
                {cart.map(item => (
                  <li key={item.id} className="CartDropdown-item">
                    <div className="CartDropdown-itemInfo">
                      <span className="CartDropdown-itemName">{item.name}</span>
                      <span className="CartDropdown-itemPrice">
                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(item.price)}
                      </span>
                    </div>
                    <div className="CartDropdown-itemQuantity">
                      <span>Adet: {item.quantity}</span>
                      <Button
                        className="Button Button--icon Button--link"
                        icon="fas fa-trash"
                        onclick={() => app.store.marketplace.removeFromCart(item.id)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="CartDropdown-total">
                <span>Toplam:</span>
                <span>{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(total)}</span>
              </div>
              <div className="CartDropdown-actions">
                <Button
                  className="Button Button--primary"
                  onclick={() => m.route.set('/marketplace/checkout')}
                >
                  Siparişi Tamamla
                </Button>
                <Button
                  className="Button"
                  onclick={() => app.store.marketplace.clearCart()}
                >
                  Sepeti Temizle
                </Button>
              </div>
            </>
          )}
        </div>
      </Dropdown>
    );
  }
}