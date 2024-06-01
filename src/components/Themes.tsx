// modules
import React, { useState } from "react";

// main code
interface IProps {
	list: string[];
	choiceTheme: (title: string)=> void;
};

const Themes: React.FC<IProps> =({list, choiceTheme})=> {

	const [theme, setTheme] = useState("Все темы");

	return <ul className="themes">
		{
			list.map((item: any) => {
				return <li 
				  key={item}
					className={theme === item ? "themes__item-active themes__item" : "themes__item"}
				>
					<button onClick={()=> {
						choiceTheme(item)
						setTheme(item)
					}}>{item}</button>
				</li>
	  	})
		}
	</ul>
};

export { Themes };