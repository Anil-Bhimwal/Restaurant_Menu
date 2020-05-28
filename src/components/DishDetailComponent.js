import React, { Component } from "react";
import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    CardImg,
    Col,
    Button,
    Row,
    Label,
    Modal,
    ModalHeader,
    ModalBody,
    Breadcrumb,
    BreadcrumbItem,
} from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    } else {
        return <div></div>;
    }
}
function RenderComments({ comments, addComment, dishId }) {
    return comments ? (
        <>
            {comments.map((comment) => {
                return (
                    <div className="list-unstyled">
                        <p>{comment.comment}</p>
                        <p>
                            --{comment.author} ,{" "}
                            {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                            }).format(new Date(Date.parse(comment.date)))}
              ;
            </p>
                    </div>
                );
            })}
            <CommentForm dishId={dishId} addComment={addComment} />
        </>
    ) : null;
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {props.dish && <h4>Comments</h4>}
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
            </div>
        );
};

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.state = {
            isFromOpen: false,
        };
    }
    toggleForm() {
        this.setState({
            isFormOpen: !this.state.isFormOpen,
        });
    }

    handleSubmit = (values) => {
        this.toggleForm();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        // console.log("Current state is :" + JSON.stringify(values));
        // alert("Current state is :" + JSON.stringify(values));
    };

    render() {
        return (
            <div className="container">
                <div>
                    <button
                        type="button"
                        class="btn btn-outline-secondary"
                        onClick={this.toggleForm}
                    >
                        <span className="fa fa-pencil"> </span> Submit Comment
          </button>
                </div>

                <div className="col-12 col-md-7">
                    <Modal isOpen={this.state.isFormOpen} toggle={this.toggleForm}>
                        <ModalHeader toggle={this.toggleForm}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={this.handleSubmit}>
                                <Row className="form=gorup">
                                    <Label htmlFor="select" md={3}>
                                        Rating
                  </Label>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{ size: 12 }}>
                                        <Control.select
                                            model=".rating"
                                            id="rating"
                                            name="rating"
                                            className="form-control"
                                        >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="group-form">
                                    <Label htmlFor="author" md={3}>
                                        Your Name
                  </Label>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Control.text
                                            model=".author"
                                            id="author"
                                            name="author"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required,
                                                minLength: minLength(3),
                                                maxLength: maxLength(15),
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: "Required",
                                                minLength: "Length must be 3 characters long.",
                                                maxLength: "Length must be 15 characters or less.",
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="group-form">
                                    <Label htmlFor="comment" md={3}>
                                        Comment
                  </Label>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Control.textarea
                                            model=".comment"
                                            id="comment"
                                            name="comment"
                                            rows="6"
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{ size: 10 }}>
                                        <Button type="submit" color="primary">
                                            Submit
                    </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default DishDetail;