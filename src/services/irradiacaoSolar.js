import { buscarCoordenadas } from './geocoding';

/**
 * Busca a média climatológica anual de irradiação solar (kWh/m²/dia)
 * para a cidade informada usando a API pública NASA POWER.
 */
export async function buscarIrradiacaoSolar(cidade, estado) {
  const { latitude, longitude } = await buscarCoordenadas(cidade, estado);
  const url = new URL('https://power.larc.nasa.gov/api/temporal/climatology/point');
  url.search = new URLSearchParams({
    parameters: 'ALLSKY_SFC_SW_DWN',
    community: 'RE',
    longitude: String(longitude),
    latitude: String(latitude),
    format: 'JSON',
  }).toString();

  const resposta = await fetch(url);
  if (!resposta.ok) throw new Error('Não foi possível consultar a incidência solar desta região.');

  const dados = await resposta.json();
  const valores = dados?.properties?.parameter?.ALLSKY_SFC_SW_DWN;
  const anual = Number(valores?.ANN);
  const meses = valores
    ? Object.entries(valores)
        .filter(([mes, valor]) => mes !== 'ANN' && Number.isFinite(Number(valor)) && Number(valor) > 0)
        .map(([, valor]) => Number(valor))
    : [];
  const media = Number.isFinite(anual) && anual > 0
    ? anual
    : meses.length
      ? meses.reduce((soma, valor) => soma + valor, 0) / meses.length
      : NaN;

  if (!Number.isFinite(media) || media <= 0) {
    throw new Error('A API não retornou dados de irradiação solar para esta localização.');
  }

  return { irradiacao: media, latitude, longitude };
}
