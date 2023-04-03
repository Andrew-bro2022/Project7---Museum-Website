import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { Button, Card, ListGroup } from "react-bootstrap";
import { removeFromHistory } from "@/lib/userData";

import styles from '@/styles/History.module.css';

export default function History(){
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    //ass6
    if(!searchHistory){
        return null;
    } 

    let parsedHistory = [];
    //generate a list of "parsed" search queries
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    //navigate
    function historyClicked(e, index){
        e.preventDefault()
        router.push(`/artwork?${searchHistory[index]}`);
    }

    //remove an element //ass6
    async function removeHistoryClicked(e, index){
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(await removeFromHistory(searchHistory[index]));    
    }
    //empty history
    if(parsedHistory.length == 0){
        return(
            <Card>
                <Card.Body>
                    <Card.Title>Nothing Here</Card.Title>
                    <Card.Text>
                        Try searching for some artwork.
                    </Card.Text>
                </Card.Body>
        </Card>
        )
    }
    //not empty
    else if(parsedHistory.length >0){
        return(
            <ListGroup>
                {/* week4 example */}
                {parsedHistory.map((historyItem, index)=>(
                    <ListGroup.Item key={index} onClick={(e)=>historyClicked(e,index)} className={styles.historyListItem}>
                        {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}

                        <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>
                            &times;
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )
    }
}