import { useEffect, useState } from "react";



function DoubleEffect() {
	const [counter, setCounter] = useState(0);
	useEffect(() => {
		const id = setInterval(() => {
			setCounter((prevState) => prevState + 1);
		}, 1 * 1000);
		return () => {
			clearInterval(id);
		};
	}, []);
	return (
		<div>
			<h1 className="text-2xl">
				effect
				{counter}
			</h1>
		</div>
	);
}
export default DoubleEffect;
