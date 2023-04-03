import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import ArtworkCard from "@/components/ArtworkCard";
import {Row, Col, Card} from "react-bootstrap"

export default function Favourite(){
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    if(!favouritesList){
        return null;
    }

    if(favouritesList){
        return(
            <Row className="gy-4">
                {   //like index in pages
                    favouritesList.length > 0?
                     favouritesList.map(item =>{
                        return (
                            <Col lg={3} key={item}><ArtworkCard objectID={item} /></Col>
                        )
                     })
                    :
                    <Card>
                        <Card.Body>
                            {/* <h4>Nothing Here</h4> */}
                            <Card.Title>Nothing Here</Card.Title>
                            <Card.Text>
                            Try adding some new artwork to the list.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                }
            </Row>
        )
    }
}