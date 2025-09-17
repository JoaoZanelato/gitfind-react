import { Header } from "../../components/Header";
import background from '../../assets/background.png'
import './styles.css'
function App() {
  return <div className="App">
    <Header/>
    <div className="content">
      <img src={background} className="background" alt="background-app">
      </img>
      <div className="info">
        <div>
          <input name="usuario" placeholder="@username"/>
          <button>Buscar</button>
        </div>
        <div className="profile">
          <img src="https://avatars.githubusercontent.com/u/127459520?v=4" className="profile-pic" alt="profile-pic"/>
          <div>
            <h3>
              João Zanelato
            </h3>
            <span>
              @JoaoZanelato
            </span>
            <p>
              Descrição
            </p>
          </div>
        </div>
        <hr/>
      </div>
    </div>
  </div>;
}

export default App;
