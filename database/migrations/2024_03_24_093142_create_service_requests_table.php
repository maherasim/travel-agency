<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiceRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->string('service_type');
            $table->integer('passenger_number')->nullable();
            $table->string('passenger_name')->nullable();
            $table->string('domestic_international')->nullable();
            $table->string('oneway_roundway')->nullable();
            $table->string('from_location')->nullable();
            $table->string('to_location')->nullable();
            $table->date('departure_date')->nullable();
            $table->string('airline_name')->nullable();
            $table->decimal('price', 10, 2)->nullable();
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
        Schema::dropIfExists('service_requests');
    }
}
