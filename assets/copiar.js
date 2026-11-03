// Botão "Copiar" de cada caixa de prompt
document.querySelectorAll(".copiar").forEach(function (botao) {
  botao.addEventListener("click", function () {
    var texto = botao.closest(".prompt").querySelector("pre").innerText;
    var pronto = function () {
      botao.textContent = "Copiado ✓";
      botao.classList.add("ok");
      setTimeout(function () {
        botao.textContent = "Copiar";
        botao.classList.remove("ok");
      }, 2000);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(pronto, function () { copiarAntigo(texto); pronto(); });
    } else {
      copiarAntigo(texto);
      pronto();
    }
  });
});

// Navegador do Instagram às vezes bloqueia a API nova; esse é o plano B
function copiarAntigo(texto) {
  var area = document.createElement("textarea");
  area.value = texto;
  area.setAttribute("readonly", "");
  area.style.position = "absolute";
  area.style.left = "-9999px";
  document.body.appendChild(area);
  area.select();
  try { document.execCommand("copy"); } catch (e) {}
  document.body.removeChild(area);
}
