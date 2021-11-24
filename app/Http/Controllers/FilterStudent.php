<?php


namespace App\Http\Controllers;


use App\Models\Student;

class FilterStudent
{
    private $request;
    private $response;

    public function __construct($request)
    {
        $this->request = $request->input();
        $this->response = Student::select();
    }

    public function apply()
    {
        foreach ($this->request as $filter_name => $value) {
            $this->filter($filter_name, $value);
        }
        return $this->response;
    }

    public function filter($filer, $value)
    {
        if ($filer == 'filter') {
            foreach ($value as $where_filter) {
                $this->response->whereHas('groupTable', function ($query) use ($where_filter){
                    $query->where($where_filter[0], '=', $where_filter[1]);
                });
            }
        }
        if ($filer == 'order') {
            foreach ($value as $order_filter) {
                $this->response->orderBy($order_filter[0], $order_filter[1]);
            }
        }
    }
}
