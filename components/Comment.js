(function () {
  var Comment = React.createClass({
    getInitialState: function () {
      return {
        open: false
      };
    },

    handleRowClick: function () {
      this.setState({
        open: !this.state.open
      });
    },

    render: function () {
      var children = getChildren(this.props.caption, this.props.captions);
      return <React.addons.TransitionGroup className="comment">
        <div
          className="row"
          onClick={this.handleRowClick}>
          <div className="vote">
            <a className="toggle" href="#">
              {!children.isEmpty() && (this.state.open ? '-' : '+')}
            </a>
            <div className="buttons">
              {!this.props.caption.get('deleted') && <button type="button" className="up">
                <i className="fa fa-arrow-up"/>
              </button>}
              {!this.props.caption.get('deleted') && <button type="button" className="down">
                <i className="fa fa-arrow-down"/>
              </button>}
            </div>
          </div>
          <div className="body panel">
            <div className="detail small">
              {this.props.caption.get('author_id') && <a href="#">{this.props.caption.get('author')}</a>} {this.props.caption.get('points')} points : {children.size} replies : {moment(this.props.caption.get('datetime'), 'YYYY-MM-DD HH:mm:ss').toNow()} <a href="#">reply</a>
            </div>
            <div className={classNames('caption', this.props.caption.get('deleted') && 'deleted')}>
              {this.props.caption.get('caption')}
            </div>
            <i className="open fa fa-caret-down"/>
          </div>
        </div>
        {this.state.open && <SlidingPanel
          key="panel"
          className="children">
          {this.props.children}
        </SlidingPanel>}
      </React.addons.TransitionGroup>;
    }
  });

  window.Comment = Comment;
})();
