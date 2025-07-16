export type CountProps = {
	quantity: number
	itemType: string
}

export default function Count({ quantity, itemType }: CountProps) {
	return (
		<>
			<small className="count">
				{quantity} <span className="sr-only">{itemType}</span>
			</small>
		</>
	)
}
