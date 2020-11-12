describe('checking payment info at Paypal sandbox', function() {
    // Precond data
    const email = "sb-7znmw3731036@personal.example.com"
    const password = "hB-h-r%5"
    
    // Test data
    const cardLast4Digits = 2072
    const price = "$100.00"

    // Setup
    const elementAwaitTimeout = 10000
    browser.ignoreSynchronization = true
    const until = protractor.ExpectedConditions

    // Precondition
    beforeEach(function() {
        browser.driver.get('https://www.sandbox.paypal.com/').then(() => {
            browser.driver.manage().window().maximize()

            element(by.id('ul-btn')).click()
            element(by.id('email')).sendKeys(email)
            element(by.id('btnNext')).click()
        
            browser.wait(until.visibilityOf(element(by.id("password"))), elementAwaitTimeout)
            element(by.id('password')).sendKeys(password)
            element(by.id('btnLogin')).click()

            browser.wait(until.visibilityOf(element.all((by.className("cw_tile-itemList"))).first()), elementAwaitTimeout)
            element.all(by.className('cw_tile-itemList')).first().click()
        })
    })

    /* 
        Я ненавижу эти километровые xpath'ы и очень хочу узнать, как это можно сделать элегантнее и читабельнее. Кроме того,
        использовние BeforeEach здесь немного странное, с моей точки зрения. По правильному, мне нужно выполнить код из BeforeEach 
        ровно 1 раз, и затем выполнить по отдельности каждый тест из тех, что ниже (там 2 expect'a, тогда как логичнее было бы 
        иметь по 1 expect'у в каждом тесте). 
     */
    it('Should check payment amount and last 4 digits of a card', function() {
        browser.wait(until.visibilityOf(element(by.xpath('//*[@id="js_transactionDetailsHeaderView"]/div/div[2]'))), elementAwaitTimeout)
        element(by.xpath('//*[@id="js_transactionDetailsHeaderView"]/div/div[2]')).getText().then((text) => {
            expect(text).toContain(price)    
        })

        element(by.xpath('//*[@id="js_transactionDetailsView"]/div/div[2]/div[1]/div[1]/div[2]/dl[1]/div/div/div/div[1]/span/span')).getText().then((text) => {
            expect(text).toContain(cardLast4Digits)    
        })
    })
})


  


