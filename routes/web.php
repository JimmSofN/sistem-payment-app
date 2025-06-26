<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\UserDashboardController;
use App\Http\Controllers\VerifikasiPembayaranController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware(['restrict.to.roles:user'])->group(function () {
        
    });
    Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('dashboard');
    Route::resource('dashboard', UserDashboardController::class)->except(['index']);;
    Route::resource('pembayaran', PembayaranController::class);
    Route::resource('history', HistoryController::class);
    
    Route::middleware(['restrict.to.roles:staff'])->group(function () {
        
        Route::resource('verifikasi-pengajuan', VerifikasiPembayaranController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';