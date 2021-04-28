<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Student::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' =>$this->faker->firstName($gender = 'male'|'female'),
            'surname'=>$this->faker->lastName,
            'patronymic'=>$this->faker->firstName($gender = 'male'|'female'),
            'status_student'=>'Студент',
            'status_accommodation' => 'Проживает',
            'email' => $this->faker->unique()->email,
            'phone_number' => '89'.$this->faker->unique()->numberBetween(10000000, 99999999),
            'group' => $this->faker->numberBetween(100,110),
            'sex' => ['Мужской',"Женский"][array_rand(['Мужской',"Женский"],1)],
            'number_contract'=> $this->faker->unique()->numberBetween(100000000,999999999),
            'date_of_conclusion' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'date_of_ended_registration' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'citizenship' => $this->faker->state,
            'birthday'=>$this->faker->date($format = 'Y-m-d', $max = 'now'),
            'place_of_birth'=>$this->faker->state,
            'number_passport' => $this->faker->unique()->numberBetween(100000000,999999999),
            'info_passport' => 'nothing',
            'registration' => $this->faker->state,
            'note' => '!!!',
            'room_id' => $this->faker->numberBetween(100,111)
        ];
    }
}
