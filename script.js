// Capturando as div's que contém as opções de pedido:
const divMeal = document.getElementsByClassName('meal');
const divDrink = document.getElementsByClassName('drink');
const divDessert = document.getElementsByClassName('dessert');

const selectOption = (e) => {
    console.log(e.currentTarget.id)
    document.getElementById(e.currentTarget.id).style.backgroundColor = "red";
}

// Com as div's, agora será implementado, dinamicament uma id para cada uma das opções referente ao prato, bebida
// e sobremesa. De forma que se mais opções forem disponibilizadas, estas automaticamente ganham um id única.

for (let i = 0; i < divMeal.length; i++) {
    divMeal.item(i).id = `meal-${i}`;
    
    // Adicionando um event listener para um click em cada div:
    divMeal.item(i).addEventListener('click', (e) => selectOption(e));
};

for (let i = 0; i < divDrink.length; i++) {
    divDrink.item(i).id = `drink-${i}`;
    divDrink.item(i).addEventListener('click', (e) => selectOption(e));
};

for (let i = 0; i < divDessert.length; i++) {
    divDessert.item(i).id = `dessert-${i}`;
    divDessert.item(i).addEventListener('click', (e) => selectOption(e));
};

