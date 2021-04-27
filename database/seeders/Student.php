<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class Student extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Student::truncate();
        $name = ['Иван','Илья','Инна',"Ирина","Андрей","Кирилл","Мария","Анастасия","Олег","Евгений","Евгений",
            "Дарья","Данила","Юлия","Леонид"];
        $surname = ['Иванов',"Петров","Куликов","Жуков","Ган","Русских","Семёнов","Кулагин","Совесткий","Краснов","Синичкин","Решетняк"];
        $patronymic = ['Иванович','Ильич','Андреевич',"Кириллович","Александрович","Олегович","Евгеньевич","Данилович","Леонидович"];
        $status_accommodation = ['Проживает',"Оформляется","Выселен"];
        $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
        $sex = ['Мужской',"Женский"];
        $citizenship = ['Российское',"Казахское","Американское","Украинское","Алжирское","Белорусское","Китайское"];
        $city = ['Томск',"Москва","Лондон","Питер","Каир","Нью-Йорк","Киев"];
    for ($i=0;$i<4;$i++){

        \App\Models\Student::create([
            'name' =>$name[array_rand($name,1)],
            'surname'=>$surname[array_rand($surname,1)],
            'patronymic'=>$patronymic[array_rand($patronymic,1)],
            'status_student'=>'Студент',
            'status_accommodation' => $status_accommodation[array_rand($status_accommodation,1)],
            'email' => rand(10000000, 99999999).'@gmail.com',
            'phone_number' => '89'.rand(10000000, 99999999),
            'group' => '222',
            'sex' => $sex[array_rand($sex,1)],
            'number_contract'=> rand(10000000, 99999999),
            'date_of_conclusion' => '2000-12-12',
            'date_of_ended_registration' => '2000-12-12',
            'citizenship' => $citizenship[array_rand($citizenship,1)],
            'birthday'=>'2000-12-12',
            'place_of_birth'=>$city[array_rand($city,1)],
            'number_passport' => rand(1,100000000),
            'info_passport' => 'nothing',
            'registration' => $city[array_rand($city,1)],
            'note' => '!!!',
            'room_id' => '123'
        ]);
    }
    }
}
