const puppeteer = require('puppeteer');


const fs = require('fs');
var csvWriter = require('csv-write-stream');
var writer = csvWriter({sendHeaders: false}); //Instantiate var
var csvFilename = "rates.csv";

if (!fs.existsSync(csvFilename)) {
    writer = csvWriter({sendHeaders: false});
    writer.pipe(fs.createWriteStream(csvFilename));
    writer.write({
      header1: 'DATE',
      header2: 'GoldRates(AM)',
      header3: 'GoldRates(PM)',
      header4: 'SilverRates(AM)',
      header5: 'SilverRates(PM)',
    });
    writer.end();
  } 

// If CSV file does not exist, create it and add the headers

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();


    await page.goto('https://ibjarates.com/IbjaRates.aspx', { "waitUntil": "networkidle0" })
    
    var j=2;   
loop1:
   while(true ){
    
    var newxpath='//*[@id="grdGallery"]//a[contains(@href,"javascript:__doPostBack(\'grdGallery\',\'Page$'+j+'\')")]'
    await page.waitForXPath('//*[@id="grdGallery"]/tbody/tr[2]/td[1]/text()')

    for(var i = 2; i < 12;i++){

       var dateSelector="#grdGallery > tbody > tr:nth-child("+i+") > td:nth-child(1)";
       var goldRatesAMSelector="#grdGallery > tbody > tr:nth-child("+i+") > td:nth-child(2)";
       var goldRatesPMSelector="#grdGallery > tbody > tr:nth-child("+i+") > td:nth-child(3)";
       var silverRatesAmSelector="#grdGallery > tbody > tr:nth-child("+i+") > td:nth-child(4)";
       var silverRatesPMSelector="#grdGallery > tbody > tr:nth-child("+i+") > td:nth-child(5)";
        //console.log('times ...........'+i)

       var dateValue=await page.$$(dateSelector);
       var goldRatesAMValue=await page.$$(goldRatesAMSelector);
       var goldRatesPMValue=await page.$$(goldRatesPMSelector);
       var silverRatesAMValue=await page.$$(silverRatesAmSelector);
       var silverRatesPMValue=await page.$$(silverRatesPMSelector);

       var dateo = await page.evaluate(el => el.innerText, dateValue[0]);
       var goldRatesAMO = await page.evaluate(el => el.innerText, goldRatesAMValue[0]);
       var goldRatesPMO = await page.evaluate(el => el.innerText, goldRatesPMValue[0]);
       var silverRatesAMO = await page.evaluate(el => el.innerText, silverRatesAMValue[0]);
       var silverRatesPMO = await page.evaluate(el => el.innerText, silverRatesPMValue[0]);




        //console.log('date ...........'+dateo)

        writer = csvWriter({sendHeaders: false});
        writer.pipe(fs.createWriteStream(csvFilename, {flags: 'a'}));
        writer.write({
        header1: dateo,
        header2: goldRatesAMO,
        header3: goldRatesPMO,
        header4 : silverRatesAMO,
        header5: silverRatesPMO

});
writer.end()

        if(dateo.includes('2013')){
            break loop1;
        }
      
  }
  console.log("value for j is"+j)
  await page.waitForXPath(newxpath)
  var nextPage=await page.$x(newxpath)
  await nextPage[0].click();
  await page.waitForNavigation(['networkidle0']);
  

  j=j+1;
}
    //console.log('End ...........')
    await page.close()
    await browser.close()
    //await browser.close();
  
})()
