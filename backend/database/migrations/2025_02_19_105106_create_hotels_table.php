<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address');
            $table->decimal('cost_per_night', 10, 2);
            $table->integer('available_rooms');
            $table->string('image')->nullable();
            $table->decimal('average_rating', 2, 1)->default(0);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('hotels');
    }
};
