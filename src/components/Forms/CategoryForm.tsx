import { useDataContext } from '../../context/Data.context'
import { CategoryType } from '../../types'
import CategoryTitleInput from './CategoryTitleInput'

export default function NewCategoryForm() {
	const { categoryData, setCategoryData } = useDataContext()
	const mainCategories = categoryData.data.filter((elem) => !elem.parent)

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const form = event.currentTarget
		const formData = new FormData(form)
		const invalid = form.querySelectorAll('[aria-invalid="true"]').length > 0
		const parent = (formData.get('parent') as string) || null

		if (invalid) {
			const firstInvalid = form.querySelector('[aria-invalid="true"]')
			if (firstInvalid && firstInvalid instanceof HTMLElement) {
				firstInvalid.focus()
			}
			return
		}

		const customId = `c-${categoryData.data.length}`
		const newCategory = { _id: customId, ...Object.fromEntries(formData.entries()) } as CategoryType

		setCategoryData((prev) => {
			const newData = [...prev.data, newCategory]
			if (parent) {
				const existingChildren = prev.index[parent] ?? []
				return {
					data: newData,
					index: {
						...prev.index,
						[parent]: [...existingChildren, customId],
					},
				}
			} else {
				return {
					...prev,
					data: newData,
				}
			}
		})
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<p>
					<CategoryTitleInput />
				</p>
				<p>
					<label htmlFor="cat-parent">
						Parent
						<select name="parent" id="cat-parent">
							<option value="">—</option>
							{mainCategories.length > 0 &&
								mainCategories.map((category) => (
									<option key={category._id} value={category._id}>
										{category.title}
									</option>
								))}
						</select>
					</label>
				</p>
				<p>
					<label htmlFor="cat-color">
						Color
						<input type="color" name="color" id="cat-color" />
					</label>
				</p>
				<p>
					<label htmlFor="cat-color-bg">
						Background Color
						<input type="color" name="colorBg" id="cat-color-bg" />
					</label>
				</p>
				<button type="submit">add category</button>
			</form>
		</>
	)
}
