import './styles/App.scss'
import WeeklyCalendar from './components/WeeklyCalendar'
import Header from './components/Header'

// import calRot from './data/ical/rot.json'
// import calPink from './data/ical/pink.json'
// import calGrau from './data/ical/grau.json'
// const selectedCal = calGrau

function App() {
	return (
		<>
			<Header />
			<main>
				<WeeklyCalendar />
			</main>
		</>
	)
}

export default App
