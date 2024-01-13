function add_equation() {
    if (num_equations < 10) {
        num_equations++;
        
        // L'équation finale
        let equation = document.createElement("tr");
        equation.setAttribute("id", "equation_" + String(num_equations - 1));
        
        // Bouton suppression
        let remove_equation_cell = document.createElement("td");
        let remove_equation_button = document.createElement("button");

        remove_equation_cell.setAttribute("id", "cell_supp_equation_" + String(num_equations - 1))
        
        remove_equation_button.innerHTML = "-";
        remove_equation_button.setAttribute("onclick", "remove_equation(" + String(num_equations - 1) +")");
        
        remove_equation_cell.appendChild(remove_equation_button);
        equation.appendChild(remove_equation_cell);
        
        for (let i = 0; i < num_variables; i++) {
            // Champ et nom variable
            let cell = create_html_variable(i, num_equations - 1, true)
            equation.appendChild(cell);
            

            // Symbole "+"
            if (i != num_variables - 1) {
                let plus = document.createElement("td");

                plus.innerHTML = "+";
                plus.setAttribute("id", "plus_" + String(num_equations - 1) + "_" + String(i));

                equation.appendChild(plus);
            }
        }
        
        // Symbole "=" 
        let equal = document.createElement("td");
        equal.setAttribute("id", "equal_" + String(num_equations - 1));
        equal.innerHTML = "= " + equal.innerHTML;

        let equal_input = document.createElement("input");
        equal_input.setAttribute("type", "text");
        equal_input.setAttribute("inputmode", "numeric");
        equal_input.setAttribute("pattern", "[0-9]*");
        equal_input.setAttribute("maxlength", "2");
        equal_input.setAttribute("class", "number_input");
        equal_input.setAttribute("id", "equal_input_" + String(num_equations - 1));

        equal.appendChild(equal_input);
        equation.appendChild(equal);

        // Ajout de l'équation
        tbody.appendChild(equation);
    }
    else {
        alert("Vous avez atteint le nombre maximal d'équations");
    }
}

function remove_equation(i) {
    if (num_equations > 1) {
        num_equations--;
        
        // Suppresson de la ligne d'équation
        let equation = document.getElementById("equation_" + String(i));
        equation.remove();

        // Modification des ids
        for (i = i + 1; i < num_equations + 1; i++) {
            for (let j = 0; j < num_variables; j++) {
                // Modification champs coefficents
                let coefficient_cell = document.getElementById("member_" + String(i) + "_" + String(j));
                let value = coefficient_cell.firstChild.value;
                
                let new_coefficient_cell = create_html_variable(j, i - 1, true);
                new_coefficient_cell.firstChild.value = value;

                tbody.children[i - 1].replaceChild(new_coefficient_cell, coefficient_cell);

                // Modification "+"
                if (j < num_variables - 1) {
                    let plus = document.getElementById("plus_" + String(i) + "_" + String(j));
                    plus.setAttribute("id", plus.id.slice(0, -3) + String(i - 1) + plus.id.slice(-2));
                }
            }
            
            // Changement id équations
            let equation = document.getElementById("equation_" + String(i));
            equation.setAttribute("id", "equation_" + String(i - 1));

            // Changement id "-"
            let minus_equation_cell = document.getElementById("cell_supp_equation_" + String(i));            
            let minus_equation_button = minus_equation_cell.firstChild;

            minus_equation_cell.setAttribute("id", "cell_supp_equation_" + String(i - 1));
            minus_equation_button.setAttribute("onclick", "remove_equation(" + String(i - 1) + ")");

            // Changement id "=" et champ associé
            let equal_cell = document.getElementById("equal_" + String(i));
            equal_cell.setAttribute("id", "equal_" + String(i - 1));

            let equal_input = equal_cell.lastChild;
            equal_input.setAttribute("id", "equal_input_" + String(i - 1));
        }
    }
    else {
        alert("Vous ne pouvez pas ne pas avoir d'équation");
    }
}

