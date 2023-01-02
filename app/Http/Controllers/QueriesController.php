<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QueriesController extends Controller
{
    /**
     * Zapytanie coś tam.         //Pierwszy tytuł
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function queryOne(Request $request)
    {   
        //Zapytanie MySQL
        $mysqlStartTime = microtime(true);
        $mysqlStartMemory = memory_get_usage();

        $mysqlResults = DB::connection('mysql')->select(' 
            SELECT first_name, last_name, X.*, Y.*
            FROM employees E, (
            SELECT employee_id, COUNT(*) as salaries, MAX(salary) as max_salary
            FROM salaries
            GROUP BY employee_id) X, (
            SELECT employee_id, title
            FROM titles
            ORDER BY "DESC") Y
            WHERE E.id = X.employee_id
            AND E.id = Y.employee_id
        ');

        $mysqlEndTime = microtime(true) - $mysqlStartTime;
        $mysqlEndMemory =  memory_get_usage() - $mysqlStartMemory;

        ////////////////////////////////////////////////////
        

        //Zapytanie PgSql
        $pgsqlStartTime = microtime(true);
        $pgsqlStartMemory = memory_get_usage();

        //Zapytanie tutaj

        ////////

        $pgsqlEndTime = microtime(true) - $pgsqlStartTime;
        $pgsqlEndMemory =  memory_get_usage() - $pgsqlStartMemory;

        ////////////////////////////////////////////////////
        

        //Zapytanie ClickHouse
        $clickHouseStartTime = microtime(true);
        $clickHouseStartMemory = memory_get_usage();

        //Zapytanie tutaj

        ////////

        $clickHouseEndTime = microtime(true) - $clickHouseStartTime;
        $clickHouseEndMemory =  memory_get_usage() - $clickHouseStartMemory;

        ////////////////////////////////////////////////////


        //Zapytanie MongoDb
        $mongoDbStartTime = microtime(true);
        $mongoDbStartMemory = memory_get_usage();

        //Zapytanie tutaj

        ////////

        $mongoDbEndTime = microtime(true) - $mongoDbStartTime;
        $mongoDbEndMemory =  memory_get_usage() - $mongoDbStartMemory;

        ////////////////////////////////////////////////////

        return response()->json([
            'mysql' => [
                'time' => round($mysqlEndTime * 1000 -1.1, 2), //ms
                'memory' => round($mysqlEndMemory / 1000000, 2), //MB
            ],
            'pgsql' => [
                'time' => round($pgsqlEndTime * 1000 -1.1, 2),
                'memory' => round($pgsqlEndMemory / 1000000, 2),
            ],
            'clickhouse' => [
                'time' => round($clickHouseEndTime * 1000 -1.1, 2),
                'memory' => round($clickHouseEndMemory / 1000000, 2),
            ],
            'mongodb' => [
                'time' => round($mongoDbEndTime * 1000 -1.1, 2),
                'memory' => round($mongoDbEndMemory / 1000000, 2),
            ],
            // 'xxxx' => [
            //     'time' => round($mysqlEndTime * 1000 -1.1, 2),
            //     'memory' => round($mysqlEndMemory / 1000000, 2),
            // ],
        ]);
    }
}
