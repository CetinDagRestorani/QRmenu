document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. MENÜ FİYATLARINI JSON'DAN ÇEKME İŞLEMİ ---
    fetch('aamenu.json')
        .then(response => response.json())
        .then(data => {
            for (const key in data) {
                const priceElement = document.getElementById(key);
                if (priceElement) {
                    priceElement.textContent = data[key];
                }
            }
        })
        .catch(error => {
            console.error("Fiyatlar yüklenirken bir hata oluştu:", error);
        });

    // --- 2. YUKARI KAYDIRINCA BELİREN ÜST MENÜ MANTIĞI ---
    let lastScrollTop = 0;
    const stickyNav = document.getElementById('sticky-top-nav');

    // Eğer sayfada stickyNav elementi varsa (hata almamak için) bu kodu çalıştır
    if (stickyNav) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Sayfa en üst kısımdaysa menüyü gizle (0-50px arası)
            if (scrollTop <= 50) {
                stickyNav.classList.remove('show');
            } 
            // Yukarı kaydırılıyorsa menüyü göster
            else if (scrollTop < lastScrollTop) {
                stickyNav.classList.add('show');
            } 
            // Aşağı kaydırılıyorsa menüyü gizle
            else {
                stickyNav.classList.remove('show');
            }
            
            // Mevcut kaydırma pozisyonunu bir sonraki kontrol için kaydet
            lastScrollTop = scrollTop;
        });
    }

// --- 3. YAN MENÜ AÇMA/KAPAMA 
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const sideMenu = document.getElementById('side-menu');
    const closeBtn = document.getElementById('close-btn');
    const menuOverlay = document.getElementById('menu-overlay');

    if (hamburgerBtn && sideMenu && closeBtn && menuOverlay) {
        // Hamburger ikonuna tıklayınca menüyü ve overlay'i aç
        hamburgerBtn.addEventListener('click', function() {
            sideMenu.classList.add('open');
            menuOverlay.classList.add('open');
        });

        // Çarpı (X) butonuna tıklayınca menüyü kapat
        closeBtn.addEventListener('click', function() {
            sideMenu.classList.remove('open');
            menuOverlay.classList.remove('open');
        });

        // Arkaplandaki siyah boşluğa tıklayınca menüyü kapat
        menuOverlay.addEventListener('click', function() {
            sideMenu.classList.remove('open');
            menuOverlay.classList.remove('open');
        });
    }

// --- 4. TAM EKRAN GALERİ (LIGHTBOX) MANTIĞI ---
    // Buraya galeride dönmesini istediğin resimlerin isimlerini sırayla ekle
    const galleryImages = [
        "disarifotograf.jpg",
        "disarifotograf2.jpg", 
        "disarifotograf3.jpg",
        "disarifotograf4.jpg",
        "disarifotograf5.jpg",
        "disarifotograf6.jpg",
    ];
    let currentImageIndex = 0;

    const galleryTrigger = document.getElementById('gallery-trigger');
    const lightbox = document.getElementById('lightbox-gallery');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    if (galleryTrigger && lightbox) {
        // 1. Resme tıklayınca galeriyi aç
        galleryTrigger.addEventListener('click', function() {
            currentImageIndex = 0; // Her açılışta ilk resimden başla
            lightboxImg.src = galleryImages[currentImageIndex];
            lightbox.classList.add('show');
        });

        // 2. Çarpı tuşuna tıklayınca galeriyi kapat
        lightboxClose.addEventListener('click', function() {
            lightbox.classList.remove('show');
        });

        // 3. Resmin dışındaki siyah alana tıklayınca da galeriyi kapat
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('show');
            }
        });

        // 4. İleri ok tuşuna basınca sonraki resme geç
        lightboxNext.addEventListener('click', function() {
            currentImageIndex++;
            if (currentImageIndex >= galleryImages.length) {
                currentImageIndex = 0; // Sona gelirse başa dön
            }
            lightboxImg.src = galleryImages[currentImageIndex];
        });

        // 5. Geri ok tuşuna basınca önceki resme geç
        lightboxPrev.addEventListener('click', function() {
            currentImageIndex--;
            if (currentImageIndex < 0) {
                currentImageIndex = galleryImages.length - 1; // Baştayken geriye basılırsa en sona git
            }
            lightboxImg.src = galleryImages[currentImageIndex];
        });
    }

});