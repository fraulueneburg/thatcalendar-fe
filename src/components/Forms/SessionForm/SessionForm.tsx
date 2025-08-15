import './session-form.scss'
import { useState, useId } from 'react'
import { format } from 'date-fns'
import { nanoid } from 'nanoid'

import { useDataContext } from '../../../context/Data.context'
import { CategoryType, SessionType, TaskType } from '../../../types'
import { Combobox, Time } from '../../FormElements'
import { ArrowRightIcon as IconArrow, MinusIcon as IconUntil } from '@phosphor-icons/react'
import { Checklist } from '../../FormElements/Checklist'

type Nullable<T> = {
	[K in keyof T]: T[K] | null
}

type SessionTypeNullable = Nullable<SessionType>

type SessionFormProps = {
	day: Date
}

export function SessionForm({ day }: SessionFormProps) {
	const componentId = useId()
	const { categoryData, taskData, setTaskData } = useDataContext()
	const { data: categoryArr } = categoryData
	const mainCategories = categoryArr.filter((elem) => !elem.parent)

	const [session, setSession] = useState<SessionTypeNullable>({ _id: '', dtStart: '', dtEnd: '', parent: null })
	const taskId = session.parent

	const [categoryId, setCategoryId] = useState('')
	const [subCategoryId, setSubCategoryId] = useState('')
	const category = categoryArr.find((elem) => elem._id === categoryId)
	const filteredTasks = taskData.filter((elem: TaskType) => elem.parent === subCategoryId && elem.isDone === false)

	const filterByParent = (parent: string) => {
		return categoryArr.filter((elem) => elem.parent === parent) ?? []
	}

	const [isAllDay, setisAllDay] = useState(false)
	const [hasTravelTime, setHasTravelTime] = useState(false)
	const [isSameReturnTime, setIsSameReturnTime] = useState(false)

	const now = new Date()
	const hourNow = format(now, 'HH')
	const minuteNow = format(now, 'mm')

	const handleChangeProject = (event: React.FormEvent<HTMLSelectElement>) => {
		const id = event.currentTarget.value
		const parentId = categoryArr.find((elem) => elem._id === id)?.parent || ''
		setCategoryId(parentId)
		setSubCategoryId(id)
		setSession((prev) => ({ ...prev, parent: null }))
	}

	const handleSelectTask = (id: string) => {
		const selectedTask = taskData.find((elem) => elem._id === id)
		setSession((prev) => ({ ...prev, parent: selectedTask ? selectedTask._id : null }))
	}

	const handleAddNewTask = (title: string) => {
		const newTaskId = nanoid()

		const newTask: TaskType = {
			_id: newTaskId,
			parent: subCategoryId,
			title: title,
			isDone: false,
			checklist: [],
		}
		setTaskData((prev) => [...prev, newTask])
		setSession((prev) => ({ ...prev, parent: newTaskId }))

		return newTask._id
	}

	const handleDeleteTask = (id: string) => {
		setTaskData(taskData.filter((elem) => elem._id !== id))
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		// onSubmitAction()
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="session-form">
				<h4>New Session</h4>
				<fieldset aria-labelledby={`${componentId}timelabel`}>
					<div id={`${componentId}timelabel`} className="legend">
						Time
					</div>
					<div className={`time-section${isAllDay ? ' disabled' : ''}`}>
						<label>
							<input type="checkbox" name="isAllDay" checked={isAllDay} onChange={() => setisAllDay((prev) => !prev)} />
							all day
						</label>
						<div className="time-group">
							<Time
								title="starts at"
								titleHidden={true}
								defaultHour={isAllDay ? '00' : hourNow}
								defaultMinute={isAllDay ? '00' : minuteNow}
								readonly={isAllDay}
							/>
							<IconUntil weight="bold" aria-hidden="true" />
							<Time
								title="ends at"
								titleHidden={true}
								defaultHour={isAllDay ? '23' : ''}
								defaultMinute={isAllDay ? '59' : ''}
								readonly={isAllDay}
							/>
							<IconArrow className="icon icon-arrow" weight="bold" aria-hidden="true" />
							<Time title="duration" titleHidden={true} isDuration={true} readonly={isAllDay} />
						</div>
					</div>
				</fieldset>
				<div className="field">
					<label htmlFor={`${componentId}project`}>Project</label>
					<div className="project-field">
						{category && (
							<div className="category" style={{ color: category.color }}>
								<span>{category?.title}</span> <IconArrow weight="bold" aria-hidden="true" />
							</div>
						)}

						<select
							id={`${componentId}project`}
							className="custom-select"
							onChange={handleChangeProject}
							name="parentsCategory"
							required>
							<option value="">–</option>
							{mainCategories.map((elem) => (
								<optgroup label={elem.title} key={elem._id}>
									{filterByParent(elem._id).map((e: CategoryType) => (
										<option value={e._id} key={e._id}>
											{e.title}
										</option>
									))}
								</optgroup>
							))}
						</select>
					</div>
				</div>
				<Combobox
					title="Task"
					itemSingular="task"
					data={filteredTasks}
					selectItemAction={handleSelectTask}
					addItemAction={handleAddNewTask}
					deleteItemAction={handleDeleteTask}
					disabled={subCategoryId === ''}
				/>
				<div className={`field${taskId ? '' : ' disabled'}`}>
					<label>Notes</label>
					<textarea className="auto-sized" aria-disabled={!taskId} readOnly={!taskId} value={!taskId ? 'empty' : ''} />
				</div>
				<fieldset className={`${taskId ? '' : 'disabled'}`} aria-labelledby={`${componentId}checklistlabel`}>
					<div id={`${componentId}checklistlabel`} className="legend">
						Checklist
					</div>
					<Checklist parentId={taskId || undefined} />
				</fieldset>
				<label>
					<input
						type="checkbox"
						aria-controls="fs-travel-duration"
						checked={hasTravelTime}
						onChange={() => setHasTravelTime((prev) => !prev)}
					/>
					add travel duration
				</label>
				{hasTravelTime && (
					<fieldset id="fs-travel-duration">
						<legend>Travel time</legend>
						<div className="grid">
							<div>
								<Time title="travel duration" isDuration={true} />
								<label>
									<input type="checkbox" checked={!isSameReturnTime} onChange={() => setIsSameReturnTime((prev) => !prev)} />
									same for return
								</label>
							</div>
							<div>{isSameReturnTime && <Time title="return duration" isDuration={true} />}</div>
						</div>
					</fieldset>
				)}
				<button type="submit">add session</button>
			</form>
		</>
	)
}
