import { useState } from "react";
const defFun = (val) => {
	return true;
};
const useValidation = (valFunc = defFun, initVal = "") => {
	const [enteredValue, setenteredValue] = useState(initVal || "");
	const [isTouched, setisTouched] = useState(false);
	const isValid = valFunc(enteredValue);
	const hasError = isTouched && !isValid;

	const onValueChange = (event) => {
		setenteredValue(event.target.value);
	};
	const onFieldBlur = () => {
		setisTouched(true);
	};
	const onReset = () => {
		setisTouched(false);
		setenteredValue("");
	};
	return {
		enteredValue,
		isValid,
		onValueChange,
		onFieldBlur,
		hasError,
		onReset,
	};
};

export default useValidation;
