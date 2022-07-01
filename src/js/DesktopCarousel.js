class DesktopCarousel {
	constructor(largeImageSelector, thumbnailsRowSelector, largeImagesPaths) {
		this.largeImageElement = document.querySelector(largeImageSelector);

		/**
		 * Casting Nodelist type to Array to be able to use array methods
		 */
		this.thumbnailElements = Array.from(
			document.querySelectorAll(thumbnailsRowSelector)
		);

		// On desktop, thumbnails clicking a thumbnail updates the large image
		this.thumbnailElements.forEach((thumbnail, index) => {
			thumbnail.addEventListener("click", (e) => {
				this.updateSelectedThumbnail(thumbnail, index);
			});
		});

		this.largeImagesPaths = largeImagesPaths;
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
}

export default DesktopCarousel;
