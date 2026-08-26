import { useState } from 'react'

interface DownloadButtonProps {
  imageUrl: string
  title: string
}

function createFileName(title: string) {
  const safeTitle = title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()

  return `${safeTitle || 'affiche'}.jpg`
}

export function DownloadButton({ imageUrl, title }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  async function handleDownload() {
    setIsDownloading(true)

    try {
      const response = await fetch(imageUrl)
      if (!response.ok) throw new Error('Image indisponible')

      const temporaryUrl = URL.createObjectURL(await response.blob())
      const link = document.createElement('a')

      link.href = temporaryUrl
      link.download = createFileName(title)
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(temporaryUrl)
    } catch {
      window.open(imageUrl, '_blank', 'noopener,noreferrer')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      className="shrink-0 rounded-md bg-slate-700 px-3 py-2 text-xs font-medium text-slate-100 transition hover:bg-slate-600 disabled:cursor-wait disabled:opacity-60"
    >
      {isDownloading ? 'Patiente…' : 'Télécharger'}
    </button>
  )
}
