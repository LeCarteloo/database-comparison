<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class SalaryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fromDateStart = Carbon::now()->subYears(20);
        $fromDateEnd = Carbon::now()->subYears(10);
        $toDateStart = Carbon::now()->subYears(9);
        $toDateEnd = Carbon::now();

        return [
            'employee_id' => $this->faker->numberBetween(1, 100),
            'salary' => $this->faker->numberBetween(1500, 15000),
            'from_date' => $this->faker->dateTimeBetween($fromDateStart, $fromDateEnd, $timezone = null)->format("Y-m-d"),
            'to_date' => $this->faker->dateTimeBetween($toDateStart, $toDateEnd, $timezone = null)->format("Y-m-d"),
        ];
    }
}
