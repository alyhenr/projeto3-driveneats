// Capturando as div's que contém as opções de pedido:
const divMeal = document.getElementsByClassName("meal");
const divDrink = document.getElementsByClassName("drink");
const divDessert = document.getElementsByClassName("dessert");
const prices = document.getElementsByClassName("price");

// Variaveis para armazenar o preço das opções:
let meal = 0;
let drink = 0;
let dessert = 0;
let total = 0;

// Função para alterar o estilo da opção selecionada e armazenar o preço da mesma:
const selectOption = (e) => {
  const divSelecionada = document.getElementById(e.currentTarget.id);
  const divPai = document.getElementById(e.currentTarget.id).parentElement;

  if (divPai.hasChildNodes()) {
    for (let i = 0; i < [...divPai.children].length; i++) {
      if (divPai.children[i].id === divSelecionada.id) {
        divSelecionada.classList.add("selected");
        // Fazendo o ion-icon de "ok" aparecer:
        divSelecionada.children[2].classList.add("visible");

        // Armazenando o preço da opção:
        if (divSelecionada.id.includes("meal")) {
          meal = +divSelecionada
            .getElementsByClassName("price")[0]
            .textContent.replaceAll(",", ".");      
        } else if (divSelecionada.id.includes("drink")) {
          drink = +divSelecionada
            .getElementsByClassName("price")[0]
            .textContent.replaceAll(",", ".");
        } else if (divSelecionada.id.includes("dessert")) {
          dessert = +divSelecionada
            .getElementsByClassName("price")[0]
            .textContent.replaceAll(",", ".");
        }
      } else {
        divPai.children[i].classList.remove("selected");
        divPai.children[i].children[2].classList.remove("visible");
      }
    }
  }

  const orderConfirmation = (e) => {
    document.getElementsByClassName('container')[0].style.opacity = 0.2;
    
    const confirmation = document.getElementById('confirmation');
    confirmation.classList.remove('not-visible');
    confirmation.classList.add('confirmation-panel');

    const pricesSelection = [meal, drink, dessert, total.toFixed(2)];

    // Adicionando o valor dos pedidos e o valor total no painel de confirmação:
    for (let i = 0; i < confirmation.children.length - 3; i++) {
        confirmation.children[i + 1].getElementsByTagName('span')[0]
            .textContent = pricesSelection[i].toString().replaceAll(".", ",");
    }
  }

  // Se as 3 opções forem selecionadas, o botão de fechar pedido é liberado:

  if ([...document.getElementsByClassName("selected")].length === 3) {

    const button = document.getElementById("checkout");
    button.classList.add("available");
    button.children[0].textContent = "Fechar Pedido";
    total = meal + drink + dessert;    

    button.addEventListener('click', (e) => orderConfirmation(e));
  }
};

// Com as div's, agora será implementado, dinamicament uma id para cada uma das opções referente ao prato, bebida
// e sobremesa. De forma que se mais opções forem disponibilizadas, estas automaticamente ganham um id única.

for (let i = 0; i < divMeal.length; i++) {
  divMeal.item(i).id = `meal-${i}`;
  // De forma análoga, é adicionada uma id única para o preço de cada uma das opções:
  prices.item(i).id = `meal-price-${i}`;

  // Adicionando um event listener para click, em cada div:
  divMeal.item(i).addEventListener("click", (e) => selectOption(e));
}

for (let i = 0; i < divDrink.length; i++) {
  divDrink.item(i).id = `drink-${i}`;
  // De forma análoga, é adicionada uma id única para o preço de cada uma das opções:
  prices.item(i + divMeal.length).id = `meal-price-${i + divMeal.length}`;

  // Adicionando um event listener para click, em cada div:
  divDrink.item(i).addEventListener("click", (e) => selectOption(e));
}

for (let i = 0; i < divDessert.length; i++) {
  divDessert.item(i).id = `dessert-${i}`;
  // De forma análoga, é adicionada uma id única para o preço de cada uma das opções:
  prices.item(i + divMeal.length + divDrink.length).id = `meal-price-${
    i + divMeal.length + divDrink.length
  }`;

  // Adicionando um event listener para click, em cada div:
  divDessert.item(i).addEventListener("click", (e) => selectOption(e));
}
