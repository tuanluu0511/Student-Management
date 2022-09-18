export default function Overlay() {
  const overlay = document.querySelector('.overlay');
  const clickHandler = () => {
    overlay?.classList.toggle('hidden');
  };
  return <div className="overlay hidden" onClick={clickHandler}></div>;
}
