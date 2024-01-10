function add_equation() {
    if (num_equations >= 9) {
        alert("Vous avez trop d'équations actuellement");
    }
    else {
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
                equation.appendChild(plus);
            }
        }
        systeme.appendChild(equation);

        let l = [];
        for (let i = 0; i < num_variables; i++) {
            l.push(0);
        }

        coefficients.push(l);
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
    
        for (equation of systeme.children) {
            let plus = document.createElement("td");
            plus.innerHTML = "+";
            equation.appendChild(plus);
    
            let cell = create_html_variable(num_variables - 1);
            equation.appendChild(cell);
        }
    }
    else {
        alert("Vous avez atteint le nombre maximal de variables");
    }
    // modifier coeffs
}

function create_html_variable(i) {
    let cell = document.createElement("td");
    let num_input = document.createElement("input");
    
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

// HTML elements

let systeme = document.getElementById("system");

// Settings

let LETTERS = ["x", "y", "z", "t"];
let BASE_NUM_EQUATIONS = 2;
let BASE_NUM_VARIABLES = 2;

// Used variables

let num_equations = 0;
let num_variables = 0;

let coefficients = [];

// Main

for (let i = 0; i < BASE_NUM_VARIABLES; i++) {
    add_variable();
}

for (let i = 0; i < BASE_NUM_EQUATIONS; i++) {
    add_equation();
}

reset_coefficients();
