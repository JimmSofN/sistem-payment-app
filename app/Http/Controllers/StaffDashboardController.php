<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class StaffDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('staff-dashboard/index');
    }
}