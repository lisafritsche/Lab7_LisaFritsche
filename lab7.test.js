describe('Basic user flow for Website', () => {
  // First, visit the lab 7 website
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
  });

  // Test 1 – Check if 20 product items are loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });
    expect(numProducts).toBe(20);
  });

  // ✅ Test 3 – Make sure each <product-item> has valid data
 it('Make sure <product-item> elements are populated', async () => {
  console.log('🧪 Test 3: Checking <product-item> data...');
  await page.waitForSelector('product-item');
  const prodItems = await page.$$('product-item');
  let allPopulated = true;

  for (let i = 0; i < prodItems.length; i++) {
    console.log(`Checking product item ${i + 1}/${prodItems.length}`);

    // Zugriff auf Shadow DOM
    const shadowRoot = await prodItems[i].getProperty('shadowRoot');

    // Titel prüfen
    const titleHandle = await shadowRoot.$('.title');
    const titleText = await titleHandle.evaluate(el => el.textContent.trim());

    // Preis prüfen
    const priceHandle = await shadowRoot.$('.price');
    const priceText = priceHandle ? await priceHandle.evaluate(el => el.textContent.trim()) : '';

    // Bild prüfen
    const imgHandle = await shadowRoot.$('img');
    const imgSrc = imgHandle ? await imgHandle.evaluate(el => el.getAttribute('src')) : '';

    if (!titleText || !priceText || !imgSrc) {
      console.log(`❌ Item ${i + 1} is missing data`);
      allPopulated = false;
    }
  }

  expect(allPopulated).toBe(true);
}, 20000);

  // Alle folgenden Tests noch mit .skip, bis du sie implementierst
   it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('🧪 Test 4: Clicking "Add to Cart" button...');

    // Warte auf das erste Produkt-Item
    const prodItem = await page.$('product-item');

    // Zugriff auf den Shadow DOM
    const shadowRoot = await prodItem.getProperty('shadowRoot');

    // Button im Shadow Root auswählen
    const buttonHandle = await shadowRoot.$('button');

    // Button klicken
    await buttonHandle.click();

    // Text auslesen
    const innerTextHandle = await buttonHandle.getProperty('innerText');
    const buttonText = await innerTextHandle.jsonValue();

    // Überprüfen, ob sich der Text geändert hat
    expect(buttonText).toBe('Remove from Cart');
  }, 5000);


 it('Checking number of items in cart on screen', async () => {
  console.log('🧪 Test 5: Clicking "Add to Cart" on all items...');

  const prodItems = await page.$$('product-item');

  for (let i = 0; i < prodItems.length; i++) {
    const shadowRoot = await prodItems[i].getProperty('shadowRoot');
    const button = await shadowRoot.$('button');

    const text = await (await button.getProperty('innerText')).jsonValue();

    // Falls Button schon auf "Remove from Cart" steht, nicht nochmal klicken
    if (text !== 'Remove from Cart') {
      await button.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // kurze Pause
    }
  }

  // cartCount mehrfach prüfen (bis zu 10 Versuche)
  let cartCount = '0';
  for (let i = 0; i < 10; i++) {
    cartCount = await page.$eval('#cart-count', el => el.innerText);
    console.log(`🔁 Versuch ${i + 1}: cartCount = ${cartCount}`);
    if (cartCount === '20') break;
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  expect(cartCount).toBe('20');
}, 35000); // Timeout großzügig auf 35s gesetzt



  it('Checking number of items in cart on screen after reload', async () => {
  console.log('🧪 Test 6: Verifying cart state after reload...');

  // Seite neu laden
  await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });

  // Alle <product-item> Elemente abrufen
  const prodItems = await page.$$('product-item');
  let allButtonsCorrect = true;

  for (let i = 0; i < prodItems.length; i++) {
    const shadowRoot = await prodItems[i].getProperty('shadowRoot');
    const button = await shadowRoot.$('button');
    const buttonText = await (await button.getProperty('innerText')).jsonValue();

    if (buttonText !== 'Remove from Cart') {
      console.log(`❌ Item ${i + 1} button text is "${buttonText}" instead of "Remove from Cart"`);
      allButtonsCorrect = false;
    }
  }

  const cartCount = await page.$eval('#cart-count', el => el.innerText);

  expect(allButtonsCorrect).toBe(true);
  expect(cartCount).toBe('20');
}, 15000);

  it('Checking the localStorage to make sure cart is correct', async () => {
  console.log('🧪 Test 7: Checking localStorage content...');

  const cart = await page.evaluate(() => {
    return localStorage.getItem('cart');
  });

  expect(cart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
});


  it('Checking number of items in cart on screen after removing from cart', async () => {
  console.log('🧪 Test 8: Removing all items from cart...');

  const prodItems = await page.$$('product-item');

  for (let i = 0; i < prodItems.length; i++) {
    const shadowRoot = await prodItems[i].getProperty('shadowRoot');
    const button = await shadowRoot.$('button');
    const buttonText = await (await button.getProperty('innerText')).jsonValue();

    if (buttonText === 'Remove from Cart') {
      await button.click();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Prüfen ob der Warenkorb-Zähler auf 0 steht
  const cartCount = await page.$eval('#cart-count', el => el.innerText);
  expect(cartCount).toBe('0');
}, 20000);

 it('Checking number of items in cart on screen after reload', async () => {
  console.log('🧪 Test 9: Verifying empty cart after reload...');

  // Seite neu laden
  await page.reload();
  await page.waitForSelector('product-item');

  const prodItems = await page.$$('product-item');
  let allButtonsCorrect = true;

  for (let i = 0; i < prodItems.length; i++) {
    const shadowRoot = await prodItems[i].getProperty('shadowRoot');
    const button = await shadowRoot.$('button');
    const buttonText = await (await button.getProperty('innerText')).jsonValue();

    if (buttonText !== 'Add to Cart') {
      console.log(`❌ Item ${i + 1} button text is "${buttonText}"`);
      allButtonsCorrect = false;
    }
  }

  const cartCount = await page.$eval('#cart-count', el => el.innerText);

  expect(allButtonsCorrect).toBe(true);
  expect(cartCount).toBe('0');
}, 10000);



  it('Checking the localStorage to make sure cart is correct', async () => {
  console.log('🧪 Test 10: Checking localStorage for empty cart...');

  // Lokalen Speicher im Browser auslesen
  const cart = await page.evaluate(() => {
    return localStorage.getItem('cart');
  });

  // Erwarteter Zustand: Leeres Array als String
  expect(cart).toBe('[]');
});

});
