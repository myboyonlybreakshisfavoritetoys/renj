// cdn-loader.js
// A whisper in the code, guiding assets through the digital skies.

(function() {
    // --- Part 1: The Swift Flight of Images ---
    // This verse orchestrates images, directing their journey
    // from the repository's quiet halls to the global embrace of the CDN.
    // Each pixel finds its swiftest path through jsDelivr's embrace.

    const githubUser = "myboyonlybreakshisfavoritetoys";
    const githubRepo = "renj";
    // The celestial path for images, a faster current from GitHub's stream.
    const cdnBaseUrl = `https://cdn.jsdelivr.net/gh/${githubUser}/${githubRepo}`;

    // A function to imbue an image's source with CDN magic.
    function updateImageSrc(imgElement) {
        const currentSrc = imgElement.getAttribute('src');
        // If a relative whisper, transform it into a global declaration.
        if (currentSrc && !currentSrc.startsWith('http')) {
            imgElement.setAttribute('src', `${cdnBaseUrl}/${currentSrc}`);
        }
    }

    // A sentinel watching the DOM's growing tree,
    // ensuring new images find their CDN wings.
    const observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'IMG') {
                        updateImageSrc(node);
                    }
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        node.querySelectorAll('img').forEach(updateImageSrc);
                    }
                });
            }
        }
    });

    // Begin the watch over the document's unfolding narrative.
    observer.observe(document.body, { childList: true, subtree: true });

    // A first sweep of the visual landscape, gathering all images already present.
    document.querySelectorAll('img').forEach(updateImageSrc);

    // --- Part 2: Beacons for the Browser's Journey (Touch Icons & Favicon) ---
    // Here, we forge luminous links, guiding the browser's gaze
    // to radiant icons for every touch and glance, a visual promise.

    // The heart of our icons, a bright beacon from the domain's root.
    const iconBasePath = `https://poems.renj.top/renjwhite.png`;

    // A craftsman's touch, creating and weaving link elements into the document's head.
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
        // Ensuring no echo, only unique beacons shine.
        if (!document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
            document.head.appendChild(link);
        }
    }

    // The timeless emblem in browser tabs, a subtle mark.
    addLinkTag('icon', iconBasePath, null, 'image/png');

    // For the gentle touch of iOS, a guiding star on the home screen.
    addLinkTag('apple-touch-icon', iconBasePath, '180x180');

    // A vibrant standard for Android, welcoming every new journey.
    addLinkTag('icon', iconBasePath, '192x192', 'image/png');


    // --- Part 3: The Page's Quiet Introduction (Meta Description) ---
    // A concise narrative, whispered to search engines,
    // reflecting the site's essence for every seeker.

    const pageDescription = "renj's poems: a place where thoughts unfold, touching on life's wild beauty – its light, its dark, the endless sky, the deep sea. poetry, always here, always with us.";

    // Function to add the meta description tag
    function addMetaDescription(description) {
        // Check if a meta description already exists
        let metaDescriptionTag = document.head.querySelector('meta[name="description"]');

        if (!metaDescriptionTag) {
            // If no meta description exists, create a new one
            metaDescriptionTag = document.createElement('meta');
            metaDescriptionTag.name = "description";
            document.head.appendChild(metaDescriptionTag);
        }
        // Always update its content to ensure it's the desired description
        metaDescriptionTag.content = description;
    }

    // Call the function to add the meta description
    addMetaDescription(pageDescription);

})();
