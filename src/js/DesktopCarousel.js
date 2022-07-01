class DesktopCarousel {
	constructor(largeImageSelector, thumbnailsRowSelector, largeImagesPaths) {
		this.largeImageElement = document.querySelector(largeImageSelector);

		/**
		 * Casting Nodelist type to Array to be able to use array methods
		 */
		this.thumbnailElements = Array.from(
			document.querySelectorAll(thumbnailsRowSelector)
		);

		this.previousImageButton = document.querySelector(
			previousImageButtonSelector
		);
		this.nextImageButton = document.querySelector(nextImageButtonSelector);

		// On desktop, thumbnails clicking a thumbnail updates the large image
		this.thumbnailElements.forEach((thumbnail, index) => {
			thumbnail.addEventListener("click", (e) => {
				this.updateSelectedThumbnail(thumbnail, index);
			});
		});

		this.largeImagesPaths = largeImagesPaths;
	}

	initializeButtons() {
		this.previousImageButton.addEventListener("click", () => {
			this.displayPreviousImage();
		});

		this.nextImageButton.addEventListener("click", () => {
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

export default DesktopCarousel;
