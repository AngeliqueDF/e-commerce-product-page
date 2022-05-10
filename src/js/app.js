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

	const carousel = new Carousel(
		LARGE_IMAGE_SELECTOR,
		THUMBNAILS_ROW_SELECTOR,
		PREVIOUS_BUTTON_SELECTOR,
		NEXT_BUTTON_SELECTOR,
		LARGE_IMAGES_PATHS
	);

	const largeImage = document.querySelector(LARGE_IMAGE_SELECTOR);
});
