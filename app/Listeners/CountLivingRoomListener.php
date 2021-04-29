<?php

namespace App\Listeners;

use App\Events\CountLivingRoomEvent;
use App\Models\Room;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CountLivingRoomListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */


    /**
     * Handle the event.
     *
     * @param  CountLivingRoomEvent  $event
     *
     * @return void
     */
    public function handle(CountLivingRoomEvent $event)
    {
        $room = Room::find($event->room_id)->number_of_living;
        if ($room >=4) return 0;
        $room++;
        Room::find($event->room_id)->update(['number_of_living' => $room]);
    }
}
