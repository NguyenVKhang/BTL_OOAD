import { Modal } from 'react-bootstrap';
import style from '../style.module.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// import Image from 'next/image';
import User from '@/models/user';
import router from 'next/router';
import { UserContext } from '@/services/context/UserContext';
import { userAgent } from 'next/server';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Props {
  showModalQRScan: boolean;
  handleCloseModalQRScan: () => void;
}

const QRModal: React.FC<Props> = ({ showModalQRScan, handleCloseModalQRScan }) => {
  const [currency, setCurrency] = useState(0);
  const [secretCode, setSecretCode] = useState('');
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let charactersLength = characters.length;
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setSecretCode(result);
  }, []); // Empty dependency array ensures it runs only once on mount



  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.sieuthicode.net/historyapibidv/f8f62e728987adfd0f09e4cac311486f`);
        const data = response.data;
        console.log(data);
        if (data.success) {
          const histories = data.txnList;
          console.log(histories);
          histories.map(async (history: any) => {
            if (history.txnRemark.includes(secretCode)) {
              clearInterval(intervalId);
              console.log(history.txnRemark, secretCode);
              console.log(history.txnRemark.includes(secretCode))
              console.log(secretCode);
              let url = `http://localhost:8080/account/user/qr_payment`;
              try {
                const response = await axios.post(url, { user_id: user?.id, amount: history.amount * 1000 });
                if (response.status === 200) {
                  let user: User = {
                    id: response.data.user.id,
                    email: response.data.user.email,
                    first_name: response.data.user.first_name,
                    last_name: response.data.user.last_name,
                    user_name: response.data.user.user_name,
                    coin: response.data.user.coin,
                    phone: response.data.user.phone,
                    location_id: response.data.user.location_id,
                    avatar_path: response.data.user.avatar_path
                  }
                  setUser(user);
                  toast.success('Deposit successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
              }
              catch (err) {

              }
            }
          })
        }
        // setCurrency(data.currency);
      } catch (error) {
        console.log('Error fetching currency, but silently handled.', error);
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [secretCode]);


  return (
    <div>
      <Modal show={showModalQRScan} onHide={handleCloseModalQRScan} fullscreen='xxl-down'>
        <Modal.Header closeButton>
          <Modal.Title>Scan QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex justify-content-center'>
            <img src="/qr.jpg" alt="Descriptive alt text for the QR Code" width={300} height={300} />

          </div>

          <div>Enter the code and transfer the money and wait a bit.</div>

          <div>Code: {secretCode} (Please enter the correct code)
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <button type="button" className="btn btn-dark" disabled>
            Waiting for scan
          </button>
          <p className="mx-3" onClick={handleCloseModalQRScan}>Cancel</p>
        </Modal.Footer>
      </Modal>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default QRModal;


