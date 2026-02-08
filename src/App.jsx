import './App.css'
import { Link, useRoutes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import supabase from './client.js'
import ShowCreators from './pages/ShowCreators'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ViewCreator from './pages/ViewCreator'

function App() {
  const [creators, setCreators] = useState([])

  useEffect(() => {
    async function fetchCreators() {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
        if (error) {
          console.error('Error fetching creators:', error)
        } else {
          setCreators(data || [])
        }
      } catch (err) {
        console.error('Unexpected error fetching creators:', err)
      }
      
    }

    fetchCreators()
  }, [])

  const routes = [
    { path: '/', element: <ShowCreators creators={creators} /> },
    { path: '/add', element: <AddCreator /> },
    { path: '/edit/:id', element: <EditCreator /> },
    { path: '/view/:id', element: <ViewCreator /> },
  ]

  const element = useRoutes(routes)

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Creatorverse</h1>
        <nav>
          <Link to="/">Home</Link>
          {' | '}
          <Link to="/add">Add Creator</Link>
        </nav>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App
