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
        equal_input.setAttribute("maxlength", "3");
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
    num_input.setAttribute("maxlength", "3");
    num_input.setAttribute("class", "number_input");
    num_input.setAttribute("id", "coefficient_" + String(j) + "_" + String(i));
    num_input.setAttribute("autocomplete", "off");
    
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

function ppcm(a, b) {
    function pgcd(a, b) {
      if (b === 0) {
        return a;
      } else {
        return pgcd(b, a % b);
      }
    }
    return (a * b) / pgcd(a, b);
}

function check_is_compatible() {
    for (l of coefficients) {
        if (count(l.slice(0, -1), 0) == l.length - 1 && l.slice(-1) != 0) {
            return false;
        }
    }
    return true;
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
}

function matrix_from_array() {
    let matrix = " \\left( \\begin{matrix}";

    for (let i = 0; i < coefficients.length; i++) {
        matrix += coefficients[i].slice(0, -1).join(" & ") + "\\\\";
    }

    matrix +="\\end{matrix} \\text{ } \\left| \\text{ } \\, \\begin{matrix}";

    for (let i = 0; i < coefficients.length; i++) {
        matrix += coefficients[i].slice(-1) + "\\\\";
    }

    matrix += "\\end{matrix} \\right. \\right) "

    return matrix;
}

