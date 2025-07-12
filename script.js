function faixaEtariaClasse(idade) {
  if (idade <= 14) return "faixa-verde";
  if (idade < 18) return "faixa-amarela";
  return "faixa-vermelha";
}

function criarCardFilme(filme) {
  const div = document.createElement("div");
  div.className = "filme";
  
  const mediaRating = filme.opinioes.reduce((soma, o) => soma + o.rating, 0) / filme.opinioes.length;
  const estrelas = "★".repeat(Math.round(mediaRating));

  div.innerHTML = `
    <img src="${filme.figura}" alt="${filme.titulo}">
    <h2>${filme.titulo}</h2>
    <div class="faixa-etaria ${faixaEtariaClasse(filme.classificacao)}">
      ${filme.classificacao} anos
    </div>
    <p><strong>Resumo:</strong> ${filme.resumo}</p>
    <p><strong>Gêneros:</strong> ${filme.generos.join(", ")}</p>
    <p><strong>Elenco:</strong> ${filme.elenco.join(", ")}</p>
    <p><strong>Opiniões:</strong> ${filme.opinioes.map(o => `${o.nome}: ${o.comentario}`).join("<br>")}</p>
    <p><strong>Rating:</strong> ${estrelas}</p>
  `;
  
  return div;
}

fetch("https://rafaelescalfoni.github.io/desenv_web/filmes.json")
  .then(res => res.json())
  .then(dados => {
    console.log(dados);
    const catalogo = document.getElementById("catalogo");
    dados.forEach(filme => {
      const card = criarCardFilme(filme);
      catalogo.appendChild(card);
    });
  });
