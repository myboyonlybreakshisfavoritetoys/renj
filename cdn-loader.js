(function() {
    const githubUser = "myboyonlybreakshisfavoritetoys";
    const githubRepo = "renj";
    const cdnBaseUrl = `https://cdn.jsdelivr.net/gh/${githubUser}/${githubRepo}`;

    function updateImageSrc(imgElement) {
        const currentSrc = imgElement.getAttribute('src');
        if (currentSrc && !currentSrc.startsWith('http')) {
            imgElement.setAttribute('src', `${cdnBaseUrl}/${currentSrc}`);
        }
    }

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

    observer.observe(document.body, { childList: true, subtree: true });

    document.querySelectorAll('img').forEach(updateImageSrc);

    const iconBasePath = `https://poems.renj.top/renjwhite.png`;

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
        if (!document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
            document.head.appendChild(link);
        }
    }

    addLinkTag('icon', iconBasePath, null, 'image/png');

    addLinkTag('apple-touch-icon', iconBasePath, '180x180');

    addLinkTag('icon', iconBasePath, '192x192', 'image/png');

    const pageDescription = "renj's poems: a place where thoughts unfold, touching on life's wild beauty – its light, its dark, the endless sky, the deep sea. poetry, always here, always with us.";

    function addMetaDescription(description) {
        let metaDescriptionTag = document.head.querySelector('meta[name="description"]');

        if (!metaDescriptionTag) {
            metaDescriptionTag = document.createElement('meta');
            metaDescriptionTag.name = "description";
            document.head.appendChild(metaDescriptionTag);
        }
        metaDescriptionTag.content = description;
    }

    addMetaDescription(pageDescription);

})();
