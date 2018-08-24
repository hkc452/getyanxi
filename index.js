const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
    const YanXiUrl = 'http://doubanzy.com/?m=vod-detail-id-12333.html'

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(YanXiUrl);

    //  获取下载地址
    var YanXiAdds = await page.evaluate(() => {
        var list = [...document.querySelectorAll('.ardess:nth-child(6) .playlist.wbox li a')]
        return list.map(el => {
            let text = el.text
            let i = text.indexOf('https')
            return (i > -1 ? text.slice(i).replace('mp43','mp4') : '')
        })
    })
    console.log(YanXiAdds.length)
    fs.writeFileSync('./add.txt',YanXiAdds.join('\r\n'))
    await browser.close();
})();