const RecipeApp = (function () {
    console.log("RecipeApp initializing...");

    const recipes = [
        {
            id: 1,
            title: "Pasta",
            ingredients: ["Pasta", "Salt", "Tomato Sauce", "Garlic"],
            steps: [
                "Boil water",
                {
                    text: "Prepare sauce",
                    substeps: [
                        "Heat oil",
                        "Add garlic",
                        {
                            text: "Cook tomatoes",
                            substeps: ["Add tomatoes", "Simmer"]
                        }
                    ]
                },
                "Mix pasta and sauce"
            ]
        },
        {
            id: 2,
            title: "Sandwich",
            ingredients: ["Bread", "Butter", "Veggies"],
            steps: [
                "Take bread",
                "Add butter",
                "Add veggies",
                "Serve"
            ]
        }
    ];

    const container = document.getElementById("recipe-container");

    /* ---------- RECURSION ---------- */
    const renderSteps = (steps, level = 0) => {
        let html = "<ol>";
        steps.forEach(step => {
            if (typeof step === "string") {
                html += `<li class="step">${step}</li>`;
            } else {
                html += `<li class="step">${step.text}`;
                html += `<div class="substep">${renderSteps(step.substeps, level + 1)}</div>`;
                html += `</li>`;
            }
        });
        html += "</ol>";
        return html;
    };

    const createRecipeCard = (recipe) => {
        return `
            <div class="recipe-card">
                <h3>${recipe.title}</h3>

                <button class="toggle-btn" data-id="${recipe.id}" data-type="steps">
                    Show Steps
                </button>
                <button class="toggle-btn" data-id="${recipe.id}" data-type="ingredients">
                    Show Ingredients
                </button>

                <div class="steps-container" data-id="${recipe.id}">
                    ${renderSteps(recipe.steps)}
                </div>

                <div class="ingredients-container" data-id="${recipe.id}">
                    <ul>
                        ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
                    </ul>
                </div>
            </div>
        `;
    };

    const renderRecipes = () => {
        container.innerHTML = recipes.map(createRecipeCard).join("");
    };

    /* ---------- EVENT DELEGATION ---------- */
    const handleToggleClick = (e) => {
        if (!e.target.classList.contains("toggle-btn")) return;

        const id = e.target.dataset.id;
        const type = e.target.dataset.type;

        const section = document.querySelector(
            `.${type}-container[data-id="${id}"]`
        );

        section.classList.toggle("visible");

        e.target.textContent = section.classList.contains("visible")
            ? `Hide ${type.charAt(0).toUpperCase() + type.slice(1)}`
            : `Show ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    };

    const init = () => {
        renderRecipes();
        container.addEventListener("click", handleToggleClick);
        console.log("RecipeApp ready!");
    };

    return { init };
})();

RecipeApp.init();
