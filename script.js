// Capturando as div's que contém as opções de pedido:
const divMeal = document.getElementsByClassName("meal");
const divDrink = document.getElementsByClassName("drink");
const divDessert = document.getElementsByClassName("dessert");

// Variaveis para armazenar o preço das opções:
let meal = 0;
let drink = 0;
let dessert = 0;
let total = 0;

// Após as opções serem selecionadas e o botão de fechar pedido ser clicado:
const orderConfirmation = (e) => {
  // Desabilitando o botão de fechar pedido para que não seja possível clicar nele novamente
  // enquanto se está na tela de confirmação. O botão é habilitado novamente se o usuário clicar
  // em "cancelar", e estiver com as 3 opções selecionadas:
  e.currentTarget.disabled = true;

  // Deixando o body do app com opacidade baixa quando a tela de confirmação é apresentada:
  document.querySelector(".container").style.opacity = 0.2;

  // Armazenando o nome e endereço do usuário para a menssagem no whats:
  let name = "";
  let adress = "";
  let condition = true;

  do {
    name = prompt("Qual seu nome?");
    adress = prompt("Qual seu endereço?");

    name === "" || name === null || adress === "" || adress === null
      ? (condition = true)
      : (condition = false);

    if (condition)
      alert(
        "Digite seu nome e endereço nos campos correspondentes, por favor."
      );
  } while (condition);

  // Apresentando o painel de confirmação:
  const confirmation = document.getElementById("confirmation");
  confirmation.classList.remove("not-visible");
  confirmation.classList.add("confirmation-panel");

  // Adicionando o valor dos pedidos e o valor total no painel de confirmação:
  const pricesSelection = [meal, drink, dessert, total.toFixed(2)];

  for (let i = 0; i < confirmation.children.length - 3; i++) {
    confirmation.children[i + 1].getElementsByTagName("span")[0].textContent =
      pricesSelection[i].toString().replaceAll(".", ",");
  }

  // Capturando o botão da finalização do pedido e encaminhamento para o wpp ou cancelamento:
  const finishBtn = document.getElementById("deal");
  const cancelBtn = document.getElementById("cancel");

  // Encaminha para o whats em caso de pedido finalizado:
  finishBtn.addEventListener("click", () => {
    location.href = `https://wa.me/5542999009040?text=${encodeURIComponent(`
      Olá, gostaria de fazer o pedido:
      - Prato: Frango Yin Yang
      - Bebida: Coquinha Gelada
      - Sobremesa: Pudim
      Total: R$ ${total.toFixed(2).toString().replaceAll(".", ",")}
      
      Nome: ${name}
      Endereço: ${adress}
      `)}`;
  });

  // Cancelando o pedido e voltando a tela de seleção:
  cancelBtn.addEventListener("click", () => {
    document.getElementById("checkout").disabled = false;
    document.querySelector(".container").style.opacity = 1;
    confirmation.classList.add("not-visible");
    confirmation.classList.remove("confirmation-panel");
  });
};

// Função para alterar o estilo (borda verde) da opção selecionada e armazenar o preço da mesma:
const selectOption = (e) => {
  // Capturando a div que receber o click:
  const divSelecionada = e.currentTarget;

  // Verificando se alguma das div do mesmo menu de opões ja hávia sido selecionada e então
  // removendo a seleção desta, para aplicar na nova selecionada:
  const previouslySelected = document.querySelector(
    `.${e.currentTarget.classList[0]}.selected`
  );

  if (previouslySelected !== null)
    previouslySelected.classList.remove("selected");

  // Por fim, aplicando a seleção na div clicada:
  divSelecionada.classList.add("selected");

  // Armazenando o preço da opção selecionada para cada menu:
  const priceOption = (element) => {
    return element
      .getElementsByClassName("price")[0]
      .textContent.replaceAll(",", ".");
  };

  if (divSelecionada.classList[0].includes("meal")) {
    meal = +priceOption(divSelecionada);
  } else if (divSelecionada.classList[0].includes("drink")) {
    drink = +priceOption(divSelecionada);
  } else if (divSelecionada.classList[0].includes("dessert")) {
    dessert = +priceOption(divSelecionada);
  }

  // Se as 3 opções forem selecionadas, o botão de fechar pedido é liberado:
  if ([...document.getElementsByClassName("selected")].length === 3) {
    button.disabled = false;
    button.classList.add("available");
    button.children[0].textContent = "Fechar Pedido";
    total = meal + drink + dessert;
  }
};

// Passo 1:
// Com as div's armazenadas nas variáveis declaradas nas primeiras linhas, agora será implementado,
// dinamicament uma id para cada uma das opções referente ao prato, bebida
// e sobremesa. De forma que se mais opções forem disponibilizadas,
// estas automaticamente ganham um id única.

for (let i = 0; i < divMeal.length; i++) {
  // Adicionando um event listener para click, em cada div do menu de pratos:
  divMeal.item(i).addEventListener("click", (e) => selectOption(e));
}

for (let i = 0; i < divDrink.length; i++) {
  // Adicionando um event listener para click, em cada div do menu de bebidas:
  divDrink.item(i).addEventListener("click", (e) => selectOption(e));
}

for (let i = 0; i < divDessert.length; i++) {
  // Adicionando um event listener para click, em cada div do menu de sobremesas:
  divDessert.item(i).addEventListener("click", (e) => selectOption(e));
}

// Passo 2:
// Adicionando a função de fechar o pedido quando o botão fixo da parte de baixo for clicado,
// lembrando que inicialmente ele está desabilitado (no html), sendo habilitado apenas quando 3
// opções forem selecionadas:

const button = document.getElementById("checkout");
button.addEventListener("click", (e) => orderConfirmation(e));

// Passo 3:
// Executar as funções adicionadas aos eventos de click, de acordo com o oque o usuario fizer
