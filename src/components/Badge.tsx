import { BadgeType } from './Badge.types'

export default function Badge({ count, itemType }: BadgeType) {
	return (
		<>
			<small className="badge">
				{count} <span className="sr-only">{itemType}</span>
			</small>
		</>
	)
}
