// Marca as etapas feitas e mostra o progresso. Fica salvo só no navegador da pessoa.
(function () {
  var CHAVE = "progresso:" + location.pathname;
  var etapas = Array.prototype.slice.call(document.querySelectorAll(".etapa[data-id]"));
  var texto = document.querySelector(".progresso .conta");
  var cheio = document.querySelector(".progresso .cheio");
  var feitas = {};

  try { feitas = JSON.parse(localStorage.getItem(CHAVE)) || {}; } catch (e) { feitas = {}; }

  function atualiza() {
    var total = etapas.length, ok = 0;
    etapas.forEach(function (etapa) {
      var marcada = !!feitas[etapa.dataset.id];
      etapa.classList.toggle("feita", marcada);
      etapa.querySelector(".feito input").checked = marcada;
      if (marcada) ok++;
    });
    if (texto) texto.textContent = ok + " de " + total + " etapas feitas";
    if (cheio) cheio.style.width = (total ? (ok / total) * 100 : 0) + "%";
  }

  etapas.forEach(function (etapa) {
    var caixa = etapa.querySelector(".feito input");
    if (!caixa) return;
    caixa.addEventListener("change", function () {
      feitas[etapa.dataset.id] = caixa.checked;
      try { localStorage.setItem(CHAVE, JSON.stringify(feitas)); } catch (e) {}
      atualiza();
    });
  });

  atualiza();
})();
