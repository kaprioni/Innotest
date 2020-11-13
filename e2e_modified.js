// Precond data
const targetURL = "https://www.sandbox.paypal.com/"
const email = "sb-7znmw3731036@personal.example.com"
const password = "hB-h-r%5"
    
// Test data
const cardLast4Digits = 2072
const price = "$100.00"

// Setup
browser.ignoreSynchronization = true
const until = protractor.ExpectedConditions

describe('checking payment info at Paypal sandbox', function() {
    // Precondition
    (function() {
        browser.driver.get(targetURL).then(() => {
            browser.driver.manage().window().maximize()

            awaitElement(by.id, 'ul-btn').then(el => el.click())
            
            awaitElement(by.id, 'email').then(el => el.sendKeys(email))
            awaitElement(by.id, 'btnNext').then(el => el.click())
            
            awaitElement(by.id, 'password').then((el) => el.sendKeys(password))
            awaitElement(by.id, 'btnLogin').then(el => el.click())

            awaitElement(by.className, 'cw_tile-itemList', first = true).then((el) => el.click())
        })
    })()

    // Я ненавижу эти километровые xpath'ы и очень хочу узнать, как это можно сделать элегантнее и читабельнее. 
    it('Should check payment amount', function() {
        awaitElement(by.xpath, '//*[@id="js_transactionDetailsHeaderView"]/div/div[2]').then((el) => {
            el.getText((text) => expect(text).toContain(price))
        })
    })

    it('Should check last 4 digits of a card', function() {
        awaitElement(by.xpath, '//*[@id="js_transactionDetailsView"]/div/div[2]/div[1]/div[1]/div[2]/dl[1]/div/div/div/div[1]/span/span').then((el) => {
            el.getText().then((text => expect(text).toContain(cardLast4Digits)))
        })
    })
})

async function awaitElement(locatorType, locator, isFirst = false, timeout = 10000){
    return isFirst
        ? await browser.wait(until.visibilityOf(element.all(locatorType(locator)).first()), timeout) && element.all(locatorType(locator)).first()
        : await browser.wait(until.visibilityOf(element(locatorType(locator))), timeout) && element(locatorType(locator))
}


  


