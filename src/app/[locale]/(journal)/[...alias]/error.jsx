'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Cela ne tourne pas rond ici.</h2>
      <p>Une erreur est survenue lors du chargement des données, merci de réessayer plus tard.</p>
      <p>Si l'erreur persiste, veuillez contacter un administrateur.</p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
