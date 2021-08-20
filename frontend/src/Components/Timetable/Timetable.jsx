import React from 'react';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab/';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '6px 16px',
    marginLeft: '14px',
  },
  paperVacation: {
    backgroundColor: '#D3D3D3',
  },
}));

const isToday = (date, propDate) => {
  return (
    date.getDate() === propDate.getDate() &&
    date.getMonth() === propDate.getMonth() &&
    date.getFullYear() === propDate.getFullYear()
  );
};
const isLessonNow = (times, propDate) => {
  const today = new Date();
  const startDate = new Date(propDate);
  startDate.setHours(times.from.split(':')[0]);
  startDate.setMinutes(times.from.split(':')[1]);

  const endDate = new Date(propDate);
  endDate.setHours(times.to.split(':')[0]);
  endDate.setMinutes(times.to.split(':')[1]);

  return startDate < today && endDate > today;
};
const lessonsTimes = [
  {
    from: '9:00',
    to: '10:30',
  },
  {
    from: '10:45',
    to: '12:15',
  },
  {
    from: '13:05',
    to: '14:35',
  },
  {
    from: '14:50',
    to: '16:20',
  },
  {
    from: '16:30',
    to: '18:00',
  },
];
const normalizeLessons = (arr) => {
  console.log(arr);
  for (let i = 0; i < lessonsTimes.length; i++) {
    if (!arr.find((item) => item.time === i)) {
      const replaceObject = {
        type: 'spacer',
        time: i,
        _id: Math.random(),
        date: new Date().toISOString(),
      };
      arr.splice(i, 0, replaceObject);
    }
  }

  return arr;
};

/**
 * TimeTable Element. Depends On Material-ui Timetable
 * @param {Array<Object>} lessons - array of objects
 * @param {dayjs.Dayjs} date - selected date
 * @return {JSX.Element}
 * @constructor
 */
function Timetable({
  lessons,
  date,
}) {
  const classes = useStyles();
  return (
    <Timeline align="left">
      {normalizeLessons(
          lessons
              .filter((item) => {
                if (isToday(new Date(item.date), date)) return item;
              })
              .sort((a, b) => (a.time > b.time ? 1 : -1))
              .map((item) => {
                if (item.time < 0 || item.time > 4) item.time = 4;
                return item;
              }),
      )
          .map((lesson, index) => {
            if (lesson.type !== 'spacer') {
              return (
                <TimelineItem key={lesson._id}>
                  <TimelineOppositeContent style={{flex: 0.1}}>
                    <Typography variant="body2" color="textSecondary">
                      {lessonsTimes[lesson.time].from}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {lessonsTimes[lesson.time].to}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot
                      color={
                      isLessonNow(lessonsTimes[lesson.time], lesson.date) ?
                        'primary' :
                        'inherit'
                      }
                    />
                    {index !== lessons.length && <TimelineConnector/>}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper elevation={6} className={classes.paper}>
                      <Typography variant="h6" component="h1">
                        {lesson.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        component="h1"
                        color="textSecondary"
                      >
                        {lesson.teacher}
                      </Typography>
                      {lesson.place && (
                        <Typography
                          variant="body1"
                          component="h1"
                          color="textSecondary"
                          align="right"
                        >
                          {lesson.place}
                        </Typography>
                      )}
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              );
            } else {
              return (
                <TimelineItem key={lesson._id}>
                  <TimelineOppositeContent style={{flex: 0.1}}>
                    <Typography variant="body2" color="textSecondary">
                      {lessonsTimes[lesson.time].from}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {lessonsTimes[lesson.time].to}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot
                      color={
                      isLessonNow(lessonsTimes[lesson.time], lesson.date) ?
                        'primary' :
                        'inherit'
                      }
                    />
                    {index !== lessons.length && <TimelineConnector/>}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper
                      elevation={6}
                      className={classNames(classes.paper,
                          classes.paperVacation)}
                    >
                      <Typography>Нет пары🎉</Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              );
            }
          })}
    </Timeline>
  );
}

Timetable.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.shape({
    group: PropTypes.string,
    name: PropTypes.string,
    teacher: PropTypes.string,
    place: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    time: PropTypes.number,
  })),
  date: PropTypes.shape(dayjs.Dayjs),
};


export default Timetable;
