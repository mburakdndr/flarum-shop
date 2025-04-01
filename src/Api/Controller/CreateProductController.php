<?php

namespace YourVendor\Marketplace\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use YourVendor\Marketplace\Product;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreateProductController extends AbstractCreateController
{
    public $serializer = ProductSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $actor->assertAdmin();

        $data = Arr::get($request->getParsedBody(), 'data', []);

        return Product::create([
            'name' => Arr::get($data, 'name'),
            'description' => Arr::get($data, 'description'),
            'price' => Arr::get($data, 'price'),
            'stock' => Arr::get($data, 'stock')
        ]);
    }
}