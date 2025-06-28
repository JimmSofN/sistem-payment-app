<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminCariPengajuanController extends Controller
{
    public function index(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Anda harus login terlebih dahulu.');
        }

        $perPage = 10;
        $currentPage = $request->query('page', 1);
        $search = $request->query('search', '');

        $query = pembayaran::with('user')
            ->select('id', 'user_id', 'nis', 'nama_lengkap', 'jenis_iuran', 'periode_pembayaran', 'status');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nis', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  })
                  ->orWhere('jenis_iuran', 'like', "%{$search}%")
                  ->orWhere('periode_pembayaran', 'like', "%{$search}%");
            });
        }

        $payments = $query->paginate($perPage, ['*'], 'page', $currentPage)
            ->through(function ($payment) {
                return [
                    'id' => $payment->id,
                    'nis' => $payment->nis,
                    'nama_lengkap' => $payment->nama_lengkap,
                    'jenis_iuran' => $payment->jenis_iuran,
                    'periode_pembayaran' => $payment->periode_pembayaran,
                    'status' => $payment->status,
                    'user_name' => $payment->user->name ?? $payment->nama_lengkap,
                ];
            });

        return Inertia::render('admin-cari-pengajuan/index', [
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