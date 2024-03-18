const express = require('express')
const path = require('path')
const multer = require('multer')
const { mergePdfs } = require('./mergepdf')
const { splitPDF } = require('./splitpdf')
const { jpgToPDF } = require('./jpgtopdf')
const upload = multer({ dest: 'uploads/' })
const app = express()
app.use('/static', express.static('public'))
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"))
})

app.get('/mergepdf', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/merge.html"))
})

app.post('/mergepdf', upload.array('pdfs', 3), async (req, res, next) => {
    await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path), path.join(__dirname, req.files[2].path))
    res.redirect("http://localhost:3000/static/merged.pdf")
})

app.get('/splitpdf', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/split.html"))
})

const cpUpload = upload.fields([{ name: 'pdf' }, { name: 'startRange' }, { name: 'endRange' }])
app.post('/splitpdf', cpUpload, async (req, res, next) => {
    await splitPDF(path.join(__dirname, req.files.pdf[0].path), path.join(__dirname, '/public'), req.body.startRange, req.body.endRange)
    res.redirect(`http://localhost:3000/static/SplitPdf_${req.body.startRange}-${req.body.endRange}.pdf`)
})

app.get('/compresspdf', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/compress.html"))
})


app.get('/jpg_to_pdf', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/jpgtopdf.html"))
})
app.post('/jpg_to_pdf', upload.array('images'), async (req, res, next) => {
    const imagesArray = Object.entries(req.files)
    jpgToPDF(imagesArray)
    res.redirect("http://localhost:3000/static/output.pdf")
})
app.get('/word_to_pdf', (req, res) => {
    res.sendFile(path.join(__dirname,"templates/wordtopdf.html"))
})
app.get('/powerpoint_to_pdf', (req, res) => {
    res.sendFile(path.join(__dirname,"templates/pptopdf.html"))
})
app.get('/excel_to_pdf', (req, res) => {
    res.sendFile(path.join(__dirname,"templates/exceltopdf.html"))
})
app.get('/html_to_pdf', (req, res) => {
    res.sendFile(path.join(__dirname,"templates/htmltopdf.html"))
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})