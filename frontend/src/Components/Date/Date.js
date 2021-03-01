import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";

function DateRow({date,setGlobalDate}) {

    const [dates,setDates] = useState();
    useEffect(() => {
        let arr = [];
        for(let i = 0; i < 7; i++) {
            arr.push(date.add(i-3,"day"));
        }
        setDates(arr);
    }, [date]);
    const handleDateClick = (e,item) => {
        setGlobalDate(item.toDate())
    }
  return (
    <ul className="date-row">
        {dates && dates.map((item,index) => {
            return (
              <li key={index} onClick={(e) => handleDateClick(e,item)} className={item.dayOfYear() === date.dayOfYear() ? "date__selected" : ""}>

                  <Typography variant="button"  color={item.isToday() ? "secondary" : "initial"}>
                    {item.format("dd")}
                </Typography>
                <Typography variant="button" color={item.isToday() ? "secondary" : "initial"}>
                    {item.format("DD")}
                </Typography>
              </li>
            );

        })}

    </ul>
  );
}

export default DateRow;
