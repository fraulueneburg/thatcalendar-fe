import './styles/App.scss'
import { Calendar } from './components/Calendar'
import { Header } from './components/Header'
import { DataContextWrapper } from './context/Data.context'

function App() {
	return (
		<>
			<DataContextWrapper>
				<Header />
				<main>
					<Calendar />
				</main>
			</DataContextWrapper>
		</>
	)
}

export default App
