import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useCloseOnClickOutside } from '../utils/useCloseOnClickOutside'
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

	const [isOpen, setIsOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [selectedId, setSelectedId] = useState('')
	const selectedItem = useMemo(() => data.find((item) => item._id === selectedId), [selectedId, data])

	const filteredData = useMemo(
		() => data.filter((elem) => elem.title.toLowerCase().includes(query.toLowerCase())),
		[data, query]
	)

	const showCreateNew = query.length > 0 && !filteredData.some((elem) => elem.title === query)

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
		event.stopPropagation()
		setSelectedId(id)
		setQuery('')
		setIsOpen(false)
	}

	const handleAddNew = () => {
		const id = newItemAction(query)
		setSelectedId(id)
		setQuery('')
	}

	const handleDelete = (id: string) => (event: React.SyntheticEvent<HTMLButtonElement>) => {
		event.stopPropagation()
		if (selectedId === id) setSelectedId('')
		deleteItemAction(id)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault()

			const existingItem = data.find((elem) => elem.title === query)

			if (existingItem) {
				setSelectedId(existingItem._id)
				setQuery('')
			} else {
				handleAddNew()
			}
		}

		if (event.key === 'Escape') {
			event.preventDefault()
			event.stopPropagation()

			if (query) {
				setQuery('')
			} else {
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
							aria-activedescendant={`${uniqueId}role-${selectedId}`}
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
						{filteredData?.map((elem) => (
							<div
								key={elem._id}
								role="option"
								id={`${uniqueId}role-${elem._id}`}
								aria-selected={elem._id === selectedId}
								onClick={(event) => handleSelect(elem._id)(event)}
								data-part="item"
								data-value={elem._id}>
								<span data-part="item-text">{elem.title}</span>
								<button
									type="button"
									className="btn-icon-mini"
									aria-label={`delete ${elem.title}`}
									onClick={(event) => handleDelete(elem._id)(event)}>
									<IconDelete aria-hidden="true" weight="bold" />
								</button>
							</div>
						))}
						{showCreateNew && (
							<>
								<div
									role="option"
									aria-selected={!selectedId && query.length > 0}
									data-part="item"
									onClick={handleAddNew}
									data-value={''}>
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
