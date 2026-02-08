import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import supabase from '../client.js'
import './EditCreator.css'

export default function EditCreator() {
	const navigate = useNavigate()
	const { id } = useParams()
	const [formData, setFormData] = useState({
		name: '',
		url: '',
		description: '',
		imageURL: ''
	})
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
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
					setFormData(data)
				}
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchCreator()
	}, [id])

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setSaving(true)
		setError(null)

		try {
			const { error: updateError } = await supabase
				.from('creators')
				.update(formData)
				.eq('id', id)

			if (updateError) {
				setError(updateError.message)
			} else {
				navigate('/')
			}
		} catch (err) {
			setError(err.message)
		} finally {
			setSaving(false)
		}
	}

	if (loading) {
		return <div className="edit-creator-container"><p>Loading creator...</p></div>
	}

	return (
		<div className="edit-creator-container">
			<h2>Edit Creator</h2>
			{error && <p className="error-message">Error: {error}</p>}
			
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="url">Website URL:</label>
					<input
						type="url"
						id="url"
						name="url"
						value={formData.url}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="description">Description:</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						required
						rows="4"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="imageURL">Image URL:</label>
					<input
						type="url"
						id="imageURL"
						name="imageURL"
						value={formData.imageURL}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="button-group">
					<button
						type="submit"
						disabled={saving}
						className="btn btn-primary"
					>
						{saving ? 'Saving...' : 'Save Changes'}
					</button>
					<button
						type="button"
						onClick={() => navigate('/')}
						className="btn btn-secondary"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	)
}
