window.addEventListener("DOMContentLoaded", (event) => {
	const menuToggle = document.getElementById("menu-toggle");
	menuToggle.addEventListener("click", (event) => {
		const headerNav = document.querySelector(".mobile-menu");
		headerNav.classList.toggle("hide");
	});
});
