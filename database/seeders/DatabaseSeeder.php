<?php

namespace Database\Seeders;

// Mongo models
use App\Models\MongoEmployee;
use App\Models\MongoSalary;
use App\Models\MongoTitle;


use App\Models\Employee;
use App\Models\Salary;
use App\Models\Title;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Opening CSV file, add trycathc
        $csv = array_map('str_getcsv', file(Files::getEmployeesCsv()));
        array_walk($csv, function(&$a) use ($csv) {
            $a = array_combine($csv[0], $a);
        });
        array_shift($csv); 



        //Nazwy baz (mysql, pgsql itd.) są brane z pliku config/database.php > connections

        //Komenda do migracji tabel wraz z danymi dla mysql
        //php artisan migrate --database="mysql" --seed

        //MySql seed
        // $employee = Employee::factory()->connection('mysql')->count(100)->create();
        // $salary = Salary::factory()->connection('mysql')->count(1000)->create();
        // $title = Title::factory()->connection('mysql')->count(1000)->create();

        //Komenda do migracji tabel wraz z danymi dla pgsql
        //php artisan migrate --database="mysql" --seed

        //Pgsql seed
        // $employee = Employee::factory()->connection('pgsql')->count(100)->create();
        // $salary = Salary::factory()->connection('pgsql')->count(1000)->create();
        // $title = Title::factory()->connection('pgsql')->count(1000)->create();

        
        
        //Mongodb seed
        // $test = [];
        
        // for ($i=0; $i < 5000; $i++) { 
        //     $employee = MongoEmployee::factory()->create();
        //     array_push($test, [
        //         'birth_date'   => $employee->birth_date,
        //         'first_name'    => $employee->first_name,
        //         'last_name'    => $employee->last_name, 
        //         'gender'    => $employee->gender, 
        //         'hire_date'    => $employee->hire_date, 
        //     ]);
        // }

        $mongoEmployee = new MongoEmployee;
        $mongoEmployee->insert($csv);
        // $mongoTitle = new MongoTitle;
        // $mongoSalary = new MongoSalary;



        // echo "Seeding employees";
        // $user = MongoEmployee::getConnection('mongodb')->create(array(
        //     'title'   => 'First post',
        //     'slug'    => 'first-post',
        //     'body'    => 'Lorem ipsum',
        //     )); 
        //     echo $user;

        // $employee = MongoEmployee::connection('pgsql')->count(100)->create();
        // $salary = Salary::factory()->connection('pgsql')->count(1000)->create();
        // $title = Title::factory()->connection('pgsql')->count(1000)->create();

        // $employee = Employee::factory(100)->create();

        // $salary = Salary::factory(1000)->create();

        // $title = Title::factory(1000)->create();

        // for($i = 1; $i<100; $i++)
        // {
        //     $employee = Employee::factory()->create();

        //     $salary = Salary::factory(30)->create([
        //         'employee_id' => $employee->id,
        //     ]);
    
        //     $title = Title::factory(5)->create([
        //         'employee_id' => $employee->id,
        //     ]);
        // }

    }
}
