import { useDataContext } from '../../context/Data.context'
import { useState } from 'react'
import { CategoryType } from '../../types'

export default function CategoryTitleInput() {
	const [title, setTitle] = useState('')
	const [invalid, setInvalid] = useState(false)
	const { categoryData } = useDataContext()
	const existingCategories = categoryData.data

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		const alreadyExists = existingCategories.some((elem: CategoryType) => elem?.title === value)

		setTitle(value)
		setInvalid(alreadyExists)
	}

	return (
		<label htmlFor="title">
			Name
			<input
				type="text"
				id="title"
				name="title"
				value={title}
				onChange={handleChange}
				aria-invalid={invalid}
				aria-errormessage="err1"
				required
			/>
			{invalid && (
				<span id="err1" className="error-message">
					Error: Name already exists. Please choose a unique name.
				</span>
			)}
		</label>
	)
}
