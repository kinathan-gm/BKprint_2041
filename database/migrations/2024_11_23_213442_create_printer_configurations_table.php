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
        Schema::create('printer_configurations', function (Blueprint $table) {
            $table->id('ConfigID');
            $table->unsignedBigInteger('SPSOID');
            $table->unsignedBigInteger('PrinterID');
            $table->integer('DefaultPages');
            $table->text('AllowedFileTypes');
            $table->date('ConfigDate');
            $table->string('ConfigPrinterStatus', 50);
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('SPSOID')->references('SPSOID')->on('spsos')->onDelete('cascade');
            $table->foreign('PrinterID')->references('PrinterID')->on('printers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('printer_configurations');
    }
};
