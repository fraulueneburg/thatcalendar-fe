import './checklist.scss'
import { useDataContext } from '../../../context/Data.context'
import { nanoid } from 'nanoid'
import { ChecklistItemType } from '../../../types'
import { useEffect, useState } from 'react'

type ChecklistProps = {
	parentId?: string
}

export function Checklist({ parentId }: ChecklistProps) {
	const { taskData, setTaskData } = useDataContext()
	const parentTask = taskData.find((elem) => elem._id === parentId)
	const checklist = parentTask?.checklist || []

	const [focusId, setFocusId] = useState<string | null>(null)
	const newItemDataId = 'new-item-field'

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const { key, target } = event
		const { value } = event.currentTarget

		if (key === 'Enter' && !event.shiftKey) {
			event.preventDefault()
			if (value.trim().length > 0) {
				const id = nanoid()
				handleAddNew({ _id: id, value: '', isDone: false })
				setFocusId(id)
			}
		}

		if (key === 'Backspace') {
			if (value === '') {
				event.preventDefault()
				const id = (target as HTMLElement).dataset.id

				if (id) {
					handleDelete(id)

					const li = event.currentTarget.closest('li')
					if (li) {
						const prevLi = li.previousElementSibling as HTMLLIElement | null
						const nextLi = li.nextElementSibling as HTMLLIElement | null

						const setFocus = (targetLi: HTMLLIElement) => {
							const prevField = targetLi.querySelector('textarea[data-id]') as HTMLTextAreaElement
							const fieldId = prevField?.dataset.id
							if (fieldId) setFocusId(fieldId)
						}

						const target = prevLi || nextLi
						if (target) setFocus(target)
					}
				}
			}
		}
	}

	const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
		const value = event.currentTarget.value
		const trimmedValue = event.currentTarget.value.trim()
		const id = (event.target as HTMLElement).dataset.id

		if (!parentTask || !parentId || !id) return

		if (id === newItemDataId) {
			const newId = nanoid()
			if (trimmedValue !== '') handleAddNew({ _id: newId, value: value, isDone: false })
			setFocusId(newId)
			return
		}

		if (value !== '' && trimmedValue === '') return

		// if only item left
		if (value === '' && checklist.length === 1) {
			handleDelete(id)
			setFocusId(newItemDataId)
			return
		}

		handleUpdate({ _id: id, value: value, isDone: false })
	}

	const handleAddNew = (newItem: ChecklistItemType) => {
		const updatedChecklist = [...checklist, newItem]
		setTaskData((prev) => prev.map((elem) => (elem._id === parentId ? { ...elem, checklist: updatedChecklist } : elem)))
	}

	const handleUpdate = (updatedItem: ChecklistItemType) => {
		const { _id: id } = updatedItem
		const updatedChecklist = checklist.map((elem) => (elem._id === id ? updatedItem : elem))
		setTaskData((prev) => prev.map((elem) => (elem._id === parentId ? { ...elem, checklist: updatedChecklist } : elem)))
	}

	const handleDelete = (id: string) => {
		const found = checklist.find((elem) => elem._id === id)

		if (!found) return

		const updatedChecklist = checklist.filter((elem) => elem._id !== id)
		setTaskData((prev) => prev.map((elem) => (elem._id === parentId ? { ...elem, checklist: updatedChecklist } : elem)))
	}

	useEffect(() => {
		if (!focusId) return
		const field = document.querySelector(`[data-id="${focusId}"]`) as HTMLFormElement
		if (field) field.focus()
		field.setSelectionRange(field.value.length, field.value.length)
	}, [focusId])

	return (
		<>
			<ul className="checklist">
				{parentTask && checklist.length > 0 ? (
					checklist.map((elem) => (
						<li key={elem._id} id={elem._id}>
							<input type="checkbox" />
							<textarea
								className="auto-sized"
								defaultValue={elem.value}
								data-id={elem._id}
								onChange={handleChange}
								onKeyDown={handleKeyDown}
							/>
						</li>
					))
				) : parentTask && checklist.length === 0 ? (
					<li key="new">
						<input type="checkbox" />
						<textarea className="auto-sized" data-id={newItemDataId} onChange={handleChange} onKeyDown={handleKeyDown} />
					</li>
				) : (
					<li key="placeholder" className="disabled">
						<input type="checkbox" aria-disabled={true} readOnly={true} />
						<textarea
							className="auto-sized"
							aria-disabled={true}
							readOnly={true}
							placeholder={'empty'}
							onChange={handleChange}
						/>
					</li>
				)}
			</ul>
		</>
	)
}
