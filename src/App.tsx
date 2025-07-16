import './styles/App.scss'
import WeeklyCalendar from './components/WeeklyCalendar'
import Header from './components/Header'

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
