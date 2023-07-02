import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./filme-info.css";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadFilme() {
      await axios
        .get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: "9dabaca4d4de1168f14fc04430273261",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme não encontrado");
          navigate("/", { replace: true });
          return;
        });
    }
    loadFilme();
  }, [navigate, id]);

  function salvarFilme() {
    const minhalista = localStorage.getItem("@tonyflix");
    let filmesSalvos = JSON.parse(minhalista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.warn("Este filme já está na lista, bobalhon");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@tonyflix", JSON.stringify(filmesSalvos));
    toast.success("Filme Salvo com Sucesso");
  }
  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando dados do Filme...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt="{filme.title"
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação {filme.vote_average}/10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="blank"
            rel="external"
            href={`https://www.youtube.com/results?search_query= ${filme.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
