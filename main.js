document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const title = document.getElementById("title");
    const price = document.getElementById("price");
    const taxes = document.getElementById("taxes");
    const ads = document.getElementById("ads");
    const discount = document.getElementById("discount");
    const total = document.getElementById("total");
    const count = document.getElementById("count");
    const category = document.getElementById("category");
    const submit = document.getElementById("submit");
    const tbody = document.getElementById("productTable");
    const deleteAllSection = document.getElementById("deleteAll");
    const searchInput = document.getElementById("search");


    // new edit in code 
    document.addEventListener("DOMContentLoaded", () => {
    const price = document.getElementById("price");
    const taxes = document.getElementById("taxes");
    const ads = document.getElementById("ads");
    const discount = document.getElementById("discount");
    const total = document.getElementById("total");
    const searchInput = document.getElementById("search");

    // حساب الإجمالي
    function getTotal() {
        const priceValue = parseFloat(price.value) || 0;
        const taxesValue = parseFloat(taxes.value) || 0;
        const adsValue = parseFloat(ads.value) || 0;
        const discountValue = parseFloat(discount.value) || 0;
        const totalValue = priceValue + taxesValue + adsValue - discountValue;
        total.textContent = `Total: ${totalValue > 0 ? totalValue.toFixed(2) : 0}`;
    }

    // إضافة الأحداث لحساب الإجمالي عند الكتابة في أي من الحقول
    [price, taxes, ads, discount].forEach((input) =>
        input.addEventListener("input", getTotal)
    );

    // البحث عن المنتجات
    function searchData(query) {
        query = query.toLowerCase();
        const filteredData = dataProduct.filter((product) =>
            product[searchMode].toLowerCase().includes(query)
        );
        renderTable(filteredData);
    }

    // تغيير وضع البحث
    function getSearchMood(mode) {
        searchMode = mode;
        searchInput.placeholder = `Search by ${mode}`;
        searchInput.value = "";
        searchInput.focus();
    }

    document.getElementById("searchTitle").addEventListener("click", () => getSearchMood("title"));
    document.getElementById("searchCategory").addEventListener("click", () => getSearchMood("category"));
    searchInput.addEventListener("input", () => searchData(searchInput.value));
});

    // end edit in code 

    
    // State Variables
    let mood = "create"; // Current mode: 'create' or 'update'
    let tmpIndex = null; // Temporary index for editing
    let dataProduct = JSON.parse(localStorage.getItem("product")) || []; // Load existing products from localStorage
    let searchMode = "title"; // Default search mode

    /** Render the product data in the table */
    /** Render the product data in the table */
    function renderTable(data = dataProduct) {
        tbody.innerHTML = data
            .map(
                (product, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.taxes}</td>
                <td>${product.ads}</td>
                <td>${product.discount}</td>
                <td>${product.total}</td>
                <td>${product.category}</td>
                <td>
                    <button class="btn-secondary" onclick="editProduct(${index})">Update</button>
                </td>
                <td>
                    <button class="btn-danger" onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>`
            )
            .join("");

        // Update the "Delete All" button with the number of products
        deleteAllSection.innerHTML =
            dataProduct.length > 0 ?
            `<button class="btn-danger" onclick="deleteAllProducts()">Delete All (${dataProduct.length})</button>` :
            "";
    }

    /** Delete all products */
    window.deleteAllProducts = () => {
        if (confirm("Are you sure you want to delete all products?")) {
            dataProduct = [];
            localStorage.removeItem("product");
            renderTable();
        }
    };


// new edit 2 
    document.addEventListener("DOMContentLoaded", () => {
    // عناصر الإدخال
    const title = document.getElementById("title");
    const price = document.getElementById("price");
    const taxes = document.getElementById("taxes");
    const ads = document.getElementById("ads");
    const discount = document.getElementById("discount");
    const total = document.getElementById("total");
    const count = document.getElementById("count");
    const category = document.getElementById("category");
    const submit = document.getElementById("submit");
    const tbody = document.getElementById("productTable");
    const deleteAllSection = document.getElementById("deleteAll");
    const searchInput = document.getElementById("search");

    if (!tbody) {
        console.error("Error: Table body (productTable) not found!");
        return;
    }

    // بيانات المنتجات
    let dataProduct = JSON.parse(localStorage.getItem("product")) || [];
    let searchMode = "title";
    let mood = "create";
    let tmpIndex = null;

    /** تحديث الجدول */
    function renderTable(data = dataProduct) {
        if (!tbody) return; // التأكد من أن العنصر موجود قبل تحديثه

        tbody.innerHTML = data
            .map(
                (product, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.taxes}</td>
                <td>${product.ads}</td>
                <td>${product.discount}</td>
                <td>${product.total}</td>
                <td>${product.category}</td>
                <td>
                    <button class="btn-secondary" onclick="editProduct(${index})">Update</button>
                </td>
                <td>
                    <button class="btn-danger" onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>`
            )
            .join("");

        deleteAllSection.innerHTML =
            dataProduct.length > 0
                ? `<button class="btn-danger" onclick="deleteAllProducts()">Delete All (${dataProduct.length})</button>`
                : "";
    }

    /** حساب المجموع */
    function calculateTotal() {
        const priceValue = parseFloat(price.value) || 0;
        const taxesValue = parseFloat(taxes.value) || 0;
        const adsValue = parseFloat(ads.value) || 0;
        const discountValue = parseFloat(discount.value) || 0;
        const totalValue = priceValue + taxesValue + adsValue - discountValue;

        total.textContent = `Total: ${totalValue > 0 ? totalValue.toFixed(2) : 0}`;
    }

    /** حذف جميع المنتجات */
    window.deleteAllProducts = () => {
        if (confirm("Are you sure you want to delete all products?")) {
            dataProduct = [];
            localStorage.removeItem("product");
            renderTable();
        }
    };

    /** حذف منتج معين */
    window.deleteProduct = (index) => {
        dataProduct.splice(index, 1);
        localStorage.setItem("product", JSON.stringify(dataProduct));
        renderTable();
    };

    /** تعديل منتج */
    window.editProduct = (index) => {
        const product = dataProduct[index];
        title.value = product.title;
        price.value = product.price;
        taxes.value = product.taxes;
        ads.value = product.ads;
        discount.value = product.discount;
        count.value = product.count;
        category.value = product.category;

        calculateTotal();
        mood = "update";
        tmpIndex = index;
        submit.textContent = "Update Product";
    };

    /** إضافة منتج جديد */
    function handleSubmit(event) {
        event.preventDefault();

        if (!title.value.trim() || !price.value.trim() || !category.value.trim()) {
            alert("Please fill in all required fields: Title, Price, and Category.");
            return;
        }

        const product = {
            title: title.value.trim(),
            price: parseFloat(price.value).toFixed(2),
            taxes: parseFloat(taxes.value) || 0,
            ads: parseFloat(ads.value) || 0,
            discount: parseFloat(discount.value) || 0,
            total: (
                parseFloat(price.value) +
                parseFloat(taxes.value || 0) +
                parseFloat(ads.value || 0) -
                parseFloat(discount.value || 0)
            ).toFixed(2),
            count: parseInt(count.value, 10) || 1,
            category: category.value.trim(),
        };

        if (mood === "create") {
            for (let i = 0; i < product.count; i++) {
                dataProduct.push(product);
            }
        } else if (mood === "update") {
            dataProduct[tmpIndex] = product;
            mood = "create";
            submit.textContent = "Create Product";
        }

        localStorage.setItem("product", JSON.stringify(dataProduct));
        renderTable();
        clearForm();
    }

    /** مسح الحقول */
    function clearForm() {
        title.value = "";
        price.value = "";
        taxes.value = "";
        ads.value = "";
        discount.value = "";
        count.value = "";
        category.value = "";
        calculateTotal();
        submit.textContent = "Create Product";
    }

    /** البحث */
    function searchData(query) {
        query = query.toLowerCase();
        const filteredData = dataProduct.filter((product) =>
            product[searchMode].toLowerCase().includes(query)
        );
        renderTable(filteredData);
    }

    /** تغيير وضع البحث */
    function setSearchMode(mode) {
        searchMode = mode;
        searchInput.placeholder = `Search by ${mode}`;
        searchInput.value = "";
        searchInput.focus();
    }

    // إضافة الأحداث
    submit.addEventListener("click", handleSubmit);
    searchInput.addEventListener("input", () => searchData(searchInput.value));

    document.getElementById("searchTitle").addEventListener("click", () => setSearchMode("title"));
    document.getElementById("searchCategory").addEventListener("click", () => setSearchMode("category"));

    [price, taxes, ads, discount].forEach((input) =>
        input.addEventListener("input", calculateTotal)
    );

    // تحديث الجدول عند تحميل الصفحة
    renderTable();
});
// end edit 2
    

    /** Calculate and display the total price */
    function calculateTotal() {
        const priceValue = parseFloat(price.value) || 0;
        const taxesValue = parseFloat(taxes.value) || 0;
        const adsValue = parseFloat(ads.value) || 0;
        const discountValue = parseFloat(discount.value) || 0;
        const totalValue = priceValue + taxesValue + adsValue - discountValue;

        total.textContent = `Total: ${totalValue > 0 ? totalValue.toFixed(2) : 0}`;
    }

    /** Clear all input fields */
    function clearForm() {
        title.value = "";
        price.value = "";
        taxes.value = "";
        ads.value = "";
        discount.value = "";
        count.value = "";
        category.value = "";
        calculateTotal();
        mood = "create";
        submit.textContent = "Create Product";
        tmpIndex = null;
    }

    /** Add or update a product */
    function handleSubmit() {
        if (!title.value.trim() || !price.value.trim() || !category.value.trim()) {
            alert("Please fill in all required fields: Title, Price, and Category.");
            return;
        }

        const product = {
            title: title.value.trim(),
            price: parseFloat(price.value).toFixed(2),
            taxes: parseFloat(taxes.value) || 0,
            ads: parseFloat(ads.value) || 0,
            discount: parseFloat(discount.value) || 0,
            total: (
                parseFloat(price.value) +
                parseFloat(taxes.value || 0) +
                parseFloat(ads.value || 0) -
                parseFloat(discount.value || 0)
            ).toFixed(2),
            count: parseInt(count.value, 10) || 1,
            category: category.value.trim(),
        };

        if (mood === "create") {
            for (let i = 0; i < product.count; i++) {
                dataProduct.push(product);
            }
        } else if (mood === "update") {
            dataProduct[tmpIndex] = product;
        }

        localStorage.setItem("product", JSON.stringify(dataProduct));
        renderTable();
        clearForm();
    }

    /** Edit an existing product */
    /** Edit an existing product */
    window.editProduct = (index) => {
        const product = dataProduct[index];

        // Highlight the row being updated
        const rows = document.querySelectorAll("table tbody tr");
        rows.forEach((row, idx) => {
            if (idx === index) {
                row.classList.add("updating");
            } else {
                row.classList.remove("updating");
            }
        });

        // Populate the form with the product data
        title.value = product.title;
        price.value = product.price;
        taxes.value = product.taxes;
        ads.value = product.ads;
        discount.value = product.discount;
        count.value = product.count;
        category.value = product.category;

        // Calculate the total
        calculateTotal();

        // Add a visual indicator to the form
        document.querySelector(".inputs").classList.add("editing");

        // Change the mode to update
        mood = "update";
        tmpIndex = index;
        submit.textContent = "Update Product";

        // Scroll smoothly to the form
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    /** Clear the form and reset states */
    function clearForm() {
        title.value = "";
        price.value = "";
        taxes.value = "";
        ads.value = "";
        discount.value = "";
        count.value = "";
        category.value = "";
        calculateTotal();

        // Reset the form visuals
        document.querySelector(".inputs").classList.remove("editing");

        // Reset the mode
        mood = "create";
        submit.textContent = "Create Product";
        tmpIndex = null;

        // Remove row highlight
        const rows = document.querySelectorAll("table tbody tr");
        rows.forEach((row) => row.classList.remove("updating"));
    }


    /** Delete a single product */
    window.deleteProduct = (index) => {
        dataProduct.splice(index, 1);
        localStorage.setItem("product", JSON.stringify(dataProduct));
        renderTable();
    };

    /** Delete all products */
    window.deleteAllProducts = () => {
        if (confirm("Are you sure you want to delete all products?")) {
            dataProduct = [];
            localStorage.removeItem("product");
            renderTable();
        }
    };

    /** Set the search mode */
    function setSearchMode(mode) {
        searchMode = mode;
        searchInput.placeholder = `Search by ${mode}`;
        searchInput.value = "";
        searchInput.focus();
    }

    /** Search products */
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredData = dataProduct.filter((product) =>
            product[searchMode].toLowerCase().includes(query)
        );
        renderTable(filteredData);
    });

    // Attach search mode buttons
    document.getElementById("searchTitle").addEventListener("click", () => setSearchMode("title"));
    document.getElementById("searchCategory").addEventListener("click", () => setSearchMode("category"));

    // Attach form submission
    submit.addEventListener("click", handleSubmit);

    // Attach input event listeners for total calculation
    [price, taxes, ads, discount].forEach((input) =>
        input.addEventListener("input", calculateTotal)
    );

    // Initial render
    renderTable();
});
