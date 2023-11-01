/*********************************************************************************************** 
 * 
 *  Author: Yuchi Zheng
 *  Date: April 2, 2023 
 *  Vercel App (Deployed) Link: https://museum-my-app.vercel.app/
 * 
 *  Introduction: - This website was designed with a modern, responsive user interface for searching 
 *                  and viewing data on the publicly available Metropolitan Museum of Art Collection API. 
 *                - The knowledge of React, Next.js and React Bootstrap was used to develop the solution.
 *                - Registered users will also have the benefit of having their favourites and history lists saved, 
 *                  so that they can return to them later and on a different device.
 *  
 **********************************************************************************************/

import { Image } from "react-bootstrap"
import {Col, Row} from "react-bootstrap"

export default function Home() {
  return (
    <>
      <br />
      <Image
        alt=""
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        fluid rounded>
      </Image>
      <br />

      <Row>
        <Col md={6}>
          <br />
          <p>
            The Metropolitan Museum of Art in New York City, colloquially &quot;the Met&quot;, is the largest art museum 
            in the Americas and the most-visited museum in the United States. Its permanent collection contains over 
            two million works, divided among 17 curatorial departments. The main building at 1000 Fifth Avenue, 
            along the Museum Mile on the eastern edge of Central Park on Manhattan&apos;s Upper East Side, is by area one 
            of the world&apos;s largest art museums. A much smaller second location, The Cloisters at Fort Tryon Park in Upper 
            Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.
          </p>

          <p>
            The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American 
            people. The museum&apos;s permanent collection consists of works of art from classical antiquity and ancient Egypt, 
            paintings, and sculptures from nearly all the European masters, and an extensive collection of American and modern 
            art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is 
            home to encyclopedic collections of musical instruments, costumes, and accessories, as well as antique weapons and 
            armor from around the world. Several notable interiors, ranging from 1st-century Rome through modern American design, 
            are installed in its galleries.
          </p>
        </Col>
        
        <Col md={6}>
          <br />
          <p>
            The Fifth Avenue building opened on March 30, 1880. In 2021, despite the COVID-19 pandemic in New York City, the museum 
            attracted 1,958,000 visitors, ranking fourth on the list of most-visited art museums in the world.
          </p>

          <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">
            https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art
          </a>
        </Col>
      
      </Row>
    </>
  )
}
