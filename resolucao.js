

var dados 
var chars = {'æ':'a','¢':'c','ø':'o','ß':'b'};// letras a serem trocadas

dados = LerJson()
CorrigeNomes(dados)
CorrigePrice(dados)
CorrigeQtd(dados)
Exportar(dados)
Lista(dados)
Calcula(dados)

function LerJson(){

    return api = require('./broken-database.json') // puxa os dados da api

}

function CorrigeNomes(dados){

    for(var i = 0;i < dados.length;i ++){//acessa a lista de acordo com seu tamanho

        dados[i].name = dados[i].name.replace(/æ|¢|ø|ß/g, m => chars[m] ); // https://stackoverflow.com/a/44475397/19027233

    }
    
}

function CorrigePrice(dados){

    for(var i = 0;i < dados.length;i ++){//acessa a lista de acordo com seu tamanho

    dados[i].price = Number(dados[i].price) // transformas os numeros que estão em string para numeros

    }
    
}

function CorrigeQtd(dados){

    for(var i = 0;i < dados.length;i ++){//acessa a lista de acordo com seu tamanho

        if(!dados[i].quantity){// verifica se não existe o atributo quantity

            dados[i]["quantity"] = 0; // cria um novo atributo que recebe 0

        }
    }
    
}

function Exportar(dados){

    const fs = require('fs');
    var json = JSON.stringify(dados);
    fs.writeFile("./saida.json", json, function(err) {
        if(err) {
            return console.log(err);
        }
    console.log("saida.json foi salvo");
}); 

}

//Validação:

function Lista(dados){

    var list = []

    dados.sort((a,b) => (a.category > b.category) ? 1 : (a.category === b.category) ? ((a.id > b.id) ? 1 : -1) : -1) // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
 
    for(i = 0; i < dados.length;i ++ ){

        list[i] = dados[i].name

    }

    return console.log(list)

}

function Calcula(dados){

    var list = []

    for(i = 0 ; i < dados.length  ; i++){

        list[list.length] = {"category":'',"quantity":0}
        
        for(j = 0; j < list.length ; j++){

            if(list[j].category == dados[i].category){

                list[j].quantity += dados[i].quantity
                list.pop()

                break
                 
            }
            else if(list[j].category != dados[i].category && j == (list.length-1) ){
    
                list[j].category = dados[i].category
                list[j].quantity = dados[i].quantity
                break
    
            }
        }

    }

    return console.log(list)
}