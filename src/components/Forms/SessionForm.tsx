import { useEffect, useState } from 'react'
import { useDataContext } from '../../context/Data.context'
import { TaskType } from '../../types'

import { dayStartHour, dayEndHour } from '../../data/user-settings'
import { convertToTime } from '../../utils/time'
import { Combobox } from '../Combobox'
import { nanoid } from 'nanoid'

type SessionFormProps = {
	onSubmitAction?: React.FormEvent<HTMLFormElement>
}

export default function SessionForm({ onSubmitAction }: SessionFormProps) {
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

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log(event.target)
	}

	const handleAddNewTask = (title: string) => {
		const newId = nanoid()
		const newTask: TaskType = {
			_id: newId,
			parent: subCategory,
			title: title,
			isDone: false,
		}
		setTaskData((prev) => [...prev, newTask])
		return newId
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
					data={filteredTasks}
					newItemAction={handleAddNewTask}
					deleteItemAction={handleDeleteTask}
					disabled={subCategory === ''}
				/>
				<fieldset>
					<legend>Time</legend>
					<label>
						<input type="checkbox" name="isAllDay" checked={isAllDay} onChange={() => setisAllDay((prev) => !prev)} />
						all day
					</label>
					<div className="grid field-time-slot">
						<div>
							<label htmlFor="slot-start-time">starts at</label>
							<input
								type="time"
								name="dtStartTime"
								id="slot-start-time"
								min={convertToTime(dayStartHour)}
								max={convertToTime(dayEndHour)}
								disabled={isAllDay}
								required
							/>
							<div className="validity">enter at least {convertToTime(dayStartHour)}</div>
						</div>
						<div>
							<label htmlFor="slot-end-time">ends at</label>
							<input
								type="time"
								name="dtEndTime"
								id="slot-end-time"
								min={convertToTime(dayStartHour)}
								max={convertToTime(dayEndHour)}
								disabled={isAllDay}
								required
							/>
							<div className="validity">enter at most {convertToTime(dayEndHour)}</div>
						</div>
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
						<legend>Travel duration</legend>
						<div>
							<label htmlFor="travel-time">
								travel time
								<input required id="travel-time" type="time" name="travel-start-time" />
							</label>
						</div>
						<div>
							<div>
								<label>
									<input type="checkbox" checked={!isSameReturnTime} onChange={() => setIsSameReturnTime((prev) => !prev)} />
									same return time
								</label>
							</div>
							{isSameReturnTime && (
								<label htmlFor="travel-return-time">
									travel return time
									<input
										required
										id="travel-return-time"
										type="time"
										name="travel-return-time"
										disabled={!isSameReturnTime}
									/>
								</label>
							)}
						</div>
					</fieldset>
				)}
				<button type="submit">add session</button>
			</form>
		</>
	)
}
