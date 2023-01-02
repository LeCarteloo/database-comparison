<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class MongoEmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'birth_date' => $this->faker->dateTimeBetween(Carbon::now()->subYears(70), Carbon::now()->subYears(35), $timezone = null)->format("Y-m-d"),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'gender' => $this->faker->randomElement(['M', 'F']),
            'hire_date' => $this->faker->dateTimeBetween(Carbon::now()->subYears(35), Carbon::now(), $timezone = null)->format("Y-m-d"),
        ];
    }
}
