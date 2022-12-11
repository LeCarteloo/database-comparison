<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class MongoSalary extends Model
{
    use HasFactory;

    public $timestamps = false;
    public $table = 'salaries';
}
