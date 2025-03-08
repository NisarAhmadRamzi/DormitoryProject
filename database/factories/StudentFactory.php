<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Stringable;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'f_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => bcrypt('password'), // or use Hash::make('password')
            'from' => $this->faker->city(),
            'dob' => $this->faker->date(),
            'id_number' => $this->faker->unique()->randomNumber(8),
            'academic_info' => $this->faker->sentence(),
            'phone' => $this->faker->numerify('##########'), // Generates a 10-digit phone number
            'registration_date' => $this->faker->date(),
            'registration_deadline' => $this->faker->date(),
            'gender' => $this->faker->randomElement(['male', 'female']),
            'room_id' => $this->faker->numberBetween(1, 13),
        ];
    }
}
