const encontraNohMenorDistancia = (distancias, visitado) => {
    let menor = null;

    for (let noh in distancias) {
        let atualMenor =
            menor === null || distancias[noh] < distancias[menor];
        if (atualMenor && !visitado.includes(noh)) {
            menor = noh;
        }
    }
    return menor;
};

const encontraMenorCaminho = (grafo, nohInicial, nohFinal) => {
    // inicializando objeto para guardar as distancias a partir do noh inicial
    let distancias = {};
    distancias[nohFinal] = "Infinity";
    distancias = Object.assign(distancias, grafo[nohInicial]);

    // rastreie os caminhos
    let pais = { nohFinal: null };
    for (let filho in grafo[nohInicial]) {
        pais[filho] = nohInicial;
    }

    // array para os nohs ja visitados
    let visitados = [];

    // encontre o noh mais proximo
    let noh = encontraNohMenorDistancia(distancias, visitados);

    // para esse noh
    while (noh) {
        // encontre a distancia para o noh inicial e os nohs filhos
        let distancia = distancias[noh];
        let filhos = grafo[noh];
        // para cada um dos nohs filhos
        for (let filho in filhos) {
            // garanta que os nohs filhos nao sao iguais ao noh inicial
            if (String(filho) === String(nohInicial)) {
                continue;
            } else {
                // armazene a nova distancia, somada com a do noh filho
                let novaDistancia = distancia + filhos[filho];
                // se nao temos nenhuma distancia gravada a partir do noh inicial ate o noh filho no objeto
                // ou se a distancia gravada eh menor que a previamente armazenada
                // save a distancia nova no objeto e salve o caminho
                if (!distancias[filho] || distancias[filho] > novaDistancia) {
                    distancias[filho] = novaDistancia;
                    pais[filho] = noh;
                }
            }
        }
        // insira o noh no array de visitados
        visitados.push(noh);
        // mova para o noh mais proximo
        noh = encontraNohMenorDistancia(distancias, visitados);
    }

    // usando os caminhos registrados, grave o menor caminho
    let menorCaminho = [nohFinal];
    let pai = pais[nohFinal];
    while (pai) {
        menorCaminho.push(pai);
        pai = pais[pai];
    }
    menorCaminho.reverse();

    // retorne o menor caminho e a distancia percorrida por ele
    let results = {
        distancia: distancias[nohFinal],
        path: menorCaminho,
    };

    return results;
};

const grafo = {
    Capinopolis: { Ituiutaba: 30, Centralina: 40 },
    Ituiutaba: { Capinopolis: 30, MonteAlegre: 85, Douradinhos: 90 },
    Itumbiara: { Tupaciguara: 55, Centralina: 20 },
    Centralina: { MonteAlegre: 75, Capinopolis: 40, Itumbiara: 20 },
    Tupaciguara: { Itumbiara: 55, MonteAlegre: 44, Uberlandia: 60 },
    MonteAlegre: { Tupaciguara: 44, Centralina: 75, Ituiutaba: 85, Douradinhos: 28, Uberlandia: 60 },
    Douradinhos: { Ituiutaba: 90, MonteAlegre: 28, Uberlandia: 63 },
    Uberlandia: { Tupaciguara: 60, MonteAlegre: 60, Douradinhos: 63, Araguari: 30, Romaria: 78, Indianopolis: 45 },
    Araguari: { CascalhoRico: 28, Uberlandia: 30, EstrelaDoSul: 34 },
    CascalhoRico: { Araguari: 28, Grupiara: 32 },
    Grupiara: { CascalhoRico: 32, EstrelaDoSul: 38 },
    EstrelaDoSul: { Grupiara: 38, Araguari: 34, Romaria: 27 },
    Romaria: { EstrelaDoSul: 27, Uberlandia: 78, SaoJuliana: 28 },
    Indianopolis: { Uberlandia: 45, SaoJuliana: 40 },
    SaoJuliana: { Indianopolis: 40, Romaria: 28 },
};

function retornaMenorCaminho() {
    const cidade1 = $("#origem").children("option:selected").val();
    const cidade2 = $("#destino").children("option:selected").val();
    const menorCaminho = encontraMenorCaminho(
        grafo,
        cidade1,
        cidade2
    );
    $("#menorcaminho").text(menorCaminho.path);
    if (menorCaminho.distancia == "Infinity") {
        $("#menordistancia").text("0 km");
    }
    else {
        $("#menordistancia").text(menorCaminho.distancia + " km");
    }
}