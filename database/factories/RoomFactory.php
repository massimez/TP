<?php

namespace Database\Factories;

use App\Events\CountLivingRoomEvent;
use App\Events\CountRoomFloorEvent;
use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Room::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $floor = rand(1,10);
        event(new CountRoomFloorEvent($floor));
        return [
            'room_id' => $this->faker->unique()->numberBetween(10,39),
            'status' => 'Мужская',
            'max_living' => 4,
            'floor' => $floor
        ];
    }
}
