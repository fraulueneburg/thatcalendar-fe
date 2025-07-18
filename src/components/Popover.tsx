import { Popover as ArkPopover } from '@ark-ui/react'
import { PlusIcon as IconAdd, XIcon as IconClose } from '@phosphor-icons/react'
import { ReactNode } from 'react'

type PopoverProps = {
	trigger: ReactNode
	triggerLabel: string
	title?: string
	description?: string
	children: ReactNode
}

export const Popover = ({ trigger, triggerLabel, title, description, children }: PopoverProps) => {
	return (
		<>
			<div className="popover">
				<ArkPopover.Root>
					{trigger && (
						<ArkPopover.Trigger className="btn-round" aria-label={triggerLabel}>
							{trigger}
						</ArkPopover.Trigger>
					)}
					<ArkPopover.Positioner>
						<ArkPopover.Content>
							{title && <ArkPopover.Title>{title}</ArkPopover.Title>}
							{description && <ArkPopover.Description>{description}</ArkPopover.Description>}
							{children}
							<ArkPopover.CloseTrigger className="btn-round">
								<IconClose />
							</ArkPopover.CloseTrigger>
						</ArkPopover.Content>
					</ArkPopover.Positioner>
				</ArkPopover.Root>
			</div>
		</>
	)
}
