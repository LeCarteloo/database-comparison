<?php

namespace Database\Seeders;

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
        $employee = Employee::factory(100)->create();

        $salary = Salary::factory(1000)->create();

        $title = Title::factory(1000)->create();

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
