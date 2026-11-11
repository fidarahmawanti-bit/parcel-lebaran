(function () {
  function initApp() {
  // 1. Scroll Controller (Navbar & Back-to-Top Button across all pages)
  const navbar = document.querySelector(".site-navbar");
  const backToTopBtn = document.getElementById("backToTop");

  if (navbar || backToTopBtn) {
    let scrollTicking = false;
    const updateScrollState = function () {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (navbar) navbar.classList.toggle("scrolled", y > 35);
      if (backToTopBtn) backToTopBtn.classList.toggle("show", y > 250);
      scrollTicking = false;
    };

    window.addEventListener("scroll", function () {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateScrollState);
        scrollTicking = true;
      }
    }, { passive: true });

    // Initial check on page load
    updateScrollState();

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
    function applyPackageFilter(filterValue) {
      packageFilterBtns.forEach(function (b) {
        const isMatch = b.getAttribute("data-package-filter") === filterValue;
        b.classList.toggle("active", isMatch);
        b.setAttribute("aria-selected", isMatch ? "true" : "false");
      });

      packageCards.forEach(function (card) {
        const cardCategory = card.getAttribute("data-package-category");
        const parentItem = card.closest(".package-grid-item");
        if (parentItem) {
          parentItem.style.display = (filterValue === "all" || cardCategory === filterValue) ? "block" : "none";
        }
      });
    }

    packageFilterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const filterValue = this.getAttribute("data-package-filter");
        applyPackageFilter(filterValue);
        try {
          history.pushState(null, null, filterValue === "all" ? window.location.pathname : "#" + filterValue);
        } catch (err) {}
      });
    });

    function checkPackageHash() {
      const hash = (window.location.hash || "").replace("#", "").toLowerCase();
      if (hash === "custom") {
        window.location.replace("paket/parcel-custom.html");
      } else if (hash === "korporat") {
        applyPackageFilter("spesial");
      } else if (hash && ["reguler", "spesial", "all"].includes(hash)) {
        applyPackageFilter(hash);
      }
    }
    checkPackageHash();
    window.addEventListener("hashchange", checkPackageHash);
  }

  // 3. Portfolio Filter
  const portfolioFilterBtns = document.querySelectorAll("[data-portfolio-filter]");
  const portfolioGridItems = document.querySelectorAll(".portfolio-grid-item");

  if (portfolioFilterBtns.length > 0 && portfolioGridItems.length > 0) {
    function applyPortfolioFilter(filterValue) {
      portfolioFilterBtns.forEach(function (b) {
        const isMatch = b.getAttribute("data-portfolio-filter") === filterValue;
        b.classList.toggle("active", isMatch);
        b.setAttribute("aria-selected", isMatch ? "true" : "false");
      });

      portfolioGridItems.forEach(function (item) {
        const card = item.querySelector("[data-portfolio-category]");
        const itemCat = item.getAttribute("data-portfolio-category") || (card ? card.getAttribute("data-portfolio-category") : "");
        const shouldShow = (filterValue === "all" || itemCat === filterValue);

        if (shouldShow) {
          item.style.display = "";
          item.classList.remove("fade-in");
          void item.offsetWidth;
          item.classList.add("fade-in");
        } else {
          item.style.display = "none";
          item.classList.remove("fade-in");
        }
      });
    }

    portfolioFilterBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const filterValue = this.getAttribute("data-portfolio-filter") || "all";
        applyPortfolioFilter(filterValue);
        try {
          history.pushState(null, null, filterValue === "all" ? window.location.pathname : "#" + filterValue);
        } catch (err) {}
      });
    });

    function checkPortfolioHash() {
      const currentHash = (window.location.hash || "").replace("#", "").toLowerCase();
      if (currentHash && ["korporat", "personal", "custom", "all"].includes(currentHash)) {
        applyPortfolioFilter(currentHash);
      }
    }
    checkPortfolioHash();
    window.addEventListener("hashchange", checkPortfolioHash);
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
      // Sync .is-checked class on parent .calc-option-box
      document.querySelectorAll(".calc-option-box").forEach(function (box) {
        const inp = box.querySelector("input");
        if (inp && inp.checked) {
          box.classList.add("is-checked");
        } else {
          box.classList.remove("is-checked");
        }
      });

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
      quantityInput.addEventListener("change", updateCustomCalculation);
    }

    const qtyMinusBtn = document.getElementById("qtyMinus");
    const qtyPlusBtn = document.getElementById("qtyPlus");

    if (qtyMinusBtn && quantityInput) {
      qtyMinusBtn.addEventListener("click", function () {
        const currentVal = parseInt(quantityInput.value, 10) || 1;
        if (currentVal > 1) {
          quantityInput.value = currentVal - 1;
          updateCustomCalculation();
        }
      });
    }

    if (qtyPlusBtn && quantityInput) {
      qtyPlusBtn.addEventListener("click", function () {
        const currentVal = parseInt(quantityInput.value, 10) || 1;
        if (currentVal < 1000) {
          quantityInput.value = currentVal + 1;
          updateCustomCalculation();
        }
      });
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

    // E. Auto open & scroll to FAQ item from anchor links (e.g. #faq-multi-alamat)
    const faqAnchor = e.target.closest('a[href^="#faq-"]');
    if (faqAnchor) {
      const targetId = faqAnchor.getAttribute("href");
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const btn = targetEl.querySelector(".accordion-button");
        const collapseEl = targetEl.querySelector(".accordion-collapse");
        if (btn && collapseEl) {
          const parent = targetEl.closest(".accordion");
          if (parent) {
            parent.querySelectorAll(".collapse.show").forEach(function (openEl) {
              if (openEl !== collapseEl) {
                openEl.classList.remove("show");
                const otherBtn = parent.querySelector('[data-bs-target="#' + openEl.id + '"]') || parent.querySelector('[href="#' + openEl.id + '"]');
                if (otherBtn) {
                  otherBtn.classList.add("collapsed");
                  otherBtn.setAttribute("aria-expanded", "false");
                }
              }
            });
          }
          collapseEl.classList.add("show");
          btn.classList.remove("collapsed");
          btn.setAttribute("aria-expanded", "true");
        }
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
        try {
          history.pushState(null, null, targetId);
        } catch (err) {
          window.location.hash = targetId;
        }
      }
    }
  });

  // Handle initial page load with #faq- hash
  if (window.location.hash && window.location.hash.startsWith("#faq-")) {
    const initialTarget = document.querySelector(window.location.hash);
    if (initialTarget) {
      setTimeout(function () {
        const btn = initialTarget.querySelector(".accordion-button");
        const collapseEl = initialTarget.querySelector(".accordion-collapse");
        if (btn && collapseEl) {
          const parent = initialTarget.closest(".accordion");
          if (parent) {
            parent.querySelectorAll(".collapse.show").forEach(function (openEl) {
              if (openEl !== collapseEl) {
                openEl.classList.remove("show");
                const otherBtn = parent.querySelector('[data-bs-target="#' + openEl.id + '"]');
                if (otherBtn) otherBtn.classList.add("collapsed");
              }
            });
          }
          collapseEl.classList.add("show");
          btn.classList.remove("collapsed");
          btn.setAttribute("aria-expanded", "true");
        }
        initialTarget.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 350);
    }
  }

  // 10. Dynamic Copyright Year
  const currentSystemYear = new Date().getFullYear();
  const footerCopyrightEls = document.querySelectorAll(".site-footer p, footer p, .site-footer .container");
  footerCopyrightEls.forEach(function (el) {
    if (el.textContent && el.textContent.includes("Parcel Lebaran. Hak Cipta Dilindungi Undang-Undang")) {
      el.innerHTML = el.innerHTML.replace(/\b202[0-9]\b/, currentSystemYear);
    }
  });

  // 11. Quick View Modal Controller (Sesuai Referensi Gambar Pengguna)
  const quickViewModalEl = document.getElementById("productQuickViewModal");
  if (quickViewModalEl) {
    const qvBadge = document.getElementById("quickViewBadge");
    const qvImg = document.getElementById("quickViewImg");
    const qvThumbRow = document.getElementById("quickViewThumbRow");
    const qvTitle = document.getElementById("quickViewTitle");
    const qvPrice = document.getElementById("quickViewPrice");
    const qvOldPrice = document.getElementById("quickViewOldPrice");
    const qvDesc = document.getElementById("quickViewDesc");
    const qvTextLink = document.getElementById("quickViewTextLink");
    const qvBtnDetail = document.getElementById("quickViewBtnDetail");
    const qvBtnWA = document.getElementById("quickViewBtnWA");

    // Product gallery dataset dictionary for quick view
    const isSubfolder = window.location.pathname.includes("/paket/") || window.location.pathname.includes("/blog/") || window.location.pathname.includes("/portofolio/");
    const pathPrefix = isSubfolder ? "../" : "";

    const productGalleries = {
      "reguler": [
        pathPrefix + "assets/images/parcel-lebaran-premium-al-karim.webp",
        pathPrefix + "assets/images/parcel-lebaran-premium-hardbox-navy-gold.webp",
        pathPrefix + "assets/images/parcel-lebaran-premium-silaturahmi-mertua.webp"
      ],
      "spesial": [
        pathPrefix + "assets/images/parcel-kue-kering-lebaran-paket-fitrah.webp",
        pathPrefix + "assets/images/parcel-kue-kering-lebaran-keranjang-rotan.webp",
        pathPrefix + "assets/images/parcel-lebaran-keranjang-rotan-keluarga.webp"
      ],
      "korporat": [
        pathPrefix + "assets/images/parcel-lebaran-korporat-paket-sapphire.webp",
        pathPrefix + "assets/images/parcel-lebaran-korporat-hardbox-custom-sleeve.webp",
        pathPrefix + "assets/images/parcel-lebaran-korporat-pengadaan-kantor.webp"
      ],
      "custom": [
        pathPrefix + "assets/images/parcel-lebaran-custom-kemasan-kue-kering.webp",
        pathPrefix + "assets/images/parcel-lebaran-custom-peti-kayu-rustic.webp",
        pathPrefix + "assets/images/parcel-lebaran-custom-aneka-wadah.webp"
      ]
    };

    document.addEventListener("click", function (e) {
      const trigger = e.target.closest("[data-quickview='true']");
      if (!trigger) return;

      e.preventDefault();

      const title = trigger.getAttribute("data-title") || "Paket Parcel Lebaran";
      const price = trigger.getAttribute("data-price") || "Rp 0";
      const oldPrice = trigger.getAttribute("data-old-price") || "";
      const badge = trigger.getAttribute("data-badge") || "PROMO SPESIAL";
      const mainImg = trigger.getAttribute("data-img") || "";
      const desc = trigger.getAttribute("data-desc") || "";
      const url = trigger.getAttribute("data-url") || "#";
      const waMsg = trigger.getAttribute("data-wa") || "";
      const catKey = trigger.getAttribute("data-cat") || "reguler";

      if (qvTitle) qvTitle.textContent = title;
      if (qvPrice) qvPrice.textContent = price;
      if (qvOldPrice) {
        qvOldPrice.textContent = oldPrice;
        qvOldPrice.style.display = oldPrice ? "inline" : "none";
      }
      if (qvBadge) qvBadge.textContent = badge;
      if (qvImg) {
        qvImg.src = mainImg;
        qvImg.alt = title;
      }
      if (qvDesc) qvDesc.textContent = desc;
      if (qvTextLink) qvTextLink.href = url;
      if (qvBtnDetail) qvBtnDetail.href = url;
      if (qvBtnWA) {
        const encodedMsg = encodeURIComponent(waMsg || ("Halo Parcel Lebaran, saya tertarik dengan " + title + " (" + price + "). Mohon info detailnya."));
        qvBtnWA.href = "https://wa.me/6282131087971?text=" + encodedMsg;
      }

      // Populate Thumbnails
      if (qvThumbRow) {
        qvThumbRow.innerHTML = "";
        const thumbs = productGalleries[catKey] || [mainImg];
        thumbs.forEach(function (thumbSrc, idx) {
          const thumbBtn = document.createElement("button");
          thumbBtn.type = "button";
          thumbBtn.className = "quickview-thumb-item" + (idx === 0 ? " active" : "");
          thumbBtn.setAttribute("aria-label", "Pilih Foto " + (idx + 1));
          const imgEl = document.createElement("img");
          imgEl.src = thumbSrc;
          imgEl.alt = title + " thumbnail " + (idx + 1);
          thumbBtn.appendChild(imgEl);

          thumbBtn.addEventListener("click", function () {
            qvThumbRow.querySelectorAll(".quickview-thumb-item").forEach(function (b) { b.classList.remove("active"); });
            thumbBtn.classList.add("active");
            if (qvImg) qvImg.src = thumbSrc;
          });

          qvThumbRow.appendChild(thumbBtn);
        });
      }

      // Show Bootstrap Modal
      if (window.bootstrap && window.bootstrap.Modal) {
        const modalInstance = window.bootstrap.Modal.getOrCreateInstance(quickViewModalEl);
        modalInstance.show();
      }
    });
  }

  // 12. Product Detail Interactive Gallery Switcher (Dekayu Style)
  const productMainImg = document.getElementById("mainProductImg");
  const galleryThumbBtns = document.querySelectorAll(".gallery-thumb-btn");

  if (productMainImg && galleryThumbBtns.length > 0) {
    galleryThumbBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const targetSrc = this.getAttribute("data-full-img");
        if (targetSrc && productMainImg) {
          productMainImg.style.opacity = "0.3";
          setTimeout(function () {
            productMainImg.src = targetSrc;
            productMainImg.style.opacity = "1";
          }, 150);
        }
        galleryThumbBtns.forEach(function (b) { b.classList.remove("active"); });
        this.classList.add("active");
      });
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
})();