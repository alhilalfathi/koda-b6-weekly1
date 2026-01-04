import { getDataProduk } from "./fetch.js";

export function getKategoriList() {
  const dataProduk = getDataProduk();
  const kategori = [];

  for (let i = 0; i < dataProduk.length; i++) {
    if (!kategori.includes(dataProduk[i].kategori)) {
      kategori.push(dataProduk[i].kategori);
    }
  }
  return kategori;
}

export function getProdukByKategori(kategori) {
  const dataProduk = getDataProduk();
  const result = [];

  for (let i = 0; i < dataProduk.length; i++) {
    if (dataProduk[i].kategori === kategori) {
      result.push(dataProduk[i]);
    }
  }
  return result;
}

export function getProdukById(id) {
  const dataProduk = getDataProduk();

  for (let i = 0; i < dataProduk.length; i++) {
    if (dataProduk[i].id === id) {
      return dataProduk[i];
    }
  }
}