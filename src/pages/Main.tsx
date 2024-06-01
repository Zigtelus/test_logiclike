// modules
import React, { useEffect, useState } from "react";

// utils
import { fetchData } from "../utils/fetchData";

// components
import { Themes } from "../components/Themes";
import { Courses } from "../components/Courses";


// main code
const Main: React.FC = () => {

  const [data, setData] = useState<[] | null>(null);

  useEffect(()=> {
    fetchData({
      url: "https://logiclike.com/docs/courses.json", 
      method: "GET", 
      callback: setData
    })
  }, []);

  if (data === null) return <div className="main">Ошибка соединения</div>;

  const sortList = data.reduce((acum: any, item: any) => {
    const tags = [...item.tags];
    
    while (tags.length) {
      const tag = tags.shift();

      const matchChecking = acum.tags.some((item: string)=> item === tag);
      if (!matchChecking) {
        acum.tags.push(tag);
      };
    };

    return acum;
  }, {
    tags: ["Все темы"],
  })

  // стейт из компоненты "Courses"
  let stateCourses = null;

  return <div className="main">
    <Themes choiceTheme={choiceTheme} list={sortList.tags} />
    <Courses cards={data} getStateCourses={getStateCourses} />
  </div>;

  // стейет из компоненту "Courses" назначаем для переменной "stateCourses"
  function getStateCourses(state: any) {
    stateCourses = state;
  };

  // теперь стейт из компоненты "Courses", размещаем в функции, которая будет срабатывать при клике каждой темы в комопненте "Themes" 
  function choiceTheme(theme: string) {

    // если бы мы тут использовали стейт компоненты "main", то был бы постоянный перерендер всего приложения при каждом клике на тему
    stateCourses(theme);
  };
  
};

export { Main };