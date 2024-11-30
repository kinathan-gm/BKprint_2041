<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrinterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('printers')->insert([
            [ 'Brand' => 'HP', 'Model' => 'LaserJet Pro M404dn', 'Description' => 'High-speed monochrome printer', 'CampusName' => 'Campus A', 'BuildingName' => 'Building 1', 'RoomNumber' => '101'],
            [ 'Brand' => 'Canon', 'Model' => 'PIXMA G2020', 'Description' => 'Color inkjet printer with refillable ink tanks', 'CampusName' => 'Campus B', 'BuildingName' => 'Building 2', 'RoomNumber' => '202'],
            [ 'Brand' => 'Epson', 'Model' => 'EcoTank L3210', 'Description' => 'Compact all-in-one printer', 'CampusName' => 'Campus A', 'BuildingName' => 'Building 3', 'RoomNumber' => '303'],
        ]);
    }
}
