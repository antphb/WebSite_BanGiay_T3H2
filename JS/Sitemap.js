function Sitemap() {
    const sitemap = document.querySelector('.sitemap');

    // * Start Add Sitemap

    if (sitemap) {
        const list = sitemap.getAttribute('data-sitemap-item').split(', ');
        const linkList = sitemap.getAttribute('data-sitemap-link').split(', ');
        const title = sitemap.getAttribute('data-sitemap-title');
        let sitemapHTML = `
            <div class="container sitemap__container">
                <h1 class="sitemap__title hidden-sm ${title ?? 'hidden'}">
                    ${title}
                </h1>
                <div class="sitemap__list">
                    ${
                        list.map((item, index) => `
                            <div class="sitemap__item">
                                <a href="${window.location.href.includes('WebSite_BanGiay_T3H2') ? '/WebSite_BanGiay_T3H2' : ''}${linkList[index] === '?' ? '' : linkList[index]}" class="sitemap__link">
                                    ${item}
                                </a>
                            </div>
                        `)
                            .join(`
                            <div class="sitemap__icon">
                                <i class="fas fa-angle-right"></i>
                            </div>
                        `)
                    }
                    
                </div>
            </div>
        `;
        sitemap.innerHTML = sitemapHTML;
    }

    // * End Add Sitemap
}