import './App.css'
import CreateSpecForm from './components/CreateSpecForm'
import Spec from "./components/Spec"
import SearchField from "./components/SearchField"
import { useEffect, useState } from 'react'
import { FetchSpecs } from './services/specs'

function App() {
  const [specs, setSpecs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let specsResponse = await FetchSpecs();
      setSpecs(specsResponse);
    }
    fetchData();
  }, [])

  const onCreate = () => {
    
  }

  return (
  <section>
    <div>
      <CreateSpecForm onCreate={onCreate} />
      <SearchField />
    </div>
      <ul>
        {specs.map((n, index) => (
          <li key={index}>
            <Spec title={n.title} description={n.description}/>
          </li>
        ))}

      </ul>
  </section>)
}

export default App