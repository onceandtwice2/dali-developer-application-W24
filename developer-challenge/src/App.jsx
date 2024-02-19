import { useState , useEffect } from 'react'
import './App.css'

function App() {
  const [melody, setMelody] = useState([]);
  const [audioContext, setAudioContext] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize the audio context
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);
    // Set title
    document.title = 'Melody Maker';
  }, []);

  const playNote = (frequency, duration) => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    const gainNode = audioContext.createGain();
    //Set volume to 50%
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    //Fade out
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  };

  const playMelody = async () => {
    //If no melody entered, return from function
    if (melody.length === 0) return;

    setIsPlaying(true);

    for (let i = 0; i < melody.length; i++) {
      const note = melody[i];
      const frequency = getNoteFrequency(note);
      playNote(frequency, .5); //Play note for half second
      await new Promise((resolve) => setTimeout(resolve, 500)); // Delay between notes to remove overlap between notes
    }

    setIsPlaying(false);
  };

  const addNoteToMelody = (note) => {
    const frequency = getNoteFrequency(note);
    //Play note to allow user to hear frequency of note just added
    playNote(frequency, 0.2);
    setMelody((prevMelody) => [...prevMelody, note]);
  };

  //Return frequency based on note, if not possible, return 0
  const getNoteFrequency = (note) => {
    const noteFrequencies = {
      C: 261.63,
      D: 293.66,
      E: 329.63,
      F: 349.23,
      G: 392.00,
      A: 440.00,
      B: 493.88,
    };

    return noteFrequencies[note] || 0;
  };

  return (
    <div className="App">
      <h1>Melody Maker</h1>
      <div>
        {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((note) => (
          <button onClick = {() => addNoteToMelody(note)}>{note}</button>
        ))}
      </div>
      <div>
        <h2>Melody:</h2>
        {melody.map((note, index) => (
          <span key={index}>{note} </span>
        ))}
      </div>
      <button onClick={() => playMelody()} disabled={isPlaying}>
        {isPlaying ? 'Playing...' : 'Play Melody'}
      </button>
      <button onClick={() => setMelody([])} disabled={isPlaying}>
        Reset Melody
      </button>
    </div>
  )
}

export default App
