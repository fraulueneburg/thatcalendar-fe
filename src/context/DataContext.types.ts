import { CategoryType, CategoryIndexType, SessionType, SessionIndexType, TaskType } from '../types'

export type CategoryStateType = { data: CategoryType[]; index: CategoryIndexType }
export type SessionStateType = { data: SessionType[]; index: SessionIndexType }

export interface DataContextType {
	categoryData: CategoryStateType
	setCategoryData: React.Dispatch<React.SetStateAction<CategoryStateType>>
	taskData: TaskType[]
	setTaskData: React.Dispatch<React.SetStateAction<TaskType[]>>
	sessionData: SessionStateType
	setSessionData: React.Dispatch<React.SetStateAction<SessionStateType>>
}
