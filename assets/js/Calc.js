/**
 * Simple formula interpreter
 * @class
 */
var Calc = Class.extend({
    init: function () {
        this.TYPE_NUMBER = 'number';
        this.TYPE_OPERATOR = 'operator';
        this.TYPE_PARENTHESIS = 'parenthesis';

        // Operators
        this.TOKEN_OPERATOR_ADDITION = '+';
        this.TOKEN_OPERATOR_SUBSTRACTION = '-';
        this.TOKEN_OPERATOR_MULTIPLICATION = '*';
        this.TOKEN_OPERATOR_DIVISION = '/';
        this.TOKEN_OPERATORS = [
            this.TOKEN_OPERATOR_ADDITION, this.TOKEN_OPERATOR_SUBSTRACTION, this.TOKEN_OPERATOR_MULTIPLICATION,
            this.TOKEN_OPERATOR_DIVISION
        ];

        // Parentheses
        this.TOKEN_PARENTHESIS_OPEN = '(';
        this.TOKEN_PARENTHESIS_CLOSE = ')';
        this.TOKEN_PARENTHESES = [this.TOKEN_PARENTHESIS_OPEN, this.TOKEN_PARENTHESIS_CLOSE];
    },

    /**
     * Calculate the input
     * @param {String} input
     * @returns {*}
     */
    calculate: function (input) {
        if (!input) {
            return 0;
        }

        var tokens = this.tokenize(input);
        var nodes = this.prioritize(tokens);

        return this.evaluate(nodes);
    },

    /**
     * Return an array of tokens in function of the input
     * @param {String} input
     * @returns {Array}
     */
    tokenize: function (input) {

        this.cursor = 0;
        var tokens = [];
        var token = null;

        input = input.replace(/\s+/g, '');

        while (this.cursor < input.length) {

            token = this.getNextToken(input);

            switch (token.type) {

                case this.TYPE_NUMBER:
                    tokens.push(new Operand(token.value));
                    break;

                case this.TYPE_OPERATOR:
                    switch (token.value) {
                        case this.TOKEN_OPERATOR_ADDITION:
                            tokens.push(new OperatorAddition());
                            break;

                        case this.TOKEN_OPERATOR_SUBSTRACTION:
                            tokens.push(new OperatorSubstraction());
                            break;

                        case this.TOKEN_OPERATOR_MULTIPLICATION:
                            tokens.push(new OperatorMultiplication());
                            break;

                        case this.TOKEN_OPERATOR_DIVISION:
                            tokens.push(new OperatorDivision());
                            break;
                    }
                    break;

                default:
                    console.log(token);
            }
        }

        //console.log('Tokens : ', tokens);
        return tokens;
    },

    /**
     * Return an object which is a the next token found
     * @param input
     * @returns {{type: null|string, value: string|number}}
     */
    getNextToken: function (input) {
        var token = {
            type: null,
            value: ''
        };

        var char = input[this.cursor++];

        // Number
        while (char != undefined && char >= '0' && char <= '9') {
            if (char >= '0' && char <= '9') {
                token.value += char;
                char = input[this.cursor++];
            }
        }

        if (token.value != '') {
            this.cursor--;
            token.type = this.TYPE_NUMBER;
            token.value *= 1;
            return token;
        }

        // Operator
        if (this.TOKEN_OPERATORS.indexOf(char) != -1) {
            token.type = this.TYPE_OPERATOR;
            token.value = char;
            return token;
        }

        // Parenthesis
        if (this.TOKEN_PARENTHESES.indexOf(char) != -1) {
            token.type = this.TYPE_PARENTHESIS;
            token.value = char;
            return token;
        }

        return token;
    },

    prioritize: function (tokens) {
        var nodes = [];
        var token;

        console.log(tokens);

        for(var i in tokens) {
            token = tokens[i];
            console.log(token);
        }

        return nodes;
    },

    evaluate: function (nodes) {

    }
});

/**
 * @class
 */
var Operand = Class.extend({
    init: function (value) {
        this.value = value;
    }
});

/**
 * Base class for different operators
 * @class
 */
var Operator = Class.extend({
    init: function () {
        this.CLASS_OPERATOR = 'operator';
        this.CLASS_OPERATOR_ADDITION = 'addition';
        this.CLASS_OPERATOR_SUBSTRACTION = 'substraction';
        this.CLASS_OPERATOR_MULTIPLICATION = 'multiplication';
        this.CLASS_OPERATOR_DIVISION = 'division';

        this.name = this.CLASS_OPERATOR;
        this.leftOperand = null;
        this.rightOperand = null;
    },

    setLeftOperand: function (value) {
        this.leftOperand = value;
    },

    setRightOperand: function (value) {
        this.rightOperand = value;
    },

    getLeftOperand: function () {
        return this.leftOperand || 0;
    },

    getRightOperand: function () {
        return this.rightOperand || 0;
    }
});

/**
 * Operator for the addition
 * @class
 */
var OperatorAddition = Operator.extend({
    init: function () {
        this._super();
        this.name = this.CLASS_OPERATOR_ADDITION;
    },

    getValue: function () {
        return this.getLeftOperand() + this.getRightOperand();
    }
});

/**
 * Operator for the substraction
 * @class
 */
var OperatorSubstraction = Operator.extend({
    init: function () {
        this._super();
        this.name = this.CLASS_OPERATOR_SUBSTRACTION;
    },

    getValue: function () {
        return this.getLeftOperand() - this.getRightOperand();
    }
});

/**
 * Operator for the multiplication
 * @class
 */
var OperatorMultiplication = Operator.extend({
    init: function () {
        this._super();
        this.name = this.CLASS_OPERATOR_MULTIPLICATION;
    },

    getValue: function () {
        return this.getLeftOperand() * this.getRightOperand();
    }
});

/**
 * Operator for the division
 * @class
 */
var OperatorDivision = Operator.extend({
    init: function () {
        this._super();
        this.name = this.CLASS_OPERATOR_DIVISION;
    },

    getValue: function () {
        return this.getLeftOperand() / this.getRightOperand();
    }
});
