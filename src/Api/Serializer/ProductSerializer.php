<?php

namespace YourVendor\Marketplace\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use YourVendor\Marketplace\Product;

class ProductSerializer extends AbstractSerializer
{
    protected $type = 'products';

    protected function getDefaultAttributes($product)
    {
        return [
            'name' => $product->name,
            'description' => $product->description,
            'price' => $product->price,
            'stock' => $product->stock,
            'createdAt' => $this->formatDate($product->created_at),
            'updatedAt' => $this->formatDate($product->updated_at)
        ];
    }
}