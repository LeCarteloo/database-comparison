<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TestDatabasesController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mysql = DB::connection('mysql')->getPdo();

        if($pgsql)
        {
            echo "Connected successfully to MySql database ";
        } else {
            echo "You are not connected to MySql database";
        }



        return view('test');
    }
}
