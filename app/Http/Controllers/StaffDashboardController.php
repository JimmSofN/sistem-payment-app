<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StaffDashboardController extends Controller
{
    public function index(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Anda harus login terlebih dahulu.');
        }

        $perPage = 10;
        $currentPage = $request->query('page', 1);
        $payments = Pembayaran::with('user')
            ->select('id', 'user_id', 'nama_lengkap', 'jenis_iuran', 'periode_pembayaran', 'status', 'created_at')
            ->paginate($perPage, ['*'], 'page', $currentPage)
            ->through(function ($payment) {
                return [
                    'id' => $payment->id,
                    'title' => $payment->jenis_iuran === 'spp-bulanan' 
                        ? "SPP Bulanan {$payment->periode_pembayaran}" 
                        : "SPP Lainnya {$payment->periode_pembayaran}",
                    'subtitle' => $payment->jenis_iuran === 'spp-bulanan' 
                        ? "Pembayaran SPP Bulanan untuk {$payment->periode_pembayaran}" 
                        : "Pembayaran SPP Lainnya untuk {$payment->periode_pembayaran}",
                    'status' => $payment->status,
                    'created_at' => $payment->created_at->format('d F Y'),
                    'user_name' => $payment->user->name ?? $payment->nama_lengkap,
                ];
            });

        return Inertia::render('staff-dashboard/index', [
            'payments' => $payments->items(),
            'total' => $payments->total(),
            'per_page' => $payments->perPage(),
            'current_page' => $payments->currentPage(),
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }
}