function add_variable() {
    if (num_variables < LETTERS.length) {
        num_variables++;
    
        for (let i = 0; i < num_equations; i++) {
            equation = tbody.children[i];

            // Retrait "=" et champ associé
            let equal = equation.lastChild;
            equal.remove()

            // Symbole "+"
            let plus = document.createElement("td");

            plus.innerHTML = "+";
            plus.setAttribute("id", "plus_" + String(i) + "_" + String(num_variables - 2));

            equation.appendChild(plus);
    
            // Champ créé
            let cell = create_html_variable(num_variables - 1, i, true);
            equation.appendChild(cell);

            // Rajout du "=" et du champ
            equation.appendChild(equal);
        }

        let empty_cell = document.createElement("td");
        let button_cell = document.createElement("td");
        let button_supp = document.createElement("button");

        empty_cell.setAttribute("id", "empty_cell_" + String(num_variables - 1));

        button_supp.innerHTML = "-"
        button_supp.setAttribute("onclick", "remove_variable(" + String(num_variables - 1) + ")");
        button_cell.appendChild(button_supp);

        button_cell.setAttribute("class", "cell_supp_variable");
        button_cell.setAttribute("id", "button_cell_variable_" + String(num_variables - 1));

        line_supp_variables.appendChild(empty_cell);
        line_supp_variables.appendChild(button_cell);
    }
    else {
        alert("Vous avez atteint le nombre maximal de variables");
    }
}

function remove_variable(i) {
    if (num_variables > 1) {
        num_variables--;
        
        for (let j = 0; j < num_equations; j++) {
            // Suppression des cellules de coefficients et des "+"
            let coefficient_cell = document.getElementById("member_" + String(j) + "_" + String(i));
            coefficient_cell.remove();

            if (i != num_variables) {
                let plus = document.getElementById("plus_" + String(j) + "_" + String(i));
                plus.remove();
            }
            else {
                let plus = document.getElementById("plus_" + String(j) + "_" + String(i - 1));
                plus.remove();
            }
        }

        // Suppresssion des boutons "-" des variables
        let minus_variable_cell = document.getElementById("button_cell_variable_" + String(i));
        let empty_cell = document.getElementById("empty_cell_" + String(i));

        minus_variable_cell.remove();
        empty_cell.remove();

        // Modification des ids
        for (i = i + 1; i < num_variables + 1; i++) {
            for (let j = 0; j < num_equations; j++) {
                // Modification champs coefficents
                let coefficient_cell = document.getElementById("member_" + String(j) + "_" + String(i));
                let value = coefficient_cell.firstChild.value;

                let new_coefficient_cell = create_html_variable(i - 1, j, true);
                new_coefficient_cell.firstChild.value = value;

                tbody.children[j].replaceChild(new_coefficient_cell, coefficient_cell);

                // Modification "+"
                if (i < num_variables) {
                    let plus = document.getElementById("plus_" + String(j) + "_" + String(i));
                    plus.setAttribute("id", plus.id.slice(0, -1) + String(i - 1));
                }
            }

            // Modification bouton supprimer
            let button_cell = document.getElementById("button_cell_variable_" + String(i));
            button_cell.id = button_cell.id.slice(0, -1) + String(i - 1);

            let button = button_cell.firstChild;
            button.setAttribute("onclick", button.getAttribute("onclick").slice(0, -2) + String(i - 1) + ")");

            // Modification espace vide (ligne suppression)
            let empty_cell = document.getElementById("empty_cell_" + String(i));
            empty_cell.setAttribute("id", empty_cell.getAttribute("id").slice(0, -1) + String(i - 1));
        }
    }
    else {
        alert("Vous ne pouvez pas ne pas avoir de variables");
    }
}
    
function create_html_variable(i, j, letter) {
    let cell = document.createElement("td");
    let num_input = document.createElement("input");

    cell.setAttribute("id", "member_" + String(j) + "_" + String(i))
    
    num_input.setAttribute("type", "text");
    num_input.setAttribute("inputmode", "numeric");
    num_input.setAttribute("pattern", "[0-9]*");
    num_input.setAttribute("maxlength", "2");
    num_input.setAttribute("class", "number_input");
    num_input.setAttribute("id", "coefficient_" + String(j) + "_" + String(i));
    
    cell.appendChild(num_input);

    if (letter) {
        cell.innerHTML += " " + LETTERS[i];
    }

    return cell;
}

function count(l, n) {
    c = 0;
    for (i of l) {
        c += i == n ? 1 : 0;
    }
    return c;
}

