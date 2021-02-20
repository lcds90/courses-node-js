{
    // a cada array é feita a verificação
    let gato = {
        nome: "gato",
        tipo: "felino",
        peso: 25
    }

    let cachorro = {
        nome: "cachorro",
        tipo: "canino",
        peso: 50
    }

    let animals = [gato, cachorro];

    let animal_v = animals.find(animal => animal.tipo === "felino") // Verificação
    let animal_p = animals.find(animal => animal.peso < 50) // Verificação
    console.log(animal_v);
}