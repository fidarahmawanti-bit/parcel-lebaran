// Clean URL address bar normalizer (removes .html from browser URL bar instantly)
(function () {
  if (typeof window !== "undefined" && window.location && window.location.protocol !== "file:") {
    var pathname = window.location.pathname;
    if (pathname.endsWith(".html")) {
      var clean = pathname.replace(/\.html$/, "");
      if (clean === "/index") clean = "/";
      window.history.replaceState(null, "", clean + window.location.search + window.location.hash);
    }
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  // 1. Zero-Reflow Scroll Controller using IntersectionObserver (Eliminates layout thrashing)
  const navbar = document.querySelector(".site-navbar");
  const backToTopBtn = document.getElementById("backToTop");

  if (navbar || backToTopBtn) {
    if ("IntersectionObserver" in window) {
      // Sentinel for navbar scrolled class
      const navSentinel = document.createElement("div");
      navSentinel.id = "perf-nav-sentinel";
      navSentinel.setAttribute("aria-hidden", "true");
      navSentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:35px;pointer-events:none;opacity:0;z-index:-1;";
      document.body.prepend(navSentinel);

      const navObserver = new IntersectionObserver(function (entries) {
        if (navbar) {
          navbar.classList.toggle("scrolled", !entries[0].isIntersecting);
        }
      }, { rootMargin: "0px", threshold: 0 });
      navObserver.observe(navSentinel);

      // Sentinel for back to top button
      if (backToTopBtn) {
        const bttSentinel = document.createElement("div");
        bttSentinel.id = "perf-btt-sentinel";
        bttSentinel.setAttribute("aria-hidden", "true");
        bttSentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:250px;pointer-events:none;opacity:0;z-index:-1;";
        document.body.prepend(bttSentinel);

        const bttObserver = new IntersectionObserver(function (entries) {
          backToTopBtn.classList.toggle("show", !entries[0].isIntersecting);
        }, { rootMargin: "0px", threshold: 0 });
        bttObserver.observe(bttSentinel);
      }
    } else {
      // Passive fallback for legacy environments
      window.addEventListener("scroll", function () {
        const y = window.pageYOffset || 0;
        if (navbar) navbar.classList.toggle("scrolled", y > 35);
        if (backToTopBtn) backToTopBtn.classList.toggle("show", y > 250);
      }, { passive: true });
    }

    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }
  }

  // 2. Package Listing Filter
  const packageFilterBtns = document.querySelectorAll("[data-package-filter]");
  const packageCards = document.querySelectorAll("[data-package-category]");

  if (packageFilterBtns.length > 0 && packageCards.length > 0) {
    packageFilterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        packageFilterBtns.forEach(function (b) { b.classList.remove("active"); });
        this.classList.add("active");

        const filterValue = this.getAttribute("data-package-filter");
        packageCards.forEach(function (card) {
          const cardCategory = card.getAttribute("data-package-category");
          const parentItem = card.closest(".package-grid-item");
          if (parentItem) {
            parentItem.style.display = (filterValue === "all" || cardCategory === filterValue) ? "block" : "none";
          }
        });
      });
    });
  }

  // 3. Portfolio Filter
  const portfolioFilterBtns = document.querySelectorAll("[data-portfolio-filter]");
  const portfolioItems = document.querySelectorAll("[data-portfolio-category]");

  if (portfolioFilterBtns.length > 0 && portfolioItems.length > 0) {
    portfolioFilterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        portfolioFilterBtns.forEach(function (b) { b.classList.remove("active"); });
        this.classList.add("active");

        const filterValue = this.getAttribute("data-portfolio-filter");
        portfolioItems.forEach(function (item) {
          const itemCat = item.getAttribute("data-portfolio-category");
          const parentItem = item.closest(".portfolio-grid-item");
          if (parentItem) {
            parentItem.style.display = (filterValue === "all" || itemCat === filterValue) ? "block" : "none";
          }
        });
      });
    });
  }

  // 4. Interactive Custom Parcel Calculator
  const calcForm = document.getElementById("customParcelCalculator");
  if (calcForm) {
    const packagingRadios = document.querySelectorAll('input[name="packaging"]');
    const itemCheckboxes = document.querySelectorAll('input[name="items"]');
    const quantityInput = document.getElementById("orderQuantity");
    const totalEstimateEl = document.getElementById("totalEstimateDisplay");
    const unitPriceEl = document.getElementById("unitPriceDisplay");
    const waCustomBtn = document.getElementById("waCustomOrderBtn");

    function updateCustomCalculation() {
      let packagingPrice = 0;
      let packagingName = "Hardbox Signature";
      packagingRadios.forEach(function (radio) {
        if (radio.checked) {
          packagingPrice = parseInt(radio.getAttribute("data-price") || 0, 10);
          packagingName = radio.getAttribute("data-name") || "Hardbox";
        }
      });

      let itemsTotal = 0;
      const selectedItemNames = [];
      itemCheckboxes.forEach(function (cb) {
        if (cb.checked) {
          itemsTotal += parseInt(cb.getAttribute("data-price") || 0, 10);
          selectedItemNames.push(cb.getAttribute("data-name"));
        }
      });

      const quantity = Math.max(1, parseInt(quantityInput ? quantityInput.value : 1, 10) || 1);
      const unitPrice = packagingPrice + itemsTotal;
      const grandTotal = unitPrice * quantity;

      const formatIDR = function (num) {
        return "Rp " + num.toLocaleString("id-ID");
      };

      if (unitPriceEl) unitPriceEl.textContent = formatIDR(unitPrice);
      if (totalEstimateEl) totalEstimateEl.textContent = formatIDR(grandTotal);

      if (waCustomBtn) {
        const itemsListStr = selectedItemNames.length > 0 ? selectedItemNames.join(", ") : "Belum memilih isi";
        const messageText = "Halo Parcel Lebaran, saya ingin konsultasi pemesanan Parcel Custom Lebaran:\n" +
          "- Wadah: " + packagingName + "\n" +
          "- Isi Pilihan: " + itemsListStr + "\n" +
          "- Jumlah Pesanan: " + quantity + " paket\n" +
          "- Estimasi Biaya: " + formatIDR(grandTotal) + " (" + formatIDR(unitPrice) + "/paket)\n\n" +
          "Mohon info ketersediaan dan detail penawaran. Terima kasih!";

        waCustomBtn.setAttribute("href", "https://wa.me/6282131087971?text=" + encodeURIComponent(messageText));
      }
    }

    packagingRadios.forEach(function (el) { el.addEventListener("change", updateCustomCalculation); });
    itemCheckboxes.forEach(function (el) { el.addEventListener("change", updateCustomCalculation); });
    if (quantityInput) {
      quantityInput.addEventListener("input", updateCustomCalculation);
    }

    updateCustomCalculation();
  }

  // 5. Contact Form WhatsApp Generator
  const contactForm = document.getElementById("inquiryContactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = document.getElementById("contactName");
      const phoneInput = document.getElementById("contactPhone");
      const packageInput = document.getElementById("contactPackage");
      const qtyInput = document.getElementById("contactQty");
      const notesInput = document.getElementById("contactNotes");

      const name = nameInput ? nameInput.value.trim() : "";
      const phone = phoneInput ? phoneInput.value.trim() : "";
      const packageChoice = packageInput ? packageInput.value : "";
      const qty = (qtyInput && qtyInput.value.trim()) ? qtyInput.value.trim() : "1";
      const notes = (notesInput && notesInput.value.trim()) ? notesInput.value.trim() : "-";

      if (!name || !phone) {
        alert("Mohon lengkapi nama dan nomor WhatsApp Anda.");
        return;
      }

      const waMsg = "Halo Parcel Lebaran, saya ingin bertanya dan memesan parcel:\n" +
        "- Nama: " + name + "\n" +
        "- No. WhatsApp: " + phone + "\n" +
        "- Pilihan Paket: " + packageChoice + "\n" +
        "- Perkiraan Jumlah: " + qty + " paket\n" +
        "- Catatan / Kebutuhan Khusus: " + notes + "\n\n" +
        "Mohon informasi lebih lanjut. Terima kasih!";

      window.open("https://wa.me/6282131087971?text=" + encodeURIComponent(waMsg), "_blank", "noopener,noreferrer");
    });
  }

  // 6. Smooth Scroll for Table of Contents using CSS scroll-margin (Zero JS reflow)
  const tocLinks = document.querySelectorAll(".article-toc a[href^='#']");
  if (tocLinks.length > 0) {
    tocLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: "smooth" });
            try {
              history.pushState(null, null, targetId);
            } catch (err) {
              window.location.hash = targetId;
            }
          }
        }
      });
    });
  }

  // 7. Ultra-lightweight Vanilla Bootstrap Collapse & Dropdown Replacement (Zero dependency, zero long task)
  document.addEventListener("click", function (e) {
    // A. Collapse Toggle (Navbar toggler & FAQ Accordion)
    const collapseToggle = e.target.closest('[data-bs-toggle="collapse"]');
    if (collapseToggle) {
      e.preventDefault();
      const selector = collapseToggle.getAttribute("data-bs-target") || collapseToggle.getAttribute("href");
      const targetEl = selector ? document.querySelector(selector) : null;
      if (targetEl) {
        const isCurrentlyShown = targetEl.classList.contains("show");
        if (isCurrentlyShown) {
          targetEl.classList.remove("show");
          collapseToggle.classList.add("collapsed");
          collapseToggle.setAttribute("aria-expanded", "false");
        } else {
          // Check accordion parent to close others
          const parentSelector = targetEl.getAttribute("data-bs-parent");
          if (parentSelector) {
            const parent = document.querySelector(parentSelector);
            if (parent) {
              parent.querySelectorAll(".collapse.show").forEach(function (openEl) {
                if (openEl !== targetEl) {
                  openEl.classList.remove("show");
                  const otherBtn = document.querySelector('[data-bs-target="#' + openEl.id + '"]') || document.querySelector('[href="#' + openEl.id + '"]');
                  if (otherBtn) {
                    otherBtn.classList.add("collapsed");
                    otherBtn.setAttribute("aria-expanded", "false");
                  }
                }
              });
            }
          }
          targetEl.classList.add("show");
          collapseToggle.classList.remove("collapsed");
          collapseToggle.setAttribute("aria-expanded", "true");
        }
      }
      return;
    }

    // B. Dropdown Toggle
    const dropdownToggle = e.target.closest('[data-bs-toggle="dropdown"]');
    if (dropdownToggle) {
      e.preventDefault();
      const parentDropdown = dropdownToggle.closest(".dropdown");
      if (parentDropdown) {
        const menu = parentDropdown.querySelector(".dropdown-menu");
        if (menu) {
          const isShown = menu.classList.contains("show");
          document.querySelectorAll(".dropdown-menu.show").forEach(function (m) {
            m.classList.remove("show");
            const btn = m.closest(".dropdown") ? m.closest(".dropdown").querySelector('[data-bs-toggle="dropdown"]') : null;
            if (btn) btn.setAttribute("aria-expanded", "false");
          });
          if (!isShown) {
            menu.classList.add("show");
            dropdownToggle.setAttribute("aria-expanded", "true");
          }
        }
      }
      return;
    }

    // C. Click outside dropdown -> Close open dropdowns
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-menu.show").forEach(function (m) {
        m.classList.remove("show");
        const btn = m.closest(".dropdown") ? m.closest(".dropdown").querySelector('[data-bs-toggle="dropdown"]') : null;
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    }

    // D. Auto close mobile navbar when clicking nav-link
    const navLink = e.target.closest(".site-navbar .navbar-nav .nav-link:not(.dropdown-toggle)");
    if (navLink) {
      const mobileNav = document.getElementById("navbarContent");
      if (mobileNav && mobileNav.classList.contains("show")) {
        mobileNav.classList.remove("show");
        const toggler = document.querySelector(".navbar-toggler");
        if (toggler) {
          toggler.classList.add("collapsed");
          toggler.setAttribute("aria-expanded", "false");
        }
      }
    }
  });

  // Offline / file:// protocol compatibility for clean URLs
  if (window.location.protocol === "file:") {
    const knownPages = [
      "tentang", "paket", "parcel-premium", "parcel-ekonomis", "parcel-korporat",
      "parcel-custom", "portofolio", "blog", "kontak", "panduan-memilih-parcel-lebaran",
      "perbedaan-parcel-ekonomis-premium-korporat", "checklist-pengadaan-parcel-perusahaan",
      "cara-membuat-parcel-custom", "kebijakan-privasi", "404"
    ];
    document.querySelectorAll("a[href]").forEach(function (a) {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
        return;
      }
      if (href === "/" || href === "/index.html") {
        a.setAttribute("href", "index.html");
      } else {
        const hashIdx = href.indexOf("#");
        const path = hashIdx !== -1 ? href.slice(0, hashIdx) : href;
        const hash = hashIdx !== -1 ? href.slice(hashIdx) : "";
        const cleanPath = path.startsWith("/") ? path.slice(1) : path;
        if (knownPages.includes(cleanPath)) {
          a.setAttribute("href", cleanPath + ".html" + hash);
        }
      }
    });
  }
});