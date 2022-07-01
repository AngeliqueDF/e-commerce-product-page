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
		super(largeImageElement, thumbnailsRowSelector, largeImagesPaths);

		this.previousImageButtonSelector = previousImageButtonSelector;
		this.nextImageButtonSelector = nextImageButtonSelector;
		this.lightboxOverlaySelector = lightboxOverlaySelector;
		this.lightboxCloseButtonSelector = lightboxCloseButtonSelector;

	}
}

export default Lightbox;
