import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Console easter egg (preserved from legacy)
const purple = 'color:#7F77DD;font-family:monospace;font-size:13px;font-weight:600;';
const ghost = 'color:#AFA9EC;font-family:monospace;font-size:12px;';
const flag = 'color:#4ADE80;font-family:monospace;font-size:13px;font-weight:700;';
console.log('%c┌────────────────────────────────────────────┐', purple);
console.log('%c│   CYBERSPECTRE  ·  MMU CYBERSECURITY       │', purple);
console.log('%c│   Present everywhere. Seen nowhere.        │', purple);
console.log('%c└────────────────────────────────────────────┘', purple);
console.log('%c[+] You found the source. Good recon.', ghost);
console.log('%c[+] flag{console_logs_reveal_secrets}', flag);
console.log('%c[+] Press / anywhere to open the command palette.', ghost);
