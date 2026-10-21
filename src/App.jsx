import { useState } from "react";
import "./App.css";

export default function App() {
  const [busca, setBusca] = useState("");
  const [repos, setRepos] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function adicionar(e) {
    e.preventDefault();
    const nome = busca.trim().replace(/^https?:\/\/github\.com\//, "");
    if (!/^[\w.-]+\/[\w.-]+$/.test(nome)) {
      setErro('Use o formato "usuario/repositorio", ex: facebook/react');
      return;
    }
    if (repos.some((r) => r.full_name.toLowerCase() === nome.toLowerCase())) {
      setErro("Esse repositório já está na lista.");
      return;
    }

    setErro("");
    setCarregando(true);
    try {
      const resposta = await fetch(`https://api.github.com/repos/${nome}`);
      if (resposta.status === 404) throw new Error("Repositório não encontrado.");
      if (!resposta.ok) throw new Error("Erro ao consultar a API do GitHub.");
      const dados = await resposta.json();
      setRepos((atual) => [dados, ...atual]);
      setBusca("");
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  function remover(id) {
    setRepos((atual) => atual.filter((r) => r.id !== id));
  }

  return (
    <main className="container">
      <h1>GitHub Repo Wiki</h1>
      <p className="sub">Salve seus repositórios favoritos do GitHub.</p>

      <form onSubmit={adicionar} className="form">
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="usuario/repositorio (ex: facebook/react)"
        />
        <button type="submit" disabled={carregando}>
          {carregando ? "Buscando..." : "Adicionar"}
        </button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      {repos.length === 0 && !erro && (
        <p className="vazio">Nenhum repositório adicionado ainda.</p>
      )}

      <ul className="lista">
        {repos.map((r) => (
          <li key={r.id} className="card">
            <img src={r.owner.avatar_url} alt={r.owner.login} />
            <div className="info">
              <a href={r.html_url} target="_blank" rel="noreferrer">
                {r.full_name}
              </a>
              <p>{r.description || "Sem descrição."}</p>
              <small>
                ⭐ {r.stargazers_count} · 🍴 {r.forks_count}
                {r.language && ` · ${r.language}`}
              </small>
            </div>
            <button className="remover" onClick={() => remover(r.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
