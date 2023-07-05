import { Button, HStack } from '@chakra-ui/react';
import React from 'react'

function Pagination({ elements, elementPerPage, setPageNumber }) {
  const pages = [];
  for (let i = 1; i <= Math.ceil(elements / elementPerPage); i++) {
    pages.push(i);
  }
  return (
    <HStack justifyContent='center' flexWrap='wrap'>
      {
        pages.map(element =>
          <Button key={element} onClick={() => setPageNumber(element)} >{element}</Button>
        )
      }
    </HStack>
  )
}

export default Pagination