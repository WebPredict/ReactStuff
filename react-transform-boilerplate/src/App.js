import React, { Component } from 'react';
import MultiSelect from './MultiSelect';
import FilteredMultiSelect from './FilteredMultiSelect';
import MultiSelectPicker from './MultiSelectPicker';

var options = [
        {
            label: 'Option1',
            value: '1'
        },
        {
            label: 'Option2',
            value: '2'
        },
    {
        label: 'Option3',
        value: '3'
    },
    {
        label: 'Option4',
        value: '4'
    },
    {
        label:'Option5',
        value: '5'
    }
    ];
var example = [
    {
        label: 'test',
        value: 'value',
        checked: false
    },
    {
        label: 'test1',
        value: 'value1',
        checked: false
    }
    ,
    {
        label: 'test2',
        value: 'value2',
        checked: false
    }
    ,
    {
        label: 'test3',
        value: 'value3',
        checked: false
    }
    ,
    {
        label: 'test4',
        value: 'value4',
        checked: false
    }
    ,
    {
        label: 'test5',
        value: 'value5',
        checked: false
    }
    ,
    {
        label: 'test6',
        value: 'value6',
        checked: false
    }
    ,
    {
        label: 'test7',
        value: 'value7',
        checked: false
    }

];
export class App extends Component {

    constructor(props) {
        super(props);
        this._changeHandler = this._changeHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
    }

    _changeHandler(e) {
        console.log(e);
    }

  render() {
    return (

    <div className="container">

        <MultiSelectPicker onChange={this._changeHandler} availableOptions={example} />

    </div>


    );
  }
}