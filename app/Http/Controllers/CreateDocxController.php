<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Http\Request;
use PHPStamp\Document\WordDocument;
use PHPStamp\Templator;


class CreateDocxController extends Controller
{
    private $fullname;
    private $number;


    public function getDocument($id)
    {
        $response = $this->getAttributes($id);
        $cachePath = storage_path('../DocumentTemplate');
        $templator = new Templator($cachePath); // опционально можно задать свой формат скобочек
        // Для того чтобы каждый раз шаблон генерировался заново:
        // $templator->debug = true;

        $documentPath = storage_path('../DocumentTemplate/template.docx');
        $document = new WordDocument($documentPath);
        $values = array(
            'fio' => $response['full_name'],
            'short_full_name'=>$response['short_full_name'],
            'faculty'=>$response['faculty'],
            'group'=>$response['group'],
            'date'=>$response['date'],
            'date_and_place_born'=>$response['date_and_place_born'],
            'passport_number'=>$response['passport_number'],
            'passport_info'=>$response['passport_info'],
            'communication'=>$response['communication'],
            'year'=>$response['year'],
            'numcontract'=>$response['number_contract'],
            'pay'=>$response['student_payment'],
        );
        $result = $templator->render($document, $values);
        $result->download();
    }


    private function getAttributes($id){
        $student = Student::find($id);
        $name = $student->name;
        $surname = $student->surname;
        $patronymic = $student->patronymic;
        $full_name = $surname.' '.$name.' '.$patronymic;
        $short_full_name = substr($name,0,1).'.'.substr($patronymic,0,1).'. '.$surname;
        $group_table = $student->groupTable();
        $faculty = $group_table->get('faculty')[0]['faculty'];
        $group = $group_table->get('group_name')[0]['group_name'];
        $date = '01 '.Carbon::now()->format('F Y').' г.';
        $date_and_place_born = $student->birthday.', '.$student->place_of_birth;
        $passport_number = $student->number_passport;
        $passport_info = $student->info_passport;
        $number_contract = $student->student_id;
        $year = Carbon::now()->format('y');
        $student_payment = ucfirst(mb_substr($student->student_payment,0,1));
        $info_student_for_document = [
            'full_name' => $full_name,
            'short_full_name'=>$short_full_name,
            'faculty'=>$faculty,
            'group'=>$group,
            'date'=>$date,
            'date_and_place_born'=>$date_and_place_born,
            'passport_number'=>$passport_number,
            'passport_info'=>$passport_info,
            'communication'=>5,
            'number_contract'=>$number_contract,
            'year'=>$year,
            'student_payment'=>$student_payment,

        ];
        $student->update([
            'number_contract'=>'5'.'-'.$number_contract.'-'.$year.'-'.$student_payment,
            'date_of_conclusion'=>Carbon::now()->format('Y-m').'-01',
        ]);
        return $info_student_for_document;
    }

}
