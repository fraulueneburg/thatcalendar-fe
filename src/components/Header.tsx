import { useState } from 'react'
import { CaretRightIcon as IconToRight, CaretLeftIcon as IconToLeft } from '@phosphor-icons/react'
import { calArr } from '../data/dummydata'
import Badge from './Badge'

export default function Header() {
	const brandName = 'that calendar'
	const [isExpanded, setIsExpanded] = useState(true)

	return (
		<>
			<header className={`page-header ${isExpanded && 'expanded'}`}>
				<h1 className="logo" aria-label={brandName}>
					👌 <span style={{ display: isExpanded ? 'block' : 'none' }}>{brandName}</span>
				</h1>
				<button
					role="switch"
					aria-checked={isExpanded}
					className="btn-round btn-expand"
					onClick={() => setIsExpanded((prev) => !prev)}>
					{isExpanded ? <IconToLeft /> : <IconToRight />} <span className="sr-only">expand header</span>
				</button>
				<nav className="nav-main">
					<ul>
						{calArr.map((elem, i) => (
							<li key={i} style={{ color: elem.color }}>
								{elem.calname} <Badge count={'3'} itemType={'tasks'} />
							</li>
						))}
					</ul>
				</nav>
			</header>
		</>
	)
}
