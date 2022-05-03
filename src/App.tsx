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
import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import { Window, WindowActionsEvent } from '@progress/kendo-react-dialogs';

interface AppProps {}
interface AppState {
  dropdownlistCategory: string;
  gridDataState: State;
  windowVisible: boolean;
  gridClickedRow: any;
}

class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dropdownlistCategory: '',
      gridDataState: {
        sort: [{ field: 'ProductName', dir: 'asc' }],
        skip: 0,
        take: 10,
        filter: undefined,
      },
      windowVisible: false,
      gridClickedRow: null,
    };
  }

  handleDropDownChange = (e: DropDownListChangeEvent) => {
    let newDataState = { ...this.state.gridDataState };
    if (e.target.value.CategoryID !== null) {
      newDataState.filter = {
        logic: 'and',
        filters: [
          {
            field: 'CategoryID',
            operator: 'eq',
            value: e.target.value.CategoryID,
          },
        ],
      };
      newDataState.skip = 0;
    } else {
      newDataState.filter = undefined;
      newDataState.skip = 0;
    }
    this.setState({
      dropdownlistCategory: e.target.value.CategoryID,
      gridDataState: newDataState,
    });
  };

  handleGridDataStateChange = (e: GridDataStateChangeEvent) => {
    this.setState({ gridDataState: e.dataState });
  };

  handleGridRowClick = (e: GridRowClickEvent) => {
    this.setState({
      windowVisible: true,
      gridClickedRow: e.dataItem,
    });
  };

  closeWindow = (e: WindowActionsEvent) => {
    this.setState({
      windowVisible: false,
    });
  };

  render() {
    return (
      <div className="kendo-react-getting-started">
        <h1>Hello KendoReact!</h1>
        <p>
          <DropDownList
            data={categories}
            dataItemKey="CategoryID"
            textField="CategoryName"
            defaultItem={{
              CategoryID: null,
              CategoryName: 'Product categories',
            }}
            onChange={this.handleDropDownChange}
          />
          &nbsp; Selected category ID: <strong>{this.state.dropdownlistCategory}</strong>
        </p>

        <Grid
          data={process(products, this.state.gridDataState)}
          pageable={true}
          sortable={true}
          {...this.state.gridDataState}
          onDataStateChange={this.handleGridDataStateChange}
          style={{ height: '400px' }}
          onRowClick={this.handleGridRowClick}
          >
          <GridColumn field="ProductName" title="Product Name" />
          <GridColumn field="UnitPrice" title="Price" format="{0:c}" />
          <GridColumn field="UnitsInStock" title="Units in Stock" />
          <GridColumn field="Discontinued" cell={CheckboxColumn} />
        </Grid>

        {this.state.windowVisible && (
          <Window title="Product Details" onClose={this.closeWindow} height={250}>
            <dl>
              <dt>Product Name</dt>
              <dd>{this.state.gridClickedRow.ProductName}</dd>
              <dt>Product ID</dt>
              <dd>{this.state.gridClickedRow.ProductID}</dd>
              <dt>Quantity per Unit</dt>
              <dd>{this.state.gridClickedRow.QuantityPerUnit}</dd>
            </dl>
          </Window>
        )}
      </div>
    );
  }
}

class CheckboxColumn extends GridCell {
  render() {
    return (
      <td>
        <input type="checkbox" checked={this.props.dataItem[this.props.field]} disabled={true} />
      </td>
    );
  }
}

export default App;
