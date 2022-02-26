# beleaf 

## Welcome to our final project, beleaf! 🪴

✨ Beleaf is a **houseplant tracking app** created by [Josue Arevalo](https://github.com/josuevalo), [Julia Gatina](https://github.com/julia-gatina), and [Lucy Shen](https://github.com/lucyshen7) as a final project for **Lighthouse Labs Web Development Bootcamp**.  

✨ Beleaf lets users track and show off their plant collection, get watering reminders and care tips, share knowledge with other users & much more.

**Tech Stack: PostgreSQL, Docker, Express (back-end), Node, React (front-end), Semantic UI.**


## Features

### Watering Reminders

!["Gif of watering"](/docs/watering.gif)

### Drag & Drop

!["Gif of DnD"](/docs/dnd_view_plant.gif)

### Newsfeed

!["Gif of newsfeed"](/docs/likes_comments.gif)

### Wishlist

!["Screenshot of wishlist"](/docs/wishlist.png)



## Running the projects

You need **TWO** terminal windows/tabs for this (or some other plan for running two Node processes).

In one terminal, `cd` into `react-front-end`. Run `npm install` or `yarn` to install the dependencies. Then run `npm start` or `yarn start`, and go to `localhost:3000` in your browser.

In the other terminal, `cd` into `express-back-end`. Run `npm install` or `yarn` to install the dependencies, then `npm start` or `yarn start` to launch the server.


## Create DB for local env.
CREATE USER beleaf WITH PASSWORD 'beleaf';
CREATE DATABASE beleaf;
GRANT ALL PRIVILEGES ON DATABASE beleaf to beleaf;