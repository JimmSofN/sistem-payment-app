<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Anda harus login terlebih dahulu.');
        }

        $perPage = 10;
        $currentPage = $request->query('page', 1);
        $search = $request->query('search', '');

        $query = Pembayaran::with('user')
            ->select('id', 'user_id', 'nama_lengkap', 'jenis_iuran', 'periode_pembayaran', 'status', 'created_at');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('like', "%{$search}%")
                  ->orWhereHas('user', function ($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $payments = $query->paginate($perPage, ['*'], 'page', $currentPage)
            ->through(function ($payment) {
                return [
                    'id' => $payment->id,
                    'nama_lengkap' => $payment->nama_lengkap,
                    'jenis_iuran' => $payment->jenis_iuran,
                    'periode_pembayaran' => $payment->periode_pembayaran,
                    'status' => $payment->status,
                    'created_at' => $payment->created_at->format('d F Y'),
                    'user_name' => $payment->user->name ?? $payment->nama_lengkap,
                ];
            });

        return Inertia::render('admin-dashboard/index', [
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