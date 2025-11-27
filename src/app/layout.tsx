import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Google AI Studio Multimodal App',
  description: 'Powered by Google AI Studio multimodal capabilities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
