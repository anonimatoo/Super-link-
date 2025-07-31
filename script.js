import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('download-form');
    const urlInput = document.getElementById('url-input');
    const downloadBtn = document.getElementById('download-btn');
    const messageContainer = document.getElementById('message-container');

    const platformRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|instagram\.com|facebook\.com|tiktok\.com|pinterest\.com)\/.+$/;

    const showMessage = (text, type) => {
        messageContainer.innerHTML = `<div class="message message-${type}">${text}</div>`;
    };

    const simulateDownload = (url) => {
        // Step 1: Show loading state
        showMessage('Analisando link...', 'info');
        downloadBtn.disabled = true;
        downloadBtn.textContent = 'Aguarde...';

        // Step 2: Simulate API call delay
        setTimeout(() => {
            // Randomly succeed or fail
            const isSuccess = Math.random() > 0.2; // 80% chance of success

            if (isSuccess) {
                // Step 3: Success state
                showMessage('Vídeo encontrado! Seu download começará em breve.', 'success');
                downloadBtn.textContent = 'Sucesso!';
                confetti({
                    particleCount: 150,
                    spread: 180,
                    origin: { y: 0.6 }
                });
                
                // Step 4: Illustrate a fake download starting
                setTimeout(() => {
                    // Create a fake blob and download link
                    const fakeFileName = 'video-neon-downloads.mp4';
                    const fakeBlob = new Blob(["Simulação de download do NEON DOWNLOADS para o link: " + url], { type: 'text/plain' });
                    const downloadUrl = URL.createObjectURL(fakeBlob);
                    const a = document.createElement('a');
                    a.href = downloadUrl;
                    a.download = fakeFileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(downloadUrl);

                    // Reset button after "download"
                    resetForm();
                }, 2000);
            } else {
                // Step 3: Error state
                showMessage('Erro ao processar o vídeo. Tente outro link.', 'error');
                resetForm();
            }

        }, 2500); // Simulate 2.5 seconds of processing
    };
    
    const resetForm = () => {
        downloadBtn.disabled = false;
        downloadBtn.textContent = 'Baixar';
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = urlInput.value.trim();
        
        if (!url) {
            showMessage('Por favor, insira um link.', 'error');
            return;
        }

        if (!platformRegex.test(url)) {
            showMessage('Link inválido ou plataforma não suportada.', 'error');
            return;
        }

        simulateDownload(url);
    });
});

