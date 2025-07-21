import { useMemo, useState } from 'react'
import { categoryArr, categoryIndex } from '../data/dummydata'
import { CategoryType } from '../types/category'
import Count from './Count'
import { CaretRightIcon as IconExpand } from '@phosphor-icons/react'
import { PlusIcon as IconAdd } from '@phosphor-icons/react'
import { Popover } from './Popover'
import NewCategoryForm from './Forms/NewCategoryForm'

export default function NavMain() {
	const mainCategoryArr: CategoryType[] = useMemo(() => categoryArr.filter((elem) => !elem.parent), [categoryArr])
	const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({})

	const toggleSubmenu = (id: string) => {
		setOpenSubmenus((prev) => ({
			...prev,
			[id]: !prev[id],
		}))
	}

	return (
		<>
			<nav className="nav-main">
				<div className="nav-header">
					<h2>Categories</h2>
					<Popover trigger={<IconAdd weight="bold" />} triggerLabel={`add category`}>
						<NewCategoryForm />
					</Popover>
				</div>
				{mainCategoryArr && (
					<ul>
						{mainCategoryArr.map((category, i) => {
							const subCategoryIds = categoryIndex[category._id]
							const submenuIsOpen = openSubmenus[category._id] || false

							return (
								<li key={i} style={{ color: category.color }}>
									<span>
										{category.title}
										{subCategoryIds && <Count quantity={subCategoryIds.length} itemType={'projects'} />}
									</span>
									{subCategoryIds && (
										<>
											<button
												type="button"
												className="toggle-submenu"
												aria-controls={`subcats-${category._id}`}
												aria-expanded={submenuIsOpen}
												aria-label="expand subcategories"
												onClick={() => toggleSubmenu(category._id)}>
												<IconExpand />
											</button>
											<ul id={`subcats-${category._id}`}>
												{subCategoryIds.map((subCatId) => {
													const subCategory = categoryArr.find((elem) => elem._id === subCatId)

													if (!subCategory) return
													return (
														<li key={subCatId}>
															<span>{subCategory.title}</span>
														</li>
													)
												})}
											</ul>
										</>
									)}
								</li>
							)
						})}
					</ul>
				)}
			</nav>
		</>
	)
}
