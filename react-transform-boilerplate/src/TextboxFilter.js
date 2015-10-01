/**
 * Created by shidl on 9/28/2015.
 */
import React, {Component} from 'react';

class TextboxFilter extends Component {

    constructor(props) {
        super(props);
        this._changeHandler = this._changeHandler.bind(this);
    }

    _changeHandler(e) {
        e.preventDefault();
        this.props.onChange(event.target.value.substr(0, 140));
    }

    render() {
        return (
            <input type="text" onChange={this._changeHandler} className="form-control" placeholder="Filter"/>
        )
    }
}

TextboxFilter.propTypes = {
    onChange: React.PropTypes.func.isRequired
}

export default TextboxFilter;