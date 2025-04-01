<?php

namespace YourVendor\Marketplace;

use Flarum\Extend;
use YourVendor\Marketplace\Api\Controller;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),

    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\Routes('api'))
        ->get('/marketplace/products', 'marketplace.products.index', Controller\ListProductsController::class)
        ->post('/marketplace/products', 'marketplace.products.create', Controller\CreateProductController::class)
        ->patch('/marketplace/products/{id}', 'marketplace.products.update', Controller\UpdateProductController::class)
        ->delete('/marketplace/products/{id}', 'marketplace.products.delete', Controller\DeleteProductController::class)
        ->post('/marketplace/payment', 'marketplace.payment.create', Controller\CreatePaymentController::class),
];