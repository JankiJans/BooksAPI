import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSeats, loadSeatsRequest, loadSeats } from '../../../redux/seatsRedux';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import './Concert.scss';

const Concert = ({ performer, price, genre, day, image, chosenDay }) => {
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.PORT || 'http://localhost:8000/');
    dispatch(loadSeatsRequest());
    newSocket.on('seatsUpdated', (updatedSeats) => dispatch(loadSeats(updatedSeats)));
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [dispatch]);

  const takenSeatsCount = seats.filter((item) => item.day === chosenDay).length;
  const totalSeats = 50 - takenSeatsCount;

  return (
    <article className="concert">
      <Row noGutters>
        <Col xs="6">
          <div className="concert__image-container">
            <img className="concert__image-container__img" src={image} alt={performer} />
          </div>
        </Col>
        <Col xs="6">
          <div className="concert__info">
            <img className="concert__info__back" src={image} alt={performer} />
            <h2 className="concert__info__performer">{performer}</h2>
            <h3 className="concert__info__genre">{genre}</h3>
            <p className="concert__info__tickets">Only {totalSeats} tickets left!</p>
            <p className="concert__info__day-n-price">
              Day: {day}, Price: {price}$
            </p>
          </div>
        </Col>
      </Row>
    </article>
  );
};

export default Concert;
