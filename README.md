# Steam Dashboard com SvelteKit

Projeto front-end com SvelteKit para consultar dados da Steam, exibindo noticias, perfil, biblioteca, amigos e detalhes de jogos a partir da Steam Web API.

## O que o projeto faz

- Exibe noticias de um jogo na pagina inicial.
- Lista os jogos da biblioteca do usuario configurado.
- Mostra detalhes de um jogo, incluindo descricao, preco, plataformas, screenshots e conquistas.
- Consulta perfil publico por SteamID.
- Lista amigos da conta configurada.
- Permite alternar tema pela interface.
- Trata de forma segura jogos sem conquistas ou sem estatisticas na Steam API, sem quebrar a aplicacao.

## Tecnologias usadas

- Svelte 5
- SvelteKit 2
- TypeScript
- Vite
- Tailwind CSS 4
- Steam Web API

## Requisitos

- Node.js 20 ou superior
- pnpm
- Chave da Steam Web API
- Um SteamID valido para consulta

## Configuracao

Instale as dependencias:

```sh
pnpm install
```

Depois de baixar o projeto, crie um arquivo `.env` na raiz com sua chave da API da Steam e o seu SteamID:

```env
STEAM_API_KEY=sua_chave_da_steam_api
MY_STEAM_ID=seu_steamid
```

### Como obter os dados do `.env`

- `STEAM_API_KEY`: gere sua chave no portal da Steam Web API.
- `MY_STEAM_ID`: use o SteamID64 da conta que sera usada nas rotas de jogos e amigos.

Sem essas variaveis, as paginas que dependem da Steam API nao vao carregar os dados corretamente.

## Como rodar o projeto

Inicie o servidor de desenvolvimento:

```sh
pnpm dev
```

Para abrir no navegador automaticamente:

```sh
pnpm dev -- --open
```

## Scripts disponiveis

```sh
pnpm dev
pnpm build
pnpm preview
pnpm check
pnpm check:watch
```

## Estrutura principal

- `/`: noticias de um jogo consultadas pela Steam API.
- `/games`: biblioteca de jogos da conta configurada.
- `/games/[gameId]`: detalhes completos de um jogo.
- `/games/favorites`: area reservada para jogos favoritos.
- `/friends`: lista de amigos da conta configurada.
- `/profile/[profileId]`: consulta de perfil publico por SteamID.

## Build de producao

Para gerar a versao de producao:

```sh
pnpm build
```

Para testar a build localmente:

```sh
pnpm preview
```
