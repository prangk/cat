import React from 'react';
import { Container, Row, Col} from "react-bootstrap";


const ImageCat = (props) =>{
    return(
        <Col><img width="300px" src={props.path} alt={props.name} /></Col>
    )
   
}

const List = () =>{
    return(
    <Container>
    <Row>
        <ImageCat path="image/black_bombay_cat.jpg" name="black_bombay" />
        <ImageCat path="image/burmese_cat.jpg" name="burmese" />
        <ImageCat path="image/khao_manee_cat.jpg" name="khao_manee" />
        <ImageCat path="image/korat_cat.jpg" name="korat_cat" />
        <ImageCat path="image/siamese_cat.jpg" name="siamese" />

    </Row>
    </Container>
    );
};

export default List;