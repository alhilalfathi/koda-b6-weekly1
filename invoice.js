const invoiceList = [];

export function getInvoice(cart, total) {
  const invoice = {
    tanggal: new Date().toLocaleString(),
    items: JSON.parse(JSON.stringify(cart)), // clone cart
    total
  };

  invoiceList.push(invoice);

  tampilInvoice(invoice);
}

export function tampilInvoice(invoice) {
  console.log("\n======== INVOICE PEMBELIAN ========");
  console.log(`Tanggal: ${invoice.tanggal}\n`);

  invoice.items.forEach(item => {
    console.log(
      `${item.namaProduk} x${item.jumlah} = Rp${item.harga * item.jumlah}`
    );
  });

  console.log("-------------------------------");
  console.log(`TOTAL BAYAR: Rp${invoice.total}`);
}

export function getInvoiceList() {
  return invoiceList;  
}