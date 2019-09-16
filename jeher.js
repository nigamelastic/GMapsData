const puppeteer = require('puppeteer');


console.log('Starting');
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
        console.log('times ...........'+i)

       var dateValue=await page.$$(dateSelector);

       var dateo = await page.evaluate(el => el.innerText, dateValue[0]);
        console.log('date ...........'+dateo)

        if(dateo.includes('2013')){
            break loop1;
        }
      
  }
  console.log("value for j is"+j)
  await page.waitForXPath(newxpath)
  var nextPage=await page.$x(newxpath)
  await nextPage[0].click();
  await page.waitForNavigation();
  

  j=j+1;
}
    console.log('End ...........')
    await page.close()
    await browser.close()
    //await browser.close();
  
})()
