import Header from './components/Header'
import FirstRow from './components/FirstRow'
import SecondRow from './components/SecondRow'
import RunningTimeChart from './components/RunningTimeChart'

function App() {
  return (
    <div className="h-screen bg-white overflow-hidden">
      <Header />
      <div className="h-[calc(100vh-64px)] p-2">
        <FirstRow />
        <div className="mt-2">
          <SecondRow />
        </div>
        <div className="mt-2">
          <RunningTimeChart />
        </div>
      </div>
    </div>
  )
}

export default App