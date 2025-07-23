import { categoryArr } from '../../data/dummydata'
const mainCategories = categoryArr.filter((elem) => !elem.parent)

export default function NewCategoryForm() {
	return (
		<>
			<form>
				<p>
					<label>
						Name
						<input type="text" required />
					</label>
				</p>
				<p>
					<label>
						Parent
						{mainCategories.length > 0 && (
							<select>
								<option>—</option>
								{mainCategories.map((category) => (
									<option key={category._id}>{category.title}</option>
								))}
							</select>
						)}
					</label>
				</p>
				<p>
					<label>
						Color
						<input type="color" />
					</label>
				</p>
				<p>
					<label>
						Background Color
						<input type="color" />
					</label>
				</p>
				<button type="submit">add category</button>
			</form>
		</>
	)
}
