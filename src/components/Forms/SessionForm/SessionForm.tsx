import './session-form.scss'
import { useState, useId } from 'react'
import { set, format, isBefore, isSameDay } from 'date-fns'
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
	onAfterSubmit?: () => void
}

export function SessionForm({ day, onAfterSubmit }: SessionFormProps) {
	const componentId = useId()
	const { categoryData, taskData, setTaskData, setSessionData } = useDataContext()
	const { data: categoryArr } = categoryData
	const mainCategories = categoryArr.filter((elem) => !elem.parent)

	const emptySession: SessionTypeNullable = { _id: '', dtStartUtc: '', dtEndUtc: '', parent: null }
	const [session, setSession] = useState<SessionTypeNullable>(emptySession)
	const taskId = session.parent

	const [categoryId, setCategoryId] = useState('')
	const [subCategoryId, setSubCategoryId] = useState('')
	const category = categoryArr.find((elem) => elem._id === categoryId)
	const filteredTasks = taskData.filter((elem: TaskType) => elem.parent === subCategoryId && elem.isDone === false)

	const filterByParent = (parent: string) => {
		return categoryArr.filter((elem) => elem.parent === parent) ?? []
	}

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

	const handleChangeSelectTask = (id: string) => {
		const selectedTask = taskData.find((elem) => elem._id === id)
		const sessionParent = selectedTask ? selectedTask._id : null

		setSession((prev) => ({ ...prev, parent: sessionParent }))
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
		setSessionData((prev) => ({ data: [...prev.data.filter((elem) => elem.parent !== id)], index: { ...prev.index } }))
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)

		const startH = Number(formData.get('startHour'))
		const startMin = Number(formData.get('startMinute'))
		const endH = Number(formData.get('endHour'))
		const endMin = Number(formData.get('endMinute'))

		const dtStart = set(day, { hours: startH, minutes: startMin, seconds: 0, milliseconds: 0 })
		const dtEnd = set(day, { hours: endH, minutes: endMin, seconds: 0, milliseconds: 0 })
		const dtStartUtcISO = dtStart.toISOString()
		const dtEndUtcISO = dtEnd.toISOString()

		if (!taskId) throw new Error('Can not add session. Session has no parent task.')
		if (isBefore(dtEnd, dtStart)) throw new Error('Can not add session. End time is before start time.')
		if (!isSameDay(dtStart, dtEnd)) throw new Error('Can not add session. Start and end time are not on the same day.')

		const dayKey = format(dtStart, 'yyyyMMdd') // local timezone

		const newSession: SessionType = {
			_id: nanoid(),
			dtStartUtc: dtStartUtcISO,
			dtEndUtc: dtEndUtcISO,
			parent: taskId,
		}

		setSessionData((prev) => ({
			data: [...prev.data, newSession],
			index: {
				...prev.index,
				[dayKey]: [...(prev.index[dayKey] ?? []), newSession._id],
			},
		}))
		onAfterSubmit?.()
		setSession(emptySession)
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="session-form">
				<h4>New Session</h4>
				<fieldset aria-labelledby={`${componentId}timelabel`}>
					<div id={`${componentId}timelabel`} className="legend">
						Time
					</div>
					<div className={`time-section`}>
						<div className="time-group">
							<Time
								title="starts at"
								titleHidden={true}
								defaultHour={hourNow}
								defaultMinute={minuteNow}
								namePrefix={'start'}
								required={true}
							/>
							<IconUntil weight="bold" aria-hidden="true" />
							<Time
								title="ends at"
								titleHidden={true}
								defaultHour={''}
								defaultMinute={''}
								namePrefix={'end'}
								required={true}
							/>
							<IconArrow className="icon icon-arrow" weight="bold" aria-hidden="true" />
							<Time title="duration" titleHidden={true} isDuration={true} />
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
					selectItemAction={handleChangeSelectTask}
					addItemAction={handleAddNewTask}
					deleteItemAction={handleDeleteTask}
					disabled={subCategoryId === ''}
					disabledPlaceholder={'Please choose a project first'}
				/>
				<div className={`field${taskId ? '' : ' disabled'}`}>
					<label>Notes</label>
					<textarea className="auto-sized" aria-disabled={!taskId} readOnly={!taskId} />
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
