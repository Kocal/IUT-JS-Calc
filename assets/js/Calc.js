function Calc() {

    this.TYPE_NUMBER = 'number';
    this.TYPE_OPERATOR = 'operator';

    this.TOKEN_OPERATOR_ADDITION = '+';
    this.TOKEN_OPERATOR_SUBSTRACTION = '-';
    this.TOKEN_OPERATOR_MULTIPLICATION = '*';
    this.TOKEN_OPERATOR_DIVISION = '/';
}

Calc.prototype.calcul = function (input) {
    if (!input) {
        return 0;
    }

    var tokens = this.tokenize(input);
    var nodes = this.prioritize(tokens);

    return this.evaluate(nodes);
};

Calc.prototype.tokenize = function (input) {

    this.cursor = 0;
    var tokens = [];
    var token = null;

    input = input.replace(/\s+/g, '');

    while (this.cursor < input.length) {

        token = this.getNextToken(input);
        console.log(token);

        switch (token.type) {

            case this.TYPE_NUMBER:
                tokens.push(new Operande(token.value));
                break;

            case this.TYPE_OPERATOR:
                switch (token.value) {
                    case this.TOKEN_OPERATOR_ADDITION:
                        console.log("Addition");
                        break;

                    case this.TOKEN_OPERATOR_SUBSTRACTION:
                        console.log("Soustraction");
                        break;

                    case this.TOKEN_OPERATOR_MULTIPLICATION:
                        console.log("Multiplication");
                        break;

                    case this.TOKEN_OPERATOR_DIVISION:
                        console.log("Division");
                        break;
                }
                break;

            default:
                console.log(token);
        }
    }

    console.log('Tokens : ', tokens);
};

Calc.prototype.getNextToken = function (input) {
    var token = {
        type: null,
        value: ''
    };

    var char = input[this.cursor++];

    console.log("Char : ", char);

    // Number
    while (char != undefined && char >= '0' && char <= '9') {
        if (char >= '0' && char <= '9') {
            token.value += char;
            char = input[this.cursor++];
        }
    }


    if(token.value != '') {
        token.type = this.TYPE_NUMBER;
        token.value *= 1;
        this.cursor--;

        return token;
    }

    // Operator
    if ([
            this.TOKEN_OPERATOR_ADDITION, this.TOKEN_OPERATOR_SUBSTRACTION, this.TOKEN_OPERATOR_MULTIPLICATION,
            this.TOKEN_OPERATOR_DIVISION
        ].indexOf(char) != -1) {

        token.type = this.TYPE_OPERATOR;
        token.value = char;
        return token;
    }

    return token;
};

Calc.prototype.prioritize = function (tokens) {

};

Calc.prototype.evaluate = function (nodes) {

};

function Operande(value) {
    this.value = value;
}
