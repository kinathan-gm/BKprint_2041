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
        Schema::create('print_jobs', function (Blueprint $table) {
            $table->id('PrintJobID');
            $table->unsignedBigInteger('DocumentID');
            $table->unsignedBigInteger('PrinterID');
            $table->dateTime('StartTime');
            $table->dateTime('EndTime')->nullable();
            $table->string('PaperSize', 10);
            $table->integer('PagesPrinted');
            $table->integer('Copies');
            $table->boolean('IsDoubleSided');
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('DocumentID')->references('DocumentID')->on('documents')->onDelete('cascade');
            $table->foreign('PrinterID')->references('PrinterID')->on('printers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('print_jobs');
    }
};
