import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle
} from 'reactstrap';
class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    RenderComments(dish) {


        if (dish != null && dish.comments != null) {
            const comments = dish.comments;
            let comms = comments.map((comm, i) => {
                let date = new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }).format(new Date(Date.parse(comm.date)))

                return (
                    <ul key={comm.id} className="list-unstyled">
                        <li className="comment">{comm.comment}</li>
                        <li className="author">-- {comm.author}, {date}</li>
                    </ul>
                );
            })


            return (
                // <div  className="col-12 col-md-5 m-1">
                <Card>
                    <h4>Comments</h4>
                    <div>{comms}</div>
                    </Card>
                // </div>
                    
            );
        }
        else {
            return (
                <div></div>
            );
        }

    }
    RenderDish(dish) {
        if (dish != null) {
            return (

                //<div  className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
               // </div>
                
            );
        }
        else {
            return (
                <div></div>
            );
        }

    }
    render() {
        const dish = this.props.selectedDish;

        return (
            <div className="container">
                <div className="row">
                    {this.RenderDish(dish)}
                    {this.RenderComments(dish)}

                </div>
            </div>
        );
    }
}
export default DishDetail;
