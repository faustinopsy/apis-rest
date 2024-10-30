<?php
require_once '../vendor/autoload.php';

\Stripe\Stripe::setApiKey('sk_test_clKcMThj6hOSIABJeqjOWMYf');

header('Content-Type: application/json');

$dados = json_decode(file_get_contents("php://input"), true);


try {
    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => $dados['amount'] * 100,
        'currency' => $dados['currency'],
        'description' => $dados['description'],
    ]);

    echo json_encode(['client_secret' => $paymentIntent->client_secret]);
} catch (\Stripe\Exception\ApiErrorException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
