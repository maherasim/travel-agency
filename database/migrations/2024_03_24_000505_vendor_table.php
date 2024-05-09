<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->string('trade_name');
            $table->string('address');
            $table->string('email')->unique();
            $table->string('phone_number')->unique();
            $table->string('website')->nullable();
            $table->string('tan_number')->nullable();
            $table->string('pan_number')->nullable();
            $table->string('cin_number')->nullable();
            $table->string('gstin_number')->nullable();
            $table->string('contact_person_email');
            $table->string('contact_person_phone_number');
            $table->string('vendor_type');
            $table->date('birthdate');
            $table->timestamp('email_verified_at');
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendors');
    }
};
