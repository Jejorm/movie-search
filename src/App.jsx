import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'
import { Movies } from './components/Movies'
import { useSearch, useMovies } from './hooks'
import './App.css'

export function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(debounce(search => {
    getMovies({ search })
  }, 300)
  , []
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(prev => !prev)
  }

  return (

    <div className='page'>
      <header>
        <h1>Buscador De Películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input name='query' value={search} onChange={handleChange} type='text' placeholder='Avengers, Star Wars, The Matrix...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'tomato' }}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}
