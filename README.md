# GitHub Repo Wiki

Wiki para salvar repositórios do GitHub, feita com React + Vite. Consome a API pública do GitHub (`https://api.github.com/repos/{usuario}/{repo}`).

## Funcionalidades
- Buscar um repositório no formato `usuario/repositorio`
- Listar os repositórios adicionados (avatar, descrição, estrelas, forks e linguagem)
- Evitar repositórios duplicados
- Remover repositórios da lista
- Tratamento de erros (repositório não encontrado, formato inválido)

## Como rodar
```bash
npm install
npm run dev
```
