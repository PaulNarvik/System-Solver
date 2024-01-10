function add_equation() {
    if (num_equations < 9) {
        num_equations++;
        
        let equation = document.createElement("tr");
        
        equation.setAttribute("id", "equation_" + String(num_equations - 1));
        
        let remove_equation_cell = document.createElement("td");
        let remove_equation_button = document.createElement("button");
        
        remove_equation_button.innerHTML = "-";
        remove_equation_button.setAttribute("onclick", "remove_equation(" + String(num_equations - 1) +")");
        
        remove_equation_cell.appendChild(remove_equation_button);
        equation.appendChild(remove_equation_cell);
        
        for (let i = 0; i < num_variables; i++) {
            let cell = create_html_variable(i)
            equation.appendChild(cell);
            
            if (i != num_variables - 1) {
                let plus = document.createElement("td");

                plus.innerHTML = "+";
                plus.setAttribute("id", "plus_" + String(num_equations - 1) + "_" + String(i));

                equation.appendChild(plus);
            }
        }
        tbody.appendChild(equation);
        
        let l = [];
        for (let i = 0; i < num_variables; i++) {
            l.push(0);
        }
        
        coefficients.push(l);
    }
    else {
        alert("Vous avez trop d'équations actuellement");
    }
}

function remove_equation(i) {
    if (num_equations > 1) {
        num_equations--;

        let equation = document.getElementById("equation_" + String(i));
        equation.remove();

        coefficients = coefficients.slice(0, i).concat(coefficients.slice(i + 1));
    }
    else {
        alert("Vous ne pouvez pas ne pas avoir d'équation");
    }
}

function add_variable() {
    if (num_variables < LETTERS.length) {
        num_variables++;
    
        for (let i = 0; i < num_equations; i++) {
            let plus = document.createElement("td");

            plus.innerHTML = "+";
            plus.setAttribute("id", "plus_" + String(i) + "_" + String(num_variables - 2));

            tbody.children[i].appendChild(plus);
    
            let cell = create_html_variable(num_variables - 1);
            tbody.children[i].appendChild(cell);

            coefficients[i].push(0);
        }

        let empty_cell = document.createElement("td");
        let button_cell = document.createElement("td");
        let button_supp = document.createElement("button");

        empty_cell.setAttribute("id", "empty_cell_" + String(num_variables - 1));

        button_supp.innerHTML = "-"
        button_supp.setAttribute("onclick", "remove_variable(" + String(num_variables - 1) + ")");
        button_cell.appendChild(button_supp);

        button_cell.setAttribute("class", "cell_supp_variable");
        button_cell.setAttribute("id", "button_cell_" + String(num_variables - 1));

        line_supp_variables.appendChild(empty_cell);
        line_supp_variables.appendChild(button_cell);
    }
    else {
        alert("Vous avez atteint le nombre maximal de variables");
    }
    console.log(num_variables)
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

            // Suppression des coefficients de la variable
            coefficients[j] = coefficients[j].slice(0, i).concat(coefficients[j].slice(i + 1));
        }

        // Suppresssion des boutons "-" des variables
        let minus_cell = document.getElementById("button_cell_" + String(i));
        let empty_cell = document.getElementById("empty_cell_" + String(i));

        minus_cell.remove();
        empty_cell.remove();
    
        // Inversion des lettres de la liste
        let deleted_variable = LETTERS[i];
        LETTERS = LETTERS.slice(0, i).concat(LETTERS.slice(i + 1)).concat([deleted_variable]);
    }
    else {
        alert("Vous ne pouvez pas ne pas avoir de variables");
    }
}
    

function create_html_variable(i) {
    let cell = document.createElement("td");
    let num_input = document.createElement("input");

    cell.setAttribute("id", "member_" + String(num_equations - 1) + "_" + String(i))
    
    num_input.setAttribute("type", "text");
    num_input.setAttribute("inputmode", "numeric");
    num_input.setAttribute("pattern", "[0-9]*");
    num_input.setAttribute("maxlength", "2");
    num_input.setAttribute("name", LETTERS[i]);
    num_input.setAttribute("class", "number_input");
    num_input.setAttribute("id", "coefficient_" + String(num_equations - 1) + "_" + String(i));

    cell.appendChild(num_input);
    cell.innerHTML += " " + LETTERS[i];

    return cell;
}

function reset_coefficients() {
    coefficients.splice();

    for (let i = 0; i < num_equations; i++) {
        let l = [];
    
        for (let j = 0; j < num_variables; j++) {
            l.push(0);
        }
    
        coefficients.push(l);
    }
}

// Éléments HTML

let systeme = document.getElementById("system");

let tbody = document.createElement("tbody");
systeme.appendChild(tbody)

let line_supp_variables = document.createElement("tr");
systeme.appendChild(line_supp_variables);

// Paramètres

let LETTERS = ["x", "y", "z", "t", "a", "b", "c"];
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