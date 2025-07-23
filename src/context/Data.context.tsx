import { createContext, ReactNode, useContext, useState } from 'react'
import { CategoryType, CategoryIndexType, SessionType, SessionIndexType, TaskType } from '../types'

type CategoryStateType = { data: CategoryType[]; index: CategoryIndexType[] }
type SessionStateType = { data: SessionType[]; index: SessionIndexType[] }

interface DataContextType {
	categoryData: { data: CategoryType[]; index: CategoryIndexType[] }
	setCategoryData: React.Dispatch<React.SetStateAction<CategoryStateType>>
	taskData: TaskType[]
	setTaskData: React.Dispatch<React.SetStateAction<TaskType[]>>
	sessionsData: SessionStateType
	setSessionsData: React.Dispatch<React.SetStateAction<SessionStateType>>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

const DataContextWrapper = ({ children }: { children: ReactNode }) => {
	const [categoryData, setCategoryData] = useState<{ data: CategoryType[]; index: CategoryIndexType[] }>({
		data: [],
		index: [],
	})

	const [taskData, setTaskData] = useState<TaskType[]>([])

	const [sessionsData, setSessionsData] = useState<{ data: SessionType[]; index: SessionIndexType[] }>({
		data: [],
		index: [],
	})

	return (
		<DataContext.Provider
			value={{
				categoryData,
				setCategoryData,
				taskData,
				setTaskData,
				sessionsData,
				setSessionsData,
			}}>
			{children}
		</DataContext.Provider>
	)
}

const useDataContext = () => {
	const context = useContext(DataContext)
	if (!context) throw new Error('useDataContext must be used within a DataContextWrapper')
	return context
}

export { DataContextWrapper, useDataContext }
