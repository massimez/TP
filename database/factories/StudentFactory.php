<?php

namespace Database\Factories;

use App\Events\CountLivingRoomEvent;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;
use mysql_xdevapi\Exception;

class StudentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Student::class;


    public function definition()
    {
        $room_id['room_id'] = $this->faker->numberBetween(100, 119);
        event(new CountLivingRoomEvent($room_id));
        $data = [
            'name'                       => $this->faker->firstName($gender = 'male' | 'female'),
            'surname'                    => $this->faker->lastName,
            'patronymic'                 => $this->faker->firstName($gender = 'male' | 'female'),
            'status_student'             => 'Студент',
            'status_accommodation'       => 'Проживает',
            'email'                      => $this->faker->unique()->email,
            'phone_number'               => '89'.$this->faker->unique()->numberBetween(10000000, 99999999),
            'group'                      => $this->faker->numberBetween(1, 10),
            'sex'                        => ['Мужской', "Женский"][array_rand(['Мужской', "Женский"], 1)],
            'number_contract'            => $this->faker->unique()->numberBetween(100000000, 999999999),
            'date_of_conclusion'         => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'date_of_ended_registration' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'citizenship'                => $this->faker->state,
            'birthday'                   => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'place_of_birth'             => $this->faker->state,
            'number_passport'            => $this->faker->unique()->numberBetween(100000000, 999999999),
            'info_passport'              => 'nothing',
            'registration'               => $this->faker->state,
            'note'                       => '!!!',
            'room_id'                    => $room_id['room_id'],
            'student_payment' => ['Бюджет', "Платник"][array_rand(['Бюджет', "Платник"], 1)]
        ];
        return $data;
    }
}
