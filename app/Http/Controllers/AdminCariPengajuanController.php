<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminCariPengajuanController extends Controller
{
    public function index()
    {
        return Inertia::render('admin-cari-pengajuan/index');
    }
}