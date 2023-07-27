import fs from 'fs';
import faker from 'faker'



const dataCenter = [];

for(let i=0; i<=25 ; i++){
    dataCenter.push({
      product_id: faker.datatype.uuid(),
      product_name: faker.commerce.productName(),
      product_price: faker.commerce.price(),
      product_images: [
        `https://picsum.photos/id/${4*i}/1000`,
        `https://picsum.photos/id/${100+i}/1000`,
        `https://picsum.photos/id/${200+i}/1000`,
        `https://picsum.photos/id/${300+i}/1000`,
        `https://picsum.photos/id/${400+i}/1000`,

      ],
      product_rating: faker.random.arrayElement([1, 2, 3, 4, 5]),
      product_adjectives: [
        faker.commerce.productAdjective(),
        faker.commerce.productAdjective(),
        faker.commerce.productAdjective(),
        faker.commerce.productAdjective(),
        faker.commerce.productAdjective(),

      ],
      product_description: faker.commerce.productDescription(),
      product_delivery:'By 25 Dec , 2025 i.e. Tuesday'
        })
}
const dataJSON = JSON.stringify(dataCenter, null, 2);

fs.writeFile('data.json', dataJSON, (err) => {
  if (err) {
    console.error('Error writing data to file:', err);
  } else {
    console.log('Data successfully written to file!');
  }
});