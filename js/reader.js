class InfoManager {
    constructor() {
        this.displayedNotes = [];
        this.infoContainer = document.getElementById('infoContainer');
        this.lastRetrieved = document.getElementById('lastRetrieved');
        this.init();
    }

    init() {
        this.loadStoredInfo();
        setInterval(() => this.retrieveNotes(), 2000);
        this.retrieveNotes(); // Initial retrieval
    }

    loadStoredInfo() {
        const infoArray = JSON.parse(localStorage.getItem('infoArray')) || [];

        for (const infoObject of infoArray) {
            if (!this.displayedNotes.includes(infoObject.text)) {
                this.createInfoBox(infoObject.text, infoObject.timestamp);
                this.displayedNotes.push(infoObject.text);
            }
        }
    }

    createInfoBox(infoText) {
        const infoBox = document.createElement('div');
        infoBox.className = 'info-box';
    
        const textBox = document.createElement('textarea');
        textBox.rows = '4';
        textBox.cols = '50';
        textBox.value = infoText;
        textBox.readOnly = true;
    
        infoBox.appendChild(textBox);
        this.infoContainer.appendChild(infoBox);
    }
    

    retrieveNotes() {
        this.loadStoredInfo();
        const now = new Date();
        this.lastRetrieved.textContent = `Last retrieved: ${now.toLocaleString()}`;
    }
}

const infoManager = new InfoManager();
