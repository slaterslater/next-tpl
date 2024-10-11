// layout.js
// Root layout

// import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
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
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-E8FDJ5Y706" />
      <Script id="gtag">
{`
          window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-E8FDJ5Y706');
`}
      </Script>  



      {/* <GoogleAnalytics gaId="G-E8FDJ5Y706" /> */}
      {/* <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GAID}`} /> */}
      
    </html>
  );
}