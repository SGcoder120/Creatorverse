import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import supabase from '../client.js'
import './ViewCreator.css'

export default function ViewCreator() {
	const navigate = useNavigate()
	const { id } = useParams()
	const [creator, setCreator] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		async function fetchCreator() {
			try {
				const { data, error: fetchError } = await supabase
					.from('creators')
					.select('*')
					.eq('id', id)
					.single()

				if (fetchError) {
					setError(fetchError.message)
				} else if (data) {
					setCreator(data)
				}
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchCreator()
	}, [id])

	const handleDelete = async () => {
		if (window.confirm('Are you sure you want to delete this creator?')) {
			try {
				const { error: deleteError } = await supabase
					.from('creators')
					.delete()
					.eq('id', id)

				if (deleteError) {
					setError(deleteError.message)
				} else {
					navigate('/')
				}
			} catch (err) {
				setError(err.message)
			}
		}
	}

	if (loading) {
		return <div className="view-creator-container"><p>Loading creator...</p></div>
	}

	if (error) {
		return <div className="view-creator-container"><p className="error-message">Error: {error}</p></div>
	}

	if (!creator) {
		return <div className="view-creator-container"><p>Creator not found.</p></div>
	}

	return (
		<div className="view-creator-container">
			<div className="creator-header">
				<h2>{creator.name}</h2>
				<div className="header-actions">
					<button onClick={() => navigate('/')} className="btn btn-secondary">Back</button>
					<button onClick={() => navigate(`/edit/${id}`)} className="btn btn-primary">Edit</button>
					<button onClick={handleDelete} className="btn btn-danger">Delete</button>
				</div>
			</div>

			<div className="creator-details">
				{creator.imageURL && (
					<div className="creator-image-container">
						<img src={creator.imageURL} alt={creator.name} className="creator-image" />
					</div>
				)}

				<div className="creator-info">
					<div className="info-group">
						<h3>Website</h3>
						<a href={creator.url} target="_blank" rel="noopener noreferrer" className="creator-url">
							{creator.url}
						</a>
					</div>

					<div className="info-group">
						<h3>Description</h3>
						<p className="creator-description">{creator.description}</p>
					</div>

				</div>
			</div>
		</div>
	)
}
