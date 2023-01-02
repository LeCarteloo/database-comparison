<?php

namespace Database\Seeders;

class Files
{
    public static function getEmployeesCsv()
    {
        return __DIR__.'\\db_employees.csv';
    }

    public static function getSalaryCsv()
    {
        return __DIR__.'\\db_salary.csv';
    }

    public static function getTitlesCsv()
    {
        return __DIR__.'\\db_titles.csv';
    }
}
