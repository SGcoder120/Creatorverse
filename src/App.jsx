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
    <div>
      <header className="app-header">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Link to="/" className="nav-link nav-link-home">
              <h1 className="brand-title">Creatorverse</h1>
            </Link>
          </div>
          <nav className="navbar-nav">
            <Link to="/add" className="nav-link nav-link-primary">Add Creator</Link>
          </nav>
        </div>
      </header>
      <div className="app-root">
        <main>
          {element}
        </main>
      </div>
    </div>
  )
}

export default App
