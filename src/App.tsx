import '@radix-ui/themes/styles.css'
import './styles/App.scss'
import WeeklyCalendar from './components/WeeklyCalendar'
import Header from './components/Header'
import { Theme } from '@radix-ui/themes'

function App() {
	return (
		<>
			<Theme appearance="dark">
				<Header />
				<main>
					<WeeklyCalendar />
				</main>
			</Theme>
		</>
	)
}

export default App
