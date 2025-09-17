import { Header } from "../../components/Header";
import background from "../../assets/background.png";
import "./styles.css";
import ItemList from "../../components/ItemList";
import { useState } from "react";
function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);
  async function handleFetch() {
    const responseUser = await fetch(`https://api.github.com/users/${user}`);
    const userJSON = await responseUser.json();
    if (userJSON.name) {
      const { name, avatar_url, bio, login } = userJSON;
      setCurrentUser({ name, avatar_url, bio, login });
    }

    const responseRepos = await fetch(
      `https://api.github.com/users/${user}/repos`
    );
    const reposJSON = await responseRepos.json();
    if (reposJSON.length) {
      setRepos(reposJSON);
    }
  }
  return (
    <div className="App">
      <Header />
      <div className="content">
        <img src={background} className="background" alt="background-app"></img>
        <div className="info">
          <div>
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
              <button type="submit">Buscar</button>
            </form>
          </div>
          {currentUser ? (
            <div className="profile">
              <img
                src={currentUser.avatar_url}
                className="profile-pic"
                alt="profile-pic"
              />
              <div>
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
            {repos ? (
              <>
                <h4 className="repositorios">Repositórios</h4>
                {repos.map((repo, key) => (
                  <ItemList
                    key={key}
                    title={repo.name}
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
