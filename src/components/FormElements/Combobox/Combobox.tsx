import './combobox.scss'
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { XIcon as IconDelete } from '@phosphor-icons/react'
import { CategoryType } from '../../../types'

type ComboboxProps = {
	title: string
	itemSingular: string
	data: CategoryType[]
	addItemAction: (title: string) => string
	deleteItemAction: (title: string) => void
	disabled?: boolean
}

export function Combobox({ title, itemSingular, data, addItemAction, deleteItemAction, disabled }: ComboboxProps) {
	const wrapperRef = useRef<HTMLDivElement | null>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const componentId = `combobox:${useId()}:`
	const createNewId = `${componentId}create-new`

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

	const getItemDomId = (id: string) => {
		return `${componentId}${id}`
	}

	const highlightedId = useMemo(() => {
		if (highlightedIndex === null) return null

		if (filteredData.length > 0 && highlightedIndex !== filteredData.length) {
			const item = filteredData[highlightedIndex]
			return item ? getItemDomId(item._id) : null
		} else {
			return createNewId
		}
	}, [highlightedIndex, filteredData, createNewId])

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
		inputRef.current?.focus()
		setIsOpen(false)
	}

	const handleAddNew = () => {
		if (query.trim().length < 1) return
		const id = addItemAction(query)
		setSelectedId(id)
		setQuery('')
		inputRef.current?.focus()
		setIsOpen(false)
	}

	const handleDelete = (id: string) => (event: React.SyntheticEvent<HTMLButtonElement>) => {
		event.stopPropagation()
		if (selectedId === id) setSelectedId('')
		deleteItemAction(id)
		inputRef.current?.focus()
		setIsOpen(true)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.altKey && event.key === 'ArrowDown') {
			if (!isOpen) {
				setIsOpen(true)
				setHighlightedIndex(null)
			}
			return
		}

		if (event.altKey && event.key === 'ArrowUp') {
			if (isOpen) {
				setIsOpen(false)
				setHighlightedIndex(null)
			}
			return
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
			setIsOpen(true)
		}
	}

	useEffect(() => {
		if (query.length > 0) setHighlightedIndex(null)
	}, [query])

	useLayoutEffect(() => {
		const selectedItemStillValid = data.some((elem) => elem._id === selectedId)
		if (!selectedItemStillValid) setSelectedId('')
	}, [data])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setIsOpen(false)
				setHighlightedIndex(null)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<>
			<div ref={wrapperRef} data-scope="combobox">
				<div data-part="root" id={`${componentId}`}>
					<label data-part="label" htmlFor={`${componentId}input`}>
						{title}
					</label>
					<div
						data-part="control"
						id={`${componentId}control`}
						aria-controls={`${componentId}content`}
						aria-expanded={isOpen}
						aria-haspopup="listbox"
						role="combobox">
						{selectedItem && (
							<>
								<div data-part="selected-item">
									<strong id={`${componentId}selected-value-desc`} className="sr-only">
										Selected {itemSingular}:
									</strong>
									<div id={`${componentId}selected-value`} aria-describedby={`${componentId}selected-value-desc`}>
										{selectedItem.title}
									</div>
									<button
										type="button"
										data-part="clear-trigger"
										id={`${componentId}clear-btn`}
										className="btn-icon-mini"
										aria-label={`remove selected ${itemSingular} "${selectedItem.title}"`}
										onClick={handleClear}>
										<IconDelete aria-hidden="true" weight="bold" />
									</button>
								</div>
							</>
						)}
						<input
							type="text"
							id={`${componentId}input`}
							data-part="input"
							aria-activedescendant={highlightedId ? highlightedId : ''}
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="none"
							spellCheck="false"
							aria-autocomplete="list"
							aria-controls={`${componentId}content`}
							aria-expanded={isOpen}
							aria-haspopup="listbox"
							disabled={disabled}
							placeholder={
								selectedId
									? ''
									: filteredData.length > 0
									? `Search for a ${itemSingular} or create a new one`
									: `Create your first ${itemSingular}.`
							}
							value={query}
							onFocus={handleFocus}
							onClick={handleFocus}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							ref={inputRef}
						/>
					</div>
				</div>
				<div data-part="positioner" id={`${componentId}popper`}>
					<div
						data-part="content"
						id={`${componentId}content`}
						role="listbox"
						hidden={!isOpen}
						aria-labelledby={`${componentId}listbox-desc`}>
						<small id={`${componentId}listbox-desc`}>
							{filteredData.length > 0 ? `Select a ${itemSingular} or create a new one` : 'No options yet'}
						</small>
						{filteredData?.map((elem, index) => {
							const isHighlighted = highlightedIndex === index
							const isSelected = elem._id === selectedId

							return (
								<div
									key={elem._id}
									id={getItemDomId(elem._id)}
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
										tabIndex={-1}
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
