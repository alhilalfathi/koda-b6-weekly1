const url = "https://raw.githubusercontent.com/alhilalfathi/koda-b6-weekly1/refs/heads/main/data%20produk/data.json";
let dataProduk = [];

export async function getData() {
    try {
        const res = await fetch(url);
        dataProduk = await res.json();
        // console.log(dataProduk)
    }
    catch(err) {
      console.log(err);
    }
}
export function getDataProduk(){
    return dataProduk;
}

// getData()