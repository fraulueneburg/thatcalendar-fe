import { PersonSimpleBikeIcon as IconTravel } from '@phosphor-icons/react'

export default function TravelTime({ time, isReturn }) {
	const parseDuration = (isoString) => {
		const match = isoString.match(/P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?)?/)
		const days = parseInt(match?.[1] || '0', 10)
		const hours = parseInt(match?.[2] || '0', 10)
		const minutes = parseInt(match?.[3] || '0', 10)

		const parts = []
		if (days > 0) parts.push(`${days} ${days > 1 ? 'days' : 'day'}`)
		if (hours > 0) parts.push(`${hours} h`)
		if (minutes > 0) parts.push(`${minutes} min`)

		return parts.join(' ')
	}

	const timeFormatted = parseDuration(time)
	const text = isReturn ? 'return time' : 'travel time'

	return (
		<>
			<p className="travel-time">
				<IconTravel size={14} />
				<small className="text">
					{timeFormatted} <span className="sr-only">{text}</span>
				</small>
			</p>
		</>
	)
}
