import fitz
import difflib

# RESET = '\033[39;49m'
# RED = '\x1b[38;5;1m'
# GREEN = '\x1b[38;5;2m'
# BLUE = '\x1b[38;5;4m'
RESET = ''
RED = ''
GREEN = ''
BLUE = ''


def open_pdf(pdf_path=None, pdf_stream=None):
    if pdf_path:
        return fitz.open(pdf_path)
    elif pdf_stream:
        return fitz.open(stream=pdf_stream)


def extract_text_from_pdf(document):
    text = ""
    for page_num in range(document.page_count):
        text += f"Page number: {page_num}\n"
        page = document.load_page(page_num)
        text += page.get_text("text")
    return text


def compare_texts(text1, text2):
    diff = difflib.ndiff(
        text1.splitlines(),
        text2.splitlines(),
    )
    return list(diff)


def leftpad(line_num):
    spaces = 4
    line_num = str(line_num)
    spaces -= len(line_num)
    return " " * spaces + line_num


def summarize_changes(diff):
    summary = []
    count = 0
    for line in diff:
        count += 1
        if line[:1] in "-":
            summary.append(
                f"{RED}{line[:1]}{leftpad(count)}:{line[1:]}{RESET}"
            )
        elif line[:1] == "+":
            summary.append(
                f"{GREEN}{line[:1]}{leftpad(count)}:{line[1:]}{RESET}"
            )
        else:
            summary.append(
                f"{BLUE} {leftpad(count)}:{line[1:]}{RESET}"
            )
    return summary


def compare_pdfs(pdf1_input, pdf2_input):
    if isinstance(pdf1_input, str):
        document1 = open_pdf(pdf1_input)
    else:
        document1 = open_pdf(pdf_stream=pdf1_input)
    if isinstance(pdf2_input, str):
        document2 = open_pdf(pdf2_input)
    else:
        document2 = open_pdf(pdf_stream=pdf2_input)

    pdf1_text = extract_text_from_pdf(document1)
    pdf2_text = extract_text_from_pdf(document2)

    diff = compare_texts(pdf1_text, pdf2_text)
    full_summary = summarize_changes(diff)
    return full_summary


if __name__ == "__main__":
    pdf1_path = 'doc1.pdf'
    pdf2_path = 'doc2.pdf'
    summary = compare_pdfs(pdf1_path, pdf2_path)
    for line in summary:
        print(line)
