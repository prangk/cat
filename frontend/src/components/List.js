import React from 'react';
import { Container,Card,CardDeck,Modal,Button} from "react-bootstrap";


const ImageCat = (props) =>{
    return(
        <img width="300px" src={props.path} alt={props.name} />
    )
   
}
const CardCat =(props) =>{
    const [modalShow, setModalShow] = React.useState(false);
    return(
        <Card>
            <Button variant="primary" onClick={() => setModalShow(true)}>
            <ImageCat path={props.path} name={props.name} />
            </Button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />            
            <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            </Card.Body>
        </Card>
    )
}


function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }



const List = () =>{

    return(
    <Container>
        <CardDeck>
            <CardCat path="image/black_bombay_cat.jpg" name="black_bombay" title="Black Bombay"/>
            <CardCat path="image/burmese_cat.jpg" name="burmese" title="Burmese"/>
            <CardCat path="image/khao_manee_cat.jpg" name="khao_manee" title="Khao Manee"/>
        </CardDeck>
        <br></br>
        <CardDeck>
            <CardCat path="image/korat_cat.jpg" name="korat_cat" title="Korat"/>
            <CardCat path="image/siamese_cat.jpg" name="siamese_cat" title="Siamese"/>            
        </CardDeck>
    </Container>
    );
};

export default List;
