// modules
import React, { useState } from "react";

// main code
interface IProps {
	cards: any[];
	getStateCourses: (state: any)=> void;
};
const Courses: React.FC <IProps> =({cards, getStateCourses})=> {

  const [selectTheme, setSelectTheme] = useState<string>("Все темы");

	// передаем стейт родителю, что бы получать актуальную информацию о выборе темы
	getStateCourses(setSelectTheme);

	const newCards = cards.filter(item => {

		if (selectTheme === "Все темы") return true;

		return item.tags.some((item)=> item === selectTheme);
	})

	return <div className="courses">
		{
			newCards.length === 0 ?
			<div> ничего ненайдено </div> :
			newCards.map(item => {
			  return <div
				  className="courses__item" 
					key={item.id}
				>
					<div 
					  className="courses__item__picture"
					  style={{background: item.bgColor}}
					>
					  <img src={item.image} alt={item.name} />
					</div>

					<span
					  className="courses__item__title"
					>{item.name}</span>
				</div>
			})
		}
	</div>
};

export { Courses };