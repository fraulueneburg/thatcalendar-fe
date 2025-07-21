import { useState } from 'react'
import { CaretRightIcon as IconToRight, CaretLeftIcon as IconToLeft } from '@phosphor-icons/react'

import NavMain from './NavMain'

export default function Header() {
	const brandName = 'that calendar'
	const [isExpanded, setIsExpanded] = useState(true)

	return (
		<>
			<header className={`page-header ${isExpanded ? 'expanded' : ''}`}>
				<h1 className="logo" aria-label={brandName}>
					👌 <span style={{ display: isExpanded ? 'block' : 'none' }}>{brandName}</span>
				</h1>
				<button
					type="button"
					role="switch"
					aria-checked={isExpanded}
					className="btn-round btn-expand"
					onClick={() => setIsExpanded((prev) => !prev)}>
					{isExpanded ? <IconToLeft /> : <IconToRight />} <span className="sr-only">expand header</span>
				</button>
				<NavMain />
			</header>
		</>
	)
}
