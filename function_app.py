import json
import azure.functions as func
import logging
from src.differ import compare_pdfs
import io

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)


@app.route(route="diff-pdf")
def diff_pdf(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Calculating diff')

    pdf1_file = req.files.get('pdf1')
    pdf2_file = req.files.get('pdf2')

    try:
        pdf1_input = io.BytesIO(pdf1_file.read())
        pdf2_input = io.BytesIO(pdf2_file.read())
    except Exception as e:
        logging.error(str(e))
        pdf1_input = None

    if pdf1_input and pdf2_input:
        diff_summary = compare_pdfs(pdf1_input, pdf2_input)

        return func.HttpResponse(
            json.dumps({
                "diff": diff_summary
            }))
    else:
        return func.HttpResponse(
            "Failed to read input files",
            status_code=400
        )
