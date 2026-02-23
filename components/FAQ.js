"use client"

import { useRef, useState } from "react"

import config from "@/config"

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList

const faqList = [
  {
    question: `Vad är ${config.appName} och vad kan jag hitta här?`,
    answer: (
      <p className="space-y-2 leading-relaxed">
        Vi är en katalog dedikerad till utegym runt om i Sverige. Här kan du
        hitta utegym nära dig, se vilken utrustning som finns på varje plats och
        läsa om vad andra besökare tycker. Vårt mål är att göra det enkelt för
        dig att hitta rätt utegym oavsett var du befinner dig.
      </p>
    ),
  },
  {
    question: "Vem är den här katalogen till för?",
    answer: (
      <p className="space-y-2 leading-relaxed">
        Katalogen är till för alla som vill träna utomhus – oavsett om du är
        nybörjare eller van träningsentusiast. Kanske letar du efter ett utegym
        nära jobbet, hemma eller på en ny ort du besöker. Vi hjälper dig att
        snabbt hitta en plats som passar dina behov och din nivå.
      </p>
    ),
  },
  {
    question: `Varför ska jag använda ${config.appName} istället för en vanlig sökmotor?`,
    answer: (
      <p className="space-y-2 leading-relaxed">
        Till skillnad från en vanlig sökmotor är vi specialiserade på just
        utegym och erbjuder kurerad, detaljerad information om varje plats. Du
        slipper sålla igenom irrelevanta resultat och får istället en tydlig
        överblick med foton, utrustningslistor och recensioner. Vi sparar tid åt
        dig så att du kan fokusera på det viktiga – att komma ut och träna.
      </p>
    ),
  },
]

const Item = ({ item }) => {
  const accordion = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault()
          setIsOpen(!isOpen)
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  )
}

const FAQ = () => {
  return (
    <section className="bg-base-100" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
            Vanliga frågor och svar
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default FAQ
