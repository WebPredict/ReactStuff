var React = require('react');

var MultiSelect = React.createClass({
	getDefaultProps: function () {
		return {
    		options: [
        		{
            		label: 'One',
            		value: '1'
        		},
        		{
            		label: 'Two',
            		value: '2'
        		}
    		]
		};
	},

    render: function () {
        var options = [];
        this.props.options.forEach(function(option){
            options.push(<option onClick={this._onChangeHandler} key={option.label} value={option.value}>{option.label}</option>);
        },this);
        return (
            <div >
                <select ref="mSelect" className="form-control" multiple="{true}">
                    {options}
                </select>
            </div>
        );
    },

    _onChangeHandler: function(e)   {
        var options = this.refs.mSelect.getDOMNode();
        var selectedValues = [];
        for(var i = 0; i < options.length; i++)
        {
            if (options[i].selected)
            {
                selectedValues.push(options[i]);
            }

        }
        this.setState({selectedOptions: selectedValues});
        this.props.onChange(options);
    }
});

MultiSelect.propTypes = {
    options: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired
};

module.exports = MultiSelect;
