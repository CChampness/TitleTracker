import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { SAVE_PROFILE } from '../utils/mutations';
import Auth from '../utils/auth';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

const SaveProfile = () => {
  // create state for holding our input field data
  const [profileInput, setProfileInput] = useState('');

  // create state to hold saved bookId values
  const [savedProfile, setSavedProfile] = useState('');
  const [saveProfile] = useMutation(SAVE_PROFILE);

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  // useEffect(() => {
  //   return () => saveProfile(profileData);
  // });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!profileInput) {
      return false;
    }

    try {
      const profileData = {
        mainInterest: profileInput
      };
    console.log("profileData: ",profileData)
    await saveProfile(profileData);

      setProfileInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving the profile to the database
  const handleSaveProfile = async () => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
console.log("profileInput: ", profileInput)
    try {
      const {result} = await saveProfile({
        variables: { profileData: { ...profileInput } },
      });

      // if book successfully saves to user's account, save book id to state
      // setSavedProfile([...savedProfile, profileInput]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Get profile input!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='profileInput'
                  value={profileInput}
                  onChange={(e) => setProfileInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Profile input'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Profile
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron> */}

      <Container>
        <h2>Save profile</h2>
        <CardColumns>
              <Card key={profileInput} border='dark'>
                <Card.Body>
                  <Card.Text>{profileInput}</Card.Text>
                  <Form.Control
                  name='profileInput'
                  value={profileInput}
                  onChange={(e) => setProfileInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Profile input'
                />
                  {Auth.loggedIn() && (
                    <Button
                      className='btn-block btn-info'
                      onClick={() => handleSaveProfile(profileInput)}>
                        Save profile!
                    </Button>
                  )}
                </Card.Body>
              </Card>
        </CardColumns>
      </Container>
    </>
  );
};

export default SaveProfile;
