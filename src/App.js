import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import FormCheck from "react-bootstrap/FormCheck";

class App extends Component {
    constructor(props) {
        super(props);

        // Setting up state
        this.state = {
            userInput: "",
            list: [],
            searchInput: "",
            showDetails: {}, // Keeps track of which tasks are expanded
        };
    }

    // Set a user input value
    updateInput(value) {
        this.setState({
            userInput: value,
        });
    }

    // Set search input value
    updateSearch(value) {
        this.setState({
            searchInput: value,
        });
    }

    // Add item if user input is not empty
    addItem() {
        if (this.state.userInput !== "") {
            const userInput = {
                // Add a random id which is used to delete
                id: Math.random(),

                // Add a user value to list
                value: this.state.userInput,

                // Description and timestamp
                description: "Task description here",
                timestamp: new Date().toLocaleString(),

                // Completed status
                completed: false,
            };

            // Update list
            const list = [...this.state.list];
            list.push(userInput);

            // reset state
            this.setState({
                list,
                userInput: "",
            });
        }
    }

    // Function to delete item from list use id to delete
    deleteItem(key) {
        const list = [...this.state.list];

        // Filter values and leave value which we need to delete
        const updateList = list.filter((item) => item.id !== key);

        // Update list in state
        this.setState({
            list: updateList,
        });
    }

    // Function to edit item
    editItem(index) {
        const todos = [...this.state.list];
        const editedTodo = prompt("Edit the todo:", todos[index].value);
        if (editedTodo !== null && editedTodo.trim() !== "") {
            let updatedTodos = [...todos];
            updatedTodos[index].value = editedTodo;
            updatedTodos[index].timestamp = new Date().toLocaleString();
            this.setState({
                list: updatedTodos,
            });
        }
    }

    // Toggle completion status
    toggleCompletion(index) {
        let updatedList = [...this.state.list];
        updatedList[index].completed = !updatedList[index].completed;
        this.setState({ list: updatedList });
    }

    // Toggle details visibility
    toggleDetails(index) {
        this.setState((prevState) => ({
            showDetails: {
                ...prevState.showDetails,
                [index]: !prevState.showDetails[index],
            },
        }));
    }

    render() {
        // Filtered list based on search input
        const filteredList = this.state.list.filter((item) =>
            item.value.toLowerCase().includes(this.state.searchInput.toLowerCase())
        );

        return (
            <Container>
                <Row
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "3rem",
                        fontWeight: "bolder",
                    }}
                >
                    TODO LIST
                </Row>

                <hr />
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Add item . . ."
                                size="lg"
                                value={this.state.userInput}
                                onChange={(item) => this.updateInput(item.target.value)}
                                aria-label="Add something"
                                aria-describedby="basic-addon2"
                            />
                            <Button
                                variant="dark"
                                className="mt-2"
                                onClick={() => this.addItem()}
                            >
                                ADD
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search tasks . . ."
                                size="lg"
                                value={this.state.searchInput}
                                onChange={(item) =>
                                    this.updateSearch(item.target.value)
                                }
                                aria-label="Search tasks"
                                aria-describedby="basic-addon2"
                            />
                            <Button
                                variant="dark"
                                className="mt-2"
                                onClick={() => this.forceUpdate()} // Triggers a re-render to apply the search filter
                            >
                                SEARCH
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
                        <ListGroup>
                            {filteredList.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <ListGroup.Item
                                            variant="dark"
                                            action
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                backgroundColor: item.completed
                                                    ? "lightgreen"
                                                    : "white",
                                            }}
                                        >
                                            <span onClick={() => this.toggleDetails(index)} style={{ cursor: "pointer" }}>
                                                {item.value}
                                            </span>
                                            <span>
                                                <FormCheck
                                                    type="checkbox"
                                                    checked={item.completed}
                                                    onChange={() => this.toggleCompletion(index)}
                                                    style={{ marginRight: "10px" }}
                                                />
                                                <Button
                                                    variant="light"
                                                    onClick={() => this.deleteItem(item.id)}
                                                    style={{ marginRight: "10px" }}
                                                >
                                                    Delete
                                                </Button>
                                                <Button
                                                    variant="light"
                                                    onClick={() => this.editItem(index)}
                                                >
                                                    Edit
                                                </Button>
                                            </span>
                                        </ListGroup.Item>
                                        {this.state.showDetails[index] && (
                                            <ListGroup.Item>
                                                <p>Description: {item.description}</p>
                                                <p>Last updated: {item.timestamp}</p>
                                            </ListGroup.Item>
                                        )}
                                    </div>
                                );
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
