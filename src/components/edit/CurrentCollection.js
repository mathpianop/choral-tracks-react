import SongInfo from "./SongInfo.js";
import "../../style/edit/CurrentCollection.css"

function CurrentCollection(props) {

  const songs = function() {
    //If parts have been loaded and set in state, render SongInfo list
    return props.songs.map(song => {
      return (
        <SongInfo
          song={song}
          editSong={props.editSong}
          key={song.id}
          statusInfo={props.statusInfo}
        />
      )
    })
  }
  return (
    <div className="CurrentCollection">
      {songs()}
    </div>
  )
}

export default CurrentCollection;