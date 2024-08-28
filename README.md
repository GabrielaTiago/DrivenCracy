<p align="center"><img src="https://em-content.zobj.net/source/skype/289/ballot-box-with-ballot_1f5f3-fe0f.png" height="80px" alt=""/></p>

# <p align="center">DrivenCracy</p>

### <p align="center">API para enquetes online</p>

<div align="center">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" height="30px" alt="badge js"/>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" height="30px" alt="badge node js"/>
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" height="30px" alt="badge express js"/>
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" height="30px" alt="badge mongodb"/>
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" height="30px" alt="badge npm"/>
</div>

## :clipboard: Descrição

DrivenCracy é uma API simples e direta para criar e votar em enquetes. Foi desenvolvida utilizando Node.js, Express, MongoDB e JavaScript. A aplicação permite criar enquetes, adicionar opções de voto, registrar votos e consultar o resultado mais votado em uma enquete.

💬 [**Acesse aqui**](https://driven-cracy-api.herokuapp.com)

## :bookmark_tabs: Funcionalidades

-   **Criação de enquetes** com título e data de expiração.
-   **Busca das enquetes** ativas.
-   **Adição de opções de voto** para as enquetes existentes.
-   **Busca das opções de voto** de uma enquete específica.
-   **Registro de votos** nas opções disponíveis.
-   **Consulta de resultados**, retornando a opção mais votada em uma enquete específica.

## :world_map: Rotas

#### **[POST]** /poll

```yml
- Cria uma nova enquete.

- Título é obrigatório e não pode ser vazio.
- Se 'expireAt' não for enviado, a enquete expira em 30 dias por padrão.

- title: string
- expireAt: string

- body: { 'title': 'Qual a sua linguagem favorita?', 'expireAt': '2024-10-28 00:58' }
```

**Retornos:**

| Status Code | Situação                     |
| :---------: | ---------------------------- |
|     201     | Enquete criada com sucesso   |
|     403     | Data de expiração inválida   |
|     409     | Enquete duplicada            |
|     422     | Título vazio                 |
|     422     | Campo 'title' não enviado    |
|     422     | Campo 'expireAt' não enviado |

#### **[GET]** /poll

```yml
- Retorna todas as enquetes ativas.

- body:
[
    {
        "_id": "54759eb3c090d83494e2d222",
        "title": "Qual a melhor linguagem de programação?",
        "expireAt": "2024-10-28 01:00"
    },
    {
        "_id": "54759eb3c090d83494e2d333",
        "title": "Quem é o melhor jogador de futebol?",
        "expireAt": "2024-12-25 01:00"
    },
    ...
]
```

**Retornos:**

| Status Code | Situação          |
| :---------: | ----------------- |
|     200     | Lista de enquetes |

#### **[POST]** /choice

```yml
- Adiciona uma nova opção de voto a uma enquete existente.

- Título é obrigatório e não pode ser vazio.
- Título não pode ser repetido para uma mesma enquete
- 'poolId' deve corresponder a uma enquete existente.
-  Não é permitido adicionar opções a enquetes expiradas.


- title: string
- poolId: string

- body:
        {
            'title': 'JavaScript',
            'poolId': '54759eb3c090d83494e2d222'
        }
```

**Retornos:**

| Status Code | Situação                         |
| :---------: | -------------------------------- |
|     201     | Opção de voto criada com sucesso |
|     403     | Enquete expirada                 |
|     404     | Enquete não encontrada           |
|     409     | Opção de voto duplicada          |
|     422     | Título vazio                     |
|     422     | Campo 'title' não enviado        |
|     422     | Campo 'expireAt' não enviado     |

#### **[GET]** /poll/:id/choice

```yml
- Busca todas as opções de voto de uma enquete específica.

- params: id

- 'id' string
- 'id' deve corresponder a uma enquete existente.

- res:
[
    {
        "_id": "32238eb3c090d83494e2d238",
        "title": "JavaScript",
        "pollId": "54759eb3c090d83494e2d222"
    },
    {
        "_id": "21309eb3c090d83494e2d333",
        "title": "Python",
        "pollId": "54759eb3c090d83494e2d222"
    }
]
```

**Retornos:**

| Status Code | Situação               |
| :---------: | ---------------------- |
|     200     | Lista de opções        |
|     404     | Enquete não encontrada |

#### **[POST]** /choice/:id/vote

```yml
- Registra um voto em uma opção de voto.

- params: id

- 'id' string
- 'id' deve corresponder a uma opção de voto existente.

- body: {}

```

**Retornos:**

| Status Code | Situação                     |
| :---------: | ---------------------------- |
|     201     | Voto registrado              |
|     403     | Enquete expirada             |
|     404     | Enquete não encontrada       |
|     404     | Opção de voto não encontrada |

#### **[GET]** /choice/:id/result

```yml
-Retorna o resultado de uma enquete.

- params: id

- 'id' string
- 'id' deve corresponder a uma enquete existente.

- res:
        {
            "_id": "54759eb3c090d83494e2d222",
            "title": "Qual a sua linguagem de programação favorita?",
            "expireAt": "2024-02-14 01:00",
            "result": {
                "title": "JavaScript",
                "votes": 487
            }
        }
```

**Retornos:**

| Status Code | Situação                        |
| :---------: | ------------------------------- |
|     200     | Resultado retornado com sucesso |
|     404     | Enquete não encontrada          |
|     404     | Enquete sem opções de voto      |

## :rocket: Rodando o projeto localmente

Clone o repositório:

```bash
   git clone https://github.com/GabrielaTiago/DrivenCracy.git
```

Entre no diretório do projeto:

```bash
   cd DrivenCracy
```

Para ininicilizar o MongoDB, execute:

```bash
   mongod --dbpath ~/.mongo
```

🛑 Não feche esse terminal!!

Crie um arquivo **.env** na raiz do projeto com as seguintes informações:

```bash
    PORT=5000
    MONGO_URI="mongodb://127.0.0.1:27017"
    MONGO_DATABASE_NAME="DrivenCracy"
```

Inicie o servidor:

```bash
    npm run start
```

A aplicação estará disponível em: <http://localhost:5000>.

## :bulb: Reconhecimentos

-   [Badges para Github](https://github.com/alexandresanlim/Badges4-README.md-Profile#-database-)
-   [Inspiração de README](https://gist.github.com/luanalessa/7f98467a5ed62d00dcbde67d4556a1e4#file-readme-md)
-   [Driven Education](https://www.driven.com.br)

## :muscle: Contribuição

Contribuições são bem-vindas! Para reportar problemas ou sugerir melhorias, abra uma issue ou envie um pull request.

## :woman_technologist: Autora

Gabriela Tiago de Araújo

-   email: <gabrielatiagodearaujo@outlook.com>
-   LinkedIn: <https://www.linkedin.com/in/gabrielatiago/>
-   Portfólio: <https://gabrielatiago.vercel.app>

$~$

[🔝 Voltar ao topo](#drivencracy)
