import React from 'react';

class Pagination extends React.Component {
    
    convertOffsetToCount() {
        if (this.props.currentoffset === 0 ) {
            return 1;
        } else {
            return this.props.currentoffset / 20 + 1;
        }
    }

  pageClick(offset) {
    this.props.handleOffset(offset);
    this.props.getData();
  }

    clickDoubleLeft() {
        if (this.props.currentoffset != 0) {
            this.pageClick(0)
        } 
    }

    clickLeft() {
        if (this.props.currentoffset != 0) {
            this.pageClick(this.props.currentoffset - 20)
        } 
    }

    clickDoubleRight() {
        if (this.props.currentoffset <= this.props.totalcount - 20) {
            this.pageClick(Math.floor(this.props.totalcount / 20) * 20)
        } 
    }

    clickRight() {
        if (this.props.currentoffset <= this.props.totalcount - 20) {
            this.pageClick(this.props.currentoffset + 20)
        } 
    }

  getPaginationList() {
    let paginationitems = [];
    for (let count = 1; count < (Math.floor(this.props.totalcount / 20) + 2); count++) {
      paginationitems.push(<span key={count} 
                            className={"pagination-item" + (count === this.convertOffsetToCount() ? " active" : "")}
                            onClick={event => {this.pageClick(count * 20 - 20)}}>{count}</span>)
    }
    return paginationitems;
  }

  render() {
        return (
            this.props.totalcount > 20 && (
                <div className="pagination-center" style={{width: (Math.ceil(this.props.totalcount / 20) * 53 + 145) + 'px'}}>
                <div className="pagination-outer">
                    <span className="pagination-item pagination-arrow pagination-left-item" onClick={event => {this.clickDoubleLeft()}}>
                        <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                    </span>
                    <span className="pagination-item pagination-arrow" onClick={event => {this.clickLeft()}}>
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                    </span>
                    {this.getPaginationList()}
                    <span className="pagination-item pagination-arrow" onClick={event => {this.clickRight()}}>
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </span>
                    <span className="pagination-item pagination-arrow" onClick={event => {this.clickDoubleRight()}}>
                        <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                    </span>
                </div>
            </div>
            )
        );
  }
}

export default Pagination;
