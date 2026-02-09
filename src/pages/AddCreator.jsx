import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../client.js'
import './AddCreator.css'

export default function AddCreator() {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		name: '',
		url: '',
		description: '',
		imageURL: ''
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		try {
			const { error: insertError } = await supabase
				.from('creators')
				.insert([formData])

			if (insertError) {
				setError(insertError.message)
			} else {
				navigate('/')
			}
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="add-creator-container">
			<h2>Add New Creator</h2>
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
					/>
				</div>

				<div className="form-group">
					<label htmlFor="description">Description:</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
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
					/>
				</div>

				<div className="button-group">
					<button
						type="submit"
						disabled={loading}
						className="btn btn-primary"
					>
						{loading ? 'Adding...' : 'Add Creator'}
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
