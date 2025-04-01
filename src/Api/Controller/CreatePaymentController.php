<?php

namespace YourVendor\Marketplace\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Iyzipay\Model\Buyer;
use Iyzipay\Model\Address;
use Iyzipay\Model\BasketItem;
use Iyzipay\Model\Payment;
use Iyzipay\Options;
use Iyzipay\Request\CreatePaymentRequest;

class CreatePaymentController extends AbstractCreateController
{
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $data = Arr::get($request->getParsedBody(), 'data', []);

        // Iyzico options
        $options = new Options();
        $options->setApiKey(env('IYZICO_API_KEY'));
        $options->setSecretKey(env('IYZICO_SECRET_KEY'));
        $options->setBaseUrl(env('IYZICO_BASE_URL'));

        // Create payment request
        $paymentRequest = new CreatePaymentRequest();
        $paymentRequest->setLocale('tr');
        $paymentRequest->setConversationId(uniqid());
        $paymentRequest->setPrice($data['total']);
        $paymentRequest->setPaidPrice($data['total']);
        $paymentRequest->setCurrency('TRY');
        $paymentRequest->setInstallment(1);
        $paymentRequest->setPaymentChannel('WEB');
        $paymentRequest->setPaymentGroup('PRODUCT');
        $paymentRequest->setPaymentCard($data['card']);

        // Set buyer information
        $buyer = new Buyer();
        $buyer->setId($actor->id);
        $buyer->setName($actor->username);
        $buyer->setSurname($actor->username);
        $buyer->setEmail($actor->email);
        $buyer->setIdentityNumber('11111111111');
        $buyer->setRegistrationAddress($data['address']);
        $buyer->setCity('Istanbul');
        $buyer->setCountry('Turkey');
        $paymentRequest->setBuyer($buyer);

        // Set shipping address
        $shippingAddress = new Address();
        $shippingAddress->setContactName($actor->username);
        $shippingAddress->setCity('Istanbul');
        $shippingAddress->setCountry('Turkey');
        $shippingAddress->setAddress($data['address']);
        $paymentRequest->setShippingAddress($shippingAddress);

        // Set billing address
        $billingAddress = new Address();
        $billingAddress->setContactName($actor->username);
        $billingAddress->setCity('Istanbul');
        $billingAddress->setCountry('Turkey');
        $billingAddress->setAddress($data['address']);
        $paymentRequest->setBillingAddress($billingAddress);

        // Add basket items
        $basketItems = [];
        foreach ($data['items'] as $item) {
            $basketItem = new BasketItem();
            $basketItem->setId($item['id']);
            $basketItem->setName($item['name']);
            $basketItem->setCategory1('Marketplace');
            $basketItem->setItemType('PHYSICAL');
            $basketItem->setPrice($item['price'] * $item['quantity']);
            $basketItems[] = $basketItem;
        }
        $paymentRequest->setBasketItems($basketItems);

        // Make payment
        $payment = Payment::create($paymentRequest, $options);

        if ($payment->getStatus() === 'success') {
            return [
                'status' => 'success',
                'message' => 'Ödeme başarıyla tamamlandı'
            ];
        }

        return [
            'status' => 'error',
            'message' => $payment->getErrorMessage()
        ];
    }
}