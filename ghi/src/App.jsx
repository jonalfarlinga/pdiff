import './styles/App.css';
import { useState } from 'react';
import Form from './components/Form'


function App() {
  const [uniStyle, setUniStyle] = useState(null)
  return (
    <div
      className=
        { "App " + (uniStyle ? uniStyle : null) }
    >
      <header
        className=
          { "App-header " + (uniStyle ? uniStyle + "-header" : null) }
      >
        <img className="mt-3 hero" src="./calends512.png" alt="logo" />
      </header>
      <div
        className=
          { "fade-border " +
            (uniStyle ? "fade-border-" + uniStyle : null) }
      >
        <h1>PDiF</h1>
      </div>
      <main>
        <button
          type="button"
          className=
            { "btn btn-primary " + (uniStyle ? "btn-" + uniStyle : null) }
          data-bs-toggle="modal"
          data-bs-target="#welcomeModal">
            About
        </button>

        <div id="App-box" className="container mx-auto col m-3">
            <Form uniStyle={uniStyle} setUniStyle={setUniStyle} />
        </div>

      </main>
      <footer>
        <a href="https://github.com/jonalfarlinga/pdiff">PDiF Github Project</a>
      </footer>
    </div>
  );
}

export default App;
