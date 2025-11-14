// Arquivo: src/pages/Home/index.js
// Página principal (Home) do app - busca usuários do GitHub e lista repositórios.

// Importações de componentes, imagens, estilos e hooks
import { Header } from "../../components/Header";
import background from "../../assets/background.png";
import "./styles.css";
import ItemList from "../../components/ItemList";
import { useState } from "react";
import Button from "../../components/Button";
import {
  adaptUserToProfile,
  adaptRepoToItemList,
} from "../../adapters/GitHubAdapters";


function App() {
  // Estado que guarda o texto digitado no input (nome do usuário a buscar)
  const [user, setUser] = useState("");
  // Estado que guarda os dados do usuário adaptados para o perfil exibido
  const [currentUser, setCurrentUser] = useState(null);
  // Estado que guarda a lista de repositórios adaptados para exibição
  const [repos, setRepos] = useState(null);

  // Função assíncrona que realiza as requisições à API do GitHub
  async function handleFetch() {
    // Requisição para obter os dados do usuário
    const responseUser = await fetch(`https://api.github.com/users/${user}`);
    const userJSON = await responseUser.json();

    // Se existir um nome no retorno, adaptamos os dados ANTES de salvar no estado.
    // Os adaptadores (em adapters/GitHubAdapters) transformam a resposta da API
    // para o formato esperado pelos componentes desta aplicação.
    if (userJSON.name) {
      setCurrentUser(adaptUserToProfile(userJSON));
    }

    // Requisição para obter os repositórios do usuário
    const responseRepos = await fetch(
      `https://api.github.com/users/${user}/repos`
    );
    const reposJSON = await responseRepos.json();

    // Se houver repositórios, adaptamos cada item ANTES de salvar no estado.
    // Isso permite manter os componentes de exibição desacoplados do formato
    // cru da API do GitHub.
    if (reposJSON.length) {
      const adaptedRepos = reposJSON.map(adaptRepoToItemList);
      setRepos(adaptedRepos);
    }
  }

  return (
    <div className="App">
      {/* Header do aplicativo */}
      <Header />
      <div className="content">
        {/* Imagem de background da página */}
        <img src={background} className="background" alt="background-app"></img>
        <div className="info">
          <div>
            {/* Formulário de busca: previne recarregamento da página e chama handleFetch */}
            <form
              onSubmit={(evt) => {
                evt.preventDefault();
                handleFetch();
              }}
            >
              <input
                name="usuario"
                placeholder="@username"
                value={user}
                onChange={(evt) => setUser(evt.target.value)}
              />
              <Button type="submit">Buscar</Button>
            </form>
          </div>

          {/* Se currentUser estiver definido, exibe o perfil adaptado */}
          {currentUser ? (
            <div className="profile">
              <img
                src={currentUser.avatar_url}
                className="profile-pic"
                alt="profile-pic"
              />
              <div>
                {/* Link para o perfil no GitHub */}
                <a href={currentUser.html_url} target="blank">
                  <h3>{currentUser.name}</h3>
                </a>
                <span>@{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
          ) : null}

          <hr />

          <div>
            {/* Se repos estiver definido, renderiza a lista de repositórios */}
            {repos ? (
              <>
                <h4 className="repositorios">Repositórios</h4>
                {repos.map((repo, key) => (
                  <ItemList
                    key={key}
                    title={repo.title}
                    description={repo.description}
                    html_url={repo.html_url}
                  />
                ))}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
