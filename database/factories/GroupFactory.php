<?php

namespace Database\Factories;

use App\Models\Group;
use Illuminate\Database\Eloquent\Factories\Factory;

class GroupFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Group::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'group_name'=>$this->faker->unique()->numberBetween(1,5),
            'faculty'=>'ФВС',
            'course_of_study'=>$this->faker->numberBetween(1,4),
            'form_of_education'=>'Очная',
            'specialty' => 'бакалавриат'
        ];
    }
}
