import { useState, useEffect } from 'react'
import supabase from '../client.js'
import Card from '../components/Card.jsx'
import './ShowCreators.css'

export default function ShowCreators({ creators: initialCreators }) {
	const [creators, setCreators] = useState(initialCreators || [])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		async function fetchCreators() {
			setLoading(true)
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
			} finally {
				setLoading(false)
			}
		}

		fetchCreators()
	}, [])

	if (loading) {
		return <div>Loading creators...</div>
	}

	if (!creators || creators.length === 0) {
		return <div>No content creators found.</div>
	}

	return (
		<div className="creators-grid">
			{creators.map((c) => (
				<Card
					key={c.id}
					id={c.id}
					name={c.name}
					url={c.url}
					description={c.description}
					imageURL={c.imageURL}
				/>
			))}
		</div>
	)
}
