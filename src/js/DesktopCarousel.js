import largeImageOne from "./../images/image-product-1.jpg";

class DesktopCarousel {
	LIGHTBOX_TEMPLATE = (thumbnails) => `
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
	constructor(
		largeImageSelector,
		thumbnailsRowSelector,
		previousImageButtonSelector,
		nextImageButtonSelector,
		largeImagesPaths
	) {
		// this.lightboxDisplayed = false;
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

	renderLightboxOverlay() {
		const div = document.createElement("div");
		div.classList.add("lightbox-overlay");
		document.body.appendChild(div);
	}

	renderLightBox(thumbnails) {
		const div = document.createElement("div");
		div.innerHTML = this.LIGHTBOX_TEMPLATE(thumbnails);
		div.classList.add("lightbox");
		document.body.appendChild(div);
	}

	closeLightbox() {
		const lightboxElement = document.querySelector(".lightbox");
		const lightboxOverlay = document.querySelector(".lightbox-overlay");
		lightboxElement.remove();
		lightboxOverlay.remove();
	}
}

export default DesktopCarousel;
