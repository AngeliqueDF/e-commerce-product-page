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

		this.initializeEvents();
	}
	initializeEvents() {
		document
			.querySelector(this.previousImageButtonSelector)
			.addEventListener("click", () => {
				this.displayPreviousImage();
			});

		document
			.querySelector(this.nextImageButtonSelector)
			.addEventListener("click", () => {
				this.displayNextImage();
			});

	}
	currentLargeImgPath = function () {
		return new URL(this.largeImageElement.src).pathname;
	};

	displayPreviousImage() {
		// Find the index of the current path in currentLargeImgPath. To determine if we need to move to the last image.
		const indexOfImage = this.largeImagesPaths.findIndex(
			(image) => image === this.currentLargeImgPath()
		);

		// If the first image in the list is displayed, we replace it with the last image.
		if (indexOfImage === 0) {
			this.replaceLargeImagePath(
				`${this.largeImagesPaths[this.largeImagesPaths.length - 1]}`
			);
		} else {
			const newIndex = indexOfImage - 1;
			this.replaceLargeImagePath(`${this.largeImagesPaths[newIndex]}`);
		}
	}

	displayNextImage() {
		const indexOfImage = this.largeImagesPaths.findIndex(
			(image) => image === this.currentLargeImgPath()
		);

		// If the last image is currently displayed, we replace it by the first one.
		if (indexOfImage === this.largeImagesPaths.length - 1) {
			this.replaceLargeImagePath(`${this.largeImagesPaths[0]}`);
		} else {
			const newIndex = indexOfImage + 1;
			this.replaceLargeImagePath(`${this.largeImagesPaths[newIndex]}`);
		}
	}
}

export default Lightbox;
