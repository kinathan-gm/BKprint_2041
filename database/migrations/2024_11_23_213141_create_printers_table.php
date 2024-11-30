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
        Schema::create('printers', function (Blueprint $table) {
            $table->id('PrinterID');
            $table->string('Brand', 50);
            $table->string('Model', 50);
            $table->text('Description')->nullable();
            $table->string('CampusName', 50);
            $table->string('BuildingName', 50);
            $table->string('RoomNumber', 10);
            $table->enum('PrinterStatus', ['Active', 'Inactive'])->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('printers');
    }
};
