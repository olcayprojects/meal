import { useState, useEffect } from "react";

// Custom hook: Intersection Observer'ı yöneten hook
const useIntersectionObserver = () => {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Eğer kart görünürse, visibleCards'a ekle
          if (entry.isIntersecting) {
            if (!visibleCards.includes(entry.target)) {
              setVisibleCards((prev) => [...prev, entry.target]);
            }
          } else {
            // Eğer kart görünür değilse, visibleCards'tan çıkar
            setVisibleCards((prev) =>
              prev.filter((card) => card !== entry.target)
            );
          }
        });
      },
      { threshold: 0.2 }
    ); // %50'si göründüğünde tetiklenir

    const cards = document.querySelectorAll(".cardS");
    cards.forEach((card) => observer.observe(card));

    // Cleanup observer
    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, [visibleCards]);

  return visibleCards;
};

export default useIntersectionObserver;
