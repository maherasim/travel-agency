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
        Schema::create('user_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('full_name');
            $table->string('email')->unique();           
            $table->string('phone_number');
            $table->date('date_of_birth')->nullable();
            $table->string('business_type');
            $table->string('business_name');
            $table->text('business_address')->nullable();
            $table->text('business_description')->nullable();
            $table->integer('years_in_business')->nullable();
            $table->string('business_size')->nullable();        
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
        Schema::dropIfExists('user_details');
    }
};
