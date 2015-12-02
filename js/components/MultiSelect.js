import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

import styles from '../../css/app.css';

export default class MultiSelect extends Component {

   constructor(props) {
      super(props);
      this._onChangeHandler = this._onChangeHandler.bind(this);
   }

   static propTypes = {
     options: PropTypes.array.isRequired,
     onChange: PropTypes.func.isRequired
   };

    render () {
        var options = [];
        this.props.options.forEach(function(option){
            options.push(<option onClick={this._onChangeHandler} key={option.label} value={option.value}>{option.label}</option>);
        },this);

        return (
                <select ref="mSelect" className={styles.select} multiple="{true}">
                    {options}
                </select>
        );
    }

    _onChangeHandler (e) {
        var options = ReactDOM.findDOMNode(this.refs.mSelect);

        var selectedValues = [];
         // TODO: why is options.filter not available here?
        for(var i = 0; i < options.length; i++)
        {
            if (options[i].selected) { selectedValues.push(options[i]); }

        }
        this.props.onChange(options);
    }
}


