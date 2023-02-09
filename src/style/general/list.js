import styled from "styled-components";



const ListElement = styled.li`
    list-style: none;
    border: 1px solid lightgray;
    padding: 5px;
    margin-bottom: 5px;
    border-radius: 3px;
    background-color: white;
    cursor: pointer;
  `;

  const List = styled.ul`
width: 400px;
padding: 50px;
background-color: rgb(241, 236, 236);
`;

  export { ListElement, List}