<?php

namespace App\Providers;

use App\Events\CountLivingRoomEvent;
use App\Events\CountRoomFloorEvent;
use App\Listeners\CountLivingRoomListener;
use App\Listeners\CountRoomFloorListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
       CountLivingRoomEvent::class => [
            CountLivingRoomListener::class,
        ]];


    public function boot()
    {
        Event::listen(
            CountRoomFloorEvent::class,
            [CountRoomFloorListener::class,'handle']
        );
    }
}
