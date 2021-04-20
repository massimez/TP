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
  return (

  <Table variant="striped"  colorScheme="teal" >
  <TableCaption>Students</TableCaption>
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
  <Tbody color="black" bg="white" colorScheme="black">
      { posts.map(post => (
            <Tr key={post.id}>
            <Th >{post.id}</Th> 
            <Th >{post.userId}</Th>
            <Th >{post.title}</Th>
            <Th >{post.title}</Th>
            <Th >{post.title}</Th>
            <Th >{post.title}</Th>
            <Th >{post.body}</Th>
            </Tr>
      ))}
  </Tbody>
  <Tfoot bg="blue.100" opacity="80%">
    <Tr>
       <Th>ФИО</Th>
      <Th>Пол</Th>
      <Th >Грожданство</Th>
      <Th >Факультет</Th>
      <Th >Тип специальности</Th>
      <Th >Статус студент</Th>
      <Th >Статус проживание</Th>
    </Tr>
  </Tfoot>
</Table>
  );
};

