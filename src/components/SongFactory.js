import SongForm from "./SongForm.js";
import SubmitProgress from "./SubmitProgress.js"
import { useState, useEffect } from "react";

function SongFactory(props) {
  
  const [loading, setLoading] = useState({});
  
 

  const handleNewSong = function() {
    props.setFactoryMode("new");
    props.setJobStatus("assembly");
  }

  const content = function() {
    switch (props.factoryMode) {
      case "new":
        return (
          <SongForm
            setFactoryMode={props.setFactoryMode}
            setLoading={setLoading}
            setJobStatus={props.setJobStatus}
            factoryMode="new"
          />
        );
      case "delivery":
        return (
          <SubmitProgress 
            loading={loading}
            setJobStatus={props.setJobStatus}
            jobStatus={props.jobStatus}
          />
        );
      case "edit":
        return (
          <SongForm
            setFactoryMode={props.setFactoryMode}
            setLoading={setLoading}
            setJobStatus={props.setJobStatus}
            editableSong={props.editableSong}
            editableParts={props.editableParts}
            factoryMode="edit"
          />
        );
      default:
        return (
          <div className="prompt">
            Add a song or select a song to edit
          </div>
        )
    }
  }

  const button = function() {
    //If a job isn't in progress, show the new song button
    if (props.jobStatus === "none" || props.jobStatus === "submitted") {
      return <button onClick={handleNewSong}>New</button>
    }
  }

  useEffect(() => {
    //If all parts are loading, mark job as finished
    if (Object.values(loading).every(Boolean)) {
      props.setJobStatus("submitted")
    }
    //eslint-disable-next-line
  }, [loading])


  return (
    <div className="SongFactory">
      {content()}
      {button()}
    </div>
  )
}

export default SongFactory;