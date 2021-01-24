import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import React, {Component} from "react";

export default class CSVTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {dataField: 'place', text: 'Place', sort: true},
                {dataField: 'latitude', text: 'Latitude', sort: false},
                {dataField: 'longitude', text: 'Longitude', sort: false}
            ],
            defaultSorted: [{
                dataField: 'place',
                order: 'desc'
            }],
            pagination: paginationFactory({
                page: 1,
                sizePerPage: 5,
                lastPageText: '>>',
                firstPageText: '<<',
                nextPageText: '>',
                prePageText: '<',
                showTotal: true,
                alwaysShowAllBtns: true,
                onPageChange: function (page, sizePerPage) {
                    console.log('page', page);
                    console.log('sizePerPage', sizePerPage);
                },
                onSizePerPageChange: function (page, sizePerPage) {
                    console.log('page', page);
                    console.log('sizePerPage', sizePerPage);
                }
            })
        };
    }

    render() {
        return (
            <div>
                <BootstrapTable bootstrap4 keyField='place' data={this.props.data} columns={this.state.columns}
                                defaultSorted={this.state.defaultSorted}
                                pagination={this.state.pagination}/>
            </div>
        );
    }
}