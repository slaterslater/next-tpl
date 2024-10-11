// layout.js
// Root layout

import { GoogleAnalytics } from '@next/third-parties/google'
import { GameProvider } from "./context/gameContext";
import './global.css';

export default async function RootLayout({ children }) {
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
      <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GAID}`} />
    </html>
  );
}