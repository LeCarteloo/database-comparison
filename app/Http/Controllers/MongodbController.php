<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MongodbController extends Controller
{
    /**
     *
     */
    public function index()
    {
        //DB::connection('mongodb')->select('select * from users where active = ?', [1]);
        
        $results = DB::connection('mongodb')->select('
 
        ');

        return view('xxx', [
            'xx' => $results,
        ]);
    }
}
