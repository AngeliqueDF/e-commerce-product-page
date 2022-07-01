import largeImageOne from "./../images/image-product-1.jpg";
import DesktopCarousel from "./DesktopCarousel";

class Lightbox extends DesktopCarousel {
	constructor(
		largeImageElement,
		thumbnailsRowSelector,
		largeImagesPaths,
		previousImageButtonSelector,
		nextImageButtonSelector,
		lightboxOverlaySelector,
		lightboxCloseButtonSelector,
		THUMBNAIL_IMAGES_PATHS
	) {
		// Render the overlay
		const lightboxOverlay = document.createElement("div");
		lightboxOverlay.classList.add("lightbox-overlay");
		document.body.querySelector("main").appendChild(lightboxOverlay);

		const LIGHTBOX_TEMPLATE = (thumbnails) => `
				<button class="close-lightbox" title="Close lightbox"></button>
				<button class="product-image-controller previous-image"></button>
				<button class="product-image-controller next-image"></button>

				<img
					class="large-product-image"
					src=${largeImageOne}
					alt=""
				/>

				<div class="image-thumbnails">
				${thumbnails
					.map(
						(thumbnail) =>
							'<div class="thumbnail-container"><img src="' +
							thumbnail +
							'" alt="" /></div>'
					)
					.join("")}
				</div>
    	`;
		// Render the lightbox
		const lightboxElement = document.createElement("div");
		lightboxElement.innerHTML = LIGHTBOX_TEMPLATE(THUMBNAIL_IMAGES_PATHS);
		lightboxElement.classList.add("lightbox");
		document.querySelector("main").appendChild(lightboxElement);

		super(largeImageElement, thumbnailsRowSelector, largeImagesPaths);

		this.previousImageButtonSelector = previousImageButtonSelector;
		this.nextImageButtonSelector = nextImageButtonSelector;
		this.lightboxOverlaySelector = lightboxOverlaySelector;
		this.lightboxCloseButtonSelector = lightboxCloseButtonSelector;

		this.lightboxOverlay = lightboxOverlay;
		this.lightboxElement = lightboxElement;

	}
}

export default Lightbox;