function get_coefficients() {
    coefficients = [];
    for (let i = 0; i < num_equations; i++) {
        let line = []
        for (let j = 0; j < num_variables; j++) {
            line.push(Number(document.getElementById("coefficient_" + String(i) + "_" + String(j)).value));
        }
        let equal = Number(document.getElementById("equal_input_" + String(i)).value);
        line.push(equal);

        coefficients.push(line);
    }
    console.log(coefficients)
}

function matrix_from_array() {
    let matrix = "$ \\left( \\begin{matrix}";

    for (let i = 0; i < coefficients.length; i++) {
        matrix += coefficients[i].slice(0, -1).join(" & ") + "\\\\";
    }

    matrix +="\\end{matrix} \\text{ } \\left| \\text{ } \\, \\begin{matrix}";

    for (let i = 0; i < coefficients.length; i++) {
        matrix += coefficients[i].slice(-1) + "\\\\";
    }

    matrix += "\\end{matrix} \\right. \\right) $"

    return matrix;
}

function solve_system() {
    // Réinitialisation du paragraphe
    solution_p.innerHTML = "";

    // Variables d'état du système
    let is_valid = true;
    let is_solvable = true;
    let is_solved = false

    // Récupère les entrées utilisateurs
    get_coefficients();

    for (l of coefficients) {
        if(count(l.slice(0, -1), 0) == l.length - 1 && is_valid) {
            if (l.slice(-1) != 0) {
                is_solvable = false;
            }
            is_valid = false;
        }
    }

    if (is_valid) {
        // Introduction système
        let sentence_1 = document.createElement("p");
        sentence_1.innerHTML = "Vous avez entrez le système suivant :";
        solution_p.appendChild(sentence_1);
    
        // Création du système
        let system_base = "$ \\left \\{ \\begin{aligned}";
    
        for (let i = 0; i < coefficients.length; i++) {
            for (let j = 0; j < coefficients[i].length; j++) {
                if (j < coefficients[i].length - 1) {
                    if (coefficients[i][j] != 0) {
                        system_base += (coefficients[i][j] != 1 ? String(coefficients[i][j]) : "") + LETTERS[j] + "+";
                    }
                } else {
                    system_base += "&=" + String(coefficients[i][j]);
                }
            }
            if (system_base.slice(-4, -3) == "+") {
                system_base = system_base.slice(0, -4) + system_base.slice(-3);
            }
            if (i < coefficients.length - 1) {
                system_base += (i != coefficients.length - 1 ? "\\\\" : "");
            }
        }
    
        system_base += "\\end{aligned} \\right. $";
    
        solution_p.innerHTML += system_base;
    
        // Introduction matrice
        let sentence_2 = document.createElement("p");
        sentence_2.innerHTML = "Écrivons la matrice augmentée du système :";
        solution_p.appendChild(sentence_2);
    
        // Création de la matrice
        matrice_initial = matrix_from_array(coefficients);
        solution_p.innerHTML += matrice_initial;
    
        // Résolution
        while (is_solvable && !is_solved) {

        }
    
        solution_p.innerHTML += "$\\overset{\\sim}{\\underset{L}\\,}$"
    } else {
        if (is_solvable) {
            alert("Une ligne ne peut pas être vide.");
        }
    }

    if (is_solvable) {
        // Ensemble de solution
    } else {
        let conclusion = document.createElement("p");
        conclusion.innerHTML = "Ce système n'admet aucune solution.";

        let set_solutions = "$ S = \\emptyset $";

        solution_p.appendChild(conclusion);
        solution_p.innerHTML += set_solutions;
    }
    // Conversion LaTex => HTML
    MathJax.typeset([solution_p]);
}

// Éléments HTML
let body = document.lastChild.lastChild;

let systeme = document.getElementById("system");

let tbody = document.createElement("tbody");
systeme.appendChild(tbody);

let line_supp_variables = document.createElement("tr");
systeme.appendChild(line_supp_variables);

let solution_p = document.getElementById("solution");

// Paramètres
let LETTERS = ["x", "y", "z", "t", "a", "b", "c", "d", "e", "f"];
let BASE_NUM_EQUATIONS = 2;
let BASE_NUM_VARIABLES = 2;

// Variables utilisées
let num_equations = 0;
let num_variables = 0;

let coefficients = [];

// Principal
for (let i = 0; i < BASE_NUM_VARIABLES; i++) {
    add_variable();
}

for (let i = 0; i < BASE_NUM_EQUATIONS; i++) {
    add_equation();
}