import "./App.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {createMuiTheme} from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Timetable from "./Components/Timetable/Timetable";
import DateRow from "./Components/Date/Date";
import SelectGroup from "./Components/SelectGroup/SelectGroup";
import dayjs from "dayjs";
import dayOfYear   from 'dayjs/plugin/dayOfYear';
import isToday  from 'dayjs/plugin/isToday';
import "dayjs/locale/ru";
dayjs.extend(dayOfYear)
dayjs.extend(isToday)
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e1bee7",
    },
    secondary: {
      main: "#ba68c8",
    },
    textSecondary: {
      main: "#D3D3D3",
    },
      initial: {
        main: "#111111",
      }
  },
});
const useStateWithLocalStorage = localStorageKey => {
    const [value, setValue] = React.useState(
        localStorage.getItem(localStorageKey) || 0
    );

    React.useEffect(() => {
        localStorage.setItem(localStorageKey, value);
    }, [value]);

    return [value, setValue];
};
function App() {
  const [lessons, setLessons] = useState();
  const [date, setDate] = useState(new Date());
  const [allGroups,setAllGroups] = useState();
  const [selectedGroup,setSelectedGroup] = useStateWithLocalStorage('group');

  let dayjsDay = dayjs(date).locale("ru");
    useEffect(() => {
        const getGroups = async() => {
            const {data} = await axios.get(`https://localhost:5000/api/groups`)
            return data.map((item) => {
                return item.group;
            });
        }
        getGroups().then((response) => {
            setAllGroups(response);
        })
    }, []);

  useEffect(() => {
      const getLessons = async (groupInput) => {
          const { data } = await axios.get(`https://localhost:5000/api/lessons/${groupInput}`);
          return data;
      };
      if(allGroups) {
          console.log(allGroups[selectedGroup])
          const group = allGroups[selectedGroup];
          getLessons(group).then((response) => {
              setLessons(response);
          });
      }
  }, [allGroups,selectedGroup]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="wrapper">
          <header>
            <div className="logo">Just Logo</div>
            <div className="date">{dayjs().locale("ru").format("dd, MMMM D")}</div>
          </header>
          <div className="content">
            <div className="content__header">
              <DateRow date={dayjsDay} setGlobalDate={setDate}/>
                {allGroups && <SelectGroup allGroups={allGroups} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}/>}
            </div>
            <div className="lessons">
              {lessons && <Timetable lessons={lessons} date={date} />}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
