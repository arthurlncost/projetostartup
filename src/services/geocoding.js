export async function buscarCoordenadas(cidade, estado) {
    const local = `${cidade}, ${estado}`;

    const resposta = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(local)}&count=1&language=pt&countryCode=BR`// endereço da api
    );

    const dados = await resposta.json();

    if (!dados.results || dados.results.length === 0) {
        throw new Error("Localização não encontrada.");
    }

    const localEncontrado = dados.results[0];// o result vem em lista, por isso começamos com o 0

    return {
        latitude: localEncontrado.latitude,
        longitude: localEncontrado.longitude
    };
}

