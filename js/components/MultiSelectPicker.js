import React, {Component, PropTypes} from 'react';
import MultiSelect from './MultiSelect';
import styles from '../../css/app.css';
import * as MultiSelectActions from '../actions/MultiSelectActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class SearchBar extends Component {
    render () {
        return (
                <input
                    type="text"
                    placeholder="Search..."
					className={styles.search}
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={(ev) => this.props.onUserInput(ev.target.value)}
                />
        );
    }
}

export default class MultiSelectPicker extends Component {

   constructor(props) {
      super(props);

      this._availableOptionsChanged = this._availableOptionsChanged.bind(this);
      this._pickedOptionsChanged = this._pickedOptionsChanged.bind(this);
      this._unassignButtonClicked = this._unassignButtonClicked.bind(this);
      this._assignButtonClicked = this._assignButtonClicked.bind(this);
      this.indexOf = this.indexOf.bind(this);
      this.filter = this.filter.bind(this);
    }

   static propTypes = {
     availableOptions: React.PropTypes.array.isRequired,
     onChange: React.PropTypes.func,
     leftSearch: React.PropTypes.string.isRequired, 
     rightSearch: React.PropTypes.string.isRequired 
   };

   indexOf (arr, item) {
      for (let i = 0; i < arr.length; i++) {
         if (arr[i].label == item.label && arr[i].value == item.value) {
            return i;
         }
      }
      return -1;
   }

   filter(arr, item) {
      let ret = {
        itemsToMove: [],
        options: []
      };
      for (let i = 0; i < arr.length; i++) {
        if (this.indexOf(item,arr[i]) === -1) {
            ret.options.push(arr[i]);
        }
        else {
            ret.itemsToMove.push(arr[i]);
        }
      }

      return ret;
   }

    _availableOptionsChanged(event, actions) {
        let selectedValues = [];
        for(let i = 0; i < event.length; i++)
        {
            if (event[i].selected)
            {
                selectedValues.push(event[i]);
            }
        }
        actions.leftSelectionChanged(selectedValues);
    }

    _pickedOptionsChanged(event, actions) {
        let selectedValues = [];
        for(let i = 0; i < event.length; i++)
        {
            if (event[i].selected)
            {
                selectedValues.push(event[i]);
            }

        }
        actions.rightSelectionChanged(selectedValues);
    }

    _unassignButtonClicked(event, actions) {
        let ret = this.filter(this.props.pickedOptions, this.props.pickedOptionsSelected);
        let availableOptions = this.props.availableOptions.concat(ret.itemsToMove);
        actions.assign(availableOptions, ret.options);
        if (this.props.onChange) {
            this.props.onChange({
                availableOptions: availableOptions,
                pickedOptions: ret.options
            })
        }
    }

    _assignButtonClicked(event, actions) {
        let ret = this.filter(this.props.availableOptions, this.props.availableOptionsSelected);
        let pickedOptions = this.props.pickedOptions.concat(ret.itemsToMove);
        actions.assign(ret.options, pickedOptions);
        if (this.props.onChange) {
            this.props.onChange({
                availableOptions: ret.options,
                pickedOptions: pickedOptions
            })
        }
    }

  render () {
      const {leftSearch, rightSearch, dispatch, availableOptions, pickedOptions} = this.props;
      let rows = availableOptions.filter(o => o.label.indexOf(leftSearch) !== -1);
      let pickedRows = pickedOptions.filter(o => o.label.indexOf(rightSearch) !== -1);
      const actions = bindActionCreators(MultiSelectActions, dispatch);

      return (
        <div className={styles.row}>
            <div className={styles.colmd2}>
				   <SearchBar filterText={leftSearch} onUserInput={(text) => actions.leftSearchChanged(text)} />
                <MultiSelect options={rows} onChange={(evt) => this._availableOptionsChanged(evt, actions)} />
            </div>
            <div className={styles.buttonholder}>
               <button onClick={(evt) => this._assignButtonClicked(evt, actions)} type="button" className={styles.btn} >
                    Assign
                </button>
                <button onClick={(evt) => this._unassignButtonClicked(evt, actions)} type="button" className={styles.btn} >
                   Un-assign
                </button>
            </div>
            <div className={styles.colmd2}>
				   <SearchBar filterText={rightSearch} onUserInput={(text) => actions.rightSearchChanged(text)} />
                <MultiSelect options={pickedRows} onChange={(evt) => this._pickedOptionsChanged(evt, actions)} />
            </div>
        </div>
        );
    }
}

export default connect(state => state.MultiSelectReducer)(MultiSelectPicker)

