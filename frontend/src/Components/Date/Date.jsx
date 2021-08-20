import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

/**
 * Show Date Row With material-ui typography. Shows 7 days in the week
 * @param {dayjs.Dayjs} date  - current date
 * @param {React.SetStateAction} setGlobalDate  - global date for component
 * @return {JSX.Element} - react JSX component
 * @constructor
 */
function DateRow({
  date,
  setGlobalDate,
}) {
  const [dates, setDates] = useState([]);
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(date.add(i - 3, 'day'));
    }
    setDates(arr);
  }, [date]);
  const handleDateClick = (e, item) => {
    setGlobalDate(item.toDate());
  };
  return (
    <ul className="date-row">
      {dates && dates.map((item, index) => (
        <li
          key={index}
          onClick={(e) => handleDateClick(e, item)}
          className={item.dayOfYear() === date.dayOfYear() ?
            'date__selected' :
            ''}
        >

          <Typography variant="button"
            color={item.isToday() ? 'secondary' : 'initial'}>
            {item.format('dd')}
          </Typography>
          <Typography variant="button"
            color={item.isToday() ? 'secondary' : 'initial'}>
            {item.format('DD')}
          </Typography>
        </li>
      ))}

    </ul>
  );
}

DateRow.propTypes = {
  date: PropTypes.shape(dayjs.Dayjs).isRequired,
  setGlobalDate: PropTypes.func.isRequired,
};

export default DateRow;
