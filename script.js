// Capturando as div's que contém as opções de pedido:
const divMeal = document.getElementsByClassName('meal');
const divDrink = document.getElementsByClassName('drink');
const divDessert = document.getElementsByClassName('dessert');



const selectOption = (e) => {
    const divSelecionada = document.getElementById(e.currentTarget.id);
    const divPai = document.getElementById(e.currentTarget.id).parentElement;

    if(divPai.hasChildNodes()) {        
        for (let i = 0; i < [...divPai.children].length; i++) {
            if (divPai.children[i].id === divSelecionada.id) {
                divSelecionada.classList.add("selected");
                // Fazendo o ion-icon de "ok" aparecer:
                divSelecionada.children[2].classList.add("visible"); 
                // Armazenando o preço da opção:

            } else {
                divPai.children[i].classList.remove("selected");  
                divPai.children[i].children[2].classList.remove("visible");           
            }                
        }
    }  

    // Se as 3 opções forem selecionadas, o botão de fechar pedido é liberado:

    if([...document.getElementsByClassName("selected")].length === 3) { 
        document.getElementById("checkout").classList.add("available");

    }   
}

// Com as div's, agora será implementado, dinamicament uma id para cada uma das opções referente ao prato, bebida
// e sobremesa. De forma que se mais opções forem disponibilizadas, estas automaticamente ganham um id única.

for (let i = 0; i < divMeal.length; i++) {
    divMeal.item(i).id = `meal-${i}`;

    // Adicionando um event listener para click, em cada div:
    divMeal.item(i).addEventListener('click', (e) => selectOption(e));
};

for (let i = 0; i < divDrink.length; i++) {
    divDrink.item(i).id = `drink-${i}`;

    // Adicionando um event listener para click, em cada div:
    divDrink.item(i).addEventListener('click', (e) => selectOption(e));
};

for (let i = 0; i < divDessert.length; i++) {
    divDessert.item(i).id = `dessert-${i}`;

    // Adicionando um event listener para click, em cada div:
    divDessert.item(i).addEventListener('click', (e) => selectOption(e));
};

