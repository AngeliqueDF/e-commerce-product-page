class MobileCarousel {
	constructor(
		largeImageSelector,
		previousImageButtonSelector,
		nextImageButtonSelector,
		largeImagesPaths
	) {
		console.log(this);

		this.largeImageElement = document.querySelector(largeImageSelector);

		this.previousImageButton = document.querySelector(
			previousImageButtonSelector
		);
		this.nextImageButton = document.querySelector(nextImageButtonSelector);
		this.largeImagesPaths = largeImagesPaths;

		this.previousImageButton.addEventListener("click", () => {
			this.displayPreviousImage();
		});

		this.nextImageButton.addEventListener("click", (e) => {
			this.displayNextImage();
		});
	}

	updateSelectedThumbnail(element, index) {
		// update this.largeImageElement with utility method
		this.replaceLargeImagePath(this.largeImagesPaths[index]);

		// remove .selected-thumbnail from all elements
		this.thumbnailElements.forEach((thumbnail) => {
			thumbnail.classList.remove("selected-thumbnail");
		});
		// add .selected-thumbnail to the clicked element
		element.classList.add("selected-thumbnail");
	}

	/**
	 * Utility to replace the src attribute of the large image.
	 */
	replaceLargeImagePath = (newPath) => {
		this.largeImageElement.src = newPath;
	};

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
				`/src/images/image-product-${this.largeImagesPaths.length}.jpg`
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

		console.trace(this.currentLargeImgPath());

		// If the last image is currently displayed, we replace it by the first one.
		if (indexOfImage === this.largeImagesPaths.length - 1) {
			this.replaceLargeImagePath(`${this.largeImagesPaths[0]}`);
		} else {
			const newIndex = indexOfImage + 1;
			this.replaceLargeImagePath(`${this.largeImagesPaths[newIndex]}`);
		}
	}
}

export default MobileCarousel;
