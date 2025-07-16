export type BadgeProps = {
	count: number
	itemType: string
}

export default function Badge({ count, itemType }: BadgeProps) {
	return (
		<>
			<small className="badge">
				{count} <span className="sr-only">{itemType}</span>
			</small>
		</>
	)
}
