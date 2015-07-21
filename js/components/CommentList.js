(function () {
  var CommentList = React.createClass({
    getComment: function (caption, i) {
      return <Comment key={i} caption={caption} captions={this.props.captions}>
        <CommentList items={getChildren(caption, this.props.captions)} captions={this.props.captions}/>
      </Comment>;
    },

    getInitialState: function () {
      return {
        bad: false
      };
    },

    handleBadClick: function () {
      this.setState({
        bad: !this.state.bad
      });
    },

    render: function () {
      var items = this.props.items.sortBy(function (caption) {
        return -parseFloat(caption.get('best_score'));
      });
      var good = items.filter(function (caption) {
        var points = parseInt(caption.get('points'), 10);
        return points >= 0;
      });
      var bad = items.filter(function (caption) {
        var points = parseInt(caption.get('points'), 10);
        return points < 0;
      });
      return <div className="comment-list">
        {good.map(function (caption, i) {
          return this.getComment(caption, i);
        }.bind(this))}
        {!bad.isEmpty() && <div
          className="bad panel"
          onClick={this.handleBadClick}>
          <a className="bad-link" href="#">{this.state.bad ? 'hide' : 'show'} bad replies</a>
        </div>}
        <React.addons.TransitionGroup>
          {this.state.bad && <SlidingPanel key="panel">
            {bad.map(function (caption, i) {
              return this.getComment(caption, i);
            }.bind(this))}
          </SlidingPanel>}
        </React.addons.TransitionGroup>
      </div>;
    }
  });

  window.CommentList = CommentList;
})();
