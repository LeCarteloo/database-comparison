<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysql')->create('employees', function (Blueprint $table) {
            $table->id();
            $table->date('birth_date');
            $table->string('first_name');
            $table->string('last_name');
            $table->enum('gender', ['M', 'F']);
            $table->date('hire_date');
        });

        Schema::connection('pgsql')->create('employees', function (Blueprint $table) {
            $table->id();
            $table->date('birth_date');
            $table->string('first_name');
            $table->string('last_name');
            $table->enum('gender', ['M', 'F']);
            $table->date('hire_date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysql')->dropIfExists('employees');
        Schema::connection('pgsql')->dropIfExists('employees');
    }
}
