<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class pembayaran extends Model
{
     protected $fillable = [
        'user_id',
        'nis',
        'nama_lengkap',
        'ttl',
        'jenis_kelamin',
        'kelas',
        'alamat_lengkap',
        'jenis_iuran',
        'periode_pembayaran',
        'bukti_pembayaran',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}