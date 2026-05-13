"use client"

import { useState, useEffect } from "react"

export default function ShareButton({ id }: { id: string }) {
  const [url, setUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const u = `${window.location.origin}/audit/${id}`
    setTimeout(() => setUrl(u), 0)
  }, [id])

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex gap-2">
      <input readOnly value={url} className="input-field flex-1" />
      <button onClick={handleCopy} className="btn-primary px-4 py-2 text-sm">
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  )
}