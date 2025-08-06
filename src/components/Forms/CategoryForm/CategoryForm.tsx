import './category-form.scss'
import { useState, useId } from 'react'
import { useDataContext } from '../../../context/Data.context'
import { CategoryType } from '../../../types'
import { nanoid } from 'nanoid'

export function CategoryForm() {
	const { categoryData, setCategoryData } = useDataContext()
	const mainCategories = categoryData.data.filter((elem) => !elem.parent)

	const formId = useId()
	const [parentId, setParentId] = useState('')
	const [title, setTitle] = useState('')
	const [titleInvalid, setTitleInvalid] = useState(false)
	const [color, setColor] = useState('')
	const [colorBg, setColorBg] = useState('')
	const hasParent = parentId !== ''
	const parentObj = categoryData.data.find((elem) => elem._id === parentId)

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newTitle = event.target.value
		const alreadyExists = categoryData.data.some((elem: CategoryType) => elem?.title === newTitle)

		setTitle(newTitle)
		setTitleInvalid(alreadyExists)
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const newCategoryId = `c-${nanoid()}`
		const form = event.currentTarget
		const invalid = form.querySelectorAll('[aria-invalid="true"]').length > 0

		if (invalid) {
			const firstInvalid = form.querySelector('[aria-invalid="true"]')
			if (firstInvalid && firstInvalid instanceof HTMLElement) {
				firstInvalid.focus()
			}
			return
		}

		const newCategory = {
			_id: newCategoryId,
			title: title,
			...(hasParent && { parent: parentId }),
			color: color,
			colorBg: colorBg,
			children: [],
		} as CategoryType

		setCategoryData((prev) => {
			const { data, index } = prev
			const updatedData = [...data, newCategory]

			if (!hasParent) {
				return {
					...prev,
					data: updatedData,
				}
			}

			const dataWithParent = updatedData.map((elem) =>
				elem._id === parentId ? { ...elem, children: [...(elem.children ?? []), newCategoryId] } : elem
			)

			return {
				data: dataWithParent,
				index: {
					...index,
					[parentId]: [...(index[parentId] ?? []), newCategoryId],
				},
			}
		})

		setTitle('')
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="new-category">
				{mainCategories.length > 0 && (
					<div className="field">
						<label>
							Parent
							<select name="parent" onChange={(e) => setParentId(e.target.value)}>
								<option value="">—</option>
								{mainCategories.length > 0 &&
									mainCategories.map((category) => (
										<option key={category._id} value={category._id}>
											{category.title}
										</option>
									))}
							</select>
						</label>
					</div>
				)}

				<div className="field">
					<label>
						Name
						<input
							type="text"
							name="title"
							value={title}
							onChange={handleTitleChange}
							aria-invalid={titleInvalid}
							aria-errormessage={`${formId}-title-error`}
							required
						/>
						{titleInvalid && (
							<span id={`${formId}-title-error`} className="error-message">
								Error: Category name already exists. Please choose a unique name.
							</span>
						)}
					</label>
				</div>
				<div className="field">
					<label>
						Color
						<input
							type="color"
							name="color"
							disabled={hasParent}
							value={hasParent ? parentObj?.color : color}
							onChange={(e) => setColor(e.target.value)}
						/>
					</label>
				</div>
				<div className="field">
					<label>
						Background Color
						<input
							type="color"
							name="colorBg"
							disabled={hasParent}
							value={hasParent ? parentObj?.colorBg : colorBg}
							onChange={(e) => setColorBg(e.target.value)}
						/>
					</label>
				</div>
				<button type="submit">add category</button>
			</form>
		</>
	)
}
