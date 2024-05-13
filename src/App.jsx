
import { useState, useEffect } from 'react';
import Description from './Description/Description';
import Options from './Options/Options';
import Feedback from './Feedback/Feedback';
import Notification from './Notification/Notification';


export default function App() {

    // в useState передаємо функцію-ініціалізатор початкового стану - дані з localStorage, 
    // ця функція виконується до монтування компонента
const [response, setResponse] = useState(() => {

   const savedFeedback = localStorage.getItem('response');
//    якщо в localStorage є дані, парсимо значення з localStorage

//    якщо в localStorage нічого немає, початкові дані відгуків ініціалізувати = 0

return savedFeedback !== 0 ? JSON.parse(savedFeedback) : {
        good: 0,
        bad: 0,
        neutral: 0
       }

})


//   Записувати значення зі стану в локальне сховище лише тоді, коли вони змінюються.
// Прочитати із localStorage початкові значення за доп useEffect не вийде - асинхронна функція і викликається після монтування,
// а нам потрібно прочитати дані до монтування компонента
useEffect(() => {
    localStorage.setItem("response", JSON.stringify(response));
}, [response])

//загальна кількість відгуків
const totalFeedback = response.good + response.neutral + response.bad;
// console.log("Кількість відгуків:", totalFeedback);


{/* функція приймає значення good, bad, neutral, в новий об'єкт додає копію переднього значення об'єкта,
і за доп setResponse змінює кожне значення об'єкта на +1. 
    спосіб отримати доступ до властивості об'єкта — це синтаксис objectName[”key”].
Як правило, у випадках, коли ім'я властивості заздалегідь не відоме або воно зберігається у змінній,
 наприклад як значення параметра функції.
 На місце звернення буде повернуто значення властивості з таким ім'ям.
 */}
const updateFeedback = (feedbackType) =>{
    setResponse({...response, [feedbackType] : response[feedbackType] + 1})
    
}

const resetFeedback = () => {
    setResponse({ good: 0, bad: 0, neutral: 0 });
  };

return (
    <>
    <Options onCount={()=>{updateFeedback("good")}}>Good: {response.good}</Options>
    <Options onCount={()=>{updateFeedback("bad")}}>Good: {response.bad}</Options>
    <Options onCount={()=>{updateFeedback("neutral")}}>Good: {response.neutral}</Options>

    <button onClick={resetFeedback}>Reset</button>

    {/*компонент Feedback рендериться тільки після того, як було зібрано хоча б один відгук.
    Умовний рендеринг: умова && розмітка.
    Зліва ставиться умова рендеру, справа JSX розмітка, 
    що буде відрендерена якщо умова зліва наближається до true. 

 */}
 {
    totalFeedback > 0 ? (<Feedback value={response}/>) : (<Notification />)
 }

    </>
)
}


