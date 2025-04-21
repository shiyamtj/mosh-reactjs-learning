import { useEffect, useState } from 'react'
import apiClient from '../services/api-client'

interface Genre {
  id: number
  name: string
  image_background: string
}

interface FetchGenreResponse {
  count: number
  results: Genre[]
}

const useGenres = () => {
  const [genres, setGenre] = useState<Genre[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)
    apiClient
      .get<FetchGenreResponse>('/genres', { signal: controller.signal })
      .then((res) => {
        setGenre(res.data.results)
        setIsLoading(false)
      })
      .catch((err) => {
        if (err instanceof Error) return
        setError(err.message)
        setIsLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { genres, error, isLoading }
}

export default useGenres
