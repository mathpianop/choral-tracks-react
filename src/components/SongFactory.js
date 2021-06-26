import SongForm from "./SongForm.js";
import SubmitProgress from "./SubmitProgress.js"
import { useState, useEffect } from "react";

function SongFactory(props) {
  //loadings is an object of loading objects
  //Each loading object has two keys, 
  //success (Boolean), and mode (String: "create", "update", or "destroy")
  const [loadings, setLoadings] = useState([]);
 
  const handleNewSong = function() {
    props.setFactoryMode("new");
    props.setJobStatus("assembly");
  }

  const content = function() {
    switch (props.factoryMode) {
      //If we are creating or updating a song, render the SongForm
      case "new":
        return (
          <SongForm
            token={props.token}
            setFactoryMode={props.setFactoryMode}
            setLoadings={setLoadings}
            setJobStatus={props.setJobStatus}
            factoryMode="new"
          />
        );
      case "edit":
        return (
          <SongForm
            token={props.token}
            setFactoryMode={props.setFactoryMode}
            setLoadings={setLoadings}
            setJobStatus={props.setJobStatus}
            editableSong={props.editableSong}
            editableParts={props.editableParts}
            factoryMode="edit"
          />
        );
      //If we are submitting the SongForm, or if we are destroying a song,
      //render SubmitProgress
      case "delivery":
      case "destruction":
        return (
          <SubmitProgress 
            loadings={loadings}
            setJobStatus={props.setJobStatus}
            jobStatus={props.jobStatus}
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
    if (
      !(props.jobStatus === "assembly") &&
      !(props.jobStatus === "creating") &&
      !(props.jobStatus === "updating") &&
      !(props.jobStatus === "destroying") 
      ) {
      return <button onClick={handleNewSong}>New</button>
    }
  }

  useEffect(() => {
    //If all parts are loading, mark job as finished
    if (Object.values(loadings).every(loading => loading.success)) {
      if (props.jobStatus === "creating") {
        props.setJobStatus("created")
      } else if (props.jobStatus === "updating") {
        props.setJobStatus("updated")
      }
    }
    //eslint-disable-next-line
  }, [loadings])


  return (
    <div className="SongFactory">
      {content()}
      {button()}
    </div>
  )
}

export default SongFactory;