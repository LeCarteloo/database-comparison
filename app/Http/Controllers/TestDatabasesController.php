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
        $pgsql = DB::connection('pgsql')->getPdo();
        $clickhouse = DB::connection('clickhouse')->getPdo();
        $mongodb = DB::connection('mongodb')->getPdo();

        $mysqlStatus = $mysql ? true : false;
        $pgsqlStatus = $pgsql ? true : false;
        $clickhouseStatus = $clickhouse ? true : false;
        $mongodbStatus = $mongodb ? true : false;
        
        return response()->json([
            'data' => [
                'mysql' => $mysqlStatus,
                'pgsql' => $pgsqlStatus,
                'clickhouse' => $clickhouseStatus,
                'mongodb' => $mongodbStatus,
            ],
        ]);
    }
}
