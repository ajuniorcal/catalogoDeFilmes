import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/now_playing?language=pt-BR-US&page=1",
          {
            headers: {
              Accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGFiYWNhNGQ0ZGUxMTY4ZjE0ZmMwNDQzMDI3MzI2MSIsInN1YiI6IjY0OWNmMWMzM2U2ZjJiMDBlMmRjZmVjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M1CeGEk2NsnE8SnHuRvx8YXK1PN6ThhDLUeR4xSqV_o",
            },
          }
        );

        setFilmes(response.data.results.slice(0, 20));
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    loadFilmes();
  }, []);
  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando Filmes...</h2>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => (
          <article key={filme.id}>
            <strong>{filme.title}</strong>
            <div className="imagens">
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              />
            </div>

            <Link to={`/filme/${filme.id}`}>Acessar</Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Home;
