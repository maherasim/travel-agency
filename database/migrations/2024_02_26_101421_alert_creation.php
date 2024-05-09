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
        Schema::create('alert_creations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('customer_name');
            $table->string('customer_email')->unique();           
            $table->string('customer_phone_number');
            $table->integer('customer_whatsapp_number')->nullable();
            $table->dateTime('scheduled_at');
            $table->dateTime('mail_sent_time')->nullable();
            $table->integer('custom_priority')->nullable();
            $table->integer('remainder_after_hours')->default(24);
            $table->boolean('is_remainder')->default(true);
            $table->enum('priority',['once','weekly','monthly','yearly','custom']);           
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
        Schema::dropIfExists('alert_creations');
    }
};
