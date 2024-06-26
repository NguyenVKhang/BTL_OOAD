import React from 'react';
import User from '@/models/user';
import styles from '@/styles/customer/auctionHouse.module.css';
import styles2 from '@/styles/auction_house/comment.module.css';
import { Container } from 'react-bootstrap';

interface CommentProps {
  id?: string;
  user: User;
  vote: number;
  comment: string;
  dateString: string;
}

const Comment: React.FC<CommentProps> = ({ user, vote, comment, dateString }) => {
  // Hàm làm tròn số vote
  const roundedVote = Math.round(vote);

  const date = new Date(dateString);

  // Ngôi sao vote
  const starsYellow = Array.from({ length: roundedVote }, (_, index) => (
    <span key={index} className={`${styles.yellowIcon} fas fa-star`}></span>
  ));
  const starsGray = Array.from({ length: 5 - roundedVote }, (_, index) => (
    <span key={index + roundedVote} className={`${styles.grayIcon} fas fa-star`}></span>
  ));

  // Format thời gian
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const time = `${day}/${month}/${year}`;

  console.log("abcdef adsda", user)

  return (
    <>
      <Container>
        <div className={styles2.review}>
          <div className={styles2.header}>
            <div className={styles2.user}>
              <div className={styles2.avatar}>
                <img src={user.avatar_path} alt="Avatar image" />
              </div>
              <div className={styles2.title}>
                <div className={styles2.name}>{user.first_name} {user.last_name}</div>
                <div className={styles2.vote}>
                  <div className={styles2.star}>
                    {starsYellow}{starsGray}
                    <span>{vote}/5</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles2.time}>
              {time}
            </div>
          </div>
          <div className={styles2.main}>
            <div className={styles2.comment}>
              {comment}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Comment;
