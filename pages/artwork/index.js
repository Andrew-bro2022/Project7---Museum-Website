import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import { Row } from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import { Card } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
// import validObjectIDList  from '../../public/data/validObjectIDList.json'
import validObjectIDList  from '@/public/data/validObjectIDList.json'


//number of artwork per page
const PER_PAGE = 12

export default function Artwork(){
    const [artworkList, setArtworkList] = useState();
    const [page, setPage] = useState(1); 

    //Use the "useRouter" hook to get the full value of the query string
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    //SWR request
    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

    //decrease page
    function previousPage(){
        if(page > 1){
            setPage(prev => prev -1);
        }
    }

    //increase page
    function nextPage(){
        if (page < artworkList.length){
            setPage(prev => prev + 1);
        } 
    }

    useEffect(()=>{
        if(data){
            //ass5 add filter
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));

            let results = [];
            
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
                }

            setArtworkList(results);      
        }
        setPage(1);
    }, [data]);

    if(error){
        return (
            <>
                <Error statusCode={404} />
            </>
        )
    }

    //not null / undefined
    if(artworkList){
        return (
            <>
                <Row className="gy-4">
                    {/* artworkList.length > 0  */}
                    {artworkList.length > 0 ? artworkList[page - 1].map((item)=>{
                        return (
                            // every element in the artworkList for the current page
                            <Col lg={3} key={item}><ArtworkCard objectID={item} /></Col>
                        )
                    })
                    :
                    //artworkList.length == 0
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            {/* <h4></h4> */}
                            <Card.Title>Nothing Here</Card.Title>
                            <Card.Text>
                            Try searching for something else
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    } 
                </Row>

                {/* check again artworkList.length > 0 */}
                {
                    artworkList.length > 0 &&
                    <Row>
                        <Col>
                            <Pagination>
                                <Pagination.Prev onClick={previousPage}/>
                                <Pagination.Item>{page}</Pagination.Item>
                                <Pagination.Next onClick={nextPage}/>
                            </Pagination>
                        </Col>
                    </Row>
                }

            </>
        )
    }

    {/* If the 'artworkList' state value is null / undefined, simply render null */}
    if (!artworkList && null) {
        return null
    }
}