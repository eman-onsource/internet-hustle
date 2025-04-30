<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubscriptionResource;
use App\Models\Subscription;

class SubscriptionsController extends Controller
{
    public function index ()
    {
        $subscriptions = Subscription::with(['user', 'plan'])->get();
        return SubscriptionResource::collection($subscriptions);
    }
}
