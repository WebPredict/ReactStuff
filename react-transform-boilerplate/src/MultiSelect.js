/**
 * Created by shidl on 9/20/2015.
 */

import React, { Component } from 'react';

class MultiSelect extends Component {
    constructor(props) {
        super(props);
        this._onChangeHandler = this._onChangeHandler.bind(this);
    }

    render() {
        var options = [];
        this.props.options.forEach(function(option){
            options.push(<option key={option.label} value={option.value}>{option.label}</option>);
        },this);
        return (
            <div>
                <select size="5" onChange={this._onChangeHandler} ref="mSelect" className="form-control" multiple="{true}">
                    {options}
                </select>
            </div>
        );
    }

    _onChangeHandler(e)  {
        var optionsDOM = this.refs.mSelect.getDOMNode();
        var options = [];
        var optionsObj = [];
        //var selectedValues = [];
        for(var i = 0; i < optionsDOM.length; i++)
        {
            options.push(optionsDOM[i]);
            optionsObj.push({
                label: optionsDOM[i].text,
                value: optionsDOM[i].value,
                selected: optionsDOM[i].selected
            });
        }
        this.props.onChange(options, optionsObj);
    }
}
MultiSelect.defaultProps = {
    options: [
        {
            label: 'One',
            value: '1'
        },
        {
            label: 'Two',
            value: '2'
        }
    ],
    onChange: function(){}
}

MultiSelect.propTypes = {
    options: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired
};

export default MultiSelect;