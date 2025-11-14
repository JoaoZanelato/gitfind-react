// Arquivo: src/adapters/GitHubAdapters.js

/**
 * Padrão Adapter (Adaptador):
 * Esta função adapta o objeto "apiUser" vindo da API do GitHub
 * para o formato esperado pelo nosso componente de perfil.
 */
export const adaptUserToProfile = (apiUser) => {
  return {
    name: apiUser.name,
    avatar_url: apiUser.avatar_url,
    bio: apiUser.bio,
    login: apiUser.login,
    html_url: apiUser.html_url,
  };
};

/**
 * Padrão Adapter (Adaptador):
 * Esta função adapta o objeto "apiRepo" vindo da API do GitHub
 * para as props que o nosso componente <ItemList> espera.
 */
export const adaptRepoToItemList = (apiRepo) => {
  return {
    // A prop "title" do nosso componente recebe "name" da API
    title: apiRepo.name,

    // A prop "description" recebe "description"
    description: apiRepo.description,

    // A prop "html_url" tem o mesmo nome
    html_url: apiRepo.html_url,
  };
};