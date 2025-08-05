import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { XIcon as IconDelete } from '@phosphor-icons/react'
import { CategoryType } from '../types'

type ComboboxProps = {
	title: string
	data: CategoryType[]
	newItemAction: (title: string) => string
	deleteItemAction: (title: string) => void
	disabled?: boolean
}

export function Combobox({ title, data, newItemAction, deleteItemAction, disabled }: ComboboxProps) {
	const wrapperRef = useRef<HTMLDivElement | null>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const uniqueId = `combobox:${useId()}:`
	const createNewId = `${uniqueId}-create-new`

	const [isOpen, setIsOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [selectedId, setSelectedId] = useState('')
	const selectedItem = useMemo(() => data.find((item) => item._id === selectedId), [selectedId, data])

	const filteredData = useMemo(
		() => data.filter((elem) => elem.title.toLowerCase().includes(query.trim().toLowerCase())),
		[data, query]
	)

	const hasCreateNew = query.trim().length > 0 && !filteredData.some((elem) => elem.title === query.trim())
	const createNewIndex = !hasCreateNew ? null : filteredData?.length > 0 ? filteredData.length : 0
	const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
	const highlightedId = ''

	const handleFocus = () => {
		setIsOpen(true)
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value
		setQuery(inputValue)
		if (!isOpen && inputValue.length > 0) setIsOpen(true)
	}

	const handleClear = () => {
		setSelectedId('')
		inputRef.current?.focus()
	}

	const handleSelect = (id: string) => (event: React.SyntheticEvent<HTMLDivElement>) => {
		event?.stopPropagation()
		setSelectedId(id)
		setQuery('')
		setIsOpen(false)
		inputRef.current?.focus()
	}

	const handleAddNew = () => {
		if (query.trim().length < 1) return
		const id = newItemAction(query)
		setSelectedId(id)
		setQuery('')
	}

	const handleDelete = (id: string) => (event: React.SyntheticEvent<HTMLButtonElement>) => {
		event.stopPropagation()
		if (selectedId === id) setSelectedId('')
		deleteItemAction(id)
		inputRef.current?.focus()
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'Enter') {
			setHighlightedIndex(null)
		}

		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			const hasNoData = (!filteredData || filteredData.length === 0) && !hasCreateNew

			if (hasNoData) return

			if (!isOpen) {
				setIsOpen(true)
			}

			const dataLength = hasCreateNew ? filteredData.length + 1 : filteredData.length
			const lastIndex = dataLength - 1

			if (event.key === 'ArrowDown') {
				setHighlightedIndex((prev) => (prev === null || prev === lastIndex ? 0 : prev + 1))
			}
			if (event.key === 'ArrowUp') {
				setHighlightedIndex((prev) => (prev === null || prev === 0 ? lastIndex : prev - 1))
			}
		}

		if (event.key === 'Enter') {
			event.preventDefault()
			const hasQuery = query.trim().length > 0
			const hasHighlighted = highlightedIndex !== null && highlightedIndex !== createNewIndex

			if (hasHighlighted) {
				const id = filteredData[highlightedIndex]._id
				setSelectedId(id)
				setHighlightedIndex(null)
				return
			}
			if (hasQuery) {
				const existingItem = query.trim().length > 0 && data.find((elem) => elem.title === query)

				if (existingItem) {
					setSelectedId(existingItem._id)
					setQuery('')
				} else {
					handleAddNew()
				}
				setHighlightedIndex(null)
			}
		}

		if (event.key === 'Escape') {
			event.preventDefault()

			if (highlightedIndex !== null) {
				event.stopPropagation()
				setHighlightedIndex(null)
				setIsOpen(false)
				return
			}

			if (query) {
				event.stopPropagation()
				setQuery('')
			} else if (!query && isOpen) {
				event.stopPropagation()
				setIsOpen(false)
			}
		}

		if (event.key === 'Backspace' && query.length === 0 && selectedItem?.title !== '') {
			setSelectedId('')
		}
	}

	useLayoutEffect(() => {
		const selectedItemStillValid = data.some((elem) => elem._id === selectedId)

		if (!selectedItemStillValid) {
			setSelectedId('')
		}
	}, [data])

	// useEffect(() => {
	// 	const handleClickOrFocus = (event: MouseEvent | FocusEvent) => {
	// 		const target = event.target
	// 		console.log('target', target)

	// 		if (target instanceof HTMLElement) {
	// 			console.log('data part', target.getAttribute('data-part'))
	// 		}

	// 		// if (wrapperRef.current && event.target instanceof Node && !wrapperRef.current.contains(event.target)) {
	// 		// 	setIsOpen(false)
	// 		// }
	// 	}

	// 	document.addEventListener('mousedown', handleClickOrFocus)
	// 	document.addEventListener('focusin', handleClickOrFocus)

	// 	return () => {
	// 		document.removeEventListener('mousedown', handleClickOrFocus)
	// 		document.removeEventListener('focusin', handleClickOrFocus)
	// 	}
	// }, [wrapperRef])

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
						{selectedItem && (
							<>
								<div data-part="selected-item">
									<strong id={`${uniqueId}selected-value-desc`} className="sr-only">
										Selected {title.toLowerCase()}:
									</strong>
									<div id={`${uniqueId}selected-value`} aria-describedby={`${uniqueId}selected-value-desc`}>
										{selectedItem.title}
									</div>
									<button
										type="button"
										data-part="clear-trigger"
										id={`${uniqueId}clear-btn`}
										className="btn-icon-mini"
										aria-label={`remove selected ${title.toLowerCase()} "${selectedItem.title}"`}
										onClick={handleClear}>
										<IconDelete aria-hidden="true" weight="bold" />
									</button>
								</div>
							</>
						)}
						<input
							type="text"
							id={`${uniqueId}input`}
							data-part="input"
							aria-activedescendant={highlightedId}
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="none"
							spellCheck="false"
							aria-autocomplete="list"
							aria-controls={`${uniqueId}content`}
							aria-expanded={isOpen}
							aria-haspopup="listbox"
							disabled={disabled}
							placeholder={selectedId ? '' : 'Search for an option …'}
							value={query}
							onFocus={handleFocus}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							ref={inputRef}
						/>
					</div>
				</div>
				<div data-part="positioner" id={`${uniqueId}popper`}>
					<div
						data-part="content"
						id={`${uniqueId}content`}
						role="listbox"
						hidden={!isOpen}
						aria-labelledby={`${uniqueId}label`}>
						{filteredData?.map((elem, index) => {
							const isHighlighted = highlightedIndex === index
							const isSelected = elem._id === selectedId

							return (
								<div
									key={elem._id}
									id={`${uniqueId}-${elem._id}`}
									role="option"
									data-part="item"
									data-highlighted={isHighlighted}
									onClick={(event) => handleSelect(elem._id)(event)}
									onMouseEnter={() => setHighlightedIndex(index)}
									onMouseLeave={() => setHighlightedIndex(null)}
									aria-selected={isSelected}>
									<span data-part="item-text">
										{elem.title}
										{isSelected && ' 👈'}
									</span>
									<button
										type="button"
										className="btn-icon-mini"
										aria-label={`delete ${elem.title}`}
										onClick={(event) => handleDelete(elem._id)(event)}>
										<IconDelete aria-hidden="true" weight="bold" />
									</button>
								</div>
							)
						})}
						{hasCreateNew && (
							<>
								<div
									key={'create-option'}
									id={createNewId}
									role="option"
									data-part="item"
									data-highlighted={highlightedIndex === createNewIndex}
									onMouseEnter={() => setHighlightedIndex(createNewIndex)}
									onMouseLeave={() => setHighlightedIndex(null)}
									onClick={handleAddNew}>
									<span data-part="item-text">
										create <strong>“{query}”</strong>
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
