import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

interface Attribute {
  attribute_id: string,
  attribute_name: string,
  first_person_text: string,
  second_person_text: string
}

export default function AttributesLister({ type }: { type: string }) {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isCounted, setIsCounted] = useState(false);
  const [maxPage, setMaxPage] = useState(0);

  function handlePrevClick() {
    console.log(pageNumber);
    console.log(maxPage);
    if (pageNumber <= 0) return 0;
    setPageNumber(pageNumber - 1);
  }

  function handleNextClick() {
    if (pageNumber >= maxPage) return pageNumber;
    setPageNumber(pageNumber + 1);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3333/${type}/attributes/count`)
      .then((response) => {
        setIsCounted(true);
        setMaxPage(Math.floor(parseInt(response.data) / 10))
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3333/${type}/attributes/${pageNumber}`)
      .then((response) => {
        setAttributes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageNumber]);

  return (
    <div className="flex flex-col mb-3">
      <label className='text-xs text-zinc-500 pl-[2px] mb-[2px]'>Atributos</label>
      <div className="rounded-md bg-zinc-100 p-2 text-sm text-zinc-500">
        {attributes.map((attr) => (
          <div className="flex items-center py-1 px-2 mb-1 border border-gray-300 rounded" key={attr.attribute_id}>
            <input className="mr-1 " type="checkbox" value={attr.attribute_id} name={`attr_${attr.attribute_id}`} id={`attr_${attr.attribute_id}`} />
            <label htmlFor={`attr_${attr.attribute_id}`}>{attr.first_person_text}</label>
          </div>
        ))}
        <div className="flex items-center justify-around mt-1">
          <button type="button" className="underline" onClick={handlePrevClick}>&lt; Voltar</button>
          <button type="button" className="underline" onClick={handleNextClick}>Próxima &gt;</button>
        </div>
      </div>
    </div>
  );
}
