const fs = require("fs");
const pdf = require("pdf-parse");
const dayjs = require("dayjs");
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const getLessonsFromNormalized = (normalizedString,VacationString) => {
  const lessons = normalizedString
    .split(/[а-яА-Я]+\s[А-Я].[А-Я].|ауд.|\d{3}/)
    .filter(
      (item) => item !== "" && item !== " " && item !== "  " && item !== "."
    );
  let resultLessons = [];
  lessons.forEach((item) => {
    const searchForVacation = (str) => {
      if (str.indexOf(VacationString) !== -1) {
        resultLessons.push(VacationString);
        let nextLine = str.replace(VacationString, "");

        searchForVacation(nextLine);
      } else {
        resultLessons.push(str);
      }
    };
    searchForVacation(item);
  });
  resultLessons = resultLessons
    .filter((item) => {
      return !item.match(/^(\s)+$/) && !item.match(/^,$/);
    })
    .map((item) => {
      return item.trim();
    });
  return resultLessons;
};
const getTeachersFromNormalized = (normalizedString) => {
  let results = [];
  let matches = normalizedString.matchAll(/([а-яА-Я]+\s[А-Я].[А-Я].\s)+/g);
    if (!matches) return null;
  for (const match of matches) results.push(match[0]);
  return results;
};
const getPlaceFromNormalized = (teachers, normalizedString) => {
  let results = [];
  let matches = normalizedString.match(
    /([а-яА-Я]+\s[А-Я].[А-Я].\s)+(ауд.\d{3}(,\d{3})?)/g
  );
  if (!matches) return null;
  for (const match of matches) {
    if (typeof match !== "undefined") {
      results.push({
        id: teachers.findIndex((item) => {
          return match.indexOf(item) !== -1;
        }),
        place: match.match(/(ауд.\d{3}(,\d{3})?)/)[0].trim(),
      });
    }
  }
  return results;
};
const NormalizeGroupsPdf = async (dataBuffer) => {

    let totalResult;
    await pdf(dataBuffer).then(function (data) {
        const VacationString = "-------";
        let result = data.text;
        let res = result.split("РАСПИСАНИЕ ГРУППЫ").map((item) => {
            return item.replace(
                "Пара Время Понедельник Вторник Среда Четверг Пятница Суббота",
                ""
            );
        });
        let counter = 0;
        res.forEach((item, index) => {
            const groupNumber = item.trim().split("\n")[0].split(" ")[0];
            if (groupNumber === "з") return true;
            // test
            if (index === 0) return 1;

            // DATE

            const dateMatch = item.match(/\d{1,2}\/\d{1,2}\/\d{1,2}/);

            const date = dayjs(dateMatch[0],"D/MM/YY");

            //
            const normalized = res[index]
                .split("\n")
                .filter((item, index) => {
                    if (
                        item !== " " &&
                        !item.trim().match(/\b\d\d:\d\d\b/) &&
                        index !== 0 &&
                        item !== ""
                    )
                        return 1;
                    return 0;
                })
                .join("")
                .split(/\b\d\b(?<!ДОП \d|лр \d)/)
                .filter((item, index) => index !== 0);
            let resultsForGroup = [];
            for (let i = 0; i < normalized.length; i++) {
                const normalizedTeachers = getTeachersFromNormalized(normalized[i]);
                const normalizedLessons = getLessonsFromNormalized(normalized[i],VacationString);
                const normalizedPlace = getPlaceFromNormalized(
                    normalizedTeachers,
                    normalized[i]
                );

                for (let j = 0; j < normalizedLessons.length; j++) {
                    let place =
                        normalizedPlace &&
                        normalizedPlace.find((item) => {
                            if (item.id === j) {
                                return true;
                            }
                        });
                    if (normalizedLessons[j] === VacationString) continue;
                    resultsForGroup.push({
                        group:groupNumber.replace("/","-"),
                        name: normalizedLessons[j],
                        teacher: normalizedTeachers[j],
                        place: place ? place.place : null,
                        date: date.add(j, "d").toISOString(),
                        time: i,
                    });
                }
            }

          if (counter === 0) {
            totalResult = [...resultsForGroup];
          } else {
            totalResult = [...totalResult, ...resultsForGroup];
          }
          counter++;
        });

    });
  let uniqueGroups;
  uniqueGroups = totalResult.filter(
    (v, i, a) => a.findIndex(t => (t.group === v.group)) === i)
    .map((item) => {
      return {group: item.group};
    });
  return {
    lessons: totalResult,
    groups: uniqueGroups,
  };
}
let dataBuffer = fs.readFileSync('./backend/data/raw/data.pdf');
NormalizeGroupsPdf(dataBuffer)
  .then((resp) => console.log(resp));
module.exports = () => (NormalizeGroupsPdf(dataBuffer));
