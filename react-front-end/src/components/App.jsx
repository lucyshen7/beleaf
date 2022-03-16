import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import '../styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import NotFound from './NotFound';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Plant from './Plant';
import Cookies from 'universal-cookie';
import Newsfeed from './Newsfeed';
import Wishlist from './Wishlist';

const cookies = new Cookies();

export default function App() {

  const [state, setState] = useState({
    plants: [],
    users: [{ name: '' }],
    species: [{ name: '' }],
    posts: [],
    comments: [],
    reminders: [],
    wishlist: '',
    user: cookies.get('user_id'),
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/plants'),
      axios.get('/api/users'),
      axios.get('/api/species'),
      axios.get('/api/posts'),
      axios.get('/api/comments'),
      axios.get('/api/wishlist'),
      axios.get('/api/reminders'),
    ])
      .then(([plants, users, species, posts, comments, wishlist, reminders]) => {
        setState(prev => ({
          ...prev,
          plants: plants.data.plants,
          users: users.data.users,
          species: species.data.species,
          posts: posts.data.posts,
          comments: comments.data.comments,
          wishlist: wishlist.data.wishlist,
          reminders: reminders.data,
        }));
      });
  }, []);

  const login = () => {
    cookies.set('user_id', 2, { path: '/' });
    setState({
      user: cookies.get('user_id'),
    });
  };

  const logout = () => {
    cookies.remove('user_id', { path: '/' });
    setState({
      user: '',
    });
  };

  const renderFilteredPosts = (topic) => {
    axios
      .post('/api/posts/filter', { data: { topic } })
      .then((response) => {
        setState((prev) => {
          return { ...prev, posts: [...response.data.posts] };
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const createNewComment = (post_id, comment_text, beleaf_id) => {
    axios
      .post('/api/comments', {
        post_id: post_id,
        user_id: beleaf_id || state.user,
        comment_text: comment_text,
      })
      .then((response) => {
        setState((prev) => {
          return { ...prev, comments: [...prev.comments, response.data[0]] };
        });
        console.log('Comment made to db!', response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const createNewPost = (user, title, description, photo, topic) => {
    axios
      .post('/api/posts', {
        user_id: user.id,
        title: title,
        description: description,
        photo: photo,
        topic: topic,
      })
      .then((response) => {
        const post_id = response.data[0].id;
        const comment_text = 'Congrats on your new post. Keep growing, we are rooting for you!';
        const beleaf_id = 4;
        createNewComment(post_id, comment_text, beleaf_id);
        setState((prev) => {
          return { ...prev, posts: [...prev.posts, response.data[0]] };
        });
        console.log('Post made to db!', response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateLocation = (id, location) => {
    axios
      .post('/api/plants', {
        id: id,
        location: location,
      })
      .then((response) => {
        setState((prev) => {
          return {
            ...prev, // create new obj from copy
            plants: prev.plants.map((plant) => {
              if (plant.id === id) {
                plant.location = location; // only updating plant location of the plant id passed in
              }
              return plant;
            }),
          };
        });
        console.log('Put made to db!', response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Router>
      <div
        className="App"
      >
        <Navbar user={state.user} login={login} logout={logout} users={state.users} />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home login={login} user={state.user} />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                plants={state.plants}
                users={state.users}
                userId={state.user}
                species={state.species}
                updateLocation={updateLocation}
                reminders={state.reminders}
                setAppState={setState}
              />
            }
          />
          <Route
            path="/newsfeed"
            element={
              <Newsfeed
                posts={state.posts}
                comments={state.comments}
                users={state.users}
                userId={state.user}
                createNewPost={createNewPost}
                renderFilteredPosts={renderFilteredPosts}
                createNewComment={createNewComment}
              />
            }
          />
          <Route
            path="/profile/:user_id"
            element={<Profile userId={state.user} plants={state.plants} users={state.users} species={state.species} />}
          />
          <Route
            path="/plants/:plant_id"
            element={<Plant plants={state.plants} users={state.users} user_id={state.user} />}
          />
          <Route path="/login/:user_id" />
          <Route path="/logout" />
          <Route
            path="/wishlist"
            element={
              <Wishlist
                users={state.users}
                userId={state.user}
                wishlist={state.wishlist}
                user_plants={state.plants}
                species={state.species}
                setAppState={setState}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}