<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class PembayaranController extends Controller
{
    public function index()
    {
        return Inertia::render('pembayaran/index');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nis' => 'required|string|max:255',
            'nama_lengkap' => 'required|string|max:255',
            'ttl' => 'required|string|max:100',
            'jenis_kelamin' => 'required|in:laki-laki,perempuan',
            'kelas' => 'required|string|max:255',
            'alamat_lengkap' => 'required|string',
            'jenis_iuran' => 'required|in:spp-bulanan,spp-lainnya',
            'periode_pembayaran' => 'required|string|max:255',
            'bukti_pembayaran' => 'required|image|mimes:png,jpg,jpeg|max:10240',
        ]);

        $path = $request->file('bukti_pembayaran')->store('bukti-pembayaran', 'public');

        Pembayaran::create([
            'user_id' => Auth::id(),
            'nis' => $validated['nis'],
            'nama_lengkap' => $validated['nama_lengkap'],
            'ttl' => $validated['ttl'],
            'jenis_kelamin' => $validated['jenis_kelamin'],
            'kelas' => $validated['kelas'],
            'alamat_lengkap' => $validated['alamat_lengkap'],
            'jenis_iuran' => $validated['jenis_iuran'],
            'periode_pembayaran' => $validated['periode_pembayaran'],
            'bukti_pembayaran' => $path,
            'status' => 'Menunggu',
        ]);

        return redirect()->back()->with('success', 'Data pembayaran berhasil disimpan!');
    }
}