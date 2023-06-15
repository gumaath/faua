import React, { useState, useEffect, ChangeEvent, ChangeEventHandler } from "react";
import axios from "axios";
import AttributeIcon from "../AttributeIcon/page";
import ButtonMUI from '@mui/material/Button';
import { getCookie } from "cookies-next";
import router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Institute {
  institute_id: string,
  institute_name: string,
  institute_segment: string,
  institute_desc: string,
  institute_city: string,
  institute_uf: string,
  institute_attributes: object
}

interface UserFetch {
  user_id: string;
}




export default function CardInstitute({ data }: { data: Institute }) {

const [userData, setUserData] = useState<{ email: string } | null>(null);
const [userFetch, setUserFetch] = useState<UserFetch>({ user_id: '' });
const [disabled, setDisabled] = useState(false);
const token = getCookie('authorization');

useEffect(() => {
  axios({
    method: 'get',
    url: 'http://localhost:3333/verify/',
    headers: {'authorization': token},
  })
    .then((response) => {              
      if (response.data.status == '1') {
        setUserData(response.data);
      } else {
        router.push('/login')
      }
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

useEffect(() => {
  if (userData?.email) {
    axios.post(
      'http://localhost:3333/users/getuser/', userData?.email, {
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
  }
}, [userData]);

useEffect(() => {
  axios({
    method: 'post',
    url: 'http://localhost:3333/users/getcandidates/',
    data: {
      userId: userFetch.user_id,
    }
  }).then((response) => {
    let items = response.data;
    if (response.data) {
     items.map((item: any) => {
      console.log(item);
        if(item.instituteId == data.institute_id) {
          setDisabled(true);
        }
     });
    }
  })
    .catch((error) => {
      console.error(error);
    });
}, [userFetch]);

  function handleCandidate() {
    axios({
      method: 'post',
      url: 'http://localhost:3333/users/candidate/',
      data: {
        userId: userFetch.user_id,
        instituteId: data.institute_id,
      }
    }).then((response) => {
      if (response.data) {
        setDisabled(true);
        toast("Você se candidatou!", {
          theme: "colored",
        });
      }
    })
  }

  const [segmentName, setSegmentName] = useState(0);
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3333/institutes/segments/getsegmentname/${data.institute_segment}`)
      .then((response) => {
        setSegmentName(response.data.segment_name)
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:3333/institutes/attributes/getattributes/${data.institute_id}`)
      .then((response) => {
        setAttributes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div>
    <div className="flex flex-row justify-between py-1 px-2 mb-1 border border-gray-300 rounded" key={data.institute_id}>
      <div>
        <h4 className="block">{segmentName}</h4>
        <h2 className="block">{data.institute_name}</h2>
        <div className="flex flex-row items-center gap-2">
          {attributes.map((attr: any) => <AttributeIcon name={attr.short_text} />)}
        </div>
      </div>
      <div className="flex items-center mr-3">
        <ButtonMUI variant='contained' onClick={handleCandidate} disabled={disabled} color="success">Candidatar</ButtonMUI>
      </div>
    </div>
    <ToastContainer/>
    </div>
  );
}
