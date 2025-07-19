const getHoursRange = (start: number, end: number): number[] => {
	end = end === 0 ? 24 : end
	return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
export { getHoursRange }
