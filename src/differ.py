import fitz
import difflib


def extract_text_from_pdf(pdf_path):
    document = fitz.open(pdf_path)
    pages_text = []
    for page_num in range(document.page_count):
        page = document.load_page(page_num)
        pages_text.append(page.get_text("text"))
    return pages_text


def compare_texts(text1, text2):
    diff = difflib.unified_diff(
        text1.splitlines(),
        text2.splitlines(),
        lineterm=''
    )
    return list(diff)


def summarize_changes(diff):
    summary = []
    for line in diff:
        if line.startswith('+'):
            summary.append(line)
        elif line.startswith('-'):
            summary.append(line)
        elif line.startswith('?'):
            summary.append(line)
    return summary


def compare_pdfs(pdf1_path, pdf2_path):
    pdf1_text = extract_text_from_pdf(pdf1_path)
    pdf2_text = extract_text_from_pdf(pdf2_path)
    # for line in compare_texts(pdf1_text[0], pdf2_text[0]):
    # print(line)
    full_summary = []
    for page_num in range(len(pdf1_text)):
        diff = compare_texts(pdf1_text[page_num], pdf2_text[page_num])
        page_summary = summarize_changes(diff)
        # print(page_summary)
        full_summary.append(f"Page {page_num + 1} changes:")
        full_summary.extend(page_summary)
        full_summary.append("")  # Add a blank line for readability

    return full_summary


if __name__ == "__main__":
    # Example usage
    pdf1_path = 'doc2.pdf'
    pdf2_path = 'doc1.pdf'
    summary = compare_pdfs(pdf1_path, pdf2_path)
    for line in summary:
        print(line)
