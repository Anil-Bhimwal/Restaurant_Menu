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
                <div  className="col-12 col-md-5 m-1">
                
                    <h4>Comments</h4>
                    <div>{comms}</div>
                    
                 </div>
                    
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

                <div  className="col-12 col-md-5 m-1">
                <Card >
                    <CardImg width="100%" top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
                
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
                <div className="row">
                    {this.RenderDish(dish)}
                    {this.RenderComments(dish)}
                </div>
        );
    }
}
export default DishDetail;

//  React, { Component } from 'react';
// import { Card, CardImg, CardText, CardBody,
//     CardTitle } from 'reactstrap';
// class DishDetail extends Component {
//     renderComments(comments) {
//         if (comments == null) {
//             return (<div></div>);
//         }
//         const cmnts = comments.map(comment => {
//             return (
//                 console.log(comment),
//                 <li key={comment.id}>
//                import     <p>{comment.comment}</p>
//                     <p>-- {comment.author},
//                     &nbsp;
//                     {new Intl.DateTimeFormat('en-US', {
//                             year: 'numeric',
//                             month: 'long',
//                             day: '2-digit'
//                         }).format(new Date(comment.date))}
//                     </p>
//                 </li>
//             );
//         })
//         return (
//             <div className='col-12 col-md-5 m-1'>
//                 <h4> Comments </h4>
//                 <ul className='list-unstyled'>
//                     {cmnts}
//                 </ul>

//             </div>
//         )
//     }

//     renderDish(dish) {
//         if (dish != null) {
//             return (
//                 <div className='col-12 col-md-5 m-1'>
//                     <Card>
//                         <CardImg width="100%" src={dish.image} alt={dish.name} />
//                         <CardBody>
//                             <CardTitle>{dish.name}</CardTitle>
//                             <CardText>{dish.description}</CardText>
//                         </CardBody>
//                     </Card>
//                 </div>
//             )
//         }
//         else {
//             return (<div></div>)
//         }
//     }

//     render (){
//         const dish = this.props.selectedDish
//         if (dish == null) {
//             return (<div></div>)
//         }
//         const dishItem = this.renderDish(dish)
//         const commentItem = this.renderComments(dish.comments)
//     return(
//         <div className='row'>
//             {dishItem}
//             {commentItem}
//         </div>
//     );
//     }
// }
// export default DishDetail;