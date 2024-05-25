import json
import azure.functions as func
import logging
from src.differ import compare_pdfs

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)


@app.route(route="diff-pdf")
def diff_pdf(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Calculating diff')

    pdf1_file = req.files.get('pdf1')
    pdf2_file = req.files.get('pdf2')

    if pdf1_file and pdf2_file:
        diff_summary = compare_pdfs(pdf1_file, pdf2_file)

        return func.HttpResponse(
            json.dumps({
                "diff": diff_summary
            }))
    else:
        return func.HttpResponse(
            "Failed to read input files",
            status_code=400
        )
