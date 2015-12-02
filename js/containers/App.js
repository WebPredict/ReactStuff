import React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import MultiSelectPicker from '../components/MultiSelectPicker';

import {renderDevTools} from '../utils/devTools';

const store = configureStore();

const options = [
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
];

export default React.createClass({
  render() {
    return (
      <div>

        <Provider store={store}>
          <div>
            <h1>Testing out the multi-select</h1>
            <MultiSelectPicker availableOptions={options} />
          </div>
        </Provider>

        {/* only renders when running in DEV mode */
          renderDevTools(store)
        }
      </div>
    );
  }
});
