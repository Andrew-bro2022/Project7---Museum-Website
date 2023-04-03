import ArtworkCardDetail from "@/components/ArtworkCardDetail";
import { Row } from "react-bootstrap";
import {Col} from "react-bootstrap";
import { useRouter } from "next/router";

export default function ArtworkID(){
    const router = useRouter();
    const id = router.query.objectID;

    return (
        <>
        {
        <Row>
            <Col>
                <ArtworkCardDetail objectID={id} />
            </Col>
        </Row>
        }
        </>
    )
    

}