import React, { useState, useEffect, ChangeEvent, ChangeEventHandler } from "react";
import axios from "axios";
import CardInstitute from "../CardInstitute/page";
import ButtonMUI from '@mui/material/Button';
import { Icon } from "@iconify/react";

interface Institute {
  institute_id: string,
  institute_name: string,
  institute_segment: string,
  institute_desc: string,
  institute_city: string,
  institute_uf: string,
  institute_attributes: object
}

export default function CardLister() {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isCounted, setIsCounted] = useState(false);
  const [maxPage, setMaxPage] = useState(0);

  function handlePrevClick() {
    if (pageNumber <= 0) return 0;
    setPageNumber(pageNumber - 1);
  }

  function handleNextClick() {
    if (pageNumber >= maxPage) return pageNumber;
    setPageNumber(pageNumber + 1);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3333/institutes/count`)
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
      .get(`http://localhost:3333/institutes/getinstitutes/${pageNumber}`)
      .then((response) => {
        setInstitutes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageNumber]);


  return (
    <div className="flex flex-col mb-3">
      <div className="bg-zinc-100 p-2 text-sm text-zinc-500">
        {institutes.map((attr) => (
          <CardInstitute data={attr}/>
        ))}
        <div className="flex items-center justify-around mt-1">
          <ButtonMUI sx={{color: 'gray'}} className="text-red-500" startIcon={<Icon icon='ic:round-skip-previous'/>} onClick={handlePrevClick}>Voltar</ButtonMUI>
          <ButtonMUI sx={{color: 'gray'}} className="underline" endIcon={<Icon icon='ic:round-skip-next'/>} onClick={handleNextClick}>Próxima</ButtonMUI>
        </div>
      </div>
    </div>
  );
}
