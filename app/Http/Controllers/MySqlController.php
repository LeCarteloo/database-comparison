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

        // $results = DB::connection('mysql')->select(
        //         'SELECT * 
        //         FROM employees e, salaries s, titles t
        //         WHERE e.id = t.employee_id
        //         AND e.id = s.employee_id
        //     ');


        //Ile wypłat dostał pracownik i jaką największą
        $results = DB::connection('mysql')->select(' 
            SELECT first_name, last_name, X.*
            FROM employees E, (
            SELECT employee_id, COUNT(*) as salaries, MAX(salary) as max_salary
            FROM salaries
            GROUP BY employee_id) X
            WHERE E.id = X.employee_id
        ');

        //Pierwszy tytuł
        $results = DB::connection('mysql')->select(' 
            SELECT first_name, last_name, X.*, Y.*
            FROM employees E, (
            SELECT employee_id, COUNT(*) as salaries, MAX(salary) as max_salary
            FROM salaries
            GROUP BY employee_id) X, (
            SELECT employee_id, title
            FROM titles
            ORDER BY employee_id DESC) Y
            WHERE E.id = X.employee_id
            AND E.id = Y.employee_id
        ');
     
        dd($results);        
        return view('testmysql', [
            'results' => $results,
        ]);
    }
}
