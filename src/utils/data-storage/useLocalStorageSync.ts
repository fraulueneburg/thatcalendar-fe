import { useEffect } from 'react'

const useLocalStorageSync = <T>(key: string, data: T): void => {
	useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(data))
		} catch (error) {
			console.warn(`Failed to save ${key} to local storage:`, error)
		}
	}, [data])
}

export { useLocalStorageSync }
