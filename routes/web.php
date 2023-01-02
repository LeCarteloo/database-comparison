<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', [App\Http\Controllers\TestDatabasesController::class, 'index']);
Route::get('/mysql', [App\Http\Controllers\MySqlController::class, 'index']);
Route::get('/pgsql', [App\Http\Controllers\PgSqlController::class, 'index']);


//api
Route::get('/test', [App\Http\Controllers\TestDatabasesController::class, 'index']);

Route::get('/query/one', [App\Http\Controllers\QueriesController::class, 'queryOne']);

Route::get('/command/migrate', [App\Http\Controllers\CommandsControler::class, 'migrateCommand']);
Route::get('/command/migrate/seed', [App\Http\Controllers\CommandsControler::class, 'migrateSeedCommand']);
Route::get('/command/migrate/rollback', [App\Http\Controllers\CommandsControler::class, 'migrateRollbackCommand']);