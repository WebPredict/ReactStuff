var React = require('react');
var MultiSelect = require('./MultiSelect');

var indexOf = function(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].label == item.label && arr[i].value == item.value) {
            return i;
        }
    }
    return -1;
}

function makeLookup(arr, prop) {
  var lkup = {}
  for (var i = 0, l = arr.length; i < l ; i++) {
    if (prop) {
      lkup[arr[i][prop]] = true
    }
    else {
      lkup[arr[i]] = true
    }
  }
  return lkup
}

var filter = function(arr, item) {
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

var SearchBar = React.createClass({
    handleChange: function() {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value
        );
    },
    render: function() {
        return (
                <input
                    type="text"
                    placeholder="Search..."
					className="filter-form-control"
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                />
        );
    }
});

var MultiSelectPicker = React.createClass({

    getInitialState: function () {
        var defaultFilter = '';
        return {
            availableOptionsSelected: [],
            pickedOptionsSelected: [],
            availableOptions: this.props.availableOptions,
            filterText: defaultFilter,
            pickedOptions: []
        };
    },

	getDefaultProps: function () {
		return { filterText: '' };
	},

    _availableOptionsChangeHandler: function(event) {
        var selectedValues = [];
        for(var i = 0; i < event.length; i++)
        {
            if (event[i].selected)
            {
                selectedValues.push(event[i]);
            }
        }
        this.setState({availableOptionsSelected: selectedValues});
    },

    _pickedOptionsChangedHandler: function(event) {
        var selectedValues = [];
        for(var i = 0; i < event.length; i++)
        {
            if (event[i].selected)
            {
                selectedValues.push(event[i]);
            }

        }
        this.setState({pickedOptionsSelected: selectedValues});
    },

    _leftButtonClickHandler: function(event) {
        var ret = filter(this.state.pickedOptions, this.state.pickedOptionsSelected);
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
    },

    _rightButtonClickHandler: function(event) {
        var ret = filter(this.state.availableOptions, this.state.availableOptionsSelected);
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
    },

	handleUserInput: function(filterText) {
        this.setState({
            filterText: filterText
        });
    },

    render: function () {

		var rows = [];
        this.props.availableOptions.forEach(function(availableOption) {
            if (availableOption.label.indexOf(this.state.filterText) === -1) {
                return;
            }
			
            rows.push(availableOption);
        }.bind(this));

        return (
        <div className="row">
            <div className="small-5 columns">
				<SearchBar
                    filterText={this.state.filterText}
                    onUserInput={this.handleUserInput}
                />

                <MultiSelect options={rows} onChange={this._availableOptionsChangeHandler} />
            </div>
            <div className="small-2 columns">
                <div className="text-center">
                    <button onClick={this._rightButtonClickHandler} type="button" className="btn btn-default btn-block top-button">
                        Assign
                    </button>
                </div>
                <div className="text-center">
                    <button onClick={this._leftButtonClickHandler} type="button" className="btn btn-default btn-block ">
                        Un-assign
                    </button>
                </div>
            </div>
            <div className="small-5 columns">
                <MultiSelect options={this.state.pickedOptions} onChange={this._pickedOptionsChangedHandler} />
            </div>
        </div>
        );
    }
});

MultiSelectPicker.propTypes = {
    availableOptions: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func
};

module.exports = MultiSelectPicker;
