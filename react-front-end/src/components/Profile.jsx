import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import PlantList from "./Profile/PlantList";
import { getPlantsForUser, getUserById } from "../helpers/selectors";
import "./Profile/Profile.css";
import { Container, Grid, Segment, Button, Card, Image, Message, Icon } from "semantic-ui-react";
import ViewPlant from "./Dashboard/ViewPlant";

export default function Profile({ plants, users, userId, species }) {

  const [success, setSuccess] = useState(false);

  const params = useParams();
  const user_id = Number(params.user_id);

  const user = getUserById(users, user_id);
  const plantsForUser = getPlantsForUser(plants, user_id);
  const loggedUser = getUserById(users, userId);
  const profileUser = Number(user_id);

  const [selectedPlant, setSelectedPlant] = useState(null);

  const onClick = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3500);
  };

  if (!user) {
    return <></>;
  } else {
    return (
      <Container className="app-container">
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width={12}>
              <Segment className="profile">
                {loggedUser && loggedUser.id !== profileUser ?
                  <h2>
                    Welcome {loggedUser && loggedUser.name}, thanks for visiting my profile!
                  </h2> :
                  <p className="profile-header">My Profile</p>}
              </Segment>

              {success && (
                <>
                  <br></br>
                  <Message color="green" id="animated-example" className={success && "fadeOut"}>
                    <Message.Header><Icon name="leaf" />Plant successfully added to your Wishlist!</Message.Header>
                  </Message>
                  <br></br>
                </>
              )}

              <Segment style={{ overflow: 'auto', maxWidth: 2000, backgroundColor: "rgba(225, 205, 48, 0.25)", backgroundImage: "url(https://www.transparenttextures.com/patterns/asfalt-light.png)" }} >
                <Card.Group itemsPerRow={3}>
                  <PlantList plants={plantsForUser} user={userId} onClick={onClick} setSelectedPlant={setSelectedPlant} />
                </Card.Group>
              </Segment>
            </Grid.Column>

            <Grid.Column width={4}>
              <div>
                <div className="ui card avatar" style={{ overflow: 'auto', maxWidth: 2000, backgroundColor: "rgba(225, 205, 48, 0.65)", backgroundImage: "url(https://www.transparenttextures.com/patterns/asfalt-light.png)" }} >
                  <Image src={user && user.avatar} alt="avatar" size="medium" />
                  <div className="content">
                    <a className="avatar-header">{user && user.name}</a>
                    <div className="date">
                      <span className="date-bulb" style={{ color: "white", textShadow: "2px 2px 2px #325036" }}>Joined in {user && user.created_at.split('-')[0]}</span>
                    </div>
                    <div className="description">
                      <p className="description-bulby">
                        {user && user.name} is an art director living in New York.
                      </p>
                      <Segment color="olive" style={{ backgroundColor: "rgba(255, 255, 255, 0.20)", marginTop: "12px" }}>
                        <h5>"{user && user.quote}"</h5>
                      </Segment>
                    </div>
                  </div>
                  <div className="extra content">
                    <span className="floated">
                      <Button inverted color='grey'>
                        <i className="leaf icon"></i>
                        {plantsForUser && plantsForUser.length} Plants
                      </Button>
                    </span>
                  </div>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br></br>

        <br></br>
        {selectedPlant && (<>
          <ViewPlant user={loggedUser} species={species} closeViewPlant={() => setSelectedPlant(null)} plant={selectedPlant} />
        </>)}
        <br></br>
      </Container>
    );
  }
}
