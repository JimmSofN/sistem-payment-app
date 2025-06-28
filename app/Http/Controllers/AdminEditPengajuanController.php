<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

class AdminEditPengajuanController extends Controller
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
            ->select('id', 'user_id', 'nis', 'nama_lengkap', 'kelas', 'status');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nis', 'like', "%{$search}%")
                  ->orWhere('nama_lengkap', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $payments = $query->paginate($perPage, ['*'], 'page', $currentPage)
            ->through(function ($payment) {
                return [
                    'id' => $payment->id,
                    'nis' => $payment->nis,
                    'nama' => $payment->nama_lengkap,
                    'kelas' => $payment->kelas,
                    'status' => $payment->status,
                    'user_name' => $payment->user->name ?? $payment->nama_lengkap,
                ];
            });

        return Inertia::render('admin-edit-pengajuan/index', [
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

    public function edit($id)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Anda harus login terlebih dahulu.');
        }

        $payment = Pembayaran::with('user')->findOrFail($id);

        $imageUrl = $payment->bukti_pembayaran 
            ? Storage::url($payment->bukti_pembayaran)
            : null;

        return Inertia::render('admin-edit-pengajuan/edit', [
            'payment' => [
                'id' => $payment->id,
                'nis' => $payment->nis,
                'nama_lengkap' => $payment->nama_lengkap,
                'ttl' => $payment->ttl,
                'jenis_kelamin' => $payment->jenis_kelamin,
                'kelas' => $payment->kelas,
                'alamat_lengkap' => $payment->alamat_lengkap,
                'jenis_iuran' => $payment->jenis_iuran,
                'periode_pembayaran' => $payment->periode_pembayaran,
                'bukti_pembayaran' => $imageUrl,
                'status' => $payment->status,
                'user_name' => $payment->user->name ?? $payment->nama_lengkap,
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function update(Request $request, $id)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Anda harus login terlebih dahulu.');
        }

        $payment = Pembayaran::findOrFail($id);

        $request->validate([
            'status' => 'required|in:Menunggu,Berhasil',
        ]);

        $payment->update([
            'status' => $request->status,
        ]);

        return Redirect::route('admin-edit-pengajuan.index')->with('success', 'Status pembayaran berhasil diperbarui.');
    }

    public function destroy($id)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Anda harus login terlebih dahulu.');
        }

        $payment = Pembayaran::findOrFail($id);

        // Delete associated image if it exists
        if ($payment->bukti_pembayaran && Storage::exists('public/' . $payment->bukti_pembayaran)) {
            Storage::delete('public/' . $payment->bukti_pembayaran);
        }

        $payment->delete();

        return Redirect::route('admin-edit-pengajuan.index')->with('success', 'Pembayaran berhasil dihapus.');
    }
}