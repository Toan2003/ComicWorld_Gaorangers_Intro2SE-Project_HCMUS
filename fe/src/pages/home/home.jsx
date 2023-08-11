// import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Home(props) {

	return (
		<div className='home'>
			<Link to='comic/main-comic'>Vuong gia vinh dieu</Link>
			<Outlet />
		</div>
	)
}
