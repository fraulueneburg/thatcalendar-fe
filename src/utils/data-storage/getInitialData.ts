const getInitialData = <T>(key: string, fallback: T): T => {
	try {
		const stored = localStorage.getItem(key)
		if (stored) return JSON.parse(stored)
	} catch (error) {
		console.warn(`Failed to catch ${key}`, error)
	}
	return fallback
}

export { getInitialData }
