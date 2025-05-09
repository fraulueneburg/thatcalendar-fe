import './App.css'

import SingleCalendar from './SingleCalendar'
import WeeklyCalendar from './WeeklyCalendar'

import calRot from './data/ical/rot.json'
import calPink from './data/ical/pink.json'
import calGrau from './data/ical/grau.json'

const selectedCal = calGrau

function App() {
	return (
		<>
			<WeeklyCalendar />
			<SingleCalendar cal={selectedCal} />
		</>
	)
}

export default App
