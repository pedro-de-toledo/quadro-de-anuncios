// URL do PDF a ser carregado
const pdfUrl = "Reunião_Fim_Semana_Janeiro_2025.pdf";

// Contêiner para exibir as páginas do PDF
const pdfPagesContainer = document.getElementById("pdf-pages");

// Função para renderizar todas as páginas do PDF
const renderAllPages = (pdfDoc) => {
    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        pdfDoc.getPage(pageNum).then((page) => {
            // Cria um elemento canvas para cada página
            const canvas = document.createElement("canvas");
            canvas.className = "pdf-page";
            pdfPagesContainer.appendChild(canvas);

            const ctx = canvas.getContext("2d");
            const viewport = page.getViewport({ scale: 1.5 }); // Ajuste de escala

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            // Renderiza a página no canvas
            page.render({
                canvasContext: ctx,
                viewport: viewport,
            });
        });
    }
};

// Carrega o PDF usando PDF.js e renderiza suas páginas
pdfjsLib.getDocument(pdfUrl).promise.then((pdfDoc) => {
    renderAllPages(pdfDoc);
}).catch((err) => {
    console.error("Erro ao carregar o PDF:", err);
});