/**
 * Created by shidl on 9/29/2015.
 */
import React, {Component} from 'react';
import TextboxFilter from './TextboxFilter';
import MultiSelect from './MultiSelect';

var find = function(arr, element) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].label == element.label) {
            return true;
        }
    }
    return false;
}

class FilteredMultiSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredOptions: props.options,
            filter: '',
            selectedOptions: []
        }
        this._filterChangeHandler = this._filterChangeHandler.bind(this);
        this._multiSelectChangeHandler = this._multiSelectChangeHandler.bind(this);
    }

    _filterChangeHandler(value) {

        if (value && value.trim()) {
            var filteredOptions = this.props.options.filter((element) => {
                    if (find(this.state.selectedOptions, element)) {
                        return true;
                    }
                   return element.label.indexOf(value) != -1;
                }
            )
            this.setState({filteredOptions: filteredOptions, filter: value});
        }
        else {
            this.setState({filteredOptions: this.props.options, filter: value});
        }

    }

    _multiSelectChangeHandler(dom, obj) {
        var selectedArr = [];
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].selected) {
                selectedArr.push(obj[i]);
            }
        }
        this.setState({selectedOptions: selectedArr});
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.selectedOptions != this.state.selectedOptions) {
            this.props.onChange(this.state.selectedOptions);
        }

    }

    componentWillReceiveProps(nextProps) {
        if (this.state.filter && this.state.filter.trim()) {
            var filteredOptions = nextProps.options.filter((element) => {
                    return element.label.indexOf(this.state.filter) != -1;
                }
            )
            this.setState({filteredOptions: filteredOptions});
        }
        else {
            this.setState({filteredOptions: nextProps.options});
        }
    }

    render() {
        return (
                <div className="col-md-4">
                    <TextboxFilter onChange={this._filterChangeHandler}/>
                    <MultiSelect onChange={this._multiSelectChangeHandler} options={this.state.filteredOptions}/>
                </div>

        )
    }
}

FilteredMultiSelect.propTypes = {
    options: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired
}

export default FilteredMultiSelect;