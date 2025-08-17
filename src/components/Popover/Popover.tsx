import './popover.scss'
import { Popover as ArkPopover } from '@ark-ui/react'
import { XIcon as IconClose } from '@phosphor-icons/react'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useCloseOnClickOutside } from '../../utils/useCloseOnClickOutside'

type PopoverProps = {
	trigger: ReactNode
	triggerLabel: string
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	title?: string
	description?: string
	children: ReactNode
	isModal?: boolean
	className?: string
	positioning?: React.ComponentProps<typeof ArkPopover.Root>['positioning']
	withArrow?: boolean
}

export const Popover = ({
	trigger,
	triggerLabel,
	isOpen,
	onOpenChange,
	title,
	description,
	children,
	isModal = false,
	className,
	positioning,
	withArrow,
}: PopoverProps) => {
	const ref = useRef<HTMLDivElement>(null)

	useCloseOnClickOutside({
		ref: ref,
		onCloseAction: () => onOpenChange?.(false),
	})

	return (
		<>
			<ArkPopover.Root modal={isModal} open={isOpen} positioning={positioning} closeOnEscape={false}>
				{trigger && (
					<ArkPopover.Trigger className="btn-round" aria-label={triggerLabel} onClick={() => onOpenChange?.(!isOpen)}>
						{trigger}
					</ArkPopover.Trigger>
				)}
				{isOpen && (
					<ArkPopover.Positioner ref={ref} className={`${isModal ? 'modal' : ''}${className ? ` ${className}` : ''}`}>
						<ArkPopover.Content>
							{withArrow && <ArkPopover.Arrow />}
							{title && <ArkPopover.Title>{title}</ArkPopover.Title>}
							{description && <ArkPopover.Description>{description}</ArkPopover.Description>}
							{children}
							<ArkPopover.CloseTrigger className="btn-round" onClick={() => onOpenChange?.(!isOpen)}>
								<IconClose />
							</ArkPopover.CloseTrigger>
						</ArkPopover.Content>
					</ArkPopover.Positioner>
				)}
			</ArkPopover.Root>
			{isOpen && <div className="popover-backdrop"></div>}
		</>
	)
}
