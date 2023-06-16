import React, { useState, useEffect, ChangeEvent, ChangeEventHandler } from "react";
import axios from "axios";
import AttributeIcon from "../AttributeIcon/page";
import ButtonMUI from '@mui/material/Button';
import { getCookie } from "cookies-next";
import router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Attribute {
  attribute_id: string,
  attribute_name: string,
  first_person_text: string,
  second_person_text: string
}

export default function CardVolunteer({ data }: { data: any }) {
  const [userFetch, setUserFetch] = useState<any>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  useEffect(() => {
    axios.post(
      'http://localhost:3333/users/getuser/', data.userId, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response) {
          setUserFetch(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });

      axios
      .get(`http://localhost:3333/users/attributes/getattributes/${data.userId}`)
      .then((response) => {
        setAttributes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const data_atual = new Date();
  const data_nascimento = new Date(userFetch.user_birth);
  const diferenca = data_atual.getTime() - data_nascimento.getTime();
  const idade = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));

  return (
    <div>
      <div className="flex flex-row justify-between py-1 px-2 mb-1 border border-gray-300 rounded" key={data.institute_id}>
        <div>
          <h4 className="block">{userFetch.user_email}</h4>
          <h2 className="block">{userFetch.user_name} - {idade} anos</h2>
          <div className="flex flex-col gap-1">
          {attributes.map((attr: any) => <AttributeIcon name={attr.second_person_text} />)}
        </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
