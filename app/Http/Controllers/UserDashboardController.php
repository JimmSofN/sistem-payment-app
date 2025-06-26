<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserDashboardController extends Controller
{
    public function index()
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Anda harus login terlebih dahulu.');
        }

        $user = Auth::user();
        $payments = Pembayaran::where('user_id', $user->id)
            ->select('id', 'nama_lengkap', 'jenis_iuran', 'periode_pembayaran', 'status', 'created_at')
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'title' => $payment->jenis_iuran === 'spp-bulanan' 
                        ? "SPP Bulanan {$payment->periode_pembayaran}" 
                        : "SPP Lainnya {$payment->periode_pembayaran}",
                    'subtitle' => $payment->jenis_iuran === 'spp-bulanan' 
                        ? "Pembayaran SPP Bulanan untuk {$payment->periode_pembayaran}" 
                        : "Pembayaran SPP Lainnya untuk {$payment->periode_pembayaran}",
                    'status' => $payment->status === 'approved' ? 'complete' : 'pending',
                    'created_at' => $payment->created_at->format('d F Y'),
                ];
            });

        return Inertia::render('dashboard', [
            'payments' => $payments,
            'user_name' => $user->name ?? 'Pengguna',
        ]);
    }
}