<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HistoryController extends Controller
{
    public function index()
    {
         $payments = pembayaran::where('user_id', Auth::id())
            ->get()
            ->map(function ($payment) {
                return [
                    'nama_lengkap' => $payment->nama_lengkap,
                    'kelas' => $payment->kelas,
                    'jenis_iuran' => $payment->jenis_iuran,
                    'periode_pembayaran' => $payment->periode_pembayaran,
                    'status' => $payment->status,
                ];
            });

        return Inertia::render('history/index', [
            'payments' => $payments,
        ]);
    }
}