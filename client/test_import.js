import { products } from "./src/assets/assets.js";

console.log("Starting products validation...");
let errorsCount = 0;

products.forEach((p, idx) => {
  if (!p._id) {
    console.error(`Error: Product at index ${idx} has no _id`);
    errorsCount++;
  }
  if (!p.name) {
    console.error(`Error: Product ${p._id || idx} has no name`);
    errorsCount++;
  }
  if (typeof p.price !== "number") {
    console.error(`Error: Product ${p._id || idx} has invalid price:`, p.price);
    errorsCount++;
  }
  if (!p.image || !Array.isArray(p.image) || p.image.length === 0) {
    console.error(`Error: Product ${p._id || idx} has malformed image field:`, p.image);
    errorsCount++;
  } else {
    p.image.forEach((img, imgIdx) => {
      if (!img) {
        console.error(`Error: Product ${p._id || idx} has undefined/empty image at index ${imgIdx}`);
        errorsCount++;
      }
    });
  }
});

console.log(`Validation finished. Total errors found: ${errorsCount}`);
