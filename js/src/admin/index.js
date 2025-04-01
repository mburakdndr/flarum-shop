import app from 'flarum/admin/app';
import ProductsPage from './components/ProductsPage';

app.initializers.add('your-vendor/flarum-marketplace', () => {
  app.extensionData
    .for('your-vendor-marketplace')
    .registerPage(ProductsPage);
});