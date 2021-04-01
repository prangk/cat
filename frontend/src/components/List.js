import React from 'react';
import { Container,Card,CardDeck} from "react-bootstrap";


const ImageCat = (props) =>{
    return(
        <img width="300px" src={props.path} alt={props.name} />
    )
   
}


const List = () =>{
    return(
    <Container>
        <CardDeck>
        <Card>
            <ImageCat path="image/black_bombay_cat.jpg" name="black_bombay" />
            <Card.Body>
            <Card.Title>Black Bombay</Card.Title>
            </Card.Body>
        </Card>
        <Card>
            <ImageCat path="image/burmese_cat.jpg" name="burmese" />
            <Card.Body>
            <Card.Title>Burmese</Card.Title>
            </Card.Body>
        </Card>
        <Card>
            <ImageCat path="image/khao_manee_cat.jpg" name="khao_manee" />
            <Card.Body>
            <Card.Title>Khao Manee</Card.Title>
            </Card.Body>
        </Card>
        </CardDeck>
        <br></br>
        <CardDeck>
        <Card>
            <ImageCat path="image/korat_cat.jpg" name="korat_cat" />
            <Card.Body>
            <Card.Title>Korat</Card.Title>
            </Card.Body>
        </Card>
        <Card>
            <ImageCat path="image/siamese_cat.jpg" name="siamese" />       
            <Card.Body>
            <Card.Title>Siamese</Card.Title>
            </Card.Body>
        </Card>
        </CardDeck>
    </Container>
    );
};

export default List;
