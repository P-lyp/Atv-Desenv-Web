# CRUD de Produtos

## Integrantes
- Felipe Alves da Silva 

## Como rodar o projeto

Este projeto utiliza Bun e Express para o backend, servindo o frontend estaticamente.

1. Abra o terminal na pasta `backend`.
2. Instale as dependências com o comando:
   ```bash
   bun install
   ```
3. Inicie o servidor em modo de desenvolvimento com o comando:
   ```bash
   bun run dev
   ```
4. Acesse `http://localhost:3000` no seu navegador para ver o frontend funcionando.

## Rotas da API Implementadas

Todas as rotas partem do caminho `/produtos`:

- `GET /produtos` - Retorna a lista de produtos. Aceita filtros opcionais via query string (`status`, `tipo` e `busca`).
- `GET /produtos/:id` - Retorna um produto específico pelo seu ID.
- `POST /produtos` - Cria um novo produto gerando o ID automaticamente. Requer validação de nome e tipo.
- `PUT /produtos/:id` - Atualiza os dados de um produto existente.
- `DELETE /produtos/:id` - Remove um produto do sistema.
