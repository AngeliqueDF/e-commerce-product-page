class ShoppingCart {
	constructor(
		itemQuantity,
		incrementQtyBtn,
		decrementQtyBtn,
		addToCartBtn,
		checkoutCartBtn,
		product_thumbnail
	) {
		this.itemQuantityElement = document.querySelector(itemQuantity);
		this.currentQty = this.itemQuantityElement.textContent;
		this.currentQty = this.itemQuantityElement.textContent;
		this.product_thumbnail = product_thumbnail;

		this.incrementQuantity = document.querySelector(incrementQtyBtn);
		this.decrementQuantity = document.querySelector(decrementQtyBtn);

		this.addToCartBtn = document.querySelector(addToCartBtn);
		this.checkoutCartBtn = document.querySelector(checkoutCartBtn);

		this.shoppingCart = document.querySelector("#shopping-cart");
		this.cartToggler = document.querySelector("#shopping-cart-toggle");

		this.cartProductPriceElement = document.querySelector(
			".shopping-cart-product-information p .product-price"
		);
		this.cartProductQtyElement = document.querySelector(
			".shopping-cart-product-information .product-quantity"
		);

		this.displayedProductQuanity = document.querySelector(
			".product-quantity-control p"
		);

		this.state = {
			itemPrice: 0,
			itemQuantity: 0,
		};

		this.initializeButtons();
	}

	deleteItem() {
		this.state.itemQuantity = 0;
		this.renderEmptyCart();
	}

	/**
	 * Changes the value in the tooltip. If the element already exists, it only changes the value. Otherwise it creates it before inserting the value.
	 */
	addToolTip() {
		if (this.state.itemQuantity > 0) {
			console.log(this.state);
			const container = document.querySelector(
				".shopping-cart-toggle-container"
			);
			const existingTooltip = container.querySelector(".tooltip");
			if (existingTooltip) {
				existingTooltip.textContent = this.state.itemQuantity;
			} else {
				const newToolTip = document.createElement("div");
				newToolTip.textContent = this.state.itemQuantity;
				newToolTip.classList.add("tooltip");
				container.appendChild(newToolTip);
			}
		}
	}

	refreshTooltip() {
		const tooltip = document.querySelector(".tooltip");
		const tooltipContainer = document.querySelector(
			".shopping-cart-toggle-container"
		);

		if (this.state.itemQuantity === 0) {
			tooltipContainer.removeChild(tooltip);
		} else {
			tooltip.textContent = this.state.itemQuantity;
		}
	}

	renderEmptyCart() {
		this.shoppingCart.innerHTML = `
		<fieldset>
			<legend>Cart</legend> 
			<div class="empty-cart-message">
				<p>Your cart is empty.</p>
			</div>
		</fieldset>`;
	}

	renderFilledCart() {
		this.shoppingCart.innerHTML = `
    <fieldset>
      <legend>Cart</legend>
      <div class="shopping-cart-product-row">
        <img src=${this.product_thumbnail} alt="" />

        <input
          type="hidden"
          value="Autumn limited edition"
          name="product-cart-name"
          class="product-cart-name"
          id="product-cart-name"
        />

        <input
          type="hidden"
          value="125.00"
          name="product-price"
          id="product-price"
        />

        <input
          type="hidden"
          value="3"
          name="product-quantity"
          class="product-quantity"
          id="product-quantity"
        />
        <div class="shopping-cart-product-information">
          <p>Autumn limited edition</p>
          <p>
            <span title="Product price" class="product-price">$${parseFloat(
							this.state.itemPrice
						).toFixed(2)}</span>
            x
            <span title="Product quantity" class="product-quantity">${
							this.state.itemQuantity
						}</span>
            <span title="Product total price" id="product-total">$${parseFloat(
							this.state.itemPrice * this.state.itemQuantity
						).toFixed(2)}</span>
          </p>
        </div>

        <input id="cart-remove-product" type="button" />
      </div>
    </fieldset>
    <input id="checkout-button" type="submit" value="Checkout"/>`;

		document
			.querySelector("#cart-remove-product")
			.addEventListener("click", () => {
				this.deleteItem();
			});
	}

	initializeButtons() {
		this.incrementQuantity.addEventListener("click", (e) => {
			e.preventDefault();
			const currentQty = Number(this.itemQuantityElement.textContent);
			this.itemQuantityElement.textContent = currentQty + 1;
		});
		this.decrementQuantity.addEventListener("click", (e) => {
			e.preventDefault();
			const currentQty = Number(this.itemQuantityElement.textContent);
			if (currentQty > 0) {
				this.itemQuantityElement.textContent = currentQty - 1;
			}
		});

		this.addToCartBtn.addEventListener("click", (e) => {
			e.preventDefault();

			const displayedProductPrice = document.querySelector(
				"span#displayed-product-price"
			);
			this.state.itemPrice = Number(displayedProductPrice.textContent);
			const currentQty = Number(this.itemQuantityElement.textContent);
			this.state.itemQuantity += currentQty;

			const menuClosed = document.querySelector("#shopping-cart.hide");

			if (menuClosed) {
				this.addToolTip(currentQty);
			} else {
				if (this.state.itemQuantity > 0) {
					this.renderFilledCart();
				}
			}
		});

		this.cartToggler.addEventListener("click", (e) => {
			const cartProductQtyElement = document.querySelector(
				".shopping-cart-product-information .product-quantity"
			);
			const cartProductPriceElement = document.querySelector(
				".shopping-cart-product-information .product-price"
			);

			const tooltip = document.querySelector(".tooltip");
			if (tooltip) {
				this.refreshTooltip();
			}
			try {
				tooltip.classList.toggle("hide");
			} catch (error) {
				console.log("Error: tooltip element not found");
			}

			if (this.state.itemQuantity > 0) {
				const itemRow = document.querySelector(".shopping-cart-product-row");
				// if there is already a row for the item, update it, otherwise render the shopping cart
				if (itemRow) {
					cartProductPriceElement.textContent = this.state.itemPrice;
					cartProductQtyElement.textContent = this.state.itemQuantity;
				} else {
					this.renderFilledCart();
				}
				this.renderFilledCart();
			} else {
				const emptyCartDisplayed = document.querySelector(
					"#shopping-cart fieldset .empty-cart-message"
				);
				if (!emptyCartDisplayed) {
					this.renderEmptyCart();
				}
			}
		});
	}
}

export default ShoppingCart;
