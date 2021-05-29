import ProgressMeter from "./ProgressMeter.js";

function Controls(props) {
  return (
    <div className="Controls">
      <button onClick={props.stopTrack}>Stop</button>
      <button onClick={props.playTrack}>Play</button>
      <button onClick={props.pauseTrack}>Pause</button>
      <ProgressMeter 
        seekTrack={props.seekTrack} 
        duration={props.duration}
        timestamp={props.timestamp}
      />
    </div>
  )
}

export default Controls;