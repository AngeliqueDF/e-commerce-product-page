import DesktopCarousel from "./DesktopCarousel.js";
import MobileCarousel from "./MobileCarousel.js";
import { toggleHide } from "./helpers.js";

const LARGE_IMAGE_SELECTOR = ".large-product-image";
const THUMBNAILS_ROW_SELECTOR = ".image-thumbnails img";

const PREVIOUS_BUTTON_SELECTOR = ".previous-image";
const NEXT_BUTTON_SELECTOR = ".next-image";

const LARGE_IMAGES_PATHS = [
	"/src/images/image-product-1.jpg",
	"/src/images/image-product-2.jpg",
	"/src/images/image-product-3.jpg",
	"/src/images/image-product-4.jpg",
];

window.addEventListener("DOMContentLoaded", () => {
	toggleHide(".menu-toggle", ".header-menu");
	toggleHide("#shopping-cart-toggle", "#shopping-cart");

	if (window.innerWidth <= 375) {
		const mobileCarousel = new MobileCarousel(
			LARGE_IMAGE_SELECTOR,
			PREVIOUS_BUTTON_SELECTOR,
			NEXT_BUTTON_SELECTOR,
			LARGE_IMAGES_PATHS
		);
	} else {
		const desktopCarousel = new DesktopCarousel(
			LARGE_IMAGE_SELECTOR,
			THUMBNAILS_ROW_SELECTOR,
			PREVIOUS_BUTTON_SELECTOR,
			NEXT_BUTTON_SELECTOR,
			LARGE_IMAGES_PATHS
		);

		document
			.querySelector(LARGE_IMAGE_SELECTOR)
			.addEventListener("click", () => {
				desktopCarousel.renderLightBox();
				desktopCarousel.renderLightboxOverlay();

				const lightboxElement = document.querySelector(".lightbox");
				const lightboxOverlay = document.querySelector(".lightbox-overlay");

				// TODO either create a Lightbox class or move this functionality to DesktopCarousel
				// When the overlay is clicked, we remove it as well as the the lightbox
				lightboxOverlay.addEventListener("click", () => {
					lightboxElement.remove();
					lightboxOverlay.remove();
				});

				const lightbox = new DesktopCarousel(
					".lightbox " + LARGE_IMAGE_SELECTOR,
					".lightbox " + THUMBNAILS_ROW_SELECTOR,
					".lightbox " + PREVIOUS_BUTTON_SELECTOR,
					".lightbox " + NEXT_BUTTON_SELECTOR,
					LARGE_IMAGES_PATHS
				);

				lightbox.initializeButtons();
			});
	}
});
