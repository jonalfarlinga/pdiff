import { PDFDocument } from 'pdf-lib';
import { readFileSync } from 'fs';
import { diffLines } from 'diff';

async function extractTextFromPdf(pdfPath) {
    const existingPdfBytes = readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    let text = "";

    for (let i = 0; i < pages.length; i++) {
        text += `Page number: ${i}\n`;
        const page = pages[i];
        const pageText = await page.getTextContent();
        const pageTextItems = pageText.items.map(item => item.str).join('\n');
        text += pageTextItems;
    }

    return text;
}

function compareTexts(text1, text2) {
    const diff = diffLines(text1, text2, {newlineIsToken:true});
    return diff;
}

function leftpad(line) {
    const spaces = 4;
    let num = line;
    let result = num.toString();
    while (result.length < spaces) {
        result = " " + result;
    }
    return result;
}

function summarizeChanges(diff) {
    const summary = [];
    let count = -2;
    diff.forEach((part, index) => {
        if (part.added || part.removed) {
            const lines = part.value.split('\n');
            lines.forEach(line => {
                count += 1;
                if (line) {
                    summary.push((part.added ? '+' : '-') + leftpad(count) + `:${line}`);
                }
            });
        } else {
            const lines = part.value.split('\n');
            lines.forEach(line => {
                count += 1;
                if (line) {
                    summary.push(" " + leftpad(count) + `:${line}`);
                }
            });
        }
    });
    return summary;
}

async function comparePdfs(pdf1Path, pdf2Path) {
    const pdf1Text = await extractTextFromPdf(pdf1Path);
    const pdf2Text = await extractTextFromPdf(pdf2Path);

    const diff = compareTexts(pdf1Text, pdf2Text);
    const fullSummary = summarizeChanges(diff);
    return fullSummary;
}

// Example usage
(async () => {
    const pdf1Path = 'test 4350.pdf';
    const pdf2Path = 'test 5350.pdf';
    const summary = await comparePdfs(pdf1Path, pdf2Path);
    summary.forEach(line => {
        console.log(line);
    });
})();
