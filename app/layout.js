// layout.js
// Root layout

import './global.css';
import { GoogleAnalytics } from '@next/third-parties/google'

const GAID = process.env.NEXT_PUBLIC_GAID

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>TPL scores</title>
        <meta name="description" content="track live TPL scores"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <body>{children}</body>
      <GoogleAnalytics gaId={GAID} />
    </html>
  );
}