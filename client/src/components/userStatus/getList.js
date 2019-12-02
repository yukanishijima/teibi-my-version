//import React from 'react';
//import ListLocations from "../list";
import axios from "axios"

async function GetList(users) {
    let usersSelected = 0;
    for (let i = 0; i < users.length; i++) {
        if (users[i].status === "Selected!") {
            usersSelected += 1
        }
    }
    //let infoBack
    //let temp = <></>
    if (usersSelected === 2) {
        let latlng = `${users[0].lat}/${users[0].lon}/${users[1].lat}/${users[1].lon}`
        // console.log(latlng);
        // let data
        // infoBack = { "businesses": [{ "id": "BOml4YRmKqx7MiEVvlUadg", "alias": "china-gourmet-takeout-toronto", "name": "China Gourmet Takeout", "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/SeKAmGjrstZ48RQiFYpiRg/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/china-gourmet-takeout-toronto?adjust_creative=F361kxeH5jyLjV27BcFFBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=F361kxeH5jyLjV27BcFFBA", "review_count": 25, "categories": [{ "alias": "chinese", "title": "Chinese" }], "rating": 3, "coordinates": { "latitude": 43.664070778706, "longitude": -79.36836401968 }, "transactions": [], "price": "$", "location": { "address1": "235 Carlton Street", "address2": "", "address3": "", "city": "Toronto", "zip_code": "M5A 2L2", "country": "CA", "state": "ON", "display_address": ["235 Carlton Street", "Toronto, ON M5A 2L2", "Canada"] }, "phone": "+14165150088", "display_phone": "+1 416-515-0088", "distance": 30.081282447907896 }, { "id": "ZWcGe0iiuLUlQIu_zxQlPw", "alias": "fancy-franks-toronto-4", "name": "Fancy Franks", "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/6JT9l_wy4b7AUaVoVViPUQ/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/fancy-franks-toronto-4?adjust_creative=F361kxeH5jyLjV27BcFFBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=F361kxeH5jyLjV27BcFFBA", "review_count": 6, "categories": [{ "alias": "hotdog", "title": "Hot Dogs" }, { "alias": "burgers", "title": "Burgers" }, { "alias": "poutineries", "title": "Poutineries" }], "rating": 3, "coordinates": { "latitude": 43.66469, "longitude": -79.36839 }, "transactions": [], "price": "$$", "location": { "address1": "484 Parliament Street", "address2": "", "address3": null, "city": "Toronto", "zip_code": "M4X 1P2", "country": "CA", "state": "ON", "display_address": ["484 Parliament Street", "Toronto, ON M4X 1P2", "Canada"] }, "phone": "+16473503647", "display_phone": "+1 647-350-3647", "distance": 44.93565936518406 }], "total": 2, "region": { "center": { "longitude": -79.36855670286548, "latitude": 43.6643026333959 } } }
        // return infoBack = { "businesses": [{ "id": "BOml4YRmKqx7MiEVvlUadg", "alias": "china-gourmet-takeout-toronto", "name": "China Gourmet Takeout", "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/SeKAmGjrstZ48RQiFYpiRg/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/china-gourmet-takeout-toronto?adjust_creative=F361kxeH5jyLjV27BcFFBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=F361kxeH5jyLjV27BcFFBA", "review_count": 25, "categories": [{ "alias": "chinese", "title": "Chinese" }], "rating": 3, "coordinates": { "latitude": 43.664070778706, "longitude": -79.36836401968 }, "transactions": [], "price": "$", "location": { "address1": "235 Carlton Street", "address2": "", "address3": "", "city": "Toronto", "zip_code": "M5A 2L2", "country": "CA", "state": "ON", "display_address": ["235 Carlton Street", "Toronto, ON M5A 2L2", "Canada"] }, "phone": "+14165150088", "display_phone": "+1 416-515-0088", "distance": 30.081282447907896 }, { "id": "ZWcGe0iiuLUlQIu_zxQlPw", "alias": "fancy-franks-toronto-4", "name": "Fancy Franks", "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/6JT9l_wy4b7AUaVoVViPUQ/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/fancy-franks-toronto-4?adjust_creative=F361kxeH5jyLjV27BcFFBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=F361kxeH5jyLjV27BcFFBA", "review_count": 6, "categories": [{ "alias": "hotdog", "title": "Hot Dogs" }, { "alias": "burgers", "title": "Burgers" }, { "alias": "poutineries", "title": "Poutineries" }], "rating": 3, "coordinates": { "latitude": 43.66469, "longitude": -79.36839 }, "transactions": [], "price": "$$", "location": { "address1": "484 Parliament Street", "address2": "", "address3": null, "city": "Toronto", "zip_code": "M4X 1P2", "country": "CA", "state": "ON", "display_address": ["484 Parliament Street", "Toronto, ON M4X 1P2", "Canada"] }, "phone": "+16473503647", "display_phone": "+1 647-350-3647", "distance": 44.93565936518406 }], "total": 2, "region": { "center": { "longitude": -79.36855670286548, "latitude": 43.6643026333959 } } };
        let dat = await axios.get("/api/mid/" + latlng);
        return dat.data;
        // .then(function (dat) {
        //     // return infoBack;
        //     // handle success
        //     return dat.data;
        // })
        // .catch(err => {
        //     console.log(err); 
        //     return err;
        // })
    }
    return [];
}

export default GetList;