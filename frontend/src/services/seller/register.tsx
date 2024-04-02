"use client"
import axios from 'axios';

import { HOST } from '@/services/host';
import UserDataService from '../model/user';


let seller_register = async (seller_info: any, card_info: any, location_info: any) => {
    try {
        let url = `${HOST}/seller/register`;
        let body = {
            user_id: UserDataService.getUserData()?.user_id,
            card_info: card_info,
            seller_info: seller_info,
            location_info: location_info,
        }
        const response = await axios.post(url, body);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


export default seller_register;