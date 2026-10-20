/**
 * Nirmala Parcel Lebaran — Vanilla JavaScript Logic
 * Features: Navbar Scroll State, Package Filters, Custom Parcel Calculator,
 * WhatsApp Link Generators, Form Handling, and Keyboard Accessibility.
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Sticky Navbar Scroll State
  const navbar = document.querySelector(".site-navbar");
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Package Listing Filter
  const packageFilterBtns = document.querySelectorAll("[data-package-filter]");
  const packageCards = document.querySelectorAll("[data-package-category]");

  if (packageFilterBtns.length > 0 && packageCards.length > 0) {
    packageFilterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        packageFilterBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const filterValue = this.getAttribute("data-package-filter");

        packageCards.forEach((card) => {
          const cardCategory = card.getAttribute("data-package-category");
          if (filterValue === "all" || cardCategory === filterValue) {
            card.closest(".package-grid-item").style.display = "block";
          } else {
            card.closest(".package-grid-item").style.display = "none";
          }
        });
      });
    });
  }

  // 3. Portfolio Filter
  const portfolioFilterBtns = document.querySelectorAll("[data-portfolio-filter]");
  const portfolioItems = document.querySelectorAll("[data-portfolio-category]");

  if (portfolioFilterBtns.length > 0 && portfolioItems.length > 0) {
    portfolioFilterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        portfolioFilterBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const filterValue = this.getAttribute("data-portfolio-filter");

        portfolioItems.forEach((item) => {
          const itemCat = item.getAttribute("data-portfolio-category");
          if (filterValue === "all" || itemCat === filterValue) {
            item.closest(".portfolio-grid-item").style.display = "block";
          } else {
            item.closest(".portfolio-grid-item").style.display = "none";
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
      // Base packaging price
      let packagingPrice = 0;
      let packagingName = "Hardbox Signature";
      packagingRadios.forEach((radio) => {
        if (radio.checked) {
          packagingPrice = parseInt(radio.getAttribute("data-price") || 0, 10);
          packagingName = radio.getAttribute("data-name") || "Hardbox";
        }
      });

      // Sum of selected items
      let itemsTotal = 0;
      const selectedItemNames = [];
      itemCheckboxes.forEach((cb) => {
        if (cb.checked) {
          itemsTotal += parseInt(cb.getAttribute("data-price") || 0, 10);
          selectedItemNames.push(cb.getAttribute("data-name"));
        }
      });

      const quantity = Math.max(1, parseInt(quantityInput?.value || 1, 10));
      const unitPrice = packagingPrice + itemsTotal;
      const grandTotal = unitPrice * quantity;

      // Format IDR
      const formatIDR = (num) => {
        return "Rp " + num.toLocaleString("id-ID");
      };

      if (unitPriceEl) unitPriceEl.textContent = formatIDR(unitPrice);
      if (totalEstimateEl) totalEstimateEl.textContent = formatIDR(grandTotal);

      // Generate WhatsApp Link
      if (waCustomBtn) {
        const itemsListStr = selectedItemNames.length > 0 ? selectedItemNames.join(", ") : "Belum memilih isi";
        const messageText = 
`Halo Nirmala Parcel, saya ingin konsultasi pemesanan Parcel Custom Lebaran:
- Wadah: ${packagingName}
- Isi Pilihan: ${itemsListStr}
- Jumlah Pesanan: ${quantity} paket
- Estimasi Biaya: ${formatIDR(grandTotal)} (${formatIDR(unitPrice)}/paket)

Mohon info ketersediaan dan detail penawaran. Terima kasih!`;

        const waUrl = `https://wa.me/6282131087971?text=${encodeURIComponent(messageText)}`;
        waCustomBtn.setAttribute("href", waUrl);
      }
    }

    packagingRadios.forEach((el) => el.addEventListener("change", updateCustomCalculation));
    itemCheckboxes.forEach((el) => el.addEventListener("change", updateCustomCalculation));
    if (quantityInput) {
      quantityInput.addEventListener("input", updateCustomCalculation);
    }

    // Initial calculation
    updateCustomCalculation();
  }

  // 5. Contact Form WhatsApp Generator
  const contactForm = document.getElementById("inquiryContactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("contactName")?.value.trim() || "";
      const phone = document.getElementById("contactPhone")?.value.trim() || "";
      const packageChoice = document.getElementById("contactPackage")?.value || "";
      const qty = document.getElementById("contactQty")?.value.trim() || "1";
      const notes = document.getElementById("contactNotes")?.value.trim() || "";

      if (!name || !phone) {
        alert("Mohon lengkapi nama dan nomor WhatsApp Anda.");
        return;
      }

      const waMsg = 
`Halo Nirmala Parcel, saya ingin bertanya dan memesan parcel:
- Nama: ${name}
- No. WhatsApp: ${phone}
- Pilihan Paket: ${packageChoice}
- Perkiraan Jumlah: ${qty} paket
- Catatan / Kebutuhan Khusus: ${notes ? notes : "-"}

Mohon informasi lebih lanjut. Terima kasih!`;

      const targetUrl = `https://wa.me/6282131087971?text=${encodeURIComponent(waMsg)}`;
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    });
  }

  // 6. Smooth Scroll for Table of Contents (TOC) with Sticky Navbar Offset
  const tocLinks = document.querySelectorAll(".article-toc a[href^='#']");
  if (tocLinks.length > 0) {
    tocLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            const nav = document.querySelector(".site-navbar");
            const navOffset = nav ? nav.offsetHeight + 18 : 90;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });

            // Update URL hash smoothly
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
