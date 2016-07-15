import ReactDOM from 'react-dom';
import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import RefData from './RefData';
import RowDataFactory from './RowDataFactory';
import ColDefFactory from './ColDefFactory.jsx';
import './myapp.css';
import agGrid from './ag-grid';
import agTable from './es-react';
// import './ag-grid-k2.css';
// import biu from 'biu.js';


// take this line out if you do not want to use ag-Grid-Enterprise
import 'ag-grid-enterprise';

export default class MyApp extends React.Component {

    constructor() {
        super();

        this.state = {
            quickFilterText: null,
            showGrid: true,
            showToolPanel: false,
            columnDefs: new ColDefFactory().createColDefs(),
            rowData: new RowDataFactory().createRowData(),
            icons: {
                columnRemoveFromGroup: '<i class="fa fa-remove"/>',
                filter: '<i class="fa fa-filter"/>',
                sortAscending: '<i class="fa fa-long-arrow-down"/>',
                sortDescending: '<i class="fa fa-long-arrow-up"/>',
                groupExpanded: '<i class="fa fa-minus-square-o"/>',
                groupContracted: '<i class="fa fa-plus-square-o"/>',
                columnGroupOpened: '<i class="fa fa-minus-square-o"/>',
                columnGroupClosed: '<i class="fa fa-plus-square-o"/>'
            }
        };

        // the grid options are optional, because you can provide every property
        // to the grid via standard React properties. however, the react interface
        // doesn't block you from using the standard JavaScript interface if you
        // wish. Maybe you have the gridOptions stored as JSON on your server? If
        // you do, the providing the gridOptions as a standalone object is just
        // what you want!
        this.gridOptions = {
            // this is how you listen for events using gridOptions
            onModelUpdated: function() {
                console.log('event onModelUpdated received');
            },
            // this is a simple property
            rowBuffer: 10,// no need to set this, the default is fine for almost all scenarios
            // rowModelType: 'pagination',
            // localeText: {
            //   page: 'daPage',
            //   more: 'daMore',
            //   to: 'daTo',
            //   of: 'daOf',
            //   next: 'daNexten',
            //   last: 'daLasten',
            //   first: 'daFirsten',
            //   previous: 'daPrevious',
            //   loadingOoo: 'daLoading...'
            // }
        };
    }

    componentDidMount () {
        var targetDiv = document.querySelector('#tableDiv');
        console.log(targetDiv);
        var tableHeader = [
            {
                headerName: 'Make',// 必填，显示在表头的文本
                field: 'athlete', // 必填， 此项value必须为数据文件中对应的key
                filter: false,      // filter没设置或者是设置为true时，则显示默认的filter，如果设置了其他的，则显示自己定义的filter
                sorting: false,
                style: {'color': 'red'},            // 表格渲染样式设置
                // render: MyTagsRender,                   // 自定义渲染的方法
                fixed: true,    // 此属性为当自适应的时候是否固定此列的宽度（true代表固定，false或’’代表不固定），当设置固定时，宽度为当前设置的width属性值，若未设置，则默认为200，
                                            // 此属性在配置项中开启自适应属性设置才有效
                // minWidth: 300,       // 最小宽度，多数情况是在自适应时，设置使用
                // maxWidth: 300            // 最大宽度，多数情况是在自适应时，设置使用

            },
            {
                headerName: 'Model',
                field: 'age',
                width:200,
                filter: 'k2FilterSearch' // k2FilterSearch为此插件根据k2项目自己集合的一个filter功能,参数类型（BOOLEAN,DOUBLE），仅供参考
            },
            {
                headerName: 'Price',
                field: 'country',
                width:300,
                filter: 'k2FilterType' // k2FilterType为此插件根据k2项目自己集合的一个filer功能，仅供参考
            },
            {
                headerName: 'detail',
                field: 'country',
                width:300
            },
            {
                headerName: 'setting',
                field: 'country',
                width:300,
                filter: false
            }
        ];
        var tableData = 'src/testData.json'
        var configList = {
            targetDiv: targetDiv, // 必填项 ，此为表格要显示的位置
            tableHeader: tableHeader,// 必填项，表头显示文件
            tableData: tableData, // 必填项， 表格数据
            tablePaging: true, // 是否开启分页模式
            tablePageNum: [50, 10, 20], // 是否底部页数选择模式 , 数组第一项为默认被选中的项
            // tableTopNum: 'right', // 是否顶部分页显示 'left, right, middle'
            tableFilter: true, // 是否开启表格过滤模式
            // tableSort: true,  // 是否开启表格排序模式
            tableCheckBox: true, //设置表格可根据checkbox进行选择 true 为开启模式，false或是 ''或是未设置为关闭模式，只能在第一列设置
            tableColumId: 'ID', // 是否开启ID显示模式(value必须为字符串，当设置为空时，则会默认显示‘序号’，如不为空，则表头显示设置的value)
            tableRowSelect: 'more', // 行选择模式，one为单选，more为多选 ,设置为空值时不启用行选择模式
            // tableRowClick:function (params) {tableRowClick(params)}, // 此项为表格行单击事件， 可自己定义单击后执行的事件
            tableResize: true // 设置true则为开启自适应，并且所有列都不固定;设置为false或是‘’或没有此属性，则为关闭;[]中的子项为固定列的名字
        };

         agTable(configList);//生成表格
    }

