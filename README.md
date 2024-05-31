# PDiF
Have you ever tried had to grade a second draft of a 15-page final? Only to find out the student only changed 3 words?! PDiF to the rescue! This app runs a Meyer's diffing algorithm on 2 pdfs and outputs the text of the pdf with removals highlighted in red, and additions highlighted in green.

### Contents

- [Quickstart](#quickstart)
  - [Output](#output)
- [API Documentation](#api-documentation)
- [Contact](#contact-and-copyright)

## Quickstart

![pdiff_screenshot](https://github.com/jonalfarlinga/pdiff/assets/138133515/93e94bc5-f145-4b6a-a852-e4deb8497760)

Navigate to [PDiF](https://pdiff.proficientdr.com)

1. Choose two versions of the same PDF document using the file selectors.

2. Check `Paginate Results?` if you want the output separated by page.

3. Click `Get Differences`

### Output

After a short delay, PDiF creates a summary of the text of the document.

By default, all lines of the document are presented in one page. If `Paginate Results?` is checked, the results will be separated into pages as closely as possible to the original documents.

`Paginate Results?` will also operate as a toggle, changing the output without fetching new data.

Unchanged lines will be rendered in blue text, additions in green and removals in red.

![pdiff](https://github.com/jonalfarlinga/pdiff/assets/138133515/4827838c-8504-442f-8495-81ec788f109a)

## API Documentation

- /api/diff-pdf

Takes a GET request that contains two pdf files as multipart-form-encoded data.

The API is hosted on Azure Functions and on a successful request, the files are read in as `BytesIO` objects, then passed to the `compare_pdfs` function.

The `compare_pdfs` function creates Document objects from the file streams, extracts the text by line, compares them using Meyer's diff, and summarizes them as an array.

A successful request returns a JSON body with one key:

```json
{
    "diff": [
        "    1: Page number: 0",
        "    2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus mauris id molestie sagittis."
        "    3: Vivamus at congue leo, ut cursus risus. Nullam mollis condimentum dolor et mattis. Ut id mi eget"
    ]
}
```

If the backend can't successfully load the documents, then it will return a 400 error with the message "Failed to read input files".

## Contact and Copyright

Created by Denny Bucklin aka [jonalfarlinga](https://github.com/jonalfarlinga)

This work is provided for educational and informational purposes. No consideration or attribution necessary as long as this work is not used to generate revenue.
