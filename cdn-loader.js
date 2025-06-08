// cdn-loader.js

(function() {
    // --- PART 1: Existing CDN Loader Logic for Images ---
    // This part of the code finds all <img> tags and updates their src attribute
    // to point to the jsDelivr CDN.
    // It specifically targets images hosted in your GitHub repository.

    const githubUser = "myboyonlybreakshisfavoritetoys";
    const githubRepo = "renj";
    // Base URL for jsDelivr CDN for GitHub raw files
    const cdnBaseUrl = `https://cdn.jsdelivr.net/gh/${githubUser}/${githubRepo}`;

    // Function to update the src attribute of an image
    function updateImageSrc(imgElement) {
        // Get the current relative path from the src attribute
        const currentSrc = imgElement.getAttribute('src');

        // Check if the src is a relative path and not already a full CDN URL
        // We assume relative paths for assets within the GitHub Pages structure.
        if (currentSrc && !currentSrc.startsWith('http')) {
            const newSrc = `${cdnBaseUrl}/${currentSrc}`;
            imgElement.setAttribute('src', newSrc);
            // console.log(`CDN updated for: ${currentSrc} -> ${newSrc}`); // For debugging
        }
    }

    // Use a MutationObserver to watch for new <img> elements added to the DOM
    // This handles images that might be added dynamically after initial page load.
    const observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'IMG') {
                        updateImageSrc(node);
                    }
                    // Also check for <img> tags within newly added elements
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        node.querySelectorAll('img').forEach(updateImageSrc);
                    }
                });
            }
        }
    });

    // Start observing the entire document body for added nodes
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial scan for <img> tags already present in the DOM when the script runs
    document.querySelectorAll('img').forEach(updateImageSrc);

    // --- PART 2: New Logic for Dynamic Touch Icon and Favicon Injection ---
    // This part creates and appends <link> tags for various touch icons and favicons
    // directly into the <head> section of the document.

    // Define the base image path for your icons (renjwhite.png is in the root)
    // Now that Cloudflare is active, pointing to the root of your repo is fine,
    // as Cloudflare will cache it.
    // If you plan to move renjwhite.png to a subfolder, update this path accordingly.
    const iconBasePath = `https://poems.renj.top/renjwhite.png`; // Using full Cloudflare-enabled URL for consistency

    // Function to create and append a link element to the head
    function addLinkTag(rel, href, sizes = null, type = null) {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        if (sizes) {
            link.sizes = sizes;
        }
        if (type) {
            link.type = type;
        }
        // Prevent adding duplicate tags if the script runs multiple times (though it shouldn't)
        if (!document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
            document.head.appendChild(link);
            // console.log(`Added icon link: ${rel}, ${href}`); // For debugging
        }
    }

    // Add standard favicon (works in most browsers)
    addLinkTag('icon', iconBasePath, null, 'image/png'); // Can also use 'image/x-icon' if it's .ico

    // Add Apple Touch Icon (for iOS devices)
    // iOS devices look for specific sizes when a user adds your site to their home screen.
    // Common size: 180x180 for modern iPhones.
    addLinkTag('apple-touch-icon', iconBasePath, '180x180');

    // Add generic touch icon for Android/Chrome "Add to Home Screen"
    // Though modern Android often prefers manifest.json, this is a good fallback.
    addLinkTag('icon', iconBasePath, '192x192', 'image/png');

    // You can add more sizes/types if needed, e.g.:
    // addLinkTag('icon', iconBasePath, '32x32', 'image/png');
    // addLinkTag('icon', iconBasePath, '512x512', 'image/png');

    // Note: For a truly comprehensive icon setup for all devices (including Android PWA manifest,
    // Microsoft tiles, etc.), a dedicated tool or manifest.json file would be more robust.
    // However, these few lines cover the primary "touch icon" warning.

})();
