import React, { useState } from 'react';
import WishlistItem from './WishlistItem';
import { getPlantsForUser, getUserById, getWishlistPlants } from '../helpers/selectors';
import { Button, Card, Container, Grid, Icon, Message, Segment } from 'semantic-ui-react';
import AddWishlistPlant from './Wishlist/AddWishlistPlant';
import { Link } from 'react-router-dom';

export default function Wishlist({ users, userId, wishlist, user_plants, species, setAppState }) {
  const user = getUserById(users, userId);
  const plants = wishlist && getWishlistPlants(wishlist, userId);
  const plantsForUser = user_plants && getPlantsForUser(user_plants, user && user.id);

  const [isVisible, setIsVisible] = useState(false);
  const [plantSpecies, setPlantSpecies] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmit = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3500);
  };

  const setSpecies = (species_id) => {
    setPlantSpecies(species_id);
  };

  const parsedPlants =
    plants &&
    plants.map((plant) => (
      <WishlistItem
        key={plant.id}
        id={plant.id}
        scientificName={plant.scientific_name}
        commonName={plant.common_name}
        photo={plant.photo}
        light_level={plant.light_level}
        soil_type={plant.soil_type}
        difficulty={plant.difficulty_level}
        toxic={plant.toxic}
        watering_interval={plant.watering_interval}
        category={plant.category}
        users={users}
        plant_user_id={plant.user_id}
        species_id={plant.species_id}
        setIsVisible={setIsVisible}
        setSpecies={setSpecies}
      />
    ));

  if (!user) {
    return <></>;
  } else {
    return (
      <Container className="wishlist" style={{ height: 1300 }}>
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width={12}>
              <Segment className="profile">
                <p className="wishlist-title">My Wishlist Plants</p>
              </Segment>

              {success && (
                <>
                  <br></br>
                  <Message color="green" id="animated-example" className={success && 'fadeOut'}>
                    <Message.Header>
                      <Icon name="leaf" />
                      Congrats! Your new plant has been added successfully.
                    </Message.Header>
                    <p>
                      <Link to="/dashboard">
                        View <b>Dashboard</b> now.
                      </Link>
                    </p>
                  </Message>
                  <br></br>
                </>
              )}

              {isVisible && (
                <>
                  <br></br>
                  <AddWishlistPlant
                    user={user}
                    species={species}
                    setIsVisible={setIsVisible}
                    plantSpecies={plantSpecies}
                    onSubmit={onSubmit}
                    setAppState={setAppState}
                  />
                  <br></br>
                </>
              )}

              <Segment
                style={{
                  overflow: 'auto',
                  maxWidth: 2000,
                  backgroundColor: 'rgba(225, 205, 48, 0.25)',
                  backgroundImage: 'url(https://www.transparenttextures.com/patterns/asfalt-light.png)',
                }}
              >
                <Card.Group itemsPerRow={3}>{parsedPlants}</Card.Group>
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <div className="avatar">
                <div
                  className="ui card avatar"
                  style={{
                    overflow: 'auto',
                    maxWidth: 2000,
                    backgroundColor: 'rgba(225, 205, 48, 0.65)',
                    backgroundImage: 'url(https://www.transparenttextures.com/patterns/asfalt-light.png)',
                  }}
                >
                  <div className="image">
                    <img src={user && user.avatar} alt="avatar" />
                  </div>
                  <div className="content">
                    <a className="header">{user && user.name}</a>
                    <div className="date">
                      <span className="date-bulb">Joined in {user && user.created_at.split('-')[0]}</span>
                    </div>
                    <div className="description">
                      <p className="description-bulby">{user && user.name} is an art director living in New York.</p>
                      <Segment color="olive" style={{ backgroundColor: 'rgba(235, 235, 232, 0.5)', marginTop: '12px' }}>
                        <h5>"{user && user.quote}"</h5>
                      </Segment>
                    </div>
                  </div>
                  <div className="extra content">
                    <Link to={`/profile/${user.id}`}>
                      <Button inverted color="grey">
                        <i className="leaf icon"></i>
                        {plantsForUser && plantsForUser.length} Plants
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
