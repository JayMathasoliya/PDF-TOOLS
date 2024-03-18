// const fs = require('fs').promises;
// const libre = require('libreoffice-convert');
// const path = require('path');
// const { promisify } = require('bluebird')
// const libreConvert = promisify(libre.convert);

// const wordToPDF = async (name) => {
//     try {
//         let arr = name.split('.')
//         const enterPath = path.join(__dirname, `${name}`);
//         const outputPath = path.join(__dirname, `${arr[0]}.pdf`);
//         // Read file
//         let data = await fs.readFile(enterPath)
//         let done = await libreConvert(data, '.pdf', undefined)
//         await fs.writeFile(outputPath, done)
//         return { success: true, fileName: arr[0] };
//     } catch (err) {
//         console.log(err)
//         return { success: false }
//     }
// }

// wordToPDF("(7)-Assignments_ADA.docx")

