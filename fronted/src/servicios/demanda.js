import API from './api';

export const obtenerDemanda = async (rango) => {
  const res = await API.get('/api/demanda', { params: { range: rango } });
  return res.data;
};
