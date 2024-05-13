export default function Feedback ({value: {good, bad, neutral}}) {
    return (
        <>
         {/* Майбутній компонент Feedback */}
    <p>Good: {good}</p>
    <p>Bad: {bad}</p>
    <p>Neutral: {neutral}</p>
        </>
    )
}