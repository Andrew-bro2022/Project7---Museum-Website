import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from 'react';

import { addToFavourites, removeFromFavourites} from '@/lib/userData';

export default function ArtworkCardDetail(props){
    //ass5
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(()=>{
        setShowAdded(favouritesList?.includes(props.objectID))
        //}, [favouritesList])
        }, [favouritesList, props.objectID])

    async function favouritesClicked(){
        if(showAdded == true){
            setFavouritesList(await removeFromFavourites(props.objectID));
            setShowAdded(false);
        }else{
            setFavouritesList(await addToFavourites(props.objectID));
            setShowAdded(true)
        }
    }

    const {data, error} = useSWR(props.objectID? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);

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
                {/* <Card style={{ width: '18rem' }}> */}
                <Card>
                    {data?.primaryImage && <Card.Img variant="top" src={data?.primaryImage} />}
                    
                    <Card.Body>
                        <Card.Title>
                            {data?.title ? data?.title : "N/A"}
                        </Card.Title>

                        <Card.Text>
                            <strong>Date: </strong>{data?.objectDate ? data?.objectDate : "N/A"}<br />
                            <strong>Classification: </strong>{data?.classification ? data?.classification : "N/A"}<br />
                            <strong>Medium: </strong>{data?.medium ? data?.medium : "N/A"}<br /><br />

                            <strong>Artist: </strong>{data?.artistDisplayName ? data?.artistDisplayName : "N/A"}
                                {/* check below */}
                                {data?.artistDisplayName && <span> (<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>)</span>}<br />
                            <strong>Credit Line: </strong>{data?.creditLine ? data?.creditLine : "N/A"}<br />
                            <strong>Dimensions: </strong>{data?.dimensions ? data?.dimensions : "N/A"}

                            {/* ass5 */}
                            <br />
                            <br />
                            <Button variant={showAdded? "primary": "outline-primary"} onClick={(e)=>favouritesClicked()}>
                                {showAdded? "+ Favourite (added)" : "+ Favourite"}
                            </Button>
                        </Card.Text>

                        {/* <Link href={`/artwork/${props.props.objectID}`} passHref> 
                            <Button variant="outline-dark">
                                <strong>ID: </strong>{data.props.objectID}
                                
                            </Button>
                        </Link> */}
                        
                    </Card.Body>

                </Card>
            </>
        )
    }

    if(data == null || data == undefined){
        return null
    }
}