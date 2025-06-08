// byebye.js
// This script displays a relocation notice for renj's old poetry website,
// guiding visitors to the new domain.

(function() {
    // Check if the script is running on the expected old domain.
    // This is a safety check to prevent it from showing up on the new domain accidentally.
    const currentDomain = window.location.hostname;
    if (currentDomain === 'poems.renj.top' || currentDomain === 'renj.top') {
        // If it's already on the new domain, don't show the notice.
        console.log('byebye.js: Already on the new domain. Notice will not be displayed.');
        return;
    }

    // --- Create the modal container ---
    const modalContainer = document.createElement('div');
    modalContainer.id = 'renj-relocation-notice';
    modalContainer.className = 'fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center p-4 z-[9999]'; // High z-index to ensure it's on top

    // --- Create the modal content box ---
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full text-center transform scale-95 opacity-0 transition-all duration-300 ease-out'; // Initial state for animation

    // --- Add the relocation message ---
    const message = document.createElement('p');
    message.className = 'text-gray-800 text-lg md:text-xl font-semibold mb-6 leading-relaxed';
    message.innerHTML = 'Hello there! This page has gracefully relocated to a new home.<br>You are now invited to explore renj\'s poems at its new digital address.';
    modalContent.appendChild(message);

    // --- Add the buttons container ---
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 justify-center';

    // --- "Go to renj's poems" button ---
    const goToPoemsBtn = document.createElement('a');
    goToPoemsBtn.href = 'https://poems.renj.top/';
    goToPoemsBtn.className = 'inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-md';
    goToPoemsBtn.textContent = 'Go to renj\'s poems';
    goToPoemsBtn.target = '_blank'; // Open in a new tab
    goToPoemsBtn.rel = 'noopener noreferrer'; // Security best practice for target="_blank"
    buttonsContainer.appendChild(goToPoemsBtn);

    // --- "Go to personal website" button ---
    const goToPersonalSiteBtn = document.createElement('a');
    goToPersonalSiteBtn.href = 'https://renj.top/';
    goToPersonalSiteBtn.className = 'inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-md';
    goToPersonalSiteBtn.textContent = 'Go to personal website';
    goToPersonalSiteBtn.target = '_blank'; // Open in a new tab
    goToPersonalSiteBtn.rel = 'noopener noreferrer'; // Security best practice for target="_blank"
    buttonsContainer.appendChild(goToPersonalSiteBtn);

    modalContent.appendChild(buttonsContainer);
    modalContainer.appendChild(modalContent);

    // --- Append to the body and animate in ---
    document.body.appendChild(modalContainer);

    // Trigger the animation after a short delay to ensure rendering
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 100); // Small delay for smooth entry
})();
