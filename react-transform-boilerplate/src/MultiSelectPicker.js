/**
 * Created by shidl on 9/20/2015.
 */
import React, { Component } from 'react';
import MultiSelect from './MultiSelect';
import FilteredMultiSelect from './FilteredMultiSelect';

var indexOf = function(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].label == item.label && arr[i].value == item.value) {
            return i;
        }
    }
    return -1;
}

var getItemsToMove = function(arr, item) {
    var ret = {
        itemsToMove: [],
        options: []
    };
    for (var i = 0; i < arr.length; i++) {
        if (indexOf(item,arr[i]) === -1) {
            ret.options.push(arr[i]);
        }
        else {
            ret.itemsToMove.push(arr[i]);
        }
    }

    return ret;
}

class MultiSelectPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            availableOptionsSelected: [],
            pickedOptionsSelected: [],
            availableOptions: props.availableOptions,
            pickedOptions: []
        }

        this._availableOptionsChangeHandler = this._availableOptionsChangeHandler.bind(this);
        this._pickedOptionsChangedHandler = this._pickedOptionsChangedHandler.bind(this);
        this._removeClickHandler = this._removeClickHandler.bind(this);
        this._addClickHandler = this._addClickHandler.bind(this);
        this._removeAllClickHandler = this._removeAllClickHandler.bind(this);
        this._addAllClickHandler = this._addAllClickHandler.bind(this);
    }

    _availableOptionsChangeHandler(event) {
        var selectedValues = [];
        console.log(event);
        for(var i = 0; i < event.length; i++)
        {
            if (event[i].selected)
            {
                selectedValues.push(event[i]);
            }
        }
        this.setState({availableOptionsSelected: selectedValues});
    }

    _pickedOptionsChangedHandler(event) {
        var selectedValues = [];
        for(var i = 0; i < event.length; i++)
        {
            if (event[i].selected)
            {
                selectedValues.push(event[i]);
            }

        }
        this.setState({pickedOptionsSelected: selectedValues});
    }

    _removeClickHandler(event) {
        var ret = getItemsToMove(this.state.pickedOptions, this.state.pickedOptionsSelected);
        var availableOptions = this.state.availableOptions.concat(ret.itemsToMove);
        this.setState({
            pickedOptions: ret.options,
            availableOptions: availableOptions
        });
        if (this.props.onChange) {
            this.props.onChange({
                availableOptions: availableOptions,
                pickedOptions: ret.options
            })
        }
    }

    _addClickHandler(event) {
        var ret = getItemsToMove(this.state.availableOptions, this.state.availableOptionsSelected);
        var pickedOptions = this.state.pickedOptions.concat(ret.itemsToMove);
        this.setState({
            pickedOptions: pickedOptions,
            availableOptions: ret.options
        });
        if (this.props.onChange) {
            this.props.onChange({
                availableOptions: ret.options,
                pickedOptions: pickedOptions
            })
        }
    }

    _removeAllClickHandler(event) {
        event.preventDefault();
        var available = this.state.availableOptions.slice();
        var picked = this.state.pickedOptions.slice();
        available = available.concat(picked);
        this.setState({
            availableOptions:available,
            pickedOptions: []
        });
        if (this.props.onChange) {
            this.props.onChange({
                availableOptions: available,
                pickedOptions: []
            });
        }
    }

    _addAllClickHandler(event) {
        event.preventDefault();
        var available = this.state.availableOptions.slice();
        var picked = this.state.pickedOptions.slice();
        picked = picked.concat(available);

        this.setState({
            availableOptions: [],
            pickedOptions: picked
        });

        if (this.props.onChange) {
            this.props.onChange({
                availableOptions: [],
                pickedOptions: picked
            });
        }
    }

    render() {
        return (
        <div className="row">
            <FilteredMultiSelect options={this.state.availableOptions} onChange={this._availableOptionsChangeHandler} />
            <div className="col-md-2 text-center">
                <div className="btn-group-vertical text-center">
                    <button onClick={this._removeClickHandler} type="button" className="btn btn-default btn-sm ">
                        Remove<span className="glyphicon glyphicon-chevron-left" />
                    </button>
                    <button onClick={this._removeAllClickHandler} type="button" className="btn btn-default btn-sm ">
                        Remove All<span className="glyphicon glyphicon-chevron-left" />
                        <span className="glyphicon glyphicon-chevron-left" />
                        </button>
                    <button onClick={this._addClickHandler} type="button" className="btn btn-default btn-sm ">
                        Add<span className="glyphicon glyphicon-chevron-right" />
                    </button>
                    <button onClick={this._addAllClickHandler} type="button" className="btn btn-default btn-sm ">
                        Add All<span className="glyphicon glyphicon-chevron-right" />
                        <span className="glyphicon glyphicon-chevron-right" />
                    </button>
                        </div>
            </div>
            <FilteredMultiSelect options={this.state.pickedOptions} onChange={this._pickedOptionsChangedHandler} />
        </div>
        );
    }
}

MultiSelectPicker.propTypes = {
    availableOptions: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func
};

export default MultiSelectPicker;