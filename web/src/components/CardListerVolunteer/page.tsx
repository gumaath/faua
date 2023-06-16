import React, { useState, useEffect, ChangeEvent, ChangeEventHandler } from "react";
import axios from "axios";
import ButtonMUI from '@mui/material/Button';
import { Icon } from "@iconify/react";
import CardVolunteer from "../CardVolunteer/page";
import { getCookie } from "cookies-next";

export default function CardListerVolunteer() {
  const [usersCandidate, setUsersCandidate] =  useState<any>();
  const [pageNumber, setPageNumber] = useState(0);
  const [isCounted, setIsCounted] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [maxPage, setMaxPage] = useState(0);
  const [instituteData, setInstituteData] = useState<any>({});
  const [instituteFetch, setInstituteFetch] = useState<any>({});;

  const token = getCookie('authorization');

  function handlePrevClick() {
    if (pageNumber <= 0) return 0;
    setPageNumber(pageNumber - 1);
  }

  function handleNextClick() {
    if (pageNumber >= maxPage) return pageNumber;
    setPageNumber(pageNumber + 1);
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3333/verify/',
      headers: { 'authorization': token },
    })
      .then((response) => {
        if (response.data.status == '1') {
          setInstituteData(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  useEffect(() => {
    if (instituteData?.email) {
      axios.post(
        'http://localhost:3333/institutes/getinstitute/', instituteData?.email, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response) {
            setInstituteFetch(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [instituteData])

  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:3333/users/getuserscandidates/count',
      data: {
        instituteId: instituteFetch.institute_id,
      }
    })
      .then((response) => {
        setIsCounted(true);
        setMaxPage(Math.floor(parseInt(response.data) / 10))
      })
      .catch((error) => {
        console.log(error);
      });
  }, [instituteFetch]);

  useEffect(() => {
    axios({
      method: 'post',
      url: `http://localhost:3333/users/getuserscandidates/${pageNumber}`,
      data: {
        instituteId: instituteFetch.institute_id,
      }
    })
      .then((response) => {
        setIsFetched(true);
        setUsersCandidate(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [maxPage]);

  return (
    <div className="flex flex-col mb-3">
      <div className="bg-zinc-100 p-2 text-sm text-zinc-500">
        {isFetched && usersCandidate.map((attr: any) => (
          <CardVolunteer data={attr} />
        ))}
        <div className="flex items-center justify-around mt-1">
          <ButtonMUI sx={{ color: 'gray' }} className="text-red-500" startIcon={<Icon icon='ic:round-skip-previous' />} onClick={handlePrevClick}>Voltar</ButtonMUI>
          <ButtonMUI sx={{ color: 'gray' }} className="underline" endIcon={<Icon icon='ic:round-skip-next' />} onClick={handleNextClick}>Próxima</ButtonMUI>
        </div>
      </div>
    </div>
  );
}
