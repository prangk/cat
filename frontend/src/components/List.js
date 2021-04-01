import React from 'react';
import { Container,Card,CardDeck,Modal,Button} from "react-bootstrap";


const ImageCat = (props) =>{
    return(
        <img width="300px" src={props.imgB64} alt={props.name} />
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
            {props.cat.breed_name}
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

  const CardCat =(props) =>{
    const [modalShow, setModalShow] = React.useState(false);
    console.log('sd')
    console.log(props.cat)
    return(
        <Card>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              <ImageCat imgB64={props.cat.image} name={props.cat.breed_name} />
            </Button>
            <MyVerticallyCenteredModal
                cat = {props.cat}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />            
          <Card.Body>
            <Card.Title>{props.cat.breed_name}</Card.Title>
          </Card.Body>
        </Card>
    )
}

const List = (props) =>{
    return(
    <Container>
      <CardDeck>

      {props.cats.map((cat) => (
         <CardCat cat={cat} />
        ))}
            

        </CardDeck>
    </Container>
    );
};

export default List;
