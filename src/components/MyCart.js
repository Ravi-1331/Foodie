import React from 'react';

class MyCart extends React.Component {
    render() {
        return (
            <div>
                {this.props.items.map((item, index) => (
                    <p key={index} id="pitem">
                        {item.name}
                        <br /><br />
                        <input
                            className="ip"
                            type="button"
                            value="-"
                            onClick={() => this.props.decrement(item.name)}
                        />
                        <input
                            className="ip"
                            id="tx-w"
                            type="text"
                            value={item.quantity}
                            readOnly
                        />
                        <input
                            className="ip"
                            type="button"
                            value="+"
                            onClick={() => this.props.increment(item.name)}
                        />
                    </p>
                ))}
            </div>
        );
    }
}

export default MyCart;
