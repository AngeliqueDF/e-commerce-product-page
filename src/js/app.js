import DesktopCarousel from "./DesktopCarousel.js";
import Lightbox from "./Lightbox";
import MobileCarousel from "./MobileCarousel.js";
import ShoppingCart from "./ShoppingCart.js";
import { toggleHide } from "./helpers.js";

import largeImageOne from "./../images/image-product-1.jpg";
import largeImageTwo from "./../images/image-product-2.jpg";
import largeImageThree from "./../images/image-product-3.jpg";
import largeImageFour from "./../images/image-product-4.jpg";

import thumbnailImageOne from "./../images/image-product-1-thumbnail.jpg";
import thumbnailImageTwo from "./../images/image-product-2-thumbnail.jpg";
import thumbnailImageThree from "./../images/image-product-3-thumbnail.jpg";
import thumbnailImageFour from "./../images/image-product-4-thumbnail.jpg";

const LARGE_IMAGE_SELECTOR = ".large-product-image";
const THUMBNAILS_ROW_SELECTOR = ".image-thumbnails .thumbnail-container";

const PREVIOUS_BUTTON_SELECTOR = ".previous-image";
const NEXT_BUTTON_SELECTOR = ".next-image";

const LARGE_IMAGES_PATHS = [
	largeImageOne,
	largeImageTwo,
	largeImageThree,
	largeImageFour,
];

const THUMBNAIL_IMAGES_PATHS = [
	thumbnailImageOne,
	thumbnailImageTwo,
	thumbnailImageThree,
	thumbnailImageFour,
];

window.addEventListener("DOMContentLoaded", () => {
	toggleHide(".menu-toggle", ".header-menu");
	toggleHide("#shopping-cart-toggle", "#shopping-cart");

	// Shopping cart
	const shoppingCart = new ShoppingCart(
		".product-quantity-control p",
		".product-quantity-control .increment",
		".product-quantity-control .decrement",
		".add-to-cart",
		THUMBNAIL_IMAGES_PATHS[0]
	);

	const mobileCarousel = new MobileCarousel(
		LARGE_IMAGE_SELECTOR,
		PREVIOUS_BUTTON_SELECTOR,
		NEXT_BUTTON_SELECTOR,
		LARGE_IMAGES_PATHS
	);

	const desktopCarousel = new DesktopCarousel(
		LARGE_IMAGE_SELECTOR,
		THUMBNAILS_ROW_SELECTOR,
		LARGE_IMAGES_PATHS
	);

	document
		.querySelector(LARGE_IMAGE_SELECTOR)
		.addEventListener("click", (e) => {
			// Check for the current screen width in case the user clicks the large image after resizing the window
			if (window.innerWidth < 1440) return;
			const lightbox = new Lightbox(
				".lightbox " + "img" + LARGE_IMAGE_SELECTOR,
				".lightbox " + ".image-thumbnails .thumbnail-container",
				LARGE_IMAGES_PATHS,
				".lightbox " + PREVIOUS_BUTTON_SELECTOR,
				".lightbox " + NEXT_BUTTON_SELECTOR,
				".lightbox-overlay",
				".close-lightbox",
				THUMBNAIL_IMAGES_PATHS,
			);
		});
});
