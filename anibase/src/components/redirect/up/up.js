import "./up.css";

export default function UpChevron({ id }) {
  const handleScroll = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(`Element with id "${id}" not found`);
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="white"
      className="bi bi-chevron-up"
      viewBox="0 0 16 16"
      onClick={handleScroll}
    >
      <path
        fillRule="evenodd"
        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
      />
    </svg>
  );
}
