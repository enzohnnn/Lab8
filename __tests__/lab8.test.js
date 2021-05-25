describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    expect(page.url()).toContain('/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    let tester = true;
    let data, plainValue;
    const entries = await page.$$('h1');
    data = await entries[0].getProperty('innerHTML');
    plainValue = await data.jsonValue();
    expect(plainValue).toEqual('Entry 1');
    //let data = await entries[0].getProperty('entry');
    //let plainValue = await data.jsonValue();
    //expect(tester).toBe(true);
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    let tester = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    data = await entries[0].getProperty('entry');
    plainValue = await data.jsonValue();
    if(plainValue.title != "You like jazz?") {
      tester=false;
    }
    if(plainValue.date != "4/25/2021") {
      tester=false;
    }
    if(plainValue.content != "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.") {
      tester=false;
    }
    if(plainValue.image.src != 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455') {
      tester=false;
    }
    if(plainValue.image.alt != 'bee with sunglasses') {
      tester=false;
    }
    expect(tester).toEqual(true);
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    let data, plainValue;
    const entries = await page.$$('body');
    data = await entries[0].getProperty('classList');
    plainValue = await data.jsonValue();
    expect(plainValue).toEqual({"0": "single-entry"});
    //const entries = await page.$$('journal-entry');
    //data = await entries[0].getProperty('entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('img');
    expect(page.url()).toContain('/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    let tester = true;
    let data, plainValue;
    const entries = await page.$$('h1');
    data = await entries[0].getProperty('innerHTML');
    plainValue = await data.jsonValue();
    expect(plainValue).toEqual('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    let data, plainValue;
    const entries = await page.$$('body');
    data = await entries[0].getProperty('classList');
    plainValue = await data.jsonValue();
    expect(plainValue).toEqual({"0": "settings"});
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url()).toContain('/#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    let homePage = true;
    await page.goBack();
    if(page.url().includes('/#entry')) {
      homePage = false;
    }
    if(page.url().includes('#settings')) {
      homePage = false;
    }
    expect(homePage).toBe(true);
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12:  When the user if on the homepage, the header title should be “Journal Entries', async() => {
    let tester = true;
    let data, plainValue;
    const entries = await page.$$('h1');
    data = await entries[0].getProperty('innerHTML');
    plainValue = await data.jsonValue();
    expect(plainValue).toEqual('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute', async() => {
    let data, plainValue;
    const entries = await page.$$('body');
    data = await entries[0].getProperty('classList');
    plainValue = await data.jsonValue();
    expect(plainValue).toEqual({});
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
    const entries = await page.$$('journal-entry');
    await entries[1].click();
    let data, plainValue;
    data = await entries[1].getProperty('classList');
    plainValue = await data.jsonValue();
    expect(page.url()).toContain('/#entry2');
  }, 30000);  

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async() => {
    let data, plainValue;
    const entries = await page.$$('h1');
    data = await entries[0].getProperty('innerHTML');
    plainValue = await data.jsonValue();
    expect(plainValue).toEqual('Entry 2');
  }, 10000);  

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async() => {
    let tester = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    data = await entries[1].getProperty('entry');
    plainValue = await data.jsonValue();
    if(plainValue.title != "Run, Forrest! Run!") {
      tester=false;
    }
    if(plainValue.date != "4/26/2021") {
      tester=false;
    }
    if(plainValue.content != "Mama always said life was like a box of chocolates. You never know what you're gonna get.") {
      tester=false;
    }
    expect(tester).toEqual(true);
  }, 10000);  

  // create your own test 17
  it('Test17: On second Entry page - checking <body> element classes', async () => {
    // implement test17: Clicking on the second journal entry should update the class attribute of <body> to ‘single-entry’
    let data, plainValue;
    const entries = await page.$$('body');
    data = await entries[0].getProperty('classList');
    plainValue = await data.jsonValue();
    expect(plainValue).toEqual({"0": "single-entry"});
  });

  // create your own test 18
  it('Test18: Verify the url is correct when clicking on the third entry', async() => {
    await page.goBack();
    const entries = await page.$$('journal-entry');
    await entries[2].click();
    let data, plainValue;
    data = await entries[1].getProperty('classList');
    plainValue = await data.jsonValue();
    expect(page.url()).toContain('/#entry3');
  }, 30000);  

  // create your own test 19
  it('Test19: Verify the title is current when clicking on the third entry', async() => {
    let data, plainValue;
    const entries = await page.$$('h1');
    data = await entries[0].getProperty('innerHTML');
    plainValue = await data.jsonValue();
    expect(plainValue).toEqual('Entry 3');
  }, 10000);  

  // create your own test 20
  it('Test20: Verify the entry page contents is correct when clicking on the third entry', async() => {
    let tester = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    data = await entries[2].getProperty('entry');
    plainValue = await data.jsonValue();
    //expect(plainValue.title).toEqual("Ogres are like onions");
    //expect(plainValue.date).toEqual("4/27/2021");
    //expect(plainValue.content).toEqual("Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers.");
    if(plainValue.title != "Ogres are like onions") {
      tester=false;
    }
    if(plainValue.date != "4/27/2021") {
      tester=false;
    }
    if(plainValue.content != "Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers.") {
      tester=false;
    }
    expect(tester).toEqual(true);
  }, 10000);  
});
