import React, { Component } from 'react';
import './App.css';

import '@progress/kendo-theme-default/dist/all.css';

import categories from './categories.json';
import products from './products.json';

import { process, State } from '@progress/kendo-data-query';
import {
  Grid,
  GridColumn,
  GridDataStateChangeEvent,
  GridRowClickEvent,
  GridCell,
  GridCellProps,
} from '@progress/kendo-react-grid';
import {
  DropDownList,
  DropDownListChangeEvent,
} from '@progress/kendo-react-dropdowns';
import { Window, WindowActionsEvent } from '@progress/kendo-react-dialogs';

class App extends Component {
  render() {
    return <p>Hola mundo</p>;
  }
}

export default App;
