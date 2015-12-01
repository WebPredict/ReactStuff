import React, {Component, PropTypes} from 'react';
import MultiSelect from './MultiSelect';
import styles from '../css/app.css';

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

      this.state = {
         availableOptionsSelected: [],
         pickedOptionsSelected: [],
         availableOptions: this.props.availableOptions,
         filterText: '',
         rightFilterText: '',
         pickedOptions: []
      };

      this._availableOptionsChanged = this._availableOptionsChanged.bind(this);
      this._pickedOptionsChanged = this._pickedOptionsChanged.bind(this);
      this._unassignButtonClicked = this._unassignButtonClicked.bind(this);
      this._assignButtonClicked = this._assignButtonClicked.bind(this);
      this.handleUserInput = this.handleUserInput.bind(this);
      this.handleRightUserInput = this.handleRightUserInput.bind(this);
      this.indexOf = this.indexOf.bind(this);
      this.filter = this.filter.bind(this);
    }

   static propTypes = {
     availableOptions: React.PropTypes.array.isRequired,
     onChange: React.PropTypes.func
   };

	static defaultProps = {
		filterText: '',
		rightFilterText: '' 
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

    _availableOptionsChanged(event) {
        let selectedValues = [];
        for(let i = 0; i < event.length; i++)
        {
            if (event[i].selected)
            {
                selectedValues.push(event[i]);
            }
        }
        this.setState({availableOptionsSelected: selectedValues});
    }

    _pickedOptionsChanged(event) {
        let selectedValues = [];
        for(let i = 0; i < event.length; i++)
        {
            if (event[i].selected)
            {
                selectedValues.push(event[i]);
            }

        }
        this.setState({pickedOptionsSelected: selectedValues});
    }

    _unassignButtonClicked(event) {
        let ret = this.filter(this.state.pickedOptions, this.state.pickedOptionsSelected);
        let availableOptions = this.state.availableOptions.concat(ret.itemsToMove);
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

    _assignButtonClicked(event) {
        let ret = this.filter(this.state.availableOptions, this.state.availableOptionsSelected);
        let pickedOptions = this.state.pickedOptions.concat(ret.itemsToMove);
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

	handleUserInput(filterText) {
        this.setState({ filterText: filterText });
  }

	handleRightUserInput(filterText) {
        this.setState({ rightFilterText: filterText });
  }

  render () {
		  let rows = this.state.availableOptions.filter(o => o.label.indexOf(this.state.filterText) !== -1);
      let pickedRows = this.state.pickedOptions.filter( o => o.label.indexOf(this.state.rightFilterText) !== -1);

      return (
        <div className={styles.row}>
            <div className={styles.colmd2}>
				   <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput} />
                <MultiSelect options={rows} onChange={this._availableOptionsChanged} />
            </div>
            <div className={styles.buttonholder}>
               <button onClick={this._assignButtonClicked} type="button" className={styles.btn} >
                    Assign
                </button>
                <button onClick={this._unassignButtonClicked} type="button" className={styles.btn} >
                   Un-assign
                </button>
            </div>
            <div className={styles.colmd2}>
				   <SearchBar filterText={this.state.rightFilterText} onUserInput={this.handleRightUserInput} />
                <MultiSelect options={pickedRows} onChange={this._pickedOptionsChanged} />
            </div>
        </div>
        );
    }
}


