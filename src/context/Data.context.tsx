import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { TaskType } from '../types'
import { getInitialData, useLocalStorageSync } from '../utils/data-storage'
import { CategoryStateType, DataContextType, SessionStateType } from './DataContext.types'

const DataContext = createContext<DataContextType | undefined>(undefined)

const DataContextWrapper = ({ children }: { children: ReactNode }) => {
	const [categoryData, setCategoryData] = useState<CategoryStateType>(() =>
		getInitialData('categoryData', { data: [], index: {} })
	)

	const [taskData, setTaskData] = useState<TaskType[]>(() => getInitialData('taskData', []))

	const [sessionData, setSessionData] = useState<SessionStateType>(() =>
		getInitialData('sessionData', { data: [], index: {} })
	)

	useLocalStorageSync('categoryData', categoryData)
	useLocalStorageSync('taskData', taskData)
	useLocalStorageSync('sessionData', sessionData)

	const dataContextValue = useMemo(
		() => ({
			categoryData,
			setCategoryData,
			taskData,
			setTaskData,
			sessionData,
			setSessionData,
		}),
		[categoryData, taskData, sessionData]
	)

	return <DataContext.Provider value={dataContextValue}>{children}</DataContext.Provider>
}

const useDataContext = () => {
	const context = useContext(DataContext)
	if (!context) throw new Error('useDataContext must be used within a DataContextWrapper')
	return context
}

export { DataContextWrapper, useDataContext }
