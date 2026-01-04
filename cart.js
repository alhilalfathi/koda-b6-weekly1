let cart = [];

export function tambahKeCart(produk, jumlah) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === produk.id) {
      cart[i].jumlah += jumlah;
      return;
    }
  }

  cart.push({
    id: produk.id,
    namaProduk: produk.namaProduk,
    harga: produk.harga,
    jumlah
  });
}

export function getCart() {
  return cart;
}

export function hitungTotalCart() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].harga * cart[i].jumlah;
  }
  return total;
}

export function resetCart() {
  cart = [];
}