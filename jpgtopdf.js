const imgToPDF = require('image-to-pdf')
const fs = require('fs')
const { page } = require('pdfkit')

const jpgToPDF = async (images) => {
    var pagesPath = []
    for (let i = 0; i < images.length; i++) {
        pagesPath.push(images[i][1].path)
    }
    imgToPDF(pagesPath, imgToPDF.sizes.A4)
        .pipe(fs.createWriteStream('public/output.pdf'))
}

module.exports = {jpgToPDF}
