## Instalação

```bash
$ docker-compose up -d
```

## Getting Started

Acesso inicial do usuário administrador:

```json
{
    "taxId": "61033267023",
    "password": "61033267023"
}
```

- Collection do Postman com todos os endpoints:
[Link para a coleção Postman](https://github.com/rogerrafael7/keep-simple-test/tree/master/docs/KeepSimple.postman_collection.json)
- API Swagger: [API Local Swagger](http://localhost:3001/api-docs)



## Estrutura do projeto

O projeto está feito seguindo o conceito de arquitetura hexagonal, onde temos a divisão de camadas de acordo com suas responsabilidades.
Abaixo a estrutura do projeto:

```
keep-simple-test
├── src
│   ├── application
│   │   ├── decorator
│   │   │── filter
│   │   │── guard
│   │   │── module
│   │   │── presentation
│   │   │   │── http
│   │   │── usecase
│   │── domain
│   │   │── model
│   │   │── mapper
│   │   │── repo
│   │   │── usecase
│   │── infra
│   │   │── data
│   │   │── shared
```

Segue abaixo a descrição das principais camadas do projeto:

- **Presentation**: Camada responsável por conter os entrypoints da aplicação, nesse caso do teste, apenas os controllers Rest.


- **Domain**: Camada responsável por conter as regras de negócio, entidades, repositórios e mappers. Nessa camada teremos os contratos principais agnósticos de tecnologia, ou seja, as interfaces que serão implementadas em outras camadas.
  - **Usecase**: Camada responsável por conter os contratos dos casos de uso da aplicação.
  - **Model**: Camada responsável por conter as entidades da aplicação.
  - **Mapper**: Camada responsável por conter os mappers de entidades.
  - **Repo**: Camada responsável por conter os contratos de repositórios da aplicação.


- **Infra**: Camada responsável por conter as implementações de repositórios, serviços externos, etc.
  - **Shared**: Camada responsável por conter classes que são compartilhadas entre as camadas.
  - **Data**: Camada responsável por conter as implementações definidas nos contratos dos repositórios da domain.
