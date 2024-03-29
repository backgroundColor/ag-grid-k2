//列数据中的Proficiency 中的柱状百分比的显示效果以及百分比的控制
import React from 'react';
import RefData from './RefData';

// cell renderer for the proficiency column. this is a very basic cell renderer,
// it is arguable that we should not of used React and just returned a string of
// html as a normal ag-Grid cellRenderer.根据不同的数值显示不同颜色的条状图
export default class ProficiencyCellRenderer extends React.Component {

    render() {
        var params = this.props.params;
        var backgroundColor;
        if (params.value < 20) {
            backgroundColor = 'red';
        } else if (params.value < 60) {
            backgroundColor = '#ff9900';
        } else {
            backgroundColor = '#00A000';
        }

        return (
            <div className="div-percent-bar" style={{ width: params.value + '%', backgroundColor: backgroundColor }}>
                <div className="div-percent-value">{params.value}%</div>
            </div>
        );
    }
}

// the grid will always pass in one props called 'params',
// which is the grid passing you the params for the cellRenderer.
// this piece is optional. the grid will always pass the 'params'
// props, so little need for adding this validation meta-data.
ProficiencyCellRenderer.propTypes = {
    params: React.PropTypes.object
};
