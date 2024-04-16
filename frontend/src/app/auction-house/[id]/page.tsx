'use client'
import UpcomingAuctions from '@/components/shared/upcomingAuctions';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@smastrom/react-rating/style.css'
import { Container, } from "react-bootstrap";
import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/customer/auctionHouse.module.css';
import styles2 from '@/styles/auction_house/soldItem.module.css'
import AppHeader from '@/components/AppHeader';
import AppNav from '@/components/AppNav'
<<<<<<< HEAD:frontend/src/app/auction-house/page.tsx
// import AppBreadCrumb from '@/components/AppBreadCrumb'
=======
>>>>>>> ee04a0c8cbc6b743d68652e26baec859527fc0e0:frontend/src/app/auction-house/[id]/page.tsx
import AppFooter from '@/components/AppFooter';
import Map from '@/components/auction-house/Map';
import Tab from '@/components/auction-house/Tab';
import TabContent from '@/components/auction-house/TabContent';
import SoldItem from '@/components/shared/soldItem';
import User from '@/models/user';
import Comment from '@/components/auction-house/Comment';
import PassAuction from '@/components/auction-house/PastAuction';
import { user_get_auction_upcoming } from '@/services/auction/user';
import { Data } from '@react-google-maps/api';
import { seller_info } from '@/services/account/seller';
import { seller_auction_past_service } from '@/services/auction/seller';
import { seller_product_sold_service } from '@/services/product/seller';
import get_review_service from '@/services/component/review';
import AuctionSummary from '@/models/auction_summary';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import ItemSummary from '@/models/product_summary';

