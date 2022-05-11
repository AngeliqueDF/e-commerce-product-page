/**
 * Toggles the .hide class on elementToHide when clicking on togglerElement
 * Iterates through toggler and toggledElements in case they reference an array of elements.
 * @param {string} togglerElementSelector
 * @param {string} elementToHideSelector
 */
export const toggleHide = (togglerElementSelector, elementToHideSelector) => {
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
