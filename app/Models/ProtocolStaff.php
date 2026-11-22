<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProtocolStaff extends Model
{
    protected $table = 'protocol_staff';

    protected $fillable = [
        'name',
        'phone',
        'email',
        'position',
        'status',
    ];
}
