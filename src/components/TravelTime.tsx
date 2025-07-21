import { PersonSimpleBikeIcon as IconTravel } from '@phosphor-icons/react'

type TravelTimeProps = {
	time: string
	isReturn?: boolean
}

export default function TravelTime({ time, isReturn }: TravelTimeProps) {
	const parseDuration = (isoString: string) => {
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
			<aside className="travel-time">
				<IconTravel size={14} aria-hidden="true" />
				<small>
					<time dateTime={time}>{timeFormatted}</time>&nbsp;<span className="sr-only">{text}</span>
				</small>
			</aside>
		</>
	)
}
