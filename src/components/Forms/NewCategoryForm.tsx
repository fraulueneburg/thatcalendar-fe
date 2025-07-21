export default function NewCategoryForm() {
	return (
		<>
			<form>
				<p>
					<label>
						Name
						<input type="text" />
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
