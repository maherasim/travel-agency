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
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();          
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->string('airline_name')->nullable();
            $table->string('flight_number')->nullable();         
            $table->datetime('departure_time')->nullable();
            $table->datetime('arrival_time')->nullable();
            $table->string('fare_type')->nullable();
            $table->string('ourcost')->nullable();
            $table->string('prf')->nullable();
            $table->string('total_cost')->nullable();         
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotations');
    }
};
