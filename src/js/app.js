import Carousel from "./Carousel.js";

/**
 * Adds a click event on the toggler to toggle the .hide class on the element to hide.
 * Iterates through toggler and toggledElements in case they reference an array of elements.
 * @param {string} togglerElementSelector
 * @param {string} elementToHideSelector
 */
const toggleHide = (togglerElementSelector, elementToHideSelector) => {
	const toggler = document.querySelectorAll(togglerElementSelector);
	const toggledElements = document.querySelectorAll(elementToHideSelector);
	toggler.forEach((element) => {
		element.addEventListener("click", () => {
			toggledElements.forEach((toggledElement) => {
				toggledElement.classList.toggle("hide");
			});
		});
	});
};

window.addEventListener("DOMContentLoaded", () => {
	toggleHide(".menu-toggle", ".header-menu");
	toggleHide("#shopping-cart-toggle", "#shopping-cart");

	const carousel = new Carousel();
});
