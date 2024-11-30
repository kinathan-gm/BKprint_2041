<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrintJobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('print_jobs')->insert([
            [ 'DocumentID' => 1, 'PrinterID' => 1, 'StartTime' => '2024-11-22 10:00:00', 'EndTime' => '2024-11-22 10:05:00', 'PaperSize' => 'A4', 'PagesPrinted' => 10, 'Copies' => 1, 'IsDoubleSided' => true],
            [ 'DocumentID' => 2, 'PrinterID' => 2, 'StartTime' => '2024-11-22 11:00:00', 'EndTime' => '2024-11-22 11:10:00', 'PaperSize' => 'A4', 'PagesPrinted' => 15, 'Copies' => 2, 'IsDoubleSided' => false],
            [ 'DocumentID' => 3, 'PrinterID' => 1, 'StartTime' => '2024-11-22 12:00:00', 'EndTime' => '2024-11-22 12:07:00', 'PaperSize' => 'A3', 'PagesPrinted' => 5, 'Copies' => 1, 'IsDoubleSided' => true],
        ]);
    }
}
