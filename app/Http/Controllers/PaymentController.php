<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class PaymentController extends Controller
{
    public function store(Request $request) {
        $planName = $request->input('name');
        $planPrice = $request->input('price');

        // Chapa API integration
        $chapaUrl = 'https://api.chapa.co/v1/transaction/initialize';
        $chapaSecretKey = 'CHASECK_TEST-Qhm4ziujFqnFsOJQTNOefjMCQtKG16Xw';

        $data = [
            'amount' => $planPrice,
            'currency' => 'ETB',
            'email' => Auth::user()->email,
            'first_name' => Auth::user()->name,
            'last_name' => "",
            'tx_ref' => uniqid('txn_'),
            'callback_url' => route('payment.callback'),
            'return_url' => route('payment.callback'),
            'customization' => [
                'title' => 'QuickPost',
                'description' => 'Payment for the selected plan',
            ],
        ];

        $response = Http::withToken($chapaSecretKey)->post($chapaUrl, $data);

        if ($response->successful()) {
            $transaction = new \App\Models\Transaction();
            $transaction->user_id = Auth::id();
            $transaction->plan_name = $planName;
            $transaction->amount = $planPrice;
            $transaction->currency = 'ETB';
            $transaction->transaction_ref = $data['tx_ref'];
            $transaction->status = 'pending'; // Initial status
            $transaction->save();

            $responseData = $response->json();
            return redirect($responseData['data']['checkout_url']);
        } else {
            return back()->withErrors(['error' => 'Failed to initialize payment.']);
        }
    }

    public function callback(Request $request) {
        $trx_ref = $request->input('trx_ref');
        $status = $request->input('status');

        \Illuminate\Support\Facades\DB::table('transactions')
            ->where('transaction_ref', $trx_ref)
            ->update(['status' => 'completed']);
        
        return redirect()->route('home')->with('success', 'Payment successful!');
    }
}
