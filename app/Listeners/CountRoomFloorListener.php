<?php

namespace App\Listeners;

use App\Events\CountRoomFloorEvent;
use App\Models\Floor;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CountRoomFloorListener
{
    /**
     * Handle the event.
     *
     * @param  CountRoomFloorEvent $event
     *
     * @return void
     */

    public function handle(CountRoomFloorEvent $event)
    {
        $floor = Floor::find($event->floor)->used_room;
        if ($event->operant == 1) $floor++;
        elseif ($event->operant == 0) $floor--;
        Floor::find($event->floor)->update([
            'used_room' => $floor
        ]);
    }
}
