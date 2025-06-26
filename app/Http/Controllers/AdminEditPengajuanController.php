<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminEditPengajuanController extends Controller
{
    public function index()
    {
        return Inertia::render('admin-edit-pengajuan/index');
    }
}