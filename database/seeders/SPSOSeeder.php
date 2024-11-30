<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SPSOSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('spsos')->insert([
            [ 'Name' => 'Admin 1', 'Email' => 'admin1@example.com', 'password' => '$2y$12$b/xeTx4CSUyrdjl08PDab.rFysOcAdSVpL6j8uJEGuKon5ujyRTIu' ],
            [ 'Name' => 'Operator 1', 'Email' => 'admin2@example.com', 'password' => '$2y$12$b/xeTx4CSUyrdjl08PDab.rFysOcAdSVpL6j8uJEGuKon5ujyRTIu'],
            [ 'Name' => 'Technician 1', 'Email' => 'admin3@example.com', 'password' => '$2y$12$b/xeTx4CSUyrdjl08PDab.rFysOcAdSVpL6j8uJEGuKon5ujyRTIu'],
        ]);
    }
}
