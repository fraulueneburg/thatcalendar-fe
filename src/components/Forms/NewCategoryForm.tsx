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

		if (invalid) {
			const firstInvalid = form.querySelector('[aria-invalid="true"]')

			if (firstInvalid && firstInvalid instanceof HTMLElement) {
				firstInvalid.focus()
			}
			return
		}

		const customId = `c-${categoryData.data.length}`

		const newCategory = { _id: customId, ...Object.fromEntries(formData.entries()) } as CategoryType
		setCategoryData((prev) => ({ ...prev, data: [...prev.data, newCategory] }))

		console.log(newCategory)
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<p>
					<CategoryTitleInput />
				</p>
				<p>
					<label htmlFor="parent">
						Parent
						<select name="parent">
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
					<label htmlFor="color">
						Color
						<input type="color" name="color" />
					</label>
				</p>
				<p>
					<label htmlFor="colorBg">
						Background Color
						<input type="color" name="colorBg" />
					</label>
				</p>
				<button type="submit">add category</button>
			</form>
		</>
	)
}
