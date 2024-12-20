// References to HTML elements
const textInput = document.getElementById('text-input');
const previewBtn = document.getElementById('preview-btn');
const downloadBtn = document.getElementById('download-btn');
const audioPreview = document.getElementById('audio-preview');

// Enable or disable preview and download buttons based on input
textInput.addEventListener('input', () => {
  if (textInput.value.trim().length > 0) {
    previewBtn.disabled = false;
  } else {
    previewBtn.disabled = true;
    downloadBtn.disabled = true;
    audioPreview.style.display = "none";
  }
});

// Preview the audio when the user clicks "Preview"
previewBtn.addEventListener('click', () => {
  const text = textInput.value.trim();

  // Check if there's any text
  if (text.length === 0) return;

  // Create a speech synthesis utterance (the text-to-speech)
  const utterance = new SpeechSynthesisUtterance(text);

  // Configure language (you can change the language, pitch, rate, etc.)
  utterance.lang = 'en-US';
  utterance.pitch = 1;
  utterance.rate = 1;

  // Use SpeechSynthesis API to speak the text
  speechSynthesis.speak(utterance);

  // Create a temporary audio element to play the preview
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const speechSynthesisStream = new SpeechSynthesisUtterance(text);
  const mediaStream = audioContext.createMediaStreamDestination();
  audioContext.speak(speechSynthesisStream);
  const audioBlob = mediaStream.stream;
  
  // Update the audio preview and show the player
  const audioUrl = URL.createObjectURL(audioBlob);
  audioPreview.src = audioUrl;
  audioPreview.style.display = "block";
  
  // Enable the download button
  downloadBtn.disabled = false;
});

// Download the audio when the user clicks "Download"
downloadBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  
  if (text.length === 0) return;

  const utterance = new SpeechSynthesisUtterance(text);
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const mediaStream = audioContext.createMediaStreamDestination();
  
  // Create a download link with audio data (you would need backend support for proper file export)
  const audioBlob = new Blob([audioContext.createMediaStreamDestination()], { type: 'audio/wav' });
  const downloadUrl = URL.createObjectURL(audioBlob);
  
  const downloadLink = document.createElement('a');
  downloadLink.href = downloadUrl;
  downloadLink.download = 'text-to-audio.wav';
  downloadLink.click();
});
