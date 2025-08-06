import { DotsThreeIcon as IconResize } from '@phosphor-icons/react'

export function ResizeHandle() {
	return (
		<>
			<div className="resize-handle">
				<IconResize aria-hidden="true" />
			</div>
		</>
	)
}
