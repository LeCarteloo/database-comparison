<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class CommandsControler extends Controller
{
    /**
     *  Utworzenie tabel
     */
    public function migrateCommand()
    {
        try 
        {
            Artisan::call('migrate');
        } 
        catch (\Throwable $th) 
        {
            return response()->json([
                'message' => 'Błąd.',
            ]);
        }

        return response()->json([
            'message' => 'Dodano dane',
        ]);
    }

    /**
     *  Utworzenie tabel i/lub dodanie danych do nich z seedera 
     */
    public function migrateSeedCommand()
    {
        try 
        {
            Artisan::call('migrate --seed');
        } 
        catch (\Throwable $th) 
        {
            return response()->json([
                'message' => 'Błąd',
            ]);
        }

        return response()->json([
            'message' => 'Dodano dane',
        ]);
    }

    /**
     *  Usunięcie danych z tabel
     */
    public function migrateRollbackCommand()
    {
        try 
        {
            Artisan::call('migrate:rollback');
        } 
        catch (\Throwable $th) 
        {
            return response()->json([
                'message' => 'Błąd',
            ]);
        }

        return response()->json([
            'message' => 'Dodano dane',
        ]);
    }
}
