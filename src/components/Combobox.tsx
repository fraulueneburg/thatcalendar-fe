import { useId, useRef, useState } from 'react'
import { useCloseOnClickOutside } from '../utils/useCloseOnClickOutside'
import { CaretDownIcon as IconOpen, XIcon as IconClose } from '@phosphor-icons/react'
import { CategoryType } from '../types'

type ComboboxProps = {
	title: string
	data: CategoryType[]
	newItemAction: (title: string) => void
	disabled?: boolean
}

export function Combobox({ title, data, newItemAction, disabled }: ComboboxProps) {
	const wrapperRef = useRef<HTMLDivElement | null>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	const [isOpen, setIsOpen] = useState(false)
	const [selectedId, setSelectedId] = useState('')
	const [currentTaskName, setCurrentTaskName] = useState('')
	const [query, setQuery] = useState('')

	const uniqueId = `combobox:${useId()}:`
	const filteredData = data.filter((elem) => elem.title.toLowerCase().includes(query.toLowerCase()))

	const handleFocus = () => {
		setIsOpen(true)
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const formValue = event.target.value
		setQuery(formValue)
	}

	const handleClear = () => {
		setSelectedId('')
		setCurrentTaskName('')
		inputRef.current?.focus()
	}

	const handleSelect = (id: string, title: string) => {
		setSelectedId(id)
		setCurrentTaskName(title)

		setQuery('')
		setIsOpen(false)
	}

	const handleAddNewTask = () => {
		newItemAction(query)
		setCurrentTaskName(query)

		setQuery('')
		setIsOpen(false)
	}

	// useCloseOnClickOutside({
	// 	ref: wrapperRef,
	// 	onCloseAction: () => setIsOpen(false),
	// })

	return (
		<>
			<div ref={wrapperRef} data-scope="combobox">
				<div data-part="root" id={`${uniqueId}`}>
					<label data-part="label" htmlFor={`${uniqueId}input`} id={`${uniqueId}label`}>
						{title} <small>(select an option or create a new one)</small>
					</label>
					<div
						data-part="control"
						id={`${uniqueId}control`}
						aria-controls={`${uniqueId}content`}
						aria-expanded={isOpen}
						aria-haspopup="listbox"
						role="combobox">
						{currentTaskName && (
							<>
								<div data-part="selected-item">
									<strong id={`${uniqueId}selected-value-desc`} className="sr-only">
										Selected task:
									</strong>
									<div id={`${uniqueId}selected-value`} aria-describedby={`${uniqueId}selected-value-desc`}>
										{currentTaskName}
									</div>
									<button
										data-part="clear-trigger"
										id={`${uniqueId}clear-btn`}
										type="button"
										aria-label={`remove selected task ${currentTaskName}`}
										aria-controls={`${uniqueId}input`}
										onClick={handleClear}>
										<IconClose aria-hidden="true" weight="bold" />
									</button>
								</div>
							</>
						)}
						<input
							type="text"
							id={`${uniqueId}input`}
							data-part="input"
							aria-activedescendant={''}
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="none"
							spellCheck="false"
							aria-autocomplete="list"
							aria-controls={`${uniqueId}content`}
							aria-expanded={isOpen}
							aria-haspopup="listbox"
							disabled={disabled}
							value={query}
							onFocus={handleFocus}
							onChange={handleChange}
							ref={inputRef}
						/>
					</div>
				</div>

				<div data-part="positioner" id={`${uniqueId}popper`} aria-hidden={!isOpen}>
					<div
						data-part="content"
						id={`${uniqueId}content`}
						role="listbox"
						hidden={!isOpen}
						aria-labelledby={`${uniqueId}label`}>
						{filteredData?.map((elem) => (
							<div
								key={elem._id}
								role="option"
								aria-selected={elem._id === selectedId}
								onClick={() => handleSelect(elem._id, elem.title)}
								data-part="item"
								data-value={elem._id}>
								<span data-part="item-text">{elem.title}</span>
							</div>
						))}
						{query.length > 0 && !filteredData.some((elem) => elem.title === query) && (
							<>
								<hr />
								<div role="option" aria-selected="false" data-part="item" onClick={handleAddNewTask} data-value={''}>
									<span data-part="item-text">
										create <strong>{query}</strong>
									</span>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
