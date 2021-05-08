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
    public function checkOldRoom($room_id_old){
        if ($room_id_old != 0){
            $table_old = Room::find($room_id_old);
            $room_old = $table_old->number_of_living;
            $room_old--;
            $table_old->update(['number_of_living' => $room_old]);
        }
    }

    public function handle(CountLivingRoomEvent $event)
    {
        if ($event->room_id_old == $event->room_id_new) return 0;
        $this->checkOldRoom($event->room_id_old);
        $table_new = Room::find($event->room_id_new);
        $room_new = $table_new->number_of_living;
        if ($room_new >=4) return 0;
        $room_new++;
        $table_new->update(['number_of_living' => $room_new]);
    }
}
