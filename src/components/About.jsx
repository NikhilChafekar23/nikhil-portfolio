import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 'auto 0',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
    color: '#ffffff', // Ensure text color is same as the original
  },
  introImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 300, // Adjust width to match reference image
    height: 350, // Keep it square
    objectFit: 'cover', // Ensure it fills the box properly
    borderRadius: '10px', // Match existing design
    backgroundColor: '#ffffff', // Ensures a white background like reference
    padding: '10px', // Adds padding to match reference
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.about, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error('Error fetching about data:', err));
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container" style={{ backgroundColor: '#000000', padding: '40px' }}>
        <Container>
          {data ? (
            <Fade>
              <Row>
                <Col md={6} style={styles.introTextContainer}>
                  <ReactMarkdown>{data.about}</ReactMarkdown>
                </Col>
                <Col md={6} style={styles.introImageContainer}>
                  <img src={`/${data.imageSource}`} alt="profile" style={styles.profileImage} />
                </Col>
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
