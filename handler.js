import {
  getKategoriList,
  getProdukByKategori,
  getProdukById
} from "./getProduk.js";

import {
  tambahKeCart,
  getCart,
  hitungTotalCart,
  resetCart
} from "./cart.js";

import { 
  getInvoice, 
  // getInvoiceList
} from "./invoice.js";

let step = 0;
let kategoriDipilih = "";
let produkDipilih = null;

function tampilMenuUtama() {
  const kategori = getKategoriList();
  console.log("\n=== MENU KATEGORI ===");
  for (let i = 0; i < kategori.length; i++) {
    console.log(`${i + 1}. ${kategori[i]}`);
  }
  console.log("Pilih kategori:");
}

function tampilProduk(kategori) {
  const produk = getProdukByKategori(kategori);
  console.log(`\n=== MENU ${kategori.toUpperCase()} ===`);
  for (let i = 0; i < produk.length; i++) {
    console.log(`${produk[i].id}. ${produk[i].namaProduk} - Rp${produk[i].harga}`);
  }
  console.log("Pilih ID produk:");
}

function tampilCart() {
  const cart = getCart();

  console.log("\n=== KERANJANG BELANJA ===");
  if (cart.length === 0) {
    console.log("Keranjang kosong");
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    console.log(
      `${i + 1}. ${item.namaProduk} x${item.jumlah} = Rp${item.harga * item.jumlah}`
    );
  }

  console.log("------------------------");
  console.log(`TOTAL: Rp${hitungTotalCart()}`);
}

function resetKeMenuUtama() {
  step = 0;
  kategoriDipilih = "";
  produkDipilih = null;
  tampilMenuUtama();
}

export function startMenu() {
  resetCart();
  tampilMenuUtama();
  process.stdin.on("data", handleInput);
}

function handleInput(input) {
  const value = input.toString().trim().toUpperCase();

  
  if (step === 0) {
    const kategoriList = getKategoriList();
    const index = parseInt(value) - 1;

    if (index < 0 || index >= kategoriList.length) {
      console.log("Kategori tidak valid:");
      return;
    }

    kategoriDipilih = kategoriList[index];
    tampilProduk(kategoriDipilih);
    step = 1;
  }

  else if (step === 1) {
    produkDipilih = getProdukById(parseInt(value));

    if (!produkDipilih || produkDipilih.kategori !== kategoriDipilih) {
      console.log("Produk tidak tersedia:");
      return;
    }

    console.log(`Jumlah ${produkDipilih.namaProduk} yang diinginkan:`);
    step = 2;
  }

  else if (step === 2) {
    const jumlah = parseInt(value);

    if (isNaN(jumlah) || jumlah <= 0) {
      console.log("Jumlah tidak valid:");
      return;
    }

    tambahKeCart(produkDipilih, jumlah);
    console.log("Produk ditambahkan ke keranjang");

    console.log("\n1. Pesan lagi");
    console.log("2. Lihat keranjang");
    console.log("3. Checkout");
    console.log("Pilih opsi:");
    step = 3;
  }

  else if (step === 3) {
    if (value === "1") {
      resetKeMenuUtama();
    } 
    else if (value === "2") {
      tampilCart();
      console.log("\n1. Pesan lagi");
      console.log("2. Checkout");
      step = 4;                                
    } 
    else if (value === "3") {
      tampilCart();
      const total = hitungTotalCart();
      getInvoice(getCart(),total);
      // getInvoiceList();
      resetCart();
      console.log("\nTerima kasih Pesanan Selesai");
      process.stdin.pause();
    } 
    else {
      console.log("Pilihan tidak valid:");
    }
  }

  else if (step === 4) {
    if (value === "1") {
      resetKeMenuUtama();
    } 
    else if (value === "2") {
      tampilCart();
      const total = hitungTotalCart();
      getInvoice(getCart(),total);
      resetCart();
      console.log("\nTerima kasih Pesanan Selesai");
      process.stdin.pause();
    } 
    else {
      console.log("Pilihan tidak valid:");
    }
  }
}