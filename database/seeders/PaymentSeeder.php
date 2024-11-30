<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('payments')->insert([
            [ 'StudentID' => 1, 'Amount' => 50.00, 'Date' => '2024-11-21', 'PaymentMethod' => 'Credit Card'],
            [ 'StudentID' => 2, 'Amount' => 30.00, 'Date' => '2024-11-22', 'PaymentMethod' => 'Cash'],
            [ 'StudentID' => 3, 'Amount' => 70.00, 'Date' => '2024-11-22', 'PaymentMethod' => 'Bank Transfer'],
        ]);
    }
}
