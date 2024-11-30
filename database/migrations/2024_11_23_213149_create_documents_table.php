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
        Schema::create('documents', function (Blueprint $table) {
            $table->id('DocumentID');
            $table->unsignedBigInteger('StudentID');
            $table->string('FileName', 100);
            $table->string('FileType', 50);
            $table->date('UploadedDate');
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('StudentID')->references('StudentID')->on('students')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
