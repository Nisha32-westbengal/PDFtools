// Word Counter Tool Functionality
class WordCounter {
    constructor() {
        this.textInput = document.getElementById('text-input');
        this.wordCount = document.getElementById('word-count');
        this.charCount = document.getElementById('char-count');
        this.sentenceCount = document.getElementById('sentence-count');
        this.paragraphCount = document.getElementById('paragraph-count');
        this.copyButton = document.getElementById('copy-text');
        this.clearButton = document.getElementById('clear-text');

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Update counts on text input
        this.textInput.addEventListener('input', () => this.updateCounts());

        // Copy text functionality
        this.copyButton.addEventListener('click', () => this.copyText());

        // Clear text functionality
        this.clearButton.addEventListener('click', () => this.clearText());
    }

    updateCounts() {
        const text = this.textInput.value;

        // Update word count
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        this.wordCount.textContent = words.length;

        // Update character count
        this.charCount.textContent = text.length;

        // Update sentence count
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        this.sentenceCount.textContent = sentences.length;

        // Update paragraph count
        const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
        this.paragraphCount.textContent = paragraphs.length;

        // Save to local storage
        this.saveToLocalStorage(text);
    }

    copyText() {
        this.textInput.select();
        document.execCommand('copy');
        
        // Show toast notification
        this.showToast('Text copied to clipboard!');
    }

    clearText() {
        this.textInput.value = '';
        this.updateCounts();
        localStorage.removeItem('wordCounterText');
    }

    showToast(message) {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        // Create and show toast
        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.innerHTML = `
            <div class="toast-body">
                ${message}
            </div>
        `;
        toastContainer.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    saveToLocalStorage(text) {
        localStorage.setItem('wordCounterText', text);
    }

    loadFromLocalStorage() {
        const savedText = localStorage.getItem('wordCounterText');
        if (savedText) {
            this.textInput.value = savedText;
            this.updateCounts();
        }
    }

    // Additional utility methods
    getWordFrequency() {
        const text = this.textInput.value.toLowerCase();
        const words = text.match(/\b\w+\b/g) || [];
        const frequency = {};
        
        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });

        return frequency;
    }

    getReadingTime() {
        const words = this.textInput.value.trim().split(/\s+/).length;
        const wordsPerMinute = 200; // Average reading speed
        return Math.ceil(words / wordsPerMinute);
    }

    getSpeakingTime() {
        const words = this.textInput.value.trim().split(/\s+/).length;
        const wordsPerMinute = 130; // Average speaking speed
        return Math.ceil(words / wordsPerMinute);
    }
}

// Initialize the word counter when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const wordCounter = new WordCounter();
    wordCounter.loadFromLocalStorage();
}); 