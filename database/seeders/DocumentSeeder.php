<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('documents')->insert([
            [ 'StudentID' => 1, 'FileName' => 'Thesis.pdf', 'FileType' => 'PDF', 'UploadedDate' => '2024-11-20'],
            [ 'StudentID' => 2, 'FileName' => 'Report.docx', 'FileType' => 'DOCX', 'UploadedDate' => '2024-11-21'],
            [ 'StudentID' => 1, 'FileName' => 'Project.pptx', 'FileType' => 'PPTX', 'UploadedDate' => '2024-11-22'],
        ]);
    }
}