    onShowGrid(show) {
        this.setState({
            showGrid: show
        });
    }

    onToggleToolPanel(event) {
        this.setState({showToolPanel: event.target.checked});
    }

    onGridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
    }

    selectAll() {
        this.api.selectAll();
    }

    deselectAll() {
        this.api.deselectAll();
    }

    setCountryVisible(visible) {
        this.columnApi.setColumnVisible('country', visible);
    }

    onQuickFilterText(event) {
        this.setState({quickFilterText: event.target.value});
    }

    onCellClicked(event) {
        console.log('onCellClicked: ' + event.data.name + ', col ' + event.colIndex);
    }

    onRowSelected(event) {
        console.log('onRowSelected: ' + event.node.data.name);
    }

    onRefreshData() {
        var newRowData = new RowDataFactory().createRowData();
        this.setState({
            rowData: newRowData
        });
    }

    render() {
        var gridTemplate;
        var bottomHeaderTemplate;
        var topHeaderTemplate;
        var mineTableTemp;

        mineTableTemp = (
            <div style={{'height':'400px','width':'100%'}} id="tableDiv" className='ag-fresh'>

            </div>
        );

        topHeaderTemplate = (
            <div>
                <div style={{float: 'right'}}>
                    <input type="text" onChange={this.onQuickFilterText.bind(this)} placeholder="Type text to filter..."/>
                    <button id="btDestroyGrid" disabled={!this.state.showGrid} onClick={this.onShowGrid.bind(this, false)}>Destroy Grid</button>
                    <button id="btCreateGrid" disabled={this.state.showGrid} onClick={this.onShowGrid.bind(this, true)}>Create Grid</button>
                </div>
                <div style={{padding: '4px'}}>
                    <b>Employees Skills and Contact Details</b> <span id="rowCount"/>
                </div>
            </div>
        );

        // showing the bottom header and grid is optional, so we put in a switch
        if (this.state.showGrid) {
            bottomHeaderTemplate = (
                <div>
                    <div style={{padding: 4}} className={'toolbar'}>
                        <span>
                            Grid API:
                            <button onClick={this.selectAll.bind(this)}>Select All</button>
                            <button onClick={this.deselectAll.bind(this)}>Clear Selection</button>
                        </span>
                        <span style={{marginLeft: 20}}>
                            Column API:
                            <button onClick={this.setCountryVisible.bind(this, false)}>Hide Country Column</button>
                            <button onClick={this.setCountryVisible.bind(this, true)}>Show Country Column</button>
                        </span>
                    </div>
                    <div style={{clear: 'both'}}></div>
                    <div style={{padding: 4}} className={'toolbar'}>
                        <label>
                            <input type="checkbox" onChange={this.onToggleToolPanel.bind(this)}/>
                            Show Tool Panel
                        </label>
                        <button onClick={this.onRefreshData.bind(this)}>Refresh Data</button>
                    </div>
                    <div style={{clear: 'both'}}></div>
                </div>
            );
            gridTemplate = (
                <div style={{height: 400}} className="ag-fresh">
                    <AgGridReact
                        // gridOptions is optional - it's possible to provide
                        // all values as React props
                        gridOptions={this.gridOptions}

                        // listening for events
                        onGridReady={this.onGridReady.bind(this)}
                        onRowSelected={this.onRowSelected.bind(this)}
                        onCellClicked={this.onCellClicked.bind(this)}

                        // binding to simple properties
                        showToolPanel={this.state.showToolPanel}
                        quickFilterText={this.state.quickFilterText}

                        // binding to an object property
                        icons={this.state.icons}

                        // binding to array properties
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}

                        // no binding, just providing harde coded strings for the properties
                        rowSelection="multiple"
                        enableColResize="true"
                        enableSorting="true"
                        enableFilter="true"
                        groupHeaders="true"
                        rowHeight="22"
                        debug="false"
                    />
                </div>
            );
        }

        return <div style={{width: '800px'}}>
            <div style={{padding: '4px'}}>
                {topHeaderTemplate}
                {bottomHeaderTemplate}
                {gridTemplate}
                {mineTableTemp}
            </div>
        </div>;
    }

}
