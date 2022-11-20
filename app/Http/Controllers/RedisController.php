<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class RedisController extends Controller
{
    public function testRedis()
    {
        Redis::set('ping','pong');
        $ping = Redis::get('ping');
        dd($ping);
    }
}
