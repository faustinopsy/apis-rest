<?php
require_once '../vendor/autoload.php';

\Stripe\Stripe::setApiKey('sk_test_clKcMThj6hOSIABJeqjOWMYf');

header('Content-Type: application/json');

$dados = json_decode(file_get_contents("php://input"),true);
try {

$produtos = \Stripe\Product::all(['limit' => 10]);
$listaProdutos = [];

foreach ($produtos->data as $produto) {
    $prices = \Stripe\Price::all(['product' => $produto->id, 'limit' => 1]);
    $price = count($prices->data) > 0 ? $prices->data[0]->unit_amount : 0;

    $listaProdutos[] = [
        'id' => $produto->id,
        'name' => $produto->name,
        'description' => $produto->description,
        'price' => $price / 100,
        'currency' => $prices->data[0]->currency ?? 'usd'
    ];
}
    echo json_encode(['success' => true, 'produtos' => $listaProdutos]);
} catch (\Stripe\Exception\ApiErrorException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
