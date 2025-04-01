<?php

namespace YourVendor\Marketplace;

use Flarum\Database\AbstractModel;

class Product extends AbstractModel
{
    protected $table = 'products';

    protected $fillable = ['name', 'description', 'price', 'stock'];
}