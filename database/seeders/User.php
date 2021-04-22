<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class User extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::truncate();
        $name = ['Иван','Илья','Инна',"Ирина","Андрей","Кирилл","Мария","Анастасия","Олег","Евгений","Евгений",
            "Дарья","Данила","Юлия","Леонид"];
        $surname = ['Иванов',"Петров","Куликов","Жуков","Ган","Русских","Семёнов","Кулагин","Совесткий","Краснов","Синичкин","Решетняк"];
        $patronymic = ['Иванович','Ильич','Андреевич',"Кириллович","Александрович","Олегович","Евгеньевич","Данилович","Леонидович"];
        $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
        $email = substr(str_shuffle($permitted_chars), 0, 10);
        $citizenship = ['Российское',"Казахское","Американское","Украинское","Алжирское","Белорусское","Китайское"];
        $city = ['Томск',"Москва","Лондон","Питер","Каир","Нью-Йорк","Киев"];
        for ($i=0;$i<100;$i++){

            \App\Models\User::create([
                'name' =>$name[array_rand($name,1)],
                'surname'=>$surname[array_rand($surname,1)],
                'patronymic'=>$patronymic[array_rand($patronymic,1)],
                'email' => $email.'@gmail.com',
                'position' => $city[array_rand($city,1)],
                'role' => $citizenship[array_rand($citizenship,1)],
                'password' => rand(10000000, 99999999),
            ]);
    }
}
