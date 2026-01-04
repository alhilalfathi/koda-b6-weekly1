import { getData } from "./fetch.js";
import { startMenu } from "./handler.js";

async function main() {
  try {
    await getData();
    startMenu();
  } catch (err) {
    console.log(err);
  }
}

main();

