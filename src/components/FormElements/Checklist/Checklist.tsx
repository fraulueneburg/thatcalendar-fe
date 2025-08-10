import './checklist.scss'
import { useState } from 'react'
import { useDataContext } from '../../../context/Data.context'
import { nanoid } from 'nanoid'
import { ChecklistItemType, TaskType } from '../../../types'

type ChecklistProps = {
	parentId?: string
}

export function Checklist({ parentId }: ChecklistProps) {
	const emptyItem: ChecklistItemType = { _id: '', value: '', isDone: false }

	const { taskData, setTaskData } = useDataContext()
	const parentTask = taskData.find((elem) => elem._id === parentId)
	const checklist = parentTask?.checklist || [emptyItem]

	const [newListItem, setNewListItem] = useState<ChecklistItemType>(emptyItem)

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const { key, target } = event
		const { value } = event.currentTarget

		// if (key === 'Enter' && !event.shiftKey) {
		// 	event.preventDefault()
		// 	if (newListItem.value.trim().length > 0) {
		// 		addItem()
		// 		setNewListItem(emptyItem)
		// 	}
		// }

		// if (key === 'Backspace') {
		// 	if (value === '') {
		// 		event.preventDefault()

		// 		const element = target as HTMLElement
		// 		const id = element.dataset.id

		// 		if (id) deleteItem(id)
		// 	}
		// }
	}

	const addItem = () => {
		if (!parentId || !parentTask || newListItem.value !== '') return

		const listItem = { ...newListItem, _id: nanoid() }
		const updatedTask = { ...parentTask, checklist: [...(parentTask.checklist ?? []), listItem] }

		setTaskData((prev) => prev.map((elem) => (elem._id === updatedTask._id ? updatedTask : elem)))
	}

	const deleteItem = (id: string) => {
		if (!parentId || !parentTask) return
		const updatedChecklist = checklist?.filter((elem) => elem._id !== id)
		const updatedTask = { ...parentTask, checklist: updatedChecklist }

		setTaskData((prev) => [...prev, updatedTask])
	}

	return (
		<>
			<ul className="checklist">
				{parentTask && checklist ? (
					checklist?.map((elem) => (
						<li key={elem._id} id={elem._id}>
							<input type="checkbox" checked={elem.isDone} />
							<textarea className="auto-sized" defaultValue={elem.value} data-id={elem._id} onKeyDown={handleKeyDown} />
						</li>
					))
				) : (
					<li className="disabled">
						<input type="checkbox" checked={false} aria-disabled={true} readOnly={true} />
						<textarea className="auto-sized" aria-disabled={true} readOnly={true} placeholder={'empty'} />
					</li>
				)}

				{/* <li>
					<input
						type="checkbox"
						checked={newListItem.isDone}
						onChange={(event) => setNewListItem((prev) => ({ ...prev, isDone: event.target.checked }))}
					/>
					<textarea
						className="auto-sized"
						onKeyDown={handleKeyDown}
						value={newListItem.value}
						onChange={(event) => setNewListItem((prev) => ({ ...prev, value: event.target.value }))}
					/>
				</li> */}
			</ul>
		</>
	)
}
