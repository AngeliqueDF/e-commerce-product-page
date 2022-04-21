class Carousel {
	LARGE_IMAGE_SELECTOR = ".large-product-image";
	THUMBNAILS_ROW_SELECTOR = ".image-thumbnails > img";
	PREVIOUS_BUTTON_SELECTOR = "previous-image";
	NEXT_BUTTON_SELECTOR = "next-image";
	LARGE_IMAGES_PATHS = [
		"/src/images/image-product-1.jpg",
		"/src/images/image-product-2.jpg",
		"/src/images/image-product-3.jpg",
		"/src/images/image-product-4.jpg",
	];

	previousButton = document.getElementById(this.PREVIOUS_BUTTON_SELECTOR);
	nextButton = document.getElementById(this.NEXT_BUTTON_SELECTOR);
	largeImage = document.querySelector(this.LARGE_IMAGE_SELECTOR);
	thumbnails = document.querySelectorAll(this.THUMBNAILS_ROW_SELECTOR);
	// productThumbnailsPaths = [];
	currentLargeImgPath = new URL(this.largeImage.src).pathname;

	constructor() {
		this.addEvents();
		this.storeImagesSrc();
	}

	addEvents() {
		this.previousButton.addEventListener("click", (e) => {
			this.displayPreviousImage(e);
		});
		this.nextButton.addEventListener("click", (e) => {
			this.displayNextImage(e);
		});
	}

	// storeImagesSrc() {
	// 	this.productThumbnailsPaths = Array.from(this.thumbnails).map((t) => {
	// 		const srcAttributeValue = t.src;
	// 		return srcAttributeValue;
	// 	});
	// }

	updateSelectedThumbnail() {
		// if it exists, remove "selected-image" CSS class from this.selectedImage element
		// change this.selectedImage to clicked element
		// add 'selected-image' CSS class to this.selectedImage
	}

	/**
	 * Utility to replace the src attribute of the large image.
	 */
	replacePath = (newPath) => {
		this.largeImage.src = newPath;
		this.currentLargeImgPath = newPath;
	};

	displayPreviousImage(event) {
		// Find the index of the current path in currentLargeImgPath. To determine if we need to move to the last image.
		const indexOfImage = this.LARGE_IMAGES_PATHS.findIndex(
			(image) => image === this.currentLargeImgPath
		);

		// If the first image in the list is displayed, we replace it with the last image.
		if (indexOfImage === 0) {
			this.replacePath(
				`/src/images/image-product-${this.LARGE_IMAGES_PATHS.length}.jpg`
			);
		} else {
			const newIndex = indexOfImage - 1;
			this.replacePath(`${this.LARGE_IMAGES_PATHS[newIndex]}`);
		}
	}

	displayNextImage(event) {
		const indexOfImage = this.LARGE_IMAGES_PATHS.findIndex(
			(image) => image === this.currentLargeImgPath
		);

		// If the last image is currently displayed, we replace it by the first one.
		if (indexOfImage === this.LARGE_IMAGES_PATHS.length - 1) {
			this.replacePath(`/src/images/image-product-1.jpg`);
		} else {
			const newIndex = indexOfImage + 1;
			this.replacePath(`${this.LARGE_IMAGES_PATHS[newIndex]}`);
		}
	}

	displayClickedImage() {
		// find index of clicked image, use to find the matching larger image image-product-{index}.jpg
		// update this.largeImage
	}
}

export default Carousel;
