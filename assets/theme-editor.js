function hideProductModal() {
  const productModal = document.querySelectorAll('product-modal[open]');
  productModal && productModal.forEach((modal) => modal.hide());
}

document.addEventListener('shopify:block:select', function (event) {
  hideProductModal();
  const blockSelectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockSelectedIsSlide) return;

  const parentSlideshowComponent = event.target.closest('slideshow-component');
  parentSlideshowComponent.pause();

  setTimeout(function () {
    parentSlideshowComponent.slider.scrollTo({
      left: event.target.offsetLeft,
    });
  }, 200);
});

document.addEventListener('shopify:block:deselect', function (event) {
  const blockDeselectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockDeselectedIsSlide) return;
  const parentSlideshowComponent = event.target.closest('slideshow-component');
  if (parentSlideshowComponent.autoplayButtonIsSetToPlay) parentSlideshowComponent.play();
});

document.addEventListener('shopify:section:load', () => {
  hideProductModal();
  const zoomOnHoverScript = document.querySelector('[id^=EnableZoomOnHover]');
  if (!zoomOnHoverScript) return;
  if (zoomOnHoverScript) {
    const newScriptTag = document.createElement('script');
    newScriptTag.src = zoomOnHoverScript.src;
    zoomOnHoverScript.parentNode.replaceChild(newScriptTag, zoomOnHoverScript);
  }
});

document.addEventListener('shopify:section:reorder', () => hideProductModal());

document.addEventListener('shopify:section:select', () => hideProductModal());

document.addEventListener('shopify:section:deselect', () => hideProductModal());

document.addEventListener('shopify:inspector:activate', () => hideProductModal());

document.addEventListener('shopify:inspector:deactivate', () => hideProductModal());

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".card__media").forEach(function (mediaDiv) {
    const productCard = mediaDiv.closest(".product-card-wrapper");
    if (!productCard) return;

    const productUrl = productCard.querySelector(".card__heading a")?.href;
    if (!productUrl) return;

    // Ensure the image wrapper isn't already wrapped in a link
    if (!mediaDiv.querySelector("a")) {
      const imgWrapper = mediaDiv.querySelector(".media");
      if (imgWrapper) {
        const linkElement = document.createElement("a");
        linkElement.href = productUrl;
        linkElement.style.display = "block"; // Ensure full-size clickable area
        linkElement.style.width = "100%";
        linkElement.style.height = "100%";

        // Move all children of imgWrapper into the new <a> tag
        while (imgWrapper.firstChild) {
          linkElement.appendChild(imgWrapper.firstChild);
        }

        imgWrapper.appendChild(linkElement);
      }
    }
  });
});