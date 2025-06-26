<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class CariPembayaranController extends Controller
{
    public function index()
    {
        return Inertia::render('cari-pengajuan/index');
    }
}