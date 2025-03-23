document.addEventListener("DOMContentLoaded", () => {
    // تعريف العناصر
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

    // بيانات المنتجات
    let dataProduct = JSON.parse(localStorage.getItem("product")) || [];
    let searchMode = "title";
    let mood = "create";
    let tmpIndex = null;

    /** حساب الإجمالي */
    function calculateTotal() {
        const priceValue = parseFloat(price.value) || 0;
        const taxesValue = parseFloat(taxes.value) || 0;
        const adsValue = parseFloat(ads.value) || 0;
        const discountValue = parseFloat(discount.value) || 0;
        const totalValue = priceValue + taxesValue + adsValue - discountValue;

        total.textContent = totalValue > 0 ? totalValue.toFixed(2) : "0";
    }

    /** عرض البيانات في الجدول */
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

        deleteAllSection.innerHTML =
            dataProduct.length > 0
                ? `<button class="btn-danger" onclick="deleteAllProducts()">Delete All (${dataProduct.length})</button>`
                : "";
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

    /** إضافة أو تحديث منتج */
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
