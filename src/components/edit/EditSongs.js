import { useState, useEffect, useContext } from "react";
import TokenContext from "../TokenContext";
import { Link } from "react-router-dom";
import SongEditor from "./SongEditor";
import getEditableSongs from "../../network/getEditableSongs.js";
import styled from "styled-components";

const List = styled.ul`
width: 400px;
padding: 50px;
background-color: rgb(241, 236, 236);
`;
const AddButton = styled.li`
  list-style: none;
  border: 1px solid lightgray;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 3px;
  background-color: white;
  width: 15px;
  float: right;
  cursor: pointer;
  `;


function EditSongs({ choirId}) {
  const [songs, setSongs] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState(null);
  const token = useContext(TokenContext);

 
const loadSongs = async function(abortController) {
  const songs = await getEditableSongs(choirId, token, abortController.signal);
  setSongs(songs);
  setSelectedSongId(null);
}

const handleAdd = function() {
  const newSong = {id: "new"}
  setSelectedSongId("new");
  setSongs(songs => [...songs, newSong]);
}

  //Execute when component mounts
  useEffect(() => {
    const abortController = new AbortController();
    loadSongs(abortController);
    return () => abortController.abort();
    // eslint-disable-next-line
  }, []);

  //Remove unsubmitted songs when they are closed

  return (
    <div className="EditSongs">
      <Link to=".">
        <button className="nav-btn">Home</button>
      </Link>
      <List>
        {songs.map(song => {
          return (
          <SongEditor 
            song={song}  
            key={song.id}
            selectedSongId={selectedSongId}
            setSelectedSongId={setSelectedSongId}
            loadSongs={loadSongs}
          />
          )
        })}
        <AddButton onClick={handleAdd}>+</AddButton>
      </List>
      
    </div>
    
  )
}

export default EditSongs;