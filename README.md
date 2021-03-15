# College TimeTable
### Desktop View
![https://i.postimg.cc/mg5LD1LJ/image.png](https://i.postimg.cc/mg5LD1LJ/image.png)
### Stack: MERN
* MongoDB
* Express
* React
* Node.js

### Installation
* Clone this repo
* ```npm i``` to install all backend dep
* ```cd frontend```
* ```npm i``` to install all frontend dep  
* ```cd ..``` 
* ```npm dev``` to start dev server

### Functionality Overview
#### Backend
Parse college site and search for pdf. Load pdf and parse it to Object, then load object to MongoDB.
Routes:
* get all Groups ```/groups/```
* get all Lessons ```/lessons/```
* get lessons for Group ```/lessons/:id```
#### Frontend
* View all lectures in a timetable (with a material ui).
* Change selected Date, view current a lecture and day.
* Change group.



