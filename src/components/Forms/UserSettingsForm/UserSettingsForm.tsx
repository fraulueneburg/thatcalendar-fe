import './user-settings-form.scss'
import { useMemo, useState } from 'react'
import { dayStartHour, dayEndHour, weekStartsOnMonday, userTimeZone } from '../../../data/user-settings'
import { useDataContext } from '../../../context/Data.context'
import { CategoryType } from '../../../types'
import { TrashIcon as IconDelete } from '@phosphor-icons/react'

export function UserSettingsForm() {
	const { categoryData, setCategoryData } = useDataContext()
	const { data: categoryArr, index: categoryIndex } = categoryData
	const mainCategories: CategoryType[] = useMemo(() => categoryArr.filter((elem) => !elem.parent), [categoryData])

	const [dayStartTime, setDayStartTime] = useState('7:00')
	const [dayEndTime, setDayEndTime] = useState('0:00')

	const handleDeleteCategory = (id: string, parentId?: string) => {
		setCategoryData((prev) => {
			const { data, index } = prev
			const newArr = data.filter((elem) => elem._id !== id)
			const isParentCategory = !parentId

			if (isParentCategory) {
				const arrWithoutChildren = newArr.filter((elem) => elem.parent !== id)
				const newIndex = { ...index }
				delete newIndex[id]
				return { index: newIndex, data: arrWithoutChildren }
			} else {
				const updatedParentIndex = index[parentId].filter((elem) => elem !== id)
				const newIndex = { ...index, [parentId]: [...updatedParentIndex] }

				return {
					data: newArr,
					index: newIndex,
				}
			}
		})
	}

	return (
		<>
			<h2>User Settings</h2>
			<form className="form-user-settings">
				<div className="field">
					<div className="grid">
						<label>
							Day starts at {dayStartHour}
							<input
								required
								id="slot-start-time"
								type="time"
								name="slot-start-time"
								max={dayStartTime}
								onChange={(e) => setDayStartTime(e.target.value)}
								step="3600"
							/>
						</label>
						<label>
							Day ends at {dayEndHour}
							<input
								required
								id="slot-end-time"
								type="time"
								name="slot-end-time"
								min={dayEndTime}
								onChange={(e) => setDayEndTime(e.target.value)}
								step="3600"
							/>
						</label>
					</div>
				</div>
				<div className="field">
					<label>
						week starts on {weekStartsOnMonday ? 'mo' : 'su'}
						<select>
							<option>Monday</option>
							<option>Sunday</option>
						</select>
					</label>
				</div>
				<div className="field">
					<label>Time Zone: {userTimeZone}</label>
				</div>
				<div className="field">
					<h3>Categories</h3>
					{mainCategories && (
						<ul className="list-categories">
							{mainCategories.map((category, i) => {
								const subCategoryIds = categoryIndex[category._id]

								return (
									<li key={i} style={{ color: category.color }}>
										<span>{category.title}</span>
										<button
											type="button"
											onClick={() => handleDeleteCategory(category._id)}
											aria-label={`delete ${category.title}`}>
											<IconDelete />
										</button>
										{subCategoryIds && (
											<>
												<ul id={`subcats-${category._id}`}>
													{subCategoryIds.map((subCatId) => {
														const subCategory = categoryArr.find((elem) => elem._id === subCatId)

														if (!subCategory) return
														return (
															<li key={subCatId}>
																<span>{subCategory.title}</span>
																<button
																	type="button"
																	onClick={() => handleDeleteCategory(subCatId, category._id)}
																	aria-label={`delete ${subCategory.title}`}>
																	<IconDelete />
																</button>
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
				</div>
			</form>
		</>
	)
}
