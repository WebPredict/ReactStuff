import React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import MultiSelectPicker from '../components/MultiSelectPicker';

import {renderDevTools} from '../utils/devTools';

const store = configureStore();

const options = [
   {
        label: 'Apple',
        value: 'apple',
        checked: false
    },
    {
        label: 'Orange',
        value: 'orange',
        checked: false
    }
    ,
    {
        label: 'Pear',
        value: 'pear',
        checked: false
    }
    ,
    {
        label: 'Banana',
        value: 'banana',
        checked: false
    }
];

export default React.createClass({
  render() {
    return (
      <div>

        <Provider store={store}>
          <div>
            <h1>Testing out the multi-select</h1>
            <MultiSelectPicker availableOptions={options} initiallyPicked={['Orange']} />
          </div>
        </Provider>

        {/* only renders when running in DEV mode */
          renderDevTools(store)
        }
      </div>
    );
  }
});
