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
        Schema::table('quotations', function (Blueprint $table) {
            $table->string('gate')->nullable();
            $table->integer('pnr_number')->nullable();
            $table->string('seat_number')->nullable();
            $table->string('class')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quotations', function (Blueprint $table) {
            $table->dropColumn('gate');
            $table->dropColumn('pnr_number');
            $table->dropColumn('seat_number');
            $table->dropColumn('class');
        });
    }
};
