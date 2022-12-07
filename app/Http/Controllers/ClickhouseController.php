<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClickhouseController extends Controller
{
    /**
     *
     */
    public function index()
    {
        //DB::connection('clickhouse')->select('select * from users where active = ?', [1]);
        
        $results = DB::connection('clickhouse')->select('
 
        ');

        return view('xxx', [
            'xx' => $results,
        ]);
    }
}
