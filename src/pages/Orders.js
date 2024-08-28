import React from 'react';
import { withRouter } from 'react-router-dom';
import './Orders.css';
import '../styles/OrderStyle.css';
import User from '../images/profile.jpg'; 
import Menu from '../components/Menu';
import data from '../data/data.json';
import MyCart from '../components/MyCart';

class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            list: data,
            id: '',
            newList: [],
            items: [], 
            total: 0,
            cartVisible: false,
        };
    }

    componentDidMount() {
        const hotel = this.props.history.location.pathname.slice(7);
        const List = this.state.list.filter(rec => rec.name === hotel);
        this.setState({
            id: hotel,
            newList: List
        });
    }

    childHandler = (ChildPrice, ChildName) => {
        const { items } = this.state;
        const itemIndex = items.findIndex(item => item.name === ChildName);

        if (itemIndex >= 0) {
            const updatedItems = [...items];
            updatedItems[itemIndex].quantity += 1;
            this.setState({
                items: updatedItems,
                total: this.calculateTotal(updatedItems),
            });
        } else {
            this.setState(prevState => ({
                items: [...prevState.items, { name: ChildName, price: ChildPrice, quantity: 1 }],
                total: this.calculateTotal([...prevState.items, { name: ChildName, price: ChildPrice, quantity: 1 }]),
            }));
        }
    };

    incrementQuantity = (itemName) => {
        const { items } = this.state;
        const itemIndex = items.findIndex(item => item.name === itemName);
        if (itemIndex >= 0) {
            const updatedItems = [...items];
            updatedItems[itemIndex].quantity += 1;
            this.setState({
                items: updatedItems,
                total: this.calculateTotal(updatedItems),
            });
        }
    };

    decrementQuantity = (itemName) => {
        const { items } = this.state;
        const itemIndex = items.findIndex(item => item.name === itemName);
        if (itemIndex >= 0) {
            const updatedItems = [...items];
            if (updatedItems[itemIndex].quantity > 1) {
                updatedItems[itemIndex].quantity -= 1;
            } else {
                updatedItems.splice(itemIndex, 1);
            }
            this.setState({
                items: updatedItems,
                total: this.calculateTotal(updatedItems),
            });
        }
    };

    calculateTotal = (items) => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    toggleCart = () => {
        this.setState(prevState => ({ cartVisible: !prevState.cartVisible }));
    };

    goToHotelsPage = () => {
        this.props.history.push('/hotels'); // Navigate to the hotels page
    };

    placeOrder = () => {
        const orderId = Math.floor(Math.random() * 1000000); // Generate a random order ID
        alert('Order successfully placed!');
        this.props.history.push(`/order-tracking/${orderId}`); // Redirect to OrderTracking page with orderId
    };

    render() {
        const { items, cartVisible, total } = this.state;
        const itemCount = items.reduce((count, item) => count + item.quantity, 0);

        return (
            <div>
                <div className="nav">
                    <div id="logo" onClick={this.goToHotelsPage} style={{ cursor: 'pointer' }}>
                        <h2>FOODIE</h2>
                    </div>

                    <div id="user">
                        <div className="cart-icon" onClick={this.toggleCart} style={{ cursor: 'pointer' }}>
                            <i className="fa fa-shopping-cart" style={{ fontSize: '27px' }}></i>
                            {itemCount > 0 && (
                                <span>{itemCount}</span>
                            )}
                        </div>
                        <div className="profile">
                            <img src={User} id="img" height="45" width="45" alt="profile" />
                        </div>
                    </div>
                </div>

                <div id="content">
                    <div id="head">
                        <h1 className="hname">{this.state.newList.map(x => x.name)}</h1>
                        <h5 className="aname">
                            <i className="fa fa-map-marker" style={{ fontSize: 18 }}></i> {this.state.newList.map(x => x.address)}
                        </h5>
                        <div id="items">
                            <center><h2>Order Now</h2></center>
                            <br />
                            {this.state.newList.map(x => 
                                x.menu.map(item => (
                                    <Menu
                                        key={item.id}
                                        id={item.id}
                                        desc={item.desc}
                                        price={item.price}
                                        name={item.name}
                                        action={this.childHandler}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    {cartVisible && (
                        <div id="panel">
                            <div id="right">
                                <div id="right-in">
                                    <h4>My Cart</h4>
                                    {items.length > 0 && (
                                        <MyCart
                                            items={items}
                                            increment={this.incrementQuantity}
                                            decrement={this.decrementQuantity}
                                        />
                                    )}
                                    <div id="total">
                                        <p id="total">
                                            Total amount: <span className="spn">{'\u20B9'} {total}</span>
                                        </p>
                                        <input
                                            id="PlaceOrder"
                                            type="button"
                                            value="Calculate"
                                            onClick={() => this.calculateTotal(items)}
                                        />
                                        <br />
                                        <input id="PlaceOrder" type="button" value="Place Order" onClick={this.placeOrder} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(Orders);
