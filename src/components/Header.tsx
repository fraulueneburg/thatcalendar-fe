import { useMemo, useState } from 'react'
import { CaretRightIcon as IconToRight, CaretLeftIcon as IconToLeft } from '@phosphor-icons/react'
import { categoryArr, categoryIndex } from '../data/dummydata'
import Count from './Count'
import { CategoryType } from '../types/category'

export default function Header() {
	const brandName = 'that calendar'
	const [isExpanded, setIsExpanded] = useState(true)

	const mainCategoryArr: CategoryType[] = useMemo(() => categoryArr.filter((elem) => !elem.parent), [categoryArr])

	return (
		<>
			<header className={`page-header ${isExpanded && 'expanded'}`}>
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
				<nav className="nav-main">
					<h2>Categories</h2>
					<ul>
						{mainCategoryArr.map((category, i) => {
							const subCategoryIds = categoryIndex[category._id]

							return (
								<li key={i} style={{ color: category.color }}>
									{category.title}
									{subCategoryIds && (
										<>
											<Count quantity={subCategoryIds.length} itemType={'projects'} />
											<ul>
												{subCategoryIds.map((subCatId) => {
													const subCategory = categoryArr.find((elem) => elem._id === subCatId)
													if (!subCategory) return
													return <li key={subCatId}>{subCategory.title}</li>
												})}
											</ul>
										</>
									)}
								</li>
							)
						})}
					</ul>
				</nav>
			</header>
		</>
	)
}
