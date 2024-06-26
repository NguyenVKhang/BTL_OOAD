import React from 'react'

import '@smastrom/react-rating/style.css'
import { Rating, ThinStar } from '@smastrom/react-rating'
import dateFormat, { masks } from "dateformat";
import Auction from '@/models/auction';
import styled from 'styled-components';
// Declare it outside your component so it doesn't get re-created
const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: '#a36b0d',
    inactiveFillColor: '#ffffff',
    itemStrokeWidth: 1,
    inactiveStrokeColor: '#a36b0d',
    activeStrokeColor: '#a36b0d',
}

enum StatusAuction {
    EventOrganizing = "0",
    UpcomingEvent = "1",
    EventOrganized = "2",

}

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;

function openLivedAuction() {
    let width = window.screen.width;
    let height = window.screen.height;
    let left = 0;
    let top = 0;

    let windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;
    window.open('/lived-auction', '_blank', windowFeatures);
}

function UpcomingAuctions({ obj }: { obj: Auction }) {
    return (
        <div style={{ borderTop: "2px solid #440a77" }}>
            <div className="container">
                <div className="row py-4">
                    <div className="col-3 d-flex justify-content-center align-items-center" style={{ border: "1px solid #bac4c9" }}>
                        <img src={obj.products[0].images[0].url} style={{ width: "auto", height: "300px", maxWidth: "100%" }} />
                    </div>


                    <div className="col-9">
                        <div className="row">
                            <div className="col-8">

                                <div className='my-1 fw-bold'
                                    style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}
                                >                 {obj.name}
                                </div>

                                <StyledLink href={`/auction-house/${obj.seller?.id}`}
                                    onClick={(e) => e.stopPropagation()}
                                >by {obj.seller?.name}</StyledLink>
                                <div className='d-flex'>
                                    <Rating style={{ maxWidth: 100 }}
                                        //  set 2 decimal places of object.voting_avg_review

                                        value={obj.seller.reviews.reduce((a, b) => a + b.rating, 0) / obj.seller.reviews.length || 0}

                                        readOnly={true} itemStyles={myStyles} />
                                    {/* //  set 2 decimal places of object.voting_avg_review */}
                                    {'\u00A0'}  {(obj.seller.reviews.reduce((a, b) => a + b.rating, 0) / obj.seller.reviews.length || 0).toFixed(1)}
                                    {'\u00A0\u00A0'}
                                    ({obj.seller.reviews.length} Reviews)
                                </div>
                                <div className="my-3">
                                    {/* {obj.time} */}
                                    {dateFormat(obj.time_auction, " mmm dd, yyyy - hh:MM TT")}
                                </div>
                                <div>
                                    {obj.location.country}, {obj.location.city}
                                </div>
                            </div>


                            <div className="col-4">
                                <p>
                                    <i className='fa fa-feed'>
                                    </i>
                                    {' '}Live Auction
                                </p>




                                <button type="button" className="btn btn-danger w-100">
                                    <div onClick={openLivedAuction}>
                                        Enter Lived Auction
                                    </div>


                                </button>


                                <a className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="#">
                                    Register to bid
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            {/* {obj.products && obj.products[0].images.length > 0 && obj.images.map((object, i) => (
                                <div className="col-2 mx-2 px-0 " key={i}>
                                    <img src={object} style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "150px" }} className='position-relative top-50 start-50 translate-middle' />
                                </div>
                            ))} */}

                            <div className="col-12">
                                <div className="row pt-3 d-flex justify-content-around">
                                    {obj.products && obj.products.slice(1, 6).map((object, i) => (
                                        <div className="col-2 px-0" key={i}>
                                            <img src={object.images[0].url} style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "180px" }} className='position-relative top-50 start-50 translate-middle' />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default UpcomingAuctions;