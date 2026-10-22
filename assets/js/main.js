/**
 * Parcel Lebaran — High-Performance Vanilla JavaScript Logic
 * Zero-layout-shift, zero-forced-reflow, passive listeners.
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Unified Passive Scroll Controller (Batched Read & Write, zero forced reflow)
  const navbar = document.querySelector(".site-navbar");
  const backToTopBtn = document.getElementById("backToTop");

  if (navbar || backToTopBtn) {
    let ticking = false;
    let lastNavbarState = false;
    let lastBttState = false;

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          // Batch Read: single geometry query per animation frame
          const y = window.scrollY || window.pageYOffset || 0;
          const isNavbarScrolled = y > 30;
          const isBttShow = y > 200;

          // Batch Write: only update DOM when state actually changes
          if (navbar && isNavbarScrolled !== lastNavbarState) {
            lastNavbarState = isNavbarScrolled;
            navbar.classList.toggle("scrolled", isNavbarScrolled);
          }
          if (backToTopBtn && isBttShow !== lastBttState) {
            lastBttState = isBttShow;
            backToTopBtn.classList.toggle("show", isBttShow);
          }

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

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
});