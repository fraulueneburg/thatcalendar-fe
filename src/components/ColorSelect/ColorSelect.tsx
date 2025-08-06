import 'color-select.scss'
import { useEffect, useMemo, useRef, useState, useId } from 'react'

type DropdownListProps = {
	onColorChange: (color: string) => void
	selected?: string
}

export function ColorSelect({ selected, onColorChange }: DropdownListProps) {
	const colors = [
		{ value: '#04725D', bgValue: '#04493c' },
		{ value: '#15bca6', bgValue: '#0b6559' },
		{ value: '#1392ec', bgValue: '#0c568a' },
		{ value: '#1254d9', bgValue: '#0a214e' },
		{ value: '#625aff', bgValue: '#25225e' },
		{ value: '#f54772', bgValue: '#4d1724' },
		{ value: '#ff930f', bgValue: '#482905' },
		{ value: '#f9c406', bgValue: '#463701' },
	]

	const [isExpanded, setIsExpanded] = useState(false)
	const [selectedColor, setSelectedColor] = useState(selected)

	const ref = useRef<HTMLDivElement>(null)
	const uniqueId = useId()

	const colorsArr = useMemo(() => colors, [])

	const handleColorChange = (newColor: string) => {
		onColorChange(newColor)
		setSelectedColor(newColor)
		setIsExpanded(false)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>, color: string) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			handleColorChange(color)
		}
	}

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsExpanded(false)
			}
		}
		const handleClickOutside = (event: MouseEvent | FocusEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsExpanded(false)
			}
		}
		const listeners = [
			{ target: window, type: 'keydown', handler: handleEscape },
			{ target: document, type: 'mousedown', handler: handleClickOutside },
			{ target: document, type: 'focusin', handler: handleClickOutside },
		]
		listeners.forEach(({ target, type, handler }) => target.addEventListener(type, handler as EventListener))
		return () => {
			listeners.forEach(({ target, type, handler }) => target.removeEventListener(type, handler as EventListener))
		}
	}, [isExpanded])

	useEffect(() => {
		setSelectedColor(selected)
	}, [selected])

	return (
		<>
			<div className="dropdown-list" ref={ref}>
				<button
					type="button"
					className="toggle-color"
					aria-controls={`color-listbox-${uniqueId}`}
					aria-haspopup="listbox"
					aria-expanded={isExpanded}
					onClick={() => setIsExpanded((prev) => !prev)}>
					<span className="sr-only">select color</span>
					<div className="color-option" style={{ color: selectedColor }}></div>
				</button>
				{isExpanded && (
					<ul
						id={`color-listbox-${uniqueId}`}
						className="color-list"
						role="listbox"
						tabIndex={-1}
						aria-activedescendant={selectedColor}>
						{colorsArr.map((color) => (
							<li
								key={color.value}
								className="color-option"
								style={{ color: color.value }}
								role="option"
								aria-selected={selectedColor === color.value}
								onClick={() => handleColorChange(color.value)}
								onKeyDown={(e) => handleKeyDown(e, color.value)}
								tabIndex={0}>
								<span className="sr-only">{color.value}</span>
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	)
}
