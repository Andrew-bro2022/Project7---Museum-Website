import {Container, Nav, Navbar} from "react-bootstrap";
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useRouter } from "next/router";
import { NavDropdown } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from '@/lib/authenticate';


export default function MainNav() {
    //see React Forms notes
    const router = useRouter();
    const [search, setFormData] = useState("");

    //ass5
    const [isExpanded, setIsExpanded] = useState(false)
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    async function handleSubmit(e){
        e.preventDefault();// prevent the browser from automatically submitting the form
        //ass5
        setIsExpanded(false);
        //below ${search} must match with the line 156
        let queryString=`title=true&q=${search}`;  
        setSearchHistory(await addToHistory(`title=true&q=${search}`));

        router.push(`/artwork?title=true&q=${search}`);
        e.target.reset();   //clear search history when click submit or -> setSearchField("");
    }

    //ass6
    let token = readToken();

    function logout() {
        setIsExpanded(false);
        removeToken();
        router.push('/login');
    }

    return (
        <>
        <Navbar className="fixed-top navbar-dark bg-primary" expand="lg" expanded={isExpanded}>
            <Container>
                <Navbar.Brand>Yuchi Zheng</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={(e)=>setIsExpanded(!isExpanded)}/>
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <Nav className="me-auto">
                        <Link href="/" legacyBehavior passHref>
                            <Nav.Link onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/"}>Home</Nav.Link>
                        </Link>

                        {/* Show the "Advanced Search" navigation item */}
                        {token && <Link href="/search" legacyBehavior passHref>
                            <Nav.Link onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/search"}>Advanced Search</Nav.Link>
                        </Link>}
                    </Nav>

                    {/* simple form example */}
                    &nbsp;
                    {/* Show the "Search" form */}
                    {token && <Form className="d-flex" onSubmit={handleSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e)=>{setFormData(e.target.value)}}
                        />
                        {/* <Button type="submit" variant="outline-dark" >Search</Button> */}
                        <Button type="submit" variant="success" >Search</Button>
                    </Form>}
                    &nbsp;

                    {/* If the user is logged in, Show the "User Name" dropdown*/}
                    {
                        token &&
                        <Nav>
                            <NavDropdown title={token.userName} id="basic-nav-dropdown">
                                <Link href="/favourites" legacyBehavior passHref>
                                    <NavDropdown.Item onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/favourites"}>
                                        Favourites
                                    </NavDropdown.Item>
                                </Link>

                                <Link href="/history" legacyBehavior passHref>
                                    <NavDropdown.Item onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/history"}>
                                        Search History
                                    </NavDropdown.Item>
                                </Link>

                                <NavDropdown.Item onClick = {logout}>Logout</NavDropdown.Item>
                                
                            </NavDropdown>
                        </Nav>
                    }

                    {/* If the user is not logged in, show register and login */}
                    {
                        !token &&
                        <Nav className="ml-auto">
                            <Link href="/register" legacyBehavior passHref>
                                <Nav.Link onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/register"}>Register</Nav.Link>
                            </Link>

                            <Link href="/login" legacyBehavior passHref>
                                <Nav.Link onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/login"}>Login</Nav.Link>
                            </Link>
                        </Nav>
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar>

        {/* ensure that the content can be seen below the fixed Navbar */}
        <br />
        <br />
        </>
    );
  }