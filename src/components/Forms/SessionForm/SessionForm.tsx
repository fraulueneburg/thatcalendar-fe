import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { nanoid } from 'nanoid'

import { useDataContext } from '../../../context/Data.context'
import { TaskType } from '../../../types'
import { Combobox, Time } from '../../FormElements'

type SessionFormProps = {
	onSubmitAction?: React.FormEvent<HTMLFormElement>
}

export function SessionForm({ onSubmitAction }: SessionFormProps) {
	const { categoryData, taskData, setTaskData } = useDataContext()
	const { data: categoryArr } = categoryData

	const [category, setCategory] = useState('')
	const [subCategory, setSubCategory] = useState('')
	const mainCategories = categoryArr.filter((elem) => !elem.parent)
	const subCategories = categoryArr.filter((elem) => elem.parent === category)

	const filteredTasks = taskData.filter((elem: TaskType) => elem.parent === subCategory && elem.isDone === false)

	const [isAllDay, setisAllDay] = useState(false)
	const [hasTravelTime, setHasTravelTime] = useState(false)
	const [isSameReturnTime, setIsSameReturnTime] = useState(false)

	const now = new Date()
	const hourNow = format(now, 'HH')
	const minuteNow = format(now, 'mm')

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log(event.target)
	}

	const handleAddNewTask = (title: string) => {
		const newTask: TaskType = {
			_id: nanoid(),
			parent: subCategory,
			title: title,
			isDone: false,
		}
		setTaskData((prev) => [...prev, newTask])
		return newTask._id
	}

	const handleDeleteTask = (id: string) => {
		setTaskData(taskData.filter((elem) => elem._id !== id))
	}

	useEffect(() => {
		setSubCategory('')
	}, [category])

	return (
		<>
			<form onSubmit={handleSubmit}>
				<h4>New Session</h4>
				<p className="grid">
					<label>
						Category
						<select required onChange={(e) => setCategory(e.target.value)} name="parentsCategory">
							<option value="">–</option>
							{mainCategories.map((elem) => (
								<option value={elem._id} key={elem._id}>
									{elem.title}
								</option>
							))}
						</select>
					</label>
					<label>
						Project
						<select
							required
							onChange={(e) => setSubCategory(e.target.value)}
							disabled={category === ''}
							name="parentsParentCategory">
							<option value="">–</option>
							{subCategories.map((elem) => (
								<option value={elem._id} key={elem._id}>
									{elem.title}
								</option>
							))}
						</select>
					</label>
				</p>
				<Combobox
					title="Task"
					itemSingular="task"
					data={filteredTasks}
					addItemAction={handleAddNewTask}
					deleteItemAction={handleDeleteTask}
					disabled={subCategory === ''}
				/>
				<fieldset>
					<legend>Time</legend>
					<label>
						<input type="checkbox" name="isAllDay" checked={isAllDay} onChange={() => setisAllDay((prev) => !prev)} />
						all day
					</label>
					<div className="grid">
						<Time title="starts at" defaultHour={hourNow} defaultMinute={minuteNow} />
						<Time title="ends at" defaultHour={''} defaultMinute={''} />
					</div>
				</fieldset>
				<p>
					<label>
						<input
							type="checkbox"
							aria-controls="fs-travel-duration"
							checked={hasTravelTime}
							onChange={() => setHasTravelTime((prev) => !prev)}
						/>
						add travel duration
					</label>
				</p>
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
