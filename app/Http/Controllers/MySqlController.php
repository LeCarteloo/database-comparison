<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MySqlController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //DB::connection('mysql')->select('select * from users where active = ?', [1]);

        $results = DB::connection('mysql')->select(
                'SELECT * 
                FROM employees e, salaries s
                WHERE e.id = 1
                AND e.id = s.employee_id
            ');

        return view('testmysql', [
            'results' => $results,
        ]);
    }
}
