import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

export const Students = ({ posts, loading }) => {
  if (loading) {

    return <h2>Loading...</h2>;
  }
  const handle = (event) => {

    let arg1 = event.target.getAttribute('key');
      console.log("Work"+ arg1)}
  return (

  <Table variant="striped"   >

  <Thead bg="blue.300" color="white"  >
    <Tr >
      <Th  color="white">ФИО</Th>
      <Th color="white">Пол</Th>
      <Th color="white">Грожданство</Th>
      <Th color="white">Факультет</Th>
      <Th color="white">Тип специальности</Th>
      <Th color="white">Статус студент</Th>
      <Th color="white">Статус проживание</Th>
    </Tr>
  </Thead>
  <Tbody color="black" bg="white" >
      { posts.map(post => (
            <Tr key={post.student_id} onClick={handle} >
            <Th  >{post.name} {post.surname} {post.patronymic}</Th>
            <Th >{post.sex}</Th>
            <Th >{post.citizenship}</Th>
            <Th >{post.citizenship}</Th>
            <Th >{post.citizenship}</Th>
            <Th >{post.status_student}</Th>
            <Th >{post.status_accommodation}</Th>
            </Tr>
      ))}
  </Tbody>
  {/* <Tfoot bg="blue.100" opacity="80%">
    <Tr>
       <Th>ФИО</Th>
      <Th>Пол</Th>
      <Th >Грожданство</Th>
      <Th >Факультет</Th>
      <Th >Тип специальности</Th>
      <Th >Статус студент</Th>
      <Th >Статус проживание</Th>
    </Tr>
  </Tfoot> */}
</Table>
  );
};

