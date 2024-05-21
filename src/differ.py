import fitz
import difflib


def extract_text_from_pdf(pdf_path):
    document = fitz.open(pdf_path)
    text = ""
    for page_num in range(document.page_count):
        text += f"Page number: {page_num}\n"
        page = document.load_page(page_num)
        text += page.get_text("text")
    return text


def compare_texts(text1, text2):
    diff = difflib.unified_diff(
        text1.splitlines(),
        text2.splitlines(),
        lineterm=''
    )
    return list(diff)


def leftpad(line):
    spaces = 4
    num = line
    while spaces > 0:
        if num // 10 == 0:
            break
        spaces -= 1
        num //= 10
    return " " * spaces + str(line)


def summarize_changes(diff):
    summary = []
    count = -2
    for line in diff:
        count += 1
        if line[:1] in "-+?":
            summary.append(
                line[:1] + leftpad(count) + f":{line[1:]}"
            )
        else:
            summary.append(
                " " + leftpad(count) + f":{line[1:]}"
            )
    return summary[2:]


def compare_pdfs(pdf1_path, pdf2_path):
    pdf1_text = extract_text_from_pdf(pdf1_path)
    pdf2_text = extract_text_from_pdf(pdf2_path)

    diff = compare_texts(pdf1_text, pdf2_text)
    full_summary = summarize_changes(diff)
    return full_summary


if __name__ == "__main__":
    pdf1_path = 'doc1.pdf'
    pdf2_path = 'doc2.pdf'
    summary = compare_pdfs(pdf1_path, pdf2_path)
    for line in summary:
        print(line)