function solve_system() {
    // Réinitialisation du paragraphe
    solution_p.innerHTML = "";

    // Variables d'état du système
    let is_valid = true;
    let is_compatible = true;

    // Récupère les entrées utilisateurs
    get_coefficients();

    // Vérifie qu'aucune équation n'est vide (+ cas n = 0)
    for (l of coefficients) {
        if (count(l.slice(0, -1), 0) == l.length - 1) {
            if (l.slice(-1) != 0) {
                is_compatible = false;
            }
            is_valid = false;
        }
    }

    // Vérifie qu'aucune variable n'est vide
    for (let i = 0; i < coefficients[0].length - 1; i++) {
        let num_0 = 0;

        for (let j = 0; j < coefficients.length; j++) {
            num_0 += coefficients[j][i] == 0 ? 1 : 0;
        }
        if (num_0 == coefficients.length) {
            is_valid = false;
        }
    }

    if (is_valid) {
        // Introduction système
        let sentence_1 = document.createElement("p");
        sentence_1.innerHTML = "Vous avez entrez le système suivant :";
        solution_p.appendChild(sentence_1);
    
        // Création du système
        let base_systeme = "$ \\left \\{ \\begin{aligned}";
    
        for (let i = 0; i < coefficients.length; i++) {
            let line = "";

            for (let j = 0; j < coefficients[0].length - 1; j++) {
                // Coefficient (i, j) non nul
                if (coefficients[i][j] != 0) {
                    // Positif
                    if (coefficients[i][j] > 0) {
                        line += "+";
                    }
        
                    // Coefficient différent de 1 en absolue
                    if (Math.abs(coefficients[i][j]) != 1) {
                        line += String(coefficients[i][j]);
                    }
                    line += LETTERS[j];
                }
            }

            line += "&=" + coefficients[i].slice(-1);

            // Démarre par un "+"
            if (line[0] == "+") {
                line = line.slice(1);
            }
        
            line += "\\\\";
            base_systeme += line;
        }
    
        base_systeme += "\\end{aligned} \\right. $";
    
        solution_p.innerHTML += base_systeme;
    
        // Introduction matrice
        let sentence_2 = document.createElement("p");
        sentence_2.innerHTML = "Écrivons la matrice augmentée du système :";
        solution_p.appendChild(sentence_2);
    
        // Création de la matrice
        matrice_initial = "$ \\begin{align*}" + matrix_from_array(coefficients);
        solution_p.innerHTML += matrice_initial;

        // Paramètres
        let min_taille = Math.min(coefficients.length, coefficients[0].length);
        parameters = [];
    
        // Résolution
        let matrices = "";

        for (let i = 0; i < min_taille; i++) {
            // Vérifier que le pivot n'est pas nul + inversion si besoin
            if (coefficients[i][i] == 0) {
                is_valid = false;
                
                for (let j = i + 1; j < coefficients.length; j++) {
                    if (coefficients[j][i] != 0) {
                        let temp = coefficients[i];
                        coefficients[i] = coefficients[j];
                        coefficients[j] = temp;
                        
                        is_valid = true;
                    }
                }
                
                if (!is_valid) {
                    parameters.push(i);
                }
            }

            let is_parameter = false;
            for (let j = 0; j < parameters.length; j++) {
                if (i == parameters[j]) {
                    is_parameter = true;
                }
            }
            
            if (!is_parameter) {
                // Ramener le pivot à 1 sur la colonne i
                let n = coefficients[i][i];
                for (let j = 0; j < coefficients[i].length; j++) {
                    coefficients[i][j] /= n;
                }
                
                // Vidage de la colonne du pivot
                for (let j = 0; j < coefficients.length; j++) {
                    if (i != j) {
                        let n = coefficients[j][i] / coefficients[i][i];
                        
                        for (let k = 0; k < coefficients[0].length; k++) {
                            coefficients[j][k] -= coefficients[i][k] * n;
                        }
                    }
                }               
            }

            // Placer les lignes vides à la fin de la matrice
            for(let j = 0; j < coefficients.length; j++) {
                if (count(coefficients[j], 0) == coefficients[0].length) {
                    for (let k = coefficients.length - 1; k > j; k--) {
                        if (count(coefficients[k], 0) != coefficients[0].length) {
                            let temp = coefficients[j];
                            coefficients[j] = coefficients[k];
                            coefficients[k] = temp;
                        }
                    }
                }
            }

            matrices += " & \\text{ }\\overset{\\sim}{\\underset{L}\\,} \\text{ } " + matrix_from_array() + "\\\\ \\\\";
            
            // Vérifie que la matrice est compatible
            is_compatible = check_is_compatible();
            if (!is_compatible) {
                break;
            }
        }

        matrices += "\\end{align*} $"

        solution_p.innerHTML += matrices;
    } else {
        if (is_compatible) {
            alert("Une équation/variable ne peut pas ne pas être utilisée.");
        }
    }

    if (is_compatible) {
        // Réécriture du système /!\ changement variable pour paramètres + lignes vides
        let re_systeme = document.createElement("p");
        re_systeme.innerHTML = "Ce qui donne le système suivant :";

        solution_p.appendChild(re_systeme);
        
        let conc_systeme ="$ \\left \\{ \\begin{aligned}";
        
        for (let i = 0; i < coefficients.length; i++) {
            let line_b_equal = "";
            let line_a_equal = "";

            for (let j = 0; j < coefficients[0].length - 1; j++) {
                // Détermine si paramètre ou inconnue principale
                let is_parameter = false;
                for (let k = 0; k < parameters.length; k++) {
                    if (j == parameters[k]) {
                        is_parameter = true;
                        coefficients[i][j] *= -1;
                    }
                }

                // Coefficient (i, j) non nul
                if (coefficients[i][j] != 0) {
                    let elem = "";

                    // Positif
                    if (coefficients[i][j] > 0) {
                        elem += "+";
                    }

                    // Coefficient différent de 1 en absolue
                    if (Math.abs(coefficients[i][j]) != 1) {
                        elem += String(coefficients[i][j]);
                    }
                    elem += LETTERS[j];

                    // N'est pas un paramètre (détermine si gauche ou droite)
                    if (is_parameter) {
                        line_a_equal += elem;
                    } else {
                        line_b_equal += elem;
                    }
                }
            }

            // Le premier membre démarre par un "+"
            line_b_equal = line_b_equal[0] == "+" ? line_b_equal.slice(1) : line_b_equal;
    
            // Concaténation de la ligne
            conc_systeme += line_b_equal + "&=" + coefficients[i].slice(-1) + line_a_equal + "\\\\";
        }

        conc_systeme += "\\end{aligned} \\right. $";
        solution_p.innerHTML += conc_systeme;

    } else {
        let conclusion = document.createElement("p");
        conclusion.innerHTML = "Ce système est incompatible et n'admet donc aucune solution.";

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
let PARAMETERS = ["\\alpha", "\\beta", "\\gamma", "\\delta", "\\epsilon", "\\zeta", "\\eta", "\\theta", "\\iota"];

let BASE_NUM_EQUATIONS = 2;
let BASE_NUM_VARIABLES = 2;

// Variables utilisées
let num_equations = 0;
let num_variables = 0;

let coefficients = [];

let parameters = [];

// Principal
for (let i = 0; i < BASE_NUM_VARIABLES; i++) {
    add_variable();
}

for (let i = 0; i < BASE_NUM_EQUATIONS; i++) {
    add_equation();
}

// console.log(window.MathJax)