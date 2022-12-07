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
        if($mysql)
        {
            $mysqlStatus = "Połączono z MySql";
        } else 
        {
            $mysqlStatus = "Nie udało się połączyć z MySql";
        }

        $pgsql = DB::connection('pgsql')->getPdo();

        if($pgsql)
        {
            $pgsqlStatus = "Połączono z pgsql";
        } else 
        {
            $pgsqlStatus = "Nie udało się połączyć z pgsql";
        }

        $clickhouse = DB::connection('clickhouse')->getPdo();

        if($clickhouse)
        {
            $clickhouseStatus = "Połączono z clickhouse";
        } else 
        {
            $clickhouseStatus = "Nie udało się połączyć z clickhouse";
        }

        return view('test', [
            'mysql' => $mysqlStatus,
            'pgsql' => $pgsqlStatus,
            'clickhouse' => $clickhouseStatus,
        ]);
    }
}