const AuctionHouse = ({ params }: { params: { id: string } }) => {
    const seller_id = Number(params.id);
    const [activeTab, setActiveTab] = useState<'upcoming' | 'review' | 'sold' | 'past_ac'>('upcoming');
    const tabContentRefs = {
        upcoming: useRef<HTMLDivElement>(null),
        review: useRef<HTMLDivElement>(null),
        sold: useRef<HTMLDivElement>(null),
        past_ac: useRef<HTMLDivElement>(null),
    };

    const handleTabClick = (tabId: 'upcoming' | 'review' | 'sold' | 'past_ac') => {
        setActiveTab(tabId);
        scrollToTabContent(tabId);
    };

    const scrollToTabContent = (tabId: 'upcoming' | 'review' | 'sold' | 'past_ac') => {
        const tabContentRef = tabContentRefs[tabId].current;
        if (tabContentRef) {
            tabContentRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const [auctionHouse, setAuctionHouse] = useState<{
        auctionHouse_id: number,
        auctionHouse_name: string,
        auctionHouse_createdTime: string,
        auctionHouse_location: { "x": number, "y": number },
        auctionHouse_vote: number,
    } | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await seller_info(seller_id);
                if (data) {
                    setAuctionHouse(data);
                } 
                
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        };

        fetchData()
    }, [])


    const [review, setReview] = useState<{
        id: number,
        user: {
            user_id: number,
            email: string,
            first_name: string,
            last_name: string,
            user_name: string,
            coin: number,
            phone: string,
            location_id: number,
        },
        vote: number,
        comment: string,
        time_create: string,
    }[] | undefined>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await get_review_service(seller_id);
                
                if (Array.isArray(data)) {
                    setReview(data);
                } else {
                    setReview([])
                }
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        };

        fetchData()
    }, [])

    const [upcomingAuctions, setUpcomingAuctions] = useState<AuctionSummary[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await user_get_auction_upcoming();
                if (Array.isArray(data)) {
                    setUpcomingAuctions(data);
                } else {
                    setUpcomingAuctions([])
                }
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        };

        fetchData()
    }, [])

    const labels: { [index: string]: string } = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
      };
      
      function getLabelText(value: number) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
      }


      const [value, setValue] = React.useState<number | null>(2);
      const [hover, setHover] = React.useState(-1);
      
      
    const [soldAuctions, setSoldAuctions] = useState<ItemSummary[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await seller_product_sold_service(seller_id);
                if (Array.isArray(data)) {
                    setSoldAuctions(data);
                } else {
                    setSoldAuctions([])
                }
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        };

        fetchData()
    }, [])

    //  const soldAuctions = [
    //     {
    //         "image_path": "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
    //         "time": "Jan 1, 8:00 AM GMT+7",
    //         "title": "CHINESE CRACKLE GLAZE WINE CUP WITH ORIGINAL RECEIPT ON STAND,",
    //         "price": 1000,
    //         "user_sell": "testtt",
    //         id: 1000,

    //     },
    //     {
    //         "image_path": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L366072565.JPG",
    //         "time": "Jan 1, 8:00 AM GMT+7",
    //         "title": "John Nieto, Corn Dancers, ca. 1989",
    //         "price": 1000,
    //         "user_sell": "testtt",
    //         id: 1100,

    //     },
    //     {
    //         "image_path": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L365897550.JPG",
    //         "time": "Jan 1, 8:00 AM GMT+7",
    //         "title": "Luis Jimenez, American Dream, 1972",
    //         "price": 4000,
    //         "user_sell": "testtt",
    //         id: 1200,
    //     }
    // ]



    const [pastAuctions, setPastAuctions] = useState<{
        date: string,
        title: string,
        location: string,
    }[] | undefined>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await seller_auction_past_service(seller_id);
                if (Array.isArray(data)) {
                    setPastAuctions(data);
                } else {
                    setPastAuctions([])
                }
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        };

        fetchData()
    }, [])

    // auctionHouse = auctionHouse;
    // const YOUR_API_KEY = 'AIzaSyCcTwD5Ct7hXkxHRrs8kcyaw1lvAedFEGs';


    return (
        <>
            <AppHeader />
            <AppNav />
<<<<<<< HEAD:frontend/src/app/auction-house/page.tsx
            {/* <AppBreadCrumb /> */}
=======
>>>>>>> ee04a0c8cbc6b743d68652e26baec859527fc0e0:frontend/src/app/auction-house/[id]/page.tsx
            <Container>
                <div>
                    {auctionHouse && (
                        <div className={` ${styles.ahInformation} ${styles.colMd8}`}>
                            <div className={styles.ahBioContainer}>
                                <h1 className={styles.ahName}>
                                    {auctionHouse && auctionHouse.auctionHouse_name}
                                </h1>
                                <p className={styles.ahTime}>
                                    Invalua Seller since {auctionHouse && auctionHouse.auctionHouse_createdTime}
                                </p>
                                <div className={styles.voteContainer}>
                                    <div className={styles.yotpoStars}>
                                        <span className={`${styles.yellowIcon} fas fa-star`}></span>
                                        <span className={`${styles.yellowIcon} fas fa-star`}></span>
                                        <span className={`${styles.yellowIcon} fas fa-star`}></span>
                                        <span className={`${styles.yellowIcon} fas fa-star`}></span>
                                        <span className={`${styles.yellowIcon} fas fa-star`}></span>
                                        <span className={styles.spanReview}>{auctionHouse && auctionHouse.auctionHouse_vote}</span>
                                        <span className={styles.spanReview}>from {review && review.length} Reviews</span>
                                    </div>
                                </div>

                            </div>
                            <div className={styles.ahContactContainer}>
                                <div className={styles.locationMap}>
                                    <Map location={auctionHouse && auctionHouse.auctionHouse_location}></Map>

                                </div>
                                <div className={styles.button}>
                                    <button type="button" className={`btn btn-primary btn-lg btn-block ${styles['btn-follow']} ${styles['button-style']}`}>+ Follow This Seller</button>
                                    <button type="button" className={`btn btn-primary btn-lg btn-block ${styles['btn-contact']} ${styles['button-style']}`}>Contact</button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div>
                        <Container>
                            <div className={styles.tabs}>
                                <Tab
                                    id="upcoming"
                                    title="Upcoming Auctions"
                                    active={activeTab === 'upcoming'}
                                    onClick={() => handleTabClick('upcoming')}
                                />
                                <Tab
                                    id="review"
                                    title="Buyer Reviews"
                                    active={activeTab === 'review'}
                                    onClick={() => handleTabClick('review')}
                                />
                                <Tab
                                    id="past_ac"
                                    title="Past Auctions"
                                    active={activeTab === 'past_ac'}
                                    onClick={() => handleTabClick('past_ac')}
                                />
                            </div>
                        </Container>

                        <div>
                            <TabContent id="upcoming" active={activeTab === 'upcoming'} ref={tabContentRefs.upcoming}>
                                {/* Nội dung của tab upcoming */}
                                <div className={styles2.header_section}>Upcoming Auctions from {auctionHouse && auctionHouse.auctionHouse_name} ({upcomingAuctions?.length})</div>
                                <div className='py-3'>
                                    <Container>
                                        {upcomingAuctions && Array.isArray(upcomingAuctions) && upcomingAuctions.length > 0 ? (
                                            upcomingAuctions.map((obj, index) => (
                                                <div className="row" key={index}>
                                                    <UpcomingAuctions obj={obj} />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="row">
                                                <div className="col">
                                                    No upcoming auctions found.
                                                </div>
                                            </div>
                                        )}
                                    </Container>
                                </div>
                            </TabContent>

                            <TabContent id="review" active={activeTab === 'review'} ref={tabContentRefs.review}>
                                {/* Nội dung của tab review */}
                                <div className={styles2.header_section}>Reviews ({review && review?.length})</div>

                                {/* give review */}
                                <div>
                                    <div>
                                        Give a review
                                    </div>
                                    <div className='d-flex'>
                                        <Rating
                                            name="hover-feedback"
                                            value={value}
                                            precision={0.5}
                                            getLabelText={getLabelText}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                            onChangeActive={(event, newHover) => {
                                                setHover(newHover);
                                            }}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        {value !== null && (
                                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                        )}
                                    </div>
                                    <div>
                                        <input type="text" className="form-control" placeholder="Write a review" />
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-primary">Submit</button>
                                        </div>
                                </div>
                                <div className='py-3'>
                                    <Container>
                                        {review && review.length > 0 && review.map((obj, index) => {
                                            return (
                                                <div className="row" key={index}>
                                                    <Comment user={obj.user} vote={obj.vote} comment={obj.comment} dateString={obj.time_create}></Comment>
                                                </div>
                                            );
                                        })}

                                    </Container>
                                </div>

                            </TabContent>

                            <TabContent id="sold" active={activeTab === 'sold'} ref={tabContentRefs.sold}>
                                {/* Nội dung của tab sold */}
                                <div className={styles2.header_section}>Notable Past Lots Sold at Auction</div>
                                <div className='py-3'>
                                    <Container>
                                        <div className="row">
                                            {soldAuctions && soldAuctions.map((obj, index) => (
                                                <div className="col-sm-3" key={index}>
                                                    <SoldItem obj={obj} />
                                                </div>
                                                // <>{obj.id}</>
                                            ))}
                                        </div>
                                    </Container>
                                </div>

                            </TabContent>

                            <TabContent id="past_ac" active={activeTab === 'past_ac'} ref={tabContentRefs.past_ac}>
                                {/* Nội dung của tab past_ac */}
                                <div className={styles2.header_section}>Past Auctions from {auctionHouse && auctionHouse.auctionHouse_name}</div>
                                <div >
                                    <Container>
                                        <div>
                                            {pastAuctions && pastAuctions.map((obj, index) => {
                                                return (
                                                    <PassAuction dateString={obj.date} title={obj.title} location={obj.location}></PassAuction>
                                                );
                                            })}
                                        </div>
                                    </Container>
                                </div>
                            </TabContent>
                        </div>

                        <style jsx>{`
                        .tabs {
                        margin-bottom: 20px;
                        }
                        .tabcontent {
                        display: none;
                        }
                        .active {
                        display: block;
                        }
                    `}</style>
                    </div>

                </div>
            </Container>


            <AppFooter />
        </>
    );
}

export default AuctionHouse;