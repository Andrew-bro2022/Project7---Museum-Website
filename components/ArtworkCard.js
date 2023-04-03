import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function ArtworkCard(props){
    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);

    //if an "error" occurs
    if(error){
        return (
            <>
                <Error statusCode={404} />
            </>
        );
    }

    if(data){
        return(
            <>
                <br />
                <Card>
                    <Card.Img variant="top" src={data.primaryImageSmall ? data?.primaryImageSmall : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} />
                    
                    <Card.Body>
                        <Card.Title>
                            {data?.title ? data.title : "N/A"}
                        </Card.Title>

                        <Card.Text>
                            <strong>Date: </strong>{data?.objectDate ? data?.objectDate : "N/A"}
                            <strong>Classification: </strong>{data?.classification ? data?.classification : "N/A"}
                            <strong>Medium: </strong>{data?.medium ? data?.medium : "N/A"}
                        </Card.Text>

                        <Link href={`/artwork/${props.objectID}`} passHref>
                            {/* <Button variant="primary"> */}
                            <Button variant="outline-dark">
                                <strong>ID: </strong>{data.objectID}
                                {/* <strong>ID: {data.objectID}</strong> */}
                            </Button>
                        </Link>
                        
                    </Card.Body>

                </Card>
            </>
        )
    }

     //if null or undefined data
    if(data == null || data == undefined){
        return null
    }
}