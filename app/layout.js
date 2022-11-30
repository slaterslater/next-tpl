// layout.js
// Root layout

import { GameProvider } from "./context/gameContext";
import './global.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>TPL scores</title>
        <meta name="description" content="track live TPL scores"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <body>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}