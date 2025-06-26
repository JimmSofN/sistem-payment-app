<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\UserDashboardController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\CariPembayaranController;
use App\Http\Controllers\StaffDashboardController;
use App\Http\Controllers\AdminCariPengajuanController;
use App\Http\Controllers\AdminEditPengajuanController;
use App\Http\Controllers\VerifikasiPembayaranController;

Route::get('/', function () {
    if (auth()->check()) {
        if (auth()->user()->hasRole('staff')) {
            return redirect()->route('staff-dashboard.index');
        }
        if (auth()->user()->hasRole('admin')) {
            return redirect()->route('admin-dashboard.index');
        }
        return redirect()->route('dashboard');
    }
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // User routes
    Route::middleware('restrict.to.roles:user')->group(function () {
        Route::get('/dashboard', [UserDashboardController::class, 'index'])->middleware('redirect.based.on.role')->name('dashboard');
        Route::resource('dashboard', UserDashboardController::class)->except(['index']);
        Route::resource('pembayaran', PembayaranController::class);
        Route::resource('history', HistoryController::class);
    });

    // Staff routes
    Route::middleware('restrict.to.roles:staff')->group(function () {
        Route::get('/staff-dashboard', [StaffDashboardController::class, 'index'])->name('staff-dashboard.index');
        Route::resource('staff-dashboard', StaffDashboardController::class)->except(['index']);
        Route::resource('verifikasi-pengajuan', VerifikasiPembayaranController::class);
        Route::resource('cari-pengajuan', CariPembayaranController::class);
    });

    // Admin routes
    Route::middleware('restrict.to.roles:admin')->group(function () {
        Route::get('/admin-dashboard', [AdminDashboardController::class, 'index'])->name('admin-dashboard.index');
        Route::resource('admin-dashboard', AdminDashboardController::class)->except(['index']);
        Route::resource('admin-edit-pengajuan', AdminEditPengajuanController::class);
        Route::resource('admin-cari-pengajuan', AdminCariPengajuanController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';