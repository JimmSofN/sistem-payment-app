<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pembayarans', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nis');
            $table->string('nama_lengkap');
            $table->string('ttl');
            $table->string('jenis_kelamin'); 
            $table->string('kelas');
            $table->text('alamat_lengkap');
            $table->string('jenis_iuran'); 
            $table->string('periode_pembayaran');
            $table->string('bukti_pembayaran')->nullable();
            $table->string('status')->default('menunggu');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayarans');
    }
};