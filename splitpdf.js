const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const splitPDF = async (pdfFilePath, outputDirectory, startPage, endPage) => {

    const data = await fs.promises.readFile(pdfFilePath);
    const readPdf = await PDFDocument.load(data);
    const { length } = readPdf.getPages();

    const writePdf = await PDFDocument.create();
    for (let i = startPage - 1, n = endPage; i < n; i += 1) {
        const [page] = await writePdf.copyPages(readPdf, [i]);
        writePdf.addPage(page);
    }
    const bytes = await writePdf.save();
    const outputPath = path.join(outputDirectory, `SplitPdf_${startPage}-${endPage}.pdf`);
    await fs.promises.writeFile(outputPath, bytes);
    console.log(`Added ${outputPath}`);
}

module.exports = { splitPDF }
