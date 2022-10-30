import './App.css';

import { useEffect, useState } from 'react';

import Dados from './pages/Dados';
import Formulario from './pages/Formulario';

function App() {

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [submit, setSubmit] = useState(false)
  const [object, setObject] = useState();

  const sub = () => {
      submit ? setSubmit(false) : setSubmit(true)
  }

  const guardarDados = (object) => {
    setObject(object)
  }

  useEffect(() => {
    fetchCountry();
    fetchCity();
    
  }, [])

  const fetchCountry = async () => {
    await fetch('https://amazon-api.sellead.com/country', {
      method:'GET',
    })
    .then((resp) => resp.json())
    .then((data) => setCountries(data))
    .catch((err) => console.log(err))
  }

  const fetchCity = async () => {
    await fetch('https://amazon-api.sellead.com/city', {
      method:'GET'
    })
    .then((resp) => resp.json())
    .then((data) => setCities(data))
    .then((err) => console.log(err))
  }

  return (
    <main>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5">
            {!submit && (
              <Formulario cities={cities} countries={countries} sub={sub} guardarDados={guardarDados}/>
            )}
            {submit && (
              <Dados object={object} sub={sub}/>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
