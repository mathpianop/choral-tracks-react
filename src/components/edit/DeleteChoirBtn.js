import { useContext } from "react";
import styled from "styled-components"
import TokenContext from "../TokenContext";
import destroyChoir from "../../network/destroyChoir";

const SimpleBtn = styled.button`
  background-color: white;
  border: 1px solid gray;
  margin-top: 5px;
`;


export default function DeleteChoirBtn({choirId, updateChoirs, reportFailure}) {

  const token = useContext(TokenContext);
  
  const deleteChoir = async function() {
    if(window.confirm("Are you sure you want to delete this choir? This action cannot be undone...")) {
      try {
        await destroyChoir(choirId, token);
      } catch(e) {
        reportFailure();
      }
  
      updateChoirs()
    }
    
   
  }

  return (
    <SimpleBtn onClick={() => deleteChoir(choirId)}>
      Delete Choir
    </SimpleBtn>
  )
}