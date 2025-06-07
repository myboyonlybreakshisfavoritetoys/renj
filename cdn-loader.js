// cdn-loader.js

// This script automatically rewrites relative image and favicon paths
// to use the jsDelivr CDN, improving load times for your GitHub Pages site.

document.addEventListener('DOMContentLoaded', () => {
    // === CONFIGURATION START ===
    // IMPORTANT:
    // 1. Replace 'your-username' with your actual GitHub username.
    //    Example: If your GitHub profile is https://github.com/john-doe, your username is 'john-doe'.
    const GITHUB_USERNAME = 'myboyonlybreakshisfavoritetoys';

    // 2. Replace 'your-repo-name' with the exact name of your GitHub repository
    //    that hosts your website.
    //    Example: If your repository is https://github.com/john-doe/my-poems-website, your repo name is 'my-poems-website'.
    const GITHUB_REPO_NAME = 'renj';
    // === CONFIGURATION END ===

    // Construct the base URL for jsDelivr CDN
    // This assumes your images are located within this GitHub repository.
    const JSDELIVR_BASE_URL = `https://cdn.jsdelivr.net/gh/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/`;

    // Function to determine if a given URL is a relative path
    // It checks if the URL starts with 'http://', 'https://', or '//' (protocol-relative)
    function isRelativeUrl(url) {
        return url && !url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('//');
    }

    // 1. Process all <img> tags in the document
    document.querySelectorAll('img').forEach(img => {
        const currentSrc = img.getAttribute('src'); // Get the current src attribute value

        // Only process if the src is a relative URL and not a placeholder image
        if (isRelativeUrl(currentSrc) && !currentSrc.includes('placehold.co')) {
            // Rewrite the src attribute to use the jsDelivr CDN URL
            img.setAttribute('src', JSDELIVR_BASE_URL + currentSrc);
            console.log(`Rewrote image src: ${currentSrc} -> ${img.getAttribute('src')}`);
        }
    });

    // 2. Process <link> tags for favicons
    // Favicons are often relative paths and should also benefit from CDN caching.
    document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]').forEach(link => {
        const currentHref = link.getAttribute('href'); // Get the current href attribute value

        // Only process if the href is a relative URL
        if (isRelativeUrl(currentHref)) {
            // Rewrite the href attribute to use the jsDelivr CDN URL
            link.setAttribute('href', JSDELIVR_BASE_URL + currentHref);
            console.log(`Rewrote favicon href: ${currentHref} -> ${link.getAttribute('href')}`);
        }
    });

    // Note: This script focuses on <img> tags and favicons.
    // For background images defined directly in CSS files, more advanced techniques
    // (like a build process to rewrite CSS URLs) would be needed, as JavaScript
    // cannot easily modify URLs within external CSS files after they've loaded.
    // However, for most performance gains related to "photos", targeting <img> tags is highly effective.
});
