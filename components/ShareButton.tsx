"use client"

import { useState, useEffect } from "react"

export default function ShareButton({ id }: { id: string }) {
  const [url, setUrl] = useState("")

 useEffect(() => {
  setUrl(`${window.location.origin}/audit/${id}`)
 }, [id]) 

  return (
    <div className="flex gap-2">
      <input
        readOnly
        value={url}
        className="flex-1 border rounded-lg p-2 text-sm bg-gray-50"
      />
      <button
        onClick={() => navigator.clipboard.writeText(url)}
        className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
      >
        Copy
      </button>
    </div>
  )
}