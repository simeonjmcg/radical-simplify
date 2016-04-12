var submit = $("#submit"),
    input  = $("#input"),
    output = $("#output"),
    show   = $("#show");

function UserException(message) {
   this.message = message;
   this.name = "UserException";
   this.toString = function() {
      return "[" + this.name + "]: " + this.message;
   };
}

function radsimplify(num) {
	if(num == null || isNaN(num)) {
		throw new UserException("Please enter a valid number.");
	}
	if(num % 1 !== 0) {
		throw new UserException("Please enter an integer value.");
	}
	var result  = {},
	    i;
	// test possible perfect squares, starting from original value, going down to 2
	for(i = num; i >= 2; i--) {
		var sq = i*i;
		if(num/sq % 1 === 0) { // if num/sq is an integer
			result["coefficiant"] = i;
			result["radical"] = num/sq;
			return result;
		}
	}
	// fallback, if radical cannot be simplified
	result["coefficiant"] = 1;
	result["radical"] = num;
	return result;
}

submit.click(function(e) {
	// retrieve float value, so we may give helpful user errors(ie "you must use integer values" etc)
	var inputNum = parseFloat(input.val());
	
	try {
		var simp,
		    outputStr = "";
		// get radsimplify object
		simp = radsimplify(inputNum);
		if(show.prop("checked")) { // whether or not to show the simplification process
			// add initial input value
			outputStr = "√" + inputNum + "\n";
			if(simp["coefficiant"] == 1) { // if coefficiant is the implied 1, don't show it.
				outputStr += "√" + simp["radical"];
			} else {
				if(simp["radical"] == 1) { // when radical is 1, that means the input was a perfect square
					outputStr += simp["coefficiant"];
				} else {
					outputStr += "√" + (simp["coefficiant"] * simp["coefficiant"]) + "√" + simp["radical"] + "\n" +
						         simp["coefficiant"] + "√" + simp["radical"];
				}
			}
		} else {
			if(simp["coefficiant"] == 1) { // if coefficiant is the implied 1, don't show it.
				outputStr = "√" + simp["radical"];
			} else {
				if(simp["radical"] == 1) { // when radical is 1, that means the input was a perfect square
					outputStr = simp["coefficiant"];
				} else {
					outputStr = simp["coefficiant"] + "√" + simp["radical"];
				}
			}
		}
		output.text(outputStr);
	} catch(e) {
		// output any UserExceptions
		if(e.message != null && e.name == "UserException") {
			output.text("(" + e.message + ")");
		}
	}
});
