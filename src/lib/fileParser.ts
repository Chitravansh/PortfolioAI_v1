import * as pdfjsLib from 'pdfjs-dist/build/pdf.mjs';
import mammoth from 'mammoth';

// Set worker path for pdfjs
// Using unpkg for the worker as it's more reliable for specific versions
const PDFJS_VERSION = '5.4.624'; 
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

export const extractTextFromFile = async (file: File): Promise<string> => {
  if (!pdfjsLib.getDocument) {
    console.error('pdfjsLib not loaded correctly:', pdfjsLib);
    throw new Error('PDF library failed to initialize. Please try a different file format.');
  }
  console.log('Extracting text from file:', file.name, 'type:', file.type);
  const extension = file.name.split('.').pop()?.toLowerCase();
  let text = '';

  try {
    if (extension === 'pdf') {
      text = await extractTextFromPdf(file);
    } else if (extension === 'docx') {
      text = await extractTextFromDocx(file);
    } else {
      text = await file.text();
    }
  } catch (err: any) {
    console.error('Extraction error for', extension, ':', err);
    // Fallback to basic text reading if specialized extraction fails
    console.log('Attempting fallback to basic text reading...');
    text = await file.text();
  }

  if (!text || text.trim().length < 20) {
    console.error('Extracted text too short or empty:', text);
    throw new Error("Could not extract enough text from the file. Please ensure it's a valid resume or try a different format (like .txt).");
  }

  return text;
};

const extractTextFromPdf = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ 
      data: arrayBuffer,
      useWorkerFetch: true,
      isEvalSupported: false
    });
    const pdf = await loadingTask.promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => (item as any).str);
      fullText += strings.join(' ') + '\n';
    }
    return fullText;
  } catch (error: any) {
    console.error('PDF extraction error:', error);
    throw new Error(`Failed to read PDF: ${error.message}`);
  }
};

const extractTextFromDocx = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error: any) {
    console.error('Docx extraction error:', error);
    throw new Error(`Failed to read DOCX: ${error.message}`);
  }
};
