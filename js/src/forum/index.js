import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import MarketplaceState from './states/MarketplaceState';
import MarketplacePage from './components/MarketplacePage';
import CheckoutPage from './components/CheckoutPage';
import CartDropdown from './components/CartDropdown';

app.initializers.add('your-vendor/flarum-marketplace', () => {
  app.store.marketplace = new MarketplaceState();
  
  app.routes.marketplace = {
    path: '/marketplace',
    component: MarketplacePage
  };

  app.routes.checkout = {
    path: '/marketplace/checkout',
    component: CheckoutPage
  };

  extend(HeaderSecondary.prototype, 'items', function(items) {
    items.add('cart', <CartDropdown />, 5);
  });
});