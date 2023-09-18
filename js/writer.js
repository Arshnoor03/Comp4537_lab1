// Define an object to encapsulate the functionality
const NoteManager = {
    init: function () {
        // Initialize event listeners and load stored information
        this.addEventListeners();
        this.loadStoredInfo();
    },
  
    addEventListeners: function () {
        // Add event listener to the "Add" button
        const addButton = document.getElementById('addButton');
        addButton.addEventListener('click', this.handleAddButtonClick.bind(this));
    },
  
    handleAddButtonClick: function () {
        const infoText = document.getElementById('info').value;
        if (infoText.trim() !== '') {
            // Create an object to store the entered information with a timestamp
            const infoObject = {
                text: infoText,
                timestamp: new Date().toLocaleString()
            };
    
            // Store the object in an array in local storage
            let infoArray = JSON.parse(localStorage.getItem('infoArray')) || [];
            infoArray.push(infoObject);
            localStorage.setItem('infoArray', JSON.stringify(infoArray));
    
            // Update and display the last saved time
            this.updateLastSavedTime();
    
            // Create and display the info box
            this.createInfoBox(infoText, infoObject.timestamp);
    
            // Clear the text area
            document.getElementById('info').value = '';
        }
    },
  
    loadStoredInfo: function () {
        const infoArray = JSON.parse(localStorage.getItem('infoArray')) || [];
        for (const infoObject of infoArray) {
            this.createInfoBox(infoObject.text, infoObject.timestamp);
        }
        // Update and display the last saved time
        this.updateLastSavedTime();
    },
  
    createInfoBox: function (infoText, timestamp) {
        const infoContainer = document.getElementById('infoContainer');
  
        // Create a container for each info box and remove button
        const boxContainer = document.createElement('div');
        boxContainer.className = 'box-container';
  
        // Create a remove button for this info box
        const removeButton = document.createElement('span');
        removeButton.className = 'remove-button';
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            infoContainer.removeChild(boxContainer); // Remove the entire container
            this.removeInfoFromLocalStorage(infoText); // Remove the info from local storage
            // Update and display the last saved time after removal
            this.updateLastSavedTime();
        });
  
        // Create the info box
        const infoBox = document.createElement('div');
        infoBox.className = 'info-box';
        infoBox.appendChild(document.createTextNode(infoText)); // Display the info text only
  
        // Add the remove button and info box to the container
        boxContainer.appendChild(removeButton);
        boxContainer.appendChild(infoBox);
  
        // Add the container to the info container
        infoContainer.appendChild(boxContainer);
    },
  
    removeInfoFromLocalStorage: function (infoText) {
        let infoArray = JSON.parse(localStorage.getItem('infoArray')) || [];
        infoArray = infoArray.filter(infoObject => infoObject.text !== infoText);
        localStorage.setItem('infoArray', JSON.stringify(infoArray));
    },
  
    updateLastSavedTime: function () {
        const lastSaved = document.getElementById('lastSaved');
        const now = new Date();
        lastSaved.textContent = `Last saved: ${now.toLocaleString()}`;
    }
};

// Initialize the NoteManager
NoteManager.init();
