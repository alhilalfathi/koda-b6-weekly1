import fs from "fs";
import path from "path";

const invoiceDir = path.resolve("./histori");

if (!fs.existsSync(invoiceDir)) {
  fs.mkdirSync(invoiceDir);
}

export function getInvoice(cart, total) {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, "-");
  const filename = `invoice-${timestamp}.txt`;
  const filepath = path.join(invoiceDir, filename);

  let isi = "===== INVOICE PEMBELIAN =====\n";
  isi += `Tanggal: ${now.toLocaleString()}\n\n`;

  cart.forEach(item => {
    isi += `${item.namaProduk} x${item.jumlah}\n`;
    isi += `@ Rp${item.harga} = Rp${item.harga * item.jumlah}\n\n`;
  });

  isi += "-----------------------------\n";
  isi += `TOTAL BAYAR: Rp${total}\n`;

  fs.writeFileSync(filepath, isi);

  console.log(`\nInvoice berhasil dibuat: ${filename}`);
}