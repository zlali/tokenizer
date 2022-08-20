
	Array.prototype.insert = function(index) {
		index = Math.min(index, this.length);
		arguments.length > 1
			&& this.splice.apply(this, [index, 0].concat([].pop.call(arguments)))
			&& this.insert.apply(this, arguments);
		return this;
	};

	const unaryOperators = ['sin','cos','tan','ln'];
	const leftBracket = ['('];
	const rightBracket = [')'];
	const variables = ['x', 'y'];
	const constants = ['pi', 'e'];

	function isUnaryOperator(str) {
		return unaryOperators.includes(str)
	}
	function isLeftBracket(str) {
		return leftBracket.includes(str)
	}
	function isRightBracket(str) {
		return rightBracket.includes(str)
	}
	function isVariables(str) {
		return variables.includes(str)
	}
	function isConstants(str) {
		return constants.includes(str)
	}
	
	let str = "-(-2cos(x))+4ln(x^2.2)^4=-2x(pi+x)";
	console.log(str);
	let sliced = str.match(/\s*(?:([()^+*\/-])|([a-z]+)|((?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)(?:e[+-]?[0-9]+)?)|(\S))/g);
	//  \s*(?:                 Optional whitespace, followed by one of:
	//  ([()^+*\/-])           Punctuation or operator
    //  |([a-z]+)              Variable or function name
    //  |((?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)(?:e[+-]?[0-9]+)?)  Number
    //  |(\S))                 Anything else is an error
	console.log(sliced);

	//if the first value is -(
	if(str[0] == '-' && str[1] == '(') {
		sliced.splice(0,1,'-1','*');
	}
	
	for(let i = 0; i < sliced.length; i++) {
		//negative sign detection
		if(i>1 && !isNaN(sliced[i]) && sliced[i-1] == '-') {
			sliced.splice(i-1,2,'-'+sliced[i]);
		}
		if(i>1 && isConstants(sliced[i]) && sliced[i-1] == '-') {
			sliced.splice(i-1,2,'-'+sliced[i]);
		}
		if(i>1 && isVariables(sliced[i]) && sliced[i-1] == '-') {
			sliced.splice(i-1,2,'-'+sliced[i]);
		}
		if(i>1 && isUnaryOperator(sliced[i]) && sliced[i-1] == '-') {
			sliced.splice(i-1,2,'-'+sliced[i]);
		}
		//asterisk detection
		if(i>1 && isLeftBracket(sliced[i]) && !isNaN(sliced[i-1])) {
			sliced.insert(i,'*');
		}
		if(i>1 && isLeftBracket(sliced[i]) && isVariables(sliced[i-1])) {
			sliced.insert(i,'*');
		}
		if(i>1 && isUnaryOperator(sliced[i]) && !isNaN(sliced[i-1])) {
			sliced.insert(i,'*');
		}
		if(i>1 && isVariables(sliced[i]) && !isNaN(sliced[i-1])) {
			sliced.insert(i,'*');
		}
	}

	console.log(sliced);






