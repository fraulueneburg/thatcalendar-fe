export default function Badge({ count, itemType }) {
	return (
		<>
			<span className="badge">
				{count} <span className="sr-only">{itemType}</span>
			</span>
		</>
	)
}
