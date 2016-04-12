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
	for(i = num; i >= 2; i--) {
		var sq = i*i;
		if(num/sq % 1 === 0) {
			result["coefficiant"] = i;
			result["radical"] = num/sq;
			return result;
		}
	}
	result["coefficiant"] = 1;
	result["radical"] = num;
	return result;
}

submit.click(function(e) {
	var inputNum = parseFloat(input.val());
	
	try {
		var simp,
		    outputStr = "";
		simp = radsimplify(inputNum);
		if(show.prop("checked")) {
			outputStr = "√" + inputNum + "\n";
			if(simp["coefficiant"] != 1) {
				if(simp["radical"] != 1) {
					outputStr += "√" + (simp["coefficiant"] * simp["coefficiant"]) + "√" + simp["radical"] + "\n" +
						         simp["coefficiant"] + "√" + simp["radical"];
				} else {
					outputStr += simp["coefficiant"];
				}
			} else {
				outputStr += "√" + simp["radical"];
			}
		} else {
			if(simp["coefficiant"] != 1) {
				if(simp["radical"] != 1) {
					outputStr = simp["coefficiant"] + "√" + simp["radical"];
				} else {
					outputStr = simp["coefficiant"];
				}
			} else {
				outputStr = "√" + simp["radical"];
			}
		}
		output.text(outputStr);
	} catch(e) {
		console.error(e);
		if(e.message != null && e.name == "UserException") {
			output.text("(" + e.message + ")");
		}
	}
});
