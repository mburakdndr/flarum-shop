<?php

namespace YourVendor\Marketplace\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use YourVendor\Marketplace\Product;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListProductsController extends AbstractListController
{
    public $serializer = ProductSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        return Product::all();
    }
}